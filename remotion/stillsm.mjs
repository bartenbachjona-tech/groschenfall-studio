import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
const BE=process.env.GF_BROWSER||"/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell";
const jobs = JSON.parse(process.argv[2]);
const serveUrl = await bundle({ entryPoint: "src/index.ts" });
for (const [id, frames] of Object.entries(jobs)) {
  const comp = await selectComposition({ serveUrl, id, browserExecutable: BE });
  for (const fr of frames) { await renderStill({ composition: comp, serveUrl, output: `out/${id}_${fr}.png`, frame: fr, browserExecutable: BE, scale: 0.5 }); }
  console.log("ok", id);
}
