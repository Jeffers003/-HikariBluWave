import { Link } from "react-router-dom";
import Instagram from "@/assets/icons/instagram.png";
import Facebook from "@/assets/icons/facebook.png";
import Youtube from "@/assets/icons/youtube.png";

import GlassCard from "@/components/shared/GlassCard";
import PrimaryButton from "@/components/shared/PrimaryButton";
import Logo from "@/assets/svg/logo.svg";
import { ArrowUpRight } from "lucide-react";
export default function Footer() {
  return (
    <footer className="   bg-[#010308]">
      <div className="mt-0 p-8">
        <GlassCard className="  w-100vh overflow-hidden bg-[#010308] p-12 px-24 ">
          <div className="grid center gap-12 lg:grid-cols-[2fr_1fr_1fr]">
            {/* Marca */}
            <div>
              <img
                src={Logo}
                alt="HikariBluWave"
                className="w-50 justify-center "
              />

              <p className=" max-w-60 leading-5 text-left sm:text-sm text-slate-400">
                Descubra produtos selecionados das maiores plataformas como
                AliExpress, Shopee e Mercado Livre em uma única experiência.
              </p>

              <div className="mt-2 flex gap-3">
                <PrimaryButton className="bg-[#0469ee0] hover:bg-[#0469ee]/80">
                  <img src={Instagram} alt="Instagram" />
                </PrimaryButton>

                <PrimaryButton className=" bg-[#0469ee0] hover:bg-[#0469ee]/80">
                  <img src={Facebook} alt="Facebook" />
                </PrimaryButton>

                <PrimaryButton className="bg-[#0469ee0] hover:bg-[#0469ee51]/80">
                  <img src={Youtube} alt="Youtube" />
                </PrimaryButton>
              </div>
            </div>

            {/* Navegação */}
            <div className="flex text-left flex-col gap-3">
              <h3 className="mb-5 font-semibold text-white">Navegação</h3>

              <nav className="flex flex-col gap-3">
                <Link
                  to="/"
                  className="text-slate-400 transition hover:text-[#046AEE]"
                >
                  Home
                </Link>

                <Link
                  to="/produtos"
                  className="text-slate-400 transition hover:text-[#046AEE]"
                >
                  Produtos
                </Link>

                <Link
                  to="/categorias"
                  className="text-slate-400 transition hover:text-[#046AEE]"
                >
                  Categorias
                </Link>

                <Link
                  to="/contato"
                  className="text-slate-400 transition hover:text-[#046AEE]"
                >
                  Contato
                </Link>
              </nav>
            </div>

            {/* CTA */}
            <div>
              <h3 className="font-semibold text-white">
                Receba os melhores achadinhos
              </h3>

              <p className="mt-4 text-sm leading-6 text-slate-400">
                Cadastre seu e-mail para receber novas ofertas e coleções.
              </p>

              <PrimaryButton className="mt-8 w-full">
                Quero receber ofertas
                <ArrowUpRight className="ml-2" size={18} />
              </PrimaryButton>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-slate-500 md:flex-row">
            <span>© 2026 HikariBluWave. Todos os direitos reservados.</span>

            <div className="flex gap-6">
              <Link to="/privacidade" className="hover:text-[#046AEE]">
                Privacidade
              </Link>

              <Link to="/termos" className="hover:text-[#046AEE]">
                Termos
              </Link>
            </div>
          </div>
        </GlassCard>
      </div>
    </footer>
  );
}
