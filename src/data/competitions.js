// Seed / mock data for the demo. In a real build this would come from the backend.
const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=80`;

const now = new Date('2026-09-18T09:00:00Z');
const daysFromNow = (d, h = 18) => {
  const dt = new Date(now);
  dt.setUTCDate(dt.getUTCDate() + d);
  dt.setUTCHours(h, 0, 0, 0);
  return dt.toISOString();
};

export const CATEGORY_LABEL = {
  car: 'Car',
  bike: 'Motorbike',
  cash: 'Cash Alternative',
};

// ticketsSoldBase = fake baseline entries that already exist before the demo starts.
// Real demo purchases made via checkout are layered on top with sequential ticket numbers.
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
    images: [
      img('photo-1519641471654-76ce0107ad1b'),
      img('photo-1606664515524-ed2f786a0bd6'),
      img('photo-1533473359331-0135ef1b58bf'),
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
    tagline: '480bhp · 0-62 in 3.3s · GT Silver Metallic',
    location: 'Delivered to your door, UK mainland',
    cashAlt: 129000,
    images: [
      img('photo-1503736334956-4c8f8e92946d'),
      img('photo-1503376780353-7e6692767b70'),
      img('photo-1580273916550-e323be2ae537'),
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
    tagline: '214bhp · Ohlins Smart EC 2.0 · Winter Test Livery',
    location: 'Delivered to your nearest dealer, UK mainland',
    cashAlt: 28000,
    images: [
      img('photo-1558981806-ec527fa84c39'),
      img('photo-1599819811279-d5ad9cccf838'),
      img('photo-1591637333184-19aa84b3e01f'),
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
    tagline: '503bhp · Isle of Man Green · Carbon Roof',
    location: 'Delivered to your door, UK mainland',
    cashAlt: 89000,
    images: [
      img('photo-1555215695-3004980ad54e'),
      img('photo-1617531653332-bd46c24f2068'),
      img('photo-1617814076367-b759c7d7e738'),
    ],
    description:
      "Head-turning presence, all-wheel-drive traction and a twin-turbo straight-six that pulls hard right to the redline. This M4 Competition is finished in the striking Isle of Man Green with a full carbon exterior pack — and this draw is nearly full, so ticket numbers are going fast.",
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
    tagline: '128bhp · Moto2-derived triple · Sapphire Black',
    location: 'Delivered to your nearest dealer, UK mainland',
    cashAlt: 12500,
    images: [
      img('photo-1568772585407-9361f9bf3a87'),
      img('photo-1571068316344-75bc76f77890'),
      img('photo-1621939514649-280e2ee25f60'),
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
    images: [
      img('photo-1600880292203-757bb62b4baf'),
      img('photo-1600880292089-90a7e086ee0c'),
      img('photo-1554224155-6726b3ff858f'),
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
