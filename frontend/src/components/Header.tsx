import searchIcon from "../assets/icons/icon-search.png";
import profileIcon from "../assets/icons/icon-people.png";
import { Logo } from "./Logo";
import "./Header.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";

export function Header() {
  const { carrinho } = useCart();
  const [usuario, setUsuario] = useState<any>(null);
  useEffect(() => {
    const dados = localStorage.getItem("usuario");

    if (dados) {
      setUsuario(JSON.parse(dados));
    }
  }, []);
  function sair() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    window.location.href = "/";
  }
  return (
    <header>
      <div>
        <Logo />
      </div>
      {/* LOGO */}
      <nav>
        <ul>
          <li>
            <Link to="/">INÍCIO</Link>
          </li>
          <li>
            <Link to="/categorias">CATEGORIAS</Link>
          </li>
          <li>
            <Link to="/produtos">PRODUTOS</Link>
          </li>
          <li>
            <Link to="/achadinhos">ACHADINHOS</Link>
          </li>
          <li>
            <Link to="/contato">CONTATO</Link>
          </li>
        </ul>
      </nav>{" "}
      {/* NAVBAR */}
      <div className="header-icons">
        <img
          style={{ width: "1rem", height: "1rem" }}
          src={searchIcon}
          alt="search"
        />

        {usuario ? (
          <div className="flex items-center gap-3">
            <span className="text-white text-sm">Olá, {usuario.nome}</span>

            <button onClick={sair} className="text-red-500 text-sm">
              Sair
            </button>
          </div>
        ) : (
          <Link to="/login">
            <img
              style={{ width: "1rem", height: "1rem" }}
              src={profileIcon}
              alt="profile"
            />
          </Link>
        )}
        <Link to="/carrinho" className="relative text-white text-xl">
          🛒
          {carrinho.length > 0 && (
            <span
              className="
        absolute
        -top-2
        -right-2
        bg-red-600
        rounded-full
        w-5
        h-5
        flex
        items-center
        justify-center
        text-xs
      "
            >
              {carrinho.length}
            </span>
          )}
        </Link>
      </div>
      {/* HEADER ICONS */}
    </header>
  );
}
