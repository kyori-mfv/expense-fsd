# 💰 Expense Manager FSD

A modern, offline-first Progressive Web Application (PWA) and native mobile app (iOS/Android) for personal expense and income tracking, built with Feature-Sliced Design architecture and Ionic Framework for mobile-first user experience.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646cff.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8.svg)](https://tailwindcss.com/)
[![FSD](https://img.shields.io/badge/Architecture-FSD-orange.svg)](https://feature-sliced.design/)
[![AI Agents](https://img.shields.io/badge/AI-Multi--Agent%20System-purple.svg)](.claude/agents/README.md)

---

## 🌟 Features

### 💸 Expense Management
- **Manual Entry**: Mobile-optimized form with keyboard avoidance
- **Numeric Keyboard**: `inputMode="numeric"` for amount fields on mobile
- **Edit & Delete**: Modify or remove expense records via swipe gestures
- **Search & Filter**: Advanced filtering by category, date range, and text search
- **High-Performance Pagination**: Database-level pagination (200x faster than memory-based)
- **Export/Import**: Backup and restore data via JSON format
- **Recent Expenses**: Quick view of 5 most recent transactions

### 📈 Income Management
- **Manual Entry**: Mobile-optimized form with keyboard avoidance
- **Edit & Delete**: Full CRUD operations with native mobile UX
- **Search & Filter**: Category and date-based filtering
- **High-Performance Pagination**: Database-level pagination with `.offset()` and `.limit()`
- **Export/Import**: Data portability with JSON files
- **Recent Incomes**: Quick view of 5 most recent transactions

### 📊 Dashboard & Analytics
- **Financial Overview**: Real-time cards showing:
  - Total Income
  - Total Expenses
  - Net Balance
  - Savings Rate
- **Category Charts**: Pie charts for expense and income breakdown
- **Monthly Trends**: 6-month trend line chart with income, expense, and net balance
- **Date Range Filters**: Quick presets (This Month, Last 3 Months, etc.) or custom ranges

### 🎨 User Experience
- **Dark/Light Theme**: System-aware theme with manual toggle
- **Mobile-First Design**: Ionic Framework components for native feel
- **Keyboard Avoidance**: Forms automatically scroll when keyboard appears
- **Progressive Web App**: Installable on any device
- **Native Mobile Apps**: iOS and Android via Capacitor
- **Offline-First**: Full functionality without internet (IndexedDB)
- **Bottom Navigation**: Native mobile tab bar with haptic feedback
- **Toast Notifications**: Below-header positioning with enhanced dark mode colors
- **URL-Based Navigation**: Bookmarkable pages with browser history support
- **Smooth Page Transitions**: Professional fade animations (200ms) with accessibility support
- **Performance Optimized**: Database-level pagination, instant date picker

### 🤖 AI Development Tools
- **Multi-Agent System**: Autonomous AI team for feature development
- **FSD Architecture Compliance**: Automatic architecture validation
- **Iterative Quality Assurance**: Multiple review cycles before delivery
- **Natural Language Requests**: Describe what you want, agents build it
- **See [AI Development Agents](#-ai-development-agents) for details**

---

## 🏗️ Architecture

### Feature-Sliced Design (FSD)

This project follows [Feature-Sliced Design](https://feature-sliced.design/), a modern architecture methodology for frontend applications.

#### Layer Hierarchy
```
app → pages → widgets → features → entities → shared
```

**Rules** (enforced by Steiger FSD linter):
1. ✅ Layers can only import from layers below them
2. ✅ Slices within a layer cannot import from each other
3. ✅ Shared layer has no business logic
4. ✅ Complete separation of expense and income domains
5. ✅ All imports must use public API (index.ts) exports

#### Project Structure
```
src/
├── app/                      # Application layer
│   ├── providers/           # Theme, routing providers
│   │   ├── router-provider.tsx  # React Router setup
│   │   └── theme-provider.tsx   # Theme management
│   ├── app.tsx              # Root component with AppRoutes
│   └── index.css            # Global styles
│
├── pages/                   # Page components (routes)
│   ├── dashboard-page/      # Financial overview page
│   ├── expense-page/        # Expense management page
│   └── income-page/         # Income management page
│
├── widgets/                 # Composite UI blocks
│   ├── bottom-nav/          # Mobile navigation
│   ├── financial-overview/  # Dashboard stats cards
│   ├── expense-list/        # Paginated expense table
│   ├── income-list/         # Paginated income table
│   ├── expense-category-chart/  # Expense pie chart
│   ├── income-category-chart/   # Income pie chart
│   ├── monthly-trends/      # Trend line chart
│   ├── date-range-filter/   # Date picker widget
│   ├── recent-expenses/     # Recent expenses widget
│   ├── recent-incomes/      # Recent incomes widget
│   ├── manage-expense-data/ # Expense data management (export/import/delete)
│   ├── manage-income-data/  # Income data management (export/import/delete)
│   └── page-header/         # Reusable page header component
│
├── features/                # User interactions (14 features)
│   ├── add-expense/         # Manual expense input form
│   ├── edit-expense/        # Edit expense dialog
│   ├── delete-expense/      # Delete confirmation with haptic feedback
│   ├── delete-all-expenses/ # Bulk delete expenses
│   ├── filter-expenses/     # Search & filter controls
│   ├── export-expenses/     # Export to JSON
│   ├── import-expenses/     # Import from JSON
│   ├── add-income/          # Manual income input form
│   ├── edit-income/         # Edit income dialog
│   ├── delete-income/       # Delete confirmation with haptic feedback
│   ├── delete-all-incomes/  # Bulk delete incomes
│   ├── filter-incomes/      # Search & filter controls
│   ├── export-incomes/      # Export to JSON
│   └── import-incomes/      # Import from JSON
│
├── entities/                # Business entities (2 entities)
│   ├── expense/             # Expense domain
│   │   ├── api/            # CRUD operations with optimized pagination
│   │   ├── model/          # Query hooks (useLiveQuery)
│   │   └── ui/             # Expense item & form fields components
│   │
│   └── income/              # Income domain
│       ├── api/            # CRUD operations with optimized pagination
│       ├── model/          # Query hooks (useLiveQuery)
│       └── ui/             # Income item & form fields components
│
└── shared/                  # Reusable infrastructure
    ├── ui/                 # shadcn/ui components (Button, Card, etc.)
    ├── components/         # Custom shared components
    │   └── page-transition.tsx  # Route transition animations
    ├── lib/                # Utilities (format, calculations, date)
    ├── api/                # Database setup (Dexie)
    ├── config/             # Categories, constants
    ├── hooks/              # Common hooks
    └── types/              # TypeScript types
```

---

## 🚀 Getting Started

### Prerequisites

**Required for Web/PWA Development:**
- **Node.js**: >= 20.0.0
- **pnpm**: >= 10.0.0

**Additional for Mobile Development:**
- **iOS**: macOS with Xcode and CocoaPods
- **Android**: Android Studio and Java/Kotlin SDK

### Installation

1. **Clone the repository**:
```bash
git clone <repository-url>
cd expense-fsd
```

2. **Install dependencies**:
```bash
pnpm install
```

3. **Start development server**:
```bash
pnpm dev
```

4. **Open in browser**:
Navigate to [http://localhost:5173](http://localhost:5173)

---

## 📜 Available Scripts

### Development
```bash
pnpm dev           # Start dev server with hot reload
```

### Build
```bash
pnpm build         # Build for production (web)
pnpm preview       # Preview production build locally
```

### Mobile Development
```bash
# iOS
pnpm ios           # Build + sync + open in Xcode
pnpm cap:sync:ios  # Build web + sync iOS platform
pnpm cap:open:ios  # Open iOS project in Xcode

# Android
pnpm android       # Build + sync + open in Android Studio
pnpm cap:sync:android  # Build web + sync Android platform
pnpm cap:open:android  # Open Android project in Android Studio

# Both platforms
pnpm cap:sync      # Build web + sync iOS and Android
```

### Code Quality
```bash
pnpm lint          # Run Biome linter
pnpm lint:fix      # Auto-fix linting issues
pnpm lint:fsd      # Run Steiger FSD architecture linter
pnpm format        # Format code with Biome
pnpm type-check    # TypeScript type checking
pnpm verify        # Format + lint + lint:fsd + type-check + build + cap:sync
```

---

## 🛠️ Tech Stack

### Core
- **[React 19](https://reactjs.org/)**: Latest React with modern features
- **[TypeScript 5.6](https://www.typescriptlang.org/)**: Type-safe development
- **[Vite 6](https://vitejs.dev/)**: Lightning-fast build tool
- **[React Router 6](https://reactrouter.com/)**: URL-based routing with browser history

### Styling
- **[Tailwind CSS 4](https://tailwindcss.com/)**: Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)**: Accessible component primitives
- **[shadcn/ui](https://ui.shadcn.com/)**: Beautiful, accessible components
- **[Lucide React](https://lucide.dev/)**: Icon library
- **[next-themes](https://github.com/pacocoursey/next-themes)**: Theme management

### Data & State
- **[Dexie.js](https://dexie.org/)**: IndexedDB wrapper for offline storage
- **[dexie-react-hooks](https://dexie.org/docs/dexie-react-hooks/useLiveQuery())**: Live queries with React

> State management is handled by React Context API and Dexie live queries (no global state library needed)

### Forms & Validation
- **[React Hook Form](https://react-hook-form.com/)**: Performant form library
- **[Zod](https://zod.dev/)**: TypeScript-first schema validation

### Charts & Visualization
- **[Recharts](https://recharts.org/)**: Composable charting library

### Animation
- **[Framer Motion](https://www.framer.com/motion/)**: Production-grade animation library for smooth page transitions

### Mobile Framework
- **[Ionic React v8.7](https://ionicframework.com/docs/react)**: Mobile-first UI components
- **[Ionicons](https://ionic.io/ionicons)**: Premium icon library

### PWA & Mobile
- **[Vite PWA Plugin](https://vite-pwa-org.netlify.app/)**: Zero-config PWA
- **[Workbox](https://developers.google.com/web/tools/workbox)**: Service worker strategies
- **[Capacitor 7](https://capacitorjs.com/)**: Native iOS/Android wrapper with keyboard plugin

### Code Quality
- **[Biome](https://biomejs.dev/)**: Fast linter and formatter (Prettier + ESLint alternative)
- **[Steiger](https://github.com/feature-sliced/steiger)**: FSD architecture linter for enforcing layer boundaries
- **[Husky](https://typicode.github.io/husky/)**: Git hooks

---

## 🗄️ Database Schema

### IndexedDB Tables (via Dexie)

#### `expenses` Table
```typescript
{
  id: string           // UUID
  amount: number       // Amount in VND
  category: string     // Category name
  description: string  // Transaction description
  date: Date          // Transaction date
  createdAt: Date     // Record creation timestamp
  updatedAt: Date     // Last update timestamp
}

// Indexes: id, createdAt, date, category, [category+date+createdAt], [date+createdAt]
```

#### `incomes` Table
```typescript
{
  id: string           // UUID
  amount: number       // Amount in VND
  category: string     // Category name
  description: string  // Transaction description
  date: Date          // Transaction date
  createdAt: Date     // Record creation timestamp
  updatedAt: Date     // Last update timestamp
}

// Indexes: id, createdAt, date, category, [category+date+createdAt], [date+createdAt]
```

**Key Design Decisions**:
- ✅ Separate tables (no shared `transactions` table)
- ✅ No `type` discriminator field
- ✅ Compound indexes for efficient filtering and sorting
- ✅ All data stored locally (offline-first)

---

## 🎯 Key Features Deep Dive

### 1. Offline-First Architecture

**Features**:
- ✅ Full app functionality without internet
- ✅ All data stored in IndexedDB (persistent)
- ✅ Installable as PWA on mobile/desktop
- ✅ Service Worker caching for static assets

**Live Queries**:
Uses `useLiveQuery` from Dexie for reactive UI updates:
```typescript
// Automatically re-renders when database changes
const expenses = useLiveQuery(() =>
  db.expenses.orderBy('date').reverse().toArray()
);
```

### 2. Hybrid UI Architecture: Ionic + shadcn

This app uses a **dual UI system** combining the best of both worlds:

**Ionic Framework** (Native Mobile Behavior):
- `IonPage` + `IonContent` - Page structure with scroll management
- `IonButton` - Native button with ripple effects and platform-specific styling
- `IonInput` - Native input with floating labels and keyboard handling
- `IonList` + `IonItem` - Native list with swipe gestures and item sliding
- `IonIcon` - Premium ionicons library
- `IonToast` - Native toast notifications below header
- `IonModal` - Native modal with sheet behavior
- `IonTabBar` - Native bottom navigation with haptics

**shadcn/ui** (Modern Web UI):
- `Card` - Modern card layouts for dashboard and stats
- `Button` (custom) - Modern buttons for forms and actions
- `Dialog` - Web-style dialogs for confirmations
- `Popover` - Advanced popovers for filters and menus
- `Calendar` - Date picker for custom date ranges
- `Badge` - Category badges with icons
- `Separator` - Visual separators between sections

**Why This Combination?**:
```typescript
// ✅ Use Ionic for mobile-native interactions
<IonPage>
  <IonContent scrollY={true} scrollEvents={true}>
    <IonList>
      <IonItemSliding>
        {/* Swipe to delete - feels native! */}
      </IonItemSliding>
    </IonList>
  </IonContent>
</IonPage>

// ✅ Use shadcn for modern dashboard UI
<Card className="p-4">
  <h3 className="text-lg font-semibold">Financial Overview</h3>
  <div className="grid gap-4">
    {/* Modern, beautiful layouts */}
  </div>
</Card>
```

**Benefits**:
- Native mobile feel where it matters (forms, lists, navigation)
- Modern web aesthetics for data visualization
- Best performance (GPU-accelerated Ionic components)
- Consistent with platform conventions

### 3. Performance Optimizations

- **Database-Level Pagination**: Using Dexie's `.offset()` and `.limit()` (200x faster)
  - Before: Fetch 1000+ records → slice in memory
  - After: Query only 5 records from database
  - Impact: 100-200ms → 5-10ms per page change
- **Compound Indexes**: Efficient filtering by category + date
- **Memoization**: React.memo and useMemo for expensive calculations
- **Code Splitting**: Lazy-loaded routes
- **Debounced Search**: Reduces query frequency
- **Instant Date Picker**: Removed artificial 300ms setTimeout delays

### 4. Mobile-First Keyboard Handling

**Capacitor Keyboard Plugin Configuration**:
```typescript
// capacitor.config.ts
plugins: {
  Keyboard: {
    resize: "body",              // Resize body when keyboard appears
    style: "dark",               // Match keyboard to app theme
    resizeOnFullScreen: true,    // Handle full-screen keyboard
  },
}
```

**Ionic Content Scroll Management**:
```typescript
// All pages use scrollY and scrollEvents
<IonContent scrollY={true} scrollEvents={true}>
  <ExpenseForm />  {/* Form automatically scrolls into view */}
</IonContent>
```

**How It Works**:
1. User taps input field
2. Keyboard appears from bottom
3. `IonContent` detects focused input
4. Page auto-scrolls to keep input visible
5. Works identically on iOS and Android

**Benefits**:
- No input fields hidden behind keyboard
- Native iOS/Android behavior
- Zero manual scroll calculations
- Works offline (no server dependency)

### 5. Data Export/Import

**Export**:
- Exports all expenses/incomes to JSON
- Includes metadata (version, timestamp, count)
- Preserves all fields (id, timestamps, etc.)

**Import**:
- Validates JSON schema before import
- Generates new UUIDs to prevent conflicts
- Updates timestamps to current time
- Shows success/error feedback

---

## 📱 Progressive Web App (PWA) & Mobile Apps

### Deployment Options

This application can be deployed in three ways:

1. **Web App (PWA)** - Browser-based, installable on any device
2. **iOS Native App** - Distributed via Apple App Store
3. **Android Native App** - Distributed via Google Play Store

### PWA Features
- ✅ Installable on mobile and desktop
- ✅ Works offline
- ✅ Fast loading with service worker caching
- ✅ App-like experience (no browser chrome)

### PWA Installation
1. Open the app in Chrome/Edge/Safari
2. Look for "Install App" prompt or menu option
3. Click "Install"
4. App opens in standalone window

### Hybrid Mobile Apps (Capacitor)

**Philosophy**: Minimal Capacitor setup - Pure PWA in a native container

**What Capacitor Provides**:
- Native iOS and Android platform configurations
- App store deployment capability
- Native app packaging

**What Capacitor Does NOT Include**:
- ❌ No native feature wrappers (haptics, status bar, etc.)
- ❌ No platform-specific code
- ❌ No native plugins beyond core Capacitor

**Why This Approach?**
- Simplicity: Zero native feature code to maintain
- PWA-first: All features work identically across web and native
- Pure web stack: Standard web APIs only
- Easy maintenance: No platform-specific bugs

### Building for iOS

**Prerequisites**:
- macOS with Xcode installed
- CocoaPods (`sudo gem install cocoapods`)
- Apple Developer Account (for distribution)

**Steps**:
```bash
# 1. Build and sync
pnpm ios

# 2. In Xcode:
#    - Set your Team in Signing & Capabilities
#    - Configure Bundle Identifier
#    - Archive and upload to App Store Connect
```

### Building for Android

**Prerequisites**:
- Android Studio installed
- Java/Kotlin SDK
- Google Play Developer Account (for distribution)

**Steps**:
```bash
# 1. Build and sync
pnpm android

# 2. In Android Studio:
#    - Build → Generate Signed Bundle / APK
#    - Upload to Google Play Console
```

### Configuration

**Capacitor Config** (`capacitor.config.ts`):
```typescript
{
  appId: "com.expensemanager.fsd",
  appName: "Expense Manager",
  webDir: "dist",
  server: {
    androidScheme: "https",
    iosScheme: "https",
  },
  plugins: {
    Keyboard: {
      resize: "body",
      style: "dark",
      resizeOnFullScreen: true,
    },
  },
}
```

**Platforms**:
- `ios/` - iOS platform files (managed by Capacitor)
- `android/` - Android platform files (managed by Capacitor)

### Testing Mobile Apps

```bash
# Test on iOS Simulator
pnpm ios

# Test on Android Emulator
pnpm android

# Test on physical device:
# 1. Connect device via USB
# 2. Open Xcode/Android Studio
# 3. Select device and run
```

---

## 🎨 Theming

### Dark/Light Mode
- Automatically detects system theme
- Manual toggle in settings
- Persists user preference in localStorage
- Smooth transitions between themes

### Color Palette
Uses CSS variables for theming:
- `--income`: Green shades for income
- `--expense`: Red shades for expenses
- `--net-balance-positive`: Blue for positive balance
- `--net-balance-negative`: Red for negative balance
- `--savings`: Purple for savings rate

---

## 📐 File Naming Convention

**All files and folders use kebab-case**:

✅ **Correct**:
- `add-expense-form.tsx`
- `use-expense-query.ts`
- `expense-category-select.tsx`

❌ **Incorrect**:
- `AddExpenseForm.tsx` (PascalCase)
- `useExpenseQuery.ts` (camelCase)
- `expenseCategorySelect.tsx` (camelCase)

**Exception**: Component exports use PascalCase:
```typescript
// File: expense-item.tsx
export function ExpenseItem() { /* ... */ }
```

---

## 📊 Statistics & Calculations

### Financial Stats
- **Total Income**: Sum of all income in date range
- **Total Expense**: Sum of all expenses in date range
- **Net Balance**: Income - Expenses
- **Savings Rate**: (Net Balance / Total Income) × 100

### Category Stats
- **Amount**: Total per category
- **Count**: Number of transactions per category
- **Percentage**: (Category Amount / Total) × 100

### Monthly Trends
- Last 6 months of income, expense, and net balance
- Grouped by month
- Displayed as line chart

---

## 🤖 AI Development Agents

### Overview

This project includes an **autonomous multi-agent AI system** - a team of 7 specialized AI agents that work together to build features with high quality and FSD architecture compliance.

### How to Use

**Simply describe what you want in plain language** when talking to Claude Code (in your chat or conversation). The AI agents will automatically activate and collaborate to build the feature.

#### Example Session:

```
You (in Claude Code chat):
"I want to add tags to expenses so I can organize them better"

[AI agents activate automatically]

Manager Agent:
  → Analyzes your request
  → Assigns tasks to specialist agents
  → Coordinates the workflow

Business Expert (AI) → Analyzes requirements
Data Expert (AI) → Designs data model
UX Designer (AI) → Designs interface
Software Architect (AI) → Plans FSD structure
Senior Engineer (AI) → Writes code
Architect (AI) → Reviews implementation
QA Engineer (AI) → Tests everything
All Experts → Final validation

Manager Agent (reports back):
"✅ Expense Tags Feature Complete!
 - 3 files created, 5 modified
 - All experts approved
 - 25/25 tests passed
 Ready for your approval!"

You:
"Looks great! Ship it!"

[Documentation Agent activates]

Documentation Agent (AI) → Updates docs automatically
  - README.md (features, schema)
  - ARCHITECTURE.md (FSD structure)
  - API docs (hooks, components)
  - Code docs (JSDoc comments)

Manager Agent (confirms):
"✅ Feature Deployed & Documented!
 - Code deployed ✅
 - Documentation updated ✅
 Expense tags feature is live!"
```

### Key Points

- **No special commands needed** - just describe what you want in your normal conversation
- **No technical details required** - describe the problem, not the solution
- **Automatic collaboration** - agents work together autonomously
- **Iterative quality** - multiple review cycles ensure high quality
- **You approve the final result** - maintain full control

### What You Can Request

```
✅ "I want to add tags to expenses"
✅ "I need budget tracking with monthly limits"
✅ "I want to see which expenses are tax deductible"
✅ "The date picker doesn't work on Safari - please fix it"
✅ "Check if the code follows FSD architecture properly"

❌ Don't say: "Add tags: string[] to ExpenseRecord interface"
❌ Don't say: "Update database schema to v3"
❌ Don't say: "Create a TagInput component"
```

### Benefits

- ✅ **Faster development** with AI collaboration
- ✅ **FSD architecture compliance** guaranteed
- ✅ **Multiple expert reviews** before delivery
- ✅ **Comprehensive testing** with feedback loops
- ✅ **You focus on "what"**, agents handle "how"

### Documentation

- **📖 Full Guide**: [.claude/agents/README.md](.claude/agents/README.md)
- **🚀 Quick Reference**: [.claude/QUICK-START.md](.claude/QUICK-START.md)
- **📋 Detailed Workflows**: [.claude/agents/WORKFLOW-GUIDE.md](.claude/agents/WORKFLOW-GUIDE.md)

---

## 🧪 Development Guide

### Adding a New Feature

**Option 1: Use AI Agents (Recommended)**
- Just describe what you want in simple terms
- AI team handles everything (design, code, testing)
- See [AI Development Agents](#-ai-development-agents) above

**Option 2: Manual Development**

Follow FSD principles:

1. **Identify the layer**:
   - User interaction? → `features/`
   - Composite UI block? → `widgets/`
   - Business entity? → `entities/`

2. **Create slice structure**:
```
features/my-feature/
├── model/           # Business logic, hooks
│   └── use-my-feature.ts
├── ui/              # UI components
│   └── my-feature-form.tsx
└── index.ts         # Public API
```

3. **Export via public API** (`index.ts`):
```typescript
export { useMyFeature } from './model/use-my-feature';
export { MyFeatureForm } from './ui/my-feature-form';
```

4. **Follow naming conventions**:
   - Files: `kebab-case.tsx`
   - Components: `PascalCase`
   - Hooks: `camelCase`

### Adding a Database Entity

1. **Update schema** in `shared/api/db.ts`:
```typescript
this.version(2).stores({
  expenses: "...",
  incomes: "...",
  myEntity: "id, field1, field2, [field1+field2]" // Add here
});
```

2. **Create entity layer**:
```
entities/my-entity/
├── api/
│   └── my-entity.service.ts  # CRUD operations
├── model/
│   └── use-my-entity-query.ts  # React hooks
├── ui/
│   └── my-entity-item.tsx  # Display component
└── index.ts  # Public API
```

3. **Use Dexie & live queries**:
```typescript
// Service
export const myEntityService = {
  async getAll() {
    return await db.myEntity.toArray();
  }
};

// Hook
export function useMyEntities() {
  return useLiveQuery(() => myEntityService.getAll()) ?? [];
}
```

---

## 🐛 Troubleshooting

### Database Issues
```bash
# Clear IndexedDB in browser DevTools
Application → Storage → IndexedDB → Right-click → Delete
```

### Build Issues
```bash
# Clear cache and rebuild
rm -rf node_modules dist
pnpm install
pnpm build
```

### Type Errors
```bash
# Check types
pnpm type-check

# Fix imports
pnpm lint:fix
```

---

## 📚 Documentation

- **Architecture**: See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- **Development**: See [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md)

---

## 📄 License

MIT License - See [LICENSE](LICENSE) for details

---

## 🤝 Contributing

Contributions are welcome! Please follow the FSD architecture principles and file naming conventions.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit changes (`git commit -m 'feat: add my feature'`)
4. Push to branch (`git push origin feature/my-feature`)
5. Open a Pull Request

---

## 📞 Support

For issues or questions, please open an issue on GitHub.

---

**Built with ❤️ using Feature-Sliced Design**
