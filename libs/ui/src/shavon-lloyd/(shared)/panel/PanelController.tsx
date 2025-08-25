// src/app/(shared)/panel/PanelController.tsx
'use client';

import { createContext, useCallback, useContext, useState } from 'react';

type Panel = 'settings' | 'music' | null;

type Ctx = {
  open: Panel;
  openPanel: (p: Exclude<Panel, null>) => void;
  toggle: (p: Exclude<Panel, null>) => void;
  close: () => void;
};

const PanelCtx = createContext<Ctx | null>(null);

export function PanelProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState<Panel>(null);

  const openPanel = useCallback((p: Exclude<Panel, null>) => setOpen(p), []);
  const close = useCallback(() => setOpen(null), []);
  const toggle = useCallback(
    (p: Exclude<Panel, null>) => setOpen((cur) => (cur === p ? null : p)),
    []
  );

  return (
    <PanelCtx.Provider value={{ open, openPanel, toggle, close }}>
      {children}
    </PanelCtx.Provider>
  );
}

export function usePanel() {
  const ctx = useContext(PanelCtx);
  if (!ctx) throw new Error('usePanel must be used within PanelProvider');
  return ctx;
}
