import { ArrowRight, Phone, Mail, MapPin, MessageCircle, Send } from 'lucide-react';
import LeadForm from "../components/LeadForm";

const FaIcon = ({ type }) => {
  if (type === "facebook") return <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
  if (type === "instagram") return <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>;
  if (type === "linkedin") return <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
  return null;
};

export default function Contact() {
  return (
    <div>
      <section className="page-hero">
        <img src="/internal pages hero image/TMk-CONTACT-US.webp" alt="" className="hero-bg-img" />
        <div className="container">
          <div className="hero-content">
            <h1>
              Let's Grow Your <span className="gold">iGaming Brand</span>
            </h1>
            <p>
              Ready to scale your player acquisition, increase deposits, and dominate your
              market? Reach out to our team and let's build a strategy that delivers results.
            </p>
            <a href="#contact-form" className="btn btn-primary">
              Send a Message <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <section className="content-section contact-section" id="contact-form">
        <div className="container">
          <p className="section-label">Get in Touch</p>
          <h2 className="section-title">
            Let's Start a <span className="gold">Conversation</span>
          </h2>
          <div className="contact-grid">
            <div className="contact-info-card">
              <div className="ci-item">
                <div className="ci-icon">
                  <Phone size={18} />
                </div>
                <div className="ci-text">
                  <h4>Phone</h4>
                  <p>
                    <a href="tel:+447418622761">+44 741 862 2761</a>
                  </p>
                </div>
              </div>
              <div className="ci-item">
                <div className="ci-icon">
                  <Mail size={18} />
                </div>
                <div className="ci-text">
                  <h4>Email</h4>
                  <p>
                    <a href="mailto:Info@themarketingking.org">Info@themarketingking.org</a>
                  </p>
                </div>
              </div>
              <div className="ci-item">
                <div className="ci-icon">
                  <MapPin size={18} />
                </div>
                <div className="ci-text">
                  <h4>Location</h4>
                  <p>Dubai, UAE</p>
                </div>
              </div>
              <div className="ci-item">
                <div className="ci-icon">
                  <MessageCircle size={18} />
                </div>
                <div className="ci-text">
                  <h4>WhatsApp</h4>
                  <p>
                    <a href="https://wa.me/447418622761" target="_blank" rel="noreferrer">
                      +44 741 862 2761
                    </a>
                  </p>
                </div>
              </div>
              <div className="ci-item">
                <div className="ci-icon">
                  <Send size={18} />
                </div>
                <div className="ci-text">
                  <h4>Telegram</h4>
                  <p>
                    <a href="https://t.me/rickytmk" target="_blank" rel="noreferrer">
                      @rickytmk
                    </a>
                  </p>
                </div>
              </div>
              <div className="contact-social">
                <a href="https://facebook.com/themarketingkingg" target="_blank" rel="noreferrer">
                  <FaIcon type="facebook" />
                </a>
                <a href="https://instagram.com/the_marketing_king_" target="_blank" rel="noreferrer">
                  <FaIcon type="instagram" />
                </a>
                <a href="https://linkedin.com/company/the-marketing-king" target="_blank" rel="noreferrer">
                  <FaIcon type="linkedin" />
                </a>
              </div>
            </div>
            <div className="contact-form-wrap">
              <LeadForm />
            </div>
          </div>
        </div>
      </section>

      <section className="elevate-section">
        <div className="container">
          <div className="elevate-inner">
            <div className="elevate-content">
              <p className="elevate-tag">Why Choose TMK</p>
              <h2 className="elevate-title">
                Get in Touch with <span className="gold">The Marketing King</span>
              </h2>
              <p className="elevate-desc">
                Ready to scale your iGaming business? Fill out the form below and our team will
                get back to you within 24 hours with a customized marketing solution tailored to
                your needs.
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
