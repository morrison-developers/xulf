// app/calendar/page.tsx
import Script from 'next/script';

export default function Page() {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',    item: 'https://shavonlloyd.com/' },
      { '@type': 'ListItem', position: 2, name: 'Calendar', item: 'https://shavonlloyd.com/calendar' },
    ],
  };

  return (
    <>
      <main>{/* Calendar content */}</main>
      <Script id="ld-calendar" type="application/ld+json" strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
