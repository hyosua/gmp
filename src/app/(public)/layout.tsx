import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { auth } from "@/lib/auth";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  
  return (
    <>
      <Nav session={session} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
