import { auth } from "@/lib/auth";
import CoursClient from "./CoursClient";

export default async function PageCours() {
  const session = await auth();
  const peutDeposer =
    session?.user?.role === "ENSEIGNANT" || session?.user?.role === "ADMIN";

  return <CoursClient peutDeposer={peutDeposer} />;
}
