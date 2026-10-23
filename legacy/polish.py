import numpy as np, sys
from scipy.io import wavfile
from scipy.signal import stft, istft, butter, sosfilt
SR=44100
def load(p):
    sr,x=wavfile.read(p);assert sr==SR;return x.astype(float)/32768
def polish(hel, tim=None, pause_target=0.36, seed=0):
    x=hel.copy()
    # 1) S-Laute: in Zischlaut-Frames Hochton (>3.5 kHz) von Tim übernehmen
    if tim is not None:
        n=min(len(x),len(tim)); x=x[:n]; t=tim[:n]
        f,tt,H=stft(x,SR,nperseg=1024,noverlap=768); _,_,T=stft(t,SR,nperseg=1024,noverlap=768)
        PT=np.abs(T)**2; tot=PT.sum(0)+1e-12
        hfr=PT[f>4000].sum(0)/tot
        loud=10*np.log10(tot); 
        m=np.clip((hfr-0.30)/0.25,0,1)*(loud>loud.max()-50)
        m=np.convolve(m,np.ones(5)/5,'same')          # zeitlich glätten (~30 ms)
        fw=np.clip((f-2800)/1400,0,1)[:,None]          # weicher Übergang 2.8–4.2 kHz
        M=fw*m[None,:]
        Y=H*(1-M)+T*0.9*M
        _,x=istft(Y,SR,nperseg=1024,noverlap=768); x=x[:n]
    # 2) Atem-Ausläufer vor Pausen abblenden + Pausen vereinheitlichen
    w=int(0.01*SR); e=np.array([np.sqrt(np.mean(x[i:i+w]**2)) for i in range(0,len(x)-w,w)])
    db=20*np.log10(e+1e-7); peak=db.max()
    speech=db>peak-24
    # Pausen = mind. 180 ms ohne Sprache
    out=[];last=0;i=0;N=len(speech)
    segs=[]
    while i<N:
        if not speech[i]:
            j=i
            while j<N and not speech[j]: j+=1
            if (j-i)>=18 and i>0 and j<N: segs.append((i,j))
            i=j
        else: i+=1
    rng=np.random.default_rng(seed)
    def room(L):
        nz=rng.standard_normal(L); sos=butter(2,1800/(SR/2),output='sos'); nz=sosfilt(sos,nz)
        return nz/np.sqrt(np.mean(nz**2)+1e-12)*10**(-60/20)
    pieces=[];pos=0
    for s,e2 in segs:
        a=s*w; b=e2*w
        fade=int(0.07*SR)
        seg=x[pos:a+fade].copy()
        seg[-fade:]*=np.linspace(1,0,fade)**2          # Ausklang weich, Atem weg
        pieces.append(seg)
        dur=(e2-s)*0.01
        tgt=min(dur,pause_target) if dur>0.3 else dur   # lange Pausen kürzen
        L=max(int(tgt*SR)-fade,int(0.06*SR))
        pieces.append(np.zeros(L))
        fin=int(0.015*SR)
        nxt=x[b-fin:b].copy()*np.linspace(0,1,fin)       # weicher Einsatz
        pieces.append(nxt)
        pos=b
    pieces.append(x[pos:])
    y=np.concatenate(pieces)
    y=y+room(len(y))                                     # leiser Raumklang statt toter Stille
    return y
if __name__=='__main__':
    hel=load(sys.argv[1]); tim=load(sys.argv[2]) if sys.argv[2]!='-' else None
    y=polish(hel,tim)
    wavfile.write(sys.argv[3],SR,(np.clip(y,-1,1)*32767).astype(np.int16))
