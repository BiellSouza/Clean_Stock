import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import HeaderComponent from "../Components/HeaderComponent";

import {
  Plus,
  Trash2,
  ChevronDown,
  X,
  UserRound,
  Pencil,
  ShieldCheck,
  Mail,
  Check,
} from "lucide-react";

function Users() {
  const [usuarios, setUsuarios] = useState([
    {
      id: 1,
      nome: "Gabriel Souza",
      email: "gabriel@email.com",
      cargo: "Administrador",
      status: "Ativo",
      avatar: "👨🏻‍💼",
    },
    {
      id: 2,
      nome: "Maria Silva",
      email: "maria@email.com",
      cargo: "Vendedor",
      status: "Ativo",
      avatar: "👩🏻",
    },
    {
      id: 3,
      nome: "João Oliveira",
      email: "joao@email.com",
      cargo: "Comprador",
      status: "Ativo",
      avatar: "👨🏻",
    },
    {
      id: 4,
      nome: "Ana Costa",
      email: "ana@email.com",
      cargo: "Vendedor",
      status: "Ativo",
      avatar: "👩🏼",
    },
    {
      id: 5,
      nome: "Carlos Pereira",
      email: "carlos@email.com",
      cargo: "Comprador",
      status: "Ativo",
      avatar: "👨🏽",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [menuAberto, setMenuAberto] = useState(null);
  const [usuarioEditando, setUsuarioEditando] = useState(null);

  const [formulario, setFormulario] = useState({
    nome: "",
    email: "",
    cargo: "Vendedor",
    status: "Ativo",
  });

  // ABRIR CADASTRO
  const abrirCadastro = () => {
    setUsuarioEditando(null);

    setFormulario({
      nome: "",
      email: "",
      cargo: "Vendedor",
      status: "Ativo",
    });

    setModalOpen(true);
  };

  // ABRIR EDIÇÃO
  const editarUsuario = (usuario) => {
    setUsuarioEditando(usuario);

    setFormulario({
      nome: usuario.nome,
      email: usuario.email,
      cargo: usuario.cargo,
      status: usuario.status,
    });

    setMenuAberto(null);
    setModalOpen(true);
  };

  // ALTERAR CAMPOS
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormulario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // SALVAR USUÁRIO
  const salvarUsuario = (e) => {
    e.preventDefault();

    if (!formulario.nome.trim() || !formulario.email.trim()) {
      alert("Preencha o nome e o e-mail.");
      return;
    }

    if (usuarioEditando) {
      setUsuarios((prev) =>
        prev.map((usuario) =>
          usuario.id === usuarioEditando.id
            ? { ...usuario, ...formulario }
            : usuario,
        ),
      );
    } else {
      const novoUsuario = {
        id: Date.now(),
        ...formulario,
        avatar: "👤",
      };

      setUsuarios((prev) => [...prev, novoUsuario]);
    }

    setModalOpen(false);
  };

  // EXCLUIR USUÁRIO
  const excluirUsuario = (id) => {
    const confirmar = window.confirm("Deseja realmente excluir este usuário?");

    if (!confirmar) return;

    setUsuarios((prev) => prev.filter((usuario) => usuario.id !== id));

    setMenuAberto(null);
  };

  // ALTERAR STATUS
  const alterarStatus = (id) => {
    setUsuarios((prev) =>
      prev.map((usuario) =>
        usuario.id === id
          ? {
              ...usuario,
              status: usuario.status === "Ativo" ? "Inativo" : "Ativo",
            }
          : usuario,
      ),
    );

    setMenuAberto(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />

      <main className="ml-64 px-8">
        {/* HEADER */}
        <div className="py-6 flex items-center justify-between gap-4">
          <HeaderComponent
            title="Usuários e Permissões"
            subtitle="Gerencie os acessos do sistema"
          />

          <button
            type="button"
            onClick={abrirCadastro}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-all shadow-sm shrink-0"
          >
            <Plus size={19} />
            Novo Usuário
          </button>
        </div>

        <hr className="border-b border-primary/20 w-full" />

        {/* TABELA DE USUÁRIOS */}
        <div className="mt-6 w-full border border-blue-100 rounded-xl overflow-visible">
          <div className="overflow-x-auto rounded-xl">
            <table className="w-full min-w-[750px] text-left border-collapse">
              {/* CABEÇALHO */}
              <thead className="bg-blue-50">
                <tr className="text-sm text-slate-700">
                  <th className="px-5 py-4 font-semibold border-r border-blue-100">
                    Nome
                  </th>

                  <th className="px-5 py-4 font-semibold border-r border-blue-100">
                    E-mail
                  </th>

                  <th className="px-5 py-4 font-semibold border-r border-blue-100">
                    Cargo
                  </th>

                  <th className="px-5 py-4 font-semibold border-r border-blue-100">
                    Status
                  </th>

                  <th className="px-5 py-4 font-semibold text-center">Ações</th>
                </tr>
              </thead>

              {/* CORPO */}
              <tbody>
                {usuarios.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="py-12 text-center text-sm text-slate-400"
                    >
                      Nenhum usuário cadastrado.
                    </td>
                  </tr>
                ) : (
                  usuarios.map((usuario) => (
                    <tr
                      key={usuario.id}
                      className="border-t border-blue-100 hover:bg-slate-50/70 transition-colors"
                    >
                      {/* NOME */}
                      <td className="px-5 py-3.5 border-r border-blue-100">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 flex items-center justify-center bg-blue-50 rounded-full text-xl shrink-0">
                            {usuario.avatar}
                          </div>

                          <span className="text-sm font-medium text-slate-700">
                            {usuario.nome}
                          </span>
                        </div>
                      </td>

                      {/* EMAIL */}
                      <td className="px-5 py-3.5 border-r border-blue-100">
                        <span className="text-sm text-slate-600">
                          {usuario.email}
                        </span>
                      </td>

                      {/* CARGO */}
                      <td className="px-5 py-3.5 border-r border-blue-100">
                        <span className="text-sm text-slate-700">
                          {usuario.cargo}
                        </span>
                      </td>

                      {/* STATUS */}
                      <td className="px-5 py-3.5 border-r border-blue-100">
                        <span
                          className={`inline-flex items-center justify-center min-w-[60px] px-3 py-1.5 rounded-full text-xs font-semibold ${
                            usuario.status === "Ativo"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {usuario.status}
                        </span>
                      </td>

                      {/* AÇÕES */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center justify-center gap-1 relative">
                          <button
                            type="button"
                            onClick={() => excluirUsuario(usuario.id)}
                            className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                            title="Excluir usuário"
                          >
                            <Trash2 size={17} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              setMenuAberto(
                                menuAberto === usuario.id ? null : usuario.id,
                              )
                            }
                            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition"
                            title="Mais opções"
                          >
                            <ChevronDown size={17} />
                          </button>

                          {menuAberto === usuario.id && (
                            <div className="absolute right-0 top-10 z-30 w-48 bg-white border border-slate-200 rounded-xl shadow-xl p-1.5">
                              <button
                                type="button"
                                onClick={() => editarUsuario(usuario)}
                                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50 rounded-lg"
                              >
                                <Pencil size={16} />
                                Editar usuário
                              </button>

                              <button
                                type="button"
                                onClick={() => alterarStatus(usuario.id)}
                                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50 rounded-lg"
                              >
                                <ShieldCheck size={16} />
                                {usuario.status === "Ativo"
                                  ? "Desativar usuário"
                                  : "Ativar usuário"}
                              </button>

                              <button
                                type="button"
                                onClick={() => excluirUsuario(usuario.id)}
                                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                              >
                                <Trash2 size={16} />
                                Excluir usuário
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* MODAL NOVO USUÁRIO / EDIÇÃO */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 backdrop-blur-sm p-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* CABEÇALHO */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  {usuarioEditando ? "Editar usuário" : "Novo usuário"}
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Gerencie as informações e permissões de acesso.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* FORMULÁRIO */}
            <form onSubmit={salvarUsuario}>
              <div className="p-6 space-y-5">
                {/* NOME */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Nome completo
                  </label>

                  <div className="relative">
                    <UserRound
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      name="nome"
                      value={formulario.nome}
                      onChange={handleChange}
                      placeholder="Digite o nome do usuário"
                      required
                      className="w-full h-11 pl-10 pr-4 rounded-lg border border-slate-200 outline-none text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition"
                    />
                  </div>
                </div>

                {/* EMAIL */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    E-mail
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="email"
                      name="email"
                      value={formulario.email}
                      onChange={handleChange}
                      placeholder="usuario@email.com"
                      required
                      className="w-full h-11 pl-10 pr-4 rounded-lg border border-slate-200 outline-none text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition"
                    />
                  </div>
                </div>

                {/* CARGO */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Cargo / Permissão
                  </label>

                  <select
                    name="cargo"
                    value={formulario.cargo}
                    onChange={handleChange}
                    className="w-full h-11 px-4 rounded-lg border border-slate-200 outline-none text-sm bg-white focus:border-blue-500 transition"
                  >
                    <option value="Administrador">Administrador</option>
                    <option value="Vendedor">Vendedor</option>
                    <option value="Comprador">Comprador</option>
                  </select>
                </div>

                {/* STATUS */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Status do usuário
                  </label>

                  <select
                    name="status"
                    value={formulario.status}
                    onChange={handleChange}
                    className="w-full h-11 px-4 rounded-lg border border-slate-200 outline-none text-sm bg-white focus:border-blue-500 transition"
                  >
                    <option value="Ativo">Ativo</option>
                    <option value="Inativo">Inativo</option>
                  </select>
                </div>
              </div>

              {/* RODAPÉ */}
              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 px-6 py-5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition"
                >
                  <Check size={17} />
                  {usuarioEditando ? "Salvar alterações" : "Cadastrar usuário"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
