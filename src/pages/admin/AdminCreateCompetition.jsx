import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppState } from '../../store/AppContext.jsx';

const PLACEHOLDER_IMG =
  'https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=1400&q=80';

function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default function AdminCreateCompetition() {
  const dispatch = useAppDispatch();
  const { competitions } = useAppState();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    category: 'car',
    tagline: '',
    description: '',
    ticketPrice: '',
    totalTickets: '',
    drawDate: '',
    maxTicketsPerOrder: '25',
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Prize name is required';
    if (!form.description.trim()) errs.description = 'Description is required';
    if (!form.ticketPrice || Number(form.ticketPrice) <= 0) errs.ticketPrice = 'Enter a valid ticket price';
    if (!form.totalTickets || Number(form.totalTickets) < 1) errs.totalTickets = 'Enter total ticket count';
    if (!form.drawDate) errs.drawDate = 'Pick a draw date';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const baseSlug = slugify(form.title) || 'competition';
    let slug = baseSlug;
    let n = 2;
    while (competitions.some((c) => c.slug === slug)) {
      slug = `${baseSlug}-${n++}`;
    }
    const id = `c-${Date.now().toString(36)}`;

    dispatch({
      type: 'CREATE_COMPETITION',
      competition: {
        id,
        slug,
        category: form.category,
        featured: false,
        title: form.title.trim(),
        tagline: form.tagline.trim() || 'New competition',
        location: 'Delivered UK mainland',
        createdAt: new Date().toISOString(),
        images: [imagePreview || PLACEHOLDER_IMG, PLACEHOLDER_IMG, PLACEHOLDER_IMG],
        description: form.description.trim(),
        ticketPrice: Number(form.ticketPrice),
        totalTickets: Number(form.totalTickets),
        ticketsSoldBase: 0,
        drawDate: new Date(form.drawDate).toISOString(),
        status: 'live',
        maxTicketsPerOrder: Number(form.maxTicketsPerOrder) || 25,
      },
    });

    navigate(`/admin/competitions/${id}`);
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-extrabold text-white sm:text-3xl mb-1">Create Competition</h1>
      <p className="text-white/50 mb-8">Add a new prize draw. This is mocked — nothing is uploaded to a server.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-xl border border-white/10 bg-navy-800 p-6 space-y-4">
          <Field label="Prize name" error={errors.title}>
            <input
              value={form.title}
              onChange={update('title')}
              placeholder="e.g. Aston Martin Vantage"
              className={inputClass(errors.title)}
            />
          </Field>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Category">
              <select value={form.category} onChange={update('category')} className={inputClass()}>
                <option value="car">Car</option>
                <option value="bike">Motorbike</option>
                <option value="cash">Cash Alternative</option>
              </select>
            </Field>
            <Field label="Tagline (optional)">
              <input
                value={form.tagline}
                onChange={update('tagline')}
                placeholder="e.g. 503bhp · Carbon Pack"
                className={inputClass()}
              />
            </Field>
          </div>

          <Field label="Description" error={errors.description}>
            <textarea
              value={form.description}
              onChange={update('description')}
              rows={4}
              placeholder="Describe the prize..."
              className={inputClass(errors.description)}
            />
          </Field>

          <Field label="Prize photo (mock upload)">
            <div className="flex items-center gap-4">
              <div className="h-20 w-28 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-navy-900">
                <img src={imagePreview || PLACEHOLDER_IMG} alt="" className="h-full w-full object-cover" />
              </div>
              <label className="cursor-pointer rounded-md border border-white/15 px-4 py-2 text-sm font-semibold text-white hover:bg-white/5">
                Choose file
                <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
              </label>
            </div>
          </Field>
        </div>

        <div className="rounded-xl border border-white/10 bg-navy-800 p-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Ticket price (£)" error={errors.ticketPrice}>
              <input
                type="number"
                min="0.01"
                step="0.01"
                value={form.ticketPrice}
                onChange={update('ticketPrice')}
                placeholder="2.99"
                className={inputClass(errors.ticketPrice)}
              />
            </Field>
            <Field label="Total tickets" error={errors.totalTickets}>
              <input
                type="number"
                min="1"
                value={form.totalTickets}
                onChange={update('totalTickets')}
                placeholder="20000"
                className={inputClass(errors.totalTickets)}
              />
            </Field>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Draw date" error={errors.drawDate}>
              <input
                type="datetime-local"
                value={form.drawDate}
                onChange={update('drawDate')}
                className={inputClass(errors.drawDate)}
              />
            </Field>
            <Field label="Max tickets per order">
              <input
                type="number"
                min="1"
                value={form.maxTicketsPerOrder}
                onChange={update('maxTicketsPerOrder')}
                className={inputClass()}
              />
            </Field>
          </div>
        </div>

        <button
          type="submit"
          className="rounded-md bg-gradient-to-r from-red-600 to-red-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-red-600/20 hover:brightness-110 transition"
        >
          Create competition
        </button>
      </form>
    </div>
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
