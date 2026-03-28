"""
gen_expression_besoins.py
Génère docs/expression-des-besoins.docx via le template GMP.
Usage : python3 docs/templates/gen_expression_besoins.py
"""

import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from gmp_theme import GmpDoc

OUT = os.path.join(os.path.dirname(__file__), "..", "expression-des-besoins.docx")

doc = GmpDoc(
    title    = "Expression des besoins",
    subtitle = "Site web du département Génie Mécanique et Productique",
    date     = "Mars 2026",
    authors  = "Yahaya Coulibaly, Hyosua Colléter",
    version  = "1.0",
    status   = "Document initial — en attente de validation MOA",
)

# ── Historique + parties prenantes ──────────────────────────────────────────

doc.heading("Historique des versions")
doc.table(
    headers=["Version", "Date", "Auteurs", "Objet"],
    rows=[["1.0", "Mars 2026", "Yahaya Coulibaly, Hyosua Colléter", "Première version officielle"]],
    col_widths=[2, 2.5, 5.5, 6],
)

doc.heading("Parties prenantes")
doc.table(
    headers=["Rôle", "Nom / Entité", "Responsabilités"],
    rows=[
        ["Maître d'ouvrage",        "Khalifa DJEMAL — Chef du département GMP",     "Exprime les besoins, valide les livrables, réceptionne le produit final"],
        ["Maître d'œuvre",          "Yahaya Coulibaly, Hyosua Colléter — LP DAWII", "Conception, développement et déploiement du site"],
        ["Maître d'œuvre (futur)",  "Étudiants LP DAWII (promotions suivantes)",    "Maintenance et évolution du site après livraison"],
        ["Encadrant pédagogique",   "Responsable de formation LP DAWII",            "Suivi du projet, évaluation, validation des jalons"],
    ],
    col_widths=[4, 6, 6],
)

# ── §1 Contexte ──────────────────────────────────────────────────────────────

doc.heading("1. Contexte et objectifs stratégiques")
doc.heading("1.1 Contexte", level=2)
doc.body("Le département Génie Mécanique et Productique (GMP) de l'IUT d'Évry-Courcouronnes ne dispose pas à ce jour d'un site web qui lui soit propre. La présence numérique du département se limite à une page dédiée sur le site institutionnel de l'IUT, présentant les formations et les coordonnées de contact pour les inscriptions. Pour la partie pédagogique, le département s'appuie sur eCampus, dont l'accès est conditionné à l'activation d'un compte numérique universitaire.")
doc.body("Cette situation présente plusieurs limites :")
doc.bullet("L'identité propre du département GMP est peu visible, noyée dans le site générique de l'IUT.")
doc.bullet("Les futurs étudiants (lycéens, étudiants en réorientation) n'ont pas accès à une présentation approfondie et autonome des formations proposées.")
doc.bullet("Les informations pédagogiques sont dispersées entre eCampus et des canaux informels (email, documents partagés).")
doc.bullet("Les entreprises partenaires n'ont pas de point d'entrée dédié pour déposer des offres d'alternance ou des projets tuteurés.")
doc.body("Le chef du département, Khalifa DJEMAL, a décidé d'initier la création d'un site web institutionnel propre au département GMP pour remédier à ces lacunes.")

doc.heading("1.2 Objectifs stratégiques", level=2)
doc.numbered([
    ("Renforcer la visibilité du département",    "Offrir une vitrine publique autonome présentant l'ensemble des formations (BUT GMP, Licences Professionnelles) de manière exhaustive et attractive."),
    ("Centraliser les outils pédagogiques",       "Fournir aux étudiants et aux enseignants un espace numérique unique pour accéder aux notes, emplois du temps et supports de cours."),
    ("Faciliter les partenariats entreprises",    "Mettre à disposition des entreprises un espace dédié pour publier directement leurs offres d'alternance et projets tuteurés."),
    ("Assurer la pérennité et la maintenabilité", "Concevoir un système administrable par le personnel GMP, dont la maintenance pourra être assurée par les promotions successives d'étudiants LP DAWII."),
])

# ── §2 Utilisateurs ──────────────────────────────────────────────────────────

doc.heading("2. Utilisateurs cibles et profils")
doc.body("Le site s'adresse à cinq profils d'utilisateurs distincts, avec des niveaux d'accès différenciés.")

for title, profil, niveau, besoins, contrainte in [
    ("2.1 Visiteur (non authentifié)", "Lycéen en recherche de formation, étudiant en réorientation, parent, professionnel.", "Hétérogène — aucune compétence technique requise.", "Consulter la présentation du département, les programmes, les débouchés et les modalités d'admission.", "Aucune inscription requise. Le contenu public doit être accessible sans barrière."),
    ("2.2 Étudiant", "Étudiant inscrit en BUT GMP (parcours SRV ou CPD, initiale ou alternance) ou Licence Professionnelle.", "Utilisateur courant de smartphones et d'outils numériques universitaires.", "Consulter ses notes, son emploi du temps, les supports de cours, les projets tuteurés et les offres d'alternance.", "Accès en lecture seule. Les PDFs doivent être protégés et non accessibles sans authentification."),
    ("2.3 Enseignant", "Enseignant ou intervenant du département GMP.", "Utilisateur averti, habitué aux outils numériques de l'enseignement supérieur.", "Saisir et modifier ses notes, consulter son emploi du temps, déposer des supports de cours PDF.", "Un enseignant ne peut modifier que ses propres données."),
    ("2.4 Entreprise partenaire", "Entreprise souhaitant proposer des projets tuteurés ou des offres d'alternance.", "Variable. L'interface doit être simple et guidée.", "Créer un compte en autonomie, publier et gérer ses propres projets et offres.", "Accès limité à ses propres contenus. Création de compte par auto-inscription."),
    ("2.5 Administrateur", "Chef du département (Khalifa DJEMAL) et créateurs du site (étudiants LP DAWII).", "Élevé pour les créateurs ; intermédiaire pour le chef de département.", "Gérer l'ensemble des utilisateurs et des contenus sans restriction de propriété.", "Accès exclusivement réservé au rôle ADMIN."),
]:
    doc.heading(title, level=2)
    doc.table(
        headers=["Attribut", "Détail"],
        rows=[["Profil", profil], ["Niveau tech", niveau], ["Besoins", besoins], ["Contrainte", contrainte]],
        col_widths=[4, 12],
    )

# ── §3 Besoins ───────────────────────────────────────────────────────────────

doc.heading("3. Besoins fonctionnels et non fonctionnels")
doc.heading("3.1 Besoins fonctionnels", level=2)
doc.table(
    headers=["Réf.", "Intitulé", "Description"],
    rows=[
        ["BF-01", "Vitrine publique",          "Tout visiteur consulte sans authentification l'accueil, les pages de présentation (BUT GMP, lieu, programme, spécificité, alternance, débouchés) et les trois Licences Professionnelles (LP MIE, LP MIEF, LP MRI)."],
        ["BF-02", "Authentification et rôles", "Connexion email + mot de passe. Redirection vers l'espace du rôle après connexion. Accès sans session redirige vers /connexion. Déconnexion disponible depuis tous les espaces."],
        ["BF-03", "Espace étudiant",           "Consultation des notes (filtrées par matière), emploi du temps, supports de cours (PDF sécurisé), projets tuteurés disponibles et offres d'alternance ouvertes."],
        ["BF-04", "Espace enseignant",         "Consultation, ajout et modification de ses propres notes. Consultation de l'emploi du temps. Dépôt, consultation et suppression de ses propres supports de cours (PDF, 20 Mo max)."],
        ["BF-05", "Espace entreprise",         "Création, consultation et modification de ses propres projets tuteurés et offres d'alternance."],
        ["BF-06", "Panel d'administration",    "Gestion complète des utilisateurs (création, rôle, désactivation). Gestion sans restriction des notes, supports, projets et offres. Gestion du contenu éditorial des pages publiques."],
    ],
    col_widths=[1.5, 4, 10.5],
)

doc.heading("3.2 Besoins non fonctionnels", level=2)
doc.table(
    headers=["Réf.", "Intitulé", "Description"],
    rows=[
        ["BNF-01", "Performance",   "Pages publiques < 2 s. Volume cible : 200 utilisateurs actifs simultanés."],
        ["BNF-02", "Sécurité",      "Mots de passe hachés (bcrypt, coût ≥ 12). PDFs non accessibles par URL directe — servis via API authentifiée. Variables sensibles jamais versionnées. Protection CSRF native."],
        ["BNF-03", "RGPD",          "Données hébergées sur VPS OVH en France. Aucune donnée personnelle transmise à des tiers. Politique de confidentialité à rédiger avant mise en production."],
        ["BNF-04", "Compatibilité", "Chrome, Firefox, Safari, Edge (N et N−1). Affichage responsive mobile, tablette, desktop."],
        ["BNF-05", "Accessibilité", "Bonnes pratiques WCAG 2.1 niveau AA recommandées. Conformité RGAA non imposée à ce stade."],
    ],
    col_widths=[1.5, 3.5, 11],
)

# ── §4 Contraintes ───────────────────────────────────────────────────────────

doc.heading("4. Contraintes et critères d'acceptation")
doc.heading("4.1 Contraintes", level=2)

doc.heading("Contraintes temporelles", level=3)
doc.table(
    headers=["Jalon", "Date", "Caractère"],
    rows=[
        ["Présentation d'avancement", "17 avril 2026", "Non négociable"],
        ["Livraison finale",          "19 mai 2026",   "Non négociable"],
    ],
    col_widths=[6, 4, 6],
)
doc.body("Ces dates sont imposées par le responsable de formation de la LP DAWII dans le cadre de l'évaluation du projet.")

doc.heading("Contraintes budgétaires", level=3)
doc.table(
    headers=["Poste", "Solution", "Coût estimé"],
    rows=[
        ["Serveur VPS",    "OVH VPS Starter", "~36 €/an"],
        ["Nom de domaine", "OVH (.fr)",        "~7 €/an"],
        ["Certificat SSL", "Let's Encrypt",    "Gratuit"],
        ["Main-d'œuvre",   "Projet étudiant",  "Non facturée"],
        ["Total",          "",                 "~43 €/an"],
    ],
    col_widths=[5, 6, 5],
)
doc.body("Aucun budget institutionnel n'est alloué au projet.")

doc.heading("Contraintes techniques", level=3)
doc.bullet("Déploiement sur VPS OVH (Ubuntu 22.04 LTS) avec Nginx + PM2 + Let's Encrypt.")
doc.bullet("Stack fixée : Next.js (App Router), TypeScript, PostgreSQL, Prisma, Auth.js v5, Tailwind CSS.")
doc.bullet("Fichiers PDF stockés hors du répertoire public, accessibles uniquement via route API authentifiée.")
doc.bullet("Hors périmètre : application mobile, paiement en ligne, intégration Apogée/Pronote/eCampus, messagerie interne.")

doc.heading("4.2 Critères d'acceptation", level=2)
doc.table(
    headers=["Réf.", "Critère"],
    rows=[
        ["CA-01", "Le site est déployé et accessible en ligne avant le 19/05/2026."],
        ["CA-02", "Les pages publiques (accueil, présentation, licences) sont consultables sans authentification."],
        ["CA-03", "Les quatre espaces authentifiés (étudiant, enseignant, entreprise, admin) sont fonctionnels et accessibles uniquement via session valide."],
        ["CA-04", "Aucune donnée personnelle (note, emploi du temps, PDF) n'est accessible sans authentification."],
        ["CA-05", "Le panel d'administration permet la gestion complète des utilisateurs et des contenus."],
        ["CA-06", "Le site est responsive et fonctionnel sur mobile."],
    ],
    col_widths=[2, 14],
)

# ── §5 Glossaire ─────────────────────────────────────────────────────────────

doc.heading("5. Glossaire")
doc.table(
    headers=["Terme", "Définition"],
    rows=[
        ["BUT GMP", "Bachelor Universitaire de Technologie Génie Mécanique et Productique"],
        ["LP",      "Licence Professionnelle"],
        ["DAWII",   "Développement d'Applications Web et Internet Intégrant — LP dont sont issus les créateurs du site"],
        ["MOA",     "Maître d'Ouvrage — commanditaire du projet, exprime et valide les besoins"],
        ["MOE",     "Maître d'Œuvre — équipe en charge de la réalisation technique"],
        ["RBAC",    "Role-Based Access Control — contrôle d'accès basé sur les rôles"],
        ["RGPD",    "Règlement Général sur la Protection des Données"],
        ["RGAA",    "Référentiel Général d'Amélioration de l'Accessibilité"],
        ["eCampus", "Plateforme numérique universitaire de l'IUT d'Évry"],
        ["VPS",     "Virtual Private Server — serveur virtuel dédié"],
    ],
    col_widths=[4, 12],
)

doc.save(os.path.normpath(OUT))
