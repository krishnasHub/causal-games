# TODO

Where we left off, and what to pick up next. See [DESIGN.md](DESIGN.md) for the full design.

## State as of 2026-10-14

- **Causal Diamond** (`causal-diamond/`): seven levels, all verified by `node causal-diamond/tests/verify-levels.js`. Done for now.
- **Echo Sight** (`echo-sight/`): 2D test bed for stealth against yourself. Four levels, all verified by `node echo-sight/tests/verify-levels.js`. **Nobody has played it by hand yet.**
- **The full game** is now planned as first person in a paper-craft world, for Steam (see DESIGN.md). Engine deferred until a browser prototype proves it's fun. Nothing built yet.
- **GitHub Pages is live:** https://krishnashub.github.io/causal-games/ (landing page, both games).
- **Agreed on 2026-10-14:** first person; paper-craft art; instant signals and sight; a shared personal time budget across all selves (proper time, start at 60 s); at most four selves; wrist band, footsteps, warning meter, ghost outlines. Details in DESIGN.md, "The game".

## Next session (2026-10-15): settle the design, then a quick proof of concept

### A. Unreal 5 vs Godot 4
Decide the engine, or decide exactly what the prototype must show to decide it.
- [ ] Compare for *this* game: first person, paper-craft look (flat sheets, boxes, painted textures), 2–4 recorded selves, live wrist views (one extra camera render per echo), 3D footsteps, Steam and Steam Deck.
- [ ] How much Claude can build in each. Godot: scenes and scripts are text. Unreal: C++ is fine, but assets and Blueprints are binary, so levels would be spawned in C++ from text maps.
- [ ] Cost of rendering 3–4 extra live views (render targets / SubViewports) in each.
- [ ] Licensing and Steam: Unreal's 5% royalty over $1M; Godot is MIT with no royalty; GodotSteam vs Unreal's Steam subsystem.
- [ ] Write the decision and reasons into DESIGN.md, "Engine".

### B. The wrist band, nailed down
Goal: meaningful, works, doesn't break real physics, and is a fun gimmick. Work through the door-holding example (level 2, The Figure) step by step, run by run.
- [ ] What does the band show on run 1, when there are no past selves but the figure is holding the door?
- [ ] What exactly triggers the "?" card and the static? Proposal to test: the band only shows **recordings it carried back through the portal** (your own past views). A future self has no recording yet, so its slot is static. The band can notice a future self only through *local* evidence (it sees another band with your ID), so no information travels back in time except what you physically carried through the portal.
- [ ] On run 2, when you become the figure: does Echo 1's view on your band show you holding the door? (It should: that's the prophecy being kept.)
- [ ] Can the static be a clue rather than a gimmick? E.g. it clears or sharpens as you get closer to matching what your past self saw.
- [ ] Rules for raising the band: how much view it blocks, how much it slows you, whether views are live or scrubbable.
- [ ] How the time budget shows on the band (a draining gauge of personal time).
- [ ] Write the result into DESIGN.md, "Player tools".

### B2. Idea to evaluate: "Oops, I saw myself" as the reason to loop (2026-10-14, late)
The user's idea. The game starts with just you. At some point you see yourself, by accident or because you need to (someone holds a door for you). Each sighting raises a counter: a debt. Before the loop ends (60–100 s), you must go back through the portal and *be* that self, so your past self saw what it saw. Miss it and the timeline breaks and resets.
- Generalises the scripted figure and the open question "self-made prophecies": the figure is visibly you, and it is the reason for every echo.
- Counter = outstanding sightings = selves you still owe. Number of sightings sets the number of runs. Fits the shared time budget and the cap of four.
- The "?" card on the wrist band becomes the debt itself: one static card per unpaid sighting, clearing when the loop is closed. Links straight into B.
- Physics: a self-consistent causal loop (Novikov). Who held the door first? Nobody; it's a bootstrap loop, which general relativity allows.
- Must settle: run-1 sightings can't come from the player (no recording exists), so levels author them. What's emergent is whether you *see* them. Twist to test: **what you didn't see, you don't owe.** Levels scatter possible future-selves; looking costs you obligations, looking away avoids them. Be honest in-game that "unobserved, so not owed" is a game rule (consistency is checked against what selves saw), not real physics.
- Must settle: on a break, reset the whole level, or only the current run (keeping earlier echoes, like R today)? Current rules use Deutsch's 50% instead of a reset; pick one.
- Must settle: seeing a *past* self (an echo) stays safe and owes nothing. Only sightings of future selves count.

**Claude's take (agreed direction):** build the game around this mechanic. Strengths: a goal the player feels ("I saw myself, so I must go and be that person"), a memorable opening (alone, then you see yourself across the room), a legible debt counter that helps fairness in first person, honest physics (a Novikov loop), and one rule pulling both ways (be seen exactly where you were seen, and nowhere else). Risks: feeling scripted (fix with player choice: whether to look, which sightings to take on, how to repay), repetition over many levels (vary the sightings: running, hiding, looking right at you, only heard), and repaying needing frame-perfect copying (ghost outlines, generous matching).

### B3. Then a quick proof of concept
- [ ] Discuss the options for A, B and B2, pick one design, and prototype it in the browser: one level, the opening sighting, the debt counter, repaying it on run 2. Small enough to finish in one session.

### C. Research: games that already do this
- [ ] Survey games with recorded past selves, time loops, or stealth against copies of yourself. Starting list to check: The Talos Principle (recorder puzzles), Braid, The Sexy Brutale, Outer Wilds, Deathloop, 12 Minutes, Timelie, Echo (Ultra Ultra, 2017), Quantum League, Retro/Grade, P.B. Winterbottom, Cursor\*10, The Swapper, A Slower Speed of Light (MIT).
- [ ] For each: perspective, how past selves work, whether being seen by yourself matters, how paradoxes are handled, how it sold.
- [ ] Answer: has anyone done first-person "stealth against your former self" with memory obligations? What's actually new here?
- [ ] Save as `RESEARCH.md`, with sources.

## After that, in order
### 0. First-person browser prototype (after A–C)
Built on the Echo Sight simulation with three.js, as `echo-sight-fp/` (or similar). Rules and tools are in DESIGN.md under "The game".
- [ ] Engine option for instant signals and sight (the HTML test bed keeps its slowed light until we decide).
- [ ] First-person view: pointer-lock mouse look, WASD, paper-craft textures drawn in code, paper-doll echoes.
- [ ] Wrist band: live views through each past self's eyes, "?" card for future selves, raising it slows you.
- [ ] Footsteps, warning meter, ghost outlines for prophecies.
- [ ] Personal time budget (start at 60 s) shown on the wrist.
- [ ] The four levels carry over, and the verifier still passes.

### 1. Playtest Echo Sight by hand
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
