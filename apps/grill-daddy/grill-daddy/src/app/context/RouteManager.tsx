'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGrill } from './GrillContext';

export const RouteManager = () => {
  const { state } = useGrill();
  const router = useRouter();

  useEffect(() => {
    // Navigation logic based on the app's state
    if (state.cookingMode) {
      router.push('/cooking'); // Redirect to cooking page
    } else if (state.activeGrillItems.length > 0) {
      router.push('/dashboard'); // Redirect to dashboard
    } else {
      router.push('/'); // Redirect to landing page
    }
  }, [state.cookingMode, state.activeGrillItems, router]);

  return null;
};
