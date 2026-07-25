export default function StatusBadge({ status }) {
  const isAprovado = status === 'Aprovado';

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-sm
        ${isAprovado
          ? 'bg-emerald-500/10 text-emerald-400'
          : 'bg-red-500/10 text-red-400 animate-blink'
        }
      `}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${isAprovado ? 'bg-emerald-400' : 'bg-red-400'}`} />
      {status}
    </span>
  );
}
