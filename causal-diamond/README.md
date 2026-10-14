# Causal Diamond

A real-time time-loop puzzle prototype. Your past selves replay your earlier runs, signals travel at the speed of light, and paradoxes don't end the game. They turn into 50/50 superpositions.

## Play

Open `index.html` in a browser. It's a single file with no build step and no install. It loads its fonts from Google Fonts, and falls back to system fonts when offline.

## How it works

- **Real-time loop.** Each level runs on a clock (20–25 seconds). The clock starts when you first move.
- **Time portal.** Stepping into the portal rewinds the world to 0:00. Your run becomes a numbered *echo* that replays exactly what you did while you play alongside it.
- **Light-speed signals.** Pressure plates emit visible rings at 6 tiles/s, and a door only reacts when the ring reaches it. You walk at 4 tiles/s, so you can never outrun your own signal. Everything you can influence stays inside your light cone (the "causal diamond").
- **Paradoxes are superpositions (after David Deutsch's model).** If you stop an echo from reaching the portal, for example by closing a door on it or destroying the portal, that echo never travels back. Everyone after it drops to **50% existence** and flickers. The exit only accepts you at 100%, so you have to make the timeline consistent (the Novikov self-consistency principle).

## Levels

1. **Hold the Door**: introduces echoes.
2. **Grandfather**: the portal's kill switch is on your only path out. Press it too early and you cancel your own past.
3. **Two of Me**: two doors in a row. Use two echoes, or one with perfect timing.

## Controls

| Input | Action |
| --- | --- |
| WASD / arrow keys | Move (or drag on the field on touch screens) |
| F (hold) | Fast-forward time 4× |
| R | Redo the current run |
| Z | Erase your latest echo |

The timeline under the field marks when each echo enters the portal (diamonds), when a paradox happened (red marks), and when each plate was held (colored strips).

## Status

Prototype. Only three levels, no save state, and built mainly for keyboard play. Ideas for a bigger 2D/3D version:

- Show both branches of a superposition at once.
- Add puzzles where you create a paradox on purpose and then resolve it.
- Add a black hole level where space and time swap roles.
- Add a 3D view with time as the vertical axis, so your worldlines are visible.

## Further reading

- Kip Thorne, *Black Holes and Time Warps*
- J. Richard Gott, *Time Travel in Einstein's Universe*
- David Deutsch, *The Fabric of Reality*
