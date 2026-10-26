# One More Quest

A small pixel desk adventure that makes job-search effort visible. Built with React, Vite, Tailwind CSS, and browser-local saves.

## Run locally

Use Node.js 22.12+ (Node 24 LTS recommended) and npm.

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 5173
```

Open http://127.0.0.1:5173. For production checks, run `npm run build` followed by `npm run preview`. Run rules and save checks with `npm test`.

## Current build

Applications earn 10 XP; every 100 XP advances one level. Preparation adds one weapon reinforcement. Progress and a one-step Undo survive refresh. Interviews grant 30 XP, an automatically equipped weapon, and a stationery keepsake. A four-second automatic encounter celebrates the action; rewards save before animation. Only a manual heartbreak removes a heart; at zero, an open-ended dialog lets you reflect without resetting any progress. Recording remains available. Daily counters follow your local calendar date.

Saves belong to this browser and site origin. Clearing site data removes them; local and published versions have separate saves. No job-search details or credentials are requested.


## Publish on GitHub Pages

Create a public GitHub repository and push this project to its default `main` or `master` branch. In **Settings → Pages → Build and deployment**, select **GitHub Actions**. The included workflow tests, builds, and deploys the app, deriving its asset base path from the repository name. Its GitHub token is supplied by Actions; no personal token belongs in source files.

Open the deployment URL reported by the Actions run, normally `https://<owner>.github.io/<repository>/`. Confirm the page, sprites, controls, refresh, and saves work in a clean browser session. No repository has been created or published by these local build steps. Custom domains require a corresponding base-path adjustment.

To check a repository-style build locally:

```sh
BASE_PATH=/one-more-quest/ npm run build
BASE_PATH=/one-more-quest/ npm run preview -- --host 127.0.0.1 --port 4173
```

Open `http://127.0.0.1:4173/one-more-quest/`. For a normal local build, omit BASE_PATH.

## Demo and behavior checks

Show an application gaining XP, preparation strengthening the weapon, an automatic interview with a stationery reward, and daily counts. Mark three heartbreaks, read the open ending, close it, and continue. Use Undo to reverse the most recent action. The reflection choices are possibilities for a future chapter; they intentionally do not restart the game or navigate away.

A short demo video and the public GitHub repository are required submission materials. The playable Pages URL is additional. Record using a separate browser profile if you want a clean demonstration without changing your personal save.

See `devpost/prd.md` and `devpost/spec.md` for requirements and implementation decisions. Rule values are centralized in `src/game.js`; the stationery catalog is in `src/catalog.js`. Artwork is original code-built SVG/CSS. No application forms, accounts, external fonts, or runtime API calls are required.

The internal save key retains the original project identifier so the rename to One More Quest preserves existing progress.
