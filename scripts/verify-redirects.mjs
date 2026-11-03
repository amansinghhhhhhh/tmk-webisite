/**
 * Verifies the Soft-404 redirect rules in public/.htaccess against every row
 * of the GSC audit sheet.
 *
 * Input:  scripts/soft-404-audit.txt — UTF-8 dump of
 *         "C:\Users\A2DIGI\Downloads\Redirection list of TMK - for developer.xlsx"
 *         (sheet "Soft 404", 234 rows). Regenerate with any xlsx->text
 *         extractor if the sheet is updated.
 *
 * RULES below is a line-for-line mirror of the block labelled
 * "2. Soft-404 301 redirects" in public/.htaccess. The script also asserts
 * that every rule's distinctive fragment is physically present in
 * .htaccess, so the two can not silently drift apart.
 *
 * Usage: node scripts/verify-redirects.mjs
 * Exit code 0 = every audit row resolves as expected.
 */

import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const AUDIT_FILE = join(__dirname, "soft-404-audit.txt");
const HTACCESS_FILE = join(__dirname, "..", "public", ".htaccess");

/**
 * URLs the audit says "Redirect to home page" but which the team decided to
 * KEEP live (decision 2026-10-29):
 *  - row 3:   traditional-marketing — fixed via prerender meta + static
 *             content instead of being redirected
 *  - rows 12/134/173/180: verified-healthy live posts, kept indexable so
 *             their rankings are not thrown away
 * Rows 13 and 67 are excluded from the redirect expectations by their own
 * Action text ("request indexing" / "indexing request", status done).
 */
const KEEP_PATHS = new Set([
  "/traditional-marketing-for-igaming-businesses/",
  "/blog/effective-casino-marketing-strategies-that-actually-work/",
  "/blog/choose-the-best-digital-marketing-company-for-online-casino-advertising",
  "/blog/igaming-google-ads-in-canada-tmk-growth-guide",
  "/blog/crypto-casino-marketing-services-smart-growth-strategy",
]);

/** Mirror of public/.htaccess rules 2a-2l (per-dir context: no leading slash). */
const RULES = [
  {
    fragment: "^services/seo-services/?$",
    re: /^services\/seo-services\/?$/i,
    target: "/seo-services-for-igaming-businesses/",
  },
  {
    fragment: "^services/telegram-ads/?$",
    re: /^services\/telegram-ads\/?$/i,
    target: "/telegram-ads-for-igaming-businesses/",
  },
  {
    fragment: "^services/google-ads/?$",
    re: /^services\/google-ads\/?$/i,
    target: "/google-ads-for-igaming-businesses/",
  },
  {
    fragment: "^services/meta-ads/?$",
    re: /^services\/meta-ads\/?$/i,
    target: "/meta-ads-for-igaming-businesses/",
  },
  {
    fragment: "your-ultimate-playbook-for-sportsbook-platform-seo-and-marketing/?$",
    re: /^blogs\/your-ultimate-playbook-for-sportsbook-platform-seo-and-marketing\/?$/i,
    target: "/blogs/",
  },
  {
    fragment: "^uncategorized(/|$)",
    re: /^uncategorized(\/|$)/i,
    target: "/",
  },
  {
    fragment: "adult-chat-roulet|ai-transforms-the-igaming-industry",
    re: /^blog\/(adult-chat-roulet|ai-transforms-the-igaming-industry-the-future-of-online-gaming)\/?$/i,
    target: "/",
  },
  {
    fragment: "how-can-you-search-for-influencers-to-improve-your-marketing-campaigns/embed",
    re: /^blog\/how-can-you-search-for-influencers-to-improve-your-marketing-campaigns\/embed\/?$/i,
    target: "/",
  },
  {
    fragment: "^[0-9]{4}/[0-9]{2}(/[0-9]{2})?/?$",
    re: /^[0-9]{4}\/[0-9]{2}(\/\d{2})?\/?$/,
    target: "/",
  },
  {
    fragment: "^(us|terms-of-use|our-client|about-us)/?$",
    re: /^(us|terms-of-use|our-client|about-us)\/?$/i,
    target: "/",
  },
  {
    fragment: "^wp-includes/",
    re: /^wp-includes\//i,
    target: "/",
  },
  // 2i. Targeted feed redirects -> canonical post URLs (Redirection sheet).
  {
    fragment: "^blog/igaming-what-is-it-a-comprehensive-guide/feed/?$",
    re: /^blog\/igaming-what-is-it-a-comprehensive-guide\/feed\/?$/i,
    target: "/blog/igaming-what-is-it-a-comprehensive-guide/",
  },
  {
    fragment: "^news/yggdrasil-and-betarabia-partner-to-bring-slot-games-to-lebanon/feed/?$",
    re: /^news\/yggdrasil-and-betarabia-partner-to-bring-slot-games-to-lebanon\/feed\/?$/i,
    target: "/news/yggdrasil-and-betarabia-partner-to-bring-slot-games-to-lebanon/",
  },
  {
    fragment: "^blog/the-gambling-regulatory-authority-of-ireland-signs-mou-with-gibraltar/feed/?$",
    re: /^blog\/the-gambling-regulatory-authority-of-ireland-signs-mou-with-gibraltar\/feed\/?$/i,
    target: "/blog/the-gambling-regulatory-authority-of-ireland-signs-mou-with-gibraltar/",
  },
  {
    fragment: "^blog/discover-the-best-digital-marketing-company-for-igaming/feed/?$",
    re: /^blog\/discover-the-best-digital-marketing-company-for-igaming\/feed\/?$/i,
    target: "/blog/discover-the-best-digital-marketing-company-for-igaming/",
  },
  {
    fragment: "^blog/how-telegram-promotion-services-help-attract-more-players-in-the-igaming-industry/feed/?$",
    re: /^blog\/how-telegram-promotion-services-help-attract-more-players-in-the-igaming-industry\/feed\/?$/i,
    target: "/",
  },
  {
    fragment: "^blog/what-is-cricket-api-a-complete-guide-in-simple-words/feed/?$",
    re: /^blog\/what-is-cricket-api-a-complete-guide-in-simple-words\/feed\/?$/i,
    target: "/",
  },
  // 2j. WP system / utility / plugin paths -> home (Redirection sheet).
  {
    fragment: "^contact-us/feed/?$",
    re: /^contact-us\/feed\/?$/i,
    target: "/",
  },
  {
    fragment: "^wp-json/wpchat/v1/?$",
    re: /^wp-json\/wpchat\/v1\/?$/i,
    target: "/",
  },
  {
    fragment: "^wp-admin/admin-ajax\\.php",
    re: /^wp-admin\/admin-ajax\.php/i,
    target: "/",
  },
  {
    fragment: "^wp-admin/admin\\.php",
    re: /^wp-admin\/admin\.php/i,
    target: "/",
  },
  {
    fragment: "^wp-content/plugins/litespeed-cache/guest\\.vary\\.php",
    re: /^wp-content\/plugins\/litespeed-cache\/guest\.vary\.php/i,
    target: "/",
  },
  {
    fragment: "^wp-content/themes/themarketingking",
    re: /^wp-content\/themes\/themarketingking/i,
    target: "/",
  },
  {
    fragment: "^wp-content/uploads",
    re: /^wp-content\/uploads/i,
    target: "/",
  },
  {
    fragment: "^wp-content/",
    re: /^wp-content\//i,
    target: "/",
  },
  {
    fragment: "^wp-.*\\.php",
    re: /^wp-.*\.php/i,
    target: "/",
  },
  // 2k. Retired / legacy pages -> home (Redirection sheet).
  {
    fragment: "^error-page/?$",
    re: /^error-page\/?$/i,
    target: "/",
  },
  {
    fragment: "^lander/?$",
    re: /^lander\/?$/i,
    target: "/",
  },
  {
    fragment: "^contact-us/?$",
    re: /^contact-us\/?$/i,
    target: "/",
  },
  {
    fragment: "^development-services-for-igaming-businesses/?$",
    re: /^development-services-for-igaming-businesses\/?$/i,
    target: "/",
  },
  // 2l. Retired / spam / adult blog slugs -> home (Redirection sheet).
  {
    fragment: "^blog/ai-generated-latex-porn/?$",
    re: /^blog\/ai-generated-latex-porn\/?$/i,
    target: "/",
  },
  {
    fragment: "^blog/ai-girlfriend-chat-uncensored/?$",
    re: /^blog\/ai-girlfriend-chat-uncensored\/?$/i,
    target: "/",
  },
  {
    fragment: "^blog/sexy-nude-fantasy-men-ai-photos/?$",
    re: /^blog\/sexy-nude-fantasy-men-ai-photos\/?$/i,
    target: "/",
  },
  {
    fragment: "^blog/live-sex-chat-no-signup/?$",
    re: /^blog\/live-sex-chat-no-signup\/?$/i,
    target: "/",
  },
  {
    fragment: "^blog/chai-vs-character-ai/?$",
    re: /^blog\/chai-vs-character-ai\/?$/i,
    target: "/",
  },
  {
    fragment: "^blog/ai-sexy-models/?$",
    re: /^blog\/ai-sexy-models\/?$/i,
    target: "/",
  },
  {
    fragment: "^blog/henny-bottle-anime-ai/?$",
    re: /^blog\/henny-bottle-anime-ai\/?$/i,
    target: "/",
  },
  {
    fragment: "^blog/dirty-talk-ai-chat-bot/?$",
    re: /^blog\/dirty-talk-ai-chat-bot\/?$/i,
    target: "/",
  },
  {
    fragment: "^blog/ai-deepfake-porn-maker/?$",
    re: /^blog\/ai-deepfake-porn-maker\/?$/i,
    target: "/",
  },
  {
    fragment: "^blog/replika-ai-inventor/?$",
    re: /^blog\/replika-ai-inventor\/?$/i,
    target: "/",
  },
  {
    fragment: "^blog/best-porn-sites-ai-upscale/?$",
    re: /^blog\/best-porn-sites-ai-upscale\/?$/i,
    target: "/",
  },
  {
    fragment: "^blog/characters-speaking-using-ai-models/?$",
    re: /^blog\/characters-speaking-using-ai-models\/?$/i,
    target: "/",
  },
  {
    fragment: "^blog/can-ai-revolutionize-the-igaming-segment-in-the-next-decade/?$",
    re: /^blog\/can-ai-revolutionize-the-igaming-segment-in-the-next-decade\/?$/i,
    target: "/",
  },
  {
    fragment: "^blog/igaming-advertising-services-a-complete-guide-with-tmk/?$",
    re: /^blog\/igaming-advertising-services-a-complete-guide-with-tmk\/?$/i,
    target: "/",
  },
  {
    fragment: "^blog/social-media-management-for-igaming-businesses-building-trust-traffic-with-tmk/?$",
    re: /^blog\/social-media-management-for-igaming-businesses-building-trust-traffic-with-tmk\/?$/i,
    target: "/",
  },
];

/** Server path for a URL (leading slash kept, query/hash dropped). */
function pathOf(rawUrl) {
  const u = new URL(rawUrl);
  let p = u.pathname;
  try {
    p = decodeURIComponent(p);
  } catch {
    /* keep raw (e.g. malformed %-sequences) */
  }
  return p;
}

/** What the audit sheet demands for this row (null = must NOT redirect). */
function expectedTarget(action, path) {
  if (/indexing/i.test(action)) return null;
  if (KEEP_PATHS.has(path)) return null;
  const m = action.match(/redirect to \(([^)]+)\)/i);
  if (m) return pathOf(m[1].trim());
  if (/redirect to home page/i.test(action)) return "/";
  return "UNPARSED";
}

/** Where .htaccess actually sends the path (null = no rule matches). */
function actualTarget(path) {
  // Per-dir context: strip the leading "/" the way Apache does.
  const perDir = path.replace(/^\//, "");
  for (const rule of RULES) {
    if (rule.re.test(perDir)) return rule.target;
  }
  return null;
}

function main() {
  // 1. Every rule fragment must physically exist in .htaccess.
  const htaccess = readFileSync(HTACCESS_FILE, "utf-8");
  const missingFragments = RULES.filter((r) => !htaccess.includes(r.fragment));
  if (missingFragments.length) {
    console.error(
      "DRIFT: these rules are not present in public/.htaccess:",
      missingFragments.map((r) => r.fragment),
    );
    process.exit(1);
  }

  // 2. Parse the Soft 404 sheet.
  const lines = readFileSync(AUDIT_FILE, "utf-8").split(/\r?\n/);
  const start = lines.findIndex((l) => l.startsWith("=== SHEET: Soft 404"));
  if (start === -1) {
    console.error("Soft 404 sheet not found in", AUDIT_FILE);
    process.exit(1);
  }

  const rows = [];
  for (const line of lines.slice(start + 1)) {
    const cells = line.split(" | ");
    if (cells.length < 4 || !/^\d+$/.test(cells[0].trim())) continue;
    rows.push({
      no: parseInt(cells[0].trim(), 10),
      url: cells[1].trim(),
      action: cells.slice(3).join(" | ").trim(),
    });
  }

  if (!rows.length) {
    console.error("No rows parsed from the Soft 404 sheet.");
    process.exit(1);
  }

  // 3. Every row: expected (sheet + team decisions) vs actual (.htaccess).
  const failures = [];
  const kept = [];
  const targeted = [];
  let home = 0;

  for (const row of rows) {
    const path = pathOf(row.url);
    const expected = expectedTarget(row.action, path);
    const actual = actualTarget(path);

    if (expected === "UNPARSED") {
      failures.push(
        `row ${row.no}: unparsed action "${row.action}" for ${path}`,
      );
      continue;
    }

    if (expected === null) {
      if (actual !== null) {
        failures.push(
          `row ${row.no}: MUST stay live but .htaccess redirects it -> ${actual} (${path})`,
        );
      } else {
        kept.push(`${row.no} ${path}`);
      }
      continue;
    }

    if (actual !== expected) {
      failures.push(
        `row ${row.no}: expected ${expected} but .htaccess gives ${
          actual === null ? "NO REDIRECT" : actual
        } (${path})`,
      );
      continue;
    }

    if (expected === "/") home++;
    else targeted.push(`${row.no}: ${path} -> ${expected}`);
  }

  // 4. Report.
  console.log(`Audit rows parsed : ${rows.length}`);
  console.log(`Redirects to home : ${home}`);
  console.log(`Targeted redirects: ${targeted.length}`);
  for (const t of targeted) console.log(`   ${t}`);
  console.log(`Deliberately kept : ${kept.length}`);
  for (const k of kept) console.log(`   ${k}`);

  if (failures.length) {
    console.error(`\nFAIL — ${failures.length} problem(s):`);
    for (const f of failures) console.error(`   ${f}`);
    process.exit(1);
  }

  console.log(
    `\nPASS — all ${rows.length} audit rows resolve exactly as required.`,
  );
}

main();
