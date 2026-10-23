import json, subprocess, sys, os
from playwright.sync_api import sync_playwright
D=os.path.dirname(os.path.abspath(__file__))
durs=[7.236,9.195,12.722,9.091,9.744,10.580]
LEAD,GAP=0.5,0.45
starts=[];t=LEAD
for d in durs: starts.append(t); t+=d+GAP
end6=starts[5]+durs[5]
starts.append(end6+0.6)          # end card
total=starts[6]+3.6
vis=[]
for i in range(7):
    a=0 if i==0 else starts[i]-0.3
    b=total if i==6 else starts[i+1]-0.3
    vis.append([a,b])
timing={"starts":starts,"vis":vis,"total":total}
json.dump(timing,open(os.path.join(D,"timing.json"),"w"))
FPS=30
only=sys.argv[1] if len(sys.argv)>1 else None
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/opt/pw-browsers/chromium-1194/chrome-linux/chrome",args=["--force-color-profile=srgb"])
    pg=b.new_page(viewport={"width":1920,"height":1080})
    pg.goto("file://"+os.path.join(D,"pilot.html")); pg.wait_for_timeout(500)
    pg.evaluate("t=>setup(t)",timing)
    pg.evaluate("document.fonts.ready")
    json.dump(pg.evaluate("sfxTimes()"),open(os.path.join(D,"sfx.json"),"w"))
    if only:  # stills: comma separated times
        for tt in only.split(","):
            pg.evaluate(f"render({tt})"); pg.screenshot(path=os.path.join(D,f"still_{tt}.png"))
        sys.exit(0)
    n=int(total*FPS)
    ff=subprocess.Popen(["ffmpeg","-loglevel","error","-y","-f","image2pipe","-framerate",str(FPS),"-c:v","mjpeg","-i","-",
        "-c:v","libx264","-preset","medium","-crf","18","-pix_fmt","yuv420p",os.path.join(D,"video_silent.mp4")],stdin=subprocess.PIPE)
    for f in range(n):
        pg.evaluate(f"render({f/FPS})")
        ff.stdin.write(pg.screenshot(type="jpeg",quality=95))
        if f%150==0: print(f,"/",n,flush=True)
    ff.stdin.close(); ff.wait()
    b.close()
print("done",total)
