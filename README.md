# FitLog — Workout Library

A dark, no-nonsense gym companion built for the B14-A6 assignment. Browse a
12-lift workout library, drill into any lift for full instructions, and build
out "today's plan" — with everything you add or save sticking around after a
refresh.

## Live Demo

Live link: https://fitlog-beryl.vercel.app/
Repo: https://github.com/Maruf-183/fitlog

## Tech Stack

- **Next.js 16** (App Router)
- **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **lucide-react** — icon set
- **react-hot-toast** — toast notifications
- Data from a public REST API (`api.abcz.workers.dev/api/fitlog`)

## Features

1. **12-lift workout library** with category tags, equipment, and a live stats
   row (duration / calories / rating), fully responsive as a 3-column grid on
   desktop down to a single column on mobile.
2. **Workout detail pages** (`/workout/[id]`) with a specs table and
   step-by-step instructions, plus one-click **Add to today's plan** and
   **Save for later** actions.
3. **My Plan dashboard** (`/my-plan`) with live-updating Exercises / Minutes /
   Calories totals, tabbed Today's Plan / Saved lists, a sort dropdown
   (Duration / Calories / Rating), and a "Mark as Done" / remove flow for
   each planned lift.
4. **Persistent state** — your plan and saved lists are stored in
   `localStorage`, so they survive a page reload, and the plan is capped at
   5 lifts to match the "cap of five" rule.
5. **Search** the library by workout name or muscle group tag, a friendly
   404 page for unknown routes, and toast feedback on every action.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Branding Assets

Drop your image files into `public/assets/`:

Logo and hero banner live in `public/assets/` (`logo.png`, `banner.png`)
and are rendered via `components/Logo.tsx` and `components/Hero.tsx`.
Swap those two files to rebrand the app.

## Project Structure

```
app/
  page.tsx              Home (hero + library grid)
  workout/[id]/page.tsx Workout detail page
  my-plan/page.tsx       My Plan dashboard
  not-found.tsx          404 page
components/              Reusable UI (Navbar, WorkoutCard, PlanCard, ...)
context/PlanContext.tsx  Global plan/saved state + localStorage sync
lib/                     API client, types, helpers
```

## Deployment

Deployed on Vercel. Every route is client- or server-rendered per Next.js
defaults, so a hard reload on any page (including `/workout/3` or `/my-plan`)
works without errors.
