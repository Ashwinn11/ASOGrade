/**
 * Shared JSON-LD schema builders for all ASOGrade pages.
 * Forwarded and unified through the modern SEO Engine.
 */

export {
  ORG_ID,
  WEBSITE_ID,
  organizationReference,
  buildOrganizationSchema as organizationSchema,
  buildWebsiteSchema as websiteSchema,
  buildSoftwareApplicationSchema as softwareApplicationSchema,
  buildBreadcrumbSchema as breadcrumbSchema,
  buildFaqSchema as faqSchema,
  buildDefinedTermSchema as definedTermSchema,
  buildArticleSchema as articleSchema,
  buildWebPageSchema as webPageSchema,
  buildWebPageSchema as collectionPageSchema,
  buildUnifiedGraphSchema,
} from "./engine/schema";
