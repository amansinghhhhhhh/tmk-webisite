import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
import TraditionalMarketing from "./pages/TraditionalMarketing";
import JoinCommunity from "./pages/JoinCommunity";
import Countries from "./pages/Countries";
import CountryPage from "./pages/CountryPage";
import Services from "./pages/Services";
import ServicePage from "./pages/ServicePage";
import NotFound from "./pages/NotFound";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
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
        <Route
          path="/traditional-marketing"
          element={<TraditionalMarketing />}
        />
        <Route path="/join-our-community" element={<JoinCommunity />} />
        <Route path="/countries" element={<Countries />} />
        <Route path="/countries/:slug" element={<CountryPage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServicePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
