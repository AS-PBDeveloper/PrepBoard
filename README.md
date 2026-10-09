# Prepboard — Interview Practice Tracker

Prepboard is a responsive student dashboard for organizing weekly interview preparation, tracking question status, and seeing progress across practice tracks.

## Features

- Summary cards for total questions, completed DSA, completed interview questions, and machine-coding work.
- Question cards with title, notes for approaches/attempts/follow-ups, personal tags, category, difficulty, status, last-updated date, add/edit, status changes, and confirmed deletion.
- Search across titles, notes, categories, and tags; category, status, and difficulty filters; and clear next steps for empty lists and no-results states.
- Overall and per-track progress, weekly activity chart, and a weekly target.
- Responsive desktop sidebar and mobile navigation, form validation, keyboard-accessible dialogs/menus, and toast feedback.
- LocalStorage persistence; no sign-in, backend, or server-side database.

## Prerequisites

- Node.js 22 or a compatible current Node.js release.
- pnpm 11 (the package manager version is pinned in `package.json`).

## Setup

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open <http://localhost:3000>. The development server binds to `0.0.0.0:3000` for the Manus Preview runtime.

Create a production static build with:

```sh
pnpm build
```

The build runs `tsc --noEmit` followed by `vite build`; static output is written to `dist/`.

## Data and assumptions

- On first visit, Prepboard seeds example practice questions across all categories. Existing browsers that already have the original sample questions receive the additional starter questions without replacing personal questions or edits.
- The category picker includes **DSA**, **Git**, **Technical**, **Interview**, and **Machine Coding**. Git and Technical are included for the supplied checklist; Interview and Machine Coding remain separate to drive the requested dashboard completion statistics.
- Difficulty options are Easy, Medium, and Hard. Status options are Pending, In Progress, and Completed.
- Add up to eight comma-separated tags per question. Tags and notes are saved with each question in LocalStorage. Existing saved questions are kept and automatically load without tags.
- The weekly activity window starts Monday in the browser's local time zone. A question is counted as completed this week when its latest status update is a completion within the current week. The default weekly target is eight completed questions.
- Questions and the editable display name remain in this browser's LocalStorage. There is no account, cloud sync, or backup; clearing browser storage removes the saved data. Do not store sensitive personal information in the tracker.
- Dates use the browser's local time for display; timestamps are stored in ISO format.

## Stack

React, TypeScript, Vite, Tailwind CSS, Radix-backed shadcn-style UI components, Lucide React, React Hook Form/Zod, and Sonner.
