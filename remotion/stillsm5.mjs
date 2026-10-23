import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
const BE=process.env.GF_BROWSER||"/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell";
const plan = JSON.parse(process.argv[2]);
const serveUrl = await bundle({ entryPoint: "src/index.ts" });
for (const [id, frames] of Object.entries(plan)) {
  const comp = await selectComposition({ serveUrl, id, browserExecutable: BE });
  for (const fr of frames) { await renderStill({ composition: comp, serveUrl, output: `out/${id}_${fr}.png`, frame: Math.min(fr, comp.durationInFrames-1), browserExecutable: BE, scale: 0.4 }); }
  console.log("done", id);
}
