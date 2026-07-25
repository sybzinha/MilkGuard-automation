import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-neutral-900 border border-neutral-700 rounded-sm px-3 py-2 text-xs">
      <p className="font-semibold text-white">{d.nome}</p>
      <p className="text-neutral-400 mt-0.5">{d.codigo} — {d.hora}</p>
      <p className="text-amber-400 font-bold mt-1">{d.temperatura}°C</p>
    </div>
  );
}

export default function TemperatureChart({ produtores }) {
  const dados = produtores.map((p) => ({
    nome: p.nome,
    codigo: p.codigo_produtor,
    temperatura: parseFloat(p.ultima_temperatura),
    hora: new Date(p.data_verificacao).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    }),
  }));

  return (
    <div className="bg-neutral-800 rounded-sm p-5">
      <div className="flex items-baseline gap-3 mb-5">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-neutral-200">Histórico de Temperatura</h2>
        <span className="text-[10px] text-neutral-400">última leitura</span>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={dados}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis
            dataKey="codigo"
            tick={{ fill: '#a3a3a3', fontSize: 11 }}
            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#a3a3a3', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            domain={[0, 8]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="temperatura"
            stroke="#f59e0b"
            strokeWidth={2}
            dot={{ fill: '#f59e0b', r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5, fill: '#fbbf24', strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
