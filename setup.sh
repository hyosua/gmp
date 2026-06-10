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

# Détection du port PostgreSQL
echo ""
echo "--- Détection du port PostgreSQL ---"
PG_PORT=""
for port in 5432 5433 5434 5435; do
  if pg_isready -h localhost -p "$port" -q 2>/dev/null; then
    PG_PORT=$port
    echo "PostgreSQL détecté sur le port $PG_PORT."
    break
  fi
done
if [ -z "$PG_PORT" ]; then
  echo "Impossible de détecter PostgreSQL automatiquement."
  read -rp "Port PostgreSQL [5432] : " PG_PORT
  PG_PORT=${PG_PORT:-5432}
fi

# Création du .env si absent
if [ ! -f .env ]; then
  echo ""
  echo "--- Configuration de la base de données ---"
  read -rp  "Utilisateur PostgreSQL [postgres] : " PG_USER
  PG_USER=${PG_USER:-postgres}
  read -rsp "Mot de passe PostgreSQL (utilisateur $PG_USER) : " PG_PASSWORD
  echo ""

  AUTH_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")

  sed "s/postgres:VOTRE_MOT_DE_PASSE/${PG_USER}:${PG_PASSWORD}/g" .env.example \
    | sed "s/:5432\//:${PG_PORT}\//g" > .env
  sed -i "s/your-auth-secret/$AUTH_SECRET/g" .env

  echo ".env créé."
else
  echo ".env déjà présent, on continue."
  PG_USER=$(grep DATABASE_URL .env | sed 's|.*://\([^:]*\):.*|\1|')
  PG_PASSWORD=$(grep DATABASE_URL .env | sed 's|.*://[^:]*:\([^@]*\)@.*|\1|')
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
PGPASSWORD="$PG_PASSWORD" createdb -U "$PG_USER" -h localhost -p "$PG_PORT" gmp 2>/dev/null && echo "Base 'gmp' créée." || echo "Base 'gmp' déjà existante, on continue."

# Restauration du dump (données de démo incluses)
echo ""
echo "--- Chargement des données de démo ---"
PGPASSWORD="$PG_PASSWORD" psql -U "$PG_USER" -h localhost -p "$PG_PORT" gmp < scripts/dump.sql > /dev/null 2>&1 && echo "Données chargées." || echo "Erreur lors du chargement du dump."

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
