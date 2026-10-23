import numpy as np, json, os
from scipy.io import wavfile
from scipy.signal import butter, lfilter
D=os.path.dirname(os.path.abspath(__file__))
SR=44100; T=json.load(open(os.path.join(D,"hook_timing.json"))); total=T["total"]
N=int(total*SR)+SR
voice=np.zeros(N)
for i in range(5):
    sr,x=wavfile.read(os.path.join(D,"audioJ",f"h{i+1}.wav")); x=x.astype(np.float64)/32768
    s=int(T["starts"][i]*SR); voice[s:s+len(x)]+=x[:N-s]
rng=np.random.default_rng(2)
def bp(x,lo,hi):
    b,a=butter(2,[lo/(SR/2),hi/(SR/2)],btype="band");return lfilter(b,a,x)
def lp(x,f):
    b,a=butter(2,f/(SR/2));return lfilter(b,a,x)
def clink(amp=1.0):
    L=int(0.6*SR); pt=np.arange(L)/SR; y=np.zeros(L)
    for off,a in [(0,1.0),(0.12,0.4),(0.2,0.18)]:
        o=int(off*SR); q=pt[:L-o]
        y[o:]+=a*(np.sin(2*np.pi*2750*q)+0.6*np.sin(2*np.pi*4130*q)+0.35*np.sin(2*np.pi*5620*q))*np.exp(-q/0.08)
    return y*0.45*amp
sfx=np.zeros(N)
def add(t0,y,g=1.0):
    s=int(t0*SR)
    if s<0: y=y[-s:];s=0
    e=min(N,s+len(y)); sfx[s:e]+=g*y[:e-s]
for t0,k in json.load(open(os.path.join(D,"hook_sfx.json"))):
    if k==1:
        L=int(0.09*SR); pt=np.arange(L)/SR; f=1100-450*pt/0.09
        add(t0,np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-pt/0.03)*0.5)
    elif k==2:
        L=int(0.5*SR); pt=np.arange(L)/SR
        add(t0,(np.sin(2*np.pi*1320*pt)+0.4*np.sin(2*np.pi*1980*pt))*np.exp(-pt/0.12)*0.35)
    elif k==3: add(t0,clink(0.7))
    elif k==4: add(t0,clink(1.0))
    elif k==5:   # Stempel: dumpfer Schlag
        L=int(0.35*SR); pt=np.arange(L)/SR
        y=np.sin(2*np.pi*(90-40*pt)*pt)*np.exp(-pt/0.08)*1.2+lp(rng.standard_normal(L),900)*np.exp(-pt/0.03)*0.6
        add(t0,y*0.8)
    elif k==6:   # Tresor: Metall-Klong + Knarzen
        L=int(1.2*SR); pt=np.arange(L)/SR
        y=(np.sin(2*np.pi*220*pt)+0.5*np.sin(2*np.pi*331*pt)+0.3*np.sin(2*np.pi*587*pt))*np.exp(-pt/0.35)*0.4
        cr=bp(rng.standard_normal(L),300,1200)*(0.5+0.5*np.sin(2*np.pi*23*pt))*np.exp(-pt/0.5)*0.25
        add(t0,y+cr)
    elif k==7:   # Aufprall/Wusch
        L=int(0.6*SR); pt=np.linspace(0,1,L)
        add(t0,bp(rng.standard_normal(L),200,2500)*np.sin(np.pi*pt)**2*0.5)
# Whoosh zwischen den Szenen
for st in T["starts"][1:]:
    L=int(0.5*SR); pt=np.linspace(0,1,L)
    add(st-0.5,bp(rng.standard_normal(L),400,3000)*np.sin(np.pi*pt)**2*0.35)
# Oldtimer-Tuckern in Szene 1 (leise, vorbeifahrend)
s0=T["starts"][0]; L=int(7.5*SR); pt=np.arange(L)/SR
eng=lp(rng.standard_normal(L),400)*(0.6+0.4*np.sign(np.sin(2*np.pi*14*pt)))
env=np.exp(-((pt-3.5)/2.0)**2)
add(s0+0.2,eng*env*0.5)
# Zeitungs-Rascheln (Szene 3)
mix=voice*1.0+sfx*0.2
mix/=max(1e-9,np.max(np.abs(mix)))/0.9
wavfile.write(os.path.join(D,"hook_mix.wav"),SR,(mix*32767).astype(np.int16))
print("ok",len(json.load(open(os.path.join(D,"hook_sfx.json")))))
