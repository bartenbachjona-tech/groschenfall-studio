"""trim.py key newkey [maxgap] – kürzt Sprechpausen > maxgap auf maxgap (nur echte Stille)."""
import sys,json,numpy as np
from scipy.io import wavfile
k,nk=sys.argv[1],sys.argv[2];MG=float(sys.argv[3]) if len(sys.argv)>3 else 0.32
sr,x=wavfile.read(f'audioJ/{k}.wav');x=x.astype(np.float64)
J=json.load(open('wordsJ.json'));W=J[k]['words']
hop=int(sr*0.01);e=np.array([np.sqrt(np.mean(x[i:i+hop]**2)+1e-9) for i in range(0,len(x),hop)]);db=20*np.log10(e/ (np.abs(x).max()+1e-9))
sil=db<-38
cuts=[]
for a,b in zip(W,W[1:]):
    s0,s1=int(a['start']*100)+5,int(b['start']*100)
    # längste Stille-Strecke zwischen den Wortanfängen
    best=(0,0);i=s0
    while i<s1:
        if sil[i]:
            j=i
            while j<s1 and sil[j]:j+=1
            if j-i>best[1]-best[0]:best=(i,j)
            i=j
        else:i+=1
    L=(best[1]-best[0])/100
    if L>MG:
        c0=best[0]/100+0.06; c1=best[1]/100-(MG-0.06)
        if c1>c0:cuts.append((c0,c1))
keep=[];last=0;segs=[]
for c0,c1 in cuts:segs.append((last,c0));last=c1
segs.append((last,len(x)/sr))
f=int(0.008*sr);out=[]
for a,b in segs:
    s=x[int(a*sr):int(b*sr)].copy()
    if len(s)>2*f:s[:f]*=np.linspace(0,1,f);s[-f:]*=np.linspace(1,0,f)
    out.append(s)
y=np.concatenate(out)
def mp(t):
    sh=0
    for c0,c1 in cuts:
        if t>=c1:sh+=c1-c0
        elif t>c0:sh+=t-c0
    return round(t-sh,3)
J[nk]={'dur':round(len(y)/sr,3),'words':[dict(w,start=mp(w['start']),end=mp(w.get('end',w['start']+.3))) for w in W]}
json.dump(J,open('wordsJ.json','w'),ensure_ascii=False)
wavfile.write(f'audioJ/{nk}.wav',sr,y.astype(np.int16))
print(k,'cuts',[(round(a,2),round(b,2)) for a,b in cuts],'dur',J[k]['dur'],'->',J[nk]['dur'])
