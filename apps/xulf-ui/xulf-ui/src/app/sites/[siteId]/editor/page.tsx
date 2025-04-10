'use client';  // This ensures the code runs only on the client

import { useEffect, useState } from 'react';

type Props = {
  params: { siteId: string };
};

export default function EditorPage({ params }: Props) {
  const [clientSiteId, setClientSiteId] = useState<string | null>(null);

  // Use useEffect to set the siteId after the component mounts on the client
  useEffect(() => {
    setClientSiteId(params.siteId); // Use the siteId from params on the client side
  }, [params.siteId]);

  if (!clientSiteId) {
    return <div>Loading...</div>;  // Show a loading state until client-side rendering is done
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Editor for site: {clientSiteId}</h1>
    </div>
  );
}
