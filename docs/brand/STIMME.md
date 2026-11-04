# Groschenfall – Stimme (Marke v2, ab 05.11.2026)

## Sprecher (unverändert, versioniert)
| Parameter | Wert (Version v1, seit 24.10.2026) |
|---|---|
| ElevenLabs-Stimme | **Johannes** `r8MyP4qUsq5WFFSkPdfV` |
| Modell | `eleven_multilingual_v2` |
| generations_count | 1 (jede Generierung nur einmal starten, vorher `estimate_only`) |
| Tempo | Shorts **+10 %** (`gf.py voice --tempo 1.10`), Langvideo **+6 %** (`--tempo 1.06`) |
| Tonhöhe | **−1,2 Halbtöne** (fest in `tools/gf.py voice`) |
| Absatztrennung | `<break time="1.6s" />` zwischen den Absätzen eines Aufrufs |
| Musik | Ducking −27 dB unter Stimme, −21 dB in Pausen, Lowpass 6 kHz, Master −14 LUFS |

Änderungen an diesen Werten nur als neue Version (v2 …) mit Datum in dieser Tabelle.
Der **Groschen spricht vorerst nicht**. Er reagiert nur mit Mimik und dem „Klick-Kling“ (LOOK.md). Es gibt keine zweite Stimme (Credits).

## Ton
- Ruhig, trocken, klar und **auf deiner Seite**. Der Ton ist wie ein Freund, der den Brief schon gelesen hat, kein Lehrer.
- Immer **du**. Kurze Hauptsätze, aktive Verben, „aber“ bzw. „deshalb“ statt „und dann“ (Handbuch G3).
- Ohne Empörung und ohne Angst: Wir zeigen die Falle und den Ausweg. Wörter wie „Abzocke“ verwenden wir nur, wenn sie belegt sind.
- **Eine Kernzahl pro Short**, gesprochen und im Bild. Alle anderen Zahlen werden weggelassen.

## Satz 1 (Grundregel, früher M1)
- Satz 1 enthält **„du/dein/dir“ oder einen Euro-Betrag**, am besten beides.
- **Verboten in Satz 1:** Datum, Gesetzes- oder Behördenname, „ab Januar“, „laut Destatis“. Die Quelle kommt später bzw. ins Bild. Einzige Ausnahme ist das markierte Experiment „tagesaktueller Stichtag“ (SERIEN.md).
- Das erste Wort fällt bei **≤ 0,2 s**. Kein Intro, kein Fade-in.
- YouTube-Titel = Satz 1 (wortgleich oder fast), Suchwort in den ersten 5 Wörtern (SERIEN.md).

| Vorher (schlecht) | Nachher (gut) |
|---|---|
| „Tabaksteuer steigt ab Januar, vier Stufen bis 2030.“ | „Eine Schachtel am Tag? Das kostet dich bald [Betrag] Euro mehr im Jahr.“ |
| „Die Verbraucherzentrale hat neue Mogelpackungen veröffentlicht.“ | „[Marke] hat dir [X] Gramm geklaut, und der Preis bleibt gleich.“ |
| „Laut Paragraf 22 SGB zwei gilt bei Nachzahlungen …“ | „Deine Nebenkosten-Nachzahlung ist zu hoch? Das Jobcenter muss sie vielleicht zahlen.“ |

## Bann-Phrasen (Kritiker streicht sie ohne Diskussion)
- **Begrüßung und Intro:** „Hallo und willkommen“, „Heute schauen wir uns an“, „In diesem Video …“, „Lass uns eintauchen“.
- **Leere Neugier:** „Du wirst es nicht glauben“, „Alle aufgepasst“, „Das musst du wissen“, „Krass, oder?“, „Hier kommt der Clou“.
- **Schluss-Signale:** „Am Ende des Tages“, „Zum Schluss“, „Abschließend“, „Fazit:“, „Kurz gesagt“, „Das war's“, „Zusammengefasst“.
- **Insider-Bezüge:** „wie im letzten Video“, „ihr kennt das ja schon“.
- **CTA-Floskeln:** „Like und Abo“, „Lass ein Abo da“, „Vergiss nicht zu folgen“ mitten im Video.
- **KI-Floskeln:** „Es ist wichtig zu beachten“, „Tatsächlich ist es so, dass“, „In der heutigen Zeit“, „Spannend, oder?“.
- **Angstmache und Fake-Präzision:** künstliche Dringlichkeit, „Alle verlieren …“, gerundete Zahlen als exakt ausgegeben.

## Ende eines Shorts
- **TikTok-Ende `tt`:** Teilen-Satz „Schick das an jemanden, der [konkrete Lage aus dem Video].“ + Abschlusszeile.
- **YouTube-Ende `yt`:** Nur wenn thematisch passend ein Verweis auf das passende Langvideo (dann „Ähnliches Video“ setzen), sonst „Folg Groschenfall für mehr.“ Danach die Abschlusszeile.
- **Abschlusszeile „Groschenfall. Geld, endlich klar.“**: Die frühere Sperre „nie mehr ändern“ ist **aufgehoben** (Jona, Marke v2). Die Zeile **bleibt vorerst unverändert** gesprochen und im Bild (`CLOSING` in `shortkit.tsx`). Sie ist die einzige erlaubte Schlussformel, weil sie Teil des Endbilds ist.
- **Vorgemerkter Test** (nicht aktiv, Reihenfolge laut AUSWERTUNG_AKTUELL): gesprochene Abschlusszeile weg vs. nur Endbild (Groschen + Name + Zeile im Bild) mit Groschen-Kling. Bis dahin wird nichts geändert.

## TTS-Regeln (Handbuch G8)
- **Ausschreiben** im Sprechtext (`texts.json` + ElevenLabs-Text):
  - Zahlen und Euro-Beträge („neunhundertfünfundvierzig Euro“)
  - Prozent („drei Prozent“)
  - Jahreszahlen („zweitausendsiebenundzwanzig“)
  - Paragrafen („Paragraf zweiundzwanzig“)
  - Akronyme („Sozialgesetzbuch zwei“ statt „SGB II“, „Verbraucherzentrale“ statt „VZ“, „Deutsche Rentenversicherung“ statt „DRV“)
- **Keine Gedankenstriche „–“ oder „—“ im Sprechtext** (die Stimme setzt aus). Stattdessen Punkt oder Komma. Kein „≈“, kein „/“.
- Die Untertitel zeigen Ziffern (Zahlen-Ersetzung in `shortkit.tsx`, z. B. `["drei prozent","3 %"]`).
- Leistungsnamen korrekt: seit 01.07.2026 „Grundsicherungsgeld“ (Lehre aus S28).
- Zahlenlastige Shorts: höchstens 90 Wörter, weil ausgeschriebene Zahlen lange dauern.
