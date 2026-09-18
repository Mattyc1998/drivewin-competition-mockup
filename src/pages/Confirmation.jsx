import { Link, Navigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import { useAppState } from '../store/AppContext.jsx';
import { formatGBP, formatDateTime } from '../utils/format.js';

export default function Confirmation() {
  const { slug } = useParams();
  const { lastOrder, competitions } = useAppState();
  const competition = competitions.find((c) => c.slug === slug);

  if (!competition || !lastOrder || lastOrder.competitionId !== competition.id) {
    return <Navigate to="/my-tickets" replace />;
  }

  return (
    <Layout>
      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/15 text-3xl">
            ✅
          </div>
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">You're entered!</h1>
          <p className="mt-2 text-white/55">
            Order <span className="text-white/80 font-medium">{lastOrder.orderId}</span> confirmed
            for <span className="text-white/80 font-medium">{competition.title}</span>
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-gold-500/30 bg-gradient-to-b from-gold-500/10 to-transparent p-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-400 mb-4">
            {lastOrder.ticketNumbers.length > 1 ? 'Your ticket numbers' : 'Your ticket number'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {lastOrder.ticketNumbers.map((num) => (
              <span
                key={num}
                className="rounded-lg border border-gold-500/40 bg-navy-950 px-4 py-3 font-mono text-lg font-bold tracking-wider text-gold-400 sm:text-xl"
              >
                {num}
              </span>
            ))}
          </div>
          <p className="mt-5 text-xs text-white/40">
            Keep a note of your ticket number{lastOrder.ticketNumbers.length > 1 ? 's' : ''} — the
            winning number will be drawn live and published on our Winners page.
          </p>
        </div>

        <div className="mt-10 rounded-xl border border-white/10 bg-navy-800 p-6">
          <h2 className="text-base font-bold text-white mb-4">Order summary</h2>
          <div className="flex gap-3">
            <img
              src={competition.images[0]}
              alt=""
              className="h-16 w-20 shrink-0 rounded-md object-cover"
            />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">{competition.title}</p>
              <p className="text-xs text-white/45">Draw: {formatDateTime(competition.drawDate)}</p>
            </div>
          </div>
          <div className="mt-5 space-y-2 border-t border-white/10 pt-4 text-sm">
            <Row label="Order ID" value={lastOrder.orderId} />
            <Row label="Tickets purchased" value={lastOrder.quantity} />
            <Row label="Price per ticket" value={formatGBP(lastOrder.unitPrice)} />
            <Row label="Purchased" value={formatDateTime(lastOrder.purchaseDate)} />
          </div>
          <div className="mt-4 flex justify-between border-t border-white/10 pt-4">
            <span className="font-semibold text-white">Total paid</span>
            <span className="text-xl font-extrabold text-white">{formatGBP(lastOrder.total)}</span>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/my-tickets"
            className="flex-1 rounded-md bg-gradient-to-r from-red-600 to-red-500 py-3.5 text-center text-sm font-bold text-white shadow-lg shadow-red-600/20 hover:brightness-110 transition"
          >
            View my tickets
          </Link>
          <Link
            to="/competitions"
            className="flex-1 rounded-md border border-white/15 py-3.5 text-center text-sm font-semibold text-white hover:bg-white/5 transition"
          >
            Enter another competition
          </Link>
        </div>
      </section>
    </Layout>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between text-white/60">
      <span>{label}</span>
      <span className="text-white/80">{value}</span>
    </div>
  );
}
