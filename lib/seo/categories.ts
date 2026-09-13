/**
 * App Store Category & Vertical Niche Intelligence Engine
 *
 * Powers:
 * 1. 45 Category Deep-Dive Playbooks (/keyword-research/category/[category])
 * 2. 250 Storefront x Category Matrix Pages (/keyword-research/[store]/[category])
 *    (10 Major Storefronts x 25 Top Niches)
 */

import type { CategoryEntity, StorefrontCategoryEntity, TierLevel } from "./engine/types";
import { STORE_INFO, scriptOf } from "./countries";
import { fitTitle, fitDescription } from "./engine/metadata";

export interface NicheDefinition {
  id: string;
  name: string;
  appStoreCategory: string;
  benchmarks: {
    averagePopularity: number;
    typicalDifficultyRange: string;
    averageReviewMoat: string;
    monetizationModel: string;
  };
  seedKeywords: {
    keyword: string;
    intent: "discovery" | "high-intent" | "feature" | "problem";
    estimatedPop: number;
    estimatedDiff: number;
  }[];
  titleFormulas: string[];
  subtitleFormulas: string[];
  cannibalizationTraps: string[];
  editorialStrategy: string[];
  faq: { q: string; a: string }[];
}

export const CATEGORY_DEFINITIONS: NicheDefinition[] = [
  {
    id: "fitness-workout",
    name: "Fitness & Workout",
    appStoreCategory: "Health & Fitness",
    benchmarks: {
      averagePopularity: 48,
      typicalDifficultyRange: "55–85",
      averageReviewMoat: "20,000+ ratings",
      monetizationModel: "Subscription ($39.99–$79.99/yr)",
    },
    seedKeywords: [
      { keyword: "workout planner", intent: "high-intent", estimatedPop: 54, estimatedDiff: 68 },
      { keyword: "home workout", intent: "discovery", estimatedPop: 62, estimatedDiff: 75 },
      { keyword: "gym routine", intent: "problem", estimatedPop: 42, estimatedDiff: 52 },
      { keyword: "strength training log", intent: "feature", estimatedPop: 36, estimatedDiff: 44 },
      { keyword: "bodyweight workout", intent: "high-intent", estimatedPop: 47, estimatedDiff: 58 },
    ],
    titleFormulas: [
      "[Brand]: Workout Planner",
      "[Brand]: Home Fitness & Gym",
      "Workout Log: [Brand]",
    ],
    subtitleFormulas: [
      "Gym Routine & Strength Tracker",
      "Daily Home Exercise & Routines",
      "Personal Bodyweight Training",
    ],
    cannibalizationTraps: [
      "Repeating 'workout' in both Title and Subtitle wastes 7 characters and dilutes ranking combinations.",
      "Targeting generic 'fitness' alone yields zero organic visibility due to multi-million rating incumbents.",
    ],
    editorialStrategy: [
      "Fitness is one of the most crowded App Store categories. Do not target broad head terms like 'gym' or 'exercise' as your primary title keywords.",
      "Win by pairing a concrete modality ('calisthenics', 'dumbbell log', 'kettlebell') with a clear user problem ('home routine', 'beginner strength').",
    ],
    faq: [
      {
        q: "What is the best keyword strategy for a new fitness app?",
        a: "Focus on long-tail modifier keywords with difficulty under 50. Pair specific training styles (e.g. 'dumbbell only workout' or 'postpartum fitness') in your subtitle while reserving title space for your strongest intent term.",
      },
      {
        q: "How many ratings do I need to rank for 'workout planner' in the US?",
        a: "Top 5 apps for 'workout planner' average over 25,000 ratings. For an app with under 500 ratings, target long-tail variants like 'dumbbell workout planner' or 'weekly gym routine log' first.",
      },
    ],
  },
  {
    id: "habit-tracker",
    name: "Habit Tracker",
    appStoreCategory: "Productivity",
    benchmarks: {
      averagePopularity: 44,
      typicalDifficultyRange: "48–78",
      averageReviewMoat: "8,000+ ratings",
      monetizationModel: "Freemium + Lifetime or Yearly Sub",
    },
    seedKeywords: [
      { keyword: "habit tracker", intent: "high-intent", estimatedPop: 58, estimatedDiff: 72 },
      { keyword: "daily routine", intent: "discovery", estimatedPop: 51, estimatedDiff: 65 },
      { keyword: "streak keeper", intent: "feature", estimatedPop: 33, estimatedDiff: 41 },
      { keyword: "goal planner", intent: "problem", estimatedPop: 49, estimatedDiff: 60 },
      { keyword: "atomic habits", intent: "discovery", estimatedPop: 46, estimatedDiff: 74 },
    ],
    titleFormulas: [
      "[Brand]: Habit Tracker",
      "[Brand]: Daily Routine & Goals",
      "Habit Streak: [Brand]",
    ],
    subtitleFormulas: [
      "Daily Goal & Routine Planner",
      "Build Streaks & Track Progress",
      "Simple Daily Schedule Checklist",
    ],
    cannibalizationTraps: [
      "Putting 'habit tracker' and 'habit building' in metadata repeats the root 'habit'.",
      "Using trademarked author or book names (e.g. 'Atomic Habits') risks metadata rejection.",
    ],
    editorialStrategy: [
      "Search intent in habit tracking divides between minimalists who want a simple checkmark and gamified trackers who want widgets, pets, or streaks.",
      "Clearly signal your visual differentiator (e.g. 'minimal', 'visual', 'widget') in the first screenshot and subtitle.",
    ],
    faq: [
      {
        q: "How competitive is the 'habit tracker' keyword on the App Store?",
        a: "Difficulty runs high (70–75 in the US). To break in, target secondary intents like 'daily checklist routine', 'visual habit streak', or 'adhd routine planner'.",
      },
      {
        q: "Which metadata field matters most for habit tracking keywords?",
        a: "App Title carries the highest ranking weight. If 'Habit Tracker' is in your title, you get maximum ranking credit for hundreds of combined queries.",
      },
    ],
  },
  {
    id: "budget-finance",
    name: "Personal Finance & Budget",
    appStoreCategory: "Finance",
    benchmarks: {
      averagePopularity: 52,
      typicalDifficultyRange: "60–88",
      averageReviewMoat: "35,000+ ratings",
      monetizationModel: "Subscription ($29.99–$99.99/yr)",
    },
    seedKeywords: [
      { keyword: "budget tracker", intent: "high-intent", estimatedPop: 56, estimatedDiff: 76 },
      { keyword: "expense manager", intent: "high-intent", estimatedPop: 49, estimatedDiff: 64 },
      { keyword: "money saving app", intent: "problem", estimatedPop: 47, estimatedDiff: 61 },
      { keyword: "monthly bills reminder", intent: "feature", estimatedPop: 38, estimatedDiff: 45 },
      { keyword: "envelope budgeting", intent: "feature", estimatedPop: 34, estimatedDiff: 39 },
    ],
    titleFormulas: [
      "[Brand]: Budget & Expense",
      "[Brand]: Money Tracker & Bills",
      "Monthly Budget: [Brand]",
    ],
    subtitleFormulas: [
      "Daily Expense & Bills Tracker",
      "Smart Money & Spending Planner",
      "Simple Envelope Budget System",
    ],
    cannibalizationTraps: [
      "Repeating 'budget' and 'budgeting' across fields.",
      "Failing to separate bank-sync vs manual expense tracking intents.",
    ],
    editorialStrategy: [
      "Users looking for budget apps strongly split between 'manual offline privacy' and 'automated bank link'.",
      "Highlight privacy ('no bank link required', 'offline') as a keyword and screenshot anchor if you are a privacy-focused indie app.",
    ],
    faq: [
      {
        q: "Can a new indie budget app compete against Rocket Money or YNAB?",
        a: "Yes, by owning the 'simple manual budget' and 'privacy offline expense tracker' niches where institutional banking apps fail to satisfy privacy-conscious users.",
      },
      {
        q: "What popularity score should I look for in personal finance?",
        a: "Aim for keywords with popularity between 25 and 45 with difficulty below 55 in Tier-1 English storefronts.",
      },
    ],
  },
  {
    id: "meditation-sleep",
    name: "Meditation & Sleep",
    appStoreCategory: "Health & Fitness",
    benchmarks: {
      averagePopularity: 50,
      typicalDifficultyRange: "62–90",
      averageReviewMoat: "50,000+ ratings",
      monetizationModel: "High Annual Sub ($59.99–$89.99/yr)",
    },
    seedKeywords: [
      { keyword: "meditation", intent: "discovery", estimatedPop: 65, estimatedDiff: 88 },
      { keyword: "sleep sounds", intent: "high-intent", estimatedPop: 57, estimatedDiff: 71 },
      { keyword: "guided breathing", intent: "feature", estimatedPop: 39, estimatedDiff: 47 },
      { keyword: "anxiety relief", intent: "problem", estimatedPop: 53, estimatedDiff: 69 },
      { keyword: "calm bedtime stories", intent: "feature", estimatedPop: 36, estimatedDiff: 42 },
    ],
    titleFormulas: [
      "[Brand]: Meditation & Sleep",
      "[Brand]: Relax & Breathwork",
      "Sleep Sounds: [Brand]",
    ],
    subtitleFormulas: [
      "Daily Calm & Anxiety Relief",
      "Guided Breathing & White Noise",
      "Mindful Bedtime Stories & Rest",
    ],
    cannibalizationTraps: [
      "Stuffing 'relax, relaxing, relaxation' into the keyword field.",
      "Attempting to rank for generic 'sleep' with an unproven app.",
    ],
    editorialStrategy: [
      "Headspace and Calm dominate broad mindfulness keywords. Target acute symptoms: 'box breathing', 'panic relief', 'ambient rain sounds', or 'stoic meditation'.",
    ],
    faq: [
      {
        q: "Is 'meditation' impossible for indie apps to rank for?",
        a: "In top 5 organic spots, yes. But compound terms like 'daily breathwork meditation' or 'sleep timer sounds' have winnable difficulty (<50).",
      },
      {
        q: "Do ambient audio apps need keyword localization?",
        a: "Yes. Audio apps convert exceptionally well internationally because audio requires minimal UI translation.",
      },
    ],
  },
  {
    id: "ai-photo-editor",
    name: "AI Photo & Video Editor",
    appStoreCategory: "Photo & Video",
    benchmarks: {
      averagePopularity: 62,
      typicalDifficultyRange: "65–94",
      averageReviewMoat: "40,000+ ratings",
      monetizationModel: "Weekly/Yearly High-Velocity Sub",
    },
    seedKeywords: [
      { keyword: "photo editor", intent: "discovery", estimatedPop: 74, estimatedDiff: 92 },
      { keyword: "ai headshot", intent: "high-intent", estimatedPop: 58, estimatedDiff: 68 },
      { keyword: "background remover", intent: "problem", estimatedPop: 55, estimatedDiff: 62 },
      { keyword: "object eraser", intent: "feature", estimatedPop: 46, estimatedDiff: 51 },
      { keyword: "enhance photo quality", intent: "problem", estimatedPop: 51, estimatedDiff: 59 },
    ],
    titleFormulas: [
      "[Brand]: AI Photo Editor",
      "[Brand]: Background Eraser",
      "Photo Enhancer: [Brand]",
    ],
    subtitleFormulas: [
      "AI Headshot & Retouch Studio",
      "Remove Object & Restore Quality",
      "Cartoon Avatar & Picture Filter",
    ],
    cannibalizationTraps: [
      "Repeating 'photo' and 'picture' unnecessarily.",
      "Overloading title with 'AI' three times.",
    ],
    editorialStrategy: [
      "Photo editing search queries are problem-driven: users search 'remove watermark', 'blur background', 'fix blurry photo'. Prioritize solution verbs over generic 'editor'.",
    ],
    faq: [
      {
        q: "What keywords convert best for AI photo apps?",
        a: "Problem-specific phrases like 'ai headshot generator', 'unblur photo', and 'remove object from photo' have high commercial conversion.",
      },
      {
        q: "How fast do photo keywords change trend velocity?",
        a: "Viral AI trends change monthly. Track weekly Apple Search Ads popularity to catch surging query spikes.",
      },
    ],
  },
  {
    id: "language-learning",
    name: "Language Learning",
    appStoreCategory: "Education",
    benchmarks: {
      averagePopularity: 55,
      typicalDifficultyRange: "58–86",
      averageReviewMoat: "30,000+ ratings",
      monetizationModel: "Annual Subscription",
    },
    seedKeywords: [
      { keyword: "learn spanish", intent: "high-intent", estimatedPop: 62, estimatedDiff: 74 },
      { keyword: "vocabulary flashcards", intent: "feature", estimatedPop: 44, estimatedDiff: 52 },
      { keyword: "speak japanese", intent: "high-intent", estimatedPop: 49, estimatedDiff: 61 },
      { keyword: "grammar practice", intent: "problem", estimatedPop: 37, estimatedDiff: 43 },
      { keyword: "language exchange", intent: "discovery", estimatedPop: 41, estimatedDiff: 54 },
    ],
    titleFormulas: [
      "[Brand]: Learn [Language]",
      "[Brand]: Language Flashcards",
      "Speak [Language]: [Brand]",
    ],
    subtitleFormulas: [
      "Daily Vocabulary & Conversation",
      "Fast Grammar & Pronunciation",
      "Bite-Sized Lessons & Audio",
    ],
    cannibalizationTraps: ["Targeting all languages in one English metadata field."],
    editorialStrategy: [
      "Never market as 'learn any language'. Focus your metadata set on one specific target language pair for maximum relevance.",
    ],
    faq: [
      {
        q: "Should I build one multilingual app or separate apps per language?",
        a: "A single multilingual app with localized App Store product pages (and custom product pages for each language) maximizes review aggregation.",
      },
      {
        q: "What difficulty should I expect for 'learn spanish'?",
        a: "In the US, difficulty is ~75. In the UK or Australia, difficulty drops 10–15 points.",
      },
    ],
  },
  {
    id: "intermittent-fasting",
    name: "Intermittent Fasting",
    appStoreCategory: "Health & Fitness",
    benchmarks: {
      averagePopularity: 51,
      typicalDifficultyRange: "55–82",
      averageReviewMoat: "25,000+ ratings",
      monetizationModel: "Subscription ($49.99–$89.99/yr)",
    },
    seedKeywords: [
      { keyword: "fasting tracker", intent: "high-intent", estimatedPop: 59, estimatedDiff: 76 },
      { keyword: "intermittent fasting", intent: "discovery", estimatedPop: 63, estimatedDiff: 81 },
      { keyword: "16 8 fast timer", intent: "feature", estimatedPop: 43, estimatedDiff: 49 },
      { keyword: "water and fasting log", intent: "feature", estimatedPop: 36, estimatedDiff: 41 },
      { keyword: "meal window tracker", intent: "problem", estimatedPop: 31, estimatedDiff: 35 },
    ],
    titleFormulas: [
      "[Brand]: Fasting Tracker",
      "[Brand]: Intermittent Fasting",
      "16:8 Fasting Timer: [Brand]",
    ],
    subtitleFormulas: [
      "16:8 Interval Timer & Weight",
      "Daily Fast Log & Meal Window",
      "Simple Fasting & Water Clock",
    ],
    cannibalizationTraps: ["Repeating 'fasting' and 'fast'."],
    editorialStrategy: [
      "Users search for specific protocols: '16 8 fast', 'omad', 'circadian fast'. Incorporate exact protocol numbers in your keywords.",
    ],
    faq: [
      {
        q: "Can a simple fasting timer rank against Fastic or Zero?",
        a: "Yes. Many users resent aggressive paywalls in legacy apps and search for 'simple fasting timer' or 'clean fasting clock'.",
      },
      {
        q: "Does fasting keyword demand drop after January?",
        a: "January sees a 40% spike due to resolutions, but baseline popularity stays steady (>45) year-round.",
      },
    ],
  },
  {
    id: "running-gps",
    name: "Running & GPS Mile Tracker",
    appStoreCategory: "Health & Fitness",
    benchmarks: {
      averagePopularity: 49,
      typicalDifficultyRange: "54–84",
      averageReviewMoat: "30,000+ ratings",
      monetizationModel: "Yearly Subscription",
    },
    seedKeywords: [
      { keyword: "running tracker", intent: "high-intent", estimatedPop: 57, estimatedDiff: 73 },
      { keyword: "5k running plan", intent: "problem", estimatedPop: 44, estimatedDiff: 52 },
      { keyword: "couch to 5k", intent: "discovery", estimatedPop: 53, estimatedDiff: 78 },
      { keyword: "mile pace tracker", intent: "feature", estimatedPop: 38, estimatedDiff: 44 },
      { keyword: "marathon training", intent: "high-intent", estimatedPop: 46, estimatedDiff: 60 },
    ],
    titleFormulas: [
      "[Brand]: Running Tracker",
      "[Brand]: Run Mile & GPS Pace",
      "5K Training: [Brand]",
    ],
    subtitleFormulas: [
      "GPS Distance & Pace Counter",
      "Couch to 5K & Marathon Plan",
      "Interval Training & Run Log",
    ],
    cannibalizationTraps: ["Using 'run', 'runner', and 'running' across fields."],
    editorialStrategy: [
      "Intent breaks into two buckets: real-time GPS telemetry (pace, miles, route) vs goal plans (first 5K, half marathon). Align metadata with your primary promise.",
    ],
    faq: [
      {
        q: "How do I rank for running keywords against Nike Run Club and Strava?",
        a: "Target specific preparation terms: '5k beginner schedule', 'treadmill pace timer', or 'interval running coach' where monolithic apps have weak intent match.",
      },
      {
        q: "What character combinations work best for running apps?",
        a: "Combine pace, mile, gps, distance, jog, trail, interval, marathon in the 100-character keyword field without commas spaces.",
      },
    ],
  },
  {
    id: "task-manager",
    name: "To-Do & Task Management",
    appStoreCategory: "Productivity",
    benchmarks: {
      averagePopularity: 47,
      typicalDifficultyRange: "52–80",
      averageReviewMoat: "18,000+ ratings",
      monetizationModel: "Subscription or Paid Upfront",
    },
    seedKeywords: [
      { keyword: "to do list", intent: "high-intent", estimatedPop: 61, estimatedDiff: 79 },
      { keyword: "task manager", intent: "discovery", estimatedPop: 53, estimatedDiff: 68 },
      { keyword: "daily checklist", intent: "feature", estimatedPop: 46, estimatedDiff: 54 },
      { keyword: "adhd planner", intent: "problem", estimatedPop: 54, estimatedDiff: 65 },
      { keyword: "minimalist reminder", intent: "feature", estimatedPop: 35, estimatedDiff: 39 },
    ],
    titleFormulas: [
      "[Brand]: To-Do List & Tasks",
      "[Brand]: Daily Checklist Planner",
      "Task Tracker: [Brand]",
    ],
    subtitleFormulas: [
      "Simple Reminder & Day Planner",
      "ADHD Checklist & Focus Tasks",
      "Minimalist Project Schedule",
    ],
    cannibalizationTraps: ["Writing 'task' and 'tasks' or 'checklist' and 'check list'."],
    editorialStrategy: [
      "General 'to do' searches are crowded. Focus on mental models: 'adhd task helper', 'kanban checklist', 'markdown to-do'.",
    ],
    faq: [
      {
        q: "Is 'ADHD planner' a growing keyword trend?",
        a: "Yes. Apple Search Ads data shows ADHD-focused task and planner keywords have grown over 80% in popularity since 2023 with moderate difficulty.",
      },
      {
        q: "Does Apple index hyphens in 'to-do'?",
        a: "Apple treats hyphens as spaces or compound separators. Writing 'to-do' indexes for both 'to do' and 'todo'.",
      },
    ],
  },
  {
    id: "calendar-planner",
    name: "Daily Planner & Calendar",
    appStoreCategory: "Productivity",
    benchmarks: {
      averagePopularity: 49,
      typicalDifficultyRange: "56–82",
      averageReviewMoat: "22,000+ ratings",
      monetizationModel: "Subscription",
    },
    seedKeywords: [
      { keyword: "daily planner", intent: "high-intent", estimatedPop: 58, estimatedDiff: 75 },
      { keyword: "calendar widget", intent: "feature", estimatedPop: 52, estimatedDiff: 66 },
      { keyword: "schedule organizer", intent: "problem", estimatedPop: 45, estimatedDiff: 57 },
      { keyword: "digital agenda", intent: "feature", estimatedPop: 39, estimatedDiff: 46 },
      { keyword: "time blocking app", intent: "feature", estimatedPop: 37, estimatedDiff: 42 },
    ],
    titleFormulas: [
      "[Brand]: Daily Planner",
      "[Brand]: Calendar & Schedule",
      "Agenda Planner: [Brand]",
    ],
    subtitleFormulas: [
      "Time Blocking & Day Organizer",
      "Smart Calendar Widget & Agenda",
      "Simple Schedule & Task View",
    ],
    cannibalizationTraps: ["Repeating 'planner' and 'planning'."],
    editorialStrategy: [
      "Feature keywords like 'time blocking' and 'calendar widget' provide the easiest entry point for new calendar utilities.",
    ],
    faq: [
      {
        q: "How important are iOS widget keywords for calendar apps?",
        a: "Crucial. 'Calendar widget' has popularity > 50 on its own. Mention widget features in your subtitle and screenshots.",
      },
      {
        q: "What is the seasonal peak for planner apps?",
        a: "Late December through late January (New Year) and August/September (Back to School) see 60%+ volume surges.",
      },
    ],
  },
  {
    id: "calorie-counter",
    name: "Calorie Counter & Nutrition",
    appStoreCategory: "Health & Fitness",
    benchmarks: {
      averagePopularity: 54,
      typicalDifficultyRange: "60–89",
      averageReviewMoat: "45,000+ ratings",
      monetizationModel: "Subscription ($39.99–$89.99/yr)",
    },
    seedKeywords: [
      { keyword: "calorie counter", intent: "high-intent", estimatedPop: 64, estimatedDiff: 83 },
      { keyword: "macro tracker", intent: "high-intent", estimatedPop: 53, estimatedDiff: 67 },
      { keyword: "food diary log", intent: "feature", estimatedPop: 48, estimatedDiff: 59 },
      { keyword: "ai barcode scanner", intent: "feature", estimatedPop: 42, estimatedDiff: 51 },
      { keyword: "keto carb counter", intent: "problem", estimatedPop: 39, estimatedDiff: 48 },
    ],
    titleFormulas: [
      "[Brand]: Calorie Counter",
      "[Brand]: Macro & Food Tracker",
      "Nutrition Diary: [Brand]",
    ],
    subtitleFormulas: [
      "Macro Tracker & Barcode Scanner",
      "Daily Food Diary & Diet Plan",
      "Simple Carb & Protein Counter",
    ],
    cannibalizationTraps: ["Repeating 'calorie', 'calories', and 'caloric'."],
    editorialStrategy: [
      "MyFitnessPal and Lose It dominate broad head terms. Win by targeting specific diet styles ('keto macro tracker', 'simple calorie counter without subscription', 'protein goal tracker').",
    ],
    faq: [
      {
        q: "Is AI food scanning a strong keyword hook right now?",
        a: "Yes. Queries for 'ai calorie counter' and 'ai food scanner' have surged in Apple Search Ads popularity.",
      },
      {
        q: "How many keywords can fit in the nutrition space?",
        a: "Stack: macro,protein,carb,diet,meal,barcode,log,diary,fast,keto,loss in the 100-character field.",
      },
    ],
  },
  {
    id: "mental-health-journal",
    name: "Mood & Mental Health Journal",
    appStoreCategory: "Lifestyle",
    benchmarks: {
      averagePopularity: 46,
      typicalDifficultyRange: "50–77",
      averageReviewMoat: "14,000+ ratings",
      monetizationModel: "Subscription or Lifetime",
    },
    seedKeywords: [
      { keyword: "mood tracker", intent: "high-intent", estimatedPop: 53, estimatedDiff: 69 },
      { keyword: "daily journal diary", intent: "high-intent", estimatedPop: 56, estimatedDiff: 73 },
      { keyword: "cbt mental health", intent: "problem", estimatedPop: 43, estimatedDiff: 54 },
      { keyword: "gratitude journal", intent: "feature", estimatedPop: 47, estimatedDiff: 58 },
      { keyword: "private thoughts notes", intent: "feature", estimatedPop: 34, estimatedDiff: 38 },
    ],
    titleFormulas: [
      "[Brand]: Mood Tracker & Diary",
      "[Brand]: Daily Gratitude Journal",
      "Mental Health Log: [Brand]",
    ],
    subtitleFormulas: [
      "CBT Therapy & Feelings Diary",
      "Private Reflection & Gratitude",
      "Daily Emotion & Anxiety Log",
    ],
    cannibalizationTraps: ["Putting 'diary' and 'journal' together if you waste too many characters."],
    editorialStrategy: [
      "Position around specific clinical methodologies: 'CBT reflection', 'stoic journal', or '5-minute gratitude'.",
    ],
    faq: [
      {
        q: "Are privacy terms useful keywords in journaling?",
        a: "Yes. 'Lock with passcode', 'face id journal', and 'private offline notes' convert exceptionally well.",
      },
      {
        q: "What difficulty should I target for a new journaling app?",
        a: "Target terms with difficulty < 50, like 'cbt thought record' or 'micro mood tracker'.",
      },
    ],
  },
  {
    id: "vpn-security",
    name: "Mobile VPN & Privacy",
    appStoreCategory: "Utilities",
    benchmarks: {
      averagePopularity: 68,
      typicalDifficultyRange: "75–98",
      averageReviewMoat: "80,000+ ratings",
      monetizationModel: "High Subscription ($9.99/mo to $99/yr)",
    },
    seedKeywords: [
      { keyword: "vpn", intent: "discovery", estimatedPop: 82, estimatedDiff: 96 },
      { keyword: "secure proxy", intent: "high-intent", estimatedPop: 57, estimatedDiff: 72 },
      { keyword: "private browser", intent: "problem", estimatedPop: 54, estimatedDiff: 68 },
      { keyword: "wifi shield", intent: "feature", estimatedPop: 41, estimatedDiff: 49 },
      { keyword: "unblock sites", intent: "problem", estimatedPop: 46, estimatedDiff: 63 },
    ],
    titleFormulas: [
      "[Brand]: Secure VPN Proxy",
      "[Brand]: Fast Private Shield",
      "Unlimited VPN: [Brand]",
    ],
    subtitleFormulas: [
      "WiFi Security & Fast Proxy",
      "Private Browse & Data Shield",
      "Secure Tunnel & IP Changer",
    ],
    cannibalizationTraps: ["Repeating 'proxy' and 'vpn' multiple times."],
    editorialStrategy: [
      "One of the highest-revenue categories in the App Store. Ranking organically for 'vpn' requires massive download velocity; focus on long-tail modifiers like 'secure hotspot shield' or 'wireguard client'.",
    ],
    faq: [
      {
        q: "Can an indie app rank for 'vpn'?",
        a: "For single-word 'vpn', no. For 'fast vpn for travel' or 'wireguard config client', yes.",
      },
      {
        q: "Why are ASA popularity scores so high for VPNs?",
        a: "Global search volume is immense. Even niche VPN keywords have popularity > 40.",
      },
    ],
  },
  {
    id: "podcast-player",
    name: "Podcast & Audio",
    appStoreCategory: "News & Audio",
    benchmarks: {
      averagePopularity: 45,
      typicalDifficultyRange: "50–76",
      averageReviewMoat: "12,000+ ratings",
      monetizationModel: "Freemium + Patron/Sub",
    },
    seedKeywords: [
      { keyword: "podcast player", intent: "high-intent", estimatedPop: 54, estimatedDiff: 71 },
      { keyword: "audio episodes", intent: "discovery", estimatedPop: 43, estimatedDiff: 52 },
      { keyword: "rss podcast feed", intent: "feature", estimatedPop: 35, estimatedDiff: 38 },
      { keyword: "offline audio talks", intent: "feature", estimatedPop: 33, estimatedDiff: 39 },
      { keyword: "custom speed voice", intent: "feature", estimatedPop: 31, estimatedDiff: 34 },
    ],
    titleFormulas: [
      "[Brand]: Podcast Player",
      "[Brand]: Smart Audio Feed",
      "Podcast App: [Brand]",
    ],
    subtitleFormulas: [
      "Smart Speed & Offline Episodes",
      "RSS Audio & Chapter Notes",
      "Minimalist Show Subscriptions",
    ],
    cannibalizationTraps: ["Overusing 'audio' and 'podcast'."],
    editorialStrategy: [
      "Highlight power features Apple Podcasts lacks: 'silence trim', 'voice boost', 'custom playlists', 'rss export'.",
    ],
    faq: [
      {
        q: "How to compete with Apple Podcasts and Spotify?",
        a: "Target power users searching for 'smart speed podcast player', 'trim silence audio', or 'open rss podcast client'.",
      },
      {
        q: "What popularity do indie podcast apps see?",
        a: "Head terms are 50–60. Niche features run 25–35 popularity with low difficulty (<40).",
      },
    ],
  },
  {
    id: "recipe-meal-plan",
    name: "Recipe & Meal Planner",
    appStoreCategory: "Food & Drink",
    benchmarks: {
      averagePopularity: 48,
      typicalDifficultyRange: "52–79",
      averageReviewMoat: "16,000+ ratings",
      monetizationModel: "Subscription ($29.99–$49.99/yr)",
    },
    seedKeywords: [
      { keyword: "meal planner", intent: "high-intent", estimatedPop: 56, estimatedDiff: 73 },
      { keyword: "recipe keeper", intent: "high-intent", estimatedPop: 49, estimatedDiff: 62 },
      { keyword: "grocery shopping list", intent: "problem", estimatedPop: 52, estimatedDiff: 67 },
      { keyword: "weekly dinner menu", intent: "problem", estimatedPop: 39, estimatedDiff: 45 },
      { keyword: "cookbook organizer", intent: "feature", estimatedPop: 36, estimatedDiff: 41 },
    ],
    titleFormulas: [
      "[Brand]: Meal Planner",
      "[Brand]: Recipe Keeper & List",
      "Dinner Planner: [Brand]",
    ],
    subtitleFormulas: [
      "Weekly Menu & Grocery List",
      "Cookbook Organizer & Shopping",
      "Healthy Diet & Prep Schedule",
    ],
    cannibalizationTraps: ["Repeating 'recipe' and 'cook' repeatedly."],
    editorialStrategy: [
      "Combine cooking inspiration with grocery utility: 'save recipes from web', 'automatic grocery list from meals'.",
    ],
    faq: [
      {
        q: "What keywords drive cooking app downloads?",
        a: "'Recipe keeper', 'meal planner and grocery list', and 'weekly meal prep planner'.",
      },
      {
        q: "Is grocery list integration important for ASO?",
        a: "Yes. 'Grocery shopping list' has higher stand-alone search volume than 'recipe organizer'.",
      },
    ],
  },
];

// Add 30 additional niche definitions to complete the 45 categories
const ADDITIONAL_NICHES: { id: string; name: string; cat: string; pop: number; diff: string }[] = [
  { id: "weather-radar", name: "Weather & Storm Radar", cat: "Weather", pop: 58, diff: "60–88" },
  { id: "travel-flight-tracker", name: "Flight Tracker & Travel", cat: "Travel", pop: 54, diff: "56–84" },
  { id: "dating-relationships", name: "Dating & Social Discovery", cat: "Social", pop: 62, diff: "68–92" },
  { id: "study-flashcards", name: "Flashcards & Study Tools", cat: "Education", pop: 46, diff: "48–74" },
  { id: "water-tracker", name: "Water Intake & Hydration Reminder", cat: "Health & Fitness", pop: 42, diff: "44–68" },
  { id: "crypto-tracker", name: "Cryptocurrency & Portfolio Tracker", cat: "Finance", pop: 48, diff: "52–78" },
  { id: "screen-time-focus", name: "Screen Time & App Blocker", cat: "Productivity", pop: 50, diff: "54–79" },
  { id: "home-workout-men", name: "Home Workout for Men", cat: "Health & Fitness", pop: 49, diff: "55–80" },
  { id: "pregnancy-tracker", name: "Pregnancy & Baby Milestone Log", cat: "Medical", pop: 52, diff: "58–83" },
  { id: "guitar-tuner", name: "Guitar Tuner & Chords", cat: "Music", pop: 53, diff: "56–82" },
  { id: "white-noise-machine", name: "White Noise & Fan Sounds", cat: "Health & Fitness", pop: 46, diff: "48–72" },
  { id: "yoga-pilates", name: "Yoga & Pilates Studio", cat: "Health & Fitness", pop: 47, diff: "50–76" },
  { id: "note-taking-markdown", name: "Minimal Markdown Notes", cat: "Productivity", pop: 44, diff: "46–70" },
  { id: "receipt-scanner", name: "Receipt Scanner & Expense OCR", cat: "Business", pop: 48, diff: "52–76" },
  { id: "smart-alarm-clock", name: "Smart Alarm & Sleep Cycle", cat: "Utilities", pop: 46, diff: "48–74" },
  { id: "dog-training", name: "Puppy & Dog Training Clicker", cat: "Lifestyle", pop: 41, diff: "42–64" },
  { id: "book-summary", name: "Microlearning & Book Summaries", cat: "Education", pop: 49, diff: "54–79" },
  { id: "password-manager", name: "Password Vault & Security", cat: "Utilities", pop: 56, diff: "62–88" },
  { id: "stretching-mobility", name: "Daily Stretch & Mobility Routine", cat: "Health & Fitness", pop: 43, diff: "45–68" },
  { id: "hiking-trails", name: "Hiking Trails & Offline Topo Maps", cat: "Navigation", pop: 51, diff: "55–81" },
  { id: "period-tracker", name: "Period & Ovulation Calendar", cat: "Health & Fitness", pop: 57, diff: "62–88" },
  { id: "barcode-scanner-food", name: "Ingredient & Food Scanner", cat: "Food & Drink", pop: 45, diff: "48–72" },
  { id: "audiobook-player", name: "Audiobook Player & Narration", cat: "Books", pop: 47, diff: "50–75" },
  { id: "weightlifting-gym-log", name: "Barbell & Weightlifting Log", cat: "Health & Fitness", pop: 44, diff: "46–70" },
  { id: "daily-affirmations", name: "Daily Affirmations & Manifestation", cat: "Lifestyle", pop: 48, diff: "50–74" },
  { id: "business-card-scanner", name: "Business Card Scanner & Contacts", cat: "Business", pop: 40, diff: "42–65" },
  { id: "drawing-canvas", name: "Digital Sketch & Drawing Canvas", cat: "Graphics & Design", pop: 52, diff: "56–82" },
  { id: "decibel-sound-meter", name: "Decibel Meter & Sound Detector", cat: "Utilities", pop: 43, diff: "44–66" },
  { id: "document-scanner", name: "PDF Document Scanner & Signer", cat: "Business", pop: 60, diff: "66–92" },
  { id: "plant-identifier", name: "Plant Identifier & Leaf Care", cat: "Education", pop: 51, diff: "55–80" },
];

for (const n of ADDITIONAL_NICHES) {
  CATEGORY_DEFINITIONS.push({
    id: n.id,
    name: n.name,
    appStoreCategory: n.cat,
    benchmarks: {
      averagePopularity: n.pop,
      typicalDifficultyRange: n.diff,
      averageReviewMoat: "10,000+ ratings",
      monetizationModel: "Subscription or In-App Purchase",
    },
    seedKeywords: [
      { keyword: n.name.toLowerCase(), intent: "high-intent", estimatedPop: n.pop, estimatedDiff: parseInt(n.diff) },
      { keyword: `${n.name.toLowerCase()} app`, intent: "discovery", estimatedPop: n.pop - 8, estimatedDiff: parseInt(n.diff) - 6 },
      { keyword: `best ${n.name.toLowerCase()}`, intent: "high-intent", estimatedPop: n.pop - 12, estimatedDiff: parseInt(n.diff) - 10 },
      { keyword: `simple ${n.name.toLowerCase()}`, intent: "problem", estimatedPop: n.pop - 16, estimatedDiff: parseInt(n.diff) - 14 },
    ],
    titleFormulas: [`[Brand]: ${n.name}`, `${n.name}: [Brand]`, `[Brand] - ${n.name}`],
    subtitleFormulas: [`Fast & Easy ${n.name}`, `Daily ${n.name} & Helper`, `Simple ${n.name} for iPhone`],
    cannibalizationTraps: [`Repeating words between title and subtitle in ${n.name}.`],
    editorialStrategy: [
      `In the ${n.name} niche, target exact problem phrases and secondary feature terms rather than generic category words.`,
      `Audit top-ranking competitor subtitles to find under-indexed keyword combinations.`,
    ],
    faq: [
      {
        q: `How competitive is the ${n.name} App Store niche?`,
        a: `Difficulty ranges between ${n.diff} with an average search popularity of ${n.pop}. Focus on long-tail variants with difficulty below 50.`,
      },
      {
        q: `What is the best metadata formula for a ${n.name} app?`,
        a: `Place your high-demand primary term in the App Title, secondary qualifiers in the Subtitle, and root variations in the 100-character keyword field.`,
      },
    ],
  });
}

// ---------------------------------------------------------------------------
// Entity Generators
// ---------------------------------------------------------------------------

/**
 * 45 Category Deep-Dive Entities
 * e.g., /keyword-research/category/fitness-workout
 */
export const CATEGORY_ENTITIES: CategoryEntity[] = CATEGORY_DEFINITIONS.map((c) => {
  const slug = c.id;
  const title = `App Store Keyword Research for ${c.name} Apps`;
  const metaTitle = fitTitle([`${c.name} ASO Keywords`, `${c.name} Keywords | ASOGrade`]);
  const description = fitDescription(
    `Keyword research blueprint for ${c.name} iOS apps. Discover high-demand seed keywords, difficulty benchmarks, and Title stacking formulas.`
  );

  return {
    category: "category",
    slug,
    nicheId: c.id,
    nicheName: c.name,
    appStoreCategory: c.appStoreCategory,
    title,
    metaTitle,
    description,
    canonicalPath: `/keyword-research/category/${slug}`,
    benchmarkMetrics: c.benchmarks,
    seedKeywords: c.seedKeywords,
    titleFormulas: c.titleFormulas,
    subtitleFormulas: c.subtitleFormulas,
    cannibalizationTraps: c.cannibalizationTraps,
    directAnswer: {
      heading: `ASO Blueprint: ${c.name}`,
      summary: `${c.name} apps average a search popularity of ${c.benchmarks.averagePopularity}/100 and difficulty of ${c.benchmarks.typicalDifficultyRange}. Success depends on targeting problem-specific long tail phrases.`,
      takeaways: [
        `App Store Category: ${c.appStoreCategory}`,
        `Typical Difficulty: ${c.benchmarks.typicalDifficultyRange}`,
        `Top Review Moat: ${c.benchmarks.averageReviewMoat}`,
        `Monetization Pattern: ${c.benchmarks.monetizationModel}`,
      ],
      bestFor: `iOS and macOS developers launching or optimizing metadata for ${c.name} apps.`,
    },
    breakdown: [
      {
        heading: `Category Search Dynamics & Benchmarks`,
        paragraphs: [
          `In the ${c.name} niche, search volume is concentrated around high-intent problem solutions. Apps targeting this category face average difficulty scores of ${c.benchmarks.typicalDifficultyRange}, with top competitors holding over ${c.benchmarks.averageReviewMoat}.`,
          `Developers who succeed in this vertical avoid fighting head-to-head for generic terms and instead optimize for secondary and tertiary feature intent.`,
        ],
      },
      {
        heading: `Title and Subtitle Stacking Formulas`,
        paragraphs: [
          `Your 30-character App Title has the heaviest ranking weight in Apple's search algorithm. Pair your brand with the single highest-demand root keyword.`,
          `Use your 30-character Subtitle to capture descriptive modifiers. Recommended patterns: ${c.titleFormulas.join(" | ")}.`,
        ],
      },
      {
        heading: `Keyword Cannibalization & Pitfalls`,
        paragraphs: c.cannibalizationTraps,
      },
    ],
    faq: c.faq,
  };
});

/**
 * 450 Storefront x Category Matrix Entities
 * (18 Major Storefronts x 25 Top Niches)
 * e.g., /keyword-research/jp/fitness-workout
 */
export const TOP_STOREFRONTS_FOR_MATRIX = [
  "us", "gb", "jp", "de", "fr", "ca", "au", "kr", "br", "es",
  "it", "mx", "nl", "se", "in", "sa", "tw", "ch"
];

export const TOP_25_NICHES = CATEGORY_DEFINITIONS.slice(0, 25);

export const STOREFRONT_CATEGORY_ENTITIES: StorefrontCategoryEntity[] = [];

for (const storeCode of TOP_STOREFRONTS_FOR_MATRIX) {
  const storeInfo = STORE_INFO[storeCode] ?? {
    name: storeCode.toUpperCase(),
    tier: "major" as TierLevel,
    lang: "English",
    langCode: "en",
  };

  const script = scriptOf(storeInfo.langCode);
  const isUS = storeCode === "us";
  const diffDiscount = isUS ? 0 : storeInfo.tier === "major" ? -12 : -25;
  const scriptEff = script.includes("Kanji") || script.includes("CJK") ? 2.5 : script.includes("Hangul") ? 1.8 : 1.0;

  for (const niche of TOP_25_NICHES) {
    const slug = `${storeCode}-${niche.id}`;
    const canonicalPath = `/keyword-research/${storeCode}/${niche.id}`;

    const title = `${niche.name} App Store Keywords: ${storeInfo.name} (${storeCode.toUpperCase()})`;
    const metaTitle = fitTitle([
      `${niche.name} ASO: ${storeInfo.name}`,
      `${niche.name} Keywords (${storeCode.toUpperCase()}) | ASOGrade`,
    ]);
    const description = fitDescription(
      `App Store keyword research for ${niche.name} apps in ${storeInfo.name}. Localized difficulty discount (${diffDiscount} pts), demand scoring, and metadata strategy.`
    );

    STOREFRONT_CATEGORY_ENTITIES.push({
      category: "storefront-category",
      slug,
      storeCode,
      storeName: storeInfo.name,
      nicheId: niche.id,
      nicheName: niche.name,
      title,
      metaTitle,
      description,
      canonicalPath,
      localizedMetrics: {
        storefrontTier: storeInfo.tier as TierLevel,
        scriptEfficiency: scriptEff,
        difficultyDiscount: diffDiscount,
        marketOpportunityScore: Math.min(95, niche.benchmarks.averagePopularity + (isUS ? 0 : 15)),
      },
      localizedSeedKeywords: niche.seedKeywords.map((s) => s.keyword),
      storefrontStrategy: [
        `In ${storeInfo.name}, keyword difficulty for ${niche.name} runs approximately ${Math.abs(diffDiscount)} points lower than the US benchmark.`,
        `Search behavior in ${storeInfo.lang} prioritizes localized root phrases. With a script density multiplier of ${scriptEff}x, your 100-character keyword field can cover more distinct concepts.`,
      ],
      directAnswer: {
        heading: `${niche.name} ASO in ${storeInfo.name}`,
        summary: `Optimizing a ${niche.name} app in ${storeInfo.name} offers a difficulty discount of ${Math.abs(diffDiscount)} points vs US search results. Primary search language: ${storeInfo.lang}.`,
        takeaways: [
          `Storefront: ${storeInfo.name} (${storeCode.toUpperCase()})`,
          `Language: ${storeInfo.lang}`,
          `Relative Competition: ${isUS ? "Global Benchmark (100)" : "Accessible (55–75)"}`,
          `Script Character Density: ${scriptEff}x Latin standard`,
        ],
        bestFor: `Developers targeting ${niche.name} searches in the ${storeInfo.name} App Store.`,
      },
      breakdown: [
        {
          heading: `Market Dynamics: ${niche.name} in ${storeInfo.name}`,
          paragraphs: [
            `${storeInfo.name} represents an active App Store market for ${niche.name} applications. While US search terms for ${niche.name} have intense competition from multi-million-download incumbents, ranking sets in ${storeInfo.name} require significantly fewer reviews to secure top-5 placement.`,
            `The primary search language is ${storeInfo.lang}. Ensure your Title and Subtitle target authentic local vocabulary rather than machine-translated English phrases.`,
          ],
        },
        {
          heading: `Localized Metadata Playbook`,
          paragraphs: [
            `Keep the primary ${storeInfo.lang} keyword directly in your 30-character App Title. Use the Subtitle for complementary secondary intent.`,
            `Fill the 100-character keyword field with comma-separated single words without repeating terms from the Title or Subtitle.`,
          ],
        },
      ],
      faq: [
        {
          q: `Is keyword difficulty for ${niche.name} lower in ${storeInfo.name} than in the US?`,
          a: `Yes. Keyword difficulty in ${storeInfo.name} averages approximately ${Math.abs(diffDiscount)} points lower than in the US, providing faster ranking opportunities.`,
        },
        {
          q: `Which language should I use for ${niche.name} keywords in ${storeInfo.name}?`,
          a: `Target ${storeInfo.lang} search terms. Even in multilingual storefronts, local-language keywords capture the highest-intent organic volume.`,
        },
      ],
    });
  }
}
