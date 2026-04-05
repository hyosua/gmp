import LoginForm from '@/components/auth/LoginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Connexion | Département GMP',
  description: 'Connectez-vous à votre espace personnel',
};

export default function ConnexionPage() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full forge-card rounded-lg p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-center mb-8 text-secondary">
          CONNEXION
        </h1>
        <LoginForm />
      </div>
    </main>
  );
}
