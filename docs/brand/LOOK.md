# Groschenfall – Look (Marke v2, ab 05.11.2026)

## Bleibt (Look-Lock)
- **Stil „Nachtblau“:** Navy `#0E1828` / `#16243B`, Filmkorn, Vignette (`remotion/src/brand.ts`).
- **Schrift Sora.**
- **Farbcodierung:** Minze `#3DDC97` = Lösung · Bernstein `#FFB547` = Achtung/Kosten · Blau `#86A9FF` = neutral · Rot `#FF5A60` = Problem.
- **Thumbnail-Stil T5D** (`src/ch/Thumb5.tsx`/`Thumb7.tsx`): Kicker in Bernstein, große weiße zweizeilige Headline mit bernsteinfarbenem „?“, ein großes schattiertes 3D-Objekt auf einer Diagonale plus Figur (ab Abnahme gern der Groschen), 2–4 Wörter, Mobil-Check bei 168×94 px.
- Untertitel eingebrannt, außerhalb der Shorts-UI-Zonen. SFX nur `soft, whoosh, stamp, ding, paper, marimba, coins`, kein „pop“.

## NEU: Maskottchen „Der Groschen“ (Jona hat es freigegeben, das Maskottchen-Verbot ist aufgehoben)
**Figur**
- Kleine **10-Pfennig-Münze**, stilisiert, keine originalgetreue Nachbildung (kein Bundesadler, kein Schriftzug „Bundesrepublik Deutschland“). Eine Prägung **„10“** auf der Vorderseite.
- Farben: Körper Kupfer/Messing **`#C98A4B`**, Rand heller **`#E3B07A`**, Prägung und Schatten dunkler **`#8A5A2B`**, ein Glanzlicht oben links. Auf Navy immer mit leichtem Schlagschatten.
- **Große, ausdrucksstarke Augen** (weiß mit Navy-Pupillen, Lider für Mimik), keine Nase, Mund nur als Linie bzw. kleines „o“.
- Optional **dünne Ärmchen** (Linien, Navy oder dunkles Kupfer) für Lupe und Gesten. Keine Beine. Die Münze kippt oder hüpft stattdessen.
- Proportionen sind fest. Variation entsteht nur über Reaktion, Position, Größe und Requisit, nie über ein neues Design.

**5 Reaktionen** (Prop `reaction` im Baustein)
| Reaktion | Bild | Typischer Einsatz |
|---|---|---|
| `schreck` | Augen weit, Münze springt hoch, kurzes Zittern | Frist-Alarm, hoher Betrag |
| `augenrollen` | Pupillen rollen nach oben, Lider halb | Typ-Format, absurde Regel |
| `lupe` | Ärmchen hält Lupe, ein Auge stark vergrößert | Mogelpackung, Kleingedrucktes |
| `triumph` | Glanz-Funken, Hüpfer, „Kling“ | Payoff, Geld zurück |
| `kopfschuetteln` | Münze dreht sich links/rechts, Augen zu | Falle entlarvt, „so nicht“ |

**Signet (Handbuch G4), steckt im Hook, kein eigenes Intro**
- Frame 0 zeigt bereits das **Schlüsselbild** (siehe unten). Der Groschen fällt in den ersten **0,5 s** von oben neben das Schlüsselbild, landet mit **„Klick-Kling“** (≤ 0,7 s, leiser als die Stimme; bis ein eigener Kling-Sound existiert, `coins`/`ding` aus dem vorhandenen SFX-Satz) und zeigt **sofort eine Reaktion**.
- Er **verdeckt nie den Euro-Betrag** und nie den Gegenstand. Größe im Short etwa 12–16 % der Bildbreite (≈ 130–170 px bei 1080 px). Position seitlich neben dem Objekt, außerhalb des unteren UI-Bereichs (untere ~15 %) und der rechten Button-Leiste.
- Das erste gesprochene Wort fällt trotzdem bei ≤ 0,2 s (STIMME.md). Der Groschen ergänzt, er wartet nicht.

**Endbild:** Groschen + Name „Groschenfall.“ (+ Abschlusszeile, solange STIMME.md sie vorsieht). Er ersetzt im Endbild die bisherige fallende Münze „G“ in `EndShare`/`EndYT`.

**Bau:** als Remotion-Code-Baustein **`remotion/src/kit/Groschen.tsx`** (SVG/React, Props z. B. `reaction`, `x`, `y`, `size`, `startFrame`, `fall`), **nie per Bild- oder Video-KI generiert** (Handbuch G8). Die Abnahme macht der **Bild-Kritiker** in frischem Kontext am Kontaktbogen mit allen 5 Reaktionen, Signet-Ablauf (Frame 0, 5, 10, 15) und Endbild. Prüfpunkte:
- als Münze erkennbar, auch bei 168 px
- „10“ lesbar
- Reaktionen im Stumm-Test unterscheidbar
- Kontrast auf Navy
- verdeckt keinen Betrag
- wirkt nicht kindlich-niedlich (kein „Made for Kids“-Eindruck)
- keine Ähnlichkeit zu fremden Maskottchen

Erst nach „pass“ wird er eingesetzt (Bau-Etappe in NIGHT_RUN §B).

## Schlüsselbild-Regel (Handbuch G1, früher M1 „Bild 1“)
- Jeder Short startet in Frame 0 mit einem **konkreten Gegenstand + Euro-Betrag**: Kassenbon, Packung, Brief/Bescheid mit roter Zeile, Heizkostenabrechnung, Rentenbescheid. Daneben (ab Abnahme) der Groschen.
- **Keine abstrakte Grafik** in Frame 0, also keine Kurve, kein Balkendiagramm, kein leeres Navy, kein Logo.
- Höchstens 5 Wörter Text, hell genug, in 1 s verständlich (Glance-Test), mitten in der Situation.
- Das Schlüsselbild wird **vor dem Skript** festgelegt und im Skript notiert. Ohne starkes Schlüsselbild wird die Idee verworfen.
- Das TikTok-Cover/Titelbild ist das Schlüsselbild (Hook-Paket).

## Produkte und Personen
- Produkte **immer als eigene Illustration**: neutrale Packungsform, eigene Farben. **Keine Logos, keine Produktfotos, kein nachgezeichnetes Originaldesign.** Der Markenname steht nur als Text (Overlay/Titel).
- Echte Personen nur stilisiert (wie `MerzBust`), mit Namensschild, nie fotorealistisch.
- Wiederkehrende Elemente (Groschen, Signet, Endkarten) sind Code-Bausteine. Pro Folge variieren Setting, Shot-Plan und Reihenfolge (Handbuch G9, „inauthentic content“).
