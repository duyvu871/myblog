# Student Management System – Tutoring Center

## Introduction

This project is a student management system designed for small tutoring centers or individual businesses. It is built with **Next.js 15 + React 19**, integrated with **Auth.js**, **Prisma + Postgres (Supabase)**, **Upstash Redis**, **Zod**, **Jotai**, and **Mantine**.

Main objectives:

* Manage students, classes, and teachers
* Track attendance and academic performance
* Manage tuition fees and payments
* Provide reporting, statistics, and role-based access control

---

## Technology Stack

* **Next.js 15** (App Router, React Server Components)
* **React 19** (Server Actions, new hooks)
* **Auth.js** – authentication & authorization
* **Prisma ORM + Supabase/Postgres** – database
* **Upstash Redis** – caching and rate limiting
* **Zod** – data validation
* **Jotai** – client state management
* **Mantine** – UI library

---

## Project Structure

```
app/        # Routing and pages
features/   # Business modules (students, classes, billing…)
components/ # Reusable UI components
lib/        # Shared utilities (auth, db, redis…)
store/      # Jotai state atoms
prisma/     # Schema & migrations
scripts/    # Seed and development tools
styles/     # Global styles
```

---

## Installation & Setup

### 1. Clone repository

```bash
git clone <repo-url>
cd <project-folder>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create `.env.local` file:

```env
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...
```

### 4. Database migration & seeding

```bash
npx prisma migrate dev
npm run seed
```

### 5. Run development server

```bash
npm run dev
```

Application will be available at [http://localhost:3000](http://localhost:3000).

---

## NPM Scripts

```json
{
  "dev": "next dev",
  "build": "prisma generate && next build",
  "migrate:dev": "prisma migrate dev",
  "migrate:deploy": "prisma migrate deploy",
  "seed": "tsx scripts/seed.ts"
}
```

---

## Prettier Configuration

`.prettierrc.yml`:

```yml
printWidth: 100
semi: false
singleQuote: true
trailingComma: es5
bracketSpacing: true
arrowParens: always
endOfLine: lf
useTabs: false
tabWidth: 2
plugins:
  - prettier-plugin-tailwindcss
```

---

## Feature Checklist

* [x] Authentication & Authorization
* [x] Student management (CRUD)
* [ ] Class & teacher management
* [ ] Enrollment and attendance
* [ ] Tuition, payments, invoices
* [ ] Reports and statistics

---

## Deployment

* **Vercel** for hosting
* **Supabase (Postgres)** for database
* **Upstash Redis** for caching

---

## License

This project is intended for educational and internal use. It may be extended into a production-ready solution in the future.
