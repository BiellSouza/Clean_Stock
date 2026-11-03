import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import Sidebar from "../Components/Sidebar";
import HeaderComponent from "../Components/HeaderComponent";

function Stores() {
  const [fornecedor, setFornecedor] = useState("");
  const [notaFiscal, setNotaFiscal] = useState("");
  const [dataCompra, setDataCompra] = useState("2025-10-25");
  const [destino, setDestino] = useState("Loja");

  const [produtos, setProdutos] = useState([
    {
      id: 1,
      nome: "Detergente 500ml",
      quantidade: 100,
      valorUnitario: 2.5,
    },
    {
      id: 2,
      nome: "Água Sanitária 1L",
      quantidade: 50,
      valorUnitario: 4.2,
    },
  ]);

  const formatarMoeda = (valor) => {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const atualizarProduto = (id, campo, valor) => {
    setProdutos((atual) =>
      atual.map((produto) =>
        produto.id === id ? { ...produto, [campo]: valor } : produto,
      ),
    );
  };

  const adicionarProduto = () => {
    setProdutos((atual) => [
      ...atual,
      {
        id: Date.now(),
        nome: "",
        quantidade: 1,
        valorUnitario: 0,
      },
    ]);
  };

  const removerProduto = (id) => {
    setProdutos((atual) => atual.filter((produto) => produto.id !== id));
  };

  const totalGeral = produtos.reduce(
    (total, produto) => total + produto.quantidade * produto.valorUnitario,
    0,
  );

  const registrarEntrada = (e) => {
    e.preventDefault();

    const entrada = {
      fornecedor,
      notaFiscal,
      dataCompra,
      destino,
      produtos,
      total: totalGeral,
    };

    console.log("Entrada registrada:", entrada);
  };

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />

      <main className="ml-64 px-8">
        {/* Header */}
        <div className="py-6 flex justify-between items-center">
          <HeaderComponent
            title="Estoque"
            subtitle="Controle da loja do Estoque e do Galpão"
          />
        </div>

        <hr className="border-b border-primary/20 w-full" />

        {/* Formulário */}
        <form onSubmit={registrarEntrada} className="py-8">
          {/* Informações gerais */}
          <div className="grid grid-cols-4 gap-5 mb-7">
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-700">
                Fornecedor
              </label>

              <input
                type="text"
                placeholder="Nome do fornecedor"
                value={fornecedor}
                onChange={(e) => setFornecedor(e.target.value)}
                className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-slate-700">
                Nota Fiscal
              </label>

              <input
                type="text"
                placeholder="Nº da nota fiscal"
                value={notaFiscal}
                onChange={(e) => setNotaFiscal(e.target.value)}
                className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-slate-700">
                Data da compra
              </label>

              <input
                type="date"
                value={dataCompra}
                onChange={(e) => setDataCompra(e.target.value)}
                className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-slate-700">
                Destino
              </label>

              <select
                value={destino}
                onChange={(e) => setDestino(e.target.value)}
                className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500 bg-white"
              >
                <option value="Loja">Loja</option>
                <option value="Estoque">Estoque</option>
                <option value="Galpão">Galpão</option>
              </select>
            </div>
          </div>

          {/* Tabela */}
          <div className="w-full overflow-x-auto border border-blue-100 rounded-xl">
            <table className="w-full text-sm text-left">
              <thead className="bg-blue-50 text-slate-700">
                <tr>
                  <th className="px-4 py-4 font-semibold">Produto</th>

                  <th className="px-4 py-4 font-semibold">Qtd. Comprada</th>

                  <th className="px-4 py-4 font-semibold">Valor Unitário</th>

                  <th className="px-4 py-4 font-semibold">Total</th>

                  <th className="px-2 py-4"></th>
                </tr>
              </thead>

              <tbody>
                {produtos.map((produto) => (
                  <tr
                    key={produto.id}
                    className="border-t border-blue-100 hover:bg-slate-50"
                  >
                    <td className="px-4 py-3 min-w-[220px]">
                      <input
                        type="text"
                        placeholder="Nome do produto"
                        value={produto.nome}
                        onChange={(e) =>
                          atualizarProduto(produto.id, "nome", e.target.value)
                        }
                        className="w-full outline-none bg-transparent"
                      />
                    </td>

                    <td className="px-4 py-3">
                      <input
                        type="number"
                        min="0"
                        value={produto.quantidade}
                        onChange={(e) =>
                          atualizarProduto(
                            produto.id,
                            "quantidade",
                            Math.max(0, Number(e.target.value)),
                          )
                        }
                        className="w-20 h-9 px-2 border border-slate-200 rounded-lg outline-none focus:border-blue-500"
                      />
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <span>R$</span>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={produto.valorUnitario}
                          onChange={(e) =>
                            atualizarProduto(
                              produto.id,
                              "valorUnitario",
                              Math.max(0, Number(e.target.value)),
                            )
                          }
                          className="w-24 h-9 px-2 border border-slate-200 rounded-lg outline-none focus:border-blue-500"
                        />
                      </div>
                    </td>

                    <td className="px-4 py-3 font-medium text-slate-700">
                      {formatarMoeda(
                        produto.quantidade * produto.valorUnitario,
                      )}
                    </td>

                    <td className="px-3 py-3">
                      <button
                        type="button"
                        onClick={() => removerProduto(produto.id)}
                        className="text-slate-400 hover:text-red-500"
                      >
                        <Trash2 size={17} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Adicionar produto */}
          <button
            type="button"
            onClick={adicionarProduto}
            className="mt-4 flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition"
          >
            <Plus size={19} />
            Adicionar Produto
          </button>

          {/* Ações */}
          <div className="mt-8 flex items-center justify-between">
            <div className="text-sm text-slate-600">
              Total da entrada:
              <span className="ml-2 font-bold text-lg text-slate-800">
                {formatarMoeda(totalGeral)}
              </span>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setFornecedor("");
                  setNotaFiscal("");
                  setProdutos([]);
                }}
                className="w-40 h-11 border border-blue-200 rounded-lg text-slate-700 hover:bg-slate-50 transition"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="w-48 h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
              >
                Registrar Entrada
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

export default Stores;
