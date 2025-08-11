// app/page.tsx  (Home)
import Script from 'next/script';

export default function Index() {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://shavonlloyd.com/' },
    ],
  };

  return (
    <>
      <main>{/* Home content */}</main>
      <Script id="ld-home" type="application/ld+json" strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
