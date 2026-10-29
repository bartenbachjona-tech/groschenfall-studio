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
