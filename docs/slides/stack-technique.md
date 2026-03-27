---
marp: true
theme: default
paginate: true
style: |
  :root {
    --color-primary: #1e3a5f;
    --color-accent: #e87722;
  }
  section {
    background: #ffffff;
    color: #1e3a5f;
    font-family: 'Segoe UI', sans-serif;
  }
  h1 { color: #1e3a5f; border-bottom: 3px solid #e87722; padding-bottom: 8px; }
  h2 { color: #e87722; }
  strong { color: #e87722; }
  section.cover {
    background: #1e3a5f;
    color: white;
  }
  section.cover h1 { color: white; border-bottom: 3px solid #e87722; }
  section.cover p { color: #ccc; }
  ul { line-height: 1.8; }
---

<!-- _class: cover -->

# Choix techniques

## Site web du département GMP

Yahaya Coulibaly · Hyosua Colléter
Maître d'ouvrage : Khalifa DJEMAL

---

# Contexte

Le département GMP a besoin d'un site centralisant :

- Informations publiques sur les formations
- Espace personnel pour **étudiants**, **enseignants**, **entreprises**
- Gestion de notes, emplois du temps, supports PDF, offres

→ **5 rôles**, données sensibles, hébergement contrôlé

---

# Next.js 16

- **SSR natif** → pages publiques indexées par Google
- API Routes intégrées → pas de serveur séparé
- Un seul langage (TypeScript) front + back

> Les pages vitrine (futurs inscrits) bénéficient du référencement.
> Les espaces authentifiés restent dynamiques.

---

# TypeScript

- 5 rôles avec des droits différents → **le typage prévient les erreurs d'accès**
- Modèles de données complexes (notes, emplois du temps)
- Erreurs détectées à la compilation, pas en production

---

# Auth.js v5

- Gestion native des **sessions et rôles**
- Middleware Next.js : routes protégées en une ligne
- **Self-hosted** → données sur notre VPS OVH, pas chez un tiers
- Évite de réimplémenter JWT + bcrypt manuellement

---

# PostgreSQL + Prisma

**PostgreSQL**

- Données fortement relationnelles : notes ↔ étudiants ↔ matières ↔ enseignants
- Transactions ACID, typage strict

**Prisma**

- Schéma = documentation de la BDD
- Migrations versionnées dans Git
- Requêtes typées → impossible de faire une faute de frappe silencieuse

---

# Tailwind CSS

- Styles directement dans les composants → **pas de fichiers CSS à maintenir**
- Responsive natif (`md:`, `lg:`) → site accessible sur mobile
- Cohérence visuelle garantie par les tokens de design

---

# Hébergement OVH

| Composant       | Choix              | Pourquoi                          |
| --------------- | ------------------ | --------------------------------- |
| Serveur         | VPS OVH (~3€/mois) | Node.js requis, données en France |
| Reverse proxy   | Nginx              | Standard industrie                |
| Process manager | PM2                | Redémarrage automatique           |
| HTTPS           | Let's Encrypt      | Gratuit, renouvellement auto      |

→ **Données étudiantes hébergées en France** (RGPD)

---

# Architecture
