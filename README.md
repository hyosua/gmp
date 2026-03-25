# Site web — Département GMP

Site institutionnel du département Génie Mécanique et Productique (IUT d'Évry).

## Stack

Next.js 16 · TypeScript · Tailwind CSS · PostgreSQL · Prisma · Auth.js v5

## Prérequis

- [Node.js](https://nodejs.org) v20+
- [PostgreSQL](https://www.postgresql.org/download) (noter le port et le mot de passe à l'installation)

## Installation

```bash
git clone https://github.com/hyosua/gmp.git
cd gmp
npm install
```

## Configuration

Copier `.env.example` en `.env` et remplir les valeurs :

```bash
cp .env.example .env
```

```env
# Adapter selon votre config locale
# Windows : port 5432, user postgres
# Linux   : port 5433, user <votre-user-système>
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/gmp?schema=public"

# Générer avec : npx auth secret
AUTH_SECRET=""
```

## Base de données

```bash
# Créer la base (une seule fois)
createdb gmp

# Appliquer le schéma
npx prisma migrate dev
```

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
