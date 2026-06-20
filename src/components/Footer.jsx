import { Link } from "react-router-dom";
import { MessageCircle, Send, Phone, Mail, MapPin } from "lucide-react";

const FaIcon = ({ type, size = 20 }) => {
  if (type === "facebook")
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    );
  if (type === "instagram")
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    );
  if (type === "linkedin")
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    );
  return null;
};

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <img
                src="/tmk-logo-with-Brand-name.png"
                alt="TMK"
                style={{ height: 44, marginBottom: 16 }}
              />
            </div>
            <p>
              The Marketing King is your expert partner in iGaming growth. We
              specialize in custom marketing for online casinos, trading, and
              gaming platforms — from player acquisition to retention,
              delivering strategies that drive real results.
            </p>
            <div className="social-row">
              <a
                href="https://facebook.com/themarketingkingg"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
              >
                <FaIcon type="facebook" />
              </a>
              <a
                href="https://instagram.com/the_marketing_king_"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
              >
                <FaIcon type="instagram" />
              </a>
              <a
                href="https://linkedin.com/company/the-marketing-king"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
              >
                <FaIcon type="linkedin" />
              </a>
              <a
                href="https://wa.me/447418622761"
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp"
              >
                <MessageCircle size={20} />
              </a>
              <a
                href="https://t.me/rickytmk"
                target="_blank"
                rel="noopener noreferrer"
                title="Telegram"
              >
                <Send size={20} />
              </a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <Link to="/services/google-ads">Google Ads</Link>
            <Link to="/services/meta-ads">Meta Ads</Link>
            <Link to="/services/seo-services">SEO Services</Link>
            <Link to="/services/web-development">Web Development</Link>
            <Link to="/services/telegram-ads">Telegram Ads</Link>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <Link to="/about">About Us</Link>
            <Link to="/blog">Blogs</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to="/join-our-community">Join Our Community</Link>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <a href="tel:+447418622761">
              <Phone size={14} style={{ marginRight: 10 }} /> +44 741 862 2761
            </a>
            <a href="mailto:Info@themarketingking.org">
              <Mail size={14} style={{ marginRight: 10 }} />{" "}
              Info@themarketingking.org
            </a>
            <Link to="#">
              <MapPin size={14} style={{ marginRight: 10 }} /> Dubai, UAE
            </Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; 2026{" "}
            <strong style={{ color: "var(--primary)" }}>
              THE MARKETING KING
            </strong>
            . All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <Link to="#">Privacy Policy</Link>
            <Link to="#">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
