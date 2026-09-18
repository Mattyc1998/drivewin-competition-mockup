import { useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import ProgressBar from '../components/ProgressBar.jsx';
import Countdown from '../components/Countdown.jsx';
import { CATEGORY_LABEL, percentSold, ticketsSoldTotal } from '../data/competitions.js';
import { useCompetition, useDemoSoldCount } from '../store/AppContext.jsx';
import { formatGBP, formatDateTime } from '../utils/format.js';

const QUICK_QTYS = [1, 5, 10, 25];

export default function CompetitionDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const competition = useCompetition(slug);
  const demoCount = useDemoSoldCount(competition?.id);
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);

  if (!competition) return <Navigate to="/competitions" replace />;

  const percent = percentSold(competition, demoCount);
  const sold = ticketsSoldTotal(competition, demoCount);
  const remaining = competition.totalTickets - sold;
  const ended = competition.status === 'ended';
  const maxQty = Math.min(competition.maxTicketsPerOrder, Math.max(remaining, 0));
  const total = +(qty * competition.ticketPrice).toFixed(2);

  const clampQty = (n) => Math.max(1, Math.min(maxQty || 1, n));

  const handleEnter = () => {
    navigate(`/checkout/${competition.slug}`, { state: { quantity: qty } });
  };

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <nav className="text-sm text-white/40 mb-6">
          <Link to="/competitions" className="hover:text-white">Competitions</Link>
          <span className="mx-2">/</span>
          <span className="text-white/70">{competition.title}</span>
        </nav>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            {/* Future: crossfade between images on thumbnail change instead of an
                instant cut — e.g. an AnimatePresence/opacity transition. */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-navy-800">
              <img
                src={competition.images[activeImg]}
                alt={competition.title}
                className="h-full w-full object-cover"
              />
              <span className="absolute top-4 left-4 rounded-full bg-navy-950/70 backdrop-blur px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                {CATEGORY_LABEL[competition.category]}
              </span>
              {ended && (
                <span className="absolute top-4 right-4 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-xs font-semibold text-white">
                  Draw complete
                </span>
              )}
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {competition.images.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setActiveImg(i)}
                  className={`aspect-[4/3] overflow-hidden rounded-lg border-2 transition-colors ${
                    activeImg === i ? 'border-gold-500' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>

            <div className="mt-10">
              <h2 className="text-xl font-bold text-white mb-3">About this prize</h2>
              <p className="text-white/60 leading-relaxed">{competition.description}</p>
            </div>

            <div className="mt-10 rounded-xl border border-white/10 bg-navy-800 p-6">
              <h2 className="text-xl font-bold text-white mb-3">How to win &amp; eligibility</h2>
              <ul className="space-y-2 text-sm text-white/60 leading-relaxed list-disc list-inside">
                <li>Entrants must be 18 or over and a UK resident at the time of entry.</li>
                <li>Each ticket purchased is assigned a unique, sequential ticket number instantly.</li>
                <li>One winning ticket number is drawn live once the competition closes or sells out.</li>
                <li>The winner is contacted directly and announced on the Winners page.</li>
                <li>A free postal entry route is available — see full T&Cs (placeholder for launch).</li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-24 rounded-xl border border-white/10 bg-navy-800 p-6">
              <h1 className="text-2xl font-extrabold text-white leading-tight">{competition.title}</h1>
              <p className="mt-1 text-sm text-white/50">{competition.tagline}</p>

              {competition.cashAlt && (
                <p className="mt-3 text-xs text-white/40">
                  Estimated retail value {formatGBP(competition.cashAlt)}
                </p>
              )}

              <div className="mt-5 space-y-1.5">
                <div className="flex items-center justify-between text-sm text-white/60">
                  <span>{sold.toLocaleString()} / {competition.totalTickets.toLocaleString()} tickets sold</span>
                  <span className="font-bold text-gold-400">{percent}%</span>
                </div>
                <ProgressBar percent={percent} />
              </div>

              <div className="mt-5 flex items-center justify-between rounded-lg bg-white/5 px-4 py-3">
                <span className="text-sm text-white/60">Draw closes</span>
                <Countdown drawDate={competition.drawDate} compact ended={ended} />
              </div>
              <p className="mt-1.5 text-xs text-white/35">{formatDateTime(competition.drawDate)}</p>

              {ended ? (
                <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-4 text-center">
                  <p className="text-sm text-white/60">This draw has ended.</p>
                  <Link to="/winners" className="mt-2 inline-block text-sm font-semibold text-gold-400">
                    See who won →
                  </Link>
                </div>
              ) : (
                <>
                  <div className="mt-6">
                    <label className="block text-sm font-semibold text-white mb-2">
                      Number of tickets
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setQty((q) => clampQty(q - 1))}
                        className="h-11 w-11 shrink-0 rounded-md border border-white/15 text-white text-lg font-bold hover:bg-white/10"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        min={1}
                        max={maxQty || 1}
                        value={qty}
                        onChange={(e) => setQty(clampQty(Number(e.target.value) || 1))}
                        className="h-11 w-full rounded-md border border-white/15 bg-navy-900 text-center text-lg font-bold text-white focus:outline-none focus:ring-2 focus:ring-gold-500/50"
                      />
                      <button
                        onClick={() => setQty((q) => clampQty(q + 1))}
                        className="h-11 w-11 shrink-0 rounded-md border border-white/15 text-white text-lg font-bold hover:bg-white/10"
                      >
                        +
                      </button>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {QUICK_QTYS.filter((n) => n <= maxQty).map((n) => (
                        <button
                          key={n}
                          onClick={() => setQty(n)}
                          className={`rounded-full px-3 py-1.5 text-xs font-semibold border transition-colors ${
                            qty === n
                              ? 'border-gold-500 bg-gold-500/10 text-gold-400'
                              : 'border-white/15 text-white/60 hover:bg-white/5'
                          }`}
                        >
                          {n} tickets
                        </button>
                      ))}
                    </div>
                    <p className="mt-2 text-xs text-white/35">
                      Max {competition.maxTicketsPerOrder} tickets per order · {remaining.toLocaleString()} remaining
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                    <span className="text-sm text-white/60">Total</span>
                    <span className="text-2xl font-extrabold text-white">{formatGBP(total)}</span>
                  </div>

                  <button
                    onClick={handleEnter}
                    disabled={maxQty < 1}
                    className="mt-5 w-full rounded-md bg-gradient-to-r from-red-600 to-red-500 py-3.5 text-base font-bold text-white shadow-lg shadow-red-600/20 hover:brightness-110 transition disabled:opacity-40"
                  >
                    Enter now
                  </button>
                  <p className="mt-3 text-center text-xs text-white/30">
                    Secure checkout · Ticket numbers issued instantly
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
