import { ShieldCheckIcon, BoltTicketIcon, BroadcastIcon, AgeRestrictedIcon } from './icons/TrustIcons.jsx';

const items = [
  { Icon: ShieldCheckIcon, label: 'Secure payments' },
  { Icon: BoltTicketIcon, label: 'Instant ticket numbers' },
  { Icon: BroadcastIcon, label: 'Live draws' },
  { Icon: AgeRestrictedIcon, label: '18+ only' },
];

export default function TrustBar() {
  return (
    <div className="bg-navy-900">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {items.map(({ Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-navy-800 px-4 py-6 text-center transition-colors hover:border-gold-500/30"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-500/10 text-gold-400">
                <Icon className="h-6 w-6" />
              </span>
              <span className="text-sm font-medium text-white/80">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
