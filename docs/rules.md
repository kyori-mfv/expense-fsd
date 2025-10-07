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
ai-expense-input.tsx
```

❌ **Incorrect**:
```
AddExpenseForm.tsx       // PascalCase
useExpenseQuery.ts       // camelCase
expenseCategorySelect.tsx // camelCase
AIExpenseInput.tsx       // PascalCase
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
export { AIExpenseInput } from './ui/ai-expense-input';
export { ExpenseForm } from './ui/expense-form';
// Internal hooks NOT exported if only used internally
```

**Consumers MUST import from public API**:
```typescript
// ✅ Correct
import { AIExpenseInput } from '@/features/add-expense';

// ❌ Wrong
import { AIExpenseInput } from '@/features/add-expense/ui/ai-expense-input';
```

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
