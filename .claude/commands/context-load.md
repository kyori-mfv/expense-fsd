# Context - Load Project Documentation

Read all project documentation and show current architecture overview.

## Files to Read
- README.md
- docs/ARCHITECTURE.md
- docs/RULES.md
- docs/DEVELOPMENT.md

## Summary

**Project**: Expense Manager FSD - AI-powered expense and income tracking PWA
**Architecture**: Feature-Sliced Design (100% compliant)
**Status**: ✅ Production-ready

### Tech Stack
- React 19 + TypeScript 5.6 + Vite 6
- Tailwind CSS 4 + shadcn/ui
- Dexie (IndexedDB) for offline storage
- Gemini AI for natural language parsing
- PWA with offline-first architecture

### Features
- 💸 AI-Powered Expense Management
- 📈 AI-Powered Income Management
- 📊 Dashboard with Analytics (Charts, Trends, Stats)
- 🎨 Dark/Light Theme
- 📱 Progressive Web App (installable, offline)
- 💾 Export/Import Data (JSON)
- 🔍 Advanced Search & Filtering
- 📄 Pagination

### Architecture (FSD)
```
app → pages → widgets → features → entities → shared
```

**Key Principles**:
- ✅ Downward imports only
- ✅ No cross-imports within same layer
- ✅ Public API via index.ts for each slice
- ✅ Complete expense/income separation (no union types)
- ✅ kebab-case for all files
- ✅ TypeScript strict mode

### Database Schema (Dexie)
- `expenses` table - separate from income
- `incomes` table - separate from expenses
- Compound indexes for efficient filtering
- Live queries with useLiveQuery

### Quick Commands
```bash
pnpm dev         # Development server
pnpm build       # Production build
pnpm verify      # Lint + type-check + build
```

### Documentation
- **README.md** - Project overview, features, getting started
- **docs/ARCHITECTURE.md** - FSD architecture, layers, import rules
- **docs/DEVELOPMENT.md** - Development workflow, adding features
- **docs/RULES.md** - Mandatory rules, coding conventions

### Project Structure
```
src/
├── app/         # Application initialization
├── pages/       # dashboard-page, expense-page, income-page
├── widgets/     # Composite UI blocks (charts, lists, filters)
├── features/    # User interactions (add, edit, delete, filter, export)
├── entities/    # Business entities (expense, income, ai-provider)
└── shared/      # Infrastructure (ui, lib, api, config, types)
```

---

For detailed information, read the documentation files listed above.
