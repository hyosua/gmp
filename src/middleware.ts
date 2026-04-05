import NextAuth from 'next-auth';
import { authConfig } from '@/lib/auth.config';
import { NextResponse } from 'next/server';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const role = req.auth?.user?.role;

  // Protect spaces based on role
  if (isLoggedIn) {
    if (nextUrl.pathname.startsWith('/espace-etudiant') && role !== 'ETUDIANT') {
      return NextResponse.redirect(new URL(getRolePath(role), nextUrl));
    }
    if (nextUrl.pathname.startsWith('/espace-enseignant') && role !== 'ENSEIGNANT') {
      return NextResponse.redirect(new URL(getRolePath(role), nextUrl));
    }
    if (nextUrl.pathname.startsWith('/espace-entreprise') && role !== 'ENTREPRISE') {
      return NextResponse.redirect(new URL(getRolePath(role), nextUrl));
    }
    if (nextUrl.pathname.startsWith('/admin') && role !== 'ADMIN') {
      return NextResponse.redirect(new URL(getRolePath(role), nextUrl));
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
