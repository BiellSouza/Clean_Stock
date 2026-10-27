import React, { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";

function Register() {
  const [password, setPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-green-50 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-gray-200/80 bg-white p-6 shadow-xl shadow-gray-900/5 sm:p-9">
        {/* Cabeçalho */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-800 text-white shadow-lg shadow-green-800/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="27"
              height="27"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="10" cy="7" r="4" />
              <path d="M20 8v6" />
              <path d="M23 11h-6" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Criar sua conta
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Preencha seus dados para acessar o sistema.
          </p>
        </div>

        {/* Formulário */}
        <form className="space-y-5">
          <div>
            <label
              htmlFor="nome"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Nome completo
            </label>

            <input
              id="nome"
              type="text"
              placeholder="Digite seu nome"
              autoComplete="name"
              className="w-full rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-green-700 focus:bg-white focus:ring-4 focus:ring-green-700/10"
            />
          </div>

          <div>
            <label
              htmlFor="telefone"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Telefone
            </label>

            <input
              id="telefone"
              type="tel"
              placeholder="(21) 99999-9999"
              autoComplete="tel"
              className="w-full rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-green-700 focus:bg-white focus:ring-4 focus:ring-green-700/10"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              E-mail
            </label>

            <input
              id="email"
              type="email"
              placeholder="seuemail@exemplo.com"
              autoComplete="email"
              className="w-full rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-green-700 focus:bg-white focus:ring-4 focus:ring-green-700/10"
            />
          </div>

          <div>
            <label
              htmlFor="senha"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-3 transition-all focus-within:border-green-700 focus-within:bg-white focus-within:ring-4 focus-within:ring-green-700/10">
              <input
                id="senha"
                type={password ? "text" : "password"}
                placeholder="Crie uma senha"
                autoComplete="new-password"
                className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
              />

              <button
                type="button"
                onClick={() => setPassword(!password)}
                className="ml-2 cursor-pointer text-gray-500 transition-colors hover:text-green-800"
                aria-label={password ? "Ocultar senha" : "Mostrar senha"}
              >
                {password ? <Eye size={20} /> : <EyeClosed size={20} />}
              </button>
            </div>
          </div>

          {/* Opções */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                className="h-4 w-4 cursor-pointer rounded border-gray-300 accent-green-800"
              />
              Lembrar login
            </label>

            <a
              href="/recuperar-senha"
              className="text-sm font-medium text-green-800 transition-colors hover:text-green-600"
            >
              Esqueceu a senha?
            </a>
          </div>

          {/* Botão */}
          <button
            type="submit"
            className="mt-2 w-full rounded-xl bg-green-800 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-green-800/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-900 hover:shadow-xl active:translate-y-0"
          >
            Criar conta
          </button>

          <p className="pt-2 text-center text-sm text-gray-500">
            Já possui uma conta?{" "}
            <a
              href="/login"
              className="font-semibold text-green-800 transition-colors hover:text-green-600"
            >
              Entrar
            </a>
          </p>
        </form>

        {/* Rodapé */}
        <div className="mt-7 border-t border-gray-100 pt-5 text-center">
          <p className="text-xs text-gray-400">
            Seus dados são tratados com segurança.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
