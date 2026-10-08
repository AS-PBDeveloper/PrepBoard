# Interview Practice Tracker — Implementation Plan

## Product and implementation

A responsive React + Vite + TypeScript single-page app for students to manage weekly interview preparation. The project has no backend; typed question data and the student's profile/preferences live in LocalStorage. Use Tailwind CSS, shadcn/ui-style accessible primitives and Lucide React. Install only the dependencies required for the UI (Radix primitives behind shadcn components, lucide-react, sonner, and form/schema utilities if needed). Keep the persisted model versioned and provide a safe fallback when stored JSON is malformed.

The dashboard computes Total Questions, DSA Completed, Interview Questions Completed, and Machine Coding totals from the same question collection used by the list. Completion percentage is derived from completed/total records, with an empty-state zero. Seed a practical sample workspace on first visit so the initial view is useful, while allowing users to clear or replace the sample records by editing/deleting them; persist subsequent changes locally.

Use typed Question fields: id, title, category (DSA, Git, Technical, Interview, Machine Coding), difficulty (Easy, Medium, Hard), status (Pending, In Progress, Completed), description, createdAt, updatedAt. The requested Git and Technical choices supplement the Interview and Machine Coding tracks used by the dashboard statistics. Build CRUD and contextual status changes with validation, search, and category/difficulty/status filters. Confirm destructive deletes. Surface success/error feedback with Sonner. Include distinct empty-list and no-search-results states, subtle loading skeletons, tooltip affordances, and a mobile Sheet navigation. Dashboard and Questions are distinct selectable views; the main Questions section is immediately visible from the dashboard layout.

## Project structure

- `src/components/layout/`: responsive app shell, desktop sidebar, header, mobile navigation.
- `src/components/dashboard/`: summary cards and overall/category progress.
- `src/components/questions/`: question list, filters, question card, create/edit form, delete confirmation.
- `src/components/ui/`: local shadcn-style components and accessible Radix wrappers.
- `src/hooks/`: question state, filtering, statistics, persistence.
- `src/lib/`: LocalStorage codec, sample data, formatting and utility functions.
- `src/types/`: shared typed question model.
- `src/App.tsx`, `src/main.tsx`, `src/index.css`: app assembly, entry point and Tailwind/design tokens.
- `public/manus-routes.json`: static page route manifest (the application is a single `/` route).

## Design direction

- **Design Movement:** Swiss editorial utility, refined for a calm contemporary SaaS workspace.
- **Core Principles:** At-a-glance hierarchy; generous but efficient spacing; actionable rather than ornamental; responsive by default.
- **Color Philosophy:** Warm paper-like off-white canvas and crisp white surfaces balance dark ink typography; restrained jade/teal denotes momentum and completion, while soft amber and rose distinguish pending and active work. Borders are quiet and shadows minimal.
- **Layout Paradigm:** Persistent narrow desktop rail with a spacious, left-aligned main workspace; asymmetrical overview/progress split above an editorial list. Mobile collapses navigation to a Sheet and metrics to a two-column grid.
- **Signature Elements:** A small monogram mark built from interlocking check strokes; slim category progress bars; compact status pills with dot indicators.
- **Interaction Philosophy:** Quick, inline status changes; clear focus states; confirm irreversible removal; preserve search and filter context; announce successful changes without blocking flow.
- **Animation:** Short 150–220ms fades/slides for dialogs and menus; subtle card hover elevation and progress transitions; honor reduced-motion preferences and avoid decorative looping animation.
- **Typography System:** Geist/Inter-style sans-serif throughout; bold, compact display headings and readable medium-weight labels/body copy; tabular numerals for metrics.
- **Brand Essence:** A focused practice log that helps students turn weekly interview preparation into visible momentum. Personality: composed, encouraging, precise.
- **Brand Voice:** Direct and supportive, never gamified or scolding. Examples: “Small reps add up.” “Pick up where you left off.”
- **Wordmark & Logo:** “prepboard” lowercase wordmark paired with a compact two-line checkmark/column monogram, implemented as a small inline icon treatment rather than a downloaded illustration.
- **Signature Brand Color:** Deep jade/teal, reserved for active progress and primary actions.

## Serving and constraints

Serve the Vite client on the initialized project runtime (port 3000, bound to `0.0.0.0`). No server or database is requested. Declare the sole application route in `public/manus-routes.json` before starting the development server. Browser-facing resource paths remain relative. All product data stays in browser LocalStorage. Provide a README with setup steps, features, and assumptions, a 1–2-minute product demo, a GitHub repository, and a live deployed link; external repository connection and public publication follow their platform confirmation workflows.
