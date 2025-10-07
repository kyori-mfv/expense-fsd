# Expense Manager - FSD

A Progressive Web Application (PWA) for expense tracking built with Feature-Sliced Design architecture.

## 📚 Documentation

- [Migration Plan](docs/migration-plan.md) - Phase-by-phase migration strategy
- [Architecture Rules](docs/rules.md) - FSD principles and guidelines
- [Full Context](MIGRATION_CONTEXT.md) - Complete source analysis

## 🚀 Slash Commands

Use these commands for quick access to migration information:

- `/context` - Load full migration context and status
- `/status` - Check current progress and file counts
- `/rules` - Review FSD architecture rules
- `/check-naming` - Verify kebab-case naming convention
- `/phase1` - Show Phase 1 (Expense Page) tasks
- `/phase2` - Show Phase 2 (Income Page) tasks
- `/phase3` - Show Phase 3 (Dashboard Page) tasks

## Tech Stack

- **Framework**: React 19 + Vite 6
- **Styling**: Tailwind CSS 4
- **Architecture**: Feature-Sliced Design (FSD)
- **PWA**: Vite PWA Plugin + Workbox
- **UI Components**: Radix UI + shadcn/ui
- **Forms**: React Hook Form + Zod
- **Database**: Dexie (IndexedDB)
- **State Management**: Zustand
- **Theme**: next-themes
- **Package Manager**: pnpm

## Project Structure (FSD)

```
src/
├── app/                 # Application layer
│   ├── providers/      # App providers (theme, router, etc.)
│   └── styles/         # Global styles
├── pages/              # Page components (routes)
├── widgets/            # Composite blocks (header, sidebar, etc.)
├── features/           # User interactions/features
├── entities/           # Business entities (expense, category, etc.)
└── shared/             # Reusable code
    ├── ui/            # UI components
    ├── lib/           # Utilities and helpers
    ├── api/           # API layer
    ├── config/        # Configuration
    └── types/         # Shared types
```

## FSD Layers (from top to bottom)

1. **app** - Application initialization, providers, global styles
2. **pages** - Complete pages composed of widgets and features
3. **widgets** - Large composite blocks (header, sidebar, dashboard cards)
4. **features** - User interactions (add expense, edit category, filter list)
5. **entities** - Business entities (expense, category, user)
6. **shared** - Reusable infrastructure code

## File Naming Convention

All files and folders use **kebab-case**:
- ✅ `expense-list.tsx`
- ✅ `add-expense-form.tsx`
- ✅ `use-expense-store.ts`
- ❌ `ExpenseList.tsx`
- ❌ `addExpenseForm.tsx`

## Scripts

```bash
# Development
pnpm dev          # Start dev server

# Build
pnpm build        # Build for production
pnpm preview      # Preview production build

# Code Quality
pnpm lint         # Run Biome linter
pnpm lint:fix     # Fix linting issues
pnpm format       # Format code
pnpm type-check   # TypeScript type checking
pnpm verify       # Lint + type-check + build
```

## Getting Started

1. Install dependencies:
```bash
pnpm install
```

2. Start development server:
```bash
pnpm dev
```

3. Open [http://localhost:5173](http://localhost:5173)

## FSD Rules

1. **Layers can only import from layers below them**
2. **Slices within a layer cannot directly import from each other**
3. **Shared layer has no knowledge of business logic**
4. **One file/folder = one responsibility**

## Features

- 📱 Progressive Web App (PWA) - installable on any device
- 🎨 Dark/Light theme support
- 💾 Offline-first with IndexedDB
- 📊 Expense tracking and analytics
- 📁 Category management
- 🔍 Search and filtering
- 📈 Data visualization with charts
