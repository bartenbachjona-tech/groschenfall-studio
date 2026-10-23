import json,os,sys,subprocess,numpy as np
from scipy.io import wavfile
from scipy.ndimage import uniform_filter1d
D=os.path.dirname(os.path.abspath(__file__));SR=44100;name=sys.argv[1];mus=sys.argv[2];moff=float(sys.argv[3]);out=sys.argv[4]
def ln(src,dst,I=-16):
    subprocess.run(['ffmpeg','-loglevel','error','-y','-i',src,'-af',f'loudnorm=I={I}:TP=-2:LRA=11','-ar',str(SR),'-ac','1',dst],check=True)
    return wavfile.read(dst)[1].astype(np.float64)/32768
v=ln(f'{D}/{name}_voice.wav','/tmp/_v.wav');T=json.load(open(f'{D}/{name}_timing.json'));N=int(T['total']*SR);v=np.pad(v,(0,max(0,N-len(v))))[:N]
def load(n):return wavfile.read(f'{D}/sfx/n_sfx_{n}.wav')[1].astype(np.float64)/32768
S={1:('pop',.55),2:('ding',.45),3:('coin',.5),4:('coins',.55),5:('stamp',.8),6:('vault',.8),7:('whoosh',.5),8:('marimba',.5),9:('paper',.6),10:('pipe',.35)}
LIB={k:load(a)*g for k,(a,g) in S.items()};sfx=np.zeros(N);rng=np.random.default_rng(3)
def add(t0,y,g=1.0):
    s=int(t0*SR);
    if s<0:y=y[-s:];s=0
    e=min(N,s+len(y))
    if e>s:sfx[s:e]+=g*y[:e-s]
for t0,k in json.load(open(f'{D}/{name}_sfx.json')):
    if k==10:
        for j in range(7):add(t0+j*0.28+rng.uniform(0,.08),LIB[10],.7+.3*rng.random())
    else:add(t0,LIB[k])
for st in T['starts'][1:]:add(st-0.35,LIB[7],0.6)
m=ln(f'{D}/{mus}','/tmp/_mu.wav')[int(moff*SR):][:N];m=np.pad(m,(0,N-len(m)));fi=int(.3*SR);fo=int(1.2*SR);m[:fi]*=np.linspace(0,1,fi);m[-fo:]*=np.linspace(1,0,fo)
env=np.sqrt(uniform_filter1d(v**2,int(.05*SR)));act=uniform_filter1d((20*np.log10(env+1e-9)>-45).astype(float),int(.3*SR))>.02
g=np.where(act,-13.0,-8.0);g=uniform_filter1d(g,int(.25*SR))
mix=v+sfx*0.3+m*10**(g/20);mix/=np.abs(mix).max()/0.95
wavfile.write('/tmp/_sh.wav',SR,(mix*32767).astype(np.int16))
subprocess.run(['ffmpeg','-loglevel','error','-y','-i',f'{D}/{name}_silent.mp4','-i','/tmp/_sh.wav','-c:v','libx264','-crf','20','-preset','medium','-c:a','aac','-b:a','192k','-af','loudnorm=I=-14:TP=-1.5:LRA=11','-shortest','-movflags','+faststart',out],check=True)
print('ok')
