// types/next-auth.d.ts or app/types/next-auth.d.ts
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      path?: string | null; // add this line
    };
  }

  interface User {
    path?: string | null; // also ensure User includes it
    id: string;
  }
}