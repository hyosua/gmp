'use client';

import { logout } from '@/lib/actions/auth';
import { useTransition } from 'react';
import { Loader2 } from 'lucide-react';

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logout();
    });
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      className="forge-btn forge-btn-ghost text-sm uppercase flex items-center gap-2"
    >
      {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Se déconnecter'}
    </button>
  );
}
