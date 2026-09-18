export default function ProgressBar({ percent, size = 'md' }) {
  const clamped = Math.max(0, Math.min(100, percent));
  const urgent = clamped >= 90;
  const height = size === 'sm' ? 'h-1.5' : 'h-2';
  return (
    <div className={`w-full rounded-full bg-white/10 ${height} overflow-hidden`}>
      <div
        className={`${height} rounded-full transition-all duration-500 ${
          urgent
            ? 'bg-gradient-to-r from-red-600 to-red-500'
            : 'bg-gradient-to-r from-gold-500 to-gold-400'
        }`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
