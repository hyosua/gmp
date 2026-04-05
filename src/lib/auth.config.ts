import type { NextAuthConfig } from 'next-auth';
import { Role } from '@prisma/client';

export const authConfig = {
  pages: {
    signIn: '/connexion',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isApiAuthRoute = nextUrl.pathname.startsWith('/api/auth');
      const isDashboardRoute = nextUrl.pathname.startsWith('/espace-') || nextUrl.pathname.startsWith('/admin');
      
      if (isApiAuthRoute) {
        return true;
      }
      
      if (isDashboardRoute) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn && nextUrl.pathname === '/connexion') {
        const role = auth.user.role as Role;
        console.log(`[AUTH] User ${auth.user.email} logged in with role ${role}. Redirecting...`);
        let redirectUrl = '/';
        if (role === 'ETUDIANT') redirectUrl = '/espace-etudiant';
        else if (role === 'ENSEIGNANT') redirectUrl = '/espace-enseignant';
        else if (role === 'ENTREPRISE') redirectUrl = '/espace-entreprise';
        else if (role === 'ADMIN') redirectUrl = '/admin';
        console.log(`[AUTH] Target URL: ${redirectUrl}`);
        return Response.redirect(new URL(redirectUrl, nextUrl));
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.role = user.role as Role;
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role as Role;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
