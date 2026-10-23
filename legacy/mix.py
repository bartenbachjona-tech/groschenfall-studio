import numpy as np, json, os
from scipy.io import wavfile
from scipy.signal import butter, lfilter
D=os.path.dirname(os.path.abspath(__file__)); A=os.path.join(D,"..","audio")
SR=48000; T=json.load(open(os.path.join(D,"timing.json"))); total=T["total"]
N=int(total*SR)+SR
voice=np.zeros(N); 
for i in range(6):
    sr,x=wavfile.read(os.path.join(A,f"s{i+1}.wav")); x=x.astype(np.float64)/32768
    s=int(T["starts"][i]*SR); voice[s:s+len(x)]+=x
def note(f): return 440*2**((f-69)/12)
t=np.arange(N)/SR
music=np.zeros(N)
chords=[[57,64,67,72],[53,60,64,69],[48,55,64,67],[55,62,67,71]]  # Am7 Fmaj7 C G
bar=2.4
k=0; start=0.0
rng=np.random.default_rng(1)
while start<total:
    ch=chords[k%4]; s=int(start*SR); e=min(N,int((start+bar+0.8)*SR)); tt=np.arange(e-s)/SR
    env=np.minimum(1,tt/0.8)*np.exp(-np.maximum(0,tt-bar)/0.3)
    pad=sum(np.sin(2*np.pi*note(m-12)*tt+0.3*np.sin(2*np.pi*0.2*tt))*0.5+np.sin(2*np.pi*note(m-12)*1.003*tt)*0.5 for m in ch)/len(ch)
    music[s:e]+=0.35*pad*env
    # pluck arpeggio 8ths
    for j in range(8):
        m=ch[[0,1,2,3,2,1,2,3][j]]+12
        ps=int((start+j*0.3)*SR); pl=int(0.6*SR)
        if ps+pl>N: continue
        pt=np.arange(pl)/SR
        pluck=(np.sin(2*np.pi*note(m)*pt)+0.3*np.sin(2*np.pi*2*note(m)*pt))*np.exp(-pt/0.12)*np.minimum(1,pt/0.004)
        music[ps:ps+pl]+=0.12*(0.8+0.2*rng.random())*pluck
    start+=bar; k+=1
b,a=butter(2,2500/(SR/2)); music=lfilter(b,a,music)
fade=np.ones(N); fi=int(1.2*SR); fade[:fi]=np.linspace(0,1,fi)
fo_s=int((total-2.2)*SR); fade[fo_s:]=np.linspace(1,0,N-fo_s).clip(0,1)
music*=fade
# duck music under voice
vabs=np.convolve(np.abs(voice),np.ones(int(0.25*SR))/int(0.25*SR),mode="same")
duck=1-0.45*np.clip(vabs/0.05,0,1)
music*=duck
sfx=np.zeros(N)
for tt0,kind in json.load(open(os.path.join(D,"sfx.json"))):
    s=int(tt0*SR)
    if kind==1:
        L=int(0.09*SR); pt=np.arange(L)/SR; f=1100-450*pt/0.09
        y=np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-pt/0.03)*0.5
    elif kind==3:
        L=int(0.6*SR); pt=np.arange(L)/SR; y=np.zeros(L)
        for off,amp in [(0,1.0),(0.13,0.45),(0.22,0.2)]:
            o=int(off*SR); q=pt[:L-o]
            y[o:]+=amp*(np.sin(2*np.pi*2750*q)+0.6*np.sin(2*np.pi*4130*q)+0.35*np.sin(2*np.pi*5620*q))*np.exp(-q/0.09)
        y*=0.45
    else:
        L=int(0.5*SR); pt=np.arange(L)/SR
        y=(np.sin(2*np.pi*1320*pt)+0.4*np.sin(2*np.pi*1980*pt))*np.exp(-pt/0.12)*0.35
    if s+L<N: sfx[s:s+L]+=y
# whoosh at scene changes
bn,an=butter(2,[400/(SR/2),3000/(SR/2)],btype="band")
for st in T["starts"][1:]:
    s=int((st-0.45)*SR); L=int(0.45*SR); pt=np.linspace(0,1,L)
    nz=lfilter(bn,an,rng.standard_normal(L))*np.sin(np.pi*pt)**2*0.25
    sfx[s:s+L]+=nz
mix=voice*1.0+music*0.0+sfx*0.18
mix/=max(1e-9,np.max(np.abs(mix)))/0.9
wavfile.write(os.path.join(D,"mix.wav"),SR,(mix*32767).astype(np.int16))
print("ok")
