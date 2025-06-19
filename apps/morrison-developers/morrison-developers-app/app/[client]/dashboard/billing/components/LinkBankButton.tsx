'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import type Stripe from 'stripe';
import type { UserWithSubscription } from 'apps/morrison-developers/morrison-developers-app/app/types/userWithSubscription';

type Props = {
  user: UserWithSubscription;
  setLocalUser: (user: UserWithSubscription) => void;
  setError: (err: string | null) => void;
};

export default function LinkBankButton({ user, setLocalUser, setError }: Props) {
  const [linkingBank, setLinkingBank] = useState(false);

  const startBankLink = async () => {
    try {
      console.log('[LinkBankButton] STARTING bank link process...');
      setLinkingBank(true);
      setError(null);

      console.log('[LinkBankButton] Step 1: Creating SetupIntent...');
      const res = await fetch('/api/stripe/payment-method/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stripeCustomerId: user.stripeCustomerId }),
      });

      const data = await res.json();
      console.log('[LinkBankButton] /initiate response:', data);
      if (!data.clientSecret) throw new Error('Missing clientSecret from Stripe');

      console.log('[LinkBankButton] Step 2: Loading Stripe.js...');
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
      if (!stripe) throw new Error('Stripe.js failed to load');

      console.log('[LinkBankButton] Step 3: Calling collectBankAccountForSetup...');
      const result = await stripe.collectBankAccountForSetup({
        clientSecret: data.clientSecret,
        params: {
          payment_method_type: 'us_bank_account',
          payment_method_data: {
            billing_details: { name: user.name || '' },
          },
        },
        expand: ['payment_method'],
      });

      console.log('[LinkBankButton] Stripe collect result:', result);

      const setupIntent = result.setupIntent as Stripe.SetupIntent;
      console.log('[LinkBankButton] Extracted setupIntent:', setupIntent);

      const pm = setupIntent.payment_method;
      if (!pm) {
        console.warn('[LinkBankButton] No payment method found on setupIntent.');
      }

      if (pm && typeof pm !== 'string') {
        console.log('[LinkBankButton] Raw payment method object:', pm);

        const usBank = pm.us_bank_account as Stripe.PaymentMethod.UsBankAccount;
        const status = (pm.us_bank_account as any)?.status;
        const bankName = usBank?.bank_name;
        const last4 = usBank?.last4;

        console.log('[LinkBankButton] Extracted:', {
          status,
          stripePmId: pm.id,
          bankName,
          last4,
        });

        if (bankName && last4) {
          console.log('[LinkBankButton] Saving payment method to DB...');
          const verifyRes = await fetch('/api/stripe/payment-method/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId: user.id,
              stripePmId: pm.id,
              bankName,
              last4,
            }),
          });

          const verifyJson = await verifyRes.json();
          console.log('[LinkBankButton] /verify response:', verifyJson);
        } else {
          console.warn('[LinkBankButton] Missing bankName or last4, not saving.');
        }
      } else {
        console.warn('[LinkBankButton] Payment method is a string or missing:', pm);
      }

      console.log('[LinkBankButton] Step 6: Refetching user...');
      const refetchRes = await fetch(`/api/users/${user.id}`);
      const updated = await refetchRes.json();
      console.log('[LinkBankButton] Refetched user:', updated.user);
      setLocalUser(updated.user);

      console.log('[LinkBankButton] Bank link process complete.');
    } catch (err) {
      console.error('[LinkBankButton] ERROR:', err);
      setError((err as Error).message);
    } finally {
      setLinkingBank(false);
    }
  };

  return (
    <button onClick={startBankLink} disabled={linkingBank}>
      {linkingBank ? 'Linking...' : 'Link Bank Account'}
    </button>
  );
}
