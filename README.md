# Follow the Money · Design System

Glass UI components, design tokens and usage rules from **Follow the Money**, a multiplayer 3D compliance training game. Documented in Storybook, built for reuse by designers, developers and AI agents.

- Game: https://follow-the-money-tawny.vercel.app
- Case study: https://follow-the-money-case-study.vercel.app

## Run it
```bash
npm install
npm run storybook        # http://localhost:6006
npm test                 # token + accessibility checks
npm run build-storybook  # static site in storybook-static/
npx playwright install chromium   # once
npm run check:stories    # opens every story: fails if one is broken, empty or has accessibility issues
```

## What's inside
- `src/tokens/` – tokens.json (source of truth) and tokens.css (CSS variables)
- `src/components/` – Button, DecisionButton (+ DecisionGroup), GlassCard, Pill, ProgressBar, IconButton, each with stories
- `src/docs/` – Introduction, Foundations, Using with AI agents
- `AGENTS.md` – rules AI coding agents follow when building UI with this kit

## Quality checks
- Storybook a11y addon (axe) on every story, set to fail on violations
- Interaction test on the deal-desk decision flow
- Unit test that blocks raw hex colours in component CSS
- `check:stories` opens every built story, fails if one is broken or empty, and runs axe on each

Designed and built by Shahd Ashraf.
