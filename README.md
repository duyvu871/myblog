# Next.js 15 Starter Template

## Introduction

A modern, production-ready **Next.js 15 starter template** featuring complete authentication system and enterprise-grade architecture. Built for scalable web applications with **React 19**, **NextAuth.js**, **Prisma**, **PostgreSQL**, **Redis**, and **TypeScript**.

Perfect for:

* **SaaS applications** with user management
* **Dashboard applications** with role-based access
* **Educational platforms** and management systems
* **Business applications** requiring authentication
* **Rapid prototyping** with modern stack

## ✨ Features

### 🔐 Authentication & Authorization
- **NextAuth.js integration** with credentials and OAuth (Google)
- **Role-based access control** (RBAC) with permissions
- **Server-side authentication** helpers and middleware
- **Client-side authentication** hook (`useAuth`)
- **Session management** with JWT tokens
- **Protected routes** and API endpoints

### 🏗️ Architecture & Developer Experience
- **Next.js 15** with App Router and React Server Components
- **TypeScript** with strict type checking
- **Prisma ORM** with PostgreSQL database
- **Redis caching** with Upstash
- **Zod validation** for type-safe data handling
- **Comprehensive logging** system
- **Error handling** with custom error types
- **Environment configuration** with validation

---

## 🚀 Technology Stack

### Core Framework
- **Next.js 15** - React framework with App Router
- **React 19** - UI library with Server Components
- **TypeScript** - Type-safe JavaScript

### Authentication & Security
- **NextAuth.js** - Complete authentication solution
- **JWT** - Secure token-based sessions
- **Zod** - Runtime type validation
- **bcryptjs** - Password hashing

### Database & Caching
- **Prisma ORM** - Type-safe database client
- **PostgreSQL** - Relational database
- **Redis (Upstash)** - Caching and session storage

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Material UI** - React component library
- **React Hook Form** - Form handling

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (dashboard)/        # Protected dashboard routes
│   ├── (public)/          # Public routes (auth, landing)
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
│   ├── layout/           # Layout components
│   └── ui/               # Base UI components
├── sections/             # Feature-based sections
│   └── auth/             # Authentication section
│       ├── data/         # Business logic & actions
│       └── view/         # UI components
├── hooks/                # Custom React hooks
│   └── use-auth.ts       # Authentication hook
├── lib/                  # Shared utilities
│   ├── auth.ts          # NextAuth configuration
│   ├── auth-helpers.ts  # Server-side auth helpers
│   ├── db.ts            # Database client
│   └── env.ts           # Environment validation
├── providers/           # React context providers
├── store/              # State management (Jotai)
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── styles/             # Global styles

prisma/                 # Database schema & migrations
docs/                   # Project documentation
scripts/                # Development scripts
```

---

## 🚀 Quick Start

### 1. Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd nextjs-starter

# Install dependencies
npm install
```

### 2. Environment Setup

Copy the example environment file:

```bash
cp .env.example .env.local
```

Configure your environment variables in `.env.local`:

```env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/nextjs_starter"
DIRECT_URL="postgresql://postgres:password@localhost:5432/nextjs_starter"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key-change-this-in-production"
JWT_SECRET="your-jwt-secret-key-change-this-in-production"

# OAuth (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Redis (Optional)
REDIS_URL="redis://localhost:6379"

# Logging
NEXT_PUBLIC_LOG_LEVEL="info"
```

### 3. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed the database (optional)
npm run seed
```

### 4. Development Server

```bash
npm run dev
```

🎉 Open [http://localhost:3000](http://localhost:3000) to see your application!

### 5. Docker Setup (Optional)

For development with Docker:

```bash
# Start PostgreSQL and Redis
docker-compose -f docker-compose.dev.yml up -d

# Run the application
npm run dev
```

---

## 📜 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking

# Database
npm run db:generate  # Generate Prisma client
npm run db:migrate   # Run database migrations
npm run db:seed      # Seed database with sample data
npm run db:studio    # Open Prisma Studio
npm run db:reset     # Reset database

# Docker
npm run docker:dev   # Start development with Docker
npm run docker:prod  # Start production with Docker
```

---

## 🔐 Authentication Features

### Current Implementation
- ✅ **NextAuth.js integration** with credentials and Google OAuth
- ✅ **Role-based access control** (Admin, User roles)
- ✅ **Server-side authentication** helpers (`requireAuth`, `requireRole`)
- ✅ **Client-side authentication** hook (`useAuth`)
- ✅ **Protected routes** and middleware
- ✅ **Session management** with JWT
- ✅ **Form validation** with Zod schemas
- ✅ **Error handling** and logging

### Usage Examples

#### Server-side Protection
```typescript
// In a Server Component or API route
import { requireAuth, requireRole } from '@/lib/auth-helpers';

export default async function AdminPage() {
  const user = await requireRole(['ADMIN']);
  return <div>Welcome Admin: {user.name}</div>;
}
```

#### Client-side Hook
```typescript
// In a Client Component
import { useAuth } from '@/hooks/use-auth';

function ProfileComponent() {
  const { user, isAuthenticated, signOut } = useAuth();
  
  if (!isAuthenticated) return <LoginForm />;
  
  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables
4. Deploy automatically

### Environment Variables for Production
```env
DATABASE_URL="your-production-database-url"
NEXTAUTH_SECRET="your-production-secret-32-chars-min"
NEXTAUTH_URL="https://your-domain.com"
GOOGLE_CLIENT_ID="your-google-oauth-client-id"
GOOGLE_CLIENT_SECRET="your-google-oauth-client-secret"
```

### Database Providers
- **Supabase** - PostgreSQL with built-in auth
- **PlanetScale** - MySQL-compatible serverless database
- **Railway** - PostgreSQL with simple deployment
- **Neon** - Serverless PostgreSQL

### Caching Providers
- **Upstash Redis** - Serverless Redis
- **Railway Redis** - Traditional Redis hosting

## 📚 Documentation

- **[Architecture Guide](./docs/architecture.md)** - System architecture and patterns
- **[Authentication Guide](./docs/features/authentication.md)** - Complete auth documentation
- **[Environment Variables](./docs/environment-variables.md)** - Configuration guide

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🎯 What's Next?

This starter template provides a solid foundation for building modern web applications. Consider adding:

- **Database models** for your specific use case
- **Email verification** system
- **Password reset** functionality
- **User profile management**
- **Admin dashboard**
- **API rate limiting**
- **Testing setup** (Jest, Playwright)
- **CI/CD pipeline**

Happy coding! 🚀
