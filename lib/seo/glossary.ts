/**
 * ASO glossary entries — each powers one /glossary/[term] page.
 *
 * Shape:
 *   slug      URL segment, lowercase-hyphenated
 *   term      Display name
 *   definition Short one-sentence definition (for meta description + lede)
 *   body      2-4 paragraphs of real explanation (markdown-safe, no HTML)
 *   related   Slugs of 2-3 related glossary terms (for internal linking)
 *   faq       2-3 Q+A pairs (powers FAQPage JSON-LD)
 */

export interface GlossaryEntry {
  slug: string;
  term: string;
  definition: string;
  /**
   * Purpose-written meta description, for entries whose `definition` is a
   * single sentence over 160 characters. Trimming those produced snippets that
   * ended "…based on the strength of" and "…at the top of search" in the result
   * a reader actually sees. `definition` stays as the on-page lede.
   */
  metaDescription?: string;
  body: string[];
  related: string[];
  faq: { q: string; a: string }[];
}

export const GLOSSARY: GlossaryEntry[] = [
  {
    slug: "app-store-optimization",
    term: "App Store Optimization (ASO)",
    definition: "App Store Optimization is the process of improving an app's visibility in App Store search results and its conversion rate from search impressions to installs.",
    body: [
      "App Store Optimization covers two separate problems: getting the app to appear in search results (discoverability), and getting users who see the app to tap the install button (conversion). Most ASO tools focus on discoverability because it can be measured with data; conversion depends on screenshots, preview videos, and ratings that are harder to score at scale.",
      "The primary levers for discoverability are the metadata fields Apple indexes for search: the app name (30 characters), subtitle (30 characters), and keyword field (100 characters). Title and subtitle carry more weight than the keyword field — a well-chosen title term is worth more than the same term buried in the keyword field.",
      "Keyword research is the foundation of ASO. Before writing any metadata, you need two numbers for each candidate keyword: how much demand it has (popularity) and how hard it is to rank for given the apps currently occupying the top results (difficulty). Without both numbers, you are choosing between keywords on instinct.",
      "ASO is ongoing, not a one-time task. Apple's popularity scores shift as search behaviour changes, and ranking difficulty changes as competitors update their metadata. Checking your keyword set before each major update is the minimum viable cadence.",
    ],
    related: ["keyword-popularity", "keyword-difficulty", "app-store-search-ranking-factors"],
    faq: [
      {
        q: "What does App Store Optimization actually change?",
        a: "ASO changes the text fields Apple indexes for search — primarily the app name, subtitle, and keyword field. Changes to these fields affect which search terms your app appears for and where it ranks. It does not change your app's code, its rating, or how Apple's editorial team features it.",
      },
      {
        q: "How long does it take to see ASO results?",
        a: "Apple typically re-indexes metadata within a few days of an app update. Ranking changes are visible within a week for most terms, but reaching the top positions for competitive keywords can take months of incremental improvements and installs that signal relevance.",
      },
      {
        q: "Is ASO the same for the App Store and Google Play?",
        a: "No. The two stores have different ranking algorithms, different metadata structures (Google Play indexes the full description; the App Store does not), and different popularity signal sources. Research and optimisation must be done separately for each store.",
      },
    ],
  },
  {
    slug: "keyword-popularity",
    term: "Keyword Popularity",
    definition: "Keyword popularity is a 0–100 score measuring how often users search for a given term in the App Store, derived from Apple Search Ads demand signals.",
    body: [
      "Apple exposes a popularity signal through its Search Ads platform — the same demand data advertisers use to decide which keywords to bid on. ASOGrade surfaces this signal as a 0–100 score, where higher means more searches per period. The scale is relative: a score of 67 means there is more demand than a term scoring 50, not that exactly 67% of searches include this term.",
      "The practical threshold for considering a keyword worth targeting is roughly 25+. Below that, the raw search volume is small enough that even a top-3 ranking generates minimal organic installs. Above 65, a keyword has real volume — but it also tends to attract competitive apps, pushing difficulty up.",
      "Popularity is storefront-specific. The same keyword in the US store might score 65; in Brazil, it might score 40; in an emerging market, it might be so rarely searched that Apple returns no signal at all. Checking popularity per storefront is essential before deciding which markets to localize for.",
      "Popularity scores are not static. They shift with cultural trends, seasonality, and competitor behavior. A tool that appeared last month may have trained new users to search for it by name, raising the popularity of branded terms. Checking scores before each metadata update, not just once, gives you an accurate read.",
    ],
    related: ["keyword-difficulty", "apple-search-ads", "long-tail-keywords"],
    faq: [
      {
        q: "What is a good keyword popularity score?",
        a: "Above 25 is generally worth considering. Above 50 is solid demand. Above 65 is high volume — but at that level, expect high difficulty too. Below 25, the raw search count is usually too small to generate meaningful organic installs even at a top-3 ranking.",
      },
      {
        q: "Why does the same keyword have different popularity in different countries?",
        a: "Search behaviour differs by market. A productivity term that is heavily searched in the US might have minimal demand in a smaller market, or might be searched in the local language rather than English. Popularity scores are calculated per storefront using local Apple Search Ads data.",
      },
      {
        q: "Can popularity scores change without any action on my part?",
        a: "Yes. Search trends shift constantly. A keyword can rise in popularity because a competitor launched a viral marketing campaign around it, or fall because a cultural moment passed. This is why checking scores before each metadata update matters.",
      },
    ],
  },
  {
    slug: "keyword-difficulty",
    term: "Keyword Difficulty",
    definition: "Keyword difficulty is a 0–100 score estimating how hard it is to break into the top-ranking positions for a given App Store keyword, based on the strength of apps currently holding those positions.",
    metaDescription: "Keyword difficulty is a 0-100 score for how hard it is to reach the top App Store results for a term, based on the apps already holding those spots.",
    body: [
      "Unlike popularity, which measures demand, difficulty measures supply — specifically, how established and well-rated the apps currently ranking for a keyword are. A keyword with difficulty 80 is held by apps with large rating counts, long histories, and likely significant organic installs driving their ranking weight. A keyword with difficulty 30 may be served by apps that are newer, smaller, or only loosely relevant.",
      "Difficulty is read from the live ranking set: the apps currently occupying the top positions for each keyword in each storefront. This matters because chart position alone doesn't tell you how entrenched those apps are — a chart-topper that launched last week is much less entrenched than one that has held the position for two years.",
      "The target zone for most apps is keywords with popularity above 30 and difficulty below 60. This is the intersection that has real search volume but doesn't require beating back deeply established apps. These windows close as more apps compete for them, which is why acting on a good keyword quickly matters.",
      "Difficulty varies significantly by storefront for the same keyword. US difficulty for 'budget planner' might be 65; in the UK, it might be 50; in Brazil, it might be 30. This variation is why running keyword research per storefront reveals opportunities that a single-market view hides.",
    ],
    related: ["keyword-popularity", "competing-apps-count", "niche-keywords"],
    faq: [
      {
        q: "What is a safe keyword difficulty level?",
        a: "Below 50 is generally accessible for most apps. Below 35 is the range where even newer or smaller apps can realistically reach the top positions. Above 70 typically means the ranking set is dominated by established players — ranking here requires time, installs, and strong metadata alignment, not just a good keyword field.",
      },
      {
        q: "Does high difficulty mean I should never target a keyword?",
        a: "Not necessarily. If a high-difficulty keyword perfectly describes your app and users can't find it without that term, you need to be in the metadata even if you won't rank top-3 immediately. High-difficulty terms in the title still contribute to relevance signals. The goal is to also include winnable terms alongside the aspirational ones.",
      },
      {
        q: "How often does keyword difficulty change?",
        a: "Difficulty changes when the apps holding the top positions change — either a new app breaks in, or an existing top app loses ranking weight. In stable categories, difficulty can be consistent for months. In fast-moving ones, it shifts week to week. Daily-refreshed scores, like ASOGrade uses, give you the current read rather than a month-old snapshot.",
      },
    ],
  },
  {
    slug: "apple-search-ads",
    term: "Apple Search Ads",
    definition: "Apple Search Ads is Apple's paid advertising platform for the App Store, allowing developers to bid on keywords to display their app at the top of search results.",
    metaDescription: "Apple Search Ads is Apple's ad platform for the App Store, where developers bid on keywords. Its demand data is also the best source of keyword popularity.",
    body: [
      "Apple Search Ads (ASA) serves ads at the top of App Store search results pages. When a user searches a keyword, the winning bid for that term gets a sponsored placement above the organic results. Developers set bids per keyword, and Apple runs a second-price auction — the winner pays just above what the second-highest bidder offered.",
      "For ASO purposes, the most valuable thing Apple Search Ads produces is the popularity signal. Apple exposes a 0–100 demand score for each keyword, calibrated to the volume of searches that keyword receives in a given storefront. This is the same signal ASOGrade surfaces — the ASA popularity score is the clearest demand indicator available without reverse-engineering download estimates.",
      "Running ASA and organic ASO together creates a compounding effect: paid placements generate installs and engagement signals that can improve organic ranking, and strong organic positions reduce the cost of paid placement for the same keyword. The two are complementary, not interchangeable.",
      "ASA campaigns require an Apple developer account and a published app. Keyword research tools like ASOGrade use the ASA demand signal for keyword scoring without requiring you to set up or run a campaign — you can use the signal for pre-launch research before any app exists in the store.",
    ],
    related: ["keyword-popularity", "app-store-search-ranking-factors", "keyword-difficulty"],
    faq: [
      {
        q: "Do I need to run Apple Search Ads to use keyword popularity scores?",
        a: "No. ASOGrade uses the Apple Search Ads popularity signal to score keywords, but you do not need to set up or run an ASA campaign. The research is separate from the advertising — you can look up demand for any keyword without spending on ads.",
      },
      {
        q: "How is ASA different from ASO?",
        a: "ASO (App Store Optimization) is about improving organic search rankings through metadata and relevance signals. ASA (Apple Search Ads) is paid placement — you pay to appear at the top of results for a keyword. ASO results are free once earned; ASA results last only as long as your budget does.",
      },
      {
        q: "What does the Apple Search Ads popularity score actually measure?",
        a: "It measures relative search demand for a keyword in a specific App Store storefront. A score of 67 means that keyword is searched more often than a term scoring 50, in that market. It is not an absolute query count — it is a relative index Apple uses for ad pricing.",
      },
    ],
  },
  {
    slug: "app-store-storefront",
    term: "App Store Storefront",
    definition: "An App Store storefront is one country-specific instance of the App Store, each with its own search demand, ranking results, and keyword difficulty — 109 storefronts exist in total.",
    metaDescription: "An App Store storefront is one country's instance of the App Store. There are 109, and each has its own search demand and its own keyword difficulty.",
    body: [
      "Apple operates a separate App Store in each country where it is available. Each storefront has its own search index, its own keyword popularity scores, and its own set of apps ranking for each term. A keyword that is hard to rank for in the US might be straightforward in a mid-tier market where fewer apps are competing.",
      "This separation matters most in two scenarios. First, when choosing which markets to localise for: the same keyword might have enough demand to justify a translation in Germany but not in a smaller adjacent market. Second, when looking for opportunities: a keyword blocked in your primary market might be winnable in a secondary market that has not yet attracted as many competing apps.",
      "Storefronts are identified by two-letter ISO country codes (US, GB, JP, BR, DE). Apps submit separate metadata per storefront — you can have a different app name, subtitle, and keyword field for each country, though most apps start by localising into a handful of high-priority markets and expand from there.",
      "The 109 storefronts Apple supports range from very large (US, China, Japan) to very small (Micronesia, Grenada). The smaller storefronts have very low keyword difficulty because few apps are competing for their search results — this makes them useful for testing keyword effectiveness before competing in the major markets.",
    ],
    related: ["keyword-popularity", "localization-aso", "competing-apps-count"],
    faq: [
      {
        q: "Do I need different metadata for every App Store storefront?",
        a: "No — Apple uses your primary language metadata as a fallback for any storefront you haven't localised. But localising the name, subtitle, and keyword field into the dominant language of a market typically unlocks significantly more search demand than relying on English fallback.",
      },
      {
        q: "Which storefronts are worth targeting first?",
        a: "Start with your primary market, then add storefronts based on where your users already come from (your App Store analytics show this). After that, target markets where the same keywords have real demand but lower difficulty than your primary market — this is where the effort-to-result ratio is best.",
      },
      {
        q: "Are keyword scores different between storefronts for the same keyword?",
        a: "Yes, always. Popularity scores reflect local search volume, which varies by language and market size. Difficulty scores reflect the local apps ranking for that term — the competitive landscape in Japan is entirely different from the US for most categories.",
      },
    ],
  },
  {
    slug: "competing-apps-count",
    term: "Competing Apps Count",
    definition: "The competing apps count is the number of apps that appear in search results for a given keyword in a specific storefront — a proxy for how saturated that keyword's search results are.",
    metaDescription: "The competing apps count is how many apps surface for a keyword in one storefront. It is the quickest read on how saturated that keyword already is.",
    body: [
      "When a user searches a keyword in the App Store, Apple returns a list of apps it considers relevant. The competing apps count tells you how many apps are in that pool — a keyword with 12 competing apps is a very different competitive situation from one with 2,000.",
      "A high competing apps count does not automatically mean a keyword is hard to rank for. What matters is the quality of the apps in the ranking set — 50 mediocre apps competing for a keyword might be easier to break into than 20 apps with hundreds of thousands of ratings. Competing apps count is a useful first filter, but difficulty score gives you the more precise answer.",
      "In practice, competing apps count below 50 is often a signal of an underserved niche — either the keyword is very specific, demand is low, or established apps haven't targeted it yet. Above 500, expect a mature, competitive field. The sweet spot for an emerging app is often keywords in the 50–200 range that have acceptable popularity.",
    ],
    related: ["keyword-difficulty", "niche-keywords", "long-tail-keywords"],
    faq: [
      {
        q: "Is a high competing apps count bad?",
        a: "Not necessarily. A keyword with 500 competing apps but dominated by weak, poorly-rated apps may be more accessible than one with 100 competing apps all held by major publishers. The difficulty score gives you a better answer than the raw count alone.",
      },
      {
        q: "How does competing apps count relate to keyword difficulty?",
        a: "Competing apps count is one input into difficulty, but the main driver is the strength of the apps at the top — their rating counts, tenure in the store, and how well their metadata matches the keyword. A large pool of weak apps still produces a low difficulty score.",
      },
    ],
  },
  {
    slug: "long-tail-keywords",
    term: "Long-Tail Keywords",
    definition: "Long-tail keywords are multi-word, specific search phrases that individually have lower search volume than broad terms but collectively cover the majority of App Store searches and often have much lower ranking difficulty.",
    metaDescription: "Long-tail keywords are specific multi-word searches. Each carries less volume than a broad term, but together they cover most App Store searches.",
    body: [
      "The 'long tail' describes the shape of the keyword demand curve: a small number of broad terms (habit tracker, budget app) capture enormous volume and attract enormous competition, while a very large number of specific phrases (habit tracker for anxiety, daily budget planner no subscription) each attract less volume but are far easier to rank for.",
      "For an app competing against established players on broad terms, the long tail is often the practical path to early organic traffic. A new productivity app is unlikely to crack the top 10 for 'task manager', but it may reach the top 3 for 'task manager for freelancers' much faster.",
      "The practical limitation of long-tail keywords is the App Store's 100-character keyword field. Unlike Google, where you can write thousands of words of content, App Store metadata is severely constrained. This pushes strategy toward finding the most efficient individual words: the keywords that appear in multiple high-value long-tail phrases, so you capture the combination effect without running out of character space.",
    ],
    related: ["niche-keywords", "keyword-popularity", "keyword-difficulty"],
    faq: [
      {
        q: "How do I find long-tail keywords for the App Store?",
        a: "Start with your top-performing broad keywords and look at the phrases users actually search — app store search suggest, competitor subtitle text, and user review language are all good sources. Then score each candidate for popularity (any demand at all?) and difficulty (is the ranking set accessible?).",
      },
      {
        q: "Are long-tail keywords less valuable than broad keywords?",
        a: "They have lower absolute volume, but conversion is often higher because the search intent is more specific — a user searching 'budget planner for freelancers' knows exactly what they want. A modest flow of high-intent installs can outperform a large flow of vague ones for retention and ratings.",
      },
    ],
  },
  {
    slug: "niche-keywords",
    term: "Niche Keywords",
    definition: "Niche keywords are terms specific enough to describe a well-defined subset of App Store users — they have moderate-to-low popularity scores but often dramatically lower difficulty than the broad category terms.",
    metaDescription: "Niche keywords describe a well-defined subset of App Store users. Popularity is moderate, but difficulty sits far below the broad category terms.",
    body: [
      "A niche keyword describes a specific problem, user type, or use case rather than a broad category. 'Habit tracker' is a broad term; 'sobriety tracker' or 'habit tracker for ADHD' are niche terms. The niche term has fewer searches, but the searcher's intent is precise, conversion tends to be higher, and ranking difficulty is usually much lower.",
      "Niche keywords matter most in competitive categories where the top broad terms are dominated by apps with years of installs and ratings behind them. A new app cannot immediately compete with Headspace for 'meditation'; it might rank quickly for 'meditation timer with intervals' or 'breathwork timer'.",
      "Building a keyword strategy around a cluster of niche terms — where each term is winnable individually and together they cover a coherent user need — is a more practical path to organic installs for most indie apps than chasing the top broad terms from day one.",
    ],
    related: ["long-tail-keywords", "keyword-difficulty", "competing-apps-count"],
    faq: [
      {
        q: "How is a niche keyword different from a long-tail keyword?",
        a: "Long-tail refers to the format (multi-word, specific phrase). Niche refers to the audience (a defined subset of users). A niche keyword can be short ('sobriety') or long ('sobriety tracker for AA meetings'). The defining characteristic is specificity of intent, not phrase length.",
      },
      {
        q: "Can niche keywords generate enough installs to matter?",
        a: "Cumulatively, yes. A single niche term might generate 2-5 installs per day at a top-3 ranking. Thirty niche terms at top-3 becomes 60-150 installs per day — comparable to a single mid-popularity broad term. The difference is that niche installs are cheaper to achieve and sustain.",
      },
    ],
  },
  {
    slug: "branded-vs-nonbranded-keywords",
    term: "Branded vs. Non-Branded Keywords",
    definition: "Branded keywords include an app or company name; non-branded keywords describe a problem or category without naming a specific product — the distinction matters for measuring organic discovery versus brand recall.",
    metaDescription: "Branded keywords name an app or company; non-branded keywords describe a problem or category. The split separates organic discovery from brand recall.",
    body: [
      "A branded keyword is one where users search for a specific app by name: 'Headspace', 'Finch app', 'Notion'. These searches represent users who already know the product and are looking for it. Non-branded searches ('meditation app', 'mood tracker', 'notes app') represent users who have a need and are discovering what exists.",
      "For most apps, the majority of organic installs come from non-branded keywords — users discovering the app, not recalling it. Branded searches are valuable as a retention indicator (users returning after seeing a recommendation) but they tell you little about your discoverability to new users.",
      "Competitor brand terms are a separate category: users searching a competitor's name may be open to alternatives if the search results show an app that looks like a better fit. Ranking for a competitor's brand name is common practice — the question is whether the search volume and the user's intent justifies spending a character slot on it.",
    ],
    related: ["keyword-popularity", "app-store-search-ranking-factors", "competitor-teardown"],
    faq: [
      {
        q: "Should I put competitor brand names in my keyword field?",
        a: "It depends on whether those brand names have real search volume and whether users searching them are likely to be open to alternatives. If a competing app is well-known and users search it by name, appearing alongside it can generate installs. Apple's guidelines prohibit misleading claims about affiliation, but the keyword field is for discoverability, not claims.",
      },
      {
        q: "How do I track whether my brand keyword traffic is growing?",
        a: "Your App Store Connect analytics will show search terms that led to impressions and installs. Trending branded searches suggest word-of-mouth or press coverage is working. Flat branded searches with growing non-branded installs suggest effective ASO.",
      },
    ],
  },
  {
    slug: "keyword-cannibalization",
    term: "Keyword Cannibalization",
    definition: "Keyword cannibalization in ASO occurs when an app's multiple metadata fields target the same keyword, wasting limited character space rather than covering additional search terms.",
    metaDescription: "Keyword cannibalization is repeating a term across your App Store title, subtitle and keyword field, spending characters twice on coverage you already have.",
    body: [
      "The App Store's 100-character keyword field is already indexed alongside whatever terms appear in the app name and subtitle. If your name is 'Habit Tracker — Daily Goals' and your subtitle is 'Habit Tracker & Streaks', both instances of 'habit tracker' are already indexed. Repeating 'habit tracker' in the keyword field wastes 13 characters that could cover an entirely different search term.",
      "The rule is: words already in your title or subtitle do not need to appear in the keyword field. The keyword field is for supplementary terms that extend your reach beyond what's already in the visible metadata.",
      "Cannibalization also applies within the keyword field itself — repeating a word between keyword field entries (e.g., 'habit,daily habit,habit streak') wastes the repeated occurrences. Apple indexes each word individually, so 'habit,daily,streak' covers the same ground more efficiently.",
    ],
    related: ["app-store-search-ranking-factors", "app-store-optimization", "title-vs-subtitle-keywords"],
    faq: [
      {
        q: "What if my most important keyword is already in my app name — should I still put it in the keyword field?",
        a: "No. Apple already indexes it from the name, which is higher-weight than the keyword field. Use the keyword field character space for terms not covered by your name or subtitle.",
      },
      {
        q: "Can I use plurals and singulars of the same keyword?",
        a: "Apple handles common plurals and singulars as the same stem for most English terms — 'tracker' and 'trackers' are treated as equivalent. You generally do not need to include both; use the saved character for a different term entirely.",
      },
    ],
  },
  {
    slug: "app-store-search-ranking-factors",
    term: "App Store Search Ranking Factors",
    definition: "App Store search ranking factors are the signals Apple's algorithm uses to determine which apps appear at the top of results for a given keyword — primarily metadata relevance, user engagement, and app quality indicators.",
    metaDescription: "App Store search ranking factors are the signals Apple weighs to order results: metadata relevance, user engagement, and app quality indicators.",
    body: [
      "Apple has not published its ranking algorithm, but developer experience and Apple documentation point to a consistent set of factors: keyword relevance (does the app's metadata include the search term, and in which fields?), engagement signals (conversion rate from search to install, retention after install), and quality indicators (rating, rating count, frequency of updates).",
      "Metadata relevance is the most directly actionable factor. Terms in the app name carry the most weight, followed by the subtitle, followed by the keyword field. Terms that appear only in the description are not indexed for search on iOS (unlike Google Play). This is why title and subtitle character choices are the highest-leverage ASO decisions.",
      "Engagement signals — install rate from search and retention after install — are things developers can influence but not directly control through keyword choices. An app that converts well from a keyword and retains users will rank higher for that keyword over time as Apple's algorithm learns it satisfies the query.",
      "Rating count matters independently of rating score. An app with 50,000 ratings at 4.2 stars will typically outrank an app with 500 ratings at 4.9 stars, because the large rating count signals volume of real user engagement. This is partly why established apps are hard to displace on high-volume keywords.",
    ],
    related: ["title-vs-subtitle-keywords", "keyword-difficulty", "app-store-optimization"],
    faq: [
      {
        q: "Does the app description affect App Store search ranking?",
        a: "No. Apple does not index the long description for keyword search on iOS. It is visible on the product page and affects conversion (some users read it before installing), but it has no direct impact on which searches your app appears in.",
      },
      {
        q: "Does having more ratings help keyword ranking?",
        a: "Yes, indirectly. A higher rating count is a signal of engagement and quality that contributes to ranking weight across all your keywords. Actively prompting satisfied users to rate (at appropriate moments in the user journey, using SKStoreReviewRequest) is a meaningful ASO lever.",
      },
      {
        q: "How long does it take for a metadata change to affect ranking?",
        a: "Apple typically re-indexes metadata within a few days of an app update. You may see ranking changes within a week. Reaching the top positions for competitive terms can take much longer as engagement signals accumulate.",
      },
    ],
  },
  {
    slug: "title-vs-subtitle-keywords",
    term: "Title vs. Subtitle Keywords",
    definition: "In App Store Optimization, keywords in the app title carry the highest ranking weight; subtitle keywords carry secondary weight — both are more impactful than the keyword field.",
    metaDescription: "App title keywords carry the most ranking weight, subtitle keywords come second, and both outweigh the keyword field. Where a term sits decides its value.",
    body: [
      "Apple gives different weight to keywords based on which metadata field they appear in. The hierarchy is: app name (highest) > subtitle > keyword field. A keyword in your title will help you rank higher for that term than the same keyword appearing only in your subtitle or keyword field.",
      "The title is 30 characters — typically the app name and perhaps one keyword. The subtitle is another 30 characters, positioned just below the app name. These 60 combined characters are the most valuable real estate in all of ASO. The keyword field adds 100 characters, but at lower weight.",
      "Best practice: put your single most important keyword in the title if it naturally fits the brand name. Use the subtitle for the second-most important keyword or a value-proposition phrase containing the keyword. Use the keyword field for all remaining terms that extend your reach.",
      "The subtitle is also visible to users in search results (it shows below the title on the search page), so it needs to serve both the algorithm and the human reader. A subtitle stuffed with disconnected keywords may technically rank better but convert poorly because it reads as spam.",
    ],
    related: ["app-store-search-ranking-factors", "keyword-cannibalization", "app-store-optimization"],
    faq: [
      {
        q: "Can I change my app name to include a keyword without affecting my brand?",
        a: "Many successful apps do exactly this — 'Calm: Sleep & Meditation', 'Headspace: Mindfulness & Sleep', 'Duolingo — Language Lessons'. The format is Brand: Keyword Phrase. Apple allows keyword-enriched names; the limit is 30 characters including the brand name.",
      },
      {
        q: "Does the subtitle show up in search results?",
        a: "Yes. The subtitle is visible below the app name in App Store search results. It affects both ranking (keyword weight) and conversion (users read it before tapping). This dual role makes the subtitle the highest-leverage 30 characters in ASO.",
      },
    ],
  },
  {
    slug: "localization-aso",
    term: "Localization (ASO)",
    definition: "ASO localization is the process of writing separate app metadata (name, subtitle, keyword field) in the local language of each target App Store storefront to capture search demand that English-only metadata misses.",
    metaDescription: "ASO localization means writing separate metadata in each storefront's language, capturing the search demand that English-only metadata never reaches.",
    body: [
      "When a user in Germany searches the App Store in German, Apple's search results prioritize apps with German-language metadata. An English-only app will appear in German results only if a German speaker happens to search in English, or if the category has no German-language competition. In practice, English-only metadata leaves most of the German storefront's demand invisible to your app.",
      "The case for localization is quantitative: run the same keyword in the US (English) and Germany (German equivalent) and compare popularity scores and difficulty. If German demand is meaningful and German difficulty is lower than the US, localizing delivers more installs per unit of effort than continuing to optimize English metadata that is already well-optimized.",
      "Localization requires native-speaker input for quality. Machine-translated metadata reads as unnatural to native speakers and will underperform because it doesn't match how locals actually search. The keyword field especially needs to be translated to how local users would phrase their search intent, not how a translation engine renders English keywords.",
      "Starting with a handful of high-priority storefronts rather than all 109 is the practical approach. Localize where the demand-minus-difficulty gap is largest — often markets like Germany, France, Japan, or Brazil depending on your app category.",
    ],
    related: ["app-store-storefront", "keyword-popularity", "keyword-difficulty"],
    faq: [
      {
        q: "Which storefronts are worth localizing into first?",
        a: "Compare keyword popularity and difficulty in candidate markets for your core terms. Markets where popularity is above 25 and difficulty is meaningfully lower than your primary market are the highest-ROI targets. For most English-language apps, Germany, France, and Japan are frequent top-3 additions.",
      },
      {
        q: "Does localizing one field (e.g., just the keywords) make sense?",
        a: "Partial localization helps but underperforms full localization. If you localize the keyword field but not the name and subtitle, users who find your app in a German search see an English name — the mismatch can reduce conversion. Full localization of name + subtitle + keywords gives the best result.",
      },
      {
        q: "Can I use the same keywords across all storefronts?",
        a: "If your app is English-only and you're only targeting English-speaking storefronts (US, UK, AU, CA, IE, NZ), yes. For non-English storefronts, you need keyword field entries in the local language to capture demand.",
      },
    ],
  },
  {
    slug: "competitor-teardown",
    term: "Competitor Teardown",
    definition: "A competitor teardown in ASO is the process of identifying which keywords a competing app ranks for — revealing their strategy and surfacing terms you may have missed.",
    metaDescription: "A competitor teardown reads the keywords a rival app ranks for, showing their strategy and surfacing the terms your own research missed.",
    body: [
      "Every app in the App Store search results is there because it ranks for the keywords users typed to find it. By looking at which keywords an app appears for (and at what rank), you can read their targeting strategy directly from the results — without access to their keyword field, which Apple doesn't publish.",
      "The competitive intelligence from a teardown works in both directions: finding keywords your competitors rank for that you don't yet target (gap opportunities), and finding keywords you both target where you're outranked (improvement priorities).",
      "ASOGrade's competitor teardown works by paste-in: enter any app's App Store URL and read the keyword set it appears for, each scored for popularity and difficulty. You can then take any term directly into your keyword list.",
      "The most valuable teardown targets are apps in your category that rank for terms you want but aren't currently reaching. Their subtitle and keyword choices aren't visible directly, but their ranking footprint reveals them indirectly — the keywords they appear for are the keywords they've successfully earned relevance for.",
    ],
    related: ["app-store-search-ranking-factors", "branded-vs-nonbranded-keywords", "keyword-difficulty"],
    faq: [
      {
        q: "Is it possible to see exactly what's in a competitor's keyword field?",
        a: "No. Apple doesn't expose keyword field contents to anyone except the app's developer. What you can see is which searches the app appears in — which reveals their effective keyword reach without revealing the exact text they submitted.",
      },
      {
        q: "How do I decide which competitor keywords to target?",
        a: "Sort the competitor's keyword set by popularity (highest first), then filter out terms with difficulty too high for your current app strength. What's left is your shortlist — terms with real demand that you can realistically rank for, that your competitor is already proving have intent.",
      },
    ],
  },
  {
    slug: "app-store-algorithm",
    term: "App Store Algorithm",
    definition: "The App Store algorithm is Apple's automated system for ranking apps in search results — combining metadata relevance, user engagement signals, and quality indicators to determine which apps appear for each search query.",
    metaDescription: "The App Store algorithm ranks apps for each search by weighing metadata relevance, engagement and quality signals. Here is what it reads and what it ignores.",
    body: [
      "Apple does not publish its ranking algorithm, but the consistent developer experience over time reveals its main dimensions. Metadata relevance determines eligibility: if a keyword doesn't appear in your name, subtitle, or keyword field, your app is unlikely to surface for it at all. Engagement and quality signals determine where within the eligible set your app ranks.",
      "Metadata weight hierarchy: name > subtitle > keyword field. Terms that naturally appear in user reviews or in-app copy have been reported to influence ranking in some cases, though this is less consistent and less controllable than explicit metadata fields.",
      "The algorithm also considers category and audience. Two apps targeting the same keyword in the same storefront but in different categories may be ranked differently — Apple's category signals help it show the most relevant type of app for a given query.",
      "The algorithm is not static. Apple has made documented changes to how it weights fields and signals over the years. What worked three years ago (stuffing the developer name with keywords, for example) has been deprecated. Current best practice centers on clean, relevant metadata with the right keywords in high-weight fields.",
    ],
    related: ["app-store-search-ranking-factors", "keyword-difficulty", "title-vs-subtitle-keywords"],
    faq: [
      {
        q: "Can the algorithm be gamed?",
        a: "Historically, yes — and Apple has gradually closed those holes. Keyword stuffing in the developer name, using misleading categories, and buying fake reviews have all been penalised over time. The current algorithm rewards genuine relevance and user satisfaction more than it did early in the App Store's history.",
      },
      {
        q: "Does the algorithm treat all categories the same?",
        a: "No. Ranking dynamics differ by category. Games, for example, have very different engagement patterns than productivity apps — the algorithm likely applies different weights to signals that are category-specific. This is part of why difficulty and popularity data should be interpreted within your category context.",
      },
    ],
  },
  {
    slug: "aso-keyword-research",
    term: "ASO Keyword Research",
    definition: "ASO keyword research is the systematic process of identifying, scoring, and selecting the App Store keywords most likely to deliver organic installs given your app's current competitive position.",
    metaDescription: "ASO keyword research is scoring and selecting the App Store keywords most likely to bring organic installs, given where your app can realistically rank.",
    body: [
      "Keyword research for the App Store is a constrained version of the SEO problem: you have 100 keyword field characters plus a 30-character name and 30-character subtitle to work with, versus the unlimited word count of a web page. This constraint makes selection more consequential — every character choice is a tradeoff against something else.",
      "A complete keyword research pass has three stages: ideation (building a list of candidates), scoring (assessing popularity and difficulty for each), and selection (choosing the highest-value terms that fit your metadata constraints). Ideation without scoring is guesswork; scoring without selection wastes the research.",
      "Sources for keyword candidates include: your competitors' ranking footprints (teardown), search suggest (what Apple shows when you start typing a relevant term), your category browse terms, user review language, and Apple Search Ads suggested keywords. The goal of ideation is a long, messy list — you'll cut it down in scoring.",
      "Research should be repeated before each significant metadata update, not just at launch. Popularity and difficulty change, competitors enter and leave, and your own app's authority in the store grows over time — terms that were too competitive at launch may become accessible six months later.",
    ],
    related: ["keyword-popularity", "keyword-difficulty", "competitor-teardown"],
    faq: [
      {
        q: "How many keywords should I research before choosing?",
        a: "As many as you can generate in the ideation phase — typically 50 to 200 candidates. The scoring pass quickly filters this down: terms below 25 popularity get cut, terms above 70 difficulty get deprioritized unless they're essential brand terms. What's left is usually 20-40 viable candidates for the space you have.",
      },
      {
        q: "How often should I redo keyword research?",
        a: "Before every metadata update, which ideally happens every 2-4 weeks during active optimization. After launch or after a major update, check scores again — the competitive landscape has changed in the interim.",
      },
    ],
  },
  {
    slug: "metadata-fields",
    term: "App Store Metadata Fields",
    definition: "App Store metadata fields are the text inputs that affect how an app is discovered and presented in the App Store — primarily the name, subtitle, keyword field, and developer name, each with different character limits and ranking weight.",
    metaDescription: "App Store metadata fields are the text inputs Apple indexes: name, subtitle, keyword field and developer name, each with its own limit and ranking weight.",
    body: [
      "The App Store metadata fields relevant to keyword ranking are: App Name (30 characters, highest ranking weight), Subtitle (30 characters, second-highest weight), Keyword Field (100 characters, lower weight but exclusively for supplementary terms), and Developer Name (sometimes indexed, lower weight).",
      "The Long Description, promotional text, and what's new fields are visible on the product page but are not indexed for search ranking. They affect conversion (users may read them) but not discoverability.",
      "Characters in the name and subtitle are precious because they serve two purposes simultaneously: algorithm eligibility (getting the app to appear in results) and human conversion (making users want to tap). The keyword field characters serve only the algorithm, which is why they can be used more aggressively for term coverage without worrying about readability.",
      "Apple's character limits include spaces. A 30-character name like 'Habit Tracker — Daily Goals' uses all 30 characters. Hyphen, colon, and em dash are common separators between brand name and keyword phrase within the name character limit.",
    ],
    related: ["title-vs-subtitle-keywords", "keyword-cannibalization", "app-store-search-ranking-factors"],
    faq: [
      {
        q: "Does the app description help with App Store search?",
        a: "On iOS and macOS, no. Apple does not index the long description for search. On the Mac App Store specifically, the first paragraph of the description may have some indexing — but it is a much smaller signal than metadata fields. Write the description for conversion, not ranking.",
      },
      {
        q: "What happens if I leave the keyword field blank?",
        a: "Your app is indexed only for terms in the name, subtitle, and developer name. You lose the 100 characters of additional reach the keyword field would provide. For most apps, a well-researched keyword field meaningfully expands the search terms the app can appear for.",
      },
    ],
  },
  {
    slug: "aso-audit",
    term: "ASO Audit",
    definition: "An ASO audit is a structured review of an app's current metadata, keyword coverage, competitive position, and store presence to identify gaps and improvement opportunities.",
    metaDescription: "An ASO audit reviews your metadata, keyword coverage and competitive position to find the gaps worth fixing before your next App Store update.",
    body: [
      "A keyword coverage audit checks whether your current name, subtitle, and keyword field terms have real demand and are being used efficiently — no cannibalization, no low-popularity terms taking up space, no high-competition terms where a winnable alternative exists.",
      "A competitive position audit benchmarks your ranking for your current keyword set against key competitors. For each keyword you're targeting, who holds the top spots? What is their difficulty score? Are there terms in their footprint that you aren't targeting?",
      "A metadata quality audit checks the human-facing elements: does the subtitle read naturally while containing the keyword? Is the description conversion-optimized? Are screenshots using search result annotations to show features, not just UI? These affect conversion rate from impression to install.",
    ],
    related: ["aso-keyword-research", "competitor-teardown", "app-store-optimization"],
    faq: [
      {
        q: "How often should I run an ASO audit?",
        a: "Quarterly is the minimum for an active app. Before any metadata update, a focused keyword audit is essential. After a major OS release, category changes, or a significant competitor launch, a targeted audit is worth running out of cycle.",
      },
    ],
  },
  {
    slug: "keyword-gap-analysis",
    term: "Keyword Gap Analysis",
    definition: "A keyword gap analysis identifies terms that competitors rank for but your app does not — surfacing targeting opportunities you haven't yet captured.",
    body: [
      "A gap analysis starts with a competitor teardown: read the keyword footprint of two or three of your top competitors and compare it to your own current ranking set. Terms they appear for that you don't are your gap candidates.",
      "Not all gaps are worth closing. A competitor might rank for a term because it's in their brand name, or because their app genuinely does something yours doesn't. Gap terms should be filtered by: does your app serve the intent behind this keyword? Is the popularity worth the character slot? Is the difficulty winnable at your current app authority?",
      "The most valuable gaps are terms with solid popularity (30+), moderate difficulty (below 60), and clear relevance to your app's functionality. These are terms your competitors have proven have intent but that you haven't yet claimed.",
    ],
    related: ["competitor-teardown", "aso-keyword-research", "app-store-search-ranking-factors"],
    faq: [
      {
        q: "What does it mean if I have no keyword gaps compared to competitors?",
        a: "Either you've achieved comprehensive coverage of the relevant keyword space (unlikely for most apps), or you're comparing against competitors with very similar scope. Expand the teardown to include indirect competitors or apps in adjacent categories — new terms often come from unexpected sources.",
      },
    ],
  },
  {
    slug: "keyword-seasonality",
    term: "Keyword Seasonality",
    definition: "Keyword seasonality describes the predictable rise and fall of search demand for certain App Store keywords based on time of year, events, or cyclical patterns.",
    body: [
      "Some app categories are inherently seasonal: tax preparation apps spike in Q1, gift trackers spike in November-December, fitness apps surge in January. Popularity scores for seasonal keywords will be higher during peak periods and lower during off-peak times.",
      "For ASO purposes, seasonality means the optimal time to update metadata targeting seasonal keywords is before the peak, not during it. Metadata changes take a few days to index and rankings take time to establish — updating in mid-January for a tax app means missing most of the spike.",
      "Not all seasonal patterns are annual. Academic calendars create term-time and vacation patterns for study apps. Major events (sporting seasons, product launches) create temporary demand spikes. Monitoring popularity scores regularly helps catch these patterns.",
    ],
    related: ["keyword-popularity", "aso-keyword-research"],
    faq: [
      {
        q: "How do I prepare for seasonal keyword demand?",
        a: "Identify the seasonal terms relevant to your category and note when their popularity peaks. Update your metadata (including those terms or giving them more prominent placement) 2-3 weeks before the peak, accounting for indexing time and ranking ramp-up.",
      },
    ],
  },
  {
    slug: "aso-ab-testing",
    term: "ASO A/B Testing",
    definition: "ASO A/B testing (also called product page optimization) is the practice of testing alternative versions of app store creative elements — icons, screenshots, descriptions — to improve conversion from search impression to install.",
    metaDescription: "ASO A/B testing compares versions of your icon, screenshots and description to raise the share of searchers who install after seeing your app.",
    body: [
      "Apple's Product Page Optimization feature (available in App Store Connect) allows developers to test up to three alternative versions of their icon, screenshots, and preview video against the default. Apple splits traffic and reports conversion results, letting you identify which creative performs better.",
      "A/B testing addresses the conversion half of ASO (getting users who see your app to install it), separate from the discoverability half (getting the app to appear in search results). Keyword research drives discoverability; product page optimization drives conversion.",
      "What to test: the app icon (the highest-impact creative element for impression-to-tap rate), the first one or two screenshots (visible in search results without tapping through), and the preview video (autoplay in results for some placements). Testing one element at a time gives cleaner signal.",
    ],
    related: ["app-store-optimization", "app-store-search-ranking-factors"],
    faq: [
      {
        q: "Does A/B testing metadata fields (name, keywords) work the same way?",
        a: "No. Apple's Product Page Optimization only covers creative assets (icon, screenshots, video). Metadata field changes (name, subtitle, keyword field) are live tests — you change them and watch ranking and conversion metrics in App Store Connect analytics. There's no built-in split test for metadata.",
      },
    ],
  },
  {
    slug: "app-store-categories",
    term: "App Store Categories",
    definition: "App Store categories are the classifications Apple uses to group apps in browse and featured views — category selection affects both discoverability in browse and how the search algorithm interprets keyword relevance.",
    metaDescription: "App Store categories group apps for browsing, and the category you pick also shapes how the search algorithm reads your keyword relevance.",
    body: [
      "Choosing the right primary category affects more than browse visibility — it sets the competitive context for search ranking. An app in the Productivity category competing against other productivity apps for 'task manager' is in a different algorithmic context than the same app miscategorized as a Utilities app.",
      "Secondary category selection adds an additional browse context without affecting the primary ranking classification. Apps that genuinely fit two categories (a journaling app that is both Lifestyle and Productivity, for example) benefit from the secondary category for browse discovery.",
      "Category choice also affects the competition you face: a niche app in a general category competes against every app in that category for rank position, while the same app correctly placed in a more specific sub-category faces fewer direct competitors.",
    ],
    related: ["app-store-algorithm", "app-store-search-ranking-factors"],
    faq: [
      {
        q: "Can I change my app's category after launch?",
        a: "Yes, as part of a metadata update. The change takes effect with the next approved update. Category mischoice at launch is correctable, though the ranking signals in the old category don't transfer.",
      },
    ],
  },
  {
    slug: "in-app-purchase-keywords",
    term: "In-App Purchase Keywords",
    definition: "In-App Purchase (IAP) names and descriptions are indexed by Apple for search — giving apps an additional, often overlooked, source of keyword coverage beyond the main metadata fields.",
    metaDescription: "Apple indexes In-App Purchase names and descriptions for search, giving you keyword coverage beyond the title, subtitle and keyword field.",
    body: [
      "Apple indexes the names and descriptions of an app's in-app purchases and subscriptions for App Store search. A subscription named 'Premium: Habit Tracker Pro Features' contributes the terms 'premium', 'habit', 'tracker', 'pro', and 'features' to the app's search footprint — without using any keyword field characters.",
      "This means naming IAPs thoughtfully for both conversion (what does the user get?) and keyword coverage (what terms do I want to rank for that I haven't fit into the name, subtitle, or keyword field?) is a legitimate optimization layer.",
      "IAP keyword coverage is less powerful than name or subtitle placement, but it is effectively free character space that most apps underutilize.",
    ],
    related: ["app-store-search-ranking-factors", "keyword-cannibalization", "metadata-fields"],
    faq: [
      {
        q: "How many IAP names can I use for keyword coverage?",
        a: "Apple allows up to 10 in-app purchases per app. Each IAP name is indexed. The practical limit is how many IAPs your app genuinely offers — creating fake IAPs purely for keyword coverage violates Apple's guidelines.",
      },
    ],
  },
  {
    slug: "ratings-and-reviews-aso",
    term: "Ratings and Reviews (ASO Impact)",
    definition: "App Store ratings and review count are quality signals that influence search ranking — higher rating counts correlate with higher ranking for competitive keywords, independent of rating score alone.",
    metaDescription: "App Store rating count is a ranking signal, and a high count correlates with better positions on competitive keywords independent of the score itself.",
    body: [
      "Apple uses ratings as a quality proxy in its ranking algorithm. A high volume of ratings signals genuine user engagement — many users installed, used, and bothered to rate the app. This engagement signal contributes to ranking weight across the app's keyword set.",
      "Rating score matters less than rating count at the algorithm level. An app with 50,000 ratings at 4.1 stars will typically outrank one with 200 ratings at 4.9 stars for the same keyword. The volume of ratings is evidence of at-scale user satisfaction in a way a perfect score from a tiny sample is not.",
      "Rating velocity — the rate at which new ratings come in — also matters. A sudden drop in rating velocity (few new ratings after a period of activity) may signal declining engagement, which can affect ranking. Apps that prompt for ratings at the right moments in the user journey (moments of success, not frustration) generate more ratings and better ratings.",
    ],
    related: ["app-store-algorithm", "app-store-search-ranking-factors"],
    faq: [
      {
        q: "When should I prompt users to rate my app?",
        a: "At moments of user success: after completing a task, after a streak milestone, after a successful transaction. Apple's SKStoreReviewRequest API handles the actual prompt — you control the moment. Apple limits the prompt to 3 times per year per user.",
      },
    ],
  },
  {
    slug: "burst-campaigns",
    term: "Burst Campaigns",
    definition: "A burst campaign is a short, high-intensity user acquisition push designed to generate enough installs in a brief window to boost an app's ranking for target keywords, leveraging the ranking algorithm's sensitivity to install velocity.",
    metaDescription: "A burst campaign drives heavy install volume in a short window to lift keyword rankings, exploiting how sensitive the algorithm is to install velocity.",
    body: [
      "The App Store ranking algorithm is sensitive to install velocity — a rapid influx of installs for a keyword signals to Apple that the app is satisfying that search intent, which can temporarily or permanently boost ranking. Burst campaigns exploit this by concentrating paid installs in a short window.",
      "Burst campaigns are typically run via Apple Search Ads or third-party ad networks targeting the keywords you want to rank for organically. The theory is that paid installs generate organic ranking lift that outlasts the campaign spend.",
      "The effectiveness of burst campaigns depends on the keyword's difficulty, the quality of installs (low-quality installs that don't engage don't generate the engagement signals that sustain ranking), and the app's baseline authority. For high-difficulty keywords, a single burst campaign rarely produces lasting organic lift.",
    ],
    related: ["apple-search-ads", "app-store-algorithm", "keyword-difficulty"],
    faq: [
      {
        q: "Are burst campaigns worth the cost?",
        a: "For very competitive keywords, the cost to maintain a top-3 ranking via burst campaigns can exceed the value of the organic installs generated. For moderate-difficulty keywords where a small push can establish a durable ranking, the economics are often favorable. The calculation depends on the lifetime value of an organic install from that keyword.",
      },
    ],
  },
  {
    slug: "feature-graphic-aso",
    term: "Feature Graphic / Preview Assets (ASO)",
    definition: "Preview assets — screenshots and app preview videos — are the visual elements that appear in search results and product pages, directly affecting the conversion rate from impression to install.",
    metaDescription: "Screenshots and preview videos appear directly in App Store search results, and they decide how many of the people who see your app go on to install it.",
    body: [
      "The first one or two screenshots (or the preview video, if present) are visible in search results without the user tapping to see the full product page. These are the most conversion-critical assets in the store — users decide whether to tap or scroll past largely on the basis of these thumbnails.",
      "Screenshot best practice for search results: treat the first screenshot as a headline. Show the app's most compelling value proposition in large text, not just a generic UI screenshot. 'Track habits in 30 seconds' over a relevant UI is more effective than the UI alone.",
      "Preview videos autoplay without sound in search results. The first 2-3 seconds are the effective conversion window — most users don't watch more than that before deciding. The first frame and first few seconds should function as a standalone visual pitch.",
    ],
    related: ["aso-ab-testing", "app-store-optimization"],
    faq: [
      {
        q: "Should I use a preview video if I have one?",
        a: "Generally yes, with caveats. A well-made video that shows the app's core value in action improves conversion. A poorly-made or generic video can lower conversion compared to strong static screenshots. Test both with Product Page Optimization before committing.",
      },
    ],
  },
];
