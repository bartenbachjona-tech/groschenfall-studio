import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import fs from "fs";
const BE=process.env.GF_BROWSER||(()=>{const r="/opt/pw-browsers";const d=fs.existsSync(r)?fs.readdirSync(r).filter(x=>x.startsWith("chromium_headless_shell")).sort().reverse():[];for(const x of d)for(const y of fs.readdirSync(`${r}/${x}`)){for(const b of ["chrome-headless-shell","headless_shell"]){const c=`${r}/${x}/${y}/${b}`;if(fs.existsSync(c))return c;}}return null;})();
const serveUrl = await bundle({ entryPoint: "src/index.ts" });
for (const id of process.argv.slice(2)) { const c = await selectComposition({ serveUrl, id, browserExecutable: BE }); await renderStill({ composition: c, serveUrl, output: `out/V04_${id}.jpg`, frame: 0, browserExecutable: BE, imageFormat: "jpeg", jpegQuality: 92 }); }
console.log("ok");
