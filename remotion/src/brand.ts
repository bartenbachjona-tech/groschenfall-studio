import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";
loadFont({ family: "Sora", url: staticFile("Sora.ttf"), weight: "100 800" });
export const C = {
  bg0: "#0E1828", bg1: "#16243B", floor: "#1B2D49", line: "#2A3F63", deep: "#0A111D",
  white: "#EEF2F7", gray: "#C9D3E2", mute: "#5A6B88",
  amber: "#FFB547", green: "#3DDC97", red: "#FF5A60", blue: "#86A9FF", choco: "#5B3A29", choco2: "#7A4E36",
};
export const FONT = "Sora";
