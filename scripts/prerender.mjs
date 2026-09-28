/**
 * Build-time prerendering script (TMK).
 * Runs AFTER `vite build` to generate per-route static HTML files with
 * pre-baked <title>, <meta name="description">, canonical URL, and OG tags.
 *
 * Hostinger serves static files directly, so every route gets its own
 * dist/<route>/index.html with page-specific metadata in <head>.
 * React Helmet (`<SEO/>`) still owns runtime updates after hydration —
 * these static tags are the pre-JS fallback (View Source / HTML-only crawlers).
 *
 * Non-fatal by design: WordPress fetch failures warn and keep the built
 * template instead of failing the build.
 *
 * NOTE (redeploy trigger): Hostinger skipped the previous build, so this
 * comment-only change forces a fresh deployment pipeline run. No logic changed.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = resolve(__dirname, "..", "dist");
const SITE_URL = "https://themarketingking.org";
const WP_API = "https://cms.themarketingking.org/wp-json/wp/v2";

// Must stay in sync with scripts/generate-sitemap.mjs
const SERVICE_SLUGS = [
  "social-media-management-for-igaming-businesses",
  "google-ads-for-igaming-businesses",
  "meta-ads-for-igaming-businesses",
  "telegram-ads-for-igaming-businesses",
  "seo-services-for-igaming-businesses",
  "meta-google-agency-accounts-for-igaming-businesses",
  "whatsapp-api-bulk-whatsapp-services-for-igaming-businesses",
  "telegram-channel-promotion-live-line-api-for-igaming-businesses",
  "influencer-celebrity-marketing-for-igaming-businesses",
  "website-and-app-development-for-igaming-businesses",
  "digital-marketing-for-trading-business",
  "turnkey-solutions-for-igaming-businesses",
  "igaming-software-solution-providers",
  "traditional-marketing-for-igaming-businesses",
];

const COUNTRY_SLUGS = ["us", "uk", "latam", "india", "malta", "philippines"];
const BLOG_CATEGORY_ID = 4;
const NEWS_CATEGORY_ID = 3;

// ─── Static Route Metadata ─────────────────────────────────────────
// Values mirror each page's <SEO/> props (or H1 copy for pages without one).
// Keys use trailing-slash form to match routes + sitemap.
const META_MAP = {
  "/": {
    title: "The Marketing King | iGaming Traffic Provider in India",
    description:
      "TMK is your go to iGaming traffic provider in India. With the practical SEO strategies, our team provides conversations & leads to your igaming platform.",
    canonical: `${SITE_URL}/`,
  },
  "/about/": {
    title: "About Us - The Marketing King",
    description:
      "About Us About Us Founded in 2012, The Marketing King is a leading prominent global marketing agency. We specialize in providing immersive and engaging marketing solutions for the global sports industry, B2B industries, the Banking sector, and all the other industries. Positioned at the crossroads of the sports, media, banking, and betting sectors, The Marketing",
    canonical: `${SITE_URL}/about/`,
  },
  "/contact/": {
    title: "Contact Us - The Marketing King",
    description:
      "CONTACT US We're here to help.. Fill in this form to find out what our products and services will do for you. Select Code +91 (India) +971 (UAE) +1 (USA) +44 (UK) +355 (AL) +376 (AD) +43 (AT) +375 (BY) +32 (BE) +387 (BA) +359 (BG) +385 (HR) +357 (CY) +420 (CZ) +45 (DK) +372",
    canonical: `${SITE_URL}/contact/`,
  },
  "/blogs/": {
    title: "Blogs - The Marketing King",
    description: "Game Marketing Agency",
    canonical: `${SITE_URL}/blogs/`,
  },
  "/news/": {
    title: "News - The Marketing King",
    description:
      "News Together, Let's Craft Remarkable Stories. Act Now and Make it Happen We don't just market, we create experiences that resonate, engage, and drive results. Elevate your brand with us – where every campaign is a success story waiting to unfold.",
    canonical: `${SITE_URL}/news/`,
  },
  "/our-clients/": {
    title: "Our Client - The Marketing King",
    description:
      "Confidential Partnerships Proven Results Due to the private nature of the iGaming industry, we maintain complete client confidentiality. Our work, performance, and long term partnerships speak louder than public portfolios. If you'd like to know more, let's connect live — we'll be happy to walk you through our work and results. LET'S CONNECT LIVE MEET Contact",
    canonical: `${SITE_URL}/our-clients/`,
  },
  "/services/": {
    title: "Our Services - The Marketing King",
    description:
      "Comprehensive iGaming marketing solutions to accelerate your brand's growth across every channel and market.",
    canonical: `${SITE_URL}/services/`,
  },
  "/countries/": {
    title: "Global Markets - The Marketing King",
    description:
      "We help iGaming operators expand into regulated markets worldwide with localized strategies, compliant campaigns, and performance-driven marketing.",
    canonical: `${SITE_URL}/countries/`,
  },
  "/join-our-community/": {
    title: "Join Our Community - The Marketing King",
    description:
      "Get real-time betting industry updates, live strategies, and growth insights. Learn what top iGaming brands are doing right now.",
    canonical: `${SITE_URL}/join-our-community/`,
  },
  "/privacy-policy/": {
    title: "Privacy Policy - The Marketing King",
    description:
      "Read The Marketing King's Privacy Policy — how we collect, use, and protect your information.",
    canonical: `${SITE_URL}/privacy-policy/`,
  },
  "/term-condition/": {
    title: "Terms & Conditions - The Marketing King",
    description:
      "Read The Marketing King's Terms & Conditions governing your use of our website and services.",
    canonical: `${SITE_URL}/term-condition/`,
  },
  "/thank-you/": {
    title: "Thank You - The Marketing King",
    description: "Thank you for contacting us!",
    canonical: `${SITE_URL}/thank-you/`,
    robots: "noindex, nofollow",
  },
  "/countries/malta/": {
    title: "Malta iGaming Marketing Agency | The Marketing King",
    description:
      "Support your Malta-based iGaming business with performance marketing, SEO, PPC, affiliate management, and scalable digital growth strategies.",
    canonical: `${SITE_URL}/countries/malta/`,
  },
  "/countries/latam/": {
    title: "iGaming Marketing Services for LATAM | The Marketing King",
    description:
      "Reach players across Latin America with localized iGaming marketing, multilingual SEO, PPC, affiliate growth, and regional acquisition campaigns.",
    canonical: `${SITE_URL}/countries/latam/`,
  },
  "/countries/uk/": {
    title: "Leading iGaming Marketing Agency in UK | The Marketing King",
    description:
      "Accelerate your UK iGaming brand with tailored digital marketing, SEO, paid advertising, affiliate management, and player retention strategies.",
    canonical: `${SITE_URL}/countries/uk/`,
  },
  "/countries/india/": {
    title: "iGaming Marketing Experts in India | The Marketing King",
    description:
      "Expand your iGaming presence in India through strategic SEO, social media marketing, paid campaigns, influencer collaborations, and player growth.",
    canonical: `${SITE_URL}/countries/india/`,
  },
  "/countries/philippines/": {
    title: "iGaming Marketing Agency in Philippines | The Marketing King",
    description:
      "Grow your iGaming business in the Philippines with data-driven SEO, PPC, affiliate marketing, influencer campaigns, and high-performance player acquisition strategies.",
    canonical: `${SITE_URL}/countries/philippines/`,
  },
  "/countries/us/": {
    title: "iGaming Marketing Agency in USA | The Marketing King",
    description:
      "Scale your iGaming business in the USA with data-driven SEO, PPC, affiliate marketing, influencer campaigns, and high-performance player acquisition solutions.",
    canonical: `${SITE_URL}/countries/us/`,
  },
};

// ─── Helpers ───────────────────────────────────────────────────────
function escapeHtml(str) {
  return (str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildMetaTags(meta) {
  const title = escapeHtml(meta.title);
  const desc = escapeHtml(meta.description);
  const lines = [
    `<title>${title}</title>`,
    `    <meta name="description" content="${desc}" />`,
    `    <link rel="canonical" href="${meta.canonical}" />`,
    `    <meta property="og:title" content="${title}" />`,
    `    <meta property="og:description" content="${desc}" />`,
    `    <meta property="og:url" content="${meta.canonical}" />`,
    `    <meta property="og:type" content="${meta.ogType || "website"}" />`,
    `    <meta property="og:site_name" content="TheMarketingKing" />`,
  ];
  return lines.join("\n");
}

// Surgically replace the template's title/description with the per-route
// block. Everything else (scripts, pixels, verification, preconnects) is
// preserved byte-for-byte.
function injectMeta(htmlTemplate, meta) {
  const metaBlock = buildMetaTags(meta);
  let out = htmlTemplate.replace(
    /<title>[^<]*<\/title>\s*\r?\n\s*<meta name="description" content="[^"]*" \/>/,
    metaBlock,
  );
  if (meta.robots) {
    out = out.replace(
      /<meta name="robots" content="[^"]*" \/>/,
      `<meta name="robots" content="${meta.robots}" />`,
    );
  }
  return out;
}

// Write a prerendered page: dist/<route>/index.html
function writePage(distDir, routePath, html) {
  // For '/' route, overwrite dist/index.html (SPA fallback template)
  const outDir =
    routePath === "/"
      ? distDir
      : join(distDir, routePath.replace(/^\//, ""));
  mkdirSync(outDir, { recursive: true });
  const outFile = join(outDir, "index.html");
  writeFileSync(outFile, html, "utf-8");
  return outFile;
}

function metaFromYoast(yoast, canonical, ogType) {
  if (!yoast) return null;
  const title = (yoast.title || "").trim();
  const description = (yoast.description || yoast.og_description || "").trim();
  if (!title && !description) return null;
  return { title, description, canonical, ogType };
}

// ─── Dynamic Route Fetching ────────────────────────────────────────
async function fetchServiceSeo() {
  try {
    const res = await fetch(
      `${WP_API}/service?per_page=100&_fields=slug,yoast_head_json`,
    );
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data)) return [];
    return data
      .filter((s) => s.slug && SERVICE_SLUGS.includes(s.slug))
      .map((s) => ({ slug: s.slug, yoast: s.yoast_head_json || null }));
  } catch (err) {
    console.warn("[Prerender] Failed to fetch service SEO:", err.message);
    return [];
  }
}

async function fetchPostSeo(categoryId, label) {
  const items = [];
  const perPage = 100;
  let page = 1;
  let totalPages = 1;
  try {
    const first = await fetch(
      `${WP_API}/posts?categories=${categoryId}&per_page=${perPage}&page=${page}&_fields=slug,yoast_head_json`,
    );
    if (!first.ok) throw new Error(`API error: ${first.status}`);
    totalPages = parseInt(first.headers.get("X-WP-TotalPages") || "1", 10);
    let data = await first.json();
    items.push(...data);
    console.log(`  ${label} page ${page}/${totalPages} — ${data.length} posts`);
    for (page = 2; page <= totalPages; page++) {
      const r = await fetch(
        `${WP_API}/posts?categories=${categoryId}&per_page=${perPage}&page=${page}&_fields=slug,yoast_head_json`,
      );
      if (!r.ok) throw new Error(`API error: ${r.status}`);
      data = await r.json();
      items.push(...data);
      console.log(`  ${label} page ${page}/${totalPages} — ${data.length} posts`);
    }
  } catch (err) {
    console.warn(`[Prerender] Failed to fetch ${label} SEO:`, err.message);
  }
  return items
    .filter((p) => p.slug)
    .map((p) => ({ slug: p.slug, yoast: p.yoast_head_json || null }));
}

// ─── Main ──────────────────────────────────────────────────────────
async function main() {
  const indexHtmlPath = join(DIST_DIR, "index.html");
  if (!existsSync(indexHtmlPath)) {
    console.error("[Prerender] dist/index.html not found. Run vite build first.");
    process.exit(1);
  }

  const htmlTemplate = readFileSync(indexHtmlPath, "utf-8");
  if (!/<title>[^<]*<\/title>/.test(htmlTemplate)) {
    console.error("[Prerender] Template has no <title> tag — aborting.");
    process.exit(1);
  }
  let count = 0;

  // 1. Static routes (incl. countries + thank-you)
  console.log("[Prerender] Generating static route pages...");
  for (const [routePath, meta] of Object.entries(META_MAP)) {
    const outPath = writePage(DIST_DIR, routePath, injectMeta(htmlTemplate, meta));
    count++;
    console.log(`  ${routePath} -> ${relative(process.cwd(), outPath)}`);
  }

  // 2. Dynamic: service pages (Yoast SEO from WordPress)
  console.log("[Prerender] Fetching service SEO from WordPress...");
  const services = await fetchServiceSeo();
  console.log(`[Prerender] Found ${services.length} service(s)`);
  for (const s of services) {
    const meta = metaFromYoast(s.yoast, `${SITE_URL}/${s.slug}/`);
    if (!meta) {
      console.warn(`  /${s.slug}/ skipped (no Yoast meta)`);
      continue;
    }
    const outPath = writePage(DIST_DIR, `/${s.slug}/`, injectMeta(htmlTemplate, meta));
    count++;
    console.log(`  /${s.slug}/ -> ${relative(process.cwd(), outPath)}`);
  }

  // 3. Dynamic: blog posts (Yoast SEO from WordPress)
  console.log("[Prerender] Fetching blog SEO from WordPress...");
  const blogPosts = await fetchPostSeo(BLOG_CATEGORY_ID, "Blog");
  console.log(`[Prerender] Found ${blogPosts.length} blog post(s)`);
  for (const p of blogPosts) {
    const meta = metaFromYoast(p.yoast, `${SITE_URL}/blog/${p.slug}/`, "article");
    if (!meta) {
      console.warn(`  /blog/${p.slug}/ skipped (no Yoast meta)`);
      continue;
    }
    const outPath = writePage(DIST_DIR, `/blog/${p.slug}/`, injectMeta(htmlTemplate, meta));
    count++;
  }
  console.log(`  Wrote ${blogPosts.length} blog page(s)`);

  // 4. Dynamic: news posts (Yoast SEO from WordPress)
  console.log("[Prerender] Fetching news SEO from WordPress...");
  const newsPosts = await fetchPostSeo(NEWS_CATEGORY_ID, "News");
  console.log(`[Prerender] Found ${newsPosts.length} news post(s)`);
  for (const p of newsPosts) {
    const meta = metaFromYoast(p.yoast, `${SITE_URL}/news/${p.slug}/`, "article");
    if (!meta) {
      console.warn(`  /news/${p.slug}/ skipped (no Yoast meta)`);
      continue;
    }
    const outPath = writePage(DIST_DIR, `/news/${p.slug}/`, injectMeta(htmlTemplate, meta));
    count++;
  }
  console.log(`  Wrote ${newsPosts.length} news page(s)`);

  // Keep a route→title manifest for quick verification
  console.log(`\n[Prerender] Done! Generated ${count} prerendered page(s) in dist/`);
}

main().catch((err) => {
  console.error("[Prerender] Failed:", err);
  process.exit(1);
});
