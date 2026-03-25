# Cahier des charges — Site web du département Génie Mécanique et Productique (GMP)

---

## 1. Présentation du projet

### 1.1 Contexte

Le département Génie Mécanique et Productique (GMP) de l'IUT souhaite se doter d'un site web institutionnel. Ce site a pour vocation de centraliser les informations du département à destination de plusieurs publics : les futurs inscrits, les étudiants en cours de formation, les enseignants, les entreprises partenaires et le personnel administratif.

### 1.2 Parties prenantes

| Rôle             | Nom                               |
| ---------------- | --------------------------------- |
| Maître d'ouvrage | Khalifa DJEMAL                    |
| Maître d'oeuvre  | Yahaya Coulibaly, Hyosua Colléter |

### 1.3 Objectifs

- Présenter le département GMP et ses formations (BUT GMP, Licences Professionnelles)
- Offrir un espace personnel aux étudiants (notes, emploi du temps, supports de cours, offres)
- Offrir un espace de gestion aux enseignants (notes, supports de cours, emploi du temps)
- Permettre aux entreprises de déposer des offres d'alternance et des projets tuteurés
- Fournir au personnel GMP un panel d'administration pour gérer l'ensemble du contenu

### 1.4 Périmètre

**Inclus :**

- Site vitrine public (présentation département + licences professionnelles)
- Espaces authentifiés par rôle (étudiant, enseignant, entreprise, admin)
- Gestion des notes, emplois du temps, supports de cours (PDF), projets tuteurés, offres d'alternance
- Panel d'administration

**Exclu :**

- Application mobile
- Paiement en ligne
- Intégration avec des systèmes tiers (Apogée, Pronote, etc.)
- Messagerie interne

---

## 2. Arborescence du site

```
/
├── Accueil
├── Présentation du département GMP
│   ├── Généralité BUT GMP
│   ├── Lieu de formation
│   ├── Programme
│   ├── Spécificité du BUT GMP
│   ├── Formation en alternance
│   └── Après le BUT GMP
├── Licences professionnelles
│   ├── LP MIE
│   ├── LP MIEF
│   └── LP MRI
├── Espace étudiant (authentifié)
│   ├── Notes
│   ├── Emploi du temps
│   ├── Projets tuteurés
│   ├── Offres d'alternance
│   └── Supports de cours
├── Espace enseignant (authentifié)
│   ├── Notes
│   ├── Emploi du temps personnel
│   └── Supports de cours
├── Espace entreprise (authentifié)
│   ├── Projets tuteurés
│   └── Offres d'alternance
└── Administration (authentifié — Personnel GMP uniquement)
```

---

## 3. Gestion des droits

| Rôle                           | Fonctionnalités                                                                                                                       |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Visiteur** (non authentifié) | Consulter l'accueil, la présentation du département, les licences professionnelles                                                    |
| **Etudiant**                   | + Consulter ses notes, son emploi du temps, les supports de cours, les projets tuteurés disponibles, les offres d'alternance ouvertes |
| **Enseignant**                 | + Ajouter/modifier/consulter ses notes déposées, consulter son emploi du temps, déposer des PDFs de cours                             |
| **Entreprise**                 | + Ajouter/modifier/consulter ses projets tuteurés et offres d'alternance                                                              |
| **Admin (Personnel GMP)**      | Tous les droits ci-dessus + barre d'administration pour gérer l'ensemble du contenu et des utilisateurs                               |

---

## 4. Spécifications fonctionnelles

### 4.1 Pages publiques

**Accueil**

- Présentation générale du département
- Liens vers les sections principales
- Accès visible au formulaire de connexion

**Présentation du département**

- 6 sous-pages : BUT GMP, lieu de formation, programme, spécificité, alternance, après BUT
- Contenu éditorial géré par l'admin

**Licences professionnelles**

- 3 sous-pages : LP MIE, LP MIEF, LP MRI
- Contenu éditorial géré par l'admin

### 4.2 Authentification

- Connexion par email + mot de passe
- Redirection automatique vers l'espace correspondant au rôle après connexion
- Toutes les routes `/espace-*` et `/admin` sont protégées — accès sans session redirige vers `/connexion`
- Déconnexion disponible depuis tous les espaces

### 4.3 Espace étudiant

**Notes**

- Liste des notes de l'étudiant connecté, filtrées par matière
- Lecture seule

**Emploi du temps**

- Affichage du planning hebdomadaire de l'étudiant

**Supports de cours**

- Liste des PDFs déposés par les enseignants
- Téléchargement sécurisé (vérification de session obligatoire, fichier non accessible par URL directe)

**Projets tuteurés**

- Liste des projets disponibles déposés par les entreprises
- Consultation des détails (entreprise, description, prérequis)

**Offres d'alternance**

- Liste des offres ouvertes à candidature
- Consultation des détails (entreprise, poste, durée, rémunération)

### 4.4 Espace enseignant

**Notes**

- Liste des notes déposées par l'enseignant connecté
- Formulaire d'ajout : sélection étudiant + matière + valeur (0–20)
- Modification d'une note existante (ses notes uniquement)

**Emploi du temps**

- Affichage du planning personnel de l'enseignant

**Supports de cours**

- Upload d'un fichier PDF (taille max : 20 Mo)
- Liste des supports déposés par l'enseignant connecté
- Suppression d'un support (ses fichiers uniquement)

### 4.5 Espace entreprise

**Projets tuteurés**

- Formulaire de création : titre, description, prérequis, nombre d'étudiants souhaité
- Modification et consultation de ses propres projets

**Offres d'alternance**

- Formulaire de création : poste, description, durée, rémunération, prérequis
- Modification et consultation de ses propres offres

### 4.6 Panel d'administration

- Gestion des utilisateurs : création, modification de rôle, désactivation
- Gestion complète des notes (tous enseignants)
- Gestion complète des supports de cours
- Gestion complète des projets tuteurés et offres d'alternance
- Gestion du contenu éditorial des pages publiques

---

## 5. Spécifications techniques

### 5.1 Stack technologique

| Couche           | Technologie             | Justification                                                                   |
| ---------------- | ----------------------- | ------------------------------------------------------------------------------- |
| Framework        | Next.js 16 (App Router) | SSR pour le SEO des pages publiques, API Routes intégrées, un seul codebase     |
| Langage          | TypeScript              | Typage statique indispensable pour la gestion des 5 rôles et modèles de données |
| Authentification | Auth.js v5 (NextAuth)   | Gestion native des sessions et rôles, self-hosted, données sur OVH              |
| Base de données  | PostgreSQL              | Modèle relationnel adapté aux liens entre utilisateurs, notes, matières         |
| ORM              | Prisma                  | Schéma typé, migrations versionnées, Prisma Studio pour le dev                  |
| Styles           | Tailwind CSS            | Responsive natif, cohérence visuelle, pas de fichiers CSS séparés               |
| Runtime serveur  | Node.js (via PM2)       | Requis par Next.js, PM2 assure le redémarrage automatique                       |

### 5.2 Architecture applicative

```
Client (navigateur)
        │
        ▼
Nginx (reverse proxy — port 80/443)
        │  HTTPS via Let's Encrypt
        ▼
Next.js App (port 3000 — géré par PM2)
   ├── App Router (pages et layouts)
   ├── API Routes (auth, fichiers, données)
   └── Middleware (protection des routes par rôle)
        │
        ├──▶ PostgreSQL (port 5432 — local VPS)
        │
        └──▶ /uploads/ (PDFs — stockage local VPS)
```

### 5.3 Modèle de données (schéma Prisma)

```
User
  ├── id, email, password (hashé), nom, prenom
  ├── role: ETUDIANT | ENSEIGNANT | ENTREPRISE | ADMIN
  ├── parcours: SIMULATION_REALITE_VIRTUELLE | CONCEPTION_PRODUCTION_DURABLE | NON_DEFINI
  ├── typeFormation: INITIALE | ALTERNANCE
  └── createdAt, updatedAt

Groupe
  ├── id, nom (ex: "TD1", "TP2A", "Promo BUT2")
  ├── type: CM | TD | TP
  └── etudiants → User[] (relation n,n)

Note
  ├── id, valeur (0–20)
  ├── etudiantId → User
  ├── enseignantId → User
  └── matiereId → Matiere

Matiere
  └── id, nom, code

EmploiDuTemps
  ├── id, jour, heureDebut, heureFin, salle, intitule
  ├── groupeId → Groupe
  └── enseignantId → User

SupportDeCours
  ├── id, titre, cheminFichier, taille
  ├── enseignantId → User
  └── createdAt

ProjetTuteure
  ├── id, titre, description, prerequis, nbEtudiants
  ├── entrepriseId → User
  └── createdAt, updatedAt

OffreAlternance
  ├── id, poste, description, duree, remuneration, prerequis
  ├── entrepriseId → User
  └── createdAt, updatedAt
```

### 5.4 Hébergement et déploiement

| Composant         | Solution                | Détail                                              |
| ----------------- | ----------------------- | --------------------------------------------------- |
| Serveur           | OVH VPS Starter         | Ubuntu 22.04 LTS, 1 vCPU, 2 Go RAM                  |
| Reverse proxy     | Nginx                   | Redirige le port 80/443 vers Next.js (port 3000)    |
| Process manager   | PM2                     | Redémarrage automatique, logs, monitoring           |
| HTTPS             | Let's Encrypt + Certbot | Certificat gratuit, renouvellement automatique      |
| Base de données   | PostgreSQL              | Installé sur le VPS, accès local uniquement         |
| Stockage fichiers | Dossier `/uploads/`     | Hors de `public/`, accès via API Route authentifiée |
| Nom de domaine    | A définir               | Hébergé chez OVH                                    |

---

## 6. Contraintes

### 6.1 Sécurité

- Mots de passe hashés avec bcrypt (coût minimum 12)
- Les PDFs ne sont jamais accessibles par URL directe — toujours via API Route avec vérification de session
- Protection CSRF native via Auth.js
- Variables d'environnement sensibles (BDD, secret Auth.js) jamais committées

### 6.2 RGPD

- Les données des étudiants (notes, emplois du temps) sont hébergées sur un VPS OVH en France
- Aucune donnée personnelle transmise à des services tiers
- Politique de confidentialité à rédiger avant mise en production

### 6.3 Performances

- Cible : chargement des pages publiques < 2 secondes
- Volume max estimé : 200 utilisateurs actifs simultanés
- Les images sont optimisées via le composant `<Image>` Next.js
- Les PDFs sont servis en streaming (pas chargés entièrement en mémoire)

### 6.4 Compatibilité navigateurs

- Chrome, Firefox, Safari, Edge — versions N et N-1
- Responsive mobile obligatoire (étudiants sur smartphone)

### 6.5 Accessibilité

- Respect des bonnes pratiques WCAG 2.1 niveau AA recommandé
- Conformité RGAA à évaluer selon les exigences de l'établissement

---

## 7. Charte graphique

| Élément                     | Valeur                                                          |
| --------------------------- | --------------------------------------------------------------- |
| Couleur principale          | Bleu foncé                                                      |
| Couleur secondaire / accent | Orange                                                          |
| Logo                        | Logo officiel du département GMP fourni par le maître d'ouvrage |
| Typographie                 | A définir                                                       |
| Maquettes                   | A produire (phase 2 des étapes de réalisation)                  |

---

## 8. Planning

| Etape | Description                                      | Date           |
| ----- | ------------------------------------------------ | -------------- |
| 1     | Spécification fonctionnelle (ce document)        | Mars 2026      |
| 2     | Charte graphique et maquettes                    | Avril 2026     |
| 3     | Développement Phase 1 — Socle + pages publiques  | Avril 2026     |
| 4     | Développement Phase 2 — Authentification & rôles | Avril 2026     |
| 5     | **Présentation d'avancement**                    | **17/04/2026** |
| 6     | Développement Phase 3 — Espace étudiant          | Avril–Mai 2026 |
| 7     | Développement Phase 4 — Espace enseignant        | Mai 2026       |
| 8     | Développement Phase 5 — Espace entreprise        | Mai 2026       |
| 9     | Développement Phase 6 — Panel admin              | Mai 2026       |
| 10    | Tests, recette et mise en production             | Mai 2026       |
| 11    | **Livraison finale**                             | **19/05/2026** |

---

## 9. Estimation des coûts

| Poste                | Solution                    | Coût estimé  |
| -------------------- | --------------------------- | ------------ |
| VPS OVH Starter      | Hébergement serveur         | ~3 €/mois    |
| Nom de domaine       | OVH (.fr)                   | ~7 €/an      |
| Certificat SSL       | Let's Encrypt               | Gratuit      |
| Stockage fichiers    | Local VPS (inclus)          | Gratuit      |
| Base de données      | PostgreSQL sur VPS (inclus) | Gratuit      |
| Licences logicielles | Stack open source           | Gratuit      |
| **Total récurrent**  |                             | **~43 €/an** |

> Le développement est réalisé par les maîtres d'oeuvre dans le cadre d'un projet étudiant — coût main d'oeuvre non facturé.

---

## 10. Livrables

| Livrable                     | Format              | Echéance   |
| ---------------------------- | ------------------- | ---------- |
| Cahier des charges           | Markdown / PDF      | Mars 2026  |
| Maquettes (wireframes)       | Figma ou équivalent | Avril 2026 |
| Code source                  | Dépôt GitHub        | 19/05/2026 |
| Site déployé et fonctionnel  | URL en ligne        | 19/05/2026 |
| Documentation de déploiement | Markdown            | 19/05/2026 |

---

## 11. Glossaire

| Terme            | Définition                                                                          |
| ---------------- | ----------------------------------------------------------------------------------- |
| BUT GMP          | Bachelor Universitaire de Technologie Génie Mécanique et Productique                |
| LP               | Licence Professionnelle                                                             |
| Maître d'ouvrage | Commanditaire du projet, définit les besoins                                        |
| Maître d'oeuvre  | Equipe en charge de la réalisation technique                                        |
| RBAC             | Role-Based Access Control — contrôle d'accès basé sur les rôles                     |
| SSR              | Server-Side Rendering — rendu HTML côté serveur                                     |
| ORM              | Object-Relational Mapper — couche d'abstraction entre le code et la base de données |
| RGPD             | Règlement Général sur la Protection des Données                                     |
| RGAA             | Référentiel Général d'Amélioration de l'Accessibilité                               |
| VPS              | Virtual Private Server — serveur virtuel dédié                                      |
| PDF              | Portable Document Format — format de fichier pour les supports de cours             |
