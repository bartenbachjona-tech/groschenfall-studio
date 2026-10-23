import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
const BE=process.env.GF_BROWSER||"/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell";
const serveUrl = await bundle({ entryPoint: "src/index.ts" });
for (const id of process.argv.slice(2)) { const c = await selectComposition({ serveUrl, id, browserExecutable: BE }); await renderStill({ composition: c, serveUrl, output: `out/V04_${id}.jpg`, frame: 0, browserExecutable: BE, imageFormat: "jpeg", jpegQuality: 92 }); }
console.log("ok");
