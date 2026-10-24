import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import fs from "fs";
const BE=process.env.GF_BROWSER||(()=>{const r="/opt/pw-browsers";const d=fs.existsSync(r)?fs.readdirSync(r).filter(x=>x.startsWith("chromium_headless_shell")).sort().reverse():[];for(const x of d)for(const y of fs.readdirSync(`${r}/${x}`)){for(const b of ["chrome-headless-shell","headless_shell"]){const c=`${r}/${x}/${y}/${b}`;if(fs.existsSync(c))return c;}}return null;})();
const jobs = JSON.parse(process.argv[2]);
const serveUrl = await bundle({ entryPoint: "src/index.ts" });
for (const [id, frames] of Object.entries(jobs)) {
  const comp = await selectComposition({ serveUrl, id, browserExecutable: BE });
  for (const fr of frames) { await renderStill({ composition: comp, serveUrl, output: `out/${id}_${fr}.png`, frame: fr, browserExecutable: BE, scale: 0.5 }); }
  console.log("ok", id);
}
