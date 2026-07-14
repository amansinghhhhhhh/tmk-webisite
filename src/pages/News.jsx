import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import SEO from "../components/SEO";
import useLoadMorePosts from "../hooks/useLoadMorePosts"

export default function News() {

  const {
  posts,
  loading,
  loadingMore,
  error,
  hasMore,
  loadMore,
} = useLoadMorePosts(3);

  return (
    <>
     <SEO
          title="News - The Marketing King"
          description="News Together, Let's Craft Remarkable Stories. Act Now and Make it Happen We don't just market, we create experiences that resonate, engage, and drive results. Elevate your brand with us – where every campaign is a success story waiting to unfold."
          canonical="https://themarketingking.org/news"
          ogTitle="News - The Marketing King"
          ogDescription="News Together, Let's Craft Remarkable Stories. Act Now and Make it Happen We don't just market, we create experiences that resonate, engage, and drive results. Elevate your brand with us – where every campaign is a success story waiting to unfold."
        />
      <section className="page-hero">
        <img src="/internal pages hero image/new-TMK-News.webp" alt="" className="hero-bg-img" />
        <div className="container">
          <div className="hero-content">
            <h1>iGaming <span className="gold">News</span></h1>
            <p>Stay up to date with the latest industry news, trends, and updates from the iGaming world.</p>
            <a href="https://themarketingking.org/blogs/" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Explore Our Blog <ArrowRight /></a>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <p className="section-label">Latest News</p>
          <h2 className="section-title">Industry <span className="gold">Updates</span></h2>

          {loading && <p style={{ textAlign: "center", padding: "40px 0", color: "#999" }}>Loading posts...</p>}

          {error && <p style={{ textAlign: "center", padding: "40px 0", color: "#ff6b6b" }}>Failed to load posts. Please try again later.</p>}

          {!loading && !error && (
            <div className="blog-grid stagger">
              {posts.map((post) => (
                <Link to={`/news/${post.slug}`} className="blog-card" key={post.id}>
                  <div className="blog-img">
                    {post.image ? (
                      <img src={post.image} alt={post.title} style={{ width: "100%", height: 200, objectFit: "cover" }} />
                    ) : (
                      <div style={{ width: "100%", height: 200, background: "#1a1a1a" }} />
                    )}
                  </div>
                  <div className="blog-body">
                    <span className="tag">{post.categoryName || "News"}</span>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {hasMore && (
  <div style={{ textAlign: "center", marginTop: 40 }}>
    <button
      type="button"
      className="btn btn-outline"
      onClick={loadMore}
      disabled={loadingMore}
    >
      {loadingMore ? (
        "Loading..."
      ) : (
        <>
          Load More News <ArrowRight />
        </>
      )}
    </button>
  </div>
)}
        </div>
      </section>

      <section className="elevate-section">
        <div className="container">
          <div className="elevate-inner">
            <div className="elevate-content">
              <p className="elevate-tag">Why Choose TMK</p>
              <h2 className="elevate-title">Stay Ahead with <span className="gold">iGaming News</span></h2>
              <p className="elevate-desc">Keep your finger on the pulse of the iGaming industry. From regulatory changes to market trends, our news coverage helps you make informed decisions.</p>
              <Link to="/contact" className="elevate-btn">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
