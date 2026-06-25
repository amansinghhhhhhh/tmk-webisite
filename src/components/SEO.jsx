import { Helmet } from "react-helmet-async";

export default function SEO({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
}) {
  return (
    <Helmet>
      {title && <title>{title}</title>}

      {description && (
        <meta
          name="description"
          content={description}
        />
      )}

      {canonical && (
        <link
          rel="canonical"
          href={canonical}
        />
      )}

      {ogTitle && (
        <meta property="og:title" content={ogTitle} />
      )}

      {ogDescription && (
        <meta property="og:description" content={ogDescription} />
      )}

      {ogImage && (
        <meta property="og:image" content={ogImage} />
      )}
    </Helmet>
  );
}