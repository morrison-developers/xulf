import Head from "next/head";

interface SEOProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
}

export default function SEO({
  title = "Default Site Title",
  description = "Default site description goes here.",
  url = "https://example.com",
  image = "https://example.com/default-social-image.png",
}: SEOProps) {
  return (
    <Head>
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Favicon + Icons */}
      <link rel="icon" href="/favicon.ico" sizes="32x32" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Optional: Theme color for mobile browsers */}
      <meta name="theme-color" content="var(--primary-accent-color)" />

      {/* Optional: Site name */}
      <meta property="og:site_name" content="My Website" />

      {/* Optional: Locale */}
      <meta property="og:locale" content="en_US" />
    </Head>
  );
}