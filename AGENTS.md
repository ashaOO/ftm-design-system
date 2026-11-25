# AGENTS.md: rules for AI agents working on Follow the Money UI

Read this before writing or changing any UI code in this repo.

## Always
- Import components from `src/index.js` (Button, DecisionButton, DecisionGroup, GlassCard, Pill, ProgressBar, IconButton).
- Use design tokens: `var(--ftm-*)` from `src/tokens/tokens.css`. Values live in `src/tokens/tokens.json`.
- Keep one `primary` Button per screen. Secondary actions are `ghost`. `danger` only for ending training, behind a confirmation.
- Give every `IconButton` a `label`. Give every `ProgressBar` a `label`.
- Show state with text or icons as well as colour.
- After any change: run `npm test`, then `npm run storybook` and check the a11y panel shows zero violations on changed stories.
- Add or update a story for every new state or variant.

## Never
- Never hard-code hex colours, font sizes, radii or shadows in components.
- Never use mint, coral or freeze blue for decoration. They mean approve, flag and freeze.
- Never remove focus styles or `aria-*` attributes.
- Never add a new component when an existing one with a new variant would do. Ask in the pull request first.

## Component picker
| Need | Component |
|---|---|
| Main action | `Button variant="primary"` |
| Back / resume / cancel | `Button variant="ghost"` |
| Approve, Flag, Freeze | `DecisionGroup` |
| Briefing, question, result | `GlassCard` |
| Red flag moment | `GlassCard tone="flag"` + `Pill tone="coral"` |
| Status label | `Pill` |
| Loading / progress | `ProgressBar` |
| HUD sound or menu | `IconButton` |

## Workflow
1. Create a branch: `feat/<component>-<change>`.
2. Make the change and its story.
3. Run `npm test` and `npm run build-storybook`.
4. Open a pull request describing what changed, screenshots of the stories, and how you checked it.
