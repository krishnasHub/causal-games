# Design: stealth against yourself

The design for the first-person time-loop game, and the rules its 2D test bed ([Echo Sight](echo-sight/)) implements. The earlier prototype, [Causal Diamond](causal-diamond/), is where the loop, echo and light-speed mechanics come from.

## The idea in one line

> **Every past self must see exactly what it remembers seeing. No more, no less.**

When you go back in time, you can see your past self. But when you *were* that past self, you never saw your future self. In a consistent universe (the Novikov self-consistency principle) that's a hard rule: if your past self didn't see you, you must not be seen. If your past self *did* see someone, then someone has to be there, and it's usually you.

That one rule gives two mechanics that pull against each other.

### 1. Stealth against yourself

Every echo is a guard whose patrol you already know, because you walked it. In run 2 you can watch Echo 1 as much as you like. But you must never step into Echo 1's view, because Echo 1 remembers seeing no one.

Seeing your past self is always safe. Echoes replay exactly, so when your current run later becomes an echo, it sees the same things again. The obligations only come from being seen.

### 2. Prophecies (retracing your future steps)

On the first run of some levels, something strange happens. A hooded figure is already standing on a plate, holding a door open for you. On every later run the figure is gone. It was you. Now you have to be in the figure's place, at the same moments, wherever your first self could see it.

Together: **do everything you saw, and nothing you didn't.**

## Rules (as implemented in Echo Sight)

**Loop.** The world runs on a real-time clock (20–25 s per level). The portal sends you back to 0:00. Your run becomes a numbered echo that replays exactly. Paradoxes become 50/50 superpositions (David Deutsch's model): every self after a broken one exists in only 50% of histories, and the exit only accepts 100%.

**Sight.** Each self has a 90° view cone, 9 tiles deep. Sight is blocked by walls and closed doors, and passes through glass and open doors. You only see what's in your own cone. Everything else is in shadow, which is how first person would feel.

**Memory.** Every tick, each self records which tiles it can see a figure on: other selves, or the first-run figure. When that self is replayed as an echo, it compares what it sees now with that memory:

| Now vs memory | Meaning | Grace |
|---|---|---|
| Sees a figure it doesn't remember | **Spotted.** Someone was seen who never was. | 0.13 s |
| Remembers a figure that isn't there | **Prophecy broken.** You weren't where you had to be. | 0.25 s |
| Can't follow its recorded path, or misses the portal | **Blocked** (as in Causal Diamond) | none |

Memory is stored as tiles, not identities. It doesn't matter *which* self fills a remembered spot, only that someone does.

**The figure.** This is a scripted path that exists only while there are no echoes, so only on the first run. It presses plates like anyone else. On later runs, a dotted outline shows where it was, as a guide.

**Exit.** When you reach the exit, the game plays out the rest of the loop without you. If any past self would still be spotted, miss a prophecy or get stranded, the exit stays shut. (This was a real exploit found by the tests in Causal Diamond.)

**Doors.** Plates send signals at light speed (6 tiles/s, while you walk at 4). Doors react when the signal arrives. Shutters are the reverse: open by default, closed while their plate is held. A door that shuts on you pushes you back the way you came.

**Arrival stacking.** Every later run arrives on the same pad at 0:00, so selves overlap there. Bodies that overlap don't count as seeing each other. See the open questions in [TODO.md](TODO.md).

## Player tools

- **Echo Sight** (hold Space): see every past self and its cone, even outside your own view. Remembered figures appear as amber outlines. A pulsing one with a "!" is a spot someone should be standing on right now.
- **Detection ring:** a red ring fills around an echo while it's seeing you. When it closes, you've been spotted.
- **Timeline:** shows when each echo enters the portal, plus amber bars for the moments each echo saw someone. Those are the moments a figure has to be there.

## Levels in the test bed

1. **Blind Spot:** your past self holds the plate. If it faced the door, it sees you sneak through. Teaches that where you look on run 1 shapes run 2.
2. **The Figure:** a stranger holds the door for you on run 1. On run 2 you become them.
3. **Two Watchers:** three selves. The second has to reach its plate unseen by the first, and the third has to get past both.
4. **Retrace:** the figure, glass you can be seen through, and a shutter on your past self's way home.
5. **Footsteps:** the figure walks to the plate, stopping on the way. Next run, walk where it walked, when it walked.
6. **Two of Them:** the figure holds one plate, steps into the portal, and someone else is already on another. Two figures, so two later selves.

All six are checked by `echo-sight/tests/verify-levels.js`: each is winnable, can't be won solo, and the obvious mistake gets caught.

## The game: first person, in a paper-craft world

Decided on 2026-10-14, extended 2026-10-15/16. The goal is a standalone game on Steam (consoles maybe later, through ID@Xbox and PlayStation Partners). The physics should be as accurate as we can make it, with "stealth against your former self" as the twist. Prior art is in [RESEARCH.md](RESEARCH.md): no shipped game does first-person stealth against your former self.

### Why first person
You are the echo. On run N you remember your earlier runs from the inside, and the challenge is remembering where you were and avoiding yourself. A top-down view would show everything and turn memory into a planning board. Fairness comes from the tools below, not from an overhead camera.

### The backbone: "I saw myself, so I must become it"
Agreed 2026-10-14, confirmed after playing the Unreal spike on 2026-10-16. The spike had only "don't be seen", which made it stealth, not a time puzzle. The game needs both halves of the rule:
- **Authored figures** open each level or act. On run 1 you walk in and see "yourself" (a paper doll wearing the next run's number) holding a door. A later run must be where the figure stood, in view of the echo that saw it, while it saw it. Matching is loose: a radius, rough facing and a time window, with a ghost outline as a guide. In the spike (2026-10-18) that is 70 cm, 0.35 s, and facing as face-or-back: the echo must see the same side of you it saw of the figure, and side-on counts as either. The ghost is a film negative that disappears while you stand in it. The figure only vanishes out of sight, so if you keep watching it, it stays, and the next run owes it for longer. This is the reveal, and it teaches "must be seen".
- **Pins** (promised sightings) are the moment-to-moment verb. Same rule, but the player makes them. See below.

It's a bootstrap loop (who held the door first? nobody), which general relativity allows. Say so in-game rather than hope nobody asks.

### Pins: promised sightings
Decided 2026-10-15 (options C and D).
- When a run hits an obstacle, it can drop a pin. The world goes slow-mo for a few seconds.
- Actionable objects **in view only** (the light-cone rule) are drawn pencil-shaded, flickering between their possible states.
- Selecting one flips it at once ("collapsed"; instant help, like Bill & Ted). A pencil-sketch, film-negative future echo appears beside it: that's the debt. A multi-state object takes its most helpful state. Later levels may allow two selections per pin. A pin that isn't used within a few seconds isn't made.
- **Debts:** any later run can repay any pin, and one run can repay several. *What you did wrong breaks time at once; what you haven't done yet can wait.* Unpaid debts only break time at the level's end or when you run out of exotic matter.
- The wrist band shows the timeline, with the debts on it.

### Recording, borrowing and selves
- **Everything a run did and saw is recorded** and must not be contradicted: being seen, props, doors, plates and other signals. Pins are obligations. Run 1's own interactions are not pins.
- **Wiggle room for props:** a prop a past self moved replays that run, and only has to end up close to where it did.
- **Borrowing:** taking an object earlier than run 1 did breaks time when run 1 reaches for it, unless you return it in time. Nothing goes through the portal. Consumables (exotic matter) can only be taken if no past run took them.
- **Death or "jump at will"** both start a new run and leave an echo; a death-jump costs more exotic matter. Echoes are only ever erased by a retake (below). Failed echoes stay.
- **Exotic matter**, found in levels, is the budget for selves. It replaces the earlier cap of four selves. (The spike still caps at four selves and 60 s.)
- **Failure:** when time breaks, the misprint plays and you're put back a few seconds (3 s in the spike), not to the start of the run. A 50% (Deutsch) break shows a "you exist in N realities" misprint first.

### Recovering from mistakes
Decided 2026-10-17, after playing Blind Spot in the spike. A mistake in an earlier run must never force a restart from run 1.
- **The relay comes first:** any mistake can be covered by a later self, at the cost of a self. In Blind Spot, if run 1 held the plate watching the door, run 2 waits until echo 1 has left, takes the plate itself facing away, and run 3 goes through. Levels should always leave a relay open. Nothing is erased, so it stays honest to Novikov.
- **No timestamps for planning.** The game doesn't show when an echo will leave its post; remembering what you did is the skill.
- **Rewind** (hold): everything plays backwards: you retrace your steps, echoes walk backwards, doors and props reverse. What you did after that moment is forgotten.
- **Your proper time never runs backwards.** Rewound seconds still count as lived, because you lived them. That keeps rewind honest physics and stops it being free trial and error.
- **Retake** (when really stuck): freeze time, pick any self, scrub to a moment by eye (not by number), and take over that self from there. Everything it did before that moment is kept. Every later echo and the current run are erased, because their memories were recorded against the old history. In-game this is a branch to a different history (Deutsch), shown with the misprint look, not a repair. Rewind is just a retake of your current self. Cost: free in the spike; later maybe exotic matter or proper time.

### Arrivals
Run 1 starts at the level's spawn. Every later run arrives somewhere else, where the portal lets out, as in Echo Sight (run 1 starts at `S`, later runs at `A`). Each later run gets its own pad there, so you never arrive inside an echo.

### Art: a paper-craft diorama
A world made of craft materials, walked through in 3D: corrugated-card walls, crayon floors, masking-tape doors. Geometry is boxes and flat sheets; textures are generated by scripts (canvas-drawn PNGs and a Python material builder).
- **Paper craft for things in time.** Echoes are paper cut-out dolls; turned side-on they become a thin sliver, so facing reads at a glance.
- **Film negatives and pencil sketches for things not yet in time:** future echoes, pin debts, possible states.
- **Kid crayon drawings around real equations** on the walls: Einstein's field equations, Minkowski's interval, the Morris–Thorne wormhole, Deutsch's CTC condition, Novikov, and so on.
- **The portal is lensed:** you see the far side through it, bent.
- **Sight cones** are pencilled on the floor. One pulses red when its echo will see you within 0.8 s if you stand still, and goes solid red while it sees you.

### The creature
A 4D creature, sliced into our world every frame, so it changes shape as it moves through w. Its eyes only appear when they cross our slice, and it can only see you then. For now it touches nothing and isn't a threat (decided 2026-10-16). Later it should chase you, hunt the newest self hardest, and be deterministic across echoes.

### Rules that change from the test bed
- **Signals are instant.** Standing on a switch opens its door at that moment. At real light speed a signal crosses a room in nanoseconds, so this is the accurate choice. (Causal Diamond keeps its slowed light as its own game.)
- **Sight is instant**, for the same reason.
- **Personal time budget.** A level gives a fixed amount of time to *live* across all runs (start at 60 s, tune in playtests). A run spends the time from arrival to portal jump. Physically it is your **proper time**, shown as a draining gauge on the wrist. If full special relativity is ever added, moving fast would slow this clock (the twin paradox).

### Player tools
- **Wrist band:** the HUD, with the timeline, the debts and the time budget. Future selves are "?" cards.
- **Peek** (later): hold a key to glance through one echo's eyes for a second, perhaps for exotic matter. **Rejected:** always-on live views of every echo. They make it too easy, turn stealth into watching security cameras, and cost a full extra render per echo.
- **Sight cones and the warning** (above), and footsteps of past selves, positioned in 3D.
- **Ghost outlines** mark where a figure needs you to stand.
- **Fast-forward** (hold, 4×), and the clock waits for your first key, so there's no dead time.
- **Rewind and retake** (above).
- **The exit plays out the rest of the loop** without you, and only opens if every past self stays consistent. You earn the win by watching it hold.

### Physics we keep accurate
- Closed timelike curves: the portal.
- Novikov self-consistency: the exit only accepts a consistent timeline.
- Deutsch's resolution: a paradox becomes a mix of histories (50% existence), not a contradiction.
- Proper time: the personal time budget. It only ever increases, even while you rewind.
- The light-cone rule: you can only pin what you can see.

Rules that aren't physics, such as "what you didn't see, you don't owe", should be called game rules in-game.

### Engine
**Unreal 5.8**, the user's call on 2026-10-15: it matches their other project (Oathbound) and suits Steam. Assets are generated by scripts (Python material builder, canvas-drawn PNGs, levels built at runtime from text maps), so only sources need tracking. Watch Lumen's cost on Steam Deck. Scene captures (the portal) get no Lumen, so they look murky.

The spike in `unreal-spike/` (git-ignored, see its README) proved the look and tech: a cardboard L-room, paper-doll echoes, the creature, the lensed portal, a swinging lamp, wall equations, sight cones and one puzzle, "Hold the Door". It also showed the gap: a tech test, not a puzzle.

### Key technical decision: record transforms, not inputs
Echoes play back recorded transforms (position, view rotation, interactions, about 60 Hz) as kinematic playback, and paradoxes are checked explicitly:
- **Spotted:** each tick, trace from the echo's recorded eye to a few points on each figure, inside its recorded view frustum. Compare with what it saw when recorded.
- **Prophecy:** the same check in reverse: a remembered figure must still be traceable.
- **Blocked:** sweep the echo's body along its next recorded segment. A closed door in the way strands it.
- **Failed interaction:** at each recorded "pressed switch at 0:12.4", check the switch is still pressable.

World state is a function of the event log, which makes rewind nearly free.

### Build plan
1. Done: the Unreal spike (look, tech, one stealth puzzle).
2. Port the Echo Sight levels one-for-one into the spike, starting with Blind Spot and The Figure. Same puzzle, new presentation: if it's fun in 3D, the spike only lacked a puzzle; if it's flat, first person costs readability and we need an echo view or a different camera.
3. Pins and debts, the wrist band, exotic matter.
4. Autopilot reference solutions for every level (`-SpikeScript=solve`), plus the obvious mistake caught, like the Echo Sight verifier.
5. Vertical slice of about ten levels, controller support, Steam Deck.
6. Steam: store page early for wishlists, demo in a Next Fest. Develop in the open (see RESEARCH.md, lessons).

### Risks
- **Readability:** first person mostly shows a wall, while the 2D test bed shows the whole loop. Step 2 of the build plan tests this.
- **Fairness:** being spotted must feel earned. Few selves, short loops, sight cones, the warning and footsteps carry this.
- **Prophecy precision:** keep figures mostly still; loose matching and ghost outlines.
- **Feeling scripted:** the player chooses whether to look, which pins to make, and how to repay.
- **Motion sickness:** keep rewinds short, and offer a fade.
- **Level validation:** every level gets an autopilot solution.
