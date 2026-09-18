const items = [
  { icon: '🔒', label: 'Secure payments' },
  { icon: '⚡', label: 'Instant ticket numbers' },
  { icon: '📡', label: 'Live draws' },
  { icon: '🔞', label: '18+ only' },
];

export default function TrustBar() {
  return (
    <div className="border-y border-white/10 bg-navy-900">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {items.map((item) => (
            <div key={item.label} className="flex items-center justify-center gap-2.5 text-center sm:justify-start">
              <span className="text-xl" aria-hidden>
                {item.icon}
              </span>
              <span className="text-sm font-medium text-white/70">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
