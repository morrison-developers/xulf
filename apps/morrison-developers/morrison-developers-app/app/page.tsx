'use client';
export const dynamic = 'force-dynamic';

import { Analytics } from "@vercel/analytics/react";
import NavBar from "./components/NavBar/NavBar";
import HomeBody from "./components/HomeBody/HomeBody";
import Hero from "./components/HomeBody/Sections/Hero/Hero";
import Services from "./components/HomeBody/Sections/Services/Services";
import Process from "./components/HomeBody/Sections/Process/Process";
import Portfolio from "./components/HomeBody/Sections/Portfolio/Portfolio";
import About from "./components/HomeBody/Sections/About/About";
import ParticleLayer from "./components/Particles/Particles";
import Background from "./components/Background/Background";

interface Section {
  id: string;
  label: string;
  description?: string;
  component: React.ElementType;
}

export default function Index() {
  const sections: Section[] = [
    { id: '1', label: 'Hello', component: Hero, description: "We Build Software That Sells, Scales, and Stuns." },
    { id: '2', label: 'What We Do', component: Services },
    { id: '3', label: 'How We Work', component: Process },
    { id: '4', label: "What We've Done", component: Portfolio },
    { id: '5', label: 'Who We Are', component: About },
  ];

  return (
    <>
      <ParticleLayer />
      <NavBar sections={sections} />
      <HomeBody sections={sections} />
      <Background />
      <Analytics />
    </>
  );
}
