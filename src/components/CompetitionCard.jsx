import { Link } from 'react-router-dom';
import ProgressBar from './ProgressBar.jsx';
import Countdown from './Countdown.jsx';
import { CATEGORY_LABEL, percentSold, ticketsSoldTotal } from '../data/competitions.js';
import { useDemoSoldCount } from '../store/AppContext.jsx';
import { formatGBP } from '../utils/format.js';

const categoryStyle = {
  car: 'bg-navy-600 text-white/90',
  bike: 'bg-navy-600 text-white/90',
  cash: 'bg-gold-500/20 text-gold-400',
};

export default function CompetitionCard({ competition }) {
  const demoCount = useDemoSoldCount(competition.id);
  const percent = percentSold(competition, demoCount);
  const sold = ticketsSoldTotal(competition, demoCount);
  const ended = competition.status === 'ended';
  const almostGone = percent >= 90 && !ended;

  return (
    <Link
      to={`/competitions/${competition.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-navy-800 hover:border-gold-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-navy-700">
        <img
          src={competition.images[0]}
          alt={competition.title}
          loading="lazy"
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
        <span
          className={`absolute top-3 left-3 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${categoryStyle[competition.category]}`}
        >
          {CATEGORY_LABEL[competition.category]}
        </span>
        {ended ? (
          <span className="absolute top-3 right-3 rounded-full bg-white/15 backdrop-blur px-2.5 py-1 text-[11px] font-semibold text-white">
            Draw complete
          </span>
        ) : almostGone ? (
          // Future: give >90%-sold cards a bigger/bolder urgency treatment
          // than just this corner pill — e.g. a pulsing border on the card itself.
          <span className="absolute top-3 right-3 rounded-full bg-red-600 px-2.5 py-1 text-[11px] font-bold text-white animate-pulse">
            Almost sold out
          </span>
        ) : null}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <span className="rounded-md bg-navy-950/70 backdrop-blur px-2.5 py-1 text-xs font-semibold text-white">
            {formatGBP(competition.ticketPrice)} / ticket
          </span>
          <span className="rounded-md bg-navy-950/70 backdrop-blur px-2.5 py-1">
            <Countdown drawDate={competition.drawDate} compact ended={ended} />
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-bold text-white leading-snug">{competition.title}</h3>
        <p className="mt-1 text-sm text-white/50 line-clamp-1">{competition.tagline}</p>

        <div className="mt-4 space-y-1.5">
          <div className="flex items-center justify-between text-xs text-white/60">
            <span>{sold.toLocaleString()} / {competition.totalTickets.toLocaleString()} sold</span>
            <span className="font-semibold text-gold-400">{percent}%</span>
          </div>
          <ProgressBar percent={percent} size="sm" />
        </div>

        <span className="mt-4 inline-flex items-center justify-center rounded-md bg-white/5 group-hover:bg-red-600 border border-white/10 group-hover:border-red-600 py-2.5 text-sm font-bold text-white transition-colors">
          {ended ? 'View result' : 'Enter now'}
        </span>
      </div>
    </Link>
  );
}
