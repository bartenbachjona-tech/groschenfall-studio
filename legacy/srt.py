import json,re
J=json.load(open('wordsJ.json'));F=json.load(open('final_timing.json'))
CH=['hook','ch2','ch3','ch4','ch5','ch6','ch7']
NUM={'neunzehnhundertzwanzig':'1920','fünfundvierzig':'45','dreißigtausend':'30.000','zweitausendfünfundzwanzig':'2025','einundvierzig':'41',
'achtzehnhundertneunundachtzig':'1889','siebzig':'70','zwanzigste':'20.','fünfzigerjahren':'50er-Jahren','neunzehnhundertsiebenundfünfzig':'1957',
'neunzehnhundertfünfundsechzig':'1965','fünfeinhalb':'5,5','neunzehnhundertsechzig':'1960','zweitausendachtunddreißig':'2038','viereinhalb':'4,5',
'siebenundsechzig':'67','zweitausendsiebzig':'2070','zweitausendsechsundzwanzig':'2026','hundertachtundzwanzig':'128','zweitausendachtundzwanzig':'2028',
'zweitausendneununddreißig':'2039','einundzwanzig':'21','zweitausendeinunddreißig':'2031','neunzehnhundertsiebenundsechzig':'1967','dreiunddreißig':'33',
'fünfziger':'50er','sechziger':'60er'}
CONTEXT_NUM={'zehn':'10','zwanzig':'20','zwei':'2','fünfzig':'50'}
def conv(words):
    out=[];i=0
    while i<len(words):
        w=words[i];t=w['text'];core=re.sub(r'[^\wäöüÄÖÜß]','',t).lower();tail=t[len(t.rstrip('.,:;?!')):]
        nxt=re.sub(r'[^\wäöüß]','',words[i+1]['text']).lower() if i+1<len(words) else ''
        if core=='achtzehn' and nxt=='komma':
            out.append(dict(w,text='18,6'+words[i+2]['text'][len('sechs'):]));i+=3;continue
        if core in NUM: t=NUM[core]+tail
        elif core in CONTEXT_NUM and (nxt in ('millionen','jahre','jahren','prozent','milliarden') or (i>0 and words[i-1]['text'].lower() in ('über','knapp'))): t=CONTEXT_NUM[core]+tail
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
with open('Groschenfall_Rente.srt','w') as f:
    for i,(a,b,t) in enumerate(cues,1): f.write(f"{i}\n{ts(a)} --> {ts(b)}\n{t}\n\n")
print(len(cues))
