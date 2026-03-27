# Charte graphique — Site GMP IUT d'Évry

## Identité

- **Public cible** : Mix lycéens (accueil/recrutement) · étudiants (espace connecté) · entreprises
- **Ton** : Institutionnel moderne — crédible sans être poussiéreux

## Couleurs

| Rôle | Valeur | Note |
|------|--------|------|
| Primaire | `#0d9488` | Teal — cohérence Paris-Saclay |
| Secondaire | `#f59e0b` | Amber — CTA, accents forts |
| Neutre coloré | `#81adc8` | Bleu acier clair — fonds, bordures secondaires |

CSS variables à définir dans `globals.css` :

```css
@theme {
  --color-primary: #0d9488;
  --color-primary-dark: #0f766e;
  --color-primary-light: #14b8a6;
  --color-secondary: #f59e0b;
  --color-secondary-dark: #d97706;
  --color-neutral: #81adc8;
  --color-neutral-light: #b8d4e8;
  --color-neutral-dark: #5a8aaa;
}
```

> Dark mode : tokens prévus, non implémenté en phase 1.

## Typographie

| Usage | Police | Source |
|-------|--------|--------|
| Corps & titres | Outfit | Google Fonts |
| Données tabulaires (notes, codes) | Geist Mono | Déjà installé |

- Scale : Tailwind par défaut (`text-sm` → `text-4xl` etc.)
- Pas de 3ème police.

## Formes & Espacement

| Élément | Valeur |
|---------|--------|
| Border radius cards/boutons | `0` (sharp — aucun arrondi) |
| Border radius badges/tags | `rounded-full` |
| Profondeur | Bordures `1px` — pas d'ombres |
| Hover/focus | `box-shadow` colorée teal |
| Layout | Container centré `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` |

## Navigation

- **Topbar publique** : Accueil, Formation, Entreprises, Actualités, Connexion
- **Barre secondaire** : apparaît une fois connecté, contextuelle au rôle

## Iconographie

- **Lucide React** — tree-shakeable, cohérent avec l'esthétique flat/sharp

## Visuels

- **Illustrations blueprint** : plans techniques, schémas isométriques, style dessin industriel
- **Photos** : visuels du département (ateliers, TP, machines) avec overlay teal monochrome

## Principes directeurs

1. Sharp over rounded — les angles droits évoquent la mécanique de précision
2. Borders over shadows — esthétique "blueprint technique", flat et net
3. Teal dominant, amber rare — l'amber est réservé aux CTA et alertes importantes
4. Bleu acier comme respiration — `#81adc8` pour les zones secondaires sans surcharger
