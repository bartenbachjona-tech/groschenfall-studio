"""Verkettet Kapitel + Endkarte, legt Musik (geduckt) darunter, normalisiert."""
import json,subprocess,numpy as np,os
from scipy.io import wavfile
from scipy.ndimage import uniform_filter1d
R='/tmp/claude-0/-home-claude/247a584b-7a79-5492-b327-1823eb84a215/scratchpad'
O=f'{R}/remo/out';SR=48000
parts=[f'{O}/v4_V5Ch{i}.mp4' for i in range(8)]+[f'{O}/v4_EndCard.mp4']
open('/tmp/v5list.txt','w').write(''.join(f"file '{p}'\n" for p in parts))
subprocess.run(['ffmpeg','-loglevel','error','-y','-f','concat','-safe','0','-i','/tmp/v5list.txt','-c','copy','/tmp/v5_cat.mp4'],check=True)
subprocess.run(['ffmpeg','-loglevel','error','-y','-i','/tmp/v5_cat.mp4','-vn','-ac','1','-ar',str(SR),'/tmp/v5_a.wav'],check=True)
a=wavfile.read('/tmp/v5_a.wav')[1].astype(np.float64)/32768;N=len(a)
def load(fn):
    subprocess.run(['ffmpeg','-loglevel','error','-y','-i',fn,'-ac','1','-ar',str(SR),'-af','lowpass=f=6000,loudnorm=I=-16:TP=-2','/tmp/_m.wav'],check=True)
    return wavfile.read('/tmp/_m.wav')[1].astype(np.float64)/32768
offs=json.load(open(f'{R}/v5/offs.json'))
dur=[ (offs[i+1] if i<7 else offs[7]+40) - offs[i] for i in range(8)]
plan=[('music_hook.mp3',0,1),('music_k23.mp3',1,4),('music_k45.mp3',4,6),('music_k67.mp3',6,9)]
m=np.zeros(N);xf=int(1.5*SR)
for fn,c0,c1 in plan:
    s=int(offs[c0]*SR); e=N if c1>=8 else int(offs[c1]*SR)
    x=load(f'{R}/render/music/{fn}')
    L=e-s+xf
    y=np.tile(x,int(np.ceil(L/len(x)))+1)[:L]
    ramp=np.ones(L);ramp[:xf]=np.linspace(0,1,xf);ramp[-xf:]=np.linspace(1,0,xf)
    if c1>=8: ramp[-xf:]=1;fo=int(3*SR);ramp[-fo:]=np.linspace(1,0,fo)
    s2=max(0,s-xf//2);y=(y*ramp)[:N-s2];m[s2:s2+len(y)]+=y
env=np.sqrt(uniform_filter1d(a**2,int(.05*SR)));act=uniform_filter1d((20*np.log10(env+1e-9)>-42).astype(float),int(.3*SR))>.02
g=np.where(act,-27.0,-21.0);g=uniform_filter1d(g,int(.8*SR))
mix=a+m*10**(g/20);mix/=np.abs(mix).max()/0.95
wavfile.write('/tmp/v5_mix.wav',SR,(mix*32767).astype(np.int16))
subprocess.run(['ffmpeg','-loglevel','error','-y','-i','/tmp/v5_cat.mp4','-i','/tmp/v5_mix.wav','-map','0:v','-map','1:a','-c:v','copy','-c:a','aac','-b:a','192k','-af','loudnorm=I=-14:TP=-1.5:LRA=11','-movflags','+faststart',f'{O}/Groschenfall_V05_Krankschreibung_FINAL.mp4'],check=True)
print('final ok')
