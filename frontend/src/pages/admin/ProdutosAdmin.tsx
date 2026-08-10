import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { ImageOff, Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import TableActions from "@/components/admin/TableActions";
interface Produto {
  _id: string;
  nome: string;
  preco: number;
  estoque: number;
  categoria?: {
    nome: string;
  };
  imagem: string | null;
}

export default function ProdutosAdmin() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    carregarProdutos();
  }, []);

  async function carregarProdutos() {
    try {
      const response = await api.get("/produtos");

      setProdutos(response.data.produtos);
    } catch (error) {
      console.error(error);
    }
  }
  async function excluirProduto(id: string) {
    try {
      await api.delete(`/produtos/${id}`);

      setProdutos((produtos) =>
        produtos.filter((produto) => produto._id !== id),
      );

      toast.success("Produto excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir produto:");
    }
  }
  return (
    <>
      <AdminPageHeader title="Produtos">
        <Button className="p-5">
          <Link className="flex items-center" to="/admin/produtos/novo">
            <Plus className="mr-2 h-4 w-4" />
            Novo Produto
          </Link>
        </Button>
      </AdminPageHeader>

      <div className="rounded-xl border border-[#046AEE]/20 bg-[#070B14] p-4 text-[#fff]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[#fff]">Produto</TableHead>
              <TableHead className="text-[#fff]">Categoria</TableHead>
              <TableHead className="text-[#fff]">Preço</TableHead>
              <TableHead className="text-[#fff]">Estoque</TableHead>
              <TableHead className="text-[#fff]">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="">
            {produtos.map((produto) => (
              <TableRow key={produto._id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    {produto.imagem ? (
                      <img
                        src={`http://localhost:3000${produto.imagem}`}
                        alt={produto.nome}
                        className="h-14 w-14 rounded-lg border border-[#046AEE]/20 object-cover"
                      />
                    ) : (
                      <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-[#046AEE]/20 bg-[#0B1324]">
                        <ImageOff size={20} className="text-gray-500" />
                      </div>
                    )}

                    <span className="font-medium">{produto.nome}</span>
                  </div>
                </TableCell>

                <TableCell>{produto.categoria?.nome ?? "-"}</TableCell>

                <TableCell>R$ {produto.preco.toFixed(2)}</TableCell>

                <TableCell>{produto.estoque}</TableCell>
                <TableCell>
                  <TableActions
                    onEdit={() =>
                      navigate(`/admin/produtos/editar/${produto._id}`)
                    }
                    onDelete={() => excluirProduto(produto._id)}
                    deleteTitle="Excluir Produto"
                    deleteDescription={`Tem certeza que deseja excluir "${produto.nome}"?`}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
