'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session || !session.user) {
    return <p>Loading...</p>;
  }

  const user = session.user as {
    name?: string;
    email?: string;
    image?: string;
    path?: string;
    createdAt?: string;
    stripeCustomerId?: string;
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Profile</h1>
      <ul>
        {user.name && <li><strong>Name:</strong> {user.name}</li>}
        {user.email && <li><strong>Email:</strong> {user.email}</li>}
        {user.image && <li><strong>Image:</strong> <img src={user.image} alt="User image" width={50} /></li>}
        {user.path && <li><strong>Path:</strong> {user.path}</li>}
        {user.createdAt && <li><strong>Created At:</strong> {user.createdAt}</li>}
        {user.stripeCustomerId && <li><strong>Stripe Customer ID:</strong> {user.stripeCustomerId}</li>}
      </ul>
      <button onClick={() => signOut({ callbackUrl: '/' })}>Sign Out</button>
    </div>
  );
}