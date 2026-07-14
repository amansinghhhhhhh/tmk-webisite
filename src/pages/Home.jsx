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
    q: "What makes you the Top Digital Marketing Agency in iGaming compared to traditional providers?",
    a: "Unlike generalist providers, we operate as a highly specialized iGaming Marketing Agency and dedicated Casino Marketing Company. Traditional agencies waste ad spend testing broad strategies; as the Best Digital Marketing Agency in iGaming, 100% of our infrastructure is engineered to clear gambling restrictions, lower your Cost Per Acquisition (CPA), and drive high intent players directly to your platform.",
  },
  {
    q: "What types of iGaming software solutions and platforms do you support?",
    a: "We deliver robust player acquisition services across all major infrastructure setups. Whether you run a fully customized setup or utilize a white label sportsbook, a white label iGaming platform, or comprehensive iGaming white label solutions, our campaigns integrate seamlessly. We optimize marketing pipelines for operators partnering with any leading turnkey solutions provider or sportsbook software architecture to maximize registration to deposit percentages.",
  },
  {
    q: "How do your casino seo services build sustainable, organic domain authority?",
    a: "Our specialized casino seo agency and dedicated sportsbook seo agency build long term traffic pipelines that outrank the competition. We combine high intent online casino seo keyword strategies with a deep understanding of betting search behaviors. Our comprehensive gambling seo agency and betting seo services ensure your domain commands authority in search engines without relying solely on paid ads.",
  },
  {
    q: "What is included in your technical seo agency and site audit packages?",
    a: "Search engine algorithms evaluate gaming platforms rigorously. Our technical seo agency provides comprehensive seo site audit services and deep website seo audit deployments to uncover hidden crawling or indexing blocks. From executing enterprise technical seo for massive platforms to fine tuning localized performance, our technical seo services ensure your platform is built for maximum search engine indexation.",
  },
  {
    q: "How does your on page seo agency maximize content visibility?",
    a: "Driving traffic requires extreme relevance. Our on page seo agency delivers premium on page seo services alongside comprehensive seo content optimization to ensure every page aligns perfectly with player intent. By utilizing advanced semantic keywords and data backed structures, our seo optimization services transform standard landing pages into highly visible, high ranking user pipelines.",
  },
  {
    q: "Can you help our brand scale globally with casino link building services?",
    a: "Yes. Off page authority is critical to surviving search updates. We provide elite seo outreach services and white hat link building tailored specifically for the gaming sector. Our targeted casino link building services and sportsbook link building deploy high authority backlink networks that signal trust and dominance to search engines, safely escalating your organic rankings.",
  },
  {
    q: "How does your affiliate management agency accelerate partner acquisition?",
    a: "Affiliates drive massive volume. Our specialized affiliate marketing agency offers complete affiliate management services and aggressive affiliate partner recruitment. From launching optimized programs to providing precise affiliate program management, our affiliate management agency handles targeted casino affiliate recruitment and affiliate acquisition services to systematically build a high yielding, continuous referral ecosystem.",
  },
  {
    q: "What strategies do you use for sportsbook and casino player acquisition?",
    a: "We run multi layered casino lead generation and targeted casino traffic generation to capture users at the exact moment of intent. Our multi channel frameworks handle high velocity sportsbook player acquisition, sportsbook lead generation, and global betting traffic generation. By optimizing every touchpoint, we ensure a lower cost per online casino customer acquisition and steady, scalable sportsbook customer acquisition volume.",
  },
  {
    q: "How do your casino ppc agency and programmatic media buying services function?",
    a: "Navigating strict platform guidelines requires specialized infrastructure. Our ppc agency offers elite ppc management services and whitelisted google ads management services. Supported by our programmatic advertising agency, we use advanced programmatic media buying frameworks to place high impact ads across premium networks. Our casino ppc agency and casino programmatic advertising solutions bypass traditional ad blocks to keep your player acquisition pipelines running continuously.",
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
  "/certification/WhatsApp Image 2026-06-17 at 6.48.24 PM.jpeg",
  "/certification/WhatsApp Image 2026-06-17 at 6.48.24 PM (1).jpeg",
  "/certification/WhatsApp Image 2026-06-17 at 6.48.24 PM (2).jpeg",
  "/certification/WhatsApp Image 2026-06-17 at 6.48.24 PM (3).jpeg",
  "/certification/WhatsApp Image 2026-06-17 at 6.48.24 PM (4).jpeg",
  "/certification/WhatsApp Image 2026-06-17 at 6.48.24 PM (5).jpeg",
];

export default function Home() {
  const navigate = useNavigate();

  const [service, setService] = useState("");

  const [blogPosts, setBlogPosts] = useState([]);
  const [blogLoading, setBlogLoading] = useState(true);

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
    } catch (e) {
      /* empty */
    }
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
    } catch (e) {
      /* empty */
    }
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
    } catch (e) {
      /* empty */
    }
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
    } catch (e) {
      /* empty */
    }

    if (typeof window !== "undefined") {
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

    return () => {};
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
        title="The Marketing King | iGaming Traffic Provider in India"
        description="TMK is your go to iGaming traffic provider in India. With the practical SEO strategies, our team provides conversations & leads to your igaming platform."
        canonical="https://themarketingking.org/"
        schema={faqSchema}
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
                  to="/countries/us"
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
                  />
                  United States
                </Link>

                {/* United Kingdom */}
                <Link
                  to="/countries/uk"
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
                <Link
                  to="/countries/india"
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
                  />
                  India
                </Link>

                {/* Malta */}
                <Link
                  to="/countries/malta"
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
                  />
                  Malta
                </Link>

                {/* Philippines */}
                <Link
                  to="/countries/philippines"
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
                      />
                    </span>
                    <h4>Online Casinos</h4>
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
                      />
                    </span>
                    <h4>Sportsbooks</h4>
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
                      />
                    </span>
                    <h4>Fantasy Sports</h4>
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
                      />
                    </span>
                    <h4>Crypto Casinos</h4>
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
                      />
                    </span>
                    <h4>Sweepstakes Casinos</h4>
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
                        src="/ICON 3D/poker-playing-cards-3d-icon-png-download-11901378.png"
                        alt=""
                      />
                    </span>
                    <h4>Poker Platforms</h4>
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
                        src="/ICON 3D/gaming-online-course-3d-icon-png-download-9859833.png"
                        alt=""
                      />
                    </span>
                    <h4>Skill Gaming</h4>
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
                At TMK, a leading iGaming Marketing Agency in India, we
                specialize in player acquisition services for gaming brands
                worldwide. Our casino SEO services and iGaming SEO services are
                combined with high performance PPC, Meta Ads, Telegram Ads,
                affiliate marketing, and influencer campaigns to scale online
                casinos, sportsbooks, poker rooms, fantasy sports, and crypto
                gaming platforms across competitive global GEOs. We build data
                driven frameworks focused on lowering CPA, increasing sign ups,
                and maximizing long term player LTV. With fully managed ad
                accounts, compliance ready strategies, and high intent traffic
                generation systems, we help brands achieve predictable growth,
                stronger visibility, and sustainable dominance in the iGaming
                industry.
              </p>
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
                    <div className="services-slide-inner">
                      <div className="s-icon">
                        <img
                          src="service-img/seo-3d-icon-png-download-5528528.webp"
                          alt="SEO"
                        />
                      </div>
                      <h2>iGaming SEO</h2>
                      <p>
                        Enhance your search engine visibility and get highly
                        targeted organic traffic via SEO techniques, content
                        marketing, building authority and strategically
                        optimized keywords.
                      </p>
                    </div>
                  </div>

                  <div className="swiper-slide services-slide">
                    <div className="services-slide-inner">
                      <div className="s-icon">
                        <img
                          src="service-img/free-meta-3d-icon-png-download-8250233.webp"
                          alt="Meta Ads"
                        />
                      </div>
                      <h2>Meta Ads</h2>
                      <p>
                        Get qualified players to sign up with precisely specific
                        Facebook and Instagram ads that are designed to maximize
                        results and conversions.
                      </p>
                    </div>
                  </div>

                  <div className="swiper-slide services-slide">
                    <div className="services-slide-inner">
                      <div className="s-icon">
                        <img
                          src="service-img/free-telegram-3d-icon-png-download-7516821.webp"
                          alt="Telegram"
                        />
                      </div>
                      <h2>Telegram & Community Marketing</h2>
                      <p>
                        Create active gaming communities that improve trust,
                        engagement, and retention of players.
                      </p>
                    </div>
                  </div>

                  <div className="swiper-slide services-slide">
                    <div className="services-slide-inner">
                      <div className="s-icon">
                        <img
                          src="service-img/share-affiliate-marketing-3d-icon-png-download-13747491.webp"
                          alt="Affiliate"
                        />
                      </div>
                      <h2>iGaming Affiliate Network</h2>
                      <p>
                        Scale player acquisition through affiliate marketing
                        with recruitment, partner management, tracking,
                        commissions, and compliance monitoring.
                      </p>
                    </div>
                  </div>

                  <div className="swiper-slide services-slide">
                    <div className="services-slide-inner">
                      <div className="s-icon">
                        <img
                          src="service-img/social-media-marketing-3d-icon-png-download-5013080.webp"
                          alt="Player Acquisition"
                        />
                      </div>
                      <h2>Player Acquisition</h2>
                      <p>
                        Get quality users by implementing multi channel
                        campaigns that aim to boost registrations and deposits
                        while reducing costs for acquisition.
                      </p>
                    </div>
                  </div>

                  <div className="swiper-slide services-slide">
                    <div className="services-slide-inner">
                      <div className="s-icon">
                        <img
                          src="service-img/creative-process-3d-icon-png-download-12387423.webp"
                          alt="Creative"
                        />
                      </div>
                      <h2>Creative Production</h2>
                      <p>
                        Creative assets that perform well and are specifically
                        designed for gaming users.
                      </p>
                    </div>
                  </div>

                  <div className="swiper-slide services-slide">
                    <div className="services-slide-inner">
                      <div className="s-icon">
                        <img
                          src="service-img/3d-google-ads icon.PNG"
                          alt="Conversion"
                        />
                      </div>
                      <h2>Conversion Optimization</h2>
                      <p>
                        Change website visitors into depositing customers with
                        UX improvement and conversion focused strategies.
                      </p>
                    </div>
                  </div>

                  <div className="swiper-slide services-slide">
                    <div className="services-slide-inner">
                      <div className="s-icon">
                        <img
                          src="service-img/recruitment-agency-3d-icon-png-download-12031451.webp"
                          alt="Agency"
                        />
                      </div>
                      <h2>Meta & Google Agency Accounts</h2>
                      <p>
                        Managed agency accounts with streamlined ad approvals
                        specifically for iGaming brands across major platforms.
                      </p>
                    </div>
                  </div>

                  <div className="swiper-slide services-slide">
                    <div className="services-slide-inner">
                      <div className="s-icon">
                        <img
                          src="service-img/Influencer-Marketing.png"
                          alt="Influencer Marketing"
                        />
                      </div>
                      <h2>Influencer Marketing</h2>
                      <p>
                        Drive brand awareness and player acquisition through
                        trusted influencers.
                      </p>
                    </div>
                  </div>

                  <div className="swiper-slide services-slide">
                    <div className="services-slide-inner">
                      <div className="s-icon">
                        <img
                          src="service-img/Web-Development.png"
                          alt="Web Development"
                        />
                      </div>
                      <h2>Web Development</h2>
                      <p>
                        Build fast, responsive websites optimized for
                        performance and conversions.
                      </p>
                    </div>
                  </div>

                  <div className="swiper-slide services-slide">
                    <div className="services-slide-inner">
                      <div className="s-icon">
                        <img
                          src="service-img/Trading-Marketing.png"
                          alt="Trending Marketing"
                        />
                      </div>
                      <h2>Trending Marketing</h2>
                      <p>
                        Reach more players with trend-driven campaigns and viral
                        content.
                      </p>
                    </div>
                  </div>

                  <div className="swiper-slide services-slide">
                    <div className="services-slide-inner">
                      <div className="s-icon">
                        <img
                          src="service-img/Turnkey-Solutions.png"
                          alt="Turnkey Solutions"
                        />
                      </div>
                      <h2>Turnkey Solutions</h2>
                      <p>
                        Complete iGaming solutions from setup to marketing and
                        growth.
                      </p>
                    </div>
                  </div>

                  <div className="swiper-slide services-slide">
                    <div className="services-slide-inner">
                      <div className="s-icon">
                        <img
                          src="service-img/iGaming-Software.png"
                          alt="iGaming Software"
                        />
                      </div>
                      <h2>iGaming Software</h2>
                      <p>
                        Powering the future of iGaming with secure, scalable,
                        and innovative software solutions.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="swiper-pagination services-pagination"></div>
              </div>

              <ul className="services-fan">
                <li>
                  <div className="pos-rel">
                    <div className="txtBox">
                      <div className="s-icon">
                        <img
                          src="service image/social-media-marketing-3d-icon-png-download-5013080.webp"
                          alt="Social Media"
                        />
                      </div>
                      <h2>iGaming Social Media</h2>
                      <p>
                        Turn casual scrolling into active player onboarding. We
                        design and execute targeted social media campaigns
                        engineered to scale brand trust and fuel your FTD funnel
                      </p>
                    </div>
                    <picture className="cardImg">
                      <img
                        src="poker cards/1.webp"
                        alt="Social Media Management"
                      />
                    </picture>
                  </div>
                </li>

                <li>
                  <div className="pos-rel">
                    <div className="txtBox">
                      <div className="s-icon">
                        <img
                          src="service image/3d-google-ads icon.PNG"
                          alt="Google Ads"
                        />
                      </div>
                      <h2>iGaming Google Ads</h2>
                      <p>
                        Get qualified players to sign up with precisely specific
                        Facebook and Instagram ads that are designed to maximize
                        results and conversions.
                      </p>
                    </div>
                    <picture className="cardImg">
                      <img src="poker cards/2.webp" alt="Google Ads" />
                    </picture>
                  </div>
                </li>

                <li>
                  <div className="pos-rel">
                    <div className="txtBox">
                      <div className="s-icon">
                        <img
                          src="service image/free-meta-3d-icon-png-download-8250233.webp"
                          alt="Meta Ads"
                        />
                      </div>
                      <h2>iGaming Meta Ads </h2>
                      <p>
                        Drive player sign ups using Facebook and Instagram ads
                        with targeting, retargeting, and conversion
                        optimization.
                      </p>
                    </div>
                    <picture className="cardImg">
                      <img src="poker cards/3.webp" alt="Meta Ads" />
                    </picture>
                  </div>
                </li>

                <li>
                  <div className="pos-rel">
                    <div className="txtBox">
                      <div className="s-icon">
                        <img
                          src="service image/free-telegram-3d-icon-png-download-7516821.webp"
                          alt="Telegram Ads"
                        />
                      </div>
                      <h2>Telegram Ads</h2>
                      <p>
                        Targeted Telegram acquisition funnels for betting
                        communities.
                      </p>
                    </div>
                    <picture className="cardImg">
                      <img src="poker cards/4.webp" alt="Telegram Ads" />
                    </picture>
                  </div>
                </li>

                <li>
                  <div className="pos-rel">
                    <div className="txtBox">
                      <div className="s-icon">
                        <img
                          src="service image/seo-3d-icon-png-download-5528528.webp"
                          alt="SEO"
                        />
                      </div>
                      <h2>iGaming SEO Services</h2>
                      <p>
                        Improve search visibility with casino SEO, sportsbook
                        SEO, content marketing, technical SEO, and optimization
                        services.
                      </p>
                    </div>
                    <picture className="cardImg">
                      <img src="poker cards/5.webp" alt="SEO Services" />
                    </picture>
                  </div>
                </li>

                <li>
                  <div className="pos-rel">
                    <div className="txtBox">
                      <div className="s-icon">
                        <img
                          src="service image/recruitment-agency-3d-icon-png-download-12031451.webp"
                          alt="Agency Accounts"
                        />
                      </div>
                      <h2>Managed iGaming Ad Accounts</h2>
                      <p>
                        Protect iGaming campaigns with premium agency accounts,
                        whitelists, fast approvals, and global compliance ready
                        advertising access.
                      </p>
                    </div>
                    <picture className="cardImg">
                      <img src="poker cards/6.webp" alt="Agency Accounts" />
                    </picture>
                  </div>
                </li>

                <li>
                  <div className="pos-rel">
                    <div className="txtBox">
                      <div className="s-icon">
                        <img
                          src="service-img/WhatsApp-API.png"
                          alt="Whatsapp API"
                        />
                      </div>
                      <h2>Whatsapp API</h2>
                      <p>
                        Automate customer engagement with promotions,
                        notifications, and instant support.
                      </p>
                    </div>
                    <picture className="cardImg">
                      <img src="poker cards/7.webp" alt="Whatsapp API" />
                    </picture>
                  </div>
                </li>

                <li>
                  <div className="pos-rel">
                    <div className="txtBox">
                      <div className="s-icon">
                        <img
                          src="service-img/Telegram-Channel-Promotion.png"
                          alt="Telegram promotion"
                        />
                      </div>
                      <h2>iGaming Telegram Marketing</h2>
                      <p>
                        Build gaming communities with Telegram, Discord, Web3
                        marketing, influencer collaborations, and community
                        management.
                      </p>
                    </div>
                    <picture className="cardImg">
                      <img src="poker cards/8.webp" alt="Creative" />
                    </picture>
                  </div>
                </li>

                <li>
                  <div className="pos-rel">
                    <div className="txtBox">
                      <div className="s-icon">
                        <img
                          src="service-img/Influencer-Marketing.png"
                          alt="Influencer Marketing"
                        />
                      </div>
                      <h2>Influencer Marketing</h2>
                      <p>
                        Drive brand awareness and player acquisition through
                        trusted influencers.
                      </p>
                    </div>
                    <picture className="cardImg">
                      <img
                        src="poker cards/9.webp"
                        alt="Influencer Marketing"
                      />
                    </picture>
                  </div>
                </li>

                <li>
                  <div className="pos-rel">
                    <div className="txtBox">
                      <div className="s-icon">
                        <img
                          src="service-img/Web-Development.png"
                          alt="Web Development"
                        />
                      </div>
                      <h2>Web Development</h2>
                      <p>
                        Build fast, responsive websites optimized for
                        performance and conversions.
                      </p>
                    </div>
                    <picture className="cardImg">
                      <img src="poker cards/10.webp" alt="Web Development" />
                    </picture>
                  </div>
                </li>

                <li>
                  <div className="pos-rel">
                    <div className="txtBox">
                      <div className="s-icon">
                        <img
                          src="service-img/Trading-Marketing.png"
                          alt="Trending Marketing"
                        />
                      </div>
                      <h2>Trending Marketing</h2>
                      <p>
                        Reach more players with trend driven campaigns and viral
                        content.
                      </p>
                    </div>
                    <picture className="cardImg">
                      <img src="poker cards/j.webp" alt="Trending Marketing" />
                    </picture>
                  </div>
                </li>

                <li>
                  <div className="pos-rel">
                    <div className="txtBox">
                      <div className="s-icon">
                        <img
                          src="service-img/Turnkey-Solutions.png"
                          alt="Turnkey Solutions"
                        />
                      </div>
                      <h2>Turnkey Solutions</h2>
                      <p>
                        Complete iGaming solutions from setup to marketing and
                        growth.
                      </p>
                    </div>
                    <picture className="cardImg">
                      <img src="poker cards/q.webp" alt="Turnkey Solutions" />
                    </picture>
                  </div>
                </li>

                <li>
                  <div className="pos-rel">
                    <div className="txtBox">
                      <div className="s-icon">
                        <img
                          src="service-img/iGaming-Software.png"
                          alt="iGaming Software"
                        />
                      </div>
                      <h2>iGaming Software</h2>
                      <p>
                        Powering the future of iGaming with secure, scalable,
                        and innovative software solutions.
                      </p>
                    </div>
                    <picture className="cardImg">
                      <img src="poker cards/k.webp" alt="iGaming Software" />
                    </picture>
                  </div>
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
                Successful player acquisition takes more than clicks. Our
                campaigns are created to yield tangible results deposits,
                registrations, engagement, and long term retention across gaming
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
                      <p>Results driven campaign delivering quality traffic.</p>
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
                      <p>Performance driven campaign with measurable growth.</p>
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
                      <p>
                        Innovative creatives optimized for high conversions.
                      </p>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <img
                      src="/live-ads/Best-iGaming-Marketing-Agency-in-India-6.webp"
                      alt="Ad 6"
                    />
                    <div className="slide-body">
                      <h3>Ad Campaign 6</h3>
                      <p>Data backed campaigns driving user acquisition.</p>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <img
                      src="/live-ads/Best-iGaming-Marketing-Agency-in-India-7.webp"
                      alt="Ad 7"
                    />
                    <div className="slide-body">
                      <h3>Ad Campaign 7</h3>
                      <p>
                        Strategic placements targeting high value audiences.
                      </p>
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
                      <p>End to end solutions from strategy to execution.</p>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <img
                      src="/live-ads/Best-iGaming-Marketing-Agency-in-India-11.webp"
                      alt="Ad 11"
                    />
                    <div className="slide-body">
                      <h3>Ad Campaign 11</h3>
                      <p>High impact ads for competitive iGaming markets.</p>
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
                In iGaming, success goes beyond clicks. Our campaigns deliver
                real results deposits, registrations, engagement, and long term
                retention across global gaming verticals and GEOs.
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
                        <img src={e.img} alt={e.title} />
                      </div>
                      <h4>{e.title}</h4>
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
                  <h4>Audit & Analysis</h4>
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
                  <h4>Architecture & Strategy</h4>
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
                  <h4>Launch & Target</h4>
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
                  <h4>Optimize & Accelerate</h4>
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
                  <h4>Report & Expand</h4>
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
                    <div
                      className="blog-card"
                      key={i}
                      style={{ minHeight: 360 }}
                    />
                  ))
                : blogPosts.slice(0, 3).map((post) => (
                    <Link
                      to={`/blog/${post.slug}`}
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
                          />
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
              <Link to="/blogs" className="btn btn-outline">
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
                <img src="/image/10.jpg" alt="iGaming Growth" />
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
