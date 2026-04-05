'use server';

import { signIn, signOut } from '@/lib/auth';
import { AuthError } from 'next-auth';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', Object.fromEntries(formData));
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Identifiants invalides.';
        default:
          return 'Une erreur est survenue lors de la connexion.';
      }
    }
    throw error;
  }
}

export async function logout() {
  await signOut();
}
