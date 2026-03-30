"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  // null = pas encore hydraté (évite le flash d'icône)
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    // Lit l'état réel du DOM (appliqué par le serveur via cookie)
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    // Persiste dans un cookie (lu par le serveur au prochain rendu)
    document.cookie = `theme=${next ? "dark" : "light"}; path=/; max-age=31536000; SameSite=Lax`;
  }

  return (
    <button
      onClick={toggle}
      aria-label="Changer de thème"
      className="flex items-center justify-center w-8 h-8 border border-border bg-transparent text-muted cursor-pointer transition-all hover:border-primary hover:text-primary"
    >
      {/* Tant que non hydraté, affiche l'icône neutre */}
      {dark === null ? null : dark
        ? <Sun className="w-[14px] h-[14px]" />
        : <Moon className="w-[14px] h-[14px]" />
      }
    </button>
  );
}
