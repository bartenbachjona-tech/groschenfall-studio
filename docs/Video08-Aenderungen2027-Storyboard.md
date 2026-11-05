# Storyboard V8 „Das ändert sich 2027 – für dein Geld“ (Langvideo So 08.11.2026, 17:00)
Grundlage: `docs/Video08-Aenderungen2027-Skript.md` (Skript v2.1, FREIGEGEBEN 05.11.2026, 1.495 Wörter inkl. Abschlusszeile, Keys `v8_*`). Faktenstand 04.11.2026 (`docs/Video08-Aenderungen2027-Faktenblatt.md`, F1–F38). Format 1920×1080, 30 fps. Stil „Nachtblau“ (Navy `#0E1828`/`#16243B`, Sora, Filmkorn, Vignette; Minze `#3DDC97` = Lösung/Plus · Bernstein `#FFB547` = Kosten/Achtung · Blau `#86A9FF` = neutral/offen · Rot `#FF5A60` = Problem). Figuren stilisiert, Bauchbinde „Beispielfigur“ beim ersten Auftritt. Keine Logos (Ticket, Kasse, Schachtel, Apotheke, Preisvergleich alle markenlos; Bundestag/Bundesrat nur als neutrale Gebäude).
**Zeiten** = Schätzung bei **154 Wörtern/min** (Tempo 1,06). Kapitelstarts aus kumulierten Wortzahlen (Kap. 0–7: 114/188/125/212/157/178/168/353), Szenenstarts innerhalb des Kapitels aus der Wortposition des Ankers. Nach der Stimmaufnahme durch echte Absatzlängen ersetzen (`work/v8/v8ch*.json`).
**Wort-Anker:** `wk("key","Wortanfang")` = Szene/Beat startet beim ersten Wort, das so beginnt; `"=wort"` = exakter Treffer (Falle „zwei“ → „zweihundert…“, hier v. a. „fünf“ → „fünfzehn“). Alle Anker (Szenen und Beats in der Bild-Spalte) sind per Skript gegen den Sprechtext v2.1 geprüft: kein MISSING. Text im Bild ≤ 5 Wörter; Quellenzeile `Src` klein unten links (zählt nicht), Zitat-Tafeln/Sprechblasen mit wörtlichem Zitat sind ausgenommen (wie V7).
**Groschen** (abgenommen 05.11.2026, `remotion/src/kit/Groschen.tsx`): im Langvideo size 150–200 px, nie über Betrag oder Gegenstand, nicht unter y ≈ 880 (Untertitel/Endscreen). Auftritte nur bei Signet, Re-Hooks, Kapitel-Payoffs und Endbild (20 von 82 Szenen, Liste unten).
Umsetzung: `remotion/src/v8/V8Ch0.tsx … V8Ch7.tsx` mit Baukasten `remotion/src/v8/kit8.tsx` (importiert kit7 + Groschen, ergänzt nur; kit7 und Shorts bleiben unverändert, Handbuch G8).

## Zeitplan
| Kap. | Titel | Wörter | Start | Dauer | Szenen |
|---|---|---|---|---|---|
| 0 | Cold Open: Küchentisch im Januar | 114 | 0:00 | 0:44 | 6 |
| 1 | Mindestlohn und Minijob: das Plus | 188 | 0:44 | 1:13 | 10 |
| 2 | Deutschlandticket: 66,80 € per Formel | 125 | 1:58 | 0:49 | 7 |
| 3 | Tanken: Rabatt weg, CO2-Preis bleibt | 212 | 2:46 | 1:23 | 11 |
| 4 | Tabak: die erste von vier Stufen | 157 | 4:09 | 1:01 | 9 |
| 5 | Apotheke und Krankenhaus: Zuzahlungen | 178 | 5:10 | 1:09 | 10 |
| 6 | Kindergeld und Grundfreibetrag: Plus mit Sternchen | 168 | 6:20 | 1:05 | 9 |
| 7 | Krankenkasse ohne Brief + Schluss | 353 | 7:25 | 2:18 | 20 |
| | **Gesamt** | **1.495** | | **9:43 + ca. 12 s Endkarte ≈ 9:55** | **82** |

Kapitelmarken für die Beschreibung (ersetzen die Skript-Entwürfe 0:43/1:56/2:45/4:01/5:03/6:12/7:18, die noch auf v2.0-Wortzahlen beruhen; nach Aufnahme final):
```
00:00 Das ändert sich 2027 für dein Geld
00:44 Mindestlohn 2027 und Minijob-Grenze 633 €
01:58 Deutschlandticket 2027: 66,80 €
02:46 Tankrabatt endet, CO2-Preis 2027 (Bundesrat offen)
04:09 Tabaksteuer 2027
05:10 Zuzahlungen 2027: Apotheke und Krankenhaus
06:20 Kindergeld 2027 und Grundfreibetrag (Entwurf)
07:25 Zusatzbeitrag 2027: Krankenkasse ohne Brief
```

## Musikplan (`work/v8/music_plan.json`)
| Track | Kapitel | Start (Schätzung) | Stimmung |
|---|---|---|---|
| `music_hook.mp3` | 0–1 | 0 s | Küchentisch, leichter Puls, Spannung „mehr oder weniger?“, ab 1.10 dunkler |
| `music_k23.mp3` | 2–3 | 118 s (1:58) | unterwegs, nüchtern-treibend (Bahn → Nacht-Tankstelle) |
| `music_k45.mp3` | 4–5 | 249 s (4:09) | ruhiger, ernster (Tabak, Apotheke), ohne Drama |
| `music_k67.mp3` | 6–7 | 380 s (6:20) | wird heller, Auflösung „kein Brief“, Payoff vier Hebel, Endkarte |
```json
[["music_hook.mp3", 0], ["music_k23.mp3", 118], ["music_k45.mp3", 249], ["music_k67.mp3", 380]]
```
Startwerte nach Aufnahme = Summe der echten Kapitel-Längen. Ducking/Loudness nach KANAL_REGELN (−27/−21 dB, Lowpass 6 kHz, −14 LUFS), Crossfade 1,5 s am Kapitelschnitt. SFX nur `soft, whoosh, stamp, ding, paper, marimba, coins`; Status-Stempel mit `stamp`, Groschen-Landung mit `GroschenKling`.

## Status-Stempel (Pflicht beim ersten Auftritt, `StatusStamp`)
| Änderung | erster Auftritt | Stempel | Farbe |
|---|---|---|---|
| Mindestlohn 14,60 € | 0.1 (klein), 1.1 | „Gesetz“ (Verordnung) | minze |
| Minijob-Grenze 633 € | 1.7 | „Gesetz“ | minze |
| Deutschlandticket 66,80 € | 0.1 (klein), 2.1 | „festgelegt“ | minze |
| Tankrabatt endet 31.12. | 0.2, 3.3 | „Gesetz“ | minze |
| CO2-Preis 55–65 €/t | 3.7 | „nur Bundestag“ (Bundesrat offen) | blau |
| Spritpreisdeckel | 3.9 | „angekündigt“ | grau |
| Tabaksteuer | 4.2 | „Gesetz“ | minze |
| Zuzahlungen | 5.2 | „Gesetz“ | minze |
| Kindergeld 267 € / Grundfreibetrag | 6.1, 6.2, 6.3 | „Entwurf“ | amber |
| Ø-Zusatzbeitrag 2,9 % | 7.2 | „festgelegt“ | minze |
| Wegfall Hinweis-Brief | 7.5 | „Gesetz seit 30.07.2026“ | minze |
| Brief-Pflicht zurück | 7.6 | „Rückkehr geplant“ | blau |

## Groschen-Auftritte (20)
Signet 0.1 (0:00, `augenrollen`, Fall + Kling) · Re-Hooks 0.6 (0:37 `lupe`), 1.5 (1:17 `schreck`), 1.10 (1:54 `triumph`→`schreck`), 3.1 (2:46 `lupe`), 3.6 (3:28 `triumph` klein), 4.1 (4:09 `schreck`), 5.1 (5:10 `schreck`), 6.1 (6:19 `lupe`), 6.6 (7:00 `neutral`), 7.1 (7:25 `schreck`, Payoff der großen Schleife), 7.5 (7:53 `kopfschuetteln`), 7.16 (9:18 `triumph`, Kernsatz) · Kapitel-Payoffs 2.7 (2:39 `triumph`), 3.11 (4:04 `lupe`), 4.9 (5:05 `lupe`), 5.10 (6:16 `triumph`), 6.9 (7:18 `neutral`), 7.13 (8:54 `triumph`) · Endbild 7.20 (9:41 `GroschenEnd`). Größter Abstand zwischen zwei Groschen-Auftritten: 61 s (7:53 → 8:54). Größter Re-Hook-Abstand: 85 s (7:53 → 9:18), Skript-Vorgabe ≤ 90 s eingehalten.

---

## Kapitel 0 – Cold Open: Küchentisch im Januar (0:00–0:44, 114 W.)
**Shot-Plan:** Küchentisch streng von oben (Top-down 90°), heller Lampenkreis auf Navy (Frame 0 nie dunkel). Kamera: Push-ins auf die drei Gegenstände, dann ein durchgehender Pull-back auf die Halbtotale mit Nina, Tom, Emil. Einziges Kapitel mit Top-down-Familie – Klammer zum Finale 7.14.

| # | Bild | Text im Bild | Wort-Anker · Start (ca.) | Dauer |
|---|---|---|---|---|
| 0.1 | **Frame 0 = Schlüsselbild:** Küchentisch von oben, nebeneinander Deutschlandticket-Karte „+3,80 €“ (amber), Lohnzettel „+0,70 €/h“ (minze), Zapfpistole mit Anhänger „−17 ct Rabatt“ (amber). Overlay „Ab 1. Januar“ ab Frame 0 (Stumm-Test), SFX `soft` auf Frame 0. **Groschen** fällt in ≤ 0,5 s (`fall`, `startFrame` 0, Klick-Kling `GroschenKling`) rechts unten neben die Zapfpistole (x≈1760, y≈800, size 180) und guckt von Betrag zu Betrag (`augenrollen`), verdeckt nichts. Erstes Wort ≤ 0,2 s. Bei `wk("v8_0_0","Deutschlandticket")` Push auf die Karte + kleiner Stempel „festgelegt“ (minze); bei `wk("v8_0_0","Lohnzettel")` Kamera gleitet zum Lohnzettel + Stempel „Gesetz“ (minze). Src: Bayer. Verkehrsministerium (VMK-Vorsitz), 30.09.2026 · MiLoV5 § 1, Stand 04.11.2026 | „Ab 1. Januar“ | `wk("v8_0_0","Drei")` · 0:00 | 7 s |
| 0.2 | Push auf die Zapfpistole, Anhänger „−17 ct Rabatt“ wackelt und fällt ab, Stempel „Gesetz“ (minze, Rabatt läuft per Gesetz aus). Bei `wk("v8_0_0","alles")` Kalenderblatt „1. Januar“ klappt mitten auf dem Tisch auf (SFX `paper`). Src: § 68 EnergieStG; Wiss. Dienste Bundestag, 19.10.2026 | „−17 ct Rabatt fällt weg“ | `wk("v8_0_0","=Und")` · 0:07 | 7 s |
| 0.3 | Durchgehender Pull-back: Nina und Tom am Tisch, Bauchbinden „Nina · Beispielfigur“ / „Tom · Beispielfigur“ nacheinander. Icons über den Köpfen: Bahn bei Nina (`wk("v8_0_1","Bahn")`), Auto bei Tom (`wk("v8_0_1","Auto")`). Bei `wk("v8_0_1","Emil")` Emil (Kid-Variante, 6) malt am Tischende, Bauchbinde „Emil · Beispielfigur“ | „Bahn · Auto“ | `wk("v8_0_1","Nina")` · 0:14 | 9 s |
| 0.4 | Sprechblase über Nina und Tom (`Bubble`) „Mehr oder weniger?“, die drei Gegenstände rücken zu einem Stapel zusammen | „Mehr oder weniger?“ | `wk("v8_0_1","Ihre")` · 0:24 | 4 s |
| 0.5 | Sieben Karten fächern auf (`Card3`-Reihe), sechs offen mit Symbolen: Lohnzettel, Ticket, Zapfpistole, neutrale Schachtel, Tablettenpackung, Kinderschuh. Die siebte liegt verdeckt rechts. Bei `wk("v8_0_2","Beispiel")` kleiner Rechner auf jeder offenen Karte, bei `wk("v8_0_2","tun")` Hebel-Symbol (minze) | „7 Änderungen in Euro“ | `wk("v8_0_2","Sieben")` · 0:28 | 10 s |
| 0.6 | Zoom auf die verdeckte siebte Karte: durchgestrichener Briefumschlag. **Groschen** rollt heran (x≈1380, y≈640, size 170) und tippt mit der Lupe auf die Karte (`lupe`) – **Re-Hook**. Bei `wk("v8_0_2","offen")` Pill „offen“ (blau). Bei `wk("v8_0_2","letzte")` Karte gleitet an den rechten Rand, Etikett „kommt zuletzt“ | „Kein Warnbrief mehr?“ | `wk("v8_0_2","einer")` · 0:37 | 7 s |

## Kapitel 1 – Mindestlohn und Minijob: das Plus (0:44–1:58, 188 W.)
**Shot-Plan:** Lohnbüro-Schreibtisch frontal auf Augenhöhe, statische Kamera; der Lohnzettel ist die Bühne (Klapp- und Flip-Animationen, Zeilen leuchten auf). Minze-Akzente, keine Kamerafahrten – Kontrast zum Pull-back in Kap. 0.

| # | Bild | Text im Bild | Wort-Anker · Start (ca.) | Dauer |
|---|---|---|---|---|
| 1.1 | Kapitel-Label „1 · Das Plus“. Großes Stundenlohn-Schild „13,90 €“ klappt bei `wk("v8_1_0","vierzehn")` auf „14,60 €“ (minze, `PriceTag` mit `flipAt`), dazu Stempel „Gesetz“ (minze, Unterzeile „Verordnung“). Src: MiLoV5 § 1, Stand 04.11.2026 | „13,90 € → 14,60 €“ | `wk("v8_1_0","Fangen")` · 0:44 | 8 s |
| 1.2 | Durchgestrichenes Notizblatt „Plan?“ wird von einem Gesetzblatt „Verordnung der Bundesregierung“ überdeckt, Kalender-Pill „seit einem Jahr“. Bei `wk("v8_1_1","Was")` dreht sich die Du-Figur (Rückenansicht) ins Bild. Src: MiLoV5 § 1, Stand 04.11.2026 | „Kein Plan: Verordnung“ | `wk("v8_1_0","kein")` · 0:53 | 7 s |
| 1.3 | Du-Figur (neutral, Rückenansicht) mit Vollzeit-Uhr „38,8 h/Woche“. Lohnzettel: bei `wk("v8_1_1","hundertachtzehn")` Zeile „Brutto +118 €“ (minze), bei `wk("v8_1_1","Netto")` darunter kleiner werdende Zeile „Netto: weniger“, zwei kleine Töpfe „Steuer“/„Sozialabgaben“ nehmen je ein Stück. Src: eigene Rechnung nach Destatis-Methode | „+118 € brutto im Monat“ | `wk("v8_1_1","Arbeitest")` · 1:00 | 9 s |
| 1.4 | Häkchen „echtes Plus“ (minze) auf dem Lohnzettel. Schnitt bei `wk("v8_1_2","Nina")`: Nina mit eigenem Lohnzettel, ihr Stundenlohn-Balken liegt über der Linie „14,60 €“ | „Nina: ändert sich nichts“ | `wk("v8_1_1","Aber")` · 1:09 | 8 s |
| 1.5 | Zweite Du-Figur, ihr Balken knapp über der Linie. Die Linie steigt und schiebt sich über ihren Lohn, Ausrufezeichen (amber). **Groschen** springt links neben der Linie hoch (`schreck`, x≈300, y≈420, size 160) – **Re-Hook** | „Knapp darüber? Pass auf!“ | `wk("v8_1_2","Aber")` · 1:17 | 4 s |
| 1.6 | Arbeitgeber-Hand (`Suit`-Ärmel) schiebt den Balken wieder über die Linie, Zeile „ab Januar: 14,60 €“. Bei `wk("v8_1_2","Pflicht")` Stempel „Pflicht“ (minze). Bauchbinde „Ausnahmen z. B. Azubis“ (Faktenblatt F5, § 22 MiLoG). Src: MiLoV5 § 1, Stand 04.11.2026 | „Arbeitgeber muss nachbessern“ | `wk("v8_1_2","Rutscht")` · 1:21 | 7 s |
| 1.7 | Minijob-Figur mit Tablett (neutrale Mini-Figur, nicht Lena aus V7). Bei `wk("v8_1_3","zehn")` Formel klein „10 h/Woche × Mindestlohn“, Stempel „Gesetz“ (minze, Kopplung im Gesetz). Src: § 8 Abs. 1a SGB IV, Stand 04.11.2026 | „10 h × Mindestlohn“ | `wk("v8_1_3","Und")` · 1:28 | 7 s |
| 1.8 | Treppe „603 €“ → „633 €“ (`StepRamp`), Stufe steigt bei `wk("v8_1_3","sechshundertdreiunddreißig")`. Bei `wk("v8_1_3","dreißig")` „+30 €“ (minze) über der Minijob-Figur, Uhr bleibt gleich. Src: § 8 Abs. 1a SGB IV, Stand 04.11.2026 | „633 € · +30 €“ | `wk("v8_1_3","Darum")` · 1:35 | 10 s |
| 1.9 | Tipp-Kachel „Das kannst du tun“ (minze, wiederkehrend). Lohnzettel „Januar“ mit Lupe (`Mag`), bei `wk("v8_1_4","Stundenlohn")` Zeile „Stundenlohn“ eingekreist, Kalender-Pill „Februar“ | „Februar: Stundenlohn prüfen“ | `wk("v8_1_4","Was")` · 1:44 | 9 s |
| 1.10 | **Groschen** hüpft auf dem Lohnzettel (`triumph`, x≈1500, y≈520, size 190) – **Kapitel-Payoff**. Bei `wk("v8_1_4","teurer")` Pfeil nach unten, Farbwechsel des ganzen Bildes ins Amber, Groschen wechselt zu `schreck` – **Re-Hook** | „Ab jetzt: teurer“ | `wk("v8_1_4","=Das")` · 1:54 | 4 s |

## Kapitel 2 – Deutschlandticket: 66,80 € per Formel (1:58–2:46, 125 W.)
**Shot-Plan:** Bahnsteig und Zugfenster, kühles Blau; Kamera gleitet seitlich von links nach rechts wie ein einfahrender Zug, Ticket-Close-ups in Schräglage (Ticket-Baustein aus S18).

| # | Bild | Text im Bild | Wort-Anker · Start (ca.) | Dauer |
|---|---|---|---|---|
| 2.1 | Ninas Ticketkarte groß im Zugfenster, Preisschild „63,00 €“ klappt bei `wk("v8_2_0","sechsundsechzig")` auf „66,80 €“ (amber). Stempel „festgelegt“ (minze). Src: Bayer. Verkehrsministerium (VMK-Vorsitz), 30.09.2026 | „66,80 € statt 63 €“ | `wk("v8_2_0","Ninas")` · 1:58 | 7 s |
| 2.2 | „+3,80 €/Monat“ stapelt sich zu zwölf Münzen, Summe „+45,60 € im Jahr“ (amber). Bei `wk("v8_2_1","Neu")` Fragezeichen über dem Preisschild. Src: Bayer. Verkehrsministerium, 30.09.2026 | „+45,60 € im Jahr“ | `wk("v8_2_0","sind")` · 2:05 | 7 s |
| 2.3 | Verhandlungstisch (`Table`) mit stilisierten Namensschildern „Bund“ / „Länder“ verblasst. Bei `wk("v8_2_1","Jetzt")` tritt eine Rechenmaschine an seine Stelle, drei Zahnräder „Personal“, „Energie“, „allgemeine Kosten“ greifen ineinander (Gear aus S18) | „Formel statt Verhandlung“ | `wk("v8_2_1","Bisher")` · 2:11 | 8 s |
| 2.4 | Pill „2027: erstes Formel-Jahr“ auf der Maschine. Bei `wk("v8_2_2","Seiten")` Waage (`Scale`) fährt ein, linke Schale „planbar“ (minze) senkt sich bei `wk("v8_2_2","planbarer")` | „Planbar, ohne Streit“ | `wk("v8_2_1","Zweitausendsiebenundzwanzig")` · 2:19 | 9 s |
| 2.5 | Rechte Schale: Treppe nach oben „jedes Jahr neu“ (amber), Waage kippt zurück ins Gleichgewicht – „zwei Seiten“ | „Jedes Jahr neu?“ | `wk("v8_2_2","Aber")` · 2:28 | 5 s |
| 2.6 | Tipp-Kachel. Nina vor der Bürotür, Sprechblase an den Arbeitgeber (`Suit`) „Jobticket?“ | „Frag nach dem Jobticket“ | `wk("v8_2_3","Was")` · 2:34 | 6 s |
| 2.7 | Zweite Karte „Jobticket 63,46 €“ legt sich neben Ninas Karte, Arbeitgeber-Hand legt eine Münze dazu. **Groschen** sitzt auf der Kartenkante (`triumph`, x≈1450, y≈380, size 170) – **Kapitel-Payoff**. Src: Bayer. Verkehrsministerium, 30.09.2026 | „Jobticket: 63,46 €“ | `wk("v8_2_3","Es")` · 2:39 | 7 s |

## Kapitel 3 – Tanken: Rabatt weg, CO2-Preis bleibt (2:46–4:09, 212 W.)
**Shot-Plan:** Nacht-Tankstelle in leichter Untersicht, Neon-Dach, langsamer Dolly-in auf die Zapfsäule; Datengrafik erscheint auf dem Display selbst (kein Hintergrundwechsel). Dunkelstes Kapitel, Amber-Licht der Säule als Hauptlicht.

| # | Bild | Text im Bild | Wort-Anker · Start (ca.) | Dauer |
|---|---|---|---|---|
| 3.1 | Szenenwechsel Nacht, Tankstelle. Tom an der Zapfsäule (Pump aus S15), Anzeige-Display. **Groschen** hängt mit der Lupe am Display (`lupe`, x≈1250, y≈360, size 160) – **Re-Hook**. Bei `wk("v8_3_0","einunddreißigsten")` Kalenderblatt „31.12.“ mit roter Ecke | „Tankrabatt endet 31.12.“ | `wk("v8_3_0","Jetzt")` · 2:46 | 9 s |
| 3.2 | Literpreis-Anzeige (Meter aus S15), ein Block „−14,04 ct Steuer“ fällt heraus, bei `wk("v8_3_1","Mehrwertsteuer")` wächst er mit Aufschlag zu „−17 ct“. Src: § 68 EnergieStG; Wiss. Dienste Bundestag, 19.10.2026 | „rund 17 ct pro Liter“ | `wk("v8_3_1","Seit")` · 2:55 | 9 s |
| 3.3 | Gesetzbuch „§ 68“ (Book aus S15), Stempel „Gesetz“ (minze), Zeitleiste „1.10.–31.12.2026“ läuft ab. Bei `wk("v8_3_1","Verlängerung")` Pill „Verlängerung: nicht beschlossen“ (grau). Src: § 68 EnergieStG | „Nur bis Jahresende“ | `wk("v8_3_1","So")` · 3:04 | 6 s |
| 3.4 | Kanister-Stapel „1.000 l im Jahr“, bei `wk("v8_3_2","hundertsiebenundsechzig")` daneben „+167 €“ (amber). Bei `wk("v8_3_2","Tankstellen")` kleiner Hinweis „wenn voll weitergegeben“. Src: eigene Rechnung | „+167 € bei 1.000 l“ | `wk("v8_3_2","Rechnen")` · 3:10 | 9 s |
| 3.5 | Tortenstück (`Donut`): „rund 4/5 kamen an“, Etikett „Frühjahr“. Src: Wiss. Dienste Bundestag, Aktueller Begriff 14/26, 19.10.2026 | „rund 4/5 kamen an“ | `wk("v8_3_2","weitergeben")` · 3:19 | 9 s |
| 3.6 | **Wendung:** Thermometer (`Thermo`) „CO2-Preis“ steigt an – und bleibt bei `wk("v8_3_3","soll")` stehen, Häkchen (minze). **Groschen** atmet auf (`triumph`, klein, x≈420, y≈420, size 150) – **Re-Hook** | „CO2-Preis: soll nicht steigen“ | `wk("v8_3_3","Die")` · 3:28 | 4 s |
| 3.7 | Thermometer-Skala „55–65 €/t“ für 2027, Stempel „nur Bundestag“ (blau, Unterzeile „Bundesrat offen“). Neutrales Gebäude (`Building dome`). Src: Deutscher Bundestag, 15.10.2026, Drs. 21/8626 | „55–65 €/t auch 2027“ | `wk("v8_3_3","Bundestag")` · 3:33 | 7 s |
| 3.8 | Drei Icons: Zapfpistole, Heizöltank, Gasflamme, je ein Häkchen. Bei `wk("v8_3_3","Fertig")` Kalenderblatt „20. Nov.“ + Gebäude „Bundesrat“, Pill „noch nicht verkündet“ (blau) | „Bundesrat: 20. November“ | `wk("v8_3_3","gilt")` · 3:40 | 10 s |
| 3.9 | Deckel (Lid aus S15) schwebt gestrichelt über der Zapfsäule, Stempel „angekündigt“ (grau). Bei `wk("v8_3_4","Wie")` großes Fragezeichen „Wie?“ | „Spritpreisdeckel: nur angekündigt“ | `wk("v8_3_4","Und")` · 3:49 | 9 s |
| 3.10 | Leere Akte „Gesetzentwurf“ mit Strich statt Inhalt, Lupe findet nichts. Bei `wk("v8_3_4","Was")` Tipp-Kachel | „Noch kein Entwurf“ | `wk("v8_3_4","Einen")` · 3:59 | 5 s |
| 3.11 | Handy (`Phone`) mit Preisvergleich-Liste (ohne App-Logo), günstigste Zeile leuchtet minze. **Groschen** scrollt mit der Lupe mit (`lupe`, x≈1300, y≈560, size 160) – **Kapitel-Payoff** | „Erst vergleichen, dann tanken“ | `wk("v8_3_4","Vergleich")` · 4:04 | 5 s |

## Kapitel 4 – Tabak: die erste von vier Stufen (4:09–5:10, 157 W.)
**Shot-Plan:** Toms Tisch spätabends, Makro-Nahaufnahmen mit angedeuteter Tiefenunschärfe (Hintergrund weich), warmes Amber-Licht, langsamer Push-in; einmal ein Top-down-Aufzieher für das 365er-Mosaik.

| # | Bild | Text im Bild | Wort-Anker · Start (ca.) | Dauer |
|---|---|---|---|---|
| 4.1 | Toms Jackentasche, eine neutrale unbedruckte Schachtel (keine Marke). **Groschen** auf der Tischkante (`schreck`, x≈1500, y≈700, size 170) – **Re-Hook** | „Doppelt teurer“ | `wk("v8_4_0","Tom")` · 4:09 | 4 s |
| 4.2 | Treppe mit vier Stufen „2027 · 2028 · 2029 · 2030“, bei `wk("v8_4_0","zweitausenddreißig")` leuchtet die letzte. Bei `wk("v8_4_0","Gesetz")` Stempel „Gesetz“ (minze). Src: BT-Drs. 21/8605; Bundestag 15.10., Bundesrat 16.10.2026 | „4 Stufen bis 2030“ | `wk("v8_4_0","Denn")` · 4:13 | 7 s |
| 4.3 | Eine Zigarette (Makro), Münzstapel daneben wächst um „+2,06 ct“. Bei `wk("v8_4_1","zwanzig")` zwanzig Stück reihen sich auf → „+41 ct pro Schachtel“ (amber). Src: Drs. 21/8605 S. 5; Zoll (Satz 2026) | „+41 ct pro Schachtel“ | `wk("v8_4_1","Allein")` · 4:20 | 10 s |
| 4.4 | Zusatzblock „+ Anteil vom Preis“ schiebt sich an. Bei `wk("v8_4_2","Eine")` Top-down-Aufzieher: Kalender mit 365 Schachteln als Mosaik, Summe „mind. ≈ 150 € im Jahr“ (amber). Src: Drs. 21/8605 S. 5; eigene Rechnung | „mind. ≈ 150 € im Jahr“ | `wk("v8_4_1","zweiter")` · 4:30 | 9 s |
| 4.5 | Hinweis „wenn weitergegeben“. Bei `wk("v8_4_2","erste")` Treppe aus 4.2 kehrt zurück, nur Stufe 1 leuchtet | „Erst Stufe 1 von 4“ | `wk("v8_4_2","wenn")` · 4:39 | 7 s |
| 4.6 | Waage (`Scale`): links Kassenbuch „Haushalt“ (größer, zuerst), bei `wk("v8_4_3","Gesundheit")` rechts Herz „Gesundheit“. Src: BT-Drs. 21/8605 (Begründung) | „Haushalt · Gesundheit“ | `wk("v8_4_3","Warum")` · 4:45 | 8 s |
| 4.7 | Stilisierte Abstimmungstafel, zwei Spalten ohne Wertung: „dafür: Union, SPD“ / „dagegen: AfD, Grüne, Linke“, gleiche Schriftgröße, neutrale Farbe (blau) | „Union, SPD · AfD, Grüne, Linke“ | `wk("v8_4_3","Beschlossen")` · 4:53 | 6 s |
| 4.8 | Tipp-Kachel. Tom legt die Schachtel auf den Tisch, Taschenrechner (`Calc`) daneben „150 € · 2027“, bei `wk("v8_4_4","danach")` Pfeil nach oben „danach mehr“ | „150 €, danach mehr“ | `wk("v8_4_4","Was")` · 4:59 | 5 s |
| 4.9 | Rechner-Display bleibt stehen, **Groschen** hält die Lupe auf die „150“ (`lupe`, x≈1350, y≈420, size 160) – **Kapitel-Payoff**. Keine Wertung, kein Rauch-Bild | „Deine Zahl: 150 €“ | `wk("v8_4_4","=Und")` · 5:05 | 5 s |

## Kapitel 5 – Apotheke und Krankenhaus: Zuzahlungen (5:10–6:19, 178 W.)
**Shot-Plan:** Apotheke tagsüber, hellstes Kapitel: Tresen frontal in Augenhöhe (Counter aus S12), Kassenzettel-Inserts als Close-ups; Krankenhaus als Split-Screen-Insert. Kamera ruhig, Schnitte statt Fahrten.

| # | Bild | Text im Bild | Wort-Anker · Start (ca.) | Dauer |
|---|---|---|---|---|
| 5.1 | Anzeigetafel „Halbzeit“, Bilanz: ein Plus (minze), drei Minus (amber). Bei `wk("v8_5_0","Apotheke")` Szenenwechsel Apothekentresen. **Groschen** auf dem Tresen (`schreck`, x≈1550, y≈640, size 170) – **Re-Hook** | „Halbzeit: 1 Plus, 3 Minus“ | `wk("v8_5_0","Halbzeit")` · 5:10 | 8 s |
| 5.2 | Nina am Tresen, Tablettenpackung (Pack aus S12), Kassenzettel „Zuzahlung 5,00 €“ → bei `wk("v8_5_1","sieben")` „7,50 €“ (amber). Stempel „Gesetz“ (minze). Src: BGBl. 2026 I Nr. 228, § 61 SGB V n. F. | „Zuzahlung: 7,50 € statt 5 €“ | `wk("v8_5_1","Nina")` · 5:18 | 9 s |
| 5.3 | Regel als drei Kacheln nacheinander: „10 %“, „mind. 7,50 €“, „max. 15 €“. Src: BGBl. 2026 I Nr. 228, § 61 SGB V n. F. | „10 %, mind. 7,50, max. 15“ | `wk("v8_5_1","Regel")` · 5:27 | 6 s |
| 5.4 | Kleine Packung „billiger als 7,50 €? → nur der Preis“. Bei `wk("v8_5_2","Zwölf")` zwölf Packungen im Regal, Summe „+30 € im Jahr“ (amber) | „12 Packungen: +30 €“ | `wk("v8_5_1","Kostet")` · 5:33 | 7 s |
| 5.5 | Split-Screen: Krankenhausbett (`Bed`), Tageskalender „10 € → 15 € pro Tag“, bei `wk("v8_5_2","=fünf")` fünf Tage markiert, „5 Tage: +25 €“. Src: BGBl. 2026 I Nr. 228 | „Klinik: 15 € pro Tag“ | `wk("v8_5_2","liegst")` · 5:40 | 7 s |
| 5.6 | Bundestag (neutrales Gebäude), Stempel „Sparpaket Krankenkassen, Juli 2026“. Src: Bundestag, Beschlussempfehlung Drs. 21/7016 | „Sparpaket, Juli 2026“ | `wk("v8_5_3","=Das")` · 5:48 | 6 s |
| 5.7 | Kalenderblatt „2004“ vergilbt, Preisschild darauf unverändert. Bei `wk("v8_5_3","Wer")` Nina mit hohem Packungsstapel | „Seit 2004 fast gleich“ | `wk("v8_5_3","Begründung")` · 5:54 | 7 s |
| 5.8 | Tipp-Kachel. Schuhkarton mit Quittungen (Box aus S12), Deckel „2 %“. Src: § 62 SGB V | „Quittungen aufheben“ | `wk("v8_5_4","Was")` · 6:00 | 9 s |
| 5.9 | Deckel ergänzt „chronisch 1 %“, Bauchbinde „chronisch: Bedingungen beachten“ (Faktenblatt F29). Bei `wk("v8_5_4","darüber")` Pfeil vom Karton zum Formular „Antrag“ → Krankenkasse (neutrales Gebäude). Src: § 62 SGB V | „Mehr gezahlt? Zurückholen“ | `wk("v8_5_4","chronischen")` · 6:09 | 7 s |
| 5.10 | Formular „Befreiung“ (`Form`) bekommt Häkchen. **Groschen** hüpft daneben (`triumph`, x≈1450, y≈600, size 170) – **Kapitel-Payoff** | „Oder: Befreiung“ | `wk("v8_5_4","Oder")` · 6:16 | 4 s |

## Kapitel 6 – Kindergeld und Grundfreibetrag: Plus mit Sternchen (6:19–7:25, 168 W.)
**Shot-Plan:** Emils Kinderzimmer/Schreibtisch in leichter Untersicht auf Kinderhöhe; alles „Entwurf“ mit gestrichelten Konturen und Amber-Sternchen. Zeitstrahl als einzige Seitwärtsfahrt des Kapitels.

| # | Bild | Text im Bild | Wort-Anker · Start (ca.) | Dauer |
|---|---|---|---|---|
| 6.1 | Emil mit Schulranzen (Kid), über ihm ein großes Plus mit Sternchen „*“. Bei `wk("v8_6_0","beschlossen")` Stempel „Entwurf“ (amber, groß). **Groschen** hält die Lupe aufs Sternchen (`lupe`, x≈1450, y≈330, size 160) – **Re-Hook** | „Plus mit Sternchen*“ | `wk("v8_6_0","Jetzt")` · 6:19 | 8 s |
| 6.2 | Sparschwein „259 €“ → bei `wk("v8_6_1","zweihundertsiebenundsechzig")` „267 €“, gestrichelt, Stempel „Entwurf“ (amber). Bei `wk("v8_6_1","acht")` Rechnung „+8 € pro Kind/Monat = +96 €/Jahr“, zwölf kleine Münzen fallen ins Schwein. Src: Bundestag, Drs. 21/8235, 1. Lesung 08.10.2026 | „Geplant: 267 € statt 259 €“ | `wk("v8_6_1","Gesetzentwurf")` · 6:27 | 10 s |
| 6.3 | Treppe „Einkommen“, untere Stufe „steuerfrei bis 12.348 €“ → bei `wk("v8_6_2","zwölftausendfünfhundertvierundsechzig")` „12.564 €“ (+216 €), Stempel „Entwurf“ (amber). Src: Drs. 21/8235 | „steuerfrei bis 12.564 €*“ | `wk("v8_6_2","Auch")` · 6:37 | 8 s |
| 6.4 | Taschenrechner mit Fragezeichen „Ersparnis: hängt am Tarif“, Tarifkurve nur als gestrichelte Linie (keine Zahl) | „Ersparnis: hängt am Tarif“ | `wk("v8_6_2","Wie")` · 6:45 | 6 s |
| 6.5 | Seitwärtsfahrt Zeitstrahl: „8.10. erste Lesung“ (Haken) → bei `wk("v8_6_3","Anfang")` „Anfang Nov. Anhörung“ (Haken) → „Beschluss Bundestag ?“ → „Bundesrat ?“. Src: Bundestag, 2026 | „Lesung und Anhörung: erledigt“ | `wk("v8_6_3","Wo")` · 6:51 | 9 s |
| 6.6 | Zwei Sprechblasen gleich groß: links „Regierung“ – „über 10 Mrd. € Entlastung“; bei `wk("v8_6_3","Grünen")` rechts „Grüne (Antragstitel)“ – „Kindergeld stärken, Entlastungsschere schließen“ (wörtlich, Pill „Antragstitel“). **Groschen** schaut neutral von Blase zu Blase (`neutral`, Pupillen wandern, x≈960, y≈760, size 150) – **Re-Hook**. Src: Bundestag, 2026 | „Regierung · Grüne“ | `wk("v8_6_3","Regierung")` · 7:00 | 8 s |
| 6.7 | Zeitstrahl-Ende: „Beschluss Bundestag ?“ und „Bundesrat ?“ blinken amber | „Beschlossen: noch nichts“ | `wk("v8_6_3","Beschlossen")` · 7:08 | 4 s |
| 6.8 | Tipp-Kachel. Kontoauszug „Kindergeld“ mit Lupe, Stempel „Januar prüfen“ (minze) | „Januar: Kontoauszug prüfen“ | `wk("v8_6_4","Was")` · 7:12 | 6 s |
| 6.9 | Hinweis-Pfeil nach unten auf „Beschreibung: aktueller Stand“. **Groschen** zeigt mit dem Ärmchen auf den Pfeil (`neutral`, x≈1500, y≈600, size 160) – **Kapitel-Payoff** | „Stand: in der Beschreibung“ | `wk("v8_6_4","=Und")` · 7:18 | 7 s |

## Kapitel 7 – Krankenkasse ohne Brief + Schluss (7:25–9:42, 353 W.)
**Shot-Plan:** Hausflur mit Briefkästen in Over-Shoulder-Perspektive (Du-Figur von hinten), Laptop-Screen-Inserts und Kalender-Close-ups; Finale zurück am Küchentisch Top-down (Klammer zu Kap. 0), dann Endkarte. Kamera leicht schwebend (Handheld-Noise ≤ 3 px).

| # | Bild | Text im Bild | Wort-Anker · Start (ca.) | Dauer |
|---|---|---|---|---|
| 7.1 | **Payoff der großen Schleife:** die verdeckte siebte Karte aus 0.5/0.6 dreht sich um: Versichertenkarte (neutral, ohne Kassenlogo), daneben leerer Briefkasten. **Groschen** springt hoch (`schreck`, x≈1450, y≈420, size 180) | „Karte 7: Krankenkasse“ | `wk("v8_7_0","Und")` · 7:25 | 6 s |
| 7.2 | Balken „Ø 2,9 %“ für 2027, bei `wk("v8_7_1","festgelegt")` Stempel „festgelegt“ (minze). Src: BMG-Pressemitteilung 30.10.2026 | „Ø 2,9 % bleibt“ | `wk("v8_7_1","Der")` · 7:31 | 7 s |
| 7.3 | Stilisierter Minister (`NamedBust`, Namensschild „C. Linnemann, Bundesgesundheitsminister“), Zitat-Tafel (`Quote`) mit beiden gesprochenen Sätzen wörtlich, Pill „ZITAT“: „Der durchschnittliche Zusatzbeitragssatz ist in den vergangenen Jahren immer weiter gestiegen. Diese Entwicklung haben wir jetzt gestoppt.“ Src: BMG-Pressemitteilung 30.10.2026 | „Minister, wörtlich“ | `wk("v8_7_1","Minister")` · 7:38 | 8 s |
| 7.4 | Ø-Balken bekommt Etikett „Richtwert“, daneben viele unterschiedlich hohe Balken (`BarV`), einer leuchtet „deine Kasse?“. Bei `wk("v8_7_1","erhöhen")` dieser Balken wächst (amber) | „Deine Kasse? Eigener Beitrag“ | `wk("v8_7_1","Aber")` · 7:46 | 7 s |
| 7.5 | Hausflur: Briefträger geht am Briefkasten vorbei. Stempel „Gesetz seit 30.07.2026“ (minze). **Groschen** auf dem Briefkasten (`kopfschuetteln`, x≈1350, y≈380, size 170) – **Re-Hook** „Haken“. Src: GKV-Beitragssatzstabilisierungsgesetz, BGBl. 2026 I Nr. 228; § 175 SGB V | „Kein Brief mehr Pflicht“ | `wk("v8_7_2","Und")` · 7:53 | 8 s |
| 7.6 | Lohnzettel, neue Zeile „Zusatzbeitrag“ erscheint ohne Vorwarnung (amber), Lupe darauf. Bei `wk("v8_7_2","Union")` legen sich Brief + Kundenkonto-Symbol (beide gestrichelt) daneben, Stempel „Rückkehr geplant“ (blau). Src: Ausschussdrs. 21(14)107 | „Lohnzettel statt Brief?“ | `wk("v8_7_2","=Du")` · 8:01 | 10 s |
| 7.7 | Kalender-Pill „Januar?“ (blau). Bei `wk("v8_7_2","Verlass")` Laptop mit Kassen-Website (neutral), kleine Zeile „Zusatzbeitrag 2027“ | „Verlass dich nicht auf Post“ | `wk("v8_7_2","Beschlossen")` · 8:11 | 7 s |
| 7.8 | Lohnzettel „3.000 € brutto“, Regler „+0,3 Punkte“, bei `wk("v8_7_3","Hälfte")` geteilt durch zwei (Arbeitgeber trägt die Hälfte). Kleine Fußzeile „Beispiel“. Src: eigene Rechnung | „+0,3 Punkte, die Hälfte du“ | `wk("v8_7_3","Ein")` · 8:18 | 8 s |
| 7.9 | Ergebnis „−4,50 €/Monat · −54 €/Jahr“ (amber), Fußzeile „Beispiel“. Src: eigene Rechnung | „−4,50 € im Monat“ | `wk("v8_7_3","=Das")` · 8:26 | 5 s |
| 7.10 | Balkenreihe der Kassen, Abstand günstigste ↔ teuerste nur als Doppelpfeil „Vergleich lohnt sich“ (keine Zahl bis zur Prüfung der GKV-Liste). Src: GKV-Spitzenverband, Krankenkassenliste | „Vergleich lohnt sich“ | `wk("v8_7_3","zwischen")` · 8:31 | 6 s |
| 7.11 | Tipp-Kachel. Kalender Januar (Monatsblatt), Laptop „Zusatzbeitrag 2027“. Bei `wk("v8_7_4","Erhöht")` Weg 1: „Erhöhung → Sonderkündigung bis Monatsende“ | „Januar: selbst nachschauen“ | `wk("v8_7_4","Was")` · 8:37 | 9 s |
| 7.12 | Kalender: bei `wk("v8_7_4","einunddreißigsten")` „31.“ minze eingekreist (SFX `ding`) | „Kündigen bis 31. Januar“ | `wk("v8_7_4","kündigen")` · 8:46 | 8 s |
| 7.13 | Weg 2: „12 Monate dabei → jederzeit wechseln (wirksam nach 2 Monaten)“. Bei `wk("v8_7_4","neue")` neue Kasse (neutrales Gebäude) schickt die Kündigung selbst los (`Letter` fliegt). **Groschen** winkt dem Brief nach (`triumph`, x≈1500, y≈640, size 170) – **Kapitel-Payoff** | „Neue Kasse kündigt für dich“ | `wk("v8_7_4","Bist")` · 8:54 | 7 s |
| 7.14 | Zurück zum Küchentisch, Top-down wie Frame 0. Nina und Tom vor einer Liste: bei `wk("v8_7_5","Lohn")` Zeile „Lohn“ (minze), bei `wk("v8_7_5","Kindergeld")` Zeile „Kindergeld*“ (minze, mit Sternchen) | „2× Plus“ | `wk("v8_7_5","Nina")` · 9:01 | 7 s |
| 7.15 | Fünf Zeilen amber: Ticket, Tanken, Tabak, Apotheke, Kasse. Bei `wk("v8_7_5","Hebel")` leuchten vier Hebel auf: Jobticket, Zapfsäule mit Preisliste, Quittungen, Kassenliste | „5× teurer, 4 Hebel“ | `wk("v8_7_5","Dazu")` · 9:08 | 9 s |
| 7.16 | **Kernsatz.** Die vier Hebel rücken in die Mitte. **Groschen** landet in der Mitte der Liste (`triumph`, x≈960, y≈760, size 200) – **Re-Hook/Gesamt-Payoff** | „Wie teuer? Du entscheidest mit“ | `wk("v8_7_5","Januar")` · 9:18 | 4 s |
| 7.17 | Die sieben Karten liegen offen nebeneinander, Frage „Welche trifft dich am meisten?“, Kommentar-Symbol pulsiert | „Welche trifft dich?“ | `wk("v8_7_6","Welche")` · 9:22 | 5 s |
| 7.18 | Nina zeigt nach links auf den Endkarten-Platz, Kachel „Minijob 2027“ (Video 7) fährt groß links ein | „Minijob? Hier weiter“ | `wk("v8_7_7","Und")` · 9:27 | 7 s |
| 7.19 | Endkarte steht: Video 7 „Minijob 2027“ groß links mit Pfeil, Abo-Button klein rechts (YouTube-Endscreen-Elemente darüberlegen; Fläche bis Videoende frei halten) | „Nächstes Video →“ | `wk("v8_7_7","Dort")` · 9:34 | 7 s |
| 7.20 | Abschlusszeile + Endbild: **Groschen** fällt (`GroschenEnd`, Klick-Kling) neben „Groschenfall.“, darunter „Geld, endlich klar.“ – oben links, Endkarten-Kacheln bleiben frei. Danach ca. 12 s Endkarten-Fläche (Musik läuft aus) | „Groschenfall. Geld, endlich klar.“ | `wk("v8_7_8","Groschenfall")` · 9:41 | 2 s + 12 s Endkarte |

---

## Prüfpunkte vor dem Rendern
- **Anker-Fallen (bewusst gesetzt):** 5.5-Beat `"=fünf"` (sonst Treffer „fünfzehn“ im selben Satz). 0.2/4.9/6.9 `"=Und"` treffen „Und beim Tanken“, „Und falls“, „Und wenn“ (jeweils erstes „Und“ im Absatz). 0.6 Anker `"einer"` statt „Und“ (in `v8_0_2` steht vorher „und sagen“, `"=Und"` träfe das). 7.16 Anker `"Januar"` statt „Der“ (erster „der“-Treffer in `v8_7_5` ist „der Zapfsäule“). 1.10/5.6/7.9 `"=Das"` (exakt, keine Präfix-Treffer wie „davon“). 7.6 `"=Du"`. 3.8 `"gilt"` (erster Treffer „Das gilt fürs Tanken“). 7.11-Beat `"Erhöht"` trifft nur „Erhöht sie“, nicht „Erhöhung“. 7.12 `"kündigen"` trifft nicht „Kündigung“. 1.8-Beat `"dreißig"` trifft nicht „sechshundertdreiunddreißig“ (Wortanfang).
- **Skript-Bildzeile vs. Sprechtext:** Kap. 0 verlangt Zoom „bei Zapfsäule“ – das Wort kommt in `v8_0_0` nicht vor; Zoom auf die Zapfpistole liegt auf „Und beim Tanken“ (0.2).
- **6.2** startet auf `"Gesetzentwurf"` (Wort 2 von `v8_6_1`), damit 6.2 ≤ 10 s bleibt; 6.1 hält über „Laut“.
- **Kontaktbogen:** Frame 0, 0,5 s (Groschen gelandet), 1 s, 2 s (Stumm-Test G2) + jeder Szenenanfang. Prüfen: Frame 0 hell, drei Beträge + „Ab 1. Januar“ in 1 s lesbar, Groschen verdeckt keinen Betrag.
- **Quellenzeilen (gesamt):** MiLoV5 § 1 (Stand 04.11.2026) · § 8 Abs. 1a SGB IV · Destatis-Methode (eigene Rechnung) · Bayer. Verkehrsministerium (VMK-Vorsitz) 30.09.2026 · § 68 EnergieStG · Wiss. Dienste Bundestag, Aktueller Begriff 14/26, 19.10.2026 · Bundestag 15.10.2026 Drs. 21/8626 · BT-Drs. 21/8605 (S. 5) · Zoll (Satz 2026) · BGBl. 2026 I Nr. 228 · § 61/§ 62/§ 175 SGB V · Drs. 21/7016 · Drs. 21/8235 · BMG-Pressemitteilung 30.10.2026 · Ausschussdrs. 21(14)107 · GKV-Spitzenverband Krankenkassenliste.
- **Samstags-Prüfung (Skript „Wenn sich bis Samstag etwas ändert“):** Einkommensteuerreformgesetz beschlossen → 6.1–6.8 Stempel „Entwurf“ tauschen, 7.14 Sternchen; Spritpreisdeckel-Entwurf → 3.9/3.10; Tankrabatt verlängert → 0.1/0.2, 3.2–3.5, Bilanz 5.1; CO2/BEHG verkündet → 3.7/3.8 Stempel „Gesetz“; Brief-Pflicht beschlossen → 7.6 Stempel.

## Offene Punkte für Bild-Kritiker
1. **Szenenzahl 82 statt ~55–65.** Bei 9:43 Sprechzeit und max. 10 s pro Szene sind mindestens 59 Szenen nötig – nur machbar, wenn fast jede Szene 9–10 s dauert. Die Absätze bestehen aus kurzen Pointe-Sätzen („Das ist kein Plan.“, „Kein Brief.“), an denen das Bild wechseln muss; Ø ergibt sich 7,1 s (V7: 80 Szenen bei 9:19). Falls weniger Schnitte gewünscht: Zusammenlegen von 0.3+0.4, 1.4+1.5, 2.5+2.6, 3.10+3.11, 4.7+4.8, 5.9+5.10, 6.6+6.7, 7.15+7.16 (je 10–13 s, verletzt dann die 3–10-s-Regel) → Entscheidung Kritiker.
2. **T8A-Einzeiler als Template-Abweichung:** Haupt-Thumbnail T8A („AB JANUAR“ / „Teurer?“, ein Wort ≈ 190 px) bricht die T5D-Regel „zweizeilige Headline“. Prüfen: Mobil-Check 168×94, Schwarz-Weiß-Test, ob „Teurer?“ mit dem Video ehrlich bleibt (2 Plus, 5 Kosten, Fragezeichen wird aufgelöst). Groschen ist jetzt abgenommen → T8A-Variante mit Groschen (`schreck`) statt Tom verwenden.
3. **Bauchbinde „Ausnahmen z. B. Azubis“** (1.6, `v8_1_2`, Faktenblatt F5): Position unten links kollidiert mit `Src` – Bauchbinde oben links oder Src kurz ausblenden; Dauer ≥ 4 s; § 22 MiLoG (Azubis, Minderjährige ohne Berufsabschluss, Langzeitarbeitslose erste 6 Monate) noch kurz prüfen.
4. **Bauchbinde „chronisch: Bedingungen beachten“** (5.9, `v8_5_4`, Faktenblatt F29): reicht der Einzeiler für die Ausnahme „nach 1.4.1972 Geborene ohne Vorsorge → 2 %“? Gleiche Kollisionsfrage mit `Src`.
5. **Frame 0 Wortzahl:** Overlay „Ab 1. Januar“ (3 Wörter) + drei Betragsschilder („+3,80 €“, „+0,70 €/h“, „−17 ct Rabatt“) – vom Skript so festgelegt; Glance-Test, ob das noch als ≤ 5 Wörter gilt (Beträge als Zahlen). Stempel auf Ticket/Lohnzettel erst ab ca. 2 s.
6. **`GroschenEnd` ist auf 1080 px Breite gebaut** (x = 540, cy = 1060). Für 1920×1080 eine Kopie `GroschenEnd16` in kit8 (oder `transform` um das Original), Original nicht ändern (G8). Endbild oben links, Endscreen-Flächen frei.
7. **3.6 Groschen `triumph` beim CO2-Preis**, obwohl nur Bundestag beschlossen – zu positiv? Alternative `neutral`.
8. **6.6 Regierung vs. Grüne:** beide Sprechblasen gleich groß, Groschen `neutral` (kein `augenrollen`/`kopfschuetteln`, Fairness). Blasen-Texte > 5 Wörter als Zitat-Ausnahme (wie 7.3 Minister-Zitat). 4.7 Abstimmungstafel: genau 5 Wörter, ohne Farbwertung.
9. **1.7 Minijob-Figur:** neutrale Mini-Figur statt Lena aus V7 – oder Lena bewusst als Brücke zur Endkarte („Minijob 2027“)? Entscheidung.
10. **Tom raucht (Kap. 4):** kein Rauch, keine Glut, keine Marke; Schachtel unbedruckt. Payoff 4.9 nur Zahl, keine Bewertung.
11. **7.10 Kassen-Spanne** bleibt ohne Zahl, bis die GKV-Krankenkassenliste geprüft ist.
12. **Shot-Plan-Varianz (G9):** Top-down Küche (0, 7-Finale) · Schreibtisch frontal statisch (1) · seitliche Zugfahrt (2) · Nacht-Untersicht Dolly (3) · Makro/Amber (4) · helle Theke frontal + Split-Screen (5) · Kinderhöhe, gestrichelt (6) · Over-Shoulder Flur + Laptop-Inserts (7). Bitte prüfen, ob sich Kap. 1 (statisch) und Kap. 5 (frontal) genug unterscheiden.
13. **Re-Hooks** (geschätzt): 0:37 · 1:17 · 1:54 · 2:46 · 3:28 · 4:09 · 5:10 · 6:19 · 7:00 · 7:25 · 7:53 · 9:18 – längste Lücke 7:53 → 9:18 (85 s, knapp unter 90 s); falls die Aufnahme länger wird, 7.12 „Kündigen bis 31. Januar“ als Re-Hook mit Groschen `schreck` ausbauen.

## Neue Bausteine für kit8
`remotion/src/v8/kit8.tsx` re-exportiert kit7 und ergänzt nur. **Wiederverwendet** (kein Neubau): aus **kit7** `mk7`/`wk`, `Scenes7`, `V7Shell` (Kopie als `V8Shell` mit Kapitel-Label), `Head`, `Src`, `Pill`, `LowerThird` („Beispielfigur“), `Du` (Rückenansicht), `Kid` (= Emil, kleiner skaliert), `Suit` (Arbeitgeber), `NamedBust` (Linnemann stilisiert), `Mini`, `Table`, `Clock` (38,8 h), `Paper` + `Row` (Lohnzettel, Kontoauszug, Abstimmungstafel), `Calc`, `Pot`, `Card3` (sieben Karten), `Form` (Antrag/Befreiung), `Building dome` (Bundestag/Bundesrat/Kasse), `Tag`, `Scale` (2.4, 4.6), `Bubble`, `Coins`, `StepRamp` (603 → 633, Einkommenstreppe), `Donut` (4/5), `Letter`, sowie `BarV`, `Mag`, `Check`, `Quote`, `StampT`; aus **kit5** `Thermo` (CO2), `Phone` (Preisvergleich), `Bed`, `Days`; aus **kit/Props** `PriceTag` (`flipAt`), `Stamp`; **Groschen** `Groschen`, `GroschenKling`. Aus Shorts (dort nicht exportiert → **Kopie** nach kit8, Original unverändert): S18 `Ticket`, `Stairs`, `Gear` · S15 `Pump`, `Meter`, `Book`, `Lid`, `Cal` · S12 `Counter`, `Pack`, `Receipt`, `Box` (Quittungskarton), `CalSheet`.

**Neu zu zeichnen (18):**
1. `Nina` – Pflegehelferin (Kasack, Figure-Basis wie Lena)
2. `Tom` – Lagerist (Arbeitsjacke mit Brusttasche für die Schachtel)
3. `KitchenTop` – Küchentisch Top-down mit hellem Lampenkreis (Frame 0, Finale 7.14)
4. `Nozzle` – Zapfpistole mit Anhänger („−17 ct Rabatt“, kann abfallen)
5. `StatusStamp` – Wrapper um `StampT` mit festen Varianten `gesetz | festgelegt | nurBundestag | entwurf | angekuendigt | rueckkehr` (Text + Farbe fix, optional Unterzeile)
6. `DoCard` – Tipp-Kachel „Das kannst du tun“ (minze, 7× wiederkehrend)
7. `CardFan7` – Fächer aus sieben `Card3` mit Icons, siebte verdeckt + Umdreh-Animation (0.5/0.6 → 7.1 → 7.17)
8. `Icon8` – Icon-Satz: Bahn, Auto, Kinderschuh, Heizöltank, Gasflamme, Kommentar, Herz, Kassenbuch, Kundenkonto, Hebel
9. `GasStation` – Nacht-Tankstelle (Dach, Neonkante, Boden-Reflex), nutzt `Pump`
10. `CigPack` – neutrale unbedruckte Schachtel + einzelne Zigarette (ohne Glut)
11. `Mosaic` – Raster aus n Mini-Objekten mit Summenzeile (365 Schachteln, 12 Packungen)
12. `Scoreboard` – Anzeigetafel „Halbzeit“ mit Plus/Minus-Feldern
13. `PiggyBank` – Sparschwein mit Preisschild, Modus `dashed` für Entwurf
14. `Timeline8` – Zeitstrahl mit Stationen (Haken / Fragezeichen blinkend)
15. `Mailbox` – Hausflur-Briefkasten (leer, Klappe) + laufender Briefträger
16. `InsuranceCard` – Versichertenkarte neutral, ohne Kassenlogo
17. `Laptop` – Screen mit Website-Zeile („Zusatzbeitrag 2027“) und Slider-Element (`+0,3 Punkte`)
18. `GroschenEnd16` – Endbild-Kopie für 1920×1080 (siehe Offene Punkte 6)

Klein ohne eigenen Baustein (inline in der Szene): Kanister-Stapel (3.4, `Pot`-Form), Arbeitgeber-Hand mit Münze (`Suit`-Ärmel + `Coins`), Monatskalender Januar (`Days`), Zahnrad-Rechenmaschine (`Gear`).
