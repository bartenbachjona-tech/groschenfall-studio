import sys
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium-1194/chrome-linux/chrome')
    pg=b.new_page(viewport={'width':1280,'height':720})
    pg.goto('file://'+sys.argv[1]); pg.wait_for_timeout(500)
    pg.screenshot(path=sys.argv[2],type='jpeg',quality=92)
    b.close()
