'use client';

export default function BankStatusCard({ bank }: { bank: any }) {
  return (
    <div
      style={{
        border: '1px solid var(--border-color)',
        borderRadius: '0.5rem',
        padding: '1rem',
        background: 'var(--background-muted)',
        color: 'var(--color-text-primary)',
        marginBottom: '1rem',
      }}
    >
      <p style={{ margin: 0, fontWeight: 600 }}>
        🏦 Bank: {bank?.bankName} •••• {bank?.last4}
      </p>
      <p style={{ margin: '0.5rem 0 0', color: 'var(--color-accent)' }}>
        ✅ ACH debit ready
      </p>
    </div>
  );
}
