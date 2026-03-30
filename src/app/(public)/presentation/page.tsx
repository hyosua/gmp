"use client";

import Link from "next/link";

const links = [
  { label: "Programme", href: "/presentation/programme" },
  { label: "Spécificités", href: "/presentation/specificite" },
  { label: "Lieux", href: "/presentation/lieu" },
  { label: "Buts GMP", href: "/presentation/but-gmp" },
  { label: "Alternance", href: "/presentation/alternance" },
  { label: "Après le BUT", href: "/presentation/apres-but" },
];

export default function PresentationPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 bg-background text-secondary">
      <div className="max-w-[720px] w-full text-center">
        <h1 className="text-5xl font-bold mb-3 text-secondary font-sans">
          Présentation
        </h1>
        <p className="text-base text-muted mb-10 font-sans">
          Découvrez le département Génie Mécanique et Productique de l'IUT d'Évry
        </p>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="block px-5 py-4 bg-bg-card border border-border border-l-[3px] border-l-primary text-secondary font-sans font-semibold text-sm tracking-[0.04em] no-underline transition-colors duration-150 hover:text-primary hover:shadow-[2px_2px_0_var(--c-accent)]"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
