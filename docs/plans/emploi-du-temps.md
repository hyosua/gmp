# Plan : Module Emploi du Temps (Issues #25 - #28)

> Ce module vise à offrir une gestion complète du planning pour les étudiants et les enseignants du département GMP, avec détection de conflits et gestion de la récurrence.

## État des lieux (Analyse technique)

- **Backend** : Les server actions (`createCreneau`, `updateCreneau`, `getCreneauxSemaine`) sont déjà écrites dans `src/actions/emploiDuTemps.ts` et testées.
- **Schéma** : La table `EmploiDuTemps` existe mais `matiereId` est optionnel, ce qui doit être corrigé.
- **Frontend** : Pages et composants UI inexistants.

---

## Phase 1 : Alignement du Schéma et Data (#25)

**Objectif** : Rendre le schéma robuste et conforme aux spécifications.

### À développer

- Passage de `matiereId` en obligatoire dans le modèle `EmploiDuTemps`.
- Mise à jour de la migration Prisma.
- Ajustement du seed si nécessaire pour inclure des créneaux de test.

### Critères d'acceptation

- [ ] Le champ `matiereId` est `String` (non `String?`) dans `schema.prisma`.
- [ ] La migration est appliquée avec succès.
- [ ] Les tests existants (`tests/emploiDuTemps.test.ts`) passent toujours.

---

## Phase 2 : Vue Étudiant - Consultation (#26)

**Objectif** : Permettre aux étudiants de voir leur planning hebdomadaire.

### À développer

- Composant `CalendrierSemaine` (Design Forge) : Grille 5 jours (8h-20h).
- Composant `NavigationSemaine` : Gestion des query params `?semaine=YYYY-MM-DD`.
- Page `/espace-etudiant/emploi-du-temps` : Récupération des groupes de l'étudiant et affichage des créneaux.

### Critères d'acceptation

- [ ] La grille respecte l'esthétique "Blueprint" (lignes de scan, bordures marquées).
- [ ] Les créneaux affichent : Matière, Enseignant, Salle, Groupe.
- [ ] La navigation entre les semaines est fluide via l'URL.
- [ ] Seuls les étudiants voient leurs groupes respectifs.

---

## Phase 3 : Vue Enseignant - Création et Conflits (#27)

**Objectif** : Permettre aux enseignants de planifier des cours sans chevauchement de salle.

### À développer

- Page `/espace-enseignant/emploi-du-temps`.
- Modale `CreneauModal` : Formulaire de création avec sélection de matière (parmi celles assignées), groupe et salle.
- Intégration de la détection de conflit (déjà présente dans la server action).

### Critères d'acceptation

- [ ] Un clic sur une plage vide ouvre la modale pré-remplie.
- [ ] L'enseignant ne peut choisir que ses matières assignées.
- [ ] Une erreur `CONFLIT_SALLE` est affichée si la salle est occupée.
- [ ] Option de récurrence fonctionnelle (génération de plusieurs créneaux).

---

## Phase 4 : Vue Enseignant - Gestion (Edition/Suppression) (#28)

**Objectif** : Permettre la modification ou l'annulation de cours.

### À développer

- Évolution de `CreneauModal` pour le mode édition.
- Vérification de l'ownership (un enseignant ne modifie que ses propres créneaux).
- Bouton de suppression avec confirmation.

### Critères d'acceptation

- [ ] Un clic sur un créneau existant ouvre la modale en édition.
- [ ] La modification vérifie également les conflits de salle.
- [ ] La suppression est instantanée après confirmation.
- [ ] L'UI se rafraîchit sans rechargement complet de la page (refresh router).
