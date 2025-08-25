// app/contact/page.tsx
import Script from 'next/script';

export default function Page() {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',  item: 'https://shavonlloyd.com/' },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://shavonlloyd.com/contact' },
    ],
  };

  return (
    <>
      <main>{/* Contact content */}</main>
      <Script id="ld-contact" type="application/ld+json" strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
