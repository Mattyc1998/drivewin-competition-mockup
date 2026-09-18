import { useEffect, useState } from 'react';
import { getCountdownParts } from '../utils/format.js';

export default function Countdown({ drawDate, compact = false, ended = false }) {
  const [parts, setParts] = useState(() => getCountdownParts(drawDate));

  useEffect(() => {
    const id = setInterval(() => setParts(getCountdownParts(drawDate)), 1000);
    return () => clearInterval(id);
  }, [drawDate]);

  if (ended || parts.done) {
    return <span className="text-sm font-semibold text-white/50">Draw closed</span>;
  }

  if (compact) {
    // Future: colour-code by urgency (red under ~24-48h, gold otherwise) so
    // draws closing soon stand out more than the uniform gold used today.
    return (
      <span className="text-sm font-semibold text-gold-400">
        {parts.days > 0 ? `${parts.days}d ${parts.hours}h` : `${parts.hours}h ${parts.minutes}m`} left
      </span>
    );
  }

  const units = [
    ['Days', parts.days],
    ['Hrs', parts.hours],
    ['Min', parts.minutes],
    ['Sec', parts.seconds],
  ];

  return (
    <div className="flex gap-2">
      {units.map(([label, value]) => (
        <div
          key={label}
          className="flex flex-col items-center justify-center rounded-lg bg-white/5 border border-white/10 px-3 py-2 min-w-[56px]"
        >
          <span className="text-xl font-bold text-white tabular-nums">
            {String(value).padStart(2, '0')}
          </span>
          <span className="text-[10px] uppercase tracking-wide text-white/40">{label}</span>
        </div>
      ))}
    </div>
  );
}
