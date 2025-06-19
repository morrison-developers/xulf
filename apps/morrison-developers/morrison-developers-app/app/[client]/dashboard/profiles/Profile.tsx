'use client';

import { useSession, signOut } from 'next-auth/react';
import ManageLinkedBankAccount from '../billing/components/ManageLinkedBankAccount';
import type { UserWithSubscription } from '../../../types/userWithSubscription';

type Props = {
  user: UserWithSubscription | null;
};

export default function Profile({ user }: Props) {
  const { data: session, status } = useSession();

  // While session is loading, prevent rendering
  if (typeof window !== 'undefined' && status === 'loading') {
    return <p>Loading...</p>;
  }

  // No user returned from DB
  if (!user) {
    return <p>User not found.</p>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Profile</h1>
      <ul>
        {user.name && (
          <li>
            <strong>Name:</strong> {user.name}
          </li>
        )}
        {user.email && (
          <li>
            <strong>Email:</strong> {user.email}
          </li>
        )}
        {user.image && (
          <li>
            <strong>Image:</strong>{' '}
            <img src={user.image} alt="User image" width={50} />
          </li>
        )}
        {user.path && (
          <li>
            <strong>Path:</strong> {user.path}
          </li>
        )}
        {user.stripeCustomerId && (
          <li>
            <strong>Stripe Customer ID:</strong> {user.stripeCustomerId}
          </li>
        )}
        {session?.user.role === 'client' && (
          <li>
            <ManageLinkedBankAccount user={user} />
          </li>
        )}
      </ul>
      <button onClick={() => signOut({ callbackUrl: '/' })}>Sign Out</button>
    </div>
  );
}
