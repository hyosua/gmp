import { C } from "@/lib/forge";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Parcours } from "@/components/sections/Parcours";
import { BandePhotos } from "@/components/sections/BandePhotos";
import { ChiffresClés } from "@/components/sections/ChiffresClés";
import { Entreprises } from "@/components/sections/Entreprises";

export default function HomePage() {
  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>
      <Nav />
      <Hero />
      <Parcours />
      <BandePhotos />
      <ChiffresClés />
      <Entreprises />
      <Footer />
    </div>
  );
}
