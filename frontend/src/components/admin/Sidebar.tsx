import {
  LayoutDashboard,
  Package,
  Tags,
  ShoppingCart,
  Users,
  DollarSign,
  Flame,
  Boxes,
  MessagesSquare,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const links = [
  {
    nome: "Dashboard",
    rota: "/admin/dashboard",
    icone: LayoutDashboard,
  },
  {
    nome: "Produtos",
    rota: "/admin/produtos",
    icone: Package,
  },
  {
    nome: "Achadinhos",
    rota: "/admin/achadinhos",
    icone: Flame,
  },
  {
    nome: "AliExpressAdmin",
    rota: "/admin/aliexpressadmin",
    icone: Flame,
  },
  {
    nome: "Categorias",
    rota: "/admin/categorias",
    icone: Tags,
  },
  {
    nome: "Coleções",
    rota: "/admin/colecoes",
    icone: Boxes,
  },
  {
    nome: "Pedidos",
    rota: "/admin/pedidos",
    icone: ShoppingCart,
  },
  {
    nome: "Usuários",
    rota: "/admin/usuarios",
    icone: Users,
  },
  {
    nome: "Reviews",
    rota: "/admin/reviews",
    icone: MessagesSquare,
  },
  {
    nome: "Vendas",
    rota: "/admin/vendas",
    icone: DollarSign,
  },
];

export default function Sidebar() {
  return (
    <aside
      className="
    fixed
    left-0
    top-0
    flex
    h-screen
    w-72
    flex-col
    border-r
    border-[#046AEE]/20
    bg-[#070B14]
  "
    >
      <div className="border-b border-[#046AEE]/20 p-6">
        <h1
          className="text-2xl text-[#046AEE]"
          style={{ fontFamily: "Audiowide" }}
        >
          HikariBluWave
        </h1>

        <p className="mt-1 text-sm text-gray-400">Painel Administrativo</p>
      </div>

      <nav className="flex flex-1 flex-col gap-2 p-4">
        {links.map((link) => {
          const Icon = link.icone;

          return (
            <NavLink
              key={link.rota}
              to={link.rota}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 transition-all ${
                  isActive
                    ? "bg-[#046AEE] text-white"
                    : "text-gray-300 hover:bg-[#046AEE]/10 hover:text-white"
                }`
              }
            >
              <Icon size={20} />
              {link.nome}
            </NavLink>
          );
        })}
      </nav>
      <div className="mt-auto border-t border-[#046AEE]/20 p-4">
        <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-red-400 transition hover:bg-red-500/10 hover:text-red-300">
          🚪 Sair
        </button>
      </div>
    </aside>
  );
}
