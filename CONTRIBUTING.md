# Conventions de collaboration — Projet GMP

## Sommaire

- [Branches](#branches)
- [Commits](#commits)
- [Workflow](#workflow)
- [Pull Requests](#pull-requests)
- [Règles importantes](#règles-importantes)
- [Guide GitHub Desktop](#guide-github-desktop)

---

## Branches

### Nommage

```
<type>/<numéro-issue>-<description-courte>
```

| Type | Usage |
|------|-------|
| `feat/` | Nouvelle fonctionnalité |
| `fix/` | Correction de bug |
| `docs/` | Documentation uniquement |
| `chore/` | Config, dépendances, outillage |

**Exemples :**
```
feat/3-pages-publiques
feat/4-authentification
fix/5-notes-etudiant
docs/readme-deploiement
```

### Règles

- Ne jamais commiter directement sur `main`
- Une branche = une issue GitHub
- Supprimer la branche après merge

---

## Commits

### Format (Conventional Commits)

```
<type>(<scope>): <description courte>

[corps optionnel]
```

| Type | Usage |
|------|-------|
| `feat` | Nouvelle fonctionnalité |
| `fix` | Correction de bug |
| `docs` | Documentation |
| `style` | Formatage (pas de logique) |
| `refactor` | Refactorisation |
| `chore` | Config, dépendances |
| `test` | Ajout ou modification de tests |

**Exemples :**
```
feat(auth): ajouter le formulaire de connexion
fix(notes): corriger le filtrage par étudiant
docs(readme): ajouter section mise à jour schéma
chore(deps): mettre à jour next vers 16.2.1
```

### Règles

- Description en français, courte (< 72 caractères)
- Un commit = une modification logique
- Ne pas commiter `.env`, `node_modules/`, fichiers de build

---

## Workflow

```
1. Prendre une issue sur GitHub (s'assigner)
2. Créer une branche depuis main
3. Développer + commiter régulièrement
4. Pousser la branche
5. Ouvrir une Pull Request vers main
6. Faire relire par l'autre développeur
7. Merger après validation
8. Supprimer la branche
```

### Rester à jour

Avant de commencer à travailler :

```bash
git checkout main
git pull
git checkout ma-branche
git merge main
```

---

## Pull Requests

### Titre

Même format que les commits :
```
feat(auth): ajouter le formulaire de connexion
```

### Description minimale

```
Closes #<numéro-issue>

## Ce qui a été fait
- ...

## À tester
- [ ] ...
```

### Règles

- Toujours référencer l'issue avec `Closes #N`
- Ne pas merger sa propre PR sans relecture
- Résoudre les conflits avant de demander une review
- La branche doit compiler (`npm run build`) avant PR

---

## Règles importantes

| Interdit | Pourquoi |
|----------|----------|
| `git push --force` sur `main` | Écrase le travail de l'équipe |
| Commiter `.env` | Expose les mots de passe |
| Commiter `node_modules/` | Inutile et lourd |
| Merger sans que ça compile | Bloque tout le monde |

---

## Guide GitHub Desktop

Cette section est destinée aux utilisateurs de **GitHub Desktop + VSCode** sur Windows.

### Créer une branche

1. Dans GitHub Desktop, cliquer sur le menu déroulant `Current Branch`
2. Cliquer sur `New Branch`
3. Nommer la branche selon la convention : `feat/4-authentification`
4. Cliquer sur `Create Branch`

### Faire un commit

1. Après avoir modifié des fichiers dans VSCode, revenir dans GitHub Desktop
2. Les fichiers modifiés apparaissent dans le panneau de gauche
3. **Vérifier** que `.env` n'est pas coché — ne jamais le commiter
4. Remplir le champ `Summary` avec le message de commit :
   ```
   feat(auth): ajouter le formulaire de connexion
   ```
5. Cliquer sur `Commit to feat/4-authentification`

### Pousser une branche

1. Après le commit, cliquer sur `Push origin` (bandeau bleu en haut)
2. Si le bouton affiche `Publish Branch`, cliquer dessus — c'est le premier push

### Ouvrir une Pull Request

1. Après avoir poussé, GitHub Desktop affiche `Create Pull Request`
2. Cliquer dessus → GitHub s'ouvre dans le navigateur
3. Remplir le titre et la description selon les conventions ci-dessus
4. Cliquer sur `Create Pull Request`

### Récupérer les mises à jour de l'équipe

1. Aller sur la branche `main` : menu `Current Branch` → `main`
2. Cliquer sur `Fetch origin` puis `Pull origin`
3. Retourner sur sa branche de travail
4. Cliquer sur `Branch` → `Merge into current branch` → sélectionner `main`

### Résoudre un conflit

Si GitHub Desktop signale un conflit :

1. Cliquer sur `Open in Visual Studio Code`
2. Dans VSCode, les conflits sont marqués :
   ```
   <<<<<<< HEAD
   votre code
   =======
   code de l'équipe
   >>>>>>> main
   ```
3. Choisir quelle version garder (ou combiner les deux)
4. Supprimer les marqueurs `<<<<<<<`, `=======`, `>>>>>>>`
5. Sauvegarder, retourner dans GitHub Desktop
6. Cliquer sur `Continue Merge`
