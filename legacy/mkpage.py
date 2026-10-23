import sys,re
name,src,title=sys.argv[1],sys.argv[2],sys.argv[3]
js=open('src/v3common.js').read()+'\n'+open(src).read();n=len(re.search(r'UP=\[([^\]]*)\]',js).group(1).split(','))
head=open('v3k2.html').read().split('<div class="scene" id="s1">')[0].replace('V3 Kapitel 2',title)
tail_start=open('v3k2.html').read().index('<div id="vig"')
tail=open('v3k2.html').read()[tail_start:].split('<script>')[0]
sc=''.join(f'<div class="scene" id="s{i}"><svg width="1920" height="1080"><g id="s{i}root"></g></svg></div>\n' for i in range(1,n+1))
open(name+'.html','w').write(head+sc+tail+'<script>\n'+js+'\n</script></body></html>')
print(name,n)
