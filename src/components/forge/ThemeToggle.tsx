"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { C } from "@/lib/forge";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored === "dark" || (!stored && prefersDark);
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
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
      {dark ? <Sun style={{ width: "14px", height: "14px" }} /> : <Moon style={{ width: "14px", height: "14px" }} />}
    </button>
  );
}
