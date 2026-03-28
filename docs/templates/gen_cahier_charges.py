"""
gen_cahier_charges.py
Génère docs/cahier-des-charges.docx via le template GMP.
Usage : python3 docs/templates/gen_cahier_charges.py
"""

import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from gmp_theme import GmpDoc

OUT = os.path.join(os.path.dirname(__file__), "..", "cahier-des-charges.docx")

doc = GmpDoc(
    title    = "Cahier des charges",
    subtitle = "Site web du département Génie Mécanique et Productique",
    date     = "Mars 2026",
    authors  = "Yahaya Coulibaly, Hyosua Colléter",
    version  = "1.0",
    status   = "Document initial",
)

# ── §1 Présentation du projet ────────────────────────────────────────────────

doc.heading("1. Présentation du projet")

doc.heading("1.1 Contexte", level=2)
doc.body("Le département Génie Mécanique et Productique (GMP) de l'IUT souhaite se doter d'un site web institutionnel. Ce site a pour vocation de centraliser les informations du département à destination de plusieurs publics : les futurs inscrits, les étudiants en cours de formation, les enseignants, les entreprises partenaires et le personnel administratif.")

doc.heading("1.2 Parties prenantes", level=2)
doc.table(
    headers=["Rôle", "Nom"],
    rows=[
        ["Maître d'ouvrage", "Khalifa DJEMAL"],
        ["Maître d'œuvre",   "Yahaya Coulibaly, Hyosua Colléter"],
    ],
    col_widths=[5, 11],
)

doc.heading("1.3 Objectifs", level=2)
doc.bullet("Présenter le département GMP et ses formations (BUT GMP, Licences Professionnelles)")
doc.bullet("Offrir un espace personnel aux étudiants (notes, emploi du temps, supports de cours, offres)")
doc.bullet("Offrir un espace de gestion aux enseignants (notes, supports de cours, emploi du temps)")
doc.bullet("Permettre aux entreprises de déposer des offres d'alternance et des projets tuteurés")
doc.bullet("Fournir au personnel GMP un panel d'administration pour gérer l'ensemble du contenu")

doc.heading("1.4 Périmètre", level=2)
doc.heading("Inclus", level=3)
doc.bullet("Site vitrine public (présentation département + licences professionnelles)")
doc.bullet("Espaces authentifiés par rôle (étudiant, enseignant, entreprise, admin)")
doc.bullet("Gestion des notes, emplois du temps, supports de cours (PDF), projets tuteurés, offres d'alternance")
doc.bullet("Panel d'administration")

doc.heading("Exclus", level=3)
doc.bullet("Application mobile")
doc.bullet("Paiement en ligne")
doc.bullet("Intégration avec des systèmes tiers (Apogée, Pronote, etc.)")
doc.bullet("Messagerie interne")

# ── §2 Arborescence ──────────────────────────────────────────────────────────

doc.heading("2. Arborescence du site")
doc.table(
    headers=["Section", "Sous-pages / Détail"],
    rows=[
        ["Accueil",                       "Page principale"],
        ["Présentation du département",   "Généralité BUT GMP · Lieu de formation · Programme · Spécificité du BUT GMP · Formation en alternance · Après le BUT GMP"],
        ["Licences professionnelles",     "LP MIE · LP MIEF · LP MRI"],
        ["Espace étudiant (auth.)",       "Notes · Emploi du temps · Projets tuteurés · Offres d'alternance · Supports de cours"],
        ["Espace enseignant (auth.)",     "Notes · Emploi du temps personnel · Supports de cours"],
        ["Espace entreprise (auth.)",     "Projets tuteurés · Offres d'alternance"],
        ["Administration (auth.)",        "Personnel GMP uniquement — gestion complète du contenu"],
    ],
    col_widths=[5, 11],
)

# ── §3 Gestion des droits ────────────────────────────────────────────────────

doc.heading("3. Gestion des droits")
doc.table(
    headers=["Rôle", "Fonctionnalités"],
    rows=[
        ["Visiteur",          "Consulter l'accueil, la présentation du département, les licences professionnelles"],
        ["Étudiant",          "+ Consulter ses notes, son emploi du temps, les supports de cours, les projets tuteurés disponibles, les offres d'alternance ouvertes"],
        ["Enseignant",        "+ Ajouter/modifier/consulter ses notes déposées, consulter son emploi du temps, déposer des PDFs de cours"],
        ["Entreprise",        "+ Ajouter/modifier/consulter ses projets tuteurés et offres d'alternance"],
        ["Admin (Personnel GMP)", "Tous les droits ci-dessus + barre d'administration pour gérer l'ensemble du contenu et des utilisateurs"],
    ],
    col_widths=[4, 12],
)

# ── §4 Spécifications fonctionnelles ─────────────────────────────────────────

doc.heading("4. Spécifications fonctionnelles")

doc.heading("4.1 Pages publiques", level=2)

doc.heading("Accueil", level=3)
doc.bullet("Présentation générale du département")
doc.bullet("Liens vers les sections principales")
doc.bullet("Accès visible au formulaire de connexion")

doc.heading("Présentation du département", level=3)
doc.bullet("6 sous-pages : BUT GMP, lieu de formation, programme, spécificité, alternance, après BUT")
doc.bullet("Contenu éditorial géré par l'admin")

doc.heading("Licences professionnelles", level=3)
doc.bullet("3 sous-pages : LP MIE, LP MIEF, LP MRI")
doc.bullet("Contenu éditorial géré par l'admin")

doc.heading("4.2 Authentification", level=2)
doc.bullet("Connexion par email + mot de passe")
doc.bullet("Redirection automatique vers l'espace correspondant au rôle après connexion")
doc.bullet("Toutes les routes /espace-* et /admin sont protégées — accès sans session redirige vers /connexion")
doc.bullet("Déconnexion disponible depuis tous les espaces")

doc.heading("4.3 Espace étudiant", level=2)
doc.table(
    headers=["Fonctionnalité", "Détail"],
    rows=[
        ["Notes",              "Liste des notes de l'étudiant connecté, filtrées par matière. Lecture seule."],
        ["Emploi du temps",    "Affichage du planning hebdomadaire de l'étudiant."],
        ["Supports de cours",  "Liste des PDFs déposés par les enseignants. Téléchargement sécurisé (vérification de session obligatoire, fichier non accessible par URL directe)."],
        ["Projets tuteurés",   "Liste des projets disponibles déposés par les entreprises. Consultation des détails (entreprise, description, prérequis)."],
        ["Offres d'alternance","Liste des offres ouvertes à candidature. Consultation des détails (entreprise, poste, durée, rémunération)."],
    ],
    col_widths=[4, 12],
)

doc.heading("4.4 Espace enseignant", level=2)
doc.table(
    headers=["Fonctionnalité", "Détail"],
    rows=[
        ["Notes",             "Liste des notes déposées par l'enseignant. Formulaire d'ajout : sélection étudiant + matière + valeur (0–20). Modification d'une note existante (ses notes uniquement)."],
        ["Emploi du temps",   "Affichage du planning personnel de l'enseignant."],
        ["Supports de cours", "Upload d'un fichier PDF (taille max : 20 Mo). Liste des supports déposés. Suppression d'un support (ses fichiers uniquement)."],
    ],
    col_widths=[4, 12],
)

doc.heading("4.5 Espace entreprise", level=2)
doc.table(
    headers=["Fonctionnalité", "Détail"],
    rows=[
        ["Projets tuteurés",   "Formulaire de création : titre, description, prérequis, nombre d'étudiants souhaité. Modification et consultation de ses propres projets."],
        ["Offres d'alternance","Formulaire de création : poste, description, durée, rémunération, prérequis. Modification et consultation de ses propres offres."],
    ],
    col_widths=[4, 12],
)

doc.heading("4.6 Panel d'administration", level=2)
doc.bullet("Gestion des utilisateurs : création, modification de rôle, désactivation")
doc.bullet("Gestion complète des notes (tous enseignants)")
doc.bullet("Gestion complète des supports de cours")
doc.bullet("Gestion complète des projets tuteurés et offres d'alternance")
doc.bullet("Gestion du contenu éditorial des pages publiques")

# ── §5 Spécifications techniques ─────────────────────────────────────────────

doc.heading("5. Spécifications techniques")

doc.heading("5.1 Stack technologique", level=2)
doc.table(
    headers=["Couche", "Technologie", "Justification"],
    rows=[
        ["Framework",        "Next.js 16 (App Router)", "SSR pour le SEO des pages publiques, API Routes intégrées, un seul codebase"],
        ["Langage",          "TypeScript",              "Typage statique indispensable pour la gestion des 5 rôles et modèles de données"],
        ["Authentification", "Auth.js v5 (NextAuth)",   "Gestion native des sessions et rôles, self-hosted, données sur OVH"],
        ["Base de données",  "PostgreSQL",              "Modèle relationnel adapté aux liens entre utilisateurs, notes, matières"],
        ["ORM",              "Prisma",                  "Schéma typé, migrations versionnées, Prisma Studio pour le dev"],
        ["Styles",           "Tailwind CSS",            "Responsive natif, cohérence visuelle, pas de fichiers CSS séparés"],
        ["Runtime serveur",  "Node.js (via PM2)",       "Requis par Next.js, PM2 assure le redémarrage automatique"],
    ],
    col_widths=[3.5, 4, 8.5],
)

doc.heading("5.2 Architecture applicative", level=2)
doc.body("Client (navigateur) → Nginx (reverse proxy HTTPS via Let's Encrypt) → Next.js App (port 3000, géré par PM2) → PostgreSQL (port 5432, local VPS) + /uploads/ (PDFs, stockage local VPS).")
doc.bullet("App Router — pages et layouts")
doc.bullet("API Routes — auth, fichiers, données")
doc.bullet("Middleware — protection des routes par rôle")

doc.heading("5.3 Modèle de données", level=2)
doc.table(
    headers=["Modèle", "Champs principaux", "Relations"],
    rows=[
        ["User",            "id, email, password (hashé), nom, prenom, role, parcours, typeFormation",        "→ Note (étudiant/enseignant), Groupe, SupportDeCours, ProjetTuteure, OffreAlternance"],
        ["Groupe",          "id, nom (ex: TD1), type (CM/TD/TP)",                                             "→ User[] (n,n), EmploiDuTemps"],
        ["Note",            "id, valeur (0–20)",                                                              "→ User (étudiant), User (enseignant), Matiere"],
        ["Matiere",         "id, nom, code",                                                                   "→ Note"],
        ["EmploiDuTemps",   "id, jour, heureDebut, heureFin, salle, intitule",                                "→ Groupe, User (enseignant)"],
        ["SupportDeCours",  "id, titre, cheminFichier, taille, createdAt",                                    "→ User (enseignant)"],
        ["ProjetTuteure",   "id, titre, description, prerequis, nbEtudiants, statut",                         "→ User (entreprise)"],
        ["OffreAlternance", "id, poste, description, duree, remuneration, prerequis",                         "→ User (entreprise)"],
    ],
    col_widths=[3, 6, 7],
)

doc.heading("5.4 Hébergement et déploiement", level=2)
doc.table(
    headers=["Composant", "Solution", "Détail"],
    rows=[
        ["Serveur",           "OVH VPS Starter",          "Ubuntu 22.04 LTS, 1 vCPU, 2 Go RAM"],
        ["Reverse proxy",     "Nginx",                    "Redirige le port 80/443 vers Next.js (port 3000)"],
        ["Process manager",   "PM2",                      "Redémarrage automatique, logs, monitoring"],
        ["HTTPS",             "Let's Encrypt + Certbot",  "Certificat gratuit, renouvellement automatique"],
        ["Base de données",   "PostgreSQL",               "Installé sur le VPS, accès local uniquement"],
        ["Stockage fichiers", "Dossier /uploads/",        "Hors de public/, accès via API Route authentifiée"],
        ["Nom de domaine",    "À définir",                "Hébergé chez OVH"],
    ],
    col_widths=[3.5, 4.5, 8],
)

# ── §6 Contraintes ───────────────────────────────────────────────────────────

doc.heading("6. Contraintes")

doc.heading("6.1 Sécurité", level=2)
doc.bullet("Mots de passe hashés avec bcrypt (coût minimum 12)")
doc.bullet("Les PDFs ne sont jamais accessibles par URL directe — toujours via API Route avec vérification de session")
doc.bullet("Protection CSRF native via Auth.js")
doc.bullet("Variables d'environnement sensibles (BDD, secret Auth.js) jamais committées")

doc.heading("6.2 RGPD", level=2)
doc.bullet("Les données des étudiants (notes, emplois du temps) sont hébergées sur un VPS OVH en France")
doc.bullet("Aucune donnée personnelle transmise à des services tiers")
doc.bullet("Politique de confidentialité à rédiger avant mise en production")

doc.heading("6.3 Performances", level=2)
doc.bullet("Cible : chargement des pages publiques < 2 secondes")
doc.bullet("Volume max estimé : 200 utilisateurs actifs simultanés")
doc.bullet("Les images sont optimisées via le composant <Image> Next.js")
doc.bullet("Les PDFs sont servis en streaming (pas chargés entièrement en mémoire)")

doc.heading("6.4 Compatibilité navigateurs", level=2)
doc.bullet("Chrome, Firefox, Safari, Edge — versions N et N-1")
doc.bullet("Responsive mobile obligatoire (étudiants sur smartphone)")

doc.heading("6.5 Accessibilité", level=2)
doc.bullet("Respect des bonnes pratiques WCAG 2.1 niveau AA recommandé")
doc.bullet("Conformité RGAA à évaluer selon les exigences de l'établissement")

# ── §7 Charte graphique ──────────────────────────────────────────────────────

doc.heading("7. Charte graphique")
doc.table(
    headers=["Élément", "Valeur"],
    rows=[
        ["Couleur principale",          "#0A3D67 (bleu GMP) — fond dark"],
        ["Couleur secondaire / accent", "#F29400 (orange GMP) — primaire dark"],
        ["Logo",                        "Logo officiel du département GMP fourni par le maître d'ouvrage"],
        ["Typographie",                 "Outfit (titres & corps) · Geist Mono (données, codes)"],
        ["Maquettes",                   "À produire (phase 2 des étapes de réalisation)"],
    ],
    col_widths=[5, 11],
)

# ── §7.1 Maquettes ───────────────────────────────────────────────────────────

doc.heading("7.1 Maquettes", level=2)
doc.body("Les maquettes haute fidélité sont disponibles sous forme de prototype HTML interactif (docs/maquettes.html — ouvrir dans un navigateur).")
doc.table(
    headers=["Écran", "Description"],
    rows=[
        ["Connexion",                        "Formulaire email/mot de passe, fond blueprint"],
        ["Espace étudiant — Notes",           "Tableau de notes avec moyenne, sidebar de navigation"],
        ["Espace entreprise — Dépôt offre",  "Formulaire de création d'offre d'alternance"],
    ],
    col_widths=[6, 10],
)
doc.body("Les maquettes respectent la charte graphique (thème dark, #0A3D67 / #F29400) et servent de référence visuelle pour le développement des phases 2 à 5.")

# ── §8 Planning ──────────────────────────────────────────────────────────────

doc.heading("8. Planning")
doc.table(
    headers=["Étape", "Description", "Date"],
    rows=[
        ["1",  "Spécification fonctionnelle (ce document)",        "Mars 2026"],
        ["2",  "Charte graphique et maquettes",                    "Avril 2026"],
        ["3",  "Développement Phase 1 — Socle + pages publiques",  "Avril 2026"],
        ["4",  "Développement Phase 2 — Authentification & rôles", "Avril 2026"],
        ["5",  "Présentation d'avancement",                        "17/04/2026"],
        ["6",  "Développement Phase 3 — Espace étudiant",          "Avril–Mai 2026"],
        ["7",  "Développement Phase 4 — Espace enseignant",        "Mai 2026"],
        ["8",  "Développement Phase 5 — Espace entreprise",        "Mai 2026"],
        ["9",  "Développement Phase 6 — Panel admin",              "Mai 2026"],
        ["10", "Tests, recette et mise en production",             "Mai 2026"],
        ["11", "Livraison finale",                                 "19/05/2026"],
    ],
    col_widths=[1.5, 9.5, 5],
)

# ── §9 Estimation des coûts ──────────────────────────────────────────────────

doc.heading("9. Estimation des coûts")
doc.table(
    headers=["Poste", "Solution", "Coût estimé"],
    rows=[
        ["VPS OVH Starter",      "Hébergement serveur",         "~36 €/an"],
        ["Nom de domaine",       "OVH (.fr)",                   "~7 €/an"],
        ["Certificat SSL",       "Let's Encrypt",               "Gratuit"],
        ["Stockage fichiers",    "Local VPS (inclus)",          "Gratuit"],
        ["Base de données",      "PostgreSQL sur VPS (inclus)", "Gratuit"],
        ["Licences logicielles", "Stack open source",           "Gratuit"],
        ["Total récurrent",      "",                            "~43 €/an"],
    ],
    col_widths=[5, 6, 5],
)
doc.body("Le développement est réalisé par les maîtres d'œuvre dans le cadre d'un projet étudiant — coût main-d'œuvre non facturé.")

# ── §10 Livrables ────────────────────────────────────────────────────────────

doc.heading("10. Livrables")
doc.table(
    headers=["Livrable", "Format", "Échéance"],
    rows=[
        ["Cahier des charges",            "Markdown / PDF",    "Mars 2026"],
        ["Maquettes (wireframes)",        "HTML prototype (docs/maquettes.html)","Mars 2026 ✓"],
        ["Code source",                   "Dépôt GitHub",      "19/05/2026"],
        ["Site déployé et fonctionnel",   "URL en ligne",      "19/05/2026"],
        ["Documentation de déploiement",  "Markdown",          "19/05/2026"],
    ],
    col_widths=[6, 4, 6],
)

# ── §11 Glossaire ────────────────────────────────────────────────────────────

doc.heading("11. Glossaire")
doc.table(
    headers=["Terme", "Définition"],
    rows=[
        ["BUT GMP", "Bachelor Universitaire de Technologie Génie Mécanique et Productique"],
        ["LP",      "Licence Professionnelle"],
        ["MOA",     "Maître d'Ouvrage — commanditaire du projet, définit les besoins"],
        ["MOE",     "Maître d'Œuvre — équipe en charge de la réalisation technique"],
        ["RBAC",    "Role-Based Access Control — contrôle d'accès basé sur les rôles"],
        ["SSR",     "Server-Side Rendering — rendu HTML côté serveur"],
        ["ORM",     "Object-Relational Mapper — couche d'abstraction entre le code et la base de données"],
        ["RGPD",    "Règlement Général sur la Protection des Données"],
        ["RGAA",    "Référentiel Général d'Amélioration de l'Accessibilité"],
        ["VPS",     "Virtual Private Server — serveur virtuel dédié"],
        ["PDF",     "Portable Document Format — format de fichier pour les supports de cours"],
    ],
    col_widths=[4, 12],
)

doc.save(os.path.normpath(OUT))
