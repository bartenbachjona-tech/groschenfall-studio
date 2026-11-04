# Groschenfall – Auswertungs-Log
Format: `## YYYY-MM-DD` · Zahlen seit letzter Auswertung · Messziele (erreicht/verfehlt) · Konkurrenz-Beobachtung · Reparaturen · Kritiker-Note

## 2026-10-28 (manuell, Basis)
Siehe docs/Auswertung-2026-10-28.md. Maßnahmen M1–M3 eingeführt. Messziele: TikTok Ø-Wiedergabe ≥ 14 s, YT bis zum Ende ≥ 55 %, TikTok-Follower +20/7 Tage, Share-Rate ≥ 0,6 %, Langvideo-Klickrate ≥ 4 %.

## 2026-10-29 (automatisch, 23:25–00:15 MEZ)
**Datenlage:** TikTok Studio + YouTube Studio NICHT zugänglich – Browser 2 (bisher Groschenfall) zeigte TikTok „hamsterfrei“ und ein Google-Konto ohne Kanalzugriff; Browser 1 = schattengast (nur Kontoprüfung, sofort geschlossen). Zahlen daher öffentlich (yt-dlp, TikTok-Profilseite). Keine Wiedergabezeit/Retention/Traffic-Quellen. vidIQ 1 Credit (Reset 12.11.), Apify-Monatslimit erreicht, Instagram nicht verbunden. S23/S24 liegen nachweislich auf groschenfall_yt bzw. dem Groschenfall-Kanal; bei „hamsterfrei“ liegt nur 1 fremder Werbe-Post (29.10. 20:48), nichts von uns.

| Short (Alter) | TikTok Aufr./Likes/Komm./Shares | YouTube Aufr. |
|---|---|---|
| S18 Deutschlandticket (2,3 T) | 483/15/0/0 | 557 |
| S20 Tabak (2,3 T) | 267/4/0/0 | 390 |
| S19 Kartoffel (2,2 T) | 277/2/1/0 | 245 |
| S21 Krankenkasse – M1 (31 h) | 258/1/0/0 | 237 |
| S22 Steuererklärung – M1 (29 h) | 278/0/0/0 | 234 |
| S23 Typklassen – M1 (7,5 h, vorläufig) | 272/9/0/0 | 500 (6,5 h) |
| S24 Mogelpackung Ültje – M1 (5,5 h, vorläufig) | 228/3/0/0 | 144 (4,5 h) |
| Mindestlohn S17 (3,3 T) | 1.895/9/3/0 (28.10.: 806) | 1.300 |
Konto: TikTok 19 Follower (28.10.: 16 → +3), 292 Likes gesamt · YouTube 29 Abos (+1), 25.306 Aufrufe gesamt · Instagram: seit 24.10. kein Post, nicht messbar.

**Ampel (Tag 2 von 7, vorläufig):** TikTok Ø-Wiedergabe ≥ 14 s ⚪ nicht messbar · YT bis zum Ende ≥ 55 % ⚪ nicht messbar · Follower +20/7 T 🟡 (+3 in 1,6 T, Tempo ~13/7 T) · Share-Rate ≥ 0,6 % 🔴 vorläufig (0 Shares auf ~1.040 Aufrufe S21–S24; bei ~250 Aufrufen/Video kaum messbar) · Langvideo-CTR ⚪ kein neues Langvideo.
Beobachtungen: TikTok-Aufrufe mit M1 bisher nicht höher (~260 nach 30 h, wie vorher). YouTube-Ausspielung schon seit 27.10. (vor M1) von ~1.200 auf ~240–560 gefallen – Ursache offen (nicht normiert, nur plausibel). „Welcher Typ bist du“ zweimal bester Start (Heizöl, S23).
Bester Post: S23 Typklassen (YT 500 in 6,5 h, TikTok 3,3 % Likes). Schwächster: S22 Steuererklärung (TikTok 0 Likes, YT 234 nach 29 h).

**Konkurrenz (kurz, yt-dlp):** @steuerfabi heute 149,5k „16.383 € dieses Jahr noch voll absetzen?“ (Jahresend-Frist + Betrag in Satz 1, 1:55 lang). @dergeldwolf fast nur „X vs Y“ („Mindestlohn vs Bürgergeld💰 Wer verdient mehr?“ 28,9k; „GmbH vs Holding“ 94k; heute „Raucher vs Nichtraucher🚬“). @dein.finanztrick (animiert, KI-Stimme): „70 Euro im Monat für Kita-Mittagessen selbst bezahlt? Der Staat übernimmt…“ 91k / 1.685 Shares, „Auto in der Tiefgarage gerammt, Täter weg?“ 55,6k – Muster „Situation als Frage + Staat/Versicherung zahlt“. @wasdasamtdirnichtsagt Jobcenter-Rechte 184k–757k. YouTube: FinanzNerd „Ab so ‚WENIG‘ Krankheitstagen droht Kündigung!“ 62k; Finanzfluss „Tabaksteuer-Panne: Erhöhung gilt aus Versehen sofort“ 33k (Thema-Nachdreh zu unserem Tabak-Short möglich, Fakten erst prüfen). Tiefe Recherche nicht fällig (letzte 28.10.).

**Reparaturen:** (1) NIGHT_RUN §9a Zugang: Kontoprüfung exakt per `account/info`-username === groschenfall_yt UND YouTube-Studio-Kanalseite ohne „nicht berechtigt“; fremdes Konto = nicht erreichbar, nie hochladen; Shorts trotzdem ablegen, „Upload offen“ im Log. (2) Neu „Offene Uploads“: nächster Lauf mit Zugang holt sie zuerst nach (max. 3/Tag/Plattform, 17/18/19 Uhr); Halde-Grenze ≥ 3 offene → keine neuen Shorts (Credits sparen). (3) AUSWERTUNG_AKTUELL: M1–M3 unverändert, Vergleiche nur noch nach 24 h/72 h, Typ/X-vs-Y als nächster Einzeltest vorgemerkt (nicht aktiv).
Nicht reparierbar von hier: Logins (Jona), Instagram (Meta Business Suite), ElevenLabs-Guthaben eintragen (Nacht #6 erzeugte Langvideo-Stimme trotz „unbekannt“-Regel in credits.md – für Fr/Sa nötig: keine neue Stimme, Audio wird aus der Ablage wiederhergestellt), Nacht #6-Startverzögerung (07:28 statt 01:37; Ursache aus dem Repo nicht erkennbar).

**Kritiker (fable): 6/10, Freigabe mit Auflagen.** Umgesetzt: Konto von S23/S24 geprüft (richtig), Halde-Grenze, 24-h/72-h-Normierung, Typ-Test vorgemerkt. Abweichung: kein zusätzliches ElevenLabs-Abbruch-Gate für Shorts eingebaut – Shorts kosten ~800 Credits, die Langvideo-Regel in credits.md existiert schon und diese Woche braucht keine neue Langvideo-Stimme; Studio-Zugang bis 01.11. und die Instagram-Entscheidung (reparieren oder streichen) liegen bei Jona.
- Nachtrag 29.10. 23:50: Jona hat neu eingeloggt. Geprüft: TikTok = groschenfall_yt ✅ (Chrome-Browser mit diesem Konto). YouTube Studio öffnet im selben Browser den Kanal „Hamsterfrei“ (UCBmT3RjRK5PGk-YVTdFzuDA), die Groschenfall-Kanalseite meldet „nicht berechtigt“ ❌. NIGHT_RUN: Kanalwechsel über Kontomenü ohne Passwort erlaubt, sonst YouTube „Upload offen“. Instagram auf Jonas Wunsch pausiert (NIGHT_RUN, KANAL_REGELN).

## 2026-11-02 (automatisch, verspätet: geplant 01.11. 22:47, gelaufen 02.11. ~17:20–17:50 MEZ)
**Datenlage:** Chrome „Browser 2“ (deviceId 93e4a890…) = TikTok groschenfall_yt ✅ + YouTube Studio UC9YJQdkr4rRO-jwkB2aY_kw ✅ (nur gelesen). Browser 3 (2d7e7af3…) zeigt jetzt TikTok „hamsterfrei“ → sofort geschlossen; Browser 1 nicht angefasst. Instagram pausiert. vidIQ/Apify nicht genutzt (Konkurrenz per yt-dlp).

**Betrieb – Hauptbefund:** Seit 30.10. kein einziger Post. Nachtläufe 31.10., 01.11., 02.11. ohne Ergebnis im Repo; Lauf 02.11. startete 09:02 und brach 11:54 am **Nutzungslimit des Kontos** ab (auch Auswertung 01.11., Schattengast-Auswertung, Hamsterfrei-Läufe scheiterten am Limit). Auf Jonas PC gibt es `Videos\Groschenfall\Nacht\2026-11-02` (Inhalt hier nicht sichtbar, Ordner nicht verbunden). Langvideo V7 Minijobs: Sa-Etappe fehlt, kein Langvideo am 01.11.

| Short (Alter ~) | TikTok Aufr./Likes/Shares | TT Ø-Wiedergabe / ganz / +Follower | YT Aufr. | YT bis Ende / Ø |
|---|---|---|---|---|
| S21 Krankenkasse Frist (5 T) | 258/1/0 | 4,8 s / 1,1 % / 0 | 306 | 27,2 % / 0:13 |
| S22 Steuererklärung 2022 (5 T) | 281/0/0 | 4,0 s / 1,0 % / 0 | 268 | 22,0 % / 0:16 |
| S23 Typklassen – Typ (4 T) | 313/10/0 | 9,2 s / 2,5 % / 3 | 972 | 35,5 % / 0:15 |
| S24 Mogelpackung Ültje (4 T) | 259/3/0 | 7,3 s / 2,3 % / 0 | 311 | 39,5 % / 0:26 |
| S25 Heizkosten „Du oder dein Nachbar“ – Typ (3 T) | 336/4/1 | 9,9 s / 3,8 % / 0 | 185 | 52,3 % / 0:18 |
| S26 Krankenkasse Rentner (3 T) | 285/4/0 | 6,3 s / 1,7 % / 0 | 303 | 35,2 % / 0:17 |
| Vergleich S18 vor M1 (6 T) | 483 (29.10.) | – | 578 | 46,6 % / 0:17 |
Konto: TikTok 19 Follower (29.10.: 19), 303 Likes; 7 Tage 16k Aufrufe (fast alles Heizöl 8,8k/Mindestlohn 1,9k), 12 Shares, 23 Kommentare, Suche 0,5 %. Alle Shorts: „die meisten hören bei 0:01 auf“, Für dich 98–99 %. YouTube 28 Tage 27.511 Aufrufe, 103 h, +29 Abos; Langvideos unverändert (Arbeiten 507, Rente 102, Schokolade 19, Merz 18).

**Ampel (Tag 5 von 7, davon 3 Tage ohne Post):** TikTok Ø ≥ 14 s 🔴 (4,0–9,9 s) · YT bis Ende ≥ 55 % 🔴 (22–52 %) · Follower +20/7 T 🔴 (+3 seit 28.10.) · Share ≥ 0,6 % 🔴 (1/1.732 = 0,06 %) · Langvideo-CTR ⚪ kein Langvideo. Nicht attribuierbar (M1–M3 gleichzeitig, Lücke, kleine Basis).
Bester Post: S25 Heizkosten „Du oder dein Nachbar“ (TT Ø 9,9 s / 3,8 % ganz, einziger Share; YT 52,3 % bis Ende) bzw. S23 Typklassen (YT 972, TT 10 Likes, +3 Follower) – beide Typ-Format. Schwächster: S22 Steuererklärung (TT 4,0 s, 0 Likes; YT 22 %).

**Konkurrenz (kurz, yt-dlp):** @steuerfabi „Ab heute, dem 1. November 2026, erhebt die EU auf Online-Bestellungen…“ 134,5k (Stichtag in Satz 1, tagesaktuell); „16.383 € dieses Jahr noch voll absetzen?“ jetzt 192,9k. @dergeldwolf X-vs-Y zieht nur mit Marken/Alltag: „McDonald’s: Gehört jedes Restaurant wirklich dem Konzern?“ 48,5k, „Cola Zero oder Cola Light“ 36k – aber „Raucher vs Nichtraucher“ 1k, „Haftpflicht vs Vollkasko“ 1,2k. @wasdasamtdirnichtsagt „Jobcenter muss Stromkosten übernehmen ⚡ Landessozialgericht…“ 213k. @dein.finanztrick diese Woche nur 0,8–4k. YouTube: Finanzfluss „Ab DIESEM Gehalt zahlst du 2027 mehr Sozialabgaben!“ 703k, „DAS ändert sich im November 2026“ 187k. Tiefe Recherche nicht fällig (letzte 28.10.).

**Reparaturen:** (1) NIGHT_RUN „Lücken & Abbrüche“: Zwischenstand nach jedem Short/Terminieren/Etappe sofort committen; beim Start Lücken eintragen und PC-Ablage der Lückentage auf fertige Shorts prüfen (→ „Upload offen“); Spätstart nach 12 Uhr → nächster Tag 17/19 Uhr, nach 15:30 nichts für heute. (2) NIGHT_RUN §L „Verpasster Sonntag“ + state/langvideo: V7 auf So 08.11. 18:00, keine neue Woche, Sa-Etappe nach den Shorts nachholen, Fakten vorher prüfen. (3) AUSWERTUNG_AKTUELL: M1–M3 unverändert; Entscheid 04.11. als Format-Vergleich Typ vs. Rest im selben Zeitraum; Prüfauftrag Frame 0/Ton gegen Heizöl und „Stichtag in Satz 1“ als möglicher nächster Test.
Nicht von hier lösbar (Jona): Nutzungslimit (Groschenfall-Nachtlauf braucht den Kontingent-Vorrang nachts, andere Automationen weichen), Ordner `Videos\Groschenfall` für Nachtläufe verbinden/prüfen, Inhalt `Nacht\2026-11-02` ansehen, ElevenLabs-Guthaben in credits.md.

**Kritiker (fable): 4/10.** Kernkritik: n=6 im Kaltstart, drei gleichzeitige Maßnahmen + Lücke → Vorher/Nachher nicht deutbar; einziges belastbares Signal: Typ-Format 3 von 3 vorn; wirksamster Hebel ist Output (Puffer) statt Hook-Feintuning. Umgesetzt: Entscheid 04.11. auf Format-Vergleich umgestellt, Frame-0-/Ton-Prüfung und Stichtag-Beobachtung aufgenommen. Abweichungen: geplanter „Sparmodus“ (weniger Kritiker-Runden) gestrichen – Kritiker hat recht, das Limit verbrauchen alle Automationen zusammen. Puffer „2–3 Tage voraus terminieren“ NICHT eingeführt: widerspricht Jonas Regel „terminiert für denselben Tag, Jona kann bis 17 Uhr stoppen“ → als Vorschlag an Jona. YouTube als Leitmetrik: Messziele bleiben bis 04.11. unverändert (kein Wechsel ohne 7-Tage-Entscheid).

## 2026-11-04 (automatisch, 01:04–01:25 MEZ, Zeitfenster bis 01:20 wegen Nachtlauf)
**Datenlage:** Chrome „Browser 2“ (93e4a890…) = TikTok groschenfall_yt ✅ + YouTube Studio UC9YJQdkr4rRO-jwkB2aY_kw ✅ (nur gelesen, Tab um ~01:13 geschlossen). Browser 1/3 nicht angefasst. Instagram pausiert. vidIQ/Apify nicht genutzt. Konto-Übersichten 7/28 T, Follower-/Abozahl und Konkurrenz aus Zeitgründen nicht erhoben (yt-dlp in dieser Umgebung nicht installiert).
Neu seit 02.11.: nur S27 + S28 (beide 02.11., Alter ~29 h, vorläufig). 03.11. kein Post (ElevenLabs leer, inzwischen aufgeladen).

| Short (Alter ~29 h) | TikTok Aufr./Likes/Shares | TT Ø / ganz / +Follower / Abbruch | YT Aufr. | YT bis Ende / Ø / Suche |
|---|---|---|---|---|
| S27 Mogelpackung Lorenz (Marke+Gramm) | 247/10/2 | 12,7 s / 3,5 % / 1 / 0:01 | 313 | 44,0 % / 0:17 / 0,3 % |
| S28 Frist: Nebenkostennachzahlung Jobcenter | 313/12/0 | 8,2 s / 1,9 % / 1 / 0:02 | 136 | 23,1 % / 0:18 / **15,9 %** |

**Ampel:** TikTok Ø ≥ 14 s 🔴 (bester Wert bisher 12,7 s S27) · YT bis Ende ≥ 55 % 🔴 (23–44 %) · Follower +20/7 T 🔴 (+2 aus diesen zwei) · Share ≥ 0,6 % 🔴 (2 Shares bei S27 = Rauschen, kein Treffer) · Langvideo-CTR ⚪ (V7 erst 04.11. 17:00).
Bester: S27 Mogelpackung (Marke + Grammzahl, höchste Ø-Wiedergabe aller Nachtlauf-Shorts). Schwächster: S28 bei Bindung (YT 23 %), aber einziger Short mit nennenswertem YT-Suchanteil (15,9 %) – Suchwort-Titel wirkt.

**7-Tage-Entscheid (Formatvergleich):** Typ-Format NICHT mehr klar vorn (S27 12,7 s > S23 9,2 / S25 9,9 s) → Typ-Pflicht wird nicht aktiviert. M1–M3 bleiben (n=2 neue Shorts nach Posting-Lücken, nicht deutbar).
**Konkurrenz:** diesmal nicht erhoben (Zeit + kein yt-dlp); Stand siehe 02.11. Bezugspunkt bleibt VerpackungsProf (Mogelpackung Marke+Gramm 0,15–2,4 Mio.).

**Reparaturen (AUSWERTUNG_AKTUELL):** (1) Titelregel präzisiert: Suchwort in den ersten 5 Wörtern, Serien-Präfix davor erlaubt; YouTube- und TikTok-Präfix identisch (S28: YT „Frist:“, TikTok „Steht dir zu:“). (2) Mogelpackung (Marke + Grammzahl + Grundpreis) fest 2 von 7 Shorts/Woche – begründet mit Konkurrenz-Evidenz, nicht mit S27 allein. (3) YT-Suchanteil wird ab jetzt pro Short mitgeschrieben.
**Kritiker (fable): 5/10.** Übernommen: Share-„Treffer“ gestrichen; Mogelpackung-Platz mit Konkurrenz statt n=1 begründet und auf 2/7 erhöht (sonst erst in 4 Wochen messbar); YT-Suchanteil als Beobachtungsgröße. Nicht sofort umgesetzt: „erstes Frame testen statt Satz 1“ (alle brechen bei 0:01 ab) – das wäre ein neuer Test; nur einer gleichzeitig, deshalb als NÄCHSTER Einzeltest vorgemerkt (Frame 0 = Marke/Betrag als Standbild-Text).
Für Jona: TikTok/YT-Kontoübersicht und Konkurrenz beim nächsten Lauf nachholen; Auswertungs-Startzeit liegt zu knapp vor dem Nachtlauf (Start 01:04, Fenster 16 min) – früher terminieren (geplant war 22:47, gefeuert erst 01:04).
