'use client';

import { useState, useEffect, useMemo } from 'react';
import StripeCustomerButton from './StripeCustomerButton';
import LinkBankButton from './LinkBankButton';
import BankStatusCard from './BankStatusCard';
import type { UserWithSubscription } from 'apps/morrison-developers/morrison-developers-app/app/types/userWithSubscription';

export default function ManageLinkedBankAccount({ user }: { user: UserWithSubscription }) {
  const [localUser, setLocalUser] = useState(user);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLocalUser(user);
  }, [user]);

  const bank = useMemo(
    () => localUser.paymentMethods?.find((pm) => pm.verified),
    [localUser.paymentMethods]
  );

  const sub = localUser.subscriptions?.[0];
  const isConnectedToStripe = Boolean(localUser.stripeCustomerId);

  return (
    <div>
      <h2>Manage {localUser.name}'s Subscription</h2>
      {!sub ? (
        <p>Status: <strong>none</strong></p>
        ) : (
          <div style={{ marginBottom: '1rem' }}>
            <p>Status: <strong>{sub.status}</strong></p>
            <p>
              <strong>{sub.label}</strong> — ${sub.priceCents / 100} —{' '}
              {sub.startDate ? new Date(sub.startDate).toLocaleDateString() : 'No start date'}
            </p>
          </div>
        )}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {isConnectedToStripe ? (
        bank ? (
          <BankStatusCard bank={bank} />
        ) : (
          <LinkBankButton user={localUser} setLocalUser={setLocalUser} setError={setError} />
        )
      ) : (
        <StripeCustomerButton user={localUser} setLocalUser={setLocalUser} setError={setError} />
      )}
    </div>
  );
}
