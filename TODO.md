# TODO

Where we left off, and what to pick up next. See [DESIGN.md](DESIGN.md) for the full design.

## State as of 2026-10-14

- **Causal Diamond** (`causal-diamond/`): seven levels, all verified by `node causal-diamond/tests/verify-levels.js`. Done for now.
- **Echo Sight** (`echo-sight/`): 2D test bed for stealth against yourself. Four levels, all verified by `node echo-sight/tests/verify-levels.js`. **Nobody has played it by hand yet.**
- **The full game** is now planned as first person in a paper-craft world, for Steam (see DESIGN.md). Engine deferred until a browser prototype proves it's fun. Nothing built yet.

## Next session

### 0. First-person browser prototype
Built on the Echo Sight simulation with three.js, as `echo-sight-fp/` (or similar). Rules and tools are in DESIGN.md under "The game".
- [ ] Engine option for instant signals and sight (the HTML test bed keeps its slowed light until we decide).
- [ ] First-person view: pointer-lock mouse look, WASD, paper-craft textures drawn in code, paper-doll echoes.
- [ ] Wrist band: live views through each past self's eyes, "?" card for future selves, raising it slows you.
- [ ] Footsteps, warning meter, ghost outlines for prophecies.
- [ ] Personal time budget (start at 60 s) shown on the wrist.
- [ ] The four levels carry over, and the verifier still passes.

### 1. Playtest Echo Sight by hand (first)
How: open `echo-sight/index.html` in Chrome or Edge (double-click it, or run `start echo-sight\index.html` from the repo folder). Play with a mouse. Jot notes in `PLAYTEST.md` at the repo root as you go: level, run, what happened, how it felt. If you're stuck, the reference solutions are in `echo-sight/tests/solutions.js` (spoilers).
- [ ] Play all four levels with mouse and keyboard. Note where it feels unfair, confusing or too easy.
- [ ] Tune the feel: view cone (90°, 9 tiles), spotted grace (0.13 s), prophecy grace (0.25 s), walk speed.
- [ ] Is it clear *why* a paradox happened? The toast names the echo and the reason. Is that enough, or do we need a replay of the moment?
- [ ] Is Echo Sight (Space) enough to plan with, or do we need to scrub time and see where an echo will look later?
- [ ] Check it on a phone. Touch currently makes you face where you walk.

### 2. Open design questions
- [ ] **Arrival stacking:** every later run lands on the same pad at 0:00, and overlapping bodies are treated as not seeing each other. Alternatives: a different pad per run, or arrivals offset in time.
- [ ] **Moving figures:** prophecies are easiest when the figure stands still. Can a figure walk a path without needing frame-perfect copying?
- [ ] **The figure vanishing:** today it just disappears when its path ends. If your past self watched that happen, you can't copy it. Should vanishing only happen out of sight?
- [ ] **Self-made prophecies:** could your own past self's memories create the obligations, with no scripted figure at all? For example, run 1 glimpses Echo 0 holding a door "from the other side".
- [ ] Sound as a channel: footsteps your past self heard.

### 3. More test-bed levels (once the feel is right)
- [ ] A patrol level: your past self walks a long route looking around, and you shadow it.
- [ ] A mirror or camera level: something that "sees" on your past self's behalf.
- [ ] A two-figure level: two prophecies, needing two later runs.
- [ ] A level where you must deliberately be seen at a precise moment (the figure *is* the plan).

### 4. Then the engine
- [ ] After the prototype playtest, pick Godot 4 (lead) or Unreal 5. See DESIGN.md, "Engine".
- [ ] Grey-box: record and play back a self, portal, rewind, switch and door, sight checks. Levels loaded from text maps.
- [ ] Port level 1 (Blind Spot) as the first test.

### Small leftovers
- [x] GitHub Pages: landing page at the repo root, served from `main` at https://krishnashub.github.io/causal-games/.
- [ ] Optional: a browser `tests.html` so level checks don't need Node.
