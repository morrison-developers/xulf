'use client';

import { useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { Background } from '../components';

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      if (session?.user?.path) {
        router.replace(`/${session.user.path}/dashboard`);
      } else if (session?.user?.email) {
        fetch(`/api/users/ensure-stripe/${encodeURIComponent(session.user.email)}`)
          .then(async res => {
            try {
              const data = await res.json();
              if (data?.path) {
                router.replace(`/${data.path}/dashboard`);
              } else {
                router.replace('/404');
              }
            } catch {
              router.replace('/404');
            }
          });
      }
    }
  }, [status, session, router]);

  return (
    <>
      <Background />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <button
          onClick={() => signIn('google', { callbackUrl: '/login' })}
          className='button'
        >
          Sign in with Google
        </button>
      </div>
    </>
  );
}