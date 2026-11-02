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
  Info,
} from "lucide-react";

function Estoque() {
  const styleButtons = `border border-primary/20 p-2 bg-primary/5 rounded-lg text-primaryDark hover:scale-90 transition-all duration-500 cursor-pointer`;

  const [selected, setSelected] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
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
      id: 1,
      nome: "Sabão líquido 5L",
      categoria: "Limpeza",
      unidade: "UN",
      preco: 3.5,
      estoqueLoja: 12,
      estoqueGalpao: 18,
      estoqueMinimo: 10,
      descricao: "Sabão líquido para limpeza de roupas.",
      imagem:
        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQeO9z4xX1huTmoOut2Mc4ecfyZnUAFsHd6sOrtZAefyPfkHwYimHHDjuhoI6txzuyIC6Rtgm1Sxv6QYV9-LFh2Jidlsm1v68cGEgmZNlTJ724erMul7sknAIou0pfgHjuP-Dr2WQ&usqp=CAc",
    },
    {
      id: 2,
      nome: "Água Sanitária 1L",
      categoria: "Limpeza",
      unidade: "UN",
      preco: 4.2,
      estoqueLoja: 5,
      estoqueGalpao: 10,
      estoqueMinimo: 20,
      descricao: "Água sanitária para limpeza e desinfecção.",
      imagem: "/products/agua-sanitaria.png",
    },
    {
      id: 3,
      nome: "Desinfetante Lavanda 2L",
      categoria: "Limpeza",
      unidade: "UN",
      preco: 7.5,
      estoqueLoja: 25,
      estoqueGalpao: 40,
      estoqueMinimo: 15,
      descricao: "Desinfetante perfumado com fragrância de lavanda.",
      imagem: "/products/desinfetante.png",
    },
    {
      id: 4,
      nome: "Sabão em Pó 1kg",
      categoria: "Limpeza",
      unidade: "UN",
      preco: 8.9,
      estoqueLoja: 3,
      estoqueGalpao: 4,
      estoqueMinimo: 15,
      descricao: "Sabão em pó para lavagem de roupas.",
      imagem: "/products/sabao.png",
    },
    {
      id: 5,
      nome: "Papel Higiênico 30m",
      categoria: "Limpeza",
      unidade: "PCT",
      preco: 12.9,
      estoqueLoja: 30,
      estoqueGalpao: 50,
      estoqueMinimo: 20,
      descricao: "Pacote de papel higiênico com folhas macias.",
      imagem: "/products/papel.png",
    },
    {
      id: 6,
      nome: "Amaciante Concentrado 1L",
      categoria: "Limpeza",
      unidade: "UN",
      preco: 11.5,
      estoqueLoja: 8,
      estoqueGalpao: 22,
      estoqueMinimo: 15,
      descricao: "Amaciante concentrado para roupas.",
      imagem: "/products/amaciante.png",
    },
    {
      id: 7,
      nome: "Multiuso 500ml",
      categoria: "Limpeza",
      unidade: "UN",
      preco: 5.9,
      estoqueLoja: 18,
      estoqueGalpao: 35,
      estoqueMinimo: 10,
      descricao: "Limpador multiuso para diversas superfícies.",
      imagem: "/products/multiuso.png",
    },
    {
      id: 8,
      nome: "Álcool 70% 1L",
      categoria: "Limpeza",
      unidade: "UN",
      preco: 9.9,
      estoqueLoja: 6,
      estoqueGalpao: 8,
      estoqueMinimo: 20,
      descricao: "Álcool 70% para higienização de superfícies.",
      imagem: "/products/alcool.png",
    },
    {
      id: 9,
      nome: "Desengordurante 500ml",
      categoria: "Limpeza",
      unidade: "UN",
      preco: 8.5,
      estoqueLoja: 20,
      estoqueGalpao: 30,
      estoqueMinimo: 12,
      descricao: "Remove gorduras de fogões e superfícies.",
      imagem: "/products/desengordurante.png",
    },
    {
      id: 10,
      nome: "Limpador Perfumado 1L",
      categoria: "Limpeza",
      unidade: "UN",
      preco: 6.9,
      estoqueLoja: 2,
      estoqueGalpao: 5,
      estoqueMinimo: 15,
      descricao: "Limpador perfumado para pisos e superfícies.",
      imagem: "/products/limpador.png",
    },
    {
      id: 11,
      nome: "Sabonete Líquido 500ml",
      categoria: "Limpeza",
      unidade: "UN",
      preco: 10.9,
      estoqueLoja: 15,
      estoqueGalpao: 25,
      estoqueMinimo: 10,
      descricao: "Sabonete líquido para higiene das mãos.",
      imagem: "/products/sabonete.png",
    },
    {
      id: 12,
      nome: "Desinfetante Eucalipto 5L",
      categoria: "Desinfetantes",
      unidade: "UN",
      preco: 19.9,
      estoqueLoja: 10,
      estoqueGalpao: 20,
      estoqueMinimo: 12,
      descricao: "Desinfetante de uso geral com fragrância de eucalipto.",
      imagem: "/products/desinfetante-5l.png",
    },
    {
      id: 13,
      nome: "Cloro Gel 700g",
      categoria: "Água sanitária",
      unidade: "UN",
      preco: 8.9,
      estoqueLoja: 4,
      estoqueGalpao: 3,
      estoqueMinimo: 10,
      descricao: "Cloro em gel para limpeza de banheiros.",
      imagem: "/products/cloro-gel.png",
    },
    {
      id: 14,
      nome: "Esponja Multiuso",
      categoria: "Acessórios",
      unidade: "UN",
      preco: 2.5,
      estoqueLoja: 50,
      estoqueGalpao: 100,
      estoqueMinimo: 30,
      descricao: "Esponja multiuso para limpeza doméstica.",
      imagem: "/products/esponja.png",
    },
    {
      id: 15,
      nome: "Luva de Limpeza",
      categoria: "Acessórios",
      unidade: "PAR",
      preco: 7.9,
      estoqueLoja: 12,
      estoqueGalpao: 18,
      estoqueMinimo: 10,
      descricao: "Luva de proteção para atividades de limpeza.",
      imagem: "/products/luva.png",
    },
    {
      id: 16,
      nome: "Saco de Lixo 50L",
      categoria: "Descartáveis",
      unidade: "PCT",
      preco: 9.5,
      estoqueLoja: 25,
      estoqueGalpao: 45,
      estoqueMinimo: 20,
      descricao: "Pacote de sacos de lixo com capacidade de 50 litros.",
      imagem: "/products/saco-lixo.png",
    },
    {
      id: 17,
      nome: "Pano de Chão",
      categoria: "Acessórios",
      unidade: "UN",
      preco: 6.5,
      estoqueLoja: 3,
      estoqueGalpao: 2,
      estoqueMinimo: 10,
      descricao: "Pano de chão resistente para limpeza.",
      imagem: "/products/pano.png",
    },
    {
      id: 18,
      nome: "Rodo 40cm",
      categoria: "Acessórios",
      unidade: "UN",
      preco: 15.9,
      estoqueLoja: 14,
      estoqueGalpao: 20,
      estoqueMinimo: 8,
      descricao: "Rodo para limpeza de pisos e superfícies.",
      imagem: "/products/rodo.png",
    },
    {
      id: 19,
      nome: "Vassoura Multiuso",
      categoria: "Acessórios",
      unidade: "UN",
      preco: 18.9,
      estoqueLoja: 9,
      estoqueGalpao: 15,
      estoqueMinimo: 10,
      descricao: "Vassoura para limpeza de ambientes internos e externos.",
      imagem: "/products/vassoura.png",
    },
    {
      id: 20,
      nome: "Desodorizador de Ambiente",
      categoria: "Aromatizantes",
      unidade: "UN",
      preco: 12.5,
      estoqueLoja: 20,
      estoqueGalpao: 35,
      estoqueMinimo: 15,
      descricao: "Aromatizador para ambientes com fragrância agradável.",
      imagem: "/products/aromatizador.png",
    },
    {
      id: 21,
      nome: "Limpa Vidros 500ml",
      categoria: "Limpadores",
      unidade: "UN",
      preco: 6.5,
      estoqueLoja: 7,
      estoqueGalpao: 8,
      estoqueMinimo: 20,
      descricao: "Limpador para vidros e superfícies espelhadas.",
      imagem: "/products/limpa-vidros.png",
    },
    {
      id: 22,
      nome: "Sabão em Barra 5 Unidades",
      categoria: "Lavanderia",
      unidade: "PCT",
      preco: 9.9,
      estoqueLoja: 18,
      estoqueGalpao: 30,
      estoqueMinimo: 12,
      descricao: "Pacote com cinco unidades de sabão em barra.",
      imagem: "/products/sabao-barra.png",
    },
    {
      id: 23,
      nome: "Desentupidor Líquido 1L",
      categoria: "Limpadores",
      unidade: "UN",
      preco: 14.9,
      estoqueLoja: 5,
      estoqueGalpao: 4,
      estoqueMinimo: 12,
      descricao: "Produto para desobstrução de encanamentos.",
      imagem: "/products/desentupidor.png",
    },
    {
      id: 24,
      nome: "Papel Toalha 2 Rolos",
      categoria: "Higiene",
      unidade: "PCT",
      preco: 8.5,
      estoqueLoja: 22,
      estoqueGalpao: 40,
      estoqueMinimo: 15,
      descricao: "Pacote de papel toalha para uso doméstico.",
      imagem: "/products/papel-toalha.png",
    },
    {
      id: 25,
      nome: "Balde Plástico 12L",
      categoria: "Acessórios",
      unidade: "UN",
      preco: 16.9,
      estoqueLoja: 6,
      estoqueGalpao: 12,
      estoqueMinimo: 10,
      descricao: "Balde plástico resistente para atividades de limpeza.",
      imagem: "/products/balde.png",
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
            <button
              onClick={() => setModalOpen(true)}
              className="flex truncate items-center gap-2 bg-primaryDark p-2 rounded-lg text-white hover:scale-95 transition-all duration-500 cursor-pointer"
            >
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
                const total = produto.estoqueLoja + produto.estoqueGalpao;
                const baixo = total <= 50;

                return (
                  <div
                    key={index}
                    className="grid grid-cols-[minmax(220px,2fr)_1.5fr_1fr_1.2fr_1fr_1.5fr_0.5fr] border-b border-primaryDark/30 last:border-b-0"
                  >
                    <div className="flex items-center gap-2 h-16">
                      <img
                        src={produto.imagem}
                        alt=""
                        className="w-12 h-12 object-contain shrink-0"
                      />
                      <h1 className="text-sm max-w-24">{produto.nome}</h1>
                    </div>
                    <p className="text-sm flex items-center">
                      {produto.categoria}
                    </p>
                    <p className="flex items-center ml-2">
                      {produto.estoqueLoja}
                    </p>
                    <p className="flex items-center ml-4">
                      {produto.estoqueGalpao}
                    </p>
                    <p className="flex items-center ml-4">{total}</p>
                    <p className="flex items-center ml-2">
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
                    <button
                      onClick={() => {
                        setSelectedProduct(produto);
                        setModalProduct(true);
                      }}
                      className="cursor-pointer hover:bg-primary/20 transition-all duration-500 w-fit h-fit p-2 m-auto border rounded-lg border-primaryDark/20 text-primaryDark"
                    >
                      <Ellipsis />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Adicionar Produtos */}
        {modalOpen && (
          <div className="fixed inset-0 z-0 bg-black/40 flex items-center justify-center p-4">
            <div className="z-10 bg-white w-[40%]">
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 backdrop-blur-sm p-4 ">
                <div className="bg-white">
                  <div className="w-full max-w-2xl rounded-2xl shadow-2xl overflow-y-auto h-[calc(100vh-40px)]">
                    {/* Cabeçalho */}
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

                      <button className="w-9 h-9 hover:scale-80 duration-500 cursor-pointer flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700">
                        <X size={20} onClick={() => setModalOpen(false)} />
                      </button>
                    </div>

                    {/* Conteúdo */}
                    <div className="p-6 space-y-6">
                      {/* Informações gerais */}
                      <div>
                        <h3 className="text-sm font-bold text-slate-700 mb-4">
                          Informações do produto
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-slate-600 mb-2">
                              Nome do produto
                            </label>
                            <input
                              type="text"
                              placeholder="Ex: Detergente Neutro 500ml"
                              className="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-slate-600 mb-2">
                              Código / SKU
                            </label>
                            <input
                              type="text"
                              placeholder="Ex: PROD-001"
                              className="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-slate-600 mb-2">
                              Categoria
                            </label>
                            <select className="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm text-slate-600 outline-none focus:border-blue-500">
                              <option value="">Selecione uma categoria</option>
                              <option>Detergentes</option>
                              <option>Desinfetantes</option>
                              <option>Água sanitária</option>
                              <option>Higiene</option>
                              <option>Acessórios de limpeza</option>
                              <option>Outros</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-slate-600 mb-2">
                              Unidade de medida
                            </label>
                            <select className="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm text-slate-600 outline-none focus:border-blue-500">
                              <option>Unidade (UN)</option>
                              <option>Caixa (CX)</option>
                              <option>Pacote (PCT)</option>
                              <option>Litro (L)</option>
                              <option>Quilograma (KG)</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-slate-600 mb-2">
                              Valor unitário
                            </label>
                            <div className="relative">
                              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                                R$
                              </span>
                              <input
                                type="number"
                                placeholder="0,00"
                                className="w-full h-11 pl-11 pr-4 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-500"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Estoque */}
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
                            O estoque total será calculado automaticamente pela
                            soma das quantidades da loja e do galpão. O estoque
                            mínimo será utilizado para gerar alertas de
                            reposição.
                          </p>
                        </div>
                      </div>

                      {/* Descrição */}
                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-2">
                          Descrição (opcional)
                        </label>
                        <textarea
                          rows="3"
                          placeholder="Adicione informações sobre o produto..."
                          className="w-full p-4 rounded-xl border border-slate-200 text-sm resize-none outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    {/* Rodapé */}
                    <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 px-6 py-5">
                      <button className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 bg-slate-300 cursor-pointer hover:scale-90 duration-500 transition">
                        Cancelar
                      </button>

                      <button className="w- cursor-pointer sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-blue-700 hover:scale-90 duration-500 text-white text-sm font-semibold shadow-lg shadow-blue-600/20 transition">
                        <Plus size={18} />
                        Cadastrar produto
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Produtos */}
        {modalProduct && selectedProduct && (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => {
              setModalProduct(false);
              setSelectedProduct(null);
            }}
          >
            {(() => {
              const produto = selectedProduct;

              const estoqueTotal = produto.estoqueLoja + produto.estoqueGalpao;

              const estoqueBaixo = estoqueTotal <= produto.estoqueMinimo;

              return (
                <div
                  key={produto.id}
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

                    <img
                      src={produto.imagem}
                      alt={produto.nome}
                      className="relative z-10 w-56 h-64 md:w-64 md:h-72 object-contain drop-shadow-2xl"
                    />

                    <span className="absolute bottom-6 right-6 text-xs text-white/50">
                      {produto.unidade}
                    </span>
                  </div>

                  {/* LADO DIREITO */}
                  <div className="bg-white p-6 md:p-8 flex flex-col justify-between">
                    {/* CABEÇALHO */}
                    <div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                          {produto.categoria}
                        </span>

                        <button
                          onClick={() => {
                            setModalProduct(false);
                            setSelectedProduct(null);
                          }}
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

                      <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#071B35] mt-5">
                        {produto.nome}
                      </h2>

                      <p className="text-sm text-slate-500 mt-3 leading-relaxed">
                        {produto.descricao}
                      </p>

                      <div className="flex items-center gap-3 mt-6">
                        <span className="h-px w-12 bg-blue-600" />
                        <span className="text-xs text-slate-400 uppercase tracking-widest">
                          Informações do produto
                        </span>
                      </div>
                    </div>

                    {/* INFORMAÇÕES */}
                    <div className="mt-7 space-y-5">
                      {/* PREÇO */}
                      <div className="flex items-center gap-4">
                        <div className="flex-1 border-l border-slate-200 pl-4">
                          <p className="text-xs uppercase tracking-widest text-slate-400">
                            Valor unitário
                          </p>

                          <p className="text-2xl font-bold text-[#071B35] mt-1">
                            {produto.preco.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </p>
                        </div>
                      </div>

                      {/* LOJA */}
                      <div className="flex items-center gap-4">
                        <div className="flex-1 border-l border-slate-200 pl-4">
                          <p className="text-xs uppercase tracking-widest text-slate-400">
                            Estoque da loja
                          </p>

                          <p className="text-xl font-semibold text-[#071B35] mt-1">
                            {produto.estoqueLoja} {produto.unidade}
                          </p>
                        </div>
                      </div>

                      {/* GALPÃO */}
                      <div className="flex items-center gap-4">
                        <div className="flex-1 border-l border-slate-200 pl-4">
                          <p className="text-xs uppercase tracking-widest text-slate-400">
                            Estoque do galpão
                          </p>

                          <p className="text-xl font-semibold text-[#071B35] mt-1">
                            {produto.estoqueGalpao} {produto.unidade}
                          </p>
                        </div>
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

                        <span className="text-xs text-slate-400">unidades</span>
                      </div>

                      <p className="text-xs text-slate-400 mt-1">
                        Mínimo: {produto.estoqueMinimo} {produto.unidade}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
}

export default Estoque;
