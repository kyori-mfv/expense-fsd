# 🔄 Multi-Agent Development Workflow

## Overview

This system simulates a **real software development team** where specialized experts collaborate to build features.

---

## The Team

### 👤 You (The User)
- **Role**: Product Owner + Domain Expert
- **Provides**: Business requirements, data decisions, final approval
- **Represented by**: Business Expert Agent + Data Expert Agent

### 🎯 Manager Agent
- **Role**: Development Team Lead / Scrum Master
- **Responsibilities**: Orchestrate agents, make decisions, ensure quality
- **Reports to**: You

### 🤖 AI Agent Team
1. 💼 **Business Expert** - Analyzes requirements
2. 📊 **Data Expert** - Designs data models
3. 🎨 **UX Designer** - Designs interfaces and user flows
4. 🏗️ **Software Architect** - Plans FSD structure
5. 👨‍💻 **Senior Engineer** - Implements features
6. 🧪 **QA Engineer** - Tests and finds bugs
7. 📝 **Documentation Agent** - Updates all documentation

---

## Real Development Workflow

**Key Principle: Iterative Feedback Loops**
- The Engineer doesn't just "pass" through reviews
- Each expert (Architect, QA, Business, Data, UX) provides feedback
- Engineer must address ALL feedback before moving to next phase
- Cycle repeats until each expert approves

---

## Visual Workflow Diagram

```
┌──────────────────────────────────────────────────────────────────┐
│                         YOU (User)                               │
│               "I want to organize expenses better"               │
└────────────────────────────┬─────────────────────────────────────┘
                             ↓
┌──────────────────────────────────────────────────────────────────┐
│                    🎯 MANAGER AGENT                              │
│            Analyzes request, orchestrates team                   │
└────────────────────────────┬─────────────────────────────────────┘
                             ↓
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ PHASE 1: REQUIREMENTS                                           ┃
┃   💼 Business Expert → Analyzes business needs                  ┃
┃   📊 Data Expert → Designs data model                           ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                          ↓
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ PHASE 2: DESIGN                                                 ┃
┃   🎨 UX Designer → Designs UI/UX                                ┃
┃   🏗️ Software Architect → Plans FSD structure                   ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                          ↓
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ PHASE 3: IMPLEMENTATION                                         ┃
┃   👨‍💻 Senior Engineer → Writes code                              ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                          ↓
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ PHASE 4: ARCHITECTURE REVIEW (Feedback Loop)                   ┃
┃   🏗️ Architect → Reviews FSD compliance                         ┃
┃        ↓ (issues found?)                                        ┃
┃   ┌─────────────────────────────────────┐                      ┃
┃   │ 👨‍💻 Engineer → Fixes violations      │                      ┃
┃   │      ↓                               │                      ┃
┃   │ 🏗️ Architect → Re-reviews            │                      ┃
┃   │      ↓                               │                      ┃
┃   │ (repeat until approved ✅)           │                      ┃
┃   └─────────────────────────────────────┘                      ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                          ↓
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ PHASE 5: TESTING (Feedback Loop)                               ┃
┃   🧪 QA Engineer → Tests everything                             ┃
┃        ↓ (bugs found?)                                          ┃
┃   ┌─────────────────────────────────────┐                      ┃
┃   │ 👨‍💻 Engineer → Fixes bugs            │                      ┃
┃   │      ↓                               │                      ┃
┃   │ 🏗️ Architect → Reviews bug fixes     │                      ┃
┃   │      ↓                               │                      ┃
┃   │ 🧪 QA → Retests                      │                      ┃
┃   │      ↓                               │                      ┃
┃   │ (repeat until all pass ✅)           │                      ┃
┃   └─────────────────────────────────────┘                      ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                          ↓
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ PHASE 6: EXPERT REVIEW (Quality Gate + Feedback Loop)          ┃
┃   💼 Business Expert → Validates business logic                 ┃
┃   📊 Data Expert → Validates data integrity                     ┃
┃   🎨 UX Designer → Validates UI/UX quality                      ┃
┃        ↓ (feedback?)                                            ┃
┃   ┌─────────────────────────────────────┐                      ┃
┃   │ 👨‍💻 Engineer → Addresses feedback    │                      ┃
┃   │      ↓                               │                      ┃
┃   │ 🏗️ Architect → Reviews changes       │                      ┃
┃   │      ↓                               │                      ┃
┃   │ 🧪 QA → Regression tests             │                      ┃
┃   │      ↓                               │                      ┃
┃   │ All Experts → Re-review              │                      ┃
┃   │      ↓                               │                      ┃
┃   │ (repeat until all approve ✅)        │                      ┃
┃   └─────────────────────────────────────┘                      ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                          ↓
┌──────────────────────────────────────────────────────────────────┐
│                    🎯 MANAGER AGENT                              │
│        Compiles all reviews, prepares delivery report            │
└────────────────────────────┬─────────────────────────────────────┘
                             ↓
┌──────────────────────────────────────────────────────────────────┐
│                         YOU (User)                               │
│              ✅ Final Approval: "Ship it!"                       │
└────────────────────────────┬─────────────────────────────────────┘
                             ↓
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ PHASE 7: DOCUMENTATION UPDATE                                   ┃
┃   📝 Documentation Agent → Updates all docs                     ┃
┃        ↓                                                         ┃
┃   - README.md (features, schema)                                ┃
┃   - ARCHITECTURE.md (FSD structure)                             ┃
┃   - API docs (hooks, components)                                ┃
┃   - Code docs (JSDoc comments)                                  ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                          ↓
┌──────────────────────────────────────────────────────────────────┐
│                    🎯 MANAGER AGENT                              │
│              "✅ Feature deployed & documented!"                 │
└──────────────────────────────────────────────────────────────────┘
```

---

### Sprint Planning (Feature Request)

```
You: "I want to add expense tags feature"

↓

Manager Agent:
- Analyzes request
- Identifies needed agents
- Creates work plan
```

---

## Complete Workflow: Expense Tags Example

### Phase 1: Requirements Gathering

```
┌─────────────────────────────────────────────┐
│ 1. Manager asks Business Expert (YOU)      │
└─────────────────────────────────────────────┘

Manager: "What are the business requirements for expense tags?"

You respond:
- Tags are user-created (not predefined)
- Multiple tags per expense (max 5)
- Tags help categorize beyond fixed categories
- Used for: work expenses, reimbursable items, projects
- Should support filtering by tags

Manager: ✅ Requirements clear


┌─────────────────────────────────────────────┐
│ 2. Manager asks Data Expert (YOU)          │
└─────────────────────────────────────────────┘

Manager: "How should we store tags in the database?"

You respond:
- Store as string array in ExpenseRecord
- Add index for efficient filtering
- Database schema v2 → v3
- Existing records get empty array []

Manager: ✅ Data model defined
```

---

### Phase 2: Design

```
┌─────────────────────────────────────────────┐
│ 3. Manager assigns UX Designer (AI)        │
└─────────────────────────────────────────────┘

Manager → UX Designer:
"Design UI for expense tags following these requirements:
- User-created tags
- Max 5 per expense
- Filterable
- Mobile-first"

UX Designer (AI works autonomously):
✓ Analyzes requirements
✓ Reviews existing UI patterns
✓ Designs tag input component (chip input with autocomplete)
✓ Designs tag display (badges in expense list)
✓ Designs filter UI (checkbox list)
✓ Plans mobile experience (bottom sheet)
✓ Ensures accessibility (keyboard nav, ARIA)

UX Designer → Manager:
"✅ UX design complete. Here's the design spec..."

Manager: ✅ Design approved
```

---

### Phase 3: Architecture Planning

```
┌─────────────────────────────────────────────┐
│ 4. Manager assigns Software Architect (AI) │
└─────────────────────────────────────────────┘

Manager → Architect:
"Plan FSD structure for expense tags
- Data model: tags: string[]
- UX: chip input + badges + filtering"

Software Architect (AI works autonomously):
✓ Analyzes FSD layers
✓ Determines layer placement:
  - features/manage-tags/ (new feature)
  - Update entities/expense/
  - Update widgets/expense-list/
  - Update features/filter-expenses/
✓ Plans file structure
✓ Validates import rules
✓ Identifies files to create/modify
✓ Plans public APIs

Architect → Manager:
"✅ Architecture planned.
  New: 3 files in features/manage-tags/
  Modified: 5 files
  FSD compliant: Yes"

Manager: ✅ Architecture approved
```

---

### Phase 4: Implementation

```
┌─────────────────────────────────────────────┐
│ 5. Manager assigns Senior Engineer (AI)    │
└─────────────────────────────────────────────┘

Manager → Engineer:
"Implement expense tags feature
- Requirements: [from Business Expert]
- Data model: [from Data Expert]
- UX design: [from UX Designer]
- Architecture: [from Architect]"

Senior Engineer (AI works autonomously):
✓ Updates database schema (v2 → v3)
✓ Updates ExpenseRecord type
✓ Creates features/manage-tags/
  ✓ model/use-tags.ts (tag management logic)
  ✓ model/tag-schema.ts (Zod validation)
  ✓ ui/tag-input.tsx (chip input component)
  ✓ index.ts (public API)
✓ Updates entities/expense/api/ (CRUD with tags)
✓ Updates widgets/expense-list/ (display tags)
✓ Updates features/filter-expenses/ (tag filtering)
✓ Runs `pnpm lint:fix`
✓ Runs `pnpm type-check`
✓ Runs `pnpm build`

Engineer → Manager:
"✅ Implementation complete
  Files created: 3
  Files modified: 5
  Verification: PASSED
  Ready for architecture review"

Manager: ✅ Implementation done
```

---

### Phase 5: Architecture Review

```
┌─────────────────────────────────────────────┐
│ 6. Manager assigns Software Architect (AI) │
└─────────────────────────────────────────────┘

Manager → Architect:
"Review implementation of expense tags feature
- Verify FSD compliance
- Check import rules
- Validate public APIs
- Ensure no architecture violations"

Software Architect (AI works autonomously):
✓ Reviews all modified files
✓ Checks FSD layer structure
  - features/manage-tags/ placed correctly ✅
  - entities/expense/ updates proper ✅
  - widgets/expense-list/ updates proper ❌ (found cross-layer import)
✓ Validates import rules
  - No upward imports ✅
  - No cross-slice imports ❌ (found 2 violations)
  - Uses @/ alias ✅
✓ Checks public APIs
  - features/manage-tags/index.ts exports correct ✅
  - No internal file imports ❌ (found 1 direct import)
✓ Reviews file naming
  - All kebab-case ✅
✓ Validates architecture patterns
  - Service pattern used ✅
  - Hooks follow conventions ✅

Architect → Manager:
"⚠️ Architecture Issues Found

  Issues:
  1. widgets/expense-list imports directly from features/filter-expenses/ui (violation)
  2. features/manage-tags imports from features/add-expense (cross-slice)
  3. One file uses direct import instead of public API

  Recommendation: Engineer must fix before QA"

Manager → Engineer:
  "Fix architecture violations per Architect's feedback"

Engineer:
  ✓ Fixes cross-layer import (moves shared logic to entities/)
  ✓ Fixes cross-slice import (uses entities/ instead)
  ✓ Updates to use public API
  ✓ Runs verification

Engineer → Manager:
  "Architecture issues fixed"

Manager → Architect:
  "Re-review the fixes"

Architect:
  ✓ Re-reviews all fixes
  ✓ All violations resolved ✅

Architect → Manager:
  "✅ Architecture Review Complete - All issues resolved
     Code is architecturally sound. Ready for QA testing."

Manager: ✅ Architecture approved (after iteration)
```

---

### Phase 6: Quality Assurance

```
┌─────────────────────────────────────────────┐
│ 7. Manager assigns QA Engineer (AI)        │
└─────────────────────────────────────────────┘

Manager → QA:
"Test expense tags feature
- All user flows
- Edge cases
- Accessibility
- Mobile experience
- Regression testing"

QA Engineer (AI works autonomously):
✓ Tests tag input functionality
✓ Tests max 5 tags validation
✓ Tests duplicate prevention
✓ Tests autocomplete
✓ Tests tag display in list
✓ Tests filtering by tags
✓ Tests edge cases (empty, long names, special chars)
✓ Tests error handling
✓ Tests keyboard navigation
✓ Tests screen reader
✓ Tests mobile responsiveness
✓ Tests on multiple browsers
✓ Regression tests existing features

QA Engineer → Manager:
"🧪 QA Report
  Tests: 25/25 executed
  Passed: 23/25 (92%)
  Failed: 2/25

  Bugs Found:
  - Bug #1 (Medium): Input loses focus on mobile
  - Bug #2 (Low): Long tag name overflows

  Recommendation: Approve with fixes"

Manager: ⚠️ Bugs found, need fixes
```

---

### Phase 7: Bug Fixing

```
┌─────────────────────────────────────────────┐
│ 8. Manager → Engineer: Fix bugs            │
└─────────────────────────────────────────────┘

Manager → Engineer:
"Fix these bugs from QA:
- Bug #1: Add inputRef.current?.focus() after adding tag
- Bug #2: Add truncate class to Badge"

Engineer:
✓ Fixes Bug #1
✓ Fixes Bug #2
✓ Runs verification

Engineer → Manager:
"✅ Bugs fixed, verification passed"

Manager → Architect:
"Quick review of bug fixes"

Architect:
✓ Reviews changes
✓ Verifies no architecture violations

Architect → Manager:
"✅ Bug fixes are FSD compliant"

Manager → QA:
"Retest mobile experience"

QA:
✓ Retests bugs
✓ Verifies fixes

QA → Manager:
"✅ All tests pass, bugs fixed"

Manager: ✅ QA approved, moving to expert review
```

---

### Phase 8: Expert Review (Quality Gate)

```
┌─────────────────────────────────────────────┐
│ 9. Manager → All Experts: Final Review     │
└─────────────────────────────────────────────┘

Manager: "Feature is tested. All experts please review."

Business Expert (AI):
  ✓ Reviews: Do tags solve the business problem?
  ✓ Validates: Business rules correctly implemented?
  ✓ Checks: Max 5 tags enforced? ❌ (no validation shown in UI)
  → Report: "⚠️ Business Issue: Max 5 tags not enforced in UI"

Data Expert (AI):
  ✓ Reviews: Data model optimal? Schema correct?
  ✓ Validates: Migration safe? ✅
  ✓ Checks: Query performance good? ⚠️ (missing index optimization)
  → Report: "⚠️ Data Issue: Index could be optimized for filtering"

UX Designer (AI):
  ✓ Reviews: UI matches design spec? ❌ (autocomplete not implemented)
  ✓ Validates: Mobile responsive? ✅
  ✓ Checks: User flow intuitive? ✅
  → Report: "⚠️ UX Issue: Autocomplete missing from design spec"

Manager: ⚠️ Expert feedback requires fixes

┌─────────────────────────────────────────────┐
│ Feedback Loop: Engineer Fixes Issues       │
└─────────────────────────────────────────────┘

Manager → Engineer:
  "Fix expert feedback:
   - Business: Add max 5 validation in UI
   - Data: Optimize index for tag filtering
   - UX: Implement autocomplete for tags"

Engineer:
  ✓ Adds max 5 validation with error message
  ✓ Updates index configuration
  ✓ Implements autocomplete component
  ✓ Runs verification

Engineer → Manager:
  "Expert feedback addressed"

Manager → Architect:
  "Quick review of changes"

Architect:
  ✓ Reviews new changes
  ✓ Verifies FSD compliance ✅
  → Report: "Changes are compliant"

Manager → QA:
  "Regression test the fixes"

QA:
  ✓ Tests new validation
  ✓ Tests autocomplete
  ✓ Tests index performance
  ✓ Regression tests
  → Report: "All tests pass"

Manager → All Experts:
  "Re-review the fixes"

Business Expert:
  ✓ Max 5 validation working ✅
  → Report: "✅ Business logic validated"

Data Expert:
  ✓ Index optimized ✅
  → Report: "✅ Data integrity validated"

UX Designer:
  ✓ Autocomplete implemented ✅
  → Report: "✅ UI/UX quality validated"

Manager: ✅ All expert reviews passed (after iteration)
(Note: Architect already reviewed in Phase 5 + reviewed fixes)
```

---

### Phase 9: Delivery

```
┌─────────────────────────────────────────────┐
│ 10. Manager → You: Feature Complete        │
└─────────────────────────────────────────────┘

Manager → You:
"✅ Expense Tags Feature Complete!

📋 Expert Reviews:
- Business Expert: ✅ Business logic validated
- Data Expert: ✅ Data integrity validated
- UX Designer: ✅ UI/UX quality validated
- Architect: ✅ Architecture validated
- QA: ✅ All tests passed (25/25)

📋 Summary:
- Requirements met: ✅
- Data model implemented: ✅
- UX design followed: ✅
- FSD architecture: ✅
- Code quality: ✅
- Testing: ✅ (100% pass rate)
- Bugs: 0

📊 What was built:
- Tag input with autocomplete
- Tag display in expense list
- Tag filtering functionality
- Mobile-optimized
- Accessible (WCAG 2.1 AA)

📁 Files:
- Created: 3 files
- Modified: 5 files
- Database: v2 → v3

✅ Verification: All passed
🧪 QA: 25/25 tests passed

Ready for production deployment!"

You: "Great! Ship it!"
```

---

### Phase 10: Documentation Update

```
┌─────────────────────────────────────────────┐
│ 11. Manager → Documentation Agent          │
└─────────────────────────────────────────────┘

Manager → Documentation Agent:
"User approved expense tags feature. Update all documentation."

Documentation Agent (AI works autonomously):
✓ Analyzes feature changes:
  - Database schema updated (v2 → v3)
  - New slice: features/manage-tags/
  - New hook: useExpenseTags
  - New component: TagInput
  - Modified: expense-list, filter-expenses

✓ Updates README.md:
  - Added "Tags" to Expense Management features
  - Updated database schema section to v3

✓ Updates ARCHITECTURE.md:
  - Added features/manage-tags/ to FSD structure
  - Documented slice organization

✓ Updates API Documentation:
  - Documented useExpenseTags hook with examples
  - Documented TagInput component props

✓ Adds Code Documentation:
  - JSDoc comments for all new functions
  - TypeScript interface documentation

✓ Verifies:
  - All code examples compile ✅
  - All links work ✅
  - Consistent formatting ✅

Documentation Agent → Manager:
"📝 Documentation Update Complete
 - README.md: Updated features + schema
 - ARCHITECTURE.md: Added new slice structure
 - API docs: Documented useExpenseTags hook
 - Component docs: Documented TagInput
 - Code docs: Added JSDoc comments

 All documentation verified and production-ready!"

Manager → You:
"✅ Feature Deployed & Documented!
 - Code deployed ✅
 - Documentation updated ✅
 - All changes tracked ✅

 Expense tags feature is live!"
```

---

## Workflow Patterns

### Pattern 1: Small Bug Fix

```
You: "Fix date picker not working on Safari"

Manager:
  ↓ Analyzes: Simple bug fix

Manager → Architect:
  "Where is date picker?"

Architect → Manager:
  "features/add-expense/ui/expense-form.tsx"

Manager → Engineer:
  "Fix date picker Safari compatibility"

Engineer:
  ✓ Fixes bug
  ✓ Tests on Safari
  ✓ Runs verification

Engineer → Manager:
  "Fixed"

Manager → QA:
  "Quick regression test"

QA:
  ✓ Tests Safari
  ✓ Tests Chrome (regression)

QA → Manager:
  "Confirmed fixed"

Manager → You:
  "✅ Date picker fixed"

Timeline: 5-10 minutes
```

---

### Pattern 2: Medium Feature

```
You: "Add expense notes field (optional text field)"

Manager:
  ↓ Analyzes: Medium complexity
  ↓ Needs: Data model + UX + Architecture + Implementation

Manager → You (Data Expert):
  "How to store notes?"

You:
  "Add notes: string field to ExpenseRecord"

Manager → UX Designer:
  "Design notes input UI"

UX Designer:
  ✓ Designs textarea with char counter
  ✓ Shows in expense detail

Manager → Architect:
  "Where to add notes field?"

Architect:
  ✓ Update shared/types
  ✓ Update entities/expense
  ✓ Update features/add-expense
  ✓ Update features/edit-expense

Manager → Engineer:
  "Implement notes field"

Engineer:
  ✓ Implements
  ✓ Verifies

Manager → QA:
  "Test notes functionality"

QA:
  ✓ Tests
  ✓ Reports

Manager → You:
  "✅ Notes feature complete"

Timeline: 15-30 minutes
```

---

### Pattern 3: Large Feature

```
You: "Add budget tracking with goals and alerts"

Manager:
  ↓ Analyzes: Complex feature
  ↓ Needs: All agents, multiple phases

Phase 1: Planning
  Manager → You (Business Expert):
    "What are budget requirements?"

  Manager → You (Data Expert):
    "How to model budgets?"

Phase 2: Design
  Manager → UX Designer:
    "Design budget UI flows"

  Manager → Architect:
    "Plan FSD structure"

Phase 3: Implementation (Iterative)
  Iteration 1: Core budget entity
    Engineer → Manager: "Budget entity done"
    QA → Manager: "Tested"

  Iteration 2: Budget UI
    Engineer → Manager: "Budget UI done"
    QA → Manager: "Tested"

  Iteration 3: Alerts
    Engineer → Manager: "Alerts done"
    QA → Manager: "Tested"

Phase 4: Integration Testing
  QA: End-to-end testing

Phase 5: Delivery
  Manager → You: "✅ Complete"

Timeline: 1-2 hours
```

---

## Agent Communication Flow

### Sequential (Complete Development Cycle)
```
Phase 1: REQUIREMENTS
Business Expert (AI) → Analyzes needs
    ↓
Data Expert (AI) → Designs data model
    ↓
Phase 2: DESIGN
UX Designer (AI) → Designs interfaces
    ↓
Architect (AI) → Plans FSD structure
    ↓
Phase 3: IMPLEMENTATION
Engineer (AI) → Writes code
    ↓
Phase 4: ARCHITECTURE REVIEW (Feedback Loop)
┌─────────────────────────────────────────┐
│ Architect (AI) → Reviews implementation │
│     ↓ (if issues)                       │
│ Engineer (AI) → Fixes violations        │
│     ↓                                    │
│ Architect (AI) → Re-reviews             │
└─────────────────────────────────────────┘
    ↓ (approved)
Phase 5: TESTING (Feedback Loop)
┌─────────────────────────────────────────┐
│ QA (AI) → Tests everything              │
│     ↓ (if bugs)                         │
│ Engineer (AI) → Fixes bugs              │
│     ↓                                    │
│ Architect (AI) → Reviews bug fixes      │
│     ↓                                    │
│ QA (AI) → Retests                       │
└─────────────────────────────────────────┘
    ↓ (all tests pass)
Phase 6: EXPERT REVIEW (Feedback Loop)
┌─────────────────────────────────────────┐
│ ├─→ Business Expert (AI) → Validates    │
│ ├─→ Data Expert (AI) → Validates        │
│ └─→ UX Designer (AI) → Validates        │
│     ↓ (if issues)                       │
│ Engineer (AI) → Fixes issues            │
│     ↓                                    │
│ Architect (AI) → Reviews changes        │
│     ↓                                    │
│ QA (AI) → Regression tests              │
│     ↓                                    │
│ All Experts → Re-review                 │
└─────────────────────────────────────────┘
    ↓ (all approved)
Manager → Compiles all reviews
    ↓
Phase 7: USER APPROVAL
You → Review & Approve: "Ship it!"
    ↓
Phase 8: DOCUMENTATION UPDATE
Documentation Agent (AI) → Updates all docs
    ↓
    - README.md (features, schema)
    - ARCHITECTURE.md (FSD structure)
    - API docs (hooks, components)
    - Code docs (JSDoc comments)
    ↓
Manager → "✅ Feature deployed & documented!"
```

Use when: Full feature development (most common)

### Parallel (Concurrent)
```
Manager
  ├─→ UX Designer (AI)
  ├─→ Architect (AI)
  └─→ Engineer (AI) ─→ Merge
         ↓
      QA (AI)
```

Use when: Tasks independent

### Iterative (Agile)
```
Requirements → Design → Build → Test → Fix
     ↑                                    ↓
     └────────────← Feedback ←───────────┘
```

Use when: Large features, need flexibility

---

## Best Practices

### 1. Clear Requirements
**Bad**: "Add tags"
**Good**: "Add user-created expense tags, max 5 per expense, with filtering"

### 2. Let Agents Work Autonomously
- Don't micromanage implementation details
- Agents know their domain
- Trust their expertise

### 3. Quality Gates
- Don't skip QA
- Always run verification
- Fix bugs before delivery

### 4. Communication
- Manager coordinates all communication
- Agents don't talk directly to each other
- You only talk to Manager

### 5. Iterative Development
- Break large features into smaller pieces
- Test frequently
- Get feedback early

---

## Summary

This multi-agent system replicates a real development team:

**You** → Product Owner (requirements)
**Manager** → Team Lead (coordination)
**UX Designer** → Designs UI/UX
**Architect** → Plans structure
**Engineer** → Writes code
**QA** → Ensures quality

**Result**: High-quality features built efficiently! 🚀
