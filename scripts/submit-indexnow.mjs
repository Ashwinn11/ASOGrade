#!/usr/bin/env node
/**
 * One-shot IndexNow submission. Run this AFTER deploying the key file route
 * (app/8d79891d0a37e3315a8dabeb127d32f3.txt/route.ts) to production —
 * IndexNow validates the key by fetching it from the live host before
 * accepting the URL list, so submitting before deploy just fails silently.
 *
 * Usage: node scripts/submit-indexnow.mjs
 *
 * Bing, Yandex, and Seznam.cz consume IndexNow directly. Google does not
 * participate in the protocol — sitemap.xml + Search Console remain the way
 * to prompt Google's crawl. This only accelerates the non-Google half.
 *
 * Safe to re-run any time new pages ship: pull the URL list fresh from the
 * live sitemap.xml rather than hardcoding it, so it never drifts from what
 * sitemap.ts actually generates.
 */

const HOST = "asograde.com";
const KEY = "8d79891d0a37e3315a8dabeb127d32f3";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;

async function main() {
  const res = await fetch(SITEMAP_URL);
  if (!res.ok) {
    console.error(`Failed to fetch sitemap: ${res.status} ${res.statusText}`);
    process.exit(1);
  }
  const xml = await res.text();
  const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

  if (urlList.length === 0) {
    console.error("No <loc> entries found in sitemap — aborting.");
    process.exit(1);
  }

  console.log(`Submitting ${urlList.length} URLs to IndexNow...`);

  const submitRes = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList,
    }),
  });

  console.log(`IndexNow response: ${submitRes.status} ${submitRes.statusText}`);
  if (!submitRes.ok) {
    const body = await submitRes.text().catch(() => "");
    console.error(body);
    process.exit(1);
  }
  console.log("Done. 200/202 means Bing/Yandex/Seznam accepted the batch for crawling.");
}

main();
