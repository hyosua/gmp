import { auth } from '@/lib/auth';
import LogoutButton from '@/components/auth/LogoutButton';
import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Administration | GMP' };

export const dynamic = 'force-dynamic';

export default async function EspaceAdmin() {
  const session = await auth();

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-secondary">Administration</h1>
      <div className="forge-card rounded-lg p-8 mb-8 shadow-sm">
        <p className="text-lg text-secondary">Bienvenue, <strong>{session?.user?.name}</strong>.</p>
        <p className="text-muted mt-2">Accès restreint au panneau d&apos;administration.</p>
      </div>
      <LogoutButton />
    </div>
  );
}
