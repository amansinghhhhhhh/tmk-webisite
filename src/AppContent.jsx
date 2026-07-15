import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import OurClient from "./pages/OurClient";
import JoinCommunity from "./pages/JoinCommunity";
import Countries from "./pages/Countries";
import CountryPage from "./pages/CountryPage";
import Services from "./pages/Services";
import ServicePage from "./pages/ServicePage";
import NotFound from "./pages/NotFound";
import ThankYou from "./pages/ThankYou";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermCondition";
import FloatingButtons from "./components/FloatingButtons";
import BackToTop from "./components/BackToTop";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const breadcrumbSchema = {
  "@context": "https://schema.org/",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://themarketingking.org/" },
    { "@type": "ListItem", position: 2, name: "Social Media Marketing for IGaming", item: "https://themarketingking.org/social-media-management-for-igaming-businesses/" },
    { "@type": "ListItem", position: 3, name: "Google Ads for iGaming", item: "https://themarketingking.org/google-ads-for-igaming-businesses/" },
    { "@type": "ListItem", position: 4, name: "Meta Ads for iGaming", item: "https://themarketingking.org/meta-ads-for-igaming-businesses/" },
    { "@type": "ListItem", position: 5, name: "Telegram Ads for iGaming", item: "https://themarketingking.org/telegram-ads-for-igaming-businesses/" },
    { "@type": "ListItem", position: 6, name: "SEO services for iGaming", item: "https://themarketingking.org/seo-services-for-igaming-businesses/" },
    { "@type": "ListItem", position: 7, name: "Meta & Google Agency Accounts for iGaming", item: "https://themarketingking.org/meta-google-agency-accounts-for-igaming-businesses/" },
    { "@type": "ListItem", position: 8, name: "WhatsApp API & Bulk Messaging for iGaming", item: "https://themarketingking.org/whatsapp-api-bulk-whatsapp-services-for-igaming-businesses/" },
    { "@type": "ListItem", position: 9, name: "Telegram Channel Promotion Services IGaming", item: "https://themarketingking.org/telegram-channel-promotion-live-line-api-for-igaming-businesses/" },
    { "@type": "ListItem", position: 10, name: "Influencer & Celebrity Marketing for iGaming", item: "https://themarketingking.org/influencer-celebrity-marketing-for-igaming-businesses/" },
    { "@type": "ListItem", position: 11, name: "Website & App Development for iGaming", item: "https://themarketingking.org/website-and-app-development-for-igaming-businesses/" },
    { "@type": "ListItem", position: 12, name: "Digital Marketing for Trading Platforms", item: "https://themarketingking.org/digital-marketing-for-trading-business/" },
    { "@type": "ListItem", position: 13, name: "Turnkey Solutions for iGaming", item: "https://themarketingking.org/turnkey-solutions-for-igaming-businesses/" },
    { "@type": "ListItem", position: 14, name: "iGaming Software Solutions", item: "https://themarketingking.org/igaming-software-solution-providers/" },
  ],
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "TheMarketingKing",
  alternateName: "TMK",
  url: "https://themarketingking.org/",
  logo: "https://themarketingking.org/tmk-logo-with-Brand-name.png",
  sameAs: [
    "https://facebook.com/themarketingkingg",
    "https://www.instagram.com/tmknews_?igsh=MTlzNGJ3MDEzMmg4Yw==",
    "https://linkedin.com/company/the-marketing-king",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org/",
  "@type": "WebSite",
  name: "TheMarketingKing",
  url: "https://themarketingking.org/",
  potentialAction: {
    "@type": "SearchAction",
    target: "{search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function AppContent() {
  useEffect(() => {
    const ids = ["breadcrumb-schema", "organization-schema", "website-schema"];
    const schemas = [breadcrumbSchema, organizationSchema, websiteSchema];
    schemas.forEach((schema, i) => {
      if (document.getElementById(ids[i])) return;
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = ids[i];
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });
    return () => {
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.remove();
      });
    };
  }, []);

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:slug" element={<NewsDetail />} />
        <Route path="/our-clients" element={<OurClient />} />

        <Route path="/term-condition" element={<TermsAndConditions />} />
        <Route path="/join-our-community" element={<JoinCommunity />} />
        <Route path="/countries" element={<Countries />} />
        <Route path="/countries/:slug" element={<CountryPage />} />
        <Route path="/services" element={<Services />} />

        <Route
          path="/social-media-management-for-igaming-businesses"
          element={<ServicePage slug="social-media-management-for-igaming-businesses" />}
        />
        <Route
          path="/google-ads-for-igaming-businesses"
          element={<ServicePage slug="google-ads-for-igaming-businesses" />}
        />
        <Route
          path="/meta-ads-for-igaming-businesses"
          element={<ServicePage slug="meta-ads-for-igaming-businesses" />}
        />
        <Route
          path="/telegram-ads-for-igaming-businesses"
          element={<ServicePage slug="telegram-ads-for-igaming-businesses" />}
        />
        <Route
          path="/seo-services-for-igaming-businesses"
          element={<ServicePage slug="seo-services-for-igaming-businesses" />}
        />
        <Route
          path="/meta-google-agency-accounts-for-igaming-businesses"
          element={<ServicePage slug="meta-google-agency-accounts-for-igaming-businesses" />}
        />
        <Route
          path="/whatsapp-api-bulk-whatsapp-services-for-igaming-businesses"
          element={<ServicePage slug="whatsapp-api-bulk-whatsapp-services-for-igaming-businesses" />}
        />
        <Route
          path="/telegram-channel-promotion-live-line-api-for-igaming-businesses"
          element={<ServicePage slug="telegram-channel-promotion-live-line-api-for-igaming-businesses" />}
        />
        <Route
          path="/influencer-celebrity-marketing-for-igaming-businesses"
          element={<ServicePage slug="influencer-celebrity-marketing-for-igaming-businesses" />}
        />
        <Route
          path="/website-and-app-development-for-igaming-businesses"
          element={<ServicePage slug="website-and-app-development-for-igaming-businesses" />}
        />
        <Route
          path="/digital-marketing-for-trading-business"
          element={<ServicePage slug="digital-marketing-for-trading-business" />}
        />
        <Route
          path="/turnkey-solutions-for-igaming-businesses"
          element={<ServicePage slug="turnkey-solutions-for-igaming-businesses" />}
        />
        <Route
          path="/igaming-software-solution-providers"
          element={<ServicePage slug="igaming-software-solution-providers" />}
        />
        <Route
          path="/traditional-marketing-for-igaming-businesses"
          element={<ServicePage slug="traditional-marketing-for-igaming-businesses" />}
        />

        <Route path="*" element={<NotFound />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
      <FloatingButtons />
      <BackToTop />
      <Footer />
    </>
  );
}
