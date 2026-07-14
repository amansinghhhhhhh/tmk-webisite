import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  // Menu,
  X,
  Send,
  Search,
  Share2,
  Building2,
  MessageCircle,
  Star,
  Code,
  BarChart3,
  Key,
  Gamepad2,
  Users,
  Newspaper,
  Home,
  // Megaphone,
  FileText,
  Briefcase,
  Info,
  Phone,
} from "lucide-react";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  const services = [
    {
      name: "Social Media Management",
      path: "/social-media-management-for-igaming-businesses/",
      icon: <Share2 size={16} />,
    },
    {
      name: "Google Ads",
      path: "/google-ads-for-igaming-businesses/",
      icon: <Search size={16} />,
    },
    {
      name: "Meta Ads",
      path: "/meta-ads-for-igaming-businesses/",
      icon: <Share2 size={16} />,
    },
    {
      name: "Telegram Ads",
      path: "/telegram-ads-for-igaming-businesses/",
      icon: <Send size={16} />,
    },
    {
      name: "SEO Services",
      path: "/seo-services-for-igaming-businesses/",
      icon: <Search size={16} />,
    },
    {
      name: "Agency Accounts",
      path: "/meta-google-agency-accounts-for-igaming-businesses/",
      icon: <Building2 size={16} />,
    },
    {
      name: "WhatsApp API",
      path: "/whatsapp-api-bulk-whatsapp-services-for-igaming-businesses/",
      icon: <MessageCircle size={16} />,
    },
    {
      name: "Telegram Promotion",
      path: "/telegram-channel-promotion-live-line-api-for-igaming-businesses/",
      icon: <Send size={16} />,
    },
    {
      name: "Influencer Marketing",
      path: "/influencer-celebrity-marketing-for-igaming-businesses/",
      icon: <Star size={16} />,
    },
    {
      name: "Web Development",
      path: "/website-and-app-development-for-igaming-businesses/",
      icon: <Code size={16} />,
    },
    {
      name: "Trading Marketing",
      path: "/digital-marketing-for-trading-business/",
      icon: <BarChart3 size={16} />,
    },
    {
      name: "Turnkey Solutions",
      path: "/turnkey-solutions-for-igaming-businesses/",
      icon: <Key size={16} />,
    },
    {
      name: "iGaming Software",
      path: "/igaming-software-solution-providers/",
      icon: <Gamepad2 size={16} />,
    },
    // {
    //   name: "Traditional Marketing",
    //   path: "/traditional-marketing-for-igaming-businesses",
    //   icon: <BarChart3 size={16} />,
    // },
  ];

  return (
    <nav className={scrolled ? "scrolled" : ""}>
      <div className="container">
        <Link to="/" className="logo">
          <img src="/tmk-logo-with-Brand-name.png" alt="TMK" />
        </Link>
        <div className={`nav-links${mobileOpen ? " open" : ""}`}>
          <Link to="/" onClick={closeMobile}>
            <Home size={16} /> Home
          </Link>
          <div className="menu-item-has-children">
            <Link to="#services" onClick={closeMobile}>
              <Briefcase size={16} /> Services <ChevronDown size={12} />
            </Link>
            <div className="sub-menu">
              {services.map((s) => (
                <Link key={s.path} to={s.path} onClick={closeMobile}>
                  {s.icon} {s.name}
                </Link>
              ))}
            </div>
          </div>
          {/* <Link to="/traditional-marketing" onClick={closeMobile}>
            <Megaphone size={16} /> Traditional Marketing
          </Link> */}
          <div className="menu-item-has-children">
            <Link to="#blogs" onClick={closeMobile}>
              <FileText size={16} /> Blogs <ChevronDown size={12} />
            </Link>
            <div className="sub-menu">
              <Link to="/blogs" onClick={closeMobile}>
                <FileText size={16} /> Blogs
              </Link>
              <Link to="/news" onClick={closeMobile}>
                <Newspaper size={16} /> News
              </Link>
            </div>
          </div>
          <div className="menu-item-has-children">
            <Link to="#live-ads" onClick={closeMobile}>
              <Briefcase size={16} /> Our Work <ChevronDown size={12} />
            </Link>
            <div className="sub-menu">
              <Link to="/our-clients" onClick={closeMobile}>
                <Users size={16} /> Our Client
              </Link>
            </div>
          </div>
          <Link to="/about" onClick={closeMobile}>
            <Info size={16} /> About Us
          </Link>
          <Link to="/contact" onClick={closeMobile}>
            <Phone size={16} /> Contact Us
          </Link>
          <a
            href="https://api.whatsapp.com/send?phone=447418622761&text=Hello%2C%20I%20Want%20Full%20Information%20About%20TMK."
            className="nav-cta"
            onClick={closeMobile}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={16} /> Let's Connect
          </a>
        </div>
        <div className="hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? (
            <X size={22} color="#fff" />
          ) : (
            <>
              <span></span>
              <span></span>
              <span></span>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
