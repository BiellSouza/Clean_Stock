import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import HeaderComponent from "../Components/HeaderComponent";
import {
  Warehouse,
  ShelvingUnit,
  CircleQuestionMark,
  Plus,
  RotateCcwClock,
  Search,
  Store,
  X,
  Ellipsis,
} from "lucide-react";

function Estoque() {
  const styleButtons = `border border-primary/20 p-2 bg-primary/5 rounded-lg text-primaryDark hover:scale-90 transition-all duration-500 cursor-pointer`;

  const [selected, setSelected] = useState("");
  const loja = 612;
  const galpao = 636;
  const totalProdutos = loja + galpao;

  const infos = [
    {
      icon: <ShelvingUnit />,
      label: "Total Geral",
      mount: totalProdutos,
    },
    {
      icon: <Store />,
      label: "Loja",
      mount: loja,
    },
    {
      icon: <Warehouse />,
      label: "Galpão",
      mount: galpao,
    },
  ];

  const produtos = [
    {
      img: "https://brilux.com.br/wp-content/uploads/2022/08/Agua-Sanitaria-Leve2L-Ps1.png",
      label: "Água Sanitária",
      category: "Limpeza",
      lojaItem: 120,
      galpaoItem: 80,
      status: "Normal",
    },
    {
      img: "https://www.jnfraldas.com.br/wp-content/uploads/2024/03/uaupequenolavanda.webp",
      label: "Desinfetante UAU",
      category: "Limpeza",
      lojaItem: 4,
      galpaoItem: 10,
      status: "Normal",
    },
    {
      img: "https://brilux.com.br/wp-content/uploads/2022/08/Agua-Sanitaria-Leve2L-Ps1.png",
      label: "Água Sanitária",
      category: "Limpeza",
      lojaItem: 120,
      galpaoItem: 80,
      status: "Normal",
    },
    {
      img: "https://www.jnfraldas.com.br/wp-content/uploads/2024/03/uaupequenolavanda.webp",
      label: "Desinfetante UAU",
      category: "Limpeza",
      lojaItem: 4,
      galpaoItem: 10,
      status: "Normal",
    },
    {
      img: "https://brilux.com.br/wp-content/uploads/2022/08/Agua-Sanitaria-Leve2L-Ps1.png",
      label: "Água Sanitária",
      category: "Limpeza",
      lojaItem: 120,
      galpaoItem: 80,
      status: "Normal",
    },
    {
      img: "https://www.jnfraldas.com.br/wp-content/uploads/2024/03/uaupequenolavanda.webp",
      label: "Desinfetante UAU",
      category: "Limpeza",
      lojaItem: 4,
      galpaoItem: 10,
      status: "Normal",
    },
    {
      img: "https://brilux.com.br/wp-content/uploads/2022/08/Agua-Sanitaria-Leve2L-Ps1.png",
      label: "Água Sanitária",
      category: "Limpeza",
      lojaItem: 120,
      galpaoItem: 80,
      status: "Normal",
    },
    {
      img: "https://www.jnfraldas.com.br/wp-content/uploads/2024/03/uaupequenolavanda.webp",
      label: "Desinfetante UAU",
      category: "Limpeza",
      lojaItem: 4,
      galpaoItem: 10,
      status: "Normal",
    },
    {
      img: "https://www.jnfraldas.com.br/wp-content/uploads/2024/03/uaupequenolavanda.webp",
      label: "Desinfetante UAU",
      category: "Limpeza",
      lojaItem: 4,
      galpaoItem: 10,
      status: "Normal",
    },
    {
      img: "https://www.jnfraldas.com.br/wp-content/uploads/2024/03/uaupequenolavanda.webp",
      label: "Desinfetante UAU",
      category: "Limpeza",
      lojaItem: 4,
      galpaoItem: 10,
      status: "Normal",
    },
    {
      img: "https://www.jnfraldas.com.br/wp-content/uploads/2024/03/uaupequenolavanda.webp",
      label: "Desinfetante UAU",
      category: "Limpeza",
      lojaItem: 4,
      galpaoItem: 10,
      status: "Normal",
    },
    {
      img: "https://www.jnfraldas.com.br/wp-content/uploads/2024/03/uaupequenolavanda.webp",
      label: "Desinfetante UAU",
      category: "Limpeza",
      lojaItem: 4,
      galpaoItem: 10,
      status: "Normal",
    },
    {
      img: "https://www.jnfraldas.com.br/wp-content/uploads/2024/03/uaupequenolavanda.webp",
      label: "Desinfetante UAU",
      category: "Limpeza",
      lojaItem: 4,
      galpaoItem: 10,
      status: "Normal",
    },
  ];

  return (
    <div>
      <div>
        <Sidebar />
      </div>
      <div className="ml-64 px-8">
        <div className="py-6 flex justify-between items-center">
          <HeaderComponent
            title="Estoque"
            subtitle="Controle da loja do Estoque e do Galpão"
          />

          <div className="flex items-center gap-4">
            <buton className={styleButtons}>
              <CircleQuestionMark />
            </buton>
            <buton className={styleButtons}>
              <Search />
            </buton>
            <buton className={styleButtons}>
              <RotateCcwClock />
            </buton>
            <buton className={styleButtons}>
              <X />
            </buton>
          </div>
        </div>

        <hr className="border-b border-primary/20 w-full" />

        <div className="mt-8 flex items-center justify-between gap-8">
          {/* Select */}
          <div className="flex border border-primary/20 rounded-lg w-fit">
            <button
              className={`min-w-22 px-4 h-10 text-sm cursor-pointer hover:bg-primary/20 duration-300 transition-all ${selected === "Todos" ? "bg-primaryDark text-white" : ""}`}
              onClick={() => setSelected("Todos")}
            >
              Todos
            </button>
            <button
              className={`min-w-22 px-4 h-10 text-sm cursor-pointer hover:bg-primary/20 duration-300 transition-all ${selected === "Estoque" ? "bg-primaryDark text-white" : ""}`}
              onClick={() => setSelected("Estoque")}
            >
              Estoque
            </button>
            <button
              className={`min-w-22 px-4 h-10 text-sm cursor-pointer hover:bg-primary/20 duration-300 transition-all ${selected === "Galpao" ? "bg-primaryDark text-white" : ""}`}
              onClick={() => setSelected("Galpao")}
            >
              Galpão
            </button>
          </div>
          {/* Input */}
          <div className="w-full">
            <div className="border border-gray-200 py-2 px-4 hidden lg:flex items-center gap-4 rounded-xl w-full bg-terciary">
              <span>
                <Search className="size-5" />
              </span>
              <input
                type="text"
                placeholder="Buscar produtos, pedidos..."
                className="w-full outline-none focus:duration-500 focus:transition-all"
              />
            </div>
          </div>
          {/* Button */}
          <div className="flex justify-end">
            <button className="flex truncate items-center gap-2 bg-primaryDark p-2 rounded-lg text-white hover:scale-95 transition-all duration-500 cursor-pointer">
              <span>
                <Plus />
              </span>
              Adicionar Produto
            </button>
          </div>
        </div>

        {/* Infos */}
        <div className="flex justify-between mt-4 xl:justify-normal xl:gap-4">
          {infos.map((item, index) => (
            <div
              key={index}
              className="flex p-4 border border-primary/20 max-w-[32%] w-full xl:max-w-[20%] rounded-lg gap-6"
            >
              <div className="mt-4 bg-primary p-3 text-white h-fit rounded-full">
                {item.icon}
              </div>
              <div>
                <h1 className="font-medium text-black/80">{item.label}</h1>
                <p className="font-bold text-2xl">
                  {item.mount.toLocaleString("pt-BR")}
                </p>
                <p className="text-black/50">unidades</p>
              </div>
            </div>
          ))}
        </div>

        {/* Produtos */}
        <div className="w-full border border-primary/30 rounded-lg mt-6">
          <div>
            <div className="grid grid-cols-[minmax(220px,2fr)_1.5fr_1fr_1.2fr_1fr_1.5fr_0.5fr] bg-primary/10 px-4 py-3 rounded-lg">
              <p>Produto</p>
              <p>Categoria</p>
              <p>Loja</p>
              <p>Galpão</p>
              <p>Total</p>
              <p>Status</p>
            </div>

            <div className="flex flex-col px-4 py-2 border border-primary/30 rounded-lg border-t-0 max-h-[calc(100vh-418px)] min-h-0 overflow-y-auto">
              {produtos.map((produto, index) => {
                const total = produto.lojaItem + produto.galpaoItem;
                const baixo = total <= 50;

                return (
                  <div
                    key={index}
                    className="grid grid-cols-[minmax(220px,2fr)_1.5fr_1fr_1.2fr_1fr_1.5fr_0.5fr] border-b border-primaryDark/30 last:border-b-0"
                  >
                    <div className="flex items-center gap-2 h-16">
                      <img
                        src={produto.img}
                        alt=""
                        className="w-12 h-12 object-contain shrink-0"
                      />
                      <h1 className="text-sm whitespace-nowrap">
                        {produto.label}
                      </h1>
                    </div>
                    <p className="text-sm flex items-center">
                      {produto.category}
                    </p>
                    <p className="flex items-center">{produto.lojaItem}</p>
                    <p className="flex items-center">{produto.galpaoItem}</p>
                    <p className="flex items-center">{total}</p>
                    <p className="flex items-center">
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
                    <button className="cursor-pointer hover:bg-primary/20 transition-all duration-500 w-fit h-fit p-2 m-auto border rounded-lg border-primaryDark/20 text-primaryDark">
                      <Ellipsis />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Estoque;
