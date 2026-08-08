// src/pages/admin/AliExpressAdmin.tsx
//
// Segue o mesmo padrão de ProdutosAdmin/CategoriasAdmin: uma página
// dentro do AdminLayout, já protegida pelo AdminRoute no router.
//
// Ajuste API_URL pra apontar pro seu backend, ou troque pelo client
// http central do projeto se vocês já tiverem um (axios, etc).

import { useState, type FormEvent } from "react";

const API_URL = "https://hikaribluwave.onrender.com";

interface ProdutoBusca {
  externalId: string;
  nome: string;
  imagem: string;
  precoOriginal: number | null;
  precoComDesconto: number | null;
  moeda: string;
  desconto: string | null;
  pedidos180d: number;
  avaliacao: number | null;
  urlOriginal: string | null;
}

export default function AliExpressAdmin() {
  const [keyword, setKeyword] = useState("");
  const [produtos, setProdutos] = useState<ProdutoBusca[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [importando, setImportando] = useState<string | null>(null);
  const [mensagem, setMensagem] = useState<string | null>(null);

  async function buscar(e: FormEvent) {
    e.preventDefault();
    if (!keyword.trim()) return;

    setCarregando(true);
    setErro(null);
    setMensagem(null);

    try {
      const resposta = await fetch(
        `${API_URL}/aliexpress/produtos?keyword=${encodeURIComponent(keyword)}`,
      );
      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dados?.erro || "Falha ao buscar produtos.");
      }

      setProdutos(dados.produtos || []);
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro desconhecido.");
      setProdutos([]);
    } finally {
      setCarregando(false);
    }
  }

  async function importar(produto: ProdutoBusca) {
    setImportando(produto.externalId);
    setErro(null);
    setMensagem(null);

    try {
      const resposta = await fetch(`${API_URL}/aliexpress/importar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: produto.urlOriginal }),
      });
      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dados?.erro || "Falha ao importar produto.");
      }

      setMensagem(`"${produto.nome}" importado com sucesso!`);
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro desconhecido.");
    } finally {
      setImportando(null);
    }
  }

  return (
    <div style={estilos.container}>
      <h1 style={estilos.titulo}>Importar produtos da AliExpress</h1>

      <form onSubmit={buscar} style={estilos.formBusca}>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Ex: mouse gamer, fone bluetooth..."
          style={estilos.input}
        />
        <button type="submit" disabled={carregando} style={estilos.botaoBuscar}>
          {carregando ? "Buscando..." : "Buscar"}
        </button>
      </form>

      {erro && <p style={estilos.erro}>{erro}</p>}
      {mensagem && <p style={estilos.sucesso}>{mensagem}</p>}

      <div style={estilos.grid}>
        {produtos.map((produto) => (
          <div key={produto.externalId} style={estilos.card}>
            <img src={produto.imagem} alt={produto.nome} style={estilos.imagem} />
            <p style={estilos.nomeProduto}>{produto.nome}</p>
            <p style={estilos.preco}>
              {produto.moeda} {produto.precoComDesconto?.toFixed(2)}
              {produto.desconto && <span style={estilos.desconto}> ({produto.desconto} off)</span>}
            </p>
            <p style={estilos.meta}>
              ⭐ {produto.avaliacao ?? "-"} · {produto.pedidos180d} pedidos
            </p>
            <button
              onClick={() => importar(produto)}
              disabled={importando === produto.externalId}
              style={estilos.botaoImportar}
            >
              {importando === produto.externalId ? "Importando..." : "Importar"}
            </button>
          </div>
        ))}
      </div>

      {!carregando && produtos.length === 0 && !erro && (
        <p style={estilos.vazio}>Busque uma palavra-chave pra ver produtos.</p>
      )}
    </div>
  );
}

const estilos: Record<string, React.CSSProperties> = {
  container: { padding: "24px", maxWidth: "1100px", margin: "0 auto" },
  titulo: { fontSize: "22px", marginBottom: "16px" },
  formBusca: { display: "flex", gap: "8px", marginBottom: "24px" },
  input: { flex: 1, padding: "10px 12px", borderRadius: "6px", border: "1px solid #ccc" },
  botaoBuscar: {
    padding: "10px 20px",
    borderRadius: "6px",
    border: "none",
    background: "#1a1a2e",
    color: "#fff",
    cursor: "pointer",
  },
  erro: { color: "#c0392b", marginBottom: "16px" },
  sucesso: { color: "#27ae60", marginBottom: "16px" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "16px",
  },
  card: {
    border: "1px solid #eee",
    borderRadius: "8px",
    padding: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  imagem: { width: "100%", height: "160px", objectFit: "cover", borderRadius: "6px" },
  nomeProduto: {
    fontSize: "13px",
    lineHeight: "1.3",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  preco: { fontWeight: 700, fontSize: "15px" },
  desconto: { color: "#c0392b", fontWeight: 400, fontSize: "12px" },
  meta: { fontSize: "12px", color: "#666" },
  botaoImportar: {
    marginTop: "6px",
    padding: "8px",
    borderRadius: "6px",
    border: "none",
    background: "#2980b9",
    color: "#fff",
    cursor: "pointer",
  },
  vazio: { color: "#999", textAlign: "center", marginTop: "40px" },
};
