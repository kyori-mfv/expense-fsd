# 📏 Project Rules & Guidelines

This document outlines mandatory rules and best practices for contributing to this project.

---

## 🚨 Mandatory Rules

### 1. File Naming Convention: kebab-case

**ALL files and folders MUST use kebab-case**:

✅ **Correct**:
```
add-expense-form.tsx
use-expense-query.ts
expense-category-select.tsx
expense-form.tsx
```

❌ **Incorrect**:
```
AddExpenseForm.tsx       // PascalCase
useExpenseQuery.ts       // camelCase
expenseCategorySelect.tsx // camelCase
ExpenseForm.tsx          // PascalCase
```

**Exceptions**:
- Component exports use PascalCase:
  ```typescript
  // File: expense-item.tsx
  export function ExpenseItem() { /* ... */ }
  ```
- Hook functions use camelCase:
  ```typescript
  // File: use-add-expense.ts
  export function useAddExpense() { /* ... */ }
  ```

---

### 2. Feature-Sliced Design (FSD) Architecture

**Layer Hierarchy** (MUST be respected):
```
app → pages → widgets → features → entities → shared
```

**Rules**:
1. ✅ Layers can ONLY import from layers below them
2. ❌ Slices within a layer CANNOT import from each other
3. ✅ Every slice MUST have an `index.ts` public API
4. ❌ Shared layer MUST NOT contain business logic

**Valid Imports**:
```typescript
// ✅ Downward imports
import { expenseService } from '@/entities/expense';
import { formatAmount } from '@/shared/lib/format';
```

**Invalid Imports**:
```typescript
// ❌ Upward imports
import { AddExpenseForm } from '@/features/add-expense'; // in entities layer

// ❌ Cross-layer imports (same level)
import { useEditExpense } from '@/features/edit-expense'; // in features/add-expense
```

---

### 3. Complete Expense/Income Separation

**Philosophy**: This project intentionally duplicates ~1200-1500 lines of code to maintain perfect FSD compliance and domain independence. This is **architectural design**, not technical debt.

**FORBIDDEN Patterns**:
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
  return [...expenses, ...income];
}
```

**Required Patterns**:
```typescript
// ✅ Separate types
interface ExpenseRecord { ... }
interface IncomeRecord { ... }

// ✅ Separate components
function ExpenseItem({ expense }: { expense: ExpenseRecord }) {}
function IncomeItem({ income }: { income: IncomeRecord }) {}

// ✅ Separate services
export const expenseService = { ... };
export const incomeService = { ... };

// ✅ Separate calculations
function calculateExpenseCategoryStats(expenses: ExpenseRecord[]) {}
function calculateIncomeCategoryStats(incomes: IncomeRecord[]) {}
```

---

### 4. Verification Before Completion

**MUST run before marking any task as complete**:

```bash
pnpm verify
```

This command runs:
1. `pnpm lint` - Biome linter
2. `pnpm type-check` - TypeScript type checking
3. `pnpm build` - Production build

**All three MUST pass** before:
- Committing code
- Creating pull requests
- Marking tasks as done

---

### 5. TypeScript Usage

**Rules**:
- ✅ Use TypeScript for ALL files (`.ts`, `.tsx`)
- ✅ Define interfaces for all data structures
- ✅ Use type inference where clear
- ❌ NO `any` type (use `unknown` if needed)
- ❌ NO type assertions unless absolutely necessary
- ✅ Enable strict mode (already configured)

**Examples**:
```typescript
// ✅ Correct
interface ExpenseFormData {
  amount: number;
  category: string;
  description: string;
  date: Date;
}

function addExpense(data: ExpenseFormData): Promise<ExpenseRecord> {
  // ...
}

// ❌ Wrong
function addExpense(data: any): any {
  // ...
}
```

---

### 6. Import Path Aliases

**MUST use `@/` alias, NOT relative paths**:

```typescript
// ✅ Correct
import { Button } from '@/shared/ui/button';
import { expenseService } from '@/entities/expense';
import { formatAmount } from '@/shared/lib/format';

// ❌ Wrong
import { Button } from '../../../shared/ui/button';
import { expenseService } from '../../entities/expense';
```

---

### 7. Public API Pattern

**Every slice MUST export via `index.ts`**:

```typescript
// features/add-expense/index.ts
export { ExpenseForm } from './ui/expense-form';
// Internal hooks NOT exported if only used internally
```

**Consumers MUST import from public API**:
```typescript
// ✅ Correct
import { ExpenseForm } from '@/features/add-expense';

// ❌ Wrong
import { ExpenseForm } from '@/features/add-expense/ui/expense-form';
```

---

## 🎨 UI Component Selection: Ionic vs shadcn

### When to Use Ionic Components

**Use Ionic for mobile-native interactions**:

```typescript
// ✅ Use Ionic for:
- IonPage / IonContent    → Page structure & scroll management
- IonButton               → Native buttons with ripple effects
- IonInput / IonTextarea  → Native inputs with floating labels
- IonList / IonItem       → Native lists with swipe gestures
- IonItemSliding          → Swipe-to-delete actions
- IonIcon                 → Icon rendering (ionicons library)
- IonToast                → Native toast notifications
- IonModal                → Native modals with sheet behavior
- IonTabBar               → Bottom navigation with haptics
- IonSegment              → Segmented controls
- IonRefresher            → Pull-to-refresh (if needed)
```

**Example**:
```typescript
// ✅ Correct: Native mobile form
<IonPage>
  <IonContent scrollY={true} scrollEvents={true}>
    <form onSubmit={handleSubmit}>
      <IonList>
        <IonItem>
          <IonInput
            label="Amount"
            type="number"
            inputMode="numeric"
            placeholder="Enter amount"
          />
        </IonItem>
        <IonItem>
          <IonButton expand="block" type="submit">
            Save
          </IonButton>
        </IonItem>
      </IonList>
    </form>
  </IonContent>
</IonPage>
```

### When to Use shadcn Components

**Use shadcn for modern web UI and data visualization**:

```typescript
// ✅ Use shadcn for:
- Card                    → Dashboard cards, stat containers
- Badge                   → Category badges, status indicators
- Separator               → Visual section dividers
- Dialog                  → Confirmation dialogs (web-style)
- Popover                 → Filter menus, dropdown content
- Calendar                → Date picker for custom ranges
- Avatar                  → User profile images
- Accordion               → Collapsible sections
- Tabs                    → Content organization (web context)
```

**Example**:
```typescript
// ✅ Correct: Modern dashboard UI
<div className="grid gap-4 md:grid-cols-2">
  <Card className="p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-muted-foreground">Total Income</p>
        <h3 className="text-2xl font-bold">{formatAmount(totalIncome)}</h3>
      </div>
      <Badge variant="success">
        <TrendingUp className="w-4 h-4" />
      </Badge>
    </div>
  </Card>
  <Card className="p-6">
    {/* More stats... */}
  </Card>
</div>
```

### Decision Matrix

| Component Type | Use Ionic | Use shadcn | Reason |
|---------------|-----------|------------|---------|
| Forms & Inputs | ✅ | ❌ | Keyboard handling, native input behavior |
| Buttons (actions) | ✅ | ❌ | Ripple effects, platform-specific styling |
| Lists & Items | ✅ | ❌ | Swipe gestures, native feel |
| Page Structure | ✅ | ❌ | Scroll management, safe area handling |
| Navigation | ✅ | ❌ | Tab bar, routing with haptics |
| Toasts | ✅ | ❌ | Native positioning, platform styling |
| Dashboard Cards | ❌ | ✅ | Modern web aesthetics |
| Data Viz | ❌ | ✅ | Charts, stats, metrics |
| Badges & Labels | ❌ | ✅ | Flexible styling, custom designs |
| Dialogs (confirm) | ❌ | ✅ | Web-style confirmations |
| Popovers & Filters | ❌ | ✅ | Advanced positioning, rich content |

### ❌ Common Mistakes

```typescript
// ❌ Wrong: Using shadcn Button in forms
<form>
  <input type="text" />
  <Button type="submit">Save</Button>  // NO! Use IonButton
</form>

// ✅ Correct: Using IonButton in forms
<form>
  <IonInput type="text" />
  <IonButton type="submit">Save</IonButton>
</form>

// ❌ Wrong: Using Ionic for dashboard cards
<IonCard>
  <IonCardHeader>
    <IonCardTitle>Stats</IonCardTitle>
  </IonCardHeader>
</IonCard>

// ✅ Correct: Using shadcn Card for dashboard
<Card>
  <CardHeader>
    <CardTitle>Stats</CardTitle>
  </CardHeader>
</Card>
```

### Hybrid Approach Benefits

**Why combine both?**:
- ✅ Native mobile feel where users expect it (forms, lists, navigation)
- ✅ Modern web aesthetics for data visualization
- ✅ Best performance (GPU-accelerated Ionic components)
- ✅ Platform consistency (iOS/Android conventions)
- ✅ Flexible styling (Tailwind works with both)

---

## 📝 Coding Conventions

### JavaScript/TypeScript Style

#### 1. Variables & Constants

```typescript
// ✅ Use const by default
const maxAmount = 1000000;
const category = 'Food';

// ✅ Use let only when reassignment is needed
let total = 0;
total += expense.amount;

// ❌ Never use var
var x = 10; // NO!
```

#### 2. Functions

```typescript
// ✅ Use arrow functions for simple operations
const add = (a: number, b: number) => a + b;

// ✅ Use function declarations for components/hooks
export function ExpenseItem({ expense }: ExpenseItemProps) {
  // ...
}

export function useAddExpense() {
  // ...
}

// ✅ Use async/await, not promises
async function loadExpenses() {
  const expenses = await expenseService.getAll();
  return expenses;
}

// ❌ Avoid promise chains
function loadExpenses() {
  return expenseService.getAll()
    .then(expenses => expenses)
    .then(data => data); // Harder to read
}
```

#### 3. Array Operations

```typescript
// ✅ Use array methods
const amounts = expenses.map(e => e.amount);
const filtered = expenses.filter(e => e.amount > 1000);
const total = expenses.reduce((sum, e) => sum + e.amount, 0);

// ❌ Avoid manual loops when array methods work
const amounts = [];
for (let i = 0; i < expenses.length; i++) {
  amounts.push(expenses[i].amount);
}
```

#### 4. Object Destructuring

```typescript
// ✅ Use destructuring
function ExpenseItem({ expense }: { expense: ExpenseRecord }) {
  const { amount, category, description } = expense;
  return <div>{description}: {amount}</div>;
}

// ❌ Avoid repetitive property access
function ExpenseItem({ expense }: { expense: ExpenseRecord }) {
  return <div>{expense.description}: {expense.amount}</div>;
}
```

#### 5. Optional Chaining & Nullish Coalescing

```typescript
// ✅ Use optional chaining
const name = user?.profile?.name;
const expenses = data?.expenses ?? [];

// ❌ Avoid manual checks
const name = user && user.profile && user.profile.name;
const expenses = data && data.expenses ? data.expenses : [];
```

#### 6. Template Literals

```typescript
// ✅ Use template literals
const message = `Total: ${formatAmount(total)} VND`;

// ❌ Avoid string concatenation
const message = 'Total: ' + formatAmount(total) + ' VND';
```

---

### Navigation Conventions

#### 1. Routing

```typescript
// ✅ Define routes in app/app.tsx only
function AppRoutes() {
  return (
    <Routes>
      <Route path="/page" element={<PageTransition><Page /></PageTransition>} />
    </Routes>
  );
}

// ❌ Never define routes in page components
export function MyPage() {
  return <Routes>...</Routes>; // NO!
}
```

#### 2. Navigation Links

```typescript
// ✅ Use NavLink for navigation
import { NavLink } from 'react-router-dom';

<NavLink to="/expenses">
  Expenses
</NavLink>

// ❌ Don't use Button with onClick for navigation
<Button onClick={() => setPage("expenses")}>  // NO!
  Expenses
</Button>

// ❌ Don't use plain Link (use NavLink for active state)
<Link to="/expenses">Expenses</Link>  // Use NavLink instead
```

#### 3. Active State

```typescript
// ✅ Use NavLink's isActive prop
<NavLink
  to="/expenses"
  className={({ isActive }) => cn(
    "base-styles",
    isActive && "active-styles"
  )}
>
  {({ isActive }) => (
    <span className={isActive ? "font-bold" : ""}>
      Expenses
    </span>
  )}
</NavLink>

// ❌ Don't manage active state manually
const [active, setActive] = useState("expenses"); // NO!
```

#### 4. Route Transitions

```typescript
// ✅ Always wrap page routes with PageTransition
<Route
  path="/expenses"
  element={
    <PageTransition>
      <ExpensePage />
    </PageTransition>
  }
/>

// ❌ Don't render pages directly
<Route path="/expenses" element={<ExpensePage />} /> // Missing transition
```

---

### Animation Conventions

#### 1. When to Animate

```typescript
// ✅ Appropriate use cases
- Page transitions (use PageTransition)
- Modal/dialog entry and exit
- List item additions/removals
- Notification toasts
- Accordion expand/collapse

// ❌ Avoid animating
- Every state change (too distracting)
- Form input values (accessibility issue)
- Hover states (CSS transitions sufficient)
- Loading spinners (use CSS animations)
```

#### 2. Animation Performance

```typescript
// ✅ Use GPU-accelerated properties
const animation = {
  transform: "translateY(10px)",  // GPU-accelerated
  opacity: 0,                      // GPU-accelerated
};

// ✅ Add willChange hint for complex animations
<motion.div style={{ willChange: "transform, opacity" }}>

// ❌ Avoid animating expensive properties
const badAnimation = {
  width: "100%",    // Causes layout reflow
  height: "500px",  // Causes layout reflow
  margin: "20px",   // Causes layout reflow
  left: "100px",    // Not GPU-accelerated
};
```

#### 3. Animation Duration

```typescript
// ✅ Keep animations fast and responsive
const transition = { duration: 0.2 };     // Good: 200ms
const transition = { duration: 0.3 };     // OK: 300ms

// ❌ Avoid slow animations
const transition = { duration: 1.0 };     // Too slow
const transition = { duration: 0.05 };    // Too fast to perceive
```

#### 4. Accessibility

```typescript
// ✅ Always respect user preferences
const shouldReduceMotion =
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const transition = shouldReduceMotion
  ? { duration: 0 }           // Instant for accessibility
  : { duration: 0.2 };        // Smooth animation

// ❌ Never force animations
const transition = { duration: 0.3 };  // Ignores user preference
```

#### 5. Framer Motion Best Practices

```typescript
// ✅ Use variants for reusable animation states
const variants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

<motion.div variants={variants} />

// ✅ Use AnimatePresence for exit animations
<AnimatePresence mode="wait">
  <Routes>...</Routes>
</AnimatePresence>

// ✅ Use motion.div, not div with motion props
<motion.div animate={{ x: 100 }} />  // Correct

// ❌ Don't use motion props on regular elements
<div animate={{ x: 100 }} />  // Won't work
```

---

### React Conventions

#### 1. Component Structure

```typescript
// ✅ Correct order
import { useState, useEffect } from 'react'; // React imports first
import { Button } from '@/shared/ui/button'; // External components
import { expenseService } from '@/entities/expense'; // Internal imports
import type { ExpenseRecord } from '@/shared/types'; // Types last

interface ExpenseItemProps {
  expense: ExpenseRecord;
  onEdit?: (id: string) => void;
}

export function ExpenseItem({ expense, onEdit }: ExpenseItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // ...
  }, []);

  const handleClick = () => {
    // ...
  };

  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

#### 2. Hooks Rules

```typescript
// ✅ Call hooks at top level
export function MyComponent() {
  const [state, setState] = useState(0);
  const data = useLiveQuery(() => db.expenses.toArray());

  // ...
}

// ❌ Don't call hooks conditionally
export function MyComponent() {
  if (condition) {
    const [state, setState] = useState(0); // NO!
  }
}
```

#### 3. Props Naming

```typescript
// ✅ Use descriptive names
interface ExpenseItemProps {
  expense: ExpenseRecord;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  showActions?: boolean;
}

// ❌ Avoid generic names
interface ExpenseItemProps {
  data: any;
  onClick?: () => void;
  show?: boolean;
}
```

#### 4. Event Handlers

```typescript
// ✅ Prefix with "handle"
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  // ...
};

const handleDelete = async (id: string) => {
  await expenseService.delete(id);
};

// Usage
<form onSubmit={handleSubmit}>
  <Button onClick={() => handleDelete(expense.id)}>Delete</Button>
</form>
```

---

### Database Conventions

#### 1. Service Pattern

```typescript
// ✅ Export service object with methods
export const expenseService = {
  async getAll(): Promise<ExpenseRecord[]> {
    return await db.expenses.toArray();
  },

  async getById(id: string): Promise<ExpenseRecord | undefined> {
    return await db.expenses.where('id').equals(id).first();
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

  // ... more methods
};
```

#### 2. Query Hooks

```typescript
// ✅ Use useLiveQuery for reactive queries
export function useRecentExpenses(limit = 5): ExpenseRecord[] {
  return useLiveQuery(
    () => expenseService.getRecent(limit),
    [limit]
  ) ?? [];
}

// ❌ Don't use useState + useEffect
export function useRecentExpenses(limit = 5): ExpenseRecord[] {
  const [expenses, setExpenses] = useState<ExpenseRecord[]>([]);

  useEffect(() => {
    expenseService.getRecent(limit).then(setExpenses);
  }, [limit]);

  return expenses; // Won't auto-update on DB changes
}
```

---

### Styling Conventions

#### 1. Tailwind CSS

```tsx
// ✅ Use utility classes
<div className="flex items-center gap-4 p-4 rounded-lg bg-card">
  <Button className="w-full">Submit</Button>
</div>

// ❌ Avoid inline styles
<div style={{ display: 'flex', gap: '16px' }}>
  <Button style={{ width: '100%' }}>Submit</Button>
</div>
```

#### 2. Conditional Classes

```tsx
import { cn } from '@/shared/lib/utils';

// ✅ Use cn() utility
<div className={cn('p-4 rounded', isActive && 'bg-primary', error && 'border-red-500')}>
  Content
</div>

// ❌ String concatenation
<div className={'p-4 rounded' + (isActive ? ' bg-primary' : '') + (error ? ' border-red-500' : '')}>
  Content
</div>
```

---

## 🔍 Code Review Checklist

Before submitting PR, verify:

### Architecture
- [ ] Follows FSD layer hierarchy
- [ ] No cross-layer imports (same level)
- [ ] Uses public APIs (index.ts)
- [ ] No expense/income mixing

### Code Quality
- [ ] File names are kebab-case
- [ ] Component names are PascalCase
- [ ] Hook names are camelCase
- [ ] Uses `@/` import alias
- [ ] No `any` types
- [ ] No console.log (except for debugging, should be removed)

### TypeScript
- [ ] All types defined
- [ ] No type errors (`pnpm type-check`)
- [ ] Proper return types on functions

### Testing
- [ ] Linting passes (`pnpm lint`)
- [ ] Type checking passes (`pnpm type-check`)
- [ ] Build succeeds (`pnpm build`)
- [ ] Manual testing completed

### Git
- [ ] Commit messages follow format
- [ ] Branch name is descriptive
- [ ] No merge conflicts
- [ ] PR description is clear

---

## 🚫 Common Mistakes to Avoid

### 1. Bypassing Public API
```typescript
// ❌ Wrong
import { expenseService } from '@/entities/expense/api/expense.service';

// ✅ Correct
import { expenseService } from '@/entities/expense';
```

### 2. Cross-Feature Imports
```typescript
// ❌ Wrong: features/add-expense importing from features/edit-expense
import { useEditExpense } from '@/features/edit-expense';

// ✅ Correct: Both import from entities
import { expenseService } from '@/entities/expense';
```

### 3. Business Logic in Shared
```typescript
// ❌ Wrong: shared/lib/expense-calculator.ts
export function calculateExpenseTax(expense: ExpenseRecord) { ... }

// ✅ Correct: entities/expense/model/expense-calculator.ts
export function calculateExpenseTax(expense: ExpenseRecord) { ... }
```

### 4. Using `any` Type
```typescript
// ❌ Wrong
function processData(data: any) {
  return data.value;
}

// ✅ Correct
interface DataType {
  value: number;
}

function processData(data: DataType) {
  return data.value;
}
```

### 5. Not Using Live Queries
```typescript
// ❌ Wrong: Manual state management
const [expenses, setExpenses] = useState([]);
useEffect(() => {
  db.expenses.toArray().then(setExpenses);
}, []);

// ✅ Correct: Live query
const expenses = useLiveQuery(() => db.expenses.toArray()) ?? [];
```

---

## 🔄 Code Duplication Guidelines

### Philosophy: Duplication > Abstraction (for Domain Logic)

This project **intentionally duplicates** ~1200-1500 lines of code across expense/income domains. This is a conscious architectural decision to maintain FSD compliance and domain independence.

### When to Duplicate (REQUIRED)

**✅ MUST duplicate these:**

```typescript
// ✅ Entity services - database operations
// entities/expense/api/expense.service.ts
export const expenseService = {
  async getAll(): Promise<ExpenseRecord[]> { /* ... */ },
  async add(expense: ExpenseRecord): Promise<void> { /* ... */ },
};

// entities/income/api/income.service.ts
export const incomeService = {
  async getAll(): Promise<IncomeRecord[]> { /* ... */ },
  async add(income: IncomeRecord): Promise<void> { /* ... */ },
};

// ✅ Feature hooks - user interactions
// features/add-expense/model/use-add-expense.ts
export function useAddExpense() { /* ... */ }

// features/add-income/model/use-add-income.ts
export function useAddIncome() { /* ... */ }

// ✅ Domain calculations
// entities/expense/model/calculate-expense-stats.ts
export function calculateExpenseStats(expenses: ExpenseRecord[]) { /* ... */ }

// entities/income/model/calculate-income-stats.ts
export function calculateIncomeStats(incomes: IncomeRecord[]) { /* ... */ }
```

**Why?**
- Maintains FSD compliance (10/10)
- Enables independent domain evolution
- No hidden coupling
- Clear type safety

### When to Abstract (ALLOWED)

**✅ CAN abstract these to `shared/`:**

```typescript
// ✅ Pure utilities - no business logic
// shared/lib/format.ts
export function formatAmount(amount: number): string {
  return new Intl.NumberFormat('vi-VN').format(amount);
}

// ✅ Generic helpers - no domain knowledge
// shared/lib/utils.ts
export function generateUUID(): string {
  return crypto.randomUUID();
}

// ✅ UI components - no domain logic
// shared/ui/button.tsx
export function Button({ children, onClick }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>;
}
```

**Why?**
- Pure functions with no business logic
- No knowledge of expense or income domains
- Generic, reusable across entire app

### When NOT to Abstract (FORBIDDEN)

**❌ NEVER abstract these:**

```typescript
// ❌ FORBIDDEN: Generic CRUD service in shared
// shared/api/create-crud-service.ts
export function createCRUDService<T>(tableName: string) {
  return {
    async getAll(): Promise<T[]> {
      return await db[tableName].toArray();  // Business logic in shared!
    },
  };
}

// ❌ FORBIDDEN: Combined entity types
// shared/types/transaction.ts
export type Transaction = ExpenseRecord | IncomeRecord;

// ❌ FORBIDDEN: Shared domain components
// shared/components/transaction-item.tsx
export function TransactionItem({
  transaction
}: {
  transaction: ExpenseRecord | IncomeRecord
}) {
  // Mixing domains!
}
```

**Why NOT?**
- Violates FSD (business logic in shared)
- Creates coupling between domains
- Reduces flexibility
- Drops FSD compliance from 10/10 to 3/10

### Duplication Checklist

Before abstracting code, ask:

1. **Is it pure?**
   - ✅ No database access → Can abstract
   - ❌ Uses `db.expenses` or `db.incomes` → Must duplicate

2. **Does it have domain knowledge?**
   - ✅ Generic (works with any type) → Can abstract
   - ❌ Knows about ExpenseRecord/IncomeRecord → Must duplicate

3. **Is it business logic?**
   - ✅ Pure utility (format, validate) → Can abstract
   - ❌ CRUD, calculations, rules → Must duplicate

4. **Would it couple domains?**
   - ✅ Independent utility → Can abstract
   - ❌ Shared by expense & income → Must duplicate

### Copy-Paste is OK!

**When implementing features:**

```typescript
// Step 1: Implement in expense
// features/add-expense/ui/expense-form.tsx
export function ExpenseForm() {
  const { addExpense, isLoading } = useAddExpense();

  const handleSubmit = async (e: React.FormEvent) => {
    // ... implementation
  };

  return <form onSubmit={handleSubmit}>{/* ... */}</form>;
}

// Step 2: Copy-paste to income (this is encouraged!)
// features/add-income/ui/income-form.tsx
export function IncomeForm() {
  const { addIncome, isLoading } = useAddIncome();  // Change name

  const handleSubmit = async (e: React.FormEvent) => {
    // ... same implementation
  };

  return <form onSubmit={handleSubmit}>{/* ... */}</form>;
}
```

**This is good because:**
- ✅ Explicit and clear
- ✅ Easy to customize later
- ✅ No hidden dependencies
- ✅ Maintains FSD compliance

### Maintenance Strategy

**When fixing bugs:**
1. Fix in one domain (test thoroughly)
2. Copy fix to other domain
3. Test both domains independently
4. Commit with clear message

**When refactoring:**
1. Refactor one domain first
2. Validate improvement
3. Apply to other domain
4. Keep implementations aligned

**When adding features:**
1. Design once
2. Implement in expense
3. Test and iterate
4. Copy to income
5. Maintain symmetry

### Trade-off Summary

| Approach | FSD Score | Pros | Cons | Verdict |
|----------|-----------|------|------|---------|
| **Duplication** | 10/10 | Domain independence, clarity, flexibility | +1200 lines | ✅ **Use this** |
| **Abstraction** | 3/10 | -1200 lines | Coupling, complexity, FSD violation | ❌ Avoid |

### Real-World Example

**If expense needs tax tracking:**

```typescript
// ✅ EASY: Modify expense only
// entities/expense/model/expense.schema.ts
export interface ExpenseRecord {
  // ... existing fields
  isTaxDeductible?: boolean;      // New field
  taxCategory?: string;            // New field
}

// Income stays unchanged - no coupling!
// entities/income/model/income.schema.ts
export interface IncomeRecord {
  // ... existing fields (no changes needed)
}
```

**This flexibility validates our duplication strategy.**

### Key Principle

> **"Duplication is far cheaper than the wrong abstraction"**
> — Sandi Metz

In FSD architecture:
- Duplication maintains boundaries ✅
- Abstraction creates coupling ❌
- When in doubt, duplicate ✅

---

## 📚 Additional Guidelines

### Performance
- Use `React.memo` for expensive components
- Use `useMemo` for expensive calculations
- Use `useCallback` for stable function references
- Debounce search inputs
- Paginate large lists

### Accessibility
- Use semantic HTML
- Include ARIA labels where needed
- Ensure keyboard navigation works
- Test with screen readers

### Security
- Never commit API keys
- Validate all user input
- Sanitize data before database operations
- Use HTTPS in production

---

## 🎯 Summary

**Remember these golden rules**:

1. **kebab-case** for ALL files
2. **FSD** layer hierarchy - downward imports only
3. **Separate** expense and income completely
4. **Verify** with `pnpm verify` before committing
5. **TypeScript** - no `any`, proper types
6. **`@/` alias** - no relative imports
7. **Public APIs** - always use `index.ts`

**When in doubt, refer to**:
- [ARCHITECTURE.md](ARCHITECTURE.md) - Architecture details
- [DEVELOPMENT.md](DEVELOPMENT.md) - Development guide
- [Feature-Sliced Design](https://feature-sliced.design/) - Official FSD docs

---

**Following these rules ensures code quality, maintainability, and team collaboration.**
