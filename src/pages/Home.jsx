/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Search,
  Map,
  Rocket,
  ChartLine,
  Globe,
} from "lucide-react";
import { fetchPosts, mapPost } from "../api/wordpress";
import LeadForm from "../components/LeadForm";
import SEO from "../components/SEO";
import FAQSection from "../components/FAQSection";
import Typewriter from "../components/Typewriter";

const heroTypewriterWords = [
  "Acquire High Value Players",
  "Boost ROAS & Retention",
  "Scale Profitable Campaigns",
  "Increase Player LTV",
];

const expertise = [
  {
    num: "01",
    img: "/New folder (2)/business-expert-3d-icon-png-download-4745552.webp",
    title: "The Ultimate Playbook for iGaming Dominance",
    desc: "We build growth engines for global gaming brands through organic search and paid traffic acquisition.",
  },
  {
    num: "02",
    img: "/New folder (2)/compliance-3d-icon-png-download-8202794.webp",
    title: "Specialized iGaming Expertise",
    desc: "We specialize in online casino, sportsbook, and gaming brands, delivering focused, non generic marketing strategies.",
  },
  {
    num: "03",
    img: "/New folder (2)/infographic-3d-icon-png-download-13033145.webp",
    title: "Compliance Driven Marketing",
    desc: "We unify your acquisition pipeline, eliminating disconnected silos to maximize marketing efficiency and compounding returns.",
  },
  {
    num: "04",
    img: "/New folder (2)/data-driven-3d-icon-png-download-9531917.webp",
    title: "Data Driven Decisions",
    desc: "We eliminate guesswork in player acquisition using behavioral analytics and real time performance tracking for every campaign.",
  },
  {
    num: "05",
    img: "/New folder (2)/global-location-3d-icon-png-download-14044491.webp",
    title: "GEO Specific Strategies",
    desc: "Global scale needs local intelligence, so we build tailored acquisition funnels for each market’s players and regulations.",
  },
  {
    num: "06",
    img: "/New folder (2)/long-term-investment-3d-icon-png-download-6185083.webp",
    title: "Long Term Growth Focus",
    desc: "We build high yield acquisition engines, not traffic spikes, delivering sustainable, compounding market share growth.",
  },
];

const faqData = [
  {
    q: "What makes The Marketing King different from other iGaming marketing agencies?",
    a: "The Marketing King offers a variety of marketing services specifically focused on the needs of the gaming industry. We know the problems of online casinos, sportsbooks, poker rooms and other gaming businesses. Our services include SEO, PPC, social media marketing, affiliate marketing, and content marketing. We develop unique marketing campaigns depending on the goals and target markets of every client.",
  },
  {
    q: "What types of iGaming businesses do you work with?",
    a: "We can help you if you own any type of gaming company: an online casino, a sportsbook, a fantasy sports betting website, a poker site, a crypto casino, or a skill gaming website. Our marketing strategy will be developed with regard to the features, audiences and business goals of every client.",
  },
  {
    q: "How do your SEO services help online casinos and sportsbooks?",
    a: "We use our SEO services to boost the online presence of gaming companies. Our campaigns include such activities as keyword research, technical SEO, website content development, on-page SEO and link building. These steps help gaming websites boost their visibility through search phrases and gain organic traffic.",
  },
  {
    q: "What is included in your technical SEO services?",
    a: "Technical SEO includes site structure, crawling, indexing, page load speed, mobile friendliness and other technical factors. Our technical SEO service involves identifying problems in your website and providing solutions that will benefit your search engine accessibility and user experience.",
  },
  {
    q: "How do you help gaming businesses with player acquisition?",
    a: "We assist you in finding potential customers through SEO, advertising, social media, content marketing and affiliate marketing. We also provide performance reviews and conversion analysis to find out where there are chances of improving the process of customer acquisition.",
  },
  {
    q: "How does affiliate marketing help iGaming businesses?",
    a: "Through affiliate marketing, gaming businesses get the chance to collaborate with publishing houses and marketing agencies that can market their gaming sites to relevant audiences. An efficient affiliate program increases awareness and referral traffic, which can be used by businesses to grow and prosper.",
  },
  {
    q: "Can you help gaming brands reach international markets?",
    a: "Yes. We develop marketing strategies based on the target market, behavior of the target audience, competition in the market and regulations regarding advertisement. We perform market research, plan the content and choose channels which will help companies to build international presence.",
  },
  {
    q: "How do you measure the performance of marketing campaigns?",
    a: "We analyze performance indicators such as traffic, impressions, clicks, registration, first deposit, conversion and cost of acquiring clients. The performance indicators depend on the goal of the campaign.",
  },
  {
    q: "Do you provide complete digital marketing solutions?",
    a: "Yes. Our solutions include search engine optimization, paid advertising, social media marketing, Telegram marketing, influencer marketing, affiliate marketing and web development services. Companies can opt for either separate services or various solutions.",
  },
  {
    q: "Do you create player guides and localized educational content?",
    a: "Absolutely. Modern player acquisition relies heavily on trust and educational value. We construct comprehensive, high converting content funnels, including the creation of detailed online casino guide features, a strategic casino strategy guide, and an optimized casino bonus guide. This positioning builds long term authority, educates active players, and nurtures traffic from informational search intent straight into high value platform sign ups.",
  },
];

const newsLogos = [
  "/news/99news.webp",
  "/news/businessTime.webp",
  "/news/ceo-times.webp",
  "/news/dailydistrictnewes.webp",
  "/news/dailyfinancewire.webp",
  "/news/disruptivespotlight.webp",
  "/news/Entrepreneurstreet.webp",
  "/news/hindustanbusinesstimes.webp",
  "/news/ICT.webp",
  "/news/indiabuzznow.webp",
  "/news/indianprimebulletin.webp",
  "/news/newseshn.webp",
  "/news/newspaper.webp",
  "/news/newswireindia.webp",
  "/news/primenewesindia.webp",
  "/news/theindiforbs-1.webp",
  "/news/theindiforbs.webp",
  "/news/trensinsider.webp",
];

const certImages = [
  "/certification/WhatsApp Image 2026-06-17 at 6.48.24 PM.webp",
  "/certification/WhatsApp Image 2026-06-17 at 6.48.24 PM (1).webp",
  "/certification/WhatsApp Image 2026-06-17 at 6.48.24 PM (2).webp",
  "/certification/WhatsApp Image 2026-06-17 at 6.48.24 PM (3).webp",
  "/certification/WhatsApp Image 2026-06-17 at 6.48.24 PM (4).webp",
  "/certification/WhatsApp Image 2026-06-17 at 6.48.24 PM (5).webp",
];

export default function Home() {
  const navigate = useNavigate();

  const [service, setService] = useState("");

  const [blogPosts, setBlogPosts] = useState([]);
  const [blogLoading, setBlogLoading] = useState(true);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const onLoad = () => setVideoReady(true);
    window.addEventListener("load", onLoad, { once: true });
    return () => window.removeEventListener("load", onLoad);
  }, []);

  useEffect(() => {
  fetchPosts(4)
    .then(({ posts }) => {
      setBlogPosts(posts.map(mapPost));
      setBlogLoading(false);
    })
    .catch((err) => {
      console.error("Error fetching home page blogs:", err);
      setBlogLoading(false);
    });
}, []);

  useEffect(() => {
    // Swiper is fetched on demand: the chunk downloads in parallel but never
    // blocks the first render of the hero (which is what LCP measures).
    let cancelled = false;

    const initSwipers = async () => {
      let Swiper;
      let Autoplay;
      let Navigation;
      let Pagination;
      try {
        const mod = await import("swiper/modules");
        Autoplay = mod.Autoplay;
        Navigation = mod.Navigation;
        Pagination = mod.Pagination;
        ({ default: Swiper } = await import("swiper"));
      } catch (e) {
        return;
      }
      if (cancelled) return;
      const instances = [];
      const make = (sel, opts) => {
        const s = new Swiper(sel, opts);
        instances.push(s);
        return s;
      };
      try {
      make(".industries-scroll", {
        modules: [Autoplay, Navigation, Pagination],
        slidesPerView: 1.2,
        spaceBetween: 16,
        loop: true,
        pagination: { el: ".industry-pagination", clickable: true },
        navigation: {
          nextEl: ".industries-scroll .swiper-button-next",
          prevEl: ".industries-scroll .swiper-button-prev",
        },
        breakpoints: {
          480: { slidesPerView: 2, spaceBetween: 18 },
          640: { slidesPerView: 3, spaceBetween: 20 },
          968: { slidesPerView: 4, spaceBetween: 24 },
        },
      });
    } catch (e) {
      /* empty */
    }
    try {
      make(".services-swiper", {
        slidesPerView: 1.2,
        spaceBetween: 16,
        loop: false,
        pagination: { el: ".services-pagination", clickable: true },
        breakpoints: {
          480: { slidesPerView: 2, spaceBetween: 18 },
          768: { slidesPerView: 3, spaceBetween: 20 },
          1024: { slidesPerView: 4, spaceBetween: 24 },
        },
      });
      // eslint-disable-next-line no-unused-vars
    } catch (e) {
      /* empty */
    }
    try {
      make(".live-ads-swiper", {
        slidesPerView: 2,
        spaceBetween: 20,
        loop: true,
        autoplay: { delay: 3000, disableOnInteraction: false },
        pagination: {
          el: ".live-ads-swiper .swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".live-ads-swiper .swiper-button-next",
          prevEl: ".live-ads-swiper .swiper-button-prev",
        },
        on: {
          slideChange: function () {
            if (this.autoplay && !this.autoplay.running) this.autoplay.start();
          },
        },
        breakpoints: { 0: { slidesPerView: 1 }, 768: { slidesPerView: 2 } },
      });
    } catch (e) {
      /* empty */
    }
    try {
      make(".mediaSwiper", {
        slidesPerView: 6,
        spaceBetween: 16,
        loop: true,
        autoplay: { delay: 3000, disableOnInteraction: false },
        pagination: { el: ".media-pagination", clickable: true },
        navigation: {
          nextEl: ".mediaSwiper .swiper-button-next",
          prevEl: ".mediaSwiper .swiper-button-prev",
        },
        on: {
          slideChange: function () {
            if (this.autoplay && !this.autoplay.running) this.autoplay.start();
          },
        },
        breakpoints: {
          0: { slidesPerView: 2 },
          480: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        },
      });
    } catch (e) {
      /* empty */
    }

      if (!document.querySelector(".expertise-scroll.swiper-initialized")) {
        try {
          const es = document.querySelector(".expertise-scroll");
          if (es) {
            es.classList.add("swiper-initialized");
            make(".expertise-scroll", {
              slidesPerView: 2.5,
              spaceBetween: 20,
              loop: true,
              autoplay: { delay: 3000, disableOnInteraction: false },
              grabCursor: true,
              pagination: {
                el: ".expertise-scroll .swiper-pagination",
                clickable: true,
              },
              navigation: {
                nextEl: ".expertise-scroll .swiper-button-next",
                prevEl: ".expertise-scroll .swiper-button-prev",
              },
              on: {
                slideChange: function () {
                  if (this.autoplay && !this.autoplay.running)
                    this.autoplay.start();
                },
              },
              breakpoints: {
                0: { slidesPerView: 1.2, spaceBetween: 12 },
                480: { slidesPerView: 2, spaceBetween: 16 },
                768: { slidesPerView: 2.5, spaceBetween: 18 },
                968: { slidesPerView: 3.5, spaceBetween: 20 },
                1200: { slidesPerView: 4.5, spaceBetween: 20 },
              },
            });
          }
        } catch (e) {
          /* empty */
        }
      }
    };

    // Run the swiper setup when the browser is idle so the chunk download
    // and the carousel initialisation never compete with the first render
    // (keeps TBT low). The timeout guarantees it still happens quickly.
    if (typeof window !== "undefined" && typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(initSwipers, { timeout: 2000 });
    } else {
      setTimeout(initSwipers, 200);
    }

    if (typeof window !== "undefined") {
      const pageObserver = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              e.target.classList.add("visible");
              pageObserver.unobserve(e.target);
            }
          }
        },
        { threshold: 0.08, rootMargin: "0px 0px -30px 0px" },
      );
      const heroLeft = document.getElementById("heroLeft");
      if (heroLeft) pageObserver.observe(heroLeft);
      document
        .querySelectorAll("[data-reveal]")
        .forEach((el) => pageObserver.observe(el));
      const staggerEls = document.querySelectorAll(".stagger");
      const staggerObserver = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              const children = e.target.children;
              for (let i = 0; i < children.length; i++) {
                const child = children[i];
                child.style.transitionDelay = i * 0.08 + "s";
                child.classList.add("visible");
              }
              staggerObserver.unobserve(e.target);
            }
          }
        },
        { threshold: 0.1 },
      );
      for (const el of staggerEls) staggerObserver.observe(el);

      const fanCards = document.querySelectorAll(".services-fan li");
      if (fanCards.length && window.innerWidth >= 968) {
        const fanObserver = new IntersectionObserver(
          (entries) => {
            for (const e of entries) {
              if (e.isIntersecting) {
                fanCards.forEach((c, i) =>
                  setTimeout(() => c.classList.add("visible"), i * 120),
                );
                fanObserver.unobserve(e.target).catch(() => {});
              }
            }
          },
          { threshold: 0.2 },
        );
        fanObserver.observe(fanCards[0]);
      }
    }

    return () => {
      cancelled = true;
    };
  }, []);



  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <>
      <SEO
        title="iGaming Marketing Agency for Global Brand Growth | TMK"
        description="Grow your iGaming business with TMK, a leading iGaming marketing agency offering SEO, advertising campaigns and player acquisition strategies worldwide."
        canonical="https://themarketingking.org/"
        schema={faqSchema}
      />
      <div>
        <section id="hero">
          <img
            className="hero-bg-video"
            src="/hero-poster.webp"
            alt=""
            width="1280"
            height="634"
            fetchPriority="high"
            loading="eager"
            decoding="async" />
          {videoReady && (
            <video
              className="hero-bg-video"
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              width="1280"
              height="634"
              poster="/hero-poster.webp"
            >
              <source src="/hero.mp4" type="video/mp4" />
            </video>
          )}
          <div className="hero-overlay"></div>
          <div className="hero-glow-orb g1"></div>
          <div className="hero-glow-orb g2"></div>
          <div className="container">
            <div className="hero-grid">
              <div className="hero-left" id="heroLeft">
                <div className="hero-tag">iGaming Growth Marketing Agency</div>
                <h1 className="hero-title">
                  <span className="line1">Scale Your Brand Globally</span>{" "}
                  <span className="line2">
                    with a Leading iGaming Marketing Agency
                  </span>
                </h1>
                <Typewriter words={heroTypewriterWords} />
                <p className="hero-desc">
                  Trusted global iGaming traffic provider helping every casino,
                  sportsbook, or crypto gaming brand acquire high value players
                  through SEO, PPC, media buying, and affiliate marketing.
                </p>
                <div className="hero-actions">
                  <a href="#cta" className="btn btn-primary">
                    Book a Strategy Call <ArrowRight size={16} />
                  </a>
                  <a href="#live-ads" className="btn btn-outline">
                    View Case Studies
                  </a>
                </div>
              </div>
            </div>
            <div className="trust-strip">
              <span
                className="trust-label"
                style={{
                  fontSize: "1.3rem",
                  letterSpacing: "4px",
                  textTransform: "lowercase",
                  color: "var(--primary)",
                  fontWeight: 700,
                  display: "block",
                  textAlign: "center",
                  marginBottom: "24px",
                }}
              >
                Trusted by iGaming brands across
              </span>
              <div
                className="trust-flags"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "14px",
                  justifyContent: "center",
                }}
              >
                {/* United States */}
                <Link
                  to="/countries/us/"
                  className="trust-flag"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "12px 24px",
                    borderRadius: "50px",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    color: "var(--text)",
                    background: "rgba(255,255,255,.03)",
                    border: "1px solid rgba(255,255,255,.06)",
                    transition: ".3s",
                    whiteSpace: "nowrap",
                  }}
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/lipis/flag-icons@main/flags/4x3/us.svg"
                    alt="United States"
                    style={{
                      width: 28,
                      height: 21,
                      borderRadius: 4,
                      objectFit: "cover",
                    }}
                    loading="eager"
                    decoding="async" />
                  United States
                </Link>

                {/* United Kingdom */}
                <Link
                  to="/countries/uk/"
                  className="trust-flag"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "12px 24px",
                    borderRadius: "50px",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    color: "var(--text)",
                    background: "rgba(255,255,255,.03)",
                    border: "1px solid rgba(255,255,255,.06)",
                    transition: ".3s",
                    whiteSpace: "nowrap",
                  }}
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/lipis/flag-icons@main/flags/4x3/gb.svg"
                    alt="United Kingdom"
                    style={{
                      width: 28,
                      height: 21,
                      borderRadius: 4,
                      objectFit: "cover",
                    }}
                    loading="eager"
                    decoding="async" />
                  United Kingdom
                </Link>

                {/* Latam */}
                <Link
                  to="/countries/latam/"
                  className="trust-flag"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "12px 24px",
                    borderRadius: "50px",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    color: "var(--text)",
                    background: "rgba(255,255,255,.03)",
                    border: "1px solid rgba(255,255,255,.06)",
                    transition: ".3s",
                    whiteSpace: "nowrap",
                  }}
                >
                  <img
                    src="/flag/latam.webp"
                    alt="LATAM"
                    style={{
                      width: 28,
                      height: 21,
                      borderRadius: 4,
                      objectFit: "cover",
                    }}
                    loading="lazy"
                    decoding="async"
                    width="300"
                    height="150" />
                  Latam
                </Link>

                {/* India */}
                <Link
                  to="/countries/india/"
                  className="trust-flag"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "12px 24px",
                    borderRadius: "50px",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    color: "var(--text)",
                    background: "rgba(255,255,255,.03)",
                    border: "1px solid rgba(255,255,255,.06)",
                    transition: ".3s",
                    whiteSpace: "nowrap",
                  }}
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/lipis/flag-icons@main/flags/4x3/in.svg"
                    alt="India"
                    style={{
                      width: 28,
                      height: 21,
                      borderRadius: 4,
                      objectFit: "cover",
                    }}
                    loading="eager"
                    decoding="async" />
                  India
                </Link>

                {/* Malta */}
                <Link
                  to="/countries/malta/"
                  className="trust-flag"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "12px 24px",
                    borderRadius: "50px",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    color: "var(--text)",
                    background: "rgba(255,255,255,.03)",
                    border: "1px solid rgba(255,255,255,.06)",
                    transition: ".3s",
                    whiteSpace: "nowrap",
                  }}
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/lipis/flag-icons@main/flags/4x3/mt.svg"
                    alt="Malta"
                    style={{
                      width: 28,
                      height: 21,
                      borderRadius: 4,
                      objectFit: "cover",
                    }}
                    loading="eager"
                    decoding="async" />
                  Malta
                </Link>

                {/* Philippines */}
                <Link
                  to="/countries/philippines/"
                  className="trust-flag"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "12px 24px",
                    borderRadius: "50px",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    color: "var(--text)",
                    background: "rgba(255,255,255,.03)",
                    border: "1px solid rgba(255,255,255,.06)",
                    transition: ".3s",
                    whiteSpace: "nowrap",
                  }}
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/lipis/flag-icons@main/flags/4x3/ph.svg"
                    alt="Philippines"
                    style={{
                      width: 28,
                      height: 21,
                      borderRadius: 4,
                      objectFit: "cover",
                    }}
                    loading="eager"
                    decoding="async" />
                  Philippines
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="industries" className="bg-glow">
          <div className="container">
            <p className="section-label">Industries We Scale</p>
            <h2 className="section-title">
              Growth Solutions for Every{" "}
              <span className="gold">Gaming Vertical</span>
            </h2>
            <p className="section-desc">
              We collaborate with gaming operators who are ambitious and want to
              take over markets that are competitive to attract players who are
              qualified and profitably grow through the use of performance
              driven marketing strategies.
            </p>
            <div className="industries-scroll swiper">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <div className="industry-card">
                    <span className="ind-icon">
                      <img
                        src="/ICON 3D/casino-3d-icon-png-download-13883873.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                        width="300"
                        height="300" />
                    </span>
                    <h3>Online Casinos</h3>
                    <p>
                      Driving deposits and registrations through online casino
                      SEO, PPC, affiliate marketing, and optimization.
                    </p>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="industry-card">
                    <span className="ind-icon">
                      <img
                        src="/ICON 3D/sports-3d-icon-png-download-10887497.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                        width="300"
                        height="300" />
                    </span>
                    <h3>Sportsbooks</h3>
                    <p>
                      Sportsbook SEO agency delivering event driven campaigns
                      for major leagues, tournaments, and live betting audiences
                    </p>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="industry-card">
                    <span className="ind-icon">
                      <img
                        src="/ICON 3D/trophy-3d-icon-png-download-8115379.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                        width="300"
                        height="300" />
                    </span>
                    <h3>Fantasy Sports</h3>
                    <p>
                      Fantasy Sports growth through targeted ads and performance
                      driven acquisition strategies.
                    </p>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="industry-card">
                    <span className="ind-icon">
                      <img
                        src="/ICON 3D/bitcoin-3d-icon-png-download-8579726.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                        width="300"
                        height="300" />
                    </span>
                    <h3>Crypto Casinos</h3>
                    <p>
                      Build trusted communities for Crypto Casinos using Web3
                      marketing and influencer programs.
                    </p>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="industry-card">
                    <span className="ind-icon">
                      <img
                        src="/ICON 3D/casino-game-3d-icon-png-download-11333776.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                        width="300"
                        height="300" />
                    </span>
                    <h3>Sweepstakes Casinos</h3>
                    <p>
                      Generate continuous player acquisition loops for
                      Sweepstakes & Social with scalable growth systems .
                    </p>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="industry-card">
                    <span className="ind-icon">
                      <img
                        src="/ICON 3D/poker-playing-cards-3d-icon-png-download-11901378.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                        width="300"
                        height="300" />
                    </span>
                    <h3>Poker Platforms</h3>
                    <p>
                      Boost Poker Platforms participation in tournaments via
                      targeted digital marketing strategies.
                    </p>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="industry-card">
                    <span className="ind-icon">
                      <img
                        src="/ICON 3D/gaming-online-course-3d-icon-png-download-9859833.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                        width="300"
                        height="300" />
                    </span>
                    <h3>Skill Gaming</h3>
                    <p>
                      Drive real money gamer acquisition with hyper targeted
                      campaigns optimizing CPA and sign ups.
                    </p>
                  </div>
                </div>
              </div>
              <div className="industry-pagination swiper-pagination"></div>
              <div className="swiper-button-prev"></div>
              <div className="swiper-button-next"></div>
            </div>
          </div>

          <section id="stats" className="bg-glow">
            <div className="container">
              <p className="section-label">Results That Matter</p>
              <h2 className="section-title">
                Our iGaming Marketing <span className="gold">Impact</span>
              </h2>
              <div className="stats-grid stagger">
                <div className="stat-card">
                  <div className="stat-number">300+</div>
                  <div className="stat-label">
                    First Time Depositors Generated
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">170,000+</div>
                  <div className="stat-label">Players Reached</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">20+</div>
                  <div className="stat-label">Countries Targeted</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">5,000+</div>
                  <div className="stat-label">Marketing Campaigns Managed</div>
                </div>
              </div>
              <div className="stats-whatsapp-wrap">
                <a
                  href="https://wa.me/447418622761?text=Hello,%20I%20want%20full%20information"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="stats-whatsapp-btn"
                >
                  <img src="/sticky icons/whatsApp-icon.webp" alt="WhatsApp" width="100" height="100" loading="lazy"
                    decoding="async" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </section>

          <section>
            <div className="container">
              <p className="section-label">Dominate iGaming Today</p>
              <h2 className="section-title">
                Rule iGaming with{" "}
                <span className="gold">The Marketing King</span>
              </h2>
              <p className="section-desc">
                The Marketing King (TMK) is an iGaming marketing agency that concentrates on tangible results. We assist online casinos, sportsbooks, poker portals, and gaming companies operate successfully in competitive global environments.
Our services include SEO, PPC, social media marketing, Telegram promotion, and affiliation marketing. That way, we assist companies in gaining a powerful online presence. Our team develops marketing strategies aimed at linking gaming brands to the relevant audiences, improving website visibility, and attracting players.
Our company offers services according to the needs and requirements of our customers. It means that our services involve SEO optimization, PPC campaigns, and influencer partnerships. Our approach relies on campaign tracking, performance analysis, and optimization. Thus, we assist our clients in making reasonable decisions about marketing.              </p>
            </div>
          </section>

          <section id="services" className="bg-glow">
            <div className="container">
              <p className="section-label">Our Services</p>

              <h2 className="section-title">
                Complete <span className="gold">iGaming Marketing</span>{" "}
                Solutions
              </h2>

              <p className="section-desc">
                As an <strong>iGaming marketing agency</strong>, we deliver
                complete growth solutions for casinos, sportsbooks, poker rooms,
                fantasy sports, and crypto gaming platforms. Our iGaming
                marketing agency approach boosts visibility, attracts quality
                players, improves retention, and maximizes ROI across
                competitive global markets.
              </p>

              <div className="services-swiper swiper">
                <div className="swiper-wrapper">
                  <div className="swiper-slide services-slide">
                    <Link to="/social-media-management-for-igaming-businesses/" className="services-slide-inner">
                      <div className="s-icon">
                        <img
                          src="service image/social-media-marketing-3d-icon-png-download-5013080.webp"
                          alt="Social Media"
                          loading="lazy"
                          decoding="async" />
                      </div>
                      <h3>Social Media Marketing for iGaming</h3>
                      <p>
                        Grow your gaming brand with engaging social media
                        strategies that build awareness, reach audiences and
                        strengthen online communities.
                      </p>
                    </Link>
                  </div>

                  <div className="swiper-slide services-slide">
                    <Link to="/google-ads-for-igaming-businesses/" className="services-slide-inner">
                      <div className="s-icon">
                        <img
                          src="service image/3d-google-ads icon.webp"
                          alt="Google Ads"
                          loading="lazy"
                          decoding="async" />
                      </div>
                      <h3>Google Ads for iGaming</h3>
                      <p>
                        Reach relevant audiences with strategic Google Ads
                        campaigns designed to improve visibility and attract
                        targeted traffic.
                      </p>
                    </Link>
                  </div>

                  <div className="swiper-slide services-slide">
                    <Link to="/meta-ads-for-igaming-businesses/" className="services-slide-inner">
                      <div className="s-icon">
                        <img
                          src="service image/free-meta-3d-icon-png-download-8250233.webp"
                          alt="Meta Ads"
                          loading="lazy"
                          decoding="async" />
                      </div>
                      <h3>Meta Ads for iGaming</h3>
                      <p>
                        Promote your gaming brand through targeted Facebook and
                        Instagram campaigns that improve reach and engagement.
                      </p>
                    </Link>
                  </div>

                  <div className="swiper-slide services-slide">
                    <Link to="/telegram-ads-for-igaming-businesses/" className="services-slide-inner">
                      <div className="s-icon">
                        <img
                          src="service image/free-telegram-3d-icon-png-download-7516821.webp"
                          alt="Telegram Ads"
                          loading="lazy"
                          decoding="async" />
                      </div>
                      <h3>Telegram Ads for iGaming</h3>
                      <p>
                        Connect with gaming communities through Telegram
                        promotions that increase brand visibility and audience
                        engagement.
                      </p>
                    </Link>
                  </div>

                  <div className="swiper-slide services-slide">
                    <Link to="/seo-services-for-igaming-businesses/" className="services-slide-inner">
                      <div className="s-icon">
                        <img
                          src="service image/seo-3d-icon-png-download-5528528.webp"
                          alt="SEO"
                          loading="lazy"
                          decoding="async" />
                      </div>
                      <h3>iGaming SEO Services</h3>
                      <p>
                        Improve search visibility with SEO strategies that drive
                        organic traffic and help your gaming business grow.
                      </p>
                    </Link>
                  </div>

                  <div className="swiper-slide services-slide">
                    <Link to="/meta-google-agency-accounts-for-igaming-businesses/" className="services-slide-inner">
                      <div className="s-icon">
                        <img
                          src="service image/recruitment-agency-3d-icon-png-download-12031451.webp"
                          alt="Agency Accounts"
                          loading="lazy"
                          decoding="async" />
                      </div>
                      <h3>Managed iGaming Ad Accounts</h3>
                      <p>
                        Get dedicated advertising account support, campaign
                        guidance and account management for eligible gaming
                        businesses.
                      </p>
                    </Link>
                  </div>

                  <div className="swiper-slide services-slide">
                    <Link to="/whatsapp-api-bulk-whatsapp-services-for-igaming-businesses/" className="services-slide-inner">
                      <div className="s-icon">
                        <img
                          src="service-img/WhatsApp-API.webp"
                          alt="Whatsapp API"
                          loading="lazy"
                          decoding="async" />
                      </div>
                      <h3>WhatsApp API</h3>
                      <p>
                        Simplify customer communication with WhatsApp
                        automation, approved messaging and efficient support
                        solutions.
                      </p>
                    </Link>
                  </div>

                  <div className="swiper-slide services-slide">
                    <Link to="/telegram-channel-promotion-live-line-api-for-igaming-businesses/" className="services-slide-inner">
                      <div className="s-icon">
                        <img
                          src="service-img/Telegram-Channel-Promotion.webp"
                          alt="Telegram promotion"
                          loading="lazy"
                          decoding="async" />
                      </div>
                      <h3>iGaming Telegram Marketing</h3>
                      <p>
                        Connect with gaming audiences through targeted Telegram
                        marketing campaigns.
                      </p>
                    </Link>
                  </div>

                  <div className="swiper-slide services-slide">
                    <Link to="/influencer-celebrity-marketing-for-igaming-businesses/" className="services-slide-inner">
                      <div className="s-icon">
                        <img
                          src="service-img/Influencer-Marketing.webp"
                          alt="Influencer Marketing"
                          loading="lazy"
                          decoding="async" />
                      </div>
                      <h3>Influencer Marketing</h3>
                      <p>
                        Build brand awareness through relevant influencer
                        partnerships and creative promotional campaigns.
                      </p>
                    </Link>
                  </div>

                  <div className="swiper-slide services-slide">
                    <Link to="/website-and-app-development-for-igaming-businesses/" className="services-slide-inner">
                      <div className="s-icon">
                        <img
                          src="service-img/Web-Development.webp"
                          alt="Web Development"
                          loading="lazy"
                          decoding="async" />
                      </div>
                      <h3>Web Development</h3>
                      <p>
                        Build responsive, user-friendly websites designed to
                        improve visitor experience and support business growth.
                      </p>
                    </Link>
                  </div>

                  <div className="swiper-slide services-slide">
                    <Link to="/digital-marketing-for-trading-business/" className="services-slide-inner">
                      <div className="s-icon">
                        <img
                          src="service-img/Trading-Marketing.webp"
                          alt="Trending Marketing"
                          loading="lazy"
                          decoding="async" />
                      </div>
                      <h3>Trending Marketing</h3>
                      <p>
                        Stay relevant with creative digital campaigns inspired
                        by current trends and audience interests.
                      </p>
                    </Link>
                  </div>

                  <div className="swiper-slide services-slide">
                    <Link to="/turnkey-solutions-for-igaming-businesses/" className="services-slide-inner">
                      <div className="s-icon">
                        <img
                          src="service-img/Turnkey-Solutions.webp"
                          alt="Turnkey Solutions"
                          loading="lazy"
                          decoding="async" />
                      </div>
                      <h3>iGaming Turnkey Solutions</h3>
                      <p>
                        Explore integrated gaming platform solutions with
                        technology, setup and business support.
                      </p>
                    </Link>
                  </div>

                  <div className="swiper-slide services-slide">
                    <Link to="/igaming-software-solution-providers/" className="services-slide-inner">
                      <div className="s-icon">
                        <img
                          src="service-img/iGaming-Software.webp"
                          alt="iGaming Software"
                          loading="lazy"
                          decoding="async" />
                      </div>
                      <h3>iGaming Software Solutions</h3>
                      <p>
                        Get scalable gaming software solutions designed to
                        support platform functionality and business operations.
                      </p>
                    </Link>
                  </div>
                </div>

                <div className="swiper-pagination services-pagination"></div>
              </div>

              <ul className="services-fan">
                <li>
                  <Link to="/social-media-management-for-igaming-businesses/" className="pos-rel">
                    <div className="txtBox">
                      <div className="s-icon">
                        <img
                          src="service image/social-media-marketing-3d-icon-png-download-5013080.webp"
                          alt="Social Media"
                          loading="lazy"
                          decoding="async" />
                      </div>
                      <h3>Social Media Marketing for iGaming</h3>
                      <p>
                        Grow your gaming brand with engaging social media
                        strategies that build awareness, reach audiences and
                        strengthen online communities.
                      </p>
                    </div>
                    <picture className="cardImg">
                      <img
                        src="poker cards/1.webp"
                        alt="Social Media Management"
                        loading="lazy"
                        decoding="async" />
                    </picture>
                  </Link>
                </li>

                <li>
                  <Link to="/google-ads-for-igaming-businesses/" className="pos-rel">
                    <div className="txtBox">
                      <div className="s-icon">
                        <img
                          src="service image/3d-google-ads icon.webp"
                          alt="Google Ads"
                          loading="lazy"
                          decoding="async" />
                      </div>
                      <h3>Google Ads for iGaming</h3>
                      <p>
                        Reach relevant audiences with strategic Google Ads
                        campaigns designed to improve visibility and attract
                        targeted traffic.
                      </p>
                    </div>
                    <picture className="cardImg">
                      <img src="poker cards/2.webp" alt="Google Ads"
                        loading="lazy"
                        decoding="async" />
                    </picture>
                  </Link>
                </li>

                <li>
                  <Link to="/meta-ads-for-igaming-businesses/" className="pos-rel">
                    <div className="txtBox">
                      <div className="s-icon">
                        <img
                          src="service image/free-meta-3d-icon-png-download-8250233.webp"
                          alt="Meta Ads"
                          loading="lazy"
                          decoding="async" />
                      </div>
                      <h3>Meta Ads for iGaming</h3>
                      <p>
                        Promote your gaming brand through targeted Facebook and
                        Instagram campaigns that improve reach and engagement.
                      </p>
                    </div>
                    <picture className="cardImg">
                      <img src="poker cards/3.webp" alt="Meta Ads"
                        loading="lazy"
                        decoding="async" />
                    </picture>
                  </Link>
                </li>

                <li>
                  <Link to="/telegram-ads-for-igaming-businesses/" className="pos-rel">
                    <div className="txtBox">
                      <div className="s-icon">
                        <img
                          src="service image/free-telegram-3d-icon-png-download-7516821.webp"
                          alt="Telegram Ads"
                          loading="lazy"
                          decoding="async" />
                      </div>
                      <h3>Telegram Ads for iGaming</h3>
                      <p>
                        Connect with gaming communities through Telegram
                        promotions that increase brand visibility and audience
                        engagement.
                      </p>
                    </div>
                    <picture className="cardImg">
                      <img src="poker cards/4.webp" alt="Telegram Ads"
                        loading="lazy"
                        decoding="async" />
                    </picture>
                  </Link>
                </li>

                <li>
                  <Link to="/seo-services-for-igaming-businesses/" className="pos-rel">
                    <div className="txtBox">
                      <div className="s-icon">
                        <img
                          src="service image/seo-3d-icon-png-download-5528528.webp"
                          alt="SEO"
                          loading="lazy"
                          decoding="async" />
                      </div>
                      <h3>iGaming SEO Services</h3>
                      <p>
                        Improve search visibility with SEO strategies that drive
                        organic traffic and help your gaming business grow.
                      </p>
                    </div>
                    <picture className="cardImg">
                      <img src="poker cards/5.webp" alt="SEO Services"
                        loading="lazy"
                        decoding="async" />
                    </picture>
                  </Link>
                </li>

                <li>
                  <Link to="/meta-google-agency-accounts-for-igaming-businesses/" className="pos-rel">
                    <div className="txtBox">
                      <div className="s-icon">
                        <img
                          src="service image/recruitment-agency-3d-icon-png-download-12031451.webp"
                          alt="Agency Accounts"
                          loading="lazy"
                          decoding="async" />
                      </div>
                      <h3>Managed iGaming Ad Accounts</h3>
                      <p>
                        Get dedicated advertising account support, campaign
                        guidance and account management for eligible gaming
                        businesses.
                      </p>
                    </div>
                    <picture className="cardImg">
                      <img src="poker cards/6.webp" alt="Agency Accounts"
                        loading="lazy"
                        decoding="async" />
                    </picture>
                  </Link>
                </li>

                <li>
                  <Link to="/whatsapp-api-bulk-whatsapp-services-for-igaming-businesses/" className="pos-rel">
                    <div className="txtBox">
                      <div className="s-icon">
                        <img
                          src="service-img/WhatsApp-API.webp"
                          alt="Whatsapp API"
                          loading="lazy"
                          decoding="async" />
                      </div>
                      <h3>WhatsApp API</h3>
                      <p>
                        Simplify customer communication with WhatsApp
                        automation, approved messaging and efficient support
                        solutions.
                      </p>
                    </div>
                    <picture className="cardImg">
                      <img src="poker cards/7.webp" alt="Whatsapp API"
                        loading="lazy"
                        decoding="async" />
                    </picture>
                  </Link>
                </li>

                <li>
                  <Link to="/telegram-channel-promotion-live-line-api-for-igaming-businesses/" className="pos-rel">
                    <div className="txtBox">
                      <div className="s-icon">
                        <img
                          src="service-img/Telegram-Channel-Promotion.webp"
                          alt="Telegram promotion"
                          loading="lazy"
                          decoding="async" />
                      </div>
                      <h3>iGaming Telegram Marketing</h3>
                      <p>
                        Connect with gaming audiences through targeted Telegram
                        marketing campaigns.
                      </p>
                    </div>
                    <picture className="cardImg">
                      <img src="poker cards/8.webp" alt="Creative"
                        loading="lazy"
                        decoding="async" />
                    </picture>
                  </Link>
                </li>

                <li>
                  <Link to="/influencer-celebrity-marketing-for-igaming-businesses/" className="pos-rel">
                    <div className="txtBox">
                      <div className="s-icon">
                        <img
                          src="service-img/Influencer-Marketing.webp"
                          alt="Influencer Marketing"
                          loading="lazy"
                          decoding="async" />
                      </div>
                      <h3>Influencer Marketing</h3>
                      <p>
                        Build brand awareness through relevant influencer
                        partnerships and creative promotional campaigns.
                      </p>
                    </div>
                    <picture className="cardImg">
                      <img
                        src="poker cards/9.webp"
                        alt="Influencer Marketing"
                        loading="lazy"
                        decoding="async" />
                    </picture>
                  </Link>
                </li>

                <li>
                  <Link to="/website-and-app-development-for-igaming-businesses/" className="pos-rel">
                    <div className="txtBox">
                      <div className="s-icon">
                        <img
                          src="service-img/Web-Development.webp"
                          alt="Web Development"
                          loading="lazy"
                          decoding="async" />
                      </div>
                      <h3>Web Development</h3>
                      <p>
                        Build responsive, user-friendly websites designed to
                        improve visitor experience and support business growth.
                      </p>
                    </div>
                    <picture className="cardImg">
                      <img src="poker cards/10.webp" alt="Web Development"
                        loading="lazy"
                        decoding="async" />
                    </picture>
                  </Link>
                </li>

                <li>
                  <Link to="/digital-marketing-for-trading-business/" className="pos-rel">
                    <div className="txtBox">
                      <div className="s-icon">
                        <img
                          src="service-img/Trading-Marketing.webp"
                          alt="Trending Marketing"
                          loading="lazy"
                          decoding="async" />
                      </div>
                      <h3>Trending Marketing</h3>
                      <p>
                        Stay relevant with creative digital campaigns inspired
                        by current trends and audience interests.
                      </p>
                    </div>
                    <picture className="cardImg">
                      <img src="poker cards/j.webp" alt="Trending Marketing"
                        loading="lazy"
                        decoding="async" />
                    </picture>
                  </Link>
                </li>

                <li>
                  <Link to="/turnkey-solutions-for-igaming-businesses/" className="pos-rel">
                    <div className="txtBox">
                      <div className="s-icon">
                        <img
                          src="service-img/Turnkey-Solutions.webp"
                          alt="Turnkey Solutions"
                          loading="lazy"
                          decoding="async" />
                      </div>
                      <h3>iGaming Turnkey Solutions</h3>
                      <p>
                        Explore integrated gaming platform solutions with
                        technology, setup and business support.
                      </p>
                    </div>
                    <picture className="cardImg">
                      <img src="poker cards/q.webp" alt="Turnkey Solutions"
                        loading="lazy"
                        decoding="async" />
                    </picture>
                  </Link>
                </li>

                <li>
                  <Link to="/igaming-software-solution-providers/" className="pos-rel">
                    <div className="txtBox">
                      <div className="s-icon">
                        <img
                          src="service-img/iGaming-Software.webp"
                          alt="iGaming Software"
                          loading="lazy"
                          decoding="async" />
                      </div>
                      <h3>iGaming Software Solutions</h3>
                      <p>
                        Get scalable gaming software solutions designed to
                        support platform functionality and business operations.
                      </p>
                    </div>
                    <picture className="cardImg">
                      <img src="poker cards/k.webp" alt="iGaming Software"
                        loading="lazy"
                        decoding="async" />
                    </picture>
                  </Link>
                </li>
              </ul>
            </div>
          </section>

          <section id="live-ads" className="bg-glow">
            <div className="container">
              <p className="section-label">Live Ads We Run For Clients</p>
              <h2 className="section-title">
                Real Campaigns. <span className="gold">Real Results.</span>
              </h2>
              <p className="section-desc">
                Let’s review some of the advertising campaigns and marketing initiatives that have been managed by The Marketing King. These involve various verticals in the gaming industry, channels of advertisement and audiences targeted. Each campaign is based on certain business goals, audience needs and metrics.
              </p>
              <div className="live-ads-swiper swiper">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <img
                      width="1200"
                      height="675"
                      loading="lazy"
                      src="/live-ads/Best-iGaming-Marketing-Agency-in-India-1.webp"
                      srcSet="/live-ads/Best-iGaming-Marketing-Agency-in-India-1-600.webp 600w, /live-ads/Best-iGaming-Marketing-Agency-in-India-1.webp 1200w"
                      sizes="(max-width: 768px) 100vw, 580px"
                      alt="Ad 1"
                      decoding="async" />
                    <div className="slide-body">
                      <h3>Ad Campaign 1</h3>
                      <p>Results driven campaign delivering quality traffic.</p>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <img
                      width="1200"
                      height="675"
                      loading="lazy"
                      src="/live-ads/Best-iGaming-Marketing-Agency-in-India-2.webp"
                      srcSet="/live-ads/Best-iGaming-Marketing-Agency-in-India-2-600.webp 600w, /live-ads/Best-iGaming-Marketing-Agency-in-India-2.webp 1200w"
                      sizes="(max-width: 768px) 100vw, 580px"
                      alt="Ad 2"
                      decoding="async" />
                    <div className="slide-body">
                      <h3>Ad Campaign 2</h3>
                      <p>Targeted strategy maximizing player acquisition.</p>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <img
                      width="1200"
                      height="675"
                      loading="lazy"
                      src="/live-ads/Best-iGaming-Marketing-Agency-in-India-3.webp"
                      srcSet="/live-ads/Best-iGaming-Marketing-Agency-in-India-3-600.webp 600w, /live-ads/Best-iGaming-Marketing-Agency-in-India-3.webp 1200w"
                      sizes="(max-width: 768px) 100vw, 580px"
                      alt="Ad 3"
                      decoding="async" />
                    <div className="slide-body">
                      <h3>Ad Campaign 3</h3>
                      <p>Performance driven campaign with measurable growth.</p>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <img
                      width="1200"
                      height="675"
                      loading="lazy"
                      src="/live-ads/Best-iGaming-Marketing-Agency-in-India-4.webp"
                      srcSet="/live-ads/Best-iGaming-Marketing-Agency-in-India-4-600.webp 600w, /live-ads/Best-iGaming-Marketing-Agency-in-India-4.webp 1200w"
                      sizes="(max-width: 768px) 100vw, 580px"
                      alt="Ad 4"
                      decoding="async" />
                    <div className="slide-body">
                      <h3>Ad Campaign 4</h3>
                      <p>Scalable ad solutions for sustained engagement.</p>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <img
                      width="1200"
                      height="675"
                      loading="lazy"
                      src="/live-ads/Best-iGaming-Marketing-Agency-in-India-5.webp"
                      srcSet="/live-ads/Best-iGaming-Marketing-Agency-in-India-5-600.webp 600w, /live-ads/Best-iGaming-Marketing-Agency-in-India-5.webp 1200w"
                      sizes="(max-width: 768px) 100vw, 580px"
                      alt="Ad 5"
                      decoding="async" />
                    <div className="slide-body">
                      <h3>Ad Campaign 5</h3>
                      <p>
                        Innovative creatives optimized for high conversions.
                      </p>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <img
                      width="1200"
                      height="675"
                      loading="lazy"
                      src="/live-ads/Best-iGaming-Marketing-Agency-in-India-6.webp"
                      srcSet="/live-ads/Best-iGaming-Marketing-Agency-in-India-6-600.webp 600w, /live-ads/Best-iGaming-Marketing-Agency-in-India-6.webp 1200w"
                      sizes="(max-width: 768px) 100vw, 580px"
                      alt="Ad 6"
                      decoding="async" />
                    <div className="slide-body">
                      <h3>Ad Campaign 6</h3>
                      <p>Data backed campaigns driving user acquisition.</p>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <img
                      width="1200"
                      height="675"
                      loading="lazy"
                      src="/live-ads/Best-iGaming-Marketing-Agency-in-India-7.webp"
                      srcSet="/live-ads/Best-iGaming-Marketing-Agency-in-India-7-600.webp 600w, /live-ads/Best-iGaming-Marketing-Agency-in-India-7.webp 1200w"
                      sizes="(max-width: 768px) 100vw, 580px"
                      alt="Ad 7"
                      decoding="async" />
                    <div className="slide-body">
                      <h3>Ad Campaign 7</h3>
                      <p>
                        Strategic placements targeting high value audiences.
                      </p>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <img
                      width="1200"
                      height="675"
                      loading="lazy"
                      src="/live-ads/Best-iGaming-Marketing-Agency-in-India-8.webp"
                      srcSet="/live-ads/Best-iGaming-Marketing-Agency-in-India-8-600.webp 600w, /live-ads/Best-iGaming-Marketing-Agency-in-India-8.webp 1200w"
                      sizes="(max-width: 768px) 100vw, 580px"
                      alt="Ad 8"
                      decoding="async" />
                    <div className="slide-body">
                      <h3>Ad Campaign 8</h3>
                      <p>Comprehensive management for maximum exposure.</p>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <img
                      width="1200"
                      height="675"
                      loading="lazy"
                      src="/live-ads/Best-iGaming-Marketing-Agency-in-India-9.webp"
                      srcSet="/live-ads/Best-iGaming-Marketing-Agency-in-India-9-600.webp 600w, /live-ads/Best-iGaming-Marketing-Agency-in-India-9.webp 1200w"
                      sizes="(max-width: 768px) 100vw, 580px"
                      alt="Ad 9"
                      decoding="async" />
                    <div className="slide-body">
                      <h3>Ad Campaign 9</h3>
                      <p>Tailored campaigns aligned with your growth goals.</p>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <img
                      width="1200"
                      height="675"
                      loading="lazy"
                      src="/live-ads/Best-iGaming-Marketing-Agency-in-India-10.webp"
                      srcSet="/live-ads/Best-iGaming-Marketing-Agency-in-India-10-600.webp 600w, /live-ads/Best-iGaming-Marketing-Agency-in-India-10.webp 1200w"
                      sizes="(max-width: 768px) 100vw, 580px"
                      alt="Ad 10"
                      decoding="async" />
                    <div className="slide-body">
                      <h3>Ad Campaign 10</h3>
                      <p>End to end solutions from strategy to execution.</p>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <img
                      width="1200"
                      height="675"
                      loading="lazy"
                      src="/live-ads/Best-iGaming-Marketing-Agency-in-India-11.webp"
                      srcSet="/live-ads/Best-iGaming-Marketing-Agency-in-India-11-600.webp 600w, /live-ads/Best-iGaming-Marketing-Agency-in-India-11.webp 1200w"
                      sizes="(max-width: 768px) 100vw, 580px"
                      alt="Ad 11"
                      decoding="async" />
                    <div className="slide-body">
                      <h3>Ad Campaign 11</h3>
                      <p>High impact ads for competitive iGaming markets.</p>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <img
                      width="1200"
                      height="675"
                      loading="lazy"
                      src="/live-ads/Best-iGaming-Marketing-Agency-in-India-12.webp"
                      srcSet="/live-ads/Best-iGaming-Marketing-Agency-in-India-12-600.webp 600w, /live-ads/Best-iGaming-Marketing-Agency-in-India-12.webp 1200w"
                      sizes="(max-width: 768px) 100vw, 580px"
                      alt="Ad 12"
                      decoding="async" />
                    <div className="slide-body">
                      <h3>Ad Campaign 12</h3>
                      <p>Proven frameworks that deliver consistent results.</p>
                    </div>
                  </div>
                </div>
                <div className="swiper-pagination"></div>
                <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div>
              </div>
              <div style={{ textAlign: "center", marginTop: "12px" }}>
                <a href="#cta" className="btn btn-primary">
                  Explore More Campaigns <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </section>

          <section className="metrics-bar">
            <div className="container">
              <p className="section-label">Performance Metrics</p>
              <div className="metrics-bar-grid stagger">
                <div className="metrics-bar-item">
                  <span className="accent-line"></span>
                  <span className="num">5,000+</span>
                  <p>Campaigns Launched</p>
                </div>
                <div className="metrics-bar-item">
                  <span className="accent-line"></span>
                  <span className="num">170,000+</span>
                  <p>Players Acquired</p>
                </div>
                <div className="metrics-bar-item">
                  <span className="accent-line"></span>
                  <span className="num">20%</span>
                  <p>Average Conversion Growth</p>
                </div>
                <div className="metrics-bar-item">
                  <span className="accent-line"></span>
                  <span className="num">40%</span>
                  <p>Average Client ROI Improvement</p>
                </div>
              </div>
            </div>
          </section>
        </section>

        <svg
          style={{
            position: "absolute",
            width: 0,
            height: 0,
            overflow: "hidden",
          }}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#88C240" />
              <stop offset="50%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#096FB2" />
            </linearGradient>
          </defs>
        </svg>

        <section id="case-metrics" className="bg-glow">
          <div className="container">
            <div className="metrics-header">
              <p className="section-label">Performance Metrics</p>
              <h2 className="section-title">
                Results That Speak for <span className="gold">Themselves</span>
              </h2>
              <p className="section-desc">
              Performance in marketing is not assessed solely on the basis of the number of visits to websites and clicks on ads. The following business metrics are evaluated: registration, first deposit, cost of acquisition, audience engagement and customer retention. This knowledge helps assess the performance of campaigns, pinpointing areas of improvements and future strategies.
              </p>
            </div>
            <div className="metrics-grid stagger">
              <div className="metric-ring-card">
                <div className="ring-wrap">
                  <svg viewBox="0 0 120 120">
                    <circle className="ring-bg" cx="60" cy="60" r="54" />
                    <circle
                      className="ring-fill"
                      cx="60"
                      cy="60"
                      r="54"
                      style={{ strokeDashoffset: 16.96 }}
                    />
                  </svg>
                  <div className="ring-value">95%</div>
                </div>
                <div className="ring-label">Player Acquisition</div>
                <div className="ring-desc">
                  Quality players acquired per month
                </div>
                <span className="ring-trend">
                  <ChevronUp size={14} /> +32%
                </span>
              </div>
              <div className="metric-ring-card">
                <div className="ring-wrap">
                  <svg viewBox="0 0 120 120">
                    <circle className="ring-bg" cx="60" cy="60" r="54" />
                    <circle
                      className="ring-fill"
                      cx="60"
                      cy="60"
                      r="54"
                      style={{ strokeDashoffset: 50.89 }}
                    />
                  </svg>
                  <div className="ring-value">300+</div>
                </div>
                <div className="ring-label">First Time Depositors</div>
                <div className="ring-desc">
                  FTDs via optimized conversion funnels
                </div>
                <span className="ring-trend">
                  <ChevronUp size={14} /> +28%
                </span>
              </div>
              <div className="metric-ring-card">
                <div className="ring-wrap">
                  <svg viewBox="0 0 120 120">
                    <circle className="ring-bg" cx="60" cy="60" r="54" />
                    <circle
                      className="ring-fill"
                      cx="60"
                      cy="60"
                      r="54"
                      style={{ strokeDashoffset: 74.64 }}
                    />
                  </svg>
                  <div className="ring-value">40%</div>
                </div>
                <div className="ring-label">Cost Per Acquisition</div>
                <div className="ring-desc">Average CPA reduction achieved</div>
                <span className="ring-trend">
                  <ChevronDown size={14} /> -40%
                </span>
              </div>
              <div className="metric-ring-card">
                <div className="ring-wrap">
                  <svg viewBox="0 0 120 120">
                    <circle className="ring-bg" cx="60" cy="60" r="54" />
                    <circle
                      className="ring-fill"
                      cx="60"
                      cy="60"
                      r="54"
                      style={{ strokeDashoffset: 27.14 }}
                    />
                  </svg>
                  <div className="ring-value">450%</div>
                </div>
                <div className="ring-label">Return on Ad Spend</div>
                <div className="ring-desc">
                  Average ROAS across all campaigns
                </div>
                <span className="ring-trend">
                  <ChevronUp size={14} /> +450%
                </span>
              </div>
              <div className="metric-ring-card">
                <div className="ring-wrap">
                  <svg viewBox="0 0 120 120">
                    <circle className="ring-bg" cx="60" cy="60" r="54" />
                    <circle
                      className="ring-fill"
                      cx="60"
                      cy="60"
                      r="54"
                      style={{ strokeDashoffset: 95.0 }}
                    />
                  </svg>
                  <div className="ring-value">60%</div>
                </div>
                <div className="ring-label">Player Retention</div>
                <div className="ring-desc">Retention rate improvement</div>
                <span className="ring-trend">
                  <ChevronUp size={14} /> +60%
                </span>
              </div>
              <div className="metric-ring-card">
                <div className="ring-wrap">
                  <svg viewBox="0 0 120 120">
                    <circle className="ring-bg" cx="60" cy="60" r="54" />
                    <circle
                      className="ring-fill"
                      cx="60"
                      cy="60"
                      r="54"
                      style={{ strokeDashoffset: 40.72 }}
                    />
                  </svg>
                  <div className="ring-value">280%</div>
                </div>
                <div className="ring-label">Lifetime Value</div>
                <div className="ring-desc">
                  LTV increase through sustained growth
                </div>
                <span className="ring-trend">
                  <ChevronUp size={14} /> +280%
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="stats-whatsapp-wrap">
          <a
            href="https://wa.me/447418622761?text=Hello,%20I%20want%20full%20information"
            target="_blank"
            rel="noopener noreferrer"
            className="stats-whatsapp-btn"
          >
            <img src="/sticky icons/whatsApp-icon.webp" alt="WhatsApp" width="100" height="100" loading="lazy"
              decoding="async" />
            Chat on WhatsApp
          </a>
        </section>

        <section id="about" className="bg-glow">
          <div className="container">
            <p className="section-label">
              Why Leading iGaming Brands Choose TMK
            </p>
            <div className="about-header">
              <h2 className="section-title">
                Specialized <span className="gold">iGaming Expertise</span>
              </h2>
              <p>
                We deliver measurable growth for gaming brands through
                specialized marketing strategies built on deep industry
                knowledge and data driven execution.
              </p>
            </div>
            <div className="expertise-scroll swiper">
              <div className="swiper-wrapper">
                {expertise.map((e, i) => (
                  <div className="swiper-slide" key={i}>
                    <div className="expertise-card">
                      <div className="ec-icon">
                        <img
                          width="450"
                          height="450"
                          loading="lazy"
                          src={e.img}
                          alt={e.title}
                          decoding="async" />
                      </div>
                      <h3>{e.title}</h3>
                      <p>{e.desc}</p>
                      <span className="ec-number">{e.num}</span>
                    </div>
                  </div>
                ))}
              </div>
              {/* <div className="expertise-pagination swiper-pagination"></div>
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div> */}
            </div>
          </div>
        </section>

        <section id="process" className="bg-glow">
          <div className="process-bg-line"></div>
          <div className="container">
            <p className="section-label">Our Process</p>
            <h2 className="section-title">
              How We Scale <span className="gold">Gaming Brands</span>
            </h2>
            <div className="process-track stagger">
              <div className="process-card">
                <div className="step-body">
                  <div className="step-icon">
                    <Search size={24} />
                  </div>
                  <span className="step-card-num">Step 01</span>
                  <h3>Audit & Analysis</h3>
                  <p>
                    We strip away the guesswork by thoroughly analyzing your
                    brand positioning, historical traffic data, and competitor
                    vulnerabilities.
                  </p>
                </div>
              </div>
              <div className="process-card">
                <div className="step-body">
                  <div className="step-icon">
                    <Map size={24} />
                  </div>
                  <span className="step-card-num">Step 02</span>
                  <h3>Architecture & Strategy</h3>
                  <p>
                    We engineer a customized multi channel acquisition blueprint
                    built entirely around maximizing player lifetime value
                    (LTV).
                  </p>
                </div>
              </div>
              <div className="process-card">
                <div className="step-body">
                  <div className="step-icon">
                    <Rocket size={24} />
                  </div>
                  <span className="step-card-num">Step 03</span>
                  <h3>Launch & Target</h3>
                  <p>
                    We deploy your campaigns across premium traffic channels
                    using razor sharp demographic filtering and compliance
                    approved funnels.
                  </p>
                </div>
              </div>
              <div className="process-card">
                <div className="step-body">
                  <div className="step-icon">
                    <ChartLine size={24} />
                  </div>
                  <span className="step-card-num">Step 04</span>
                  <h3>Optimize & Accelerate</h3>
                  <p>
                    We continuously run A/B conversion tests and refine target
                    segments to maximize ROI and scale winning campaigns
                    aggressively.
                  </p>
                </div>
              </div>
              <div className="process-card">
                <div className="step-body">
                  <div className="step-icon">
                    <Globe size={24} />
                  </div>
                  <span className="step-card-num">Step 05</span>
                  <h3>Report & Expand</h3>
                  <p>
                    We deliver crystal clear performance metrics while
                    systematically expanding your footprint into high yield,
                    emerging gaming markets worldwide.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="certified">
          <div className="container">
            <p className="section-label">Certified By</p>
            <h2 className="section-title">
              Our <span className="gold">Certifications</span>
            </h2>
            <div className="cert-showcase">
              {certImages.map((img, i) => (
                <div className="cert-card" key={i}>
                  <div className="card-shine"></div>
                  <img src={img} alt="Certification" width="400" height="300" loading="lazy"
                    decoding="async" />
                  <span className="cert-stamp">
                    <CheckCircle size={10} /> Verified
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="media-coverage">
          <div className="container">
            <p className="section-label">Media Coverage</p>
            <h2 className="section-title">
              As Featured <span className="gold">In</span>
            </h2>
            <div className="swiper mediaSwiper">
              <div className="swiper-wrapper">
                {newsLogos.map((src, i) => (
                  <div className="swiper-slide" key={i}>
                    <img src={src} alt={`News ${i + 1}`} width="400" height="300" loading="lazy"
                      decoding="async" />
                  </div>
                ))}
              </div>
              <div className="media-pagination swiper-pagination"></div>
              <div className="swiper-button-prev"></div>
              <div className="swiper-button-next"></div>
            </div>
          </div>
        </section>

        <section className="stats-whatsapp-wrap">
          <a
            href="https://wa.me/447418622761?text=Hello,%20I%20want%20full%20information"
            target="_blank"
            rel="noopener noreferrer"
            className="stats-whatsapp-btn"
          >
            <img src="/sticky icons/whatsApp-icon.webp" alt="WhatsApp" width="100" height="100" loading="lazy"
              decoding="async" />
            Chat on WhatsApp
          </a>
        </section>

        <section id="blog" className="bg-glow">
          <div className="container">
            <p className="section-label">Latest Blogs</p>
            <h2 className="section-title">
              Insights &amp; <span className="gold">Updates</span>
            </h2>
            <div className="blog-grid stagger">
              {blogLoading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <div
                      className="blog-card"
                      key={i}
                      style={{ minHeight: 360 }}
                    />
                  ))
                : blogPosts.slice(0, 3).map((post) => (
                    <Link
                      to={`/blog/${post.slug}/`}
                      className="blog-card"
                      key={post.id}
                    >
                      <div className="blog-img">
                        {post.image ? (
                          <img
                            src={post.image}
                            alt={post.title}
                            style={{
                              width: "100%",
                              height: 200,
                              objectFit: "cover",
                            }}
                            loading="lazy"
                            decoding="async" />
                        ) : (
                          <div
                            style={{
                              width: "100%",
                              height: 200,
                              background: "#1a1a1a",
                            }}
                          />
                        )}
                      </div>
                      <div className="blog-body">
                        <span className="tag">
                          {post.categoryName || "Blogs"}
                        </span>
                        <h3>{post.title}</h3>
                        <p>{post.excerpt}</p>
                      </div>
                    </Link>
                  ))}
            </div>
            <div style={{ textAlign: "center", marginTop: "32px" }}>
              <Link to="/blogs/" className="btn btn-outline">
                View All Blogs
              </Link>
            </div>
          </div>
        </section>

        <FAQSection
          label="FAQ"
          title={
            <>
              Frequently Asked <span className="gold">Questions</span>
            </>
          }
          faqs={faqData}
        />

        <section className="bg-glow">
          <div className="container">
            <div className="cta-inner">
              <div className="cta-image">
                <img
                  width="1920"
                  height="1401"
                  loading="lazy"
                  src="/image/10.webp"
                  alt="iGaming Growth"
                  decoding="async" />
              </div>
              <div className="cta-right">
                <p className="section-label">Contact Us</p>
                <h2 className="section-title">
                  Our solution is perfect for your{" "}
                  <span className="gold">business needs.</span>
                </h2>
                <p className="section-desc" id="cta">
                  We are The Marketing King because we deliver exceptional
                  results.
                </p>
                <ul className="cta-benefits">
                  <li>
                    <CheckCircle size={14} /> 360 Degree Marketing Solutions
                  </li>
                  <li>
                    <CheckCircle size={14} /> Experience and Expertise
                  </li>
                  <li>
                    <CheckCircle size={14} /> 11+ Years of Industry Knowledge
                  </li>
                  <li>
                    <CheckCircle size={14} /> Result Driven Solutions
                  </li>
                </ul>

                <LeadForm />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
