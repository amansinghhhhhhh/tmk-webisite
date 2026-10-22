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
    // The prerendered HTML ships a static <link rel="canonical" data-prerender>
    // for the initial route. Once React takes over, react-helmet-async manages
    // the live canonical — so drop the static one to guarantee the document
    // never contains two canonical tags.
    const statics = document.querySelectorAll(
      'link[rel="canonical"][data-prerender]',
    );
    statics.forEach((el) => el.remove());
  }, [canonical]);

  useEffect(() => {
    if (!schema) return;
    const existing = document.querySelector(
      'script[type="application/ld+json"][data-schema]',
    );
    if (existing) existing.remove();
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.schema = "";
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