import { Link } from "react-router-dom"
import { Star, ArrowRight } from "lucide-react"

const stats = [
  { num: "170K+", label: "Players Acquired" },
  { num: "300+", label: "FTDs Generated" },
  { num: "20+", label: "Countries Served" },
  { num: "5K+", label: "Campaigns Managed" },
]

const testimonials = [
  {
    initials: "MJ",
    name: "Michael Johnson",
    role: "CEO, NovaCasino Group",
    quote: "The Marketing King completely transformed our player acquisition strategy. Within three months, we saw a 40% increase in FTDs and our CPA dropped significantly. Their understanding of the iGaming space is unmatched.",
  },
  {
    initials: "SP",
    name: "Sarah Patel",
    role: "Marketing Director, BetSphere Ltd",
    quote: "We struggled with compliant marketing in regulated markets until we partnered with TMK. They handled everything from SEO to paid media with full UKGC compliance. Our organic traffic grew 200% in six months.",
  },
  {
    initials: "AK",
    name: "Alex Kovacs",
    role: "Head of Growth, WinZone Sports",
    quote: "Their Telegram and community marketing campaigns were a game-changer for our sportsbook. We built an engaged community of 50K+ members in just 8 weeks, and our deposit rates from that channel are outstanding.",
  },
  {
    initials: "RT",
    name: "Rahul Thakur",
    role: "Founder, CryptoPlay.io",
    quote: "TMK helped us launch our crypto casino from scratch. Their strategic approach to SEO, influencer partnerships, and paid campaigns delivered 10K+ registrations in the first month. Truly a world-class iGaming agency.",
  },
]

export default function OurClient() {
  return (
    <>
      <section className="page-hero">
        <img src="/internal pages hero image/Our-Client.webp" alt="" className="hero-bg-img" />
        <div className="container" style={{ marginLeft: 'auto', marginRight: 80 }}>
          <div className="hero-content">
            <h1>Trusted by Leading <span className="gold">iGaming Brands</span></h1>
            <p>We partner with ambitious iGaming operators worldwide — from emerging startups to established brands — helping them acquire players, boost revenue, and scale across global markets.</p>
            <Link to="/contact" className="btn btn-primary">Become Our Next Success Story <ArrowRight /></Link>
          </div>
        </div>
      </section>

      <section className="content-section alt">
        <div className="container">
          <p className="section-label">By the Numbers</p>
          <h2 className="section-title">Our Impact in <span className="gold">Numbers</span></h2>
          <div className="stats-mini stagger">
            {stats.map((s, i) => (
              <div className="stat-mini-card" key={i}>
                <div className="num">{s.num}</div>
                <p>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <p className="section-label">What Our Clients Say</p>
          <h2 className="section-title">Client <span className="gold">Testimonials</span></h2>
          <div className="testimonials-grid stagger">
            {testimonials.map((t, i) => (
              <div className="testimonial-card" key={i}>
                <div className="t-stars">
                  {[...Array(5)].map((_, si) => <Star key={si} size={14} fill="#fbbf24" color="#fbbf24" />)}
                </div>
                <div className="t-quote-icon">"</div>
                <p className="t-quote">{t.quote}</p>
                <div className="t-author">
                  <div className="t-avatar">{t.initials}</div>
                  <div className="t-info">
                    <div className="t-name">{t.name}</div>
                    <div className="t-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="elevate-section">
        <div className="container">
          <div className="elevate-inner">
            <div className="elevate-content">
              <p className="elevate-tag">Why Choose TMK</p>
              <h2 className="elevate-title">Trusted by Brands Worldwide <span className="gold">Confidential Partnerships</span></h2>
              <p className="elevate-desc">Due to the private nature of the iGaming industry, we maintain complete client confidentiality. Our work, performance, and long-term partnerships speak louder than public portfolios. If you'd like to know more, let's connect live.</p>
              <Link to="/contact" className="elevate-btn">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
