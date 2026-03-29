"use client";

import { useState, useRef } from "react";
import { Cog, LogIn, ChevronDown } from "lucide-react";
import { C } from "@/lib/forge";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SubLink = { label: string; href: string };

type NavLink = {
  label: string;
  href: string;
  sub?: SubLink[];
};

const links: NavLink[] = [
  {
    label: "Formation",
    href: "/presentation",
    sub: [
      { label: "Programme", href: "/presentation/programme" },
      { label: "Spécificités", href: "/presentation/specificite" },
      { label: "Lieux", href: "/presentation/lieu" },
      { label: "Objectif BUT GMP", href: "/presentation/but-gmp" },
      { label: "Alternance", href: "/presentation/alternance" },
      { label: "Après le BUT", href: "/presentation/apres-but" },
    ],
  },
  {
    label: "Licences",
    href: "/licences",
    sub: [
      { label: "Licence MIE", href: "/licences/mie" },
      { label: "Licence MIEF", href: "/licences/mief" },
      { label: "Licence MRI", href: "/licences/mri" },
    ],
  },
  { label: "Entreprises", href: "#entreprises" },
  { label: "Contact", href: "#contact" },
];

const labelStyle = {
  padding: "0.375rem 0.875rem",
  fontSize: "0.75rem",
  fontFamily: C.sans,
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
  textDecoration: "none",
  transition: "color 0.15s",
  background: "transparent",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "0.25rem",
};

function NavItem({ link }: { link: NavLink }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isActive =
    pathname.startsWith(link.href) &&
    link.href !== "#entreprises" &&
    link.href !== "#contact";

  const color = isActive || open ? C.primary : C.muted;

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {link.sub ? (
        <button
          style={{ ...labelStyle, color }}
          onMouseEnter={(e) => (e.currentTarget.style.color = C.primary)}
          onMouseLeave={(e) => (e.currentTarget.style.color = color)}
        >
          {link.label}
          <ChevronDown
            size={11}
            style={{
              transition: "transform 0.15s",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </button>
      ) : (
        <Link
          href={link.href}
          style={{ ...labelStyle, color }}
          onMouseEnter={(e) => (e.currentTarget.style.color = C.primary)}
          onMouseLeave={(e) => (e.currentTarget.style.color = color)}
        >
          {link.label}
        </Link>
      )}

      {link.sub && open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            minWidth: "200px",
            background: C.bgCard,
            border: `1px solid ${C.border}`,
            borderTop: `2px solid ${C.primary}`,
            zIndex: 100,
            boxShadow: `2px 4px 0 ${C.accent}`,
            paddingTop: "0.25rem",
            paddingBottom: "0.25rem",
          }}
        >
          {link.sub.map((sub) => (
            <Link
              key={sub.href}
              href={sub.href}
              style={{
                display: "block",
                padding: "0.5rem 1rem",
                fontSize: "0.75rem",
                fontFamily: C.sans,
                fontWeight: 600,
                letterSpacing: "0.05em",
                color: C.muted,
                textDecoration: "none",
                transition: "color 0.15s, background 0.15s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = C.primary;
                e.currentTarget.style.background = C.bgDeep;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = C.muted;
                e.currentTarget.style.background = "transparent";
              }}
            >
              {sub.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function Nav() {
  return (
    <nav
      style={{
        background: C.bg,
        borderBottom: `2px solid ${C.primary}`,
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
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
        {/* Logo */}
        <Link
          href="/"
          style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}
        >
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
            <Cog style={{ width: "16px", height: "16px", color: "white" }} strokeWidth={2.5} />
          </div>
          <div>
            <span
              style={{
                fontFamily: C.sans,
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
        </Link>

        {/* Liens */}
        <div className="hidden md:flex" style={{ alignItems: "center" }}>
          {links.map((link) => (
            <NavItem key={link.label} link={link} />
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <ThemeToggle />
          <Link
            href="/dashboard"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.4rem 1.1rem",
              fontSize: "0.75rem",
              fontWeight: 700,
              fontFamily: C.sans,
              letterSpacing: "0.12em",
              background: "transparent",
              color: C.primary,
              border: `1px solid ${C.primary}`,
              textDecoration: "none",
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
          </Link>
        </div>
      </div>
    </nav>
  );
}
