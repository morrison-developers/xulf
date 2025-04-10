export default function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { siteId: string };
}) {
  return (
    <div className="flex">
      <aside className="w-64 bg-gray-100 p-4">
        <h2 className="text-lg font-bold mb-4">Site: {params.siteId}</h2>
        <ul className="space-y-2">
          <li><a href={`/app/sites/${params.siteId}/dashboard`}>Dashboard</a></li>
          <li><a href={`/app/sites/${params.siteId}/editor`}>Editor</a></li>
        </ul>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
