# Site web — Département GMP

Site institutionnel du département Génie Mécanique et Productique (IUT d'Évry).

## Stack

Next.js 16 · TypeScript · Tailwind CSS · PostgreSQL · Prisma · Auth.js v5

## Prérequis

- [Node.js](https://nodejs.org) v20+
- [PostgreSQL](https://www.postgresql.org/download/windows) — noter le mot de passe `postgres` défini à l'installation
- [GitHub Desktop](https://desktop.github.com)
- [VSCode](https://code.visualstudio.com)

## Installation

**1. Cloner le repo**

Dans GitHub Desktop : `File → Clone repository` → coller `https://github.com/hyosua/gmp` → choisir un dossier local → Clone.

Puis ouvrir le projet dans VSCode : `Open in Visual Studio Code`.

**2. Installer les dépendances**

Dans le terminal VSCode (`Ctrl+ù` ou `Terminal → New Terminal`) :

```bash
npm install
```

## Configuration

**3. Créer le fichier `.env`**

Copier `.env.example` en `.env` (dans VSCode : clic droit sur `.env.example` → Copy, puis coller et renommer en `.env`).

Remplir les valeurs :

```env
DATABASE_URL="postgresql://postgres:VOTRE_MOT_DE_PASSE@localhost:5432/gmp?schema=public"
AUTH_SECRET=""
```

Générer `AUTH_SECRET` dans le terminal :

```bash
npx auth secret
```

Copier la valeur générée dans `.env`.

## Base de données

**4. Créer la base et appliquer le schéma**

Dans le terminal VSCode :

```bash
# Créer la base (une seule fois)
createdb -U postgres gmp

# Appliquer le schéma
npx prisma migrate dev
```

> Si `createdb` n'est pas reconnu, ajouter PostgreSQL au PATH Windows :
> `C:\Program Files\PostgreSQL\16\bin` → Variables d'environnement système → Path.

## Lancer le projet

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

## Commandes utiles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npx prisma migrate dev` | Appliquer les migrations |
| `npx prisma studio` | Interface visuelle BDD |
