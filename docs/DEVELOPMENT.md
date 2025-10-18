# 🛠️ Development Guide

## Getting Started

### Prerequisites

- **Node.js**: >= 20.0.0
- **pnpm**: >= 10.0.0
- **Gemini API Key**: For AI features (get from [Google AI Studio](https://makersuite.google.com/app/apikey))

### Initial Setup

```bash
# Clone repository
git clone <repository-url>
cd expense-fsd

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

---

## Development Workflow

### 1. Create a New Branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Make Changes

Follow the [Project Rules](RULES.md) and [Architecture Guidelines](ARCHITECTURE.md).

### 3. Verify Changes

```bash
# Run verification (lint + type-check + build)
pnpm verify
```

### 4. Commit Changes

```bash
git add .
git commit -m "feat: your feature description"
```

### 5. Push and Create PR

```bash
git push origin feature/your-feature-name
```

---

### Adding a New Route

Follow these steps to add a new page to the application:

#### 1. Create Page Component

```bash
mkdir -p src/pages/my-new-page/ui
touch src/pages/my-new-page/ui/my-new-page.tsx
touch src/pages/my-new-page/index.ts
```

**File**: `src/pages/my-new-page/ui/my-new-page.tsx`
```typescript
import { PageHeader } from "@/widgets/page-header";
import { MyIcon } from "lucide-react";

export function MyNewPage() {
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <PageHeader
        icon={MyIcon}
        title="My New Page"
        description="Description of the page"
      />

      {/* Page content */}
    </div>
  );
}
```

**File**: `src/pages/my-new-page/index.ts`
```typescript
export { MyNewPage } from './ui/my-new-page';
```

#### 2. Add Route in App

**File**: `src/app/app.tsx`

Import the page:
```typescript
import { MyNewPage } from "@/pages/my-new-page";
```

Add route to AppRoutes:
```typescript
function AppRoutes() {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      {/* Existing routes */}

      <Route
        path="/my-new-page"
        element={
          <PageTransition>
            <MyNewPage />
          </PageTransition>
        }
      />
    </Routes>
  );
}
```

#### 3. Add Navigation Link (Optional)

If you want to add the page to bottom navigation:

**File**: `src/widgets/bottom-nav/ui/bottom-nav.tsx`

```typescript
<NavLink
  to="/my-new-page"
  className={({ isActive }) => cn(
    "flex flex-col items-center justify-center gap-1 h-full",
    isActive
      ? "text-primary bg-primary/10"
      : "text-muted-foreground"
  )}
>
  {({ isActive }) => (
    <>
      <MyIcon size={24} strokeWidth={isActive ? 2.5 : 2} />
      <span className={cn("text-xs", isActive && "font-semibold")}>
        My Page
      </span>
    </>
  )}
</NavLink>
```

#### 4. Test the Route

```bash
# Start dev server
pnpm dev

# Navigate to http://localhost:5173/my-new-page
# Test smooth page transition
# Test browser back/forward buttons
```

#### 5. Verify

```bash
pnpm verify
```

---

## Available Scripts

### Development
```bash
pnpm dev          # Start dev server (port 5173)
```

### Building
```bash
pnpm build        # Production build
pnpm preview      # Preview production build
```

### Code Quality
```bash
pnpm lint         # Run Biome linter
pnpm lint:fix     # Auto-fix linting issues
pnpm format       # Format code with Biome
pnpm type-check   # TypeScript type checking
pnpm verify       # Lint + type-check + build
```

---

## Project Structure

```
expense-fsd/
├── src/
│   ├── app/              # Application layer
│   ├── pages/            # Page components
│   ├── widgets/          # Composite UI blocks
│   ├── features/         # User interactions
│   ├── entities/         # Business entities
│   └── shared/           # Infrastructure
├── public/               # Static assets
├── docs/                 # Documentation
├── dist/                 # Build output
└── node_modules/         # Dependencies
```

---

## Adding New Features

### Step 1: Identify Layer

**Questions to ask**:
- Is this a user interaction? → `features/`
- Is this a composite UI block? → `widgets/`
- Is this a business entity? → `entities/`
- Is this infrastructure code? → `shared/`

### Step 2: Create Slice

```bash
# Example: Adding a new feature
mkdir -p src/features/my-feature/{model,ui}
touch src/features/my-feature/index.ts
touch src/features/my-feature/model/use-my-feature.ts
touch src/features/my-feature/ui/my-feature-form.tsx
```

### Step 3: Implement

**File: `src/features/my-feature/model/use-my-feature.ts`**
```typescript
import { useState } from 'react';
import { expenseService } from '@/entities/expense';

export function useMyFeature() {
  const [isLoading, setIsLoading] = useState(false);

  const doSomething = async () => {
    setIsLoading(true);
    try {
      // Logic here
      await expenseService.add(/* ... */);
    } finally {
      setIsLoading(false);
    }
  };

  return { doSomething, isLoading };
}
```

**File: `src/features/my-feature/ui/my-feature-form.tsx`**
```typescript
import { Button } from '@/shared/ui/button';
import { useMyFeature } from '../model/use-my-feature';

export function MyFeatureForm() {
  const { doSomething, isLoading } = useMyFeature();

  return (
    <form>
      <Button onClick={doSomething} disabled={isLoading}>
        Submit
      </Button>
    </form>
  );
}
```

**File: `src/features/my-feature/index.ts`**
```typescript
export { MyFeatureForm } from './ui/my-feature-form';
// Note: useMyFeature is internal, not exported
```

### Step 4: Use in Page

```typescript
// src/pages/my-page/ui/my-page.tsx
import { MyFeatureForm } from '@/features/my-feature';

export function MyPage() {
  return (
    <div>
      <h1>My Page</h1>
      <MyFeatureForm />
    </div>
  );
}
```

### Step 5: Verify

```bash
pnpm verify
```

---

## Adding Database Entities

### Step 1: Update Database Schema

**File: `src/shared/api/db.ts`**
```typescript
class ExpenseDatabase extends Dexie {
  expenses!: EntityTable<ExpenseRecord, 'id'>;
  incomes!: EntityTable<IncomeRecord, 'id'>;
  myNewEntity!: EntityTable<MyNewEntityRecord, 'id'>; // Add this

  constructor() {
    super('ExpenseManagerDB');

    this.version(2).stores({ // Increment version
      expenses: '...',
      incomes: '...',
      myNewEntity: 'id, field1, field2, [field1+field2]', // Add this
    });
  }
}
```

### Step 2: Define Type

**File: `src/shared/types/index.ts`**
```typescript
export interface MyNewEntityRecord {
  id: string;
  field1: string;
  field2: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### Step 3: Create Entity Layer

```bash
mkdir -p src/entities/my-new-entity/{api,model,ui}
```

**File: `src/entities/my-new-entity/api/my-new-entity.service.ts`**
```typescript
import { db } from '@/shared/api/db';
import { generateUUID } from '@/shared/lib/utils';
import type { MyNewEntityRecord } from '@/shared/types';

export const myNewEntityService = {
  async getAll(): Promise<MyNewEntityRecord[]> {
    return await db.myNewEntity.toArray();
  },

  async add(data: Omit<MyNewEntityRecord, 'id' | 'createdAt' | 'updatedAt'>): Promise<MyNewEntityRecord> {
    const now = new Date();
    const newEntity = {
      ...data,
      id: generateUUID(),
      createdAt: now,
      updatedAt: now,
    };
    await db.myNewEntity.add(newEntity);
    return newEntity;
  },

  // ... other CRUD operations
};
```

**File: `src/entities/my-new-entity/model/use-my-new-entity-query.ts`**
```typescript
import { useLiveQuery } from 'dexie-react-hooks';
import { myNewEntityService } from '../api/my-new-entity.service';
import type { MyNewEntityRecord } from '@/shared/types';

export function useMyNewEntities(): MyNewEntityRecord[] {
  return useLiveQuery(() => myNewEntityService.getAll()) ?? [];
}
```

**File: `src/entities/my-new-entity/ui/my-new-entity-item.tsx`**
```typescript
import type { MyNewEntityRecord } from '@/shared/types';
import { Card } from '@/shared/ui/card';

interface MyNewEntityItemProps {
  entity: MyNewEntityRecord;
}

export function MyNewEntityItem({ entity }: MyNewEntityItemProps) {
  return (
    <Card>
      <p>{entity.field1}</p>
      <p>{entity.field2}</p>
    </Card>
  );
}
```

**File: `src/entities/my-new-entity/index.ts`**
```typescript
export { myNewEntityService } from './api/my-new-entity.service';
export { useMyNewEntities } from './model/use-my-new-entity-query';
export { MyNewEntityItem } from './ui/my-new-entity-item';
```

### Step 4: Clear Old Database

When you increment the database version, users need to clear their IndexedDB:

```javascript
// Option 1: Auto-clear on version upgrade (add to db.ts)
this.version(2).stores({
  // ...
}).upgrade((trans) => {
  // Migration logic here
});

// Option 2: Manual clear (DevTools)
// Application → Storage → IndexedDB → Right-click → Delete
```

---

## Working with Forms

### Using React Hook Form + Zod

**Example: Add Expense Form**

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { expenseService } from '@/entities/expense';

// Define schema
const expenseSchema = z.object({
  amount: z.number().positive('Amount must be positive'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(1, 'Description is required'),
  date: z.date(),
});

type ExpenseFormData = z.infer<typeof expenseSchema>;

export function ExpenseForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      date: new Date(),
    },
  });

  const onSubmit = async (data: ExpenseFormData) => {
    await expenseService.add(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register('amount', { valueAsNumber: true })} type="number" />
      {errors.amount && <span>{errors.amount.message}</span>}

      <Input {...register('description')} />
      {errors.description && <span>{errors.description.message}</span>}

      <Button type="submit">Add Expense</Button>
    </form>
  );
}
```

---

## Styling Guidelines

### Tailwind CSS

Use utility classes:

```tsx
// ✅ Good
<div className="flex items-center gap-4 p-4 rounded-lg bg-card">
  <Button className="w-full">Submit</Button>
</div>

// ❌ Avoid inline styles
<div style={{ display: 'flex', padding: '16px' }}>
  <Button style={{ width: '100%' }}>Submit</Button>
</div>
```

### Component Variants

Use `class-variance-authority` for component variants:

```typescript
import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        destructive: 'bg-destructive text-destructive-foreground',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);
```

### Responsive Design

Mobile-first approach:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* Mobile: 1 column, Tablet: 2 columns, Desktop: 4 columns */}
</div>
```

### Mobile UX Best Practices

#### Numeric Input for Currency Fields

All amount input fields should use `inputMode="numeric"` to trigger the numeric keyboard on mobile devices:

```tsx
<Input
  type="number"
  inputMode="numeric"  // Triggers 0-9 keyboard on mobile
  placeholder="100000"
/>
```

This provides better mobile UX for Vietnamese currency (VND) input by showing an integer-only keyboard.

**Implementation**: Added in commit 25c24d0 (Oct 17, 2025)
**Affected Components**:
- AddExpenseForm
- EditExpenseForm
- AddIncomeForm
- EditIncomeForm

---

## Debugging

### Browser DevTools

**IndexedDB**:
```
Application → Storage → IndexedDB → ExpenseManagerDB
```

**Service Worker**:
```
Application → Service Workers → Unregister (to test updates)
```

**Local Storage**:
```
Application → Storage → Local Storage
```

### React DevTools

Install [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) for component inspection.

### Console Logging

```typescript
// Use during development
console.log('Data:', data);
console.table(expenses); // Table view
console.group('Expense Operations');
console.log('Add:', expense);
console.groupEnd();

// Remove before committing (or use proper logger)
```

---

## Testing

### Unit Tests (Example with Vitest)

```typescript
// src/shared/lib/format.test.ts
import { describe, it, expect } from 'vitest';
import { formatAmount } from './format';

describe('formatAmount', () => {
  it('formats Vietnamese currency correctly', () => {
    expect(formatAmount(50000)).toBe('50.000');
    expect(formatAmount(1000000)).toBe('1.000.000');
  });
});
```

### Integration Tests

```typescript
// src/entities/expense/api/expense.service.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { expenseService } from './expense.service';
import { db } from '@/shared/api/db';

describe('expenseService', () => {
  beforeEach(async () => {
    await db.expenses.clear();
  });

  it('adds expense correctly', async () => {
    const expense = await expenseService.add({
      amount: 50000,
      category: 'Food',
      description: 'Lunch',
      date: new Date(),
    });

    expect(expense.id).toBeDefined();
    expect(expense.amount).toBe(50000);

    const all = await expenseService.getAll();
    expect(all).toHaveLength(1);
  });
});
```

---

## Performance Best Practices

### 1. Memoize Expensive Calculations

```typescript
const stats = useMemo(
  () => calculateFinancialStats(expenses, incomes),
  [expenses, incomes]
);
```

### 2. Use React.memo for Pure Components

```typescript
export const ExpenseItem = memo(({ expense }: { expense: ExpenseRecord }) => {
  return <div>{expense.description}</div>;
});
```

### 3. Debounce User Input

```typescript
import { useDebounce } from 'use-debounce';

const [searchText, setSearchText] = useState('');
const [debouncedSearch] = useDebounce(searchText, 300);
```

### 4. Optimize Database Queries

```typescript
// ✅ Use compound indexes
db.expenses
  .where('[category+date+createdAt]')
  .between([category, startDate, minKey], [category, endDate, maxKey]);

// ❌ Avoid full table scans
const all = await db.expenses.toArray();
const filtered = all.filter(e => e.category === category);
```

---

## Common Issues & Solutions

### Issue: useLocation() Hook Error

**Error Message**: "useLocation() may be used only in the context of a <Router> component"

**Cause**: Attempting to use React Router hooks outside of `BrowserRouter` context.

**Solution**: Ensure the hook is called inside a component that's rendered within `RouterProvider`:

```typescript
// ❌ Wrong: Outside RouterProvider
export function App() {
  const location = useLocation(); // ERROR!

  return (
    <RouterProvider>
      {/* ... */}
    </RouterProvider>
  );
}

// ✅ Correct: Inside RouterProvider
function AppRoutes() {
  const location = useLocation(); // Works!
  return <Routes>...</Routes>;
}

export function App() {
  return (
    <RouterProvider>
      <AppRoutes />
    </RouterProvider>
  );
}
```

---

### Issue: Page Transitions Not Working

**Symptoms**: Pages switch instantly without animation

**Possible Causes**:
1. Missing `PageTransition` wrapper on route
2. `AnimatePresence` not wrapping `Routes`
3. Missing `key` prop on Routes

**Solution**: Check the route configuration in `src/app/app.tsx`:

```typescript
<AnimatePresence mode="wait" initial={false}>
  <Routes location={location} key={location.pathname}> {/* key is essential */}
    <Route
      path="/page"
      element={
        <PageTransition> {/* Must wrap page */}
          <MyPage />
        </PageTransition>
      }
    />
  </Routes>
</AnimatePresence>
```

---

### Issue: Database Not Updating

**Solution**: Check if you're using `useLiveQuery`:

```typescript
// ✅ Correct - automatically updates
const expenses = useLiveQuery(() => db.expenses.toArray());

// ❌ Wrong - static query
const [expenses, setExpenses] = useState([]);
useEffect(() => {
  db.expenses.toArray().then(setExpenses);
}, []); // Won't update when data changes
```

### Issue: Import Errors

**Solution**: Use `@/` alias, not relative paths:

```typescript
// ✅ Correct
import { Button } from '@/shared/ui/button';

// ❌ Wrong
import { Button } from '../../../shared/ui/button';
```

### Issue: Type Errors After DB Schema Change

**Solution**: Clear database and restart:

```bash
# 1. Clear IndexedDB in DevTools
# 2. Restart dev server
pnpm dev
```

### Issue: Build Fails

**Solution**: Run verification steps:

```bash
pnpm type-check  # Check types
pnpm lint        # Check linting
pnpm build       # Build
```

---

## Git Workflow

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Examples**:
```
feat(expense): add AI-powered input parsing
fix(dashboard): correct net balance calculation
docs(readme): update installation instructions
refactor(entities): extract common query logic
```

### Branch Naming

```
feature/add-ai-parsing
fix/dashboard-calculation-bug
docs/update-architecture-guide
refactor/extract-common-hooks
```

---

## Deployment

### Build for Production

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

### Deploy to Vercel

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel
```

### Deploy to Netlify

```bash
# Install Netlify CLI
pnpm add -g netlify-cli

# Build and deploy
pnpm build
netlify deploy --prod --dir=dist
```

---

## Resources

- [Feature-Sliced Design](https://feature-sliced.design/)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Dexie.js Docs](https://dexie.org/)
- [Vite Guide](https://vitejs.dev/guide/)

---

## Need Help?

- Check [Architecture Documentation](ARCHITECTURE.md)
- Review [Project Rules](RULES.md)
- Open an issue on GitHub
- Ask in team chat

---

**Happy Coding! 🚀**
