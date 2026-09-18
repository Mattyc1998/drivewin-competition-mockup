import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppState } from '../../store/AppContext.jsx';
import { percentSold, ticketsSoldTotal } from '../../data/competitions.js';
import { formatGBP, formatDateTime } from '../../utils/format.js';
import ConfirmModal from '../../components/ConfirmModal.jsx';

export default function AdminCompetitionDetail() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { competitions, entrantsByComp, demoTicketCounts, draws } = useAppState();
  const competition = competitions.find((c) => c.id === id);
  const [editOpen, setEditOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null); // 'draw' | 'end' | null

  if (!competition) return <Navigate to="/admin" replace />;

  const entrants = entrantsByComp[id] || [];
  const demoCount = demoTicketCounts[id] || 0;
  const sold = ticketsSoldTotal(competition, demoCount);
  const percent = percentSold(competition, demoCount);
  const revenue = sold * competition.ticketPrice;
  const draw = draws[id];

  const setStatus = (status) => dispatch({ type: 'SET_STATUS', id, status });
  const requestRunDraw = () => {
    if (sold < 1 || draw) return;
    setConfirmAction('draw');
  };
  const requestEnd = () => setConfirmAction('end');

  const handleConfirm = () => {
    if (confirmAction === 'draw') dispatch({ type: 'RUN_DRAW', id });
    if (confirmAction === 'end') setStatus('ended');
    setConfirmAction(null);
  };

  return (
    <div>
      <Link to="/admin" className="text-sm text-white/40 hover:text-white mb-6 inline-block">
        ← Back to dashboard
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div className="flex gap-4">
          <img src={competition.images[0]} alt="" className="h-20 w-28 rounded-lg object-cover" />
          <div>
            <h1 className="text-2xl font-extrabold text-white">{competition.title}</h1>
            <p className="text-white/50 text-sm mt-1">{competition.tagline}</p>
            <span className="mt-2 inline-block rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-semibold capitalize text-white/70">
              {competition.status}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setEditOpen((v) => !v)}
            className="rounded-md border border-white/15 px-4 py-2 text-sm font-semibold text-white hover:bg-white/5"
          >
            {editOpen ? 'Close edit' : 'Edit'}
          </button>
          {competition.status === 'live' && (
            <button
              onClick={() => setStatus('paused')}
              className="rounded-md border border-gold-500/40 px-4 py-2 text-sm font-semibold text-gold-400 hover:bg-gold-500/10"
            >
              Pause
            </button>
          )}
          {competition.status === 'paused' && (
            <button
              onClick={() => setStatus('live')}
              className="rounded-md border border-emerald-400/40 px-4 py-2 text-sm font-semibold text-emerald-400 hover:bg-emerald-400/10"
            >
              Resume
            </button>
          )}
          {competition.status !== 'ended' && (
            <button
              onClick={requestEnd}
              className="rounded-md border border-red-500/40 px-4 py-2 text-sm font-semibold text-red-400 hover:bg-red-500/10"
            >
              End
            </button>
          )}
        </div>
      </div>

      <ConfirmModal
        open={confirmAction !== null}
        title={confirmAction === 'draw' ? 'Run the live draw?' : 'End this competition?'}
        body={
          confirmAction === 'draw'
            ? `This will pick a random winning ticket number from all ${sold.toLocaleString()} tickets sold for "${competition.title}" and end the competition. This can't be undone in this demo.`
            : `"${competition.title}" will be marked as ended without a winner being drawn.`
        }
        confirmLabel={confirmAction === 'draw' ? 'Run draw' : 'End competition'}
        danger={confirmAction === 'end'}
        onConfirm={handleConfirm}
        onCancel={() => setConfirmAction(null)}
      />

      {editOpen && <EditForm competition={competition} onDone={() => setEditOpen(false)} />}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 mb-8">
        <Stat label="Tickets sold" value={`${sold.toLocaleString()} (${percent}%)`} />
        <Stat label="Total tickets" value={competition.totalTickets.toLocaleString()} />
        <Stat label="Ticket price" value={formatGBP(competition.ticketPrice)} />
        <Stat label="Revenue so far" value={formatGBP(revenue)} accent />
      </div>

      <div className="rounded-xl border border-gold-500/30 bg-navy-800 p-6 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-white mb-1">Run draw</h2>
            <p className="text-sm text-white/50">
              Picks a verified-random winning ticket number from all {sold.toLocaleString()} tickets
              sold and ends the competition.
            </p>
          </div>
          <button
            onClick={requestRunDraw}
            disabled={!!draw || sold < 1}
            className="shrink-0 rounded-md bg-gradient-to-r from-red-600 to-red-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-red-600/20 hover:brightness-110 transition disabled:opacity-40"
          >
            {draw ? 'Draw complete' : '🎲 Run draw now'}
          </button>
        </div>
        {draw && (
          <div className="mt-5 rounded-lg border border-white/10 bg-navy-900 p-5 text-center">
            <p className="text-xs uppercase tracking-wide text-gold-400 font-semibold mb-2">Winning ticket</p>
            <p className="font-mono text-2xl font-bold text-white mb-2">{draw.winningTicketNumber}</p>
            <p className="text-sm text-white/60">
              Won by <span className="text-white font-semibold">{draw.winnerName}</span>
              {draw.isDemo && <span className="text-gold-400"> (demo user)</span>}
            </p>
            <p className="text-xs text-white/30 mt-1">Drawn {formatDateTime(draw.drawnAt)}</p>
          </div>
        )}
      </div>

      <div>
        <h2 className="text-base font-bold text-white mb-4">
          Entrants <span className="text-white/40 font-normal">({entrants.length} shown)</span>
        </h2>
        {/* Future: small empty-state illustration here instead of plain text;
            also revisit stat card styling and table density across /admin
            for a more designed, less "default dashboard" feel. */}
        {entrants.length === 0 ? (
          <p className="text-white/40 text-sm">No entrants yet.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-white/10 bg-navy-800">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-white/40">
                  <th className="px-5 py-3.5 font-medium">Name</th>
                  <th className="px-5 py-3.5 font-medium">Ticket numbers</th>
                  <th className="px-5 py-3.5 font-medium">Qty</th>
                  <th className="px-5 py-3.5 font-medium">Purchased</th>
                </tr>
              </thead>
              <tbody>
                {entrants.map((e) => (
                  <tr key={e.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                    <td className="px-5 py-3.5 text-white">
                      {e.name}
                      {e.isDemo && <span className="ml-2 text-xs text-gold-400">(demo)</span>}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex flex-wrap gap-1 max-w-md">
                        {e.ticketNumbers.slice(0, 6).map((n) => (
                          <span key={n} className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-xs text-white/60">
                            {n}
                          </span>
                        ))}
                        {e.ticketNumbers.length > 6 && (
                          <span className="text-xs text-white/30">+{e.ticketNumbers.length - 6} more</span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-white/60">{e.quantity}</td>
                    <td className="px-5 py-3.5 text-white/60">{formatDateTime(e.purchaseDate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value, accent }) {
  return (
    <div className="rounded-xl border border-white/10 bg-navy-800 p-5">
      <p className="text-xs uppercase tracking-wide text-white/40 mb-2">{label}</p>
      <p className={`text-xl font-extrabold ${accent ? 'text-gold-400' : 'text-white'}`}>{value}</p>
    </div>
  );
}

function EditForm({ competition, onDone }) {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({
    title: competition.title,
    tagline: competition.tagline,
    description: competition.description,
    ticketPrice: competition.ticketPrice,
    totalTickets: competition.totalTickets,
    drawDate: competition.drawDate.slice(0, 16),
    maxTicketsPerOrder: competition.maxTicketsPerOrder,
  });

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const save = (e) => {
    e.preventDefault();
    dispatch({
      type: 'UPDATE_COMPETITION',
      id: competition.id,
      patch: {
        title: form.title,
        tagline: form.tagline,
        description: form.description,
        ticketPrice: Number(form.ticketPrice),
        totalTickets: Number(form.totalTickets),
        drawDate: new Date(form.drawDate).toISOString(),
        maxTicketsPerOrder: Number(form.maxTicketsPerOrder),
      },
    });
    onDone();
  };

  return (
    <form onSubmit={save} className="rounded-xl border border-white/10 bg-navy-800 p-6 mb-8 space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Prize name">
          <input value={form.title} onChange={update('title')} className={inputClass()} />
        </Field>
        <Field label="Tagline">
          <input value={form.tagline} onChange={update('tagline')} className={inputClass()} />
        </Field>
      </div>
      <Field label="Description">
        <textarea value={form.description} onChange={update('description')} rows={3} className={inputClass()} />
      </Field>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Field label="Ticket price (£)">
          <input type="number" step="0.01" value={form.ticketPrice} onChange={update('ticketPrice')} className={inputClass()} />
        </Field>
        <Field label="Total tickets">
          <input type="number" value={form.totalTickets} onChange={update('totalTickets')} className={inputClass()} />
        </Field>
        <Field label="Draw date">
          <input type="datetime-local" value={form.drawDate} onChange={update('drawDate')} className={inputClass()} />
        </Field>
        <Field label="Max per order">
          <input type="number" value={form.maxTicketsPerOrder} onChange={update('maxTicketsPerOrder')} className={inputClass()} />
        </Field>
      </div>
      <button
        type="submit"
        className="rounded-md bg-gradient-to-r from-red-600 to-red-500 px-5 py-2.5 text-sm font-bold text-white hover:brightness-110 transition"
      >
        Save changes
      </button>
    </form>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-white/70 mb-1.5">{label}</span>
      {children}
    </label>
  );
}

function inputClass() {
  return 'w-full rounded-md border border-white/15 bg-navy-900 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-gold-500/40';
}
