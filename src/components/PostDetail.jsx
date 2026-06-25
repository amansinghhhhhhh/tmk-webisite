import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { ArrowLeft, ArrowRight, Calendar, User, Clock, Copy, Check } from "lucide-react"
import { fetchPostBySlug, fetchPosts, mapPost } from "../api/wordpress"
import SEO from "../components/SEO";

function estimateReadTime(html) {
  if (!html) return "1 min read"
  const text = html.replace(/<[^>]+>/g, "")
  const words = text.split(/\s+/).length
  const minutes = Math.max(1, Math.round(words / 200))
  return `${minutes} min read`
}

function formatDate(dateStr) {
  if (!dateStr) return ""
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function ShareButton({ title }) {
  const [copied, setCopied] = useState(false)
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="blog-share">
      <span className="blog-share-label">Share this article</span>
      <div className="blog-share-icons">
        <a href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="blog-share-icon facebook" aria-label="Share on Facebook">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
        </a>
        <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="blog-share-icon twitter" aria-label="Share on Twitter">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
        </a>
        <a href={`https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="blog-share-icon linkedin" aria-label="Share on LinkedIn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
        </a>
        <button className="blog-share-icon copy" onClick={copyLink} aria-label="Copy link">
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>
    </div>
  )
}

export default function PostDetail({ categoryId, backLink, backLabel, listLink, listLabel, routePrefix }) {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [allPosts, setAllPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  console.log("POST DATA:", post)
  useEffect(() => {
    setLoading(true)
    setError(null)
    setPost(null)
    setAllPosts([])
    Promise.all([
      fetchPostBySlug(slug),
      fetchPosts(categoryId),
    ])
      .then(([postData, postsData]) => {
        if (!postData) {
          setError("Not found")
          setLoading(false)
          return
        }
        setPost(mapPost(postData))
        setAllPosts(postsData.map(mapPost))
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [slug, categoryId])

  const currentIndex = allPosts.findIndex((p) => p.slug === slug)
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
  const related = allPosts.filter((p) => p.slug !== slug).slice(0, 2)

  if (loading) {
    return (
      <section className="page-hero" style={{ minHeight: "40vh" }}>
        <div className="container">
          <div className="hero-content">
            <h1>Loading...</h1>
          </div>
        </div>
      </section>
    )
  }

  if (error || !post) {
    return (
      <section className="page-hero" style={{ minHeight: "40vh" }}>
        <div className="container">
          <div className="hero-content">
            <h1>Not <span className="gold">Found</span></h1>
            <p>The post you're looking for doesn't exist.</p>
            <Link to={listLink} className="btn btn-primary">{listLabel}</Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    
     <>
     console.log(post?.yoast_head_json);
    <SEO
  title={post.yoast_head_json?.title}
  description={post.yoast_head_json?.description}
  canonical={post.yoast_head_json?.canonical}
  ogTitle={post.yoast_head_json?.og_title}
  ogDescription={post.yoast_head_json?.og_description}
  ogImage={post.yoast_head_json?.og_image?.[0]?.url}
    />
      <section className="blog-detail-hero">
        <div className="blog-detail-hero-bg" />
        <div className="blog-detail-hero-overlay" />
        <div className="container">
          <div className="blog-detail-hero-content">
            <Link to={backLink} className="blog-detail-back">
              <ArrowLeft size={16} /> {backLabel}
            </Link>
            <span className="tag">{post.categoryName}</span>
            <h1>{post.title}</h1>
            <div className="blog-detail-meta">
              <span><Calendar size={14} /> {formatDate(post.date)}</span>
              <span><Clock size={14} /> {estimateReadTime(post.content)}</span>
              <span><User size={14} /> TMK Team</span>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section alt">
        <div className="container">
          <div className="blog-detail-layout">
            <article className="blog-detail-article">
              {post.image && (
                <div className="blog-detail-article-img">
                  <img src={post.image} alt={post.title} />
                </div>
              )}
              <div className="blog-detail-content" dangerouslySetInnerHTML={{ __html: post.content }} />
              <ShareButton title={post.title} />
              <div className="blog-detail-nav">
                {prevPost ? (
                  <Link to={`/${routePrefix}/${prevPost.slug}`} className="blog-detail-nav-link prev">
                    <ArrowLeft size={18} />
                    <div>
                      <span>Previous Article</span>
                      <p>{prevPost.title}</p>
                    </div>
                  </Link>
                ) : <div className="blog-detail-nav-empty" />}
                {nextPost ? (
                  <Link to={`/${routePrefix}/${nextPost.slug}`} className="blog-detail-nav-link next">
                    <div>
                      <span>Next Article</span>
                      <p>{nextPost.title}</p>
                    </div>
                    <ArrowRight size={18} />
                  </Link>
                ) : <div className="blog-detail-nav-empty" />}
              </div>
              <div className="blog-detail-cta">
                <h4>Ready to Scale Your iGaming Brand?</h4>
                <p>The Marketing King helps iGaming brands grow with data-driven marketing strategies. Let's discuss how we can help you achieve your goals.</p>
                <Link to="/contact" className="btn btn-primary">Contact Us <ArrowRight size={14} /></Link>
              </div>
            </article>
            <aside className="blog-detail-sidebar">
              {related.length > 0 && (
                <div className="blog-sidebar-widget">
                  <h4>Related Articles</h4>
                  <div className="blog-sidebar-posts">
                    {related.map((p) => (
                      <Link to={`/${routePrefix}/${p.slug}`} className="blog-sidebar-post" key={p.slug}>
                        {p.image ? (
                          <img src={p.image} alt="" />
                        ) : (
                          <div style={{ width: 60, height: 60, background: "#1a1a1a", borderRadius: 8, flexShrink: 0 }} />
                        )}
                        <div>
                          <span className="tag" style={{ fontSize: ".6rem", padding: "2px 8px", marginBottom: 4 }}>{p.categoryName}</span>
                          <p>{p.title}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              <div className="blog-sidebar-widget">
                <h4>Categories</h4>
                <div className="blog-sidebar-cats">
                  {["Betting & Gaming", "Sports", "Marketing", "SEO", "Affiliate Marketing"].map((cat) => (
                    <span key={cat}>{cat}</span>
                  ))}
                </div>
              </div>
              <div className="blog-sidebar-widget cta">
                <h4>Grow Your Brand</h4>
                <p>Partner with The Marketing King and take your iGaming brand to the next level.</p>
                <Link to="/contact" className="btn btn-primary" style={{ fontSize: 13, padding: "10px 24px" }}>Get Started</Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
