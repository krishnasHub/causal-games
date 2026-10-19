# TODO

Where we left off, and what to pick up next. See [DESIGN.md](DESIGN.md) for the full design.

## Pick up here (2026-10-18)

**Current focus: the first-person spike again** (the user's call, 2026-10-18; the friends haven't tried the web games yet). Done today, in `unreal-spike/` (local only):
- **"The Figure" is built in the spike**, one-for-one with Echo Sight level 2: `.\spike.ps1 play -Level figure`. Run 1: a figure wearing run 2's number already stands on the gold plate behind a cellophane window, holding the gold door. Later runs arrive in its room; a film-negative ghost shows where it stood, and disappears while you stand in it.
- **Both halves of the rule:** every run records what it saw (the doors, and the figure: where, and face or back). An echo breaks time if it sees you where it saw no one, if nobody is where it saw someone (or they're turned the wrong way, face for back), or if a door isn't as it saw it. Loose matching: 70 cm, 0.35 s, side-on counts either way. The figure only vanishes once you can't see it.
- The level code now takes any number of plates and doors (coloured to match), glass (`w` cells) and an exit area.
- `.\spike.ps1 test -Level figure`: the solution wins; skipping the figure, leaving early and standing with your back to the glass each break time, each for its own reason. Blind Spot's four checks and Hold the Door's solution still pass. **Nobody has played The Figure by hand yet.**

Later on 2026-10-18, **the spike became a playable game** (built by three agents, merged and verified):
- **Title screen** (`.\spike.ps1` with no `-Level`): a top-down Blind Spot with three echoes on 30 s loops that never see each other, and New game, Tutorial, Controls, Info, Quit. Info is an index of 14 physics articles (spacetime to the fourth dimension), each with a checked Wikipedia link. Pause gains Restart level and Quit to title; winning shows Next level / Replay / Title.
- **Campaign:** tutorial = Blind Spot with tips per run; New game = The Figure, Two Watchers, Footsteps, Retrace (adds shutters), Two of Them (adds several figures, and figures that go and come back).
- `.\spike.ps1 test -Level all`: 21 checks across the six levels, each trap breaking for its intended reason, plus Hold the Door's solve, all passing on the merged build.
- **The spike is now a local-only git repo** (`unreal-spike/.git`, never pushed), so work can run in parallel worktrees.
- Not checked by hand: real keyboard and mouse on the title screen (only simulated input reached it), the Wikipedia button opening a browser, and every level played by a person. Two of Them is tight for people (about 1–1.5 s to reach the portal in run 2).

- **First hand play (2026-10-18), The Figure:** too fast for a person. Run 1 couldn't reach the gold door before the figure let go, and run 2 was always a second late onto the plate. Fixed: the figure waits 2 s on its pad and holds the plate until 0:14 (was 0:08), and the grace for a missing or wrong-way remembered person is 1 s (was 0.4 s). Each level now opens paused on a plan (name, goal, map with the start, the arrival pads and where anyone already here walks and stands) until Start. All 21 checks pass; `Dist` repackaged. The other figure levels keep their timings: watch whether they need the same slack.

**Crouch, built (2026-10-18):** hold Ctrl (eyes 160 to 95 cm, chest point 108 to 60 cm, 0.55x speed). Posture is recorded and replayed, so a crouched echo sees from low. Low cover (`FSpikeLevel::Cover`) is 130 cm: a standing head shows over it, and crouched close behind it you're hidden, out to about twice the watcher's distance to the cover. Sight cones draw that shadow faintly. The echo doll has knees (separate thigh and shin cards): it squats when crouched, and the trailing knee bends as it walks. New level **Duck** (campaign, after The Figure): crouch along a lane behind a half wall while echo 1 walks up the room. Tests: solve, standing all the way, standing up halfway; 24 checks pass across the seven levels. Not built: toggle crouch, lean, crouching under things, posture matching for figures, and your own first-person legs bending.

Next for the spike:
1. **Play it by hand from the title screen**, through the tutorial and the campaign. The Figure is still the key test: does first person work for the time puzzle?
2. Play Duck by hand: does crouching read, and is the half wall's shelter generous enough?
3. **Play The Figure by hand** (`cd unreal-spike; .\spike.ps1 play -Level figure`). This is the test from section 1: does first person work for the time puzzle, not just the stealth? Does the reveal land (you walk in and someone's already there, wearing your next number)? Is standing in the ghost clear enough, and is face-or-back too strict?
2. Play Blind Spot's time controls, HUD and sounds by hand (the "by hand" items in section 1).
3. Then the rest of section 1: the clock waits for your first key, and the exit plays out the rest of the loop.

### Web games (waiting on friends)

Done 2026-10-17, all pushed and live on GitHub Pages:
- Echo Sight: every past self's view cone is always shaded amber (yours is blue); a cone and the board's edge pulse red 0.8 s before an echo would see you (forecast from its replay, assuming you stand still), solid red while it does. Being seen where an echo remembers a figure doesn't count.
- New levels: Causal Diamond 8-10 (Relay, Fuse, Event Horizon), Echo Sight 5-6 (Footsteps, Two of Them).
- Every level's reference solution was played to the win screen on the live site in Chrome, and every trap stays blocked. Nobody has played the new levels by hand yet.

Next for the web games:
1. **Hear back from the user's friends.** Do the new levels' "aha"s land? Is Fuse's timing too tight (about 0.6 s with straight-line moves; diagonal moves give more room)?
2. Open choices for Echo Sight: give each echo its own shade of cone, numbered to match (suggested, not built); limit the edge warning to echoes you can see, if it feels like cheating; whether the warning should also cover walking *into* a cone (it doesn't; same open question as the spike).
3. Fill in `PLAYTEST.md` from what the friends say.

Testing tip: playwright-core drives Chrome (`C:/Program Files/Google/Chrome/Application/chrome.exe`) through each page's test hook (`window.EchoSight` / `window.CausalDiamond`: `loadLevel`, `setDriver`, `setSpeed`, `status`) with the `tests/autopilot.js` and `tests/solutions.js` scripts injected. It isn't installed in the repo; `npm i playwright-core` somewhere outside it.

### Unreal spike notes

The by-hand items for Blind Spot (section 1): retake fair or a cheat, 3 s break back-off, pause menu with mouse and keys, the time bar's pressure, the ticks (consistent now? subtle alone, tense together? room tone?), and silence while rewinding or fast-forwarding. Small polish when it's in the way: section 4.

Ideas raised and parked: a crosshair dot (user: leave it for now); a short "time held" icon for while the plate holds the door open.

## State as of 2026-10-17

- **Causal Diamond** (`causal-diamond/`): ten levels, all verified by `node causal-diamond/tests/verify-levels.js`. Levels 8 (Relay), 9 (Fuse) and 10 (Event Horizon) added 2026-10-17.
- **Echo Sight** (`echo-sight/`): 2D test bed for stealth against yourself. Six levels, all verified by `node echo-sight/tests/verify-levels.js`. Still not played by hand. Levels 5 (Footsteps, a walking figure) and 6 (Two of Them, two figures for two later selves) added 2026-10-17; a figure can now vanish and reappear (a bare `[seconds]` waypoint).
- **The spike exists only on this disk.** A copy of its sources from before The Figure is in `C:\Users\krish\dev\spike-backups\20261018-1235`. `unreal-spike/` is git-ignored, and the user chose (2026-10-17) not to track it yet, to keep the repo small. All the 2026-10-16/17 spike work (Blind Spot, time controls, HUD, sound) is in it. Back up the folder's sources (`Source/`, `Tools/`, `Art/`, `Config/`, `spike.ps1`, `README.md`, the `.uproject`) before anything risky.
- **Engine decided: Unreal 5.8** (the user's call, 2026-10-15): consistent with Oathbound, and aimed at Steam (consoles maybe later, via ID@Xbox / PlayStation Partners). Assets are generated by scripts (Python material builder, canvas-drawn PNGs, a text map), so only sources need tracking. Lumen on Steam Deck is heavy: watch it.
- **Research done:** `RESEARCH.md`. No shipped first-person "stealth against your former self". Closest: Echo (2017, third person), TimeHeist (itch.io), UnLoop (2025, VR, worth playing).
- **Unreal spike** in `unreal-spike/` (git-ignored, never checked in; its README lists every switch). Two levels: **Blind Spot** (default, Echo Sight level 1 one-for-one) and the original **Hold the Door** (`-Level door`: cardboard L-room, loop corridor, 4D paper creature, swinging lamp). Paper-doll echoes, lensed portal, wall equations, arrival pads per run. `.\spike.ps1 test` runs four autopilot checks on Blind Spot (solve, trap, recover, retake). Timeline log: `Saved/Logs/CausalSpike.log` (grep `LogSpike`). The packaged build in `Dist/` (`.\spike.ps1 package`) was rebuilt on 2026-10-18 with the title screen and full campaign.
- **Browser sketches:** `creature-4d/` (raymarched 4D creature looks) and `walkthrough/` (first-person cardboard dry run).
- **Committed 2026-10-16:** DESIGN.md, RESEARCH.md, the browser sketches. The spike itself is still git-ignored.

## Next session: make the spike a real puzzle

**Verdict after playing the spike (2026-10-16):** it looks and runs fine but isn't as exciting as Echo Sight. It's a tech test, not a puzzle. Missing, compared with Echo Sight:
1. **No "aha".** Echo Sight levels each have one trick to realise. "Hold the Door" is obvious; only execution is left.
2. **Only half the rule.** Echo Sight also says *be wherever they saw someone* (the figure, prophecies). The spike only has "don't be seen", so it's stealth, not a time puzzle. The bootstrap reveal is missing.
3. **You can't see the plan.** 2D shows the whole loop, and holding Space shows every past self. First person mostly shows a wall.
4. **Dead time.** No fast-forward, no "clock waits for your first key", a 24 s wait on the plate, long corridors.
5. **A win you don't earn.** Echo Sight's exit plays out the rest of the loop; the spike ends the moment you're through the door.
6. **Too few things to use.** One plate and one door (Echo Sight has glass, shutters, gold plates, figures).

**Agreed direction:** go back to the "I see myself holding the door" mechanic (B2, agreed 2026-10-14) as the backbone. **Authored figures** open each level or act (the reveal, and it teaches "must be seen"); **player-made pins** are the moment-to-moment verb. Same rule, two sources. First person suits the figure *better* than 2D: walking in and seeing a kid in a red hoodie with your run number already on the plate.

### 1. Build Blind Spot, then "The Figure", one-for-one in the spike
- [x] Blind Spot built (2026-10-16): `./spike.ps1 play` (default level; `-Level door` for the old one). Run 1 spawns in the plate room, later runs arrive in the corridor on their own pads. `./spike.ps1 test`: the reference solution wins, holding the plate facing the door breaks time.
- [x] Played Blind Spot by hand (2026-10-17): works. A mistake in run 1 (watching the door) is repairable by a relay (echo 3), which led to the time controls below.
- [x] Time controls (2026-10-17): hold F fast-forward (4×), hold Q rewind, T freeze and retake a self (erases later echoes), breaks back you up 3 s. `./spike.ps1 test` checks solve, trap, relay (`recover`) and `retake`.
- [x] Rewind looks like a VHS tape winding back (2026-10-17): scanlines, snow, tracking bands, "<< REW".
- [x] HUD and pause menu (2026-10-17): a time bar for the loop's minute (red in the last 10 s), run pips, the goal as each run starts. Esc pauses: Resume, Map (no echoes on it), Hints (one at a time, the answer last), Controls, Info (a one-page codex per physics topic), New game, Quit. M opens the map.
- [ ] Play the time controls by hand: does retake feel fair or like a cheat? Is 3 s the right back-off after a break?
- [x] Feedback (2026-10-17): the screen edge reddens when an echo is about to see you (solid while it does); the plate glows from underneath while held and the glow runs dash by dash along the floor tape to the door; the door slides with a sound.
- [x] The echoes' clock (2026-10-17): one tick, always the same, a nod to *Interstellar*: one tick per echo in the loop every 5 s, so every 5 s with one echo, 2.5 s with two, 1.7 s with three (echoes that have left don't count). Loop time. Sounds are synthesised in code; `-SpikeRecordAudio=<sec>` records the game's output to check them.
- [ ] Play the HUD by hand: does the pause menu respond to mouse and keys? Does the time bar make the minute feel tight, or rushed?
- [ ] Listen by hand: are the ticks consistent now (rebuilt 2026-10-17 as one sample-exact stream after the user found them uneven), subtle enough on their own and tense enough together? Do they need a near-silent room tone under them? Rewinding and fast-forward should be fully silent.
- [ ] Rewind/retake polish: a misprint flash on branching; the portal view shows the arrival pad at the retake moment, not 0:00; in Hold the Door the swinging lamp and the creature do not rewind yet.
The test: same puzzles as Echo Sight levels 1 and 2, only the presentation changes. Fun in 3D means the spike just lacked a puzzle; flat means first person costs readability, and we lean on an echo view (hold to see all selves, maybe a top-down diorama) or rethink the camera.
- [x] Run 1: you walk in and see "yourself" (a figure doll, the next run's number) holding the door. The figure is authored, not recorded. (2026-10-18: `-Level figure`.)
- [x] The "must be seen" half of the rule: a later run must be where the figure stood, in view of the echo that saw it, during the window it saw it. Loose matching: 70 cm, 0.35 s, and facing as face-or-back (side-on counts either way).
- [x] Ghost outline of the figure while you repay it: a film negative, gone while you stand in it.
- [x] The figure only vanishes out of sight.
- [ ] Play The Figure by hand (see "Pick up here").
- [ ] "The clock waits for your first key" (fast-forward is done).
- [ ] The exit plays out the rest of the loop without you; it only opens if every past self stays consistent (spotted, door, props, figure kept).
- [x] An autopilot reference solution, like `-SpikeScript=solve`, plus the obvious mistake caught: `.\spike.ps1 test -Level figure` (solve, trap, early, turned).

### 2. Then the pins ("promised sighting", options C + D, decided 2026-10-15)
- [ ] Run 1 hits an obstacle, drops a pin: the world goes slow-mo for a few seconds.
- [ ] Actionable objects *in view only* (light-cone rule) are shown pencil-shaded, flickering between their possible states.
- [ ] Selecting one flips it at once ("collapsed", instant help, like Bill & Ted). A pencil-sketch / negative future echo appears beside it as a debt. Multi-state objects take the most helpful state. Later levels may allow two selections per pin. Unused within a few seconds: no pin.
- [ ] Debts: any later run can repay any pin, and one run can repay several. "What you did wrong breaks time at once; what you haven't done yet can wait": unpaid debts break time only at level end or when out of exotic matter.
- [ ] Wrist band HUD: the timeline, with the debts on it.

### 3. Rules decided but not built yet
- [ ] Everything a run did and saw is recorded and must not be contradicted; pins are obligations; run 1's own interactions are not pins. (Built so far: being seen, props, the exit door's state. Not yet: the plate, other signals.)
- [ ] Borrowing: taking an object earlier than run 1 did breaks time when run 1 reaches for it, unless it's returned in time. Nothing goes through the portal. Consumables (exotic matter) only if no past run took them.
- [ ] Death or "jump on will" both spawn a new echo; a death-jump costs more exotic matter. Echoes are only erased by a retake (built). Failed echoes remain.
- [ ] Exotic matter, found in levels, replaces the four-self cap as the budget. (The spike still caps at 4 selves and 60 s.)
- [ ] Failure: a break plays the misprint and backs you up a few seconds (the 3 s back-off is built; the misprint is not). 50% scenarios show "you exist in N realities" first.
- [ ] Echoes pushing props; props moved by a past self replay that run (built, barely tested: `-SpikeScript=props`).

### 4. Spike fixes and polish (small)
- [ ] Play-test the sight cones and the 0.8 s "about to look your way" warning (C toggles cones). Too easy now? Try cones without the warning, or the reverse. Add a pencil-scratch tick sound for the warning.
- [ ] The warning means "if you stand still": walking *into* a cone only warns a moment before. Fine, or predict along your velocity?
- [ ] The creature: for now it touches no matter and is no threat (user's call, 2026-10-16). Later: find how it chases you and is a threat. It should hunt the newest self hardest. Make it deterministic with echoes.
- [ ] Creature log flickers "arrives / leaves / arrives" within 0.5 s as it enters our slice.
- [ ] EXIT decal looks stretched (Width/Height aspect).
- [x] Portal view looked like bare meshes (2026-10-17): its capture had no Lumen bounce light and was brightened 30×. Now recaptured for 20 frames so Lumen settles, with a per-level gain (3 Blind Spot, 8 Hold the Door).
- [x] HUD (2026-10-17): no longer debug text, except the creature's status line in Hold the Door (top left, overlaps the goal). Later: move the HUD onto the wrist band.
- [ ] Hold the Door's creature debug line: fold it into the HUD or drop it.
- [ ] Packaging clears the build's `Saved` folder: copy play logs aside before repackaging.
- [ ] Later "peek" tool: hold a key to glance through one echo's eyes for a second (one capture at a time; could cost exotic matter). Rejected: always-on windows of every echo's view (too easy, turns stealth into watching security cameras, and costs a full extra render per echo).

### 5. Write the decisions into the docs, then commit
- [x] DESIGN.md: engine (Unreal 5.8), the pin mechanic, debts, recording vs pins, borrowing, death and selves, exotic matter, the creature, art language (paper craft for things in time, film negatives for not-yet-arrived echoes, kid crayon drawings around real equations), wiggle room for props, the lensed portal, arrival pads, sight cones and the warning.
- [x] Commit `.gitignore`, `RESEARCH.md`, `creature-4d/`, `walkthrough/`, TODO.md and DESIGN.md (2026-10-16).
- [ ] Decide whether the spike's sources (Source/, Tools/, Art/, Config/, the .uproject) move into a tracked folder; its binaries and Dist never do. User, 2026-10-17: not yet, to keep the repo small. Ask again once the spike has proved itself (after "The Figure").

## Open design questions
- [x] **The figure vanishing:** if your past self watched it disappear, you can't copy that. Decided and built 2026-10-18: it vanishes only out of sight, after its path ends. If you keep watching it, it stays, and the next run owes it for longer.
- [ ] **Moving figures:** can a figure walk a path without needing frame-perfect copying?
- [ ] **Self-made prophecies:** could your own past self's memories create obligations with no authored figure? (The pins are one answer.)
- [ ] **"What you didn't see, you don't owe":** levels scatter possible future selves; looking creates obligations, looking away avoids them. Say honestly in-game that this is a game rule, not physics.
- [ ] Sound as a channel: footsteps your past self heard.
- [ ] Wrist band details (old section B): what it shows on run 1 with the figure there; "?" static cards for future selves as the debt; how the time budget shows.

## Later
- [ ] Playtest Echo Sight by hand (`echo-sight/index.html`, notes in `PLAYTEST.md`): fairness, clarity of paradox reasons, whether Space is enough to plan with, phones.
- [ ] More levels: a patrol you shadow, a mirror or camera that sees for your past self, a level where being seen at a precise moment *is* the plan. (Done 2026-10-17: two figures for two later runs, in Two of Them; a walking figure, in Footsteps.)
- [ ] Optional: a browser `tests.html` so level checks don't need Node.
- [x] GitHub Pages: https://krishnashub.github.io/causal-games/.
