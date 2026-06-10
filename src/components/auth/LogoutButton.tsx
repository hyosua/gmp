"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <button
      onClick={handleLogout}
      className="forge-btn forge-btn-ghost text-sm uppercase flex items-center gap-2"
    >
      <LogOut size={14} />
      Se déconnecter
    </button>
  );
}
