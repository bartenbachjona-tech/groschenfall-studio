import { Composition } from "remotion";
import { TestScene } from "./TestScene";
import { Ch0, CH0_DUR } from "./ch/Ch0";
import { Ch1, CH1_DUR } from "./ch/Ch1";
import { Ch2, CH2_DUR } from "./ch/Ch2";
import { Ch3, CH3_DUR } from "./ch/Ch3";
import { Ch4, CH4_DUR } from "./ch/Ch4";
import { Ch5, CH5_DUR } from "./ch/Ch5";
import { Ch6, CH6_DUR } from "./ch/Ch6";
import { EndCard, END_DUR } from "./ch/EndCard";
import { Short7YT, Short7TT, S7_DUR } from "./ch/Short7";
import { Short8YT, Short8TT, S8_DUR } from "./ch/Short8";
import { Short9YT, Short9TT, S9_DUR } from "./ch/Short9";
import { Short10YT, Short10TT, S10_DUR } from "./ch/Short10";
import { Short11YT, Short11TT, S11_DUR } from "./ch/Short11";
import { Short12YT, Short12TT, S12_DUR } from "./ch/Short12";
import { Short13YT, Short13TT, S13_DUR } from "./ch/Short13";
import { Short14YT, Short14TT, S14_DUR } from "./ch/Short14";
import { Short15YT, Short15TT, S15_DUR } from "./ch/Short15";
import { Short16YT, Short16TT, S16_DUR } from "./ch/Short16";
import { Short17YT, Short17TT, S17_DUR } from "./ch/Short17";
import { Short18YT, Short18TT, S18_DUR } from "./ch/Short18";
import { Short19YT, Short19TT, S19_DUR } from "./ch/Short19";
import { Short20YT, Short20TT, S20_DUR } from "./ch/Short20";
import { V5Ch0, V5CH0_DUR } from "./v5/V5Ch0";
import { V5Ch1, V5CH1_DUR } from "./v5/V5Ch1";
import { V5Ch2, V5CH2_DUR } from "./v5/V5Ch2";
import { V5Ch3, V5CH3_DUR } from "./v5/V5Ch3";
import { V5Ch4, V5CH4_DUR } from "./v5/V5Ch4";
import { V5Ch5, V5CH5_DUR } from "./v5/V5Ch5";
import { V5Ch6, V5CH6_DUR } from "./v5/V5Ch6";
import { V5Ch7, V5CH7_DUR } from "./v5/V5Ch7";
import { T5A, T5B, T5C, T5D } from "./ch/Thumb5";
import { T6A, T6B, T6C } from "./ch/Thumb6";
import { ThumbA, ThumbB, ThumbC, ThumbD } from "./ch/Thumb";
const V = { fps: 30, width: 1920, height: 1080 };
export const RemotionRoot = () => (
  <>
    <Composition id="TestScene" component={TestScene} durationInFrames={750} {...V} />
    <Composition id="Ch0" component={Ch0} durationInFrames={CH0_DUR} {...V} />
    <Composition id="Ch1" component={Ch1} durationInFrames={CH1_DUR} {...V} />
    <Composition id="Ch2" component={Ch2} durationInFrames={CH2_DUR} {...V} />
    <Composition id="Ch3" component={Ch3} durationInFrames={CH3_DUR} {...V} />
    <Composition id="Ch4" component={Ch4} durationInFrames={CH4_DUR} {...V} />
    <Composition id="Ch5" component={Ch5} durationInFrames={CH5_DUR} {...V} />
    <Composition id="Ch6" component={Ch6} durationInFrames={CH6_DUR} {...V} />
    <Composition id="Short7YT" component={Short7YT} durationInFrames={S7_DUR.yt} fps={30} width={1080} height={1920} />
    <Composition id="Short7TT" component={Short7TT} durationInFrames={S7_DUR.tt} fps={30} width={1080} height={1920} />
    <Composition id="Short8YT" component={Short8YT} durationInFrames={S8_DUR.yt} fps={30} width={1080} height={1920} />
    <Composition id="Short8TT" component={Short8TT} durationInFrames={S8_DUR.tt} fps={30} width={1080} height={1920} />
    <Composition id="Short9YT" component={Short9YT} durationInFrames={S9_DUR.yt} fps={30} width={1080} height={1920} />
    <Composition id="Short9TT" component={Short9TT} durationInFrames={S9_DUR.tt} fps={30} width={1080} height={1920} />
    <Composition id="Short10YT" component={Short10YT} durationInFrames={S10_DUR.yt} fps={30} width={1080} height={1920} />
    <Composition id="Short10TT" component={Short10TT} durationInFrames={S10_DUR.tt} fps={30} width={1080} height={1920} />
    <Composition id="Short11YT" component={Short11YT} durationInFrames={S11_DUR.yt} fps={30} width={1080} height={1920} />
    <Composition id="Short11TT" component={Short11TT} durationInFrames={S11_DUR.tt} fps={30} width={1080} height={1920} />
    <Composition id="Short12YT" component={Short12YT} durationInFrames={S12_DUR.yt} fps={30} width={1080} height={1920} />
    <Composition id="Short12TT" component={Short12TT} durationInFrames={S12_DUR.tt} fps={30} width={1080} height={1920} />
    <Composition id="Short13YT" component={Short13YT} durationInFrames={S13_DUR.yt} fps={30} width={1080} height={1920} />
    <Composition id="Short13TT" component={Short13TT} durationInFrames={S13_DUR.tt} fps={30} width={1080} height={1920} />
    <Composition id="Short14YT" component={Short14YT} durationInFrames={S14_DUR.yt} fps={30} width={1080} height={1920} />
    <Composition id="Short14TT" component={Short14TT} durationInFrames={S14_DUR.tt} fps={30} width={1080} height={1920} />
    <Composition id="Short15YT" component={Short15YT} durationInFrames={S15_DUR.yt} fps={30} width={1080} height={1920} />
    <Composition id="Short15TT" component={Short15TT} durationInFrames={S15_DUR.tt} fps={30} width={1080} height={1920} />
    <Composition id="Short16YT" component={Short16YT} durationInFrames={S16_DUR.yt} fps={30} width={1080} height={1920} />
    <Composition id="Short16TT" component={Short16TT} durationInFrames={S16_DUR.tt} fps={30} width={1080} height={1920} />
    <Composition id="Short17YT" component={Short17YT} durationInFrames={S17_DUR.yt} fps={30} width={1080} height={1920} />
    <Composition id="Short17TT" component={Short17TT} durationInFrames={S17_DUR.tt} fps={30} width={1080} height={1920} />
    <Composition id="Short18YT" component={Short18YT} durationInFrames={S18_DUR.yt} fps={30} width={1080} height={1920} />
    <Composition id="Short18TT" component={Short18TT} durationInFrames={S18_DUR.tt} fps={30} width={1080} height={1920} />
    <Composition id="Short19YT" component={Short19YT} durationInFrames={S19_DUR.yt} fps={30} width={1080} height={1920} />
    <Composition id="Short19TT" component={Short19TT} durationInFrames={S19_DUR.tt} fps={30} width={1080} height={1920} />
    <Composition id="Short20YT" component={Short20YT} durationInFrames={S20_DUR.yt} fps={30} width={1080} height={1920} />
    <Composition id="Short20TT" component={Short20TT} durationInFrames={S20_DUR.tt} fps={30} width={1080} height={1920} />
    <Composition id="V5Ch0" component={V5Ch0} durationInFrames={V5CH0_DUR} {...V} />
    <Composition id="V5Ch1" component={V5Ch1} durationInFrames={V5CH1_DUR} {...V} />
    <Composition id="V5Ch2" component={V5Ch2} durationInFrames={V5CH2_DUR} {...V} />
    <Composition id="V5Ch3" component={V5Ch3} durationInFrames={V5CH3_DUR} {...V} />
    <Composition id="V5Ch4" component={V5Ch4} durationInFrames={V5CH4_DUR} {...V} />
    <Composition id="V5Ch5" component={V5Ch5} durationInFrames={V5CH5_DUR} {...V} />
    <Composition id="V5Ch6" component={V5Ch6} durationInFrames={V5CH6_DUR} {...V} />
    <Composition id="V5Ch7" component={V5Ch7} durationInFrames={V5CH7_DUR} {...V} />
    <Composition id="T6A" component={T6A} durationInFrames={1} fps={30} width={1280} height={720} />
    <Composition id="T6B" component={T6B} durationInFrames={1} fps={30} width={1280} height={720} />
    <Composition id="T6C" component={T6C} durationInFrames={1} fps={30} width={1280} height={720} />
    <Composition id="T5D" component={T5D} durationInFrames={1} fps={30} width={1280} height={720} />
    <Composition id="T5A" component={T5A} durationInFrames={1} fps={30} width={1280} height={720} />
    <Composition id="T5B" component={T5B} durationInFrames={1} fps={30} width={1280} height={720} />
    <Composition id="T5C" component={T5C} durationInFrames={1} fps={30} width={1280} height={720} />
    <Composition id="ThumbA" component={ThumbA} durationInFrames={1} fps={30} width={1280} height={720} />
    <Composition id="ThumbB" component={ThumbB} durationInFrames={1} fps={30} width={1280} height={720} />
    <Composition id="ThumbC" component={ThumbC} durationInFrames={1} fps={30} width={1280} height={720} />
    <Composition id="ThumbD" component={ThumbD} durationInFrames={1} fps={30} width={1280} height={720} />
    <Composition id="EndCard" component={EndCard} durationInFrames={END_DUR} {...V} />
  </>
);
