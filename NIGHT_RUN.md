# Groschenfall – Nachtproduktion (Runbook)

Ziel pro Nacht (seit 28.10.2026, Jonas Entscheidung): **2 Shorts** (je YouTube- und TikTok/Insta-Version), terminiert **für denselben Tag 17:00 und 19:00 Uhr** (§9a), plus die **Etappe des Wochen-Langvideos** (§L): ein ~10-Minuten-Video pro Woche, Veröffentlichung **Sonntag 18:00**. **Niemals sofort veröffentlichen.** Langvideos nie automatisch terminieren (Jona gibt frei).

**Vor allem anderen:** `docs/AUSWERTUNG_AKTUELL.md` lesen – die dort festgelegten Verbesserungen sind Pflicht und gehen dem Playbook vor.

Regeln, die immer gelten, stehen in `docs/KANAL_REGELN.md`. Handwerk (Hooks, Skript, Thumbnail, Titel, Kritik-Rubrik) steht in `docs/PLAYBOOK.md`.

## 0. Setup (frische Umgebung)
```bash
cd remotion && npm ci --no-audit --no-fund && cd ..
mkdir -p work out
D=$(TZ=Europe/Berlin date +%Y-%m-%d)
```
Python (numpy, scipy, Pillow) und ffmpeg sind vorinstalliert. Browser: die Render-Skripte suchen `chrome-headless-shell` automatisch unter `/opt/pw-browsers/` (überschreibbar mit `GF_BROWSER`).
Nachtnummer: `state/log.md` lesen. Langvideo: Etappe laut §L und `state/langvideo.md`.
Läuft die Routine in derselben Nacht ein zweites Mal (Log hat schon einen Eintrag mit heutigem Datum): keine neuen Shorts, sondern offene Punkte aus dem Log erledigen.

## 1. Themen (Agent „Scout“, Skills: idea-generation-and-ideation, trend-jacking, tubealfred youtube-keyword-ideas wenn verbunden)
- Websuche: deutsche Nachrichten der letzten 7 Tage zu Geld, Steuern, Rente, Bürgergeld, Arbeit, Mieten, Preise, Politiker-Aussagen mit Zahlen.
- `state/topics_done.md` lesen, keine Wiederholungen.
- 10 Kandidaten, jeder mit Scoring nach PLAYBOOK §1 **und** Themenfilter M2 (Nutzwert-Frage + Suchwort) aus `docs/AUSWERTUNG_AKTUELL.md`. Nur Themen mit **Score ≥ 8/10** und belegbaren Primärquellen.
- Langes Video: Thema muss zum Shorts-Publikum passen (siehe Kanal-Analyse); bevorzugt das Thema der stärksten Shorts der Vorwoche vertiefen. Sonntag: der 17-Uhr-Short ist Teaser aufs Langvideo („heute 18 Uhr“); Montag: ein Short verweist darauf („Ähnliches Video“ setzen).

## 2. Hooks (Agent „Hook“, Skill: hook-writer)
Pro Short 5 Hook-Varianten (gesprochen + Text im Bild), dann die beste nach PLAYBOOK §2. Muster, die bei uns funktioniert haben: Auslandsvergleich („In Frankreich …“), persönlich mit Zahl („Früher 5, heute 2 – einer davon bist du“), wörtliches Politiker-Zitat mit Kontext. Schwach: abstrakte Zahlen ohne „du“, Nachrichten-Schlagzeilen („X steigt ab Januar“). Seit 28.10. Pflicht: Regeln M1 in `docs/AUSWERTUNG_AKTUELL.md` (Satz 1, Bild 1, Ton ab 0,2 s). Stärkster Treffer bisher: Identitäts-Hook „Drei Nachbarn, drei Heizungen – welcher bist du?“ (TikTok 8.831).

## 3. Skript (Agent „Autor“, Skills: short-form-video-script / youtube-long-form, storytelling-and-narrative)
- Short: 28–40 s, ≤ 90 Wörter, eine Kernzahl (AUSWERTUNG_AKTUELL M1); Absätze als Keys `hook, b1, b2, b3[, b4]`, Enden `yt` (Verweis aufs lange Video, wenn vorhanden, sonst „Folg Groschenfall für mehr“) und `tt` (Kommentarfrage).
- Langvideo: ~1.400–1.550 Wörter (≈ 10 min bei Tempo 1,06), Kapitel 0–7, alle ~60–90 s ein neuer Reiz (offene Frage, Wendung, Zahl mit „du“), Format wie `docs/Video05-Krankschreibung-Skript.md`.
- Zahlen für die Stimme ausschreiben („zweitausendzweiundzwanzig“).

## 4. Faktencheck (Agent „Prüfer“, Skill: content-research-and-sourcing)
Jede Zahl, jedes Zitat gegen Primärquelle (Destatis, Ministerium, Gesetzestext, Studie, Originalinterview). Faktenblatt `work/<id>/fakten.md` mit Links. Nicht belegbar → umformulieren oder streichen. Zitate echter Personen nur wörtlich.

## 5. Kritiker (Agent mit `model: "fable"`, sieht nur Skript + Faktenblatt + PLAYBOOK §9)
Bewertet hart nach Rubrik. **Freigabe nur bei ≥ 8/10 in jeder Kategorie.** Sonst Überarbeitung (max. 2 Runden), danach Thema verwerfen und nächsten Kandidaten nehmen.

## 6. Stimme (ElevenLabs-Connector)
- Voice `r8MyP4qUsq5WFFSkPdfV` (Johannes), Modell `eleven_multilingual_v2`, **generations_count: 1**.
- Pro Short EIN Aufruf: Absätze getrennt durch `<break time="1.6s" />` (Hook ruhig als eigener Aufruf, wenn Betonung kritisch).
- Vorher `estimate_only: true` (zeigt nur die Kosten, nicht das Guthaben). Budget pro Nacht ~2.000 Credits für 2 Shorts; Langvideo-Stimme (Donnerstag) ~10.000–11.000 Credits. Fehlen Credits: sofort Jona melden (SendUserMessage + Push). Verbrauch in `state/credits.md` eintragen.
- `creative_get_flow_run_status` pollen, `content_url` mit `curl -sS -o` laden (Link 2 h gültig).
```bash
python3 tools/gf.py split work/<id> work/<id>/all.mp3 hook,b1,b2,b3,yt,tt   # schneidet an den N-1 längsten Pausen; Warnung beachten
python3 tools/gf.py voice work/<id> --tempo 1.10        # Shorts; Langvideo --tempo 1.06
python3 tools/gf.py short work/<id> remotion s<NR> hook,b1,b2,b3
```
`work/<id>/texts.json` vorher anlegen (Key → exakter gesprochener Text ohne break-Tags).
Zahlenlastige Shorts: ≤ 100 Wörter, ausgeschriebene Zahlen sprechen lange (S10 mit 107 Wörtern = 56 s).

## 7. Animation (Regie: Hauptagent; Skill: remotion-best-practices)
- Vorlage: `remotion/src/ch/Short9.tsx`–`Short11.tsx` mit Baukasten `src/ch/shortkit.tsx` (Szenenliste, Untertitel mit Zahlen-Ersetzung `["vierundsiebzig komma neun prozent","74,9 %"]`, Quellenzeile `Src`, Enden `EndYT` = „Folg Groschenfall“ wenn kein Langvideo, `EndTT` = Frage + Buttons). Ältere Vorlage `Short8.tsx` (YT-Ende mit Langvideo-Thumbnail). Neue Datei `src/ch/Short<NR>.tsx`, in `src/Root.tsx` registrieren (`Short<NR>YT`, `Short<NR>TT`).
- Wort-Anker `wk(key, "wort", n)` sucht per Wortanfang – Falle: „zwei“ trifft „zweihundert…“. Für exakte Treffer `wk(key, "=zwei")`.
- Erstes Bild = selbsterklärendes Titelbild, wenig Text, eine klare Illustration. Echte Personen nur stilisiert (wie `MerzBust`), nie Logos/Markenverpackungen.
- SFX nur `soft, whoosh, stamp, ding, paper, marimba, coins` (kein „pop“).
- Kontrolle: `node stills.mjs Short<NR>TT 0,90,...` (ca. 20 Frames: jeder Szenenanfang + Mitte) → `python3 tools/sheet.py remotion/out/Short<NR>TT <frames> remotion/out/sheet<NR>.png` → Kontaktbogen mit Read ansehen. Prüfen: Text abgeschnitten, Überlappungen, Bild passt zum gesprochenen Wort (falscher Wort-Anker!), leere Szenen. Fixen, erst dann rendern. Stills der Shorts **nacheinander** erzeugen (parallel kollidiert der Bundler). `EndYT`-Zeile ≤ 40 Zeichen, sonst abgeschnitten.
- Rendern dauert ca. 3–5 min pro Version; Stills und Mixe parallel dazu verlangsamen alles. Lange Jobs mit `nohup … &` starten und nicht `pkill -f renderall` benutzen (trifft die eigene Shell).
```bash
cd remotion && node renderall.mjs Short<NR>YT Short<NR>TT && cd ..
python3 tools/gf.py mixshort remotion/out/v4_Short<NR>YT.mp4 out/$D/Groschenfall_Short<NR>_<Slug>_YouTube.mp4
python3 tools/gf.py mixshort remotion/out/v4_Short<NR>TT.mp4 out/$D/Groschenfall_Short<NR>_<Slug>_TikTok-Insta.mp4
```
Langvideo: Kapitel als `src/v<NR>/V<NR>Ch<i>.tsx` nach Muster `src/v5/`, `gf.py long`, rendern, `gf.py mixlong` (Musikplan hook→k23→k45→k67), `gf.py srt`, `gf.py compress`. Thumbnail im Stil von Video 2 (`src/ch/Thumb5.tsx` T5D): Kicker amber, 2-zeilige weiße Headline mit amber „?“, ein großes schattiertes 3D-Objekt auf Schräge + Figur. 3 Varianten für A/B-Test.

## 8. Texte
`out/$D/UPLOAD.md`: pro Video Titel (YouTube), Beschreibung mit Quellen + KI-Hinweis, Tags, angepinnter Kommentar, TikTok/Insta-Caption (Instagram max. 5 Hashtags), Uhrzeit (Shorts 17:00 und 19:00, Langvideo Sonntag 18:00), „Ähnliches Video“-Empfehlung.

## 9. Abliefern
1. Alle Dateien aus `out/$D/` mit SendUserFile schicken (Videos `display: attach`).
2. Falls der PC erreichbar ist: per `device_commit_files` nach `C:\Users\barte\Videos\Groschenfall\Nacht\<Datum>\` (vorher nach /mnt/user-data/outputs kopieren). Voraussetzung: Der Ordner `Videos\Groschenfall` ist in der Sitzung verbunden (`get_device_info.connectedFolders`); nachts kann niemand eine Freigabe bestätigen. Nicht erreichbar ist kein Fehler.
3. `state/topics_done.md` + `state/log.md` ergänzen, neue `.tsx`-Dateien und Texte committen und pushen (keine mp4/wav).
4. Eine kurze Zusammenfassung an Jona (SendUserMessage + Push): was fertig ist, Hooks, offene Punkte.

## 9a. Terminieren (seit 24.10.2026, Jonas Entscheidung)
Nur Shorts mit Kritiker-Freigabe. Den stärkeren Short (höherer Kritiker-Score beim Hook) auf 19:00. Zeiten Europe/Berlin: **17:00 und 19:00** am selben Tag.
- **Zugang:** Claude-in-Chrome auf Jonas PC (`tabs_context_mcp`). Nicht erreichbar → nichts terminieren, melden. Nie Passwörter eingeben, nichts löschen, keine Einstellungen ändern (Hinweis-Dialoge mit „Abbrechen“/„Verstanden“ schließen).
- **Dateigröße:** `file_upload` der Erweiterung schafft max. 10 MB pro Aufruf → vorher 2-Pass-x264 auf ~9,2 MB rechnen (Zielbitrate = 9,2·8·1024² / Dauer − 128k, `-preset medium`), Ablage unter `/mnt/user-data/outputs/upload/` (nur dort/verbundene Ordner sind erlaubt).
- **YouTube Studio** (Kanal Groschenfall, ID `UC9YJQdkr4rRO-jwkB2aY_kw`; prüfen, dass nicht der Privatkanal „Jona Bartenbach“ aktiv ist): `studio.youtube.com/channel/<ID>/videos/upload?d=ud` → `find` „file input“ → `file_upload`. Titel/Beschreibung per `find` (Textbox-Ref) anklicken, dann tippen (Klick auf Koordinaten traf das Feld nicht immer); mit JS `ytcp-uploads-dialog #textbox` Länge prüfen. „Nein, nicht speziell für Kinder“, „Mehr anzeigen“ → „Ja, es wurde KI verwendet“, Tags kommagetrennt. Keine Kommas innerhalb eines Tags („66,80 €“ wird zerlegt). Beschreibung tippen meldet oft nach 30 s Timeout, kommt aber vollständig an → per JS Länge prüfen, nie doppelt tippen. Datumsfeld steht nachts auf dem Folgetag → immer tippen. 3× „Weiter“. „Veröffentlichungszeitpunkt festlegen“ aufklappen: Datum **im Kalender-Eingabefeld tippen** (Klick auf Tage verrutscht), Uhrzeit tippen + Enter, danach Uhrzeit nochmals kontrollieren (wurde einmal auf 00:00 zurückgesetzt), Zeitzone „(GMT+0200/0100) Ortszeit“. Button „Veröffentlichungszeitpunkt festlegen“ → Bestätigungsdialog mit Link notieren.
- **TikTok Studio:** `tiktok.com/tiktokstudio/upload` (lädt ~10 s), versteckten file input per `find`. Dialog „Automatische Inhaltsprüfungen“ → „Abbrechen“. Beschreibung: Dateiname löschen (Strg+A, Entf), Caption tippen; Hashtags einzeln tippen, 2 s warten, Enter (übernimmt Vorschlag). Der erste Hashtag direkt nach einem Zeilenumbruch geht manchmal verloren → am Ende prüfen und nachtragen. Nach dem Tippen Caption per JS (`document.querySelector('[contenteditable="true"]').innerText`) prüfen – am 26.10. ging der Text einmal komplett verloren (nur Hashtags blieben); kein „≈“ verwenden. **Seit 27.10. bewährt:** erst die 5 Hashtags tippen (je 2 s warten + Enter), dann Strg+Pos1 und den Caption-Text davor tippen – Text vor Hashtags ging zweimal verloren. „Zeitplan“ wählen (Dialog „Erlauben“), Uhrzeit im Scroll-Picker: Stunde anklicken, Minutenliste nach oben scrollen, „00“ anklicken, Zoom-Kontrolle, dann „Planen“. Danach in der Inhaltsliste Datum/Uhrzeit prüfen.
- **Instagram:** instagram.com kann nicht planen. Nur Meta Business Suite (`business.facebook.com`, Reel erstellen → Planen). Nicht eingeloggt → nicht terminieren, melden.
- Ergebnis (Plattform, Uhrzeit, Link) in `state/log.md` und in die Nachricht an Jona.

## L. Wochen-Langvideo in Etappen (seit 28.10.2026)
Ein ~10-min-Video pro Woche, Veröffentlichung **Sonntag 18:00** (Jona gibt frei, nicht automatisch terminieren). Etappe nach Wochentag des Laufs (Europe/Berlin, Lauf startet ~01:37). Stand, Thema, Dateien und offene Punkte in `state/langvideo.md` führen; hängt eine Etappe, zuerst nachholen.
| Lauf | Etappe |
|---|---|
| Montag | Thema wählen (Scout; bevorzugt Thema der besten Shorts der Vorwoche), Recherche, Faktenblatt mit Primärquellen, 5 Titel-Ideen + 3 Thumbnail-Konzepte |
| Dienstag | Skript v1 (~1.450 Wörter, Kapitel 0–7, Hook der ersten 30 s nach AUSWERTUNG_AKTUELL), Faktencheck, Kritiker Runde 1 |
| Mittwoch | Überarbeitung, Kritiker-Freigabe (≥ 8/10 je Kategorie), Storyboard: Szenenliste je Kapitel |
| Donnerstag | Stimme kapitelweise (ElevenLabs, estimate_only vorher), Musikplan, Animation Kapitel 0–2 |
| Freitag | Animation Kapitel 3–5 |
| Samstag | Kapitel 6–7, Kontaktbogen + Bild-Kritiker, Render, Mix, SRT, Komprimieren, 3 Thumbnails, UPLOAD.md → Ablage + Nachricht an Jona: „bitte bis Sonntag 17 Uhr prüfen“ |
| Sonntag | Puffer: Korrekturen, falls nötig; 17-Uhr-Short = Teaser aufs Langvideo |
Shorts gehen in jeder Nacht vor, außer Samstag (dann Langvideo zuerst fertigstellen, notfalls nur 1 Short und melden).

## Abbruchregeln
- Faktenlage unklar → Thema verwerfen statt raten.
- Credits knapp → Langvideo auslassen, Shorts priorisieren.
- Render-Fehler nach 2 Versuchen → Short weglassen, im Log notieren.
