// app/works/page.tsx
import Script from 'next/script';

export default function Page() {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',  item: 'https://shavonlloyd.com/' },
      { '@type': 'ListItem', position: 2, name: 'Works', item: 'https://shavonlloyd.com/works' },
    ],
  };

  return (
    <>
      <main>{/* Works content */}</main>
      <Script id="ld-works" type="application/ld+json" strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
