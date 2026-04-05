# Documentation de l'API et des Points d'Entrée - Projet GMP

Cette documentation détaille les interfaces de programmation (API), les points d'entrée (endpoints) et les actions serveur utilisés dans l'application GMP.

## Architecture Technique
Le projet utilise Next.js 16 (App Router). En conséquence, la majorité des interactions de données passent par des Server Actions plutôt que par des routes API REST traditionnelles, afin de garantir une sécurité maximale et une intégration fluide avec le système de composants.

## Authentification (Auth.js v5)

L'authentification est gérée par Auth.js (NextAuth v5).

### Points d'Entrée API
| Méthode | Endpoint | Description |
| :--- | :--- | :--- |
| GET/POST | /api/auth/[...nextauth] | Gère les cycles de vie de l'authentification (session, redirection, providers). |

### Actions Serveur (src/lib/actions/auth.ts)

#### authenticate(prevState, formData)
Authentifie un utilisateur via le fournisseur credentials.
- Arguments :
  - prevState: string | undefined - État précédent de l'action.
  - formData: FormData - Doit contenir les champs email et password.
- Retour : string (message d'erreur) ou redirection automatique.

#### logout()
Déconnecte l'utilisateur et détruit la session.
- Retour : Redirige vers /.

---

## Accès aux Données (Prisma 7)

Bien qu'il n'y ait pas d'API REST publique pour les données, les couches serveurs accèdent à la base de données PostgreSQL via l'instance Prisma.

### Modèles Principaux
- User : Gestion des comptes (Étudiants, Enseignants, Entreprises, Admin).
- Groupe : Groupes académiques (TD, TP).
- Note / Matiere : Système de gestion pédagogique.

---

## Génération de Documentation Automatisée

Le projet supporte l'utilisation de TypeDoc pour générer une documentation HTML interactive à partir des commentaires TSDoc présents dans le code.

### Comment documenter
Utilisez le format TSDoc/JSDoc au-dessus de vos fonctions et interfaces :

```typescript
/**
 * Description de la fonction.
 * @param param1 - Description du paramètre.
 * @returns Description du retour.
 */
export async function maFonction(param1: string) { ... }
```

### Exécuter TypeDoc (Recommandé)
Pour générer la documentation technique complète :
```bash
npx typedoc
```

