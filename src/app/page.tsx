import { C } from "@/lib/forge";
import { Nav } from "@/components/forge/Nav";
import { Hero } from "@/components/forge/Hero";
import { Parcours } from "@/components/forge/Parcours";
import { BandePhotos } from "@/components/forge/BandePhotos";
import { ChiffresClés } from "@/components/forge/ChiffresClés";
import { Entreprises } from "@/components/forge/Entreprises";
import { Footer } from "@/components/forge/Footer";

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
