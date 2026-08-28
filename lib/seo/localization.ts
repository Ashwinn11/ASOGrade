/**
 * Language-cluster pages — one per /localization/[language] route.
 *
 * Different axis from /keyword-research/[store]: those 109 pages are one
 * country each. These are one *language* each, spanning the several
 * storefronts that share it — the thing a single-country page can't say is
 * "the same keyword set often transfers across these N markets, with these
 * specific dialect and register adjustments." `storefronts` codes must exist
 * in STORES (lib/types.ts) since each renders a live link to its
 * /keyword-research/[code] page.
 */

export interface LocalizationDetail {
  slug: string;
  language: string;
  title: string;
  metaTitle?: string;
  subtitle: string;
  description: string;
  storefronts: { code: string; name: string }[];
  breakdown: { heading: string; points: string[] }[];
  /** Dialect, register, or script-specific adjustments — the part a straight translation misses. */
  registerNotes: string[];
  faq: { q: string; a: string }[];
}

export const LOCALIZATIONS: LocalizationDetail[] = [
  {
    slug: "spanish",
    language: "Spanish",
    title: "App Store Keyword Research for Spanish-Language Markets",
    subtitle: "One language, at least eight storefronts, and real vocabulary differences between them",
    description:
      "Spanish keyword demand and difficulty across Spain, Mexico, and Latin America aren't interchangeable — score each storefront rather than translating one list eight times.",
    storefronts: [
      { code: "es", name: "Spain" },
      { code: "mx", name: "Mexico" },
      { code: "ar", name: "Argentina" },
      { code: "co", name: "Colombia" },
      { code: "cl", name: "Chile" },
      { code: "pe", name: "Peru" },
      { code: "gt", name: "Guatemala" },
      { code: "do", name: "Dominican Republic" },
    ],
    breakdown: [
      {
        heading: "Castilian Spanish and Latin American Spanish diverge in real, searchable ways",
        points: [
          "Vocabulary differs on ordinary words that show up in app names and subtitles: a phone in Spain is often 'móvil', in Mexico 'celular'. A computer app might index for 'ordenador' in Spain and 'computadora' across most of Latin America. Neither is more correct; they're what users in each market actually type.",
          "Argentina's voseo (using 'vos' rather than 'tú') affects imperative phrasing in subtitles and promotional text more than it affects single-word keywords, but it's a real register mismatch if you write instructional copy directly from a Spain-focused translation.",
          "The eight storefronts above don't move in lockstep on difficulty. A term entrenched by established apps in Spain and Mexico is routinely open in Peru, Chile, or Guatemala, where fewer apps have optimized for the same vocabulary yet.",
        ],
      },
      {
        heading: "A workable Spanish-market research order",
        points: [
          "Score your core candidate list against Spain and Mexico first — the two largest Spanish-language storefronts by app competition — to establish a baseline vocabulary and difficulty range.",
          "Re-score the same concepts, not the same words, against Argentina, Colombia, Chile, and Peru. Where local vocabulary differs, add the local term as its own candidate rather than assuming the Spain/Mexico word carries over.",
          "Treat the smaller Central American and Caribbean storefronts (Guatemala, Dominican Republic, and similar) as low-difficulty opportunities once the vocabulary is confirmed relevant — competition there is often a fraction of Spain's for an identical concept.",
        ],
      },
    ],
    registerNotes: [
      "'Móvil' (Spain) vs. 'celular' (most of Latin America) for phone-related apps.",
      "'Ordenador' (Spain) vs. 'computadora' (Latin America) for desktop/computer-related terms.",
      "Voseo conjugation in Argentina and parts of Central America changes verb forms in instructional copy, not single keywords.",
      "Formal usted-based phrasing reads as more natural in professional/business-tool subtitles across most Latin American markets than the informal tú forms common in Spain.",
    ],
    faq: [
      {
        q: "Should I use one Spanish keyword list for every storefront, or a different one per country?",
        a: "Start from one candidate list of concepts, then score the actual local words for each storefront separately. Spain and Mexico often share vocabulary; Argentina, Chile, and Colombia frequently don't. Scoring the wrong local word returns a difficulty number for a term nobody there searches.",
      },
      {
        q: "Is Spain or Mexico a better first storefront for Spanish-language ASO?",
        a: "Mexico has the larger population and a growing app market; Spain has more mature, entrenched competition in most categories. Score both — the better starting point depends on which vocabulary your app's category actually uses in each.",
      },
    ],
  },
  {
    slug: "french",
    language: "French",
    title: "App Store Keyword Research for French-Language Markets",
    subtitle: "France, Belgium, Switzerland, and Quebec don't share one keyword list",
    description:
      "French demand and difficulty scored separately across France, Belgium, Switzerland, and Quebec-facing Canada — with the vocabulary and formality differences a single translation misses.",
    storefronts: [
      { code: "fr", name: "France" },
      { code: "be", name: "Belgium" },
      { code: "ch", name: "Switzerland" },
      { code: "ca", name: "Canada" },
    ],
    breakdown: [
      {
        heading: "France is the anchor market, but not the only one worth scoring",
        points: [
          "France carries most of the search volume and most of the competition for French-language terms. It's the right storefront to establish your baseline candidate list and vocabulary.",
          "Belgium and Switzerland largely share France's vocabulary and formality conventions, with occasional regionalisms (Belgian French uses 'septante'/'nonante' for seventy/ninety, for instance, rarely relevant to app keywords but a sign the market isn't a carbon copy).",
          "Canada's App Store storefront is English-dominant overall, but Quebec's French-speaking population represents a distinct secondary audience — worth a French subtitle and a scored French keyword set even though the storefront's primary language setting is English.",
        ],
      },
      {
        heading: "What actually differs from a straight France-to-everywhere translation",
        points: [
          "Formality defaults toward the formal 'vous' register in professional and utility app copy across all four markets — French app users don't expect the casual 'tu' tone that's common in English-language app marketing.",
          "Quebec French has some vocabulary divergence from France French on everyday tech terms (an email is 'courriel' in Quebec more often than in France), which matters for keyword field candidates, not just descriptive copy.",
          "Difficulty in Belgium and Switzerland is frequently lower than France for identical terms, since fewer apps have built out dedicated French metadata specifically for those smaller storefronts.",
        ],
      },
    ],
    registerNotes: [
      "Default to formal 'vous' phrasing in subtitles and promotional text across all French-speaking storefronts.",
      "'Courriel' appears more often than 'email' in Quebec French tech contexts; France skews toward 'email' or 'mail' in casual use despite 'courriel' being the official term.",
      "Belgian and Swiss French share France's core vocabulary closely enough that most keyword candidates transfer directly.",
    ],
    faq: [
      {
        q: "Is it worth localizing into French for the Canadian App Store storefront?",
        a: "Canada's storefront defaults to English, but a French subtitle and a scored French keyword set can capture Quebec's French-speaking user base, which a purely English listing misses entirely. Score it as its own candidate set rather than assuming France's French list applies unchanged.",
      },
      {
        q: "Do Belgium and Switzerland need separate French keyword research from France?",
        a: "The vocabulary mostly transfers, but difficulty doesn't — both markets tend to have lower competition than France for the same terms, which is worth checking rather than assuming based on France's numbers alone.",
      },
    ],
  },
  {
    slug: "german",
    language: "German",
    title: "App Store Keyword Research for German-Language Markets",
    subtitle: "Germany, Austria, and Switzerland share a language and not much else on difficulty",
    description:
      "German keyword demand across Germany, Austria, and Switzerland, and why difficulty in the smaller two storefronts is routinely lower than Germany's for the identical term.",
    storefronts: [
      { code: "de", name: "Germany" },
      { code: "at", name: "Austria" },
      { code: "ch", name: "Switzerland" },
    ],
    breakdown: [
      {
        heading: "Germany sets the baseline, Austria and Switzerland trail on competition",
        points: [
          "Germany is one of Europe's largest App Store markets by both search volume and competitive density. Most German-language ASO effort concentrates there, which is exactly why Austria and Switzerland are worth checking separately.",
          "Vocabulary transfers almost completely between the three storefronts — standard German ('Hochdeutsch') is what App Store users in all three type into search, regardless of regional dialects spoken aloud.",
          "Compound-noun formation in German means a single search concept often has two or three valid keyword forms (combined vs. hyphenated vs. separate words). Testing more than one form as a candidate is worth the extra scoring pass.",
        ],
      },
      {
        heading: "Where the difficulty gap actually shows up",
        points: [
          "A term with high difficulty in Germany, held by apps with large German user bases, is frequently far more accessible in Austria and Switzerland, where fewer competitors have built out dedicated regional presence despite the shared language.",
          "Swiss German speakers write standard German in App Store search (the spoken Swiss German dialect isn't typically written), so no separate script or vocabulary adjustment is needed beyond the standard German list.",
          "Austria's vocabulary has minor regionalisms (some food and administrative terms differ from Germany), rarely relevant to app-category keywords but worth a manual relevance check on category-specific terms.",
        ],
      },
    ],
    registerNotes: [
      "Standard High German transfers across all three storefronts; no dialect-specific spelling is needed for search.",
      "Compound nouns often have multiple valid keyword forms worth testing separately (e.g. joined vs. hyphenated compounds).",
      "Formal address ('Sie') is the default expectation in German app store copy, similar to French 'vous'.",
    ],
    faq: [
      {
        q: "Do Austria and Switzerland need their own German translation, or does Germany's work?",
        a: "The vocabulary transfers directly in almost every case — standard German is standard German. What changes is difficulty, which is worth scoring separately rather than assumed to match Germany's.",
      },
      {
        q: "Should I bother with German compound-word keyword variants?",
        a: "Yes, when the concept is commonly written more than one way. Scoring both a joined compound and its hyphenated or separated form as distinct candidates sometimes reveals one has meaningfully different demand or difficulty from the other.",
      },
    ],
  },
  {
    slug: "portuguese",
    language: "Portuguese",
    title: "App Store Keyword Research for Portuguese-Language Markets",
    subtitle: "Brazilian and European Portuguese are close in writing, far apart in usage",
    description:
      "Brazil and Portugal share a written language with real vocabulary and spelling differences — scored separately, not treated as one Portuguese keyword list.",
    storefronts: [
      { code: "br", name: "Brazil" },
      { code: "pt", name: "Portugal" },
    ],
    breakdown: [
      {
        heading: "Brazil is the volume market; Portugal is a different dialect, not a smaller Brazil",
        points: [
          "Brazil is one of the largest App Store markets in the world by download volume, and Brazilian Portuguese carries the overwhelming majority of Portuguese-language search demand across the two storefronts.",
          "Portugal's European Portuguese differs from Brazilian Portuguese in vocabulary (a bus is 'ônibus' in Brazil, 'autocarro' in Portugal), spelling conventions, and everyday phrasing — closer to how British and American English diverge than a typical dialect pair.",
          "Treating Portugal as a smaller version of the Brazilian market and reusing Brazilian vocabulary produces keywords that read as foreign to Portuguese users, even though both markets are nominally 'Portuguese'.",
        ],
      },
      {
        heading: "Practical research order for both markets",
        points: [
          "Score your core concepts against Brazil first, since it carries the larger search volume and the more competitive keyword landscape for most app categories.",
          "Rebuild the candidate list for Portugal using European Portuguese vocabulary rather than translating the Brazilian list directly — the two often need genuinely different words for the same concept, not just a spelling adjustment.",
          "Expect lower difficulty in Portugal for most terms simply due to a smaller, less saturated app market, independent of the vocabulary difference.",
        ],
      },
    ],
    registerNotes: [
      "'Ônibus' (Brazil) vs. 'autocarro' (Portugal) for bus/transit-related apps — an example of vocabulary, not just spelling, diverging.",
      "European Portuguese spelling follows the post-1990 Portuguese Language Orthographic Agreement conventions differently than Brazilian usage in some word forms.",
      "Brazilian Portuguese app copy tends toward a warmer, more conversational tone than the more formal register common in Portugal.",
    ],
    faq: [
      {
        q: "Can I use the same Portuguese keyword list for Brazil and Portugal?",
        a: "Not reliably. The two dialects diverge on everyday vocabulary the way British and American English do, sometimes more. Score each storefront's actual local terms rather than assuming a translated Brazilian list works in Portugal or vice versa.",
      },
      {
        q: "Which storefront should get priority for a new Portuguese localization?",
        a: "Brazil, in almost every case — it carries far more App Store search volume and download activity than Portugal. Portugal is worth a separate, smaller pass once Brazil's keyword set is established.",
      },
    ],
  },
  {
    slug: "japanese",
    language: "Japanese",
    title: "App Store Keyword Research for the Japanese Market",
    subtitle: "A single large storefront with its own script mix and its own metadata conventions",
    description:
      "Japanese App Store keyword research: script mixing across kanji, hiragana, and katakana, and why Japanese product pages read differently from English ones by design.",
    storefronts: [{ code: "jp", name: "Japan" }],
    breakdown: [
      {
        heading: "One storefront, but not one script",
        points: [
          "Japanese text mixes three scripts in ordinary use: kanji (adopted Chinese characters, dense with meaning), hiragana (a phonetic syllabary for native grammar), and katakana (a second phonetic syllabary, used heavily for loanwords and brand names). Users search across all three depending on the concept and how familiar it is.",
          "A single concept sometimes has valid keyword candidates in more than one script — a loanword-derived term is often searched in katakana even when a native kanji equivalent exists. Testing both forms as separate candidates, rather than picking one, is standard practice for Japanese ASO.",
          "Romanized Japanese (writing Japanese words in Latin letters) also appears in search behavior for some app categories, particularly among younger or more casual users, and is worth including as a lower-priority candidate.",
        ],
      },
      {
        heading: "Japanese App Store copy conventions differ from English defaults",
        points: [
          "Japanese app descriptions and product pages tend toward more detailed, feature-by-feature copy than the concise, benefit-led style common in US listings. This is a cultural convention, not a translation quirk, and applies to promotional text and description even though neither is indexed for search.",
          "Politeness register matters in visible copy (subtitle, description) more than in raw keyword-field terms — formal, polite Japanese ('teineigo') is the safe default for a professional or utility app aimed at a general audience.",
          "Character count behaves differently with Japanese text: the same 30-character subtitle limit holds far more semantic content in Japanese than in English, since single characters often carry more meaning than single Latin letters.",
        ],
      },
    ],
    registerNotes: [
      "Test both kanji and katakana forms of a concept as separate keyword candidates where a loanword equivalent exists.",
      "Default to polite, formal register (teineigo) in visible subtitle and description copy.",
      "The 30-character subtitle limit holds proportionally more information in Japanese than in English — don't assume a direct English word-count translation fills the same space efficiently.",
    ],
    faq: [
      {
        q: "Should I target kanji or katakana keywords for a loanword-based app category?",
        a: "Score both. Categories with English-derived names (fitness, delivery, and similar borrowed-word categories) often see meaningful search volume in katakana even when a native kanji term exists, and the two forms can have different difficulty.",
      },
      {
        q: "Does romanized Japanese (using Latin letters) matter for keyword research?",
        a: "It carries real but generally smaller search volume than native-script terms. Worth including as a secondary candidate, particularly for apps aimed at younger or tech-forward users, but not a substitute for scoring the native-script terms first.",
      },
    ],
  },
  {
    slug: "korean",
    language: "Korean",
    title: "App Store Keyword Research for the Korean Market",
    subtitle: "Hangul search behavior and a market that rewards fast metadata iteration",
    description:
      "Korean App Store keyword research: Hangul-script search patterns, English loanword usage, and a competitive market that moves quickly on metadata.",
    storefronts: [{ code: "kr", name: "South Korea" }],
    breakdown: [
      {
        heading: "Hangul is the default, English loanwords are common inside it",
        points: [
          "Korean is written in Hangul, a phonetic alphabet distinct from Chinese characters or Japanese kana. Nearly all App Store search happens in native Hangul rather than romanized Korean.",
          "English loanwords transliterated into Hangul are extremely common in Korean tech and app vocabulary — a term borrowed from English often has both a native Korean equivalent and a Hangul-transliterated English form in active use, sometimes with different search volume for each.",
          "South Korea has one of the highest smartphone penetration rates globally and a correspondingly competitive App Store market across most mainstream categories, which tends to push difficulty higher for broad, high-popularity terms.",
        ],
      },
      {
        heading: "What moves the needle in a fast-moving market",
        points: [
          "Korean users are comparatively quick to adopt new apps and abandon underperforming ones, which means keyword and ranking positions can shift faster than in more stable Western markets — a difficulty score from several weeks ago is worth re-checking before a metadata decision.",
          "Both the native-Korean and the loanword-transliteration form of a keyword deserve separate scoring, since Apple's search indexing treats them as distinct strings even when they mean the same thing to a Korean speaker.",
          "As with Japanese, a formal, polite register is the safer default for subtitle and description copy aimed at a general audience, though Korean youth-oriented app categories sometimes use more casual phrasing deliberately.",
        ],
      },
    ],
    registerNotes: [
      "Score both the native-Korean term and its Hangul-transliterated English-loanword equivalent as separate keyword candidates.",
      "Formal, polite register is the safer default for general-audience subtitle and description copy.",
      "Re-check difficulty scores more frequently than in slower-moving markets — competitive positions shift faster here.",
    ],
    faq: [
      {
        q: "Do I need both a Korean-native and an English-loanword keyword for the same concept?",
        a: "Often, yes. Apple indexes them as different strings, and the two forms can carry meaningfully different search demand even when a Korean speaker treats them as interchangeable in conversation.",
      },
      {
        q: "How often should I re-check Korean keyword difficulty compared to other markets?",
        a: "More often than a typically slower-moving Western storefront. Fast adoption and abandonment cycles in the Korean market mean a ranking landscape from a month ago is a weaker guide here than it would be in a more stable market.",
      },
    ],
  },
  {
    slug: "chinese",
    language: "Chinese",
    title: "App Store Keyword Research for Chinese-Language Markets",
    subtitle: "Simplified and Traditional Chinese are different keyword sets in different storefronts",
    description:
      "Simplified Chinese in mainland China versus Traditional Chinese in Hong Kong, Taiwan, and Macau — genuinely different character sets, not a font toggle.",
    storefronts: [
      { code: "cn", name: "China" },
      { code: "tw", name: "Taiwan" },
      { code: "hk", name: "Hong Kong" },
      { code: "mo", name: "Macau" },
    ],
    breakdown: [
      {
        heading: "Simplified and Traditional aren't the same list rendered differently",
        points: [
          "Mainland China's App Store uses Simplified Chinese characters, standardized in the mid-20th century. Taiwan, Hong Kong, and Macau use Traditional Chinese, the older character forms. Many characters differ enough between the two systems that a keyword written in one script is effectively unsearchable, or reads as wrong, in the other.",
          "Vocabulary itself also diverges beyond the character set — mainland China, Taiwan, and Hong Kong have each developed distinct tech and app terminology over decades of separate usage, on top of the script difference.",
          "Hong Kong adds a further layer: Cantonese is the dominant spoken language, and some app copy incorporates Cantonese-specific written forms distinct from the Mandarin-based Traditional Chinese used more often in Taiwan.",
        ],
      },
      {
        heading: "Treat this as (at least) two separate research passes",
        points: [
          "Score a Simplified Chinese keyword list against the China storefront as its own project, using mainland tech vocabulary rather than a Traditional-script list run through a character converter.",
          "Score a separate Traditional Chinese list against Taiwan, and check Hong Kong and Macau independently rather than assuming Taiwan's list transfers directly — Hong Kong's Cantonese influence and its distinct app market history mean real vocabulary and difficulty differences remain even within Traditional Chinese.",
          "China's App Store operates under additional regulatory and app-review considerations beyond keyword research (data handling and content rules in particular) that are outside the scope of a keyword tool and worth confirming separately before targeting that storefront seriously.",
        ],
      },
    ],
    registerNotes: [
      "A character converter (Simplified-to-Traditional or vice versa) produces readable text but not necessarily the vocabulary locals actually search — it converts script, not usage.",
      "Hong Kong's Cantonese influence means some written vocabulary differs from Taiwan's Mandarin-based Traditional Chinese, even though both use Traditional characters.",
      "China's app market and regulatory environment carry considerations beyond metadata and keywords, worth researching separately before a serious localization push.",
    ],
    faq: [
      {
        q: "Can I convert a Simplified Chinese keyword list to Traditional Chinese and use it for Taiwan?",
        a: "Character conversion changes the script but not necessarily the vocabulary. Mainland and Taiwanese tech terminology has diverged enough after decades of separate use that some converted terms read as foreign or dated to Taiwanese users. Score the actual local terms separately.",
      },
      {
        q: "Is Hong Kong's keyword list the same as Taiwan's since both use Traditional Chinese?",
        a: "Mostly overlapping but not identical. Hong Kong's Cantonese linguistic influence introduces vocabulary and phrasing differences from Taiwan's Mandarin-based Traditional Chinese, so checking both storefronts separately is worth the extra pass.",
      },
    ],
  },
  {
    slug: "arabic",
    language: "Arabic",
    title: "App Store Keyword Research for Arabic-Language Markets",
    subtitle: "Right-to-left text, Modern Standard Arabic, and real dialect variation across eight storefronts",
    description:
      "Arabic keyword research across Saudi Arabia, the UAE, Egypt, and the wider Gulf and Levant storefronts, plus what right-to-left layout means for screenshots and metadata.",
    storefronts: [
      { code: "sa", name: "Saudi Arabia" },
      { code: "ae", name: "United Arab Emirates" },
      { code: "eg", name: "Egypt" },
      { code: "jo", name: "Jordan" },
      { code: "kw", name: "Kuwait" },
      { code: "qa", name: "Qatar" },
      { code: "bh", name: "Bahrain" },
      { code: "om", name: "Oman" },
    ],
    breakdown: [
      {
        heading: "Modern Standard Arabic covers metadata; dialect shapes how people actually search",
        points: [
          "Written app metadata across Arabic-speaking storefronts generally uses Modern Standard Arabic (MSA), the formal register understood across the Arab world regardless of local spoken dialect. Most keyword-field candidates should start from MSA vocabulary.",
          "Spoken dialects differ substantially between the Gulf (Saudi Arabia, UAE, Kuwait, Qatar, Bahrain, Oman), the Levant (Jordan), and North Africa (Egypt), and some of that variation does surface in search behavior for colloquial or brand-adjacent terms, even when formal app copy stays in MSA.",
          "Egypt has the largest population among these storefronts and often the highest search volume for a given app category, making it a reasonable first storefront to establish a baseline, with the Gulf storefronts checked separately for both vocabulary fit and difficulty.",
        ],
      },
      {
        heading: "Right-to-left changes more than the text direction",
        points: [
          "Arabic renders right-to-left, and Apple's App Store interface mirrors accordingly for RTL locales. Screenshots that include UI chrome, buttons, or directional arrows need RTL-aware versions, not a straight re-skin of the English screenshots with translated captions.",
          "Since June 2025, Apple has OCR-indexed screenshot caption text as a ranking signal — for an RTL locale, that means the captions need to be correctly rendered RTL Arabic text, not an English caption translated but rendered left-to-right, or the indexing signal is weaker than intended.",
          "Numerals in Arabic-locale App Store copy are commonly written using Western Arabic numerals (0-9) rather than Eastern Arabic-Indic digits in most app-marketing contexts, though this varies somewhat by storefront and audience — worth a quick manual check against comparable apps already live in the target storefront.",
        ],
      },
    ],
    registerNotes: [
      "Start keyword candidates from Modern Standard Arabic; treat dialect-specific colloquial terms as secondary candidates worth testing, not the default.",
      "RTL layout affects screenshots and any caption text (now an indexed ranking signal), not just body copy direction.",
      "Egypt typically carries the largest search volume among these storefronts for a given app category; the Gulf storefronts are worth checking independently for both vocabulary and difficulty.",
    ],
    faq: [
      {
        q: "Is one Arabic keyword list enough for all eight storefronts?",
        a: "Modern Standard Arabic vocabulary transfers reasonably well across all eight as a starting point, but difficulty varies significantly by storefront, and some categories see real value from dialect-specific secondary keywords, particularly in Egypt and the Gulf states.",
      },
      {
        q: "Do RTL screenshots actually affect App Store ranking now?",
        a: "Screenshot caption text has been OCR-indexed as a ranking signal since June 2025, so an RTL locale with correctly rendered Arabic captions has a real, if modest, indexing advantage over a mirrored English screenshot with no localized caption at all.",
      },
    ],
  },
  {
    slug: "italian",
    language: "Italian",
    title: "App Store Keyword Research for the Italian Market",
    subtitle: "A single storefront with its own vocabulary conventions and moderate competition",
    description:
      "Italian App Store keyword research: what carries over from English-language ASO practice and what doesn't, for a market with less saturated competition than France or Germany.",
    storefronts: [{ code: "it", name: "Italy" }],
    breakdown: [
      {
        heading: "A single-storefront language, which simplifies the research scope",
        points: [
          "Unlike Spanish, French, or Arabic, Italian keyword research covers one primary storefront rather than a cluster, which removes the cross-market vocabulary problem those languages have. The tradeoff is that there's no lower-difficulty secondary storefront to fall back to if Italy itself is too competitive for a term.",
          "Italian app-store competition is generally less saturated than Germany's or France's for equivalent English-market categories, which tends to translate into more accessible difficulty scores for a well-chosen Italian keyword set.",
          "As with other Romance languages, English loanwords appear frequently in Italian tech vocabulary (particularly for software and internet-native concepts), often searched in their English form rather than translated.",
        ],
      },
      {
        heading: "Practical notes for Italian metadata",
        points: [
          "Test both the Italian-native term and its common English-loanword equivalent as separate keyword candidates for tech-forward categories, since Italian users frequently search using the English term directly rather than a translated one.",
          "Formal address conventions ('Lei') are the safer default for general-audience professional or utility app copy, similar to the formality defaults in French and German markets.",
          "Because Italy is a single storefront without a secondary market to compare against, validate difficulty carefully before committing character-field space — there's no fallback market if the first choice turns out too competitive.",
        ],
      },
    ],
    registerNotes: [
      "English loanwords are common in Italian tech vocabulary and often searched directly rather than translated.",
      "Formal address ('Lei') is the safer default register for general-audience app copy.",
      "No secondary Italian-language storefront exists to fall back to if a term proves too competitive in Italy.",
    ],
    faq: [
      {
        q: "Should Italian keywords use the Italian word or the English loanword for tech concepts?",
        a: "Score both. Italian tech vocabulary borrows English terms frequently, and users sometimes search the English form directly even in an otherwise Italian-language query, particularly for newer software concepts without an established Italian equivalent.",
      },
      {
        q: "Is Italy generally easier to rank in than Germany or France?",
        a: "Often, yes, for comparable app categories — Italy's App Store competition tends to run less saturated than the larger Western European storefronts, though this varies by category and should be confirmed with real difficulty scores rather than assumed.",
      },
    ],
  },
  {
    slug: "russian",
    language: "Russian",
    title: "App Store Keyword Research for Russian-Language Markets",
    subtitle: "Cyrillic script search, and secondary Russian-speaking audiences beyond Russia itself",
    description:
      "Russian keyword research for the Russia storefront, plus Cyrillic-script considerations relevant to secondary Russian-speaking markets like Kazakhstan and Ukraine.",
    storefronts: [{ code: "ru", name: "Russia" }],
    breakdown: [
      {
        heading: "Cyrillic script is the default, not a niche adjustment",
        points: [
          "Russian is written in the Cyrillic alphabet, a completely different character set from Latin-script languages. Keyword candidates need to be researched and entered in native Cyrillic — a romanized or transliterated Russian term (writing Russian sounds in Latin letters) sees minimal real search volume compared to the Cyrillic original.",
          "As with other major languages, English-derived tech vocabulary is common in Russian, frequently transliterated into Cyrillic letters rather than translated conceptually — testing both the transliterated-loanword form and a native Russian equivalent as separate candidates is standard practice.",
          "The Russia storefront is the primary Russian-language market by search volume, but Russian-speaking audiences exist in several neighboring countries' storefronts (Kazakhstan and others) where Russian functions as a widely-used secondary language alongside the local one.",
        ],
      },
      {
        heading: "What to check before committing metadata space",
        points: [
          "Confirm keyword candidates are entered correctly in Cyrillic before scoring — a transliteration typo (a Latin-letter approximation instead of actual Cyrillic characters) returns a meaningless score, since it isn't a term Apple's search actually indexes against real Russian queries.",
          "Grammatical case matters more in Russian than in English for how a keyword phrase reads naturally, though single-word keyword-field candidates are less affected than multi-word subtitle or promotional phrasing.",
          "Where an app already has traction in a Russian-speaking secondary market, check whether that storefront's own local language keyword set outperforms a Russian-language listing, since Russian functions as a secondary rather than default language there.",
        ],
      },
    ],
    registerNotes: [
      "Enter and score keyword candidates in native Cyrillic script; transliterated Latin-letter approximations don't reflect real search behavior.",
      "Test both a Cyrillic-transliterated English loanword and a native Russian equivalent for tech-forward concepts.",
      "Grammatical case affects multi-word subtitle and promotional phrasing more than single keyword-field terms.",
    ],
    faq: [
      {
        q: "Does romanized Russian (Latin letters) have any search value on the App Store?",
        a: "Very little compared to native Cyrillic. Russian-speaking users search in Cyrillic script by default, and a Latin-letter transliteration of a Russian word isn't the term Apple's search index actually matches against real queries.",
      },
      {
        q: "Should I target Russian keywords in storefronts other than Russia itself?",
        a: "Only where Russian functions as a genuine secondary search language for that storefront's users, and even then it's worth checking whether the storefront's own primary local language outperforms a Russian-language listing before committing character-field space to it.",
      },
    ],
  },
  {
    slug: "turkish",
    language: "Turkish",
    title: "App Store Keyword Research for the Turkish Market",
    subtitle: "A large, fast-growing single storefront with distinct vowel-harmony spelling patterns",
    description:
      "Turkish App Store keyword research: a sizeable single-language market, plus the vowel-harmony and suffix patterns that affect how keyword variants get typed.",
    storefronts: [{ code: "tr", name: "Turkey" }],
    breakdown: [
      {
        heading: "One storefront, real search volume, and its own spelling patterns",
        points: [
          "Turkey has one of the larger App Store markets outside the top Western European and East Asian storefronts, with substantial mobile-first usage that drives real search volume across most mainstream app categories.",
          "Turkish uses vowel harmony, a grammatical feature where suffixes change form based on the vowels in the word they attach to. This means the same root concept can appear with several valid suffixed spellings depending on grammatical context, and users may search more than one form.",
          "Turkish also uses several Latin-alphabet characters not found in standard English typing (ı, ğ, ş, ç, ö, ü) — keyword candidates should use correct Turkish spelling with these characters rather than an ASCII-only approximation, since the two aren't always treated as equivalent by search.",
        ],
      },
      {
        heading: "Research notes specific to Turkish",
        points: [
          "Test both the correctly-spelled Turkish term (with dotted/dotless I distinctions and other Turkish-specific characters) and, where relevant, a common ASCII-simplified spelling some users type out of habit or keyboard limitation.",
          "English loanwords appear in Turkish tech vocabulary, often adapted with Turkish suffix patterns rather than used in unmodified English form, which affects how a loanword-based keyword should actually be spelled.",
          "As a large single-language storefront without a lower-difficulty secondary market, validate difficulty carefully — there's no fallback country to shift budget to if Turkey itself proves too competitive for a given term.",
        ],
      },
    ],
    registerNotes: [
      "Use correct Turkish-specific characters (ı, ğ, ş, ç, ö, ü) in keyword candidates rather than ASCII approximations.",
      "Vowel harmony means suffixed forms of the same root can vary in spelling depending on grammatical context — test more than one form where relevant.",
      "English loanwords are typically adapted with Turkish suffix patterns rather than kept in unmodified English form.",
    ],
    faq: [
      {
        q: "Do Turkish-specific characters like ı, ş, and ğ actually matter for keyword scoring?",
        a: "Yes. Correctly spelled Turkish terms with their proper characters and an ASCII-simplified approximation aren't always treated as equivalent by search, so both are worth checking rather than assuming one covers the other.",
      },
      {
        q: "Is there a secondary Turkish-language storefront to target if Turkey is too competitive?",
        a: "No — Turkey is effectively the single Turkish-language storefront. Validate difficulty carefully before committing to a term, since there's no lower-competition fallback market the way Spanish or Arabic localization has.",
      },
    ],
  },
  {
    slug: "dutch",
    language: "Dutch",
    title: "App Store Keyword Research for Dutch-Language Markets",
    subtitle: "The Netherlands and Flemish Belgium, with high English fluency complicating the keyword mix",
    description:
      "Dutch keyword research for the Netherlands and Flemish-speaking Belgium, and why English-language keywords sometimes outperform Dutch ones in these markets.",
    storefronts: [
      { code: "nl", name: "Netherlands" },
      { code: "be", name: "Belgium" },
    ],
    breakdown: [
      {
        heading: "Two storefronts, one language, and unusually high bilingual search behavior",
        points: [
          "The Netherlands is the primary Dutch-language storefront. Belgium is linguistically split between Flemish Dutch (Flanders) and French (Wallonia) — Flemish Dutch is close enough to Netherlands Dutch that vocabulary transfers with minor regional differences, similar to the relationship between American and British English.",
          "Both markets have unusually high English proficiency by global standards, which means a meaningful share of app-category search happens in English even among native Dutch speakers, particularly for tech, productivity, and business-tool categories.",
          "This makes Dutch-market keyword research genuinely bilingual in practice: scoring both the Dutch term and its English equivalent for the same concept, rather than assuming a Dutch-only or English-only list captures the full demand.",
        ],
      },
      {
        heading: "Deciding between Dutch and English keyword candidates",
        points: [
          "For consumer-facing categories with everyday vocabulary (health, lifestyle, finance), the native Dutch term usually carries more search volume and is worth prioritizing in the keyword field.",
          "For technical, business, or niche software categories, English terms frequently perform as well as or better than a Dutch translation, since much of the professional vocabulary in these fields is used in English by Dutch and Flemish speakers day to day.",
          "Score both forms for any ambiguous category rather than guessing which language a term's real audience prefers to type.",
        ],
      },
    ],
    registerNotes: [
      "Flemish Dutch (Belgium) is close to Netherlands Dutch, with minor regional vocabulary differences comparable to American/British English.",
      "Both markets have high English proficiency, so English-language keywords are viable candidates alongside Dutch ones, especially for technical or professional categories.",
      "Belgium's French-speaking Wallonia region is covered separately by the French-language cluster, not this one.",
    ],
    faq: [
      {
        q: "Should I use Dutch or English keywords for the Netherlands storefront?",
        a: "Score both. Consumer categories tend to favor native Dutch terms; technical and professional categories often see English terms perform comparably or better, given high English fluency in the market.",
      },
      {
        q: "Does Belgium need separate Dutch keyword research from the Netherlands?",
        a: "Flemish Dutch is close enough to Netherlands Dutch that most vocabulary transfers directly, though difficulty is worth checking separately since Belgium is a smaller, often less saturated storefront for the same term.",
      },
    ],
  },
  {
    slug: "indonesian-and-malay",
    language: "Indonesian & Malay",
    title: "App Store Keyword Research for Indonesian and Malay Markets",
    subtitle: "Two closely related languages, two large Southeast Asian storefronts, real vocabulary drift between them",
    description:
      "Indonesian (Bahasa Indonesia) and Malay (Bahasa Malaysia) keyword research across two of Southeast Asia's largest App Store markets, and where the shared linguistic root stops helping.",
    storefronts: [
      { code: "id", name: "Indonesia" },
      { code: "my", name: "Malaysia" },
    ],
    breakdown: [
      {
        heading: "Closely related languages, genuinely separate markets",
        points: [
          "Indonesian (Bahasa Indonesia) and Malay (Bahasa Malaysia) share a common linguistic root and enough mutual intelligibility that a Malay speaker can often follow written Indonesian, and vice versa, at a basic level. This mutual intelligibility does not mean one keyword list works for both storefronts.",
          "Indonesia is one of the largest App Store markets in Southeast Asia by population and mobile usage, with a correspondingly deep and often quite competitive app landscape in mainstream categories.",
          "Malaysia is smaller by population but linguistically more complex in practice — Malay, English, Chinese (Mandarin and various dialects), and Tamil all see meaningful everyday use, and app search behavior reflects that mix rather than staying purely in Malay.",
        ],
      },
      {
        heading: "What to score separately for each market",
        points: [
          "Build the Indonesian keyword list from Bahasa Indonesia vocabulary and idiom, checked against real Indonesian App Store search behavior rather than assumed from Malay.",
          "For Malaysia, score Malay, English, and where relevant to the app's likely audience, Mandarin Chinese candidates as separate lists — a single-language approach misses a meaningful share of Malaysia's actual multilingual search behavior.",
          "Where the two languages do share a cognate word for a concept, verify the spelling and usage still match current local usage in each market rather than assuming identical treatment — decades of separate development have introduced real drift even in shared vocabulary.",
        ],
      },
    ],
    registerNotes: [
      "Mutual intelligibility between Indonesian and Malay does not mean shared keyword performance — score each market's actual vocabulary and difficulty separately.",
      "Malaysia's app search behavior spans Malay, English, and Chinese; a Malay-only keyword list misses real demand in the other two.",
      "Indonesia's App Store market is large and often competitive in mainstream categories — treat it as a serious research pass, not an afterthought to Malaysia.",
    ],
    faq: [
      {
        q: "Can I use the same keyword list for Indonesia and Malaysia since the languages are related?",
        a: "Not reliably. The languages are close enough for basic mutual understanding, but decades of separate development mean real vocabulary drift exists, and difficulty in the two markets rarely matches for the same term regardless of language.",
      },
      {
        q: "Should Malaysian keyword research include English and Chinese terms alongside Malay?",
        a: "Yes, for most app categories. Malaysia's everyday search behavior spans multiple languages, and a Malay-only keyword set captures only part of the real demand for a given concept.",
      },
    ],
  },
  {
    slug: "hindi-and-indian-english",
    language: "Hindi & Indian English",
    title: "App Store Keyword Research for the Indian Market",
    subtitle: "One storefront, two languages in active use, and a fast-growing app market",
    description:
      "Indian App Store keyword research: why English carries most tech-category search volume, where Hindi and code-switched terms add real demand, and what that split means for metadata.",
    storefronts: [{ code: "in", name: "India" }],
    breakdown: [
      {
        heading: "English dominates App Store search, but not completely",
        points: [
          "India's App Store search skews heavily English for most mainstream categories, especially technology, productivity, business, and finance apps, reflecting the language most urban smartphone users default to for app discovery.",
          "Hindi and code-switched terms (Hindi words written in Latin script, mixed with English, sometimes called Hinglish) carry real, separate search volume in categories closer to everyday life: entertainment, some shopping and lifestyle apps, and religious or cultural-content apps in particular.",
          "India's App Store market has grown quickly and is not lightly contested in popular categories, despite the country's average App Store revenue per user being lower than Western markets — competition for popular English-language terms can still run high.",
        ],
      },
      {
        heading: "Deciding when Hindi or Hinglish terms are worth the metadata space",
        points: [
          "Default to English for the primary keyword set in most professional and utility categories, since that's where the bulk of India's App Store search volume for those categories actually sits.",
          "Score Hindi and Hinglish variants as secondary candidates for categories where cultural or everyday-life relevance is high — a well-chosen Hindi or Hinglish term can carry meaningful, lower-difficulty demand that an English-only keyword set misses entirely.",
          "Avoid assuming Hindi covers the whole non-English opportunity — India has other major regional languages (Tamil, Telugu, Bengali, Marathi, and more) with their own App Store search behavior, which is a separate research question beyond Hindi and English.",
        ],
      },
    ],
    registerNotes: [
      "English carries the majority of App Store search volume in India for most professional and tech categories.",
      "Hindi and Hinglish (Hindi in Latin script, mixed with English) carry real secondary demand, concentrated in lifestyle, entertainment, and cultural-content categories.",
      "Regional languages beyond Hindi (Tamil, Telugu, Bengali, and others) represent a further, separate localization opportunity not covered by an English-plus-Hindi keyword set.",
    ],
    faq: [
      {
        q: "Should an app localize into Hindi for the Indian App Store, or is English enough?",
        a: "For most professional and utility categories, English alone captures the majority of search demand. For lifestyle, entertainment, or culturally-specific categories, scoring Hindi and Hinglish terms as a secondary pass often surfaces real, lower-difficulty demand worth the metadata space.",
      },
      {
        q: "Is India's App Store market easy to rank in because average revenue per user is lower than the US?",
        a: "Not necessarily. Lower average revenue per user doesn't mean lower competition — popular categories in India's fast-growing app market can carry difficulty comparable to other large markets. Score the actual terms rather than assuming lower difficulty from market size alone.",
      },
    ],
  },
  {
    slug: "nordic-languages",
    language: "Nordic Languages",
    title: "App Store Keyword Research for Sweden, Norway, Denmark, and Finland",
    subtitle: "Four small storefronts, near-universal English fluency, and four separate native languages",
    description:
      "Swedish, Norwegian, Danish, and Finnish keyword research across the Nordic storefronts — where native-language terms still outperform English despite high bilingual fluency.",
    storefronts: [
      { code: "se", name: "Sweden" },
      { code: "no", name: "Norway" },
      { code: "dk", name: "Denmark" },
      { code: "fi", name: "Finland" },
    ],
    breakdown: [
      {
        heading: "High English fluency doesn't mean English keywords win by default",
        points: [
          "Sweden, Norway, Denmark, and Finland all rank among the world's highest countries for English proficiency as a second language, which sometimes leads to an assumption that English-only metadata is sufficient across the region. In practice, native-language keywords frequently still outperform English equivalents for everyday consumer categories.",
          "Swedish, Norwegian, and Danish are closely related North Germanic languages with real mutual intelligibility, which helps with translation effort but does not mean one keyword list serves all three markets — each storefront's search behavior and difficulty should be checked separately.",
          "Finnish is linguistically unrelated to the other three (it's a Finno-Ugric language, not North Germanic), sharing essentially no vocabulary overlap — Finland needs its own keyword research from scratch, not an adaptation of the Swedish, Norwegian, or Danish list.",
        ],
      },
      {
        heading: "A practical approach across four small, high-value storefronts",
        points: [
          "Score core concepts in the native language for each of the four storefronts individually, given how small the population base is per market — a term with strong demand in Sweden may have negligible standalone demand in Denmark despite the linguistic similarity.",
          "For technical or niche software categories where English performs comparably, test both the native term and the English equivalent before committing character-field space, similar to the Dutch-market pattern.",
          "These are all comparatively small storefronts by population, which tends to mean lower absolute competition and lower difficulty for a given term than a large Western European market, even before accounting for the native-language advantage.",
        ],
      },
    ],
    registerNotes: [
      "Swedish, Norwegian, and Danish share real mutual intelligibility but should still be scored as separate storefronts, not one shared list.",
      "Finnish shares no meaningful vocabulary with the other three Nordic languages and needs independent keyword research.",
      "Native-language keywords frequently outperform English ones for everyday consumer categories despite high regional English fluency.",
    ],
    faq: [
      {
        q: "Can I use one Scandinavian keyword list for Sweden, Norway, and Denmark?",
        a: "The languages are close enough to ease translation, but search behavior and difficulty still vary by storefront. Score each market separately rather than assuming shared vocabulary means shared results.",
      },
      {
        q: "Does Finnish work like the other Nordic languages for keyword research?",
        a: "No. Finnish is linguistically unrelated to Swedish, Norwegian, and Danish, with essentially no shared vocabulary. Treat Finland as an independent research project, not an extension of a Scandinavian keyword list.",
      },
    ],
  },
  {
    slug: "polish",
    language: "Polish",
    title: "App Store Keyword Research for the Polish Market",
    subtitle: "A large Central European storefront with moderate competition and its own case-driven grammar",
    description:
      "Polish App Store keyword research: a sizeable single-language market where grammatical case affects keyword phrasing more than in most European languages.",
    storefronts: [{ code: "pl", name: "Poland" }],
    breakdown: [
      {
        heading: "A substantial single storefront, less saturated than Western Europe",
        points: [
          "Poland is one of the larger Central European App Store markets by population and mobile usage, with real search volume across mainstream app categories, generally running less saturated than Germany, France, or the UK for comparable terms.",
          "Polish grammar uses seven grammatical cases, which change word endings depending on a word's role in a sentence. Single keyword-field terms are less affected than multi-word subtitle or promotional phrasing, but a phrase translated without adjusting for case can read as slightly incorrect to a native speaker.",
          "English loanwords appear in Polish tech vocabulary, particularly for newer software concepts, though somewhat less pervasively than in some Western European languages — a native Polish equivalent is more often the primary search term for most app categories.",
        ],
      },
      {
        heading: "Research notes specific to Polish",
        points: [
          "Prioritize scoring the standard dictionary (nominative case) form of a keyword for the keyword field, since that's the form most directly comparable to how popularity and difficulty tools evaluate the term.",
          "For subtitle and promotional copy, have a native speaker check case agreement rather than relying on a direct grammatical translation, since incorrect case is one of the more noticeable markers of non-native copy to a Polish reader.",
          "As a single storefront without a lower-difficulty secondary market, validate difficulty carefully before committing metadata space, the same caution that applies to Italian and Turkish.",
        ],
      },
    ],
    registerNotes: [
      "Polish's seven-case grammar affects multi-word phrasing more than single keyword-field terms.",
      "Native Polish vocabulary, not English loanwords, is more often the primary search term across most app categories.",
      "No secondary Polish-language storefront exists to fall back to if a term proves too competitive.",
    ],
    faq: [
      {
        q: "Does Polish grammatical case affect single-word App Store keywords?",
        a: "Less than it affects phrases. A single keyword-field term in its standard dictionary form is the safer default; case agreement matters more for multi-word subtitle and promotional copy, where a native speaker's review is worth the extra step.",
      },
      {
        q: "Is Poland easier to rank in than Western European markets like Germany or France?",
        a: "Often, for comparable categories — Poland's App Store competition tends to run less saturated than the largest Western European storefronts, though this should be confirmed with real difficulty scores rather than assumed by market size alone.",
      },
    ],
  },
  {
    slug: "vietnamese",
    language: "Vietnamese",
    title: "App Store Keyword Research for the Vietnamese Market",
    subtitle: "A fast-growing single storefront with tonal-diacritic spelling that search treats as meaningful",
    description:
      "Vietnamese App Store keyword research: why tonal diacritics change word meaning entirely, and what that means for keyword-field accuracy.",
    storefronts: [{ code: "vn", name: "Vietnam" }],
    breakdown: [
      {
        heading: "A growing mobile-first market with its own spelling rules",
        points: [
          "Vietnam has one of Southeast Asia's fastest-growing smartphone and app markets, with real and increasing search volume across mainstream categories, though generally less saturated competition than the largest East Asian storefronts.",
          "Vietnamese is written in the Latin alphabet but relies heavily on tonal diacritic marks (as in 'tiếng Việt') that change a word's tone and meaning, not just its pronunciation. Dropping the diacritics doesn't just look wrong, it can turn a word into a different word entirely.",
          "Both diacritic and non-diacritic (stripped) spellings see real search use in practice, since typing accented Vietnamese requires a specific keyboard input method some users skip on informal searches — testing both forms as separate keyword candidates is worth the extra scoring pass.",
        ],
      },
      {
        heading: "What to check before finalizing Vietnamese metadata",
        points: [
          "Confirm each keyword candidate's diacritics are correct for the intended meaning, ideally checked by a native speaker, before scoring — a missing or wrong diacritic mark can silently return a score for the wrong word.",
          "English loanwords are common in Vietnamese tech and app vocabulary, often used directly without translation, similar to the pattern seen in several other Asian markets covered elsewhere in this series.",
          "As a single storefront without a lower-difficulty secondary market, validate difficulty carefully — there's no fallback country to shift budget to if a term proves too competitive.",
        ],
      },
    ],
    registerNotes: [
      "Tonal diacritic marks change word meaning, not just pronunciation — verify spelling accuracy before scoring a Vietnamese keyword candidate.",
      "Both diacritic and diacritic-stripped spellings see real search use; test both as separate candidates.",
      "English loanwords are common in Vietnamese tech vocabulary and often used without translation.",
    ],
    faq: [
      {
        q: "Should I include Vietnamese keywords with and without diacritics?",
        a: "Yes, testing both is worth the extra scoring pass. Some users type without diacritics out of keyboard convenience even though the accented spelling is technically correct, and the two forms can carry different search volume.",
      },
      {
        q: "Is Vietnam a low-competition App Store market?",
        a: "Generally less saturated than the largest East Asian or Western storefronts for comparable categories, though this varies by category and should be confirmed with real difficulty scores rather than assumed from market size.",
      },
    ],
  },
  {
    slug: "thai",
    language: "Thai",
    title: "App Store Keyword Research for the Thai Market",
    subtitle: "A single storefront with its own script and no spaces between words",
    description:
      "Thai App Store keyword research: a script with no word-spacing convention, and what that means for how keyword candidates should actually be entered.",
    storefronts: [{ code: "th", name: "Thailand" }],
    breakdown: [
      {
        heading: "A distinct script with its own segmentation rules",
        points: [
          "Thai uses its own script, unrelated to Latin, Chinese, or Indic writing systems, and written Thai does not use spaces between words within a sentence the way English does — word boundaries are inferred from context, not marked visually.",
          "This matters for keyword-field entry: a multi-word Thai concept is typically written as one continuous string without separating spaces, which looks unusual to someone used to space-separated Latin-script keyword lists but is the correct, natural form.",
          "Thailand's App Store market has solid mobile-first usage and real search volume in mainstream categories, generally less saturated than the largest East Asian markets.",
        ],
      },
      {
        heading: "Practical notes for Thai keyword research",
        points: [
          "Have a native speaker or reliable translation review multi-concept Thai keyword candidates for correct word segmentation before finalizing the field — an incorrectly segmented string can read as garbled to a Thai speaker even if the individual characters are correct.",
          "English loanwords, particularly for technology and business concepts, are common in Thai and are frequently used in their transliterated form rather than translated into native vocabulary.",
          "As a single storefront, validate difficulty carefully before committing metadata space, the same caution that applies to other single-language markets in this series.",
        ],
      },
    ],
    registerNotes: [
      "Thai script doesn't use spaces between words within a phrase — verify correct word segmentation for multi-concept keyword candidates.",
      "English loanwords are common in Thai tech and business vocabulary, often used in transliterated form.",
      "No secondary Thai-language storefront exists to fall back to if a term proves too competitive.",
    ],
    faq: [
      {
        q: "Why doesn't my Thai keyword phrase have spaces between the words?",
        a: "Thai script doesn't use spaces to separate words within a phrase the way English does — a correctly written multi-word Thai keyword is a continuous string, and that's the natural, correct form rather than an error.",
      },
      {
        q: "Should I use English or Thai keywords for tech-category apps in Thailand?",
        a: "Score both. English loanwords are commonly used for technology and business concepts in Thai, sometimes performing comparably to a native Thai equivalent, so testing both is worth the extra pass.",
      },
    ],
  },
  {
    slug: "hebrew",
    language: "Hebrew",
    title: "App Store Keyword Research for the Israeli Market",
    subtitle: "A right-to-left script, a small population, and a disproportionately active app market",
    description:
      "Hebrew App Store keyword research: right-to-left layout considerations distinct from Arabic, and what a small but tech-dense market means for difficulty.",
    storefronts: [{ code: "il", name: "Israel" }],
    breakdown: [
      {
        heading: "Right-to-left, but a different script and market profile than Arabic",
        points: [
          "Hebrew reads right-to-left like Arabic, and the same RTL layout considerations apply: screenshots with directional UI elements need RTL-aware versions, and any indexed screenshot caption text needs correctly rendered right-to-left Hebrew rather than a mirrored English caption.",
          "Hebrew is a distinct script from Arabic with no shared vocabulary, despite both being RTL Semitic-family languages historically — treat them as completely separate localization projects, never as variations of the same work.",
          "Israel has a comparatively small population but a disproportionately active, tech-literate app market, which can mean real competition in popular categories despite the market's small absolute size.",
        ],
      },
      {
        heading: "What to check for Hebrew-market metadata",
        points: [
          "English is widely understood in Israel's tech sector, and English-language app names and even some keyword candidates can perform reasonably alongside native Hebrew terms, particularly for developer-facing or technical categories.",
          "Confirm screenshot captions render correctly in RTL Hebrew if targeting the OCR-indexing signal Apple has applied to caption text since June 2025 — a mirrored English caption doesn't capture this the way a real Hebrew caption does.",
          "Don't assume low difficulty from population size alone. Score real candidates before assuming Israel's smaller market means an easy ranking.",
        ],
      },
    ],
    registerNotes: [
      "Hebrew and Arabic are both RTL but are distinct scripts and languages with no shared vocabulary — treat them as fully separate localization efforts.",
      "English is widely understood in Israel's tech sector and can be a viable secondary keyword language for technical categories.",
      "RTL screenshot and caption considerations apply the same way they do for Arabic-language markets.",
    ],
    faq: [
      {
        q: "Can I reuse Arabic RTL screenshot work for the Hebrew market?",
        a: "The RTL layout principle transfers, but the script and language don't — Hebrew and Arabic share no vocabulary, so the actual text content needs independent translation and keyword research, not a shared asset.",
      },
      {
        q: "Is Israel a low-competition App Store market because of its small population?",
        a: "Not reliably. Israel's tech-literate, mobile-first population can produce real competition in popular categories despite the market's small absolute size. Check actual difficulty scores rather than assuming low competition from population alone.",
      },
    ],
  },
  {
    slug: "ukrainian",
    language: "Ukrainian",
    title: "App Store Keyword Research for the Ukrainian Market",
    subtitle: "Cyrillic script, a distinct language from Russian, and a market that has shifted since 2022",
    description:
      "Ukrainian App Store keyword research: why Ukrainian is not a Russian dialect for search purposes, and how language preference in the market has shifted.",
    storefronts: [{ code: "ua", name: "Ukraine" }],
    breakdown: [
      {
        heading: "Ukrainian and Russian are related but not interchangeable",
        points: [
          "Ukrainian uses Cyrillic script like Russian, and the two languages share a common linguistic ancestry, but they are separate languages with real vocabulary and grammatical differences, not a dialect pair. Reusing a Russian keyword list for Ukraine misses genuine Ukrainian-specific vocabulary.",
          "Language preference and usage in Ukraine's app market has shifted meaningfully toward Ukrainian since 2022, a trend worth factoring into current keyword research rather than relying on older assumptions about Russian being the practical default in the market.",
          "As with other Cyrillic-script languages, keyword candidates need to be entered and scored in native Cyrillic characters, not romanized approximations.",
        ],
      },
      {
        heading: "Practical research notes",
        points: [
          "Build the Ukrainian keyword list from native Ukrainian vocabulary and verify it against current usage rather than adapting a Russian list, given both the linguistic differences and the documented shift in language preference within the market.",
          "English loanwords appear in Ukrainian tech vocabulary, often transliterated into Cyrillic, similar to the pattern in Russian — test both the native Ukrainian term and the transliterated-loanword form where relevant.",
          "Ukraine's app market and its App Store storefront's behavior have been affected by broader disruption since 2022; treat any keyword or difficulty data as worth re-checking more frequently than in a more stable market.",
        ],
      },
    ],
    registerNotes: [
      "Ukrainian and Russian are related but distinct languages — a Russian keyword list does not substitute for genuine Ukrainian-language research.",
      "Language preference in Ukraine's app market has shifted toward Ukrainian since 2022, worth factoring into current keyword choices.",
      "Enter and score keyword candidates in native Cyrillic script, matching the same practice as Russian-language research.",
    ],
    faq: [
      {
        q: "Can I use a Russian keyword list for the Ukrainian App Store storefront?",
        a: "Not reliably. Ukrainian and Russian are distinct languages with real vocabulary differences, and language preference within Ukraine's market has shifted toward Ukrainian since 2022. Score genuine Ukrainian-language candidates rather than adapting a Russian list.",
      },
      {
        q: "Has anything changed about ASO in the Ukrainian market recently?",
        a: "Language preference has shifted meaningfully toward Ukrainian since 2022, and market conditions have seen broader disruption. Re-check keyword and difficulty data more frequently here than in a more stable market before relying on it.",
      },
    ],
  },
];
