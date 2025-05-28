'use client';

import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Profile from './Profile/Profile';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const isAdminDashboard = params?.client === 'morrison-developers';
  const [view, setView] = useState('profile');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') return <p>Loading...</p>;

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: 'var(--background-body)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '1rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 1000,
        fontFamily: 'var(--font-main)',
        color: 'var(--color-text-primary)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="/Transparent_Horizontal.svg"
            alt="Morrison Developers Logo"
            style={{ height: '40px', marginRight: '1rem', filter: 'brightness(0) invert(1)' }}
          />
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.5rem',
            fontWeight: 700,
            margin: 0
          }}>
            Welcome, {session?.user?.name}
          </h2>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {isAdminDashboard && (
            <button
              className="dashboard-button"
              style={{
                backgroundColor: view === 'client-manager' ? 'var(--primary-accent-color)' : 'var(--button-bg)',
                color: view === 'client-manager' ? 'var(--color-text-primary)' : 'var(--button-text)',
                fontFamily: 'var(--button-font)',
                fontSize: '1rem',
                fontWeight: 600,
                padding: '0.5rem 1rem',
                border: 'none',
                borderRadius: 'var(--button-radius)',
                cursor: 'pointer'
              }}
              onClick={() => setView('client-manager')}
            >
              Client Manager
            </button>
          )}
          <button
            className="dashboard-button"
            style={{
              backgroundColor: view === 'analytics' ? 'var(--primary-accent-color)' : 'var(--button-bg)',
              color: view === 'analytics' ? 'var(--color-text-primary)' : 'var(--button-text)',
              fontFamily: 'var(--button-font)',
              fontSize: '1rem',
              fontWeight: 600,
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: 'var(--button-radius)',
              cursor: 'pointer'
            }}
            onClick={() => setView('analytics')}
          >
            Analytics
          </button>
          <button
            className="dashboard-button"
            style={{
              backgroundColor: view === 'cms' ? 'var(--primary-accent-color)' : 'var(--button-bg)',
              color: view === 'cms' ? 'var(--color-text-primary)' : 'var(--button-text)',
              fontFamily: 'var(--button-font)',
              fontSize: '1rem',
              fontWeight: 600,
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: 'var(--button-radius)',
              cursor: 'pointer'
            }}
            onClick={() => setView('cms')}
          >
            Edit Content
          </button>
          <button
            className="dashboard-button"
            style={{
              backgroundColor: view === 'payments' ? 'var(--primary-accent-color)' : 'var(--button-bg)',
              color: view === 'payments' ? 'var(--color-text-primary)' : 'var(--button-text)',
              fontFamily: 'var(--button-font)',
              fontSize: '1rem',
              fontWeight: 600,
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: 'var(--button-radius)',
              cursor: 'pointer'
            }}
            onClick={() => setView('payments')}
          >
            Payment Portal
          </button>
          <button
            className="dashboard-button"
            style={{
              backgroundColor: view === 'profile' ? 'var(--primary-accent-color)' : 'var(--button-bg)',
              border: 'none',
              borderRadius: '50%',
              padding: 0,
              cursor: 'pointer',
              outline: view === 'profile' ? '2px solid var(--primary-accent-color)' : 'none',
              height: '40px',
              width: '40px',
              overflow: 'hidden'
            }}
            onClick={() => setView('profile')}
          >
            <img
              src={session?.user?.image || '/default-avatar.svg'}
              alt="Profile"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '50%',
              }}
            />
          </button>
        </div>
      </nav>
      <main style={{
        padding: '6rem 2rem 2rem',
        background: 'var(--background-body)',
        color: 'var(--color-text-primary)',
        minHeight: '100vh',
        fontFamily: 'var(--font-main)'
      }}>
        {view === 'profile' && <Profile />}
        {view === 'analytics' && <p>Analytics dashboard goes here.</p>}
        {view === 'cms' && <p>CMS editor goes here.</p>}
        {view === 'payments' && <p>Payment Manager goes here.</p>}
        {view === 'client-manager' && <p>cllient manager goes here.</p>}
      </main>
    </>
  );
}