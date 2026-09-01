/**
 * Programmatic SEO Engine — Core Types & Schemas
 *
 * Provides strongly-typed contracts for datasets, metadata synthesizers,
 * Schema.org graph builders, internal linking graphs, and anti-thin-content engines.
 */

export type PseoCategory =
  | "storefront"
  | "glossary"
  | "guide"
  | "compare"
  | "persona"
  | "solution"
  | "localization"
  | "tip";

export type TierLevel = "major" | "mid" | "emerging";

export type RegionId =
  | "north-america"
  | "latam"
  | "europe"
  | "middle-east-africa"
  | "asia-pacific";

export interface FaqItem {
  q: string;
  a: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface SchemaCrumb {
  name: string;
  url: string;
}

export interface LinkCardItem {
  title: string;
  description: string;
  href: string;
  badge?: string;
  kicker?: string;
}

export interface DirectAnswerBlock {
  heading: string;
  summary: string;
  takeaways?: string[];
  bestFor?: string;
  caution?: string;
}

/**
 * Universal interface for all programmatic content entities.
 */
export interface BasePseoEntity {
  slug: string;
  category: PseoCategory;
  title: string;
  metaTitle?: string;
  description: string;
  metaDescription?: string;
  canonicalPath: string;
  updatedAt?: string;
  publishedAt?: string;
  tags?: string[];
  faq?: FaqItem[];
  directAnswer?: DirectAnswerBlock;
}

/**
 * Storefront / Country Market Entity
 */
export interface StorefrontEntity extends BasePseoEntity {
  category: "storefront";
  code: string;
  name: string;
  region: RegionId;
  tier: TierLevel;
  lang: string;
  langCode: string;
  script: string;
  facts: string[];
  isMajor: boolean;
  marketMetrics: {
    languageReachCount: number;
    languageReachPercent: number;
    scriptCharacterEfficiency: number; // e.g., Kanji buys 2.5x semantic density of Latin
    competitionIndex: number; // 0-100 relative index
    averageDifficultyDiscount: number; // typical delta vs US market (0 to -40)
    topSearchVerticals: string[];
  };
}

/**
 * Glossary Term Entity
 */
export interface GlossaryEntity extends BasePseoEntity {
  category: "glossary";
  term: string;
  definition: string;
  formula?: string;
  body: string[];
  relatedSlugs: string[];
  synonyms?: string[];
}

/**
 * Guide Entity
 */
export interface GuideSection {
  heading: string;
  body: string[];
  keyTakeaway?: string;
}

export interface GuideEntity extends BasePseoEntity {
  category: "guide";
  readingTimeMinutes: number;
  sections: GuideSection[];
  relatedItems: { slug: string; label: string; type: "guide" | "glossary" }[];
  targetSkillLevel?: "beginner" | "intermediate" | "advanced";
}

/**
 * Competitor Alternative Entity
 */
export interface CompareEntity extends BasePseoEntity {
  category: "compare";
  competitorName: string;
  subtitle: string;
  priceRange: string;
  setupTime: string;
  platform: string;
  quickVerdict: {
    summary: string;
    bestForCompetitor: string;
    bestForASOGrade?: string;
    bestForAsograde?: string;
  };
  comparisonMatrix: {
    feature: string;
    asograde: string;
    competitor: string;
    advantage: "asograde" | "competitor" | "neutral";
  }[];
  breakdown: {
    heading: string;
    paragraphs: string[];
  }[];
}

/**
 * Persona / Role Entity
 */
export interface PersonaEntity extends BasePseoEntity {
  category: "persona";
  audience: string;
  subtitle: string;
  breakdown: {
    heading: string;
    points: string[];
  }[];
  goodFit: string[];
  notGoodFit: string[];
  howItWorks: string[];
}

/**
 * Solution / Problem Entity
 */
export interface SolutionEntity extends BasePseoEntity {
  category: "solution";
  fixKey: string;
  subtitle: string;
  breakdown: {
    heading: string;
    points: string[];
  }[];
  howItWorks: string[];
}

/**
 * Localization / Language Cluster Entity
 */
export interface LocalizationEntity extends BasePseoEntity {
  category: "localization";
  language: string;
  langCode: string;
  storesCovered: string[];
  primaryMarket: string;
  facts: string[];
  keywordStrategies: {
    heading: string;
    points: string[];
  }[];
}

/**
 * Actionable ASO Tip Entity
 */
export interface TipEntity extends BasePseoEntity {
  category: "tip";
  shortAnswer: string;
  explanation: string[];
  ruleOfThumb?: string;
  relatedSlugs: string[];
}

export type AnyPseoEntity =
  | StorefrontEntity
  | GlossaryEntity
  | GuideEntity
  | CompareEntity
  | PersonaEntity
  | SolutionEntity
  | LocalizationEntity
  | TipEntity;
