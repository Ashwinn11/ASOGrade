const s = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export const Refresh = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...s}>
    <path d="M20 11A8 8 0 1 0 18.4 16" /><path d="M20 5v6h-6" />
  </svg>
);
export const Plus = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...s}><path d="M12 5v14M5 12h14" /></svg>
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

export const Eye = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
  </svg>
);

/**
 * The small directional arrow — used as a dropdown indicator and an
 * accordion toggle. Was inlined separately in three files (the landing FAQ,
 * the store picker, the keyword sheet's expand chevron), each with its own
 * stroke width and viewBox.
 */
export const Chevron = ({ size = 11, direction = "down" }: {
  size?: number;
  direction?: "down" | "up" | "left" | "right";
}) => {
  const rotate = { down: 0, up: 180, left: 90, right: -90 }[direction];
  return (
    <svg
      width={size} height={size} viewBox="0 0 12 12" fill="none"
      style={rotate ? { transform: `rotate(${rotate}deg)` } : undefined}
    >
      <path d="M3 4.5 6 7.5 9 4.5" stroke="currentColor" strokeWidth="1.6"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
