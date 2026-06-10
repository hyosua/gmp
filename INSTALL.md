# Installation - Site GMP

## Versions requises

| Outil      | Minimum | Recommandée |
| ---------- | ------- | ----------- |
| Node.js    | 20      | 22 LTS      |
| PostgreSQL | 14      | 17          |

---

## 1. Installer Node.js

Vérifier si Node.js est déjà installé :

```
node -v
```

- Si le numéro affiché est `v20` ou supérieur : passez à l'étape 2.
- Sinon, installer selon votre OS :

**Windows**

1. Aller sur https://nodejs.org
2. Télécharger la version **LTS** (≥ 20) et lancer l'installeur `.msi`
3. Cocher "Automatically install necessary tools" si proposé
4. Fermer et rouvrir le terminal, puis vérifier avec `node -v`

**Linux (Ubuntu / Debian)**

```bash
sudo apt update && sudo apt install nodejs npm
```

Ou via `nvm` pour la version LTS la plus récente :

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
source ~/.bashrc
nvm install --lts
```

**Mac**

```bash
brew install node
```

Ou télécharger l'installeur `.pkg` sur https://nodejs.org

---

## 2. Installer PostgreSQL

### Windows

1. Télécharger l'installeur sur https://www.enterprisedb.com/downloads/postgres-postgresql-downloads
   - Choisir la version **17** (ou 16 minimum).

2. Lancer l'installeur et suivre les étapes :
   - Laisser le répertoire par défaut (`C:\Program Files\PostgreSQL\17`)
   - Choisir un mot de passe pour l'utilisateur `postgres` - **le noter**, il sera demandé plus tard
   - Laisser le port par défaut **5432**
   - **Stack Builder** : à la fin de l'installation, une fenêtre "Stack Builder" s'ouvre pour proposer des extensions supplémentaires. **Ce n'est pas nécessaire** pour ce projet - décocher tout et cliquer sur "Annuler" ou "Finish".

3. **Ajouter PostgreSQL au PATH** (indispensable) :
   - Touche `Win` → taper "variables d'environnement" → cliquer sur **"Modifier les variables d'environnement système"**
   - Cliquer sur **"Variables d'environnement..."**
   - Dans la section **"Variables système"**, sélectionner la ligne **`Path`** puis cliquer sur **"Modifier..."**
   - Cliquer sur **"Nouveau"** et entrer :
     ```
     C:\Program Files\PostgreSQL\17\bin
     ```
     _(remplacer `17` par votre version si différente)_
   - Cliquer sur **OK** trois fois pour fermer toutes les fenêtres
   - **Fermer et rouvrir** le terminal

4. Vérifier que l'installation est correcte :

   ```
   psql --version
   ```

   Vous devez voir quelque chose comme `psql (PostgreSQL) 17.x`.

5. S'assurer que le service PostgreSQL est démarré :
   - Touche `Win` → taper "Services" → chercher **"postgresql-x64-17"** → vérifier que le statut est **"En cours d'exécution"**
   - Sinon, faire un clic droit → "Démarrer"

### Linux (Ubuntu / Debian)

```bash
sudo apt install postgresql
sudo service postgresql start
```

### Mac

```bash
brew install postgresql@17
brew services start postgresql@17
```

---

## 3. Lancer le projet

1. Extraire le fichier `.zip`
2. Ouvrir un terminal dans le dossier extrait `gmp/`
   - **Windows** : clic droit sur le dossier > "Ouvrir dans le terminal"
   - **Linux / Mac** : `cd chemin/vers/gmp`

3. Lancer le script d'installation :

```
node setup.js
```

Le script installe les dépendances, crée la base de données et démarre le serveur.
Il demandera le mot de passe PostgreSQL sur Windows.

---

## 4. Ouvrir le site

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

**"node: command not found"** - Node.js n'est pas installé ou pas dans le PATH. Voir l'étape 1.

**"psql: command not found" (Windows)** - PostgreSQL n'est pas dans le PATH. Suivre l'étape 2.3 ci-dessus, puis relancer le terminal.

**Erreur de mot de passe PostgreSQL (Windows)** - Vérifier que vous entrez bien le mot de passe choisi lors de l'installation de PostgreSQL pour l'utilisateur `postgres`.

**Erreur de connexion à la base de données** - Vérifier que PostgreSQL est démarré (Services Windows ou `sudo service postgresql start` sur Linux).

**Pour plus de détails** sur la structure du projet, consulter [README.md](README.md).
