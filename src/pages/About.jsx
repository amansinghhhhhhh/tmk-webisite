import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Target, Shield, Lightbulb, Handshake, Globe, BarChart3 } from 'lucide-react';

const values = [
  { icon: <Target size={24} />, title: 'Results First', desc: 'Every campaign is measured against clear KPIs. We don\'t just deliver activity — we deliver outcomes that impact your bottom line.' },
  { icon: <Shield size={24} />, title: 'Compliance Always', desc: 'We navigate complex regulatory environments with confidence, ensuring every campaign meets platform and legal requirements.' },
  { icon: <Lightbulb size={24} />, title: 'Innovation Driven', desc: 'The iGaming landscape evolves rapidly. We stay ahead of trends, tools, and tactics to keep our clients competitive.' },
  { icon: <Handshake size={24} />, title: 'True Partnership', desc: 'We treat our clients as partners, sharing transparent reporting, honest insights, and collaborative strategy development.' },
  { icon: <Globe size={24} />, title: 'Global Perspective', desc: 'With experience across 20+ countries, we bring a global view to every campaign while respecting local market nuances.' },
  { icon: <BarChart3 size={24} />, title: 'Data Obsessed', desc: 'Every decision is backed by data. We analyze, test, and optimize continuously to maximize ROI for every dollar spent.' },
];

export default function About() {
  return (
    <div>
      <section className="page-hero">
        <img src="/internal pages hero image/TMK-About-Us.webp" alt="" className="hero-bg-img" />
        <div className="container">
          <div className="hero-content">
            <h1>
              Your Partner in <span className="gold">iGaming Growth</span>
            </h1>
            <p>
              The Marketing King is a specialized iGaming marketing agency dedicated to helping
              casinos, sportsbooks, and gaming platforms acquire players, boost revenue, and
              scale globally.
            </p>
            <Link to="/contact" className="btn btn-primary">
              Get in Touch <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="content-section alt">
        <div className="container">
          <p className="section-label">Our Story</p>
          <h2 className="section-title">
            What Drives <span className="gold">Us Forward</span>
          </h2>
          <div className="content-row">
            <div className="text-content">
              <p>
                The Marketing King is a specialized iGaming marketing agency dedicated to helping
                online casinos, sportsbooks, and gaming platforms grow their player base and
                revenue. With years of industry experience, we understand the unique challenges
                and opportunities in the iGaming space.
              </p>
              <p>
                Our team combines deep industry knowledge with cutting-edge marketing strategies
                to deliver measurable results for our clients. We believe in transparent
                reporting, data-driven decisions, and building long-term partnerships with every
                brand we work with.
              </p>
              <ul>
                <li>
                  <CheckCircle size={14} style={{ color: 'var(--primary)' }} /> 11+ years of
                  iGaming industry experience
                </li>
                <li>
                  <CheckCircle size={14} style={{ color: 'var(--primary)' }} /> Specialized in
                  gambling marketing compliance
                </li>
                <li>
                  <CheckCircle size={14} style={{ color: 'var(--primary)' }} /> 360-degree
                  marketing solutions
                </li>
                <li>
                  <CheckCircle size={14} style={{ color: 'var(--primary)' }} /> Results-driven
                  approach with transparent reporting
                </li>
                <li>
                  <CheckCircle size={14} style={{ color: 'var(--primary)' }} /> Trusted by
                  leading iGaming brands worldwide
                </li>
              </ul>
            </div>
            <img
              src="/stock/about.jpg"
              alt="About TMK"
              className="content-image"
            />
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <p className="section-label">Our Values</p>
          <h2 className="section-title">
            What Drives <span className="gold">Us Forward</span>
          </h2>
          <div className="values-grid">
            {values.map((v, i) => (
              <div className="value-card" key={i}>
                <div className="vc-icon">{v.icon}</div>
                <h4>{v.title}</h4>
                <p>{v.desc}</p>
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
              <h2 className="elevate-title">
                Partner with The Marketing King for{' '}
                <span className="gold">Proven iGaming Growth</span>
              </h2>
              <p className="elevate-desc">
                With 11+ years of industry experience and 110+ full-time employees across 20
                countries, we help sports federations, media outlets, and betting operators
                expand their operations. Join our community and take your brand to the next
                level.
              </p>
              <a
                href="https://api.whatsapp.com/send?phone=447418622761&text=Hello%2C%20I%20Want%20Full%20Information%20About%20TMK."
                target="_blank"
                rel="noreferrer"
                className="elevate-btn"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
