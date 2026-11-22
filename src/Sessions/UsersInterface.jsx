import React, { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Users,
  ShieldCheck,
  UserCheck,
  UserX,
  Pencil,
  Trash2,
  X,
  Eye,
  EyeOff,
  Check,
  ChevronDown,
  Mail,
  Phone,
  Briefcase,
  LockKeyhole,
} from "lucide-react";
import Sidebar from "../Components/Sidebar";
import HeaderComponent from "../Components/HeaderComponent";

const usuariosIniciais = [
  {
    id: 1,
    nome: "Gabriel Souza",
    email: "gabriel@email.com",
    telefone: "(21) 99999-1111",
    cargo: "Administrador",
    status: "Ativo",
  },
  {
    id: 2,
    nome: "Carlos Oliveira",
    email: "carlos@email.com",
    telefone: "(21) 99999-2222",
    cargo: "Gerente",
    status: "Ativo",
  },
  {
    id: 3,
    nome: "Ana Martins",
    email: "ana@email.com",
    telefone: "(21) 99999-3333",
    cargo: "Vendedor",
    status: "Ativo",
  },
  {
    id: 4,
    nome: "Pedro Santos",
    email: "pedro@email.com",
    telefone: "(21) 99999-4444",
    cargo: "Estoquista",
    status: "Inativo",
  },
];

const permissoesPorCargo = {
  Administrador: [
    "Dashboard",
    "Produtos",
    "Estoque",
    "Pedidos",
    "Compras",
    "Relatórios",
    "Usuários",
    "Configurações",
  ],
  Gerente: [
    "Dashboard",
    "Produtos",
    "Estoque",
    "Pedidos",
    "Compras",
    "Relatórios",
  ],
  Vendedor: ["Dashboard", "Produtos", "Pedidos"],
  Estoquista: ["Dashboard", "Produtos", "Estoque", "Compras"],
};

function UsersInterface() {
  const [usuarios, setUsuarios] = useState(usuariosIniciais);
  const [busca, setBusca] = useState("");
  const [filtroCargo, setFiltroCargo] = useState("Todos");
  const [filtroStatus, setFiltroStatus] = useState("Todos");
  const [modalAberto, setModalAberto] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const formularioInicial = {
    nome: "",
    email: "",
    telefone: "",
    cargo: "Vendedor",
    senha: "",
    status: "Ativo",
  };

  const [form, setForm] = useState(formularioInicial);

  const usuariosFiltrados = useMemo(() => {
    return usuarios.filter((usuario) => {
      const correspondeBusca =
        usuario.nome.toLowerCase().includes(busca.toLowerCase()) ||
        usuario.email.toLowerCase().includes(busca.toLowerCase());

      const correspondeCargo =
        filtroCargo === "Todos" || usuario.cargo === filtroCargo;
      const correspondeStatus =
        filtroStatus === "Todos" || usuario.status === filtroStatus;

      return correspondeBusca && correspondeCargo && correspondeStatus;
    });
  }, [usuarios, busca, filtroCargo, filtroStatus]);

  const ativos = usuarios.filter((u) => u.status === "Ativo").length;
  const inativos = usuarios.filter((u) => u.status === "Inativo").length;

  function abrirCadastro() {
    setUsuarioSelecionado(null);
    setForm(formularioInicial);
    setModalAberto(true);
  }

  function abrirEdicao(usuario) {
    setUsuarioSelecionado(usuario);
    setForm({ ...usuario, senha: "" });
    setModalAberto(true);
  }

  function salvarUsuario(e) {
    e.preventDefault();

    if (usuarioSelecionado) {
      setUsuarios((lista) =>
        lista.map((u) =>
          u.id === usuarioSelecionado.id ? { ...u, ...form } : u,
        ),
      );
    } else {
      setUsuarios((lista) => [...lista, { ...form, id: Date.now() }]);
    }

    setModalAberto(false);
    setForm(formularioInicial);
  }

  function alternarStatus(usuario) {
    setUsuarios((lista) =>
      lista.map((u) =>
        u.id === usuario.id
          ? { ...u, status: u.status === "Ativo" ? "Inativo" : "Ativo" }
          : u,
      ),
    );
  }

  function excluirUsuario(usuario) {
    if (window.confirm(`Deseja excluir o usuário ${usuario.nome}?`)) {
      setUsuarios((lista) => lista.filter((u) => u.id !== usuario.id));
    }
  }

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#9A814C]";

  return (
    <div className="min-h-screen bg-[#F8F8F6]">
      <Sidebar />

      <main className="ml-54 min-h-screen p-6">
        <HeaderComponent
          title="Usuários"
          subtitle="Gerencie os acessos, cargos e permissões do sistema"
        />

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Equipe e acessos
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Controle quem pode acessar cada área do sistema.
            </p>
          </div>

          <button
            onClick={abrirCadastro}
            className="flex items-center gap-2 rounded-xl bg-[#9A814C] px-5 py-3 text-sm font-medium text-white hover:bg-[#806a3d] cursor-pointer hover:scale-90 duration-500 transition-all"
          >
            <Plus size={18} /> Novo usuário
          </button>
        </div>

        <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Total de usuários", value: usuarios.length, icon: Users },
            { label: "Usuários ativos", value: ativos, icon: UserCheck },
            { label: "Usuários inativos", value: inativos, icon: UserX },
            { label: "Cargos disponíveis", value: 4, icon: ShieldCheck },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{item.label}</span>
                  <div className="rounded-xl bg-[#F5F1E9] p-3 text-[#9A814C]">
                    <Icon size={20} />
                  </div>
                </div>
                <p className="mt-4 text-3xl font-semibold text-gray-800">
                  {item.value}
                </p>
              </div>
            );
          })}
        </section>

        <section className="mt-7 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative flex-1">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Buscar por nome ou e-mail..."
                className={`${inputClass} pl-11`}
              />
            </div>

            <select
              value={filtroCargo}
              onChange={(e) => setFiltroCargo(e.target.value)}
              className={inputClass + " lg:w-48"}
            >
              <option>Todos</option>
              {Object.keys(permissoesPorCargo).map((cargo) => (
                <option key={cargo}>{cargo}</option>
              ))}
            </select>

            <select
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
              className={inputClass + " lg:w-44"}
            >
              <option>Todos</option>
              <option>Ativo</option>
              <option>Inativo</option>
            </select>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[750px] text-left">
              <thead>
                <tr className="border-b border-gray-100 text-xs uppercase tracking-wide text-gray-400">
                  <th className="pb-4 font-medium">Usuário</th>
                  <th className="pb-4 font-medium">Telefone</th>
                  <th className="pb-4 font-medium">Cargo</th>
                  <th className="pb-4 font-medium">Status</th>
                  <th className="pb-4 text-right font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {usuariosFiltrados.map((usuario) => (
                  <tr
                    key={usuario.id}
                    className="border-b border-gray-50 last:border-0"
                  >
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F1EBDD] font-semibold text-[#9A814C]">
                          {usuario.nome
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">
                            {usuario.nome}
                          </p>
                          <p className="text-xs text-gray-500">
                            {usuario.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-sm text-gray-600">
                      {usuario.telefone}
                    </td>
                    <td className="py-4">
                      <span className="rounded-lg bg-[#F5F1E9] px-3 py-1.5 text-xs font-medium text-[#806a3d]">
                        {usuario.cargo}
                      </span>
                    </td>
                    <td className="py-4">
                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-medium ${usuario.status === "Ativo" ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}
                      >
                        {usuario.status}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          title="Editar"
                          onClick={() => abrirEdicao(usuario)}
                          className="rounded-lg p-2 text-gray-500 hover:bg-[#F5F1E9] hover:text-[#9A814C] cursor-pointer hover:scale-90 duration-500 transition-all"
                        >
                          <Pencil size={17} />
                        </button>
                        <button
                          title={
                            usuario.status === "Ativo" ? "Desativar" : "Ativar"
                          }
                          onClick={() => alternarStatus(usuario)}
                          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 cursor-pointer hover:scale-90 duration-500 transition-all"
                        >
                          {usuario.status === "Ativo" ? (
                            <UserX size={17} />
                          ) : (
                            <UserCheck size={17} />
                          )}
                        </button>
                        <button
                          title="Excluir"
                          onClick={() => excluirUsuario(usuario)}
                          className="rounded-lg p-2 text-red-400 hover:bg-red-50 cursor-pointer hover:scale-90 duration-500 transition-all"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {usuariosFiltrados.length === 0 && (
              <p className="py-10 text-center text-sm text-gray-400">
                Nenhum usuário encontrado.
              </p>
            )}
          </div>
        </section>

        <section className="mt-7 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#F5F1E9] p-3 text-[#9A814C]">
              <ShieldCheck size={21} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">
                Permissões por cargo
              </h3>
              <p className="text-sm text-gray-500">
                Visualize quais áreas cada função pode acessar.
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {Object.entries(permissoesPorCargo).map(([cargo, permissoes]) => (
              <div
                key={cargo}
                className="rounded-xl border border-gray-100 p-4"
              >
                <h4 className="font-semibold text-gray-800">{cargo}</h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {permissoes.map((permissao) => (
                    <span
                      key={permissao}
                      className="rounded-lg bg-[#F4F7F1] px-2.5 py-1 text-xs text-[#648653]"
                    >
                      {permissao}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-gray-400">
            * Nesta demonstração, as permissões são ilustrativas e não bloqueiam
            o acesso real às páginas.
          </p>
        </section>
      </main>

      {modalAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <form
            onSubmit={salvarUsuario}
            className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {usuarioSelecionado ? "Editar usuário" : "Cadastrar usuário"}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Preencha os dados de acesso.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalAberto(false)}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 cursor-pointer hover:scale-90 duration-500 transition-all"
              >
                <X />
              </button>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="text-sm text-gray-600 sm:col-span-2">
                Nome completo
                <input
                  required
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  className={`${inputClass} mt-2`}
                  placeholder="Nome do usuário"
                />
              </label>
              <label className="text-sm text-gray-600">
                E-mail
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={`${inputClass} mt-2`}
                  placeholder="email@empresa.com"
                />
              </label>
              <label className="text-sm text-gray-600">
                Telefone
                <input
                  value={form.telefone}
                  onChange={(e) =>
                    setForm({ ...form, telefone: e.target.value })
                  }
                  className={`${inputClass} mt-2`}
                  placeholder="(21) 00000-0000"
                />
              </label>
              <label className="text-sm text-gray-600">
                Cargo
                <select
                  value={form.cargo}
                  onChange={(e) => setForm({ ...form, cargo: e.target.value })}
                  className={`${inputClass} mt-2`}
                >
                  {Object.keys(permissoesPorCargo).map((cargo) => (
                    <option key={cargo}>{cargo}</option>
                  ))}
                </select>
              </label>
              <label className="text-sm text-gray-600">
                Status
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className={`${inputClass} mt-2`}
                >
                  <option>Ativo</option>
                  <option>Inativo</option>
                </select>
              </label>
              {!usuarioSelecionado && (
                <label className="text-sm text-gray-600 sm:col-span-2">
                  Senha inicial
                  <div className="relative mt-2">
                    <input
                      required
                      type={mostrarSenha ? "text" : "password"}
                      value={form.senha}
                      onChange={(e) =>
                        setForm({ ...form, senha: e.target.value })
                      }
                      className={inputClass}
                      placeholder="Crie uma senha"
                    />
                    <button
                      type="button"
                      onClick={() => setMostrarSenha(!mostrarSenha)}
                      className="absolute right-3 top-3 text-gray-400 cursor-pointer hover:scale-90 duration-500 transition-all"
                    >
                      {mostrarSenha ? <EyeOff size={19} /> : <Eye size={19} />}
                    </button>
                  </div>
                </label>
              )}
            </div>

            <div className="mt-5 rounded-xl bg-[#F8F7F3] p-4">
              <p className="text-sm font-semibold text-gray-700">
                Acesso previsto para {form.cargo}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {(permissoesPorCargo[form.cargo] || []).map((p) => (
                  <span
                    key={p}
                    className="rounded-lg bg-white px-3 py-1.5 text-xs text-gray-600"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setModalAberto(false)}
                className="rounded-xl border border-gray-200 px-5 py-3 text-sm text-gray-600 cursor-pointer hover:scale-90 duration-500 transition-all"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="rounded-xl bg-[#9A814C] px-5 py-3 text-sm font-medium text-white hover:bg-[#806a3d] cursor-pointer hover:scale-90 duration-500 transition-all"
              >
                {usuarioSelecionado ? "Salvar alterações" : "Cadastrar usuário"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default UsersInterface;
