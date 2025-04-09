import NextAuth from 'auth';
import { authConfig } from '../../../auth/config.js';

export const { GET, POST } = NextAuth(authConfig);
