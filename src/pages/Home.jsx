import { Link } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import CompetitionCard from '../components/CompetitionCard.jsx';
import WinnerCard from '../components/WinnerCard.jsx';
import TrustBar from '../components/TrustBar.jsx';
import HowItWorksSteps from '../components/HowItWorksSteps.jsx';
import ProgressBar from '../components/ProgressBar.jsx';
import Countdown from '../components/Countdown.jsx';
import { useAppState, useAllWinners, useDemoSoldCount } from '../store/AppContext.jsx';
import { percentSold, ticketsSoldTotal, isNewestLive } from '../data/competitions.js';
import { formatGBP } from '../utils/format.js';
import { ShieldCheckIcon, BoltTicketIcon, BroadcastIcon } from '../components/icons/TrustIcons.jsx';

export default function Home() {
  const { competitions } = useAppState();
  const winners = useAllWinners();
  const featured = competitions.find((c) => c.featured) || competitions[0];
  const live = competitions.filter((c) => c.status === 'live');

  return (
    <Layout>
      <Hero featured={featured} />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-gold-400 uppercase tracking-wide mb-2">Who we are</p>
          <p className="text-lg text-white/70 leading-relaxed">
            DriveWin is the UK's newest car and motorbike competition site, giving everyday people
            the chance to win premium vehicles for the price of a ticket. Every prize is bought
            outright before a draw opens, every draw is filmed live, and every winner is verified
            and published — because trust is the whole point.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">How it works</h2>
            <p className="text-white/50 mt-1">From browsing to a winning number, in four simple steps.</p>
          </div>
        </div>
        <HowItWorksSteps />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">Live competitions</h2>
            <p className="text-white/50 mt-1">Every draw currently open for entries.</p>
          </div>
          <Link
            to="/competitions"
            className="hidden sm:inline-block text-sm font-semibold text-gold-400 hover:text-gold-300"
          >
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {live.map((c) => (
            <CompetitionCard key={c.id} competition={c} />
          ))}
        </div>
        <Link
          to="/competitions"
          className="mt-8 flex sm:hidden items-center justify-center rounded-md border border-white/15 py-3 text-sm font-semibold text-white"
        >
          View all competitions →
        </Link>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">Recent winners</h2>
            <p className="text-white/50 mt-1">Real people, real prizes, drawn live.</p>
          </div>
          <Link
            to="/winners"
            className="hidden sm:inline-block text-sm font-semibold text-gold-400 hover:text-gold-300"
          >
            All winners →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {winners.slice(0, 4).map((w) => (
            <WinnerCard key={w.id} winner={w} />
          ))}
        </div>
      </section>

      <TrustBar />
    </Layout>
  );
}

function Hero({ featured }) {
  const { competitions } = useAppState();
  const demoCount = useDemoSoldCount(featured?.id);
  if (!featured) return null;
  const percent = percentSold(featured, demoCount);
  const sold = ticketsSoldTotal(featured, demoCount);
  const isNewest = isNewestLive(featured, competitions);

  return (
    <section className="relative overflow-hidden border-b border-white/10">
      {/* Future: swap this flat gradient for a subtle looping hero video/blurred
          car footage behind the copy, once real footage/photography exists. */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,55,0.08),transparent_45%),radial-gradient(circle_at_80%_60%,rgba(224,41,62,0.10),transparent_45%)]" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3 py-1 text-xs font-semibold text-gold-400 mb-6">
              {isNewest ? '🔥 New draw just launched' : '⭐ Featured competition'}
            </span>
            <h1 className="text-4xl font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-6xl text-balance">
              Some people buy cars.
              <br />
              <span className="text-gold-400">Others win them.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-white/60 leading-relaxed">
              Enter for the chance to drive away in a dream car or bike, for the price of a coffee.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/competitions"
                className="rounded-md bg-gradient-to-r from-red-600 to-red-500 px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-red-600/25 hover:brightness-110 transition"
              >
                Enter now
              </Link>
              <Link
                to="/how-it-works"
                className="rounded-md border border-white/20 px-7 py-3.5 text-base font-semibold text-white hover:bg-white/5 transition"
              >
                How it works
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              <TrustBadge Icon={ShieldCheckIcon} label="Secure payments" />
              <TrustBadge Icon={BoltTicketIcon} label="Instant ticket numbers" />
              <TrustBadge Icon={BroadcastIcon} label="Live draws" />
            </div>
          </div>

          <Link
            to={`/competitions/${featured.slug}`}
            className="group block overflow-hidden rounded-2xl border border-white/10 bg-navy-800 shadow-2xl hover:border-gold-500/40 transition-colors"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={featured.images[0]}
                alt={featured.title}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 rounded-full bg-gold-500 px-3 py-1 text-xs font-bold text-navy-950">
                FLAGSHIP PRIZE
              </span>
            </div>
            <div className="p-5">
              <p className="text-2xl font-extrabold text-white">{featured.title}</p>
              <p className="text-sm text-white/60 mb-5">{featured.tagline}</p>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white/60">{sold.toLocaleString()} / {featured.totalTickets.toLocaleString()} sold</span>
                <span className="text-sm font-bold text-gold-400">{percent}%</span>
              </div>
              <ProgressBar percent={percent} />
              <div className="mt-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-white/40">From</p>
                  <p className="text-xl font-extrabold text-white">{formatGBP(featured.ticketPrice)}</p>
                </div>
                <Countdown drawDate={featured.drawDate} />
              </div>
              <span className="mt-5 flex items-center justify-center rounded-md bg-red-600 group-hover:brightness-110 py-3 text-sm font-bold text-white transition">
                Enter this competition
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

function TrustBadge({ Icon, label }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70">
      <Icon className="h-4 w-4 text-gold-400" />
      {label}
    </span>
  );
}
