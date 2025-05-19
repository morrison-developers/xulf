'use client';

import { Analytics } from "@vercel/analytics/react";
import { UnderConstruction } from '@xulf/ui'

export default function Index() {

  return (
    <>
      <UnderConstruction
        heading="Nicoletta Berry – Website Coming Soon!"
        message="Thank you for your interest. I'm currently building out my online presence. Feel free to reach out with any inquiries!"
        buttonText="Email Nicoletta"
        contactEmail="nicolettaberrysoprano@gmail.com"
        buttonColor="#f21f1e"
      />
      <Analytics />
    </>
  );
}