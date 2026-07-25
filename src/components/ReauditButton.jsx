import { useState } from 'react';
import { solicitarReauditoria } from '../services/api';

export default function ReauditButton({ produtor }) {
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState(null);

  const handleReauditoria = async () => {
    setLoading(true);
    setSucesso(false);
    setErro(null);

    try {
      await solicitarReauditoria({
        codigo_produtor: produtor.codigo_produtor,
        nome: produtor.nome,
        rota: produtor.rota,
        localizacao: produtor.localizacao,
      });
      setSucesso(true);
      setTimeout(() => setSucesso(false), 3000);
    } catch (err) {
      setErro('Falha ao solicitar re-auditoria');
      setTimeout(() => setErro(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleReauditoria}
      disabled={loading}
      className={`
        w-full py-2 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all
        ${sucesso
          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
          : erro
            ? 'bg-red-500/15 text-red-400 border border-red-500/20'
            : 'bg-white/5 text-neutral-400 border border-white/10 hover:bg-white/10 hover:text-white'
        }
        disabled:opacity-40 disabled:cursor-not-allowed
      `}
    >
      {loading
        ? 'Enviando...'
        : sucesso
          ? 'Solicitado'
          : erro
            ? 'Erro'
            : 'Solicitar Re-auditoria'}
    </button>
  );
}
