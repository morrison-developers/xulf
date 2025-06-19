'use client';
export const dynamic = 'force-dynamic';

import { Analytics } from "@vercel/analytics/react";
import { NavBar, Background, ParticleLayer, HomeBody, Hero, Services, Process, Portfolio, About } from "./components";
import type { Section } from "./components";

export default function Index() {
  const sections: Section[] = [
    { id: '1', label: 'Hello', component: Hero, description: "We Build Software That Sells, Scales, and Stuns." },
    // { id: '2', label: 'What We Do', component: Services },
    // { id: '3', label: 'How We Work', component: Process },
    // { id: '4', label: "What We've Done", component: Portfolio },
    // { id: '5', label: 'Who We Are', component: About },
  ];

  return (
    <>
      <NavBar sections={sections} />
      <HomeBody sections={sections} />
      <ParticleLayer />
      <Background />
      <Analytics />
    </>
  );
}
