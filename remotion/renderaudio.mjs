import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
const BE=process.env.GF_BROWSER||"/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell";
const ids = process.argv.slice(2);
const serveUrl = await bundle({ entryPoint: "src/index.ts" });
for (const id of ids) {
  const composition = await selectComposition({ serveUrl, id, browserExecutable: BE });
  await renderMedia({ composition, serveUrl, codec: "wav", outputLocation: `out/a4_${id}.wav`, browserExecutable: BE, concurrency: 2 });
  console.log("audio", id);
}
