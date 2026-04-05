'use client';

import { logout } from '@/lib/actions/auth';

export default function LogoutButton() {
  return (
    <form action={logout}>
      <button type="submit" className="forge-btn forge-btn-ghost text-sm uppercase">
        Se déconnecter
      </button>
    </form>
  );
}
