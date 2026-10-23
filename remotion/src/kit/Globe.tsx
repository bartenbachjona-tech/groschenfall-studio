import React, { useMemo } from "react";
import { geoGraticule10, geoOrthographic, geoPath, geoMercator, GeoProjection } from "d3-geo";
import { feature } from "topojson-client";
import world from "world-atlas/countries-110m.json";
import worldHi from "world-atlas/countries-50m.json";
import { C } from "../brand";

const toFC = (w: any) => feature(w, w.objects.countries) as any;
let _lo: any = null, _hi: any = null;
export const countries = () => (_lo ??= toFC(world));
export const countriesHi = () => (_hi ??= toFC(worldHi));
/* ISO-numerisch */
export const ISO = { CIV: "384", GHA: "288", FRA: "250", HUN: "348", AUT: "040", DEU: "276", ESP: "724" };

export const Globe: React.FC<{ cx: number; cy: number; r: number; lon: number; lat: number; highlight?: Record<string, number>; belt?: number; hiColor?: string }> = ({ cx, cy, r, lon, lat, highlight = {}, belt = 0, hiColor = C.amber }) => {
  const fc = countries();
  const proj = geoOrthographic().scale(r).translate([cx, cy]).rotate([-lon, -lat]).clipAngle(90);
  const path = geoPath(proj);
  const grat = useMemo(() => geoGraticule10(), []);
  const ring = [...Array.from({ length: 73 }, (_, i) => [-180 + i * 5, -12]), ...Array.from({ length: 73 }, (_, i) => [180 - i * 5, 12]), [-180, -12]];
  const beltPoly = { type: "Polygon", coordinates: [ring.slice().reverse()] } as any;
  return (
    <g>
      <defs>
        <radialGradient id="ocean" cx="0.38" cy="0.32" r="0.8"><stop offset="0" stopColor="#24406B" /><stop offset="1" stopColor="#0E1828" /></radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={r + 26} fill="#3A5A9A" opacity={0.12} />
      <circle cx={cx} cy={cy} r={r} fill="url(#ocean)" />
      <path d={path(grat) ?? ""} fill="none" stroke="#FFFFFF" strokeOpacity={0.06} strokeWidth={1.5} />
      {fc.features.map((ft: any) => {
        const h = highlight[ft.id] ?? 0;
        return <path key={ft.id + (ft.properties?.name ?? "")} d={path(ft) ?? ""} fill={h > 0 ? hiColor : "#2E4A75"} fillOpacity={h > 0 ? 0.35 + 0.65 * h : 1} stroke="#16243B" strokeWidth={1} />;
      })}
      {belt > 0 && <path d={path(beltPoly) ?? ""} fill={C.amber} opacity={0.18 * belt} stroke={C.amber} strokeOpacity={0.6 * belt} strokeWidth={3} strokeDasharray="10 10" />}
      <circle cx={cx - r * 0.35} cy={cy - r * 0.4} r={r * 0.5} fill="#FFFFFF" opacity={0.04} />
    </g>
  );
};
/** Projektion für Screen-Positionen (gleiche Parameter wie Globe) */
export const globeProj = (cx: number, cy: number, r: number, lon: number, lat: number): GeoProjection => geoOrthographic().scale(r).translate([cx, cy]).rotate([-lon, -lat]).clipAngle(90);

/** Flache Europakarte (Mercator) */
export const EuropeMap: React.FC<{ x: number; y: number; w: number; h: number; colors: Record<string, string>; base?: string }> = ({ x, y, w, h, colors, base = "#2E4A75" }) => {
  const fc = countriesHi();
  const proj = geoMercator().center([12, 50]).scale(w * 1.15).translate([x + w / 2, y + h / 2]);
  const path = geoPath(proj);
  return (
    <g>
      {fc.features.map((ft: any, i: number) => {
        const c = colors[ft.id];
        return <path key={i} d={path(ft) ?? ""} fill={c ?? base} stroke="#16243B" strokeWidth={1.5} />;
      })}
    </g>
  );
};
export const europeProj = (x: number, y: number, w: number, h: number) => geoMercator().center([12, 50]).scale(w * 1.15).translate([x + w / 2, y + h / 2]);
