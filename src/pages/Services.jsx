import { Link } from "react-router-dom"
import { Globe, Search, BarChart3, Send, Building2, MessageCircle, Star, Code, TrendingUp, Key, Gamepad2, ArrowRight } from "lucide-react"


const services = [
  {
    slug: "social-media-management-for-igaming-businesses",
    icon: Globe,
    title: "Social Media Management",
    desc: "Build and engage your community across all major social platforms with tailored content strategies."
  },
  {
    slug: "google-ads-for-igaming-businesses",
    icon: Search,
    title: "Google Ads",
    desc: "Dominate search results with high-intent PPC campaigns optimized for iGaming conversion."
  },
  {
    slug: "meta-ads-for-igaming-businesses",
    icon: BarChart3,
    title: "Meta Ads",
    desc: "Reach your ideal players on Facebook and Instagram with precision-targeted advertising."
  },
  {
    slug: "telegram-ads-for-igaming-businesses",
    icon: Send,
    title: "Telegram Ads",
    desc: "Connect with engaged communities through native Telegram advertising solutions."
  },
  {
    slug: "seo-services-for-igaming-businesses",
    icon: Search,
    title: "SEO Services",
    desc: "Build sustainable organic growth with iGaming-specific search engine optimization."
  },
  {
    slug: "meta-google-agency-accounts-for-igaming-businesses",
    icon: Building2,
    title: "Agency Accounts",
    desc: "Premium Meta and Google agency accounts with streamlined ad approvals."
  },
  {
    slug: "whatsapp-api-bulk-whatsapp-services-for-igaming-businesses",
    icon: MessageCircle,
    title: "WhatsApp API",
    desc: "Leverage WhatsApp's massive reach for marketing and customer communication."
  },
  {
    slug: "telegram-channel-promotion-live-line-api-for-igaming-businesses",
    icon: Send,
    title: "Telegram Promotion",
    desc: "Amplify your brand on Telegram through channel promotion and community growth."
  },
  {
    slug: "influencer-celebrity-marketing-for-igaming-businesses",
    icon: Star,
    title: "Influencer Marketing",
    desc: "Authentic partnerships with gaming influencers to drive real engagement."
  },
  {
    slug: "website-and-app-development-for-igaming-businesses",
    icon: Code,
    title: "Web Development",
    desc: "Custom websites and web applications built for the iGaming industry."
  },
  {
    slug: "digital-marketing-for-trading-business",
    icon: TrendingUp,
    title: "Trading Marketing",
    desc: "Specialized marketing for forex, CFD, and crypto trading platforms."
  },
  {
    slug: "turnkey-solutions-for-igaming-businesses",
    icon: Key,
    title: "Turnkey Solutions",
    desc: "Complete, ready-to-launch iGaming platforms with everything you need."
  },
  {
    slug: "igaming-software-solution-providers",
    icon: Gamepad2,
    title: "iGaming Software",
    desc: "Custom software development for casinos, sportsbooks, and gaming platforms."
  }
];

export default function Services() {
  return (
    <>
      <section className="page-hero">
        <img src="/internal pages hero image/Social-Media-Management-Bg.webp" alt="" className="hero-bg-img" />
        <div className="container">
          <div className="hero-content">
            <h1>Our Services <span className="gold">Solutions</span></h1>
            <p>Comprehensive iGaming marketing solutions to accelerate your brand's growth across every channel and market.</p>
          </div>
        </div>
      </section>

      <section className="content-section alt">
        <div className="container">
          <p className="section-label">What We Do</p>
          <h2 className="section-title">Full-Service iGaming <span className="gold">Marketing</span></h2>
          <p className="section-desc">From digital advertising to software development, we provide end-to-end marketing solutions for iGaming brands worldwide.</p>
          <div className="services-grid">
            {services.map((s) => {
              const Icon = s.icon
              return (
                <Link to={`/${s.slug}`} key={s.slug} className="feature-card">
                  <div className="service-card-icon fc-icon"><Icon /></div>
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="elevate-section">
        <div className="container">
          <div className="elevate-inner">
            <div className="elevate-content">
              <p className="elevate-tag">Why Choose TMK</p>
              <h2 className="elevate-title">Ready to Elevate Your <span className="gold">iGaming Brand?</span></h2>
              <p className="elevate-desc">Partner with The Marketing King and unlock data-driven strategies, expert execution, and measurable growth across every marketing channel.</p>
              <Link to="/contact" className="elevate-btn">Get Started <ArrowRight /></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
