import { Hero } from "@/components/sections/Hero";
import { Parcours } from "@/components/sections/Parcours";
import { BandePhotos } from "@/components/sections/BandePhotos";
import { ChiffresClés } from "@/components/sections/ChiffresClés";
import { Entreprises } from "@/components/sections/Entreprises";

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
