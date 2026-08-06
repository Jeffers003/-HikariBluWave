import { useState } from "react";
import { LogoVertical } from "../components/LogoVertical";
import api from "../services/api";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [erro, setErro] = useState("");
  const { login } = useAuth();

  async function entrar(e: React.FormEvent) {
    e.preventDefault();

    try {
      const response = await api.post("/usuarios/login", {
        email,
        senha,
      });

      console.log("Resposta login:", response.data);

      login(response.data.token, response.data.usuario);

      const destino = location.state?.from?.pathname;

      if (destino) {
        // Se veio de uma rota protegida, volta para ela
        navigate(destino, { replace: true });
      } else if (response.data.usuario.cargo === "admin") {
        // Se fez login normalmente e é admin, vai para o painel
        navigate("/admin/dashboard", { replace: true });
      } else {
        // Usuário comum vai para a Home
        navigate("/", { replace: true });
      }
    } catch (error: any) {
      console.error(error);

      setErro(error.response?.data?.error || "Erro ao fazer login");
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="flex flex-col sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="flex justify-center">
            <LogoVertical />
          </div>

          <h2
            className="mt-10 text-center text-2xl font-bold tracking-tight"
            style={{ fontFamily: "Audiowide" }}
          >
            FAÇA <span className="text-[#046AEE]">LOGIN</span>
          </h2>

          <p style={{ color: "gray" }} className="mt-2 text-center text-sm/6">
            Entre na sua conta para continuar
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={entrar} className="space-y-6">
            <div>
              <label className="text-[#046AEE]">Email</label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
mt-2
block
w-full
rounded-md
p-2
"
              />
            </div>

            <div>
              <label className="text-[#046AEE]">Senha</label>

              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="
mt-2
block
w-full
rounded-md
p-2
"
              />
            </div>

            {erro && <p className="text-red-500">{erro}</p>}

            <button
              type="submit"
              className="
flex
w-full
justify-center
rounded-md
bg-[#046AEE]
px-3
py-1.5
text-sm
font-semibold
text-white
hover:bg-[#046AEE]/80
"
            >
              ENTRAR
            </button>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Ainda não tem uma conta?
            <br />
            <a href="#" className="font-semibold">
              <span style={{ color: "#046AEE" }}>CRIAR CONTA</span>
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
