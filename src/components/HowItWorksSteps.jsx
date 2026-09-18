const steps = [
  {
    n: '01',
    title: 'Choose a competition',
    body: 'Browse live draws for cars, bikes and cash alternatives. Every prize is real and pictured as-is.',
    icon: '🔍',
  },
  {
    n: '02',
    title: 'Buy your tickets',
    body: 'Pick how many tickets you want — from £0.99 each. Checkout takes less than a minute.',
    icon: '🎟️',
  },
  {
    n: '03',
    title: 'Get your ticket number',
    body: 'Your ticket numbers are generated instantly and emailed to you the moment you enter.',
    icon: '✅',
  },
  {
    n: '04',
    title: 'Winner drawn live',
    body: 'When the clock hits zero, we draw a winning number live and contact the winner directly.',
    icon: '🏆',
  },
];

export default function HowItWorksSteps({ compact = false }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step) => (
        <div
          key={step.n}
          className="relative rounded-xl border border-white/10 bg-navy-800 p-6 hover:border-gold-500/30 transition-colors"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">{step.icon}</span>
            <span className="text-xs font-bold text-gold-400/70 tracking-widest">{step.n}</span>
          </div>
          <h3 className="text-base font-bold text-white mb-1.5">{step.title}</h3>
          {!compact && <p className="text-sm text-white/55 leading-relaxed">{step.body}</p>}
        </div>
      ))}
    </div>
  );
}
