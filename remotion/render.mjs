import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import fs from "fs";
const BE=process.env.GF_BROWSER||(()=>{const r="/opt/pw-browsers";const d=fs.existsSync(r)?fs.readdirSync(r).filter(x=>x.startsWith("chromium_headless_shell")).sort().reverse():[];for(const x of d)for(const y of fs.readdirSync(`${r}/${x}`)){for(const b of ["chrome-headless-shell","headless_shell"]){const c=`${r}/${x}/${y}/${b}`;if(fs.existsSync(c))return c;}}return null;})();
const [,, id, out] = process.argv;
const serveUrl = await bundle({ entryPoint: "src/index.ts" });
const composition = await selectComposition({ serveUrl, id, browserExecutable: BE });
let last=0;
await renderMedia({ composition, serveUrl, codec: "h264", crf: 18, outputLocation: out, browserExecutable: BE, concurrency: 2,
  onProgress: ({ progress }) => { if (progress - last > 0.1) { last = progress; console.log(Math.round(progress*100)+"%"); } } });
console.log("done");
