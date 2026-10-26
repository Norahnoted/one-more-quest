---
doc: checklist
status: approved
---

# One More Quest — Build Checklist

Build mode: fast

## Slices

- [x] **1. Applications and preparation visibly grow your desk adventurer**
  Becomes usable: A running React pixel desk with an automatically wandering character, XP and level display, starter weapon, Apply and Prepare actions, saved progress, and one-step Undo.
  Why now: Delivers the central effort-to-growth loop early and gives the learner a real visual direction to react to before combat is added.
  PRD ref: `prd.md > The Core Journey`, `Applications and Character Levels`, `Preparation and Equipment`, `Saved Progress and Undo`, `Look and Feel`
  Spec ref: `spec.md > Stack`, `Game Rules`, `Save Adapter`, `Game Controller`, `Desk Scene`, `Progress and Action Controls`, `Data Model`, `File Structure`
  Build: Bootstrap React/Vite/Tailwind and dependency lockfile; implement original pixel desk and character, centralized game rules, validated storage, Apply/Prepare, feedback, and Undo. Preserve privacy exclusions and add generated-file exclusions. Keep unfinished controls clearly unavailable. Document startup in English.
  Verify (mechanical): Run rule and storage tests covering leveling, reinforcement, Undo, round-trip, invalid saves, and write failure; run production build; open the browser to check Apply/Prepare, refresh persistence, Undo, wandering, and desktop/narrow layouts with no console errors.
  Learner check: Open the local app, apply enough times to level up, prepare, refresh, and undo; describe how the desk and visible growth compare with your intention.
  Commit: `Build persistent desk adventurer with application and preparation growth`

- [x] **2. Every interview becomes a rewarding stationery boss encounter**
  Becomes usable: Interview records complete rewards immediately, plays a short automatic battle, equips a weapon while keeping reinforcement, and grows the desktop collection.
  Why now: Adds the distinctive collectible reward loop on top of the already usable growth and persistence path.
  PRD ref: `prd.md > Interview Boss and Desktop Collection`, `Preparation and Equipment`, `States and Boundaries`, `Confirmed Interaction Boundaries`
  Spec ref: `spec.md > The Core Journey Through the System`, `Game Rules`, `Game Controller`, `Desk Scene`, `Feedback and Reflection`
  Build: Add the small boss/weapon catalog, complete interview transition, locked controls, approach/strike/stars presentation, reward feedback, and counted desk keepsakes; ensure refresh never grants a reward twice and Undo restores the entire prior record.
  Verify (mechanical): Test interview XP, rotation, repeated collectibles, reinforcement carryover, and full Undo; build; browser-check one encounter, blocked repeated clicks, repeat collection counts, refresh mid-battle, and Undo after reload; check reduced motion.
  Learner check: Prepare twice, complete an interview, inspect the weapon and keepsake, then refresh during another battle and undo the record.
  Commit: `Add automatic stationery encounters and persistent interview rewards`

- [x] **3. Hearts support an open ending and the app is ready for Pages**
  Becomes usable: Manual heartbreaks lead to a dismissible reflection at zero hearts; progress remains intact and usable. Production files and a Pages deployment workflow are ready.
  Why now: Completes the emotional boundary and the full demonstration, then validates the integrated app before publishing.
  PRD ref: `prd.md > Hearts and Open Ending`, `Confirmed Interaction Boundaries`, `States and Boundaries`, `What We're Building`
  Spec ref: `spec.md > Feedback and Reflection`, `Where It Runs and How Someone Tries It`, `Important Failure Modes`, `Verification Plan`
  Build: Add bounded manual heartbreaks, accessible open-ending dialog and reflective choices, focus restoration, zero-heart continued play, and Undo. Add Pages workflow and configurable repository base, English run/deploy/demo instructions, and integrated layout polish.
  Verify (mechanical): Run all tests and production build; browser-check three heartbreaks, close/keyboard focus, zero-heart actions, Undo, save failures, and the full journey. Preview a production build under a repository-style path and confirm assets load. Actual public deployment and URL verification remain shipping tasks once repository configuration is known.
  Learner check: Explore the whole app freely, including three heartbreaks, closing the ending, continuing, refreshing, and Undo; report broken, confusing, or unwanted behavior.
  Commit: `Complete open-ended hearts journey and prepare GitHub Pages deployment`

Slice 1 verification: six Node tests passed; production build passed with Vite 8.3.5; browser verified level-up, preparation, persistence, one-step Undo, automatic wandering, no page errors, and no horizontal overflow at 390px. Early learner feedback requested larger text, a brighter cherry-soda palette, reordered actions, distinct level/weapon feedback, and a count-only daily tracker; revisions passed verification and were committed as e50580e.

## Hands-on Checkpoints

- [x] Early usable behavior explored — after slice 1, before combat work
- [ ] Final kick-the-tires exploration and feedback completed — after slice 3

Learn mode additionally uses each slice's learner check. Fast mode pauses at the two planned checkpoints unless an additional useful issue requires feedback.

## Final Review

- [ ] Learner explores the completed interview/hearts journey and reports final feedback
- [ ] Final palette review requested by learner

- [ ] Final review complete — feedback resolved and learner confirms ready to ship

## Code Tour and App Map

- [ ] Learning activity complete — follow one action through the button, shared rule, and saved/rendered result; connect file boundaries and acceptance checks to reducing repeated revisions
- [ ] Optional edit and transfer reflection addressed — offer one small rules change or connect practice already completed
- [ ] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse

Activity and evidence: Not yet performed.
Route and stops: To be grounded in actual finished code.
Edit outcome: Not yet offered.
Reflection: Not yet offered; any personal answer stays in the ignored profile.
Activity mode: To be recorded after the wrap-up.

## Revisions

- System Node 21 is unsupported by the selected current toolchain; use the available bundled Node 24 for verification and document Node 22.12+ for contributors. No system runtime was changed.

- Early learner feedback added daily action counts, a separate weapon panel, level-up/forge feedback, and a cherry-soda visual revision. PRD and spec updated; original professional-tracker exclusions remain intact.

- Learner confirmed slice 1 functionality after revisions and requested continuing; final palette review remains pending. Nine tests and production build passed; browser checks covered daily counts, saved reinforcement, Undo, level-up/forge feedback, and mobile layout.

- Slice 2 verification: 11 tests and production build passed. Browser verified four-second encounter, action locking, +30 XP, retained +2 reinforcement, collectible repeats, complete saved reward after mid-battle refresh, one-step Undo, and reduced-motion presentation; no page errors.

- Production preview of a repository-style build must use the same BASE_PATH as the build; the initial preview used the root base and returned a missing script. README corrected and matching-path preview rechecked.

- Slice 3 verification: all 12 tests passed. Browser verified third-heartbreak dialog, both reflective directions, Escape/close focus, zero-heart recording, no forced reopening on refresh, full heart Undo, reduced motion, and narrow layout. Production repository-path preview loaded assets and preserved XP with no failures. Browser storage write failure showed an unsaved warning; invalid saves remained intact and actions were blocked. Public deployment awaits shipping.

- Final visual request: rename to One More Quest, reference only the supplied status bar/typography/colors, and preserve all gameplay and saves. Earlier cherry-soda palette is superseded. Rechecking this limited visual revision.

- Learner requested YOUR NEXT CHAPTER, One More Quest✧, an edge-to-edge layout, a closer reference-style serif title, and a different original avatar. Updated with a pixel ranger; suggested courage instead of workstation in the subtitle because it describes the project motivation. Production build passed; mobile width checked. Final visual confirmation remains pending.

- Learner specified exact typography: self-host Fraunces for the main/dialog titles and DM Sans for interface copy; replacing provisional fonts and verifying loaded font faces.

- Latest learner refinements implemented: modest gutters, shared girl sprite, note removed, manual-heartbreak feedback, and post-boss treasure chest opening with a weapon reveal. Twelve tests and production build passed. Browser verified the heart effect, opened chest/weapon name, exactly one interview reward, no note, matching avatar, mobile gutters/no overflow, and no page errors. Learner retry remains pending.

- Browser comments requested the footer “❋ Every application is a step. Every interview is experience.” and a cuter status avatar. Replaced the status portrait with an original round-faced girl illustration; desk sprite and gameplay remain unchanged.

- Learner approved brighter colors and actionable ending choices. Added persisted, undoable heart restoration for retry/different path, a clear confirmation for the different path, and a zero-heart reopen control. Fourteen tests/build passed; browser confirmed both exits, complete progress preservation, saved hearts after refresh, Undo/reopen, no page errors, and no mobile overflow. Learner retry remains pending.

- Browser review refinements: subtitle ends with One more chance.; removed both desk footer labels; changed manual heartbreak control to I’m feeling discouraged with a distinct button treatment; coral feedback gives a gentle setback message and remaining-heart context; enlarged section spacing. Production build and mobile browser checks passed; emotional and growth message backgrounds differ.
