const s = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export const Refresh = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...s}>
    <path d="M20 11A8 8 0 1 0 18.4 16" /><path d="M20 5v6h-6" />
  </svg>
);
export const Plus = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...s}><path d="M12 5v14M5 12h14" /></svg>
);
export const Bulb = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...s}>
    <path d="M9 18h6M10 21h4" /><path d="M12 3a6 6 0 0 0-3.5 10.9c.3.3.5.7.5 1.1v1h6v-1c0-.4.2-.8.5-1.1A6 6 0 0 0 12 3Z" />
  </svg>
);
export const Search = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...s}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
);
export const Trash = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...s}>
    <path d="M4 7h16M10 11v6M14 11v6" /><path d="M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
  </svg>
);
export const Close = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...s}><path d="M6 6l12 12M18 6L6 18" /></svg>
);
export const Chart = ({ size = 26 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...s} strokeWidth={1.5}>
    <path d="M4 19V11M9.5 19V5M15 19v-6M20.5 19v-9" />
  </svg>
);
export const AppsIcon = ({ size = 26 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...s} strokeWidth={1.5}>
    <rect x="3" y="3" width="7" height="7" rx="2" /><rect x="14" y="3" width="7" height="7" rx="2" />
    <rect x="3" y="14" width="7" height="7" rx="2" /><rect x="14" y="14" width="7" height="7" rx="2" />
  </svg>
);
export const FolderPlus = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...s}>
    <path d="M3 8a2 2 0 0 1 2-2h3.6a2 2 0 0 1 1.4.6L11.4 8H19a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Z" />
    <path d="M12 11.5v5M9.5 14h5" />
  </svg>
);

export const Eye = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
  </svg>
);
