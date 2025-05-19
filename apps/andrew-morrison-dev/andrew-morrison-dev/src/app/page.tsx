'use client';

import { Analytics } from "@vercel/analytics/react";
import { UnderConstruction } from '@xulf/ui'
import { FSSBackground } from "./components/FSSBackground/FSSBackground";

export default function Index() {

  return (
    <>
      <FSSBackground />
      <UnderConstruction
        heading="andrewmorrison.dev is Under Construction"
        message="Available for contract work."
        buttonText="Email Andrew"
        contactEmail="me@andrewmorrison.dev"
        buttonColor="#61ba4d"
      />
      <Analytics />
    </>
  );
}
