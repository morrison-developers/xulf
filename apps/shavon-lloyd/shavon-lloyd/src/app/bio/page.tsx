// app/bio/page.tsx
import Script from 'next/script';

export default function Page() {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://shavonlloyd.com/' },
      { '@type': 'ListItem', position: 2, name: 'Bio',  item: 'https://shavonlloyd.com/bio' },
    ],
  };

  return (
    <>
      <main>{/* Bio content */}</main>
      <Script id="ld-bio" type="application/ld+json" strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
