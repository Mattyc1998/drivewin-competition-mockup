import { Link } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import { useMyTickets, DEMO_USER } from '../store/AppContext.jsx';
import { formatDateTime } from '../utils/format.js';

const statusStyle = {
  upcoming: 'bg-white/10 text-white/70',
  won: 'bg-emerald-400/15 text-emerald-400',
  lost: 'bg-white/5 text-white/40',
};
const statusLabel = { upcoming: 'Draw upcoming', won: '🏆 You won!', lost: 'Not this time' };

export default function MyTickets() {
  const tickets = useMyTickets();

  return (
    <Layout>
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-white sm:text-4xl">My Tickets</h1>
            <p className="mt-2 text-white/50">
              Signed in as <span className="text-white/80">{DEMO_USER.name}</span> ({DEMO_USER.email})
            </p>
          </div>
          <Link
            to="/competitions"
            className="rounded-md bg-gradient-to-r from-red-600 to-red-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-600/20 hover:brightness-110 transition"
          >
            Enter another competition
          </Link>
        </div>

        {/* Future: replace this plain empty state with a small illustration
            (e.g. a ticket/car outline graphic) for a more designed feel. */}
        {tickets.length === 0 ? (
          <div className="rounded-xl border border-dashed border-white/15 py-20 text-center">
            <p className="text-white/50 mb-4">You haven't entered any competitions yet in this demo.</p>
            <Link to="/competitions" className="text-sm font-semibold text-gold-400 hover:text-gold-300">
              Browse live competitions →
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {tickets.map((t) => (
              <div
                key={t.orderId}
                className="flex flex-col gap-4 rounded-xl border border-white/10 bg-navy-800 p-5 sm:flex-row sm:items-center"
              >
                <img
                  src={t.competition.images[0]}
                  alt=""
                  className="h-20 w-28 shrink-0 rounded-lg object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <Link
                      to={`/competitions/${t.competition.slug}`}
                      className="text-base font-bold text-white hover:text-gold-400 transition-colors"
                    >
                      {t.competition.title}
                    </Link>
                    <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${statusStyle[t.status]}`}>
                      {statusLabel[t.status]}
                    </span>
                  </div>
                  <p className="text-xs text-white/40 mb-2">
                    Order {t.orderId} · Purchased {formatDateTime(t.purchaseDate)} · Draw{' '}
                    {formatDateTime(t.competition.drawDate)}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {t.ticketNumbers.map((n) => (
                      <span
                        key={n}
                        className="rounded-md border border-white/10 bg-navy-950 px-2 py-1 font-mono text-xs font-semibold text-gold-400"
                      >
                        {n}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}
