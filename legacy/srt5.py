import json,math,re
D='/tmp/claude-0/-home-claude/247a584b-7a79-5492-b327-1823eb84a215/scratchpad/remo/src/data'
t=open('/home/claude/gf/Video05-Krankschreibung-Skript.md').read().split('## Thumbnail')[0].split('---',1)[1]
disp=[l.strip() for l in t.splitlines() if l.strip() and not l.strip().startswith(('[','#','---'))]
off=0;subs=[];k=0;offs=[]
for c in range(8):
    d=json.load(open(f'{D}/v5ch{c}.json'));offs.append(off)
    for p in d['paras']:
        text=disp[k];k+=1
        ws=p['words'];dw=text.split()
        # Chunks: an Satzzeichen / max 42 Zeichen
        chunks=[];cur=[]
        for w in dw:
            if cur and len(' '.join(cur+[w]))>46: chunks.append(cur);cur=[]
            cur.append(w)
            if re.search(r'[.?!:]$',w) and len(' '.join(cur))>18: chunks.append(cur);cur=[]
        if cur: chunks.append(cur)
        i=0;n=len(dw);m=len(ws)
        for ch in chunks:
            a=i;b=i+len(ch);i=b
            ta=ws[min(m-1,math.floor(a/n*m))]['start'];tb=ws[min(m-1,max(0,math.ceil(b/n*m)-1))].get('end',ws[-1]['start']+.3)
            subs.append((off+p['start']+ta,off+p['start']+tb+0.15,' '.join(ch)))
    off+=math.ceil(d['total']*30)/30
def ts(x):h=int(x//3600);mi=int(x%3600//60);s=x%60;return f"{h:02}:{mi:02}:{int(s):02},{int(round((s-int(s))*1000)):03}"
out=[]
for j,(a,b,tx) in enumerate(subs):
    nb=subs[j+1][0]-0.02 if j+1<len(subs) else b
    out.append(f"{j+1}\n{ts(a)} --> {ts(min(b,nb) if min(b,nb)>a+0.4 else a+0.8)}\n{tx}\n")
open('/home/claude/gf/Groschenfall_V05_Krankschreibung.srt','w').write('\n'.join(out))
print(len(subs),'subs; chapter offsets',[round(o,2) for o in offs],'total',round(off,2))
json.dump(offs,open('/tmp/claude-0/-home-claude/247a584b-7a79-5492-b327-1823eb84a215/scratchpad/v5/offs.json','w'))
