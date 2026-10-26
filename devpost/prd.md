---
doc: prd
status: approved
---

# One More Quest — Product Requirements

An English-language pixel-art idle tracker for a job seeker who wants every effort to leave visible progress, even when applications go unanswered.
Source: `scope.md > The Unique Kernel`, `Who It's For`.

## The Core Journey

1. Open a single-page pixel desk scene. A small character wanders automatically; level, experience, and three hearts appear above it.
2. Use Apply, Prepare, or Interview below the scene to record a real action in one click, without entering application details.
3. See immediate experience or weapon reinforcement feedback. Interview triggers a short automatic stationery-boss encounter and awards experience, a weapon, and a desk collectible regardless of the real interview outcome.
4. Return later to the saved character, equipment, hearts, and collection. Undo an accidental record and its rewards.
5. Only mark a heartbreak when personally choosing to do so. After the third, encounter an open-ended reflection rather than a failure screen.

Sources: `scope.md > The Core Loop`, `What "Working" Looks Like`.

## Screens and Layout

One main screen: title and character level, XP bar, and hearts above a central pixel-art desk. The character wanders among stationery and earned collectibles. Apply, Prepare, and Interview buttons sit below the scene. Current weapon and reinforcement level are readable; heartbreak and undo controls remain available without requiring a separate tracker screen. Rewards and the open ending use temporary overlays on this same surface.

Source: `scope.md > Inspiration & Identity`, `The POC Boundary`.

## Look and Feel

A simple Japanese-inspired pixel-art desk with restrained detail and room for the character and collectibles to stand out. References remain Stardew Valley and Journey for the feeling of a small character inhabiting a scene, not their gameplay complexity. All interface text is English; planning conversations may remain Chinese. Exact palette and fonts are implementation choices within this direction, not established learner preferences.

## Features and Behavior

### Applications and Character Levels

Apply immediately adds 10 XP and provides visible feedback. Start at level 1 with 0 XP; each 100 cumulative XP adds one level. Display progress toward the next level. Completing an interview adds 30 XP, independent of the outcome. Levels do not reset hearts or remove rewards.

Acceptance: ten applications move a fresh character to level 2; an interview adds exactly 30 XP and advances the bar or level appropriately.

### Preparation and Equipment

Start with a basic weapon so preparation works before any interview. Prepare increases reinforcement by one and visibly updates the equipment readout. Each completed interview grants a weapon and automatically equips it; the accumulated reinforcement carries over. Weapon strength can affect the appearance of the strike, never eligibility for rewards.

Acceptance: after two preparations and an interview, the newly equipped weapon retains reinforcement +2.

### Interview Boss and Desktop Collection

Interview starts a 3–5-second automatic encounter. A stationery boss appears centrally, the character approaches and strikes, and the boss disappears into pixel stars. No timing, combat skill, or real-world outcome entry is required. Show “Interview complete. You showed up.” with the XP and weapon reward. Add a miniature version of the boss to the desk collection, then resume wandering.

Use a small rotating set of stationery bosses. Repeated collectibles show a count; they must not crowd the desk indefinitely. Disable Interview while the encounter is running so one click produces exactly one completed encounter and reward.

Acceptance: each completed encounter adds 30 XP, equips a weapon, and increases the corresponding collectible count by one. Repeated bosses increase the count rather than creating unlimited desk objects.

### Hearts and Open Ending

Begin with three hearts. Only an explicit manual heartbreak action removes a heart; rejection, preparation, applications, and interviews never do. The third heartbreak opens a reflective dialog presenting the ideas “Try another run” and “Explore a different direction.” These are future possibilities; this version does not implement restart or a new game path. No further heartbreak can reduce hearts below zero.

Acceptance: three manual heartbreaks produce zero hearts and the dialog; regular actions never consume hearts. Earned progress remains intact.

Source: `scope.md > The POC Boundary`, `Later`.

### Saved Progress and Undo

Closing or refreshing the app preserves XP, equipment and reinforcement, hearts, collection counts, and the information needed to undo an accidental action. Undo restores the prior state, including rewards and the previously equipped weapon; it must not leave partial rewards behind.

Acceptance: reopen after each action type and see the same progress. Undo an interview and restore XP, weapon, reinforcement, and collection together. Undo a heartbreak and restore its heart.

## States and Boundaries

- **First use:** level 1, 0 XP, basic weapon at +0, three hearts, and an empty earned collection; actions are immediately usable.
- **Idle:** character wanders automatically without generating XP or rewards. Only explicit records earn progress.
- **Reward:** feedback identifies what changed; a temporary overlay does not require entering more information.
- **Empty collection:** a short invitation explains that completed interviews earn desk keepsakes.
- **Persistence failure:** show a clear English warning if progress cannot be saved; do not silently claim it is saved or overwrite valid progress with an empty state.
- **Undo unavailable:** clearly indicate when there is no action to undo.
- **Interview interrupted:** reloading during an encounter must not produce a partial or duplicated reward. Exact recovery timing belongs in the technical plan.

## Product Decisions

- A desk scene was selected over a room or outdoor camp: stationery bosses become objects on that same desk.
- The character wanders automatically; the player does not control movement.
- Simple Japanese-inspired design, without excessive detail.
- One-click records complement an existing professional job tracker.
- Short automatic battles always reward showing up, regardless of interview outcome.
- Applications grant 10 XP, interviews 30 XP, and every 100 XP adds a level.
- Preparation adds +1 reinforcement; new weapons equip automatically and retain reinforcement.
- Saved progress and undo are required for daily use and accidental taps.
- English is required for the interface and project documents.

## What We're Building

One desk scene, automatic wandering, three action buttons, observable character and equipment growth, a small stationery boss and collection set, manually managed hearts, an open-ended third-heartbreak dialog, saved progress, and undo.

## Deferred From the POC

Independent skill levels, a full restart flow, and alternative life-direction game paths remain deferred as agreed in scope. Boss and weapon content stays small to protect the proof of concept.

## Non-Goals

Professional application tracking, company or role forms, outcome scoring, complex maps, player-controlled movement, and skill-based combat. They do not support the lightweight action-to-growth loop.

## Confirmed Interaction Boundaries

The learner confirmed the following rules:

1. **Undo depth:** support undoing the most recent completed action only, including heartbreak. Block action controls during the short battle so undo order remains clear.
2. **Zero-heart behavior:** let the reflection dialog be closed and allow continued recording at zero hearts, preserving all progress. Its two future-path messages do not reset the game or navigate elsewhere.
3. **Persistence boundary:** retain progress in the same browser on the same device, without accounts or device synchronization.

## Open Questions

No blocking product questions remain. Exact stationery selection, weapon names, and palette can be finalized during implementation within the approved direction.


## Approved Early Build Revisions

The learner requested and confirmed these changes during the first playable review:

- Cherry-soda palette: near-white cream background, pale pink surfaces, cherry accents, and a light wood desk; remove dense background texture and enlarge text for readability.
- Arrange the page as progress, action heading/buttons, animated desk, equipment, daily tracker, and collection.
- Distinguish character XP from weapon reinforcement: visible level-up announcement and character glow; a separate weapon panel with reinforcement count and upgrade flash.
- Daily tracker: group application, preparation, and interview counts by the player's local calendar date. Keep it count-only with no company or role forms. Undo restores the corresponding daily count along with all other progress; refresh preserves counts.
- Older saves retain existing progress, but no daily history is invented for actions predating this feature.

## Final Visual Reference Revision

The learner renamed the project One More Quest and supplied a previous design as reference only for the character status bar, typography, and colors. Use a compact avatar/name/level identity, XP bar with total XP, muted green text, warm ivory background, sage accents, dusty rose hearts, and a serif title with readable sans-serif interface text. Do not copy its other controls, content, integrations, or game design. The desk and approved interactions remain. This supersedes the earlier cherry-soda palette.

Follow-up visual revision: remove outer horizontal gutters, use YOUR NEXT CHAPTER and One More Quest✧, tune title to a high-contrast serif treatment, and replace the reference-inspired avatar with an original pixel ranger. Subtitle currently uses the suggested wording “A little courage. A little progress. One more day.”; learner confirmation remains pending. Exact source font is not known from the screenshot; local Baskerville/Times fallbacks approximate its character.

Typography finalized by the learner: Fraunces for the main title and dialog titles; DM Sans for body copy, buttons, level/XP, and scene labels. Self-host variable font assets through Fontsource packages with their OFL licenses; replace the earlier provisional Baskerville/system-font approximation.
