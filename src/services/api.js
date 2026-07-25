import axios from 'axios';

const API_BASE = 'https://bulginess-sturdily-cornball.ngrok-free.dev';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
  },
});

export async function getProdutores() {
  const { data } = await api.get('/webhook/produtores');
  return data;
}

export async function solicitarReauditoria({ codigo_produtor, nome, rota, localizacao }) {
  const { data } = await api.post('/webhook/re-auditoria', {
    codigo_produtor,
    nome,
    rota,
    localizacao,
  });
  return data;
}

export default api;
