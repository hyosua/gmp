# Expression des besoins — Site web du département GMP

**Projet** : Site institutionnel du département Génie Mécanique et Productique
**Établissement** : IUT d'Évry-Courcouronnes
**Date** : Mars 2026
**Version** : 1.0

---

## Historique des versions

| Version | Date       | Auteurs                               | Objet                    |
| ------- | ---------- | ------------------------------------- | ------------------------ |
| 1.0     | Mars 2026  | Yahaya Coulibaly, Hyosua Colléter     | Première version officielle |

---

## Parties prenantes

| Rôle                  | Nom / Entité                                              | Responsabilités                                                       |
| --------------------- | --------------------------------------------------------- | --------------------------------------------------------------------- |
| Maître d'ouvrage      | Khalifa DJEMAL — Chef du département GMP                  | Exprime les besoins, valide les livrables, réceptionne le produit final |
| Maître d'œuvre        | Yahaya Coulibaly, Hyosua Colléter — LP DAWII              | Conception, développement et déploiement du site                      |
| Maître d'œuvre (futur)| Étudiants LP DAWII (promotions suivantes)                 | Maintenance et évolution du site après livraison                      |
| Encadrant pédagogique | Responsable de formation LP DAWII                         | Suivi du projet, évaluation, validation des jalons                    |

---

## 1. Contexte et objectifs stratégiques

### 1.1 Contexte

Le département Génie Mécanique et Productique (GMP) de l'IUT d'Évry-Courcouronnes ne dispose pas à ce jour d'un site web qui lui soit propre. La présence numérique du département se limite à une page dédiée sur le site institutionnel de l'IUT, présentant les formations et les coordonnées de contact pour les inscriptions. Pour la partie pédagogique, le département s'appuie sur eCampus, la plateforme numérique universitaire de l'établissement, dont l'accès est conditionné à l'activation d'un compte numérique universitaire.

Cette situation présente plusieurs limites :

- L'identité propre du département GMP est peu visible, noyée dans le site générique de l'IUT.
- Les futurs étudiants (lycéens, étudiants en réorientation) n'ont pas accès à une présentation approfondie et autonome des formations proposées.
- Les informations pédagogiques (notes, emplois du temps, supports de cours) sont dispersées entre eCampus et des canaux informels (email, documents partagés).
- Les entreprises partenaires n'ont pas de point d'entrée dédié pour déposer des offres d'alternance ou des projets tuteurés.

Le chef du département, Khalifa DJEMAL, a décidé d'initier la création d'un site web institutionnel propre au département GMP pour remédier à ces lacunes.

### 1.2 Objectifs stratégiques

Le projet poursuit quatre objectifs stratégiques :

1. **Renforcer la visibilité du département** : offrir une vitrine publique autonome, indépendante du site IUT, présentant l'ensemble des formations (BUT GMP, Licences Professionnelles) de manière exhaustive et attractive.

2. **Centraliser les outils pédagogiques internes** : fournir aux étudiants et aux enseignants un espace numérique unique pour accéder aux notes, emplois du temps et supports de cours, en complément ou en substitution partielle d'eCampus.

3. **Faciliter les partenariats entreprises** : mettre à disposition des entreprises partenaires un espace dédié leur permettant de publier directement leurs offres d'alternance et projets tuteurés à destination des étudiants.

4. **Assurer la pérennité et la maintenabilité** : concevoir un système administrable par le personnel du département, et dont la maintenance technique pourra être assurée par les promotions successives d'étudiants de la LP DAWII.

---

## 2. Utilisateurs cibles et profils

Le site s'adresse à cinq profils d'utilisateurs distincts, avec des niveaux d'accès différenciés.

### 2.1 Visiteur (non authentifié)

**Profil** : Lycéen en recherche de formation, étudiant en réorientation, parent, professionnel consultant le site par curiosité.
**Niveau technique** : Hétérogène — le site doit être accessible sans compétences particulières.
**Besoins** : Consulter la présentation du département, les programmes de formation, les débouchés, la localisation et les modalités d'admission.
**Contrainte spécifique** : Aucune inscription requise. Le contenu public doit être accessible sans barrière.

### 2.2 Étudiant (authentifié)

**Profil** : Étudiant inscrit en BUT GMP (parcours Simulation–Réalité Virtuelle ou Conception–Production Durable), en formation initiale ou en alternance, ou étudiant d'une Licence Professionnelle (MIE, MIEF, MRI).
**Nombre estimé** : Non quantifié à ce stade (à préciser lors de la mise en production).
**Niveau technique** : Utilisateur courant de smartphones et d'outils numériques universitaires.
**Besoins** : Consulter ses notes, son emploi du temps, les supports de cours déposés par les enseignants, les projets tuteurés disponibles et les offres d'alternance ouvertes.
**Contrainte spécifique** : Accès en lecture seule. Les documents (PDFs) doivent être protégés et non accessibles sans authentification.

### 2.3 Enseignant (authentifié)

**Profil** : Enseignant ou intervenant du département GMP.
**Niveau technique** : Utilisateur averti, habitué aux outils numériques de l'enseignement supérieur.
**Besoins** : Saisir et modifier les notes des étudiants, consulter son emploi du temps personnel, déposer des supports de cours au format PDF.
**Contrainte spécifique** : Un enseignant ne peut modifier que ses propres données (notes et supports). Il ne doit pas pouvoir accéder ni modifier les données d'un autre enseignant.

### 2.4 Entreprise partenaire (authentifiée)

**Profil** : Entreprise souhaitant proposer des projets tuteurés ou des offres d'alternance aux étudiants du département.
**Niveau technique** : Variable. L'interface doit être simple et guidée.
**Besoins** : Créer un compte en autonomie, publier et gérer ses propres projets tuteurés et offres d'alternance.
**Contrainte spécifique** : Une entreprise n'a accès qu'à ses propres contenus. La création de compte se fait par auto-inscription.

### 2.5 Administrateur (authentifié)

**Profil** : Chef du département (Khalifa DJEMAL) et créateurs du site (étudiants LP DAWII responsables de la maintenance).
**Niveau technique** : Élevé pour les créateurs ; intermédiaire pour le chef de département.
**Besoins** : Gérer l'ensemble des utilisateurs et des contenus du site (notes, supports, offres, projets), sans restriction de propriété.
**Contrainte spécifique** : Accès exclusivement réservé au rôle ADMIN. Toute tentative d'accès par un autre rôle doit être bloquée.

---

## 3. Besoins fonctionnels et non fonctionnels

### 3.1 Besoins fonctionnels

#### BF-01 — Vitrine publique

Le système doit permettre à tout visiteur de consulter, sans authentification :
- La page d'accueil du département GMP.
- Les pages de présentation du département (généralités BUT GMP, lieu de formation, programme, spécificité, formation en alternance, débouchés après BUT).
- Les pages des trois Licences Professionnelles (LP MIE, LP MIEF, LP MRI).

#### BF-02 — Authentification et gestion des rôles

Le système doit proposer une connexion par identifiant email et mot de passe. Après connexion, chaque utilisateur est redirigé vers l'espace correspondant à son rôle. Toute tentative d'accès à un espace protégé sans session valide redirige vers la page de connexion. La déconnexion doit être disponible depuis tous les espaces authentifiés.

#### BF-03 — Espace étudiant

Le système doit permettre à l'étudiant connecté de :
- Consulter ses notes, filtrées par matière.
- Consulter son emploi du temps hebdomadaire.
- Télécharger les supports de cours (PDF) déposés par les enseignants.
- Consulter les projets tuteurés disponibles (titre, entreprise, description, prérequis).
- Consulter les offres d'alternance ouvertes (poste, durée, rémunération, entreprise).

#### BF-04 — Espace enseignant

Le système doit permettre à l'enseignant connecté de :
- Consulter, ajouter et modifier ses propres notes (association étudiant–matière–valeur).
- Consulter son emploi du temps personnel.
- Déposer, consulter et supprimer ses propres supports de cours (PDF, 20 Mo max).

#### BF-05 — Espace entreprise

Le système doit permettre à l'entreprise connectée de :
- Créer, consulter et modifier ses propres projets tuteurés.
- Créer, consulter et modifier ses propres offres d'alternance.

#### BF-06 — Panel d'administration

Le système doit permettre à l'administrateur de :
- Créer, modifier le rôle et désactiver tout compte utilisateur.
- Gérer l'ensemble des notes, supports de cours, projets tuteurés et offres d'alternance, sans restriction de propriété.
- Gérer le contenu éditorial des pages publiques.

### 3.2 Besoins non fonctionnels

#### BNF-01 — Performance

Les pages publiques doivent se charger en moins de 2 secondes sur une connexion standard. Le volume cible est estimé à 200 utilisateurs actifs simultanés maximum.

#### BNF-02 — Sécurité

- Les mots de passe doivent être stockés sous forme hachée (bcrypt, coût minimum 12).
- Les fichiers PDF ne sont jamais accessibles par URL directe ; ils sont servis via une route API qui vérifie la session avant tout envoi.
- Les variables d'environnement sensibles (secrets de base de données, clé Auth.js) ne doivent jamais être versionnées.
- La protection CSRF est assurée nativement par le framework d'authentification.

#### BNF-03 — Conformité RGPD

Les données personnelles des utilisateurs (notes, emplois du temps) sont hébergées sur un serveur localisé en France (OVH). Aucune donnée personnelle n'est transmise à des services tiers. Une politique de confidentialité devra être rédigée avant la mise en production.

#### BNF-04 — Compatibilité et responsive

Le site doit être fonctionnel sur les navigateurs Chrome, Firefox, Safari et Edge (versions N et N−1). L'affichage doit être adapté aux smartphones, tablettes et ordinateurs de bureau.

#### BNF-05 — Accessibilité

Le respect des bonnes pratiques WCAG 2.1 niveau AA est recommandé. La conformité au RGAA n'est pas imposée à ce stade par l'établissement.

---

## 4. Contraintes et critères d'acceptation

### 4.1 Contraintes

#### Contraintes temporelles

| Jalon                     | Date           | Caractère     |
| ------------------------- | -------------- | ------------- |
| Présentation d'avancement | 17 avril 2026  | Non négociable |
| Livraison finale          | 19 mai 2026    | Non négociable |

Ces dates sont imposées par le responsable de formation de la LP DAWII dans le cadre de l'évaluation du projet.

#### Contraintes budgétaires

Le projet est réalisé dans un cadre étudiant. La main-d'œuvre n'est pas facturée. Les seuls coûts engagés sont les coûts d'infrastructure :

| Poste              | Solution              | Coût estimé  |
| ------------------ | --------------------- | ------------ |
| Serveur VPS        | OVH VPS Starter       | ~36 €/an     |
| Nom de domaine     | OVH (.fr)             | ~7 €/an      |
| Certificat SSL     | Let's Encrypt         | Gratuit      |
| **Total**          |                       | **~43 €/an** |

Aucun budget institutionnel n'est alloué au projet à ce stade.

#### Contraintes techniques

- Le site doit être déployé sur un VPS OVH sous Ubuntu 22.04 LTS.
- La stack technologique est fixée : Next.js (App Router), TypeScript, PostgreSQL, Prisma, Auth.js v5, Tailwind CSS.
- Le stockage des fichiers PDF doit être réalisé hors du répertoire public, avec accès exclusivement via route API authentifiée.
- L'application mobile est explicitement hors périmètre.
- L'intégration avec des systèmes tiers (Apogée, Pronote, eCampus) est hors périmètre.

### 4.2 Critères d'acceptation

Le projet sera considéré comme livré et conforme aux besoins lorsque les conditions suivantes seront vérifiées :

| Critère | Description |
| ------- | ----------- |
| CA-01 | Le site est déployé et accessible en ligne avant le 19/05/2026. |
| CA-02 | Les pages publiques (accueil, présentation, licences) sont consultables sans authentification. |
| CA-03 | Les quatre espaces authentifiés (étudiant, enseignant, entreprise, admin) sont fonctionnels et accessibles uniquement via session valide. |
| CA-04 | Aucune donnée personnelle (note, emploi du temps, PDF) n'est accessible sans authentification. |
| CA-05 | Le panel d'administration permet la gestion complète des utilisateurs et des contenus. |
| CA-06 | Le site est responsive et fonctionnel sur mobile. |

---

## 5. Périmètre du projet

### Inclus

- Site vitrine public (présentation département + licences professionnelles)
- Espaces authentifiés par rôle (étudiant, enseignant, entreprise, admin)
- Gestion des notes, emplois du temps, supports de cours, projets tuteurés, offres d'alternance
- Panel d'administration

### Exclus

- Application mobile native
- Paiement en ligne
- Intégration avec des systèmes tiers (Apogée, Pronote, eCampus)
- Messagerie interne entre utilisateurs

---

## 6. Glossaire

| Terme            | Définition                                                                          |
| ---------------- | ----------------------------------------------------------------------------------- |
| BUT GMP          | Bachelor Universitaire de Technologie Génie Mécanique et Productique                |
| LP               | Licence Professionnelle                                                             |
| DAWII            | Développement d'Applications Web et Internet Intégrant — LP dont sont issus les créateurs du site |
| MOA              | Maître d'Ouvrage — commanditaire du projet, exprime et valide les besoins           |
| MOE              | Maître d'Œuvre — équipe en charge de la réalisation technique                       |
| RBAC             | Role-Based Access Control — contrôle d'accès basé sur les rôles                     |
| RGPD             | Règlement Général sur la Protection des Données                                     |
| RGAA             | Référentiel Général d'Amélioration de l'Accessibilité                               |
| eCampus          | Plateforme numérique universitaire de l'IUT d'Évry                                  |
| VPS              | Virtual Private Server — serveur virtuel dédié                                      |
