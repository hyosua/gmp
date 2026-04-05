import NextAuth from 'next-auth';
import { authConfig } from '@/lib/auth.config';
import { NextResponse } from 'next/server';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const role = req.auth?.user?.role;

  // 1. Unauthenticated users: redirect to login if trying to access dashboard/admin
  const isDashboardRoute = nextUrl.pathname.startsWith('/espace-') || nextUrl.pathname.startsWith('/admin');
  if (isDashboardRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/connexion', nextUrl));
  }

  // 2. Authenticated users: protect spaces based on role
  if (isLoggedIn) {
    const rolePaths = {
      ETUDIANT: '/espace-etudiant',
      ENSEIGNANT: '/espace-enseignant',
      ENTREPRISE: '/espace-entreprise',
      ADMIN: '/admin',
    };

    const targetPath = getRolePath(role);

    // If user is on /connexion, redirect to their home
    if (nextUrl.pathname === '/connexion') {
      return NextResponse.redirect(new URL(targetPath, nextUrl));
    }

    // Check if user is trying to access a different role's space
    const isAccessingOtherSpace = Object.entries(rolePaths).some(([r, path]) => {
      return r !== role && nextUrl.pathname.startsWith(path);
    });

    if (isAccessingOtherSpace) {
      console.log(`[AUTH] Unauthorized access attempt by ${role} to ${nextUrl.pathname}. Redirecting to ${targetPath}`);
      return NextResponse.redirect(new URL(targetPath, nextUrl));
    }
  }

  function getRolePath(userRole: string | undefined): string {
    if (userRole === 'ETUDIANT') return '/espace-etudiant';
    if (userRole === 'ENSEIGNANT') return '/espace-enseignant';
    if (userRole === 'ENTREPRISE') return '/espace-entreprise';
    if (userRole === 'ADMIN') return '/admin';
    return '/';
  }
});

export const config = {
  // Matcher ignoring next/image, next/static, api routes, etc.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)'],
};
