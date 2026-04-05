'use server';

import { signIn, signOut } from '@/lib/auth';
import { AuthError } from 'next-auth';

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

export async function logout() {
  await signOut({ redirectTo: '/' });
}
