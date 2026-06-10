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

Définir un mot de passe pour l'utilisateur `postgres` (le noter, il sera demandé plus tard) :

```bash
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'monmotdepasse';"
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

Le script demande le mot de passe PostgreSQL, configure tout automatiquement (dépendances, base de données, données de démo) et affiche un récapitulatif à la fin.

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

**"password authentication failed"** - Le mot de passe saisi ne correspond pas à celui défini lors de l'installation PostgreSQL.

**"database already exists"** - Normal si vous relancez le script, il continue sans problème.

**Port 5432 déjà utilisé** - Une autre instance PostgreSQL tourne peut-être. Redémarrer le service :

- Windows : `Gestionnaire de services > postgresql > Redémarrer`
- Linux : `sudo systemctl restart postgresql`
- Mac : `brew services restart postgresql@17`
