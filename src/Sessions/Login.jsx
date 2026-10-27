import React, { useState } from "react";
import { Eye, EyeClosed, LogIn } from "lucide-react";

function Login() {
  const [password, setPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-green-50 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-gray-200/80 bg-white p-6 shadow-xl shadow-gray-900/5 sm:p-9">
        {/* Cabeçalho */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-800 text-white shadow-lg shadow-green-800/20">
            <LogIn size={27} strokeWidth={1.8} />
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Entrar na sua conta
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Acesse o sistema para continuar.
          </p>
        </div>

        {/* Formulário */}
        <form className="space-y-5">
          {/* E-mail */}
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
              required
              className="w-full rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-green-700 focus:bg-white focus:ring-4 focus:ring-green-700/10"
            />
          </div>

          {/* Senha */}
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
                placeholder="Digite sua senha"
                autoComplete="current-password"
                required
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
            <label className="flex cursor-pointer items-center gap-2 text-xs text-gray-600">
              <input
                type="checkbox"
                className="h-4 w-4 cursor-pointer rounded border-gray-300 accent-green-800"
              />
              Lembrar login
            </label>

            <a
              href="#"
              className="text-xs font-medium text-green-800 transition-colors hover:text-green-600"
            >
              Esqueceu a senha?
            </a>
          </div>

          {/* Botão */}
          <button
            type="submit"
            className="mt-2 w-full rounded-xl bg-green-800 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-green-800/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-900 hover:shadow-xl active:translate-y-0"
          >
            Entrar
          </button>
        </form>

        {/* Divisor */}
        <div className="my-6 flex items-center gap-3">
          <hr className="flex-1 border-gray-200" />
          <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
            ou
          </span>
          <hr className="flex-1 border-gray-200" />
        </div>

        {/* Cadastro */}
        <p className="text-center text-sm text-gray-500">
          Não tem uma conta?{" "}
          <a
            href="/register"
            className="font-semibold text-green-800 transition-colors hover:text-green-600"
          >
            Registre-se
          </a>
        </p>

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

export default Login;
