"""Baut pro Kapitel Voice-WAV + Timing-JSON. Usage: build_timing.py"""
import json,numpy as np,os
from scipy.io import wavfile
R='/tmp/claude-0/-home-claude/247a584b-7a79-5492-b327-1823eb84a215/scratchpad/render'
O='/tmp/claude-0/-home-claude/247a584b-7a79-5492-b327-1823eb84a215/scratchpad/remo'
J=json.load(open(f'{R}/wordsJ.json'));V=json.load(open('/home/claude/gf/v5_texts.json'))
LEAD={0:0.15}; GAP=0.5; TAIL={7:4.0}
# zusätzliche Pause NACH Absatz (Sekunden) für Bildmomente
EXTRA={'v5_0_0':0.5,'v5_0_1':0.6,'v5_1_1':0.4,'v5_2_1':0.4,'v5_2_3':0.6,'v5_3_0':0.4,'v5_3_2':0.5,'v5_4_3':0.5,'v5_5_1':0.4,'v5_5_2':0.4,'v5_6_0':0.4,'v5_7_0':0.5,'v5_7_1':0.6}
for c in range(8):
    keys=[k for k in V if k.startswith(f'v5_{c}_')]
    t=LEAD.get(c,0.4);paras=[];segs=[]
    for k in keys:
        sr,x=wavfile.read(f'{R}/audioJ/{k}t.wav');x=x.astype(np.float64)
        if x.ndim>1:x=x.mean(1)
        d=len(x)/sr;w=J[k+'t']['words']
        paras.append({'key':k,'start':round(t,3),'dur':round(d,3),'words':[{'text':q['text'],'start':q['start'],'end':q.get('end',q['start']+.3)} for q in w]})
        segs.append((t,x));t+=d+GAP+EXTRA.get(k,0)
    total=t-GAP+TAIL.get(c,1.2)
    N=int(total*sr)+1;y=np.zeros(N)
    for t0,x in segs:s=int(t0*sr);y[s:s+len(x)]+=x
    wavfile.write(f'{O}/public/audio/v5ch{c}.wav',sr,(y/np.abs(y).max()*0.89*32767).astype(np.int16))
    json.dump({'fps':30,'total':round(total,3),'paras':paras},open(f'{O}/src/data/v5ch{c}.json','w'),ensure_ascii=False)
    print(c,round(total,1),len(paras))
