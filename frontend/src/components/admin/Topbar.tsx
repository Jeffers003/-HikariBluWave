import { Search, LogOut } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import "./topbarAdmin.css";
export default function Topbar() {
  const { usuario, logout } = useAuth();

  return (
    <header className="topbarAdmin">
      <div>
        <h2 className="text-2xl font-semibold">Bem-vindo, {usuario?.nome}</h2>

        <p className="text-sm text-gray-400">{usuario?.email}</p>
      </div>

      <div className="flex items-center gap-4">
        <button className="rounded-lg bg-[#02040A] p-3 hover:bg-[#046AEE]/10">
          <Search size={20} />
        </button>

        <button
          onClick={logout}
          className="flex items-center gap-2 rounded-lg bg-red-500/10 px-4 py-2 text-red-400 transition hover:bg-red-500/20"
        >
          <LogOut size={18} />
          Sair
        </button>
      </div>
    </header>
  );
}
