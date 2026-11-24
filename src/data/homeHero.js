// Single source of truth for the homepage hero copy and its static
// first-paint shell. Imported by:
//   - src/pages/Home.jsx (runtime React markup)
//   - src/AppContent.jsx (route-aware Suspense fallback)
//   - scripts/prerender.mjs (crawler-visible HTML in dist/index.html)
// Keeping all three in sync prevents a copy swap or layout jump on hydration.

export const HERO_TAG = "iGaming Growth Marketing Agency";
export const HERO_LINE_1 = "Scale Your Brand Globally";
export const HERO_LINE_2 = "with a Leading iGaming Marketing Agency";
export const HERO_TYPEWRITER_WORDS = [
  "Acquire High Value Players",
  "Boost ROAS & Retention",
  "Scale Profitable Campaigns",
  "Increase Player LTV",
];
export const HERO_DESCRIPTION =
  "Trusted global iGaming traffic provider helping every casino, sportsbook, or crypto gaming brand acquire high value players through SEO, PPC, media buying, and affiliate marketing.";
export const HERO_CTA_PRIMARY = "Book a Strategy Call";
export const HERO_CTA_SECONDARY = "View Case Studies";
export const HERO_TRUST_LABEL = "Trusted by iGaming brands across";

const FLAG_STYLE =
  "display:flex;align-items:center;gap:10px;padding:12px 24px;border-radius:50px;font-size:1.1rem;font-weight:600;color:var(--text);background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);transition:.3s;white-space:nowrap";
const FLAG_IMG_STYLE =
  "width:28px;height:21px;border-radius:4px;object-fit:cover";

function flag(label, href, src, loading = "eager", sizeAttrs = "", alt = label) {
  return (
    `<a href="${href}" class="trust-flag" style="${FLAG_STYLE}">` +
    `<img src="${src}" alt="${alt}" style="${FLAG_IMG_STYLE}" loading="${loading}" decoding="async"${sizeAttrs} />` +
    ` ${label}</a>`
  );
}

// Markup mirrors Home.jsx's initial DOM exactly: same classes, same inline
// styles, same reserved typewriter box. No poster/video swap, no entrance
// animation. React clears #root on mount, so this H1 is never duplicated.
export const HOME_HERO_SHELL_HTML = `<section id="hero">
  <img class="hero-bg-video" src="/hero-poster.webp" alt="" width="1280" height="634" fetchpriority="high" loading="eager" decoding="async" />
  <div class="hero-overlay"></div>
  <div class="hero-glow-orb g1"></div>
  <div class="hero-glow-orb g2"></div>
  <div class="container">
    <div class="hero-grid">
      <div class="hero-left" id="heroLeft">
        <div class="hero-tag">${HERO_TAG}</div>
        <h1 class="hero-title"><span class="line1">${HERO_LINE_1}</span> <span class="line2">${HERO_LINE_2}</span></h1>
        <div class="hero-animated-line-wrapper"><div class="hero-animated-line"><span class="typewriter-text"></span><span class="cursor"></span></div></div>
        <p class="hero-desc">${HERO_DESCRIPTION}</p>
        <div class="hero-actions">
          <a href="#cta" class="btn btn-primary">${HERO_CTA_PRIMARY} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg></a>
          <a href="#live-ads" class="btn btn-outline">${HERO_CTA_SECONDARY}</a>
        </div>
      </div>
    </div>
    <div class="trust-strip">
      <span class="trust-label" style="font-size:1.3rem;letter-spacing:4px;text-transform:lowercase;color:var(--primary);font-weight:700;display:block;text-align:center;margin-bottom:24px">${HERO_TRUST_LABEL}</span>
      <div class="trust-flags" style="display:flex;flex-wrap:wrap;gap:14px;justify-content:center">
        ${flag("United States", "/countries/us/", "https://cdn.jsdelivr.net/gh/lipis/flag-icons@main/flags/4x3/us.svg")}
        ${flag("United Kingdom", "/countries/uk/", "https://cdn.jsdelivr.net/gh/lipis/flag-icons@main/flags/4x3/gb.svg")}
        ${flag("Latam", "/countries/latam/", "/flag/latam.webp", "lazy", ' width="300" height="150"', "LATAM")}
        ${flag("India", "/countries/india/", "https://cdn.jsdelivr.net/gh/lipis/flag-icons@main/flags/4x3/in.svg")}
        ${flag("Malta", "/countries/malta/", "https://cdn.jsdelivr.net/gh/lipis/flag-icons@main/flags/4x3/mt.svg")}
        ${flag("Philippines", "/countries/philippines/", "https://cdn.jsdelivr.net/gh/lipis/flag-icons@main/flags/4x3/ph.svg")}
      </div>
    </div>
  </div>
</section>`;
