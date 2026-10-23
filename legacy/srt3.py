import json,re
J=json.load(open('wordsJ.json'));F=json.load(open('final3_timing.json'))
CH=['v3hook','v3k2','v3k3','v3k4','v3k5','v3k6']
NUM={'zweitausend':'2.000','neunhunderteinundvierzig':'941','achthunderttausend':'800.000','dreitausend':'3.000','einunddreißigtausend':'31.000','fünfhundertdreiundsechzig':'563','fünfhundertfünfzig':'550','fünfhundertzwanzig':'520','fünftausend':'5.000','fünfzehnhundert':'1.500','neunundfünfzig':'59','sechshundertsechzig':'660','siebenhundertfünfzig':'750','siebzehnhundert':'1.700','tausend':'1.000','vierhundertdreißigtausend':'430.000','vierhundertfünfzig':'450','vierhundertsechzigtausend':'460.000','zweihundertsiebzigtausend':'270.000','zweitausendfünfundzwanzig':'2025','zweitausendvierhundert':'2.400','zwölfhundert':'1.200','hundert':'100'}
CONTEXT_NUM={'zehn':'10','zwanzig':'20','dreißig':'30','fünfzig':'50','sechs':'6'}
def conv(words):
    out=[];i=0
    while i<len(words):
        w=words[i];t=w['text'];core=re.sub(r'[^\wäöüÄÖÜß]','',t).lower();tail=t[len(t.rstrip('.,:;?!')):]
        nxt=re.sub(r'[^\wäöüß]','',words[i+1]['text']).lower() if i+1<len(words) else ''
        D={'eins':'1','fünf':'5','zwei':'2','drei':'3','vier':'4','acht':'8','sechs':'6'}
        if core in D and nxt=='komma' and i+2<len(words):
            n2=re.sub(r'[^\wäöüß]','',words[i+2]['text']).lower();t2=words[i+2]['text'];tl=t2[len(t2.rstrip('.,:;?!')):]
            if n2 in D: out.append(dict(w,text=D[core]+','+D[n2]+tl,end=words[i+2]['end']));i+=3;continue
        if core=='dreizehn' and nxt=='euro' and i+2<len(words) and words[i+2]['text'].lower().startswith('neunzig'):
            t2=words[i+2]['text'];out.append(dict(w,text='13,90 €'+t2[len(t2.rstrip('.,:;?!')):],end=words[i+2]['end']));i+=3;continue
        if core in NUM: t=NUM[core]+tail
        elif core in CONTEXT_NUM and (nxt in ('millionen','jahre','jahren','prozent','milliarden','cent','euro') or (i>0 and words[i-1]['text'].lower() in ('über','knapp'))): t=CONTEXT_NUM[core]+tail
        if i==0 or re.search(r'[.?!:]$',words[i-1]['text']): t=t[0].upper()+t[1:]
        out.append(dict(w,text=t));i+=1
    return out
def ts(x):
    h=int(x//3600);m=int(x%3600//60);s=x%60;return f"{h:02d}:{m:02d}:{int(s):02d},{int(round((s-int(s))*1000))%1000:03d}"
cues=[]
for ci,c in enumerate(CH):
    T=json.load(open(f'{c}_timing.json'))
    for pi,k in enumerate(T['keys']):
        base=F['starts'][ci]+T['starts'][pi];ws=conv(J[k]['words']);cur=[]
        def flush():
            if cur:cues.append([base+cur[0]['start'],base+cur[-1]['end']+0.25,' '.join(x['text'] for x in cur)]);cur.clear()
        for j,w in enumerate(ws):
            cand=' '.join(x['text'] for x in cur+[w])
            rest=0
            for x in ws[j:]:
                rest+=1
                if re.search(r'[.?!]$',x['text']): break
            if cur and ((len(cand)>42 and not (rest<=2 and len(cand)<=58)) or (w['start']-cur[-1]['end'])>0.45): flush()
            cur.append(w)
            if re.search(r'[.?!]$',w['text']) or (re.search(r'[,:]$',w['text']) and len(' '.join(x['text'] for x in cur))>24): flush()
        flush()
for i in range(len(cues)-1):
    cues[i][1]=min(cues[i][1],cues[i+1][0]-0.02)
with open('Groschenfall_V03_Arbeiten.srt','w') as f:
    for i,(a,b,t) in enumerate(cues,1): f.write(f"{i}\n{ts(a)} --> {ts(b)}\n{t}\n\n")
print(len(cues))
