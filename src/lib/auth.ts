import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { prisma } from './prisma';
import bcrypt from 'bcryptjs';

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Mot de passe', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials?.email as string;
        const password = credentials?.password as string;

        if (!email || !password) return null;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return null;
        
        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (passwordsMatch) {
          // exclude password before returning
          return {
            id: user.id,
            email: user.email,
            name: `${user.prenom} ${user.nom}`,
            role: user.role,
          };
        }
        
        return null;
      },
    }),
  ],
});
