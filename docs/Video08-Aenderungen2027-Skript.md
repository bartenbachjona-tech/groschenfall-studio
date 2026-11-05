# Skript V8 (v2, 05.11.2026 nach Faktencheck): „Das ändert sich 2027 – für dein Geld“
Ziel: ca. 10 Minuten (Stimme Tempo 1,06). Stand der Fakten: **04.11.2026** (siehe `docs/Video08-Aenderungen2027-Faktenblatt.md`, Nummern F1–F38). Paket: `docs/Video08-Aenderungen2027-Paket.md`. Veröffentlichung So 08.11.2026 17:00. Sprechtext-Keys `v8_<kapitel>_<absatz>` → daraus `work/v8/texts.json` erzeugen. Zahlen sind für die Sprachaufnahme ausgeschrieben, keine Gedankenstriche im Sprechtext.

## Pointe (zuerst festgelegt, G3)
**„Der Januar wird für die meisten teurer. Aber fast überall hast du einen Hebel, und den wichtigsten musst du selbst finden: Deine Krankenkasse darf seit diesem Sommer erhöhen, ohne dir einen Brief zu schicken, und ob der Brief bis Januar zurückkommt, ist offen.“** (v2: Faktencheck 05.11. – Union/SPD wollen die Brief-Pflicht über die Notfallreform zurückholen, Bundesrat 20.11.; deshalb „verlass dich nicht auf Post“ statt „niemand warnt dich“.)
Daraus folgen: große offene Schleife im Cold Open („bei einer ist der Warnbrief weggefallen“), Auflösung in Kapitel 7, Kernsatz „Wie teuer, entscheidest du an vier Stellen mit.“

## Hook-Varianten (G2/G10, 05.11.: zwei Formate dokumentiert)
- **Fortune Teller (gewählt):** „Drei Euro achtzig mehr für dein Deutschlandticket. Siebzig Cent mehr pro Stunde … Das alles kommt am ersten Januar.“ – größter Kontrast zum Schlüsselbild (Plus-Lohn gegen Minus-Kosten, drei Beträge sichtbar).
- **Investigator:** „Deine Krankenkasse darf seit dem Sommer teurer werden, ohne dir einen Brief zu schreiben. Und das ist nur eine von sieben Änderungen im Januar.“ – verworfen: Kasse kommt erst in Kap. 7, Schlüsselbild wäre leerer Briefkasten statt drei Beträge, Faktenlage der Brief-Pflicht in Bewegung.
- **Teacher:** „Sieben Änderungen im Januar, und bei fast jeder kannst du selbst etwas tun.“ – verworfen: kein Betrag, kein Kontrast.

## Schlüsselbild (Frame 0, LOOK.md)
Küchentisch von oben, darauf drei Gegenstände nebeneinander mit Beträgen: Deutschlandticket-Karte „+3,80 €“ (amber), Lohnzettel „+0,70 €/h“ (minze), Zapfpistole „−17 ct Rabatt“ (amber). Der Groschen (falls abgenommen, NIGHT_RUN §B) fällt in den ersten 0,5 s daneben und guckt von Betrag zu Betrag (`augenrollen`). Ohne Abnahme: ohne Signet, Beispielfigur-Hände legen die Gegenstände hin.

## Figuren
Beispielfiguren (fiktiv, stilisiert, Bauchbinde „Beispielfigur“ beim ersten Auftritt): **Nina** (Pflegehelferin, pendelt mit Deutschlandticket, holt jeden Monat ein Medikament), **Tom** (Lagerist, pendelt mit dem Auto, raucht), **Emil** (Sohn, 6). Reale Person: **Carsten Linnemann** (Bundesgesundheitsminister) nur stilisiert mit Namensschild, ein wörtliches Zitat aus der BMG-Pressemitteilung vom 30.10.2026, von der Stimme als Zitat markiert („sagt wörtlich“).

## Status-Ampel im Bild (läuft durch alle Kapitel)
Jede Änderung bekommt beim ersten Auftritt einen Stempel: **„Gesetz“ / „festgelegt“** (minze) · **„nur Bundestag“** (blau, CO2-Preis: Bundesrat offen) · **„Entwurf“** (amber) · **„angekündigt“** (grau, Spritpreisdeckel). Quellenzeile `Src` mit Stand-Datum unten links in jeder Zahlenszene.

## Wortzahl und Zeitplan
| Kap. | Titel | Wörter | Start (ca.) | Dauer (ca.) |
|---|---|---|---|---|
| 0 | Cold Open: Küchentisch im Januar | 111 | 0:00 | 0:43 |
| 1 | Mindestlohn und Minijob: das Plus | 188 | 0:43 | 1:13 |
| 2 | Deutschlandticket: 66,80 € per Formel | 125 | 1:56 | 0:49 |
| 3 | Tanken: Rabatt weg, CO2-Preis bleibt | 196 | 2:45 | 1:16 |
| 4 | Tabak: die erste von vier Stufen | 159 | 4:01 | 1:02 |
| 5 | Apotheke und Krankenhaus: Zuzahlungen | 178 | 5:03 | 1:09 |
| 6 | Kindergeld und Grundfreibetrag: Plus mit Sternchen | 170 | 6:12 | 1:06 |
| 7 | Krankenkasse ohne Brief + Schluss | 316 | 7:18 | 2:03 |
| | **Gesamt** | **1.443** | | **≈ 9:22** |
Zählung per Skript (nur Sprechtext, ohne Keys und Bildzeilen, inkl. Abschlusszeile). Tempo-Annahme ≈ 154 Wörter/min nach `--tempo 1,06` (V7: 1.432 Wörter = 9:26). Endkarte ca. 12 s zusätzlich. Wortzahlen am Ende nochmals je Kapitel.

## Kapitelmarken (Entwurf, nach Aufnahme anpassen)
```
00:00 Das ändert sich 2027 für dein Geld
00:43 Mindestlohn 2027 und Minijob-Grenze 633 €
01:56 Deutschlandticket 2027: 66,80 €
02:45 Tankrabatt endet, CO2-Preis 2027 (Bundesrat offen)
04:01 Tabaksteuer 2027
05:03 Zuzahlungen 2027: Apotheke und Krankenhaus
06:12 Kindergeld 2027 und Grundfreibetrag (Entwurf)
07:18 Zusatzbeitrag 2027: Krankenkasse ohne Brief
```

---

## Kapitel 0: Cold Open – Küchentisch im Januar
[Bild, Frame 0: Schlüsselbild Küchentisch (s. oben). Erstes Wort ≤ 0,2 s, SFX `soft` auf Frame 0. Overlay „Ab 1. Januar“ ab Frame 0 (Stumm-Test). Zapfpistole beschriftet „−17 ct Rabatt“ statt Preisbehauptung. Bei „Deutschlandticket“ Zoom auf die Karte „+3,80 €“, bei „Lohnzettel“ auf „+0,70 €/h“, bei „Zapfsäule“ auf „−17 ct Rabatt“. Kalenderblatt „1. Januar“ klappt am Satzende auf.]

Drei Euro achtzig mehr für dein Deutschlandticket. Siebzig Cent mehr pro Stunde auf deinem Lohnzettel, wenn du Mindestlohn bekommst. Und beim Tanken fällt ein Steuerrabatt weg, rund siebzehn Cent pro Liter. Das alles kommt am ersten Januar.  `v8_0_0`

[Bild: Kamera zieht auf: Nina und Tom (Bauchbinde „Beispielfigur“) am Tisch, Emil malt daneben. Kleine Icons über den Köpfen: Bahn bei Nina, Auto bei Tom. Sprechblase „Mehr oder weniger?“]

Nina und Tom sitzen am Küchentisch. Nina fährt mit der Bahn zur Pflegestation, Tom mit dem Auto ins Lager. Ihr Sohn Emil ist sechs. Ihre Frage: Haben wir nächstes Jahr mehr Geld oder weniger?  `v8_0_1`

[Bild: Sieben Karten fächern auf, sechs offen mit Symbolen (Lohnzettel, Ticket, Zapfpistole, Schachtel, Tablettenpackung, Kinderschuh), die siebte liegt verdeckt mit einem durchgestrichenen Briefumschlag. Der Groschen tippt auf die verdeckte Karte (`lupe`).]

Sieben Änderungen, die viele in Euro spüren. Bei jeder rechnen wir ein Beispiel für dich durch und sagen dir, was du tun kannst. Und bei einer davon ist seit diesem Sommer der Warnbrief weggefallen. Ob er rechtzeitig zurückkommt, ist offen. Die kommt als letzte.  `v8_0_2`

## Kapitel 1: Mindestlohn und Minijob – das Plus
[Bild: Stundenlohn-Schild klappt um: „13,90 €“ → „14,60 €“ (minze). Stempel „Gesetz“ (Verordnung). Src: MiLoV5 § 1, Stand 04.11.2026.]

Fangen wir mit dem Plus an. Der Mindestlohn steigt von dreizehn Euro neunzig auf vierzehn Euro sechzig pro Stunde. Das ist kein Plan. Das steht schon seit einem Jahr in einer Verordnung der Bundesregierung.  `v8_1_0`

[Bild: Du-Figur (neutral, Rückenansicht) mit Vollzeit-Uhr „38,8 h/Woche“. Lohnzettel: Zeile „Brutto +118 €“ minze, darunter kleiner werdende Zeile „Netto: weniger“. Src: eigene Rechnung nach Destatis-Methode.]

Was heißt das für dich? Arbeitest du Vollzeit zum Mindestlohn, sind das rund hundertachtzehn Euro brutto mehr im Monat. Netto bleibt etwas weniger übrig, weil Steuer und Sozialabgaben mitwachsen. Aber es ist ein echtes Plus.  `v8_1_1`

[Bild: Nina mit Lohnzettel, ihr Stundenlohn liegt über der Linie „14,60 €“. Dann eine zweite Du-Figur knapp darüber: Linie steigt und schiebt sich über ihren Lohn, Ausrufezeichen amber.]

Nina verdient etwas mehr als den Mindestlohn. Bei ihr ändert sich deshalb erst mal nichts. Aber liegst du heute nur knapp darüber, dann pass auf. Rutscht dein Lohn unter die neue Grenze, muss dein Arbeitgeber ab Januar nachbessern. Das ist Pflicht, keine Gefälligkeit.  `v8_1_2`

[Bild: Treppe „603 €“ → „633 €“, Formel klein: „10 h/Woche × Mindestlohn“. Minijob-Figur mit Tablett, „+30 €“ in Minze. Src: § 8 Abs. 1a SGB IV, Stand 04.11.2026.]

Und der Minijob wächst mit. Seine Grenze hängt am Mindestlohn, und zwar an zehn Stunden pro Woche. Darum steigt sie von sechshundertdrei auf sechshundertdreiunddreißig Euro im Monat. Für dieselben Stunden bekommst du also rund dreißig Euro mehr und bleibst trotzdem im Minijob.  `v8_1_3`

[Bild: Lohnzettel Januar mit Lupe, eingekreiste Zeile „Stundenlohn“. Dann Pfeil nach unten, Farbwechsel ins Amber: „Ab jetzt: teurer“. Groschen `triumph` → `schreck`.]

Was du tun kannst: Schau im Februar auf deine erste Abrechnung für Januar. Steht da noch der alte Stundenlohn, sprich die Lohnabrechnung sofort an. Das war die gute Nachricht. Ab jetzt wird es teurer.  `v8_1_4`

## Kapitel 2: Deutschlandticket – 66,80 € per Formel
[Bild: Ninas Ticketkarte groß, Preisschild „63,00 €“ → „66,80 €“ amber, darunter „+45,60 € im Jahr“. Stempel „festgelegt“. Src: Bayerisches Verkehrsministerium (VMK-Vorsitz), 30.09.2026.]

Ninas Ticket für die Bahn. Das Deutschlandticket kostet ab Januar sechsundsechzig Euro achtzig im Monat statt dreiundsechzig. Das sind drei Euro achtzig mehr, aufs Jahr gerechnet fünfundvierzig Euro sechzig.  `v8_2_0`

[Bild: Verhandlungstisch mit stilisierten Namensschildern „Bund“ / „Länder“ verblasst, an seine Stelle tritt eine Rechenmaschine mit drei Zahnrädern „Personal“, „Energie“, „allgemeine Kosten“.]

Neu ist, wie dieser Preis entsteht. Bisher haben die Verkehrsminister von Bund und Ländern ihn ausgehandelt. Jetzt rechnet eine Formel aus Personalkosten, Energie und allgemeinen Kosten. Zweitausendsiebenundzwanzig ist das erste Jahr, in dem sie gilt.  `v8_2_1`

[Bild: Waage: links „planbar“ (minze), rechts Treppe nach oben „jedes Jahr neu“ (amber).]

Das hat zwei Seiten. Der Preis wird planbarer und hängt nicht mehr an einem Streit. Aber er kann künftig jedes Jahr steigen, wenn Löhne und Energie teurer werden.  `v8_2_2`

[Bild: Zweite Karte „Jobticket 63,46 €“ legt sich neben Ninas Karte, daneben Hand eines Arbeitgebers mit Münze. Src wie oben.]

Was du tun kannst: Zahlst du das Ticket allein, frag deinen Arbeitgeber nach dem Jobticket. Es ist billiger, wenn dein Arbeitgeber mitmacht und etwas dazugibt. Das ist eine Frage, die dich nichts kostet.  `v8_2_3`

## Kapitel 3: Tanken – Rabatt weg, CO2-Preis bleibt
[Bild: Szenenwechsel, Nacht, Tankstelle. Tom an der Zapfsäule, Anzeige-Display. Kalenderblatt „31.12.“ mit roter Ecke. Groschen `lupe` am Display. Re-Hook.]

Jetzt Tom. Er tankt jede Woche. Und für ihn endet am einunddreißigsten Dezember etwas, das viele gar nicht bemerkt haben: der Tankrabatt.  `v8_3_0`

[Bild: Literpreis-Anzeige, ein Block „−14,04 ct Steuer“ fällt heraus, mit Mehrwertsteuer-Aufschlag wird er „−17 ct“. Stempel „Gesetz“, Zeitleiste „1.10.–31.12.2026“. Src: § 68 EnergieStG; Wiss. Dienste Bundestag, 19.10.2026.]

Seit Oktober ist die Energiesteuer auf Benzin und Diesel um gut vierzehn Cent pro Liter gesenkt. Mit der Mehrwertsteuer sind das rund siebzehn Cent. So steht es im Gesetz, und zwar nur bis Jahresende. Eine Verlängerung ist nicht beschlossen.  `v8_3_1`

[Bild: Kanister-Stapel „1.000 l im Jahr“, daneben „+167 €“ amber. Kleiner Hinweis „wenn voll weitergegeben“. Dann Tortenstück: „rund 4/5 kamen an“ (Frühjahr). Src: eigene Rechnung; Wiss. Dienste Bundestag, Aktueller Begriff 14/26, 19.10.2026.]

Rechnen wir: Wer im Jahr tausend Liter tankt, zahlt ohne den Rabatt rund hundertsiebenundsechzig Euro mehr. Das gilt, wenn die Tankstellen die Steuer voll weitergeben. Beim ersten Rabatt im Frühjahr kamen nach Angaben der Wissenschaftlichen Dienste des Bundestags im Schnitt rund vier Fünftel bei den Fahrern an.  `v8_3_2`

[Bild: Thermometer „CO2-Preis 55–65 €/t“ bleibt stehen, Häkchen minze. Icons Zapfpistole, Heizöltank, Gasflamme. Stempel „nur Bundestag“ (Bundesrat offen). Src: Deutscher Bundestag, 15.10.2026, Drs. 21/8626.]

Die bessere Nachricht kommt vom Kohlendioxidpreis. Der soll nicht steigen. Der Bundestag hat Mitte Oktober beschlossen, dass er auch zweitausendsiebenundzwanzig zwischen fünfundfünfzig und fünfundsechzig Euro pro Tonne bleibt. Das gilt fürs Tanken und fürs Heizen mit Öl und Gas. Fertig ist das erst, wenn das Gesetz nach dem Bundesrat am zwanzigsten November verkündet ist.  `v8_3_3`

[Bild: Deckel schwebt über der Zapfsäule, gestrichelte Umrisse, Stempel „angekündigt“ grau, Fragezeichen „Wie?“. Dann Handy mit Preisvergleich-Liste (ohne App-Logo).]

Und der Spritpreisdeckel, von dem du vielleicht gehört hast? Den hat die Koalition für spätestens Januar angekündigt. Wie er funktionieren soll, ist aber offen. Einen Gesetzentwurf haben wir bis heute nicht gefunden. Was du tun kannst: Vergleich die Preise, bevor du tankst. Gerade jetzt, wenn sich am Jahresanfang viel bewegt.  `v8_3_4`

## Kapitel 4: Tabak – die erste von vier Stufen
[Bild: Toms Jackentasche, eine neutrale unbedruckte Schachtel (keine Marke). Treppe mit vier Stufen „2027 · 2028 · 2029 · 2030“. Stempel „Gesetz“. Src: BT-Drs. 21/8605; Bundestag 15.10., Bundesrat 16.10.2026.]

Tom raucht. Und für ihn wird es gleich doppelt teurer. Denn ab Januar steigt auch die Tabaksteuer, und danach jedes Jahr bis zweitausenddreißig. Das Gesetz ist beschlossen und verkündet.  `v8_4_0`

[Bild: Eine Zigarette, Münzstapel daneben wächst um „+2,06 ct“, dann zwanzig Stück → „+41 ct pro Schachtel“. Kleiner Zusatz „+ Anteil vom Preis“. Src: Drs. 21/8605 S. 5; Zoll (Satz 2026).]

Allein der feste Steueranteil steigt pro Zigarette um gut zwei Cent. Pro Schachtel mit zwanzig Stück sind das rund einundvierzig Cent. Dazu kommt noch ein zweiter Anteil, der vom Preis abhängt und ebenfalls steigt.  `v8_4_1`

[Bild: Kalender mit 365 Schachteln als Mosaik, Summe „mind. ≈ 150 € im Jahr“ amber. Kleiner Hinweis „wenn weitergegeben“.]

Eine Schachtel am Tag macht damit mindestens rund hundertfünfzig Euro mehr im Jahr, wenn die Hersteller die Steuer an dich weitergeben. Und das ist nur die erste von vier Stufen.  `v8_4_2`

[Bild: Waage: links Kassenbuch „Haushalt“ (größer), rechts Herz „Gesundheit“. Darunter stilisierte Abstimmungstafel „Mehrheit: Union + SPD“.]

Warum das Ganze? Im Gesetzentwurf steht zuerst der Bundeshaushalt. Die Regierung schreibt aber auch, es diene dem Schutz der öffentlichen Gesundheit. Beschlossen hat es die Mehrheit von Union und SPD. AfD, Grüne und Linke waren dagegen.  `v8_4_3`

[Bild: Tom legt die Schachtel auf den Tisch, Taschenrechner daneben „150 € · 2027“, Pfeil nach oben „danach mehr“.]

Was du tun kannst: rechnen. Hundertfünfzig Euro im ersten Jahr, danach jedes Jahr mehr. Und falls du sowieso aufhören willst, hast du jetzt eine Zahl, die dafür spricht.  `v8_4_4`

## Kapitel 5: Apotheke und Krankenhaus – Zuzahlungen
[Bild: Anzeigetafel „Halbzeit“, darunter Bilanz: ein Plus (minze), drei Minus (amber). Szenenwechsel: Apothekentresen, Groschen `schreck`. Re-Hook.]

Halbzeit. Bisher steht es: einmal Plus, dreimal Minus. Und jetzt geht es um etwas, das fast jeder irgendwann bezahlt. Die Apotheke.  `v8_5_0`

[Bild: Nina am Tresen, Tablettenpackung, Kassenzettel „Zuzahlung 5,00 €“ → „7,50 €“. Regel als drei Kacheln: „10 %“, „mind. 7,50 €“, „max. 15 €“. Stempel „Gesetz“. Src: BGBl. 2026 I Nr. 228, § 61 SGB V n. F.]

Nina holt jeden Monat ein günstiges Medikament. Bisher zahlt sie dafür fünf Euro zu. Ab Januar sind es sieben Euro fünfzig. Die Regel lautet: zehn Prozent vom Preis, aber mindestens sieben Euro fünfzig und höchstens fünfzehn Euro. Kostet das Mittel selbst weniger, zahlst du nur den Preis.  `v8_5_1`

[Bild: Zwölf Packungen im Regal, Summe „+30 € im Jahr“. Dann Krankenhausbett, Tageskalender „10 € → 15 € pro Tag“, „5 Tage: +25 €“.]

Zwölf Packungen im Jahr machen dreißig Euro mehr. Und liegst du im Krankenhaus, kostet jeder Tag fünfzehn statt zehn Euro. Bei fünf Tagen sind das fünfundzwanzig Euro mehr.  `v8_5_2`

[Bild: Kalenderblatt „2004“ vergilbt, Preisschild darauf unverändert, dann Stempel „Sparpaket Krankenkassen, Juli 2026“. Src: Bundestag, Beschlussempfehlung Drs. 21/7016.]

Das hat der Bundestag schon im Juli beschlossen, als Teil eines Sparpakets für die Krankenkassen. Die Begründung: Die Zuzahlungen sind seit zweitausendvier weitgehend gleich geblieben. Wer viel krank ist, merkt das trotzdem zuerst.  `v8_5_3`

[Bild: Schuhkarton mit Quittungen, Deckel „2 % · chronisch 1 %“, Pfeil zu Formular „Befreiung“ und zur Krankenkasse. Src: § 62 SGB V.]

Was du tun kannst: Heb deine Quittungen auf. In der Regel musst du im Jahr höchstens zwei Prozent deiner Bruttoeinnahmen zuzahlen, bei chronischen Krankheiten ein Prozent. Was darüber liegt, holst du dir mit einem Antrag bei deiner Krankenkasse zurück. Oder du lässt dich für den Rest des Jahres befreien.  `v8_5_4`

## Kapitel 6: Kindergeld und Grundfreibetrag – Plus mit Sternchen
[Bild: Emil mit Schulranzen, über ihm ein Plus mit Sternchen „*“. Stempel „Entwurf“ amber, groß. Re-Hook.]

Jetzt Emil. Für ihn steht die Familie vor einem Plus. Aber mit Sternchen, denn das ist noch nicht beschlossen.  `v8_6_0`

[Bild: Sparschwein „259 €“ → „267 €“ mit Stempel „Entwurf“, darunter „+8 € pro Kind/Monat = +96 €/Jahr“. Src: Bundestag, Drs. 21/8235, 1. Lesung 08.10.2026.]

Laut Gesetzentwurf der Bundesregierung soll das Kindergeld von zweihundertneunundfünfzig auf zweihundertsiebenundsechzig Euro steigen. Das wären acht Euro mehr pro Kind und Monat, sechsundneunzig Euro im Jahr.  `v8_6_1`

[Bild: Treppe Einkommen, untere Stufe „steuerfrei bis 12.348 €“ → „12.564 €“ (+216 €), Stempel „Entwurf“. Taschenrechner mit Fragezeichen „Ersparnis: hängt am Tarif“.]

Auch der Grundfreibetrag soll steigen, um zweihundertsechzehn auf zwölftausendfünfhundertvierundsechzig Euro im Jahr. Bis zu diesem Einkommen zahlst du keine Einkommensteuer. Wie viel du dadurch sparst, hängt am ganzen Steuertarif. Und der steht ebenfalls erst im Entwurf.  `v8_6_2`

[Bild: Zeitstrahl: „8.10. erste Lesung“ (Haken) → „Anfang Nov. Anhörung“ (Haken) → „Beschluss Bundestag ?“ → „Bundesrat ?“. Rechts zwei Sprechblasen: Regierung „über 10 Mrd. € Entlastung“, Grüne (Antragstitel) „Kindergeld stärken, Entlastungsschere schließen“. Src: Bundestag, 2026.]

Wo steht das gerade? Der Bundestag hat den Entwurf im Oktober zum ersten Mal beraten, Anfang November hat der Finanzausschuss Fachleute angehört. Die Regierung spricht von über zehn Milliarden Euro Entlastung. Die Grünen haben einen eigenen Antrag gestellt. Der heißt: Kindergeld stärken, Entlastungsschere schließen. Beschlossen ist noch nichts, auch der Bundesrat ist noch dran.  `v8_6_3`

[Bild: Kontoauszug „Kindergeld“ mit Lupe, Stempel „Januar prüfen“. Hinweis-Pfeil nach unten auf „Beschreibung: aktueller Stand“.]

Was du tun kannst: Schau im Januar auf deinen Kontoauszug, ob die Familienkasse schon mehr überweist. Und wenn du das hier später siehst: In der Beschreibung tragen wir nach, ob es beschlossen ist.  `v8_6_4`

## Kapitel 7: Krankenkasse ohne Brief + Schluss
[Bild: Die verdeckte siebte Karte aus dem Cold Open dreht sich um: Versichertenkarte (neutral, ohne Kassenlogo), daneben leerer Briefkasten. Groschen `schreck`. Payoff der großen Schleife.]

Und jetzt die Änderung, bei der du dich nicht auf einen Brief verlassen solltest. Deine Krankenkasse.  `v8_7_0`

[Bild: Stilisierter Minister (Namensschild „C. Linnemann, Bundesgesundheitsminister“) mit Zitat-Tafel mit beiden gesprochenen Sätzen („Der durchschnittliche Zusatzbeitragssatz ist in den vergangenen Jahren immer weiter gestiegen. Diese Entwicklung haben wir jetzt gestoppt.“) Src: BMG-Pressemitteilung 30.10.2026. Dann Balken „Ø 2,9 %“ mit Hinweis „Richtwert“, daneben viele unterschiedlich hohe Balken „deine Kasse?“.]

Der durchschnittliche Zusatzbeitrag für zweitausendsiebenundzwanzig bleibt bei zwei Komma neun Prozent. Das hat das Gesundheitsministerium festgelegt. Der Minister sagt wörtlich: Der durchschnittliche Zusatzbeitragssatz ist in den vergangenen Jahren immer weiter gestiegen. Diese Entwicklung haben wir jetzt gestoppt. Aber der Durchschnitt ist nur ein Richtwert. Deine Kasse legt ihren eigenen Zusatzbeitrag fest. Sie darf also trotzdem erhöhen.  `v8_7_1`

[Bild: Briefträger geht am Briefkasten vorbei. Stattdessen Laptop mit Kassen-Website, kleine Zeile „Zusatzbeitrag 2027“. Stempel „Gesetz seit 30.07.2026“, danach zweiter Stempel „Rückkehr geplant“ (blau). Src: GKV-Beitragssatzstabilisierungsgesetz, BGBl. 2026 I Nr. 228; § 175 SGB V; Ausschussdrs. 21(14)107.]

Und hier ist der Haken. Seit dem Sommer muss deine Kasse dich bei einer Erhöhung nicht mehr persönlich anschreiben. Kein Brief. Du merkst die Erhöhung dann womöglich erst auf deinem Lohnzettel. Union und SPD wollen den Brief wieder zur Pflicht machen, auch digital über dein Kundenkonto. Beschlossen ist das noch nicht, und ob es für Januar gilt, ist offen. Verlass dich also nicht auf Post.  `v8_7_2`

[Bild: Lohnzettel „3.000 € brutto“, Regler „+0,3 Punkte“, geteilt durch zwei (Arbeitgeber trägt die Hälfte), Ergebnis „−4,50 €/Monat · −54 €/Jahr“. Kleine Fußzeile „Beispiel“. Dann Balkenreihe der Kassen, Abstand günstigste ↔ teuerste nur als Pfeil „Vergleich lohnt sich“ (Zahl erst nach Prüfung der GKV-Krankenkassenliste). Src: eigene Rechnung; GKV-Spitzenverband, Krankenkassenliste.]

Ein Beispiel: Du verdienst dreitausend Euro brutto, und deine Kasse erhöht um null Komma drei Punkte. Die Hälfte davon trägst du. Das sind vier Euro fünfzig im Monat, vierundfünfzig Euro im Jahr. Und zwischen den Kassen sind die Unterschiede oft größer als so eine Erhöhung. Ein Vergleich lohnt sich.  `v8_7_3`

[Bild: Kalender Januar, „31.“ eingekreist minze. Zwei Wege: „12 Monate dabei → jederzeit wechseln (wirksam nach 2 Monaten)“ und „Erhöhung → Sonderkündigung bis Monatsende“. Neue Kasse (neutrales Gebäude) schickt die Kündigung selbst los.]

Was du tun kannst: Schau im Januar selbst nach, was deine Kasse verlangt. Erhöht sie, darfst du bis zum Ende des Monats kündigen, in dem der höhere Beitrag zum ersten Mal gilt. Bei einer Erhöhung zum ersten Januar also bis zum einunddreißigsten Januar. Bist du schon zwölf Monate dabei, kannst du ohnehin wechseln. Die neue Kasse erledigt die Kündigung für dich.  `v8_7_4`

[Bild: Zurück zum Küchentisch. Nina und Tom vor einer Liste: zwei Zeilen minze (Lohn, Kindergeld mit Sternchen), fünf amber (Ticket, Tanken, Tabak, Apotheke, Kasse). Vier Hebel leuchten auf: Jobticket, Zapfsäule mit Preisliste, Quittungen, Kassenliste. Groschen `triumph`.]

Nina und Tom haben jetzt ihre Liste. Ein Plus beim Lohn, ein Plus beim Kindergeld, wenn es kommt. Dazu fünf Stellen, an denen es teurer werden kann. Aber fast überall gibt es einen Hebel: Jobticket, Preisvergleich an der Zapfsäule, Quittungen, Krankenkasse. Der Januar wird teurer. Wie teuer, entscheidest du an vier Stellen mit.  `v8_7_5`

[Bild: Die sieben Karten liegen offen, Frage „Welche trifft dich am meisten?“, Kommentar-Symbol.]

Welche der sieben Änderungen trifft dich am meisten? Schreib es in die Kommentare.  `v8_7_6`

[Bild: Endkarte (ca. 12 s): Video 7 „Minijob 2027“ groß links mit Pfeil, Abo-Button klein rechts. Nina zeigt auf den Endkarten-Platz. Groschen + „Groschenfall.“ im Endbild.]

Und hast du einen Minijob oder kennst jemanden mit einem? Dann schau dir das Video hier an. Dort rechnen wir durch, was sich beim Minijob sonst noch ändert und wer wirklich profitiert. Es läuft direkt hier.  `v8_7_7`

Groschenfall. Geld, endlich klar.  `v8_7_8`

---

## Kritik
- **Text-Kritiker (fable) R1 05.11.2026: Ø 8,1, ÜBERARBEITEN** (Faktentreue 7: v8_7_2 Bundesrat-Satz unbelegt, „steht auf ihrer Website“, „in zwei Jahren“, CO2 im Indikativ, Zapfsäulen-Preisbehauptung in Satz 1; Paket 7: gesperrter Titel 7 im Test-Set, alte Pointe im POV-Filter). Alle 8 Auflagen + Nebenhinweise umgesetzt (v2.1).
- **R2 05.11.2026: Ø 8,7, FREIGABE (Text)**, Hook-Tore H0–H4 bestanden; Pflichtkorrektur v8_3_3 (Verkündung statt „zugestimmt“) umgesetzt. Samstags-Punkte: § 249 hälftige Tragung belegen, Drs. 21/8629 (§ 175) + BEHG-Status prüfen, T8B erneut freigeben, Bauchbinden Azubis/chronisch.

## Hinweise für Regie und Kritiker
- **Satz 1** (`v8_0_0`): Euro-Betrag + „dein“, kein Datum, keine Behörde. Das Datum „am ersten Januar“ steht erst in Satz 4. Versprechen des Titels („Das ändert sich 2027“) ist nach ca. 10 s mit drei Änderungen eingelöst.
- **Intro** endet bei ca. 0:43 (111 Wörter).
- **Re-Hooks** (Abstand ≤ 90 s, Zeiten geschätzt bei 154 W./min): 0:30 verdeckte Karte „kein Brief“ · 1:05 „liegst du knapp darüber, pass auf“ · 1:50 „Ab jetzt wird es teurer“ · 2:45 Szenenwechsel Tankstelle „Jetzt Tom“ · 3:35 Wendung „Der soll nicht steigen“ · 4:01 „gleich doppelt teurer“ · 5:03 „Halbzeit“-Bilanz · 6:12 „Plus mit Sternchen“ · 6:50 Regierung vs. Grüne · 7:18 Auflösung „nicht auf einen Brief verlassen“ · 7:50 „Und hier ist der Haken“ · 8:55 Kernsatz · 9:22 Ende Sprechtext (+ ca. 12 s Endkarte).
- **Fairness:** Tabak = beide Begründungen aus dem Entwurf + Abstimmung ohne Wertung; Kindergeld = Regierung (Entlastungsvolumen) vs. Grüne (Antragstitel wörtlich); Deutschlandticket = „zwei Seiten“; Zusatzbeitrag = Minister wörtlich + Einschränkung aus derselben Pressemitteilung; Spritpreisdeckel nur als „angekündigt, offen“. Kein Parteien-Bashing, keine Bewertung „Abzocke“.
- **Status-Stempel** sind Pflicht (KANAL_REGELN: Entwurf klar als Entwurf). „Nur Bundestag“ beim Kohlendioxidpreis, bis Bundesrat/Verkündung geprüft (Faktenblatt F12, offener Punkt).
- **Formulierungen, die im Sprechtext NICHT vorkommen dürfen:** „Der Spritpreisdeckel kommt“, „Kindergeld steigt sicher“, „deine Kasse wird teurer“, „jede Schachtel kostet …“ (Durchschnitt/Annahme), „alle zahlen mehr“.
- **Wenn sich bis Samstag etwas ändert:** Bundestag beschließt Einkommensteuerreformgesetz → `v8_6_0`, `v8_6_1`, `v8_6_2`, `v8_6_3`, `v8_6_4`, `v8_7_5` anpassen; Spritpreisdeckel-Entwurf erscheint → `v8_3_4`; Tankrabatt verlängert → `v8_3_1`, `v8_3_2`, `v8_0_0`, Bilanz in `v8_5_0`.
- **Groschen:** führt durch (Cold Open, jeder Re-Hook, Endbild), nur nach Abnahme von `remotion/src/kit/Groschen.tsx`; sonst ohne Signet, im Log „ohne Signet“.

## Wortzahl je Kapitel (v2.1, 05.11.2026, gezählt per Skript, nur Sprechtext)
| Kap. | Wörter |
|---|---|
| 0 | 114 (≈ 44 s, Intro < 45 s) |
| 1 | 188 |
| 2 | 125 |
| 3 | 212 |
| 4 | 157 |
| 5 | 178 |
| 6 | 168 |
| 7 | 353 |
| **Gesamt** | **1.495** (≈ 9:43 bei 154 W./min, + ca. 12 s Endkarte) |
