import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import { useCompetition, useAppDispatch, DEMO_USER } from '../store/AppContext.jsx';
import { formatGBP } from '../utils/format.js';
import { VisaMark, MastercardMark, AmexMark } from '../components/icons/CardBrandIcons.jsx';

function formatCardNumber(v) {
  return v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
}
function formatExpiry(v) {
  const digits = v.replace(/\D/g, '').slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export default function Checkout() {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const competition = useCompetition(slug);

  const quantity = location.state?.quantity || 1;

  const [form, setForm] = useState({
    name: DEMO_USER.name,
    email: DEMO_USER.email,
    cardNumber: '',
    expiry: '',
    cvc: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  if (!competition) return <Navigate to="/competitions" replace />;
  if (competition.status === 'ended') return <Navigate to={`/competitions/${slug}`} replace />;

  const total = +(quantity * competition.ticketPrice).toFixed(2);

  const update = (field) => (e) => {
    let value = e.target.value;
    if (field === 'cardNumber') value = formatCardNumber(value);
    if (field === 'expiry') value = formatExpiry(value);
    if (field === 'cvc') value = value.replace(/\D/g, '').slice(0, 4);
    setForm((f) => ({ ...f, [field]: value }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Enter the name on the card';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Enter a valid email';
    const digits = form.cardNumber.replace(/\s/g, '');
    if (digits.length !== 16) errs.cardNumber = 'Card number must be 16 digits';
    if (!/^\d{2}\/\d{2}$/.test(form.expiry)) {
      errs.expiry = 'Use MM/YY format';
    } else {
      const [mm, yy] = form.expiry.split('/').map(Number);
      if (mm < 1 || mm > 12) errs.expiry = 'Invalid month';
    }
    if (form.cvc.length < 3) errs.cvc = 'CVC must be 3-4 digits';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    // Simulated payment — no real processor is called in this demo.
    setTimeout(() => {
      dispatch({ type: 'BUY_TICKETS', competitionId: competition.id, quantity });
      navigate(`/confirmation/${competition.slug}`);
    }, 900);
  };

  return (
    <Layout>
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <nav className="text-sm text-white/40 mb-6">
          <Link to={`/competitions/${competition.slug}`} className="hover:text-white">
            {competition.title}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white/70">Checkout</span>
        </nav>
        <h1 className="text-3xl font-extrabold text-white mb-8">Checkout</h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-6">
            <div className="rounded-xl border border-white/10 bg-navy-800 p-6">
              <h2 className="text-base font-bold text-white mb-4">Contact details</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Full name" error={errors.name}>
                  <input
                    value={form.name}
                    onChange={update('name')}
                    className={inputClass(errors.name)}
                  />
                </Field>
                <Field label="Email address" error={errors.email}>
                  <input
                    type="email"
                    value={form.email}
                    onChange={update('email')}
                    className={inputClass(errors.email)}
                  />
                </Field>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-navy-800 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-white">Payment details</h2>
                <span className="text-xs text-white/40">🔒 Simulated — no real charge</span>
              </div>
              <div className="mb-4 flex items-center gap-2">
                <VisaMark className="rounded" />
                <MastercardMark className="rounded" />
                <AmexMark className="rounded" />
              </div>
              <div className="space-y-4">
                <Field label="Card number" error={errors.cardNumber}>
                  <input
                    inputMode="numeric"
                    placeholder="4242 4242 4242 4242"
                    value={form.cardNumber}
                    onChange={update('cardNumber')}
                    className={inputClass(errors.cardNumber)}
                  />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Expiry (MM/YY)" error={errors.expiry}>
                    <input
                      placeholder="12/28"
                      value={form.expiry}
                      onChange={update('expiry')}
                      className={inputClass(errors.expiry)}
                    />
                  </Field>
                  <Field label="CVC" error={errors.cvc}>
                    <input
                      inputMode="numeric"
                      placeholder="123"
                      value={form.cvc}
                      onChange={update('cvc')}
                      className={inputClass(errors.cvc)}
                    />
                  </Field>
                </div>
              </div>
              <p className="mt-4 text-xs text-white/30 leading-relaxed">
                This is a concept demo. Card details are validated for format only and never sent
                anywhere — no real payment processor is integrated.
              </p>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-md bg-gradient-to-r from-red-600 to-red-500 py-4 text-base font-bold text-white shadow-lg shadow-red-600/20 hover:brightness-110 transition disabled:opacity-60"
            >
              {submitting ? 'Processing payment…' : `Pay ${formatGBP(total)} & enter`}
            </button>
          </form>

          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-24 rounded-xl border border-white/10 bg-navy-800 p-6">
              <h2 className="text-base font-bold text-white mb-4">Order summary</h2>
              <div className="flex gap-3">
                <img
                  src={competition.images[0]}
                  alt=""
                  className="h-16 w-20 shrink-0 rounded-md object-cover"
                />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{competition.title}</p>
                  <p className="text-xs text-white/45">{formatGBP(competition.ticketPrice)} / ticket</p>
                </div>
              </div>
              <div className="mt-5 space-y-2 border-t border-white/10 pt-4 text-sm">
                <div className="flex justify-between text-white/60">
                  <span>Tickets</span>
                  <span>× {quantity}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Price per ticket</span>
                  <span>{formatGBP(competition.ticketPrice)}</span>
                </div>
              </div>
              <div className="mt-4 flex justify-between border-t border-white/10 pt-4">
                <span className="font-semibold text-white">Total</span>
                <span className="text-xl font-extrabold text-white">{formatGBP(total)}</span>
              </div>
              <div className="mt-5 flex items-center gap-2 text-xs text-white/40">
                <span>🔒</span>
                <span>Secured checkout · Ticket numbers issued instantly on payment</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-white/70 mb-1.5">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-400">{error}</span>}
    </label>
  );
}

function inputClass(error) {
  return `w-full rounded-md border bg-navy-900 px-3.5 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-2 ${
    error ? 'border-red-500 focus:ring-red-500/40' : 'border-white/15 focus:ring-gold-500/40'
  }`;
}
