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

export default function AppContent() {
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
