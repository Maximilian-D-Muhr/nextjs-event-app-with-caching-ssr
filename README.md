# Next.js Event App with Caching & SSR

This project is part of the **WBS Coding School – Software Engineering** curriculum.
It demonstrates Server-Side Rendering (SSR), caching strategies, and React Server Components using Next.js 14+.

## Project Goal

Build a Next.js application that showcases the differences between Client-Side Rendering (CSR) and Server-Side Rendering (SSR), including:
- Server Components for data fetching
- Incremental Static Regeneration (ISR) with 24h cache
- Server Actions for cache invalidation
- Suspense for streaming data

This project is a companion to the [Vite React Event App](https://github.com/Maximilian-D-Muhr/react-event-app-with-rest-api) to compare CSR vs SSR approaches.

## Presentation

For a detailed comparison of Vite (CSR) vs Next.js (SSR), see the presentation:
[Vite vs Next.js - CSR vs SSR Comparison](https://docs.google.com/presentation/d/1uPmkpZhO1st5E5W9DklnRjd-j8q7RKYR76kmmECq-iM/edit?usp=sharing)

## Tech Stack

- Next.js 14+ (App Router)
- React Server Components
- Server Actions
- Tailwind CSS + DaisyUI
- RESTful API (local backend)

## Key Features

### Server-Side Rendering
- Events are fetched on the server at build time
- HTML is pre-rendered and cached for 24 hours
- SEO-friendly with full content in initial HTML

### Caching Strategy
- `revalidate = 86400` (24 hours) for automatic cache refresh
- Manual cache invalidation via "Check for New Events" button
- Server Actions with `revalidatePath()` for on-demand updates

### React Server Components
- `page.js` files are Server Components by default
- No `useEffect` or loading states needed for initial data
- Client Components marked with `'use client'` for interactivity

### Suspense & Streaming
- Blog page demonstrates Suspense with `use()` hook
- Skeleton loading states while data streams in

## Project Structure

```
src/
├── app/
│   ├── page.js          # Home (Server Component)
│   ├── actions.js       # Server Actions
│   ├── events/[id]/     # Event details (SSR)
│   ├── blog/            # Blog with Suspense
│   ├── create/          # Create event (Client)
│   ├── signin/          # Sign in (Client)
│   └── signup/          # Sign up (Client)
├── components/
│   ├── BucketDivider.js
│   ├── BucketGrid.js
│   ├── EventCard.js
│   ├── Navigation.js
│   └── RefreshEventsButton.js
├── lib/
│   ├── client.js        # API fetch helper
│   ├── auth.js          # Auth functions
│   └── tokenStorage.js  # Token management
├── utils/
│   ├── dateBuckets.js   # Date grouping logic
│   ├── limitBuckets.js  # Bucket limiting
│   └── formatDate.js    # Date formatting
└── styles/
    └── eventCardStyles.js
```

## Setup

### Prerequisites
- Node.js 18+
- Local Events API running on port 3001

### Installation
```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Backend API
The app requires the Events API from the Vite project:
```bash
cd ../react-event-app-with-rest-api
npm run server
```

## CSR vs SSR Comparison

| Aspect | Vite (CSR) | Next.js (SSR) |
|--------|-----------|---------------|
| Initial Load | Loading spinner | Pre-rendered HTML |
| SEO | Limited | Full content indexed |
| Data Fetching | useEffect + useState | Server Components |
| Caching | Browser only | Server + CDN |
| Bundle Size | Larger | Code splitting |

## Author

Created by [Maximilian D. Muhr](https://www.linkedin.com/in/maximilianmuhr/) as part of WBS Coding School.
