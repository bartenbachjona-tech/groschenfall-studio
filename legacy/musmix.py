"""musmix.py <name> <music.wav> <out.mp4> [offset_s]  -> mischt Musik mit Ducking unter <name>_mix.wav und muxt <name>_silent.mp4"""
import sys, os, json, subprocess, numpy as np
from scipy.io import wavfile
from scipy.ndimage import uniform_filter1d
D=os.path.dirname(os.path.abspath(__file__)); SR=44100
name,mus,out=sys.argv[1],sys.argv[2],sys.argv[3]; off=float(sys.argv[4]) if len(sys.argv)>4 else 0.0
def norm(src,dst,I=-16):
    subprocess.run(['ffmpeg','-loglevel','error','-y','-i',src,'-af',f'loudnorm=I={I}:TP=-2:LRA=11','-ar',str(SR),'-ac','1',dst],check=True)
    sr,x=wavfile.read(dst);return x.astype(np.float64)/32768
mix=norm(os.path.join(D,f'{name}_mix.wav'),'/tmp/_m1.wav')
mu=norm(mus,'/tmp/_m2.wav')
T=json.load(open(os.path.join(D,f'{name}_timing.json')))
keys=T.get('keys') or [f'h{i}' for i in range(1,6)]
N=len(mix); v=np.zeros(N)
for i,k in enumerate(keys):
    sr,x=wavfile.read(os.path.join(D,'audioJ',f'{k}.wav'));x=x.astype(np.float64)/32768
    s=int(T['starts'][i]*SR); v[s:s+len(x)]+=x[:max(0,N-s)]
# Sprachaktivität (geglättet)
env=np.sqrt(uniform_filter1d(v**2,int(0.05*SR)))
act=(20*np.log10(env+1e-9)>-45).astype(float)
act=uniform_filter1d(act,int(0.35*SR))>0.02
g_db=np.where(act,-15.0,-9.0)
# Glätten: schnell runter, langsam hoch
g=np.empty(N); cur=-9.0; a=1-np.exp(-1/(0.12*SR)); r=1-np.exp(-1/(0.7*SR))
for i0 in range(0,N,64):
    t=g_db[i0]; cur+= (t-cur)*(1-(1-(a if t<cur else r))**64); g[i0:i0+64]=cur
m=np.zeros(N); seg=mu[int(off*SR):][:N]; m[:len(seg)]=seg
fi=int(1.5*SR); fo=int(2.5*SR); m[:fi]*=np.linspace(0,1,fi); 
end=min(N,len(seg)); m[max(0,end-fo):end]*=np.linspace(1,0,end-max(0,end-fo))
outw=mix+m*10**(g/20)
outw/=max(1e-9,np.abs(outw).max())/0.95
wavfile.write('/tmp/_mm.wav',SR,(outw*32767).astype(np.int16))
subprocess.run(['ffmpeg','-loglevel','error','-y','-i',os.path.join(D,f'{name}_silent.mp4'),'-i','/tmp/_mm.wav','-c:v','libx264','-crf','23','-preset','medium','-c:a','aac','-b:a','192k','-af','loudnorm=I=-14:TP=-1.5:LRA=11','-shortest',out],check=True)
print('ok',len(mu)/SR)
