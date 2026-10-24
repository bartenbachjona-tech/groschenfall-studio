#!/usr/bin/env python3
"""Kontaktbogen aus Remotion-Stills: sheet.py <prefix> <frames,kommagetrennt> <out.png>
Beispiel: python3 tools/sheet.py remotion/out/Short9TT 0,50,140 remotion/out/sheet9.png"""
import sys
from PIL import Image, ImageDraw
pfx, frames, out = sys.argv[1], sys.argv[2].split(','), sys.argv[3]
ims=[Image.open(f"{pfx}_{f}.png") for f in frames]
w,h=ims[0].size; s=0.5; tw,th=int(w*s),int(h*s); cols=7
rows=(len(ims)+cols-1)//cols
S=Image.new('RGB',(cols*tw,rows*(th+24)),'black'); d=ImageDraw.Draw(S)
for i,(f,im) in enumerate(zip(frames,ims)):
    x,y=(i%cols)*tw,(i//cols)*(th+24); S.paste(im.resize((tw,th)),(x,y+24)); d.text((x+6,y+4),f,fill='yellow')
S.save(out)
