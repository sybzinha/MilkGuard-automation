import StatusBadge from './StatusBadge';
import ReauditButton from './ReauditButton';

function InfoRow({ icon, children }) {
  return (
    <div className="flex items-center gap-2 text-xs text-neutral-400">
      <span className="text-neutral-600">{icon}</span>
      <span className="truncate">{children}</span>
    </div>
  );
}

export default function ProducerCard({ produtor }) {
  const {
    codigo_produtor,
    nome,
    localizacao,
    rota,
    ultima_temperatura,
    data_verificacao,
    status_compliance,
  } = produtor;

  const temp = parseFloat(ultima_temperatura);
  const isHigh = temp > 4;

  const dataFormatada = new Date(data_verificacao).toLocaleString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="bg-neutral-900/95 rounded-sm overflow-hidden">
      <div className={`h-0.5 ${isHigh ? 'bg-red-500' : 'bg-emerald-500'}`} />
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-[10px] font-mono text-neutral-600 uppercase tracking-wider">{codigo_produtor}</p>
            <h3 className="text-base font-bold text-white mt-0.5">{nome}</h3>
          </div>
          <StatusBadge status={status_compliance} />
        </div>

        <div className="flex items-baseline gap-6 mb-4">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-neutral-500 mb-0.5">Temperatura</p>
            <p className={`text-2xl font-black tabular-nums ${isHigh ? 'text-red-400' : 'text-emerald-400'}`}>
              {temp.toFixed(1)}<span className="text-sm font-medium">°C</span>
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-neutral-500 mb-0.5">Rota</p>
            <p className="text-sm font-semibold text-neutral-200">{rota}</p>
          </div>
        </div>

        <div className="space-y-1.5 mb-4 pt-3 border-t border-white/5">
          <InfoRow icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>}>
            {localizacao}
          </InfoRow>
          <InfoRow icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}>
            {dataFormatada}
          </InfoRow>
        </div>

        <ReauditButton produtor={produtor} />
      </div>
    </div>
  );
}
