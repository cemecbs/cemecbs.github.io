# Frontier AI Timeline (Dark Mode)

An interactive, high-fidelity dark-mode timeline graph tracking the defining foundation models and frontier AI releases from late 2022 (ChatGPT launch) through late 2026.

Built with clean, standards-compliant HTML5, CSS3, and modern vanilla ES modules without heavy third-party framework dependencies.

---

## 🚀 Quick Start

To open and run the timeline locally:

### Option 1: Direct File Open
Double click `index.html` or run from your terminal:
```bash
open /Users/cmckeegan/src/frontier-ai-timeline/index.html
```

### Option 2: Local HTTP Server (Recommended for ES Modules)
```bash
cd /Users/cmckeegan/src/frontier-ai-timeline
python3 -m http.server 8000
```
Then visit [http://localhost:8000](http://localhost:8000) in any modern browser (Chrome, Edge, Safari, Firefox).

---

## 🌟 Key Features

1. **Dark Mode Cyber Architecture**:
   - Built from the ground up using `:root { color-scheme: dark; }` and `<meta name="color-scheme" content="dark">` to eliminate white flashes of unstyled content (FOUC) and theme native scrollbars and form inputs.
   - Distinctive lab brand color coding: OpenAI (emerald teal), Google DeepMind (electric blue), Anthropic (warm amber), Meta AI (violet), Mistral AI (blaze orange), xAI (steel silver), DeepSeek (sky azure).

2. **Frontier AI Dataset (2022 – Late 2026)**:
   - Covers 40 milestone frontier models from ChatGPT (GPT-3.5) and LLaMA 1 up through Claude 3.7 Sonnet, DeepSeek-R1, GPT-4.5, OpenAI o3, Gemini 3.0 Ultra, and Gemini 3.8 Flash & Live, Gemini 4 Carbon, and Claude Fable 5.2 & Mythos 5.2.
   - Tracks architecture (Dense vs Mixture-of-Experts), context window scaling (from 4k to 4,000,000 tokens), benchmark ratings (Chatbot Arena Elo, MMLU, SWE-bench, Math/AIME), and defining technical breakthroughs.

3. **Rich Hover Flyout (WCAG 1.4.13 Compliant)**:
   - **Dismissible**: Press <kbd>Escape</kbd> or click the close button to dismiss anytime.
   - **Hoverable**: Includes pointer bridge timing so users can effortlessly move their mouse from the node label directly into the flyout to read, select, or copy technical specifications without it closing.
   - **Persistent**: Click or press <kbd>P</kbd> to pin the flyout in place.
   - **Collision-Aware Positioning**: Automatically detects viewport bounds and flips above or below the anchor point, adjusting its directional arrow indicator dynamically.

4. **Multiple Interactive View Layouts**:
   - **Capability Graph**: 2D coordinate plot mapping release date on the X-axis against capability/intelligence index (Arena Elo scale) on the Y-axis, complete with SVG spline curves connecting lab progressions.
   - **Lab Swimlanes**: Horizontal chronological tracks separated by research organization with sticky sidebar headers.
   - **Milestone Stream**: Alternating vertical chronological card stream for structured reading.

5. **Navigation & Controls**:
   - **Instant Search**: Type `/` to immediately focus search across model names, architectures, benchmarks, and breakthroughs.
   - **Quick Year Jumps**: Instant smooth scroll to 2022, 2023, 2024, 2025, or 2026.
   - **Zoom & Pan**: Smooth timeline canvas dragging and zoom scaling controls.
   - **Head-to-Head Comparison Tool**: Compare any two frontier models side-by-side in a detailed spec modal.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| <kbd>/</kbd> | Focus the search input |
| <kbd>Esc</kbd> | Dismiss active flyout or close comparison modal |
| <kbd>P</kbd> | Pin / lock the active hover flyout |
| <kbd>Tab</kbd> | Navigate chronologically through milestone nodes |
| <kbd>Shift</kbd> + Scroll | Pan timeline horizontally across years |

---

## 📁 File Structure

```
frontier-ai-timeline/
├── index.html       # Semantic HTML5 markup, accessible popover containers & controls
├── styles.css       # Dark theme tokens, responsive layouts, glassmorphism, scrollbars
├── app.js           # Interactive state, view renderers, collision detection, event handlers
├── models-data.js   # Structured dataset of 40 frontier models (2022 - 2026)
└── README.md        # Documentation and quick start guide
```
