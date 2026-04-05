'use server';

import { signIn, signOut } from '@/lib/auth';
import { AuthError } from 'next-auth';

/**
 * Authentifie un utilisateur via ses identifiants (email/mot de passe).
 * 
 * @param prevState - L'état précédent renvoyé par l'action (utilisé avec useFormState).
 * @param formData - Les données du formulaire contenant 'email' et 'password'.
 * @returns Un message d'erreur en cas d'échec, ou redirige l'utilisateur en cas de succès.
 * @throws Ré-émet les erreurs de redirection d'Auth.js pour qu'elles soient gérées par Next.js.
 */
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    console.log('[AUTH ACTION] Attempting sign in...');
    await signIn('credentials', Object.fromEntries(formData));
    console.log('[AUTH ACTION] Sign in successful.');
  } catch (error) {
    if (error instanceof AuthError) {
      console.error(`[AUTH ACTION] Error type: ${error.type}`);
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Identifiants invalides.';
        default:
          return 'Une erreur est survenue lors de la connexion.';
      }
    }
    // Auth.js redirects by throwing an error, we need to re-throw it
    // if it's a redirect error (common in NextAuth v5)
    throw error;
  }
}

/**
 * Déconnecte l'utilisateur actuel et le redirige vers la page d'accueil.
 */
export async function logout() {
  await signOut({ redirectTo: '/' });
}
