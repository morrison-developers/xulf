

// components/SubscriptionsManager.tsx
'use client';

import { useEffect, useState } from 'react';
import type { Prisma } from '@xulf/mor-dev-db';
import UserSubscriptionPanel from './UserSubscriptionPanel';

type UserWithSubscription = Prisma.UserGetPayload<{
  include: {
    subscriptions: true;
    paymentMethods: true;
  };
}>;

export default function ClientManager({ user }: { user: UserWithSubscription }) {
  const [users, setUsers] = useState<UserWithSubscription[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserWithSubscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data.users);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading users...</p>;

  return (
    <div style={{ display: 'flex', gap: '2rem' }}>
      <div style={{ flex: 1 }}>
        <h2>Clients</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {users.map((user) => (
            <li key={user.id}>
              <button
                onClick={() => setSelectedUser(user)}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '1rem',
                  background: 'var(--button-bg)',
                  color: 'var(--button-text)',
                  border: 'none',
                  borderRadius: '0.5rem',
                  marginBottom: '0.5rem',
                  cursor: 'pointer'
                }}
              >
                {user.name} – {user.email}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ flex: 2 }}>
        {selectedUser ? (
          <UserSubscriptionPanel user={selectedUser} />
        ) : (
          <p>Select a user to manage subscriptions.</p>
        )}
      </div>
    </div>
  );
}
