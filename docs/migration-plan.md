# Migration Plan - Page by Page

## 🎯 Strategy: Incremental Page Migration

Instead of migrating layer-by-layer, we'll migrate **one complete page at a time** with all its dependencies. This ensures each phase delivers a working feature.

---

## 📋 Phase 1: Migrate Expense Page ⏳

**Goal**: Complete expense management functionality (add, list, edit, delete, search)

### 1.1 Shared Layer (Expense-related only)
- [x] Types: `ExpenseRecord`, `ExpenseCategoryRecord`, `ExpenseBudgetRecord`
- [x] Config: `EXPENSE_CATEGORIES`, `EXPENSE_CATEGORY_KEYWORDS`
- [x] Lib: `formatAmount`, `formatDate`, `generateUUID`, `cn()`
- [ ] API: Database setup for `expenses` table only
- [ ] UI: Copy required shadcn components (Button, Card, Input, Dialog, Select, Calendar)

### 1.2 Entities Layer (Expense only)
- [ ] `expense/`
  - [ ] `model/expense.store.ts` - Zustand store for expense state
  - [ ] `model/expense.types.ts` - Re-export ExpenseRecord
  - [ ] `model/expense.schema.ts` - Zod validation
  - [ ] `api/expense.service.ts` - CRUD operations (add, update, delete, search)
  - [ ] `ui/expense-item.tsx` - Single expense display component

- [ ] `expense-category/`
  - [ ] `model/expense-category.store.ts` - Category state
  - [ ] `ui/expense-category-badge.tsx` - Category badge display
  - [ ] `ui/expense-category-icon.tsx` - Icon component

- [ ] `ai-provider/` (expense parsing only)
  - [ ] `model/ai-provider.types.ts` - AI types
  - [ ] `api/gemini-provider.ts` - Gemini integration for expense parsing
  - [ ] `api/ai-provider-factory.ts` - Provider initialization

### 1.3 Features Layer (Expense only)
- [ ] `add-expense/`
  - [ ] `model/use-add-expense.ts` - Add expense logic
  - [ ] `ui/ai-expense-input.tsx` - **AI-powered input (no preview)**
  - [ ] `ui/expense-form.tsx` - Manual form

- [ ] `edit-expense/`
  - [ ] `model/use-edit-expense.ts` - Edit logic
  - [ ] `ui/expense-edit-dialog.tsx` - Edit dialog

- [ ] `delete-expense/`
  - [ ] `model/use-delete-expense.ts` - Delete logic
  - [ ] `ui/delete-expense-button.tsx` - Delete confirmation

- [ ] `search-expenses/`
  - [ ] `model/use-expense-search.ts` - Search hook with pagination
  - [ ] `ui/expense-filters.tsx` - Filter controls (category, date)
  - [ ] `ui/expense-pagination.tsx` - Pagination controls

- [ ] `filter-by-date/` (shared by expense/income)
  - [ ] `ui/date-range-picker.tsx` - Date range selector

- [ ] `export-expenses/`
  - [ ] `model/use-export-expenses.ts` - Export logic (JSON/CSV)
  - [ ] `ui/export-expense-button.tsx` - Export button

- [ ] `import-expenses/`
  - [ ] `model/use-import-expenses.ts` - Import logic (JSON/CSV)
  - [ ] `ui/import-expense-button.tsx` - Import button

### 1.4 Widgets Layer (Expense only)
- [ ] `expense-summary/`
  - [ ] `ui/expense-summary.tsx` - Total expenses card

- [ ] `recent-expenses/`
  - [ ] `ui/recent-expenses.tsx` - Recent expense list (5-10 items)

- [ ] `expense-list/`
  - [ ] `ui/expense-list.tsx` - Paginated expense table/list

- [ ] `expense-category-chart/`
  - [ ] `ui/expense-category-chart.tsx` - Pie/bar chart (Recharts)

### 1.5 Pages Layer
- [ ] `expense-page/`
  - [ ] `ui/expense-page.tsx` - Main expense page composing all widgets

### 1.6 App Layer (Initial setup)
- [ ] `app/providers/providers.tsx` - Root providers
- [ ] `app/providers/theme-provider.tsx` - Theme support
- [ ] `app/app.tsx` - Main app component
- [ ] Update `src/index.tsx` to use new App

### 1.7 Testing & Validation
- [ ] Test add expense with AI (Gemini)
- [ ] Test add expense manually
- [ ] Test edit expense
- [ ] Test delete expense
- [ ] Test search/filter expenses
- [ ] Test pagination
- [ ] Test export expenses (JSON/CSV)
- [ ] Test import expenses (JSON/CSV)
- [ ] Test offline functionality (IndexedDB)
- [ ] Verify kebab-case naming throughout

**Phase 1 Deliverable**: ✅ Working expense management page

---

## 📋 Phase 2: Migrate Income Page ⏳

**Goal**: Complete income management functionality (add, list, edit, delete, search)

### 2.1 Shared Layer (Income-related only)
- [x] Types: `IncomeRecord`, `IncomeCategoryRecord`
- [x] Config: `INCOME_CATEGORIES`, `INCOME_CATEGORY_KEYWORDS`
- [ ] API: Database setup for `income` table

### 2.2 Entities Layer (Income only)
- [ ] `income/`
  - [ ] `model/income.store.ts` - Zustand store for income state
  - [ ] `model/income.types.ts` - Re-export IncomeRecord
  - [ ] `model/income.schema.ts` - Zod validation
  - [ ] `api/income.service.ts` - CRUD operations (add, update, delete, search)
  - [ ] `ui/income-item.tsx` - Single income display component

- [ ] `income-category/`
  - [ ] `model/income-category.store.ts` - Category state
  - [ ] `ui/income-category-badge.tsx` - Category badge display
  - [ ] `ui/income-category-icon.tsx` - Icon component

- [ ] Update `ai-provider/` to support income parsing
  - [ ] `api/gemini-provider.ts` - Add income parsing method

### 2.3 Features Layer (Income only)
- [ ] `add-income/`
  - [ ] `model/use-add-income.ts` - Add income logic
  - [ ] `ui/ai-income-input.tsx` - **AI-powered input (no preview)**
  - [ ] `ui/income-form.tsx` - Manual form

- [ ] `edit-income/`
  - [ ] `model/use-edit-income.ts` - Edit logic
  - [ ] `ui/income-edit-dialog.tsx` - Edit dialog

- [ ] `delete-income/`
  - [ ] `model/use-delete-income.ts` - Delete logic
  - [ ] `ui/delete-income-button.tsx` - Delete confirmation

- [ ] `search-income/`
  - [ ] `model/use-income-search.ts` - Search hook with pagination
  - [ ] `ui/income-filters.tsx` - Filter controls (category, date)
  - [ ] `ui/income-pagination.tsx` - Pagination controls

- [ ] `export-income/`
  - [ ] `model/use-export-income.ts` - Export logic (JSON/CSV)
  - [ ] `ui/export-income-button.tsx` - Export button

- [ ] `import-income/`
  - [ ] `model/use-import-income.ts` - Import logic (JSON/CSV)
  - [ ] `ui/import-income-button.tsx` - Import button

### 2.4 Widgets Layer (Income only)
- [ ] `income-summary/`
  - [ ] `ui/income-summary.tsx` - Total income card

- [ ] `recent-income/`
  - [ ] `ui/recent-income.tsx` - Recent income list (5-10 items)

- [ ] `income-list/`
  - [ ] `ui/income-list.tsx` - Paginated income table/list

- [ ] `income-category-chart/`
  - [ ] `ui/income-category-chart.tsx` - Pie/bar chart (Recharts)

### 2.5 Pages Layer
- [ ] `income-page/`
  - [ ] `ui/income-page.tsx` - Main income page composing all widgets

### 2.6 App Layer (Router update)
- [ ] `app/router.tsx` - Add income route
- [ ] Update sidebar navigation to include income page

### 2.7 Testing & Validation
- [ ] Test add income with AI (Gemini)
- [ ] Test add income manually
- [ ] Test edit income
- [ ] Test delete income
- [ ] Test search/filter income
- [ ] Test pagination
- [ ] Test export income (JSON/CSV)
- [ ] Test import income (JSON/CSV)
- [ ] Test offline functionality (IndexedDB)
- [ ] Verify no coupling with expense code

**Phase 2 Deliverable**: ✅ Working income management page

---

## 📋 Phase 3: Migrate Dashboard Page ⏳

**Goal**: Financial overview showing both expense and income data **separately**

### 3.1 Shared Layer (Dashboard utilities)
- [ ] `lib/calculate-stats.ts` - Calculate net balance, savings rate

### 3.2 Widgets Layer (Dashboard components)
- [ ] `financial-overview/`
  - [ ] `ui/income-total-card.tsx` - Total income card (uses income store)
  - [ ] `ui/expense-total-card.tsx` - Total expense card (uses expense store)
  - [ ] `ui/net-balance-card.tsx` - Net balance (calculated: income - expense)
  - [ ] `ui/savings-rate-card.tsx` - Savings rate (calculated)

- [ ] Update existing widgets for dashboard use:
  - [ ] `expense-summary/ui/expense-summary.tsx` - Reuse
  - [ ] `income-summary/ui/income-summary.tsx` - Reuse
  - [ ] `expense-category-chart/ui/expense-category-chart.tsx` - Reuse
  - [ ] `income-category-chart/ui/income-category-chart.tsx` - Reuse

### 3.3 Pages Layer
- [ ] `dashboard-page/`
  - [ ] `ui/dashboard-page.tsx` - Compose all financial widgets
  - [ ] Show income and expense data **separately** (two data streams)
  - [ ] Calculate net balance and savings rate from separate sources

### 3.4 App Layer (Navigation)
- [ ] `widgets/sidebar-nav/ui/sidebar.tsx` - Navigation sidebar
- [ ] `widgets/header/ui/header.tsx` - App header
- [ ] `app/router.tsx` - Complete routing (dashboard, expense, income)
- [ ] Set dashboard as default route

### 3.5 Testing & Validation
- [ ] Test dashboard loads both expense and income data
- [ ] Verify net balance calculation (income - expense)
- [ ] Verify savings rate calculation
- [ ] Test date range filtering (applies to both independently)
- [ ] Test expense category chart (expense data only)
- [ ] Test income category chart (income data only)
- [ ] Verify no mixed data structures
- [ ] Test navigation between pages

**Phase 3 Deliverable**: ✅ Complete working application with dashboard

---

## 🎯 Key Principles

### ✅ DO:
- Migrate one complete page at a time
- Build dependencies bottom-up (shared → entities → features → widgets → pages)
- Test each phase thoroughly before moving to next
- Keep expense and income **completely separated**
- Use kebab-case for all files/folders
- Follow FSD import rules (downward only)
- Use Gemini AI for parsing
- **Skip preview after AI parsing** (directly save)

### ❌ DON'T:
- Mix expense and income in same component/service/store
- Create `TransactionRecord` or any union types
- Share logic between expense and income (duplicate if needed)
- Use PascalCase or camelCase for files
- Import across same layer
- Add preview step after AI parsing

---

## 📊 Progress Tracking

| Phase | Status | Progress |
|-------|--------|----------|
| Phase 1: Expense Page | ⏳ In Progress | 5% |
| Phase 2: Income Page | ⏳ Pending | 0% |
| Phase 3: Dashboard Page | ⏳ Pending | 0% |

**Current Phase**: Phase 1 - Expense Page
**Current Task**: Setting up shared layer (database & UI components)

---

## 🚀 Next Steps

1. Complete Phase 1.1 (Shared Layer for expenses)
2. Set up Dexie database with `expenses` table
3. Copy required shadcn/ui components
4. Start building expense entity layer
5. Implement add-expense feature with Gemini AI (no preview)

---

**Last Updated**: 2025-10-06
