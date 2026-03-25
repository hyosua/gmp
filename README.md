# Site web — Département GMP

Site institutionnel du département Génie Mécanique et Productique (IUT d'Évry).

## Sommaire

- [Stack](#stack)
- [Prérequis](#prérequis)
- [Installer PostgreSQL (Windows)](#installer-postgresql-windows)
- [Installation du projet](#installation-du-projet)
- [Configuration](#configuration)
- [Base de données](#base-de-données)
- [Lancer le projet](#lancer-le-projet)
- [Mettre à jour le schéma Prisma](#mettre-à-jour-le-schéma-prisma)
- [Commandes utiles](#commandes-utiles)

## Stack

Next.js 16 · TypeScript · Tailwind CSS · PostgreSQL · Prisma · Auth.js v5

## Prérequis

- [Node.js](https://nodejs.org) v20+ — choisir la version LTS
- [PostgreSQL 16 pour Windows](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) — installer la version 16
- [GitHub Desktop](https://desktop.github.com)
- [VSCode](https://code.visualstudio.com)

## Installer PostgreSQL (Windows)

1. Télécharger l'installeur PostgreSQL 16 sur le lien ci-dessus
2. Lancer l'installeur, laisser les options par défaut
3. Choisir un mot de passe pour l'utilisateur `postgres` — **le noter**, il sera nécessaire
4. Laisser le port **5432** (défaut)
5. À la fin de l'installation, **décocher** "Launch Stack Builder"

**Ajouter PostgreSQL au PATH :**

`Panneau de configuration → Système → Paramètres système avancés → Variables d'environnement`

Dans "Variables système", sélectionner `Path` → Modifier → Nouveau → coller :
```
C:\Program Files\PostgreSQL\16\bin
```

Valider et **redémarrer VSCode**.

## Installation du projet

**1. Cloner le repo**

Dans GitHub Desktop : `File → Clone repository` → coller `https://github.com/hyosua/gmp` → choisir un dossier local → Clone.

Puis : `Open in Visual Studio Code`.

**2. Installer les dépendances**

Dans le terminal VSCode (`Ctrl+ù` ou `Terminal → New Terminal`) :

```bash
npm install
```

## Configuration

**3. Créer le fichier `.env`**

Dans VSCode : clic droit sur `.env.example` → `Copy` → coller dans le même dossier → renommer en `.env`.

Remplir les valeurs :

```env
DATABASE_URL="postgresql://postgres:VOTRE_MOT_DE_PASSE@localhost:5432/gmp?schema=public"
AUTH_SECRET=""
RESEND_API_KEY=""
RESEND_FROM="noreply@votre-domaine.fr"
```

Remplacer `VOTRE_MOT_DE_PASSE` par le mot de passe choisi lors de l'installation PostgreSQL.

Générer `AUTH_SECRET` :

```bash
npx auth secret
```

Copier la valeur affichée dans le champ `AUTH_SECRET` du `.env`.

> `RESEND_API_KEY` et `RESEND_FROM` sont nécessaires uniquement pour les fonctionnalités d'email (mot de passe oublié, notifications). Laisser vide en dev si non utilisé.

## Base de données

**4. Créer la base et appliquer le schéma**

```bash
# Créer la base (une seule fois)
createdb -U postgres gmp

# Appliquer le schéma
npx prisma migrate dev
```

Saisir le mot de passe `postgres` si demandé.

## Lancer le projet

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

## Mettre à jour le schéma Prisma

Quand le schéma Prisma change (nouvelle migration dans `prisma/migrations/`), appliquer les changements :

```bash
git pull
npm install
npx prisma migrate dev
```

> `npm install` est nécessaire si de nouvelles dépendances ont été ajoutées.
> `npx prisma migrate dev` applique toutes les migrations en attente sur votre BDD locale.

En cas d'erreur de synchronisation :

```bash
npx prisma migrate reset
```

> ⚠️ Cette commande supprime toutes les données locales. À n'utiliser qu'en développement.

## Commandes utiles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npx prisma migrate dev` | Appliquer les migrations |
| `npx prisma studio` | Interface visuelle BDD |
