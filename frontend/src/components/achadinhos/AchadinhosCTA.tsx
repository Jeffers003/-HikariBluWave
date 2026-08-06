import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function AchadinhosCTA() {
  return (
    <section
      className="
      mx-auto
      max-w-7xl
      px-6
      py-20
      "
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        viewport={{
          once: true,
        }}
        className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-[#496d9c]/30
        bg-[#111827]/70
        p-10
        text-center
        transition-all
          duration-500
          hover:-translate-y-1
          hover:border-[#046AEE]
          hover:shadow-[0_0_45px_rgba(4,106,238,.28)]
        shadow-[0_0_50px_rgba(4,106,238,.15)]
        "
      >
        {/* Glow */}

        <div
          className="
          absolute
          inset-0
          bg-[#046AEE]/5
          blur-3xl
          "
        />

        <div
          className="
          relative
          "
        >
          <div
            className="
            mx-auto
            mb-6
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            bg-[#046AEE]/20
            text-[#3B82F6]
            "
          >
            <Sparkles size={28} />
          </div>

          <h2
            className="
            text-3xl
            font-bold
            text-white
            md:text-4xl
            "
          >
            Encontrou seu próximo achadinho?
          </h2>

          <p
            className="
            mx-auto
            mt-4
            max-w-xl
            text-slate-400
            "
          >
            A HikariBluWave seleciona ofertas incríveis todos os dias para você
            economizar.
          </p>

          <Link
            to="/achadinhos"
            className="
            mt-8
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-[#046AEE]
            px-8
            py-4
            font-semibold
            text-white
            transition-all
            hover:bg-[#0357C4]
            hover:shadow-[0_0_35px_rgba(4,106,238,.45)]
            "
          >
            Ver ofertas
            <ArrowRight size={18} />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
