"use client";

import Image from "next/image";
import { C } from "@/lib/forge";

const photos = [
  { src: "/dessin.jpg", alt: "Dessin technique et conception CAO", label: "Conception & Dessin technique", ref: "GMP-DES-001" },
  { src: "/machine.jpg", alt: "Machine-outil en atelier GMP", label: "Atelier & Machines-outils", ref: "GMP-MAC-001" },
];

export function BandePhotos() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", height: "300px", overflow: "hidden" }}>
      {photos.map(({ src, alt, label, ref }) => (
        <div key={ref} style={{ position: "relative", overflow: "hidden" }}>
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
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(13,148,136,0.55)",
              mixBlendMode: "multiply",
            }}
          />
          {/* gradient bas */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "80px",
              background: "linear-gradient(to top, rgba(2,6,23,0.8), transparent)",
            }}
          />
          {/* label */}
          <div style={{ position: "absolute", bottom: "16px", left: "20px" }}>
            <span
              style={{
                fontFamily: C.mono,
                fontSize: "0.55rem",
                letterSpacing: "0.2em",
                color: "rgba(226,232,240,0.5)",
                textTransform: "uppercase" as const,
                display: "block",
                marginBottom: "4px",
              }}
            >
              PHOTO · {ref}
            </span>
            <p
              style={{
                fontFamily: "var(--font-outfit, sans-serif)",
                fontWeight: 600,
                fontSize: "0.9rem",
                color: "#e2e8f0",
              }}
            >
              {label}
            </p>
          </div>
          {/* border-right separator */}
          <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "1px", background: `${C.primary}30` }} />
        </div>
      ))}
    </div>
  );
}
