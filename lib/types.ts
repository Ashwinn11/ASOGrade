export interface KeywordRow {
  keyword: string;
  store: string;
  popularity: number | null;
  difficulty: number | null;
  appsCount: number | null;
  lastUpdate: string | null;
}

export interface RankingApp {
  appStoreId: string;
  name: string;
  iconUrl?: string;
  ranking?: number;
  ratingCount?: number;
}

export const STORES: [string, string][] = [
  ["al", "Albania"],
  ["dz", "Algeria"],
  ["ar", "Argentina"],
  ["am", "Armenia"],
  ["au", "Australia"],
  ["at", "Austria"],
  ["az", "Azerbaijan"],
  ["bh", "Bahrain"],
  ["be", "Belgium"],
  ["bo", "Bolivia"],
  ["ba", "Bosnia and Herzegovina"],
  ["bw", "Botswana"],
  ["br", "Brazil"],
  ["bg", "Bulgaria"],
  ["kh", "Cambodia"],
  ["ca", "Canada"],
  ["cv", "Cape Verde"],
  ["td", "Chad"],
  ["cl", "Chile"],
  ["cn", "China"],
  ["co", "Colombia"],
  ["cr", "Costa Rica"],
  ["hr", "Croatia"],
  ["cy", "Cyprus"],
  ["cz", "Czech Republic"],
  ["dk", "Denmark"],
  ["do", "Dominican Republic"],
  ["ec", "Ecuador"],
  ["eg", "Egypt"],
  ["sv", "El Salvador"],
  ["ee", "Estonia"],
  ["fm", "Federated States of Micronesia"],
  ["fj", "Fiji"],
  ["fi", "Finland"],
  ["fr", "France"],
  ["de", "Germany"],
  ["gh", "Ghana"],
  ["gr", "Greece"],
  ["gd", "Grenada"],
  ["gt", "Guatemala"],
  ["gy", "Guyana"],
  ["hn", "Honduras"],
  ["hk", "Hong Kong"],
  ["hu", "Hungary"],
  ["is", "Iceland"],
  ["in", "India"],
  ["id", "Indonesia"],
  ["iq", "Iraq"],
  ["ie", "Ireland"],
  ["il", "Israel"],
  ["it", "Italy"],
  ["jp", "Japan"],
  ["jo", "Jordan"],
  ["kz", "Kazakhstan"],
  ["ke", "Kenya"],
  ["kg", "Krygyzstan"],
  ["kw", "Kuwait"],
  ["lv", "Latvia"],
  ["lb", "Lebanon"],
  ["lu", "Luxembourg"],
  ["mo", "Macau"],
  ["mg", "Madagascar"],
  ["my", "Malaysia"],
  ["mx", "Mexico"],
  ["mn", "Mongolia"],
  ["ma", "Morocco"],
  ["np", "Nepal"],
  ["nl", "Netherlands"],
  ["nz", "New Zealand"],
  ["no", "Norway"],
  ["om", "Oman"],
  ["pk", "Pakistan"],
  ["pa", "Panama"],
  ["py", "Paraguay"],
  ["pe", "Peru"],
  ["ph", "Philippines"],
  ["pl", "Poland"],
  ["pt", "Portugal"],
  ["qa", "Qatar"],
  ["tt", "Republic of Trinidad and Tobago"],
  ["ro", "Romania"],
  ["ru", "Russia"],
  ["sa", "Saudi Arabia"],
  ["sg", "Singapore"],
  ["sk", "Slovakia"],
  ["si", "Slovenia"],
  ["za", "South Africa"],
  ["kr", "South Korea"],
  ["es", "Spain"],
  ["lk", "Sri Lanka"],
  ["sz", "Swaziland"],
  ["se", "Sweden"],
  ["ch", "Switzerland"],
  ["tw", "Taiwan"],
  ["tj", "Tajikistan"],
  ["tz", "Tanzania"],
  ["th", "Thailand"],
  ["tn", "Tunisia"],
  ["tr", "Turkey"],
  ["tm", "Turkmenistan"],
  ["tc", "Turks and Caicos Islands"],
  ["ug", "Uganda"],
  ["ua", "Ukraine"],
  ["ae", "United Arab Emirates"],
  ["gb", "United Kingdom"],
  ["us", "United States"],
  ["uz", "Uzbekistan"],
  ["vn", "Vietnam"],
  ["ye", "Yemen"],
];

/** Shown first in the picker: the storefronts most apps actually target. */
export const POPULAR: string[] = ["us", "gb", "ca", "au", "de", "fr", "it", "es", "nl", "se", "jp", "kr", "cn", "in", "br", "mx", "ru", "tr"];

/** The cross-store view: one row per keyword *per store*, duplicates and all. */
export const ALL_STORES = "all";

const NAMES = new Map(STORES);
export const storeName = (code: string) =>
  code === ALL_STORES ? "All stores" : NAMES.get(code) ?? code.toUpperCase();

/** ISO 3166-1 alpha-2 → regional indicator pair, so no flag table to maintain. */
export const flagOf = (code: string) =>
  code.length === 2
    ? String.fromCodePoint(...[...code.toLowerCase()].map((ch) => 0x1f1e6 + ch.charCodeAt(0) - 97))
    : "";

export function timeAgo(iso: string | null): string {
  if (!iso) return "—";
  const s = (Date.now() - new Date(iso).getTime()) / 1000;
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)} min ago`;
  if (s < 86400) return `${Math.floor(s / 3600)} hr ago`;
  const d = Math.floor(s / 86400);
  return d === 1 ? "yesterday" : `${d} days ago`;
}
