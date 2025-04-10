'use client';
import { useEffect, useState } from 'react';

type Props = {
  params: { siteId: string };
};

export default function DashboardPage({ params }: Props) {
  const [clientSiteId, setClientSiteId] = useState<string | null>(null);

  // Use useEffect to set the siteId after the component mounts on the client
  useEffect(() => {
    setClientSiteId(params.siteId);
  }, [params.siteId]);

  if (!clientSiteId) {
    return <div>Loading...</div>; // Or you can show a loading spinner
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Dashboard for site: {clientSiteId}</h1>
    </div>
  );
}
