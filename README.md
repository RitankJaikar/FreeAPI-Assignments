# FreeAPI Assignments

A React + Vite demo app that consumes public FreeAPI endpoints and demonstrates multiple pagination styles, reusable UI components, and polished page layouts.

[Live Link](https://free-api-assignments-ritank.vercel.app/)

## Overview

This project is a collection of small API assignment pages built with React, Vite, Tailwind-compatible styling, and reusable components. Each page demonstrates a different pagination or loading pattern while preserving previous data and offering a consistent card-based UI.

## Pages / Features

- **Home** — navigation dashboard for all assignment pages
- **Quotes** — random quotes with "Load More" append behavior
- **Jokes** — random joke listing with basic previous/next pagination
- **Users** — random users with infinite scroll appending data
- **Meals** — meal recipes with numbered pagination
- **Products** — products listing with timed auto-next page navigation
- **YouTube** — video results with infinite scroll and card previews
- **Cats** — random cat breed viewer without pagination

## Key UI Patterns

- Shared reusable components for buttons, forms, loaders, error messages, and cards
- Card-style page layout for consistent look and feel
- Infinite scroll, load-more, basic pagination, numbered page controls, and timed page changes
- Search input support on several pages
- Hover effects and clickable video cards on the YouTube page

## Technology Stack

- React 19
- Vite
- React Router DOM
- Axios
- Tailwind-compatible styling
- Lucide React icons
- ESLint for code quality

## Getting Started

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open the local URL shown in the terminal to view the application.

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Project Structure

- `src/App.jsx` — app router and route definitions
- `src/components/` — reusable UI components and pagination controls
- `src/hooks/` — custom `useFetchData` hook for API fetching and pagination
- `src/pages/` — individual feature pages for each assignment
- `src/utils/format.js` — formatting helpers used across pages

## Notes

- The UI uses a modern dark card theme to keep each page consistent.
- The YouTube page formats published dates and ISO durations, creates clickable cards when video IDs are available, and opens YouTube links in a new tab.
- The app is designed for experimentation with various API pagination strategies.

## Scripts

- `npm run dev` — start development server
- `npm run build` — build production assets
- `npm run preview` — preview production build
- `npm run lint` — run ESLint checks

## License

This project is provided as an educational/demo assignment.
