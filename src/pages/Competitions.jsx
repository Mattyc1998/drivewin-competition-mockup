import { useMemo, useState } from 'react';
import Layout from '../components/Layout.jsx';
import CompetitionCard from '../components/CompetitionCard.jsx';
import { useAppState } from '../store/AppContext.jsx';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'car', label: 'Cars' },
  { key: 'bike', label: 'Bikes' },
  { key: 'cash', label: 'Cash Alt' },
];

const SORTS = [
  { key: 'ending-soon', label: 'Ending soonest' },
  { key: 'newest', label: 'Newest' },
  { key: 'price-low', label: 'Ticket price: low to high' },
  { key: 'price-high', label: 'Ticket price: high to low' },
];

export default function Competitions() {
  const { competitions } = useAppState();
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('ending-soon');

  const filtered = useMemo(() => {
    let list = competitions.filter((c) => c.status === 'live');
    if (filter !== 'all') list = list.filter((c) => c.category === filter);
    list = [...list];
    if (sort === 'ending-soon') list.sort((a, b) => new Date(a.drawDate) - new Date(b.drawDate));
    if (sort === 'newest') list.sort((a, b) => (a.id < b.id ? 1 : -1));
    if (sort === 'price-low') list.sort((a, b) => a.ticketPrice - b.ticketPrice);
    if (sort === 'price-high') list.sort((a, b) => b.ticketPrice - a.ticketPrice);
    return list;
  }, [competitions, filter, sort]);

  const ended = competitions.filter((c) => c.status === 'ended');

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">Live Competitions</h1>
        <p className="mt-2 text-white/50 max-w-xl">
          Every draw currently open for entries. Enter as many as you like — tickets are assigned
          instantly and sequentially.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  filter === f.key
                    ? 'bg-gold-500 text-navy-950'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-md border border-white/15 bg-navy-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-gold-500/50"
          >
            {SORTS.map((s) => (
              <option key={s.key} value={s.key}>
                Sort: {s.label}
              </option>
            ))}
          </select>
        </div>

        {filtered.length === 0 ? (
          <p className="mt-16 text-center text-white/40">No competitions match this filter right now.</p>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => (
              <CompetitionCard key={c.id} competition={c} />
            ))}
          </div>
        )}

        {ended.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold text-white mb-6">Recently ended</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {ended.map((c) => (
                <CompetitionCard key={c.id} competition={c} />
              ))}
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
}
