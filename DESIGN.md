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

All four are checked by `echo-sight/tests/verify-levels.js`: each is winnable, can't be won solo, and the obvious mistake gets caught.

## The game: first person, in a paper-craft world

Decided on 2026-10-14. The goal is a standalone game on Steam. The physics should be as accurate as we can make it, with "stealth against your former self" as the twist.

### Why first person
You are the echo. On run N you remember your earlier runs from the inside, and the challenge is remembering where you were and avoiding yourself. A top-down view would show everything and turn memory into a planning board. Fairness comes from the tools below, not from an overhead camera.

### Art: a paper-craft diorama
A world made of craft materials, walked through in 3D: corrugated-card walls, crayon floors, masking-tape doors, a construction-paper portal. Geometry is boxes and flat sheets; textures are pixel art or painted paper, drawn in code.
- **Echoes are paper cut-out dolls.** Turned side-on they become a thin sliver, so facing reads at a glance.
- **View cones** (in Echo Sight) are translucent crayon scribbles on the floor.
- **Physics notes** are handwritten scraps pinned to walls.

### Rules that change from the test bed
- **Signals are instant.** Standing on a switch opens its door at that moment. At real light speed a signal crosses a room in nanoseconds, so this is the accurate choice. (Causal Diamond keeps its slowed light as its own game.)
- **Sight is instant**, for the same reason.
- **Personal time budget.** Each level gives a fixed amount of time to *live* across all runs (start at 60 s, tune in playtests). A run spends the time from arrival to portal jump. This limits the number of echoes and rewards clean runs. Physically it is your **proper time**, shown as a draining gauge on the wrist. If full special relativity is ever added, moving fast would slow this clock (the twin paradox).
- **At most four selves per level**, for readability.

### Player tools
- **Wrist band.** Raise your wrist to see a small live view through the eyes of every past self at this moment. Raising it blocks part of your view and slows you, so checking costs something. Future selves can't be shown: their slot is a "?" card. On run 1 that is the prophecy figure, someone you haven't become yet.
- **Footsteps.** You hear your past selves walking, positioned in 3D.
- **Warning meter.** Being in an echo's view fills a meter before you are spotted.
- **Ghost outlines** mark where a prophecy needs you to stand.
- **Echo Sight** (hold): every past self's cone, as crayon on the floor.

### Physics we keep accurate
- Closed timelike curves: the portal.
- Novikov self-consistency: the exit only accepts a consistent timeline.
- Deutsch's resolution: a paradox becomes a mix of histories (50% existence), not a contradiction.
- Proper time: the personal time budget.

### Engine
Deferred until the first-person browser prototype shows the game is fun. Godot 4 is the lead: the paper-craft look doesn't need Unreal's realistic lighting or animated characters, and Godot's scenes and scripts are text files Claude can edit. Unreal 5 stays an option. Either way, levels are authored as text maps (as now) so the level verifier keeps working.

### Key technical decision: record transforms, not inputs
Whatever the engine, echoes play back recorded transforms (position, view rotation, interactions, about 60 Hz) as kinematic playback, and paradoxes are checked explicitly:
- **Spotted:** each tick, trace from the echo's recorded eye to a few points on each figure, inside its recorded view frustum. Compare with what it saw when recorded.
- **Prophecy:** the same check in reverse: a remembered figure must still be traceable.
- **Blocked:** sweep the echo's body along its next recorded segment. A closed door in the way strands it.
- **Failed interaction:** at each recorded "pressed switch at 0:12.4", check the switch is still pressable.

World state is a function of the event log, which makes rewind nearly free.

### Build plan
1. **First-person browser prototype** (three.js) on the Echo Sight simulation: instant signals, paper textures, mouse look, wrist views, footsteps, warning meter, time budget. Same four levels and verifier.
2. Playtest. If remembering your runs from the inside is fun, pick the engine.
3. Engine grey-box: record and play back a self, portal, rewind, switch and door, sight checks.
4. Prophecies, wrist band, sound, paper-craft art pass.
5. Vertical slice of about ten levels, controller support, Steam Deck.
6. Steam: store page early for wishlists, demo in a Next Fest.

### Risks
- **Fairness:** being spotted must feel earned. Few selves, short loops, the wrist band, footsteps and the warning meter carry this. The prototype has to prove it.
- **Prophecy precision:** keep figures mostly still; ghost outlines guide.
- **Motion sickness:** keep rewinds short, and offer a fade.
- **Level validation:** port the autopilot verifier so every level is proven solvable.
