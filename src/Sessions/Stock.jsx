import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import Sidebar from "../Components/Sidebar";
import HeaderComponent from "../Components/HeaderComponent";

import {
  Warehouse,
  ShelvingUnit,
  CircleHelp,
  Plus,
  History,
  Search,
  Store,
  X,
  Ellipsis,
  Info,
  Trash2,
} from "lucide-react";

function Stock() {
  const styleButtons =
    "border border-primary/20 p-2 bg-primary/5 rounded-lg text-primaryDark hover:scale-90 transition-all duration-300 cursor-pointer";

  // ESTADOS
  const [selected, setSelected] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [pesquisa, setPesquisa] = useState("");

  const [novoProduto, setNovoProduto] = useState({
    nome: "",
    categoria: "",
    unidade: "UN",
    preco: "",
    estoqueLoja: "",
    estoqueGalpao: "",
    estoqueMinimo: "",
    imagem: null,
    imagemPreview: "",
  });

  // CÁLCULOS DO ESTOQUE
  const loja = produtos.reduce(
    (total, produto) => total + Number(produto.estoqueLoja || 0),
    0,
  );

  const galpao = produtos.reduce(
    (total, produto) => total + Number(produto.estoqueGalpao || 0),
    0,
  );

  const totalProdutos = loja + galpao;

  const infos = [
    {
      icon: <ShelvingUnit size={22} />,
      label: "Total Geral",
      mount: totalProdutos,
    },
    {
      icon: <Store size={22} />,
      label: "Loja",
      mount: loja,
    },
    {
      icon: <Warehouse size={22} />,
      label: "Galpão",
      mount: galpao,
    },
  ];

  // BUSCAR PRODUTOS NO SUPABASE
  const buscarProdutos = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("produtos")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Erro ao buscar produtos:", error.message);
      alert("Não foi possível carregar os produtos.");
      setLoading(false);
      return;
    }

    const produtosFormatados = data.map((produto) => ({
      id: produto.id,
      nome: produto.nome,
      categoria: produto.categoria,
      unidade: produto.unidade,
      preco: Number(produto.preco || 0),
      estoqueLoja: Number(produto.estoque_loja || 0),
      estoqueGalpao: Number(produto.estoque_galpao || 0),
      estoqueMinimo: Number(produto.estoque_minimo || 0),
      imagem: produto.imagem,
      descricao: produto.descricao || "",
    }));

    setProdutos(produtosFormatados);
    setLoading(false);
  };

  useEffect(() => {
    buscarProdutos();
  }, []);

  // FILTRAR PRODUTOS
  const produtosFiltrados = produtos.filter((produto) => {
    const termo = pesquisa.toLowerCase().trim();

    return (
      produto.nome?.toLowerCase().includes(termo) ||
      produto.categoria?.toLowerCase().includes(termo)
    );
  });

  // ALTERAR CAMPOS
  const handleChange = (e) => {
    const { name, value } = e.target;

    setNovoProduto((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // SELECIONAR IMAGEM
  const handleImagem = (e) => {
    const arquivo = e.target.files?.[0];

    if (!arquivo) return;

    if (!arquivo.type.startsWith("image/")) {
      alert("Selecione um arquivo de imagem válido.");
      return;
    }

    setNovoProduto((prev) => ({
      ...prev,
      imagem: arquivo,
      imagemPreview: URL.createObjectURL(arquivo),
    }));
  };

  // LIMPAR FORMULÁRIO
  const limparFormulario = () => {
    if (novoProduto.imagemPreview) {
      URL.revokeObjectURL(novoProduto.imagemPreview);
    }

    setNovoProduto({
      nome: "",
      categoria: "",
      unidade: "UN",
      preco: "",
      estoqueLoja: "",
      estoqueGalpao: "",
      estoqueMinimo: "",
      imagem: null,
      imagemPreview: "",
    });
  };

  // FECHAR MODAL DE CADASTRO
  const fecharModal = () => {
    limparFormulario();
    setModalOpen(false);
  };

  // CADASTRAR PRODUTO
  const adicionarProduto = async (e) => {
    e.preventDefault();

    const campos = {
      nome: novoProduto.nome,
      categoria: novoProduto.categoria,
      unidade: novoProduto.unidade,
      preco: novoProduto.preco,
      estoqueLoja: novoProduto.estoqueLoja,
      estoqueGalpao: novoProduto.estoqueGalpao,
      estoqueMinimo: novoProduto.estoqueMinimo,
    };

    const campoVazio = Object.entries(campos).find(
      ([campo, valor]) =>
        valor === "" ||
        valor === null ||
        valor === undefined ||
        (typeof valor === "string" && valor.trim() === ""),
    );

    if (campoVazio) {
      alert(`Preencha o campo: ${campoVazio[0]}`);
      return;
    }

    const valoresNumericos = {
      preco: Number(novoProduto.preco),
      estoqueLoja: Number(novoProduto.estoqueLoja),
      estoqueGalpao: Number(novoProduto.estoqueGalpao),
      estoqueMinimo: Number(novoProduto.estoqueMinimo),
    };

    const valorInvalido = Object.entries(valoresNumericos).find(
      ([campo, valor]) => !Number.isFinite(valor) || valor < 0,
    );

    if (valorInvalido) {
      alert(`Verifique o valor do campo: ${valorInvalido[0]}`);
      return;
    }

    // VERIFICAR DUPLICIDADE
    const nomeNormalizado = novoProduto.nome.trim().toLowerCase();

    const produtoDuplicado = produtos.some(
      (produto) =>
        produto.nome.trim().toLowerCase() === nomeNormalizado &&
        produto.unidade === novoProduto.unidade,
    );

    if (produtoDuplicado) {
      alert("Esse produto já está cadastrado no estoque!");
      return;
    }

    setSalvando(true);

    try {
      let imagemUrl = null;

      // UPLOAD DA IMAGEM
      if (novoProduto.imagem instanceof File) {
        const arquivo = novoProduto.imagem;
        const extensao = arquivo.name.split(".").pop();
        const nomeArquivo = `${crypto.randomUUID()}.${extensao}`;

        const { error: uploadError } = await supabase.storage
          .from("produtos")
          .upload(nomeArquivo, arquivo, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) throw uploadError;

        const { data: imagemData } = supabase.storage
          .from("produtos")
          .getPublicUrl(nomeArquivo);

        imagemUrl = imagemData.publicUrl;
      }

      // SALVAR NO BANCO
      const { data, error } = await supabase
        .from("produtos")
        .insert([
          {
            nome: novoProduto.nome.trim(),
            categoria: novoProduto.categoria,
            unidade: novoProduto.unidade,
            preco: valoresNumericos.preco,
            estoque_loja: valoresNumericos.estoqueLoja,
            estoque_galpao: valoresNumericos.estoqueGalpao,
            estoque_minimo: valoresNumericos.estoqueMinimo,
            imagem: imagemUrl,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      // FORMATAR RETORNO
      const produtoFormatado = {
        id: data.id,
        nome: data.nome,
        categoria: data.categoria,
        unidade: data.unidade,
        preco: Number(data.preco || 0),
        estoqueLoja: Number(data.estoque_loja || 0),
        estoqueGalpao: Number(data.estoque_galpao || 0),
        estoqueMinimo: Number(data.estoque_minimo || 0),
        imagem: data.imagem,
        descricao: data.descricao || "",
      };

      setProdutos((prev) => [produtoFormatado, ...prev]);

      limparFormulario();
      setModalOpen(false);

      alert("Produto cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);

      if (error.code === "23505") {
        alert("Esse produto já está cadastrado no estoque!");
      } else {
        alert(`Erro ao cadastrar produto: ${error.message}`);
      }
    } finally {
      setSalvando(false);
    }
  };

  // EXCLUIR PRODUTO
  const excluirProduto = async (produto) => {
    const confirmar = window.confirm(
      `Deseja realmente excluir o produto "${produto.nome}"?`,
    );

    if (!confirmar) return;

    const { error } = await supabase
      .from("produtos")
      .delete()
      .eq("id", produto.id);

    if (error) {
      console.error("Erro ao excluir produto:", error);
      alert("Não foi possível excluir o produto.");
      return;
    }

    setProdutos((atual) => atual.filter((item) => item.id !== produto.id));

    if (selectedProduct?.id === produto.id) {
      fecharDetalhes();
    }

    alert("Produto excluído com sucesso!");
  };

  // CARDS
  const formatarNumero = (valor) => Number(valor || 0).toLocaleString("pt-BR");

  // MODAL DE DETALHES
  const abrirDetalhes = (produto) => {
    setSelectedProduct(produto);
    setModalProduct(true);
  };

  const fecharDetalhes = () => {
    setModalProduct(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />

      <main className="ml-64 px-8">
        {/* HEADER */}
        <div className="py-6 flex justify-between items-center gap-4">
          <HeaderComponent
            title="Estoque"
            subtitle="Controle da loja do Estoque e do Galpão"
          />

          <div className="flex items-center gap-3 shrink-0">
            <button type="button" className={styleButtons} title="Ajuda">
              <CircleHelp size={19} />
            </button>

            <button
              type="button"
              className={styleButtons}
              title="Pesquisar"
              onClick={() =>
                document.getElementById("pesquisaEstoque")?.focus()
              }
            >
              <Search size={19} />
            </button>

            <button
              type="button"
              className={styleButtons}
              title="Atualizar estoque"
              onClick={buscarProdutos}
            >
              <History size={19} />
            </button>

            <button
              type="button"
              className={styleButtons}
              title="Limpar pesquisa"
              onClick={() => setPesquisa("")}
            >
              <X size={19} />
            </button>
          </div>
        </div>

        <hr className="border-b border-primary/20 w-full" />

        {/* PESQUISA E CADASTRO */}
        <div className="mt-8 flex items-center justify-between gap-5">
          <div className="border border-gray-200 py-2.5 px-4 flex items-center gap-3 rounded-xl w-full bg-terciary">
            <Search className="size-5 text-gray-500 shrink-0" />

            <input
              id="pesquisaEstoque"
              type="text"
              value={pesquisa}
              onChange={(e) => setPesquisa(e.target.value)}
              placeholder="Buscar por nome ou categoria..."
              className="w-full outline-none bg-transparent text-sm"
            />

            {pesquisa && (
              <button
                type="button"
                onClick={() => setPesquisa("")}
                className="text-gray-400 hover:text-gray-700"
              >
                <X size={18} />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="flex shrink-0 items-center gap-2 bg-primaryDark px-4 py-2.5 rounded-lg text-white hover:scale-95 transition-all cursor-pointer"
          >
            <Plus size={19} />
            Adicionar Produto
          </button>
        </div>

        {/* INDICADORES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-6">
          {infos.map((item, index) => (
            <div
              key={index}
              className="flex items-center p-5 border border-primary/20 rounded-xl gap-5"
            >
              <div className="bg-primary p-3 text-white rounded-full shrink-0">
                {item.icon}
              </div>

              <div>
                <h2 className="font-medium text-black/70">{item.label}</h2>

                <p className="font-bold text-2xl">
                  {formatarNumero(item.mount)}
                </p>

                <p className="text-sm text-black/50">unidades</p>
              </div>
            </div>
          ))}
        </div>

        {/* LISTAGEM DE PRODUTOS */}
        <div className="w-full border border-primary/30 rounded-xl mt-6 overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[850px]">
              <div className="grid grid-cols-[2fr_1.5fr_0.8fr_1fr_0.8fr_1.2fr_95px] bg-primary/10 px-4 py-4 text-sm font-semibold text-slate-700">
                <p>Produto</p>
                <p>Categoria</p>
                <p>Loja</p>
                <p>Galpão</p>
                <p>Total</p>
                <p>Status</p>
                <p></p>
              </div>

              <div className="flex flex-col px-4 max-h-[calc(100vh-410px)] min-h-[180px] overflow-y-auto">
                {loading ? (
                  <p className="p-8 text-center text-gray-500">
                    Carregando produtos...
                  </p>
                ) : produtosFiltrados.length === 0 ? (
                  <p className="p-8 text-center text-gray-500">
                    Nenhum produto encontrado.
                  </p>
                ) : (
                  produtosFiltrados.map((produto) => {
                    const total =
                      Number(produto.estoqueLoja) +
                      Number(produto.estoqueGalpao);

                    const baixo = total <= Number(produto.estoqueMinimo);

                    return (
                      <div
                        key={produto.id}
                        className="grid grid-cols-[2fr_1.5fr_0.8fr_1fr_0.8fr_1.2fr_90px] items-center border-b border-primaryDark/20 last:border-b-0 min-h-[72px] text-sm"
                      >
                        <div className="flex items-center gap-3 pr-3">
                          {produto.imagem ? (
                            <img
                              src={produto.imagem}
                              alt={produto.nome}
                              className="w-11 h-11 object-contain shrink-0"
                            />
                          ) : (
                            <div className="w-11 h-11 bg-primary/10 rounded-lg flex items-center justify-center text-primary shrink-0">
                              <Store size={20} />
                            </div>
                          )}

                          <h3 className="font-medium text-slate-800">
                            {produto.nome}
                          </h3>
                        </div>

                        <p>{produto.categoria}</p>

                        <p>{formatarNumero(produto.estoqueLoja)}</p>

                        <p>{formatarNumero(produto.estoqueGalpao)}</p>

                        <p className="font-semibold">{formatarNumero(total)}</p>

                        <p>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              baixo
                                ? "bg-red-100 text-red-600"
                                : "bg-emerald-100 text-emerald-600"
                            }`}
                          >
                            {baixo ? "Baixo" : "Normal"}
                          </span>
                        </p>

                        <div className="flex items-center justify-center gap-2">
                          {/* EXCLUIR PRODUTO */}
                          <button
                            type="button"
                            onClick={() => excluirProduto(produto)}
                            className="cursor-pointer hover:bg-red-50 transition p-2 border border-red-200 rounded-lg text-red-500 hover:text-red-700"
                            title="Excluir produto"
                          >
                            <Trash2 size={17} />
                          </button>
                          {/* VER DETALHES */}
                          <button
                            type="button"
                            onClick={() => abrirDetalhes(produto)}
                            className="cursor-pointer hover:bg-primary/20 transition p-2 border rounded-lg border-primaryDark/20 text-primaryDark"
                            title="Ver detalhes"
                          >
                            <Ellipsis size={18} />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>

        {/* MODAL CADASTRAR PRODUTO */}
        {modalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 backdrop-blur-sm p-4"
            onClick={fecharModal}
          >
            <div
              className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* CABEÇALHO */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Plus size={22} />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-slate-800">
                      Adicionar produto
                    </h2>

                    <p className="text-sm text-slate-500">
                      Cadastre um novo produto no estoque
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={fecharModal}
                  className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                >
                  <X size={20} />
                </button>
              </div>

              {/* FORMULÁRIO */}
              <form onSubmit={adicionarProduto}>
                <div className="p-6 space-y-6">
                  <div>
                    <h3 className="text-sm font-bold text-slate-700 mb-4">
                      Informações do produto
                    </h3>

                    {/* IMAGEM */}
                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-2">
                        Imagem do produto
                      </label>

                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImagem}
                        className="w-full p-3 rounded-xl border border-slate-200 text-sm"
                      />

                      {novoProduto.imagemPreview && (
                        <img
                          src={novoProduto.imagemPreview}
                          alt="Prévia do produto"
                          className="mt-3 w-24 h-24 object-contain rounded-lg border border-slate-200 p-2"
                        />
                      )}
                    </div>

                    {/* NOME */}
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-slate-600 mb-2">
                        Nome do produto
                      </label>

                      <input
                        type="text"
                        name="nome"
                        value={novoProduto.nome}
                        onChange={handleChange}
                        placeholder="Ex: Detergente Neutro 500ml"
                        className="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>

                    {/* CATEGORIA E UNIDADE */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-2">
                          Categoria
                        </label>

                        <select
                          name="categoria"
                          value={novoProduto.categoria}
                          onChange={handleChange}
                          className="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-500"
                        >
                          <option value="">Selecione uma categoria</option>
                          <option value="Limpeza">Limpeza</option>
                          <option value="Alimentos">Alimentos</option>
                          <option value="Descartáveis">Descartáveis</option>
                          <option value="Higiene">Higiene</option>
                          <option value="EPI's">EPI's</option>
                          <option value="Outros">Outros</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-2">
                          Unidade de medida
                        </label>

                        <select
                          name="unidade"
                          value={novoProduto.unidade}
                          onChange={handleChange}
                          className="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-500"
                        >
                          <option value="UN">Unidade (UN)</option>
                          <option value="CX">Caixa (CX)</option>
                          <option value="PCT">Pacote (PCT)</option>
                          <option value="L">Litro (L)</option>
                          <option value="KG">Quilograma (KG)</option>
                        </select>
                      </div>
                    </div>

                    {/* PREÇO */}
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-slate-600 mb-2">
                        Valor unitário
                      </label>

                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                          R$
                        </span>

                        <input
                          type="number"
                          name="preco"
                          min="0"
                          step="0.01"
                          value={novoProduto.preco}
                          onChange={handleChange}
                          placeholder="0,00"
                          className="w-full h-11 pl-11 pr-4 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* ESTOQUE */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-700 mb-4">
                      Controle de estoque inicial
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-2">
                          Estoque da loja
                        </label>

                        <input
                          type="number"
                          min="0"
                          name="estoqueLoja"
                          value={novoProduto.estoqueLoja}
                          onChange={handleChange}
                          placeholder="0"
                          className="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-2">
                          Estoque do galpão
                        </label>

                        <input
                          type="number"
                          min="0"
                          name="estoqueGalpao"
                          value={novoProduto.estoqueGalpao}
                          onChange={handleChange}
                          placeholder="0"
                          className="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-2">
                          Estoque mínimo
                        </label>

                        <input
                          type="number"
                          min="0"
                          name="estoqueMinimo"
                          value={novoProduto.estoqueMinimo}
                          onChange={handleChange}
                          placeholder="Ex: 10"
                          className="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="mt-4 flex items-start gap-2 p-3 rounded-xl bg-blue-50 border border-blue-100">
                      <Info
                        size={17}
                        className="text-blue-600 mt-0.5 shrink-0"
                      />

                      <p className="text-xs text-blue-700 leading-relaxed">
                        O estoque total será calculado automaticamente pela soma
                        das quantidades da loja e do galpão. O estoque mínimo
                        será utilizado para gerar alertas de reposição.
                      </p>
                    </div>
                  </div>
                </div>

                {/* RODAPÉ */}
                <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 px-6 py-5 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={fecharModal}
                    disabled={salvando}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition"
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    disabled={salvando}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold shadow-lg shadow-blue-600/20 transition disabled:opacity-50"
                  >
                    <Plus size={18} />
                    {salvando ? "Salvando..." : "Cadastrar produto"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL DETALHES DO PRODUTO */}
        {modalProduct &&
          selectedProduct &&
          (() => {
            const produto = selectedProduct;

            const estoqueTotal =
              Number(produto.estoqueLoja) + Number(produto.estoqueGalpao);

            const estoqueBaixo = estoqueTotal <= Number(produto.estoqueMinimo);

            return (
              <div
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
                onClick={fecharDetalhes}
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full max-w-4xl grid grid-cols-1 md:grid-cols-[0.85fr_1.15fr] overflow-hidden rounded-2xl bg-[#071B35] shadow-2xl max-h-[90vh] overflow-y-auto"
                >
                  {/* LADO ESQUERDO */}
                  <div className="relative min-h-[280px] md:min-h-[500px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#102F52] via-[#0A2545] to-[#06172B]">
                    <div className="absolute w-72 h-72 rounded-full border border-white/10" />
                    <div className="absolute w-56 h-56 rounded-full border border-white/10" />
                    <div className="absolute w-40 h-40 rounded-full bg-blue-500/10 blur-3xl" />

                    <span className="absolute top-6 left-6 text-xs tracking-[0.3em] uppercase text-white/50">
                      CleanStock — Produtos
                    </span>

                    {produto.imagem ? (
                      <img
                        src={produto.imagem}
                        alt={produto.nome}
                        className="relative z-10 w-56 h-64 md:w-64 md:h-72 object-contain drop-shadow-2xl"
                      />
                    ) : (
                      <Store
                        size={90}
                        className="relative z-10 text-white/40"
                      />
                    )}

                    <span className="absolute bottom-6 right-6 text-xs text-white/50">
                      {produto.unidade}
                    </span>
                  </div>

                  {/* LADO DIREITO */}
                  <div className="bg-white p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                          {produto.categoria}
                        </span>

                        <button
                          type="button"
                          onClick={fecharDetalhes}
                          className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"
                        >
                          <X size={20} />
                        </button>
                      </div>

                      <span
                        className={`inline-block mt-4 text-xs font-semibold px-3 py-1.5 rounded-full ${
                          estoqueBaixo
                            ? "bg-red-50 text-red-600"
                            : "bg-emerald-50 text-emerald-600"
                        }`}
                      >
                        {estoqueBaixo ? "● Estoque baixo" : "● Disponível"}
                      </span>

                      <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#071B35] mt-5 break-words">
                        {produto.nome}
                      </h2>

                      {produto.descricao && (
                        <p className="text-sm text-slate-500 mt-3 leading-relaxed">
                          {produto.descricao}
                        </p>
                      )}

                      <div className="flex items-center gap-3 mt-6">
                        <span className="h-px w-12 bg-blue-600" />

                        <span className="text-xs text-slate-400 uppercase tracking-widest">
                          Informações do produto
                        </span>
                      </div>
                    </div>

                    {/* INFORMAÇÕES */}
                    <div className="mt-7 space-y-5">
                      <div className="border-l border-slate-200 pl-4">
                        <p className="text-xs uppercase tracking-widest text-slate-400">
                          Valor unitário
                        </p>

                        <p className="text-2xl font-bold text-[#071B35] mt-1">
                          {Number(produto.preco).toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </p>
                      </div>

                      <div className="border-l border-slate-200 pl-4">
                        <p className="text-xs uppercase tracking-widest text-slate-400">
                          Estoque da loja
                        </p>

                        <p className="text-xl font-semibold text-[#071B35] mt-1">
                          {produto.estoqueLoja} {produto.unidade}
                        </p>
                      </div>

                      <div className="border-l border-slate-200 pl-4">
                        <p className="text-xs uppercase tracking-widest text-slate-400">
                          Estoque do galpão
                        </p>

                        <p className="text-xl font-semibold text-[#071B35] mt-1">
                          {produto.estoqueGalpao} {produto.unidade}
                        </p>
                      </div>
                    </div>

                    {/* RODAPÉ */}
                    <div className="mt-7 pt-5 border-t border-slate-100">
                      <p className="text-xs uppercase tracking-widest text-slate-400">
                        Estoque total
                      </p>

                      <div className="flex items-baseline gap-2 mt-1">
                        <span
                          className={`text-3xl font-black ${
                            estoqueBaixo ? "text-red-600" : "text-[#0877D8]"
                          }`}
                        >
                          {estoqueTotal}
                        </span>

                        <span className="text-xs text-slate-400">
                          {produto.unidade}
                        </span>
                      </div>

                      <p className="text-xs text-slate-400 mt-1">
                        Mínimo: {produto.estoqueMinimo} {produto.unidade}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
      </main>
    </div>
  );
}

export default Stock;
