'use client';

import { authenticate } from '@/lib/actions/auth';
import { useActionState } from 'react';
import { Loader2 } from 'lucide-react';

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1 text-secondary">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Entrez votre email"
          required
          className="w-full p-2 border rounded-md bg-background border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1 text-secondary">
          Mot de passe
        </label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Entrez votre mot de passe"
          required
          className="w-full p-2 border rounded-md bg-background border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
        />
      </div>

      {errorMessage && (
        <p className="text-sm text-red-500">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="forge-btn forge-btn-primary w-full justify-center"
      >
        {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'SE CONNECTER'}
      </button>
    </form>
  );
}
