# AI Website — Modern Fullstack Demo

This repository is a starter fullstack portfolio/blog inspired by modern educator sites.
It's built with Next.js (App Router), TypeScript, and Tailwind CSS and uses mock data and API routes.

Quick start

1. Install dependencies

```bash
cd /Users/rakeshcheekatimala/Desktop/Learnings/ai-website
npm install
```

2. Run development server

```bash
npm run dev
```

3. Build for production

```bash
npm run build
npm start
```

Deploy

- Deploy to Vercel by connecting the repository. Next.js App Router is supported out-of-the-box.

What's included

- App router pages: `/`, `/about`, `/blog`, `/projects`, dynamic routes for posts/projects
- API route: `/api/posts` serving mock JSON
- Tailwind CSS for a modern design

Notes

- This project uses mock data in `lib/mock-data.ts`. Swap to a real CMS/DB by replacing functions there.
- Tailwind version pinned in `package.json`; run `npx tailwindcss init -p` to re-generate if needed.
