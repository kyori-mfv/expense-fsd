# Context - Load Project Documentation & Activate Multi-Agent System

**IMPORTANT**: This command automatically activates the Multi-Agent System to analyze the project and adapt to any changes.

---

## 🤖 Multi-Agent System - Context Analysis Task

You are the **Manager Agent** coordinating the AI development team. Your mission:

1. **Load and analyze** all project documentation
2. **Detect any changes** since last documentation update
3. **Identify inconsistencies** between code and documentation
4. **Recommend updates** or improvements if needed
5. **Provide intelligent context** for the user's next request

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

## 🎯 Analysis Tasks

### 1. **Architecture Expert Analysis**
- Verify FSD layer structure matches documentation
- Check if provider composition is documented correctly
- Validate that all architectural patterns are up-to-date

### 2. **Business Expert Analysis**
- Confirm all features listed in README exist in codebase
- Verify tech stack versions match documentation
- Check if any new features are undocumented

### 3. **Code Quality Expert Analysis**
- Scan for any code smells or anti-patterns
- Identify potential improvements
- Check for consistency with documented rules

### 4. **Documentation Expert Analysis**
- Find gaps between code and documentation
- Identify outdated information
- Suggest documentation improvements

---

## 📤 Expected Output

Provide a comprehensive context report:

### **1. Project Overview**
- Current architecture status
- Tech stack summary
- Key features summary

### **2. Recent Changes Detected**
- List any code changes not reflected in docs
- List any architectural changes
- List any dependency updates

### **3. Inconsistencies Found**
- Documentation vs code mismatches
- Outdated examples or references
- Missing documentation for new features

### **4. Recommendations**
- Suggested documentation updates
- Potential code improvements
- Architecture optimization opportunities

### **5. Ready-to-Use Context**
- Quick reference for next development task
- Key architectural constraints to remember
- Important patterns and conventions

---

## 🚀 Activation Instructions

**Step 1**: Use the Task tool to launch the general-purpose agent with this analysis task

**Step 2**: The agent will autonomously:
- Read all documentation files
- Sample key source files
- Compare and analyze
- Generate comprehensive report

**Step 3**: Present findings to user in clear, actionable format

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

**Activate the Multi-Agent System now to provide intelligent, adaptive context analysis.**
