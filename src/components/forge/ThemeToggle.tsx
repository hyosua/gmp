"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { C } from "@/lib/forge";

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
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "32px",
        height: "32px",
        border: `1px solid ${C.border}`,
        background: "transparent",
        color: C.muted,
        cursor: "pointer",
        transition: "all 0.15s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = C.primary;
        e.currentTarget.style.color = C.primary;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = C.border;
        e.currentTarget.style.color = C.muted;
      }}
    >
      {/* Tant que non hydraté, affiche l'icône neutre */}
      {dark === null ? null : dark
        ? <Sun style={{ width: "14px", height: "14px" }} />
        : <Moon style={{ width: "14px", height: "14px" }} />
      }
    </button>
  );
}
