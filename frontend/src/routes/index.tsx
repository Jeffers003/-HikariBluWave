import { createBrowserRouter } from "react-router-dom";
import ProdutoDetalhes from "../pages/ProdutoDetalhes";
import { MainLayout } from "../layouts/MainLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import Dashboard from "../pages/Dashboard";
import AdminRoute from "../components/AdminRoute";
import { AdminLayout } from "../layouts/AdminLayout";
import ProdutosAdmin from "../pages/admin/ProdutosAdmin";
import { Home } from "../pages/Home";
import Login from "../pages/Login";
import Produtos from "@/pages/Produtos";
import Categorias from "@/pages/Categorias";
import Contato from "../pages/Contato";
import Carrinho from "../pages/Carrinho";
import NovoProduto from "../pages/admin/NovoProduto";
import EditarProduto from "../../src/pages/admin/EditarProduto";
import CategoriasAdmin from "../pages/admin/CategoriasAdmin";
import AchadinhosAdmin from "../pages/admin/AchadinhosAdmin";
import NovoAchadinho from "../pages/admin/NovoAchadinho";
import EditarAchadinho from "../pages/admin/EditarAchadinho";
import Achadinhos from "@/pages/Achadinhos";
import ProdutoDetalhePublico from "@/pages/ProdutoDetalhePublico";

import ColecaoDetalhes from "@/pages/ColecaoDetalhes";

import Colecoes from "@/pages/Colecoes";

import ColecoesAdmin from "@/pages/admin/colecoes/ColecoesAdmin";
import EditarColecao from "@/pages/admin/colecoes/EditarColecao";
import NovaColecao from "@/pages/admin/colecoes/NovaColecao";
import Reviews from "@/pages/admin/reviews/Reviews";
import NovoReview from "@/pages/admin/reviews/NovoReview";
import EditarReview from "@/pages/admin/reviews/EditarReview";
import AliExpressAdmin from "../pages/admin/AliExpressAdmin";
import CategoriaDetalhes from "../pages/CategoriaDetalhes";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "produtos",
        Component: Produtos,
      },
      {
        path: "produtos/:slug",
        Component: ProdutoDetalhePublico,
      },
      {
        path: "produto/:id",
        Component: ProdutoDetalhes,
      },
      {
        path: "carrinho",
        element: (
          <ProtectedRoute>
            <Carrinho />
          </ProtectedRoute>
        ),
      },
      {
        path: "categorias",
        Component: Categorias,
      },
      {
        path: "categorias/:slug",
        Component: CategoriaDetalhes,
      },
      {
        path: "contato",
        Component: Contato,
      },
      {
        path: "achadinhos",
        element: <Achadinhos />,
      },
      {
        path: "colecoes",
        Component: Colecoes,
      },
      {
        path: "colecoes/:slug",
        Component: ColecaoDetalhes,
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      {
        path: "dashboard",
        Component: Dashboard,
      },

      {
        path: "produtos",
        Component: ProdutosAdmin,
      },

      {
        path: "produtos/novo",
        Component: NovoProduto,
      },

      {
        path: "produtos/editar/:id",
        Component: EditarProduto,
      },

      {
        path: "categorias",
        Component: CategoriasAdmin,
      },
      {
        path: "reviews",
        Component: Reviews,
      },
      {
        path: "reviews/novo",
        Component: NovoReview,
      },
      {
        path: "reviews/:id",
        Component: EditarReview,
      },
      {
        path: "aliexpress",
        Component: AliExpressAdmin,
      },

      // =====================
      // COLEÇÕES
      // =====================

      {
        path: "colecoes/nova",
        Component: NovaColecao,
      },
      {
        path: "colecoes/editar/:id",
        Component: EditarColecao,
      },
      {
        path: "colecoes",
        Component: ColecoesAdmin,
      },

      // =====================
      // ACHADINHOS
      // =====================

      {
        path: "achadinhos",
        Component: AchadinhosAdmin,
      },

      {
        path: "achadinhos/novo",
        Component: NovoAchadinho,
      },

      {
        path: "achadinhos/editar/:id",
        Component: EditarAchadinho,
      },
    ],
  },
]);
