import { useEffect, useState } from "react";
import StatCard from "../components/admin/StatCard";
import SectionCard from "../components/admin/SectionCard";
import { Package, ShoppingCart, Users, DollarSign } from "lucide-react";
import api from "../services/api";

interface DashboardData {
  resumo: {
    totalProdutos: number;
    totalUsuarios: number;
    totalPedidos: number;
    faturamentoTotal: number;
  };
  produtosEstoqueBaixo: {
    _id: string;
    nome: string;
    estoque: number;
  }[];

  produtosMaisVendidos: {
    nome: string;
    quantidadeVendida: number;
  }[];
  ultimosPedidos: {
    _id: string;
    total: number;
    status: string;
    createdAt: string;
    cliente?: {
      nome: string;
      email: string;
    };
  }[];
}

export default function Dashboard() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);

  useEffect(() => {
    buscarDashboard();
  }, []);

  async function buscarDashboard() {
    try {
      const resposta = await api.get("/dashboard");

      setDashboard(resposta.data);
    } catch (error) {
      console.error("Erro ao carregar dashboard:", error);
    }
  }

  return (
    <>
      <h1
        className="mt-30 text-3xl text-[#046AEE]"
        style={{ fontFamily: "Audiowide" }}
      >
        Dashboard
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          titulo="Produtos"
          valor={dashboard?.resumo.totalProdutos ?? 0}
          Icone={Package}
        />

        <StatCard
          titulo="Pedidos"
          valor={dashboard?.resumo.totalPedidos ?? 0}
          Icone={ShoppingCart}
        />

        <StatCard
          titulo="Usuários"
          valor={dashboard?.resumo.totalUsuarios ?? 0}
          Icone={Users}
        />

        <StatCard
          titulo="Faturamento"
          valor={`R$ ${
            dashboard?.resumo.faturamentoTotal?.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            }) ?? "0,00"
          }`}
          Icone={DollarSign}
        />
      </div>
      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <SectionCard titulo="⚠ Estoque Baixo">
          <div className="space-y-3">
            {dashboard?.produtosEstoqueBaixo?.length ? (
              dashboard.produtosEstoqueBaixo.map((produto) => (
                <div
                  key={produto._id}
                  className="flex items-center justify-between rounded-lg border border-[#263244] bg-[#0B1220] p-3"
                >
                  <span>{produto.nome}</span>

                  <span className="text-red-400">
                    {produto.estoque} unidades
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-400">Nenhum produto com estoque baixo.</p>
            )}
          </div>
        </SectionCard>

        <SectionCard titulo="🏆 Produtos Mais Vendidos">
          <div className="space-y-3">
            {dashboard?.produtosMaisVendidos?.length ? (
              dashboard.produtosMaisVendidos.map((produto, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border border-[#263244] bg-[#0B1220] p-3"
                >
                  <span>{produto.nome}</span>

                  <span className="text-[#046AEE]">
                    {produto.quantidadeVendida} vendas
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-400">Nenhuma venda registrada.</p>
            )}
          </div>
        </SectionCard>
      </div>
      <div className="mt-8">
        <SectionCard titulo="🛒 Últimos Pedidos">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#263244] text-left">
                  <th className="p-3 text-gray-400">Cliente</th>

                  <th className="p-3 text-gray-400">Valor</th>

                  <th className="p-3 text-gray-400">Status</th>

                  <th className="p-3 text-gray-400">Data</th>
                </tr>
              </thead>

              <tbody>
                {dashboard?.ultimosPedidos?.length ? (
                  dashboard.ultimosPedidos.map((pedido) => (
                    <tr key={pedido._id} className="border-b border-[#263244]">
                      <td className="p-3">
                        <div>
                          <p className="font-medium">
                            {pedido.cliente?.nome ?? "Cliente"}
                          </p>

                          <p className="text-sm text-gray-500">
                            {pedido.cliente?.email}
                          </p>
                        </div>
                      </td>

                      <td className="p-3 text-[#046AEE]">
                        R$ {pedido.total.toFixed(2)}
                      </td>

                      <td className="p-3">
                        <span
                          className={`
                      rounded-full px-3 py-1 text-sm
                      ${
                        pedido.status === "pago"
                          ? "bg-green-500/20 text-green-400"
                          : pedido.status === "pendente"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-blue-500/20 text-blue-400"
                      }
                    `}
                        >
                          {pedido.status}
                        </span>
                      </td>

                      <td className="p-3 text-gray-400">
                        {new Date(pedido.createdAt).toLocaleDateString("pt-BR")}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="p-5 text-center text-gray-400">
                      Nenhum pedido encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </div>
    </>
  );
}
