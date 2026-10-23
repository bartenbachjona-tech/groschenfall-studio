"""shrender.py <name> [stills]  — Hochformat-Short. Liest <name>_seg.json: [{"key":..,"tin":..,"tout":..}]
Erzeugt <name>_voice.wav, <name>_timing.json, <name>_silent.mp4, <name>_sfx.json"""
import json, subprocess, sys, os, numpy as np
from scipy.io import wavfile
from playwright.sync_api import sync_playwright
D=os.path.dirname(os.path.abspath(__file__)); SR=44100
name=sys.argv[1]; only=sys.argv[2] if len(sys.argv)>2 else None
SEG=json.load(open(os.path.join(D,f'{name}_seg.json')))
J=json.load(open(os.path.join(D,'wordsJ.json')))
LEAD,GAP,TAIL=float(os.environ.get('LEAD','0.25')),float(os.environ.get('GAP','0.3')),float(os.environ.get('TAIL','1.2'))
starts=[];durs=[];words=[];t=LEAD;voice=[]
for s in SEG:
    sr,x=wavfile.read(os.path.join(D,'audioJ',s['key']+'.wav'));x=x.astype(np.float64)/32768
    tin=s.get('tin',0.0);tout=s.get('tout',len(x)/SR)
    seg=x[int(tin*SR):int(tout*SR)].copy();f=int(0.02*SR);seg[:f]*=np.linspace(0,1,f);seg[-f:]*=np.linspace(1,0,f)
    starts.append(t);durs.append(len(seg)/SR)
    words.append([dict(w,start=round(w['start']-tin,3),end=round(w.get('end',w['start']+0.3)-tin,3)) for w in J[s['key']]['words'] if w['start']>=tin-0.05 and w['start']<tout-0.05])
    voice.append((t,seg));t+=len(seg)/SR+GAP
total=starts[-1]+durs[-1]+TAIL
N=int(total*SR)+SR;v=np.zeros(N)
for t0,seg in voice:s=int(t0*SR);v[s:s+len(seg)]+=seg
wavfile.write(os.path.join(D,f'{name}_voice.wav'),SR,(v/np.abs(v).max()*0.9*32767).astype(np.int16))
vis=[[0 if i==0 else starts[i]-0.2, total if i==len(durs)-1 else starts[i+1]-0.2+0.25] for i in range(len(durs))]
timing={"starts":starts,"vis":vis,"total":total,"keys":[s['key'] for s in SEG],"durs":durs}
json.dump(timing,open(os.path.join(D,f"{name}_timing.json"),"w"))
FPS=30
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/opt/pw-browsers/chromium-1194/chrome-linux/chrome",args=["--force-color-profile=srgb"])
    pg=b.new_page(viewport={"width":1080,"height":1920})
    pg.on("console", lambda m: print("JS:",m.text) if 'MISSING' in m.text or 'rror' in m.text else None)
    pg.on("pageerror", lambda e: print("PAGEERR",e))
    pg.goto("file://"+os.path.join(D,f"{name}.html")); pg.wait_for_timeout(400)
    pg.evaluate("t=>setup(t)",{"timing":timing,"words":words})
    pg.evaluate("document.fonts.ready")
    if only:
        for tt in only.split(","):
            pg.evaluate(f"render({tt})"); pg.screenshot(path=os.path.join(D,f"{name}_{tt}.png"))
        sys.exit(0)
    n=int(total*FPS); ev=[]
    ff=subprocess.Popen(["ffmpeg","-loglevel","error","-y","-f","image2pipe","-framerate",str(FPS),"-c:v","mjpeg","-i","-",
        "-c:v","libx264","-preset","medium","-crf","18","-pix_fmt","yuv420p",os.path.join(D,f"{name}_silent.mp4")],stdin=subprocess.PIPE)
    for f in range(n):
        ev+=pg.evaluate(f"(render({f/FPS}),SFX)")
        ff.stdin.write(pg.screenshot(type="jpeg",quality=94))
    ff.stdin.close(); ff.wait(); b.close()
    seen=set();out=[]
    for t0,k in ev:
        key=(round(t0,2),k)
        if key in seen: continue
        seen.add(key);out.append([t0,k])
    json.dump(out,open(os.path.join(D,f"{name}_sfx.json"),"w"))
print("done",total)
