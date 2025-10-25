# 🏗️ Architecture Documentation

## Overview

This application is built using **Feature-Sliced Design (FSD)**, a modern architecture methodology that provides:
- ✅ Clear separation of concerns
- ✅ Scalability and maintainability
- ✅ Predictable structure
- ✅ Prevention of spaghetti code

### Deployment Architecture

The application supports multiple deployment targets:
- **Web/PWA**: Browser-based application with offline support
- **iOS Native**: Hybrid app via Capacitor (pure PWA in native shell)
- **Android Native**: Hybrid app via Capacitor (pure PWA in native shell)

**Capacitor Integration Philosophy**:
- Minimal setup (packaging only, no native features)
- Zero native wrapper code
- Pure web standards (no platform-specific APIs)
- Identical behavior across all platforms

---

## Feature-Sliced Design (FSD)

### Core Principles

1. **Layer Hierarchy**: Unidirectional dependency flow from top to bottom
2. **Slice Isolation**: Slices within a layer cannot import from each other
3. **Public API**: Each slice exposes only what's necessary via `index.ts`
4. **Business Logic Separation**: Shared layer contains no domain logic

### FSD Architecture Enforcement

This project uses **Steiger** with the official FSD plugin to automatically enforce architecture rules.

#### What Steiger Checks

Steiger validates the following FSD principles:

1. **Layer Boundaries**: Prevents upward imports (e.g., shared → entities, features → pages)
2. **Cross-Slice Isolation**: Detects when features import other features
3. **Public API Usage**: Ensures imports use `index.ts` exports, not direct file paths
4. **Naming Conventions**: Validates FSD naming standards for slices and segments
5. **Over-Abstraction**: Warns about single-use slices that could be merged

#### Running the FSD Linter

```bash
# Check for FSD violations
pnpm lint:fsd

# Auto-fix issues (limited support)
pnpm lint:fsd --fix

# Full verification (includes FSD linting)
pnpm verify
```

#### Configuration

FSD linting is configured in `.steiger.json`:
```json
{
  "plugins": ["@feature-sliced/steiger-plugin"],
  "root": "src"
}
```

### Layer Structure

```
┌─────────────────────────────────────────────┐
│  app         Application initialization    │
├─────────────────────────────────────────────┤
│  pages       Complete page compositions     │
├─────────────────────────────────────────────┤
│  widgets     Large composite blocks         │
├─────────────────────────────────────────────┤
│  features    User interactions              │
├─────────────────────────────────────────────┤
│  entities    Business entities              │
├─────────────────────────────────────────────┤
│  shared      Infrastructure code            │
└─────────────────────────────────────────────┘
        ↓ Dependencies flow downward only
```

---

## Layer Responsibilities

### 1. App Layer (`src/app/`)

**Purpose**: Application-wide setup and initialization

**Contains**:
- Providers (theme, router)
- Global styles
- Root component
- Application entry point

**Example**:
```
app/
├── providers/
│   ├── providers.tsx           # Root provider composition (includes BrowserRouter + ThemeProvider)
│   └── theme-provider.tsx      # Theme context
├── app.tsx                     # Main app component with AppRoutes
└── index.css                   # Global styles
```

**Rules**:
- ✅ Can import from any layer below
- ✅ AppRoutes component contains routing logic (must be inside RouterProvider)
- ❌ No business logic
- ❌ No feature-specific code

---

### 2. Pages Layer (`src/pages/`)

**Purpose**: Complete page compositions for routes

**Contains**:
- Page components that compose widgets and features
- Page-level state management
- Route definitions

**Example**:
```
pages/
├── dashboard-page/
│   ├── ui/
│   │   └── dashboard-page.tsx
│   └── index.ts
├── expense-page/
│   ├── ui/
│   │   └── expense-page.tsx
│   └── index.ts
└── income-page/
    ├── ui/
    │   └── income-page.tsx
    └── index.ts
```

**Rules**:
- ✅ Imports from widgets, features, entities, shared
- ❌ Pages cannot import from other pages
- ❌ No reusable components (use widgets instead)

---

### 3. Widgets Layer (`src/widgets/`)

**Purpose**: Large composite UI blocks

**Contains**:
- Reusable composite components
- Complex UI blocks used across multiple pages
- Layout components

**Example**:
```
widgets/
├── bottom-nav/
│   ├── ui/
│   │   └── bottom-nav.tsx
│   └── index.ts
├── financial-overview/
│   ├── ui/
│   │   ├── financial-overview.tsx
│   │   └── stat-card.tsx
│   └── index.ts
└── expense-list/
    ├── ui/
    │   ├── expense-list.tsx
    │   └── expense-list-header.tsx
    └── index.ts
```

**Rules**:
- ✅ Imports from features, entities, shared
- ❌ Widgets cannot import from other widgets
- ❌ No business logic (delegate to features/entities)

---

### 4. Features Layer (`src/features/`)

**Purpose**: User interactions and feature implementations

**Contains**:
- Feature-specific logic
- User action handlers
- Forms and input components
- Feature-specific hooks

**Example**:
```
features/
├── add-expense/
│   ├── model/
│   │   └── use-add-expense.ts
│   ├── ui/
│   │   ├── ai-expense-input.tsx
│   │   └── expense-form.tsx
│   └── index.ts
└── filter-expenses/
    ├── model/
    │   ├── use-expense-filter.ts
    │   └── filter-schema.ts
    ├── ui/
    │   └── expense-filter-form.tsx
    └── index.ts
```

**Segments**:
- `model/` - Business logic, state, hooks
- `ui/` - React components
- `index.ts` - Public API

**Rules**:
- ✅ Imports from entities, shared
- ❌ Features cannot import from other features
- ❌ No cross-feature dependencies

---

### 5. Entities Layer (`src/entities/`)

**Purpose**: Business entities and domain logic

**Contains**:
- Entity data models
- CRUD operations
- Entity-specific hooks
- Entity UI components

**Example**:
```
entities/
├── expense/
│   ├── api/
│   │   └── expense.service.ts
│   ├── model/
│   │   └── use-expense-query.ts
│   ├── ui/
│   │   ├── expense-item.tsx
│   │   └── expense-category-select.tsx
│   └── index.ts
├── income/
│   ├── api/
│   │   └── income.service.ts
│   ├── model/
│   │   └── use-income-query.ts
│   ├── ui/
│   │   ├── income-item.tsx
│   │   └── income-category-select.tsx
│   └── index.ts
```

**Segments**:
- `api/` - Server/database communication
- `model/` - Entity state, queries, business logic
- `ui/` - Entity-specific UI components
- `index.ts` - Public API

**Rules**:
- ✅ Imports from shared only
- ❌ Entities cannot import from other entities
- ❌ No feature-specific logic

---

### 6. Shared Layer (`src/shared/`)

**Purpose**: Reusable infrastructure code

**Contains**:
- UI kit components
- Utility functions
- Type definitions
- Configuration
- API clients
- Common hooks

**Example**:
```
shared/
├── ui/                    # shadcn/ui components
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   └── ...
├── components/            # Custom shared components
│   └── empty-state.tsx
├── lib/                   # Utilities
│   ├── utils.ts
│   ├── format.ts
│   ├── calculate-stats.ts
│   └── date-presets.ts
├── api/                   # Database setup
│   └── db.ts
├── config/                # Configuration
│   ├── categories.ts
│   └── constants.ts
├── hooks/                 # Common hooks
│   └── use-local-storage.ts
└── types/                 # Type definitions
    └── index.ts
```

**Mobile Platforms**:
```
# Capacitor (Native App Packaging)
ios/                       # iOS platform (managed by Capacitor)
android/                   # Android platform (managed by Capacitor)
capacitor.config.ts        # Capacitor configuration
```

**Note**: Capacitor is used ONLY for native app packaging. No native feature wrappers or platform-specific code exists in `src/`. The app runs as a pure PWA inside the native container.

**Rules**:
- ✅ No imports from any other layer (except external packages)
- ❌ No business logic
- ❌ No knowledge of features or entities
- ❌ Pure infrastructure code only

---

## Routing Architecture

### React Router Integration

The application uses **React Router v6** for URL-based navigation, providing browser history support, bookmarkable pages, and direct URL access.

#### Structure

**RouterProvider** (`src/app/providers/providers.tsx`)
- Wraps the application with `BrowserRouter` (integrated in main Providers component)
- Provides routing context to the entire app
- Placed in app/providers following FSD conventions

**AppRoutes Component** (`src/app/app.tsx`)
- Contains all routing logic and route definitions
- Must be inside `RouterProvider` to use `useLocation()` hook
- Wraps routes with `AnimatePresence` for page transitions

**Route Configuration**:
```typescript
// src/app/app.tsx
function AppRoutes() {
  const location = useLocation(); // Hook requires Router context

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route
          path="/dashboard"
          element={
            <PageTransition>
              <DashboardPage />
            </PageTransition>
          }
        />
        {/* More routes... */}
      </Routes>
    </AnimatePresence>
  );
}
```

#### Why AppRoutes Component?

The `AppRoutes` component exists to solve a React Router context requirement:

- `useLocation()` hook **must** be called inside `BrowserRouter` context
- `AnimatePresence` requires the current `location` for animation keys
- **Solution**: Create `AppRoutes` component that's rendered inside `RouterProvider`

**Component Hierarchy**:
```
App
└── ThemeProvider
    └── RouterProvider (BrowserRouter context starts here)
        └── AppRoutes (useLocation() works here ✓)
            ├── AnimatePresence
            │   └── Routes
            │       └── Route components with PageTransition
            └── BottomNav
```

#### Navigation Components

**Bottom Navigation** (`src/widgets/bottom-nav/ui/bottom-nav.tsx`)
- Uses `NavLink` from react-router-dom
- Automatic active state detection via `isActive` prop
- Dynamic styling based on current route

**Example**:
```typescript
<NavLink
  to="/dashboard"
  className={({ isActive }) => cn(
    "flex flex-col items-center",
    isActive
      ? "text-dashboard-foreground bg-dashboard-foreground/10"
      : "text-muted-foreground"
  )}
>
  {({ isActive }) => (
    <>
      <LayoutDashboardIcon strokeWidth={isActive ? 2.5 : 2} />
      <span className={cn("text-xs", isActive && "font-semibold")}>
        Tổng quan
      </span>
    </>
  )}
</NavLink>
```

---

## Animation System

### Page Transitions

**Component**: `PageTransition` (`src/shared/components/page-transition.tsx`)

Provides smooth, accessible animations between route changes.

#### Features

- **200ms fade animation** with subtle 10px slide
- **GPU-accelerated** transforms (`willChange` hint)
- **Accessibility support**: Respects `prefers-reduced-motion` user preference
- **Reusable**: Can wrap any page content
- **Performance optimized**: 60fps smooth transitions

#### Usage

```typescript
<Route
  path="/expenses"
  element={
    <PageTransition>
      <ExpensePage />
    </PageTransition>
  }
/>
```

#### Animation Configuration

```typescript
const pageVariants: Variants = {
  initial: { opacity: 0, y: 10 },    // Start invisible, slightly below
  animate: { opacity: 1, y: 0 },     // Fade in, slide to position
  exit: { opacity: 0, y: -10 },      // Fade out, slide up
};

const pageTransition: Transition = shouldReduceMotion
  ? { duration: 0 }                   // Instant for accessibility
  : { duration: 0.2, ease: [0.4, 0.0, 0.2, 1] }; // Smooth Material easing
```

#### Accessibility

Automatically detects user motion preferences:

```typescript
const shouldReduceMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
```

- **Motion enabled**: 200ms smooth fade + slide animation
- **Motion disabled**: Instant transitions (duration: 0)
- **WCAG 2.1 compliant**: Respects user accessibility settings

#### Performance

- Uses `transform` and `opacity` (GPU-accelerated properties)
- `willChange: "transform, opacity"` hint for browser optimization
- `mode="wait"` in AnimatePresence prevents overlapping renders
- `initial={false}` skips animation on first mount (faster initial load)

---

## Import Rules

### Valid Import Patterns

```typescript
// ✅ CORRECT: Downward imports
// app → pages
import { DashboardPage } from '@/pages/dashboard-page';

// pages → widgets
import { FinancialOverview } from '@/widgets/financial-overview';

// widgets → features
import { AddExpenseButton } from '@/features/add-expense';

// features → entities
import { expenseService } from '@/entities/expense';

// entities → shared
import { formatAmount } from '@/shared/lib/format';

// shared → external packages
import { useMemo } from 'react';
```

### Invalid Import Patterns

```typescript
// ❌ WRONG: Upward imports
// shared → entities
import { expenseService } from '@/entities/expense';  // NO!

// ❌ WRONG: Cross-layer imports (same level)
// features/add-expense → features/edit-expense
import { useEditExpense } from '@/features/edit-expense';  // NO!

// ❌ WRONG: Bypassing public API
// pages → entities/expense/api (direct)
import { expenseService } from '@/entities/expense/api/expense.service';  // NO!
// Should be:
import { expenseService } from '@/entities/expense';  // YES!
```

---

## Public API Pattern

### Why Public APIs?

- **Encapsulation**: Hide implementation details
- **Maintainability**: Change internals without breaking consumers
- **Discoverability**: Clear exported interface

### Structure

Every slice must have an `index.ts` that acts as a public API:

```typescript
// features/add-expense/index.ts
export { ExpenseForm } from './ui/expense-form';
// Note: internal hooks are NOT exported if they're only used within the feature
```

```typescript
// entities/expense/index.ts
export { expenseService } from './api/expense.service';
export { ExpenseItem } from './ui/expense-item';
export { ExpenseCategorySelect } from './ui/expense-category-select';
export { useRecentExpenses, useExpenseListData, useExpensesAll } from './model/use-expense-query';
```

### Usage

```typescript
// ✅ CORRECT: Import from public API
import { expenseService, ExpenseItem } from '@/entities/expense';

// ❌ WRONG: Bypass public API
import { ExpenseItem } from '@/entities/expense/ui/expense-item';
```

---

## Domain Separation: Expense vs Income

### Critical Rule: NO MIXING

This project enforces **complete separation** of expense and income domains:

**Forbidden Patterns**:
```typescript
// ❌ NO union types
type TransactionRecord = ExpenseRecord | IncomeRecord;

// ❌ NO type discriminators
interface Record {
  type: 'expense' | 'income';
}

// ❌ NO shared components
function TransactionItem({ transaction }: { transaction: ExpenseRecord | IncomeRecord }) {}

// ❌ NO combined services
async function getTransactions() {
  return [...expenses, ...income];  // NO!
}
```

**Correct Patterns**:
```typescript
// ✅ Separate types
interface ExpenseRecord { id: string; amount: number; ... }
interface IncomeRecord { id: string; amount: number; ... }

// ✅ Separate components
function ExpenseItem({ expense }: { expense: ExpenseRecord }) {}
function IncomeItem({ income }: { income: IncomeRecord }) {}

// ✅ Separate services
async function getExpenses() { ... }
async function getIncomes() { ... }

// ✅ Separate calculations
function calculateExpenseCategoryStats(expenses: ExpenseRecord[]) { ... }
function calculateIncomeCategoryStats(incomes: IncomeRecord[]) { ... }

// ✅ Dashboard queries both separately
function Dashboard() {
  const expenses = useExpensesAll({ dateFrom, dateTo });
  const incomes = useIncomesAll({ dateFrom, dateTo });
  const netBalance = calculateNet(expenses, incomes);  // Calculate locally
}
```

### Duplication Philosophy: Explicit Over DRY

This project **intentionally duplicates** ~1200-1500 lines of code across expense/income domains. This is a **conscious architectural decision**, not an oversight.

#### Why We Accept Duplication

**1. FSD Compliance (10/10)**
- Complete entity isolation
- No cross-domain coupling
- Clear public APIs
- Follows FSD philosophy: "Explicit is better than clever"

**2. Domain Independence**
- Expense and income can evolve independently
- Different requirements won't create coupling
- Easy to add expense-specific or income-specific features
- No shared abstractions to maintain

**3. Code Clarity**
- Straightforward, easy-to-understand code
- No generic abstractions to learn
- Clear type safety (ExpenseRecord vs IncomeRecord)
- Better IDE autocomplete and navigation

**4. Low Risk**
- Changes to expense don't affect income
- Bug fixes are isolated
- No hidden coupling through abstractions
- Easy to refactor individual domains

#### Duplication Statistics

**Current Duplication:**
- 2 entities (expense, income): ~336 lines
- 14 features (7 pairs): ~700-900 lines
- 4 widgets (2 pairs): ~200-300 lines
- **Total: ~1200-1500 lines (~10-12% of codebase)**

**Why This is Acceptable:**
- Small codebase (~12,000 lines total)
- Duplication is **intentional** and **documented**
- Maintains architectural purity
- Cost of duplication < cost of abstraction complexity

#### Abstraction Decision Matrix

| Code Type | Abstract? | Location | Reason |
|-----------|-----------|----------|---------|
| **Pure utilities** | ✅ Yes | `shared/lib/` | No business logic, reusable |
| **UI components** | ✅ Yes | `shared/ui/` | Generic, no domain knowledge |
| **Infrastructure** | ✅ Yes | `shared/api/` | Database setup, generic |
| **CRUD operations** | ❌ No | `entities/*/api/` | Domain-specific, entity-coupled |
| **Entity services** | ❌ No | `entities/*/` | Business logic, domain rules |
| **Feature logic** | ❌ No | `features/*/` | User interactions, domain-specific |
| **Domain calculations** | ❌ No | `entities/*/model/` | Business rules, may diverge |

#### When to Abstract vs Duplicate

**✅ Abstract to Shared (Pure Utilities Only):**
```typescript
// ✅ GOOD: Pure utility, no business logic
export function formatAmount(amount: number) {
  return new Intl.NumberFormat('vi-VN').format(amount);
}

// ✅ GOOD: Generic helper, no domain knowledge
export function generateUUID(): string {
  return crypto.randomUUID();
}

// ✅ GOOD: Pure formatting utility
export function formatDate(date: Date): string {
  return format(date, 'dd/MM/yyyy');
}
```

**❌ Keep Duplicated (Domain Logic):**
```typescript
// ✅ DUPLICATE: Entity-specific CRUD
// entities/expense/api/expense.service.ts
export const expenseService = {
  async getAll(): Promise<ExpenseRecord[]> {
    return await db.expenses.orderBy("date").reverse().toArray();
  },
  async add(expense: Omit<ExpenseRecord, "id" | "createdAt" | "updatedAt">): Promise<ExpenseRecord> {
    const now = new Date();
    const newExpense: ExpenseRecord = {
      ...expense,
      id: generateUUID(),
      createdAt: now,
      updatedAt: now,
    };
    await db.expenses.add(newExpense);
    return newExpense;
  },
  // ... more methods
};

// entities/income/api/income.service.ts
export const incomeService = {
  async getAll(): Promise<IncomeRecord[]> {
    return await db.incomes.orderBy("date").reverse().toArray();
  },
  async add(income: Omit<IncomeRecord, "id" | "createdAt" | "updatedAt">): Promise<IncomeRecord> {
    const now = new Date();
    const newIncome: IncomeRecord = {
      ...income,
      id: generateUUID(),
      createdAt: now,
      updatedAt: now,
    };
    await db.incomes.add(newIncome);
    return newIncome;
  },
  // ... more methods
};
```

#### Why Not Create Generic `createCRUDService<T>()`?

**We explicitly avoid this pattern:**
```typescript
// ❌ BAD: Violates FSD - business logic in shared layer
// shared/api/create-crud-service.ts
export function createCRUDService<T>(tableName: string) {
  return {
    async getAll(): Promise<T[]> {
      return await db[tableName].toArray();  // Business logic!
    },
    // ...
  };
}

// entities/expense/api/expense.service.ts
export const expenseService = createCRUDService<ExpenseRecord>('expenses');
```

**Why this is bad:**
1. ❌ **Violates FSD**: Business logic in shared layer
2. ❌ **Shared knows domains**: `shared/` knows about expense/income tables
3. ❌ **Hidden coupling**: Changes affect both entities
4. ❌ **Reduced flexibility**: Hard to customize per entity
5. ❌ **Abstraction tax**: Generic code is harder to understand
6. ❌ **FSD Compliance**: Drops from 10/10 to 3/10

#### Trade-off Analysis

**Current Approach (Duplication):**
- ✅ FSD Compliance: 10/10
- ✅ Domain Independence: High
- ✅ Code Clarity: High
- ✅ Flexibility: High
- ❌ Code Size: +1200 lines
- ❌ Maintenance: Apply fixes twice

**Alternative (Abstraction):**
- ❌ FSD Compliance: 3/10
- ❌ Domain Independence: Low (coupled through abstraction)
- ❌ Code Clarity: Medium (generics add complexity)
- ❌ Flexibility: Low (shared abstraction constrains both)
- ✅ Code Size: -1200 lines
- ✅ Maintenance: Single fix point

**Conclusion:** The architectural benefits outweigh the maintenance cost.

#### Maintenance Strategy

**When fixing bugs:**
1. Fix in one entity (e.g., expense)
2. Test thoroughly
3. Apply same fix to other entity (income)
4. Test both entities
5. Consider if fix reveals need for refactoring

**When adding features:**
1. Implement in one entity first
2. Validate design
3. Implement in other entity
4. Keep implementations consistent (copy-paste is OK!)

**When requirements diverge:**
- This duplication strategy makes divergence **easy**
- No need to "break" shared abstractions
- Each entity evolves independently
- Validates our architectural choice

#### Real-World Example

```typescript
// If expense needs tax deduction tracking:
// entities/expense/api/expense.service.ts
export interface ExpenseRecord {
  // ... existing fields
  isTaxDeductible?: boolean;  // New field
  taxCategory?: string;
}

// Income stays unchanged - no coupling!
// entities/income/api/income.service.ts
export interface IncomeRecord {
  // ... existing fields (no tax fields needed)
}
```

This independence is only possible because we **duplicated** instead of abstracted.

#### Summary

**Our Philosophy:**
- **Duplication > Abstraction** when it preserves domain boundaries
- **Explicit > DRY** when it improves FSD compliance
- **Simple > Clever** when it improves maintainability
- **Independence > Code Size** when it enables flexibility

**Key Metrics:**
- FSD Compliance: 10/10 ✅
- Duplication: ~1200 lines (~10% of codebase) ✅ Acceptable
- Domain Independence: Perfect ✅
- Future Flexibility: High ✅

**This is intentional architecture, not technical debt.**

---

## Database Architecture

### Dexie + IndexedDB

**Why Dexie?**:
- Offline-first capability
- Live queries with React hooks
- Efficient indexing
- Type-safe

### Schema

```typescript
// src/shared/api/db.ts
class ExpenseDatabase extends Dexie {
  expenses!: EntityTable<ExpenseRecord, 'id'>;
  incomes!: EntityTable<IncomeRecord, 'id'>;

  constructor() {
    super('ExpenseManagerDB');

    this.version(1).stores({
      expenses: 'id, createdAt, date, category, [category+date+createdAt], [date+createdAt], *description',
      incomes: 'id, createdAt, date, category, [category+date+createdAt], [date+createdAt], *description',
    });
  }
}
```

**Indexes Explained**:
- `id` - Primary key (UUID)
- `createdAt` - For "recent" queries
- `date` - For date-based filtering
- `category` - For category filtering
- `[category+date+createdAt]` - Compound index for efficient category + date filtering
- `[date+createdAt]` - Compound index for date range queries
- `*description` - Full-text search index

### Service Pattern

```typescript
// entities/expense/api/expense.service.ts
export const expenseService = {
  async getAll(): Promise<ExpenseRecord[]> {
    return await db.expenses.orderBy('date').reverse().toArray();
  },

  async add(expense: Omit<ExpenseRecord, 'id' | 'createdAt' | 'updatedAt'>): Promise<ExpenseRecord> {
    const now = new Date();
    const newExpense = {
      ...expense,
      id: generateUUID(),
      createdAt: now,
      updatedAt: now,
    };
    await db.expenses.add(newExpense);
    return newExpense;
  },

  // ... other CRUD operations
};
```

### Live Queries

```typescript
// entities/expense/model/use-expense-query.ts
import { useLiveQuery } from 'dexie-react-hooks';

export function useRecentExpenses(limit = 5): ExpenseRecord[] {
  return useLiveQuery(
    () => expenseService.getRecent(limit),
    [limit]
  ) ?? [];
}
```

**Benefits**:
- Automatic re-renders when data changes
- No manual state management needed
- Optimized updates (only changed components re-render)

---

## State Management Strategy

### Levels of State

1. **Local Component State** (`useState`, `useReducer`)
   - Use for: UI state (open/closed, input values)
   - Scope: Single component

2. **Shared Component State** (`props`, `context`)
   - Use for: State shared by nearby components
   - Scope: Component tree

3. **Client State** (`Zustand`)
   - Use for: Global app state (theme, user preferences)
   - Scope: Entire application

4. **Server State** (`Dexie + useLiveQuery`)
   - Use for: Persistent data (expenses, incomes)
   - Scope: Database-backed state

### Routing State

**Managed by React Router** (`react-router-dom`)
- URL state (current route)
- Browser history (back/forward stack)
- Location state (passed between routes)

**Benefits**:
- Automatic persistence (URL is the source of truth)
- Shareable state (copy URL to share page)
- Browser integration (back/forward buttons work)

**Access Pattern**:
```typescript
// Must be inside RouterProvider context
const location = useLocation();
const navigate = useNavigate();
```

### When to Use What

```typescript
// ✅ Local state for UI
function ExpenseForm() {
  const [isOpen, setIsOpen] = useState(false);
}

// ✅ Context for theme
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

// ✅ Zustand for global app state
const useApiKeyStore = create((set) => ({
  apiKey: '',
  setApiKey: (key) => set({ apiKey: key }),
}));

// ✅ Dexie for persistent data
function ExpenseList() {
  const expenses = useLiveQuery(() => db.expenses.toArray());
}
```

---

## Performance Optimizations

### 1. Compound Indexes

```typescript
// Efficient: Uses compound index [category+date+createdAt]
db.expenses
  .where('[category+date+createdAt]')
  .between([category, dateFrom, minKey], [category, dateTo, maxKey])
  .toArray();

// Inefficient: No index, full table scan + filter
db.expenses
  .toArray()
  .then(items => items.filter(e => e.category === category && e.date >= dateFrom));
```

### 2. Pagination

```typescript
// Load only current page
const { items, total } = await expenseService.queryExpensesPaginated({
  page: 1,
  limit: 20,
  // ...filters
});
```

### 3. Memoization

```typescript
// Expensive calculation
const financialStats = useMemo(
  () => calculateFinancialStats(expenses, incomes),
  [expenses, incomes]
);

// Prevent unnecessary re-renders
const ExpenseItem = memo(({ expense }) => {
  // ...
});
```

### 4. Debounced Search

```typescript
import { useDebounce } from 'use-debounce';

function SearchInput() {
  const [searchText, setSearchText] = useState('');
  const [debouncedSearch] = useDebounce(searchText, 300);

  // Only query after user stops typing for 300ms
  const results = useExpenseSearch(debouncedSearch);
}
```

---

## Testing Strategy

### Unit Tests
- **Shared utilities**: `format.ts`, `calculate-stats.ts`
- **Services**: `expense.service.ts`, `income.service.ts`
- **Pure components**: Stateless UI components

### Integration Tests
- **Features**: Complete user flows (add → save → display)
- **Database operations**: CRUD + queries

### E2E Tests
- **Critical paths**: Add expense → View dashboard → Export data
- **PWA functionality**: Offline mode, installation

---

## Architecture Checklist

Before committing code, verify:

- [ ] File name is kebab-case
- [ ] Component name is PascalCase
- [ ] Hook name is camelCase
- [ ] Imports respect layer hierarchy (downward only)
- [ ] No cross-layer imports within same layer
- [ ] Public API (index.ts) exists for the slice
- [ ] No expense/income mixing (separate types, components, services)
- [ ] Used `@/` import alias (not relative paths)
- [ ] TypeScript compiles (`pnpm type-check`)
- [ ] FSD architecture validated (`pnpm lint:fsd`)
- [ ] Follows FSD principles

---

## Common Pitfalls

### ❌ Pitfall #1: Bypassing Public API
```typescript
// Wrong
import { expenseService } from '@/entities/expense/api/expense.service';

// Correct
import { expenseService } from '@/entities/expense';
```

### ❌ Pitfall #2: Cross-Feature Imports
```typescript
// Wrong: features/add-expense importing from features/edit-expense
import { useEditExpense } from '@/features/edit-expense';

// Correct: Both features import from entities
import { expenseService } from '@/entities/expense';
```

### ❌ Pitfall #3: Business Logic in Shared
```typescript
// Wrong: shared/lib/expense-calculator.ts
export function calculateExpenseTax(expense: ExpenseRecord) { ... }

// Correct: entities/expense/model/expense-calculator.ts
export function calculateExpenseTax(expense: ExpenseRecord) { ... }
```

### ❌ Pitfall #4: Mixed Types
```typescript
// Wrong
type TransactionRecord = ExpenseRecord | IncomeRecord;

// Correct
// Duplicate logic if needed, or use separate functions
function calculateExpenseStats(expenses: ExpenseRecord[]) { ... }
function calculateIncomeStats(incomes: IncomeRecord[]) { ... }
```

---

## Further Reading

- [Feature-Sliced Design Official Docs](https://feature-sliced.design/)
- [Dexie.js Documentation](https://dexie.org/)
- [React Architecture Best Practices](https://reactjs.org/docs/thinking-in-react.html)

---

**Remember**: Architecture is about making the code easier to understand, maintain, and scale. When in doubt, follow FSD principles and keep layers separated.
