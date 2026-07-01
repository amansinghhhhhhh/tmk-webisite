import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

const countries = [
  { id: "malta", label: "Malta", flag: "mt", desc: "Digital Growth for Malta-Based iGaming Operators" },
  { id: "curacao", label: "Curaçao", flag: "cw", desc: "Global Marketing for Curaçao Licensed Operators" },
  { id: "uk", label: "United Kingdom", flag: "gb", desc: "Trusted iGaming Marketing for the UK" },
  { id: "india", label: "India", flag: "in", desc: "Accelerate Growth in India's Gaming Market" },
  { id: "philippines", label: "Philippines", flag: "ph", desc: "Performance Marketing for the Philippine Gaming Industry" },
  { id: "us", label: "United States", flag: "us", desc: "Marketing Solutions for the Expanding US iGaming Market" },
]

export default function Countries() {
  return (
    <>
      <section className="page-hero">
        <img src="/internal pages hero image/Turnkey-Solutions-for-iGaming-Businesses.webp" alt="" className="hero-bg-img" />
        <div className="container">
          <div className="hero-content">
            <h1>Global <span className="gold">Markets</span></h1>
            <p>We help iGaming operators expand into regulated markets worldwide with localized strategies, compliant campaigns, and performance-driven marketing.</p>
          </div>
        </div>
      </section>

      <section className="content-section alt">
        <div className="container">
          <p className="section-label">Our Markets</p>
          <h2 className="section-title">Explore <span className="gold">Country Markets</span></h2>
          <div className="metrics-grid" style={{ gridTemplateColumns: "repeat(3,1fr)", gap: 24, marginTop: 48 }}>
            {countries.map((c) => (
              <Link key={c.id} to={`/countries/${c.id}`} className="industry-card" style={{ textDecoration: "none", display: "block" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                  <img
                    src={`https://cdn.jsdelivr.net/gh/lipis/flag-icons@main/flags/4x3/${c.flag}.svg`}
                    alt={c.label}
                    style={{ width: 48, height: 36, borderRadius: 6, objectFit: "cover" }}
                  />
                  <h4 style={{ margin: 0 }}>{c.label}</h4>
                </div>
                <p style={{ color: "#cfcfcf", fontSize: 15, lineHeight: 1.65 }}>{c.desc}</p>
                <div style={{ marginTop: 16, color: "var(--primary)", fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
                  Explore Market <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      

      <section className="elevate-section">
        <div className="container">
          <div className="elevate-inner">
            <div className="elevate-content">
              <p className="elevate-tag">Why Choose TMK</p>
              <h2 className="elevate-title">Expand Your iGaming Presence in <span className="gold">Global Markets</span></h2>
              <p className="elevate-desc">The Marketing King delivers targeted digital marketing solutions for iGaming operators in global markets. From player acquisition to brand building, our strategies are designed to help you dominate the local market and achieve sustainable growth.</p>
              <Link to="/contact" className="elevate-btn"><ArrowRight /> Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
