# Groschenfall – Nachtproduktion (Runbook)

Ziel pro Nacht (seit 04.11.2026, Jonas Entscheidung – ersetzt die 2-Shorts-Regel vom 28.10.): **genau 1 Short pro Tag** (YouTube- und TikTok/Insta-Version), terminiert **für denselben Tag um 19:00 Uhr** (§9a). Nie mehr als 1 Short pro Tag und Plattform hochladen (die 1-pro-Tag-Regel gilt nur für Shorts). Dazu die **Etappe des Wochen-Langvideos** (§L): ein ~10-Minuten-Video pro Woche, Veröffentlichung **Sonntag 17:00**, seit 04.11.2026 (Jonas Entscheidung) **vom Nachtlauf selbst auf YouTube terminiert**, sobald Text- und Bild-Kritiker freigegeben haben. **Niemals sofort veröffentlichen.**

**Marke v2 (seit 05.11.2026). Vor allem anderen lesen, in dieser Rangfolge (höhere Ebene gewinnt):**
1. `docs/KANAL_REGELN.md` (Sicherheit, Recht, Veröffentlichung)
2. `docs/brand/POSITIONIERUNG.md`, `STIMME.md`, `LOOK.md`, `SERIEN.md`
3. `docs/STUDIO_HANDBUCH.md` (G1–G10)
4. `docs/AUSWERTUNG_AKTUELL.md` (laufender Test: welche Kennung A/B der heutige Short hat, Erwartungswerte)
5. `docs/PLAYBOOK.md` (Handwerk, Kritiker-Rubrik) und dieses Runbook

Findet der Lauf einen Widerspruch, gilt die höhere Ebene, und die niedrigere Datei wird bereinigt (Log-Notiz).

## 0. Setup (frische Umgebung)
```bash
cd remotion && npm ci --no-audit --no-fund && cd ..
mkdir -p work out
D=$(TZ=Europe/Berlin date +%Y-%m-%d)
```
Python (numpy, scipy, Pillow) und ffmpeg sind vorinstalliert. Browser: die Render-Skripte suchen `chrome-headless-shell` automatisch unter `/opt/pw-browsers/` (überschreibbar mit `GF_BROWSER`).
Nachtnummer: `state/log.md` lesen. Langvideo: Etappe laut §L und `state/langvideo.md`.
Läuft die Routine in derselben Nacht ein zweites Mal (Log hat schon einen Eintrag mit heutigem Datum): keine neuen Shorts, sondern offene Punkte aus dem Log erledigen.

**Lücken & Abbrüche (seit Auswertung 02.11.2026):** 31.10.–02.11. brachen drei Läufe am Nutzungslimit ab, ohne dass etwas im Repo landete.
- **Zwischenstand sichern:** Nach jedem fertigen Short (Render + Mix), nach dem Terminieren und nach jeder Langvideo-Etappe sofort `state/log.md` (Zeile mit „Zwischenstand“) + neue `.tsx`/Texte committen und pushen. Ein Abbruch darf nie mehr als einen Arbeitsschritt kosten.
- **Beim Start:** Hat `state/log.md` für Vortage keinen Eintrag, je Tag eine Zeile „Lücke – Lauf ohne Ergebnis“ eintragen. Danach den Ablageordner dieser Tage auf Jonas PC prüfen (`device_list_dir` `C:\Users\barte\Videos\Groschenfall\Nacht\<Datum>`; nur wenn der Ordner verbunden ist): fertige Shorts mit Kritiker-Freigabe laut dortiger `UPLOAD.md` = „Upload offen“ (§9a, max. 3/Tag/Plattform), nicht neu produzieren.
- **Spätstart:** Beginnt der Lauf nach 12:00 (Europe/Berlin), den neuen Short für den **nächsten** Tag 19:00 terminieren (heute nur, wenn für heute noch nichts geplant ist und er bis 18:30 fertig ist). Nach 17:30 nichts mehr für heute terminieren.

## 1. Themen (Agent „Scout“, Skills: idea-generation-and-ideation, trend-jacking, tubealfred youtube-keyword-ideas wenn verbunden)
- Websuche: deutsche Nachrichten der letzten 7 Tage zu Geld, Steuern, Rente, Bürgergeld, Arbeit, Mieten, Preise, Politiker-Aussagen mit Zahlen.
- `state/topics_done.md` lesen, keine Wiederholungen.
- **Serie zuerst:** Laut AUSWERTUNG_AKTUELL steht fest, ob heute ein Typ-Short (A) oder Mogelpackung bzw. Frist-Alarm (B) dran ist (Mogelpackung 2 von 7 pro Woche). Experimente höchstens 20 %, markiert.
- **Ausreißer-Scout (Handbuch G5):** zusätzlich zu den Nachrichten Videos mit ≥ 3× Kanal-Median in der eigenen und in Nachbarnischen (deutsch und englisch, ≥ 3 Konten) ansehen. Den Motor übernehmen, nie das Thema 1:1.
- 10 Kandidaten, jeder mit Scoring nach PLAYBOOK §1 **und** Themenfilter aus `docs/brand/POSITIONIERUNG.md` (Nutzwert-Frage + Suchwort). Nur Themen mit **Score ≥ 8/12** und belegbaren Primärquellen.
- **G1 Schlüsselbild-Tor:** Für jeden Kandidaten in einer Zeile das Schlüsselbild notieren (Gegenstand + Euro-Betrag, `docs/brand/LOOK.md`). Kein starkes Schlüsselbild → Kandidat verwerfen.
- Langes Video: Formeln und Packaging aus `docs/brand/SERIEN.md`; bevorzugt das Thema des stärksten Shorts der Vorwoche (Plattformen getrennt). **Shorts sind keine Teaser** des Langvideos. „Ähnliches Video“ = Langvideo nur, wenn der Short thematisch wirklich passt.

## 2. Hooks (Agent „Hook“, Skill: hook-writer)
Reihenfolge nach Handbuch G3 und G2:
1. **Pointe zuerst (G3):** Der Autor legt den Höhepunkt bzw. die Auflösung fest (ein Satz), bevor ein Hook entsteht.
2. **Hook-Paket:** Schlüsselbild (aus dem Scout) + Text-Overlay (≤ 6 Wörter) + Satz 1 + Ton (Groschen-Kling ab Abnahme) + TikTok-Cover.
3. **5 Hook-Varianten in mindestens 2 der 6 Hook-Formate** (Fortune Teller, Experimenter, Teacher, Magician, Investigator, Contrarian). Gewählt wird die mit dem größten Kontrast zum Schlüsselbild.
4. Regeln für Satz 1 und die Bann-Phrasen stehen in `docs/brand/STIMME.md`. Beispiel-Hooks je Serie: `docs/brand/SERIEN.md`.
5. Die Hook-Tore 1–5 prüft der Kritiker (§5).

Bewährt: Identitäts-Hook „Drei Nachbarn, drei Heizungen – welcher bist du?“ (TikTok 8.831), Marke + Grammzahl (S27). Schwach: abstrakte Zahlen ohne „du“, Nachrichten-Schlagzeilen („X steigt ab Januar“).

## 3. Skript (Agent „Autor“, Skills: short-form-video-script / youtube-long-form, storytelling-and-narrative)
- Short: 28–40 s, ≤ 90 Wörter, eine Kernzahl, Bauplan der Serie aus `docs/brand/SERIEN.md`, alle 5–8 s eine Wendung („aber“ bzw. „deshalb“). Absätze als Keys `hook, b1, b2, b3[, b4]`, Enden `yt` (passendes Langvideo bzw. „Folg Groschenfall für mehr“ + Abschlusszeile) und `tt` (Teilen-Satz + Abschlusszeile), siehe `docs/brand/STIMME.md`. Schlüsselbild und Pointe stehen oben im Skript.
- Langvideo: ~1.400–1.550 Wörter (≈ 10 min bei Tempo 1,06), Kapitel 0–7, alle ~60–90 s ein neuer Reiz (offene Frage, Wendung, Zahl mit „du“), Format wie `docs/Video05-Krankschreibung-Skript.md`.
- TTS-Regeln aus `docs/brand/STIMME.md`: Zahlen, Beträge, Paragrafen und Akronyme ausschreiben („zweitausendzweiundzwanzig“), **keine Gedankenstriche** im Sprechtext.

## 4. Faktencheck (Agent „Prüfer“, Skill: content-research-and-sourcing)
Jede Zahl, jedes Zitat gegen Primärquelle (Destatis, Ministerium, Gesetzestext, Studie, Originalinterview). Faktenblatt `work/<id>/fakten.md` mit Links. Nicht belegbar → umformulieren oder streichen. Zitate echter Personen nur wörtlich.

## 5. Kritiker (Agent mit `model: "fable"`, frischer Kontext; sieht nur Skript + Faktenblatt + `docs/brand/*` + Handbuch G2/G10 + PLAYBOOK §9)
Bewertet hart nach Rubrik PLAYBOOK §9 inkl. **Hook-Tore H1–H5** (Delay, Klarheit, Relevanz, Kontrast, Alignment; jedes Tor bestanden/nicht bestanden). **Freigabe nur bei ≥ 8/10 in jeder Kategorie und allen Hook-Toren bestanden.** Sonst Überarbeitung (max. 2 Runden), danach Thema verwerfen und nächsten Kandidaten nehmen. Das Tor H5 (Stumm-Test) prüft der Bild-Kritiker am Kontaktbogen (§7).

## 6. Stimme (ElevenLabs-Connector)
- Parameter versioniert in `docs/brand/STIMME.md`: Voice `r8MyP4qUsq5WFFSkPdfV` (Johannes), Modell `eleven_multilingual_v2`, **generations_count: 1**.
- Pro Short EIN Aufruf: Absätze getrennt durch `<break time="1.6s" />` (Hook ruhig als eigener Aufruf, wenn Betonung kritisch).
- Vorher `estimate_only: true` (zeigt nur die Kosten, nicht das Guthaben). Budget pro Nacht ~1.000 Credits für 1 Short; Langvideo-Stimme (Donnerstag) ~10.000–11.000 Credits. Fehlen Credits: sofort Jona melden (SendUserMessage + Push). Verbrauch in `state/credits.md` eintragen.
- `creative_get_flow_run_status` pollen, `content_url` mit `curl -sS -o` laden (Link 2 h gültig).
```bash
python3 tools/gf.py split work/<id> work/<id>/all.mp3 hook,b1,b2,b3,yt,tt   # schneidet an den N-1 längsten Pausen; Warnung beachten
python3 tools/gf.py voice work/<id> --tempo 1.10        # Shorts; Langvideo --tempo 1.06
python3 tools/gf.py short work/<id> remotion s<NR> hook,b1,b2,b3
```
`work/<id>/texts.json` vorher anlegen (Key → exakter gesprochener Text ohne break-Tags).
Zahlenlastige Shorts: ≤ 100 Wörter, ausgeschriebene Zahlen sprechen lange (S10 mit 107 Wörtern = 56 s).

## 7. Animation (Regie: Hauptagent; Skill: remotion-best-practices)
- Look, Schlüsselbild und Groschen: `docs/brand/LOOK.md`. **Frame 0 = Schlüsselbild** (Gegenstand + Euro-Betrag). Ab Abnahme von `remotion/src/kit/Groschen.tsx` (§B) fällt der Groschen in den ersten 0,5 s mit Klick-Kling daneben und reagiert, ohne den Betrag zu verdecken; Endbild = Groschen + Name. Pro Folge Setting/Shot-Plan variieren (Handbuch G9).
- Vorlage ab 28.10.: `remotion/src/ch/Short21.tsx`/`Short22.tsx` (Enden `EndYT line={CLOSING}` und `EndShare` = Teilen-Satz + Abschlusszeile laut `docs/brand/STIMME.md`; Untertitel enden mit `b4`). Ältere Vorlage: `remotion/src/ch/Short9.tsx`–`Short11.tsx` mit Baukasten `src/ch/shortkit.tsx` (Szenenliste, Untertitel mit Zahlen-Ersetzung `["vierundsiebzig komma neun prozent","74,9 %"]`, Quellenzeile `Src`, Enden `EndYT` = „Folg Groschenfall“ wenn kein Langvideo, `EndTT` = Frage + Buttons). Ältere Vorlage `Short8.tsx` (YT-Ende mit Langvideo-Thumbnail). Neue Datei `src/ch/Short<NR>.tsx`, in `src/Root.tsx` registrieren (`Short<NR>YT`, `Short<NR>TT`).
- Wort-Anker `wk(key, "wort", n)` sucht per Wortanfang – Falle: „zwei“ trifft „zweihundert…“. Für exakte Treffer `wk(key, "=zwei")`.
- Erstes Bild = Schlüsselbild, wenig Text, eine klare Illustration. Echte Personen nur stilisiert (wie `MerzBust`), nie Logos/Markenverpackungen (Produkte als eigene Illustration).
- SFX nur `soft, whoosh, stamp, ding, paper, marimba, coins` (kein „pop“).
- Kontrolle: `node stills.mjs Short<NR>TT 0,90,...` (ca. 20 Frames: jeder Szenenanfang + Mitte) → `python3 tools/sheet.py remotion/out/Short<NR>TT <frames> remotion/out/sheet<NR>.png` → Kontaktbogen mit Read ansehen. Prüfen: Text abgeschnitten, Überlappungen, Bild passt zum gesprochenen Wort (falscher Wort-Anker!), leere Szenen. **Bild-Kritiker** (fable, frischer Kontext, sieht nur Kontaktbogen + `docs/brand/LOOK.md` + Handbuch G1/G2/G10, Urteil „pass“/„nachbessern“) prüft zusätzlich den **Stumm-Test** an Frame 0 / 0,5 s / 1 s / 2 s (Hook-Tor H5) und die Handbuch-Checkliste G10. Fixen, erst dann rendern. Stills der Shorts **nacheinander** erzeugen (parallel kollidiert der Bundler). `EndYT`-Zeile ≤ 40 Zeichen, sonst abgeschnitten.
- Rendern dauert ca. 3–5 min pro Version; Stills und Mixe parallel dazu verlangsamen alles. Lange Jobs mit `nohup … &` starten und nicht `pkill -f renderall` benutzen (trifft die eigene Shell).
```bash
cd remotion && node renderall.mjs Short<NR>YT Short<NR>TT && cd ..
python3 tools/gf.py mixshort remotion/out/v4_Short<NR>YT.mp4 out/$D/Groschenfall_Short<NR>_<Slug>_YouTube.mp4
python3 tools/gf.py mixshort remotion/out/v4_Short<NR>TT.mp4 out/$D/Groschenfall_Short<NR>_<Slug>_TikTok-Insta.mp4
```
Langvideo: Kapitel als `src/v<NR>/V<NR>Ch<i>.tsx` nach Muster `src/v5/`, `gf.py long`, rendern, `gf.py mixlong` (Musikplan hook→k23→k45→k67), `gf.py srt`, `gf.py compress`. Thumbnail im Stil von Video 2 (`src/ch/Thumb5.tsx` T5D): Kicker amber, 2-zeilige weiße Headline mit amber „?“, ein großes schattiertes 3D-Objekt auf Schräge + Figur (ab Abnahme der Groschen). **3 deutlich verschiedene** Varianten für den A/B-Test „Testen & vergleichen“ (Packaging-Paket, `docs/brand/SERIEN.md`).

## 8. Texte
`out/$D/UPLOAD.md`: pro Video Titel (YouTube, Suchwort in den ersten 5 Wörtern, Präfix identisch zu TikTok), Beschreibung mit Quellen + Stand-Datum + KI-Hinweis, Tags, angepinnter Kommentar, TikTok-Caption, TikTok-Cover = Schlüsselbild, Uhrzeit (Short 19:00, Langvideo Sonntag 17:00), „Ähnliches Video“-Empfehlung (nur wenn thematisch passend), **Kennung A/B/Experiment + Serie**, **Erwartung 48 h** (siehe §9a). Nie „Made for Kids“.

## 9. Abliefern
1. Alle Dateien aus `out/$D/` mit SendUserFile schicken (Videos `display: attach`).
2. Falls der PC erreichbar ist: per `device_commit_files` nach `C:\Users\barte\Videos\Groschenfall\Nacht\<Datum>\` (vorher nach /mnt/user-data/outputs kopieren). Voraussetzung: Der Ordner `Videos\Groschenfall` ist in der Sitzung verbunden (`get_device_info.connectedFolders`); nachts kann niemand eine Freigabe bestätigen. Nicht erreichbar ist kein Fehler.
3. `state/topics_done.md` + `state/log.md` ergänzen, neue `.tsx`-Dateien und Texte committen und pushen (keine mp4/wav).
4. Eine kurze Zusammenfassung an Jona (SendUserMessage + Push): was fertig ist, Hooks, offene Punkte.

## 9a. Terminieren (seit 24.10.2026, Jonas Entscheidung)
Nur Shorts mit Kritiker-Freigabe. **Vor dem Terminieren (Handbuch G7):** in `state/log.md` pro Short eintragen: Kennung A/B/Experiment, Serie, `Erwartung 48 h: TT [Aufrufe]/[Ø s] · YT [Aufrufe]/[bis Ende %]` (Werte laut AUSWERTUNG_AKTUELL). **1 Short pro Tag um 19:00** (Europe/Berlin) am selben Tag. Liegen mehrere freigegebene Shorts bereit (z. B. in docs/vorbereitet/), den mit dem höheren Hook-Score zuerst; die übrigen bleiben für die Folgetage liegen (zeitkritische Themen vorziehen).
- **YouTube-Kanal prüfen:** Studio öffnet evtl. zuerst einen fremden Kanal (29.10.: „Hamsterfrei“, UCBmT3RjRK5PGk-YVTdFzuDA). Nur die feste URL mit `UC9YJQdkr4rRO-jwkB2aY_kw` benutzen; meldet sie „nicht berechtigt“: über das Kontomenü oben rechts („Konto wechseln“) einen bereits angemeldeten Kanal namens **Groschenfall** wählen (kein Passwort, keine neue Anmeldung). Gibt es ihn dort nicht → YouTube nicht erreichbar, nur TikTok terminieren, YouTube-Shorts als „Upload offen“ führen.
- **Zugang:** Claude-in-Chrome auf Jonas PC. Zwei Browser verbunden: `list_connected_browsers`, dann je `select_browser` + tiktok.com/tiktokstudio → Konto **exakt** per JS prüfen: `(await fetch('https://www.tiktok.com/passport/web/account/info/?aid=1988').then(r=>r.json())).data.username === 'groschenfall_yt'` (keine HTML-Textsuche mehr) UND `studio.youtube.com/channel/UC9YJQdkr4rRO-jwkB2aY_kw/videos/short` lädt ohne „nicht berechtigt“. Nur ein Browser, der BEIDES erfüllt, wird benutzt. Zeigt ein Browser schattengast → sofort Tab schließen. Jedes andere Konto (am 29.10. abends: TikTok „hamsterfrei“ + fremdes Google-Konto in Browser 2) = **nicht erreichbar** → nie hochladen, nichts umstellen. Am 28.10. war „Browser 2“ Groschenfall, „Browser 1“ Schattengast (Reihenfolge kann sich ändern, immer prüfen). Nicht erreichbar → nichts terminieren, Shorts trotzdem fertigstellen und ablegen (§9), in `state/log.md` je Short „**Upload offen**“ eintragen und Jona per Push melden.
- **Offene Uploads (seit Auswertung 29.10.):** Vor dem Terminieren neuer Shorts in `state/log.md` nach „Upload offen“ suchen. Gibt es welche und ist der Zugang wieder da: zuerst diese terminieren (je 1 pro Tag um 19:00 an den nächsten freien Tagen, max. 1 Short pro Tag und Plattform; Dateien von Jonas PC per `device_stage_files` holen), danach die neuen. **Halde-Grenze:** Liegen schon ≥ 2 Shorts mit „Upload offen“ oder freigegeben in docs/vorbereitet/, produziert die Nacht KEINE neuen Shorts (Credits sparen), sondern nur Langvideo-Etappen ohne neue Stimme und meldet es. Nie Passwörter eingeben, nichts löschen, keine Einstellungen ändern (Hinweis-Dialoge mit „Abbrechen“/„Verstanden“ schließen).
- **Dateigröße:** `file_upload` der Erweiterung schafft max. 10 MB pro Aufruf → vorher 2-Pass-x264 auf ~9,2 MB rechnen (Zielbitrate = 9,2·8·1024² / Dauer − 128k, `-preset medium`), Ablage unter `/mnt/user-data/outputs/upload/` (nur dort/verbundene Ordner sind erlaubt).
- **YouTube Studio** (Kanal Groschenfall, ID `UC9YJQdkr4rRO-jwkB2aY_kw`; prüfen, dass nicht der Privatkanal „Jona Bartenbach“ aktiv ist): `studio.youtube.com/channel/<ID>/videos/upload?d=ud` → `find` „file input“ → `file_upload`. Titel/Beschreibung per `find` (Textbox-Ref) anklicken, dann tippen (Klick auf Koordinaten traf das Feld nicht immer); mit JS `ytcp-uploads-dialog #textbox` Länge prüfen. „Nein, nicht speziell für Kinder“, „Mehr anzeigen“ → „Ja, es wurde KI verwendet“, Tags kommagetrennt. Keine Kommas innerhalb eines Tags („66,80 €“ wird zerlegt). Beschreibung tippen meldet oft nach 30 s Timeout, kommt aber vollständig an → per JS Länge prüfen, nie doppelt tippen. Datumsfeld steht nachts auf dem Folgetag → immer tippen. 3× „Weiter“. „Veröffentlichungszeitpunkt festlegen“ aufklappen: Datum **im Kalender-Eingabefeld tippen** (Klick auf Tage verrutscht), Uhrzeit tippen + Enter, danach Uhrzeit nochmals kontrollieren (wurde einmal auf 00:00 zurückgesetzt), Zeitzone „(GMT+0200/0100) Ortszeit“. Button „Veröffentlichungszeitpunkt festlegen“ → Bestätigungsdialog mit Link notieren.
- **TikTok Studio:** `tiktok.com/tiktokstudio/upload` (lädt ~10 s), versteckten file input per `find`. Dialog „Automatische Inhaltsprüfungen“ → „Abbrechen“. Beschreibung: Dateiname löschen (Strg+A, Entf), Caption tippen; Hashtags einzeln tippen, 2 s warten, Enter (übernimmt Vorschlag). Der erste Hashtag direkt nach einem Zeilenumbruch geht manchmal verloren → am Ende prüfen und nachtragen. Nach dem Tippen Caption per JS (`document.querySelector('[contenteditable="true"]').innerText`) prüfen – am 26.10. ging der Text einmal komplett verloren (nur Hashtags blieben); kein „≈“ verwenden. **Seit 27.10. bewährt:** erst die 5 Hashtags tippen (je 2 s warten + Enter), dann Strg+Pos1 und den Caption-Text davor tippen – Text vor Hashtags ging zweimal verloren. „Zeitplan“ wählen (Dialog „Erlauben“), Uhrzeit im Scroll-Picker: Stunde anklicken, Minutenliste nach oben scrollen, „00“ anklicken, Zoom-Kontrolle, dann „Planen“. Danach in der Inhaltsliste Datum/Uhrzeit prüfen.
- **Instagram: PAUSIERT** (Jonas Entscheidung 29.10.2026). Nicht terminieren, nicht als offenen Punkt melden. Die TikTok/Insta-Datei bleibt nur für TikTok.
- **Fenster minimiert/Screenshots hängen (30.10.):** YouTube-Titel/Beschreibung per JS `document.execCommand('insertText')` in `ytcp-uploads-dialog #textbox` (Tags: insertText ins Tags-Feld, dann Klick + Taste Enter), Datum per JS-Klick auf `.calendar-day.today` (bzw. Tag-Element), Uhrzeit per JS-Klick auf `tp-yt-paper-item` mit Text „17:00“, Zeitzone-Item „(GMT+0100) Ortszeit“. TikTok: Caption NIE per execCommand (Seite stürzt ab) – Tastatur-Tippen wie oben; Zeitplan-Radio per JS-Klick aufs Label, Uhrzeit per Pointer-Events auf `.Picker__trigger` (Uhrzeit) und `.TimePicker__item` (Stunden = erste 24, Minuten danach).
- **Stand 02.11.:** Browser-Namen („Browser 1–3“) wechseln – nur per deviceId + JS-Kontoprüfung entscheiden (deviceId 2d7e7af3 zeigte am 02.11. TikTok „hamsterfrei“). TikTok-Zeit-Picker heißt jetzt `.tiktok-timepicker-option-item` (erst 24 Stunden, dann Minuten): Pointer-Events + `.click()` auf das innere `span`. TikTok-Caption: Feld per JS fokussieren (`ce.focus()` + Range), dann Tastatur. YouTube: nach dem Planen Dialog „Vorabprüfung läuft noch“ → OK. Ablage: `device_commit_files` max. 30 MB/Datei (größere Dateien in Teile schneiden), große Dateien nur über SendUserFile-fileUuid.
- Ergebnis (Plattform, Uhrzeit, Link) in `state/log.md` und in die Nachricht an Jona.

## L. Wochen-Langvideo in Etappen (seit 28.10.2026)
Ein ~10-min-Video pro Woche, Veröffentlichung **Sonntag 17:00**. Seit 04.11.2026 terminiert der Nachtlauf es **selbst** auf YouTube (Kanal Groschenfall, Profilprüfung wie §9a; nur YouTube, kein TikTok/Instagram), sobald Text-Kritiker UND Bild-Kritiker (Kontaktbögen aller Kapitel) freigegeben haben – spätestens im Samstagslauf, Nachzügler im Sonntagslauf bis 15:30. Vorher Fakten auf Tagesstand prüfen. Ohne Freigabe: nicht terminieren, Jona melden. Upload großer Dateien: Teile aus der Ablage stagen (`device_stage_files`), im Container zusammensetzen (Teile per `cat` bzw. ffmpeg-concat), mit ffprobe Länge prüfen, dann hochladen; klappt das nicht, lokal neu rendern. YouTube-Felder: Titel, Beschreibung mit Quellen + Kapitelmarken, Tags (ohne Kommas), Thumbnail (Haupt-Thumbnail; Test & Compare mit den anderen zwei, falls angeboten), KI-Angabe „Ja“, Zeitplan Sonntag 17:00. Etappe nach Wochentag des Laufs (Europe/Berlin, Lauf startet ~01:37). Stand, Thema, Dateien und offene Punkte in `state/langvideo.md` führen; hängt eine Etappe, zuerst nachholen.
| Lauf | Etappe |
|---|---|
| Montag | Thema wählen (Scout; Formeln aus `docs/brand/SERIEN.md` bzw. Thema des stärksten Shorts der Vorwoche), Recherche, Faktenblatt mit Primärquellen, **Packaging-Paket: 10 Titel + 3 deutlich verschiedene Thumbnail-Konzepte** (vor dem Skript) |
| Dienstag | Skript v1 (~1.450 Wörter, Kapitel 0–7; Pointe zuerst, Intro < 45 s, Versprechen in den ersten 10 s eingelöst; der Groschen führt durch), Faktencheck, Kritiker Runde 1 (inkl. Hook-Tore) |
| Mittwoch | Überarbeitung, Kritiker-Freigabe (≥ 8/10 je Kategorie), Storyboard: Szenenliste je Kapitel |
| Donnerstag | Stimme kapitelweise (ElevenLabs, estimate_only vorher), Musikplan, Animation Kapitel 0–2 |
| Freitag | Animation Kapitel 3–5 |
| Samstag | Kapitel 6–7, Kontaktbogen + Bild-Kritiker, Render, Mix, SRT, Komprimieren, 3 Thumbnails, UPLOAD.md → Ablage, **auf YouTube für Sonntag 17:00 terminieren** + Nachricht an Jona (Link; er kann bis 17 Uhr stoppen) |
| Sonntag | Puffer: falls Samstag nicht fertig – fertigstellen und bis 15:30 für 17:00 terminieren; der 19-Uhr-Short verweist nur dann aufs Langvideo, wenn das Thema passt |
Shorts gehen in jeder Nacht vor, außer Samstag (dann Langvideo zuerst fertigstellen, notfalls nur 1 Short und melden).
**Verpasster Sonntag:** Wurde das Langvideo nicht bis Samstag fertig, rutscht es auf den nächsten Sonntag 17:00; die Montags-Etappe (neues Thema) entfällt dann, die Läufe holen nach den Shorts die fehlenden Etappen nach (vorher Fakten neu prüfen). Erst danach beginnt ein neues Wochenthema.

## B. Bau-Etappe Marke v2: Maskottchen „Der Groschen“ (Nacht 05.11.2026, einmalig)
Ziel: Code-Baustein `remotion/src/kit/Groschen.tsx` nach `docs/brand/LOOK.md`. **Der Short des 05.11. (S30, 19:00) hat Vorrang und darf nicht gefährdet werden.**
1. **Reihenfolge:** Erst S30 fertig stellen, terminieren und den Zwischenstand committen. Dann Groschen bauen. Läuft das Fenster knapp (Spätstart, Fehler), den Bau abbrechen und in der nächsten Nacht nach dem Short fortsetzen. Die V8-Etappe Do (Faktencheck, Kritiker, Storyboard) kommt nach dem Groschen; wenn die Zeit nicht reicht, hat V8 Vorrang vor dem Feinschliff des Groschen.
2. **Bauen:** SVG/React-Komponente mit Props `reaction` (`schreck`, `augenrollen`, `lupe`, `triumph`, `kopfschuetteln`), `x`, `y`, `size`, `startFrame`, `fall` (Signet: Fall in ≤ 0,5 s + Landung + Reaktion). Farben aus LOOK.md, „10“-Prägung, große Augen, optionale Ärmchen. Nichts generieren (keine Bild-/Video-KI). Neue Dateien nur zusätzlich, `shortkit.tsx` und bestehende Shorts nicht verändern (Änderungen nur an Kopien, Handbuch G8). Eine Test-Composition `GroschenTest` (1080×1920, 30 fps) in `Root.tsx` registrieren.
3. **Kontaktbogen:** Stills aller 5 Reaktionen + Signet-Ablauf (Frame 0, 5, 10, 15, 30) neben einem Beispiel-Schlüsselbild mit Euro-Betrag + Endbild (Groschen + „Groschenfall.“) → `tools/sheet.py`.
4. **Bild-Kritiker** (fable, frischer Kontext, sieht nur Kontaktbogen + LOOK.md + Handbuch): Prüfpunkte aus LOOK.md, Urteil „pass“ oder „nachbessern“ (max. 2 Runden pro Nacht).
5. **Ab „pass“:** Signet in **allen** Shorts (A und B gleich) und im Langvideo **V8** (Cold Open, Re-Hooks, Endbild). Endkarten: neue Varianten `EndShareG`/`EndYTG` in einer neuen Datei statt Änderung an `shortkit.tsx`. Ergebnis in `state/log.md` („Groschen abgenommen am …“) und Jona melden (Kontaktbogen mitschicken). Ohne „pass“ laufen die Shorts ohne Signet weiter (Log: „ohne Signet“).

## Abbruchregeln
- Faktenlage unklar → Thema verwerfen statt raten.
- Credits knapp → Langvideo auslassen, Shorts priorisieren.
- Render-Fehler nach 2 Versuchen → Short weglassen, im Log notieren.
