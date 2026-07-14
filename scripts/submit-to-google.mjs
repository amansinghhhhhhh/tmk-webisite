import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { JWT } from 'google-auth-library';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function main() {
  const sitemapPath = resolve(__dirname, '..', 'public', 'sitemap.xml');

  if (!existsSync(sitemapPath)) {
    console.error('❌ sitemap.xml not found');
    process.exit(1);
  }

  const xml = readFileSync(sitemapPath, 'utf-8');
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

  console.log(`📍 Found ${urls.length} URLs in sitemap`);

  const jsonKey = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!jsonKey) {
    console.error('❌ GOOGLE_SERVICE_ACCOUNT_JSON not set');
    process.exit(1);
  }

  const credentials = JSON.parse(jsonKey);
  const auth = new JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ['https://www.googleapis.com/auth/indexing'],
  });

  const limit = 200;
  const toSubmit = urls.slice(0, limit);
  console.log(`📤 Submitting ${toSubmit.length} URLs to Google Indexing API...`);

  let success = 0;
  let failed = 0;

  for (const url of toSubmit) {
    try {
      const token = await auth.getAccessToken();
      const res = await fetch(
        'https://indexing.googleapis.com/v3/urlNotifications:publish',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ url, type: 'URL_UPDATED' }),
        },
      );

      if (res.ok) {
        console.log(`  ✅ ${url}`);
        success++;
      } else {
        const err = await res.text();
        console.error(`  ❌ ${url} — ${err}`);
        failed++;
      }
    } catch (err) {
      console.error(`  ❌ ${url} — ${err.message}`);
      failed++;
    }

    if (success + failed < toSubmit.length) {
      await new Promise((r) => setTimeout(r, 1000));
    }
  }

  console.log(`\n📊 Results: ${success} submitted, ${failed} failed`);
}

main().catch((err) => {
  console.error('❌', err);
  process.exit(1);
});
