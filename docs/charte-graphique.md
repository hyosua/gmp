# Charte graphique — Site GMP IUT d'Évry

## Identité

- **Public cible** : Mix lycéens (accueil/recrutement) · étudiants (espace connecté) · entreprises
- **Ton** : Institutionnel moderne — crédible sans être poussiéreux

---

## Thèmes

Le site supporte deux thèmes commutables via un bouton dans la nav. **Dark mode activé par défaut.**

| Thème | Fond principal | Primaire | Description |
|-------|---------------|----------|-------------|
| **Light** — V2 Forge Outfit | `#f8fafc` | `#0d9488` teal | Institutionnel clair |
| **Dark** — Forge | `#0A3D67` | `#F29400` orange GMP | Industriel sombre |

Le thème est persisté dans un **cookie HTTP** (`theme=dark|light`) lu côté serveur au rendu initial — pas de flash au chargement.

---

## Couleurs

Les couleurs sont définies comme **CSS custom properties** dans `globals.css`, avec un bloc `:root` (light) et un bloc `.dark`.

### Light (V2 Forge Outfit)

| Rôle | Variable | Valeur |
|------|----------|--------|
| Fond | `--c-bg` | `#f8fafc` |
| Fond profond | `--c-bg-deep` | `#f1f5f9` |
| Fond carte | `--c-bg-card` | `#ffffff` |
| Primaire | `--c-primary` | `#0d9488` — Teal |
| Texte | `--c-secondary` | `#171717` |
| Accent | `--c-accent` | `#f59e0b` — Amber |
| Bordure | `--c-border` | `#e2e8f0` |
| Neutre | `--c-muted` | `#81adc8` — Bleu acier |

### Dark (Forge)

| Rôle | Variable | Valeur |
|------|----------|--------|
| Fond | `--c-bg` | `#0A3D67` |
| Fond profond | `--c-bg-deep` | `#072d4d` |
| Fond carte | `--c-bg-card` | `#0D4E80` |
| Primaire | `--c-primary` | `#F29400` — Orange GMP |
| Texte | `--c-secondary` | `#e2e8f0` |
| Accent | `--c-accent` | `#fbbf24` — Ambre chaud |
| Bordure | `--c-border` | `#1A5A8A` |
| Neutre | `--c-muted` | `#64748b` |

### Variables utilitaires (opacité)

Les variantes d'opacité (`--c-primary-15`, `--c-secondary-80`, etc.) sont définies pour les deux thèmes dans `globals.css`. Ne jamais concaténer un hex alpha à une `var()` — utiliser ces variables.

```
--c-primary-15 / -20 / -30
--c-accent-30 / -40
--c-secondary-25 / -30 / -40 / -80 / -90
--c-photo-overlay    (overlay couleur sur photos N&B)
--c-grid-color       (grille blueprint)
--c-primary-hover    (hover bouton primaire)
```

### Usage en code

```ts
// src/lib/forge.ts — objet C (CSS vars uniquement, pas de hex)
import { C } from "@/lib/forge";

style={{ background: C.bg, color: C.secondary }}
style={{ border: `1px solid ${C.primary}` }}
style={{ background: "var(--c-primary-15)" }}   // opacité
```

---

## Typographie

| Usage | Police | Source |
|-------|--------|--------|
| Corps & titres | **Outfit** | Google Fonts |
| Données, codes, labels mono | **Geist Mono** | Next.js built-in |

- Scale : `clamp()` pour les titres principaux, Tailwind pour le reste
- Pas de 3ème police

---

## Formes & Espacement

| Élément | Valeur |
|---------|--------|
| Border radius cards/boutons | `0` — angles droits |
| Border radius badges | `rounded-full` |
| Profondeur | Bordures `1px` · pas d'ombres sauf hover |
| Hover boutons | `box-shadow: 3-4px offset` colorée |
| Layout container | `max-w-[1280px] mx-auto px-4 md:px-8` |

---

## Responsive

- **Mobile first** — breakpoints `md` (768px) et `lg` (1024px)
- Grilles : 1 col mobile → 2 col tablette → 3 col desktop selon section
- Padding sections réduit sur mobile via classes Tailwind
- La colonne photo du hero est masquée sur mobile (`hidden lg:block`)

---

## Navigation

- **Topbar publique** : Accueil, Formation, Entreprises, Actualités + ThemeToggle + Connexion
- Liens de nav masqués sur mobile (`hidden md:flex`)
- **Barre secondaire** : apparaît une fois connecté, contextuelle au rôle

---

## Iconographie

- **Lucide React** — tree-shakeable, cohérent avec l'esthétique flat/sharp

---

## Visuels

- **Illustrations blueprint SVG** : schémas techniques (presse hydraulique, CNC, engrenages, chaîne) — couleurs via CSS vars pour s'adapter au thème
- **Photos** : visuels ateliers/TP avec overlay monochrome couleur thème (`--c-photo-overlay`)
- **Cadrage photo hero** : double cadre offset (bordure primaire + ombre décalée), coins L-marks engineering, badge référence

---

## Principes directeurs

1. **Sharp over rounded** — les angles droits évoquent la mécanique de précision
2. **Borders over shadows** — esthétique blueprint technique, flat et net
3. **Teal dominant en light, orange GMP (#F29400) dominant en dark** — primaire cohérent avec le thème
4. **Amber rare** — réservé aux CTA et alertes importantes
5. **Bleu acier comme respiration** — `#81adc8` pour les zones secondaires
6. **Pas de hex alpha** — utiliser les variables `--c-*` d'opacité, jamais `${C.primary}20`
