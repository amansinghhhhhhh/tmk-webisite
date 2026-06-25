import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { fetchPosts, mapPost } from "../api/wordpress";
import SEO from "../components/SEO";

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchPosts(4)
      .then((data) => {
        setPosts(data.map(mapPost))
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return (
    <>
    <SEO
      title="Blogs - The Marketing King"
      description="Game Marketing Agency"
      canonical="https://https://themarketingking.org/blog"
      ogTitle="Blogs - The Marketing King"
      ogDescription="Game Marketing Agency"
    />
      <section className="page-hero">
        <img src="/internal pages hero image/new-TMK-News.webp" alt="" className="hero-bg-img" />
        <div className="container">
          <div className="hero-content">
            <h1>Our <span className="gold">Blogs</span></h1>
            <p>In-depth guides, strategies, and insights to help you master iGaming marketing and grow your brand.</p>
            <a href="https://themarketingking.org/blogs/" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Explore Our Blog <ArrowRight /></a>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <p className="section-label">Latest Blogs</p>
          <h2 className="section-title">iGaming <span className="gold">Guides & Strategies</span></h2>

          {loading && <p style={{ textAlign: "center", padding: "40px 0", color: "#999" }}>Loading posts...</p>}

          {error && <p style={{ textAlign: "center", padding: "40px 0", color: "#ff6b6b" }}>Failed to load posts. Please try again later.</p>}

          {!loading && !error && (
            <div className="blog-grid stagger">
              {posts.map((post) => (
                <Link to={`/blog/${post.slug}`} className="blog-card" key={post.id}>
                  <div className="blog-img">
                    {post.image ? (
                      <img src={post.image} alt={post.title} style={{ width: "100%", height: 200, objectFit: "cover" }} />
                    ) : (
                      <div style={{ width: "100%", height: 200, background: "#1a1a1a" }} />
                    )}
                  </div>
                  <div className="blog-body">
                    <span className="tag">{post.categoryName || "Blogs"}</span>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div style={{ textAlign: "center", marginTop: 40 }}>
            <a href="https://themarketingking.org/blogs/" target="_blank" rel="noopener noreferrer" className="btn btn-outline">View All Blogs <ArrowRight /></a>
          </div>
        </div>
      </section>

      <section className="elevate-section">
        <div className="container">
          <div className="elevate-inner">
            <div className="elevate-content">
              <p className="elevate-tag">Why Choose TMK</p>
              <h2 className="elevate-title">Stay Ahead with <span className="gold">iGaming Insights</span></h2>
              <p className="elevate-desc">Explore the latest trends, strategies, and news in the iGaming marketing world. Our blog covers everything from player acquisition to retention strategies, helping you stay informed and competitive.</p>
              <Link to="/contact" className="elevate-btn">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
