export default function ConfirmModal({ open, title, body, confirmLabel = 'Confirm', danger, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/80 backdrop-blur-sm px-4">
      <div className="w-full max-w-sm rounded-xl border border-white/10 bg-navy-800 p-6 shadow-2xl">
        <h3 className="text-base font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-white/60 leading-relaxed mb-6">{body}</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-md border border-white/15 py-2.5 text-sm font-semibold text-white hover:bg-white/5"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 rounded-md py-2.5 text-sm font-bold transition hover:brightness-110 ${
              danger
                ? 'bg-gradient-to-r from-red-600 to-red-500 text-white'
                : 'bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
