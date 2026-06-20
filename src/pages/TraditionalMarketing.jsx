import { Link } from "react-router-dom"
import { CheckCircle, ArrowRight } from "lucide-react"

const features = [
  { title: "Outdoor Advertising", desc: "Billboards, transit ads, and outdoor signage in key locations to build brand awareness and drive top-of-mind recall." },
  { title: "TV & Radio Campaigns", desc: "Broadcast advertising spots on sports channels, news networks, and radio stations targeting gaming audiences." },
  { title: "Print & Magazine", desc: "Full-page ads and sponsored content in gaming and sports publications to reach dedicated enthusiast communities." },
  { title: "Event Sponsorships", desc: "Sponsor gaming conferences, sports events, and industry meetups to put your brand in front of key stakeholders." },
  { title: "Branded Merchandise", desc: "Custom merchandise, giveaways, and promotional items that keep your brand top-of-mind with players and partners." },
  { title: "Strategic Partnerships", desc: "Cross-promotional partnerships with sports teams, celebrities, and complementary brands for mutual growth." },
]

export default function TraditionalMarketing() {
  return (
    <>
      <section className="page-hero">
        <img src="/internal pages hero image/Traditional-Marketing.webp" alt="" className="hero-bg-img" />
        <div className="container">
          <div className="hero-content">
            <h1>Traditional Marketing <span className="gold">for iGaming Brands</span></h1>
            <p>Combine the power of offline marketing with digital strategies. From billboards and print to event sponsorships and TV, we create integrated campaigns that build brand awareness and drive player acquisition.</p>
            <Link to="/contact" className="btn btn-primary">Get Started <ArrowRight /></Link>
          </div>
        </div>
      </section>

      <section className="content-section alt">
        <div className="container">
          <p className="section-label">What We Offer</p>
          <h2 className="section-title">Integrated Traditional <span className="gold">Marketing Solutions</span></h2>
          <p className="section-desc">We help iGaming brands leverage traditional marketing channels to build credibility, reach new audiences, and create memorable brand experiences that complement digital campaigns.</p>
          <div className="features-grid stagger">
            {features.map((f, i) => (
              <div className="feature-card" key={i}>
                <div className="fc-icon"><CheckCircle /></div>
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <p className="section-label">Why Traditional Marketing</p>
          <h2 className="section-title">Offline Meets Online <span className="gold">for Maximum Impact</span></h2>
          <div className="content-row">
            <div className="text-content">
              <p>Traditional marketing still plays a vital role in building brand awareness and credibility for iGaming businesses. Our traditional marketing services include offline advertising, event sponsorship, print media, and direct marketing campaigns that complement your digital efforts.</p>
              <p>We create integrated marketing campaigns that combine the best of traditional and digital channels to maximize your brand's reach. Our approach ensures consistent messaging across all touchpoints, building a strong and recognizable brand presence.</p>
              <ul>
                <li><CheckCircle size={16} style={{ color: "var(--primary)", flexShrink: 0 }} /> Print media and publication advertising</li>
                <li><CheckCircle size={16} style={{ color: "var(--primary)", flexShrink: 0 }} /> Event sponsorship and exhibition management</li>
                <li><CheckCircle size={16} style={{ color: "var(--primary)", flexShrink: 0 }} /> Direct mail and SMS marketing</li>
                <li><CheckCircle size={16} style={{ color: "var(--primary)", flexShrink: 0 }} /> Brand collaterals and merchandise</li>
                <li><CheckCircle size={16} style={{ color: "var(--primary)", flexShrink: 0 }} /> Integrated offline-online campaign strategy</li>
              </ul>
            </div>
            <img src="/stock/traditional-marketing.jpg" alt="" className="content-image" />
          </div>
        </div>
      </section>

      <section className="elevate-section">
        <div className="container">
          <div className="elevate-inner">
            <div className="elevate-content">
              <p className="elevate-tag">Why Choose TMK</p>
              <h2 className="elevate-title">Improve Your Brand with <span className="gold">Print & Broadcast Marketing</span></h2>
              <p className="elevate-desc">Engage your audience through powerful print ads, and traditional marketing strategies with The Marketing King. We craft compelling messages and promotions that drive maximum reach, impact, and brand recognition.</p>
              <Link to="/contact" className="elevate-btn">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
