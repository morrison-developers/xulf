
'use client';

import { ReactNode, useEffect, useState } from 'react';
import useScreenSize from '../../(shared)/hooks/useScreenSize';

interface NavWrapperProps {
  /** Rendered when width <= breakpoint */
  mobile: ReactNode;
  /** Rendered when width > breakpoint */
  desktop: ReactNode;
  /** Tailorable cutoff (px). Default 768 */
  breakpoint?: number;
}

/**
 * Client-side wrapper that chooses between mobile and desktop nav.
 * Safe to include inside a Server Component since this file is `use client`.
 */
export default function NavWrapper({ mobile, desktop, breakpoint = 1024 }: NavWrapperProps) {
  // Avoid hydration mismatch by deferring render until mounted
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { width } = useScreenSize();

  if (!mounted) return null;

  return width <= breakpoint ? <>{mobile}</> : <>{desktop}</>;
}