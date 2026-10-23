import json, subprocess, sys, os
from playwright.sync_api import sync_playwright
D=os.path.dirname(os.path.abspath(__file__))
W=json.load(open(os.path.join(D,'hook_words.json')))   # {"durs":[..],"words":[[{text,start}],...]}
durs=W['durs'];LEAD,GAP=0.6,0.55
starts=[];t=LEAD
for d in durs: starts.append(t); t+=d+GAP
total=starts[-1]+durs[-1]+1.6
vis=[]
for i in range(len(durs)):
    a=0 if i==0 else starts[i]-0.45
    b=total if i==len(durs)-1 else starts[i+1]-0.45+0.36
    vis.append([a,b])
timing={"starts":starts,"vis":vis,"total":total}
json.dump(timing,open(os.path.join(D,"hook_timing.json"),"w"))
FPS=30
only=sys.argv[1] if len(sys.argv)>1 else None
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/opt/pw-browsers/chromium-1194/chrome-linux/chrome",args=["--force-color-profile=srgb"])
    pg=b.new_page(viewport={"width":1920,"height":1080})
    pg.on("console", lambda m: print("JS:",m.text) if 'MISSING' in m.text or 'rror' in m.text else None)
    pg.on("pageerror", lambda e: print("PAGEERR",e))
    pg.goto("file://"+os.path.join(D,"hook.html")); pg.wait_for_timeout(400)
    pg.evaluate("t=>setup(t)",{"timing":timing,"words":W['words']})
    pg.evaluate("document.fonts.ready")
    if only:
        for tt in only.split(","):
            pg.evaluate(f"render({tt})"); pg.screenshot(path=os.path.join(D,f"h_{tt}.png"))
        sys.exit(0)
    n=int(total*FPS); ev=[]
    ff=subprocess.Popen(["ffmpeg","-loglevel","error","-y","-f","image2pipe","-framerate",str(FPS),"-c:v","mjpeg","-i","-",
        "-c:v","libx264","-preset","medium","-crf","18","-pix_fmt","yuv420p",os.path.join(D,"hook_silent.mp4")],stdin=subprocess.PIPE)
    for f in range(n):
        ev+=pg.evaluate(f"(render({f/FPS}),SFX)")
        ff.stdin.write(pg.screenshot(type="jpeg",quality=94))
        if f%300==0: print(f,"/",n,flush=True)
    ff.stdin.close(); ff.wait(); b.close()
    # sfx dedupe
    seen=set();out=[]
    for t0,k in ev:
        key=(round(t0,2),k)
        if key in seen: continue
        seen.add(key);out.append([t0,k])
    json.dump(out,open(os.path.join(D,"hook_sfx.json"),"w"))
print("done",total)
