"use client";

import { Cog, LogIn } from "lucide-react";
import { C } from "@/lib/forge";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { useRouter } from "next/navigation";

export function Nav() {

  const linkstyles = {
    padding: "0.375rem 0.875rem",
    fontSize: "0.75rem",
    color: C.muted,
    fontFamily: "var(--font-outfit, sans-serif)",
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    textDecoration: "none",
    transition: "color 0.15s",
  };
  const router = useRouter();
  return (
    <nav
      style={{
        background: C.bg,
        borderBottom: `2px solid ${C.primary}`,
        position: "sticky",
        top: 0,
        zIndex: 50,
      }
      }
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "56px",
        }}
        className="px-4 md:px-8"
      >
        {/* logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div
            style={{
              width: "30px",
              height: "30px",
              background: C.primary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Cog
              style={{ width: "16px", height: "16px", color: "white" }}
              strokeWidth={2.5}
            />
          </div>
          <div>
            <span
              style={{
                fontFamily: "var(--font-outfit, sans-serif)",
                fontSize: "1.5rem",
                color: C.secondary,
                letterSpacing: "0.1em",
                lineHeight: 1,
              }}
            >
              GMP
            </span>
            <span
              style={{
                marginLeft: "0.5rem",
                fontFamily: C.mono,
                fontSize: "0.65rem",
                color: C.muted,
                letterSpacing: "0.1em",
              }}
            >
              IUT d'Évry
            </span>
          </div>
        </div>

        {/* links */}
        <div style={{ display: "flex", gap: "0.25rem" }} className="hidden md:flex">
          {["Formation", "Entreprises", "Actualités", "Contact"].map((item) => (
            <a
              key={item}
              href="#"
              style={linkstyles}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.primary)}
              onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
            >
              {item}
            </a>
          ))}
        </div>

        <div style={{ display: "flex", gap: "0.25rem" }} className="hidden md:flex">

          <a style={linkstyles} href="/presentation/programme" onMouseEnter={(e) => (e.currentTarget.style.color = C.primary)}
            onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}>
            Programme
          </a>
          <a style={linkstyles} href="/presentation/specificite" onMouseEnter={(e) => (e.currentTarget.style.color = C.primary)}
            onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}>
            Spécificités
          </a>
          <a style={linkstyles} href="/presentation/lieu" onMouseEnter={(e) => (e.currentTarget.style.color = C.primary)}
            onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}>
            Lieux
          </a>
          <a style={linkstyles} href="/presentation/but-gmp" onMouseEnter={(e) => (e.currentTarget.style.color = C.primary)}
            onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}>
            Buts GMP
          </a>
          <a style={linkstyles} href="/presentation/alternance" onMouseEnter={(e) => (e.currentTarget.style.color = C.primary)}
            onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}>
            Alternance
          </a>
          <a style={linkstyles} href="/presentation/apres-but" onMouseEnter={(e) => (e.currentTarget.style.color = C.primary)}
            onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}>
            Après le BUT
          </a>


        </div>

        {/* cta */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <ThemeToggle />
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.4rem 1.1rem",
              fontSize: "0.75rem",
              fontWeight: 700,
              fontFamily: "var(--font-outfit, sans-serif)",
              letterSpacing: "0.12em",
              background: "transparent",
              color: C.primary,
              border: `1px solid ${C.primary}`,
              cursor: "pointer",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = C.primary;
              e.currentTarget.style.color = C.bgDeep;
              e.currentTarget.style.boxShadow = `2px 2px 0 ${C.accent}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = C.primary;
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <LogIn style={{ width: "13px", height: "13px" }} />
            CONNEXION
          </button>
        </div>
      </div>
    </nav >
  );
}
