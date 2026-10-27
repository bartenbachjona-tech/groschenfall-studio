# S18 – Deutschlandticket 66,80 € ab Januar – Short-Skript

Stand 27.10.2026 · Fakten: work/s18/fakten.md · Stimme +10 % · Ziel 38–45 s

**Wortzahl hook..b4: 89** (yt 9, tt 10)

**Src-Zeile (im Bild ab b1/b2):** Quelle: Bayer. Verkehrsministerium (VMK-Vorsitz), 30.09.2026
**EndYT-Zeile:** Folg Groschenfall für die nächste Zahl (38 Zeichen)
**TT-Antwortbuttons:** Ja, klar · Knapp · Nicht mehr

## hook (11 Wörter)

Neunundvierzig. Achtundfünfzig. Dreiundsechzig. Rate mal, was dein Deutschlandticket ab Januar kostet.

- BILD: Titelbild: Treppe aus vier Ticketkarten (ohne Logo), Stufen 49 / 58 / 63 beschriftet (blau), auf der vierten Stufe großes Fragezeichen (amber).
- OVERLAY: 49 → 58 → 63 → ?

## b1 (18 Wörter)

Sechsundsechzig Euro achtzig, also drei Euro achtzig mehr. Und diesmal hat das keiner ausgehandelt, sondern eine Formel ausgerechnet.

- BILD: Fragezeichen kippt um, darunter Preisschild 66,80 € (amber), kleines „+3,80 €“; Verhandlungstisch bleibt leer, ein Taschenrechner schiebt sich ins Bild.
- OVERLAY: 66,80 € ab Januar

## b2 (14 Wörter)

Sie schaut auf drei Kosten: Personal zählt fünfundfünfzig Prozent, Energie zwanzig, allgemeine Kosten fünfundzwanzig.

- BILD: Taschenrechner öffnet sich zu einem Tortendiagramm: Personal 55 %, Energie 20 %, allgemeine Kosten 25 % (blau/minze/amber).
- OVERLAY: Formel: 55 / 20 / 25

## b3 (24 Wörter)

Wichtig: Die Verkehrsminister haben im März die Formel beschlossen, nicht den Preis. Laut bayerischem Verkehrsministerium kommt das Ergebnis jedes Jahr spätestens zum dreißigsten September.

- BILD: Stilisierte Ministerrunde (Namensschilder „VMK“, keine echten Gesichter) stempelt ein Blatt „Formel“, nicht das Preisschild; Kalenderblatt 30.9. mit Wiederholungspfeil. Src-Zeile unten einblenden.
- OVERLAY: Beschlossen: die Formel, nicht der Preis

## b4 (22 Wörter)

Das Semesterticket kostet dann vierzig Euro acht, wo die Hochschule es anbietet. Und nächsten September rückt die nächste Zahl in die Reihe:

- BILD: Kleine Karte „Semesterticket 40,08 €“ (minze) mit Hochschul-Symbol; dann zoomt die Kamera zurück auf die Treppe, eine fünfte leere Stufe erscheint → Loop zum Titelbild.
- OVERLAY: Semesterticket: 40,08 €

## yt (9 Wörter)

Folg Groschenfall, dann verpasst du die nächste Zahl nicht.

- BILD: Endkarte Groschenfall, Ticket-Treppe mit leerer Stufe.
- OVERLAY: Folg Groschenfall für die nächste Zahl

## tt (10 Wörter)

Lohnt sich das Ticket für dich noch? Schreib's unten rein.

- BILD: Ticketkarte mit drei Antwortbuttons.
- OVERLAY: Lohnt sich das Ticket noch?

## Prüfnotizen

- Hook B aus work/hooks.md (8/8). Preis erst bei ca. 4 s als Auflösung.
- Achtung-Punkt: VMK hat im März 2026 die FORMEL beschlossen, den Preis 2027 hat D-Tix berechnet (Fakten 1c).
- Jobticket bewusst weggelassen (Bedingung ≥ 25 % Arbeitgeberzuschuss wäre zu lang). Semesterticket mit Einschränkung „wo die Hochschule es anbietet“.
- Loop: b4 endet mit „…rückt die nächste Zahl in die Reihe:“ → Hook „Neunundvierzig. Achtundfünfzig …“.

---
## REVISION 1 (Regie, nach Kritik Runde 1) – gilt vor allen Angaben oben
Sprechtext = texts.json (87 Wörter hook..b4).
- hook: „Neunundvierzig, achtundfünfzig, dreiundsechzig. Und dein Deutschlandticket ab Januar?“ · OVERLAY „Deutschlandticket: 49 → 58 → 63 → ?“ · BILD: Ticketkarten mit Aufdruck „D-Ticket“ (generisch, kein Logo) als Treppe, vierte Stufe mit „?“.
- b3: „Wichtig:“ gestrichen, „Ergebnis“ → „neuen Preis“.
- b4: Semesterticket gestrichen (Abrechnungsfalle). Neu: „Seit dem Start ist das Ticket damit gut ein Drittel teurer.“ (66,80/49 = +36,3 %, Fakten 6c) · OVERLAY „+36 % seit 2023“.
- Titel YT: „Deutschlandticket 2027: Warum es jetzt 66,80 € kostet“ · Thumbnail/Titelbild-Text: „49 → 58 → 63 → ?“
