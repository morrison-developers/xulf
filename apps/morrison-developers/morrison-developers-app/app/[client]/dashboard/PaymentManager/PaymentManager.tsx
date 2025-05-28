// components/PaymentManager.tsx
'use client';

import { useEffect, useState } from 'react';

type UserWithSubscription = {
  id: string;
  name: string;
  email: string;
  subscriptions?: {
    id: string;
    stripeSubId: string;
    status: string;
  }[];
};

export default function PaymentManager() {
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
          {users.map((user: any) => (
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
          <div>
            <h2>Manage {selectedUser.name}'s Subscription</h2>
            <p>Email: {selectedUser.email}</p>
            <p>Status: {(selectedUser.subscriptions?.[0]?.status || 'none')}</p>

            {/* Add conditionally rendered UI here for:
              - Add subscription
              - Link bank account
              - Cancel / update subscription */}

            <button
              style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}
              onClick={() => alert('TODO: implement bank link + create sub')}
            >
              Setup Bank + Create Subscription
            </button>

            {selectedUser.subscriptions?.[0] && (
              <button
                style={{ marginTop: '1rem', marginLeft: '1rem', padding: '0.5rem 1rem', background: 'crimson', color: 'white' }}
                onClick={() => alert('TODO: cancel subscription')}
              >
                Cancel Subscription
              </button>
            )}
          </div>
        ) : (
          <p>Select a user to manage subscriptions.</p>
        )}
      </div>
    </div>
  );
}
