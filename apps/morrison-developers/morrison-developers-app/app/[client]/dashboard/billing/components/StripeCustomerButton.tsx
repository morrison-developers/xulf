'use client';
import { useState } from 'react';

export default function StripeCustomerButton({ user, setLocalUser, setError }: any) {
  const [creatingCustomer, setCreatingCustomer] = useState(false);

  const createStripeCustomer = async () => {
    try {
      setCreatingCustomer(true);
      setError(null);

      const res = await fetch('/api/stripe/customer', {
        method: 'POST',
        body: JSON.stringify({ userId: user.id }),
      });

      const data = await res.json();
      if (data.customerId) {
        setLocalUser({ ...user, stripeCustomerId: data.customerId });
      } else {
        throw new Error('Failed to create Stripe customer.');
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setCreatingCustomer(false);
    }
  };

  return (
    <button onClick={createStripeCustomer} disabled={creatingCustomer}>
      {creatingCustomer ? 'Creating...' : 'Create Stripe Customer'}
    </button>
  );
}
