"""usage: crender.py <name> <keys,comma> [stills]  -> <name>_silent.mp4, <name>_timing.json, <name>_sfx.json"""
import json, subprocess, sys, os
from playwright.sync_api import sync_playwright
D=os.path.dirname(os.path.abspath(__file__))
name=sys.argv[1]; keys=sys.argv[2].split(','); only=sys.argv[3] if len(sys.argv)>3 else None
J=json.load(open(os.path.join(D,'wordsJ.json')))
durs=[J[k]['dur'] for k in keys]; words=[J[k]['words'] for k in keys]
LEAD,GAP,TAIL=0.6,0.55,float(os.environ.get("TAIL","1.4"))
starts=[];t=LEAD
for d in durs: starts.append(t); t+=d+GAP
total=starts[-1]+durs[-1]+TAIL
vis=[[0 if i==0 else starts[i]-0.45, total if i==len(durs)-1 else starts[i+1]-0.45+0.36] for i in range(len(durs))]
timing={"starts":starts,"vis":vis,"total":total,"keys":keys}
json.dump(timing,open(os.path.join(D,f"{name}_timing.json"),"w"))
FPS=30
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/opt/pw-browsers/chromium-1194/chrome-linux/chrome",args=["--force-color-profile=srgb","--allow-file-access-from-files"])
    pg=b.new_page(viewport={"width":1920,"height":1080})
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
        if f%300==0: print(f,"/",n,flush=True)
    ff.stdin.close(); ff.wait(); b.close()
    seen=set();out=[]
    for t0,k in ev:
        key=(round(t0,2),k)
        if key in seen: continue
        seen.add(key);out.append([t0,k])
    json.dump(out,open(os.path.join(D,f"{name}_sfx.json"),"w"))
print("done",total)
