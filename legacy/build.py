import json,numpy as np
from scipy.io import wavfile
B='/tmp/claude-0/-home-claude/247a584b-7a79-5492-b327-1823eb84a215/scratchpad'
R=f'{B}/render';O=f'{B}/remo'
J=json.load(open(f'{R}/wordsJ.json'))
GAP={'hook':0.35,'plan':0.4,'twist':0.4,'fair':0.45}
def load(k):
    sr,x=wavfile.read(f'{R}/audioJ/s8_{k}t.wav');return sr,x.astype(np.float64)
paras={};segs=[];t=0.1
for k in ['hook','plan','twist','fair']:
    sr,x=load(k);d=len(x)/sr
    paras[k]={'start':round(t,3),'dur':round(d,3),'words':[{'text':w['text'],'start':w['start']} for w in J[f's8_{k}t']['words']]}
    segs.append((t,x));t+=d+GAP[k]
tE=t;tot={}
for e in ['yt','tt']:
    sr,x=load(e);d=len(x)/sr
    paras[e]={'start':round(tE,3),'dur':round(d,3),'words':[{'text':w['text'],'start':w['start']} for w in J[f's8_{e}t']['words']]}
    T=tE+d+(2.2 if e=='yt' else 1.6);tot[e]=round(T,3)
    y=np.zeros(int(T*sr)+1)
    for t0,xx in segs+[(tE,x)]:s=int(t0*sr);y[s:s+len(xx)]+=xx
    wavfile.write(f'{O}/public/audio/s8_{e}.wav',sr,(y/np.abs(y).max()*0.89*32767).astype(np.int16))
json.dump({'paras':paras,'tot_yt':tot['yt'],'tot_tt':tot['tt']},open(f'{O}/src/data/s8.json','w'),ensure_ascii=False)
print({k:(v['start'],v['dur']) for k,v in paras.items()},tot)
