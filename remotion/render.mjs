import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
const BE=process.env.GF_BROWSER||"/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell";
const [,, id, out] = process.argv;
const serveUrl = await bundle({ entryPoint: "src/index.ts" });
const composition = await selectComposition({ serveUrl, id, browserExecutable: BE });
let last=0;
await renderMedia({ composition, serveUrl, codec: "h264", crf: 18, outputLocation: out, browserExecutable: BE, concurrency: 2,
  onProgress: ({ progress }) => { if (progress - last > 0.1) { last = progress; console.log(Math.round(progress*100)+"%"); } } });
console.log("done");
