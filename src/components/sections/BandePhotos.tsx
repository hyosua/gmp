"use client";

import Image from "next/image";

const photos = [
  { src: "/dessin.jpg", alt: "Dessin technique et conception CAO", label: "Conception & Dessin technique", ref: "GMP-DES-001" },
  { src: "/machine.jpg", alt: "Machine-outil en atelier GMP", label: "Atelier & Machines-outils", ref: "GMP-MAC-001" },
];

export function BandePhotos() {
  return (
    <div className="grid grid-cols-2 h-[300px] overflow-hidden">
      {photos.map(({ src, alt, label, ref }) => (
        <div key={ref} className="relative overflow-hidden">
          <Image
            src={src}
            alt={alt}
            fill
            style={{
              objectFit: "cover",
              filter: "grayscale(100%)",
              transform: "scale(1.05)",
              transition: "transform 0.5s",
            }}
          />
          {/* orange overlay */}
          <div
            className="absolute inset-0"
            style={{ background: "var(--c-photo-overlay)", mixBlendMode: "multiply" }}
          />
          {/* gradient bas */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[80px]"
            style={{ background: "linear-gradient(to top, rgba(2,6,23,0.8), transparent)" }}
          />
          {/* label */}
          <div className="absolute bottom-4 left-5">
            <span className="font-mono text-[0.55rem] tracking-[0.2em] text-[rgba(226,232,240,0.5)] uppercase block mb-1">
              PHOTO · {ref}
            </span>
            <p className="font-semibold text-[0.9rem] text-[#e2e8f0]" style={{ fontFamily: "var(--font-outfit, sans-serif)" }}>
              {label}
            </p>
          </div>
          {/* border-right separator */}
          <div className="absolute top-0 right-0 bottom-0 w-px bg-[var(--c-primary-30)]" />
        </div>
      ))}
    </div>
  );
}
