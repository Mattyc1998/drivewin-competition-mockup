import { Link } from 'react-router-dom';
import { useAppState } from '../../store/AppContext.jsx';
import { CATEGORY_LABEL, percentSold, ticketsSoldTotal } from '../../data/competitions.js';
import { formatGBP, formatDate } from '../../utils/format.js';

const statusStyle = {
  live: 'bg-emerald-400/15 text-emerald-400',
  ended: 'bg-white/10 text-white/50',
  paused: 'bg-gold-500/15 text-gold-400',
};

export default function AdminDashboard() {
  const { competitions, demoTicketCounts } = useAppState();

  const totals = competitions.reduce(
    (acc, c) => {
      const sold = ticketsSoldTotal(c, demoTicketCounts[c.id] || 0);
      acc.tickets += sold;
      acc.revenue += sold * c.ticketPrice;
      return acc;
    },
    { tickets: 0, revenue: 0 }
  );

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-white sm:text-3xl">Dashboard</h1>
          <p className="mt-1 text-white/50">Overview of all competitions in this demo session.</p>
        </div>
        <Link
          to="/admin/new"
          className="rounded-md bg-gradient-to-r from-red-600 to-red-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-600/20 hover:brightness-110 transition"
        >
          + Create competition
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-8">
        <StatCard label="Live competitions" value={competitions.filter((c) => c.status === 'live').length} />
        <StatCard label="Total tickets sold" value={totals.tickets.toLocaleString()} />
        <StatCard label="Total revenue" value={formatGBP(totals.revenue)} accent />
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/10 bg-navy-800">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-white/40">
              <th className="px-5 py-3.5 font-medium">Competition</th>
              <th className="px-5 py-3.5 font-medium">Status</th>
              <th className="px-5 py-3.5 font-medium">Draw date</th>
              <th className="px-5 py-3.5 font-medium">Sold</th>
              <th className="px-5 py-3.5 font-medium">Revenue</th>
              <th className="px-5 py-3.5 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {competitions.map((c) => {
              const sold = ticketsSoldTotal(c, demoTicketCounts[c.id] || 0);
              const percent = percentSold(c, demoTicketCounts[c.id] || 0);
              return (
                <tr key={c.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img src={c.images[0]} alt="" className="h-10 w-14 rounded object-cover" />
                      <div>
                        <p className="font-semibold text-white leading-tight">{c.title}</p>
                        <p className="text-xs text-white/40">{CATEGORY_LABEL[c.category]}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${statusStyle[c.status]}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-white/60">{formatDate(c.drawDate)}</td>
                  <td className="px-5 py-4 text-white/60">
                    {sold.toLocaleString()} <span className="text-white/30">({percent}%)</span>
                  </td>
                  <td className="px-5 py-4 text-white/60">{formatGBP(sold * c.ticketPrice)}</td>
                  <td className="px-5 py-4 text-right">
                    <Link to={`/admin/competitions/${c.id}`} className="text-sm font-semibold text-gold-400 hover:text-gold-300">
                      Manage →
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({ label, value, accent }) {
  return (
    <div className="rounded-xl border border-white/10 bg-navy-800 p-5">
      <p className="text-xs uppercase tracking-wide text-white/40 mb-2">{label}</p>
      <p className={`text-2xl font-extrabold ${accent ? 'text-gold-400' : 'text-white'}`}>{value}</p>
    </div>
  );
}
