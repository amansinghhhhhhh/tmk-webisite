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
// import Swiper from "swiper";
import Swiper from "swiper/bundle";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { fetchPosts, mapPost } from "../api/wordpress";
import LeadForm from "../components/LeadForm";
import SEO from "../components/SEO";

const expertise = [
  {
    num: "01",
    img: "/New folder (2)/business-expert-3d-icon-png-download-4745552.webp",
    title: "Specialized iGaming Expertise",
    desc: "Contrary to conventional agencies, we concentrate on gambling and gaming brands, which allows us to design strategies specifically to meet the challenges and opportunities.",
  },
  {
    num: "02",
    img: "/New folder (2)/compliance-3d-icon-png-download-8202794.webp",
    title: "Compliance-Driven Marketing",
    desc: "We are aware of the requirements for regulatory compliance across multiple markets. We design campaigns that ensure compliance while increasing growth.",
  },
  {
    num: "03",
    img: "/New folder (2)/infographic-3d-icon-png-download-13033145.webp",
    title: "Multi-Channel Growth Systems",
    desc: "SEO, paid advertisements, the affiliate market, Social Media influencer campaigns, as well as retention strategies, all working under the same framework.",
  },
  {
    num: "04",
    img: "/New folder (2)/data-driven-3d-icon-png-download-9531917.webp",
    title: "Data-Driven Decisions",
    desc: "Each campaign is governed by the performance metrics of analytics, performance and continual improvement to get the most out of results.",
  },
  {
    num: "05",
    img: "/New folder (2)/global-location-3d-icon-png-download-14044491.webp",
    title: "GEO-Specific Strategies",
    desc: "Experience in targeting major markets such as India, the UK, Malta, Curacao, the Philippines, Europe and the emerging gaming areas around the world.",
  },
  {
    num: "06",
    img: "/New folder (2)/long-term-investment-3d-icon-png-download-6185083.webp",
    title: "Long-Term Growth Focus",
    desc: "We don't just generate traffic. We assist brands in creating solid acquisition strategies that improve the value of each player's life and profits.",
  },
];

const faqData = [
  {
    q: "What iGaming marketing services does The Marketing King provide?",
    a: "We offer a full suite of iGaming marketing solutions including SEO, Meta Ads, Telegram & Community Marketing, Affiliate Marketing, Player Acquisition, Creative Production, and Conversion Optimization tailored specifically for online casinos, sportsbooks, poker platforms, fantasy sports, and crypto gaming brands.",
  },
  {
    q: "How does TMK help acquire First-Time Depositors (FTDs)?",
    a: "We use a data-driven approach combining paid media, affiliate partnerships, community marketing, and conversion optimization to target high-intent players across multiple GEOs, maximizing registrations and first-time deposits while minimizing CPA.",
  },
  {
    q: "Which GEOs and markets does The Marketing King target?",
    a: "We specialize in targeting major markets such as India, the UK, Malta, Curacao, the Philippines, Europe, and emerging gaming regions worldwide. Our GEO-specific strategies ensure compliance and maximum ROI in each market.",
  },
  {
    q: "How does TMK ensure compliance with iGaming regulations?",
    a: "We are well-versed in regulatory requirements across multiple jurisdictions. All campaigns are designed with compliance in mind, adhering to local advertising laws, responsible gambling guidelines, and platform-specific policies.",
  },
  {
    q: "What results can I expect from working with TMK?",
    a: "Our clients typically see improved player acquisition metrics, higher conversion rates, increased FTDs, better ROAS, and long-term player retention growth. We provide transparent reporting with regular performance analytics to track every metric.",
  },
  {
    q: "Does TMK offer both SEO and paid advertising for iGaming?",
    a: "Yes, we offer comprehensive iGaming SEO services alongside paid advertising campaigns including Meta Ads, Google Ads, and Telegram Ads as part of our multi-channel growth approach for maximum visibility and acquisition.",
  },
  {
    q: "How does TMK approach conversion optimization for iGaming platforms?",
    a: "We optimize every stage of the player journey — from landing page design and registration flow improvements to deposit funnel optimization and UX analysis — using A/B testing and data-driven insights to maximize conversions.",
  },
  {
    q: "Can TMK help scale my sportsbook or casino brand globally?",
    a: "Absolutely. We design scalable acquisition systems that combine SEO, paid media, affiliate marketing, and retention strategies to help sportsbook and casino brands expand into new markets and grow sustainably across borders.",
  },
  {
    q: "What makes The Marketing King different from general digital agencies?",
    a: "Unlike general agencies, we specialize exclusively in iGaming and gambling brands. Our deep understanding of player behavior, compliance requirements, and industry-specific marketing channels allows us to deliver highly targeted, effective campaigns that general agencies cannot match.",
  },
  {
    q: "How do I get started with The Marketing King?",
    a: "Simply book a free strategy call through our contact form. We'll discuss your brand, goals, target markets, and current challenges. Then our team will design a custom growth strategy tailored specifically to your needs and budget.",
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
  "/certification/WhatsApp Image 2026-06-17 at 6.48.24 PM.jpeg",
  "/certification/WhatsApp Image 2026-06-17 at 6.48.24 PM (1).jpeg",
  "/certification/WhatsApp Image 2026-06-17 at 6.48.24 PM (2).jpeg",
  "/certification/WhatsApp Image 2026-06-17 at 6.48.24 PM (3).jpeg",
  "/certification/WhatsApp Image 2026-06-17 at 6.48.24 PM (4).jpeg",
  "/certification/WhatsApp Image 2026-06-17 at 6.48.24 PM (5).jpeg",
];

export default function Home() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);


const [service, setService] = useState("");

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const [blogPosts, setBlogPosts] = useState([]);
  const [blogLoading, setBlogLoading] = useState(true);

  useEffect(() => {
    fetchPosts(4)
      .then((data) => {
        setBlogPosts(data.map(mapPost));
        setBlogLoading(false);
      })
      .catch(() => setBlogLoading(false));
  }, []);

  useEffect(() => {
    try {
      new Swiper(".industries-scroll", {
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
    } catch (e) { /* empty */ }
    try {
      new Swiper(".services-swiper", {
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
    } catch (e) { /* empty */ }
    try {
      new Swiper(".live-ads-swiper", {
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
    } catch (e) { /* empty */ }
    try {
      new Swiper(".mediaSwiper", {
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
    } catch (e) { /* empty */ }

    if (!document.querySelector(".expertise-scroll.swiper-initialized")) {
      try {
        const es = document.querySelector(".expertise-scroll");
        if (es) {
          es.classList.add("swiper-initialized");
          new Swiper(".expertise-scroll", {
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
                if (this.autoplay && !this.autoplay.running) this.autoplay.start();
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
      } catch (e) { /* empty */ }
    }

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

    return () => {};
  }, []);

  return (
     <>
    <SEO
      title="The Marketing King | iGaming Marketing Agency"
      description="Scale your iGaming business with SEO, Meta Ads, Affiliate Marketing, Player Acquisition and Conversion Optimization."
      canonical="https://themarketingking.org/"
    />
    <div>
      <section id="hero">
        <video className="hero-bg-video" autoPlay muted loop playsInline>
          <source src="/hero section.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>
        <div className="hero-glow-orb g1"></div>
        <div className="hero-glow-orb g2"></div>
        <div className="container">
          <div className="hero-grid">
            <div className="hero-left" id="heroLeft">
              <div className="hero-tag">iGaming Growth Marketing Agency</div>
              <h1 className="hero-title">
                <span className="line1">Scale Your</span>{" "}
                <span className="line2">iGaming Brand Globally</span>
              </h1>
              <p className="hero-desc">
                We help online casinos, sportsbooks, poker platforms, fantasy
                sports apps, and crypto gaming brands acquire premium players,
                boost FTDs, increase retention, and maximize revenue through
                analytics-driven marketing strategies.
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
          <div
            className="trust-strip"
            style={{
              marginTop: "-50px",
            }}
          >
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
              Trusted by igaming brands across
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
<Link to="/countries/us" className="trust-flag" style={{
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
}}>
  <img
    src="https://cdn.jsdelivr.net/gh/lipis/flag-icons@main/flags/4x3/us.svg"
    alt="United States"
    style={{ width: 28, height: 21, borderRadius: 4, objectFit: "cover" }}
  />
  United States
</Link>

{/* United Kingdom */}
<Link to="/countries/uk" className="trust-flag" style={{
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
}}>
  <img
    src="https://cdn.jsdelivr.net/gh/lipis/flag-icons@main/flags/4x3/gb.svg"
    alt="United Kingdom"
    style={{ width: 28, height: 21, borderRadius: 4, objectFit: "cover" }}
  />
  United Kingdom
</Link>

{/* Latam */}
<Link
  to="/countries/latam"
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
  />
  Latam
</Link>

{/* India */}
<Link to="/countries/india" className="trust-flag" style={{
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
}}>
  <img
    src="https://cdn.jsdelivr.net/gh/lipis/flag-icons@main/flags/4x3/in.svg"
    alt="India"
    style={{ width: 28, height: 21, borderRadius: 4, objectFit: "cover" }}
  />
  India
</Link>

{/* Malta */}
<Link to="/countries/malta" className="trust-flag" style={{
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
}}>
  <img
    src="https://cdn.jsdelivr.net/gh/lipis/flag-icons@main/flags/4x3/mt.svg"
    alt="Malta"
    style={{ width: 28, height: 21, borderRadius: 4, objectFit: "cover" }}
  />
  Malta
</Link>

{/* Philippines */}
<Link to="/countries/philippines" className="trust-flag" style={{
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
}}>
  <img
    src="https://cdn.jsdelivr.net/gh/lipis/flag-icons@main/flags/4x3/ph.svg"
    alt="Philippines"
    style={{ width: 28, height: 21, borderRadius: 4, objectFit: "cover" }}
  />
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
            We collaborate with ambitious gaming operators to take over
            competitive markets, attract qualified players, and profitably grow
            through performance-driven marketing strategies.
          </p>
          <div className="industries-scroll swiper">
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <div className="industry-card">
                  <span className="ind-icon">
                    <img
                      src="/ICON 3D/casino-3d-icon-png-download-13883873.webp"
                      alt=""
                    />
                  </span>
                  <h4>Online Casinos</h4>
                  <p>
                    Deposits, registrations, and long-term player value via SEO,
                    PPC, affiliate marketing and conversion optimization.
                  </p>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="industry-card">
                  <span className="ind-icon">
                    <img
                      src="/ICON 3D/sports-3d-icon-png-download-10887497.webp"
                      alt=""
                    />
                  </span>
                  <h4>Sportsbooks</h4>
                  <p>
                    Get sports bettors on board with events-driven campaigns
                    focused on major leagues and live betting options.
                  </p>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="industry-card">
                  <span className="ind-icon">
                    <img
                      src="/ICON 3D/trophy-3d-icon-png-download-8115379.webp"
                      alt=""
                    />
                  </span>
                  <h4>Fantasy Sports</h4>
                  <p>
                    Enhance engagement and acquisition through targeted
                    advertisements and performance-based strategies.
                  </p>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="industry-card">
                  <span className="ind-icon">
                    <img
                      src="/ICON 3D/bitcoin-3d-icon-png-download-8579726.webp"
                      alt=""
                    />
                  </span>
                  <h4>Crypto Casinos</h4>
                  <p>
                    Build trusting communities and reach crypto-first audiences
                    using Web3 marketing and influencer programs.
                  </p>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="industry-card">
                  <span className="ind-icon">
                    <img
                      src="/ICON 3D/casino-game-3d-icon-png-download-11333776.webp"
                      alt=""
                    />
                  </span>
                  <h4>Sweepstakes Casinos</h4>
                  <p>
                    Create quality traffic and increase player retention with a
                    scalable acquisition system.
                  </p>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="industry-card">
                  <span className="ind-icon">
                    <img
                      src="/ICON 3D/poker-playing-cards-3d-icon-png-download-11901378.png"
                      alt=""
                    />
                  </span>
                  <h4>Poker Platforms</h4>
                  <p>
                    Increase sign-ups and tournament participation with
                    strategic digital marketing campaigns.
                  </p>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="industry-card">
                  <span className="ind-icon">
                    <img
                      src="/ICON 3D/gaming-online-course-3d-icon-png-download-9859833.png"
                      alt=""
                    />
                  </span>
                  <h4>Skill Gaming</h4>
                  <p>
                    Engage highly targeted audiences and boost conversions with
                    focused marketing campaigns.
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
                  First-Time Depositors Generated
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
          </div>
        </section>

        <section id="live-ads" className="bg-glow">
          <div className="container">
            <p className="section-label">Live Ads We Run For Clients</p>
            <h2 className="section-title">
              Real Campaigns. <span className="gold">Real Results.</span>
            </h2>
            <p className="section-desc">
              Successful player acquisition takes more than clicks. Our
              campaigns are created to yield tangible results — deposits,
              registrations, engagement, and long-term retention across gaming
              verticals and GEOs.
            </p>
            <div className="live-ads-swiper swiper">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <img
                    src="/live-ads/Best-iGaming-Marketing-Agency-in-India-1.webp"
                    alt="Ad 1"
                  />
                  <div className="slide-body">
                    <h3>Ad Campaign 1</h3>
                    <p>Results-driven campaign delivering quality traffic.</p>
                  </div>
                </div>
                <div className="swiper-slide">
                  <img
                    src="/live-ads/Best-iGaming-Marketing-Agency-in-India-2.webp"
                    alt="Ad 2"
                  />
                  <div className="slide-body">
                    <h3>Ad Campaign 2</h3>
                    <p>Targeted strategy maximizing player acquisition.</p>
                  </div>
                </div>
                <div className="swiper-slide">
                  <img
                    src="/live-ads/Best-iGaming-Marketing-Agency-in-India-3.webp"
                    alt="Ad 3"
                  />
                  <div className="slide-body">
                    <h3>Ad Campaign 3</h3>
                    <p>Performance-driven campaign with measurable growth.</p>
                  </div>
                </div>
                <div className="swiper-slide">
                  <img
                    src="/live-ads/Best-iGaming-Marketing-Agency-in-India-4.webp"
                    alt="Ad 4"
                  />
                  <div className="slide-body">
                    <h3>Ad Campaign 4</h3>
                    <p>Scalable ad solutions for sustained engagement.</p>
                  </div>
                </div>
                <div className="swiper-slide">
                  <img
                    src="/live-ads/Best-iGaming-Marketing-Agency-in-India-5.webp"
                    alt="Ad 5"
                  />
                  <div className="slide-body">
                    <h3>Ad Campaign 5</h3>
                    <p>Innovative creatives optimized for high conversions.</p>
                  </div>
                </div>
                <div className="swiper-slide">
                  <img
                    src="/live-ads/Best-iGaming-Marketing-Agency-in-India-6.webp"
                    alt="Ad 6"
                  />
                  <div className="slide-body">
                    <h3>Ad Campaign 6</h3>
                    <p>Data-backed campaigns driving user acquisition.</p>
                  </div>
                </div>
                <div className="swiper-slide">
                  <img
                    src="/live-ads/Best-iGaming-Marketing-Agency-in-India-7.webp"
                    alt="Ad 7"
                  />
                  <div className="slide-body">
                    <h3>Ad Campaign 7</h3>
                    <p>Strategic placements targeting high-value audiences.</p>
                  </div>
                </div>
                <div className="swiper-slide">
                  <img
                    src="/live-ads/Best-iGaming-Marketing-Agency-in-India-8.webp"
                    alt="Ad 8"
                  />
                  <div className="slide-body">
                    <h3>Ad Campaign 8</h3>
                    <p>Comprehensive management for maximum exposure.</p>
                  </div>
                </div>
                <div className="swiper-slide">
                  <img
                    src="/live-ads/Best-iGaming-Marketing-Agency-in-India-9.webp"
                    alt="Ad 9"
                  />
                  <div className="slide-body">
                    <h3>Ad Campaign 9</h3>
                    <p>Tailored campaigns aligned with your growth goals.</p>
                  </div>
                </div>
                <div className="swiper-slide">
                  <img
                    src="/live-ads/Best-iGaming-Marketing-Agency-in-India-10.webp"
                    alt="Ad 10"
                  />
                  <div className="slide-body">
                    <h3>Ad Campaign 10</h3>
                    <p>End-to-end solutions from strategy to execution.</p>
                  </div>
                </div>
                <div className="swiper-slide">
                  <img
                    src="/live-ads/Best-iGaming-Marketing-Agency-in-India-11.webp"
                    alt="Ad 11"
                  />
                  <div className="slide-body">
                    <h3>Ad Campaign 11</h3>
                    <p>High-impact ads for competitive iGaming markets.</p>
                  </div>
                </div>
                <div className="swiper-slide">
                  <img
                    src="/live-ads/Best-iGaming-Marketing-Agency-in-India-12.webp"
                    alt="Ad 12"
                  />
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
             <div style={{ textAlign: "center", marginTop: "12px" }}><a href="#cta" className="btn btn-primary">
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
              Every marketing investment must directly impact your business
              growth. Here's how we deliver measurable outcomes across every
              KPI.
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
              <div className="ring-label">First-Time Depositors</div>
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
              <div className="ring-desc">Average ROAS across all campaigns</div>
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

      <section id="about" className="bg-glow">
        <div className="container">
          <div className="about-header">
            <p className="section-label">
              Why Leading iGaming Brands Choose TMK
            </p>
            <h2 className="section-title">
              Specialized <span className="gold">iGaming Expertise</span>
            </h2>
            <p>
              We deliver measurable growth for gaming brands through specialized
              marketing strategies built on deep industry knowledge and
              data-driven execution.
            </p>
          </div>
          <div className="expertise-scroll swiper">
            <div className="swiper-wrapper">
              {expertise.map((e, i) => (
                <div className="swiper-slide" key={i}>
                  <div className="expertise-card">
                    <div className="ec-icon">
                      <img src={e.img} alt={e.title} />
                    </div>
                    <h4>{e.title}</h4>
                    <p>{e.desc}</p>
                    <span className="ec-number">{e.num}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="expertise-pagination swiper-pagination"></div>
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
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
                <h4>Discovery &amp; Market Analysis</h4>
                <p>
                  We assess your brand, competitors, target audience, and
                  current marketing performance to identify growth
                  opportunities.
                </p>
              </div>
            </div>
            <div className="process-card">
              <div className="step-body">
                <div className="step-icon">
                  <Map size={24} />
                </div>
                <span className="step-card-num">Step 02</span>
                <h4>Strategy Development</h4>
                <p>
                  Our team designs a customized growth strategy aligned to your
                  specific business goals and market conditions.
                </p>
              </div>
            </div>
            <div className="process-card">
              <div className="step-body">
                <div className="step-icon">
                  <Rocket size={24} />
                </div>
                <span className="step-card-num">Step 03</span>
                <h4>Campaign Launch</h4>
                <p>
                  SEO, PPC, affiliate, or acquisition strategies are deployed
                  across selected channels with precision targeting.
                </p>
              </div>
            </div>
            <div className="process-card">
              <div className="step-body">
                <div className="step-icon">
                  <ChartLine size={24} />
                </div>
                <span className="step-card-num">Step 04</span>
                <h4>Optimization &amp; Scaling</h4>
                <p>
                  We continuously refine targeting, creatives, funnels, and
                  metrics to improve ROI and scale winning campaigns.
                </p>
              </div>
            </div>
            <div className="process-card">
              <div className="step-body">
                <div className="step-icon">
                  <Globe size={24} />
                </div>
                <span className="step-card-num">Step 05</span>
                <h4>Reporting &amp; Growth Expansion</h4>
                <p>
                  Transparent reporting and strategic scaling open new markets
                  and opportunities for sustained growth.
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
                <img src={img} alt="Certification" />
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
                  <img src={src} alt={`News ${i + 1}`} />
                </div>
              ))}
            </div>
            <div className="media-pagination swiper-pagination"></div>
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
          </div>
        </div>
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
                  <div className="blog-card" key={i} style={{ minHeight: 360 }} />
                ))
              : blogPosts.slice(0, 3).map((post) => (
                  <Link to={`/blog/${post.slug}`} className="blog-card" key={post.id}>
                    <div className="blog-img">
                      {post.image ? (
                        <img src={post.image} alt={post.title} style={{ width: "100%", height: 200, objectFit: "cover" }} />
                      ) : (
                        <div style={{ width: "100%", height: 200, background: "#1a1a1a" }} />
                      )}
                    </div>
                    <div className="blog-body">
                      <span className="tag">{post.categoryName || "Blogs"}</span>
                      <h3>{post.title}</h3>
                      <p>{post.excerpt}</p>
                    </div>
                  </Link>
                ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "32px" }}>
            <Link to="/blogs" className="btn btn-outline">
              View All Blogs
            </Link>
          </div>
        </div>
      </section>

      <section id="faq">
        <div className="container">
          <p className="section-label">FAQ</p>
          <h2 className="section-title">
            Frequently Asked <span className="gold">Questions</span>
          </h2>
          <div className="faq-grid">
            <div className="faq-col">
              {faqData.slice(0, 5).map((f, i) => (
                <div
                  className={`faq-item${openFaq === i ? " open" : ""}`}
                  key={i}
                >
                  <div
                    className={`faq-q${openFaq === i ? " open" : ""}`}
                    onClick={() => toggleFaq(i)}
                  >
                    <span>{f.q}</span>
                    <span className="faq-icon">
                      <ChevronDown size={12} />
                    </span>
                  </div>
                  <div className={`faq-a${openFaq === i ? " open" : ""}`}>
                    {f.a}
                  </div>
                </div>
              ))}
            </div>
            <div className="faq-col">
              {faqData.slice(5, 10).map((f, i) => (
                <div
                  className={`faq-item${openFaq === i + 5 ? " open" : ""}`}
                  key={i + 5}
                >
                  <div
                    className={`faq-q${openFaq === i + 5 ? " open" : ""}`}
                    onClick={() => toggleFaq(i + 5)}
                  >
                    <span>{f.q}</span>
                    <span className="faq-icon">
                      <ChevronDown size={12} />
                    </span>
                  </div>
                  <div className={`faq-a${openFaq === i + 5 ? " open" : ""}`}>
                    {f.a}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="cta" className="bg-glow">
        <div className="container">
          <div className="cta-inner">
            <div className="cta-image">
              <img src="/image/10.jpg" alt="iGaming Growth" />
            </div>
            <div className="cta-right">
              <p className="section-label">Contact Us</p>
              <h2 className="section-title">
                Our solution is perfect for your{" "}
                <span className="gold">business needs.</span>
              </h2>
              <p className="section-desc">
                We are The Marketing King because we deliver exceptional
                results.
              </p>
              <ul className="cta-benefits">
                <li>
                  <CheckCircle size={14} /> 360-Degree Marketing Solutions
                </li>
                <li>
                  <CheckCircle size={14} /> Experience and Expertise
                </li>
                <li>
                  <CheckCircle size={14} /> 11+ Years of Industry Knowledge
                </li>
                <li>
                  <CheckCircle size={14} /> Result-Driven Solutions
                </li>
              </ul>
              {/* <div className="cta-form-wrap">
                <form
  className="cta-form"
  onSubmit={handleSubmit}
>
  
<div className="form-row">
   <input
  type="text"
  placeholder="Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

{errors.name && (
  <span className="error">{errors.name}</span>
)}
<input
  type="email"
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

{errors.email && (
  <span className="error">{errors.email}</span>
)}
                  </div>
                  <div className="form-row">
<select
  required
  value={countryCode}
  onChange={(e) => {
    setCountryCode(e.target.value);
    setBudget("");
  }}
>
  <option value="">Country Code</option>

  {countries.map((country) => (
    <option key={country.code} value={country.code}>
      {country.code} ({country.name})
    </option>
  ))}
</select>
{errors.countryCode && (
  <span className="form-error">
    {errors.countryCode}
  </span>
)}
<input
  type="tel"
  placeholder="Phone"
  value={phone}
  inputMode="numeric"
  maxLength={countryRules[countryCode]?.length || 15}
  onChange={(e) => {
    setPhone(e.target.value.replace(/\D/g, ""));
  }}
  onKeyDown={(e) => {
    if (
      !/[0-9]/.test(e.key) &&
      !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)
    ) {
      e.preventDefault();
    }
  }}
/>

{errors.phone && (
  <span className="error">{errors.phone}</span>
)}
                  </div>
                  <div className="form-row">
<select
  required
  value={budget}
  onChange={(e) => setBudget(e.target.value)}
>
  <option value="">Select Budget</option>

  {countryCode &&
    budgetOptions[countryRules[countryCode]?.budgetKey]?.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
</select>

{errors.budget && (
  <span className="form-error">
    {errors.budget}
  </span>
)}
                    <select
  required
  value={service}
  onChange={(e) => setService(e.target.value)}
>
  <option value="">Select Service</option>
  <option value="seo">iGaming SEO</option>
  <option value="meta">Meta Ads</option>
  <option value="telegram">
    Telegram & Community Marketing
  </option>
  <option value="affiliate">Affiliate Marketing</option>
  <option value="acquisition">Player Acquisition</option>
  <option value="creative">Creative Production</option>
  <option value="cro">Conversion Optimization</option>
</select>
                    {errors.service && (
  <span className="form-error">
    {errors.service}
  </span>
)}
                  </div>
                  <button
  type="submit"
  className="btn btn-primary"
  disabled={loading}
>
  {loading ? (
    "Submitting..."
  ) : (
    <>
      Take The First Step <ArrowRight size={16} />
    </>
  )}
</button>
{submitMessage && (
  <div
    className={
      submitStatus === "success"
        ? "submit-success"
        : "submit-error"
    }
  >
    {submitMessage}
  </div>
)}
                </form>
              </div> */}
              <LeadForm />
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
