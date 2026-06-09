---
marp: true
theme: default
paginate: true
style: |
  :root {
    --color-primary: #1e3a5f;
    --color-accent: #e87722;
    --color-soft: #eef3f8;
  }
  section {
    background: #ffffff;
    color: #1e3a5f;
    font-family: 'Segoe UI', sans-serif;
    padding: 44px 56px;
  }
  h1 {
    color: #1e3a5f;
    border-bottom: 3px solid #e87722;
    padding-bottom: 8px;
    margin-bottom: 18px;
    font-size: 32px;
  }
  .meta {
    font-size: 15px;
    color: #5a6b80;
    margin-bottom: 18px;
  }
  h2 {
    color: #e87722;
    font-size: 22px;
  }
  .card {
    background: var(--color-soft);
    border-left: 6px solid var(--color-accent);
    border-radius: 10px;
    padding: 16px 18px;
    margin-top: 14px;
  }
  ul {
    margin: 0;
    padding-left: 20px;
    line-height: 1.55;
    font-size: 16px;
  }
  .focus {
    margin-top: 14px;
    padding: 12px 14px;
    background: #1e3a5f;
    color: #ffffff;
    border-radius: 10px;
    font-size: 16px;
  }
  strong {
    color: #e87722;
  }
  section.cover {
    background: #1e3a5f;
    color: #ffffff;
  }
  section.cover h1 {
    color: #ffffff;
    border-bottom: 3px solid #e87722;
  }
---

<!-- _class: cover -->

# Avancement du projet GMP

## Point d'étape depuis le lancement

17 avril 2026

Yahaya Coulibaly · Hyosua Colléter

---

# 1. Ce qui a été mis en place

<div class="meta">De la conception au socle technique</div>

<div class="card">
  <ul>
    <li><strong>Cadrage du besoin</strong> : cahier des charges, expression des besoins, MCD et choix techniques finalisés.</li>
    <li><strong>Base du projet opérationnelle</strong> : Next.js 16, TypeScript, Prisma, PostgreSQL, architecture App Router.</li>
    <li><strong>Partie publique développée</strong> : accueil, présentation du département, licences professionnelles, identité visuelle.</li>
    <li><strong>Authentification en place</strong> : Auth.js v5, rôles, protection des routes, redirection par espace, déconnexion.</li>
    <li><strong>Qualité et suivi</strong> : CI GitHub Actions, lint, build, hooks pré-commit, documentation technique.</li>
  </ul>
</div>

<div class="focus">
  À ce stade, le projet n'est plus au stade de maquette : le <strong>socle technique est fonctionnel et sécurisé</strong>.
</div>

---

# 2. Avancement actuel et suite

<div class="card">
  <h2>Travaux en cours</h2>
  <ul>
    <li>Schéma de base de données enrichi : groupes, matières, enseignants, récurrence.</li>
    <li>Début du module <strong>emploi du temps</strong> : CRUD serveur, gestion des conflits de salle, tests Vitest.</li>
    <li>Espaces étudiant, enseignant, entreprise et admin déjà structurés et sécurisés par rôle.</li>
  </ul>
</div>

<div class="card">
  <h2>Prochaines étapes</h2>
  <ul>
    <li>Finaliser les interfaces des espaces connectés.</li>
    <li>Développer les modules notes, supports PDF, offres d'alternance et projets tuteurés.</li>
    <li>Compléter le panneau d'administration et préparer le déploiement final.</li>
  </ul>
</div>
