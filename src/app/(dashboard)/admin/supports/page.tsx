import CoursClient from "@/app/(dashboard)/dashboard/cours/CoursClient";

export default function AdminSupports() {
  return <CoursClient peutDeposer={true} peutSupprimer={true} />;
}
