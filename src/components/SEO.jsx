import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

export default function SEO({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  schema,
}) {
  useEffect(() => {
    if (!schema) return;
    const existing = document.querySelector(
      'script[type="application/ld+json"][data-faq-schema]',
    );
    if (existing) existing.remove();
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.faqSchema = "";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, [schema]);

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