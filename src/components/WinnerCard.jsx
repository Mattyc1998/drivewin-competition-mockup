import { formatDate } from '../utils/format.js';

function initialsOf(winner) {
  const source = winner.name || winner.initials || '';
  const words = source.split(/\s+/).filter(Boolean);
  const letters = words.slice(0, 2).map((w) => w.match(/[A-Za-z]/)?.[0] || '');
  return letters.join('').toUpperCase() || '?';
}

export default function WinnerCard({ winner, large = false }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-white/10 bg-navy-800">
      <div className={`relative ${large ? 'aspect-[4/3]' : 'aspect-[16/10]'} overflow-hidden bg-navy-700`}>
        <img src={winner.image} alt={winner.prize} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/10 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-xs text-gold-400 font-semibold uppercase tracking-wide">Winner</p>
          <p className="text-white font-bold leading-tight">{winner.prize}</p>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-navy-950 font-bold text-sm">
            {initialsOf(winner)}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">{winner.name}</p>
            <p className="text-xs text-white/50">
              {winner.location} · {formatDate(winner.date)}
            </p>
          </div>
        </div>
        {winner.quote && (
          <p className="mt-3 text-sm text-white/60 italic leading-relaxed">"{winner.quote}"</p>
        )}
        <p className="mt-3 text-[11px] uppercase tracking-wide text-white/30">
          Ticket {winner.ticketNumber}
        </p>
      </div>
    </div>
  );
}
