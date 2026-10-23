import sys
from PIL import Image
name,ts,out=sys.argv[1],sys.argv[2].split(','),sys.argv[3]
im=[Image.open(f'{name}_{t}.png').resize((640,360)) for t in ts]
rows=(len(im)+1)//2;S=Image.new('RGB',(1280,360*rows))
for i,m in enumerate(im): S.paste(m,((i%2)*640,(i//2)*360))
S.save(out)
