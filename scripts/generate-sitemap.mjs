import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = resolve(__dirname, '..', 'public');
const SITE_URL = 'https://themarketingking.org';

const WP_API = 'https://cms.themarketingking.org/wp-json/wp/v2';

const STATIC_ROUTES = [
  '',
  '/about',
  '/contact',
  '/blogs',
  '/news',
  '/our-clients',
  '/term-condition',
  '/join-our-community',
  '/countries',
  '/services',
  '/thank-you',
  '/privacy-policy',
];

const SERVICE_SLUGS = [
  'social-media-management-for-igaming-businesses',
  'google-ads-for-igaming-businesses',
  'meta-ads-for-igaming-businesses',
  'telegram-ads-for-igaming-businesses',
  'seo-services-for-igaming-businesses',
  'meta-google-agency-accounts-for-igaming-businesses',
  'whatsapp-api-bulk-whatsapp-services-for-igaming-businesses',
  'telegram-channel-promotion-live-line-api-for-igaming-businesses',
  'influencer-celebrity-marketing-for-igaming-businesses',
  'website-and-app-development-for-igaming-businesses',
  'digital-marketing-for-trading-business',
  'turnkey-solutions-for-igaming-businesses',
  'igaming-software-solution-providers',
  'traditional-marketing-for-igaming-businesses',
];

function getCountrySlugs() {
  return ['us', 'uk', 'latam', 'india', 'malta', 'philippines'];
}

async function fetchAllSlugs(categoryId, label) {
  const slugs = [];
  const perPage = 100;
  let page = 1;
  let totalPages = 1;

  try {
    const res = await fetch(
      `${WP_API}/posts?categories=${categoryId}&per_page=${perPage}&page=${page}&_fields=slug`
    );
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '1');
    let data = await res.json();
    slugs.push(...data.map(p => p.slug));
    console.log(`  ${label} page ${page}/${totalPages} — ${data.length} slugs`);

    for (page = 2; page <= totalPages; page++) {
      const r = await fetch(
        `${WP_API}/posts?categories=${categoryId}&per_page=${perPage}&page=${page}&_fields=slug`
      );
      if (!r.ok) throw new Error(`API error: ${r.status}`);
      data = await r.json();
      slugs.push(...data.map(p => p.slug));
      console.log(`  ${label} page ${page}/${totalPages} — ${data.length} slugs`);
    }
  } catch (err) {
    console.warn(`⚠️ Failed to fetch ${label} slugs:`, err.message);
  }

  return slugs;
}

async function fetchWpSlugs() {
  const [blog, news] = await Promise.all([
    fetchAllSlugs(4, 'Blog'),
    fetchAllSlugs(3, 'News'),
  ]);
  return { blog, news };
}

function buildRoutes(blogSlugs, newsSlugs) {
  const routes = [...STATIC_ROUTES];

  for (const slug of SERVICE_SLUGS) {
    routes.push(`/${slug}`);
  }

  for (const slug of getCountrySlugs()) {
    routes.push(`/countries/${slug}`);
  }

  for (const slug of blogSlugs) {
    routes.push(`/blog/${slug}`);
  }

  for (const slug of newsSlugs) {
    routes.push(`/news/${slug}`);
  }

  return routes;
}

function generateSitemapXml(routes) {
  const urls = routes.map(route => {
    const url = route === '' ? SITE_URL : `${SITE_URL}${route}`;
    return `  <url>
    <loc>${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

async function main() {
  console.log('🔍 Fetching WordPress slugs...');
  const { blog: blogSlugs, news: newsSlugs } = await fetchWpSlugs();

  console.log(`📝 Blog slugs: ${blogSlugs.length}, News slugs: ${newsSlugs.length}`);

  const routes = buildRoutes(blogSlugs, newsSlugs);
  console.log(`📍 Total routes: ${routes.length}`);

  if (!existsSync(PUBLIC_DIR)) {
    mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  const xml = generateSitemapXml(routes);
  writeFileSync(resolve(PUBLIC_DIR, 'sitemap.xml'), xml, 'utf-8');
  console.log('✅ sitemap.xml generated at public/sitemap.xml');


}

main().catch(err => {
  console.error('❌', err);
  process.exit(1);
});
