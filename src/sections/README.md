
### General Configuration for `src/sections`

- **Objective**: Group code by domain/feature (auth, notifications, explore, profile, post-detail, message, bookmark, home, settings, followers). Each domain contains its own pages (`view/`), sub-components (`components/`/`subsections/`), local data (`data/`), and specific utilities (`utils/` when needed).
- **Page entry-point**: `view/` contains the main page component `*-view.tsx`, imported directly from App Router.
- **Data & schema**: placed in `data/` (Zod schemas, mock), re-exported via `data/index.ts`.
- **UI organization**: Sub-UI/complex blocks go into `components/` or `subsections/` (e.g., settings).
- **Export**: Prefer barrel `view/index.ts` for clean imports from routes: `import { XxxView } from '@/sections/<domain>/view'`.
- **Avoid cross-dependencies**: If shared usage is needed, move to `src/components/` for reuse.

### Suggested Structure
```
sections/
  <domain>/
    view/
      <domain>-view.tsx
      index.ts              # export { <Domain>View }
    components/             # (if needed)
    <subsections>/            # (settings, etc.)
    data/
      schema.ts
      index.ts
    utils/                  # (if needed)
```

### Sample Route Import
```ts
import { ExploreView } from '@/sections/explore/view';
import { ProfileView } from '@/sections/profile/view';
import { MessageView } from '@/sections/message/view';
```
Or (when barrel doesn't exist): `import SettingsView from '@/sections/settings/view/setting-view'`.

### Example: `auth`

Structure:
```
sections/auth/
  data/
    schema.ts
    index.ts
  view/
    login-view.tsx
    register-view.tsx
    index.ts              # export { LoginView, RegisterView }
```

- Route usage:

- /auth/login/page.tsx

```ts
import { LoginView } from '@main/sections/auth/view';

export const metadata = { title: 'Login Page' };

export default function LoginPage() {
  return <LoginView />;
}
```

- /auth/register/page.tsx
```ts
import { RegisterView } from '@main/sections/auth/view';

export const metadata = { title: 'Register Page' };

export default function RegisterPage() {
  return <RegisterView />;
}
```

- Schema and re-export:
```ts
import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }).max(30, { message: 'Username must be 30 characters or less' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }).max(30, { message: 'Password must be 30 characters or less' }),
});

export type LoginData = z.infer<typeof loginSchema>;
```

```ts
export {
  type LoginData,
  loginSchema,
  type RegisterData,
  registerSchema,
} from './schema';
```

- `LoginView` uses schema to validate and call login API:

- `RegisterView` similarly uses `registerSchema` and `register` API.

### Quick Standardization Tips
- Each `view/` has `index.ts` exporting named `XxxView`; routes import from `@/sections/<domain>/view`.
- Standardize export names in `home/view/index.ts` to match routes (currently exports `PostListView` while route uses `HomeView`).

- - -

- Summarized general configuration for `sections` and detailed example for `auth` (schema, view, route).
- If you want, I can add/adjust missing `index.ts` files to standardize imports from all sections.