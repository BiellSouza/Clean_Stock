import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import HeaderComponent from "../Components/HeaderComponent";
import { supabase } from "../lib/supabase";
import { Plus, X, Trash2, LoaderCircle } from "lucide-react";

function Orders() {
  // Produtos disponíveis no estoque
  const [produtosDisponiveis, setProdutosDisponiveis] = useState([]);

  // Produtos adicionados ao pedido
  const [produtos, setProdutos] = useState([]);

  // Dados do pedido
  const [cliente, setCliente] = useState("");
  const [endereco, setEndereco] = useState("");

  // Modal de adicionar produto
  const [modalProduto, setModalProduto] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState("");
  const [quantidade, setQuantidade] = useState(1);

  // Estados de carregamento
  const [carregandoProdutos, setCarregandoProdutos] = useState(true);
  const [salvando, setSalvando] = useState(false);

  const frete = 0;

  // Data atual para exibição
  const dataCriacao = new Date().toLocaleDateString("pt-BR");
  const dataVenda = new Date().toLocaleDateString("pt-BR");

  // Buscar produtos no Supabase
  const buscarProdutos = async () => {
    setCarregandoProdutos(true);

    const { data, error } = await supabase
      .from("produtos")
      .select("id, nome, preco, imagem")
      .order("nome");

    if (error) {
      console.error("Erro ao buscar produtos:", error);
      alert("Não foi possível carregar os produtos.");
      setCarregandoProdutos(false);
      return;
    }

    setProdutosDisponiveis(data || []);
    setCarregandoProdutos(false);
  };

  useEffect(() => {
    buscarProdutos();
  }, []);

  // Calcular subtotal dos produtos
  const valorTotal = produtos.reduce((total, produto) => {
    return total + produto.unitario * produto.qtd;
  }, 0);

  const totalPedido = valorTotal + frete;

  // Formatar valores em reais
  const formatarMoeda = (valor) => {
    return Number(valor).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  // Adicionar produto ao pedido
  const adicionarProduto = () => {
    if (!produtoSelecionado || Number(quantidade) <= 0) {
      alert("Selecione um produto e informe uma quantidade válida.");
      return;
    }

    const produtoBanco = produtosDisponiveis.find(
      (produto) => String(produto.id) === String(produtoSelecionado),
    );

    if (!produtoBanco) {
      alert("Produto não encontrado.");
      return;
    }

    const produtoExistente = produtos.find(
      (produto) => produto.produto_id === produtoBanco.id,
    );

    if (produtoExistente) {
      setProdutos((prev) =>
        prev.map((produto) =>
          produto.produto_id === produtoBanco.id
            ? { ...produto, qtd: produto.qtd + Number(quantidade) }
            : produto,
        ),
      );
    } else {
      setProdutos((prev) => [
        ...prev,
        {
          produto_id: produtoBanco.id,
          nome: produtoBanco.nome,
          img: produtoBanco.imagem,
          qtd: Number(quantidade),
          unitario: Number(produtoBanco.preco),
        },
      ]);
    }

    setProdutoSelecionado("");
    setQuantidade(1);
    setModalProduto(false);
  };

  // Remover produto do pedido
  const removerProduto = (produtoId) => {
    setProdutos((prev) =>
      prev.filter((produto) => produto.produto_id !== produtoId),
    );
  };

  // Limpar formulário
  const cancelarPedido = () => {
    setCliente("");
    setEndereco("");
    setProdutos([]);
    setProdutoSelecionado("");
    setQuantidade(1);
    setModalProduto(false);
  };

  // Finalizar pedido

  const finalizarPedido = async () => {
    if (!cliente.trim() || !endereco.trim() || !dataVenda) {
      alert("Preencha o cliente, endereço e data da venda.");
      return;
    }

    if (produtos.length === 0) {
      alert("Adicione pelo menos um produto ao pedido.");
      return;
    }

    setSalvando(true);

    try {
      console.log("ETAPA 1: Inserindo pedido...");

      const {
        data: { session },
        error: erroSessao,
      } = await supabase.auth.getSession();

      console.log("PROJETO:", supabase.supabaseUrl);

      console.log("SESSÃO:", session ? "AUTHENTICATED" : "ANON");

      console.log("ERRO DE SESSÃO:", erroSessao);

      const { data: pedido, error: erroPedido } = await supabase
        .from("pedidos")
        .insert([
          {
            cliente: cliente.trim(),
            endereco: endereco.trim(),
            data_venda: dataVenda,
            subtotal: valorTotal,
            frete: frete,
            total: totalPedido,
          },
        ])
        .select()
        .single();

      if (erroPedido) {
        console.error("ERRO NA TABELA PEDIDOS:", erroPedido);
        throw erroPedido;
      }

      console.log("PEDIDO SALVO:", pedido);

      console.log("ETAPA 2: Inserindo itens...");

      const itens = produtos.map((produto) => ({
        pedido_id: pedido.id,
        produto_id: produto.produto_id,
        nome_produto: produto.nome,
        quantidade: produto.qtd,
        valor_unitario: produto.unitario,
        subtotal: produto.unitario * produto.qtd,
      }));

      const { error: erroItens } = await supabase
        .from("itens_pedido")
        .insert(itens);

      if (erroItens) {
        console.error("ERRO NA TABELA ITENS_PEDIDO:", erroItens);
        throw erroItens;
      }

      console.log("ITENS DO PEDIDO SALVOS COM SUCESSO!");
      console.log("ITENS SALVOS:");

      alert("Pedido cadastrado com sucesso!");
      cancelarPedido();
    } catch (error) {
      console.error("ERRO COMPLETO:", error);

      alert("Erro ao cadastrar pedido:\n" + JSON.stringify(error, null, 2));
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div>
      <Sidebar />

      <div className="ml-64 px-8 pb-8">
        <div className="py-6 flex justify-between items-center">
          <HeaderComponent
            title="Novo Pedido"
            subtitle="Cadastre os pedidos e finalize a venda"
          />
        </div>

        <hr className="border-b border-primary/20 w-full" />

        {/* Campos do pedido */}
        <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-6">
          <div className="flex flex-col w-full">
            <label className="text-md text-gray-500/80 font-medium">
              Cliente
            </label>

            <input
              type="text"
              placeholder="Nome do Cliente"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              className="p-4 border-2 border-gray-500/40 rounded-lg mt-2 w-full outline-none focus:border-primary duration-500"
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="text-md text-gray-500/80 font-medium">
              Endereço da Entrega
            </label>

            <input
              type="text"
              placeholder="Ex: Presidente Backer 450"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              className="p-4 border-2 border-gray-500/40 rounded-lg mt-2 w-full outline-none focus:border-primary duration-500"
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="text-md text-gray-500/80 font-medium">
              Data da Venda
            </label>

            <input
              type="text"
              value={dataVenda}
              readOnly
              className="p-4 border-2 border-gray-500/40 rounded-lg mt-2 w-full outline-none bg-gray-100 text-gray-500"
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="text-md text-gray-500/80 font-medium">
              Data de Criação
            </label>

            <input
              type="text"
              value={dataCriacao}
              readOnly
              className="p-4 border-2 border-gray-500/40 rounded-lg mt-2 w-full outline-none bg-gray-100 text-gray-500"
            />
          </div>
        </div>

        {/* Lista de produtos */}
        <div>
          <button
            type="button"
            onClick={() => setModalProduto(true)}
            className="flex items-center gap-2 text-white bg-primaryDark p-4 rounded-lg w-62 justify-center mt-4 hover:scale-95 transition-all duration-500 cursor-pointer hover:bg-primary"
          >
            <Plus size={20} />
            Adicionar Produto
          </button>

          <div className="mt-8 bg-primary/20 border border-primary/20 rounded-lg overflow-hidden">
            <div className="grid grid-cols-[2fr_0.7fr_0.7fr_0.5fr_0.3fr] w-full py-4 font-bold">
              <p className="ml-4">Produto</p>
              <p>Qtd.</p>
              <p>Unitário</p>
              <p>Subtotal</p>
              <p></p>
            </div>

            {produtos.length === 0 ? (
              <div className="bg-white py-10 text-center text-gray-400">
                Nenhum produto adicionado ao pedido.
              </div>
            ) : (
              produtos.map((produto) => (
                <div
                  key={produto.produto_id}
                  className="bg-white py-3 border-b border-primary/30 last:border-b-0"
                >
                  <div className="items-center grid grid-cols-[2fr_0.7fr_0.7fr_0.5fr_0.3fr] w-full">
                    <div className="flex items-center gap-3 ml-4">
                      {produto.img && (
                        <img
                          src={produto.img}
                          className="w-14 h-14 object-contain"
                          alt={produto.nome}
                        />
                      )}

                      <h1 className="text-black/60 font-medium">
                        {produto.nome}
                      </h1>
                    </div>

                    <p className="border border-primaryDark/60 w-fit py-2.5 px-6 rounded-lg text-black/70">
                      {produto.qtd}
                    </p>

                    <p className="text-black/60">
                      {formatarMoeda(produto.unitario)}
                    </p>

                    <p className="text-black/70">
                      {formatarMoeda(produto.unitario * produto.qtd)}
                    </p>

                    <button
                      type="button"
                      onClick={() => removerProduto(produto.produto_id)}
                      className="text-red-500 hover:text-red-700"
                      title="Remover produto"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Resumo do pedido */}
        <div className="flex justify-end">
          <div className="w-72 p-5 rounded-xl">
            <div className="flex justify-between items-center">
              <p className="text-gray-500 font-medium">Subtotal</p>
              <p className="font-semibold text-gray-700/60">
                {formatarMoeda(valorTotal)}
              </p>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-gray-500 font-medium">Frete</p>
              <p className="font-semibold text-gray-700/60">
                {formatarMoeda(frete)}
              </p>
            </div>

            <hr className="my-3 border-primary/20" />

            <div className="flex justify-between items-center">
              <p className="font-bold text-lg">Total</p>
              <p className="font-bold text-xl text-green-500">
                {formatarMoeda(totalPedido)}
              </p>
            </div>
          </div>
        </div>

        {/* Botões */}
        <div className="flex gap-6 justify-end">
          <button
            type="button"
            onClick={cancelarPedido}
            disabled={salvando}
            className="border border-primary bg-white w-42 rounded-lg py-3 hover:scale-90 transition-all duration-500 cursor-pointer disabled:opacity-50"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={finalizarPedido}
            disabled={salvando}
            className="bg-primaryDark w-62 rounded-lg text-white py-3 hover:scale-90 transition-all duration-500 cursor-pointer disabled:opacity-60 flex justify-center items-center gap-2"
          >
            {salvando ? (
              <>
                <LoaderCircle className="animate-spin" size={18} />
                Salvando...
              </>
            ) : (
              "Finalizar Pedido"
            )}
          </button>
        </div>
      </div>

      {/* Modal de adicionar produto */}
      {modalProduto && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-700">
                Adicionar produto
              </h2>

              <button
                type="button"
                onClick={() => setModalProduto(false)}
                className="text-gray-500 hover:text-red-500 cursor-pointer hover:scale-85 duration-500 transition-all"
              >
                <X size={22} />
              </button>
            </div>

            <div className="flex flex-col gap-2 mb-5">
              <label className="font-medium text-gray-600">
                Selecione o produto
              </label>

              <select
                value={produtoSelecionado}
                onChange={(e) => setProdutoSelecionado(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg outline-none focus:border-primary"
              >
                <option value="">Escolha um produto</option>

                {produtosDisponiveis.map((produto) => (
                  <option key={produto.id} value={produto.id}>
                    {produto.nome} - {formatarMoeda(produto.preco)}
                  </option>
                ))}
              </select>

              {carregandoProdutos && (
                <p className="text-sm text-gray-400">Carregando produtos...</p>
              )}

              {!carregandoProdutos && produtosDisponiveis.length === 0 && (
                <p className="text-sm text-red-500">
                  Nenhum produto cadastrado no estoque.
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2 mb-6">
              <label className="font-medium text-gray-600">Quantidade</label>

              <input
                type="number"
                min="1"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg outline-none focus:border-primary"
              />
            </div>

            <button
              type="button"
              onClick={adicionarProduto}
              disabled={carregandoProdutos || produtosDisponiveis.length === 0}
              className="flex items-center gap-2 text-white bg-primaryDark p-4 rounded-lg w-full justify-center mt-4 hover:scale-95 transition-all duration-500 cursor-pointer hover:bg-primary"
            >
              Adicionar ao pedido
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
