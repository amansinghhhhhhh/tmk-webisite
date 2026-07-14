import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Target, Shield, Lightbulb, Handshake, Globe, BarChart3 } from 'lucide-react';
import SEO from "../components/SEO";

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
    <>
    <SEO
  title="About Us - The Marketing King"
  description="About Us About Us Founded in 2012, The Marketing King is a leading prominent global marketing agency. We specialize in providing immersive and engaging marketing solutions for the global sports industry, B2B industries, the Banking sector, and all the other industries. Positioned at the crossroads of the sports, media, banking, and betting sectors, The Marketing"
  canonical="https://themarketingking.org/about"
  ogTitle="About Us - The Marketing King"
  ogDescription="About Us About Us Founded in 2012, The Marketing King is a leading prominent global marketing agency. We specialize in providing immersive and engaging marketing solutions for the global sports industry, B2B industries, the Banking sector, and all the other industries. Positioned at the crossroads of the sports, media, banking, and betting sectors, The Marketing"
/>
    <div>
      <section className="page-hero">
        <img src="/internal pages hero image/TMK-About-Us.webp" alt="" className="hero-bg-img" />
        <div className="container">
          <div className="hero-content">
            {/* <h1>
              Your Partner in <span className="gold">iGaming Growth</span>
            </h1> */}
            <h1>
              About <span className="gold">Us</span>
            </h1>
            {/* <p>
              The Marketing King is a specialized iGaming marketing agency dedicated to helping
              casinos, sportsbooks, and gaming platforms acquire players, boost revenue, and
              scale globally.
            </p> */}
            {/* <Link to="/contact" className="btn btn-primary">
              Get in Touch <ArrowRight size={16} />
            </Link> */}
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
              Founded in 2012, The Marketing King is a leading prominent global marketing agency. We specialize in providing immersive and engaging marketing solutions for the global sports industry, B2B industries, the Banking sector, and all the other industries. Positioned at the crossroads of the sports, media, banking, and betting sectors, The Marketing King offers a comprehensive suite of top notch solutions to assist sports federations, news media outlets, consumer platforms, and sports betting operators in expanding their operations.
              </p>
              <p>
              Our clientele extends to over 110 companies and organizations with impressive results. By leveraging our extensive industry connections and expertise, we not only enhance your overall marketing but also uphold the integrity of your organization by positioning it as an authoritative figure amongst your competitors.
              </p>
              {/* <ul>
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
              </ul> */}
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
            What we <span className="gold">do</span>
          </h2>
          {/* <div className="values-grid">
            {values.map((v, i) => (
              <div className="value-card" key={i}>
                <div className="vc-icon">{v.icon}</div>
                <h4>{v.title}</h4>
                <p>{v.desc}</p>
              </div>
            ))}
          </div> */}

          < div className="what-we-do">
                <p>
                  <CheckCircle size={16} style={{ color: 'var(--primary)' }} /> We use data and technology to: Keep betting operators ahead of the curve with the products and services they need to manage their sportsbook
                </p>
                <p>
                  <CheckCircle size={16} style={{ color: 'var(--primary)' }} /> Give media companies the tools to engage more with fans
                </p>
                <p>
                  <CheckCircle size={16} style={{ color: 'var(--primary)' }} /> Give teams, leagues and federations the data they need to thrive
                </p>
                <p>
                  <CheckCircle size={16} style={{ color: 'var(--primary)' }} /> Keep the industry clean by detecting and preventing fraud, doping and match fixing.
                </p>
                <p>
                  <CheckCircle size={16} style={{ color: 'var(--primary)' }} /> And we’re constantly developing, reimagining and improving what we do  so that you’re always ahead of the game.
                </p>
              </div>
        </div>
      </section>

      <section className="elevate-section">
        <div className="container">
          <div className="elevate-inner">
            <div className="elevate-content">
              <p className="elevate-tag">Why Choose TMK</p>
              <h2 className="elevate-title">
                Our{' '}
                <span className="gold">People</span>
              </h2>
              <p className="elevate-desc">
                The Marketing King employs more than 110 full time employees in 20 countries, helping our clients and partners use our data and content to get more engagement and revenue from the sports they love.
              </p>
<p className="elevate-desc">We’re sports fans ourselves, which means we know how your audiences tick. And because we have the very best people in the industry, we can promise you ideas, an entrepreneurial attitude and unwavering dedication.</p>

              <a
                href="https://api.whatsapp.com/send?phone=447418622761&text=Hello%2C%20I%20Want%20Full%20Information%20About%20TMK."
                target="_blank"
                rel="noreferrer"
                className="elevate-btn"
              >
                Join Our Community
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
