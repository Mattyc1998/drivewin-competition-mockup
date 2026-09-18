import { Link } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import HowItWorksSteps from '../components/HowItWorksSteps.jsx';

const FAQS = [
  {
    q: 'Is this gambling?',
    a: "No. DriveWin runs skill-based prize competitions, not a lottery. Every entry requires answering a qualifying question correctly (in the full product) and there's always a free postal entry route, as required by UK law for competitions of this kind.",
  },
  {
    q: 'How are winners picked?',
    a: 'Every ticket sold is assigned a unique, sequential number. Once a competition closes — either by selling out or reaching its draw date — we use a verified random number generator to draw one winning ticket number live on camera.',
  },
  {
    q: 'When do I get my ticket number?',
    a: 'Instantly. The moment your payment is confirmed, your ticket number(s) are generated and shown on your confirmation screen, plus emailed to you and saved under My Tickets.',
  },
  {
    q: 'What happens if a competition doesn’t sell out?',
    a: 'Every competition has a guaranteed draw date. If it hasn’t sold out by then, the draw still goes ahead as scheduled from the tickets sold.',
  },
  {
    q: 'Can I enter more than once?',
    a: 'Yes — you can buy as many tickets as you like for a competition (up to the per-order limit shown on the page), which increases your number of unique entries, not your odds on a single ticket.',
  },
  {
    q: 'How do I claim my prize if I win?',
    a: "We contact winners directly by phone and email using the details provided at entry, and the win is published on our Winners page. Vehicles are delivered or available for collection; cash alternatives are paid directly to your bank.",
  },
];

export default function HowItWorks() {
  return (
    <Layout>
      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">How It Works</h1>
        <p className="mt-3 text-white/55 max-w-2xl mx-auto">
          A simple, transparent process from browsing a competition to a winning ticket number.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <HowItWorksSteps />
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-white/10 bg-navy-800 p-8">
          <h2 className="text-xl font-bold text-white mb-4">The ticket &amp; draw mechanic</h2>
          <div className="space-y-4 text-sm text-white/60 leading-relaxed">
            <p>
              Every competition has a fixed pool of numbered tickets — for example, a competition
              with 25,000 total tickets has ticket numbers 00001 through 25000. When you buy tickets,
              you're assigned the next available number(s) in sequence, so no two entrants ever hold
              the same number.
            </p>
            <p>
              Once the competition's draw date arrives (or every ticket sells out, whichever comes
              first), we run the draw live. A random number generator selects one winning ticket
              number from the full pool of tickets sold. Whoever holds that number wins the prize
              outright.
            </p>
            <p>
              All draws are recorded and the result — including the winning ticket number and
              winner's name/initials — is published on our{' '}
              <Link to="/winners" className="text-gold-400 hover:text-gold-300">
                Winners page
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-white mb-6 text-center">Frequently asked questions</h2>
        <div className="space-y-3">
          {FAQS.map((f) => (
            <details
              key={f.q}
              className="group rounded-xl border border-white/10 bg-navy-800 px-5 py-4 open:border-gold-500/30"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-white">
                {f.q}
                <span className="ml-4 shrink-0 text-white/30 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-white/55 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </Layout>
  );
}
