# Documentation Technique - Projet GMP

Ce document est la reference technique pour le developpement et la maintenance du site institutionnel du departement GMP.

## Sommaire

- [1. Architecture du Projet](#1-architecture-du-projet)
  - [1.1 Stack Technologique](#11-stack-technologique)
  - [1.2 Structure des repertoires](#12-structure-des-repertoires)
- [2. Authentification et Securite](#2-authentification-et-securite)
  - [2.1 Flux d'authentification](#21-flux-dauthentification-connexion)
  - [2.2 Flux de deconnexion](#22-flux-de-deconnexion)
  - [2.3 Controle d'Acces Base sur les Roles (RBAC)](#23-controle-dacces-base-sur-les-roles-rbac)
  - [2.4 Securisation des Donnees](#23-securisation-des-donnees)
- [3. Base de Donnees (Prisma 7)](#3-base-de-donnees-prisma-7)
  - [3.1 Architecture Driver Adapter](#31-architecture-driver-adapter)
  - [3.2 Modeles Principaux](#32-modeles-principaux)
- [4. Design System "Forge"](#4-design-system-forge)
  - [4.1 Philosophie](#41-philosophie)
  - [4.2 Utilisation des couleurs](#42-utilisation-des-couleurs)
- [5. Intégration Continue (CI)](#5-intégration-continue-ci)
  - [5.1 Pipeline GitHub Actions](#51-pipeline-github-actions-githubworkflowsciyml)
  - [5.2 Variables d'environnement CI](#52-variables-denvironnement-ci)
  - [5.3 Notes](#53-notes)
- [6. Hooks Git (Husky + lint-staged)](#6-hooks-git-husky--lint-staged)
  - [6.1 Pourquoi des hooks ?](#61-pourquoi-des-hooks-)
  - [6.2 Mise en place](#62-mise-en-place-première-installation)
  - [6.3 Windows — prérequis](#63-windows--prérequis)
  - [6.4 Contourner un hook](#64-contourner-un-hook-cas-exceptionnel)
- [7. Deploiement et Maintenance](#7-deploiement-et-maintenance)

## 1. Architecture du Projet

### 1.1 Stack Technologique

- **Framework** : Next.js 16 (App Router) - Utilisation intensive des Server Components.
- **Langage** : TypeScript (Strict mode).
- **Base de donnees** : PostgreSQL.
- **ORM** : Prisma 7 (Architecture ESM-first).
- **Authentification** : Auth.js v5 (NextAuth).
- **Styling** : Tailwind CSS 4 (PostCSS 8).
- **Animations** : GSAP 3 (GreenSock) pour les composants visuels industriels.

### 1.2 Structure des repertoires

- `src/app/` : Routes, layouts et pages (App Router).
  - `(public)/` : Routes accessibles sans authentification (Presentation, BUT, Licences).
  - `(dashboard)/` : Routes protegees necessitant une session.
  - `api/auth/` : Points d'entree pour Auth.js.
- `src/components/` : Composants React reutilisables.
  - `forge/` : Composants du design system coeur (Forge).
  - `illustrations/` : Animations mecaniques GSAP.
  - `layout/` : Navigation, Sidebar, Footer.
  - `ui/` : Primitives atomiques.
- `src/lib/` : Utilitaires, instances (Prisma, Auth) et actions serveur.
- `prisma/` : Schema de base de donnees et scripts de migration/seed.
- `types/` : Definitions de types TypeScript globales et extensions (ex: NextAuth).

## 2. Authentification et Securite

### 2.1 Flux d'authentification (Connexion)

1. L'utilisateur soumet ses identifiants via `src/components/auth/LoginForm.tsx`.
2. La Server Action `authenticate` (`src/lib/actions/auth.ts`) appelle `signIn` d'Auth.js.
3. Le provider `Credentials` dans `src/lib/auth.ts` :
   - Verifie l'existence de l'utilisateur via Prisma.
   - Compare le mot de passe avec `bcryptjs`.
   - Retourne un objet `User` incluant son `id` et son `role`.
4. Le callback `jwt` stocke le role dans le token.
5. Le callback `session` rend le role disponible cote client et serveur.

### 2.2 Flux de deconnexion

Pour garantir une redirection fiable et eviter les erreurs de communication serveur ("Unexpected response"), la deconnexion est geree cote client :

1. L'utilisateur clique sur un bouton de deconnexion (`LogoutButton.tsx` ou `Sidebar.tsx`).
2. La fonction `signOut` de `next-auth/react` est appelee avec `callbackUrl: '/'`.
3. La session est detruite et le navigateur est redirige vers la page d'accueil.

### 2.3 Controle d'Acces Base sur les Roles (RBAC)

Le middleware (`src/middleware.ts`) agit comme un pare-feu avant le rendu des pages.

| Espace               | Role Autorise | Redirection si non autorise                |
| -------------------- | ------------- | ------------------------------------------ |
| `/espace-etudiant`   | ETUDIANT      | Vers l'espace propre au role ou /connexion |
| `/espace-enseignant` | ENSEIGNANT    | Vers l'espace propre au role ou /connexion |
| `/espace-entreprise` | ENTREPRISE    | Vers l'espace propre au role ou /connexion |
| `/admin`             | ADMIN         | Vers l'espace propre au role ou /connexion |

### 2.3 Securisation des Donnees

- **Mots de passe** : Jamais stockes en clair. Utilisation de bcryptjs (Salt rounds: 10).
- **Sessions** : Chiffrees via `AUTH_SECRET` (variable d'environnement critique).
- **CSRF** : Protection native via Auth.js et Next.js.

## 3. Base de Donnees (Prisma 7)

### 3.1 Architecture Driver Adapter

Prisma 7 necessite l'utilisation de Driver Adapters pour PostgreSQL afin d'eviter les dependances binaires lourdes (Rust-free) :

- Implementation via `@prisma/adapter-pg` et le pool de connexions `pg`.
- L'instance est centralisee dans `src/lib/prisma.ts` pour eviter les fuites de connexions en developpement.

### 3.2 Modeles Principaux

- **User** : Entite centrale (Etudiants, Profs, Admins, Entreprises).
- **Groupe** : Gestion des promotions et sous-groupes (CM/TD/TP).
- **UE / Matiere / Note** : Structure pedagogique et resultats.
- **EmploiDuTemps** : Gestion des creneaux horaires.

## 4. Design System "Forge"

### 4.1 Philosophie

L'esthetique "Forge" repose sur un style industriel/blueprint :

- Bordures marquees (`border-2`).
- Ombres portees nettes (`shadow-[x_y_0_color]`).
- Typographie `Outfit` pour le titrage et `Geist Mono` pour les donnees.

### 4.2 Utilisation des couleurs

Il est strictement interdit d'utiliser les classes de couleurs Tailwind par defaut (ex: `text-blue-600`).
Utiliser les variables semantiques definies dans `src/app/globals.css` :

- `text-primary` : Couleur d'accentuation (Teal en clair, Orange en sombre).
- `text-secondary` : Texte principal.
- `bg-background` : Fond de page.
- `bg-bg-card` : Fond des cartes et formulaires.
- `border-border` : Couleur des bordures standard.

## 5. Intégration Continue (CI)

### 5.1 Pipeline GitHub Actions (`.github/workflows/ci.yml`)

Déclenché sur chaque `push` vers `main` ou `feat/**`, et sur chaque Pull Request vers `main`.

| Job               | Outil                               | Rôle                                                                           |
| ----------------- | ----------------------------------- | ------------------------------------------------------------------------------ |
| Secret Scanning   | Gitleaks v2                         | Détecte les secrets (tokens, clés) commitées par erreur                        |
| SAST              | CodeQL                              | Analyse statique TypeScript/Next.js — résultats dans l'onglet Security du repo |
| Build, Lint & SCA | ESLint + `npm audit` + `next build` | Qualité du code, vulnérabilités des dépendances, compilation                   |

### 5.2 Variables d'environnement CI

Le job `build-and-test` utilise des valeurs fictives pour permettre la compilation sans base de données réelle :

```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/gmp
AUTH_SECRET=dummy-secret-for-ci-build-only
NEXTAUTH_URL=http://localhost:3000
```

> Pour un pipeline de staging connecté à une vraie base, définir ces valeurs dans **Settings → Secrets and variables → Actions** du repo GitHub.

### 5.3 Notes

- `HUSKY=0` désactive les hooks git en environnement CI.
- `npm audit` est non-bloquant (`continue-on-error: true`) — les vulnérabilités sont signalées sans faire échouer le pipeline.
- La configuration datasource Prisma 7 est gérée exclusivement via `prisma.config.ts` (pas de `url` dans `schema.prisma`).

## 6. Hooks Git (Husky + lint-staged)

### 6.1 Pourquoi des hooks ?

Les hooks git sont des scripts qui s'exécutent automatiquement à certaines étapes du workflow git. Ils permettent d'attraper les erreurs **avant** qu'elles n'atteignent le dépôt distant, sans dépendre de la CI.

| Hook         | Déclenchement | Ce qu'il fait                                                      |
| ------------ | ------------- | ------------------------------------------------------------------ |
| `pre-commit` | `git commit`  | Formate et lint les fichiers stagés + vérifie les types TypeScript |
| `pre-push`   | `git push`    | Lance un `next build` complet pour s'assurer que le build passe    |

**Détail du `pre-commit` via lint-staged :**

- Fichiers `*.{js,jsx,ts,tsx}` → `eslint --fix` puis `prettier --write`
- Fichiers `*.{css,md,json}` → `prettier --write`

Seuls les fichiers stagés sont traités (pas tout le projet), ce qui rend le hook rapide.

### 6.2 Mise en place (première installation)

Husky s'installe automatiquement via le script `prepare` de npm. Une seule commande suffit après avoir cloné le repo :

```bash
npm install
```

> `npm install` exécute `npm run prepare` → `husky`, qui enregistre les hooks dans `.git/hooks/`.

**Vérification :** après l'install, le dossier `.git/hooks/` doit contenir les fichiers `pre-commit` et `pre-push`.

### 6.3 Windows — prérequis

Husky fonctionne sur Windows, mais nécessite un shell compatible POSIX. Deux options :

**Option A — Git Bash (recommandée, zéro config)**

- Inclus avec [Git for Windows](https://git-scm.com/download/win)
- Configurer Git pour utiliser Git Bash par défaut :
  ```bash
  git config --global core.hooksPath .husky
  ```
- Lancer les commandes git depuis **Git Bash** (pas PowerShell ni CMD).

**Option B — WSL2**

- Installer WSL2 et une distribution Linux (Ubuntu recommandé)
- Cloner le repo depuis WSL2 et travailler depuis le terminal WSL
- Les hooks fonctionnent nativement, identique à Linux/macOS

### 6.4 Contourner un hook (cas exceptionnel)

Si un hook bloque un commit légitime (ex : commit WIP, fix urgent) :

```bash
# Passer le pre-commit uniquement
git commit --no-verify -m "wip: ..."

# Passer le pre-push uniquement
git push --no-verify
```

> A utiliser avec parcimonie. Le build cassé doit être corrigé avant la PR.

## 7. Deploiement et Maintenance

### 5.1 Commandes Utiles

- `npm run dev` : Lancement du serveur local.
- `npm run build` : Compilation pour la production (verifie types et lint).
- `npx prisma db seed` : Reinitialisation des donnees de test.
- `npx prisma migrate dev` : Application de nouveaux changements de schema.

### 5.2 Variables d'Environnement (.env)

- `DATABASE_URL` : Connexion PostgreSQL.
- `AUTH_SECRET` : Secret Auth.js.
- `RESEND_API_KEY` : Pour l'envoi des emails (futur).
