import { DefaultSession, DefaultUser } from "next-auth";
import { Parcours, Role } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
      parcours: Parcours;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    role: Role;
    parcours: Parcours;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role;
    parcours: Parcours;
  }
}
