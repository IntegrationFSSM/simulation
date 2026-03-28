# Ory+ Clinical Psychology Simulator — Project Context

> **Purpose of this document:** Provide full architectural context for an AI assistant to understand and modify this codebase. This is a static frontend clinical dashboard built with vanilla HTML/CSS/JS (no build tools, no Node.js).

---

## 1. What This Application Does

**Ory+** is a clinical psychology simulation platform (ERP Médical) for psychologists. It allows a clinician to:

1. **Select a patient** (pre-loaded simulation data).
2. **Navigate a phased therapy protocol** (e.g., 15 sessions for anxiety, 55 for personality disorders).
3. **Open individual sessions** and fill out interactive clinical tools (worksheets, diary cards, structured forms).
4. **Track progress** via clinical scales (questionnaires like BDI, BAI, DERS) with automatic scoring and interpretation.
5. **Save all data to localStorage** — there is no backend server.

The application currently supports **3 clinical modules** (troubles), each in its own folder:

| Module | Folder | Trouble ID(s) | Sessions |
|--------|--------|---------------|----------|
| TAG (Generalized Anxiety) | `TAG/` | `DSM5_GAD` | 15 |
| Trouble Bipolaire | `Bipolaire/` | `Bipolaire` | 18 |
| Personnalité Limite (TPL) | `Personality/` | `TPL` (individual, 55 sessions) / `TPL_GROUP` (group, 16 sessions) | 55 or 16 |

---

## 2. Technology Stack

- **Languages:** HTML5, Vanilla CSS3, Vanilla JavaScript (ES6+)
- **CSS Framework:** Bootstrap 5.3.0 (CDN) — used for grid (`row`, `col-md-*`) and utilities (`d-flex`, `mb-3`)
- **Icons:** Font Awesome 6.4.0 (CDN)
- **Font:** Google Fonts — Inter (weights 400-900)
- **Charts:** Chart.js (CDN) — used for scale score progression graphs
- **Storage:** `localStorage` only — no backend, no database, no API calls
- **Build Tools:** None. Files are served statically (e.g., via VS Code Live Server or Python `http.server`)

---

## 3. File Structure

```
Psychologue/                          ← Project root
├── index.html                        ← Landing page (links to modules)
├── img/                              ← Shared images
│
├── TAG/                              ← Module: Generalized Anxiety Disorder
│   ├── index.html                    ← Module entry point (HTML + templates)
│   ├── Resources/                    ← PDF clinical resources
│   └── static/
│       ├── app.js          (90KB)    ← ★ SHARED APPLICATION ENGINE (used by all modules)
│       ├── styles.css      (42KB)    ← ★ SHARED DESIGN SYSTEM (base CSS for all modules)
│       ├── exercises.js    (36KB)    ← ★ SHARED EXERCISE RENDERER (DOM builders)
│       ├── storage.js      (4KB)     ← ★ SHARED STORAGE LAYER (LocalAPI + ExerciseStorage)
│       ├── data.js         (17KB)    ← TAG-specific: patient data, scales (BDI, BAI, QIA, EII)
│       ├── exercises_config.js (38KB)← TAG-specific: exercise definitions, PROTOCOL_TOOL_MAP
│       ├── protocols.js    (4KB)     ← TAG-specific: protocol phases definition
│       └── img/                      ← Logo files (OryLogofig.png, OryLogoBrand.png)
│
├── Bipolaire/                        ← Module: Bipolar Disorder
│   ├── index.html
│   ├── Resources/
│   └── static/
│       ├── app.js          (75KB)    ← Local copy (older, diverged from TAG's app.js)
│       ├── styles.css      (41KB)    ← Local copy (similar to TAG's)
│       ├── exercises.js    (30KB)    ← Local copy
│       ├── storage.js      (4KB)     ← Local copy
│       ├── data.js         (7KB)     ← Bipolaire-specific: patient data, scales
│       ├── exercises_config.js (19KB)← Bipolaire-specific: exercises + tools
│       └── protocols.js    (3KB)     ← Bipolaire-specific: protocol phases
│
├── Personality/                      ← Module: Borderline Personality Disorder (TPL/DBT)
│   ├── index.html                    ← Has a Level-1 approach selector (DBT vs Schema)
│   └── static/
│       ├── app.js          (15KB)    ← Legacy local app (NOT USED — loads ../TAG/static/app.js)
│       ├── styles.css      (28KB)    ← TPL-specific CSS overrides (colors, approach cards)
│       ├── data.js         (7KB)     ← TPL-specific: patient data, DERS/CRISIS scales
│       ├── exercises_config.js (23KB)← TPL-specific: 22 exercises (Diary Card, Fiches 1-28)
│       ├── protocols.js    (5KB)     ← TPL + TPL_GROUP protocol definitions
│       └── script.js       (6KB)     ← Legacy script (unused)
│
└── django_erp/                       ← Separate Django project (not part of this app)
```

### Key Architectural Insight: Shared vs Local Files

The application is moving toward a **unified engine** architecture where:

- **TAG/static/app.js** = The master application logic (used by TAG and Personality)
- **TAG/static/styles.css** = The master design system (loaded first by Personality)
- **TAG/static/exercises.js** = The master exercise DOM renderer
- **TAG/static/storage.js** = The master localStorage API

Each module only needs to provide its own **data files**:
- `data.js` — Patient profiles and clinical scales
- `protocols.js` — Protocol phase definitions
- `exercises_config.js` — Exercise/tool definitions

> **⚠ Bipolaire still uses its OWN local copies** of app.js, exercises.js, storage.js, and styles.css. It has not yet been unified.

---

## 4. Core Architecture (How It Works)

### 4.1. Boot Sequence

When a module's `index.html` loads, scripts execute in this order:

1. **`data.js`** → Defines `window.simulationData` with patient array and clinical scales
2. **`protocols.js`** → Defines `window.PROTOCOLS_DB` with phase/session mappings
3. **`storage.js`** → Defines `window.LocalAPI` and `window.ExerciseStorage`
4. **`exercises_config.js`** → Defines `EXERCISES`, `EXERCISE_CATEGORIES`, `PROTOCOL_TOOL_MAP`, and functions `getExerciseById()`, `getExercisesForSession()`
5. **`exercises.js`** → Defines `ExerciseStorage` object and `ExerciseRenderer` (DOM builders)
6. **Inline `<script>`** → Sets `window.currentTroubleId` (e.g., `"DSM5_GAD"`, `"TPL"`)
7. **`app.js`** → Defines the `app` object, calls `app.init()` at the end

### 4.2. The `app` Object (app.js)

The `app` singleton is the core controller. Key properties and methods:

```javascript
const app = {
    state: {
        activePanel: 'dossier',      // Current view: 'dossier' | 'session' | 'exercises' | 'exercise_detail'
        selectedPatient: null,        // The active patient object
        activeSession: null,          // { no: 3 } — current session number
        activeExerciseId: null,       // Currently rendered exercise ID
        chartInstance: null,          // Chart.js instance (destroyed on panel change)
        scaleAnswers: {},             // Temporary answers for clinical scales
        navigationHistory: []         // Stack for back navigation
    },

    init()                            // Bootstrap: load protocol, fetch patients, render
    showPanel(panelId, sessionNo)     // Navigate between views
    selectPatient(id)                 // Load patient and show dossier
    render()                          // Router: calls renderDossier/renderSession/etc.
    renderDossier(view)               // Build the patient file with phase accordions + timeline
    renderSession(view)               // Build session view with exercises and scales
    renderExercises(view)             // Exercise catalog browser
    completeCurrentSession()          // Mark session done, save to localStorage
    saveNotes()                       // Save clinical notes
    showToast(msg, type)              // Toast notification system
}
```

### 4.3. The Protocol System

Each trouble defines its protocol in `protocols.js` under `window.PROTOCOLS_DB`:

```javascript
window.PROTOCOLS_DB = {
    "DSM5_GAD": {
        trouble_id: "DSM5_GAD",
        trouble_name: "Trouble d'Anxiété Généralisée",
        default_total_sessions: 15,
        phases: [
            {
                phase_id: "phase_1_initial_interview",
                phase_name: "Phase 1 : Évaluation initiale",
                recommended_sessions: [1],           // Which session numbers belong here
                assessments: [                        // Clinical scales to administer
                    { tool_id: "BDI", required: true }
                ],
                worksheets: ["Tool_Name"],            // Exercise tools for this phase
                guides: ["Guide_Name"]                // Guide/info documents
            },
            // ... more phases
        ],
        // Optional (TPL_GROUP only):
        session_worksheets: {                         // Per-session tool overrides
            1: ["DBT_Fiche_1"],
            2: ["DBT_Fiche_2", "DBT_Fiche_3"]
        }
    }
};
```

At boot, `app.init()` sets `window.PROTOCOL = PROTOCOLS_DB[currentTroubleId]`.

### 4.4. The Exercise System

#### Exercise Definitions (exercises_config.js)

Each module defines exercises in a global `EXERCISES` array:

```javascript
const EXERCISES = [
    {
        id: 'diary_card_dbt',
        ref: 'TCD-01',
        title: 'Fiche d\'auto-observation quotidienne',
        category: 'tcd_base',           // Links to EXERCISE_CATEGORIES
        type: 'daily_log',              // Determines which renderer to use
        alwaysAvailable: true,           // Show in every session
        description: '...',
        columns: [...]                   // For daily_log type
    },
    {
        id: 'DBT_Fiche_6',
        type: 'structured_form',         // Generic form with fields
        fields: [
            { key: 'evenement', label: '...', type: 'textarea', rows: 2 },
            { key: 'menace', label: '...', type: 'select', options: ['A', 'B', 'C'] },
            { key: 'score', label: '...', type: 'number', min: 0, max: 100 }
        ]
    }
];
```

**Exercise types** (determined by `type` field):
- `structured_form` — Generic form with textarea, select, number, text fields
- `daily_log` — Table grid with rows (date-based entries)
- `checklist` — Checkbox list
- `info` / `model` — Read-only informational content
- `thought_record` — CBT thought record (TAG-specific)
- `exposure_scenario` — Imaginal exposure (TAG-specific)
- `diary_card_dbt` — DBT diary card (custom renderer)
- `chain_analysis` — DBT chain analysis (custom renderer)

#### PROTOCOL_TOOL_MAP

Maps protocol worksheet names to exercise IDs:

```javascript
const PROTOCOL_TOOL_MAP = {
    "DBT_Diary_Card": ['diary_card_dbt'],
    "DBT_Fiche_1": ['DBT_Fiche_1'],
    // ...
};
```

#### getExercisesForSession(sessionNo)

This is the critical function that determines which exercises appear in a given session:

1. Finds which phase contains the session number
2. Gets the phase's `worksheets` list (or `session_worksheets[no]` if defined)
3. Maps worksheet names through `PROTOCOL_TOOL_MAP` to get exercise IDs
4. Appends session-scoped suffixes (e.g., `_s4`) for data isolation
5. Adds `alwaysAvailable` exercises
6. Returns exercise objects via `getExerciseById()`

**Guide sessions** use fractional numbers (e.g., `0.9`, `3.9`) and load `guides` instead of `worksheets`.

### 4.5. Storage Layer

#### LocalAPI (storage.js)

Manages patient data in localStorage, keyed by trouble:

```javascript
const LocalAPI = {
    _getKey: () => 'ory_patients_' + (window.currentTroubleId || 'default'),
    getPatients()              // Returns { patients: [...] }
    getPatientProgress(id)     // Returns completed_sessions, current_session, notes, etc.
    completeSession(pid, no)   // Mark session complete
    addIntermediateSession()   // Add sub-sessions (e.g., 3.1, 3.2)
    savePatientProgress(p)     // Persist full patient object
};
```

#### ExerciseStorage (exercises.js)

Manages exercise completion data, scoped by patient + session:

```javascript
const ExerciseStorage = {
    _key(patientId, exerciseId, entryIndex)  // Generates: p{pid}_s{sessionNo}_{exId}
    get(pid, exId, entryIndex)               // Read saved data
    save(pid, exId, data, entryIndex)         // Write data
    getStatus(pid, exId)                      // 'completed' | 'in_progress' | null
    markComplete(pid, exId)                   // Mark as done
};
```

### 4.6. The Rendering Pipeline

`ExerciseRenderer` in `exercises.js` contains DOM builder methods for each exercise type:

```javascript
const ExerciseRenderer = {
    render(exercise, patientId)  // Switch on exercise.type → call specific renderer
    _renderStructuredForm(ex, pid)
    _renderDailyLog(ex, pid)
    _renderChecklist(ex, pid)
    _renderThoughtRecord(ex, pid)
    _renderDiaryCardDbt(ex, pid)
    _renderChainAnalysis(ex, pid)
    // ... etc.
};
```

Each renderer:
1. Creates a `panel-card` container
2. Builds form fields from the exercise definition
3. Pre-fills saved data from `ExerciseStorage`
4. Attaches save/complete event handlers
5. Returns the DOM element (inserted into `#session-exercise-render-area`)

---

## 5. Clinical Scales System

Scales are defined in each module's `data.js` under `simulationData.scales`:

```javascript
simulationData = {
    scales: {
        DERS: {
            name: "Échelle de Difficultés de Régulation Émotionnelle",
            items: ["Question 1...", "Question 2...", ...],
            options: ["Presque jamais (1)", "Parfois (2)", ...],
            maxScore: 64,
            interpretation: [
                { min: 16, max: 35, label: "Bonne régulation", color: "success" },
                { min: 36, max: 50, label: "Difficultés modérées", color: "warning" },
                { min: 51, max: 64, label: "Désrégulation sévère", color: "danger" }
            ]
        }
    }
};
```

Scales are administered via modal dialogs rendered by `app.renderScaleModal()`. Scores are stored in `patient.sessionScores[sessionNo]`.

---

## 6. UI Architecture

### Layout Structure

Every module's `index.html` follows this pattern:

```html
<body>
  <div class="sidebar-container">       <!-- Fixed left sidebar with navigation -->
    <nav class="sidebar">
      <div class="menu-items">          <!-- Links to TAG, Bipolaire, Personality -->
  </div>

  <div class="main-content">            <!-- Right content area -->
    <header class="top-header">          <!-- Breadcrumb + user chip -->
    <div id="app-view"></div>            <!-- Dynamic content injected here -->
    <footer class="main-footer">
  </div>

  <div id="modal-root"></div>            <!-- Modal injection point -->
  <div class="toast-stack"></div>        <!-- Toast notifications -->

  <!-- Templates (used by app.js to clone and populate) -->
  <template id="tpl-dossier">...</template>
  <template id="tpl-exercises">...</template>
  <template id="tpl-session">...</template>
</body>
```

### Template System

`app.js` uses `<template>` elements. On render:
1. Clone the template content
2. Populate DOM elements (`.getElementById`, `.querySelector`)
3. Replace `#app-view` innerHTML with the cloned content

### CSS Design Tokens (styles.css)

Key CSS custom properties:
```css
--primary: #2563eb;        /* Main brand blue */
--accent: #7c3aed;         /* Purple accent */
--success: #10b981;
--danger: #ef4444;
--warning: #f59e0b;
--bg-body: #f1f5f9;
--text: #1e293b;
--text-muted: #64748b;
--border: #e2e8f0;
--surface-1: #ffffff;
--shadow-sm / --shadow-md / --shadow-lg
--r-md / --r-lg / --r-xl   /* Border radii */
```

TPL module adds its own color overrides:
```css
--tpl-purple: #7c3aed;
--tpl-teal: #0d9488;
--tpl-purple-light: #ede9fe;
--tpl-teal-light: #ccfbf1;
```

### Key CSS Classes

| Class | Purpose |
|-------|---------|
| `.panel-card` | Main content card (white, rounded, shadow) |
| `.panel-card-header` | Card header with title |
| `.panel-card-body` | Card body content |
| `.session-timeline` | Vertical timeline container |
| `.timeline-row` | Single session row in timeline |
| `.timeline-dot` | Circular status indicator |
| `.phase-group` | Accordion group for protocol phases |
| `.approach-card` | Selection card (used in Personality Level 1) |
| `.approach-grid` | Grid for approach cards |
| `.btn-ghost` | Outlined button |
| `.btn-success-custom` | Green action button |
| `.toast-stack` | Toast notification container |
| `.session-layout` | Two-column layout for session view |
| `.session-sidebar-panel` | Left panel in session view |

---

## 7. Personality Module: Special Architecture

The Personality module has a **Level 1 selection gateway** before the dashboard:

```
User clicks "Personnalité Limite" in sidebar
    ↓
Level 1 View: Two approach cards appear
    ├── "Thérapie Comportementale Dialectique (TCD)" → Click reveals modalities
    │       ├── "TCD Individuelle"  → Sets currentTroubleId = "TPL"    (55 sessions)
    │       └── "Groupe"            → Sets currentTroubleId = "TPL_GROUP" (16 sessions)
    └── "Thérapie des Schémas" → (En développement)
            ├── "Individuel"
            └── "Groupe"
    ↓
launchDashboard(approach, modality) — hides Level 1, shows #app-view
    ↓
app.selectPatient() reloads with the new PROTOCOL context
```

The `TPL_GROUP` protocol uses a `session_worksheets` map for per-session tool assignment (rather than per-phase).

---

## 8. Data Flow Summary

```
User clicks session 4 in timeline
    → app.showPanel('session', 4)
    → app.renderSession(view)
        → getExercisesForSession(4)
            → Finds phase containing session 4
            → Reads phase.worksheets OR protocol.session_worksheets[4]
            → Maps through PROTOCOL_TOOL_MAP
            → Returns exercise objects
        → For each exercise: ExerciseRenderer.render(ex, patientId)
            → Builds DOM form
            → Pre-fills from ExerciseStorage.get()
        → Renders clinical scales sidebar from phase.assessments
    → User fills form, clicks "Sauvegarder"
        → ExerciseStorage.save(patientId, exId, formData)
        → Data persists in localStorage
    → User clicks "Clôturer la séance"
        → LocalAPI.completeSession(patientId, 4)
        → Session marked complete, currentSession advances
```

---

## 9. How to Add a New Clinical Module

To add a new trouble (e.g., "Insomnie"):

1. **Create folder:** `Insomnie/`
2. **Create `Insomnie/static/data.js`:** Define `simulationData` with patients and scales
3. **Create `Insomnie/static/protocols.js`:** Define `PROTOCOLS_DB["INSOMNIE"]` with phases
4. **Create `Insomnie/static/exercises_config.js`:** Define `EXERCISES`, `EXERCISE_CATEGORIES`, `PROTOCOL_TOOL_MAP`, and `getExercisesForSession()`
5. **Create `Insomnie/index.html`:** Copy from TAG, update:
   - `window.currentTroubleId = "INSOMNIE"`
   - Script paths to reference `../TAG/static/app.js`, `../TAG/static/storage.js`, `../TAG/static/exercises.js`
   - Local scripts: `static/data.js`, `static/protocols.js`, `static/exercises_config.js`
6. **Add sidebar link** in all other modules' `index.html` files
7. **Optionally create `Insomnie/static/styles.css`** for color overrides

---

## 10. Known Issues & Technical Debt

1. **Bipolaire is not unified:** It still uses its own copies of `app.js`, `exercises.js`, `storage.js`, and `styles.css` instead of referencing TAG's shared versions.
2. **No build system:** All JS is loaded via `<script>` tags in order. No modules, no bundling.
3. **Large file sizes:** `app.js` is ~90KB, `exercises_config.js` up to ~38KB. Could benefit from splitting.
4. **localStorage limits:** ~5-10MB per origin. Heavy use with many patients could hit quota.
5. **No authentication:** This is a simulation tool, not a production clinical system.
6. **Version cache-busting** is done manually via `?v=` query parameters.

---

## 11. Conventions & Patterns

- **Language:** All UI text is in **French**. Variable names and comments mix French and English.
- **ID naming:** DOM IDs use kebab-case (`session-exercises-area`, `dossier-session-timeline`)
- **Exercise IDs:** Use snake_case (`diary_card_dbt`, `DBT_Fiche_6`)
- **Protocol keys:** Use PascalCase with underscores (`DBT_Diary_Card`, `Guide_Module_1`)
- **Session scoping:** Exercise data is isolated per session via `_s{no}` suffix in storage keys
- **CSS custom properties:** Extensively used for theming and module-specific color overrides
- **No framework:** Pure vanilla JS with manual DOM manipulation. No React, Vue, or Angular.
