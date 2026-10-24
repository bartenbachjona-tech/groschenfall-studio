# Short 10 – Steuerpläne 2027: Wer zahlt drauf?

Eine Idee: Der Entwurf gibt an drei Stellen und holt an drei Stellen zurück. Roter Faden: eine stilisierte Waage, links Minze (Entlastung), rechts Bernstein (Mehrbelastung); Stempel „ENTWURF“ bleibt klein oben rechts im Bild.

| Key | BILD | OVERLAY | SPRECHTEXT |
|---|---|---|---|
| hook | 0–1,5 s: Kinderhand legt eine 8-€-Münze (stilisiert) in ein Sparschwein, Lichtkegel. 1,5–4 s: Rauszoom, drei Rohre führen aus dem Bild zurück in einen Tresor mit „2027“. | **2027: Wer zahlt drauf?** · „+8 €“ (Minze) | Acht Euro mehr Kindergeld. So plant es die Regierung. Und an drei Stellen soll das Geld wieder reinkommen. |
| b1 | Gesetzesblatt mit großem Stempel „ENTWURF – NICHT BESCHLOSSEN“. Wechsel: Waage links füllt sich, drei minzgrüne Gewichte fallen nacheinander: Haus-Symbol (Grundfreibetrag), Kinderwagen (Kindergeld), Aktentasche (Pauschbetrag). | ENTWURF · Grundfreibetrag 12.564 € · Kindergeld 267 €/Monat · Pauschbetrag 1.430 € | Ein Entwurf, noch nicht beschlossen. Erst die Entlastung: Der Grundfreibetrag soll auf zwölftausendfünfhundertvierundsechzig Euro steigen. Kindergeld auf zweihundertsiebenundsechzig Euro im Monat. Arbeitnehmer-Pauschbetrag: eintausendvierhundertdreißig Euro. |
| b2 | Waage rechts: Figur im Anzug (stilisiert, gesichtslos) vor Treppe, Stufen „45 %“ bei 250.000 € und neue Stufe „47 %“ bei 280.000 €. Wechsel: Handwerker-Figur mit Werkzeugkoffer, Rabatt-Schild schrumpft von 20 auf 15. | **1 von 3** · 45 % ab 250.000 € · NEU 47 % ab 280.000 € · **2 von 3** · Handwerkerbonus 20 % → 15 % | Mehr zahlen sollen, eins von drei: Spitzenverdiener. Fünfundvierzig Prozent schon ab zweihundertfünfzigtausend Euro, neu siebenundvierzig Prozent ab zweihundertachtzigtausend. Zwei von drei: Der Handwerkerbonus sinkt von zwanzig auf fünfzehn Prozent. |
| b3 | Ladentheke: Chef-Figur (Arbeitgeber) legt mehr Münzen für Aushilfe ab, Schild „Minijob“, Zähler 2 → 5. Wechsel: mittlere Figur mit Lohnzettel, kleiner Minze-Stapel „~66 €/Jahr“, Fußnote „grob gerechnet, allein“. Wechsel: Rückfahrt zum Sparschwein aus Frame 1. | **3 von 3** · Arbeitgeber: Minijob-Pauschsteuer 2 % → 5 % · 50.000 € → ca. −66 €/Jahr Steuer · „grob gerechnet“ | Drei von drei: Arbeitgeber zahlen für Minijobs fünf statt zwei Prozent Pauschsteuer. Und die Mitte? Wer allein fünfzigtausend Euro versteuert, spart durch den Tarif grob gerechnet sechsundsechzig Euro im Jahr. Dazu pro Kind: |
| (Loop) | Schnitt auf Frame 1: Münze fällt ins Sparschwein. „Dazu pro Kind:“ → „Acht Euro mehr Kindergeld.“ | | |
| yt | Endkarte, Waage pendelt aus. | „Folgen“ | Folg Groschenfall. Wir rechnen nach, bevor das Gesetz kommt. |
| tt | Drei Kacheln: Treppe, Werkzeugkoffer, Minijob-Schild. | „Was trifft dich?“ | Welche der drei Stellen trifft dich? Schreib's in die Kommentare. |

**Wortzahl:** hook+b1–b3 = 104 Wörter (yt 9, tt 10).
**Dauer:** ≈ 38,5 s Kern; mit YT-Ende ≈ 42 s, mit TT-Ende ≈ 42 s (≈ 2,7 Wörter/s, +10 % Tempo).

**Highlight-Wörter (Untertitel):** Acht Euro · drei Stellen · Entwurf · noch nicht beschlossen · Grundfreibetrag · Kindergeld · Pauschbetrag · eins von drei · fünfundvierzig Prozent · siebenundvierzig Prozent · zwei von drei · Handwerkerbonus · drei von drei · Arbeitgeber · Minijobs · grob gerechnet · sechsundsechzig Euro

**Quellen-Einblendungen:**
- hook/b1: „Entwurf Einkommensteuerreformgesetz 2027, BR-Drs. 507/26 (04.09.2026) · BT-Drs. 21/8235 · 1. Lesung 08.10.2026, noch nicht beschlossen“
- b1: „Vergleich 2026: BR-Drs. 637/24“ · Fußnote Pauschbetrag: „hilft nur ohne höhere Werbungskosten“
- b2/b3: „BR-Drs. 507/26 (§ 32a, § 35a, § 40a EStG)“
- b3: „Eigene Rechnung nach Tarifformeln 2026/2027, Einzelperson, zu versteuerndes Einkommen 50.000 €“

**Regel-Check:** durchgehend „soll / plant / Entwurf“, Minijob-Steuer zahlen ausdrücklich Arbeitgeber, keine Parteien, keine Bewertung, keine Bundesrats-Kritik, Pauschbetrag nicht als Bargeld dargestellt.

---
## Überarbeitung Runde 1 (Regie, nach Kritik)
Der verbindliche Sprechtext steht jetzt in texts.json (Hook gekürzt/Zahl nach vorn, Jargon entschärft, Quellen-Nachsätze reduziert, Payoff geschärft). Bildspur sinngemäß wie oben, angepasst an den neuen Text.
**Paket:** Titel „Steuerpläne 2027: Wer soll mehr zahlen? (Entwurf)“. Erstes Bild/Overlay: „2027: Wer zahlt drauf?“ + Waage, Stempel „ENTWURF“. b1-Overlays: „12.564 €“, „267 €“, „1.430 €* (*nur ohne höhere Werbungskosten)“.
**Runde 2 Mikro-Fixes eingebaut (Kritiker: danach Freigabe).**
