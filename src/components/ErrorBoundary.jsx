import { Component } from "react";

// Invisible, layout-stable placeholder shown while a lazy route chunk loads.
// Renders no text (no "Loading..." flash, no FOUC) but preserves section
// height so Navbar/Footer don't jump during route transitions.
export function FallbackShell() {
  return (
    <section
      className="page-hero"
      style={{ minHeight: "60vh" }}
      aria-hidden="true"
    />
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
      // Minimal error UI (chunk-load failure / render crash): short message
      // plus recovery action. Shown only on genuine errors, never on load.
      return (
        <section className="page-hero" style={{ minHeight: "60vh" }}>
          <div className="container">
            <div className="hero-content" style={{ textAlign: "center" }}>
              <p style={{ color: "#cfcfcf", fontSize: 18 }}>
                Something went wrong while loading this page.
              </p>
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
            </div>
          </div>
        </section>
      );
    }
    return this.props.children;
  }
}
