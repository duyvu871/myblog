## Providers

The `providers` directory contains React Context Providers for sharing state/services across the entire application (theme, auth, i18n, configs, cache...). Each provider should be compact, separated by domain, and easy to compose.

### Conventions
- Each provider is in its own file, named `<feature>-provider.tsx` and exports:
  - `Context` (e.g., `AppProviderContext`)
  - `Provider` (e.g., `AppProvider`)
  - Access hook (e.g., `useAppProvider`)
- Prefer named exports, avoid default if not needed.
- Providers using hooks (state, effect) must be client components (consider adding `"use client"`).
- Avoid stuffing too many responsibilities into one provider; separate by domain and compose at "root providers".

### How to Extend `AppProvider`
```tsx
// apps/web/main/src/providers/app-provider.tsx (extension example)
"use client";
import React, { createContext, useContext, useMemo, useState } from "react";

export interface AppProviderContextType {
  userId?: string;
  setUserId: (id?: string) => void;
}

export const AppProviderContext = createContext<AppProviderContextType | undefined>(undefined);

export const useAppProvider = () => {
  const context = useContext(AppProviderContext);
  if (!context) throw new Error("useAppProvider must be used within an AppProvider");
  return context;
};

export interface AppProviderProps { children: React.ReactNode }

export function AppProvider({ children }: AppProviderProps) {
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const value = useMemo(() => ({ userId, setUserId }), [userId]);
  return <AppProviderContext.Provider value={value}>{children}</AppProviderContext.Provider>;
}
```

### Usage
```tsx
// Root app/layout.tsx wrapping application with provider
import { AppProvider } from "@/providers/app-provider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
```

```tsx
// Inside any component: access context via hook
import { useAppProvider } from "@/providers/app-provider";

export function ProfileButton() {
  const { userId, setUserId } = useAppProvider();
  return <button onClick={() => setUserId("u_123")}>{userId ?? "Set User"}</button>;
}
```

### Multiple Provider Organization (composition)
```tsx
// providers/root-providers.tsx
import { AppProvider } from "@/providers/app-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { I18nProvider } from "@/providers/i18n-provider";

export function RootProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <I18nProvider>
        <AppProvider>{children}</AppProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}
```

### Best practices
- Follow React hooks rules; keep state as close to where it's used as possible.
- Memoize provider `value` with `useMemo` to avoid unnecessary re-renders.
- Split providers by domain; easier to replace/test.
- Hook `useXxxProvider` should throw error when used outside provider for fail-fast.
- Don't put heavy logic (continuous fetch, large calculations) in provider; move to services or separate hooks.

### Quick Testing
```tsx
// test-utils.tsx
import { render } from "@testing-library/react";
import { AppProvider } from "@/providers/app-provider";

export const renderWithProviders = (ui: React.ReactElement) =>
  render(<AppProvider>{ui}</AppProvider>);
```


