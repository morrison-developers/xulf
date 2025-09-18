'use client';

import { Analytics } from "@vercel/analytics/react";
import { UnderConstruction } from '@xulf/ui'

export default function Page() {

  return (
    <>
      <UnderConstruction
        heading="Sweet Sye is Under Construction"
        message="Something sweet is coming your way. Check back soon."
        buttonText="Contact Us"
        contactEmail="contact@sweetsye.com"
      />
      <Analytics />
    </>
  );
}
