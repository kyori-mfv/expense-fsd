# FSD Architecture Rules & Guidelines

## 🏗️ Feature-Sliced Design (FSD) Core Principles

### 1. Layer Hierarchy (Import Direction)
```
app → pages → widgets → features → entities → shared
```

**Rule**: Layers can ONLY import from layers below them, never above or sideways.

#### ✅ Valid Imports:
- `pages/expense-page/` can import from `widgets/expense-list/`
- `widgets/expense-list/` can import from `features/search-expenses/`
- `features/add-expense/` can import from `entities/expense/`
- `entities/expense/` can import from `shared/types/`

#### ❌ Invalid Imports:
- `shared/` cannot import from `entities/` or above
- `features/add-expense/` cannot import from `features/edit-expense/` (same layer)
- `entities/expense/` cannot import from `entities/income/` (same layer)
- `widgets/` cannot import from `pages/`

### 2. No Cross-Imports Within Same Layer
Slices in the same layer are **isolated** and cannot import from each other.

**Why?**: Prevents tight coupling and maintains independence.

#### Example:
```typescript
// ❌ WRONG - features cannot import from other features
import { useAddExpense } from "@/features/add-expense";
import { useEditExpense } from "@/features/edit-expense";

// ✅ CORRECT - both import from entities independently
import { expenseService } from "@/entities/expense/api/expense.service";
```

### 3. Public API (index.ts)
Each slice must export its public API via `index.ts`.

#### Structure:
```
features/add-expense/
├── model/
│   └── use-add-expense.ts
├── ui/
│   └── ai-expense-input.tsx
└── index.ts  ← Public API
```

#### index.ts:
```typescript
export { useAddExpense } from "./model/use-add-expense";
export { AIExpenseInput } from "./ui/ai-expense-input";
```

#### Usage:
```typescript
// ✅ CORRECT - import from public API
import { useAddExpense, AIExpenseInput } from "@/features/add-expense";

// ❌ WRONG - bypass public API
import { useAddExpense } from "@/features/add-expense/model/use-add-expense";
```

### 4. Segment Structure
Each slice should use standard segments:

- `model/` - Business logic, state, hooks
- `api/` - Server/database communication
- `ui/` - React components
- `lib/` - Helper utilities specific to this slice

### 5. Shared Layer Has No Business Logic
The `shared/` layer is purely **infrastructure**:
- ✅ UI kit components
- ✅ Utility functions (format, validation)
- ✅ Type definitions
- ✅ Configuration
- ❌ NO business entities
- ❌ NO feature-specific logic

---

## 📁 File Naming Convention: kebab-case

### ✅ Correct:
- `expense-item.tsx`
- `use-add-expense.ts`
- `expense.service.ts`
- `expense.store.ts`
- `ai-expense-input.tsx`
- `expense-category-badge.tsx`

### ❌ Wrong:
- `ExpenseItem.tsx` (PascalCase)
- `useAddExpense.ts` (camelCase)
- `expenseService.ts` (camelCase)
- `Expense.store.ts` (mixed case)

### Component Naming:
```typescript
// File: expense-item.tsx
export function ExpenseItem() {  // ✅ Component is PascalCase
  return <div>...</div>;
}

// File: use-add-expense.ts
export function useAddExpense() {  // ✅ Hook is camelCase
  // ...
}
```

---

## 🚫 Expense/Income Separation Rules

### Critical: NO COMBINED TYPES OR LOGIC

#### ❌ FORBIDDEN:
```typescript
// ❌ NO union types
type TransactionRecord = ExpenseRecord | IncomeRecord;

// ❌ NO type field
interface Record {
  type: "expense" | "income";
}

// ❌ NO shared components
function TransactionItem({ transaction }: { transaction: ExpenseRecord | IncomeRecord }) {
  // ...
}

// ❌ NO combined services
async function getTransactions() {
  const expenses = await getExpenses();
  const income = await getIncome();
  return [...expenses, ...income];  // NO!
}

// ❌ NO combined stores
const useTransactionStore = create((set) => ({
  transactions: [],  // NO!
}));
```

#### ✅ CORRECT:
```typescript
// ✅ Separate types
interface ExpenseRecord { id: string; amount: number; ... }
interface IncomeRecord { id: string; amount: number; ... }

// ✅ Separate components
function ExpenseItem({ expense }: { expense: ExpenseRecord }) { ... }
function IncomeItem({ income }: { income: IncomeRecord }) { ... }

// ✅ Separate services
async function getExpenses() { ... }
async function getIncome() { ... }

// ✅ Separate stores
const useExpenseStore = create((set) => ({ expenses: [] }));
const useIncomeStore = create((set) => ({ income: [] }));

// ✅ Dashboard can query both separately
function Dashboard() {
  const expenses = useExpenseStore((s) => s.expenses);
  const income = useIncomeStore((s) => s.income);
  const netBalance = calculateNet(expenses, income);  // Calculated locally
  // ...
}
```

### When to Duplicate vs. Abstract:
- **Duplicate logic** if it's specific to expense or income
- **Abstract to shared** only if it's pure infrastructure (format, validation)

#### Example:
```typescript
// ✅ SHARED - pure utility
export function formatAmount(amount: number, locale: string) {
  return new Intl.NumberFormat(locale).format(amount);
}

// ✅ DUPLICATE - entity-specific
// entities/expense/api/expense.service.ts
export async function addExpense(expense: ExpenseRecord) { ... }

// entities/income/api/income.service.ts
export async function addIncome(income: IncomeRecord) { ... }
```

---

## 🤖 AI Integration Rules

### Gemini AI Only
- Use **Gemini 2.0 Flash** model
- Single AI provider (no OpenAI, Claude, etc.)
- Parse Vietnamese natural language input
- Category detection via keywords
- Amount parsing (100k = 100000, 1tr = 1000000)

### No Preview After AI Parsing
When user submits text to AI:
1. User types: "ăn sáng 50k"
2. AI parses: `{ amount: 50000, category: "Ăn uống", description: "Ăn sáng" }`
3. ✅ **Directly save to database** (no preview step)
4. Show success toast
5. Update list immediately

**Why?**: Simplifies UX and trusts AI parsing accuracy.

---

## 📦 Import Path Aliases

Use `@/` alias for all imports:

```typescript
// ✅ CORRECT
import { cn } from "@/shared/lib/utils";
import { ExpenseRecord } from "@/shared/types";
import { addExpense } from "@/entities/expense/api/expense.service";
import { useAddExpense } from "@/features/add-expense";

// ❌ WRONG - relative paths
import { cn } from "../../../shared/lib/utils";
```

---

## 🗄️ Database Rules (Dexie)

### Separate Tables
```typescript
db.version(1).stores({
  expenses: "id, amount, category, *date, ...",
  income: "id, amount, category, *date, ...",
  "expense-categories": "id, name, ...",
  "income-categories": "id, name, ...",
  // ❌ NO transactions table
});
```

### Table Naming
- Use kebab-case for table names with hyphens
- Singular or plural is acceptable, be consistent

---

## 📝 Component Guidelines

### Component File Structure
```typescript
// expense-item.tsx

import { ExpenseRecord } from "@/shared/types";
import { formatAmount } from "@/shared/lib/format";
import { Button } from "@/shared/ui/button";

interface ExpenseItemProps {
  expense: ExpenseRecord;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function ExpenseItem({ expense, onEdit, onDelete }: ExpenseItemProps) {
  return (
    <div>
      {/* ... */}
    </div>
  );
}
```

### Props Naming
- Use `expense` not `transaction`
- Use `income` not `transaction`
- Be explicit: `expenseId` not just `id`

---

## 🧪 Testing Rules

Each phase must pass these checks:

1. ✅ All files use kebab-case
2. ✅ No imports violate layer hierarchy
3. ✅ No cross-imports within same layer
4. ✅ Public API (index.ts) exists for each slice
5. ✅ No combined expense/income types
6. ✅ No shared components for both types
7. ✅ TypeScript compiles without errors
8. ✅ Application builds successfully
9. ✅ Feature works end-to-end (add, edit, delete, search)
10. ✅ Offline functionality works (IndexedDB)

---

## 📚 Reference Architecture

### Complete Feature Structure Example:
```
features/add-expense/
├── model/
│   ├── use-add-expense.ts      # Hook with business logic
│   └── expense-form.schema.ts  # Zod validation schema
├── ui/
│   ├── ai-expense-input.tsx    # AI-powered input component
│   └── expense-form.tsx         # Manual form component
└── index.ts                     # Public API

// index.ts
export { useAddExpense } from "./model/use-add-expense";
export { AIExpenseInput } from "./ui/ai-expense-input";
export { ExpenseForm } from "./ui/expense-form";
```

### Widget Structure Example:
```
widgets/expense-list/
├── ui/
│   ├── expense-list.tsx         # Main list component
│   ├── expense-list-item.tsx    # List item
│   └── expense-list-header.tsx  # List header
└── index.ts                     # Public API
```

---

## 🎯 Summary Checklist

Before committing any code, verify:

- [ ] File name is kebab-case
- [ ] Component name is PascalCase
- [ ] Hook name is camelCase
- [ ] Imports respect layer hierarchy
- [ ] No cross-layer imports within same layer
- [ ] Public API (index.ts) exists
- [ ] No expense/income mixing
- [ ] Used `@/` import alias
- [ ] No preview after AI parsing
- [ ] TypeScript compiles
- [ ] Follows FSD principles

---

**Remember**: When in doubt, **duplicate code** rather than create coupling between expense and income!
