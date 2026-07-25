import { useState, useEffect } from "react";
import { getProdutores } from "../services/api";
import ProducerCard from "./ProducerCard";
import TemperatureChart from "./TemperatureChart";

function StatBlock({ label, value, color = "text-white" }) {
  return (
    <div className="bg-neutral-900/80 border border-neutral-700/30 rounded-sm px-4 py-2 text-center">
      <p className={`text-xl font-bold tabular-nums ${color}`}>{value}</p>
      <p className="text-[10px] uppercase tracking-widest text-neutral-500 mt-0.5">{label}</p>
    </div>
  );
}

export default function Dashboard() {
  const [produtores, setProdutores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProdutores();
        setProdutores(Array.isArray(data) ? data : [data]);
      } catch (err) {
        setErro(
          "Erro ao conectar com o backend. Verifique se o n8n está rodando.",
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const totalBloqueados = produtores.filter(
    (p) => p.status_compliance === "Bloqueado",
  ).length;
  const totalAprovados = produtores.filter(
    (p) => p.status_compliance === "Aprovado",
  ).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-neutral-700 border-t-amber-500 rounded-full animate-spin mx-auto" />
          <p className="text-neutral-500 mt-4 text-sm tracking-wide">Carregando dados...</p>
        </div>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="text-center p-8 bg-neutral-900 rounded-sm max-w-md">
          <p className="text-red-400 text-sm font-semibold uppercase tracking-wider">Erro</p>
          <p className="text-neutral-400 mt-2">{erro}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-neutral-800 text-white text-sm rounded-sm hover:bg-neutral-700 transition"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-white">
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/bgcow2.jpg')" }}
      />
      <div className="fixed inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-5 py-10 md:py-16">
        <header className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
              <path d="M18 2L4 9v9c0 8.4 5.96 16.24 14 18 8.04-1.76 14-9.6 14-18V9L18 2z" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M18 10c0 0-5 4.5-5 8a5 5 0 0 0 10 0c0-3.5-5-8-5-8z" fill="#f59e0b"/>
            </svg>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400" style={{ textShadow: '0 0 12px rgba(245,158,11,0.4)' }}>MilkGuard</span>
          </div>
          <h1
            className="text-3xl md:text-4xl font-black tracking-tight text-white"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.95), 0 0 60px rgba(0,0,0,0.6)' }}
          >
            Painel de Monitoramento
          </h1>
          <p
            className="text-neutral-200 mt-2 text-sm"
            style={{ textShadow: '0 1px 10px rgba(0,0,0,0.95)' }}
          >
            Conformidade de produtores leiteiros em tempo real
          </p>

          <div className="grid grid-cols-3 gap-3 mt-6 pt-5 border-t border-white/5 max-w-sm mx-auto">
            <StatBlock label="Total" value={produtores.length} />
            <StatBlock label="Aprovados" value={totalAprovados} color="text-emerald-400" />
            <StatBlock label="Bloqueados" value={totalBloqueados} color="text-red-500" />
          </div>
        </header>

        <section className="mb-10">
          <TemperatureChart produtores={produtores} />
        </section>

        <section>
          <div className="flex items-baseline gap-3 mb-5">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-neutral-200" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.8)' }}>Produtores</h2>
            <span className="text-xs text-neutral-400">{produtores.length} registros</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {produtores.map((p) => (
              <ProducerCard key={p.codigo_produtor} produtor={p} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
