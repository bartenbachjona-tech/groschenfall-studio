# Storyboard V7 Minijobs (Langvideo So 01.11.2026, 18:00)
Grundlage: `docs/Video06-Minijobs-Skript.md` (1.432 Wörter inkl. Abschlusszeile, Stand 28.10. nach Kritiker-Runde, Keys `v7_*`). Zeiten = Schätzung bei ~145 Wörtern/min und Tempo 1,06; nach der Stimmaufnahme durch echte Absatzlängen ersetzen. Stil „Nachtblau“ (Navy, Sora, Minze = Lösung/sicher, Bernstein = Kosten/geplant, Blau = neutral/offen, Rot = Problem), Filmkorn, Vignette. Figuren stilisiert, Bauchbinde „Beispielfigur“ beim ersten Auftritt. Keine Logos (Bundesrat/Bundestag/DEHOGA nur als neutrale Gebäude/Dokumente).
**Wort-Anker:** `wk(key, "wort")` = Szene startet bei diesem Wortanfang; `"=wort"` = exakter Treffer (Falle „zwei“/„zweihundert…“). Text im Bild ≤ 5 Wörter, Quellenzeile klein unten links (zählt nicht).
Umsetzung: `src/v7/V7Ch0.tsx … V7Ch7.tsx` nach Muster `src/v5/`.

## Musikplan (`work/v7/music_plan.json`)
| Track | Kapitel | Start (Schätzung) | Stimmung |
|---|---|---|---|
| `music_hook.mp3` | 0–1 | 0 s | Spannung, leichter Puls (Kneipe, Samstagabend) |
| `music_k23.mp3` | 2–3 | 105 s (1:45) | Rechnen, nüchtern-treibend |
| `music_k45.mp3` | 4–5 | 260 s (4:20) | ernster (Sandras Rente), dann Abwägung |
| `music_k67.mp3` | 6–7 | 444 s (7:24) | Auflösung, hell, Payoff Formular |
```json
[["music_hook.mp3", 0], ["music_k23.mp3", 105], ["music_k45.mp3", 260], ["music_k67.mp3", 444]]
```
Startwerte nach Aufnahme = Summe der echten Kapitel-Längen. Ducking/Loudness nach KANAL_REGELN (−27/−21 dB, Lowpass 6 kHz, −14 LUFS), Übergänge Crossfade 1,5 s am Kapitelschnitt. SFX nur „soft“.

---

## Kapitel 0 – Cold Open (0:00–0:42, 107 W.)
| # | Bild | Text im Bild | Wort-Anker | Dauer |
|---|---|---|---|---|
| 0.1 | **Frame 0:** Kneipe Samstagabend, Lena mit Tablett frontal, riesiges amber „633 €“ über ihr, SFX soft | „633 €“ | `wk("v7_0_0","Sechshundertdreiunddreißig")` (Wort 1 ≤ 0,2 s) | 4 s |
| 0.2 | Uhr an der Wand 22:30, Lena läuft zwischen Tischen; Bauchbinde „Lena · Beispielfigur“ | „Samstag, 22:30“ | `wk("v7_0_0","Samstagabend")` | 4 s |
| 0.3 | Lohnzettel neben Lena: 603 → 633, „+30 €“ Minze | „+30 € im Monat“ | `wk("v7_0_0","neue")` | 5 s |
| 0.4 | Schwenk zur Theke: Toni mit Taschenrechner | „Toni · Wirt“ | `wk("v7_0_1","Toni")` | 5 s |
| 0.5 | Rechner-Display „+57 €“ amber, Stempel halb Minze „Gesetz“ / halb amber „Entwurf“ | „+57 € Abgaben“ | `wk("v7_0_1","siebenundfünfzig")` | 7 s |
| 0.6 | Durchs Fenster: Bericht fällt auf Tisch, Nachbarfenster gehen aus | „Minijob abschaffen?“ | `wk("v7_0_2","Hintergrund")` | 5 s |
| 0.7 | Sprechblase „Katastrophe“ (Quelle: Zöllick/DEHOGA, Juni 2026) | „Katastrophe“ | `wk("v7_0_2","Gastronomie")` | 4 s |
| 0.8 | Drei Karten fächern auf + verdeckte vierte | „Sicher · Geplant · Offen“ | `wk("v7_0_3","Drei")` | 9 s |

## Kapitel 1 – Was ein Minijob ist – und wer ihn hat (0:42–1:45, 161 W.)
| # | Bild | Text im Bild | Wort-Anker | Dauer |
|---|---|---|---|---|
| 1.1 | Lohnzettel „Brutto 603 €“ = „Netto 603 €“ | „Brutto = Netto“ | `wk("v7_1_0","Grundregel")` | 9 s |
| 1.2 | Toni füllt Töpfe Rente/KV/Steuer/Umlagen → „≈ 31 %“ | „+ gut 30 %“ | `wk("v7_1_1","Bezahlt")` | 7 s |
| 1.3 | Formular „Befreiung“, Lena unterschreibt | „3,6 % Rente?“ | `wk("v7_1_2","Eigentlich")` | 6 s |
| 1.4 | 5 Figuren, 4 werden grau (Quelle: Minijob-Zentrale II/2026) | „4 von 5“ | `wk("v7_1_2","vier")` | 5 s |
| 1.5 | Formular blinkt, rutscht in eine Schublade „später“ | „Merk dir das!“ | `wk("v7_1_2","Merk")` | 3 s |
| 1.6 | Zahl baut sich aus Figuren auf (Quelle: BA, Juli 2026) | „7,61 Mio.“ | `wk("v7_1_3","sieben")` | 7 s |
| 1.7 | Split: „4,09 Mio. nur Minijob“ / „3,52 Mio. Nebenjob“ | „4,1 Mio. · 3,5 Mio.“ | `wk("v7_1_3","Gut")` | 6 s |
| 1.8 | Streifen 65+ (Quelle: Minijob-Zentrale, Juni 2026) | „über 65: 1,2 Mio.“ | `wk("v7_1_3","älter")` | 5 s |
| 1.9 | Klaus an der Kasse (Beispielfigur) | „Klaus · Rentner“ | `wk("v7_1_4","Klaus")` | 4 s |
| 1.10 | Sandra in der Bäckerei, Kalender 2014→2026 | „12 Jahre Minijob“ | `wk("v7_1_4","Sandra")` | 6 s |
| 1.11 | Zoom auf Lena/Du-Figur, Fragezeichen | „Und für dich?“ | `wk("v7_1_4","zuerst")` | 4 s |

## Kapitel 2 – Was passiert mit dir bei 633 €? (1:45–3:11, 222 W.) – NEU
| # | Bild | Text im Bild | Wort-Anker | Dauer |
|---|---|---|---|---|
| 2.1 | Treppe Mindestlohn 13,90 → 14,60 € | „14,60 € Mindestlohn“ | `wk("v7_2_0","Mindestlohn")` | 7 s |
| 2.2 | Grenze 603 → 633 €, Formel klein, Karte „Sicher“ Minze (Quelle: Minijob-Zentrale 07.10.2026) | „633 € · sicher“ | `wk("v7_2_0","Darum")` | 6 s |
| 2.3 | „Fall 1“: Du-Figur (Rückenansicht) mit Stundenzettel 10 h | „Fall 1: 10 Stunden“ | `wk("v7_2_1","Fall")` | 6 s |
| 2.4 | Lohnzettel 603 → 633, „+30 €“ Minze | „+30 €, gleiche Stunden“ | `wk("v7_2_1","dieselben")` | 7 s |
| 2.5 | „Fall 2“: Schild „15 €/Std.“ bleibt gleich | „Fall 2: 15 €/Std.“ | `wk("v7_2_2","Fall")` | 6 s |
| 2.6 | Uhr 40 h → 42 h im Monat | „+2 Stunden erlaubt“ | `wk("v7_2_2","darfst")` | 7 s |
| 2.7 | „Fall 3“: Befreiung durchgestrichen, 22,79 € in Topf Rente, Netto ≈ 610 € | „− 22,79 € Rente“ | `wk("v7_2_3","Fall")` | 9 s |
| 2.8 | Arbeitsvertrag, Lupe auf Zeile „Pauschalsteuer trägt …“ (Quelle: § 40 Abs. 3 EStG; „Keine Rechtsberatung“) | „Der Haken“ | `wk("v7_2_4","Haken")` | 8 s |
| 2.9 | Münzstapel wandert von Toni zur Du-Figur, amber | „− 19 €?“ | `wk("v7_2_4","neunzehn")` | 5 s |
| 2.10 | Vertrag mit Häkchen-Lupe | „Check deinen Vertrag“ | `wk("v7_2_4","Schau")` | 3 s |
| 2.11 | „Fall 4“: Stufe bei 633 € wird sanfte Rampe bis 2.000 € | „Midijob bis 2.000 €“ | `wk("v7_2_5","Fall")` | 15 s |
| 2.12 | Du-Figur erleichtert → harter Schnitt Toni mit Schweißtropfen | „Und Toni?“ | `wk("v7_2_6","Toni")` | 6 s |

## Kapitel 3 – Toni zahlt mehr: der leise Umbau (3:11–4:20, 176 W.) – NEU
| # | Bild | Text im Bild | Wort-Anker | Dauer |
|---|---|---|---|---|
| 3.1 | Balken „Abgaben pro Minijob“ heute | „heute ≈ 188 €“ | `wk("v7_3_0","Toni")` | 5 s |
| 3.2 | Topf Krankenkasse wächst 13 → 17,5 %, Stempel Minze „Gesetz“ (Quelle: Minijob-Zentrale 01.10.2026; BGBl. 2026 I Nr. 228) | „KV: 13 → 17,5 %“ | `wk("v7_3_0","Krankenkasse")` | 7 s |
| 3.3 | Topf Steuer 2 → 5 %, Stempel amber „Entwurf“ (Quelle: BT-Drs. 21/8235) | „Steuer: 2 → 5 %“ | `wk("v7_3_1","Pauschalsteuer")` | 7 s |
| 3.4 | Kalender „Gesetzentwurf Sept.“ → Bundestagskuppel stilisiert | „noch nicht beschlossen“ | `wk("v7_3_1","Bundestag")` | 5 s |
| 3.5 | Balken wächst auf ≈ 245 €, Differenz leuchtet (Fußnote: eigene Rechnung, Umlagen wie 2026) | „≈ 245 € (+57 €)“ | `wk("v7_3_2","zweihundertfünfundvierzig")` | 8 s |
| 3.6 | Differenz „+57 €“ teilt sich: schmaler Streifen „mehr Lohn ≈ 9 €“, breiter Streifen „höhere Sätze ≈ 47 €“ | „Vor allem höhere Sätze“ | `wk("v7_3_2","kleiner")` | 6 s |
| 3.7 | Gestrichelter Zusatz-Topf „Pflege“ | „Pflege ab 2028?“ | `wk("v7_3_2","weiteren")` | 5 s |
| 3.8 | Neutrales Sitzungssaal-Bild, Dokument „Artikel 1 Nummer 7 ist zu streichen.“ (Quelle: BR-Drs. 507/1/26) | „Ausschuss: streichen!“ | `wk("v7_3_3","Wirtschaftsausschuss")` | 6 s |
| 3.9 | Zitat-Tafel, Stimme markiert „Zitat“ | „„wichtiges Instrument““ | `wk("v7_3_3","Zitat")` | 5 s |
| 3.10 | Schild „MINIJOB“ wird mit Preisschildern beklebt statt abgerissen | „Umbau über den Preis“ | `wk("v7_3_4","Wendung")` | 10 s |
| 3.11 | Dicker Bericht fällt ins Bild | „Es geht weiter …“ | `wk("v7_3_4","Doch")` | 4 s |

## Kapitel 4 – Was die Kommission will – und Sandras Rechnung (4:20–5:36, 196 W.)
| # | Bild | Text im Bild | Wort-Anker | Dauer |
|---|---|---|---|---|
| 4.1 | Bericht klappt auf, Bauchbinde „Alterssicherungskommission“ (Quelle: BMAS, 23.06.2026) | „33 Empfehlungen“ | `wk("v7_4_0","Juni")` | 6 s |
| 4.2 | Seite „Nr. 26“ leuchtet, Überschrift als Einblendung | „Empfehlung 26“ | `wk("v7_4_0","sechsundzwanzig")` | 6 s |
| 4.3 | Schloss am Formular „Befreiung“ | „Befreiung weg“ | `wk("v7_4_1","Befreiung")` | 4 s |
| 4.4 | Schild „Brutto = Netto“ zerbricht | „Brutto = Netto vorbei“ | `wk("v7_4_1","Brutto")` | 4 s |
| 4.5 | Schüler mit Ranzen behält Schild, Lena ohne (Quelle: Bundesregierung, FAQ 02.07.2026) | „Nur Schüler ausgenommen“ | `wk("v7_4_1","Ausnahmen")` | 6 s |
| 4.6 | Sandra altert, Rentenbescheid zoomt auf (Fußnote: eigene Rechnung, Rentenwert 42,52 €) | „≈ 6 € pro Jahr“ | `wk("v7_4_2","Sandra")` | 8 s |
| 4.7 | Münzturm 12 Jahre → „≈ 71 €“ | „12 Jahre = 71 €“ | `wk("v7_4_2","zwölf")` | 5 s |
| 4.8 | Zweite Sandra „20 Std., sozialversichert“, Balken doppelt so schnell | „doppelt so viel“ | `wk("v7_4_3","Hätte")` | 7 s |
| 4.9 | Treppe mit hoher Stufe, Sandra bleibt stehen | „Teilzeitfalle“ | `wk("v7_4_3","Grenze")` | 9 s |
| 4.10 | Einblendung Bundesregierung (Quelle: BT-Drs. 21/7990 via hib 715/2026) | „Gern länger arbeiten“ | `wk("v7_4_3","Bundesregierung")` | 8 s |
| 4.11 | Laden: regulärer Job zerfällt in zwei Minijob-Figuren (Quelle: IAB, Okt. 2021) | „bis 500.000 Stellen?“ | `wk("v7_4_4","Studie")` | 9 s |
| 4.12 | Großes Fragezeichen über Toni, Lena, Klaus, Aktentaschen-Figur | „Wer profitiert?“ | `wk("v7_4_4","profitiert")` | 4 s |

## Kapitel 5 – Wer profitiert wirklich? (5:36–7:24, 275 W.) – NEU, Fairness-Block
| # | Bild | Text im Bild | Wort-Anker | Dauer |
|---|---|---|---|---|
| 5.1 | Toni, volle Kneipe 22:30, vier Aushilfen kommen rein | „+4 Leute, Samstag“ | `wk("v7_5_0","naheliegende")` | 6 s |
| 5.2 | Stilisierte Figur „Guido Zöllick, Präsident DEHOGA“, Zitat-Tafel (zitiert nach Tageskarte/dpa 22.06. · hogapage 23.06.2026) | „„eine Katastrophe““ | `wk("v7_5_0","Zöllick")` | 12 s |
| 5.3 | Sandra mit Jahreslohn-Zettel „7.236 €“, höhere Latte „Grundfreibetrag 12.348 €“ (Quelle: § 32a EStG) | „unter Grundfreibetrag“ | `wk("v7_5_1","genauer")` | 13 s |
| 5.4 | Aktentaschen-Figur: Hauptjob-Lohnzettel mit Abzügen, daneben Minijob-Zettel Minze | „Nebenjob: brutto = netto“ | `wk("v7_5_2","Richtig")` | 10 s |
| 5.5 | Paar am Küchentisch, zwei Gehaltszettel | „Zuverdienst zum Partner“ | `wk("v7_5_2","Ehepartnern")` | 7 s |
| 5.6 | Lena mit Bücherstapel, Klaus mit Einkaufswagen | „Studium · Rente aufbessern“ | `wk("v7_5_3","Beschäftigten")` | 11 s |
| 5.7 | Dunkle Tür „bar auf die Hand“ | „Oder schwarz?“ | `wk("v7_5_3","Sorge")` | 8 s |
| 5.8 | Brief „Verbändeallianz, 09.07.2026“ an zwei Ministerinnen (Kennzeichnung „Rechnung der Verbände“) | „Brief der Verbände“ | `wk("v7_5_3b","Allianz")` | 6 s |
| 5.9 | Lohnzettel StKl 1 „− 130 € netto“, Uhr „+13 Std.“ | „− 130 € / +13 Std.“ | `wk("v7_5_3b","hundertdreißig")` | 9 s |
| 5.10 | Waage, linke Schale Rentenbalken wächst; Zitat-Tafel (Quelle: BMAS-Faktenpapier 23.06.2026) | „Jeder Euro zählt“ | `wk("v7_5_4","Befürworter")` | 9 s |
| 5.11 | Kreis „55,9 % Frauen“ (Quelle: Minijob-Zentrale, Juni 2026) | „56 % Frauen“ | `wk("v7_5_4","Hälfte")` | 5 s |
| 5.12 | Waage pendelt sich ein: links Toni+Lena „heute“, rechts Sandra „später“ | „Beide haben einen Punkt“ | `wk("v7_5_5","Ehrlich")` | 9 s |

## Kapitel 6 – Was wirklich entschieden ist (7:24–8:31, 173 W.)
| # | Bild | Text im Bild | Wort-Anker | Dauer |
|---|---|---|---|---|
| 6.1 | Karte „Sicher“ Minze dreht sich: 633 € + KV | „Sicher: 633 € · KV“ | `wk("v7_6_0","Sicher")` | 8 s |
| 6.2 | Karte „Geplant“ amber: „Steuer 2 → 5 %“, Kalender „4. Nov. Anhörung“ | „Geplant: 5 % Steuer“ | `wk("v7_6_1","Geplant")` | 9 s |
| 6.3 | Karte „Offen“ blau: Paket „Gesamtpaket“ ohne Absender | „Offen: Kommissionspläne“ | `wk("v7_6_2","Offen")` | 8 s |
| 6.4 | Stilisierte Sprechblase „Minijobs bleiben“, Kennzeichnung „CSU, laut Medienberichten“ (kein Porträt) | „CSU: bleiben“ | `wk("v7_6_2","CSU")` | 6 s |
| 6.5 | Klaus, Häkchen verwandelt sich in Fragezeichen, Stempel „keine amtliche Zusage“ | „Rentner? Unklar.“ | `wk("v7_6_2b","Klaus")` | 12 s |
| 6.6 | Verdeckte vierte Karte dreht sich: Formular „Befreiung widerrufen“, Schild „einmalig“ (Quelle: DRV 05.06.2026) | „Widerruf: nur einmal“ | `wk("v7_6_3","Formular")` | 9 s |
| 6.7 | Zwei Preisschilder „heute ≈ 22 €“ / „ab Januar ≈ 23 €“ | „≈ 22 € → 23 €“ | `wk("v7_6_3","Heute")` | 6 s |
| 6.8 | Rentenbalken wächst voll; Hinweis „Keine Rechtsberatung“; Antrag → Arbeitgeber | „Antrag beim Arbeitgeber“ | `wk("v7_6_3","Dafür")` | 9 s |

## Kapitel 7 – Fazit + Nächstes Video (8:31–9:19 + Endkarte, 122 W.)
| # | Bild | Text im Bild | Wort-Anker | Dauer |
|---|---|---|---|---|
| 7.1 | Bühne, Lichtkegel wandert Lena → Klaus → Toni → Sandra | „Ein Modell, vier Leben“ | `wk("v7_7_0","Lena")` | 17 s |
| 7.2 | Drei Karten liegen nebeneinander | „Sicher · Geplant · Offen“ | `wk("v7_7_1","Sicher")` | 9 s |
| 7.3 | Preisschilder kleben weiter am Schild „MINIJOB“ | „Schon teurer“ | `wk("v7_7_1","während")` | 5 s |
| 7.4 | Großes Fragezeichen, Buttons „Abschaffen“ / „Behalten“ | „Abschaffen oder behalten?“ | `wk("v7_7_1","Abschaffen")` | 6 s |
| 7.5 | Sandra blickt auf Endkarten-Platz; Endkarte: Video „Warum sich Arbeiten in Deutschland nicht lohnt“ groß links, Abo klein rechts | „Nächstes Video →“ | `wk("v7_7_2","Warum")` | 10 s + 12 s Endkarte |
| 7.6 | Abschlusszeile, Groschen-Fall-Animation | „Groschenfall. Geld, endlich klar.“ | `v7_7_3` | 3 s |

---

## Prüfpunkte vor dem Rendern
- Anker bewusst ohne Zahlwörter gewählt, wo Fallen drohen: 2.6 `"darfst"` statt „zwei“ (sonst Treffer „Fall zwei“); 2.5 nicht `"Stunden"` (trifft „Stundenlohn“). 1.4 `"vier"` und 4.7 `"zwölf"` kommen im jeweiligen Key nur einmal vor – zur Sicherheit `"=vier"`, `"=zwölf"`.
- Anker `"Fall"` kommt in 2.3/2.5/2.7/2.11 jeweils in eigenem Key vor → eindeutig.
- `"Sicher"` in 6.1: erster Treffer in `v7_6_0` ist „Sicher ist“ ✓; in 7.2 erster Treffer in `v7_7_1` ✓.
- Kontaktbogen: Frame 0 (M1: Figur + großer Betrag in Bernstein, ≤ 5 Wörter), jeder Szenenanfang.
- Quellenzeilen: BA Juli 2026 · Minijob-Zentrale QB II/2026, 07.10.2026, 01.10.2026 · BGBl. 2026 I Nr. 228 · BT-Drs. 21/8235 · BR-Drs. 507/1/26 · BMAS 23.06.2026 · Bundesregierung FAQ 02.07.2026 · hib 715/2026 · IAB 2021 · § 32a / § 40 EStG · Verbändebrief 09.07.2026 · DRV 05.06.2026 · Tageskarte/hogapage 22./23.06.2026.
