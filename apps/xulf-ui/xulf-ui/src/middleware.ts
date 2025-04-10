// middleware.ts
import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    // If the user is not authenticated, redirect them to this route
    signIn: '/login',
  },
});

// Configure which paths to protect
export const config = {
  matcher: [
    '/orgs',
    '/orgs/:path*',
    '/sites',
    '/sites/:path*',
  ],
};
