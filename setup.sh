#!/bin/bash
set -e

echo "=== Installation du projet GMP ==="

# Vérification des prérequis
if ! command -v node &>/dev/null; then
  echo "ERREUR : Node.js n'est pas installé. Télécharger sur https://nodejs.org"
  exit 1
fi

if ! command -v psql &>/dev/null; then
  echo "ERREUR : PostgreSQL n'est pas installé."
  echo "  Ubuntu/Debian : sudo apt install postgresql"
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

# Création de l'utilisateur PostgreSQL dédié
echo ""
echo "--- Création de l'utilisateur et de la base de données ---"
echo "(Le mot de passe demandé ci-dessous est celui de votre session Linux, pas PostgreSQL)"
sudo -u postgres psql -p "$PG_PORT" -q <<'EOF'
DO $$ BEGIN
  IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'gmp') THEN
    CREATE USER gmp WITH PASSWORD 'gmp';
  END IF;
END $$;
EOF

sudo -u postgres createdb -p "$PG_PORT" -O gmp gmp 2>/dev/null \
  && echo "Base 'gmp' créée." \
  || echo "Base 'gmp' déjà existante, on continue."

# Chargement des données de démo
echo ""
echo "--- Chargement des données de démo ---"
sudo -u postgres psql -p "$PG_PORT" -q gmp < scripts/dump.sql > /dev/null 2>&1 \
  && echo "Données chargées." \
  || echo "Erreur lors du chargement du dump."

# Permissions pour l'utilisateur gmp
sudo -u postgres psql -p "$PG_PORT" -q gmp <<'EOF'
GRANT ALL ON ALL TABLES IN SCHEMA public TO gmp;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO gmp;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO gmp;
GRANT USAGE ON SCHEMA public TO gmp;
EOF

# Création du .env
if [ ! -f .env ]; then
  echo ""
  echo "--- Configuration ---"
  AUTH_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
  cat > .env <<ENVEOF
DATABASE_URL="postgresql://gmp:gmp@localhost:${PG_PORT}/gmp?schema=public"
AUTH_SECRET="${AUTH_SECRET}"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
RESEND_API_KEY=""
RESEND_FROM=""
PRISMA_LOG_QUERIES=false
ENVEOF
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

# Application des migrations manquantes (sécurité)
echo ""
echo "--- Vérification du schéma ---"
npx prisma migrate deploy

echo ""
echo "=== Installation terminée ==="
echo ""
echo "Ouvrir : http://localhost:3000"
echo ""
echo "Comptes de démo (mot de passe : gmp) :"
echo "  admin@test.com       - Administrateur"
echo "  enseignant1@test.com - Enseignant"
echo "  etudiant1@test.com   - Etudiant"
echo "  entreprise1@test.com - Entreprise"
echo ""
npm run dev
