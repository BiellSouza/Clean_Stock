import React, { useState } from "react";
import {
  Building2,
  SlidersHorizontal,
  Bell,
  ShieldCheck,
  Save,
  RotateCcw,
  Upload,
  Eye,
  EyeOff,
  Check,
  Mail,
  Package,
  ClipboardList,
  LockKeyhole,
  Palette,
} from "lucide-react";
import Sidebar from "../Components/Sidebar";
import HeaderComponent from "../Components/HeaderComponent";

function Configuracoes() {
  const [aba, setAba] = useState("empresa");
  const [salvo, setSalvo] = useState(false);

  const [empresa, setEmpresa] = useState({
    nome: "Minha Empresa",
    cnpj: "00.000.000/0001-00",
    telefone: "(21) 3000-0000",
    email: "contato@empresa.com",
    endereco: "São Gonçalo - RJ",
    responsavel: "Administrador",
  });

  const [preferencias, setPreferencias] = useState({
    tema: "Claro",
    idioma: "Português",
    moeda: "BRL (R$)",
    itensPorPagina: "10",
    estoqueMinimo: "10",
    localPadrao: "Loja",
  });

  const [notificacoes, setNotificacoes] = useState({
    estoqueBaixo: true,
    estoqueZerado: true,
    novoPedido: true,
    entradaProduto: false,
    movimentacao: true,
    resumoDiario: false,
  });

  const [seguranca, setSeguranca] = useState({
    sessao: "30",
    exigirSenha: true,
    registrarAtividades: true,
    confirmacaoExclusao: true,
  });

  const [senha, setSenha] = useState({
    atual: "",
    nova: "",
    confirmar: "",
  });

  const [mostrarSenhas, setMostrarSenhas] = useState(false);

  const inputClass =
    "mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#9A814C]";

  const abas = [
    { id: "empresa", label: "Empresa", icon: Building2 },
    { id: "preferencias", label: "Preferências", icon: SlidersHorizontal },
    { id: "notificacoes", label: "Notificações", icon: Bell },
    { id: "seguranca", label: "Segurança", icon: ShieldCheck },
  ];

  function salvarConfiguracoes() {
    setSalvo(true);
    setTimeout(() => setSalvo(false), 2500);
  }

  function atualizarEmpresa(campo, valor) {
    setEmpresa((prev) => ({ ...prev, [campo]: valor }));
  }

  function atualizarPreferencia(campo, valor) {
    setPreferencias((prev) => ({ ...prev, [campo]: valor }));
  }

  function alternarNotificacao(campo) {
    setNotificacoes((prev) => ({ ...prev, [campo]: !prev[campo] }));
  }

  function alternarSeguranca(campo) {
    setSeguranca((prev) => ({ ...prev, [campo]: !prev[campo] }));
  }

  function alterarSenha(e) {
    e.preventDefault();

    if (senha.nova !== senha.confirmar) {
      alert("A nova senha e a confirmação não coincidem.");
      return;
    }

    if (!senha.nova || !senha.atual) {
      alert("Preencha todos os campos de senha.");
      return;
    }

    alert("Senha alterada na demonstração!");
    setSenha({ atual: "", nova: "", confirmar: "" });
  }

  function restaurarPreferencias() {
    setPreferencias({
      tema: "Claro",
      idioma: "Português",
      moeda: "BRL (R$)",
      itensPorPagina: "10",
      estoqueMinimo: "10",
      localPadrao: "Loja",
    });
  }

  return (
    <div className="min-h-screen bg-[#F8F8F6]">
      <Sidebar />

      <main className="ml-54 min-h-screen p-6">
        <HeaderComponent
          title="Configurações"
          subtitle="Personalize o funcionamento do seu sistema"
        />

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800">
            Central de configurações
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Gerencie as informações e preferências da sua empresa.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2 rounded-2xl border border-gray-100 bg-white p-2 shadow-sm">
          {abas.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setAba(item.id)}
                className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium cursor-pointer hover:scale-90 duration-500 transition-all ${
                  aba === item.id
                    ? "bg-[#9A814C] text-white"
                    : "text-gray-500 hover:bg-[#F7F5F0] hover:text-[#9A814C]"
                }`}
              >
                <Icon size={18} /> {item.label}
              </button>
            );
          })}
        </div>

        <section className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          {aba === "empresa" && (
            <>
              <div className="flex items-center gap-3 border-b border-gray-100 pb-5">
                <div className="rounded-xl bg-[#F5F1E9] p-3 text-[#9A814C]">
                  <Building2 size={22} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Dados da empresa
                  </h3>
                  <p className="text-sm text-gray-500">
                    Informações utilizadas nos pedidos e documentos.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 text-[#9A814C]">
                  <Building2 size={35} />
                </div>
                <div>
                  <p className="font-medium text-gray-700">
                    Logotipo da empresa
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    Área ilustrativa para adicionar a identidade visual.
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      alert(
                        "Upload de logotipo será implementado posteriormente.",
                      )
                    }
                    className="mt-3 flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer hover:scale-90 duration-500 transition-all"
                  >
                    <Upload size={16} /> Adicionar logotipo
                  </button>
                </div>
              </div>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                {[
                  ["nome", "Nome da empresa"],
                  ["cnpj", "CNPJ"],
                  ["telefone", "Telefone"],
                  ["email", "E-mail"],
                  ["endereco", "Endereço"],
                  ["responsavel", "Responsável"],
                ].map(([campo, label]) => (
                  <label
                    key={campo}
                    className="text-sm font-medium text-gray-600"
                  >
                    {label}
                    <input
                      value={empresa[campo]}
                      onChange={(e) => atualizarEmpresa(campo, e.target.value)}
                      className={inputClass}
                    />
                  </label>
                ))}
              </div>
            </>
          )}

          {aba === "preferencias" && (
            <>
              <div className="flex items-center gap-3 border-b border-gray-100 pb-5">
                <div className="rounded-xl bg-[#F5F1E9] p-3 text-[#9A814C]">
                  <SlidersHorizontal size={22} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Preferências do sistema
                  </h3>
                  <p className="text-sm text-gray-500">
                    Defina como as informações serão exibidas.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-medium text-gray-600">
                  Tema
                  <select
                    value={preferencias.tema}
                    onChange={(e) =>
                      atualizarPreferencia("tema", e.target.value)
                    }
                    className={inputClass}
                  >
                    <option>Claro</option>
                    <option>Escuro</option>
                    <option>Automático</option>
                  </select>
                </label>
                <label className="text-sm font-medium text-gray-600">
                  Idioma
                  <select
                    value={preferencias.idioma}
                    onChange={(e) =>
                      atualizarPreferencia("idioma", e.target.value)
                    }
                    className={inputClass}
                  >
                    <option>Português</option>
                    <option>English</option>
                    <option>Español</option>
                  </select>
                </label>
                <label className="text-sm font-medium text-gray-600">
                  Moeda
                  <select
                    value={preferencias.moeda}
                    onChange={(e) =>
                      atualizarPreferencia("moeda", e.target.value)
                    }
                    className={inputClass}
                  >
                    <option>BRL (R$)</option>
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                  </select>
                </label>
                <label className="text-sm font-medium text-gray-600">
                  Itens por página
                  <select
                    value={preferencias.itensPorPagina}
                    onChange={(e) =>
                      atualizarPreferencia("itensPorPagina", e.target.value)
                    }
                    className={inputClass}
                  >
                    <option value="10">10 itens</option>
                    <option value="20">20 itens</option>
                    <option value="50">50 itens</option>
                    <option value="100">100 itens</option>
                  </select>
                </label>
                <label className="text-sm font-medium text-gray-600">
                  Estoque mínimo padrão
                  <input
                    type="number"
                    min="0"
                    value={preferencias.estoqueMinimo}
                    onChange={(e) =>
                      atualizarPreferencia("estoqueMinimo", e.target.value)
                    }
                    className={inputClass}
                  />
                </label>
                <label className="text-sm font-medium text-gray-600">
                  Local padrão para movimentações
                  <select
                    value={preferencias.localPadrao}
                    onChange={(e) =>
                      atualizarPreferencia("localPadrao", e.target.value)
                    }
                    className={inputClass}
                  >
                    <option>Loja</option>
                    <option>Galpão</option>
                  </select>
                </label>
              </div>

              <button
                onClick={restaurarPreferencias}
                className="mt-6 flex items-center gap-2 text-sm text-gray-500 hover:text-[#9A814C] cursor-pointer hover:scale-90 duration-500 transition-all"
              >
                <RotateCcw size={16} /> Restaurar preferências padrão
              </button>
            </>
          )}

          {aba === "notificacoes" && (
            <>
              <div className="flex items-center gap-3 border-b border-gray-100 pb-5">
                <div className="rounded-xl bg-[#F5F1E9] p-3 text-[#9A814C]">
                  <Bell size={22} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Notificações</h3>
                  <p className="text-sm text-gray-500">
                    Escolha quais alertas deseja receber.
                  </p>
                </div>
              </div>

              <div className="mt-5 divide-y divide-gray-100">
                {[
                  [
                    "estoqueBaixo",
                    "Estoque baixo",
                    "Avisar quando um produto atingir o limite mínimo.",
                    Package,
                  ],
                  [
                    "estoqueZerado",
                    "Produto sem estoque",
                    "Avisar quando a quantidade disponível chegar a zero.",
                    LockKeyhole,
                  ],
                  [
                    "novoPedido",
                    "Novo pedido",
                    "Notificar quando um novo pedido for registrado.",
                    ClipboardList,
                  ],
                  [
                    "entradaProduto",
                    "Entrada de produtos",
                    "Avisar quando houver uma nova entrada no estoque.",
                    Package,
                  ],
                  [
                    "movimentacao",
                    "Movimentações",
                    "Notificar transferências e saídas de produtos.",
                    SlidersHorizontal,
                  ],
                  [
                    "resumoDiario",
                    "Resumo diário",
                    "Receber um resumo das movimentações do dia.",
                    Mail,
                  ],
                ].map(([campo, titulo, descricao, Icon]) => (
                  <div
                    key={campo}
                    className="flex items-center justify-between gap-4 py-5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-gray-50 p-3 text-gray-500">
                        <Icon size={19} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {titulo}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {descricao}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => alternarNotificacao(campo)}
                      className={`relative h-6 w-11 shrink-0 rounded-full cursor-pointer hover:scale-90 duration-500 transition-all ${notificacoes[campo] ? "bg-[#7FA66D]" : "bg-gray-300"}`}
                      aria-label={`Alternar ${titulo}`}
                    >
                      <span
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${notificacoes[campo] ? "left-6" : "left-1"}`}
                      />
                    </button>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-gray-400">
                * Os alertas são preferências visuais nesta versão de
                demonstração.
              </p>
            </>
          )}

          {aba === "seguranca" && (
            <>
              <div className="flex items-center gap-3 border-b border-gray-100 pb-5">
                <div className="rounded-xl bg-[#F5F1E9] p-3 text-[#9A814C]">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Segurança e acesso
                  </h3>
                  <p className="text-sm text-gray-500">
                    Preferências de proteção e registro de atividades.
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-5">
                <label className="block text-sm font-medium text-gray-600">
                  Tempo de sessão
                  <select
                    value={seguranca.sessao}
                    onChange={(e) =>
                      setSeguranca({ ...seguranca, sessao: e.target.value })
                    }
                    className={inputClass}
                  >
                    <option value="15">15 minutos</option>
                    <option value="30">30 minutos</option>
                    <option value="60">1 hora</option>
                    <option value="120">2 horas</option>
                  </select>
                </label>

                {[
                  [
                    "exigirSenha",
                    "Exigir senha para acesso",
                    "Solicitar autenticação para entrar no sistema.",
                  ],
                  [
                    "registrarAtividades",
                    "Registrar atividades",
                    "Manter um histórico de ações realizadas pelos usuários.",
                  ],
                  [
                    "confirmacaoExclusao",
                    "Confirmar exclusões",
                    "Solicitar confirmação antes de excluir registros.",
                  ],
                ].map(([campo, titulo, descricao]) => (
                  <div
                    key={campo}
                    className="flex items-center justify-between gap-4 rounded-xl border border-gray-100 p-4"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {titulo}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">{descricao}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={seguranca[campo]}
                      onChange={() => alternarSeguranca(campo)}
                      className="h-5 w-5 accent-[#7FA66D]"
                    />
                  </div>
                ))}
              </div>

              <form
                onSubmit={alterarSenha}
                className="mt-8 border-t border-gray-100 pt-6"
              >
                <h4 className="font-semibold text-gray-800">Alterar senha</h4>
                <p className="mt-1 text-sm text-gray-500">
                  Atualize a senha da conta atual.
                </p>

                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  {[
                    ["atual", "Senha atual"],
                    ["nova", "Nova senha"],
                    ["confirmar", "Confirmar nova senha"],
                  ].map(([campo, label]) => (
                    <label key={campo} className="text-sm text-gray-600">
                      {label}
                      <input
                        required
                        type={mostrarSenhas ? "text" : "password"}
                        value={senha[campo]}
                        onChange={(e) =>
                          setSenha({ ...senha, [campo]: e.target.value })
                        }
                        className={inputClass}
                      />
                    </label>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setMostrarSenhas(!mostrarSenhas)}
                  className="mt-3 flex items-center gap-2 text-xs text-gray-500 cursor-pointer hover:scale-90 duration-500 transition-all"
                >
                  {mostrarSenhas ? <EyeOff size={15} /> : <Eye size={15} />}
                  {mostrarSenhas ? "Ocultar senhas" : "Mostrar senhas"}
                </button>

                <button
                  type="submit"
                  className="mt-4 rounded-xl border border-[#9A814C] px-4 py-2.5 text-sm font-medium text-[#9A814C] hover:bg-[#F8F5EF] cursor-pointer hover:scale-90 duration-500 transition-all"
                >
                  Alterar senha
                </button>
              </form>

              <div className="mt-8 rounded-xl border border-amber-100 bg-amber-50 p-4">
                <p className="text-sm font-semibold text-amber-800">Atenção</p>
                <p className="mt-1 text-xs leading-5 text-amber-700">
                  As opções de segurança são demonstrativas. A proteção real de
                  contas, sessões e senhas depende da implementação de
                  autenticação no backend.
                </p>
              </div>
            </>
          )}

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-5">
            <p className="text-xs text-gray-400">
              As alterações desta demonstração ficam apenas na memória da
              página.
            </p>
            <button
              onClick={salvarConfiguracoes}
              className="flex items-center gap-2 rounded-xl bg-[#9A814C] px-5 py-3 text-sm font-medium text-white hover:bg-[#806a3d] cursor-pointer hover:scale-90 duration-500 transition-all"
            >
              {salvo ? <Check size={17} /> : <Save size={17} />}
              {salvo ? "Salvo!" : "Salvar configurações"}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Configuracoes;
