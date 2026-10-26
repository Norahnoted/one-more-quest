---
doc: spec
status: approved
---

# One More Quest — Technical Spec

## How This Works, In Plain Language

React displays the desk, progress, action buttons, and dialogs. Each click goes through one shared set of JavaScript game rules, producing the next complete progress record and a snapshot for Undo. The browser saves that record in localStorage and React displays the result. Animation illustrates the action; it never decides whether a reward is earned. Vite packages the app for GitHub Pages, where anyone can open it without installing anything. Each visitor has their own browser save.

## The Core Journey Through the System

Implements `prd.md > The Core Journey`.

1. Load and validate the saved record once; otherwise initialize a genuinely new player.
2. Apply adds 10 XP; Prepare adds one reinforcement; Interview picks the next stationery boss and adds 30 XP, its weapon, and its collectible in one transition.
3. Save the new record and its previous-state snapshot together under one localStorage key before starting interview presentation. If saving fails, keep the action visible in memory with a persistent unsaved warning.
4. React updates progress; the scene plays an approximately four-second automatic encounter, then displays the reward. All action controls, including Undo and heartbreak, are locked during it.
5. Refresh reads the already committed record, with no pending reward to replay. A saved interview is not awarded twice.
6. Undo restores the previous progress snapshot and clears Undo, saving the result as one record.
7. Heartbreak reduces hearts only above zero. Crossing from one to zero opens the reflection dialog. Closing it leaves action recording available. Undo restores the heart.

## Stack

- **React + React DOM, JavaScript/JSX:** learner accepted the React-based combination through the subsequent Tailwind selection. Use built-in hooks; no router or additional state library. [React documentation](https://react.dev/learn/).
- **Vite + React plugin:** local development and static production build. [Vite guide](https://vite.dev/guide/).
- **Tailwind CSS v4 + @tailwindcss/vite:** learner-selected layout and interface styling; custom CSS covers pixel geometry and short animations. [Official Vite integration](https://tailwindcss.com/docs/installation/using-vite).
- **localStorage:** agreed same-browser persistence; no backend or account. [Storage documentation](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).
- **Node.js and npm:** development/build tooling only. Resolve compatible supported versions at build setup, verify Vite's Node requirement, and commit the lockfile; verified runtime is Node 24.22.1; the installed dependency versions are recorded in package-lock.json. The default system Node 21 is not used for development verification.

Official React, Vite, Tailwind, and Pages documentation was consulted during planning. No game engine or external animation dependency is required for this small scene.

## Where It Runs and How Someone Tries It

Run in a modern browser. Development requires Node.js/npm, with the required version recorded in README after setup verification. No API keys.

- Install: `npm ci` after the lockfile exists.
- Develop: `npm run dev -- --host 127.0.0.1 --port 5173`; open `http://127.0.0.1:5173`.
- Verify production: `npm run build`, then `npm run preview -- --host 127.0.0.1 --port 4173`; open `http://127.0.0.1:4173`.
- Publish to the learner's public GitHub repository using GitHub Pages and an Actions workflow. Configure Vite base for the actual repository path; enable Pages with GitHub Actions, install with npm ci, test, build, upload dist, and deploy.
- Public project URL: `https://<owner>.github.io/<repository>/`; owner and repository remain shipping configuration, not invented values.
- Verify the deployed URL in a clean browser session, including asset loading and refresh. Local and hosted saves are separate because they have different origins.

The submission still requires a short demo video and a public repository. The playable URL supplements those deliverables. Record the real loop in approximately one minute; do not seed fake progress into a visitor's save.

[Pages overview](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages), [Vite Pages deployment](https://vite.dev/guide/static-deploy.html#github-pages).

## Look and Feel

Implements `prd.md > Look and Feel`, `Screens and Layout`.

Use a restrained Japanese-inspired pixel desk, spacious composition, warm wood/paper colors with limited accents, and crisp pixel silhouettes. These color choices are implementation direction within the accepted style, not additional learner requirements. Tailwind theme variables centralize colors, spacing, and border treatments. Keep text readable with a local/system monospace fallback; external font loading is not required. All visible copy is English.

Use CSS transforms and short keyframes for wandering, strikes, boss shaking, and stars. Keep sprite geometry separate from movement transforms. Scale the desk to fit narrow screens; keep buttons usable. Respect reduced-motion preference with a quiet, shortened presentation that still provides all rewards. Use semantic buttons, visible focus, readable status text, and a keyboard-accessible dialog with focus restoration.

## Components

### Game Rules

`game.js` contains pure transitions, initial progress, level calculations, and bounded heartbreak behavior. `catalog.js` supplies a small deterministic rotation of stationery bosses, weapon names, and collectible IDs. Initial implementation may use three stationery types (eraser, stapler, pencil sharpener), derived from the approved small collection rather than a new scope requirement.

Implements `prd.md > Applications and Character Levels`, `Preparation and Equipment`, `Interview Boss and Desktop Collection`, `Hearts and Open Ending`.

### Save Adapter

`storage.js` loads, validates, and writes a versioned JSON record under `one-more-chance:save:v1`. Catch access and quota errors. Never replace an unreadable, malformed, or unsupported-version save automatically. Report the problem and block persistent mutations that would overwrite it; a fresh browser profile remains available for a demo. A write failure leaves current in-memory progress usable with an unsaved warning.

Implements `prd.md > Saved Progress and Undo`, `States and Boundaries`.

### Game Controller

`useGame.js` owns the current record, one-step Undo, warnings, transient reward data, and encounter lock. Compute each action once from the latest record, update the immediate guard before asynchronous presentation, persist once, and then render. Do not perform writes or award rewards inside React render, reducer callbacks, or mount effects that may run again in development. Clean up timers on unmount. No animation-completion callback grants rewards.

Implements `prd.md > Confirmed Interaction Boundaries`, `Saved Progress and Undo`.

### Desk Scene

`DeskScene.jsx` renders original code-built pixel artwork, the automatically wandering character, the active boss, and one collectible per catalog type with count badges. Wandering pauses during combat. A timer-controlled presentation phase coordinates approach, strike, stars, and return to idle; background-tab timing must not affect saved progress. No external sprite licensing or image service is needed.

Implements `prd.md > Interview Boss and Desktop Collection`, `Screens and Layout`.

### Progress and Action Controls

`ProgressPanel.jsx` shows derived level, XP toward the next 100, hearts, weapon, and reinforcement. `ActionBar.jsx` triggers Apply, Prepare, Interview, manual heartbreak, and Undo. Disable unavailable controls with an explanation. Zero hearts disables only further heartbreak, not the growth actions.

Implements `prd.md > Applications and Character Levels`, `Preparation and Equipment`, `Hearts and Open Ending`.

### Feedback and Reflection

`Feedback.jsx` displays action messages, rewards, and save warnings. `ReflectionDialog.jsx` shows the open ending only on the transition to zero hearts. The two future directions are reflective choices with explanatory text; neither resets data or navigates. A close control returns to the desk. Refresh at zero does not repeatedly force the dialog open. Undo closes any stale reward or reflection UI.

Implements `prd.md > Hearts and Open Ending`, `States and Boundaries`, `Confirmed Interaction Boundaries`.

## Data Model

One versioned record is serialized as a whole:

```text
{
  version: 1,
  current: {
    totalXp: nonnegative integer,
    reinforcement: nonnegative integer,
    weaponId: valid catalog ID or starter ID,
    hearts: integer from 0 to 3,
    interviewsCompleted: nonnegative integer,
    collection: { [catalogId]: nonnegative integer }
  },
  previous: null | progress snapshot,
  lastAction: null | apply | prepare | interview | heartbreak
}
```

Start with totalXp 0, reinforcement 0, starter weapon, hearts 3, interviewsCompleted 0, and empty collection. Level is `1 + floor(totalXp / 100)`; bar progress is `totalXp % 100`. Derive these rather than storing duplicate values. Choose the boss from interviewsCompleted before incrementing it, so Undo also restores the catalog sequence. A new weapon keeps the global reinforcement value.

For every action, previous is a deep snapshot of current, never a nested save record. Undo restores it and clears previous/lastAction. Character position, timers, encounter phase, and temporary dialogs are presentation-only and do not persist. No passive or offline XP.

## File Structure

```text
project/
├── index.html                       # Browser entry
├── package.json                     # dev, build, preview, test scripts
├── package-lock.json                # Reproducible dependencies
├── vite.config.js                   # React, Tailwind, Pages base
├── .gitignore                       # Preserve profile/credential exclusions
├── .github/workflows/deploy.yml     # Test, build, publish dist to Pages
├── src/
│   ├── main.jsx                     # React mount
│   ├── App.jsx                      # Single-screen composition
│   ├── styles.css                   # Tailwind import, theme, pixels, motion
│   ├── game.js                      # Rules and transitions
│   ├── catalog.js                   # Small boss/weapon catalog
│   ├── storage.js                   # Validated browser saves
│   ├── useGame.js                   # Controller and presentation coordination
│   └── components/
│       ├── DeskScene.jsx
│       ├── ProgressPanel.jsx
│       ├── ActionBar.jsx
│       ├── Feedback.jsx
│       └── ReflectionDialog.jsx
├── tests/
│   ├── game.test.js                 # Progression and complete Undo invariants
│   └── storage.test.js              # Round-trip and failure behavior
├── README.md                        # English run/deploy/demo instructions
└── devpost/
    ├── learner-profile.md           # Ignored personal context
    ├── scope.md                     # Approved scope
    ├── prd.md                       # Approved product behavior
    └── spec.md                      # This blueprint
```

Build checklist and learning app map are produced by the later curriculum steps.

## External Services and Dependencies

GitHub Pages serves static files; GitHub Actions installs dependencies and builds/deploys the site. No runtime API, database, authentication, payments, or application secrets. Deployment uses the workflow's GitHub token with the Pages permissions required by the official deployment instructions. Public repositories can use Pages with GitHub Free; verify the actual account/repository configuration during shipping. No paid service is planned.

## Verification Plan

- Use Node's built-in test runner for pure rules and the save adapter with a small fake storage object; no separate test framework required.
- Verify 10 applications reach level 2, interviews add 30 XP, reinforcement survives weapon changes, repeated rewards count correctly, hearts never drop below zero, and every Undo restores the entire previous snapshot once.
- Verify valid save round-trip, unavailable storage, malformed records, and unsupported versions without destructive overwrite.
- Browser-check initial state, all buttons, one four-second interview, locked controls, collection repeats, third-heartbreak dialog, zero-heart continued use, and undo after refresh.
- Refresh mid-battle and verify exactly one complete reward and an available Undo; no replayed grant.
- Inspect desktop and narrow-screen layouts, keyboard dialog interaction, reduced motion, and console errors.
- Build and preview production files, then smoke-test the actual Pages URL and repository-path assets.

## Important Failure Modes

- **Storage blocked or full:** visible unsaved warning; never claim persistence succeeded. Invalid existing data is preserved and not overwritten.
- **Reload during combat:** already saved complete reward loads once; transient animation is discarded.
- **Wrong Pages base or missing deployment settings:** verify production paths and actual published assets before calling the site shipped.

## What Was Simplified and Why

Use one React screen, built-in hooks, a small static catalog, code-built pixel art, and browser-local saves. This implements the agreed growth loop without accounts, a game engine, external art services, or network-dependent gameplay. The game battle is intentionally an automatic representation of a completed real-world interview, not a simulated interview assessment.

## Decisions and Open Issues

Learner choices: React/JavaScript with Vite, Tailwind styling, localStorage, GitHub Pages for direct play, and committing interview rewards at click time before presentation. Runtime safeguards, file boundaries, and catalog rotation are implementation details derived from those choices.

The learner asked which CSS approach to use and chose Tailwind after comparing it with ordinary CSS and CSS Modules. Their broader learning question is how planning reduces token-heavy revision loops: separate rules, persistence, and presentation so a change has an explicit location and a PRD acceptance check. The build will verify this through a real change or decision rather than claim that choosing React or Tailwind itself saves tokens.

No blocking product or architecture questions remain. Node/tool versions and repository owner/name will be checked at setup/shipping; they do not require inventing configuration now. The learner approved this technical plan.


## Approved Early Build Revisions

Add `daily: { [localDate]: { apply, prepare, interview } }` to each progress snapshot. Determine local date at the time of each action; Undo restores the whole snapshot even across midnight. Validate daily counts and normalize older valid saves to an empty daily object without guessing prior dates. `DailyTracker.jsx` renders today (including zero counts) and previous recorded days, newest first; refresh its current-date label while the page remains open. `WeaponPanel.jsx` owns the separate reinforcement readout. A transient controller effect distinguishes XP/level-up from weapon reinforcement; timers are cleaned up and never grant rewards.

Carry the approved cherry-soda visual revision into Tailwind/custom CSS. Use readable 14–16px body text with larger action labels and a light, untextured background. The page order is progress, actions, scene, weapon panel, daily counts, keepsakes. Palette and layout were approved during the first learner check.

Implementation files added within the approved component boundaries: `Stationery.jsx` supplies shared original boss/collectible art; `Collection.jsx` renders counted keepsakes. Equipped weapon colors vary by catalog identity.

## Final Visual Reference Revision

Rename visible branding to One More Quest; keep the existing localStorage key to retain saves. Rebuild ProgressPanel with an original inline avatar, character name/level, current and total XP, and hearts. Reference the supplied image only for that status bar, typography, and ivory/sage/dusty-rose palette. Use Georgia for the main title and a readable local sans-serif stack for interface copy. Retain existing gameplay, desk scene, and application structure; add none of the reference app's unrelated features.

Typography finalized by the learner: Fraunces for the main title and dialog titles; DM Sans for body copy, buttons, level/XP, and scene labels. Self-host variable font assets through Fontsource packages with their OFL licenses; replace the earlier provisional Baskerville/system-font approximation.
