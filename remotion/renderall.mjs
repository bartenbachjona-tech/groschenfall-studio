import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import fs from "fs";
const BE=process.env.GF_BROWSER||(()=>{const r="/opt/pw-browsers";const d=fs.existsSync(r)?fs.readdirSync(r).filter(x=>x.startsWith("chromium_headless_shell")).sort().reverse():[];for(const x of d)for(const y of fs.readdirSync(`${r}/${x}`)){for(const b of ["chrome-headless-shell","headless_shell"]){const c=`${r}/${x}/${y}/${b}`;if(fs.existsSync(c))return c;}}return null;})();
const ids = process.argv.slice(2);
const serveUrl = await bundle({ entryPoint: "src/index.ts" });
for (const id of ids) {
  const t0 = Date.now();
  const composition = await selectComposition({ serveUrl, id, browserExecutable: BE });
  await renderMedia({ composition, serveUrl, codec: "h264", crf: 17, outputLocation: `out/v4_${id}.mp4`, browserExecutable: BE, concurrency: 2, audioCodec: "aac", audioBitrate: "256k" });
  console.log("done", id, Math.round((Date.now() - t0) / 1000) + "s");
}
