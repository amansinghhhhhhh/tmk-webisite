import { Component } from "react";

// Reads the prerendered per-route static tags. Used by loading/error
// fallbacks so headless/slow renderers always see real page content
// (title + description) instead of a blank dark section.
export function getPrerenderedMeta() {
  let title = "";
  let desc = "";
  try {
    if (typeof document !== "undefined") {
      title = document.title || "";
      const m = document.querySelector('meta[name="description"]');
      desc = (m && m.getAttribute("content")) || "";
    }
  } catch {
    /* ignore - fall back to generic loader */
  }
  return { title, desc };
}

export function FallbackShell({ showRetry }) {
  const { title, desc } = getPrerenderedMeta();
  return (
    <section className="page-hero" style={{ minHeight: "60vh" }}>
      <div className="container">
        <div className="hero-content" style={{ textAlign: "center" }}>
          {title ? (
            <>
              <p
                style={{
                  color: "#88C240",
                  fontSize: 13,
                  letterSpacing: 4,
                  textTransform: "uppercase",
                  margin: "0 0 20px",
                }}
              >
                The Marketing King
              </p>
              <h1 style={{ color: "#fff", margin: "0 0 20px" }}>{title}</h1>
              {desc ? (
                <p
                  style={{
                    color: "#cfcfcf",
                    maxWidth: 720,
                    margin: "0 auto",
                  }}
                >
                  {desc}
                </p>
              ) : null}
            </>
          ) : (
            <p style={{ color: "#999", fontSize: 18 }}>Loading...</p>
          )}
          {showRetry ? (
            <button
              type="button"
              className="btn btn-primary"
              style={{ marginTop: 28 }}
              onClick={() => {
                try {
                  window.location.reload();
                } catch {
                  /* ignore */
                }
              }}
            >
              Reload page
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}

// Catches chunk-load failures (lazy route import 404/timeout) and any
// render crash. Without this, React unmounts the whole tree and headless
// renderers screenshot a totally black page.
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    try {
      // eslint-disable-next-line no-console
      console.error("[TMK] Route render error:", error, info);
    } catch {
      /* ignore */
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.resetKey !== this.props.resetKey && this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return <FallbackShell showRetry />;
    }
    return this.props.children;
  }
}
