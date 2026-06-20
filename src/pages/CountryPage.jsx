import { useParams, Link } from "react-router-dom"
import { CheckCircle, ArrowRight } from "lucide-react"

const countryData = {
  malta: {
    label: "Malta",
    heroTitle: "Digital Growth for Malta-Based",
    heroGold: "iGaming Operators",
    heroDesc: "Malta is home to many of the world's leading iGaming companies. We help operators strengthen their online presence, acquire new players across Europe, and expand into competitive international markets through performance-focused digital marketing.",
    heroImg: "Social-Media-Management-Bg.webp",
    img: "social-media-management.jpg",
    listTitle: "Our Malta Marketing Services",
    items: ["International SEO", "Affiliate Marketing", "European Player Acquisition", "Content Marketing", "PPC Campaign Management", "Brand Visibility Strategies"],
    subTitle: "Why Partner With Us",
    subText: "From SEO to acquisition campaigns, we create scalable marketing solutions tailored for Malta-based operators looking to grow across regulated European markets while maximizing ROI.",
    elevateTitle: "Expand Your iGaming Presence in",
    elevateGold: "Malta",
  },
  curacao: {
    label: "Curaçao",
    heroTitle: "Global Marketing for Curaçao",
    heroGold: "Licensed Operators",
    heroDesc: "Curaçao has become a popular licensing destination for international gaming businesses. We help operators reach new audiences with multilingual campaigns, localized strategies, and performance marketing designed for global expansion.",
    heroImg: "TMK-About-Us.webp",
    img: "google-ads.jpg",
    listTitle: "Our Curaçao Marketing Services",
    items: ["International SEO", "Multi-Language Content Marketing", "Paid Advertising Campaigns", "Affiliate Growth Programs", "Casino & Sportsbook Promotion", "Player Acquisition Strategies"],
    subTitle: "Expand Into New Markets",
    subText: "Whether targeting Europe, Asia, Latin America, or emerging markets, our marketing strategies help Curaçao-licensed operators build brand awareness, generate qualified traffic, and increase player retention.",
    elevateTitle: "Expand Your iGaming Presence in",
    elevateGold: "Curacao",
  },
  uk: {
    label: "United Kingdom",
    heroTitle: "Trusted iGaming Marketing for the",
    heroGold: "UK",
    heroDesc: "The United Kingdom remains one of the most mature and highly regulated iGaming markets. We help licensed operators build sustainable growth through compliant digital marketing strategies that increase visibility, attract qualified players, and strengthen long-term brand credibility.",
    heroImg: "TMK-About-Us.webp",
    img: "seo-services.jpg",
    listTitle: "Our UK Marketing Services",
    items: ["Casino SEO & Organic Growth", "Sportsbook PPC Campaigns", "Responsible Gambling Marketing", "Compliance-Focused Content", "Affiliate Marketing", "Brand Reputation Management"],
    subTitle: "Why Choose Us for the UK Market",
    subText: "Our team understands UKGC compliance, competitive search landscapes, and player behavior. We create data-driven campaigns that deliver quality traffic, improve conversions, and support sustainable growth while meeting industry regulations.",
    elevateTitle: "Expand Your iGaming Presence in",
    elevateGold: "United Kingdom",
  },
  india: {
    label: "India",
    heroTitle: "Accelerate Growth in India's Fastest Growing",
    heroGold: "Gaming Market",
    heroDesc: "India is one of the world's fastest-growing online gaming markets, driven by mobile users, cricket enthusiasts, and regional audiences. Our localized marketing strategies help operators connect with players across multiple languages and platforms.",
    heroImg: "Social-Media-Management-Bg.webp",
    img: "meta-ads.jpg",
    listTitle: "Our India Marketing Services",
    items: ["Cricket Betting SEO", "IPL Marketing Campaigns", "Sportsbook Promotions", "Online Casino Marketing", "Regional Language Content", "Performance Advertising"],
    subTitle: "Reach Millions of Indian Players",
    subText: "We combine local market expertise, SEO, paid media, and regional content strategies to help gaming brands attract high-quality users and build long-term engagement across India.",
    elevateTitle: "Expand Your iGaming Presence in",
    elevateGold: "India",
  },
  philippines: {
    label: "Philippines",
    heroTitle: "Performance Marketing for the Philippine",
    heroGold: "Gaming Industry",
    heroDesc: "The Philippines continues to be a significant hub for online gaming. We help operators increase player acquisition through localized campaigns, targeted advertising, and high-converting digital marketing strategies.",
    heroImg: "TMK-About-Us.webp",
    img: "telegram-ads.jpg",
    listTitle: "Our Philippines Marketing Services",
    items: ["Sports Betting Marketing", "Online Casino Promotion", "Localized SEO", "Filipino Content Marketing", "PPC Campaigns", "Player Retention Strategies"],
    subTitle: "Grow Your Presence in the Philippines",
    subText: "Our campaigns are designed around local player preferences, search behavior, and market trends, helping gaming brands generate more traffic, higher conversions, and stronger customer loyalty.",
    elevateTitle: "Expand Your iGaming Presence in",
    elevateGold: "Philippines",
  },
  us: {
    label: "United States",
    heroTitle: "Marketing Solutions for the Expanding US",
    heroGold: "iGaming Market",
    heroDesc: "The United States is one of the fastest-growing regulated betting markets, with new states opening opportunities for sportsbooks and online casinos. We help brands compete through targeted digital marketing and state-specific strategies.",
    heroImg: "Social-Media-Management-Bg.webp",
    img: "seo-services.jpg",
    listTitle: "Our US Marketing Services",
    items: ["Sportsbook SEO", "Online Casino SEO", "Paid Media Campaigns", "State-Level Marketing Strategies", "Affiliate Marketing", "Conversion Rate Optimization"],
    subTitle: "Drive Growth Across Regulated States",
    subText: "Our team develops scalable campaigns tailored to regulated US markets, helping operators attract qualified players, improve conversions, and build a strong digital presence in an increasingly competitive industry.",
    elevateTitle: "Expand Your iGaming Presence in",
    elevateGold: "United States",
  },
}

export default function CountryPage() {
  const { slug } = useParams()
  const data = countryData[slug]

  if (!data) {
    return (
      <section className="page-hero" style={{ minHeight: "40vh" }}>
        <div className="container">
          <div className="hero-content">
            <h1>Country <span className="gold">Not Found</span></h1>
            <p>The country page you're looking for doesn't exist.</p>
            <Link to="/countries" className="btn btn-primary">View All Countries</Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="page-hero">
        <img src={`/internal pages hero image/${data.heroImg}`} alt="" className="hero-bg-img" />
        <div className="container">
          <div className="hero-content">
            <h1>{data.heroTitle} <span className="gold">{data.heroGold}</span></h1>
            <p>{data.heroDesc}</p>
            <Link to="/contact" className="btn btn-primary">Get in Touch <ArrowRight /></Link>
          </div>
        </div>
      </section>

      <section className="content-section alt">
        <div className="container">
          <h2 className="section-title">{data.heroTitle} <span className="gold">{data.heroGold}</span></h2>
          <div className="content-row">
            <div className="text-content">
              <p>{data.heroDesc}</p>
              <h4>{data.listTitle}</h4>
              <ul>
                {data.items.map((item, i) => (
                  <li key={i}><CheckCircle size={16} style={{ color: "var(--primary)", flexShrink: 0 }} /> {item}</li>
                ))}
              </ul>
              <h4>{data.subTitle}</h4>
              <p>{data.subText}</p>
            </div>
            <img src={`/stock/${data.img}`} alt={`${data.label} Market`} className="content-image" />
          </div>
        </div>
      </section>

      <section className="elevate-section">
        <div className="container">
          <div className="elevate-inner">
            <div className="elevate-content">
              <p className="elevate-tag">Why Choose TMK</p>
              <h2 className="elevate-title">{data.elevateTitle} <span className="gold">{data.elevateGold}</span></h2>
              <p className="elevate-desc">The Marketing King delivers targeted digital marketing solutions for iGaming operators in {data.label}. From player acquisition to brand building, our strategies are designed to help you dominate the local market and achieve sustainable growth.</p>
              <Link to="/contact" className="elevate-btn">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
