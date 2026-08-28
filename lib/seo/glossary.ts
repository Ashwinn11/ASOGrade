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
  {
    slug: "search-match",
    term: "Search Match",
    definition: "Search Match is an Apple Search Ads feature that automatically matches your ad to relevant user searches based on your app's existing metadata, without you entering any keywords.",
    metaDescription: "Search Match is Apple's automatic keyword matching for Search Ads. It reads your app's metadata and bids on relevant terms without you entering any.",
    body: [
      "Instead of building a keyword list yourself, Search Match reads your app's name, subtitle, description, and category, then matches your ad to searches Apple judges relevant. It removes the keyword-selection step entirely for the campaign it's running in.",
      "For keyword research rather than advertising, Search Match is useful in reverse: turn it on in a Discovery campaign, let it run for a week or two, then read the search terms report. Apple hands you a list of real queries it decided were relevant to your app, many of which you would not have thought to add manually.",
      "The tradeoff is control. Search Match can surface irrelevant terms alongside good ones, especially for apps with broad or ambiguous metadata. Treat its output as a source of raw candidates to score, not a finished keyword list.",
    ],
    related: ["discovery-campaign", "keyword-match-types", "apple-search-ads"],
    faq: [
      {
        q: "Does Search Match cost more than manual keyword bidding?",
        a: "Not inherently. You still set the bid and budget; Search Match only changes which searches your ad is eligible to appear in. Cost depends on competition for the terms it matches, the same as manual keywords.",
      },
      {
        q: "Can I use Search Match just to find keywords, without spending much?",
        a: "Yes. Run it in a Discovery campaign with a modest daily budget, then pull the search terms report after a week or two. The goal is the list of real queries, not the installs themselves.",
      },
    ],
  },
  {
    slug: "keyword-match-types",
    term: "Keyword Match Types (Exact vs. Broad)",
    definition: "Exact Match and Broad Match are the two ways Apple Search Ads ties a keyword you enter to the searches your ad actually appears for — Exact targets close variations of the term, Broad expands to related phrases and synonyms.",
    body: [
      "Exact Match shows your ad for the keyword you entered and close variants of it, such as plurals or common misspellings. It gives you precise control over which query triggers the ad, which is why brand, category, and competitor campaigns typically run on Exact Match.",
      "Broad Match shows your ad for a wider set of related terms Apple judges relevant, including synonyms and phrase variations you never entered. It reaches more searches per keyword but at the cost of precision, which is why Discovery campaigns pair it with Search Match to mine new keyword ideas.",
      "For research purposes, the two match types answer different questions. Exact Match tells you the cost and volume for a specific term you already believe in. Broad Match tells you what related terms exist that you haven't thought of yet.",
    ],
    related: ["search-match", "discovery-campaign", "apple-search-ads"],
    faq: [
      {
        q: "Which match type should a new campaign use?",
        a: "Exact Match for terms you've already researched and want to control precisely — brand and category terms. Broad Match, paired with Search Match, for a Discovery campaign whose job is finding new terms rather than defending known ones.",
      },
      {
        q: "Can Broad Match hurt my campaign's relevance data?",
        a: "It can dilute it if left unchecked, since it will surface some genuinely unrelated searches. Review the search terms report regularly and move any winners to an Exact Match campaign of their own, rather than leaving everything on Broad indefinitely.",
      },
    ],
  },
  {
    slug: "discovery-campaign",
    term: "Discovery Campaign",
    definition: "A Discovery campaign is an Apple Search Ads campaign type built to surface new, unknown keywords by running Broad Match and Search Match against a wide audience rather than a fixed keyword list.",
    body: [
      "Apple recommends four campaign types for a mature Search Ads account: Brand, Category, Competitor, and Discovery. The first three run on Exact Match against terms you already know you want. Discovery runs on Broad Match and Search Match specifically to find terms you don't.",
      "Because Discovery campaigns aren't trying to defend a known position, they tolerate a lower, exploratory budget. The output that matters is the search terms report, not the install volume — every new query that shows up and converts is a candidate for your organic keyword field and for its own Exact Match campaign.",
      "This makes a Discovery campaign useful even for research-first teams that mainly care about organic ASO. Running one for a few weeks before a metadata update gives you real user search phrasing to score, rather than guessing at phrasing yourself.",
    ],
    related: ["search-match", "keyword-match-types", "category-campaign-apple-ads"],
    faq: [
      {
        q: "How long should a Discovery campaign run before I check results?",
        a: "One to two weeks is typically enough to accumulate a meaningful search terms report for most categories. Higher-volume categories can produce a usable list faster; niche categories may need longer.",
      },
      {
        q: "What do I do with the keywords a Discovery campaign finds?",
        a: "Score each one for popularity and difficulty like any other candidate, then decide whether it earns a spot in your organic keyword field, its own Exact Match campaign, or both.",
      },
    ],
  },
  {
    slug: "brand-campaign-apple-ads",
    term: "Brand Campaign (Apple Search Ads)",
    definition: "A Brand campaign is an Apple Search Ads campaign that bids Exact Match on your own app and company name terms, defending them from competitors at the lowest cost per tap of any campaign type.",
    body: [
      "Users who search your app's name already intend to find it. A Brand campaign exists mainly to stop a competitor from buying that search and appearing above your organic listing, not to generate new demand.",
      "Because the searcher already wants your app, tap-through and conversion rates on brand terms run far above category averages, and the cost per tap is typically the cheapest in the account. Most guidance treats a brand campaign as close to mandatory once competitors start bidding on category or competitor terms.",
      "Brand campaigns say nothing about organic keyword research on their own. Their value here is defensive: they keep a competitor's ad from sitting above your result when someone searches for you by name.",
    ],
    related: ["category-campaign-apple-ads", "branded-vs-nonbranded-keywords", "apple-search-ads"],
    faq: [
      {
        q: "Do I need a Brand campaign if no one is bidding on my name?",
        a: "It's lower priority, but names can be bid on without warning once a competitor launches a conquesting campaign. Many teams keep a low-budget Brand campaign running as insurance rather than reacting after the fact.",
      },
      {
        q: "Does a Brand campaign help organic keyword ranking?",
        a: "Not directly. It's a paid defensive placement for a search intent you already own organically in most cases. Its job is protecting that placement, not expanding your organic keyword footprint.",
      },
    ],
  },
  {
    slug: "category-campaign-apple-ads",
    term: "Category Campaign (Apple Search Ads)",
    definition: "A Category campaign is an Apple Search Ads campaign that bids Exact Match on the non-branded genre terms describing what your app does, aimed at users actively searching for that type of app.",
    body: [
      "Where a Brand campaign defends a name, a Category campaign competes for generic demand: 'habit tracker', 'budget planner', 'meditation timer'. These are the same terms organic keyword research already scores for popularity and difficulty — a Category campaign puts money behind the ones with the best paid economics.",
      "Because Category terms sit in the open market, cost per tap and conversion vary widely by how crowded the category is. The same popularity and difficulty numbers used for organic keyword selection are a reasonable starting filter for which category terms are worth bidding on at all.",
      "Category campaigns are also a practical feedback loop for organic ASO: a term that converts well and cheaply as a paid keyword is a strong signal it belongs in your title, subtitle, or keyword field for the organic ranking it will eventually earn once the paid spend stops.",
    ],
    related: ["brand-campaign-apple-ads", "discovery-campaign", "keyword-difficulty"],
    faq: [
      {
        q: "How is a Category campaign different from organic keyword targeting?",
        a: "Same terms, different mechanism. Organic keyword targeting puts the term in your metadata and earns rank over time through relevance and engagement. A Category campaign pays for placement on that term immediately, independent of your organic rank.",
      },
      {
        q: "Should I only bid on category terms I already rank for organically?",
        a: "Not necessarily. Bidding on terms you don't yet rank for organically can generate installs while your organic position builds, and the resulting engagement data can inform which of those terms are worth prioritizing in your next metadata update.",
      },
    ],
  },
  {
    slug: "halo-effect",
    term: "Halo Effect (Paid-to-Organic Spillover)",
    definition: "The halo effect describes organic App Store installs that increase as a side effect of running paid Apple Search Ads, driven by paid-install velocity lifting an app's ranking and visibility for the same keyword.",
    metaDescription: "The halo effect is the organic install lift that follows paid Apple Search Ads, driven by paid installs pushing an app's ranking up for the same term.",
    body: [
      "A 2026 empirical study of ad shutoffs found that turning off Apple Search Ads spend for a keyword reduced organic installs for that keyword by 20 to 30 percent, and that panel data across longer periods associated every $100 in ad spend with roughly 32 paid installs and 2.2 additional organic installs. That is a real, measured spillover, not marketing folklore.",
      "The mechanism, as best understood, runs through ranking rather than direct causation: paid installs raise download velocity for a keyword, download velocity is one of the multipliers in Apple's ranking formula, and the resulting rank increase pulls in organic traffic that would not otherwise have found the app. A high tap-through rate on a paid placement is also read as a relevance signal for that query.",
      "Apple has never officially confirmed a direct organic ranking boost from running ads, and the effect is not the same as fraudulently inflating rank — it's an indirect consequence of the same velocity and engagement signals that reward any legitimate install spike. This is one reason a burst of paid installs on a moderate-difficulty keyword can produce ranking lift that outlasts the campaign, while the same spend on a highly entrenched keyword often does not.",
    ],
    related: ["apple-search-ads", "burst-campaigns", "download-velocity"],
    faq: [
      {
        q: "Does running Apple Search Ads guarantee an organic ranking boost?",
        a: "No. The measured effect is a spillover, not a guarantee, and it depends on the keyword's difficulty and on installs actually engaging with the app. Paid installs that don't retain generate little lasting ranking lift.",
      },
      {
        q: "Is the halo effect the same as click fraud or rank manipulation?",
        a: "No. It's a documented side effect of legitimate ad-driven installs interacting with a ranking algorithm that rewards install velocity and engagement, regardless of whether those installs came from a paid or organic source.",
      },
    ],
  },
  {
    slug: "product-page-optimization",
    term: "Product Page Optimization (PPO)",
    definition: "Product Page Optimization is Apple's native App Store Connect A/B testing tool, letting you run up to three alternate treatments of your icon, screenshots, and preview video against your default page for up to 90 days.",
    body: [
      "Each PPO treatment starts as a full copy of your live product page. You can change only the icon, screenshots, and app preview videos in a treatment — text fields like the title, subtitle, and description aren't part of the test. Traffic from every source (organic search, paid, browse, referrals) is split between your default page and the treatments you're running.",
      "Apple's analytics apply Bayesian statistical methods built for this specific kind of test, and a treatment is labeled as performing better or worse once it reaches 90 percent confidence against the baseline. A test can run for up to 90 days, though clear results on a reasonably trafficked app often arrive well before that.",
      "PPO is the conversion half of ASO, not the discoverability half. It tells you which creative gets more of the users who already see your app to tap install; it says nothing about which keywords bring those users to the page in the first place. Keyword research and PPO are complementary, not substitutes for each other.",
    ],
    related: ["custom-product-pages", "aso-ab-testing", "app-preview-video"],
    faq: [
      {
        q: "Can I test my title or subtitle with Product Page Optimization?",
        a: "No. PPO treatments are limited to the icon, screenshots, and app preview video. Testing metadata text means changing it live and comparing App Store Connect analytics before and after, since there's no built-in split test for those fields.",
      },
      {
        q: "How is PPO different from Custom Product Pages?",
        a: "PPO splits your existing organic and paid traffic to test creative variants against each other. Custom Product Pages are separate, purpose-built pages you link to from specific campaigns or channels — they aren't eligible for PPO testing themselves.",
      },
    ],
  },
  {
    slug: "custom-product-pages",
    term: "Custom Product Pages (CPP)",
    definition: "Custom Product Pages let you create up to 35 alternate versions of your App Store listing, each with its own screenshots and preview video, to link from specific marketing campaigns or audiences.",
    body: [
      "A Custom Product Page shares your app's core metadata (name, subtitle, keyword field, description) but lets you swap the screenshots and preview video for a specific audience or campaign. A fitness app might run one CPP emphasizing weight loss for a diet-focused ad campaign and another emphasizing strength training for a gym-audience campaign, each with its own unique URL.",
      "CPPs are not eligible for Product Page Optimization testing themselves, and they don't create new keyword indexing opportunities since the underlying metadata is shared with the default page. Their value is matching creative to the intent of the traffic source that sent the visitor, which improves conversion for that specific channel.",
      "Up to 35 Custom Product Pages are allowed per app, though most apps get meaningful value from a handful tied to their actual distinct campaigns or audience segments rather than using anywhere near the full allowance.",
    ],
    related: ["product-page-optimization", "app-preview-video", "app-store-conversion-rate"],
    faq: [
      {
        q: "Do Custom Product Pages help my organic keyword ranking?",
        a: "No. They share the same indexed metadata as your default page, so they don't add keyword coverage. Their benefit is conversion on the specific traffic you route to them, not discoverability.",
      },
      {
        q: "Can I A/B test a Custom Product Page?",
        a: "Not with Apple's native Product Page Optimization tool — CPPs are excluded from PPO tests. Any comparison of one CPP's performance against another has to be done manually through App Store Connect analytics, tracking each page's own URL.",
      },
    ],
  },
  {
    slug: "screenshot-caption-indexing",
    term: "Screenshot Caption Indexing",
    definition: "Since June 2025, Apple has used OCR to read the text overlaid on App Store screenshots and treats that caption text as an additional ranking signal, distinct from the metadata fields developers fill in directly.",
    body: [
      "Most screenshots carry a short caption or headline layered over the UI, written to sell the feature shown ('Track habits in 30 seconds', 'Plan your budget in one tap'). Apple's OCR indexing means the words in those captions can now contribute to keyword relevance, not just to the human reader deciding whether to tap.",
      "This adds a fourth practical surface to metadata strategy, after name, subtitle, and keyword field. It does not replace them — captions are unlikely to carry the ranking weight of the title or subtitle — but it means screenshot text is no longer purely a conversion decision. A caption that includes a real target keyword phrase, written naturally rather than stuffed, gets a small amount of extra relevance credit for free.",
      "This is a comparatively recent change, and the exact weight Apple assigns to caption text isn't publicly documented. Treat it as a secondary signal worth aligning with your keyword strategy, not a field to prioritize over the name, subtitle, and keyword field.",
    ],
    related: ["feature-graphic-aso", "metadata-fields", "app-store-search-ranking-factors"],
    faq: [
      {
        q: "Should I rewrite my screenshot captions purely for keywords?",
        a: "No. Captions still have to sell the feature to a human deciding whether to install. Write for conversion first, and where a real target keyword fits naturally into that copy, use it — don't sacrifice a clear pitch for keyword density in a caption.",
      },
      {
        q: "Does this apply to the preview video too?",
        a: "The reporting on OCR indexing has focused on static screenshot captions. Text that appears briefly in a preview video is a less established signal, and shouldn't be assumed to carry the same weight.",
      },
    ],
  },
  {
    slug: "promotional-text",
    term: "Promotional Text",
    definition: "Promotional text is a 170-character field shown on the App Store product page that can be updated at any time without a new app submission, but it is not indexed for search.",
    body: [
      "Promotional text sits above the description on the product page. Because it can be edited without a binary resubmission, it's the fastest metadata field to update for time-sensitive messaging: a seasonal sale, a new feature announcement, a limited-time offer.",
      "It carries no search-ranking weight. Apple does not index promotional text for keyword search, so writing it as a keyword dump wastes the field's actual purpose, which is conversion messaging for someone already viewing the product page.",
      "The practical use case is speed. If a seasonal keyword campaign in your title and subtitle needs a supporting message ('Back-to-school sale — 50% off Pro'), promotional text is the field to update immediately, while the name and subtitle changes queue behind the next app review.",
    ],
    related: ["whats-new-text", "metadata-fields", "seasonal-keyword-calendar"],
    faq: [
      {
        q: "Can I put keywords in promotional text to help ranking?",
        a: "No benefit. It is not indexed for App Store search, so keywords placed there help nothing but readability for a human visitor already on your page.",
      },
      {
        q: "How fast can promotional text changes go live?",
        a: "Promotional text updates don't require a new binary or a full app review the way most metadata changes do, so it can go live much faster than the title, subtitle, or keyword field.",
      },
    ],
  },
  {
    slug: "whats-new-text",
    term: "What's New Text",
    definition: "What's New text is the release-notes field shown for an app update — it is not indexed for search, but it can affect a user's decision to update or reinstall.",
    body: [
      "Every app version can carry a What's New description explaining what changed. Like the long description, it has no bearing on which searches your app appears in, since Apple does not index it for ranking.",
      "Its actual job is retention and re-engagement: a lapsed user browsing their installed apps, or a current user deciding whether an update is worth downloading, reads this field. Generic text ('bug fixes and performance improvements') wastes that opportunity; specific text about a feature users asked for gives them a reason to open the app again.",
      "Because it changes with every release, What's New is not a place to store permanent keyword strategy — treat it as a short-lived message to existing users, separate entirely from the discoverability fields.",
    ],
    related: ["promotional-text", "metadata-fields", "update-frequency-signal"],
    faq: [
      {
        q: "Does writing detailed What's New text improve my ranking?",
        a: "Not directly. It isn't indexed for search. Its value is prompting existing users to update or reopen the app, which can indirectly support retention and engagement signals over time.",
      },
    ],
  },
  {
    slug: "app-preview-video",
    term: "App Preview Video",
    definition: "An app preview video is a short, auto-playing (muted) video on the App Store product page and in some search placements, used to demonstrate the app in action and improve conversion.",
    body: [
      "Preview videos autoplay without sound wherever they appear, so the visual alone has to carry the message. The first two to three seconds are the effective window before most viewers have already decided whether to keep watching or move on, which makes the opening shot as important as any single screenshot.",
      "A preview video is a conversion asset, not a discoverability one — it has no direct effect on keyword ranking. Its value shows up in the tap-through and install rate from people who already see your listing, whether from search, browse, or a paid placement.",
      "Because it's one of the few elements testable through Product Page Optimization, the honest way to know whether a preview video helps your specific app is to run it against a strong static-screenshot-only treatment rather than assume video always wins.",
    ],
    related: ["product-page-optimization", "feature-graphic-aso", "app-store-conversion-rate"],
    faq: [
      {
        q: "Does having a preview video help my search ranking?",
        a: "Not directly. It affects conversion once a user sees your listing, not whether the listing appears for a given search term.",
      },
      {
        q: "How long should an app preview video be?",
        a: "Apple allows up to 30 seconds, but the meaningful conversion window is much shorter. Front-load the app's core value in the first few seconds rather than building up to it.",
      },
    ],
  },
  {
    slug: "app-store-conversion-rate",
    term: "App Store Conversion Rate",
    definition: "App Store conversion rate is the share of users who see your app's listing in search or browse and go on to install it, and it now carries as much ranking weight as metadata relevance in most categories.",
    body: [
      "Conversion rate is measured from impression (the app appears in a results list) through to install. Industry reporting on 2026 App Store behavior puts the average search conversion rate around 3 to 5 percent across most categories, though this varies significantly by category and by how well-targeted the traffic is.",
      "Apple's ranking system treats conversion rate as a quality-and-relevance signal, not just a business metric: an app that a high percentage of searchers install after seeing it is read as genuinely relevant to that query, on top of whatever relevance its metadata already claims. This means a smaller app with strong conversion can outrank a larger one with weaker creative, even on the same keyword.",
      "The main levers for conversion are the icon, the first screenshots, and the preview video, all of which are testable through Product Page Optimization. Keyword research decides who sees your listing; conversion rate decides what fraction of them install.",
    ],
    related: ["product-page-optimization", "tap-through-rate", "app-store-search-ranking-factors"],
    faq: [
      {
        q: "What's considered a good App Store conversion rate?",
        a: "Above the 3 to 5 percent category average is solid; well-optimized listings in less crowded categories can run meaningfully higher. Compare your own rate against your category rather than a single universal benchmark, since baseline conversion varies a lot by app type.",
      },
      {
        q: "Can I improve conversion rate without changing my keywords?",
        a: "Yes, and it's often the faster lever. Testing the icon and first screenshots through Product Page Optimization can raise conversion for the search traffic you already receive, without touching the keyword field at all.",
      },
    ],
  },
  {
    slug: "retention-rate-aso",
    term: "Retention Rate (as a Ranking Signal)",
    definition: "Retention rate — the share of users who keep using an app after install — is now treated as a first-class App Store ranking signal alongside metadata relevance, download velocity, and conversion.",
    body: [
      "Reporting on the 2026 App Store algorithm describes ranking as a formula where metadata relevance, download velocity, conversion rate, and retention each multiply the others rather than one dominating. An app with strong retention and a solid rating can outrank a larger competitor with better metadata but weaker post-install engagement.",
      "Retention is the hardest of these four factors to influence through ASO work directly, since it reflects genuine product quality and fit rather than a metadata or creative choice. It rewards apps that deliver on what their listing promises — over-promising in your subtitle or screenshots to win a tap can hurt retention and, by extension, ranking, even if it briefly improves conversion.",
      "For keyword strategy specifically, this means targeting keywords that accurately describe what your app does compounds over time: users who searched for the right thing and got it are the users most likely to stick around, which then reinforces the ranking for that exact keyword.",
    ],
    related: ["app-store-conversion-rate", "app-store-search-ranking-factors", "ratings-and-reviews-aso"],
    faq: [
      {
        q: "Can I see my own retention data?",
        a: "Yes, in App Store Connect's native analytics, which reports retention alongside impressions and conversion. Comparing retention across the keywords driving your installs can reveal which search terms bring in the best-fit users.",
      },
      {
        q: "Does chasing high-popularity keywords hurt retention?",
        a: "It can, if the keyword doesn't accurately match your app's actual functionality. A popular but loosely relevant term may drive installs from users who churn quickly, which works against the ranking benefit you were targeting in the first place.",
      },
    ],
  },
  {
    slug: "tap-through-rate",
    term: "Tap-Through Rate (TTR)",
    definition: "Tap-through rate is the share of users who see your app in App Store search results and tap into the product page, measuring the pull of your icon, name, and subtitle before any conversion decision is made.",
    body: [
      "TTR is the step before conversion rate: a user has to tap into your listing before they can decide whether to install. It's driven almost entirely by the icon, the app name, and the subtitle as they appear in the compact search results row, since that's all a searcher sees before tapping.",
      "A high tap-through rate on a paid Apple Search Ads placement is also read as a relevance signal for that specific query, contributing to the paid-to-organic halo effect some keywords show after an ad campaign runs.",
      "Because TTR and conversion rate measure different steps of the same funnel, a listing can have a strong TTR (compelling icon and name) but weak conversion (the product page itself doesn't close the sale), or the reverse. Diagnosing which stage is underperforming tells you whether to fix the icon or the screenshots.",
    ],
    related: ["app-store-conversion-rate", "halo-effect", "feature-graphic-aso"],
    faq: [
      {
        q: "How do I improve tap-through rate specifically?",
        a: "Focus on the icon and the name/subtitle pairing, since that's all a searcher sees before tapping. Product Page Optimization can test icon variants directly against your current TTR.",
      },
      {
        q: "Is tap-through rate the same as conversion rate?",
        a: "No. TTR measures impression-to-tap; conversion rate measures impression-to-install (or tap-to-install). A listing can win on one and lose on the other.",
      },
    ],
  },
  {
    slug: "download-velocity",
    term: "Download Velocity",
    definition: "Download velocity is the rate of installs an app receives over a short window, treated by Apple's ranking algorithm as a multiplier alongside metadata relevance, conversion, and retention.",
    body: [
      "A sudden increase in installs for a given keyword, whether from organic growth, press coverage, or paid Apple Search Ads, signals to the algorithm that the app is satisfying real demand for that search. This is the mechanism most commonly cited behind burst campaigns and the paid-to-organic halo effect.",
      "Velocity matters more than absolute volume in the short term. An app going from 10 to 200 daily installs for a keyword shows a stronger velocity signal than an app holding steady at 5,000, even though the second app has far more total installs.",
      "Velocity gains from a short paid push tend to fade if the underlying engagement (conversion, retention) doesn't hold up once the spend stops. It's a multiplier on the other ranking factors, not a substitute for them.",
    ],
    related: ["halo-effect", "burst-campaigns", "app-store-search-ranking-factors"],
    faq: [
      {
        q: "Can download velocity alone push a keyword to the top of search results?",
        a: "For a short time, on moderate-difficulty terms, yes. Sustained top ranking still depends on conversion and retention holding up once the velocity spike passes.",
      },
      {
        q: "Does velocity reset after a campaign ends?",
        a: "The install rate itself drops back to baseline, but any ranking gained during the spike can persist if the engagement signals from those installs (retention, ratings) support it. If they don't, ranking tends to drift back down.",
      },
    ],
  },
  {
    slug: "keyword-indexing-time",
    term: "Keyword Indexing Time",
    definition: "Keyword indexing time is the delay between submitting a metadata update and Apple's search index reflecting the new title, subtitle, or keyword field.",
    body: [
      "Metadata changes require an app review before they go live, and once approved, Apple typically re-indexes the new terms within a few days. Ranking movement for those terms then continues to develop over roughly a week as engagement data accumulates against the new metadata.",
      "This delay is why keyword research has to happen before a planned release, not during it — a seasonal keyword change submitted the week of the event has likely missed most of the relevant search window by the time it's indexed and ranking.",
      "Indexing time is separate from review time, which varies by app and by how the update is submitted. Both add up: budget for review time plus indexing time plus ranking ramp-up when planning any time-sensitive metadata change.",
    ],
    related: ["seasonal-keyword-calendar", "metadata-fields", "app-store-search-ranking-factors"],
    faq: [
      {
        q: "How far ahead should I submit a metadata update for a seasonal keyword?",
        a: "Two to three weeks before the peak search window is a reasonable buffer, accounting for review time, indexing, and the ranking ramp-up as engagement data builds for the new terms.",
      },
      {
        q: "Does indexing time apply to promotional text too?",
        a: "No. Promotional text updates independently of a full metadata review cycle and goes live faster, which is exactly why it's a poor substitute for keyword field changes but a good tool for time-sensitive messaging.",
      },
    ],
  },
  {
    slug: "search-autosuggest",
    term: "Search Autosuggest / Autocomplete",
    definition: "Search autosuggest is the list of suggested queries the App Store search bar shows as a user types, generated from real aggregate search behavior and usable as a free source of keyword candidates.",
    body: [
      "Typing a partial term into the App Store search bar surfaces Apple's own suggestions for how that search is commonly completed. Because these suggestions come from actual user search patterns, they reflect real phrasing rather than guesswork, including phrasing you might not have considered.",
      "This is one of the lowest-effort keyword research sources available: type your core terms one at a time and record every suggestion that's relevant to your app. It costs nothing and requires no tooling beyond the App Store app itself.",
      "Autosuggest terms still need to be scored for popularity and difficulty before you commit character space to them — the fact that Apple suggests a phrase means people search it, not that the demand or the ranking difficulty is favorable for your app specifically.",
    ],
    related: ["aso-keyword-research", "long-tail-keywords", "discovery-campaign"],
    faq: [
      {
        q: "Is autosuggest data the same in every storefront?",
        a: "No. Suggestions reflect local search behavior in that storefront's language, which is why running autosuggest research separately per target market surfaces different phrasing than translating your primary-market findings.",
      },
    ],
  },
  {
    slug: "portfolio-keyword-cannibalization",
    term: "Portfolio Keyword Cannibalization",
    definition: "Portfolio keyword cannibalization happens when a studio's multiple apps target the same keywords, splitting the same search demand between the studio's own apps instead of capturing a wider set of terms.",
    metaDescription: "Portfolio keyword cannibalization is when a studio's own apps compete against each other for the same keywords instead of splitting the demand between them.",
    body: [
      "This is a different problem from single-app keyword cannibalization, where one app repeats a term across its own title, subtitle, and keyword field. Here, two or more apps from the same developer both target 'habit tracker', for example, and end up competing against each other in the same search results — capping how much combined visibility the studio gets from that one term.",
      "It shows up most in studios that build several apps in the same category, or that clone a successful app's metadata pattern for a new release without checking for overlap. The studio's total keyword footprint ends up narrower than the sum of two apps' character budgets should allow.",
      "The fix is treating keyword assignment as a portfolio decision, not a per-app one: score the studio's full candidate list once, then split it so each app owns distinct, non-overlapping terms rather than defaulting every app to the same obvious category words.",
    ],
    related: ["keyword-cannibalization", "aso-keyword-research", "keyword-gap-analysis"],
    faq: [
      {
        q: "How do I check whether my own apps are cannibalizing each other?",
        a: "Run each app's current keyword set through the same scoring pass and compare the lists side by side. Overlapping high-value terms across apps in the same category are the candidates to redistribute.",
      },
      {
        q: "Should sister apps ever share a keyword on purpose?",
        a: "Occasionally, for a term core to the studio's brand identity across its apps. But treat that as a deliberate exception, not the default outcome of not checking for overlap.",
      },
    ],
  },
  {
    slug: "keyword-stuffing",
    term: "Keyword Stuffing",
    definition: "Keyword stuffing is repeating or jamming keywords into App Store metadata beyond what natural, readable copy would contain — a practice Apple's algorithm penalizes rather than rewards.",
    body: [
      "Early App Store optimization sometimes treated the keyword field as a place to cram every synonym and variation of a term. Current guidance and algorithm behavior work against this: stuffed metadata reads as spam to human searchers, which drags down tap-through and conversion rate, and those conversion signals now carry real ranking weight of their own.",
      "The failure mode is subtle because stuffing can technically add keyword coverage while quietly damaging the conversion signals the algorithm also rewards. A subtitle that reads 'Habit Tracker Daily Habits Tracker App' covers little more ground than a clean version and converts worse than one written for a human to read.",
      "The practical rule: write the title and subtitle for a human first, then check that your highest-priority keywords are present. Reserve the keyword field, which isn't visible to users, for straightforward comma-separated coverage rather than sentence-like repetition.",
    ],
    related: ["keyword-cannibalization", "metadata-fields", "app-store-conversion-rate"],
    faq: [
      {
        q: "Is there a specific penalty triggered by keyword stuffing?",
        a: "There's no published, itemized penalty. The damage comes indirectly: stuffed metadata reads poorly to searchers, which lowers tap-through and conversion, and both are now ranking signals in their own right.",
      },
      {
        q: "Is repeating a keyword once in the title and once in the keyword field stuffing?",
        a: "It's cannibalization more than stuffing, and it wastes character space rather than triggering a penalty. True stuffing is the more aggressive pattern of jamming multiple variants into a single field to the point of reading unnaturally.",
      },
    ],
  },
  {
    slug: "single-keyword-vs-phrase-match",
    term: "Single Keyword vs. Keyword Phrase",
    definition: "In the App Store keyword field, single words are indexed individually and recombined by Apple's algorithm, which changes how you should weigh one broad word against a specific multi-word phrase.",
    body: [
      "Apple indexes each comma-separated entry in the keyword field as individual words, then can recombine words from across your name, subtitle, and keyword field to match multi-word searches. This means 'habit,tracker,daily,streak' can match a search for 'daily habit tracker' even though that exact phrase never appears together anywhere in your metadata.",
      "This recombination is why single high-value words often cover more ground per character than a full phrase repeated verbatim. Four single words at roughly 20 characters can contribute to dozens of possible search combinations; the same 20 characters spent on one fixed phrase covers only that phrase.",
      "The exception is when a specific phrase has meaningfully different demand or difficulty than its component words scored separately — a distinct niche phrase worth targeting directly rather than assuming recombination will produce it.",
    ],
    related: ["keyword-cannibalization", "long-tail-keywords", "plural-singular-keywords"],
    faq: [
      {
        q: "Should I ever put a full phrase in the keyword field instead of separate words?",
        a: "Only when that exact phrase has real, distinct demand you've confirmed by scoring it directly. Otherwise, separate words generally cover more possible searches for the same character cost.",
      },
    ],
  },
  {
    slug: "plural-singular-keywords",
    term: "Plural and Singular Keywords",
    definition: "Apple's App Store search treats common plural and singular forms of a word as equivalent for most terms, which means including both usually wastes character space rather than adding coverage.",
    body: [
      "For most English nouns, 'tracker' and 'trackers' are read as the same stem by Apple's search indexing. Entering both in a 100-character field spends roughly double the characters for no additional search coverage.",
      "This isn't universal across every word or every language, and irregular plurals or words that carry a different meaning in singular versus plural form are the exceptions worth testing rather than assuming. When in doubt, the safer default is one form and using the saved characters for a distinct term.",
      "This is a narrower, more mechanical case of the broader keyword cannibalization problem: any two entries that cover overlapping search ground are wasting field space that could instead extend reach to a new query.",
    ],
    related: ["keyword-cannibalization", "single-keyword-vs-phrase-match", "metadata-fields"],
    faq: [
      {
        q: "Are there languages where plural and singular forms need to be entered separately?",
        a: "Stemming behavior varies by language, and it isn't fully documented by Apple for every locale. If you're localizing into a language with irregular or unpredictable plural forms, treat the assumption as untested for that market rather than universal.",
      },
    ],
  },
  {
    slug: "today-tab-featuring",
    term: "Today Tab Featuring",
    definition: "The Today tab is Apple's editorially curated App Store home surface, distinct from search results and unaffected by keyword metadata or ASO work.",
    body: [
      "Apps and stories on the Today tab are selected by Apple's editorial team, not surfaced by the search ranking algorithm. No combination of title, subtitle, or keyword field choices earns a Today tab placement — it's a curatorial decision based on design quality, timeliness, and story angle.",
      "Being featured can produce a real, sometimes large, temporary spike in installs, which can then interact with the ranking algorithm's download-velocity signal and produce organic ranking gains that outlast the feature itself. But the feature is the cause; ASO metadata isn't the lever that gets you there.",
      "Developers looking to be featured typically work through Apple's own submission channels (App Store Connect's 'Nominate for Editorial Consideration' or direct developer relations contact) well ahead of a launch, rather than through keyword optimization.",
    ],
    related: ["editorial-features", "download-velocity", "app-store-search-tab-vs-browse-tab"],
    faq: [
      {
        q: "Can good ASO get my app featured on the Today tab?",
        a: "No. Featuring is an editorial decision separate from the search ranking algorithm. Strong metadata and a polished product page help conversion if a featured spike sends users to your listing, but they don't cause the feature.",
      },
    ],
  },
  {
    slug: "editorial-features",
    term: "Editorial Features",
    definition: "Editorial features are the app stories, collections, and highlights Apple's own editorial team selects across the App Store, entirely separate from the algorithmic search and browse ranking that ASO work influences.",
    body: [
      "Where search ranking is driven by metadata relevance, engagement, and quality signals, editorial placement is a human curatorial decision. Apple's editors choose apps for design quality, storytelling, timeliness, or category relevance for a themed collection, not because they matched a keyword algorithm.",
      "This distinction matters because it sets expectations correctly: an app can have excellent ASO and never be editorially featured, and an app with mediocre keyword coverage can still earn a feature on the strength of its design and story. The two systems don't reward the same inputs.",
      "The practical path to editorial consideration is Apple's own nomination channel in App Store Connect, submitted with enough lead time before a launch or major update, rather than any change to the keyword field.",
    ],
    related: ["today-tab-featuring", "app-store-algorithm", "app-store-search-tab-vs-browse-tab"],
    faq: [
      {
        q: "Does an editorial feature affect my keyword rankings?",
        a: "Not directly, but indirectly it can. The install spike from a feature contributes to download velocity, which is a ranking factor, so a feature can produce ranking gains for keywords the app was already eligible for.",
      },
    ],
  },
  {
    slug: "search-ads-vs-organic-keywords",
    term: "Deciding Which Keywords to Bid On vs. Rank For",
    definition: "Choosing between paying for a keyword through Apple Search Ads and earning it organically depends on the keyword's difficulty, your current ranking, and whether paid spend or metadata effort gets you there faster.",
    body: [
      "A keyword where you already rank in the top 3 organically rarely needs paid spend — you'd mostly be paying for traffic you'd get for free, and Apple's own guidance and case studies note this overlap. A keyword with high difficulty and no realistic organic path in the near term is a better candidate for paid placement, since organic ranking there may take months if it arrives at all.",
      "The middle ground, moderate-difficulty keywords where organic ranking is plausible but not yet achieved, is where paid spend does the most work: it can accelerate the download velocity that contributes to organic ranking, effectively renting the position while the organic signal catches up.",
      "This decision isn't permanent. As organic rank improves for a bid keyword, the marginal value of continuing to pay for it drops, and that ad budget is better redirected toward the next tier of keywords you haven't yet earned.",
    ],
    related: ["apple-search-ads", "halo-effect", "keyword-difficulty"],
    faq: [
      {
        q: "Should I stop bidding on a keyword once I rank first organically?",
        a: "Often yes, unless a competitor is actively bidding to appear above your organic result on that term. At that point the paid spend is largely defensive rather than acquisitive.",
      },
      {
        q: "Is it wasteful to bid on a keyword I already rank well for?",
        a: "It can be, if no one is contesting the position. Redirecting that budget to a keyword with unrealized organic potential or a genuine competitive threat is usually a better use of the same spend.",
      },
    ],
  },
  {
    slug: "impression-to-product-page-view-rate",
    term: "Impression-to-Product-Page-View Rate",
    definition: "Impression-to-product-page-view rate measures how many users who see your app in search or browse results go on to open the full product page, the step immediately before the install decision.",
    body: [
      "This sits between raw search visibility and conversion: an impression is counted when your app appears in a results list, and a product page view is counted when a user taps through to see the full listing. It's effectively the same measurement as tap-through rate, viewed from App Store Connect's native analytics rather than from an ads dashboard.",
      "A low rate here, while impressions are healthy, usually points to the icon, name, or subtitle failing to earn the tap — the elements visible in the compact search row. A healthy rate here paired with a low install rate points instead to the full product page (screenshots, description, reviews) failing to close.",
      "Reading these two rates together is a fast way to diagnose which half of the funnel needs work before assuming the fix is a keyword problem at all.",
    ],
    related: ["tap-through-rate", "app-store-conversion-rate", "app-store-connect-analytics"],
    faq: [
      {
        q: "Where do I find this metric?",
        a: "App Store Connect's built-in analytics reports impressions, product page views, and conversion to install as separate funnel steps for your app, broken down by source including search.",
      },
    ],
  },
  {
    slug: "organic-vs-paid-installs",
    term: "Organic vs. Paid Installs",
    definition: "Organic installs come from users who found an app through unpaid search or browse; paid installs come from Apple Search Ads or other ad campaigns — the distinction matters for measuring ASO's real impact separately from ad spend.",
    body: [
      "App Store Connect and Apple Search Ads reporting both surface install counts, but attributing an install correctly to organic discovery versus a paid campaign matters for knowing whether a metadata change or an ad budget is actually driving growth.",
      "The halo effect complicates a clean split: some installs counted as organic were made more likely by a concurrent paid campaign's ranking lift, so the two channels aren't fully independent even when they're measured separately. Treat the organic number as influenced by, not isolated from, recent ad activity.",
      "For ASO measurement specifically, watching organic installs for a keyword change after a metadata update, with no concurrent paid campaign on that term, gives the cleanest read on whether the metadata change itself worked.",
    ],
    related: ["halo-effect", "app-store-connect-analytics", "download-velocity"],
    faq: [
      {
        q: "Can I fully separate organic results from paid halo effects?",
        a: "Not perfectly. The cleanest test is pausing paid spend on a keyword for a period and watching whether organic installs for that term hold steady, which is close to the method the academic research on the halo effect itself used.",
      },
    ],
  },
  {
    slug: "app-age-ranking-signal",
    term: "App Age / Tenure as a Ranking Signal",
    definition: "An app's time in the store, and the ranking history it accumulates during that time, functions as a form of algorithmic trust that new apps have to build up rather than start with.",
    body: [
      "Two apps with identical metadata rarely rank identically if one has years of ratings, updates, and engagement history behind it and the other launched last month. Apple's algorithm appears to weight accumulated engagement and quality signals, which naturally correlate with tenure even though age itself isn't a direct input.",
      "This is why a brand-new app should expect to compete for lower-difficulty keywords first rather than immediately targeting the same terms an established competitor holds — the entrenched app's difficulty score reflects real accumulated ranking weight, not just current metadata.",
      "Tenure advantage erodes for a competitor that stops updating or loses engagement, which is one reason difficulty scores shift over time even without any change to your own app — the competitive set ages too, in both directions.",
    ],
    related: ["new-app-keyword-strategy", "keyword-difficulty", "update-frequency-signal"],
    faq: [
      {
        q: "Does a new app ever outrank an established one?",
        a: "Yes, particularly on lower-difficulty or niche terms where the established competitor hasn't built up much specific relevance, or where the incumbent's engagement has declined. It's harder on broad, high-difficulty terms.",
      },
    ],
  },
  {
    slug: "update-frequency-signal",
    term: "Update Frequency as a Quality Signal",
    definition: "How often an app ships updates is read by both users and, to some extent, the App Store algorithm as an indicator of active maintenance and quality, separate from any specific metadata change in a given release.",
    body: [
      "A stale app that hasn't updated in a year signals abandonment risk to a cautious searcher, which can depress conversion even if the metadata and screenshots are otherwise fine. Regular updates, even minor ones, keep the listing looking maintained.",
      "This is distinct from the direct ranking effect of a metadata change within an update. Update frequency itself is a softer, longer-run signal bound up with retention and quality rather than a specific lever tied to one release.",
      "Practically, this argues for a cadence of small, real updates rather than long gaps followed by one large release, both for the maintenance signal and because it creates regular, low-risk opportunities to test metadata and creative changes.",
    ],
    related: ["app-age-ranking-signal", "whats-new-text", "app-store-search-ranking-factors"],
    faq: [
      {
        q: "Does updating an app just to appear active help ranking?",
        a: "A cosmetic update with no real change is unlikely to move ranking on its own. The benefit comes from genuine improvements shipped regularly, which support the retention and engagement signals the algorithm actually rewards.",
      },
    ],
  },
  {
    slug: "rtl-language-aso",
    term: "RTL (Right-to-Left) Language ASO",
    definition: "Right-to-left languages like Arabic and Hebrew require App Store metadata, screenshots, and layout consideration adapted for RTL reading direction, not just word-for-word translation.",
    body: [
      "Arabic and Hebrew App Store storefronts read right to left, which affects more than the direction of text in your title and subtitle — screenshots showing UI flow, arrows, or ordered steps need to reflect RTL layout if your app supports it, or they'll visually contradict how a native reader expects the interface to work.",
      "Keyword research for RTL markets has the same requirement as any other localization: search the actual terms Arabic or Hebrew speakers type, rather than machine-translating your English keyword list. Word order and common phrasing in RTL languages often don't map cleanly onto an English structure.",
      "Arabic-speaking markets and Southeast Asia are frequently cited as both promising and comparatively under-optimized by competitors, which can mean lower keyword difficulty for well-localized apps willing to do the RTL adaptation work properly rather than skip these storefronts as too complex.",
    ],
    related: ["translation-vs-localization", "localization-aso", "app-store-storefront"],
    faq: [
      {
        q: "Do I need an RTL app layout to localize into Arabic for ASO purposes?",
        a: "For the App Store listing itself, no — but if your app's UI doesn't support RTL and your screenshots show a left-to-right interface, that mismatch can hurt conversion once an Arabic-speaking user opens the app. Metadata localization and UI localization are separate investments worth planning together.",
      },
    ],
  },
  {
    slug: "translation-vs-localization",
    term: "Translation vs. Localization",
    definition: "Translation converts words from one language to another; localization adapts the message, keyword choices, and cultural framing for how people in that specific market actually search and read.",
    body: [
      "A word-for-word translation of an English App Store listing produces grammatically correct but often unnatural metadata, because it reflects English search behavior and phrasing patterns rather than local ones. Localization means researching what people in that market actually type into search, which can differ substantially from a direct translation of your English keywords.",
      "Cultural framing extends beyond keywords into tone: reporting on regional App Store copy patterns notes that Japanese listings tend toward detailed, feature-focused descriptions, American listings toward concise, benefit-focused copy, and Brazilian listings toward a more conversational, enthusiastic register. Applying one market's tone to another's storefront can read as off, even when every word is technically correct.",
      "The practical workflow is running keyword research separately for each target storefront, rather than translating one master list, and having local-language input review the resulting metadata for naturalness before publishing.",
    ],
    related: ["localization-aso", "cross-localization", "rtl-language-aso"],
    faq: [
      {
        q: "Is machine translation ever good enough for App Store metadata?",
        a: "It's a reasonable starting draft, but not a finished product. Run the translated keywords back through popularity scoring for that storefront, and have a native speaker check the title and subtitle for natural phrasing before publishing.",
      },
    ],
  },
  {
    slug: "cross-localization",
    term: "Cross-Localization",
    definition: "Cross-localization means targeting a keyword's real demand from a storefront where it isn't the dominant language — for example, capturing English-language searches inside a bilingual or English-fluent non-English-primary market.",
    body: [
      "Some storefronts have significant search volume in a second language even though the primary local language is something else — bilingual markets, expatriate populations, or categories (like productivity or developer tools) where English terms are common regardless of the user's first language.",
      "Cross-localization means checking whether your existing English keyword set already has meaningful popularity in a storefront you haven't formally localized, before spending on a full translation. If the demand is already there in English, translation work may add less value than expected for that specific market.",
      "This is a research step, not an assumption: popularity scores per storefront reveal it directly, since the same English term can show real demand in one non-English market and none at all in another with a similar language profile.",
    ],
    related: ["translation-vs-localization", "app-store-storefront", "keyword-popularity"],
    faq: [
      {
        q: "How do I know if cross-localization applies to a market I'm considering?",
        a: "Score your existing English keywords in that storefront before commissioning any translation. Meaningful popularity for English terms there suggests cross-localization is already capturing some demand, which should inform how much translation investment makes sense.",
      },
    ],
  },
  {
    slug: "app-store-connect-analytics",
    term: "App Store Connect Analytics",
    definition: "App Store Connect Analytics is Apple's own native reporting on impressions, product page views, conversion, and retention for your app, distinct from and complementary to third-party ASO tools.",
    body: [
      "Apple's native analytics reports what already happened to your live app: which search terms led to impressions and installs, how conversion varies by source, and how users retain after install. This is ground-truth performance data for the keyword set you're currently running.",
      "Third-party keyword research tools, including ASOGrade, answer a different question: not what happened, but what could happen if you changed your keywords. They score candidate terms for demand and difficulty before you commit character space to them, which native analytics can't do since it only reports on terms already in your live metadata.",
      "Used together, native analytics tells you which of your current keywords are working, and keyword research tools tell you which untried candidates are worth testing next. Neither replaces the other.",
    ],
    related: ["aso-keyword-research", "app-store-conversion-rate", "organic-vs-paid-installs"],
    faq: [
      {
        q: "Can App Store Connect tell me the difficulty of a keyword I don't rank for yet?",
        a: "No. Native analytics only reports on search terms already driving impressions to your live app. Evaluating a keyword you haven't targeted yet requires a research tool that reads the current ranking set independent of your own metadata.",
      },
    ],
  },
  {
    slug: "keyword-relevance-vs-popularity",
    term: "Keyword Relevance vs. Popularity",
    definition: "Relevance is Apple's internal judgment of whether a keyword genuinely matches your app's metadata; popularity is a separate measure of how much total search demand that keyword has — a term can score high on one and low on the other.",
    body: [
      "These are commonly conflated but answer different questions. Relevance determines eligibility: whether your app can appear for a search at all, based on metadata match. Popularity, as ASOGrade and similar tools surface it, measures how many people search that term in the first place, independent of whether your app matches it.",
      "A keyword can have very high popularity but low relevance to your specific app — targeting it would be pointless even if you could technically rank, because the searchers don't want what you offer. Conversely, a keyword can be perfectly relevant to your app but have low popularity, meaning few people search it regardless of how well you'd rank.",
      "The keywords worth prioritizing sit at the intersection: genuinely relevant to what your app does, with popularity high enough to matter, and difficulty low enough to be winnable. Missing any one of the three wastes the character slot.",
    ],
    related: ["keyword-popularity", "keyword-difficulty", "app-store-search-ranking-factors"],
    faq: [
      {
        q: "Can I force relevance for a high-popularity keyword my app doesn't really match?",
        a: "Putting the word in your metadata may get you indexed for it, but weak genuine relevance tends to show up as poor conversion and retention from that traffic, which then works against your ranking on that same term over time.",
      },
    ],
  },
  {
    slug: "seasonal-keyword-calendar",
    term: "Seasonal Keyword Calendar",
    definition: "A seasonal keyword calendar maps the recurring windows when specific App Store categories see predictable demand spikes, so metadata updates can be timed ahead of the peak rather than during or after it.",
    body: [
      "Reporting on App Store seasonality points to several recurring windows: late December through mid-January is the single biggest install period for fitness, habit-tracking, and finance apps, driven by New Year resolutions and new devices received as gifts. Mid-August through mid-September is the equivalent peak for education apps, as students and parents search for study tools ahead of the school year.",
      "Black Friday and Cyber Monday in late November drive a spike for shopping, deal-finder, and retail apps specifically. Summer months bring a secondary, smaller peak for fitness apps around outdoor activity and 'summer body' search terms, well below the January peak but still meaningful for that category.",
      "The timing rule that applies across all of these: submit metadata changes two to three weeks ahead of the expected peak, accounting for app review and keyword indexing time, rather than reacting once the season has already started.",
    ],
    related: ["keyword-seasonality", "keyword-indexing-time", "promotional-text"],
    faq: [
      {
        q: "What if my app category doesn't fit an obvious seasonal pattern?",
        a: "Check your own popularity scores for core keywords over time rather than assuming no seasonality exists. Many categories have a smaller, less-publicized pattern tied to their own audience's calendar even if it isn't one of the well-known ones.",
      },
      {
        q: "Should I revert seasonal keyword changes after the peak passes?",
        a: "Usually yes, if the seasonal term has little relevance the rest of the year, since it's occupying character space that could serve an evergreen term instead during the off-season.",
      },
    ],
  },
  {
    slug: "app-clip-discoverability",
    term: "App Clip Discoverability",
    definition: "App Clips are lightweight, instant-launch slices of an app triggered by a link, code, or NFC tag rather than App Store search, so conventional keyword ASO has little bearing on how they're discovered.",
    body: [
      "Unlike the full app, an App Clip is typically launched from a QR code, a Safari App Clip banner, a Messages link, or an NFC tap tied to a physical location or object — not from a user typing a search term into the App Store. This makes keyword field optimization largely irrelevant to App Clip discovery specifically.",
      "The App Clip's own card and invocation experience still matters for conversion once a user has been directed to it, but that's a design and trust question (does this look legitimate and worth a tap?) rather than a keyword question.",
      "For apps that use App Clips as part of a broader acquisition strategy, the ASO-relevant work stays with the full app's listing, since a well-run App Clip experience is often what converts a user into installing the full app afterward.",
    ],
    related: ["custom-product-pages", "app-store-conversion-rate", "app-store-search-tab-vs-browse-tab"],
    faq: [
      {
        q: "Can someone find my App Clip by searching the App Store?",
        a: "No. App Clips are invoked through links, codes, or tags placed by the developer, not through App Store search. If you want search discoverability, that has to come from the full app listing.",
      },
    ],
  },
  {
    slug: "incrementality-testing-aso",
    term: "Incrementality Testing (ASO)",
    definition: "Incrementality testing isolates what a specific ASO change or ad campaign actually caused, as distinct from installs that would have happened anyway, by comparing against a holdout or a paused period.",
    body: [
      "Raw install numbers after a metadata change or an ad campaign don't prove the change caused them — some of those installs might have happened regardless. Incrementality testing addresses this by creating a comparison: pausing a campaign for a period and watching whether installs drop, or holding one storefront's metadata constant as a control while updating others.",
      "This matters most for expensive or uncertain decisions: before committing to ongoing paid spend on a keyword, a short pause-and-compare test can show how much of the current install rate is actually attributable to the ads versus organic demand that existed anyway.",
      "For organic metadata changes, a cleaner but slower version of the same logic applies: compare a keyword's install rate for a period before and after the change, watching for a shift that outpaces normal week-to-week variance rather than assuming any change was the update's doing.",
    ],
    related: ["organic-vs-paid-installs", "halo-effect", "app-store-connect-analytics"],
    faq: [
      {
        q: "Do I need special tooling to run an incrementality test?",
        a: "Not necessarily. A basic version just requires comparing performance before and after a change, or pausing one variable (like ad spend on a keyword) while holding others constant, using the analytics you already have access to.",
      },
    ],
  },
  {
    slug: "app-store-search-tab-vs-browse-tab",
    term: "Search Tab vs. Browse Tab",
    definition: "The App Store's Search tab surfaces apps by keyword query, where ASO metadata directly applies; the Today, Games, and Apps browse tabs surface apps through editorial curation and category browsing, where it doesn't.",
    body: [
      "Keyword-driven ASO work (title, subtitle, keyword field) is aimed squarely at the Search tab, since that's the surface governed by the ranking algorithm reading your metadata against a typed query. Browse surfaces work differently: Today is editorially curated, and the Games/Apps tabs surface curated collections and charts rather than a search-query match.",
      "Category and chart position within the browse tabs are influenced by broader quality and popularity signals (downloads, ratings, engagement) more than by specific keyword choices, so a strong keyword field won't move a browse-tab chart position the way it moves search ranking for the terms it targets.",
      "Understanding which tab a given growth tactic actually affects prevents misdiagnosing results — a metadata change that doesn't move a browse-tab chart position hasn't necessarily failed, since that wasn't the surface it was built to influence.",
    ],
    related: ["today-tab-featuring", "app-store-categories", "app-store-algorithm"],
    faq: [
      {
        q: "Does improving my keyword field help my category chart ranking?",
        a: "Not directly. Chart position in the browse tabs is driven more by download volume, ratings, and engagement than by keyword field content. Keyword work is aimed at Search tab ranking specifically.",
      },
    ],
  },
  {
    slug: "new-app-keyword-strategy",
    term: "New App Keyword Strategy (Cold Start)",
    definition: "A new app with few or no ratings needs a different keyword strategy than an established one — targeting lower-difficulty terms first to build the ranking history and engagement signals that later unlock more competitive keywords.",
    body: [
      "An app with under 100 ratings competing directly for the same high-difficulty terms as an entrenched competitor with tens of thousands of ratings is starting from a structural disadvantage that better copywriting alone won't close. The realistic path is targeting keywords with difficulty scores well below what an established app in the category could accept, often below 40.",
      "This isn't a permanent constraint. As the app accumulates installs, ratings, and retention data from those winnable early keywords, its overall ranking weight increases, which gradually makes higher-difficulty terms more reachable — the same dynamic described in app tenure as a ranking signal.",
      "A practical cold-start approach: build a keyword list weighted toward niche and long-tail terms with acceptable popularity and low difficulty, ignore the broad category terms for the first few months, and re-score the full candidate list periodically as the app's own authority grows.",
    ],
    related: ["app-age-ranking-signal", "niche-keywords", "keyword-difficulty"],
    faq: [
      {
        q: "How low should difficulty be for a brand-new app?",
        a: "Below 40 is a reasonable starting filter for an app with under 100 ratings. As ratings and engagement accumulate, the accessible difficulty ceiling rises — many apps can reasonably target 55 to 65 once they've crossed a few thousand ratings.",
      },
      {
        q: "Should a new app avoid high-difficulty keywords in metadata entirely?",
        a: "Not entirely, if a term is core to what the app is (it may still contribute a relevance signal even without a top ranking), but it shouldn't be the primary strategy while the app has no ranking history to compete on.",
      },
    ],
  },
  {
    slug: "editorial-badge-impact",
    term: "Editorial Badge Impact ('App of the Day' and Featured Badges)",
    definition: "Editorial badges like 'App of the Day' come from Apple's curatorial process, not from ASO metadata, but the install spike they generate can indirectly affect keyword ranking through download velocity.",
    body: [
      "Badges and featured placements are awarded by Apple's editorial team based on design, timeliness, and story quality, using the same curatorial process behind Today tab features generally. No keyword field configuration earns a badge directly.",
      "Where ASO intersects with a badge is downstream: a featured app typically sees a sharp, temporary rise in installs, and that download velocity is a factor in the ranking algorithm. Some of that ranking gain can outlast the feature itself if the resulting installs engage and retain well.",
      "The dependency runs one direction. A badge can produce keyword ranking gains as a side effect; keyword optimization cannot produce a badge as a side effect of its own.",
    ],
    related: ["today-tab-featuring", "editorial-features", "download-velocity"],
    faq: [
      {
        q: "Will optimizing my keywords increase my chances of an editorial badge?",
        a: "No. Editorial selection is a separate, human-curated process based on design and story quality. Strong ASO doesn't factor into that decision, though a well-optimized listing helps convert the traffic a badge sends your way.",
      },
    ],
  },
];
