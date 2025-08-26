# Architecture & Project Structure

This section locks down how the codebase is organized, naming conventions, module boundaries, and recommended patterns for **Next.js 15 + React 19 + Auth.js + Prisma + Postgres (Supabase) + Upstash Redis + Zod + Jotai + Mantine**.

---

## A. Architectural overview

**Goals**

* Clear separation between **feature modules** (Students, Classes, Billing, …) and **shared infrastructure** (auth, db, ui, lib).
* Make the most of **React Server Components (RSC)** and **Server Actions** from React 19; keep client state minimal with **Jotai**.
* Consistent data validation with **Zod** at I/O boundaries.
* **RBAC** performed in server-side boundaries (route handlers / actions).
* **Caching & rate limiting** with Upstash Redis; **Prisma** as the single DB access layer.

**High‑level flow**

1. Requests land at **/app** routes (RSC) →
2. Data fetched using **Server Components** or **Server Actions** →
3. Validation by **Zod** →
4. Business logic & persistence via **Prisma** →
5. Cache / invalidate with **Upstash Redis** →
6. Return serialized data to RSC or mutate followed by revalidation.

---

## B. Repository layout (single repo)

```
.
├─ app/                            # Next.js App Router (RSC-first)
│  ├─ (public)/                    # public-facing routes (marketing/landing) – optional group
│  ├─ (dashboard)/                 # authenticated area
│  │  ├─ layout.tsx
│  │  ├─ page.tsx                  # dashboard home
│  │  ├─ students/                 # /students
│  │  │  ├─ page.tsx               # list & filters (RSC)
│  │  │  ├─ new/                   # /students/new
│  │  │  │  └─ page.tsx
│  │  │  ├─ [id]/                  # /students/[id]
│  │  │  │  ├─ page.tsx            # profile view (RSC)
│  │  │  │  └─ edit/               # /students/[id]/edit (Client component)
│  │  ├─ classes/
│  │  │  ├─ page.tsx
│  │  │  ├─ [id]/page.tsx
│  │  │  └─ schedule/              # timetable views
│  │  ├─ teachers/
│  │  ├─ enrollments/
│  │  ├─ attendance/
│  │  ├─ billing/
│  │  │  ├─ invoices/
│  │  │  └─ payments/
│  │  ├─ reports/
│  │  └─ settings/
│  ├─ api/                         # Route Handlers (REST-ish) – only if needed in addition to actions
│  │  ├─ students/route.ts         # POST/GET
│  │  ├─ students/[id]/route.ts    # GET/PATCH/DELETE
│  │  └─ ...
│  ├─ auth/
│  │  └─ [...nextauth]/route.ts    # Auth.js routes
│  └─ layout.tsx
├─ components/                     # Reusable UI components (Client by default)
│  ├─ forms/                       # Mantine form wrappers
│  ├─ tables/
│  ├─ charts/
│  └─ feedback/                    # toasts, dialogs
├─ features/                       # Feature modules (domain-first)
│  ├─ students/
│  │  ├─ view/
│  │  │  ├─ student-detail.tsx     # View for features 
│  │  ├─ actions.ts                # Server Actions for students
│  │  ├─ queries.ts                # DB queries (server-only)
│  │  ├─ schemas.ts                # Zod schemas
│  │  ├─ rbac.ts                   # feature-specific permission checks
│  │  └─ types.ts
│  ├─ classes/
│  ├─ teachers/
│  ├─ enrollments/
│  ├─ attendance/
│  ├─ billing/
│  │  ├─ invoices/
│  │  └─ payments/
│  └─ notifications/
├─ lib/
│  ├─ auth.ts                      # Auth.js helpers (getSession, getUser, requireRole)
│  ├─ db.ts                        # Prisma client singleton
│  ├─ redis.ts                     # Upstash Redis client & helpers
│  ├─ rbac.ts                      # central RBAC policies
│  ├─ validation.ts                # shared Zod helpers
│  ├─ cache.ts                     # cache keys & utils (revalidate tags)
│  └─ utils.ts                     # date, number, etc.
├─ store/                          # Jotai atoms (client state only)
│  ├─ ui.ts                        # sidebar open, dialogs, theme
│  └─ filters.ts                   # table filters, local view state
├─ styles/
│  └─ globals.css
├─ prisma/
│  ├─ schema.prisma
│  └─ migrations/
├─ scripts/
│  ├─ seed.ts                      # seed DB
│  └─ dev-tools.ts                 # maintenance scripts
├─ tests/                          # Vitest/Playwright setup (optional)
├─ env.d.ts                        # env type mapping
├─ next.config.ts
├─ package.json
└─ README.md
```

**Why this layout?**

* **/features** holds business logic per domain to keep **/app** pages slim and focused on UI/UX.
* **/lib** keeps integration boundaries (db, auth, redis) centralized.
* **Server Actions** live in **/features/**`<domain>`/actions.ts and are imported by RSC pages/components.

---

## C. Naming & coding conventions

* **Files & folders**: `kebab-case` (e.g., `class-placement-card.tsx`).
* **TypeScript types**: `PascalCase` (e.g., `StudentProfile`).
* **Zod schemas**: suffix `Schema` (e.g., `CreateStudentSchema`).
* **Server Actions**: prefix with verb (`createStudent`, `updateStudent`, …) and place in `features/<domain>/actions.ts`.
* **RBAC**: policies as pure functions (`canViewStudent(user, student)`); feature‑level checks live in each module.
* **Env**: all accessed via a single `env` module (validated with Zod) – avoid `process.env` scattered.
* **UI**: Mantine components in `/components`, abstract repeated patterns (table, form, modal).

---

## D. RSC vs Client Components boundaries

* **RSC (default)**: pages, data fetching, read‑only views, SEO, heavy lists.
* **Client**: interactive forms, local state (Jotai), event handlers, Mantine components requiring browser APIs.
* Co-locate client forms in route segment folders when tightly coupled (e.g., `/students/[id]/edit`).
* Use **Server Actions** for mutations to keep credentials server-side and simplify API round‑trips.

---

## E. Data & validation layer

### 1) Prisma (db.ts)

```ts
// lib/db.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma?: PrismaClient }

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ log: ['error', 'warn'] })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

### 2) Example Prisma schema (minimal)

```prisma
// prisma/schema.prisma

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  role      Role     @default(PARENT)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  students  Student[] @relation("ParentStudents")
}

enum Role { ADMIN TEACHER PARENT STUDENT }

model Student {
  id         String    @id @default(cuid())
  firstName  String
  lastName   String
  school     String?
  active     Boolean   @default(true)
  parent     User?     @relation("ParentStudents", fields: [parentId], references: [id])
  parentId   String?
  enrollments Enrollment[]
  attendances Attendance[]
  createdAt  DateTime  @default(now())
}

model Class {
  id        String    @id @default(cuid())
  name      String
  subject   String
  capacity  Int       @default(20)
  teacherId String?
  teacher   User?     @relation(fields: [teacherId], references: [id])
  schedule  String    // iCal RRULE or JSON blob
  enrollments Enrollment[]
}

model Enrollment {
  id        String   @id @default(cuid())
  student   Student  @relation(fields: [studentId], references: [id])
  studentId String
  class     Class    @relation(fields: [classId], references: [id])
  classId   String
  startDate DateTime @default(now())
  endDate   DateTime?
}

model Attendance {
  id        String   @id @default(cuid())
  student   Student  @relation(fields: [studentId], references: [id])
  studentId String
  class     Class    @relation(fields: [classId], references: [id])
  classId   String
  date      DateTime
  status    AttendanceStatus
  note      String?
}

enum AttendanceStatus { PRESENT ABSENT EXCUSED }

model Invoice {
  id        String   @id @default(cuid())
  student   Student  @relation(fields: [studentId], references: [id])
  studentId String
  amount    Int      // in cents
  month     Int
  year      Int
  status    InvoiceStatus @default(PENDING)
  createdAt DateTime  @default(now())
}

enum InvoiceStatus { PENDING PAID VOID }

model Payment {
  id        String   @id @default(cuid())
  invoice   Invoice  @relation(fields: [invoiceId], references: [id])
  invoiceId String
  amount    Int
  method    String
  paidAt    DateTime @default(now())
}
```

### 3) Zod validation example

```ts
// features/students/schemas.ts
import { z } from 'zod'

export const CreateStudentSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  school: z.string().optional(),
  parentId: z.string().optional(),
})

export type CreateStudentInput = z.infer<typeof CreateStudentSchema>
```

---

## F. Auth & RBAC

### 1) Auth.js route and helpers

```ts
// app/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const CredentialsSchema = z.object({ email: z.string().email(), password: z.string().min(6) })

export const { handlers, auth } = NextAuth({
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const parsed = CredentialsSchema.safeParse(credentials)
        if (!parsed.success) return null
        const user = await prisma.user.findUnique({ where: { email: parsed.data.email } })
        // TODO: verify password
        return user ?? null
      },
    }),
  ],
  session: { strategy: 'jwt' },
})

export { handlers as GET, handlers as POST }
```

```ts
// lib/auth.ts
import { auth } from '@/app/auth/[...nextauth]/route'
import { Role } from '@prisma/client'

export async function requireUser() {
  const session = await auth()
  if (!session?.user) throw new Error('Unauthorized')
  return session.user
}

export function hasRole(user: { role?: Role }, roles: Role[]) {
  return !!user.role && roles.includes(user.role)
}
```

### 2) Central RBAC policies

```ts
// lib/rbac.ts
import { Role } from '@prisma/client'

export const Policies = {
  viewStudent: (role: Role) => [Role.ADMIN, Role.TEACHER, Role.PARENT].includes(role),
  editStudent: (role: Role) => [Role.ADMIN, Role.TEACHER].includes(role),
  manageBilling: (role: Role) => [Role.ADMIN].includes(role),
}
```

---

## G. Server Actions & data access

### 1) Example action

```ts
// features/students/actions.ts
'use server'

import { prisma } from '@/lib/db'
import { revalidateTag } from 'next/cache'
import { CreateStudentSchema } from './schemas'
import { requireUser } from '@/lib/auth'
import { Policies } from '@/lib/rbac'

export async function createStudent(formData: FormData) {
  const user = await requireUser()
  if (!Policies.editStudent(user.role as any)) throw new Error('Forbidden')

  const parsed = CreateStudentSchema.parse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    school: formData.get('school') ?? undefined,
    parentId: formData.get('parentId') ?? undefined,
  })

  const student = await prisma.student.create({ data: parsed })
  revalidateTag('students:list')
  return { id: student.id }
}
```

### 2) Tagging & caching strategy

* List pages fetch with `next: { tags: ['students:list'] }`.
* Mutations call `revalidateTag('students:list')`.
* Expensive aggregates cached in Upstash Redis with TTL.

```ts
// lib/cache.ts
import { redis } from '@/lib/redis'

export async function cached<T>(key: string, ttl: number, fn: () => Promise<T>): Promise<T> {
  const hit = await redis.get<T>(key)
  if (hit) return hit
  const data = await fn()
  await redis.set(key, data, { ex: ttl })
  return data
}
```

---

## H. Redis (Upstash) & rate limiting

```ts
// lib/redis.ts
import { Redis } from '@upstash/redis'

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})
```

```ts
// lib/rate-limit.ts
import { redis } from './redis'

export async function rateLimit(ip: string, limit = 60, windowSec = 60) {
  const key = `rl:${ip}:${Math.floor(Date.now() / (windowSec * 1000))}`
  const count = (await redis.incr(key)) as number
  if (count === 1) await redis.expire(key, windowSec)
  if (count > limit) throw new Error('Too Many Requests')
}
```

Use in route handlers or actions (if you can derive `ip`).

---

## I. UI layer

* **Mantine** for components; wrap repetitive patterns (form layout, modal) in `/components/forms`, `/components/feedback`.
* **Jotai** holds **UI state only** (dialogs, filters, ephemeral state). All server data comes from RSC or actions.

```ts
// store/ui.ts (client)
'use client'
import { atom } from 'jotai'
export const sidebarOpenAtom = atom(true)
export const studentFilterAtom = atom<{ query: string; activeOnly: boolean }>({ query: '', activeOnly: true })
```

---

## J. Environment management

* Single source of truth with Zod.

```ts
// env.ts
import { z } from 'zod'

const EnvSchema = z.object({
  DATABASE_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(16),
  NEXTAUTH_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_URL: z.string().url(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(10),
})

export const env = EnvSchema.parse(process.env)
```

* Use `.env.local` for dev, set Vercel project env for prod.

---

## K. Testing & QA (optional but recommended)

* **Unit**: Vitest for pure functions (RBAC, validators).
* **Component**: @testing-library/react for client components.
* **E2E**: Playwright for core flows (auth, CRUD student, billing).
* Seed script to create demo data for preview environments.

---

## L. CI/CD & deployment

* **Vercel**: connect repo, auto‑deploy on push; set ENV vars.
* **Prisma migrations**: `prisma migrate deploy` in build step (Vercel postinstall or separate job).
* **Prisma generate** prebuild.

Example scripts:

```json
// package.json (snippets)
{
  "scripts": {
    "dev": "next dev",
    "build": "prisma generate && next build",
    "postinstall": "prisma generate",
    "migrate:dev": "prisma migrate dev",
    "migrate:deploy": "prisma migrate deploy",
    "seed": "tsx scripts/seed.ts"
  }
}
```

---

## M. Security considerations

* Handle auth exclusively in RSC/actions; never trust client data for role checks.
* Validate all inputs with Zod; narrow types ASAP.
* Use **HTTPS only**; secure cookies for sessions if using sessions.
* Implement rate limiting for auth & mutation endpoints.
* Log audit events for billing & payment changes.

---

## N. Getting started checklist

1. Copy the repo structure and init Next.js 15 project.
2. Install deps: next, react 19, @mantine/\*, jotai, zod, @prisma/client, prisma, @upstash/redis, next-auth.
3. Configure **Prisma** + **Supabase** connection; run initial migration.
4. Wire **Auth.js**; create seed admin user.
5. Implement **Students** feature end‑to‑end (list → create → edit → view) using **Server Actions**.
6. Add **RBAC** & tag‑based revalidation; introduce **Redis cache** for expensive lists.
7. Ship to **Vercel**; set ENV vars and run `migrate:deploy`.
8. Add the next feature (Classes → Enrollments → Attendance → Billing).
