import React, { useState } from "react";
import SidebarComponent from "../Components/Sidebar";
import SearchComponent from "../Components/SearchComponent";
import HeaderComponent from "../Components/HeaderComponent";
import {
  ArrowRight,
  Box,
  Calendar,
  Check,
  CheckCircle,
  ChevronDown,
  ClipboardList,
  Clock,
  Home,
  Plus,
  ShoppingCart,
  Store,
  Trash2,
  TriangleAlert,
  TrendingDown,
  TrendingUp,
  PackagePlus,
  PackageMinus,
  X,
} from "lucide-react";

function Estoque() {
  const [listAberta, setListAberta] = useState(false);
  const [selecionado, setSelecionado] = useState("Este mês");

  // Lembretes
  const [lembrete, setLembrete] = useState("");
  const [lembretes, setLembretes] = useState([
    {
      id: 1,
      texto: "Conferir produtos próximos do vencimento",
      concluido: false,
    },
    { id: 2, texto: "Solicitar reposição de detergente", concluido: true },
  ]);

  const options = ["Hoje", "Esta semana", "Este mês", "Este ano"];

  // Dados ilustrativos
  const estoqueLoja = 612;
  const estoqueGalpao = 636;
  const total = estoqueLoja + estoqueGalpao;

  const porcentagemLoja = total > 0 ? (estoqueLoja / total) * 100 : 0;
  const porcentagemGalpao = total > 0 ? (estoqueGalpao / total) * 100 : 0;

  const infosCard = [
    {
      icon: <Box size={22} />,
      label: "Total de itens",
      value: total.toLocaleString("pt-BR"),
      obs: "+12% em relação ao período anterior",
      color: "#DFF0E8",
      colorIcon: "#178223",
    },
    {
      icon: <Store size={22} />,
      label: "Estoque da loja",
      value: estoqueLoja.toLocaleString("pt-BR"),
      obs: "+8% em relação ao período anterior",
      color: "#DFF0E8",
      colorIcon: "#178223",
    },
    {
      icon: <Home size={22} />,
      label: "Estoque do galpão",
      value: estoqueGalpao.toLocaleString("pt-BR"),
      obs: "+14% em relação ao período anterior",
      color: "#DFF0E8",
      colorIcon: "#178223",
    },
    {
      icon: <TriangleAlert size={22} />,
      label: "Estoque baixo",
      value: 8,
      obs: "Requer atenção",
      color: "#FEEFEE",
      colorIcon: "#DF2323",
    },
  ];

  const atividades = [
    {
      tipo: "entrada",
      titulo: "Entrada de produtos",
      descricao: "25 unidades de detergente",
      usuario: "Gabriel",
      horario: "10:32",
    },
    {
      tipo: "pedido",
      titulo: "Pedido criado",
      descricao: "Pedido #0248",
      usuario: "Gabriel",
      horario: "09:45",
    },
    {
      tipo: "saida",
      titulo: "Saída de produtos",
      descricao: "12 unidades de água sanitária",
      usuario: "Administrador",
      horario: "09:20",
    },
    {
      tipo: "entrada",
      titulo: "Entrada de produtos",
      descricao: "40 unidades de desinfetante",
      usuario: "Gabriel",
      horario: "08:50",
    },
  ];

  const alertas = [
    { nome: "Detergente 500ml", quantidade: 8, minimo: 20 },
    { nome: "Água sanitária 1L", quantidade: 5, minimo: 15 },
    { nome: "Sabão em pó 1kg", quantidade: 3, minimo: 10 },
  ];

  const movimentacoes = {
    entradas: 86,
    saidas: 42,
  };

  // Adicionar lembrete
  const adicionarLembrete = () => {
    if (!lembrete.trim()) return;

    setLembretes((prev) => [
      {
        id: Date.now(),
        texto: lembrete.trim(),
        concluido: false,
      },
      ...prev,
    ]);

    setLembrete("");
  };

  // Concluir lembrete
  const concluirLembrete = (id) => {
    setLembretes((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, concluido: !item.concluido } : item,
      ),
    );
  };

  // Excluir lembrete
  const excluirLembrete = (id) => {
    setLembretes((prev) => prev.filter((item) => item.id !== id));
  };

  const atividadesIcones = {
    entrada: <PackagePlus size={18} />,
    saida: <PackageMinus size={18} />,
    pedido: <ShoppingCart size={18} />,
  };

  const atividadesCores = {
    entrada: "bg-green-100 text-green-700",
    saida: "bg-red-100 text-red-700",
    pedido: "bg-[#9A814C]/10 text-[#9A814C]",
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <SidebarComponent />

      <div className="flex w-full">
        <div className="ml-54 py-4 px-8 w-full min-w-0">
          <SearchComponent />

          <hr className="w-full opacity-20 mt-4 mb-2" />

          {/* Cabeçalho */}
          <section className="flex flex-wrap items-center justify-between gap-4 mt-4">
            <HeaderComponent
              title="Visão Geral"
              subtitle="Acompanhe os principais indicadores do seu estoque"
            />

            {/* Filtro de período */}
            <div className="relative border border-black/20 rounded-md px-3 py-2">
              <button
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setListAberta(!listAberta)}
              >
                <Calendar size={16} />
                <span className="text-sm">{selecionado}</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    listAberta ? "rotate-180" : ""
                  }`}
                />
              </button>

              {listAberta && (
                <div className="absolute right-0 mt-2 bg-white border border-black/10 shadow-lg rounded-lg p-1 w-44 z-20">
                  {options.map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        setSelecionado(item);
                        setListAberta(false);
                      }}
                      className={`w-full flex items-center justify-between text-left px-3 py-2 text-sm rounded-md hover:bg-gray-100 ${
                        selecionado === item
                          ? "bg-[#9A814C]/10 text-[#9A814C] font-medium"
                          : "text-gray-700"
                      }`}
                    >
                      {item}
                      {selecionado === item && <CheckCircle size={16} />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Cards */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {infosCard.map((info, index) => (
              <div
                key={index}
                className="border border-gray-200 bg-white w-full rounded-xl p-5 flex gap-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className="mt-1 h-fit p-3 rounded-xl"
                  style={{
                    backgroundColor: info.color,
                    color: info.colorIcon,
                  }}
                >
                  {info.icon}
                </div>

                <div className="flex flex-col min-w-0">
                  <h2 className="text-sm text-gray-500 font-medium">
                    {info.label}
                  </h2>

                  <p className="text-3xl font-bold text-gray-800 mt-2">
                    {info.value}
                  </p>

                  <p style={{ color: info.colorIcon }} className="text-xs mt-2">
                    {info.obs}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Ações rápidas */}
          <section className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Ações rápidas
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                onClick={() => alert("Botão fictício!")}
                className="bg-[#9A814C] hover:bg-[#826c3e] text-white rounded-xl p-4 flex items-center gap-3 transition-colors"
              >
                <div className="p-2 bg-white/20 rounded-lg">
                  <PackagePlus size={20} />
                </div>
                <div className="text-left">
                  <p className="font-semibold">Registrar entrada</p>
                  <p className="text-xs text-white/80">Adicionar produtos</p>
                </div>
                <ArrowRight className="ml-auto cursor-pointer" size={18} />
              </button>

              <button
                onClick={() => alert("Botão fictício!")}
                className="bg-[#7FA66D] hover:bg-[#698b59] text-white rounded-xl p-4 flex items-center gap-3 transition-colors"
              >
                <div className="p-2 bg-white/20 rounded-lg">
                  <ShoppingCart size={20} />
                </div>
                <div className="text-left">
                  <p className="font-semibold">Criar pedido</p>
                  <p className="text-xs text-white/80">Gerar novo pedido</p>
                </div>
                <ArrowRight className="ml-auto cursor-pointer" size={18} />
              </button>

              <button
                onClick={() => alert("Botão fictício!")}
                className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 rounded-xl p-4 flex items-center gap-3 transition-colors"
              >
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Box size={20} />
                </div>
                <div className="text-left">
                  <p className="font-semibold">Cadastrar produto</p>
                  <p className="text-xs text-gray-500">Novo item no sistema</p>
                </div>
                <ArrowRight className="ml-auto cursor-pointer" size={18} />
              </button>
            </div>
          </section>

          {/* Gráfico e atividade */}
          <div className="mt-6 grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Distribuição */}
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800">
                Distribuição do estoque
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Comparativo entre loja e galpão
              </p>

              <div className="flex flex-wrap items-center justify-center gap-8 mt-8">
                {/* Gráfico */}
                <div
                  className="relative w-48 h-48 shrink-0 rounded-full"
                  style={{
                    background: `conic-gradient(
                      #7FA66D 0% ${porcentagemLoja}%,
                      #9A814C ${porcentagemLoja}% 100%
                    )`,
                  }}
                >
                  <div className="absolute inset-[20%] bg-white rounded-full flex flex-col items-center justify-center">
                    <h2 className="text-3xl font-bold text-gray-800">
                      {porcentagemLoja.toFixed(0)}%
                    </h2>
                    <p className="text-sm font-medium text-gray-500">Loja</p>
                  </div>
                </div>

                {/* Legenda */}
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-[#7FA66D]" />
                    <div>
                      <p className="text-sm text-gray-500">Loja</p>
                      <p className="font-semibold text-gray-800">
                        {estoqueLoja.toLocaleString("pt-BR")} (
                        {porcentagemLoja.toFixed(0)}%)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-[#9A814C]" />
                    <div>
                      <p className="text-sm text-gray-500">Galpão</p>
                      <p className="font-semibold text-gray-800">
                        {estoqueGalpao.toLocaleString("pt-BR")} (
                        {porcentagemGalpao.toFixed(0)}%)
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-3">
                    <p className="text-xs text-gray-500">Quantidade total</p>
                    <p className="text-xl font-bold text-gray-800">
                      {total.toLocaleString("pt-BR")} unidades
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Atividade recente */}
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Atividade recente
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Últimas movimentações
                  </p>
                </div>

                <button
                  onClick={() => (window.location.href = "/historico")}
                  className="flex items-center gap-1 text-sm text-[#7FA66D] hover:underline cursor-pointer"
                >
                  Ver todos <ArrowRight className="cursor-pointer" size={16} />
                </button>
              </div>

              <div className="mt-5 flex flex-col gap-4">
                {atividades.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div
                      className={`p-3 rounded-xl shrink-0 ${
                        atividadesCores[item.tipo]
                      }`}
                    >
                      {atividadesIcones[item.tipo]}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-gray-800">
                        {item.titulo}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {item.descricao}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {item.usuario}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-gray-400 shrink-0">
                      <Clock size={13} />
                      {item.horario}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Movimentações e alertas */}
          <div className="mt-6 grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Resumo movimentações */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800">
                Resumo de movimentações
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Movimentações do período selecionado
              </p>

              <div className="grid grid-cols-2 gap-4 mt-6">
                {/* Entradas */}
                <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                  <div className="flex items-center gap-2 text-green-700">
                    <TrendingUp size={18} />
                    <span className="text-sm font-medium">Entradas</span>
                  </div>

                  <p className="text-3xl font-bold text-green-800 mt-3">
                    +{movimentacoes.entradas}
                  </p>

                  <p className="text-xs text-green-700 mt-1">
                    Produtos adicionados
                  </p>
                </div>

                {/* Saídas */}
                <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                  <div className="flex items-center gap-2 text-red-700">
                    <TrendingDown size={18} />
                    <span className="text-sm font-medium">Saídas</span>
                  </div>

                  <p className="text-3xl font-bold text-red-800 mt-3">
                    -{movimentacoes.saidas}
                  </p>

                  <p className="text-xs text-red-700 mt-1">
                    Produtos retirados
                  </p>
                </div>
              </div>

              {/* Barra comparativa */}
              <div className="mt-6">
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span>Proporção de movimentações</span>
                  <span>{movimentacoes.entradas + movimentacoes.saidas}</span>
                </div>

                <div className="w-full h-3 bg-red-100 rounded-full overflow-hidden flex">
                  <div
                    className="bg-[#7FA66D] h-full rounded-full transition-all"
                    style={{
                      width: `${
                        (movimentacoes.entradas /
                          (movimentacoes.entradas + movimentacoes.saidas)) *
                        100
                      }%`,
                    }}
                  />
                </div>

                <div className="flex items-center justify-between mt-3 text-xs">
                  <span className="text-green-700">
                    Entradas{" "}
                    {(
                      (movimentacoes.entradas /
                        (movimentacoes.entradas + movimentacoes.saidas)) *
                      100
                    ).toFixed(0)}
                    %
                  </span>

                  <span className="text-red-700">
                    Saídas{" "}
                    {(
                      (movimentacoes.saidas /
                        (movimentacoes.entradas + movimentacoes.saidas)) *
                      100
                    ).toFixed(0)}
                    %
                  </span>
                </div>
              </div>
            </div>

            {/* Alertas */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Alertas de estoque
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Produtos que precisam de atenção
                  </p>
                </div>

                <div className="p-2 rounded-lg bg-red-50 text-red-600">
                  <TriangleAlert size={20} />
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-4">
                {alertas.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-3 border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <p className="font-medium text-sm text-gray-800">
                        {item.nome}
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        Mínimo esperado: {item.minimo}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="font-bold text-red-600">
                        {item.quantidade} unidades
                      </p>

                      <span className="text-xs text-red-500">
                        Abaixo do mínimo
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Lembretes */}
          <section className="mt-6 mb-8 bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <ClipboardList size={20} className="text-[#9A814C]" />
                  <h2 className="text-lg font-semibold text-gray-800">
                    Meus lembretes
                  </h2>
                </div>

                <p className="text-sm text-gray-500 mt-1">
                  Anote tarefas e pendências importantes
                </p>
              </div>

              <span className="text-xs bg-[#9A814C]/10 text-[#9A814C] px-3 py-1 rounded-full">
                {lembretes.filter((item) => !item.concluido).length} pendentes
              </span>
            </div>

            {/* Campo de adicionar */}
            <div className="flex gap-2 mt-5">
              <input
                type="text"
                value={lembrete}
                onChange={(e) => setLembrete(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") adicionarLembrete();
                }}
                placeholder="Digite um lembrete..."
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#9A814C] focus:ring-2 focus:ring-[#9A814C]/10"
              />

              <button
                onClick={adicionarLembrete}
                className="bg-[#9A814C] hover:bg-[#826c3e] text-white rounded-lg px-4 flex items-center justify-center transition-colors"
              >
                <Plus className="cursor-pointer" size={20} />
              </button>
            </div>

            {/* Lista */}
            <div className="mt-5 flex flex-col gap-3">
              {lembretes.length === 0 ? (
                <div className="py-8 text-center text-gray-400">
                  <ClipboardList
                    size={30}
                    className="mx-auto mb-2 opacity-50"
                  />
                  <p className="text-sm">Nenhum lembrete cadastrado</p>
                </div>
              ) : (
                lembretes.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center gap-3 border border-gray-100 rounded-lg p-3 ${
                      item.concluido ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <button
                      onClick={() => concluirLembrete(item.id)}
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border transition-colors ${
                        item.concluido
                          ? "bg-green-600 border-green-600 text-white"
                          : "border-gray-300 hover:border-[#9A814C]"
                      }`}
                    >
                      {item.concluido && <Check size={14} />}
                    </button>

                    <p
                      className={`flex-1 text-sm ${
                        item.concluido
                          ? "line-through text-gray-400"
                          : "text-gray-700"
                      }`}
                    >
                      {item.texto}
                    </p>

                    <button
                      onClick={() => excluirLembrete(item.id)}
                      className="p-2 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="cursor-pointer" size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Estoque;
