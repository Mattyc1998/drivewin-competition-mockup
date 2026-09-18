// Small stroke-based icon set for trust signals — replaces emoji so the
// trust bar reads as a designed product element rather than placeholder text.

const base = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export function ShieldCheckIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3l7 3v5.2c0 4.4-2.9 8.3-7 9.8-4.1-1.5-7-5.4-7-9.8V6l7-3z" />
      <path d="M9 12l2 2 4-4.2" />
    </svg>
  );
}

export function BoltTicketIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 8.5A2.5 2.5 0 0 1 6.5 6h11A2.5 2.5 0 0 1 20 8.5v.3a1.7 1.7 0 0 0 0 3.4v.3a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 12.5v-.3a1.7 1.7 0 0 0 0-3.4v-.3z" />
      <path d="M13 7l-2.4 4.6h2.2L11.5 17 15 11.6h-2.3L13 7z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function BroadcastIcon(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none" />
      <path d="M8.5 9.5a5 5 0 0 0 0 5" />
      <path d="M15.5 9.5a5 5 0 0 1 0 5" />
      <path d="M5.8 6.8a9 9 0 0 0 0 10.4" />
      <path d="M18.2 6.8a9 9 0 0 1 0 10.4" />
    </svg>
  );
}

export function AgeRestrictedIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
      <path d="M7.2 15v-2.4c0-1.1.8-1.9 1.9-1.9s1.9.8 1.9 1.9V15" />
      <path d="M7.2 13h3.6" />
      <path d="M13.5 10.7h2.1c.9 0 1.6.7 1.6 1.6 0 .5-.2.9-.6 1.2.4.3.6.7.6 1.2 0 .9-.7 1.6-1.6 1.6h-2.1v-5.6z" />
      <path d="M13.5 13.3h2" />
    </svg>
  );
}

export function CardIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="M3 9.5h18" />
      <path d="M6.5 14.5h3" />
    </svg>
  );
}
