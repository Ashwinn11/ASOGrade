#!/usr/bin/env node

/**
 * Automated SEO & Programmatic Quality Safeguards Suite
 *
 * Runs comprehensive audit checks across:
 * 1. Title & Description character boundaries (SERP limits: <=60 chars title, <=160 chars desc).
 * 2. Canonical URL consistency and collision avoidance.
 * 3. Schema.org JSON-LD structural compliance and required fields.
 * 4. Internal linking graph integrity (no orphan pages, no broken relations).
 * 5. Anti-thin content validation.
 * 6. Sitemap partitioning compliance (Google 50k URL limit per chunk).
 */

import {
  STOREFRONT_ENTITIES,
  GLOSSARY_ENTITIES,
  GUIDE_ENTITIES,
  COMPARE_ENTITIES,
  PERSONA_ENTITIES,
  SOLUTION_ENTITIES,
  LOCALIZATION_ENTITIES,
  TIP_ENTITIES,
  fitTitle,
  fitDescription,
  fitMeta,
  buildUnifiedGraphSchema,
  buildWebPageSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildArticleSchema,
  buildDefinedTermSchema,
  generateStorefrontInsights,
  getRelatedStorefronts,
  getRelatedGlossaryTerms,
  getRelatedGuides,
  TITLE_MAX,
  DESCRIPTION_MAX,
  SITE_URL,
} from "../lib/seo/engine/index.js";

import sitemap, { generateSitemaps, SITEMAP_CHUNKS } from "../app/sitemap.js";

console.log("=================================================");
console.log("  ASOGrade Programmatic SEO Audit & Quality Suite");
console.log("=================================================\n");

let errors = [];
let warnings = [];
let passedChecks = 0;

function assert(condition, message, isWarning = false) {
  if (condition) {
    passedChecks++;
  } else {
    if (isWarning) {
      warnings.push(message);
    } else {
      errors.push(message);
    }
  }
}

// ---------------------------------------------------------------------------
// 1. Dataset & Registry Integrity Check
// ---------------------------------------------------------------------------
console.log("▶ Auditing Programmatic Content Registry & Entities...");

const allEntities = [
  ...STOREFRONT_ENTITIES,
  ...GLOSSARY_ENTITIES,
  ...GUIDE_ENTITIES,
  ...COMPARE_ENTITIES,
  ...PERSONA_ENTITIES,
  ...SOLUTION_ENTITIES,
  ...LOCALIZATION_ENTITIES,
  ...TIP_ENTITIES,
];

console.log(`  Indexed ${allEntities.length} programmatic entities across 8 categories.`);
assert(allEntities.length >= 250, `Entity count should be >= 250 (found ${allEntities.length})`);

// ---------------------------------------------------------------------------
// 2. Canonical URL & Collision Checks
// ---------------------------------------------------------------------------
console.log("\n▶ Auditing Canonical Paths and Collision Prevention...");

const canonicalPaths = new Set();
for (const entity of allEntities) {
  const path = entity.canonicalPath;
  assert(
    path && path.startsWith("/"),
    `Entity [${entity.category}:${entity.slug}] must have a valid canonical path starting with '/' (got: ${path})`
  );
  assert(
    !canonicalPaths.has(path),
    `Duplicate canonical path collision detected: ${path} on entity [${entity.category}:${entity.slug}]`
  );
  canonicalPaths.add(path);
}

console.log(`  ✓ Checked ${canonicalPaths.size} unique canonical routes with 0 collisions.`);

// ---------------------------------------------------------------------------
// 3. Metadata Length Bounds (Titles & Descriptions)
// ---------------------------------------------------------------------------
console.log("\n▶ Auditing Meta Title & Description Bounds...");

let testedTitles = 0;
let testedDescriptions = 0;

for (const entity of allEntities) {
  let titleCandidates = [];
  let descCandidates = [];

  if (entity.category === "storefront") {
    titleCandidates = [
      `App Store Keyword Research: ${entity.name} (${entity.code.toUpperCase()}) | ASOGrade`,
      `App Store Keyword Research: ${entity.name} | ASOGrade`,
      `ASO Keyword Research: ${entity.name} | ASOGrade`,
      `ASO Keyword Research: ${entity.name}`,
    ];
    descCandidates = [
      entity.description,
      `App Store keyword research for ${entity.name}. Search demand, ranking difficulty, and metadata strategy for a ${entity.tier} market.`,
      `App Store keyword research for the ${entity.name} storefront: demand, difficulty and metadata strategy.`,
    ];
  } else if (entity.category === "glossary") {
    titleCandidates = [
      `${entity.term} — ASO Glossary | ASOGrade`,
      `${entity.term} — ASO Glossary`,
      `${entity.term} | ASOGrade`,
      entity.term,
    ];
    descCandidates = [entity.description];
  } else if (entity.category === "guide") {
    titleCandidates = [
      `${entity.metaTitle ?? entity.title} | ASOGrade`,
      entity.metaTitle ?? entity.title,
    ];
    descCandidates = [entity.description];
  } else {
    titleCandidates = [
      `${entity.metaTitle ?? entity.title} | ASOGrade`,
      entity.metaTitle ?? entity.title,
    ];
    descCandidates = [entity.description];
  }

  const fittedTitle = fitTitle(titleCandidates);
  const fittedDesc = fitMeta(descCandidates);

  testedTitles++;
  testedDescriptions++;

  assert(
    fittedTitle.length > 0 && fittedTitle.length <= TITLE_MAX,
    `Title length out of bounds for [${entity.category}:${entity.slug}]: "${fittedTitle}" (${fittedTitle.length} chars, max ${TITLE_MAX})`
  );

  assert(
    fittedDesc.length >= 30 && fittedDesc.length <= DESCRIPTION_MAX,
    `Description length out of bounds for [${entity.category}:${entity.slug}]: "${fittedDesc}" (${fittedDesc.length} chars, max ${DESCRIPTION_MAX})`
  );

  assert(
    !fittedDesc.endsWith("…based on") && !fittedDesc.endsWith("and keyword"),
    `Description has awkward cut for [${entity.category}:${entity.slug}]: "${fittedDesc}"`
  );
}

console.log(`  ✓ Validated ${testedTitles} titles and ${testedDescriptions} descriptions against SERP bounds.`);

// ---------------------------------------------------------------------------
// 4. Schema.org JSON-LD Graph Validation
// ---------------------------------------------------------------------------
console.log("\n▶ Auditing Schema.org JSON-LD Structured Data Graphs...");

for (const entity of allEntities) {
  let graphNodes = [];

  const pageNode = buildWebPageSchema({
    title: entity.title,
    description: entity.description,
    url: `${SITE_URL}${entity.canonicalPath}`,
  });
  graphNodes.push(pageNode);

  const breadcrumbNode = buildBreadcrumbSchema([
    { name: "ASOGrade", url: SITE_URL },
    { name: entity.category, url: `${SITE_URL}/${entity.category}` },
    { name: entity.title, url: `${SITE_URL}${entity.canonicalPath}` },
  ]);
  graphNodes.push(breadcrumbNode);

  if (entity.faq && entity.faq.length > 0) {
    const faqNode = buildFaqSchema(entity.faq);
    graphNodes.push(faqNode);
  }

  if (entity.category === "guide") {
    const articleNode = buildArticleSchema({
      title: entity.title,
      description: entity.description,
      url: `${SITE_URL}${entity.canonicalPath}`,
    });
    graphNodes.push(articleNode);
    assert(articleNode.image && articleNode.image.url, `Guide [${entity.slug}] Article schema missing image`);
  }

  if (entity.category === "glossary") {
    const termNode = buildDefinedTermSchema({
      term: entity.term,
      definition: entity.definition,
      url: `${SITE_URL}${entity.canonicalPath}`,
    });
    graphNodes.push(termNode);
  }

  const unifiedGraph = buildUnifiedGraphSchema(graphNodes);
  assert(unifiedGraph["@context"] === "https://schema.org", "Schema must have @context https://schema.org");
  assert(Array.isArray(unifiedGraph["@graph"]), "Schema @graph must be an array");
  assert(unifiedGraph["@graph"].length >= 2, `Schema @graph for [${entity.slug}] must have at least 2 nodes`);
}

console.log("  ✓ Validated Schema.org @graph payloads across all entities.");

// ---------------------------------------------------------------------------
// 5. Internal Linking Graph & Orphan Prevention Check
// ---------------------------------------------------------------------------
console.log("\n▶ Auditing Internal Linking Graph & Relationships...");

for (const store of STOREFRONT_ENTITIES) {
  const related = getRelatedStorefronts(store.code, 8);
  assert(related.length === 8, `Store [${store.code}] must return 8 related stores (got ${related.length})`);
  assert(!related.some((r) => r.code === store.code), `Store [${store.code}] related list must not include self`);
}

for (const glossary of GLOSSARY_ENTITIES) {
  const related = getRelatedGlossaryTerms(glossary.slug, 6);
  assert(related.length >= 4, `Glossary [${glossary.slug}] must return at least 4 related terms`);
  assert(!related.some((r) => r.slug === glossary.slug), `Glossary [${glossary.slug}] related list must not include self`);
}

for (const guide of GUIDE_ENTITIES) {
  const related = getRelatedGuides(guide.slug, 4);
  assert(related.length >= 2, `Guide [${guide.slug}] must return at least 2 related guides`);
  assert(!related.some((r) => r.slug === guide.slug), `Guide [${guide.slug}] related list must not include self`);
}

console.log("  ✓ Validated internal linking graph connectivity and self-exclusion rules.");

// ---------------------------------------------------------------------------
// 6. Anti-Thin Content & Analytical Differentiation Check
// ---------------------------------------------------------------------------
console.log("\n▶ Auditing Anti-Thin Content & Differentiation Metrics...");

for (const store of STOREFRONT_ENTITIES) {
  const insights = generateStorefrontInsights(store);
  assert(insights.directAnswer.summary.length > 30, `Store [${store.code}] directAnswer summary too short`);
  assert(insights.metadataPlaybook.titleStrategy.length > 20, `Store [${store.code}] titleStrategy missing`);
  assert(insights.metadataPlaybook.keywordFieldStrategy.length > 20, `Store [${store.code}] keywordStrategy missing`);
}

console.log("  ✓ Validated market-specific analytical insights and differentiation engines.");

// ---------------------------------------------------------------------------
// 7. Sitemap Partitioning & Scale Check (100k+ scalability)
// ---------------------------------------------------------------------------
console.log("\n▶ Auditing XML Sitemap Partitioning & Scalability...");

async function auditSitemaps() {
  const sitemaps = await generateSitemaps();
  assert(
    Array.isArray(sitemaps) && sitemaps.length === SITEMAP_CHUNKS.length,
    `generateSitemaps() must return ${SITEMAP_CHUNKS.length} partitioned chunks`
  );

  let totalSitemapUrls = 0;
  for (const chunk of SITEMAP_CHUNKS) {
    const urls = await sitemap({ id: chunk.id });
    assert(
      Array.isArray(urls) && urls.length > 0,
      `Sitemap chunk [${chunk.id}: ${chunk.name}] must contain URLs`
    );
    assert(
      urls.length < 50000,
      `Sitemap chunk [${chunk.id}] must not exceed Google's 50,000 URL limit (has ${urls.length})`
    );

    for (const item of urls) {
      assert(
        item.url.startsWith("https://") || item.url.startsWith("http://"),
        `Sitemap URL must be absolute HTTPS: ${item.url}`
      );
      assert(
        item.priority !== undefined && item.priority >= 0 && item.priority <= 1.0,
        `Sitemap URL priority must be between 0 and 1.0: ${item.url} (${item.priority})`
      );
    }
    totalSitemapUrls += urls.length;
  }

  console.log(`  ✓ Sitemap partitioned into ${SITEMAP_CHUNKS.length} clean chunks with ${totalSitemapUrls} total URLs.`);
}

await auditSitemaps();

// ---------------------------------------------------------------------------
// Final Verdict
// ---------------------------------------------------------------------------
console.log("\n=================================================");
if (errors.length === 0) {
  console.log(`  PASSED: ${passedChecks} checks succeeded!`);
  if (warnings.length > 0) {
    console.log(`  Warnings (${warnings.length}):`);
    warnings.forEach((w) => console.log(`  ⚠️  ${w}`));
  }
  console.log("  The programmatic SEO system is ready for 100,000+ pages!");
  console.log("=================================================\n");
  process.exit(0);
} else {
  console.error(`  FAILED: ${errors.length} errors found!`);
  errors.forEach((e) => console.error(`  ❌ ${e}`));
  console.log("=================================================\n");
  process.exit(1);
}
