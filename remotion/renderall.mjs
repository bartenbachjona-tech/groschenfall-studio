import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
const BE=process.env.GF_BROWSER||"/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell";
const ids = process.argv.slice(2);
const serveUrl = await bundle({ entryPoint: "src/index.ts" });
for (const id of ids) {
  const t0 = Date.now();
  const composition = await selectComposition({ serveUrl, id, browserExecutable: BE });
  await renderMedia({ composition, serveUrl, codec: "h264", crf: 17, outputLocation: `out/v4_${id}.mp4`, browserExecutable: BE, concurrency: 2, audioCodec: "aac", audioBitrate: "256k" });
  console.log("done", id, Math.round((Date.now() - t0) / 1000) + "s");
}
