import React, { useMemo, useState } from "react";
import Sidebar from "../Components/Sidebar";
import HeaderComponent from "../Components/HeaderComponent";
import {
  PackageMinus,
  PackagePlus,
  ShoppingCart,
  Box,
  Clock,
  Plus,
  CheckCircle,
  Store,
  PackageOpen,
} from "lucide-react";

function Orders() {
  const infosCards = [
    {
      icon: <Box />,
      label: "Total em estoque",
      number: 600,
      color: "#9A814C",
      background: "#F2EFE9",
    },
    {
      icon: <PackagePlus />,
      label: "Entradas",
      number: 1,
      color: "#83A972",
      background: "#EFF4ED",
    },
    {
      icon: <PackageMinus />,
      label: "Saídas",
      number: 1,
      color: "#D9726B",
      background: "#FAECEB",
    },
    {
      icon: <ShoppingCart />,
      label: "Pedidos",
      number: 0,
      color: "#8B79A8",
      background: "#F0EEF4",
    },
  ];

  const abas = [
    {
      icon: <ShoppingCart className="size-4" />,
      label: "Novo Pedido",
    },
    {
      icon: <PackagePlus className="size-4" />,
      label: "Entrada",
    },
    {
      icon: <PackageMinus className="size-4" />,
      label: "Saída",
    },
    {
      icon: <Clock className="size-4" />,
      label: "Histórico",
    },
  ];

  const [selected, setSelected] = useState("Novo Pedido");

  return (
    <div className="min-h-screen">
      <Sidebar />

      <main className="ml-54 px-8 py-5 min-w-0">
        <HeaderComponent
          title="Movimentações"
          subtitle="Gerencie pedidos, entradas, saídas e histórico do estoque"
        />

        <hr className="border-gray-200 my-5" />

        <div className="mt-4 flex justify-between gap-4">
          {infosCards.map((item, index) => (
            <div
              key={index}
              className="flex gap-4 border border-gray-300 p-4 rounded-lg w-full"
            >
              <div
                style={{ color: item.color, background: item.background }}
                className="w-fit h-fit p-2 rounded-lg"
              >
                {item.icon}
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-sm text-gray-500">{item.label}</h1>
                <p className="font-font">{item.number}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <div className="flex gap-4">
            {abas.map((item, index) => (
              <button
                onClick={() => setSelected(item.label)}
                className={`flex items-center gap-2 px-3 pb-2 transition-all cursor-pointer ${selected === item.label ? "border-b border-primaryDark " : ""}`}
              >
                <span>{item.icon}</span> <p className="text-xs">{item.label}</p>
              </button>
            ))}
          </div>
          <hr className="opacity-5" />

          <div className="mt-6 border border-gray-300 p-4 rounded-lg shadow-md">
            <h1 className="font-medium text-md">Criar novo pedido</h1>
            <p className="text-xs text-gray-500">
              Informe os dados do cliente e adicoone os produtos.
            </p>

            <div className="flex justify-between gap-4 mt-6">
              <div className="flex flex-col gap-2 w-full">
                <label className="text-sm" htmlFor="">
                  Nome do cliente
                </label>
                <input
                  className="border border-gray-300 p-2 rounded-lg w-full outline-none"
                  type="text"
                  placeholder="Nome do cliente"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label className="text-sm" htmlFor="">
                  Endereço completo
                </label>
                <input
                  className="border border-gray-300 p-2 rounded-lg w-full outline-none"
                  type="text"
                  placeholder="Endereço completo"
                />
              </div>
            </div>
            <div className="flex mt-4 gap-4">
              <div className="flex flex-col gap-2 w-full">
                <label className="text-sm" htmlFor="">
                  Produto
                </label>
                <select
                  name=""
                  id=""
                  className="border border-gray-300 p-2 rounded-lg w-full outline-none h-10"
                >
                  <option value="">Lavanda 5L</option>
                  <option value="">Veja Multiuso Original</option>
                  <option value="">Lã de Aço Bombril</option>
                  <option value="">Papel Bingo</option>
                </select>
              </div>
              <div className="flex gap-4 items-end">
                <div className="flex flex-col gap-2 w-32">
                  <label className="text-sm" htmlFor="">
                    Quantidade
                  </label>
                  <input
                    className={`border border-gray-300 p-2 rounded-lg w-full outline-none`}
                    type="number"
                    placeholder="0"
                  />
                </div>
                <button className="flex gap-2 items-center text-white bg-primaryDark px-4 py-2 rounded-lg h-11 cursor-pointer hover:scale-95 duration-500 transition-all">
                  <span>
                    <Plus className="size-4" />
                  </span>
                  <p className="text-sm">Adicionar</p>
                </button>
              </div>
            </div>
            <div className="mt-4 rounded-lg border border-gray-200">
              <div className="grid grid-cols-[2fr_1fr_2fr] text-xs bg-gray-100 p-2 rounded-tr-lg rounded-tl-lg">
                <p>Produto</p>
                <p>Quantidade</p>
                <p>Valor unitário</p>
              </div>

              <div>
                <p className="text-gray-400 text-xs text-center p-10">
                  Nenhum produto adicionado.
                </p>
              </div>
            </div>

            <div className="bg-gray-200 p-4 rounded-lg ml-auto mt-4 w-62">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <p>Subtotal</p>
                <p>R$ 0,00</p>
              </div>
              <div className="mt-2 text-xs flex items-center justify-between">
                <p className="font-bold">Total</p>
                <p className="text-green-700 font-medium">R$ 0,00</p>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button className="border border-gray-300 px-4 py-2 rounded-lg text-sm cursor-pointer hover:scale-90 duration-500 transition-all">
                Limpar
              </button>
              <button className="flex items-center gap-2 border border-primaryDark bg-primaryDark text-white px-4 py-2 rounded-lg text-sm cursor-pointer hover:scale-90 duration-500 transition-all">
                <span>
                  <CheckCircle className="size-4" />
                </span>
                Finalizar pedido
              </button>
            </div>
          </div>

          <div className="border border-gray-300 p-4 rounded-lg mt-4 shadow">
            <h1>Estoque atual por local</h1>
            <div className="flex justify-between gap-4 mt-4">
              <div className="bg-primary/10 p-4 rounded-lg w-[50%] flex gap-4">
                <span>
                  <Store className="text-green-700" />
                </span>
                <div>
                  <h1 className="text-xs text-gray-600">Loja</h1>
                  <p className="font-bold text-xl">180 unidades</p>
                </div>
              </div>
              <div className="bg-primaryDark/10 p-4 rounded-lg w-[50%] flex gap-4">
                <span>
                  <PackageOpen className="text-primaryDark" />
                </span>
                <div>
                  <h1 className="text-xs text-gray-600">Galpão</h1>
                  <p className="font-bold text-xl">420 unidades</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Orders;
