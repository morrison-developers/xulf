// src/app/(shared)/settings/SettingsContext.tsx
'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type Theme = 'light' | 'dark';
type Lang = 'en' | 'es';
type Region = 'US' | 'GB' | 'EU';

type Settings = {
  theme: Theme;
  lang: Lang;
  region: Region;
  setTheme: (t: Theme) => void;
  setLang: (l: Lang) => void;
  setRegion: (r: Region) => void;
};

const Ctx = createContext<Settings | null>(null);

const STORAGE_KEY = 'site_settings_v1';

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [lang, setLang] = useState<Lang>('en');
  const [region, setRegion] = useState<Region>('US');

  // hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const { theme, lang, region } = JSON.parse(raw);
        theme && setTheme(theme);
        lang && setLang(lang);
        region && setRegion(region);
      }
    } catch {}
  }, []);

  // persist + reflect in DOM
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ theme, lang, region }));
    // reflect to DOM (so CSS can theme)
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.lang = lang;
  }, [theme, lang, region]);

  const value = useMemo(
    () => ({ theme, lang, region, setTheme, setLang, setRegion }),
    [theme, lang, region]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSettings() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useSettings must be used within SettingsProvider');
  return v;
}
