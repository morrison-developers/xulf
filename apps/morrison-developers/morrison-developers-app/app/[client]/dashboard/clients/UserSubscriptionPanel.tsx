import { useEffect, useState } from 'react';
import type { Prisma } from '@xulf/mor-dev-db';
import BankStatusCard from '../billing/components/BankStatusCard';

type UserWithSubscription = Prisma.UserGetPayload<{
  include: {
    subscriptions: true;
    paymentMethods: true;
  };
}>;

type StripeInfo = {
  customer?: any;
  subscriptions?: any[];
  invoices?: any[];
  paymentMethods?: any[];
};

export default function UserSubscriptionPanel({ user }: { user: UserWithSubscription }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [stripeData, setStripeData] = useState<StripeInfo | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [label, setLabel] = useState('');
  const [amountDollars, setAmountDollars] = useState('');
  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setMonth(d.getMonth() + 1);
    d.setDate(1);
    return d.toISOString().split('T')[0];
  });

  useEffect(() => {
    if (!user.stripeCustomerId) return;

    fetch(`/api/stripe/inspect?customerId=${user.stripeCustomerId}`)
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text);
        }
        return res.json();
      })
      .then(setStripeData)
      .catch(err => {
        console.error('[inspect] error:', err);
        setStatus('Failed to load Stripe data');
      });
  }, [user]);

  return (
    <div style={{ padding: '1rem', background: '#111', borderRadius: '0.5rem', color: '#fff' }}>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <p>Stripe Customer ID: {user.stripeCustomerId ?? '—'}</p>

      <button onClick={() => setShowForm(true)} disabled={loading}>
        Create Auto Payment
      </button>

      {showForm && (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const defaultPaymentMethod = user.paymentMethods.find(pm => pm.verified);
            if (!defaultPaymentMethod?.stripePmId) {
              setStatus('No verified payment method found.');
              return;
            }

            if (!label.trim() || !amountDollars || !startDate) {
              setStatus('Missing required fields');
              return;
            }

            setLoading(true);
            setStatus(null);

            try {
              const res = await fetch('/api/stripe/subscription', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  userId: user.id,
                  label,
                  amountCents: Math.round(parseFloat(amountDollars) * 100),
                  startDate,
                  paymentMethodId: defaultPaymentMethod.stripePmId,
                }),
              });

              if (res.ok) {
                const data = await res.json();
                setStatus(`Subscription created: ${data.subscriptionId}`);
                setShowForm(false);
                setLabel('');
                setAmountDollars('');
              } else {
                const err = await res.text();
                setStatus(`Error: ${err}`);
              }
            } catch {
              setStatus('Failed to create subscription.');
            } finally {
              setLoading(false);
            }
          }}
          style={{ marginTop: '1rem' }}
        >
          <label>
            Label:
            <input value={label} onChange={e => setLabel(e.target.value)} required />
          </label>

          <label>
            Amount ($):
            <input type="number" value={amountDollars} onChange={e => setAmountDollars(e.target.value)} required />
          </label>

          <label>
            Start Date:
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required />
          </label>

          <button type="submit" disabled={loading} style={{ marginLeft: '1rem' }}>
            Submit
          </button>
          <button type="button" onClick={() => setShowForm(false)} style={{ marginLeft: '0.5rem' }}>
            Cancel
          </button>
        </form>
      )}

      {status && <p style={{ marginTop: '1rem', color: 'orange' }}>{status}</p>}

      {stripeData && (
        <div style={{ marginTop: '2rem' }}>
          <h5>Active Subscriptions</h5>
          <ul>
            {user.subscriptions.length > 0 ? (
              user.subscriptions.map(sub => (
                <li key={sub.id}>
                  ${sub.priceCents / 100} —{' '}
                  {sub.startDate ? new Date(sub.startDate).toLocaleDateString() : 'No date'}
                </li>
              ))
            ) : (
              <li>No subscriptions</li>
            )}
          </ul>
          <h5>Payment Methods</h5>
          {user.paymentMethods?.some(pm => pm.verified) && (
            <div>
              {user.paymentMethods
                .filter(pm => pm.verified)
                .map(pm => (
                  <BankStatusCard key={pm.stripePmId} bank={pm} />
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
