import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <section className="page-hero" style={{ minHeight: "60vh" }}>
      <div className="container">
        <div className="hero-content" style={{ textAlign: "center", maxWidth: 600, margin: "0 auto" }}>
          <h1 style={{ fontSize: "clamp(4rem,10vw,8rem)", fontWeight: 900, lineHeight: 1 }}>404</h1>
          <p style={{ fontSize: "1.5rem", color: "var(--muted)", marginBottom: 32 }}>Page Not Found</p>
          <Link to="/" className="btn btn-primary">Go Home</Link>
        </div>
      </div>
    </section>
  )
}
