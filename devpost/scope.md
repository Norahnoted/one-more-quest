---
doc: scope
status: approved
---

# One More Quest

A lightweight, English-language pixel-art web app that turns job-search actions into character growth and desktop collectibles.

## The Unique Kernel

Effort always leaves a visible reward, even when applications receive no response. Applications earn experience, interview preparation strengthens weapons, and completed interviews grant rewards regardless of the outcome. Three hearts represent personally defined heartbreaks, encouraging the player to keep trying before those three moments occur.

## Who It's For

Initially built for its creator during their own job search. A separate professional job tracker can handle application details; this app provides visible progress and motivation to keep going.

## The Core Loop

Open the app and watch a character wander automatically around a small scene. Log an application, interview preparation, or completed interview with one click, then see experience, weapon upgrades, or boss rewards. Interview bosses resemble desk stationery; completing an interview adds the corresponding object to a desktop collection. Return to see evidence that each effort has accumulated into something.

## Inspiration & Identity

Inspired by the feeling of a small character moving through a scene in Stardew Valley and Journey, expressed in pixel art. The app keeps the map and interactions simple, with automatic character movement and English interface copy.

Reference starting points: [Stardew Valley](https://www.stardewvalley.net/) and [Journey](https://thatgamecompany.com/journey/). These are inspiration references; visual research has not yet been conducted.

## Why This Matters to the Learner

The creator wants to see that something has changed even when applications go unanswered: taking action should always earn something, as it does in a game. The project also provides practice in planning before implementation to reduce repeated small revisions and token use.

## What "Working" Looks Like

The approved demonstration: open the app and see the character wandering; log an application to gain experience, log preparation to strengthen a weapon, and log a completed interview to receive a weapon reward and a stationery collectible. Manually mark three heartbreaks to reveal an open-ended dialog about trying another run or exploring a different direction.

This loop should be demonstrable in approximately one minute. The curriculum's final deliverables include a short demo video and a public GitHub repository; deployment is optional. The overall target is a small proof of concept built in approximately 2–4 hours of active work.

## The POC Boundary

- One small scene with an automatically wandering character and one-click action logging.
- Applications grant character experience and level progression; preparation strengthens weapons; completed interviews grant weapons and stationery collectibles regardless of outcome.
- Three hearts, consumed only when the player explicitly marks a heartbreak. Rejection never automatically removes a heart.
- An open-ended dialog after the third heartbreak, without implementing subsequent game paths.
- Reward counts, progression values, feedback details, and persistence will be defined in the PRD and technical plan.

## Later

- Complete restart or change-of-direction flows after the open ending.
- A separate skill-level system. The creator approved using character experience, weapons, and collectibles to demonstrate growth in the first version.

## Explicitly Cut

- Company, role, and preparation-detail forms or professional application workflow management: the creator explicitly requested one-click logging and already has a separate job tracker.
- Complex maps and controls: the intended experience is a lightweight idle tracker with automatic character movement.


## Approved Chapter Continuation Update

This supersedes earlier statements that the two ending choices are display-only. At zero hearts, Try another run restores three hearts and closes the dialog. Explore a different direction presents “A new direction. Nothing you learned is lost.” and a Begin a new chapter button; confirmation restores three hearts and returns to the desk. Both preserve XP, weapon, reinforcement, collectibles, and all daily records. Each is one undoable, persisted action. A zero-heart player who dismissed the dialog can reopen it from Choose your next chapter. No separate game/map or data-erasing restart is added.

The learner also requested brighter colors: retain the warm ivory base and strengthen meadow green, coral hearts, and honey-gold reward accents.
