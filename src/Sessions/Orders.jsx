
import React, { useMemo, useState } from "react";
import Sidebar from "../Components/Sidebar";
import HeaderComponent from "../Components/HeaderComponent";
import {
  ShoppingCart, PackagePlus, PackageMinus, History,
  Search, Plus, Trash2, X, ArrowRightLeft,
  Calendar, ChevronDown, Eye, Printer, CheckCircle2,
  AlertTriangle, Box, Store, Warehouse, FileText,
  Clock, User, Filter, RotateCcw
} from "lucide-react";

const produtosIniciais = [
  { id: 1, nome: "Detergente 500ml", preco: 2.5, loja: 35, galpao: 80 },
  { id: 2, nome: "Água Sanitária 1L", preco: 4.2, loja: 18, galpao: 55 },
  { id: 3, nome: "Desinfetante Lavanda 2L", preco: 7.9, loja: 40, galpao: 90 },
  { id: 4, nome: "Sabão em pó 1kg", preco: 8.5, loja: 22, galpao: 60 },
  { id: 5, nome: "Papel toalha", preco: 12, loja: 15, galpao: 35 },
  { id: 6, nome: "Esponja multiuso", preco: 1.8, loja: 50, galpao: 100 },
];

const historicoInicial = [
  {
    id: 1,
    tipo: "Entrada",
    descricao: "Recebimento de mercadorias",
    produto: "Detergente 500ml",
    quantidade: 30,
    local: "Galpão",
    responsavel: "Administrador",
    data: new Date().toISOString(),
    status: "Concluído",
  },
  {
    id: 2,
    tipo: "Saída",
    descricao: "Reposição de loja",
    produto: "Água Sanitária 1L",
    quantidade: 10,
    local: "Loja",
    responsavel: "Gabriel",
    data: new Date().toISOString(),
    status: "Concluído",
  },
];

const moeda = (valor) =>
  Number(valor || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

const dataFormatada = (data) =>
  new Date(data).toLocaleString("pt-BR");

function Orders() {
  const [aba, setAba] = useState("pedido");
  const [produtos, setProdutos] = useState(produtosIniciais);
  const [historico, setHistorico] = useState(historicoInicial);

  const [busca, setBusca] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("Todos");
  const [registroSelecionado, setRegistroSelecionado] = useState(null);

  const [cliente, setCliente] = useState("");
  const [endereco, setEndereco] = useState("");
  const [itensPedido, setItensPedido] = useState([]);
  const [produtoPedido, setProdutoPedido] = useState("");
  const [qtdPedido, setQtdPedido] = useState(1);

  const [fornecedor, setFornecedor] = useState("");
  const [notaFiscal, setNotaFiscal] = useState("");
  const [destino, setDestino] = useState("Galpão");
  const [itensEntrada, setItensEntrada] = useState([]);
  const [produtoEntrada, setProdutoEntrada] = useState("");
  const [qtdEntrada, setQtdEntrada] = useState(1);

  const [origem, setOrigem] = useState("Galpão");
  const [motivo, setMotivo] = useState("Reposição de loja");
  const [destinoSaida, setDestinoSaida] = useState("Loja");
  const [itensSaida, setItensSaida] = useState([]);
  const [produtoSaida, setProdutoSaida] = useState("");
  const [qtdSaida, setQtdSaida] = useState(1);

  const [mostrarModal, setMostrarModal] = useState(false);

  const totalEstoque = produtos.reduce(
    (total, p) => total + p.loja + p.galpao, 0
  );

  const totalLoja = produtos.reduce((total, p) => total + p.loja, 0);
  const totalGalpao = produtos.reduce((total, p) => total + p.galpao, 0);

  const pedidos = historico.filter((h) => h.tipo === "Pedido");
  const entradas = historico.filter((h) => h.tipo === "Entrada");
  const saidas = historico.filter((h) => h.tipo === "Saída");

  const totalPedido = itensPedido.reduce(
    (total, item) => total + item.quantidade * item.preco, 0
  );

  const abas = [
    { id: "pedido", nome: "Novo Pedido", icon: ShoppingCart },
    { id: "entrada", nome: "Entrada", icon: PackagePlus },
    { id: "saida", nome: "Saída", icon: PackageMinus },
    { id: "historico", nome: "Histórico", icon: History },
  ];

  const adicionarItem = (tipo) => {
    const produtoId =
      tipo === "pedido" ? produtoPedido :
      tipo === "entrada" ? produtoEntrada : produtoSaida;

    const quantidade = Number(
      tipo === "pedido" ? qtdPedido :
      tipo === "entrada" ? qtdEntrada : qtdSaida
    );

    const produto = produtos.find((p) => p.id === Number(produtoId));

    if (!produto || !Number.isInteger(quantidade) || quantidade <= 0) {
      alert("Selecione um produto e uma quantidade válida.");
      return;
    }

    const lista =
      tipo === "pedido" ? itensPedido :
      tipo === "entrada" ? itensEntrada : itensSaida;

    if (lista.some((item) => item.id === produto.id)) {
      alert("Este produto já está na lista.");
      return;
    }

    const item = {
      id: produto.id,
      nome: produto.nome,
      quantidade,
      preco: produto.preco,
    };

    if (tipo === "pedido") {
      setItensPedido((prev) => [...prev, item]);
      setProdutoPedido("");
      setQtdPedido(1);
    } else if (tipo === "entrada") {
      setItensEntrada((prev) => [...prev, item]);
      setProdutoEntrada("");
      setQtdEntrada(1);
    } else {
      setItensSaida((prev) => [...prev, item]);
      setProdutoSaida("");
      setQtdSaida(1);
    }
  };

  const removerItem = (tipo, id) => {
    if (tipo === "pedido") {
      setItensPedido((prev) => prev.filter((i) => i.id !== id));
    } else if (tipo === "entrada") {
      setItensEntrada((prev) => prev.filter((i) => i.id !== id));
    } else {
      setItensSaida((prev) => prev.filter((i) => i.id !== id));
    }
  };

  const registrarMovimentacao = (tipo, descricao, itens, local) => {
    const novoHistorico = itens.map((item) => ({
      id: Date.now() + Math.random(),
      tipo,
      descricao,
      produto: item.nome,
      quantidade: item.quantidade,
      local,
      responsavel: "Gabriel",
      data: new Date().toISOString(),
      status: "Concluído",
    }));

    setHistorico((prev) => [...novoHistorico, ...prev]);
  };

  const finalizarPedido = () => {
    if (!cliente.trim() || !endereco.trim() || !itensPedido.length) {
      alert("Preencha cliente, endereço e adicione produtos.");
      return;
    }

    // O pedido representa uma saída da loja.
    const insuficiente = itensPedido.find((item) => {
      const produto = produtos.find((p) => p.id === item.id);
      return produto.loja < item.quantidade;
    });

    if (insuficiente) {
      alert(`Estoque insuficiente na loja: ${insuficiente.nome}`);
      return;
    }

    setProdutos((prev) =>
      prev.map((produto) => {
        const item = itensPedido.find((i) => i.id === produto.id);
        return item
          ? { ...produto, loja: produto.loja - item.quantidade }
          : produto;
      })
    );

    const novoPedido = {
      id: Date.now(),
      tipo: "Pedido",
      descricao: `Pedido para ${cliente}`,
      produto: itensPedido.map((i) => i.nome).join(", "),
      quantidade: itensPedido.reduce((a, i) => a + i.quantidade, 0),
      local: "Loja",
      responsavel: "Gabriel",
      data: new Date().toISOString(),
      status: "Concluído",
      cliente,
      endereco,
      itens: [...itensPedido],
      total: totalPedido,
    };

    setHistorico((prev) => [novoPedido, ...prev]);

    setCliente("");
    setEndereco("");
    setItensPedido([]);
    alert("Pedido registrado com sucesso!");
    setAba("historico");
  };

  const registrarEntrada = () => {
    if (!fornecedor.trim() || !itensEntrada.length) {
      alert("Informe o fornecedor e adicione produtos.");
      return;
    }

    setProdutos((prev) =>
      prev.map((produto) => {
        const item = itensEntrada.find((i) => i.id === produto.id);
        if (!item) return produto;

        return {
          ...produto,
          loja: produto.loja + (destino === "Loja" ? item.quantidade : 0),
          galpao: produto.galpao + (destino === "Galpão" ? item.quantidade : 0),
        };
      })
    );

    registrarMovimentacao(
      "Entrada",
      `Compra de ${fornecedor} - NF ${notaFiscal || "Não informada"}`,
      itensEntrada,
      destino
    );

    setFornecedor("");
    setNotaFiscal("");
    setItensEntrada([]);
    alert("Entrada registrada com sucesso!");
    setAba("historico");
  };

  const registrarSaida = () => {
    if (!itensSaida.length) {
      alert("Adicione pelo menos um produto.");
      return;
    }

    if (origem === destinoSaida) {
      alert("A origem e o destino precisam ser diferentes.");
      return;
    }

    const insuficiente = itensSaida.find((item) => {
      const produto = produtos.find((p) => p.id === item.id);
      return produto[origem === "Loja" ? "loja" : "galpao"] < item.quantidade;
    });

    if (insuficiente) {
      alert(`Estoque insuficiente: ${insuficiente.nome}`);
      return;
    }

    setProdutos((prev) =>
      prev.map((produto) => {
        const item = itensSaida.find((i) => i.id === produto.id);
        if (!item) return produto;

        const campoOrigem = origem === "Loja" ? "loja" : "galpao";
        const campoDestino = destinoSaida === "Loja" ? "loja" : "galpao";

        return {
          ...produto,
          [campoOrigem]: produto[campoOrigem] - item.quantidade,
          [campoDestino]: produto[campoDestino] + item.quantidade,
        };
      })
    );

    registrarMovimentacao(
      "Saída",
      motivo,
      itensSaida,
      `${origem} → ${destinoSaida}`
    );

    setItensSaida([]);
    alert("Movimentação registrada com sucesso!");
    setAba("historico");
  };

  const historicoFiltrado = useMemo(() => {
    return historico.filter((item) => {
      const correspondeBusca =
        `${item.descricao} ${item.produto} ${item.responsavel} ${item.id}`
          .toLowerCase()
          .includes(busca.toLowerCase());

      const correspondeTipo =
        filtroTipo === "Todos" || item.tipo === filtroTipo;

      return correspondeBusca && correspondeTipo;
    });
  }, [historico, busca, filtroTipo]);

  const limparFormulario = () => {
    setCliente("");
    setEndereco("");
    setItensPedido([]);
    setFornecedor("");
    setNotaFiscal("");
    setItensEntrada([]);
    setItensSaida([]);
    setMostrarModal(false);
  };

  const campo = "w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#9A814C] focus:ring-2 focus:ring-[#9A814C]/10 text-sm bg-white";
  const label = "text-sm font-medium text-gray-600 mb-2 block";

  const renderLista = (lista, tipo) => (
    <div className="mt-5 border border-gray-200 rounded-xl overflow-hidden">
      <div className="grid grid-cols-[2fr_1fr_1fr_40px] gap-2 bg-gray-50 p-3 text-xs font-semibold text-gray-500">
        <span>Produto</span>
        <span>Quantidade</span>
        <span>Valor unitário</span>
        <span></span>
      </div>

      {lista.length === 0 ? (
        <div className="py-10 text-center text-sm text-gray-400">
          Nenhum produto adicionado.
        </div>
      ) : (
        lista.map((item) => (
          <div key={item.id} className="grid grid-cols-[2fr_1fr_1fr_40px] gap-2 items-center p-3 border-t border-gray-100 text-sm">
            <span className="font-medium text-gray-700">{item.nome}</span>
            <span>{item.quantidade}</span>
            <span>{moeda(item.preco)}</span>
            <button onClick={() => removerItem(tipo, item.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg">
              <Trash2 size={16}/>
            </button>
          </div>
        ))
      )}
    </div>
  );

  const seletorProduto = (tipo, valor, setValor, quantidade, setQuantidade) => (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_140px_auto] gap-3 items-end">
      <div>
        <label className={label}>Produto</label>
        <select className={campo} value={valor} onChange={(e) => setValor(e.target.value)}>
          <option value="">Selecione um produto</option>
          {produtos.map((p) => (
            <option key={p.id} value={p.id}>{p.nome}</option>
          ))}
        </select>
      </div>
      <div>
        <label className={label}>Quantidade</label>
        <input className={campo} type="number" min="1" value={quantidade} onChange={(e) => setQuantidade(e.target.value)}/>
      </div>
      <button onClick={() => adicionarItem(tipo)} className="bg-[#9A814C] hover:bg-[#826c3e] text-white rounded-lg px-5 py-3 flex items-center justify-center gap-2">
        <Plus size={18}/> Adicionar
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Sidebar/>

      <main className="ml-64 px-8 py-5 min-w-0">
        <HeaderComponent
          title="Movimentações"
          subtitle="Gerencie pedidos, entradas, saídas e histórico do estoque"
        />

        <hr className="border-gray-200 my-5"/>

        {/* Indicadores */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            { nome: "Total em estoque", valor: totalEstoque, icon: Box, cor: "#9A814C" },
            { nome: "Entradas", valor: entradas.length, icon: PackagePlus, cor: "#7FA66D" },
            { nome: "Saídas", valor: saidas.length, icon: PackageMinus, cor: "#D76A63" },
            { nome: "Pedidos", valor: pedidos.length, icon: ShoppingCart, cor: "#8B79A8" },
          ].map((card) => (
            <div key={card.nome} className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4 shadow-sm">
              <div className="p-3 rounded-xl" style={{ backgroundColor: `${card.cor}20`, color: card.cor }}>
                <card.icon size={23}/>
              </div>
              <div>
                <p className="text-sm text-gray-500">{card.nome}</p>
                <p className="text-2xl font-bold text-gray-800">{card.valor.toLocaleString("pt-BR")}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Abas */}
        <div className="flex gap-2 mt-7 border-b border-gray-200 overflow-x-auto">
          {abas.map((item) => (
            <button
              key={item.id}
              onClick={() => setAba(item.id)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                aba === item.id
                  ? "border-[#9A814C] text-[#9A814C]"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              <item.icon size={18}/>
              {item.nome}
            </button>
          ))}
        </div>

        {/* Conteúdo */}
        <section className="mt-6 bg-white border border-gray-200 rounded-xl p-5 md:p-7 shadow-sm">

          {/* NOVO PEDIDO */}
          {aba === "pedido" && (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Criar novo pedido</h2>
                <p className="text-sm text-gray-500 mt-1">Informe os dados do cliente e adicione os produtos.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={label}>Nome do cliente *</label>
                  <input className={campo} value={cliente} onChange={(e) => setCliente(e.target.value)} placeholder="Nome do cliente"/>
                </div>
                <div>
                  <label className={label}>Endereço de entrega *</label>
                  <input className={campo} value={endereco} onChange={(e) => setEndereco(e.target.value)} placeholder="Endereço completo"/>
                </div>
              </div>

              <div className="mt-7">
                <h3 className="font-semibold text-gray-800 mb-4">Produtos do pedido</h3>
                {seletorProduto("pedido", produtoPedido, setProdutoPedido, qtdPedido, setQtdPedido)}
                {renderLista(itensPedido, "pedido")}
              </div>

              <div className="flex justify-end mt-6">
                <div className="w-full md:w-72 bg-gray-50 rounded-xl p-5">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Subtotal</span><span>{moeda(totalPedido)}</span>
                  </div>
                  <div className="flex justify-between mt-3 font-bold text-gray-800">
                    <span>Total</span><span className="text-green-700">{moeda(totalPedido)}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button onClick={limparFormulario} className="border border-gray-300 rounded-lg px-5 py-3 text-sm">Limpar</button>
                <button onClick={finalizarPedido} className="bg-[#9A814C] hover:bg-[#826c3e] text-white rounded-lg px-6 py-3 flex items-center gap-2 text-sm font-medium">
                  <CheckCircle2 size={18}/> Finalizar pedido
                </button>
              </div>
            </>
          )}

          {/* ENTRADA */}
          {aba === "entrada" && (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Entrada de produtos</h2>
                <p className="text-sm text-gray-500 mt-1">Registre os produtos recebidos e atualize o estoque.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className={label}>Fornecedor *</label>
                  <input className={campo} value={fornecedor} onChange={(e) => setFornecedor(e.target.value)} placeholder="Nome do fornecedor"/>
                </div>
                <div>
                  <label className={label}>Nota fiscal</label>
                  <input className={campo} value={notaFiscal} onChange={(e) => setNotaFiscal(e.target.value)} placeholder="Número da nota"/>
                </div>
                <div>
                  <label className={label}>Destino da entrada</label>
                  <select className={campo} value={destino} onChange={(e) => setDestino(e.target.value)}>
                    <option>Loja</option>
                    <option>Galpão</option>
                  </select>
                </div>
              </div>

              <div className="mt-7">
                <h3 className="font-semibold mb-4">Produtos recebidos</h3>
                {seletorProduto("entrada", produtoEntrada, setProdutoEntrada, qtdEntrada, setQtdEntrada)}
                {renderLista(itensEntrada, "entrada")}
              </div>

              <div className="flex justify-end mt-6">
                <button onClick={registrarEntrada} className="bg-[#7FA66D] hover:bg-[#698B59] text-white rounded-lg px-6 py-3 flex gap-2 items-center">
                  <PackagePlus size={18}/> Confirmar entrada
                </button>
              </div>
            </>
          )}

          {/* SAÍDA / TRANSFERÊNCIA */}
          {aba === "saida" && (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Saída e transferência</h2>
                <p className="text-sm text-gray-500 mt-1">Transfira produtos entre os locais de armazenamento.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className={label}>Origem</label>
                  <select className={campo} value={origem} onChange={(e) => setOrigem(e.target.value)}>
                    <option>Galpão</option>
                    <option>Loja</option>
                  </select>
                </div>
                <div>
                  <label className={label}>Destino</label>
                  <select className={campo} value={destinoSaida} onChange={(e) => setDestinoSaida(e.target.value)}>
                    <option>Loja</option>
                    <option>Galpão</option>
                  </select>
                </div>
                <div>
                  <label className={label}>Motivo</label>
                  <select className={campo} value={motivo} onChange={(e) => setMotivo(e.target.value)}>
                    <option>Reposição de loja</option>
                    <option>Consumo interno</option>
                    <option>Retirada para pedido</option>
                    <option>Ajuste de estoque</option>
                    <option>Outro</option>
                  </select>
                </div>
              </div>

              <div className="mt-5 bg-[#F3EEE5] border border-[#9A814C]/20 rounded-lg p-4 flex items-center gap-3 text-sm text-[#806B40]">
                <ArrowRightLeft size={20}/>
                <span>Os produtos serão retirados de <strong>{origem}</strong> e adicionados a <strong>{destinoSaida}</strong>.</span>
              </div>

              <div className="mt-7">
                <h3 className="font-semibold mb-4">Produtos da movimentação</h3>
                {seletorProduto("saida", produtoSaida, setProdutoSaida, qtdSaida, setQtdSaida)}
                {renderLista(itensSaida, "saida")}
              </div>

              <div className="flex justify-end mt-6">
                <button onClick={registrarSaida} className="bg-[#9A814C] hover:bg-[#826c3e] text-white rounded-lg px-6 py-3 flex items-center gap-2">
                  <ArrowRightLeft size={18}/> Confirmar movimentação
                </button>
              </div>
            </>
          )}

          {/* HISTÓRICO */}
          {aba === "historico" && (
            <>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Histórico de movimentações</h2>
                  <p className="text-sm text-gray-500 mt-1">Consulte todas as operações registradas.</p>
                </div>
                <button onClick={() => setBusca("")} className="text-sm text-[#9A814C] flex items-center gap-2">
                  <RotateCcw size={15}/> Limpar pesquisa
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[1fr_190px] gap-3 mt-6">
                <div className="relative">
                  <Search className="absolute left-3 top-3 text-gray-400" size={18}/>
                  <input className={`${campo} pl-10`} placeholder="Buscar produto, responsável ou descrição..." value={busca} onChange={(e) => setBusca(e.target.value)}/>
                </div>
                <select className={campo} value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}>
                  <option>Todos</option>
                  <option>Entrada</option>
                  <option>Saída</option>
                  <option>Pedido</option>
                </select>
              </div>

              <div className="mt-5 overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-500">
                    <tr>
                      <th className="p-4">Movimentação</th>
                      <th className="p-4">Produto</th>
                      <th className="p-4">Quantidade</th>
                      <th className="p-4">Local</th>
                      <th className="p-4">Responsável</th>
                      <th className="p-4">Data</th>
                      <th className="p-4">Detalhes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historicoFiltrado.map((item) => (
                      <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            item.tipo === "Entrada" ? "bg-green-50 text-green-700" :
                            item.tipo === "Saída" ? "bg-red-50 text-red-700" :
                            "bg-[#9A814C]/10 text-[#9A814C]"
                          }`}>{item.tipo}</span>
                        </td>
                        <td className="p-4 font-medium text-gray-700 max-w-48 truncate">{item.produto}</td>
                        <td className="p-4">{item.quantidade}</td>
                        <td className="p-4">{item.local}</td>
                        <td className="p-4">{item.responsavel}</td>
                        <td className="p-4 whitespace-nowrap text-gray-500">{dataFormatada(item.data)}</td>
                        <td className="p-4">
                          <button onClick={() => setRegistroSelecionado(item)} className="text-[#9A814C] hover:bg-[#9A814C]/10 p-2 rounded-lg">
                            <Eye size={18}/>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {historicoFiltrado.length === 0 && (
                  <div className="text-center py-12 text-gray-400">
                    Nenhuma movimentação encontrada.
                  </div>
                )}
              </div>
            </>
          )}
        </section>

        {/* Resumo de estoque */}
        <section className="mt-6 bg-white border border-gray-200 rounded-xl p-5">
          <h2 className="font-semibold text-gray-800 mb-4">Estoque atual por local</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#EAF2E8] rounded-xl p-4 flex items-center gap-3">
              <Store className="text-green-700" size={25}/>
              <div>
                <p className="text-sm text-gray-500">Loja</p>
                <p className="text-2xl font-bold text-gray-800">{totalLoja} unidades</p>
              </div>
            </div>
            <div className="bg-[#F3EEE5] rounded-xl p-4 flex items-center gap-3">
              <Warehouse className="text-[#9A814C]" size={25}/>
              <div>
                <p className="text-sm text-gray-500">Galpão</p>
                <p className="text-2xl font-bold text-gray-800">{totalGalpao} unidades</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Modal de detalhes */}
      {registroSelecionado && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-xl">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-semibold">Detalhes da movimentação</h2>
              <button onClick={() => setRegistroSelecionado(null)} className="text-gray-400 hover:text-red-500">
                <X size={22}/>
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div><p className="text-gray-400">Tipo</p><p className="font-semibold">{registroSelecionado.tipo}</p></div>
              <div><p className="text-gray-400">Descrição</p><p className="font-semibold">{registroSelecionado.descricao}</p></div>
              <div><p className="text-gray-400">Produto(s)</p><p className="font-semibold">{registroSelecionado.produto}</p></div>
              <div><p className="text-gray-400">Quantidade</p><p className="font-semibold">{registroSelecionado.quantidade}</p></div>
              <div><p className="text-gray-400">Local</p><p className="font-semibold">{registroSelecionado.local}</p></div>
              <div><p className="text-gray-400">Responsável</p><p className="font-semibold">{registroSelecionado.responsavel}</p></div>
              <div><p className="text-gray-400">Data</p><p className="font-semibold">{dataFormatada(registroSelecionado.data)}</p></div>
              {registroSelecionado.cliente && (
                <>
                  <div><p className="text-gray-400">Cliente</p><p className="font-semibold">{registroSelecionado.cliente}</p></div>
                  <div><p className="text-gray-400">Endereço</p><p className="font-semibold">{registroSelecionado.endereco}</p></div>
                  <div><p className="text-gray-400">Total do pedido</p><p className="font-bold text-green-700">{moeda(registroSelecionado.total)}</p></div>
                </>
              )}
            </div>

            <button onClick={() => setRegistroSelecionado(null)} className="w-full mt-6 bg-[#9A814C] text-white rounded-lg py-3">
              Fechar detalhes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
