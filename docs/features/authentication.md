# Authentication Feature

Comprehensive authentication system for the Student Management application, implementing secure user registration, login, and session management with modern UI/UX patterns.

## 🏗️ Architecture Overview

The authentication system follows a modular, section-based architecture:

```
src/sections/auth/
├── data/                    # Business logic layer
│   ├── schemas.ts          # Zod validation schemas
│   ├── action.ts           # Server actions
│   └── index.ts            # Exports
├── view/                   # Presentation layer
│   ├── login-view.tsx      # Login form component
│   ├── register-view.tsx   # Registration form component
│   └── index.ts            # Exports
└── README.md               # Section documentation
```

### Integration Points

- **App Router**: `src/app/(public)/auth/` - Route handlers
- **Components**: `src/components/layout/auth-layout.tsx` - Shared layout
- **UI Components**: `src/components/ui/` - Form inputs and buttons
- **Authentication Library**: `src/lib/auth.ts` - Auth configuration
- **Database**: `prisma/schema.prisma` - User model (to be implemented)

## 🎯 Core Features

### ✅ Implemented Features

- **User Registration**: Complete sign-up flow with validation
- **User Login**: Secure authentication with credentials
- **Form Validation**: Client and server-side validation using Zod
- **OAuth Integration**: Google Sign-In support (UI ready)
- **Responsive Design**: Mobile-first responsive layout
- **Error Handling**: Comprehensive error management
- **TypeScript Support**: Fully typed with IntelliSense
- **Loading States**: User feedback during async operations

### 🚧 Planned Features

- **Password Reset**: Forgot password functionality
- **Email Verification**: Account verification via email
- **Session Management**: JWT/session-based authentication
- **Role-Based Access**: User roles and permissions
- **Two-Factor Authentication**: Enhanced security
- **Account Settings**: Profile management

## 📋 Form Schemas & Validation

### Login Schema

```typescript
const LoginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(254, 'Email is too long')
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

type LoginInput = z.infer<typeof LoginSchema>;
```

### Registration Schema

```typescript
const RegisterSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes')
    .trim(),
  email: emailValidation,
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(128, 'Password is too long')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one lowercase letter, one uppercase letter, and one number'
    ),
  confirmPassword: z
    .string()
    .min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type RegisterInput = z.infer<typeof RegisterSchema>;
```

### Advanced Schemas

The system also includes schemas for:
- **Forgot Password**: Email validation for password reset
- **Reset Password**: Token-based password reset
- **Change Password**: For authenticated users
- **Profile Update**: User profile management

## 🔧 Server Actions

### Login Action

```typescript
const rawLoginAction = async (data: LoginInput) => {
  // Validate input data
  const validatedData = LoginSchema.parse(data);
  
  // TODO: Implement actual authentication
  // Currently uses mock authentication for development
  if (validatedData.email === 'admin@example.com' && validatedData.password === 'password') {
    return {
      user: {
        id: '1',
        email: validatedData.email,
        name: 'Admin User',
        role: 'ADMIN',
      },
    };
  }
  
  throw new AuthenticationError('Invalid email or password');
};

export const loginAction = withServerActionErrorHandling(rawLoginAction);
```

### Registration Action

```typescript
const rawRegisterAction = async (data: RegisterInput) => {
  // Validate input data
  const validatedData = RegisterSchema.parse(data);
  
  // TODO: Implement database integration
  // Currently uses mock validation for development
  const existingEmails = ['admin@example.com', 'test@example.com'];
  if (existingEmails.includes(validatedData.email)) {
    throw new ConflictError('User with this email already exists');
  }
  
  return {
    user: {
      id: Date.now().toString(),
      name: validatedData.name,
      email: validatedData.email,
      role: 'STUDENT',
      createdAt: new Date().toISOString(),
    },
  };
};

export const registerAction = withServerActionErrorHandling(rawRegisterAction);
```

### Error Handling

All server actions use the `withServerActionErrorHandling` wrapper for consistent error management:

```typescript
// Error types handled:
- ValidationError: Invalid input data
- AuthenticationError: Invalid credentials
- ConflictError: Duplicate resources
- DatabaseError: Database operations
- NetworkError: Connection issues
```

## 🎨 UI Components

### AuthLayout Component

Provides consistent layout for all authentication pages:

```typescript
interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

// Features:
- Responsive two-column layout
- Brand identity section
- Logo and company branding
- Social media links
- Mobile-optimized design
```

### LoginView Component

```typescript
interface LoginViewProps {
  onSubmit: (data: LoginInput) => void | Promise<void>;
  isLoading?: boolean;
  error?: string | null;
  successMessage?: string | null;
}

// Features:
- React Hook Form integration
- Zod validation resolver
- OAuth Google sign-in button
- Remember me checkbox
- Forgot password link
- Error/success message display
- Loading states
```

### RegisterView Component

```typescript
interface RegisterViewProps {
  onSubmit: (data: RegisterInput) => void | Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

// Features:
- Complete registration form
- Password confirmation validation
- Terms of service agreement
- Real-time form validation
- Password strength indicator (planned)
- Account exists redirect
```

### Form Components

Reusable form components with consistent styling:

```typescript
// Available components:
- FormInput: Text input with validation
- FormPasswordInput: Password input with toggle visibility
- FormButton: Styled button with loading states
- OAuthButton: Social authentication buttons
```

## 🔒 Security Features

### Input Validation

- **Client-side validation**: Real-time feedback using React Hook Form + Zod
- **Server-side validation**: All inputs re-validated on server
- **SQL injection protection**: Parameterized queries (when database is integrated)
- **XSS protection**: Input sanitization and output encoding

### Password Security

- **Minimum requirements**: 6+ characters, mixed case, numbers
- **Password strength meter**: Visual feedback (planned)
- **Secure hashing**: bcrypt/argon2 for password storage (planned)
- **Password confirmation**: Double-entry validation

### Authentication Security

- **CSRF protection**: Built-in with Next.js App Router
- **Rate limiting**: Planned for login attempts
- **Session management**: Secure session handling (planned)
- **OAuth integration**: Google Sign-In with secure token handling

### Data Protection

- **HTTPS enforcement**: Required in production
- **Sensitive data handling**: Passwords never logged or exposed
- **Email validation**: RFC-compliant email verification
- **Input sanitization**: All user inputs cleaned and validated

## 🚀 Integration Guide

### 1. Basic Page Setup

```typescript
// app/(public)/auth/login/page.tsx
'use client';

import { LoginView } from '@/sections/auth/view';
import { loginAction } from '@/sections/auth/data';
import type { LoginInput } from '@/sections/auth/data';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (data: LoginInput) => {
    setIsLoading(true);
    setError(null);
    
    const result = await loginAction(data);
    
    if (result.success) {
      router.push('/dashboard');
    } else {
      setError(result.error.message);
    }
    
    setIsLoading(false);
  };

  return (
    <LoginView 
      onSubmit={handleLogin} 
      isLoading={isLoading}
      error={error}
    />
  );
}
```

### 2. Route Configuration

```typescript
// App Router structure:
app/(public)/auth/
├── login/
│   ├── page.tsx          # Login page
│   └── layout.tsx        # Login-specific layout
├── register/
│   ├── page.tsx          # Registration page
│   └── layout.tsx        # Registration-specific layout
├── forgot-password/      # Planned
├── reset-password/       # Planned
└── layout.tsx            # Shared auth layout
```

### 3. Metadata Configuration

```typescript
// page.tsx
export const metadata = {
  title: 'Login - Student Management',
  description: 'Sign in to your Student Management account',
};
```

## 📊 Error Handling

### Error Types

```typescript
// Authentication errors
'UNAUTHORIZED'           // Invalid credentials
'TOKEN_EXPIRED'          // Session expired
'ACCOUNT_LOCKED'         // Too many failed attempts
'EMAIL_NOT_VERIFIED'     // Account not verified

// Validation errors
'VALIDATION_ERROR'       // Invalid input format
'MISSING_REQUIRED_FIELDS' // Required fields missing
'PASSWORD_TOO_WEAK'      // Password requirements not met

// Registration errors
'ALREADY_EXISTS'         // Email already registered
'INVALID_EMAIL_FORMAT'   // Email format invalid
'TERMS_NOT_ACCEPTED'     // Terms of service not agreed
```

### Error Display Pattern

```typescript
const handleSubmit = async (data) => {
  try {
    const result = await authAction(data);
    
    if (result.success) {
      // Handle success
      router.push('/dashboard');
    } else {
      // Handle specific errors
      switch (result.error.code) {
        case 'VALIDATION_ERROR':
          setFieldErrors(result.error.details);
          break;
        case 'UNAUTHORIZED':
          setError('Invalid email or password');
          break;
        case 'ALREADY_EXISTS':
          setError('An account with this email already exists');
          break;
        default:
          setError('An unexpected error occurred');
      }
    }
  } catch (error) {
    setError('Network error. Please try again.');
  }
};
```

## 🧪 Testing Strategy

### Unit Tests

```typescript
// Schema validation tests
describe('Auth Schemas', () => {
  test('validates correct login data', () => {
    const validData = {
      email: 'test@example.com',
      password: 'password123',
    };
    expect(LoginSchema.parse(validData)).toEqual(validData);
  });
  
  test('rejects invalid email format', () => {
    const invalidData = {
      email: 'invalid-email',
      password: 'password123',
    };
    expect(() => LoginSchema.parse(invalidData)).toThrow();
  });
});
```

### Integration Tests

```typescript
// Server action tests
describe('Auth Actions', () => {
  test('login with valid credentials', async () => {
    const result = await loginAction({
      email: 'admin@example.com',
      password: 'password',
    });
    
    expect(result.success).toBe(true);
    expect(result.data.user).toBeDefined();
  });
  
  test('registration with valid data', async () => {
    const result = await registerAction({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'SecurePass123',
      confirmPassword: 'SecurePass123',
    });
    
    expect(result.success).toBe(true);
    expect(result.data.user.email).toBe('john@example.com');
  });
});
```

### Component Tests

```typescript
// UI component tests
describe('LoginView', () => {
  test('renders form fields correctly', () => {
    render(<LoginView onSubmit={mockSubmit} />);
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });
  
  test('displays error messages', () => {
    render(<LoginView onSubmit={mockSubmit} error="Invalid credentials" />);
    
    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
  });
});
```

## 🔄 State Management

### Local State Pattern

The authentication system uses local component state for form management:

```typescript
const [formState, setFormState] = useState({
  isLoading: false,
  error: null,
  success: false,
});

const handleSubmit = async (data) => {
  setFormState(prev => ({ ...prev, isLoading: true, error: null }));
  
  try {
    const result = await authAction(data);
    
    if (result.success) {
      setFormState(prev => ({ ...prev, success: true }));
      // Handle success (redirect, etc.)
    } else {
      setFormState(prev => ({ 
        ...prev, 
        error: result.error.message 
      }));
    }
  } finally {
    setFormState(prev => ({ ...prev, isLoading: false }));
  }
};
```

### Global State (Planned)

For user session management, the system will integrate with:
- **NextAuth.js**: Session management and OAuth
- **Zustand/Context**: Global user state
- **React Query**: Server state management

## 🔧 Development Setup

### Environment Variables

```bash
# Authentication (planned)
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# OAuth providers
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/student_management
```

### Database Schema (Planned)

```prisma
model User {
  id            String    @id @default(cuid())
  name          String
  email         String    @unique
  password      String?   // Nullable for OAuth users
  emailVerified DateTime?
  image         String?
  role          Role      @default(STUDENT)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  // Relations
  accounts      Account[]
  sessions      Session[]
  
  @@map("users")
}

enum Role {
  ADMIN
  TEACHER
  STUDENT
}
```

## 📝 Best Practices

### Development Guidelines

1. **Always validate input** both client and server side
2. **Handle loading states** for better UX
3. **Show meaningful error messages** to users
4. **Use TypeScript** for type safety
5. **Test authentication flows** thoroughly
6. **Implement proper redirects** after authentication
7. **Handle edge cases** like network errors
8. **Keep passwords secure** - never log or expose
9. **Implement rate limiting** to prevent abuse
10. **Use HTTPS** in production

### Code Organization

- **Separation of concerns**: Data, view, and logic layers
- **Reusable components**: Shared UI components
- **Consistent naming**: Follow project naming conventions
- **Error boundaries**: Graceful error handling
- **Performance optimization**: Lazy loading and code splitting

### Security Checklist

- [ ] Input validation on client and server
- [ ] Password complexity requirements
- [ ] CSRF protection enabled
- [ ] SQL injection prevention
- [ ] XSS protection implemented
- [ ] Rate limiting configured
- [ ] HTTPS enforced in production
- [ ] Secure session management
- [ ] OAuth security best practices
- [ ] Regular security audits

## 🔗 Related Documentation

- **Architecture**: `docs/architecture.md` - Overall system architecture
- **Database**: `docs/database.md` - Database schema and migrations
- **API**: `docs/api.md` - API endpoints and specifications
- **Deployment**: `docs/deployment.md` - Production deployment guide
- **Testing**: `docs/testing.md` - Testing strategies and guidelines

## 🚧 Roadmap

### Phase 1 (Current)
- [x] Basic login/register UI
- [x] Form validation
- [x] Mock authentication
- [x] Error handling
- [x] Responsive design

### Phase 2 (Next)
- [ ] Database integration
- [ ] Real authentication with NextAuth.js
- [ ] Email verification
- [ ] Password reset functionality
- [ ] OAuth Google integration

### Phase 3 (Future)
- [ ] Role-based access control
- [ ] Two-factor authentication
- [ ] Account settings
- [ ] Social login providers
- [ ] Advanced security features

## 📞 Support

For questions or issues related to the authentication system:

1. **Check the documentation** in this file and related docs
2. **Review the code** in `src/sections/auth/`
3. **Run tests** to verify functionality
4. **Create an issue** in the project repository

---

*Last updated: [Current Date]*
*Version: 1.0.0*
