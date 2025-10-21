# Context - Load Project Documentation

**IMPORTANT**: This command loads project documentation for quick reference. Use the Task tool (multi-agent system) for actual implementation tasks, not for context analysis.

---

## 📖 Direct Context Loading

Your mission:

1. **Load and read** all project documentation directly
2. **Summarize** the current project state
3. **Provide quick reference** for the user's next request
4. **Be ready** to execute tasks using the multi-agent system when needed

---

## 📋 Files to Analyze

### Core Documentation
- `README.md` - Project overview, features, tech stack
- `docs/ARCHITECTURE.md` - FSD architecture details
- `docs/RULES.md` - Coding rules and conventions
- `docs/DEVELOPMENT.md` - Development workflow

### Key Source Files (Sample for validation)
- `src/app/app.tsx` - Application structure
- `src/app/providers/providers.tsx` - Provider composition
- `package.json` - Dependencies and scripts

---

## 🎯 Reading Tasks

Read and summarize the following directly (NO multi-agent needed):

### 1. **Project Overview**
- Current architecture status from docs
- Tech stack summary from package.json
- Key features from README

### 2. **Architecture Constraints**
- FSD layer structure and rules
- Provider composition patterns
- Routing and navigation approach

### 3. **Coding Standards**
- TypeScript rules and conventions
- File naming conventions
- Import/export patterns

### 4. **Development Workflow**
- Available npm scripts
- Build and test processes
- Git workflow if documented

---

## 📤 Expected Output

Provide a concise context summary:

### **1. Project Status**
- Architecture: FSD compliance status
- Tech stack: Key dependencies
- Current state: Production-ready or in-development

### **2. Key Constraints to Remember**
- FSD rules (downward imports only, no cross-layer, etc.)
- Naming conventions
- Architectural patterns

### **3. Ready for Next Task**
- "Context loaded. Ready to execute implementation tasks."
- When user requests implementation: USE the Task tool with multi-agent system

---

## 🚀 Execution Instructions

**Step 1**: Read all documentation files directly using the Read tool

**Step 2**: Summarize the project context concisely

**Step 3**: Be ready to use the Task tool for implementation work

**IMPORTANT**:
- ❌ DO NOT use Task tool for reading/analyzing context
- ✅ DO use Task tool when implementing features, fixing bugs, or making code changes

---

## 📊 Context Summary (Static Reference)

**Project**: Expense Manager FSD - AI-powered expense and income tracking PWA
**Architecture**: Feature-Sliced Design (100% compliant)
**Status**: ✅ Production-ready

### Tech Stack
- React 19 + TypeScript 5.6 + Vite 6
- React Router 6 (URL-based navigation)
- Framer Motion (page transitions)
- Tailwind CSS 4 + shadcn/ui
- Dexie (IndexedDB) for offline storage
- Gemini AI for natural language parsing
- PWA with offline-first architecture

### Architecture (FSD Layers)
```
app → pages → widgets → features → entities → shared
```

### FSD Principles
- ✅ Downward imports only (no upward dependencies)
- ✅ No cross-imports within same layer
- ✅ Public API via index.ts for each slice
- ✅ Complete expense/income separation (no union types)
- ✅ kebab-case for ALL files
- ✅ TypeScript strict mode (no `any` types)

### Provider Composition
```typescript
<Providers>              // Single unified provider
  <ThemeProvider>        // Dark/light theme
    <BrowserRouter>      // React Router
      <AppRoutes />      // Routing + animations
    </BrowserRouter>
  </ThemeProvider>
</Providers>
```

### Quick Commands
```bash
pnpm dev         # Development server
pnpm build       # Production build
pnpm verify      # Lint + type-check + build (MUST pass before commits)
```

---

## 💡 When to Use Multi-Agent System

**Context Loading (this command)**:
- ❌ NO multi-agent needed
- ✅ Just read docs directly

**Implementation Tasks**:
- ✅ USE Task tool with multi-agent system
- Examples: "Add new feature", "Fix bug", "Refactor code", "Migrate to new library"

**Now load the context directly and be ready for implementation tasks.**
