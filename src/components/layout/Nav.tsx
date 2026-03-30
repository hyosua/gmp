"use client";

import { useState, useRef } from "react";
import { Cog, LogIn, ChevronDown } from "lucide-react";
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

function NavItem({ link }: { link: NavLink }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isActive =
    pathname.startsWith(link.href) &&
    link.href !== "#entreprises" &&
    link.href !== "#contact";

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 120);
  };

  const baseLabelClass =
    "px-[0.875rem] py-[0.375rem] text-[0.75rem] font-sans font-semibold tracking-[0.08em] uppercase no-underline transition-colors bg-transparent border-none cursor-pointer flex items-center gap-1";

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {link.sub ? (
        <button
          className={`${baseLabelClass} ${isActive || open ? "text-primary" : "text-muted"} hover:text-primary`}
        >
          {link.label}
          <ChevronDown
            size={11}
            className={`transition-transform duration-150 ${open ? "rotate-180" : "rotate-0"}`}
          />
        </button>
      ) : (
        <Link
          href={link.href}
          className={`${baseLabelClass} ${isActive ? "text-primary" : "text-muted"} hover:text-primary`}
        >
          {link.label}
        </Link>
      )}

      {link.sub && open && (
        <div className="absolute top-full left-0 min-w-[200px] bg-bg-card border border-border border-t-2 border-t-primary z-[100] shadow-[2px_4px_0_var(--c-accent)] py-1">
          {link.sub.map((sub) => (
            <Link
              key={sub.href}
              href={sub.href}
              className="block px-4 py-2 text-[0.75rem] font-sans font-semibold tracking-[0.05em] text-muted no-underline transition-colors hover:text-primary hover:bg-bg-deep whitespace-nowrap"
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
    <nav className="bg-background border-b-2 border-primary sticky top-0 z-50">
      <div
        className="max-w-[1280px] mx-auto flex items-center justify-between h-14 px-4 md:px-8"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 no-underline">
          <div className="w-[30px] h-[30px] bg-primary flex items-center justify-center">
            <Cog className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <span className="font-sans text-2xl text-secondary tracking-[0.1em] leading-none">
              GMP
            </span>
            <span className="ml-2 font-mono text-[0.65rem] text-muted tracking-[0.1em]">
              IUT d'Évry
            </span>
          </div>
        </Link>

        {/* Liens */}
        <div className="hidden md:flex items-center">
          {links.map((link) => (
            <NavItem key={link.label} link={link} />
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-[1.1rem] py-[0.4rem] text-[0.75rem] font-bold font-sans tracking-[0.12em] bg-transparent text-primary border border-primary no-underline transition-all hover:bg-primary hover:text-bg-deep hover:shadow-[2px_2px_0_var(--c-accent)]"
          >
            <LogIn className="w-[13px] h-[13px]" />
            CONNEXION
          </Link>
        </div>
      </div>
    </nav>
  );
}
