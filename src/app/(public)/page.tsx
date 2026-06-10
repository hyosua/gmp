import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Parcours } from "@/components/sections/Parcours";
import { BandePhotos } from "@/components/sections/BandePhotos";
import { ChiffresClés } from "@/components/sections/ChiffresClés";
import { Entreprises } from "@/components/sections/Entreprises";

export const metadata: Metadata = {
  title: "GMP - IUT d'Évry",
  description:
    "Bienvenue au département Génie Mécanique et Productique de l'IUT d'Évry. BUT GMP, licences professionnelles, alternance et projets industriels.",
  openGraph: {
    title: "GMP - IUT d'Évry",
    description:
      "Bienvenue au département Génie Mécanique et Productique de l'IUT d'Évry.",
    url: "/",
  },
};

export default function HomePage() {
  return (
    <div className="bg-background min-h-screen">
      <Hero />
      <Parcours />
      <BandePhotos />
      <ChiffresClés />
      <Entreprises />
    </div>
  );
}
