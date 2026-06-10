# Installation - Site GMP

## 1. Installer Node.js

**Windows / macOS** - télécharger la version **LTS** sur https://nodejs.org et suivre l'installeur.

**Ubuntu / Debian** - via NodeSource :

```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Vérifier l'installation :

```bash
node -v
```

---

## 2. Installer PostgreSQL

### Windows

Télécharger l'installeur sur https://www.enterprisedb.com/downloads/postgres-postgresql-downloads (prendre la dernière version).

Pendant l'installation :

- Laisser toutes les options par défaut
- Choisir un mot de passe pour l'utilisateur `postgres` - **le noter**
- Port : **5432** (défaut)
- Décocher "Launch Stack Builder" à la fin

**Ajouter PostgreSQL au PATH :**

> Panneau de configuration > Système > Paramètres système avancés > Variables d'environnement

Dans "Variables système", sélectionner `Path` > Modifier > Nouveau, coller :

```
C:\Program Files\PostgreSQL\17\bin
```

(adapter `17` selon la version installée)

Valider et **redémarrer le terminal**.

---

### Ubuntu / Debian

```bash
sudo apt update && sudo apt install -y postgresql
sudo systemctl start postgresql
```

---

### macOS

Installer via [Homebrew](https://brew.sh) :

```bash
brew install postgresql@17
brew services start postgresql@17
echo 'export PATH="/opt/homebrew/opt/postgresql@17/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

Définir un mot de passe :

```bash
psql postgres -c "ALTER USER $(whoami) PASSWORD 'monmotdepasse';"
```

> Sur Mac avec Homebrew, l'utilisateur PostgreSQL par défaut est votre nom de session macOS (pas `postgres`). Le script demandera ce nom lors de la configuration.

---

## 3. Installer le projet

Décompresser le dossier, ouvrir un terminal dedans, puis lancer le script d'installation :

**Windows** - double-cliquer sur `setup.bat` ou dans un terminal :

```
setup.bat
```

**Linux / Mac** :

```bash
bash setup.sh
```

Le script configure tout automatiquement (dépendances, base de données, données de démo) et affiche un récapitulatif à la fin. Il peut demander votre mot de passe `sudo` pour créer la base PostgreSQL.

---

## 4. Lancer le projet

```bash
npm run dev
```

Ouvrir **http://localhost:3000**

---

## Comptes de démo

Mot de passe pour tous : **gmp**

| Email                | Rôle           |
| -------------------- | -------------- |
| admin@test.com       | Administrateur |
| enseignant1@test.com | Enseignant     |
| etudiant1@test.com   | Étudiant       |
| entreprise1@test.com | Entreprise     |

---

## En cas de problème

**"createdb: command not found"** - PostgreSQL n'est pas dans le PATH. Voir l'étape 2 pour votre OS.

**"permission denied"** - Le script utilise `sudo` pour créer la base. Vérifier que l'utilisateur courant a les droits sudo.

**"database already exists"** - Normal si vous relancez le script, il continue sans problème.

**Port 5432 déjà utilisé** - Une autre instance PostgreSQL tourne peut-être. Redémarrer le service :

- Windows : `Gestionnaire de services > postgresql > Redémarrer`
- Linux : `sudo systemctl restart postgresql`
- Mac : `brew services restart postgresql@17`

---

## Installation manuelle (si le script échoue)

Exécuter les commandes suivantes une par une dans le terminal, depuis le dossier du projet.

**1. Créer l'utilisateur et la base de données**

```bash
sudo -u postgres psql -c "CREATE USER gmp WITH PASSWORD 'gmp';"
sudo -u postgres createdb -O gmp gmp
```

**2. Charger les données de démo**

```bash
sudo -u postgres psql gmp < scripts/dump.sql
```

**3. Donner les permissions à l'utilisateur**

```bash
sudo -u postgres psql gmp -c "
  GRANT ALL ON ALL TABLES IN SCHEMA public TO gmp;
  GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO gmp;
  GRANT USAGE ON SCHEMA public TO gmp;
"
```

**4. Créer le fichier `.env`**

Créer un fichier `.env` à la racine du projet avec ce contenu (remplacer `5432` par votre port si différent) :

```env
DATABASE_URL="postgresql://gmp:gmp@localhost:5432/gmp?schema=public"
AUTH_SECRET="une-chaine-aleatoire-longue"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
RESEND_API_KEY=""
RESEND_FROM=""
PRISMA_LOG_QUERIES=false
```

Pour générer une vraie valeur `AUTH_SECRET` :

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**5. Installer et lancer**

```bash
npm install
npx prisma generate
npx prisma migrate deploy
npm run dev
```

Ouvrir **http://localhost:3000**
