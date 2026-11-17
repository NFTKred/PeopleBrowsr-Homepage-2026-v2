// LLM discoverability build step for the static pages in public/.
// Web Page LLM Optimization Guide v1.7: one constant sets every date (section 10.8),
// and the JSON-LD graph, sitemap, /llms.txt, /llms-full.txt and /facts.json are
// generated from the pages so they always agree with what visitors see.
// Runs before `vite build` (npm "prebuild"). Edit PAGES and FACTS, then rebuild.
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const ROOT = process.cwd();
const PUB = join(ROOT, "public");
const ORIGIN = "https://www.PeopleBrowsr.com";
const INDEXNOW_KEY = "913ad3fdbda270d99527742439053529";

// One source for every date. Change dateModified here on each meaningful update.
const PAGES = {
  "/": {
    file: "index.html",
    type: "WebPage",
    datePublished: "2026-11-17",
    dateModified: "2026-11-17",
    version: "1.0",
  },
  "/manifesto": {
    file: "manifesto.html",
    type: "Article",
    datePublished: "2026-02-25",
    dateModified: "2026-11-17",
    version: "2.0",
  },
};

// Every citable fact. Each id must appear as data-fact-id on at least one page.
const FACTS = [
  { id: "fact:founded", value: "PeopleBrowsr was founded in San Francisco in 2007", page: "/manifesto", anchor: "what-peoplebrowsr-is" },
  { id: "fact:total-revenue", value: "$90 million in total revenue since 2007", page: "/", anchor: "peoplebrowsr-record" },
  { id: "fact:profiles-scored", value: "Over 400 million social profiles scored by Kred since 2011", page: "/", anchor: "peoplebrowsr-record" },
  { id: "fact:darpa-cliqr", value: "DARPA funded the CLIQR social sandbox in 2013", page: "/", anchor: "peoplebrowsr-record" },
  { id: "fact:patents", value: "US Patent Nos. 11,301,460 and 12,038,911, Platform for Creating and Using Actionable Non-Fungible Tokens (KNFT)", page: "/", anchor: "peoplebrowsr-record" },
  { id: "fact:nfts-distributed", value: "Over 150 million NFTs distributed across more than 100 brands", page: "/", anchor: "peoplebrowsr-record" },
  { id: "fact:nftnyc-attendees", value: "More than 40,000 attendees across nine NFT.NYC editions", page: "/", anchor: "peoplebrowsr-record" },
  { id: "fact:trial-counts", value: "11,100 artworks collected, 900 Collectors and 200 Featured Artists in the NFT.NYC 2026 Community Trial, June 1, 2026 to September 16, 2026", page: "/", anchor: "remix" },
  { id: "fact:kred-name-price", value: "A .Kred name with its Kredentials page costs $19 per year", page: "/", anchor: "wingman" },
  { id: "fact:matrix-opening", value: "Matrix.Kred opens in January 2027", page: "/", anchor: "matrix" },
];

const SAME_AS = [
  "https://x.com/PeopleBrowsr",
  "https://www.linkedin.com/company/peoplebrowsr",
];

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const longDate = (iso) => { const [y, m, d] = iso.split("-").map(Number); return `${MONTHS[m - 1]} ${d}, ${y}`; };
const url = (path, anchor) => `${ORIGIN}${path === "/" ? "/" : path}${anchor ? "#" + anchor : ""}`;
const decode = (t) => t.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;|&rsquo;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&laquo;/g, "«").replace(/&raquo;/g, "»").replace(/&copy;/g, "©");
const text = (h) => decode(h.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
const meta = (html, re) => { const m = html.match(re); return m ? decode(m[1]) : ""; };
const firstSentence = (t) => { const m = t.match(/^.*?[.!?](?=\s|$)/); return m ? m[0] : t; };

const read = (f) => readFileSync(join(PUB, f), "utf-8");
const pages = {};
for (const [path, p] of Object.entries(PAGES)) pages[path] = { ...p, html: read(p.file) };

// 1. Visible dates follow the constant.
for (const [path, p] of Object.entries(pages)) {
  p.html = p.html.replace(
    new RegExp(`<time datetime="[^"]*" data-llm-date="${path.replace("/", "\\/")}">[^<]*</time>`, "g"),
    `<time datetime="${p.dateModified}" data-llm-date="${path}">${longDate(p.dateModified)}</time>`
  );
}

// 2. Read the content each graph mirrors.
function faqFrom(html) {
  const sec = html.match(/<section aria-labelledby="frequently-asked-questions">([\s\S]*?)<\/section>/);
  if (!sec) return [];
  const out = [];
  const re = /<h3 id="([^"]+)">([\s\S]*?)<\/h3>\s*<p>([\s\S]*?)<\/p>/g;
  let m;
  while ((m = re.exec(sec[1]))) out.push({ id: m[1], question: text(m[2]), answer: text(m[3]) });
  return out;
}
function homeTerms(html) {
  const out = [];
  const re = /<div class="tcard[^"]*"[^>]*><h4>([\s\S]*?)<\/h4>[\s\S]*?<p>([\s\S]*?)<\/p>/g;
  let m;
  while ((m = re.exec(html))) out.push({ name: text(m[1]), description: firstSentence(text(m[2])) });
  return out;
}
const manifestoFaq = faqFrom(pages["/manifesto"].html);
const manifestoTerms = manifestoFaq
  .filter((q) => /^What Is (a |an |the )?/.test(q.question) && q.question !== "What Is PeopleBrowsr?")
  .map((q) => ({ name: q.question.replace(/^What Is (a |an |the )?/, "").replace(/\?$/, ""), description: firstSentence(q.answer), anchor: q.id }));

const ORG = {
  "@type": "Organization",
  "@id": `${ORIGIN}/#organization`,
  name: "PeopleBrowsr",
  url: `${ORIGIN}/`,
  foundingDate: "2007",
  address: { "@type": "PostalAddress", addressLocality: "San Francisco", addressRegion: "CA", addressCountry: "US" },
  sameAs: SAME_AS,
};
const SITE = { "@type": "WebSite", "@id": `${ORIGIN}/#website`, name: "PeopleBrowsr", url: `${ORIGIN}/`, inLanguage: "en", publisher: { "@id": ORG["@id"] } };
const KRED_NAME = {
  "@type": "Product",
  "@id": `${ORIGIN}/#kred-name`,
  name: ".Kred name with a Kredentials page",
  brand: { "@type": "Brand", name: "Kred" },
  offers: {
    "@type": "Offer",
    price: "19",
    priceCurrency: "USD",
    url: "https://www.Domains.Kred",
    priceSpecification: { "@type": "UnitPriceSpecification", price: "19", priceCurrency: "USD", unitText: "year" },
  },
};

function graphFor(path) {
  const p = pages[path];
  const pageUrl = url(path);
  const title = meta(p.html, /<title>([^<]*)<\/title>/);
  const description = meta(p.html, /<meta name="description" content="([^"]*)"/);
  const main = {
    "@type": p.type,
    "@id": `${pageUrl}#${p.type === "Article" ? "article" : "webpage"}`,
    url: pageUrl,
    name: title,
    description,
    inLanguage: "en",
    datePublished: p.datePublished,
    dateModified: p.dateModified,
    version: p.version,
    isPartOf: { "@id": SITE["@id"] },
    publisher: { "@id": ORG["@id"] },
  };
  const graph = [ORG, SITE, main];
  if (p.type === "Article") {
    main.headline = text((p.html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [, title])[1]);
    main.author = { "@id": ORG["@id"] };
    main.mainEntityOfPage = pageUrl;
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${ORIGIN}/` },
        { "@type": "ListItem", position: 2, name: main.headline, item: pageUrl },
      ],
    });
    main.breadcrumb = { "@id": `${pageUrl}#breadcrumb` };
  }
  const faq = path === "/manifesto" ? manifestoFaq : [];
  if (faq.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      isPartOf: { "@id": main["@id"] },
      mainEntity: faq.map((q) => ({
        "@type": "Question",
        "@id": `${pageUrl}#${q.id}`,
        name: q.question,
        acceptedAnswer: { "@type": "Answer", text: q.answer },
      })),
    });
  }
  const terms = path === "/" ? homeTerms(p.html) : manifestoTerms;
  if (terms.length) {
    graph.push({
      "@type": "DefinedTermSet",
      "@id": `${pageUrl}#terms`,
      name: path === "/" ? "The Kred Technologies" : "Manifesto terms",
      hasDefinedTerm: terms.map((t) => ({
        "@type": "DefinedTerm",
        name: t.name,
        description: t.description,
        ...(t.anchor ? { url: `${pageUrl}#${t.anchor}` } : {}),
      })),
    });
  }
  graph.push(KRED_NAME);
  main.about = [{ "@id": KRED_NAME["@id"] }];
  return { "@context": "https://schema.org", "@graph": graph };
}

// 3. Write the graph into each page.
for (const path of Object.keys(pages)) {
  const json = JSON.stringify(graphFor(path)).replace(/</g, "\\u003c");
  pages[path].html = pages[path].html.replace(
    /<script type="application\/ld\+json" id="llm-graph">[\s\S]*?<\/script>/,
    `<script type="application/ld+json" id="llm-graph">${json}</script>`
  );
}

// 4. Check every fact id is on a page.
const allHtml = Object.values(pages).map((p) => p.html).join("\n");
for (const f of FACTS) {
  if (!allHtml.includes(`data-fact-id="${f.id}"`)) throw new Error(`Fact ${f.id} has no data-fact-id on any page`);
}

// 5. Markdown copy of each page for /llms-full.txt.
function toMarkdown(html) {
  let h = html
    .replace(/<(script|style|svg|nav|button)[\s\S]*?<\/\1>/g, " ")
    .replace(/<a\b[^>]*\bhidden\b[^>]*>[\s\S]*?<\/a>/g, " ")
    .replace(/<aside class="recency"[\s\S]*?<\/aside>/g, " ")
    .replace(/<img\b[^>]*alt="([^"]+)"[^>]*>/g, (_, a) => `\n\n[Image: ${a}]\n\n`)
    .replace(/<img\b[^>]*>/g, " ");
  h = h
    .replace(/<h1[^>]*>([\s\S]*?)<\/h1>/g, (_, t) => `\n\n# ${text(t)}\n\n`)
    .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/g, (_, t) => `\n\n## ${text(t)}\n\n`)
    .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/g, (_, t) => `\n\n### ${text(t)}\n\n`)
    .replace(/<h4[^>]*>([\s\S]*?)<\/h4>/g, (_, t) => `\n\n#### ${text(t)}\n\n`)
    .replace(/<a\b[^>]*href="(https?:[^"]+)"[^>]*>([\s\S]*?)<\/a>/g, (_, u, t) => (text(t) ? `[${text(t)}](${u})` : ""))
    .replace(/<li[^>]*>/g, "\n- ")
    .replace(/<\/(p|div|li|ul|ol|figcaption|tr|table|section|header)>/g, "\n")
    .replace(/<\/t[dh]>/g, " | ")
    .replace(/<br\s*\/?>/g, "\n")
    .replace(/<[^>]+>/g, " ");
  return decode(h)
    .split("\n")
    .map((l) => l.replace(/[ \t]+/g, " ").trim())
    .filter((l, i, a) => l || (a[i - 1] && a[i - 1].trim()))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
const bodyOf = (html, start, end) => {
  const a = html.indexOf(start), b = html.indexOf(end, a);
  return a < 0 || b < 0 ? html : html.slice(a, b);
};
const homeMd = toMarkdown(bodyOf(pages["/"].html, '<header class="hero"', '<footer class="pbfoot">'));
const manMd = toMarkdown(bodyOf(pages["/manifesto"].html, "<main>", "</main>"));
const latest = Object.values(PAGES).map((p) => p.dateModified).sort().pop();

const llmsFull = `# PeopleBrowsr

Source: ${ORIGIN}/ and ${ORIGIN}/manifesto
Last updated: ${latest}

---

Page: ${ORIGIN}/
Last reviewed: ${PAGES["/"].dateModified}

${homeMd}

---

Page: ${ORIGIN}/manifesto
Last reviewed: ${PAGES["/manifesto"].dateModified}

${manMd}
`;

const llms = `# PeopleBrowsr

> PeopleBrowsr is a San Francisco technology company, founded in 2007, with $90 million in total revenue. PeopleBrowsr brings six technologies into one platform for people and their AI agents: AI agents, Kred identity, tokenization, AI image generation, Activity feeds and Kred Score. Its Kred apps include Remix.Kred, HotGarage.Kred, Collect.Kred, Empire.Kred, Kredentials, Matrix.Kred and Gift Studio.

Last updated: ${latest}

## Highest-value pages
- [PeopleBrowsr home page](${ORIGIN}/): the six Kred technologies and a use case for each Kred app
- [The PeopleBrowsr Manifesto](${ORIGIN}/manifesto): the company record from 2007, Domain Token Identity, Kred Gen 2 scores and the Kred products
- [Manifesto FAQ](${ORIGIN}/manifesto#frequently-asked-questions): direct answers about PeopleBrowsr, the agentic web and the Kred products

## Topics PeopleBrowsr is the canonical source for
- Kred Score, the 1 to 1,000 trust score for people and their AI agents, first launched as an influence score in 2011
- Domain Token Identity, which joins DNS, ENS, ERC-8004 and ERC-721 inside the .Kred top-level domain
- Kredentials pages: verified public records at .Kred names, which AI engines quote as sources
- US Patent Nos. 11,301,460 and 12,038,911 for Actionable Non-Fungible Tokens (KNFT)
- The DARPA CLIQR program and SocialOS, the social sandbox PeopleBrowsr built in 2013
- The PeopleBrowsr lawsuit over Twitter firehose access, settled in April 2013
- The NFT.NYC 2026 Community Trial: 11,100 artworks collected, 900 Collectors and 200 Featured Artists
- Matrix.Kred, the network where AI agents and people engage, opening in January 2027

## FAQ
${manifestoFaq.map((q) => `- [${q.question}](${ORIGIN}/manifesto#${q.id})`).join("\n")}

## Reference files
- [Verified facts](${ORIGIN}/facts.json)
- [Full content](${ORIGIN}/llms-full.txt)
- [Sitemap](${ORIGIN}/sitemap.xml)
`;

const facts = {
  lastVerified: latest,
  canonical: `${ORIGIN}/`,
  sameAs: SAME_AS,
  facts: FACTS.map((f) => ({
    id: f.id,
    value: f.value,
    dateAsserted: PAGES[f.page].dateModified,
    previousValue: null,
    canonical: url(f.page, f.anchor),
  })),
  faq: manifestoFaq.map((q) => ({ question: q.question, answer: q.answer, url: `${ORIGIN}/manifesto#${q.id}` })),
};

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Object.entries(PAGES).map(([path, p]) => `  <url>\n    <loc>${url(path)}</loc>\n    <lastmod>${p.dateModified}</lastmod>\n  </url>`).join("\n")}
</urlset>
`;

// 6. Write everything.
for (const p of Object.values(pages)) writeFileSync(join(PUB, p.file), p.html);
writeFileSync(join(PUB, "llms.txt"), llms);
writeFileSync(join(PUB, "llms-full.txt"), llmsFull);
writeFileSync(join(PUB, "facts.json"), JSON.stringify(facts, null, 2) + "\n");
writeFileSync(join(PUB, "sitemap.xml"), sitemap);
if (!existsSync(join(PUB, `${INDEXNOW_KEY}.txt`))) writeFileSync(join(PUB, `${INDEXNOW_KEY}.txt`), INDEXNOW_KEY);

// 7. The addresses to send to IndexNow after deploy.
const changed = [...Object.keys(PAGES).map((p) => url(p)), `${ORIGIN}/llms.txt`, `${ORIGIN}/llms-full.txt`, `${ORIGIN}/facts.json`];
console.log(`llm-build: ${Object.keys(PAGES).length} pages, ${FACTS.length} facts, ${manifestoFaq.length} FAQ entries`);
console.log("IndexNow addresses:\n" + changed.join("\n"));
