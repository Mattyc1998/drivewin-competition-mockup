// Static card-brand marks for checkout trust signalling. Simplified/generic
// renderings (not official brand assets) — swap for licensed SVGs in production.

export function VisaMark(props) {
  return (
    <svg viewBox="0 0 48 30" width="40" height="26" {...props}>
      <rect width="48" height="30" rx="4" fill="#fff" />
      <text
        x="24"
        y="20"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontStyle="italic"
        fontWeight="700"
        fontSize="13"
        fill="#1a1f71"
      >
        VISA
      </text>
    </svg>
  );
}

export function MastercardMark(props) {
  return (
    <svg viewBox="0 0 48 30" width="40" height="26" {...props}>
      <rect width="48" height="30" rx="4" fill="#16171f" />
      <circle cx="20" cy="15" r="8.5" fill="#eb001b" />
      <circle cx="29" cy="15" r="8.5" fill="#f79e1b" fillOpacity="0.9" />
    </svg>
  );
}

export function AmexMark(props) {
  return (
    <svg viewBox="0 0 48 30" width="40" height="26" {...props}>
      <rect width="48" height="30" rx="4" fill="#1f72cd" />
      <text
        x="24"
        y="19"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontWeight="700"
        fontSize="9"
        fill="#fff"
      >
        AMEX
      </text>
    </svg>
  );
}
