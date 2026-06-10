#!/bin/bash
set -e

echo "=== Installation du projet GMP ==="

# Vérification des prérequis
if ! command -v node &>/dev/null; then
  echo "ERREUR : Node.js n'est pas installé. Télécharger sur https://nodejs.org"
  exit 1
fi

if ! command -v createdb &>/dev/null; then
  echo "ERREUR : PostgreSQL n'est pas installé ou n'est pas dans le PATH."
  echo "Télécharger sur https://www.enterprisedb.com/downloads/postgres-postgresql-downloads"
  exit 1
fi

# Création du .env si absent
if [ ! -f .env ]; then
  echo ""
  echo "--- Configuration de la base de données ---"
  read -rsp "Mot de passe PostgreSQL (utilisateur postgres) : " PG_PASSWORD
  echo ""

  AUTH_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")

  sed "s/VOTRE_MOT_DE_PASSE/$PG_PASSWORD/g" .env.example > .env
  sed -i "s/your-auth-secret/$AUTH_SECRET/g" .env

  echo ".env créé."
else
  echo ".env déjà présent, on continue."
fi

# Dépendances
echo ""
echo "--- Installation des dépendances ---"
npm install

# Génération du client Prisma
echo ""
echo "--- Génération du client Prisma ---"
npx prisma generate

# Base de données
echo ""
echo "--- Création de la base de données ---"
PGPASSWORD="$PG_PASSWORD" createdb -U postgres gmp 2>/dev/null && echo "Base 'gmp' créée." || echo "Base 'gmp' déjà existante, on continue."

# Restauration du dump (données de démo incluses)
echo ""
echo "--- Chargement des données de démo ---"
PGPASSWORD="$PG_PASSWORD" psql -U postgres gmp < scripts/dump.sql > /dev/null 2>&1 && echo "Données chargées." || echo "Erreur lors du chargement du dump."

echo ""
echo "=== Installation terminée ==="
echo ""
echo "Lancer le projet : npm run dev"
echo "Ouvrir : http://localhost:3000"
echo ""
echo "Comptes de démo (mot de passe : gmp) :"
echo "  admin@test.com       - Administrateur"
echo "  enseignant1@test.com - Enseignant"
echo "  etudiant1@test.com   - Etudiant"
echo "  entreprise1@test.com - Entreprise"
