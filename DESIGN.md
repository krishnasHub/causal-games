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

## The 3D version (Unreal Engine 5)

### What carries over
| 2D test bed | First person |
|---|---|
| View cones and fog | Your actual camera. Echoes are full-body characters you watch from behind pillars. |
| Signal rings | A glowing sphere expanding through walls at *c* |
| 50% existence | Double vision: the screen splits into two drifting versions of the world |
| Echo Sight | Toggle a stealth-game "guard vision" overlay. Scrub the wrist timeline to see where any echo will be looking at any moment. |
| The figure | A hooded silhouette on run 1. On later runs, a faint ghost outline where you must stand. |
| Timeline strip | A wrist device: loop clock, portal times, outstanding prophecies |

### Key technical decision: record transforms, not inputs

The 2D game replays inputs because its simulation is fully deterministic. Unreal's physics (Chaos) and animation aren't. So echoes play back **recorded transforms** (position, view rotation, animation state, interaction events at about 60 Hz) as kinematic playback, and paradoxes are checked explicitly:

- **Spotted:** each tick, line-trace from the echo's recorded camera to a few points on each figure's body (head, chest, hands), inside its recorded view frustum. Compare against what it saw when it was recorded.
- **Prophecy:** same check, in the other direction: a remembered figure must still be traceable.
- **Blocked:** sweep the echo's capsule along its next recorded segment. A closed door in the way means it's stranded.
- **Failed interaction:** at each recorded "pressed button B at 0:12.4", check the button is still there and pressable.

### Systems
- `UTimeLoopSubsystem` (world subsystem): loop clock, runs, rewind, consistency checks, exit look-ahead.
- `UChronoRecorderComponent` (on the player): writes transform, view, animation state, interactions and seen-figures into a run buffer.
- `AEcho`: skeletal mesh driven from a run buffer. A ghost material shifts red when it's spotting you or stranded.
- `UVisionComponent`: frustum test plus traces, shared by echoes and the player's memory recording.
- `UProphecy` / `APhantom`: level-authored first-run figure with a scripted path.
- World state as a function of time: doors and plates compute their state from the event log ("plate pressed at 3.1 s, door 9 m away, so it opens at 3.1 + 9/c"). That makes rewind nearly free.
- `ULightSignal`: expanding-sphere effect, and doors subscribe to the time it arrives.
- Paradox post-process: one material driven by an `Existence` parameter (double image, chromatic split, audio detune).

### Build plan
1. Grey-box loop: record and play back a self, portal, rewind, plate and door.
2. Causality: light-speed signals, blocked-path checks, existence, exit look-ahead.
3. **Sight (the new genre):** view checks, memory recording, detection ring, Echo Sight.
4. Prophecies: the first-run figure, ghost guides, wrist-device obligations.
5. Vertical slice: port the test-bed levels, art pass, sound (reversed audio during rewind).

### Risks
- **Readability:** many copies of you in first person is a lot. Use per-echo colors and numbers, cap echoes per level, and make Echo Sight good.
- **Fairness:** being spotted must feel earned. Use the detection ring, grace time, and clear view-cone telegraphing.
- **Prophecy precision:** matching a remembered figure by hand needs slack. Keep figures mostly standing still, and use the ghost outline to guide.
- **Motion sickness:** keep the rewind effect short, and offer a fade instead.
- **Level validation:** port the autopilot verifier as an editor test, so every level is proven solvable.
