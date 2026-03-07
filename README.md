# Elevare - Career Discovery App

A career and college major discovery app that helps teens and people find their future paths through comprehensive Holland Code-based quizzes.

## Features

- **Career Quiz** - 42 questions to discover careers that match your interests
- **Major Quiz** - 42 questions for high school students to find college majors
- **Save Results** - Create an account to save and revisit your quiz results
- **Modern UI** - Futuristic dark theme with cyan and purple accents

## Tech Stack

- Next.js 14 (App Router)
- Supabase (Auth + PostgreSQL)
- Tailwind CSS
- Vercel (deployment)

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env` and fill in your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Set up Supabase database

1. Go to [Supabase Dashboard](https://app.supabase.com) → your project → SQL Editor
2. Run the migration: `supabase/migrations/001_initial_schema.sql`
3. Run the seed: `supabase/seed.sql`

### 4. Configure Supabase Auth (required for signup/login)

In Supabase Dashboard → **Authentication** → **URL Configuration**:

- **Site URL**: Your app URL (e.g. `https://your-app.vercel.app` or `http://localhost:3000`)
- **Redirect URLs**: Add these (replace with your actual URLs):
  - `https://your-app.vercel.app/auth/callback`
  - `http://localhost:3000/auth/callback`

**Signup not working?** Ensure:
1. Redirect URLs above are added exactly (no trailing slash)
2. Email provider is enabled: Authentication → Providers → Email
3. Check spam folder for the confirmation email
4. (Optional) To skip email confirmation during development: Authentication → Providers → Email → disable "Confirm email"

### 5. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

## About

Elevare was created by Saqibul Kazi, a 15-year-old who wanted to help teens and people like him discover what their future paths could look like.
