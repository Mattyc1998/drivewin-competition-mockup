// Seed / mock data for the demo. In a real build this would come from the backend.
const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=80`;

const now = new Date('2026-09-18T09:00:00Z');
const daysFromNow = (d, h = 18) => {
  const dt = new Date(now);
  dt.setUTCDate(dt.getUTCDate() + d);
  dt.setUTCHours(h, 0, 0, 0);
  return dt.toISOString();
};
const daysAgo = (d) => daysFromNow(-d, 9);

export const CATEGORY_LABEL = {
  car: 'Car',
  bike: 'Motorbike',
  cash: 'Cash Alternative',
};

// ticketsSoldBase = fake baseline entries that already exist before the demo starts.
// Real demo purchases made via checkout are layered on top with sequential ticket numbers.
//
// Prize photos below are verified per-vehicle (checked against visible badges/model cues,
// not just search-term relevance) so the gallery always matches the stated make and model.
export const INITIAL_COMPETITIONS = [
  {
    id: 'c1',
    slug: 'range-rover-sport-autobiography',
    category: 'car',
    featured: true,
    title: 'Range Rover Sport Autobiography',
    tagline: 'P440e Plug-in Hybrid · 20" Alloys · Full Nappa Leather',
    location: 'Delivered to your door, UK mainland',
    cashAlt: 68000,
    createdAt: daysAgo(0),
    images: [
      img('photo-1679506640590-f0152786dff0'),
      img('photo-1602013871952-8379f19a15f1'),
      img('photo-1638686302275-0e87df720aca'),
    ],
    description:
      "Step into the new Range Rover Sport Autobiography — the pinnacle of modern luxury SUV design. Finished in Batumi Gold with a full Nappa leather interior, this plug-in hybrid delivers effortless performance alongside genuine everyday usability. One lucky winner will drive away in this exact vehicle, fully taxed and ready to collect (or we'll deliver it to your door, UK mainland).",
    ticketPrice: 2.99,
    totalTickets: 25000,
    ticketsSoldBase: 11250, // 45%
    drawDate: daysFromNow(9),
    status: 'live',
    maxTicketsPerOrder: 50,
  },
  {
    id: 'c2',
    slug: 'porsche-911-carrera-gts',
    category: 'car',
    featured: false,
    title: 'Porsche 911 Carrera GTS',
    tagline: '480bhp · 0-62 in 3.3s · Racing White',
    location: 'Delivered to your door, UK mainland',
    cashAlt: 129000,
    createdAt: daysAgo(3),
    images: [
      img('photo-1614162692292-7ac56d7f7f1e'),
      img('photo-1613921568536-555645be4032'),
      img('photo-1624880056139-d1212d7ff347'),
    ],
    description:
      'An icon of the road. This 911 Carrera GTS pairs a twin-turbo flat-six with razor-sharp handling and one of the most recognisable silhouettes in motoring. Fully loaded with the Sport Chrono Package and carbon-fibre interior trim — this is the ultimate weekend driver.',
    ticketPrice: 4.49,
    totalTickets: 30000,
    ticketsSoldBase: 23400, // 78%
    drawDate: daysFromNow(4),
    status: 'live',
    maxTicketsPerOrder: 50,
  },
  {
    id: 'c3',
    slug: 'ducati-panigale-v4s',
    category: 'bike',
    featured: false,
    title: 'Ducati Panigale V4S',
    tagline: '214bhp · Ohlins Smart EC 2.0 · Ducati Red',
    location: 'Delivered to your nearest dealer, UK mainland',
    cashAlt: 28000,
    createdAt: daysAgo(6),
    images: [
      img('photo-1615812595024-43ac7a9c0586'),
      img('photo-1610579552025-ea146ae69356'),
      img('photo-1615172282427-9a57ef2d142e'),
    ],
    description:
      'The most powerful production Ducati ever built. The Panigale V4S combines MotoGP-derived aerodynamics with electronic suspension that reads the road in real time. This is a bike built for riders who want the absolute cutting edge — and now it could be yours for the price of a coffee.',
    ticketPrice: 1.99,
    totalTickets: 18000,
    ticketsSoldBase: 2160, // 12%
    drawDate: daysFromNow(14),
    status: 'live',
    maxTicketsPerOrder: 50,
  },
  {
    id: 'c4',
    slug: 'bmw-m4-competition',
    category: 'car',
    featured: false,
    title: 'BMW M4 Competition xDrive',
    tagline: '503bhp · Matte Black · Carbon Roof',
    location: 'Delivered to your door, UK mainland',
    cashAlt: 89000,
    createdAt: daysAgo(9),
    images: [
      img('photo-1616591938203-9b5630a01006'),
      img('photo-1594051673969-172a6f721d3c'),
      img('photo-1626381958625-f4e4ea343925'),
    ],
    description:
      "Head-turning presence, all-wheel-drive traction and a twin-turbo straight-six that pulls hard right to the redline. This M4 Competition is finished in a deep matte black with a full carbon exterior pack — and this draw is nearly full, so ticket numbers are going fast.",
    ticketPrice: 3.49,
    totalTickets: 22000,
    ticketsSoldBase: 20900, // 95%
    drawDate: daysFromNow(2),
    status: 'live',
    maxTicketsPerOrder: 30,
  },
  {
    id: 'c5',
    slug: 'triumph-street-triple-rs',
    category: 'bike',
    featured: false,
    title: 'Triumph Street Triple 765 RS',
    tagline: '128bhp · Moto2-derived triple · Crystal White',
    location: 'Delivered to your nearest dealer, UK mainland',
    cashAlt: 12500,
    createdAt: daysAgo(12),
    images: [
      img('photo-1682755590631-fdeeee42257f'),
      img('photo-1682755590645-edcec7d55fd8'),
      img('photo-1682755590694-ccfed711a4d9'),
    ],
    description:
      "British engineering at its finest. The Street Triple RS is razor-sharp through corners and effortless day to day, powered by the same triple-cylinder platform developed alongside Moto2. A brilliant all-rounder for new and experienced riders alike.",
    ticketPrice: 1.49,
    totalTickets: 15000,
    ticketsSoldBase: 3000, // 20%
    drawDate: daysFromNow(11),
    status: 'live',
    maxTicketsPerOrder: 50,
  },
  {
    id: 'c6',
    slug: '10000-cash-alternative',
    category: 'cash',
    featured: false,
    title: '£10,000 Instant Cash Alternative',
    tagline: 'Take the winnings, or put it towards any car on site',
    location: 'Paid directly to your bank account',
    cashAlt: 10000,
    createdAt: daysAgo(15),
    images: [
      img('photo-1607166602071-847b7d110781'),
      img('photo-1700047614820-0f32080db6f8'),
      img('photo-1580971266928-ff5d40c194a7'),
    ],
    description:
      "Prefer cash in hand? This draw gives you a straight £10,000, paid directly to your bank account within 48 hours of the live draw. No waiting on delivery, no collection — just a clean transfer so you can spend it however you like.",
    ticketPrice: 0.99,
    totalTickets: 40000,
    ticketsSoldBase: 24000, // 60%
    drawDate: daysFromNow(6),
    status: 'live',
    maxTicketsPerOrder: 100,
  },
];

export function ticketsSoldTotal(comp, demoEntrantsCount) {
  return comp.ticketsSoldBase + (demoEntrantsCount || 0);
}

export function percentSold(comp, demoEntrantsCount) {
  const sold = ticketsSoldTotal(comp, demoEntrantsCount);
  return Math.min(100, Math.round((sold / comp.totalTickets) * 100));
}

export function formatTicketNumber(compId, n) {
  return `${compId.toUpperCase()}-${String(n).padStart(5, '0')}`;
}

// The newest live competition genuinely is the one to badge as "just launched" —
// ties the homepage hero badge to real data instead of a hardcoded claim.
export function isNewestLive(comp, allCompetitions) {
  const live = allCompetitions.filter((c) => c.status === 'live' && c.createdAt);
  if (live.length === 0) return false;
  const newest = live.reduce((a, b) => (new Date(a.createdAt) > new Date(b.createdAt) ? a : b));
  return newest.id === comp.id;
}
