# Design System Strategy: Mechanical Precision

## 1. Overview & Creative North Star
**Creative North Star: "The Blueprint Blueprint"**

This design system rejects the "softness" of modern consumer web design in favor of the uncompromising rigidity of mechanical engineering. It is a digital manifestation of a technical schematic: precise, high-contrast, and structurally honest. 

To move beyond a generic "industrial" look, we employ **Asymmetric Structuralism**. While the grid is mathematically perfect, elements should be placed with intentional offset—mimicking the way a technical drawing balances heavy machinery with callout labels. We replace decorative elements with functional ones; if a line exists, it is a measurement or a boundary, never just a "decoration."

## 2. Colors & Surface Architecture

The palette is rooted in deep "Machinery Navy" and "Caution Orange," providing a high-contrast environment that ensures legibility and institutional authority.

### The "No-Shadow" Mandate
In this system, depth is a product of material layering, not light simulation. **Drop shadows are strictly prohibited.** We communicate elevation through:
1.  **1px Technical Borders:** Using `outline` (#a28d7a) or `outline_variant` (#544434).
2.  **Tonal Shifts:** Moving between `surface` (#001429) and `surface_container` (#00213d).

### Surface Hierarchy & Nesting
Treat the UI as a series of milled parts.
- **Base Layer:** `--c-bg` (#001429) - The workbench.
- **Primary Containers:** `--c-bg-card` (#00213d) - The components.
- **Interactive/Focus Zones:** `--c-bg-bright` (#063b65) - Nav hover, input focus bg.
- **Deepest Layer:** `--c-bg-deep` (#000f20) - Headers, footers.

**Borders:**
- **Card borders & separators:** `--c-border` (#544434) at 1px — warm, low-contrast
- **Secondary / ghost borders:** `--c-muted` (#a28d7a) at reduced opacity — barely visible guides

## 3. Typography: The Engineering Spec

The typographic system pairs the humanist clarity of **Outfit** with the rigid, fixed-width precision of **Geist Mono**.

| Role | Token | Font | Size | Intent |
| :--- | :--- | :--- | :--- | :--- |
| **Display** | `display-lg` | Outfit | 3.5rem | Bold, authoritative department titles. |
| **Headline** | `headline-md` | Outfit | 1.75rem | Section headers; should feel like manual titles. |
| **Label** | `label-md` | Geist Mono | 0.75rem | Metadata, technical specs, and UI "coordinates." |
| **Body** | `body-md` | Outfit | 0.875rem | Course descriptions and institutional copy. |

**Editorial Note:** All `label` styles must be set in **ALL CAPS** with a letter-spacing of `0.05em` to mimic the stamped lettering found on industrial ID plates.

## 4. Elevation & Structural Depth

Since we have abolished shadows and rounded corners (`border-radius: 0`), hierarchy is achieved through **Technical Line-Work**.

- **The Layering Principle:** Instead of shadows, use `--c-border` (#544434) at 1px to wrap containers. For hovered states on **buttons**, use a colored `box-shadow` offset (3–4px) — pas de changement de bordure, pas de scale.
- **The "Blueprint Grid":** Backgrounds should utilize a subtle 20px repeating SVG grid pattern using `outline_variant` at 5% opacity. This reinforces the "work-in-progress" engineering aesthetic.
- **Ghost Borders:** For secondary information, use the `outline_variant` at 20% opacity. It should be barely visible—enough to guide the eye, but not enough to create visual clutter.

## 5. Components

### Buttons: The "Actuator" Style
- **Primary:** Background `primary_container` (#f29400), Text `on_primary_container`. Square corners. No gradients.
- **Secondary:** 1px `primary` border, no fill. Text `primary`.
- **States:** On hover, primary buttons shift to `primary` (#ffb86a); secondary buttons gain a subtle `surface_bright` fill.

### Technical Chips
- Used for course codes (e.g., "MECH-101").
- **Style:** Geist Mono font, `surface_container_high` background, 1px `outline` border.

### Input Fields
- **Default:** 1px border `outline_variant`. Background `surface_container_low`.
- **Focus:** 1px border `primary`. Label shifts to `primary` color.
- **Micro-copy:** Use Geist Mono for helper text to distinguish "system" messages from user input.

### Cards & Technical Modules
- **Rule:** No divider lines within cards. Use `spacing.10` (2.25rem) to separate internal content blocks.
- **Header:** Include a "Technical ID" in the top-right corner of cards using Geist Mono (e.g., `REF_001`) to enhance the industrial vibe.

### Custom Component: The "Schematic Overlay"
For hero sections or department highlights, overlay a 1px `primary` line that connects a headline to an SVG gear or CNC schematic. This "callout" line creates an editorial, high-end look that feels custom-built.

## 6. CSS Blueprint Patterns

Ces classes utilitaires sont définies globalement (globals.css ou composant) et réutilisées dans toutes les pages.

### `.blueprint-grid`
Grille de fond 20×20px — appliquée sur les `<main>` et sections hero.
```css
background-image:
  linear-gradient(to right, rgba(84,68,52,0.1) 1px, transparent 1px),
  linear-gradient(to bottom, rgba(84,68,52,0.1) 1px, transparent 1px);
background-size: 20px 20px;
```
> En React, utiliser `forgeGrid` depuis `@/lib/forge` pour la version thématisée (adapte l'opacité selon light/dark via `--c-grid-color`).

### `.corner-bracket` + variantes
Marques L aux coins d'une card ou section — évoquent un cadre de dessin technique.
```css
.corner-bracket { position: absolute; width: 8px; height: 8px; border-color: var(--c-primary); }
.bracket-tl { top: 0; left: 0; border-top: 1px solid; border-left: 1px solid; }
.bracket-tr { top: 0; right: 0; border-top: 1px solid; border-right: 1px solid; }
.bracket-bl { bottom: 0; left: 0; border-bottom: 1px solid; border-left: 1px solid; }
.bracket-br { bottom: 0; right: 0; border-bottom: 1px solid; border-right: 1px solid; }
```
Usage type : opacité basse au repos (`opacity-20`), pleine au hover (`group-hover:opacity-100`).

### `.dimension-line`
Ligne de cote en tirets avec ticks aux extrémités — séparateur dans les blocs de stats/données.
```css
.dimension-line {
  height: 1px;
  background: repeating-linear-gradient(90deg, #544434 0, #544434 4px, transparent 4px, transparent 8px);
}
.dimension-line::before, .dimension-line::after {
  content: ''; position: absolute; top: -3px;
  width: 1px; height: 7px; background: #544434;
}
.dimension-line::after { right: 0; }
```

### `.hatch-pattern`
Hachures diagonales — overlay sur les cards expirées/indisponibles.
```css
background: repeating-linear-gradient(
  45deg,
  rgba(84,68,52,0.1), rgba(84,68,52,0.1) 10px,
  rgba(0,20,41,0.2) 10px, rgba(0,20,41,0.2) 20px
);
```

---

## 8. Do's and Don'ts

### Do
- **Do** use `Geist Mono` for any numerical data or "system-level" labels.
- **Do** use strict `0px` border-radius on every element, including buttons and inputs.
- **Do** use `primary` (#ffb86a) sparingly as a "high-alert" or "active" color.
- **Do** leverage whitespace as a functional separator.

### Don't
- **Don't** use any transition over 150ms. Transitions should be "snappy" and mechanical, not "fluid" and organic.
- **Don't** use drop shadows. If an element needs to stand out, give it a thicker 2px border or a high-contrast background.
- **Don't** use generic iconography. Use technical symbols (ISO-standard style) or blueprint-style SVG illustrations.
- **Don't** use center-alignment for long-form text. Stick to left-aligned "block" layouts to maintain the structural grid.