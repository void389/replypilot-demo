# ReplyPilot Demo

A responsive, production-style landing page for a fictional AI customer-support assistant. It includes the required hero, features, how-it-works, pricing, FAQ, call-to-action, instant ROI calculator, and monthly/yearly pricing toggle.

## Run locally

Requires Node.js 20 or newer. No dependencies or API keys are needed.

```powershell
npm start
```

Open `http://localhost:4174`.

## Test

```powershell
npm test
```

The tests verify the exact bounty ROI formula, input validation, the 20% annual discount, required page sections, local serving, and the absence of remote runtime dependencies.

## Calculator formulas

- Monthly hours saved = `(monthly tickets × minutes per ticket ÷ 60) × (automation percentage ÷ 100)`
- Monthly labor savings = `monthly hours saved × hourly staff cost`

## Accessibility and responsive behavior

The page uses labeled inputs, live status regions, visible keyboard focus, a skip link, semantic sections, accessible FAQ controls, reduced-motion support, and desktop/tablet/mobile layouts. The interface has no third-party tracking, fonts, scripts, or network calls.

## Deployment

Public demo: https://void389.github.io/replypilot-demo/

Source repository: https://github.com/void389/replypilot-demo

The `public` directory is deployable on any static host. `server.mjs` is included for local and Node hosting. Final desktop and mobile captures are in `screenshots/`.
