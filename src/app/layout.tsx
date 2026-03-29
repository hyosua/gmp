import type { Metadata } from "next";
import { Outfit, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { Nav } from "@/components/forge/Nav";
import { Footer } from "@/components/forge/Footer";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GMP — IUT d'Évry",
  description: "Département Génie Mécanique et Productique, IUT d'Évry",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jar = await cookies();
  const isDark = jar.get("theme")?.value !== "light";

  return (
    <html
      lang="fr"
      className={`${outfit.variable} ${geistMono.variable} h-full antialiased${isDark ? " dark" : ""}`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Nav />


        {children}


        <Footer />
      </body>
    </html>
  );
}
