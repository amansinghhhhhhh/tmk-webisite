import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";
import SEO from "../components/SEO";
import { fetchService, getMediaUrl, mapService } from "../api/wordpress";
import FAQSection from "../components/FAQSection";

export default function ServicePage({ slug: routeSlug }) {
  const { slug } = useParams();
  const serviceSlug = routeSlug || slug;
  const [service, setService] = useState(null);
  const [bannerImg, setBannerImg] = useState("");
  const [contentImg, setContentImg] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [mobileBannerImg, setMobileBannerImg] = useState("");
  const [showWhyMore, setShowWhyMore] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setService(null);
    setBannerImg("");
    setMobileBannerImg("");
    setContentImg("");
    setShowWhyMore(false);

    fetchService(serviceSlug)
      .then((s) => {
        if (!s) {
          setLoading(false);
          return;
        }
        const mapped = mapService(s);
        setService(mapped);

        const acf = s.acf || {};
        const promises = [];
        if (acf.banner_image)
          promises.push(getMediaUrl(acf.banner_image).then(setBannerImg));
        if (acf.mobile_banner_image)
          promises.push(
            getMediaUrl(acf.mobile_banner_image).then(setMobileBannerImg),
          );
        if (acf.why_choose_us_image)
          promises.push(
            getMediaUrl(acf.why_choose_us_image).then(setContentImg),
          );
        return Promise.all(promises);
      })
      .then(() => setLoading(false))
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [serviceSlug]);

  if (loading) {
    return (
      <section className="page-hero" style={{ minHeight: "60vh" }}>
        <div className="container">
          <div className="hero-content" style={{ textAlign: "center" }}>
            <p style={{ color: "#999", fontSize: 18 }}>Loading...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || !service) {
    return (
      <section className="page-hero" style={{ minHeight: "40vh" }}>
        <div className="container">
          <div className="hero-content">
            <h1>
              Service <span className="gold">Not Found</span>
            </h1>
            <p>The service you're looking for doesn't exist.</p>
            <Link to="/services" className="btn btn-primary">
              View All Services
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const acf = service.acf;
  const features = acf.we_offer_card || [];
  const whyDesc = acf.why_choose_us_description || "";
  const whyPointers = acf.why_choose_us_pointers || "";
  const hasWhySection = whyDesc || whyPointers || contentImg;
  const hasElevate = acf.why_choose_tmk_title || acf.why_choose_tmk_description;
  const faqItems = acf.faq_items || [];
  const heroBg = bannerImg || `/internal pages hero image/${serviceSlug}.webp`;

  function stripHtml(html) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  }

  const faqSchema = faqItems.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: stripHtml(item.answer),
          },
        })),
      }
    : null;

  return (
    <>
      <SEO
        title={service?.seo?.title}
        description={service?.seo?.description || service?.seo?.og_description}
        canonical={`https://themarketingking.org/${serviceSlug}`}
        ogTitle={service?.seo?.og_title}
        ogDescription={
          service?.seo?.og_description || service?.seo?.description
        }
        ogImage={service?.seo?.og_image?.[0]?.url}
        schema={faqSchema}
      />
      <section
        className="page-hero service-page-hero"
        style={
          !isMobile
            ? {
                backgroundImage: `url(${heroBg})`,
                backgroundPosition: "70% 0%",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }
            : {}
        }
      >
        {mobileBannerImg && (
          <img src={mobileBannerImg} alt="" className="hero-bg-img-mobile" />
        )}
        <div className="container">
          <div className="hero-content">
            <h1>{acf.banner_heading || service.title}</h1>
            {acf.banner_description && (
              <p
                dangerouslySetInnerHTML={{
                  __html: acf.banner_description,
                }}
              />
            )}
            <Link to="/contact" className="btn btn-primary">
              Get Started <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {features.length > 0 && (
        <section className="content-section alt">
          <div className="container">
            <p className="section-label">
              {acf.we_offer_label || "What We Offer"}
            </p>
            <h2 className="section-title">{acf.we_offer_title}</h2>
            {acf.we_offer_description && (
              <p
                className="section-desc"
                dangerouslySetInnerHTML={{
                  __html: acf.we_offer_description,
                }}
              />
            )}
            <div className="features-grid stagger">
              {features.map((f, i) => (
                <div className="feature-card" key={i}>
                  <div className="fc-icon">
                    <CheckCircle />
                  </div>
                  <h4>{f.we_offer_card_title}</h4>
                  <p>{f.we_offer_card_description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {hasWhySection && (
        <section className="content-section">
          <div className="container content-row">
            <div className="text-content ">
              {acf.why_choose_us_label && (
                <p className="section-label">{acf.why_choose_us_label}</p>
              )}
              {acf.why_choose_us_title && (
                <h2 className="section-title">{acf.why_choose_us_title}</h2>
              )}

              {whyDesc &&
                (() => {
                  const paragraphs = whyDesc.match(/<p[\s\S]*?<\/p>/gi) || [];

                  // Desktop & Tablet: Show everything
                  if (!isMobile) {
                    return (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: whyDesc,
                        }}
                      />
                    );
                  }

                  // Mobile: Read More / Read Less
                  return (
                    <>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: paragraphs[0] || "",
                        }}
                      />

                      {showWhyMore && paragraphs.length > 1 && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: paragraphs.slice(1).join(""),
                          }}
                        />
                      )}

                      {paragraphs.length > 1 && (
                        <button
                          type="button"
                          className="read-more-btn"
                          onClick={() => setShowWhyMore(!showWhyMore)}
                        >
                          {showWhyMore ? "Read Less" : "Read More"}
                        </button>
                      )}
                    </>
                  );
                })()}

              {whyPointers && (
                <div
                  className="why-pointers"
                  dangerouslySetInnerHTML={{
                    __html: whyPointers,
                  }}
                />
              )}
            </div>
            {contentImg && (
              <img src={contentImg} alt="" className="content-image" />
            )}
          </div>
        </section>
      )}

      {hasElevate && (
        <section className="elevate-section">
          <div className="container">
            <div className="elevate-inner">
              <div className="elevate-content">
                {acf.why_choose_tmk_label && (
                  <p className="elevate-tag">{acf.why_choose_tmk_label}</p>
                )}
                <h2 className="elevate-title">{acf.why_choose_tmk_title}</h2>
                <div
                  className="elevate-desc"
                  dangerouslySetInnerHTML={{
                    __html: acf.why_choose_tmk_description,
                  }}
                />
                {acf.why_choose_tmk_button ? (
                  <a
                    href={acf.why_choose_tmk_button}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="elevate-btn"
                  >
                    Contact Us
                  </a>
                ) : (
                  <Link to="/contact" className="elevate-btn">
                    Contact Us
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
      <FAQSection
        label={acf.faq_label}
        title={acf.faq_title}
        description={acf.faq_description}
        faqs={faqItems}
      />
    </>
  );
}
