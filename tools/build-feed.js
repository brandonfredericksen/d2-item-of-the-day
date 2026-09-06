/* ------------------------------------------------------------------
   build-feed.js  -  writes feed.xml

   The site shows one item per UTC day, picked by a deterministic function
   of the date, so the feed for any day can be worked out ahead of time.
   Run it from the repo root:

     node tools/build-feed.js

   .github/workflows/feed.yml runs it once a day and commits the result.

   The rotation lives in app.js and is NOT duplicated here. The constants
   are read out of that file, and the one line of date maths is checked
   against the source before it is used. Change the rotation and this
   build fails loudly instead of quietly publishing the wrong item.
------------------------------------------------------------------ */

"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SITE = "https://d2itemoftheday.com";

/* How many days the feed carries. Long enough that a reader polling weekly
   misses nothing, short enough that the file is not a browsable archive of
   every item. The site is a day at a time; the feed should read the same. */
const DAYS = 7;

const MS_PER_DAY = 86400000;

/* ---------- pull the rotation out of app.js ---------- */

const appSrc = fs.readFileSync(path.join(ROOT, "app.js"), "utf8");

function must(re, what) {
  const m = appSrc.match(re);
  if (!m) {
    console.error(
      "build-feed: could not find " + what + " in app.js.\n" +
      "The rotation changed shape. Update this script to match before publishing a feed."
    );
    process.exit(1);
  }
  return m;
}

const anchorM = must(
  /var ANCHOR = Math\.floor\(Date\.UTC\((\d+), (\d+), (\d+)\) \/ MS_PER_DAY\);/,
  "the ANCHOR date"
);
const pinM = must(
  /var PIN = \{ day: (\d+), slug: "([^"]+)" \};/,
  "the PIN"
);

/* The single line of maths that decides the day's item. Asserted, not copied
   blindly: if app.js changes it, this stops rather than drifting. */
must(
  /return \(\(\(\(utcDay - ANCHOR\) - PIN\.day \+ pinIdx\) % len\) \+ len\) % len;/,
  "the rotation formula"
);

const ANCHOR = Math.floor(
  Date.UTC(Number(anchorM[1]), Number(anchorM[2]), Number(anchorM[3])) / MS_PER_DAY
);
const PIN = { day: Number(pinM[1]), slug: pinM[2] };

/* ---------- items ---------- */

const ITEMS = require(path.join(ROOT, "items.js"));

const pinIdx = ITEMS.findIndex((i) => i.slug === PIN.slug);
if (pinIdx < 0) {
  console.error('build-feed: the pinned slug "' + PIN.slug + '" is not in items.js.');
  process.exit(1);
}

function indexForDay(utcDay) {
  const len = ITEMS.length;
  return ((((utcDay - ANCHOR) - PIN.day + pinIdx) % len) + len) % len;
}

/* ---------- text ---------- */

/* Prose fields are either a plain string or { en, de, ... }. Same fallback
   order t() uses in app.js: the default language, then whatever exists. */
function text(v) {
  if (v == null) return "";
  if (typeof v === "string") return v;
  return v.en || Object.values(v)[0] || "";
}

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" }[c])
  );

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MON_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                   "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/* RSS wants RFC 822 dates, and toUTCString() is not quite it. */
function rfc822(d) {
  const p = (n) => String(n).padStart(2, "0");
  return DAY_NAMES[d.getUTCDay()] + ", " + p(d.getUTCDate()) + " " +
         MON_NAMES[d.getUTCMonth()] + " " + d.getUTCFullYear() + " " +
         p(d.getUTCHours()) + ":" + p(d.getUTCMinutes()) + ":" +
         p(d.getUTCSeconds()) + " +0000";
}

const isoDay = (d) => d.toISOString().slice(0, 10);

/* ---------- build ---------- */

const today = Math.floor(Date.now() / MS_PER_DAY);
const entries = [];

for (let n = 0; n < DAYS; n++) {
  const utcDay = today - n;
  const item = ITEMS[indexForDay(utcDay)];
  const date = new Date(utcDay * MS_PER_DAY);

  const title = text(item.title || item.name);
  const alias = text(item.alias);
  const why = text(item.why);
  const link = SITE + "/?item=" + encodeURIComponent(item.slug);

  const body = [
    '<p><img src="' + SITE + "/" + item.sprite + '" alt=""></p>',
    "<p><strong>" + esc(title) + "</strong>" + (alias ? "<br><em>" + esc(alias) + "</em>" : "") + "</p>",
    item.rarityTier ? "<p>Rarity: " + esc(text(item.rarityTier)) + "</p>" : "",
    why ? "<p>" + esc(why) + "</p>" : ""
  ].filter(Boolean).join("\n");

  entries.push(
    "    <item>\n" +
    "      <title>" + esc(title) + "</title>\n" +
    "      <link>" + esc(link) + "</link>\n" +
    /* One entry per day, not per item. The rotation repeats, and a guid tied
       to the slug alone would make a reader swallow every repeat. */
    '      <guid isPermaLink="false">' + SITE + "/" + isoDay(date) + "</guid>\n" +
    "      <pubDate>" + rfc822(date) + "</pubDate>\n" +
    "      <description><![CDATA[\n" + body + "\n      ]]></description>\n" +
    "    </item>"
  );
}

const xml =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n' +
  "  <channel>\n" +
  "    <title>D2 Item of the Day</title>\n" +
  "    <link>" + SITE + "/</link>\n" +
  "    <description>One rare Diablo 2 collector's item every day.</description>\n" +
  "    <language>en</language>\n" +
  '    <atom:link href="' + SITE + '/feed.xml" rel="self" type="application/rss+xml"/>\n' +
  "    <lastBuildDate>" + rfc822(new Date()) + "</lastBuildDate>\n" +
  "    <ttl>720</ttl>\n" +
  '    <image>\n' +
  "      <url>" + SITE + "/img/og-card.png</url>\n" +
  "      <title>D2 Item of the Day</title>\n" +
  "      <link>" + SITE + "/</link>\n" +
  "    </image>\n" +
  entries.join("\n") + "\n" +
  "  </channel>\n" +
  "</rss>\n";

fs.writeFileSync(path.join(ROOT, "feed.xml"), xml);
console.log("feed.xml written, " + DAYS + " days, newest " + ITEMS[indexForDay(today)].slug);

/* ---------- sitemap ---------- */

/* The one page in the sitemap changes every day, so a lastmod frozen at the
   day someone hand-edited it tells crawlers the opposite. Keep it current. */
const sitemapPath = path.join(ROOT, "sitemap.xml");
const sitemap = fs.readFileSync(sitemapPath, "utf8");
const todayIso = isoDay(new Date(today * MS_PER_DAY));
const bumped = sitemap.replace(
  /<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/,
  "<lastmod>" + todayIso + "</lastmod>"
);
if (bumped === sitemap && !sitemap.includes(todayIso)) {
  console.error("build-feed: no <lastmod> to update in sitemap.xml.");
  process.exit(1);
}
fs.writeFileSync(sitemapPath, bumped);
console.log("sitemap.xml lastmod set to " + todayIso);
