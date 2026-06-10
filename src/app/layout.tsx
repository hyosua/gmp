import type { Metadata } from "next";
import { Outfit, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import { Providers } from "@/components/providers";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "GMP - IUT d'Évry",
    template: "%s | GMP - IUT d'Évry",
  },
  description:
    "Département Génie Mécanique et Productique de l'IUT d'Évry-Courcouronnes. Formation BUT GMP, licences professionnelles, alternance.",
  icons: { icon: "/favicon.png" },
  openGraph: {
    siteName: "GMP - IUT d'Évry",
    type: "website",
    locale: "fr_FR",
  },
  robots: { index: true, follow: true },
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
