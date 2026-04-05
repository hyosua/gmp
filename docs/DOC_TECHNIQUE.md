# Documentation Technique - Projet GMP

Ce document est la reference technique pour le developpement et la maintenance du site institutionnel du departement GMP.

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

## 5. Deploiement et Maintenance

### 5.1 Commandes Utiles

- `npm run dev` : Lancement du serveur local.
- `npm run build` : Compilation pour la production (verifie types et lint).
- `npx prisma db seed` : Reinitialisation des donnees de test.
- `npx prisma migrate dev` : Application de nouveaux changements de schema.

### 5.2 Variables d'Environnement (.env)

- `DATABASE_URL` : Connexion PostgreSQL.
- `AUTH_SECRET` : Secret Auth.js.
- `RESEND_API_KEY` : Pour l'envoi des emails (futur).
