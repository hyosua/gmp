# Plan : Site web du département GMP

> PRD source : spec.pdf — Spécification fonctionnelle pour la création d'un site WEB du Département Génie Mécanique et Productique (G.M.P)

## Décisions architecturales

Décisions durables qui s'appliquent à toutes les phases :

- **Stack** : Next.js 14 (App Router) + TypeScript + Auth.js v5 + PostgreSQL + Prisma + Tailwind CSS
- **Hébergement** : OVH VPS — Nginx reverse proxy + PM2 + Let's Encrypt
- **Fichiers PDF** : stockés dans `/uploads/` hors de `public/`, servis via API Route authentifiée
- **Routes publiques** : `/`, `/presentation`, `/presentation/but-gmp`, `/presentation/lieu`, `/presentation/programme`, `/presentation/specificite`, `/presentation/alternance`, `/presentation/apres-but`, `/licences`, `/licences/mie`, `/licences/mief`, `/licences/mri`
- **Routes protégées** : `/espace-etudiant/*`, `/espace-enseignant/*`, `/espace-entreprise/*`, `/admin/*`
- **Rôles** : `VISITEUR | ETUDIANT | ENSEIGNANT | ENTREPRISE | ADMIN`
- **Modèles clés** : `User`, `Role`, `Note`, `Matiere`, `EmploiDuTemps`, `SupportDeCours`, `ProjetTuteure`, `OffreAlternance`

---

## Phase 1 : Socle technique + pages publiques

**User stories** :
- En tant que visiteur, je peux consulter l'accueil du site
- En tant que visiteur, je peux consulter la présentation du département GMP (généralités BUT, lieu, programme, spécificité, alternance, après BUT)
- En tant que visiteur, je peux consulter les licences professionnelles (LP MIE, LP MIEF, LP MRI)

### A développer

Initialisation complète du projet et mise en place de toutes les pages accessibles sans authentification. Le visiteur doit pouvoir naviguer dans l'arborescence publique du site de bout en bout : depuis l'accueil jusqu'aux sous-pages de présentation et des licences professionnelles. Le schéma Prisma est initialisé avec les modèles de base, la connexion PostgreSQL est opérationnelle, et le projet est déployable sur le VPS OVH.

### Critères d'acceptation

- [ ] Le projet Next.js 14 démarre sans erreur avec TypeScript et Tailwind configurés
- [ ] La connexion PostgreSQL via Prisma est fonctionnelle (migration initiale appliquée)
- [ ] La page d'accueil `/` est accessible et affiche le contenu du département
- [ ] Toutes les sous-pages de `/presentation` sont accessibles et naviguables
- [ ] Les trois pages de licences (`/licences/mie`, `/licences/mief`, `/licences/mri`) sont accessibles
- [ ] La navigation entre les pages publiques fonctionne sans rechargement complet
- [ ] Le site est déployé sur le VPS OVH via PM2 + Nginx + HTTPS Let's Encrypt

---

## Phase 2 : Authentification et gestion des rôles

**User stories** :
- En tant qu'utilisateur, je peux me connecter avec mon email et mot de passe
- En tant qu'utilisateur connecté, je suis redirigé vers mon espace selon mon rôle
- En tant qu'utilisateur connecté, je peux me déconnecter
- En tant que visiteur non authentifié, je suis redirigé vers la page de connexion si j'accède à une route protégée

### A développer

Mise en place du système d'authentification complet avec Auth.js v5. La connexion se fait par email/mot de passe (credentials provider). Les 5 rôles sont persistés en base de données. Un middleware Next.js protège toutes les routes `/espace-*` et `/admin` : tout accès sans session valide redirige vers `/connexion`. Après connexion, chaque rôle est redirigé vers son espace dédié.

### Critères d'acceptation

- [ ] La page `/connexion` affiche un formulaire email + mot de passe
- [ ] Une connexion réussie crée une session Auth.js avec le rôle de l'utilisateur
- [ ] Un étudiant connecté est redirigé vers `/espace-etudiant`
- [ ] Un enseignant connecté est redirigé vers `/espace-enseignant`
- [ ] Une entreprise connectée est redirigée vers `/espace-entreprise`
- [ ] Un admin connecté est redirigé vers `/admin`
- [ ] Accéder à `/espace-etudiant` sans session redirige vers `/connexion`
- [ ] La déconnexion détruit la session et redirige vers `/`
- [ ] Les mots de passe sont hashés en base de données (bcrypt)

---

## Phase 3 : Espace étudiant

**User stories** :
- En tant qu'étudiant, je peux consulter mes notes
- En tant qu'étudiant, je peux consulter mon emploi du temps
- En tant qu'étudiant, je peux consulter les supports de cours déposés par les enseignants
- En tant qu'étudiant, je peux consulter les projets tuteurés disponibles
- En tant qu'étudiant, je peux consulter les offres d'alternance ouvertes à candidature

### A développer

Développement de l'espace étudiant en lecture seule. L'étudiant accède à un tableau de bord `/espace-etudiant` depuis lequel il navigue vers ses 5 sections. Les notes sont filtrées par étudiant connecté. Les PDFs de cours sont servis via une API Route qui vérifie la session avant d'envoyer le fichier. Les projets tuteurés et offres d'alternance sont listés avec leurs détails.

### Critères d'acceptation

- [ ] `/espace-etudiant/notes` affiche uniquement les notes de l'étudiant connecté
- [ ] `/espace-etudiant/emploi-du-temps` affiche le planning de l'étudiant
- [ ] `/espace-etudiant/supports-de-cours` liste les PDFs disponibles
- [ ] Un PDF ne peut pas être téléchargé sans session étudiant valide (test en navigation privée)
- [ ] `/espace-etudiant/projets-tuteurs` liste les projets disponibles
- [ ] `/espace-etudiant/offres-alternance` liste les offres ouvertes à candidature
- [ ] Un utilisateur avec le rôle ENSEIGNANT ou ENTREPRISE ne peut pas accéder à `/espace-etudiant`

---

## Phase 4 : Espace enseignant

**User stories** :
- En tant qu'enseignant, je peux ajouter une note pour un étudiant
- En tant qu'enseignant, je peux modifier une note que j'ai déposée
- En tant qu'enseignant, je peux consulter les notes que j'ai déposées
- En tant qu'enseignant, je peux consulter mon emploi du temps personnel
- En tant qu'enseignant, je peux déposer un PDF de support de cours

### A développer

Développement de l'espace enseignant avec droits en écriture sur les notes et les supports de cours. L'enseignant peut créer/modifier des notes associées à des étudiants et des matières. L'upload de PDF est géré via une API Route qui sauvegarde le fichier dans `/uploads/cours/` et enregistre les métadonnées en base de données. Un enseignant ne peut modifier que ses propres notes et supports.

### Critères d'acceptation

- [ ] `/espace-enseignant/notes` liste les notes déposées par l'enseignant connecté
- [ ] L'enseignant peut ajouter une note (étudiant, matière, valeur) via un formulaire
- [ ] L'enseignant peut modifier une note qu'il a créée
- [ ] L'enseignant ne peut pas modifier les notes d'un autre enseignant
- [ ] `/espace-enseignant/emploi-du-temps` affiche le planning de l'enseignant
- [ ] `/espace-enseignant/supports-de-cours` permet d'uploader un PDF (taille max à définir)
- [ ] Le PDF uploadé est accessible aux étudiants dans leur espace
- [ ] Un utilisateur avec le rôle ETUDIANT ou ENTREPRISE ne peut pas accéder à `/espace-enseignant`

---

## Phase 5 : Espace entreprise

**User stories** :
- En tant qu'entreprise, je peux ajouter une offre de projet tuteuré
- En tant qu'entreprise, je peux modifier mon offre de projet tuteuré
- En tant qu'entreprise, je peux consulter mes offres de projets tuteurés
- En tant qu'entreprise, je peux ajouter une offre d'alternance
- En tant qu'entreprise, je peux modifier mon offre d'alternance
- En tant qu'entreprise, je peux consulter mes offres d'alternance

### A développer

Développement de l'espace entreprise avec gestion complète (création, modification, consultation) des projets tuteurés et des offres d'alternance. Une entreprise ne voit et ne modifie que ses propres offres. Les offres créées sont visibles par les étudiants dans leur espace.

### Critères d'acceptation

- [ ] `/espace-entreprise/projets-tuteurs` liste les projets de l'entreprise connectée
- [ ] L'entreprise peut créer un projet tuteuré via un formulaire
- [ ] L'entreprise peut modifier un projet tuteuré qu'elle a créé
- [ ] L'entreprise ne peut pas modifier les projets d'une autre entreprise
- [ ] `/espace-entreprise/offres-alternance` liste les offres de l'entreprise connectée
- [ ] L'entreprise peut créer une offre d'alternance via un formulaire
- [ ] L'entreprise peut modifier une offre d'alternance qu'elle a créée
- [ ] Les offres et projets créés apparaissent dans l'espace étudiant
- [ ] Un utilisateur avec le rôle ETUDIANT ou ENSEIGNANT ne peut pas accéder à `/espace-entreprise`

---

## Phase 6 : Panel admin (Personnel GMP)

**User stories** :
- En tant qu'admin, je dispose de tous les droits des rôles Etudiant, Enseignant et Entreprise
- En tant qu'admin, je peux gérer l'ensemble du contenu du site via une barre d'administration

### A développer

Développement du panel d'administration accessible uniquement au rôle ADMIN. L'admin dispose d'une interface centralisée `/admin` pour gérer tous les utilisateurs (création, modification de rôle, désactivation), toutes les notes, tous les supports de cours, tous les projets tuteurés et toutes les offres d'alternance, sans restriction de propriété.

### Critères d'acceptation

- [ ] `/admin` est accessible uniquement avec le rôle ADMIN
- [ ] L'admin peut créer un utilisateur avec n'importe quel rôle
- [ ] L'admin peut modifier le rôle d'un utilisateur existant
- [ ] L'admin peut supprimer ou désactiver un compte utilisateur
- [ ] L'admin peut modifier ou supprimer n'importe quelle note, peu importe l'enseignant
- [ ] L'admin peut supprimer n'importe quel support de cours
- [ ] L'admin peut modifier ou supprimer n'importe quel projet tuteuré ou offre d'alternance
- [ ] Un utilisateur avec un rôle autre que ADMIN ne peut pas accéder à `/admin`
