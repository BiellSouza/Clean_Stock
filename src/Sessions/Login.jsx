import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Package,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [lembrar, setLembrar] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    if (!email || !senha) {
      alert("Preencha todos os campos.");
      return;
    }

    alert("Login demonstrativo realizado!");
    // Posteriormente, integrar com a autenticação.
    // navigate("/dashboard");
  }

  return (
    <main className="min-h-screen flex bg-[#F8F8F6]">
      {/* LADO ESQUERDO */}
      <section className="hidden lg:flex w-1/2 bg-[#9A814C] relative overflow-hidden items-center justify-center p-12">
        <div className="absolute w-[500px] h-[500px] rounded-full border border-white/10 -top-40 -left-40" />
        <div className="absolute w-[400px] h-[400px] rounded-full border border-white/10 -bottom-40 -right-32" />

        <div className="relative z-10 max-w-lg text-white">
          <div className="flex items-center gap-3 mb-16">
            <div className="bg-white/15 p-3 rounded-2xl">
              <Package size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-wide">StockControl</h1>
              <p className="text-sm text-white/70">
                Gestão inteligente de estoque
              </p>
            </div>
          </div>

          <h2 className="text-4xl xl:text-5xl font-bold leading-tight mb-6">
            Controle seu estoque com mais praticidade.
          </h2>

          <p className="text-white/80 text-lg leading-relaxed mb-10">
            Gerencie produtos, acompanhe movimentações e tenha todas as
            informações da sua empresa em um só lugar.
          </p>

          <div className="space-y-5">
            {[
              "Controle de estoque da loja e do galpão",
              "Gerenciamento de pedidos e movimentações",
              "Relatórios e informações em tempo real",
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="bg-white/15 rounded-full p-1.5">
                  <ShieldCheck size={17} />
                </div>
                <span className="text-white/90">{item}</span>
              </div>
            ))}
          </div>

          <p className="text-white/50 text-sm mt-20">
            © 2026 StockControl. Todos os direitos reservados.
          </p>
        </div>
      </section>

      {/* LADO DIREITO */}
      <section className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center justify-center gap-3 mb-10">
            <div className="bg-[#9A814C] text-white p-3 rounded-xl">
              <Package size={25} />
            </div>
            <span className="text-xl font-bold text-[#9A814C]">
              StockControl
            </span>
          </div>

          <div className="mb-9">
            <span className="text-sm font-semibold text-[#7FA66D]">
              BEM-VINDO DE VOLTA
            </span>

            <h2 className="text-3xl font-bold text-[#292929] mt-2">
              Acesse sua conta
            </h2>

            <p className="text-gray-500 mt-2">
              Entre com seus dados para continuar.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                E-mail
              </label>

              <div className="relative">
                <Mail
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seuemail@empresa.com"
                  className="w-full h-13 pl-12 pr-4 rounded-xl border border-gray-200 bg-white outline-none focus:border-[#9A814C] focus:ring-2 focus:ring-[#9A814C]/10 transition"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-gray-700">
                  Senha
                </label>
                <button
                  type="button"
                  onClick={() =>
                    alert("Recuperação de senha será implementada.")
                  }
                  className="text-xs font-semibold text-[#9A814C] hover:underline cursor-pointer"
                >
                  Esqueceu a senha?
                </button>
              </div>

              <div className="relative">
                <LockKeyhole
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type={mostrarSenha ? "text" : "password"}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="Digite sua senha"
                  className="w-full h-13 pl-12 pr-12 rounded-xl border border-gray-200 bg-white outline-none focus:border-[#9A814C] focus:ring-2 focus:ring-[#9A814C]/10 transition"
                />

                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#9A814C] cursor-pointer"
                >
                  {mostrarSenha ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={lembrar}
                onChange={(e) => setLembrar(e.target.checked)}
                className="accent-[#9A814C] w-4 h-4 cursor-pointer"
              />
              Manter conectado
            </label>

            <button
              type="submit"
              className="w-full h-13 bg-[#9A814C] hover:bg-[#826C3E] text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition cursor-pointer"
            >
              Entrar na plataforma
              <ArrowRight size={19} />
            </button>
          </form>

          <div className="relative my-8">
            <div className="border-t border-gray-200" />
            <span className="absolute left-1/2 -translate-x-1/2 -top-2.5 bg-[#F8F8F6] px-4 text-xs text-gray-400">
              OU
            </span>
          </div>

          <p className="text-center text-sm text-gray-500">
            Ainda não possui uma conta?{" "}
            <Link
              to="/register"
              className="font-bold text-[#9A814C] hover:underline cursor-pointer"
            >
              Criar conta
            </Link>
          </p>

          <p className="text-center text-xs text-gray-400 mt-12">
            Ambiente seguro para gerenciamento da sua empresa.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Login;
