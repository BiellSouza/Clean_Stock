import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import HeaderComponent from "../Components/HeaderComponent";
import { Plus } from "lucide-react";

function Orders() {
  const [produtos, setProdutos] = useState([
    {
      img: "https://lojalimppano.vtexassets.com/arquivos/ids/160765/Tags-ODD-neutro.jpg.jpg?v=638785125833400000",
      nome: "Detergente odd 500ml",
      qtd: 3,
      unitario: 1.8,
    },
    {
      img: "https://lojalimppano.vtexassets.com/arquivos/ids/160765/Tags-ODD-neutro.jpg.jpg?v=638785125833400000",
      nome: "Detergente 2",
      qtd: 3,
      unitario: 3,
    },
    {
      img: "https://lojalimppano.vtexassets.com/arquivos/ids/160765/Tags-ODD-neutro.jpg.jpg?v=638785125833400000",
      nome: "Detergente 3",
      qtd: 3,
      unitario: 10.4,
    },
  ]);

  const valorTotal = produtos.reduce((total, produto) => {
    return total + produto.unitario * produto.qtd;
  }, 0);

  const frete = 0;

  //   Função para Adicionar Produto
  const [novoProduto, setNovoProduto] = useState({
    
  });

  return (
    <div>
      <div>
        <Sidebar />
      </div>

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
            <label className="text-md text-gray-500/80 font-medium" htmlFor="">
              Cliente
            </label>
            <input
              type="text"
              placeholder="Nome do Cliente"
              className="p-4 border-2 border-gray-500/40 rounded-lg mt-2 w-full outline-none focus:border-2 focus:border-primary duration-500 transition-all cursor-pointer"
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="text-md text-gray-500/80 font-medium" htmlFor="">
              Endereço da Entrega
            </label>
            <input
              type="text"
              placeholder="Ex: Presidente Backer 450"
              className="p-4 border-2 border-gray-500/40 rounded-lg mt-2 w-full outline-none focus:border-2 focus:border-primary duration-500 transition-all cursor-pointer"
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="text-md text-gray-500/80 font-medium" htmlFor="">
              Data da Venda
            </label>
            <input
              type="date"
              className="p-4 border-2 border-gray-500/40 rounded-lg mt-2 w-full outline-none focus:border-2 focus:border-primary duration-500 transition-all cursor-pointer"
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="text-md text-gray-500/80 font-medium" htmlFor="">
              Data de Criação
            </label>
            <input
              type="date"
              className="p-4 border-2 border-gray-500/40 rounded-lg mt-2 w-full outline-none focus:border-2 focus:border-primary duration-500 transition-all cursor-pointer"
            />
          </div>
        </div>

        {/* Lista de material */}
        <div>
          <div>
            <button className="flex items-center gap-2 text-white bg-primaryDark p-4 rounded-lg w-62 justify-center mt-4 hover:scale-95 transition-all duration-500 cursor-pointer hover:bg-primary">
              <span>
                <Plus />
              </span>
              Adicionar Produto
            </button>
          </div>
          <div className="mt-8 bg-primary/20 border border-primary/20 rounded-lg">
            <div className="grid grid-cols-[2fr_0.7fr_0.7fr_0.3fr] w-full py-4 font-bold">
              <p className="ml-4">Produto</p>
              <p>Qtd.</p>
              <p>Unitário</p>
              <p>Subtotal</p>
            </div>

            <div className="">
              {produtos.map((produto, index) => (
                <div
                  key={index}
                  className="bg-white py-2 border-b border-primary/30 last:border-b-0"
                >
                  <div className="items-center grid grid-cols-[2fr_0.8fr_0.7fr_0.3fr] w-full">
                    <div className="flex items-center gap-2">
                      <img
                        src={produto.img}
                        className="w-14"
                        alt="Imagem dos Produtos"
                      />
                      <h1 className="text-black/50 font-medium">
                        {produto.nome}
                      </h1>
                    </div>

                    <p className="border border-primaryDark/60 w-fit py-2.5 px-6 rounded-lg text-black/70">
                      {produto.qtd}
                    </p>
                    <p className="text-black/60">
                      {produto.unitario.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>
                    <p className="text-black/70">
                      {(produto.unitario * produto.qtd).toLocaleString(
                        "pt-BR",
                        {
                          style: "currency",
                          currency: "BRL",
                        },
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Subtotal */}
        <div className="flex justify-end">
          <div className="w-72 p-5 rounded-xl">
            <div className="flex justify-between items-center">
              <p className="text-gray-500 font-medium">Subtotal</p>

              <p className="font-semibold text-gray-700/60">
                {valorTotal.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-gray-500 font-medium">Frete</p>

              <p className="font-semibold text-gray-700/60">
                {frete.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            </div>

            <hr className="my-3 border-primary/20" />

            <div className="flex justify-between items-center">
              <p className="font-bold text-lg">Total</p>

              <p className="font-bold text-xl text-green-500">
                {valorTotal.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="flex gap-6 justify-end">
          <button className="border border-primary bg-white w-42 rounded-lg py-3 hover:scale-90 transition-all duration-500 cursor-pointer">
            Cancelar
          </button>
          <button className="bg-primaryDark w-62 rounded-lg text-white py-3 hover:scale-90 transition-all duration-500 cursor-pointer">
            Finalizar Pedido
          </button>
        </div>
      </div>
    </div>
  );
}

export default Orders;
