import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  User,
  Package,
  ArrowRight,
  Building2,
} from "lucide-react";

function Register() {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);

  const [form, setForm] = useState({
    nome: "",
    email: "",
    empresa: "",
    senha: "",
    confirmarSenha: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleRegister(e) {
    e.preventDefault();

    if (Object.values(form).some((valor) => !valor.trim())) {
      alert("Preencha todos os campos.");
      return;
    }

    if (form.senha.length < 6) {
      alert("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }

    if (form.senha !== form.confirmarSenha) {
      alert("As senhas não são iguais.");
      return;
    }

    alert("Cadastro demonstrativo realizado!");
    // Posteriormente, integrar com a autenticação.
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
            Organize sua operação em um só lugar.
          </h2>

          <p className="text-white/80 text-lg leading-relaxed">
            Tenha mais controle sobre seus produtos, entradas, saídas e pedidos
            com uma plataforma simples e organizada.
          </p>

          <div className="bg-white/10 border border-white/15 rounded-2xl p-6 mt-12">
            <p className="text-lg font-semibold mb-2">
              Gestão mais inteligente.
            </p>
            <p className="text-sm text-white/75 leading-relaxed">
              Centralize as informações da sua empresa e acompanhe tudo com mais
              segurança e praticidade.
            </p>
          </div>

          <p className="text-white/50 text-sm mt-16">
            © 2026 StockControl. Todos os direitos reservados.
          </p>
        </div>
      </section>

      {/* LADO DIREITO */}
      <section className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md py-5">
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="bg-[#9A814C] text-white p-3 rounded-xl">
              <Package size={25} />
            </div>
            <span className="text-xl font-bold text-[#9A814C]">
              StockControl
            </span>
          </div>

          <div className="mb-7">
            <span className="text-sm font-semibold text-[#7FA66D]">
              CRIE SUA CONTA
            </span>

            <h2 className="text-3xl font-bold text-[#292929] mt-2">
              Comece agora
            </h2>

            <p className="text-gray-500 mt-2">
              Preencha os dados abaixo para realizar seu cadastro.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nome completo
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                  placeholder="Digite seu nome"
                  className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-200 bg-white outline-none focus:border-[#9A814C] focus:ring-2 focus:ring-[#9A814C]/10 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                E-mail
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="seuemail@empresa.com"
                  className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-200 bg-white outline-none focus:border-[#9A814C] focus:ring-2 focus:ring-[#9A814C]/10 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Empresa
              </label>

              <div className="relative">
                <Building2
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  name="empresa"
                  value={form.empresa}
                  onChange={handleChange}
                  placeholder="Nome da empresa"
                  className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-200 bg-white outline-none focus:border-[#9A814C] focus:ring-2 focus:ring-[#9A814C]/10 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Senha
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type={mostrarSenha ? "text" : "password"}
                  name="senha"
                  value={form.senha}
                  onChange={handleChange}
                  placeholder="Mínimo de 6 caracteres"
                  className="w-full h-12 pl-12 pr-12 rounded-xl border border-gray-200 bg-white outline-none focus:border-[#9A814C] focus:ring-2 focus:ring-[#9A814C]/10 transition"
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#9A814C] cursor-pointer"
                >
                  {mostrarSenha ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirmar senha
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type={mostrarConfirmacao ? "text" : "password"}
                  name="confirmarSenha"
                  value={form.confirmarSenha}
                  onChange={handleChange}
                  placeholder="Digite sua senha novamente"
                  className="w-full h-12 pl-12 pr-12 rounded-xl border border-gray-200 bg-white outline-none focus:border-[#9A814C] focus:ring-2 focus:ring-[#9A814C]/10 transition"
                />
                <button
                  type="button"
                  onClick={() => setMostrarConfirmacao(!mostrarConfirmacao)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#9A814C] cursor-pointer"
                >
                  {mostrarConfirmacao ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-13 bg-[#9A814C] hover:bg-[#826C3E] text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition cursor-pointer mt-3"
            >
              Criar minha conta
              <ArrowRight size={19} />
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-7">
            Já possui uma conta?{" "}
            <Link
              to="/login"
              className="font-bold text-[#9A814C] hover:underline cursor-pointer"
            >
              Fazer login
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Register;
