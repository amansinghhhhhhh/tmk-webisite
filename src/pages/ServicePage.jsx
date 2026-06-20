import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { CheckCircle, ArrowRight } from "lucide-react"
import { fetchService, getMediaUrl, mapService } from "../api/wordpress"

export default function ServicePage() {
  const { slug } = useParams()
  const [service, setService] = useState(null)
  const [bannerImg, setBannerImg] = useState("")
  const [contentImg, setContentImg] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    setService(null)
    setBannerImg("")
    setContentImg("")

    fetchService(slug)
      .then((s) => {
        if (!s) {
          setLoading(false)
          return
        }
        const mapped = mapService(s)
        setService(mapped)

        const acf = s.acf || {}
        const promises = []
        if (acf.banner_image) promises.push(getMediaUrl(acf.banner_image).then(setBannerImg))
        if (acf.why_choose_us_image) promises.push(getMediaUrl(acf.why_choose_us_image).then(setContentImg))
        return Promise.all(promises)
      })
      .then(() => setLoading(false))
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [slug])

  if (loading) {
    return (
      <section className="page-hero" style={{ minHeight: "60vh" }}>
        <div className="container">
          <div className="hero-content" style={{ textAlign: "center" }}>
            <p style={{ color: "#999", fontSize: 18 }}>Loading...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error || !service) {
    return (
      <section className="page-hero" style={{ minHeight: "40vh" }}>
        <div className="container">
          <div className="hero-content">
            <h1>Service <span className="gold">Not Found</span></h1>
            <p>The service you're looking for doesn't exist.</p>
            <Link to="/services" className="btn btn-primary">View All Services</Link>
          </div>
        </div>
      </section>
    )
  }

  const acf = service.acf
  const features = acf.we_offer_card || []
  const whyDesc = acf.why_choose_us_description || ""
  const whyPointers = acf.why_choose_us_pointers || ""
  const hasWhySection = whyDesc || whyPointers || contentImg
  const hasElevate = acf.why_choose_tmk_title || acf.why_choose_tmk_description

  const heroBg = bannerImg || `/internal pages hero image/${slug}.webp`

  return (
    <>
      <section className="page-hero">
        <img src={heroBg} alt="" className="hero-bg-img" />
        <div className="container">
          <div className="hero-content">
            <h1>{acf.banner_heading || service.title}</h1>
            <p>{acf.banner_description}</p>
            <Link to="/contact" className="btn btn-primary">Get Started <ArrowRight /></Link>
          </div>
        </div>
      </section>

      {features.length > 0 && (
        <section className="content-section alt">
          <div className="container">
            <p className="section-label">{acf.we_offer_label || "What We Offer"}</p>
            <h2 className="section-title">{acf.we_offer_title}</h2>
            {acf.we_offer_description && (
              <p className="section-desc">{acf.we_offer_description.replace(/<[^>]+>/g, "")}</p>
            )}
            <div className="features-grid stagger">
              {features.map((f, i) => (
                <div className="feature-card" key={i}>
                  <div className="fc-icon"><CheckCircle /></div>
                  <h4>{f.we_offer_card_title}</h4>
                  <p>{f.we_offer_card_description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {hasWhySection && (
        <section className="content-section">
          <div className="container">
            {acf.why_choose_us_label && <p className="section-label">{acf.why_choose_us_label}</p>}
            {acf.why_choose_us_title && (
              <h2 className="section-title">{acf.why_choose_us_title}</h2>
            )}
            <div className="content-row">
              <div className="text-content">
                {whyDesc.split("\r\n").filter(Boolean).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                {whyPointers && (
                  <ul dangerouslySetInnerHTML={{
                    __html: whyPointers
                      .replace(/<ul>/g, "")
                      .replace(/<\/ul>/g, "")
                      .replace(/<li>/g, '<li style="display:flex;align-items:flex-start;gap:8px;margin-bottom:8px"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;margin-top:2px"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>')
                      .replace(/<i\s+class="[^"]*"><\/i>\s*/g, "")
                      .replace(/<[^>]+>/g, (m) => m.startsWith("<li") ? m : "")
                  }} />
                )}
              </div>
              {contentImg && <img src={contentImg} alt="" className="content-image" />}
            </div>
          </div>
        </section>
      )}

      {hasElevate && (
        <section className="elevate-section">
          <div className="container">
            <div className="elevate-inner">
              <div className="elevate-content">
                {acf.why_choose_tmk_label && <p className="elevate-tag">{acf.why_choose_tmk_label}</p>}
                <h2 className="elevate-title">{acf.why_choose_tmk_title}</h2>
                <p className="elevate-desc">{acf.why_choose_tmk_description}</p>
                {acf.why_choose_tmk_button ? (
                  <a href={acf.why_choose_tmk_button} target="_blank" rel="noopener noreferrer" className="elevate-btn">Contact Us</a>
                ) : (
                  <Link to="/contact" className="elevate-btn">Contact Us</Link>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
