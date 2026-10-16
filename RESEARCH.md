# Research: games with past selves, loops and copies of yourself

Prior art for "stealth against your former self" (see [DESIGN.md](DESIGN.md) and TODO.md, section C). Compiled 2026-10-15 from web sources linked below. Sales figures for small and older games are rarely published; where none were found, review counts or critic scores are given instead, and estimates are marked as such.

## Comparison

| Game (year) | View | How past selves / copies work | Does being seen by yourself matter? | Paradox handling | How it did |
|---|---|---|---|---|---|
| **Braid** (2008), World 5 | 2D | After a rewind, a shadow Tim replays what you did before the rewind and can use purple objects. | No | None. The shadow just repeats, including your mistakes. | ~55k copies in week 1 on XBLA; ~450k by 2012 (one secondary source) |
| **Chronotron** (2008, Flash) | 2D | Each trip in the time pod adds a past self that replays your **inputs**. | No | If you stop a past self reaching the pod, it's a paradox and the stage fails. | Free on Kongregate; well liked |
| **Cursor\*10** (2008, Flash) | 2D (mouse) | Up to 10 cursors, each ~60 s; earlier attempts replay and help. | No | None | Free; praised as a new "single-player co-op" genre |
| **The Misadventures of P.B. Winterbottom** (2010) | 2D | Record an action; a clone loops it forever. Some clones are lethal to touch. | No (touch, not sight) | None stated. Clones fade if knocked off their path. | Metacritic 79 PC / 83 X360; no sales found |
| **Retro/Grade** (2012) | 2D | A rhythm shooter played backwards: you "un-fire" the shots your ship already fired. | No | Missing a note creates a paradox, which you can rewind. | Positive reviews, but cost $140k and did not recoup |
| **A Slower Speed of Light** (2012, MIT Game Lab) | FP | No selves. Light slows as you collect orbs: Doppler shift, time dilation, length contraction, seeing the past. | n/a | n/a | Free; spawned the open-source OpenRelativity toolkit |
| **The Swapper** (2013) | 2D | Up to four clones that move in sync with you; swap into any you can see. | No (line of sight is for swapping) | n/a (not time travel) | Metacritic 87; acclaimed; no sales found |
| **The Talos Principle** (2014), recorder puzzles | FP | Record yourself for a short window; a hologram replays it (stands on plates, holds beams). | No | None. The recording plays out regardless. | ~550k copies on Steam (third-party estimate); sequel sold 100k in 2 weeks |
| **Time Rifters** (2014) | FP (VR-first) | Each of four lives replays alongside you as a ghost; you can see where each ghost is **looking**. | No | None | Small release |
| **TimeSplitters: Future Perfect** (2005) | FP | Scripted "meet yourself" scenes: your future self shoots down a helicopter or hands you a key; later you play the other side. | Yes, in story: you must later do what you saw. | Scripted only. Critics noted the bootstrap key "came from nowhere". | Well reviewed; series' last entry |
| **The Sexy Brutale** (2017) | 3P isometric | No selves. A 12-hour party loops; you learn guests' routines to prevent murders. | Being seen by **guests** hurts you: their masks attack, so you spy through keyholes and hide. | Loop resets each day. | Metacritic 83 PC; Polygon game of the year pick; no sales found |
| **Echo** (Ultra Ultra, 2017) | 3P | Not recordings. The palace copies your *behaviour*: after each blackout, Echoes can do what you did (run, shoot) and forget what you didn't. | Indirectly: a stealth game against copies of you. | n/a | Metacritic 72–79; **not a financial success**; studio closed 2019 |
| **Outer Wilds** (2019) | FP | No selves. 22-minute loop; only your knowledge carries over. | No | The loop itself is the mystery. | Over 2 million copies by Aug 2021; Metacritic 85 |
| **Timelie** (2020) | Isometric | No selves. Scrub a timeline back and forth while a girl and a cat sneak past robots. | Being seen by robots ends that timeline; you rewind. | Fail state is just "rewind". | Over 30k copies; 95% positive on Steam |
| **Quantum League** (2021) | FP | Competitive shooter: three loops per round; your earlier loops play as clones beside you. | No. You shoot opponents' clones to change their past. | Killing a clone stops its later actions. | Steam 75% of ~1.25k; delisted; servers shut down Dec 2023 |
| **Deathloop** (2021) | FP | No selves. Kill eight targets in one day; knowledge carries over. Another player can invade as Julianna. | No | Loop resets if you fail. | 5 million players by Feb 2023; Metacritic 87–89 |
| **Twelve Minutes** (2021) | Top-down | No selves. A 12-minute loop in one apartment; only you remember. | No | Loop resets on death, leaving, or time out. | Mixed (Metacritic 63–76; OpenCritic 53% recommend); on Game Pass; no sales found |
| **The Last Clockwinder** (2022) | FP (VR) | Record 2–8 s of your arm movements; clones loop them to run a factory. | No | None | "Overwhelmingly Positive" (~755 Steam reviews); awards |
| **UnLoop** (CM Games, 2025) | FP (VR) | A spy on a space station; each loop adds a copy of you that replays your actions in real time. Toss items to a future copy, leave voice notes. | Not found in coverage | Not found in coverage | $19.99 on Quest; "Very Positive" (161 Steam reviews) |

### Small and jam games that are closest to our idea

| Game | View | Relevance |
|---|---|---|
| **TimeHeist** (Fineapple, itch.io) | Top-down | Tagline: "First rule of time travel: Never be seen by your past selves." A stealth puzzle where you hide from your clones to avoid paradoxes. Closest match to "stealth against yourself", but 2D and tiny. |
| **Paradox Agency** (itch.io) | Isometric 3D | Two phases. Phase 1: your agent does impossible things (passes locked doors, survives being shot), and each one creates "a debt that your future self will have to solve". Phase 2: you play the future self and make those things true. Closest match to our debt idea, but the debt comes from impossible actions, not from sightings. |
| **Convergence** (Global Game Jam 2023) | FP | A first-person stealth game across parallel timelines. The page doesn't say whether you hide from past selves or guards. |
| **I've Got Time for Crime!** (itch.io) | Top-down | A heist where you help your past self, who replays frame by frame. |
| **Paradox!** (POLIMI Game Collective) | 2D | A burglary platformer where you team up with your future self. |

## Answers

### Has anyone shipped first-person "stealth against your former self"?
Not that we could find. The pieces exist apart from each other:
- **Stealth against copies of yourself:** Echo, but in third person, with behavioural mimics rather than replays of you.
- **Never be seen by your past selves:** TimeHeist, a small top-down itch.io game.
- **Recorded selves in first person:** Talos, Time Rifters, Quantum League, The Last Clockwinder and UnLoop. In all of them past selves are tools or teammates, and none checks what they *see*.
- **Being seen as a rule in a loop:** The Sexy Brutale and Timelie, but the watchers are NPCs or robots, not you.

The closest commercial neighbour is **UnLoop** (2025, first-person VR, spy, copies of you each loop). The coverage we found doesn't say whether its copies can see you, so it's worth playing before we commit.

### Has anyone made "you saw your future self, so you must become it" a core mechanic?
Only partly:
- **TimeSplitters: Future Perfect** (2005, first person) did exactly this as scripted set pieces: you see your future self, then later play that moment. It was linear story, not a rule the player could break.
- **Paradox Agency** (a jam game) makes a "debt to your future self" the core loop, triggered by impossible actions.

We found no game where the debt is created by **what you saw**, can be **avoided by not looking**, and is **checked against recorded sight** in both directions.

### What is actually new in ours
1. **Consistency is about perception.** Every past self must see exactly what it remembers, no more and no less. Prior games check whether past selves can still *do* things (Chronotron, Braid, Quantum League) or just play them back. Being seen by NPCs (Sexy Brutale, Timelie) is not the same as being seen by yourself.
2. **One rule pulls both ways.** You hide from your echoes (stealth), and you must turn up where you were seen (prophecy). We found no game that combines the two.
3. **Sightings as an emergent debt.** You get the debt by looking, you can avoid it by looking away, and a counter tracks it. TimeSplitters scripted this; Paradox Agency triggers its debt by action, not sight.
4. **First person as the memory test.** Recorded selves exist in first-person games, but none asks you to remember from the inside where you looked.
5. **Physics framing.** Novikov consistency, a proper-time budget and Deutsch-style resolution are taught honestly. A Slower Speed of Light is the nearest "accurate physics as play" precedent, but it has no time loops.

## Lessons and pitfalls from prior games

- **A great concept doesn't sell on its own.** Echo, the nearest "stealth against yourself" game, was well reviewed but lost money, and the studio closed. Retro/Grade (a novel time mechanic, 4 years of crunch, built quietly) never recouped its cost; its developer said the biggest mistake was not developing in the open. Build a Steam page, a demo and a community early, as DESIGN.md already plans.
- **Avoid multiplayer dependence.** Quantum League, a first-person shooter with recorded selves, was delisted and its servers shut within about 2.5 years. A single-player puzzle game has no servers to die.
- **Short, legible loops beat long ones.** Outer Wilds (22 min) and Deathloop work because knowledge is the progression. Twelve Minutes was criticised for repetitive loops and for guessing the designer's intent. Keep loops short (we plan 20–60 s) and make each failure explain itself.
- **Make failure a rewind, not a punishment.** Timelie's "fail state that isn't a fail state" (scrub back) was praised. The Sexy Brutale made its being-seen rule forgiving with a generous escape window. This supports our grace times and warning meter.
- **Show where past selves look.** Time Rifters drew each ghost's gaze, and that is the fairness tool our wrist band and crayon view cones aim to be. Without it, being spotted in first person will feel arbitrary.
- **Replay transforms, not inputs.** Chronotron replays inputs, and players reported small timing drift over many loops. DESIGN.md already chooses transforms; keep it.
- **Copying your past mistakes is a hazard.** Braid's shadow repeats your errors exactly. Prophecies that need exact copying will frustrate players, so allow loose matching and keep figures mostly still (already in Risks).
- **Players notice bootstrap loops.** Reviewers of TimeSplitters asked where the key originally came from. Lean into it: say in-game that it's a bootstrap loop and that general relativity allows one, rather than hoping nobody asks.
- **Scripted versus emergent.** TimeSplitters' meet-yourself scenes were memorable but on rails. Our version only stays fresh if the player chooses whether to look, which sightings to take on, and how to repay them (TODO B2).
- **Plan in phases.** Talos players split recorder puzzles into setup, recording and playback, which suggests our tutorial should teach "run 1 sets up what run 2 must respect" in the same explicit way.
- **First person brings comfort issues.** VR games with recorded selves (Last Clockwinder, UnLoop) show the appeal, but rewinds and repeated runs in first person need fades and short loops (already in Risks).

## Sources

- Braid: [StrategyWiki World 5](https://strategywiki.org/wiki/Braid/World_5:_Time_and_Decision); sales: [Engadget 2008](https://www.engadget.com/2008-08-25-counting-rupees-sustainable-indies.html), [vgdb retrospective](https://www.vgdb.co/articles/this-day-in-gaming-august-6-braid)
- Chronotron: [Wikipedia](https://en.wikipedia.org/wiki/Chronotron), [Kongregate wiki](https://kongregate.fandom.com/wiki/Chronotron), [POV-Ray thread on timing drift](https://news.povray.org/povray.off-topic/thread/%3C48297d76%40news.povray.org%3E)
- Cursor\*10: [Wikipedia](https://en.wikipedia.org/wiki/Cursor*10), [Shacknews](https://www.shacknews.com/article/51032/play-with-yourself-cooperatively-alone)
- P.B. Winterbottom: [Wikipedia](https://en.wikipedia.org/wiki/The_Misadventures_of_P.B._Winterbottom), [Worthplaying review](https://worthplaying.com/article/2010/6/5/reviews/74712-xbla-review-the-misadventures-of-pb-winterbottom/)
- Retro/Grade: [Wikipedia](https://en.wikipedia.org/wiki/Retro/Grade), [GDC postmortem](https://www.gdcvault.com/play/1017963/), [Gilgenbach, "Really open development"](https://www.gamedeveloper.com/business/really-open-development)
- A Slower Speed of Light: [Wikipedia](https://en.wikipedia.org/wiki/A_Slower_Speed_of_Light)
- The Swapper: [Wikipedia](https://en.wikipedia.org/wiki/The_Swapper)
- The Talos Principle: [Steam discussion on recorder](https://steamcommunity.com/app/257510/discussions/0/626329186974657487), [Raijin Steam estimate](https://raijin.gg/app/257510/The_Talos_Principle), [Talos 2 sales](https://gameworldobserver.com/2023/11/20/talos-principle-2-sales-100k-copies-croteam-devolver-digital)
- Time Rifters: [Destructoid](https://vip-develop.destructoid.com/?p=139812), [Opsive](https://opsive.com/games/time-rifters/)
- TimeSplitters: Future Perfect: [GameSpot hands-on](https://gamespot.com/articles/timesplitters-future-perfect-hands-on/1100-6098018/), [DJCube review](https://djcube.co.uk/timesplitters-future-perfect/), [forum review on the key](https://www.tapatalk.com/groups/rgpforum/timesplitters-future-perfect-8-10-t1008.html)
- The Sexy Brutale: [Wikipedia](https://en.wikipedia.org/wiki/The_Sexy_Brutale), [TheSixthAxis review](https://thesixthaxis.com/2017/04/13/the-sexy-brutale-review), [Windows Central review](https://windowscentral.com/what-priest-saw-sexy-brutale-idxbox-review)
- Echo: [Wikipedia](https://en.wikipedia.org/wiki/Echo_(2017_video_game)), [Unreal Engine interview](https://www.unrealengine.com/en-US/developer-interviews/become-your-own-worst-enemy-in-echo)
- Outer Wilds: [Wikipedia](https://en.wikipedia.org/wiki/Outer_Wilds)
- Timelie: [Wikipedia](https://en.wikipedia.org/wiki/Timelie), [PC Gamer review](https://www.pcgamer.com/timelie-review/), [Game Informer review](https://gameinformer.com/review/timelie/timelie-review-making-every-second-count), [Steam](https://store.steampowered.com/app/1150950/)
- Quantum League: [Steam](https://store.steampowered.com/app/651150/Quantum_League/), [Nimble Giant](https://nimblegiant.com/games/quantum-league/), [developer interview](https://gwb.tencent.com/news/10018), [Steam thread on shutdown](https://steamcommunity.com/app/651150/discussions/0/4329623982972826666)
- Deathloop: [Wikipedia](https://en.wikipedia.org/wiki/Deathloop)
- Twelve Minutes: [Wikipedia](https://en.wikipedia.org/wiki/Twelve_Minutes)
- The Last Clockwinder: [Wikipedia](https://en.wikipedia.org/wiki/The_Last_Clockwinder), [Steam](https://store.steampowered.com/app/1755100/The_Last_Clockwinder/)
- UnLoop: [Road to VR](https://roadtovr.com/into-the-radius-studio-unloop-release-quest-steam-pico/), [UploadVR](https://www.uploadvr.com/unloop-retrofuturistic-vr-puzzle-game/), [CM Games](https://cm.games/stories/cm-labs-unloop)
- Jam and small games: [TimeHeist](https://fineapple.itch.io/timeheist), [Paradox Agency](https://nhiku.itch.io/paradox-agency), [Convergence](https://crater-364.itch.io/convergence), [I've Got Time for Crime!](https://jonoexplainsthings.itch.io/ive-got-time-for-crime), [Paradox!](https://polimi-game-collective.itch.io/paradox/devlog/490004/paradox-final-release-is-out-now), [Your Future Self](https://www.mobygames.com/game/123278/your-future-self/)

### Gaps
- No sales figures were found for The Sexy Brutale, The Swapper, P.B. Winterbottom, Twelve Minutes, Last Clockwinder or UnLoop.
- UnLoop's rules for being seen by copies are unconfirmed: play it or its demo.
- Convergence's page doesn't say who you hide from.
- An NYU ITP thesis, "Temporal Paradox" (VR, avoid your past selves in a maze), turned up in search but its page returned 404, so it's unverified and left out of the tables.
