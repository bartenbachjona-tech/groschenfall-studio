import json, os, subprocess, numpy as np
from scipy.io import wavfile
from scipy.ndimage import uniform_filter1d
D=os.path.dirname(os.path.abspath(__file__)); SR=44100
CH=['v3hook','v3k2','v3k3','v3k4','v3k5','v3k6','v3end']
MUS={'v3hook':'music_hook','v3k2':'music_k23','v3k3':'music_k23','v3k4':'music_k45','v3k5':'music_k45','v3k6':'music_k67','v3end':'music_k67'}
def ln(src,dst,I=-16):
    subprocess.run(['ffmpeg','-loglevel','error','-y','-i',src,'-af',f'loudnorm=I={I}:TP=-2:LRA=11','-ar',str(SR),'-ac','1',dst],check=True)
    return wavfile.read(dst)[1].astype(np.float64)/32768
# Video zusammensetzen
with open('/tmp/_list.txt','w') as f:
    for c in CH: f.write(f"file '{D}/{c}_silent.mp4'\n")
subprocess.run(['ffmpeg','-loglevel','error','-y','-f','concat','-safe','0','-i','/tmp/_list.txt','-c','copy','/tmp/_all.mp4'],check=True)
# Audio
segs=[];voice=[];off=0.0;starts=[];musoff={}
for c in CH:
    T=json.load(open(f'{D}/{c}_timing.json'));n=int(round(T['total']*30))/30  # Videolänge
    N=int(n*SR)
    m=ln(f'{D}/{c}_mix.wav','/tmp/_c.wav');m=np.pad(m,(0,max(0,N-len(m))))[:N]
    v=np.zeros(N)
    for i,k in enumerate(T['keys']):
        x=wavfile.read(f'{D}/audioJ/{k}.wav')[1].astype(np.float64)/32768;s=int(T['starts'][i]*SR);v[s:s+len(x)]+=x[:max(0,N-s)]
    segs.append(m);voice.append(v);starts.append(off);off+=n
mix=np.concatenate(segs);v=np.concatenate(voice);N=len(mix)
# Musik: pro Track zusammenhängend
tracks={}
for name in ['music_hook','music_k23','music_k45','music_k67']: tracks[name]=ln(f'{D}/music/{name}.mp3',f'/tmp/_{name}.wav')
bed=np.zeros(N);i=0
groups=[['v3hook'],['v3k2','v3k3'],['v3k4','v3k5'],['v3k6','v3end']]
for g in groups:
    a=starts[CH.index(g[0])];b=(starts[CH.index(g[-1])+1] if CH.index(g[-1])+1<len(CH) else off)
    tr=tracks[MUS[g[0]]];s=int(a*SR);e=int(b*SR);L=e-s
    seg=tr[:L];seg=np.pad(seg,(0,L-len(seg)))
    fi=int(1.2*SR);fo=int(1.8*SR);seg[:fi]*=np.linspace(0,1,fi);seg[-fo:]*=np.linspace(1,0,fo)
    # leichte Überlappung: Ausklang 1 s in den nächsten Block
    bed[s:e]+=seg
env=np.sqrt(uniform_filter1d(v**2,int(0.05*SR)))
act=uniform_filter1d((20*np.log10(env+1e-9)>-45).astype(float),int(0.35*SR))>0.02
g_db=np.where(act,-15.0,-9.0);g=np.empty(N);cur=-9.0;a=1-np.exp(-1/(0.12*SR));r=1-np.exp(-1/(0.7*SR))
for i0 in range(0,N,64):
    t=g_db[i0];cur+=(t-cur)*(1-(1-(a if t<cur else r))**64);g[i0:i0+64]=cur
out=mix+bed*10**(g/20);out/=np.abs(out).max()/0.95
wavfile.write('/tmp/_final.wav',SR,(out*32767).astype(np.int16))
subprocess.run(['ffmpeg','-loglevel','error','-y','-i','/tmp/_all.mp4','-i','/tmp/_final.wav','-c:v','copy','-c:a','aac','-b:a','192k','-af','loudnorm=I=-14:TP=-1.5:LRA=11','-shortest',f'{D}/Groschenfall_V03_Arbeiten_FINAL.mp4'],check=True)
json.dump({'starts':starts,'total':off},open(f'{D}/final3_timing.json','w'))
print('ok',round(off,1),[round(s,1) for s in starts])
