# 💰 Expense Manager FSD

A modern, offline-first Progressive Web Application (PWA) and hybrid mobile app for personal expense and income tracking, built with Feature-Sliced Design architecture and powered by AI for intelligent transaction parsing.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646cff.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8.svg)](https://tailwindcss.com/)
[![FSD](https://img.shields.io/badge/Architecture-FSD-orange.svg)](https://feature-sliced.design/)
[![AI Agents](https://img.shields.io/badge/AI-Multi--Agent%20System-purple.svg)](.claude/agents/README.md)

---

## 🌟 Features

### 💸 Expense Management
- **AI-Powered Input**: Use Gemini AI to parse natural language Vietnamese input
  - Example: "ăn sáng 50k" → automatically parsed as Food, 50,000 VND
- **Manual Entry**: Traditional form-based expense entry
- **Numeric Keyboard**: Mobile-optimized `inputMode="numeric"` for amount fields
- **Edit & Delete**: Modify or remove expense records
- **Search & Filter**: Advanced filtering by category, date range, and text search
- **Pagination**: Efficient browsing of large expense lists
- **Export/Import**: Backup and restore data via JSON format

### 📈 Income Management
- **AI-Powered Input**: Gemini AI parsing for income entries
- **Manual Entry**: Form-based income tracking
- **Edit & Delete**: Full CRUD operations
- **Search & Filter**: Category and date-based filtering
- **Pagination**: Navigate through income history
- **Export/Import**: Data portability with JSON files

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
- **Responsive Design**: Mobile-first, works on all screen sizes
- **Progressive Web App**: Installable on any device
- **Hybrid Mobile App**: Native iOS and Android apps (via Capacitor)
- **Offline-First**: Full functionality without internet (IndexedDB)
- **Bottom Navigation**: Mobile-optimized navigation bar
- **Toast Notifications**: User-friendly feedback for actions
- **URL-Based Navigation**: Bookmarkable pages with browser history support
- **Smooth Page Transitions**: Professional fade animations (200ms) with accessibility support

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

**Rules**:
1. ✅ Layers can only import from layers below them
2. ✅ Slices within a layer cannot import from each other
3. ✅ Shared layer has no business logic
4. ✅ Complete separation of expense and income domains

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
├── features/                # User interactions
│   ├── add-expense/         # AI + manual expense input
│   ├── edit-expense/        # Edit expense dialog
│   ├── delete-expense/      # Delete confirmation
│   ├── filter-expenses/     # Search & filter controls
│   ├── export-expenses/     # Export to JSON
│   ├── import-expenses/     # Import from JSON
│   ├── add-income/          # AI + manual income input
│   ├── edit-income/         # Edit income dialog
│   ├── delete-income/       # Delete confirmation
│   ├── filter-incomes/      # Search & filter controls
│   ├── export-incomes/      # Export to JSON
│   ├── import-incomes/      # Import from JSON
│   └── manage-api-key/      # Gemini API key management
│
├── entities/                # Business entities
│   ├── expense/             # Expense domain
│   │   ├── api/            # CRUD operations (Dexie)
│   │   ├── model/          # Query hooks (useLiveQuery)
│   │   └── ui/             # Expense item component
│   │
│   ├── income/              # Income domain
│   │   ├── api/            # CRUD operations (Dexie)
│   │   ├── model/          # Query hooks (useLiveQuery)
│   │   └── ui/             # Income item component
│   │
│   └── ai-provider/         # AI integration
│       ├── api/            # Gemini provider
│       └── model/          # useAIProvider hook
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
pnpm format        # Format code with Biome
pnpm type-check    # TypeScript type checking
pnpm verify        # Format + lint + type-check + build + cap:sync
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

### AI Integration
- **[Gemini AI](https://ai.google.dev/)**: Google's AI for natural language parsing

### PWA & Mobile
- **[Vite PWA Plugin](https://vite-pwa-org.netlify.app/)**: Zero-config PWA
- **[Workbox](https://developers.google.com/web/tools/workbox)**: Service worker strategies
- **[Capacitor](https://capacitorjs.com/)**: Hybrid mobile app framework (minimal setup)

### Code Quality
- **[Biome](https://biomejs.dev/)**: Fast linter and formatter (Prettier + ESLint alternative)
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

### 1. AI-Powered Transaction Parsing

The app uses **Gemini 2.0 Flash** to parse Vietnamese natural language input into structured transaction data.

**How it works**:
1. User types: `"ăn sáng phở 50k"`
2. Gemini AI analyzes input using:
   - Predefined category keywords (e.g., "phở" → Food)
   - Vietnamese amount parsing (50k → 50,000)
   - Context understanding
3. Returns structured data:
   ```typescript
   {
     amount: 50000,
     category: "Ăn uống",
     description: "ăn sáng phở",
     date: new Date()
   }
   ```
4. **Directly saved** (no preview step for streamlined UX)

**Supported Amount Formats**:
- `50k` → 50,000
- `1tr` / `1m` → 1,000,000
- `500.5k` → 500,500
- `100` → 100

### 2. Offline-First Architecture

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

### 3. Performance Optimizations

- **Compound Indexes**: Efficient filtering by category + date
- **Pagination**: Load only visible records
- **Memoization**: React.memo and useMemo for expensive calculations
- **Code Splitting**: Lazy-loaded routes
- **Debounced Search**: Reduces query frequency

### 4. Data Export/Import

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
  }
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

## 🔐 API Key Management

### Gemini API Key
The app requires a Gemini API key for AI features.

**Setup**:
1. Get a free API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Open the app
3. Navigate to API Key management (in settings or first-time setup)
4. Enter your key
5. Key is stored securely in localStorage

**Privacy**:
- API key stored locally (never sent to external servers)
- All AI requests go directly to Google's API
- No third-party tracking

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
