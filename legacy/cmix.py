import numpy as np, json, os, sys
from scipy.io import wavfile
from scipy.signal import butter, lfilter
D=os.path.dirname(os.path.abspath(__file__))
NAME=sys.argv[1]
SR=44100; T=json.load(open(os.path.join(D,f"{NAME}_timing.json"))); total=T["total"]
N=int(total*SR)+SR
voice=np.zeros(N)
for i,k in enumerate(T["keys"]):
    sr,x=wavfile.read(os.path.join(D,"audioJ",f"{k}.wav")); x=x.astype(np.float64)/32768
    s=int(T["starts"][i]*SR); voice[s:s+len(x)]+=x[:N-s]
def load(n):
    sr,x=wavfile.read(os.path.join(D,"sfx",f"n_sfx_{n}.wav"));return x.astype(np.float64)/32768
S={1:('pop',.55),2:('ding',.45),3:('coin',.5),4:('coins',.55),5:('stamp',.8),6:('vault',.8),7:('whoosh',.5),8:('marimba',.5),9:('paper',.6),10:('pipe',.35)}
LIB={k:load(v[0])*v[1] for k,v in S.items()}
sfx=np.zeros(N); rng=np.random.default_rng(3)
def add(t0,y,g=1.0):
    s=int(t0*SR)
    if s<0: y=y[-s:];s=0
    e=min(N,s+len(y));
    if e>s: sfx[s:e]+=g*y[:e-s]
for t0,k in json.load(open(os.path.join(D,f"{NAME}_sfx.json"))):
    if k==10:   # Münzen im Rohr: 2 s aus mehreren Schnipseln
        for j in range(7): add(t0+j*0.28+rng.uniform(0,0.08),LIB[10],0.7+0.3*rng.random())
    else: add(t0,LIB[k])
for st in T["starts"][1:]: add(st-0.55,LIB[7],0.7)
mix=voice+sfx*0.22
mix/=max(1e-9,np.max(np.abs(mix)))/0.9
wavfile.write(os.path.join(D,f"{NAME}_mix.wav"),SR,(mix*32767).astype(np.int16))
print("ok")
