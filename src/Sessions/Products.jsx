import React, { useState } from "react";
import HeaderComponent from "../Components/HeaderComponent";
import SearchComponent from "../Components/SearchComponent";
import Sidebar from "../Components/Sidebar";
import {
  Box,
  BrushCleaning,
  Bubbles,
  ChevronLeft,
  ChevronRight,
  CookingPot,
  Download,
  GlassWater,
  Plus,
  SquareArrowDownRight,
} from "lucide-react";

function Products() {
  function testeButton() {
    alert("Botão Novo Produto funcionando!");
  }

  function testeButtonExport() {
    alert("Botão Exportar funcionando!");
  }

  const filterProducts = [
    {
      icon: <Box className="size-4" />,
      label: "Todos",
    },
    {
      icon: <BrushCleaning className="size-4" />,
      label: "Limpeza",
    },
    {
      icon: <CookingPot className="size-4" />,
      label: "Alimentos",
    },
    {
      icon: <GlassWater className="size-4" />,
      label: "Descart",
    },
    {
      icon: <Bubbles className="size-4" />,
      label: "Higiene",
    },
  ];

  const productsExample = [
    {
      imagem:
        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR06pTOEuJTsDRlfv5kEnli-i1lN3CpOK62Eho17x63Jtvr4ShqNUfCnFUtHFIsezm9DJpS94KrP1L4tdBf4g86LTBerTjitd4QWyenRsl0Wycq4nRwdrLSU0x54-fRvwXKVkaxt-I&usqp=CAc",
      produto: "Sabão líquido 5L",
      categoria: "Limpeza",
      unidade: "UN",
      preco: 14.9,
      loja: 32,
      galpao: 18,
    },
    {
      imagem:
        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR06pTOEuJTsDRlfv5kEnli-i1lN3CpOK62Eho17x63Jtvr4ShqNUfCnFUtHFIsezm9DJpS94KrP1L4tdBf4g86LTBerTjitd4QWyenRsl0Wycq4nRwdrLSU0x54-fRvwXKVkaxt-I&usqp=CAc",
      produto: "Sabão líquido 5L",
      categoria: "Alimentos",
      unidade: "UN",
      preco: 14.9,
      loja: 32,
      galpao: 18,
    },
    {
      imagem:
        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR06pTOEuJTsDRlfv5kEnli-i1lN3CpOK62Eho17x63Jtvr4ShqNUfCnFUtHFIsezm9DJpS94KrP1L4tdBf4g86LTBerTjitd4QWyenRsl0Wycq4nRwdrLSU0x54-fRvwXKVkaxt-I&usqp=CAc",
      produto: "Sabão líquido 5L",
      categoria: "Higiene",
      unidade: "UN",
      preco: 14.9,
      loja: 32,
      galpao: 18,
    },
    {
      imagem:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQlCJ-Ntc8cJyeddW_q_56xDj065tYHZsOsWBuWEfZpQ&s=10",
      produto: "Água sanitária 1L",
      categoria: "Limpeza",
      unidade: "UN",
      preco: "2.50",
      loja: 15,
      galpao: 10,
    },
    {
      imagem:
        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR06pTOEuJTsDRlfv5kEnli-i1lN3CpOK62Eho17x63Jtvr4ShqNUfCnFUtHFIsezm9DJpS94KrP1L4tdBf4g86LTBerTjitd4QWyenRsl0Wycq4nRwdrLSU0x54-fRvwXKVkaxt-I&usqp=CAc",
      produto: "Sabão líquido 5L",
      categoria: "Higiene",
      unidade: "UN",
      preco: 14.9,
      loja: 32,
      galpao: 18,
    },
    {
      imagem:
        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR06pTOEuJTsDRlfv5kEnli-i1lN3CpOK62Eho17x63Jtvr4ShqNUfCnFUtHFIsezm9DJpS94KrP1L4tdBf4g86LTBerTjitd4QWyenRsl0Wycq4nRwdrLSU0x54-fRvwXKVkaxt-I&usqp=CAc",
      produto: "Sabão líquido 5L",
      categoria: "Alimentos",
      unidade: "UN",
      preco: 14.9,
      loja: 32,
      galpao: 18,
    },
    {
      imagem:
        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR06pTOEuJTsDRlfv5kEnli-i1lN3CpOK62Eho17x63Jtvr4ShqNUfCnFUtHFIsezm9DJpS94KrP1L4tdBf4g86LTBerTjitd4QWyenRsl0Wycq4nRwdrLSU0x54-fRvwXKVkaxt-I&usqp=CAc",
      produto: "Sabão líquido 5L",
      categoria: "Higiene",
      unidade: "UN",
      preco: 14.9,
      loja: 32,
      galpao: 18,
    },
    {
      imagem:
        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR06pTOEuJTsDRlfv5kEnli-i1lN3CpOK62Eho17x63Jtvr4ShqNUfCnFUtHFIsezm9DJpS94KrP1L4tdBf4g86LTBerTjitd4QWyenRsl0Wycq4nRwdrLSU0x54-fRvwXKVkaxt-I&usqp=CAc",
      produto: "Sabão líquido 5L",
      categoria: "Higiene",
      unidade: "UN",
      preco: 14.9,
      loja: 32,
      galpao: 18,
    },
    {
      imagem:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQlCJ-Ntc8cJyeddW_q_56xDj065tYHZsOsWBuWEfZpQ&s=10",
      produto: "Água sanitária 1L",
      categoria: "Limpeza",
      unidade: "UN",
      preco: "2.50",
      loja: 15,
      galpao: 10,
    },
    {
      imagem:
        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR06pTOEuJTsDRlfv5kEnli-i1lN3CpOK62Eho17x63Jtvr4ShqNUfCnFUtHFIsezm9DJpS94KrP1L4tdBf4g86LTBerTjitd4QWyenRsl0Wycq4nRwdrLSU0x54-fRvwXKVkaxt-I&usqp=CAc",
      produto: "Sabão líquido 5L",
      categoria: "Limpeza",
      unidade: "UN",
      preco: 14.9,
      loja: 32,
      galpao: 18,
    },
    {
      imagem:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQlCJ-Ntc8cJyeddW_q_56xDj065tYHZsOsWBuWEfZpQ&s=10",
      produto: "Água sanitária 1L",
      categoria: "Descart",
      unidade: "UN",
      preco: "2.50",
      loja: 15,
      galpao: 10,
    },
  ];

  const [filterSelected, setFilterSelected] = useState(0);
  const [filterPage, setFilterPage] = useState(0);

  const productsPerPage = 10;

  const numbersPageFilter = [1, 2, 3, 4, 5];

  const proximo = () => {
    setFilterPage((prev) => Math.min(prev + 1, numbersPageFilter.length - 1));
  };

  const anterior = () => {
    setFilterPage((prev) => Math.max(prev - 1, 0));
  };

  const filteredProducts =
    filterSelected === 0
      ? productsExample
      : productsExample.filter(
          (item) => item.categoria === filterProducts[filterSelected].label,
        );

  const totalProducts = filteredProducts.length;

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const startIndex = filterPage * productsPerPage;

  const endIndex = Math.min(startIndex + productsPerPage, totalProducts);

  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen">
      <div className="">
        <Sidebar />
      </div>

      <div className="flex w-full">
        <div className="ml-54 py-4 px-8 w-full">
          <SearchComponent />

          <hr className="w-full opacity-20 mt-4 mb-2" />

          <section className="flex items-center justify-between mt-4">
            <HeaderComponent
              title="Produtos"
              subtitle="Gerencie todos os produtos do seu estoque"
            />

            <div className="flex gap-4">
              <button
                onClick={testeButton}
                className="flex items-center gap-2 bg-primaryDark px-4 py-2 rounded-lg text-white cursor-pointer hover:scale-95 duration-500 transition-all"
              >
                <span>
                  <Plus className="size-5" />
                </span>
                Novo Produto
              </button>
              <button
                onClick={testeButtonExport}
                className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg text-black border-2 border-black/30 cursor-pointer hover:scale-95 duration-500 transition-all"
              >
                <span>
                  <Download />
                </span>
                Exportar
              </button>
            </div>
          </section>

          <hr className="w-full opacity-20 mt-4 mb-2" />

          <div className="flex items-center gap-6 mt-4">
            {filterProducts.map((item, index) => (
              <div key={index}>
                <button
                  onClick={() => setFilterSelected(index)}
                  className={`px-4 py-1.5 border-gray-300 rounded-lg border-2 flex items-center gap-2 cursor-pointer ${filterSelected === index ? "border-primaryDark text-primaryDark border-2 duration-500 transition-all" : "text-gray-400"}`}
                >
                  <span>{item.icon}</span> {item.label}
                </button>
              </div>
            ))}
          </div>

          <div className="max-h-[70vh] overflow-y-auto scrollbar-none">
            <div className="w-full mt-6">
              <div className="grid grid-cols-[1.5fr_2fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] bg-gray-200 px-4 py-2 rounded-tr-lg rounded-tl-lg">
                <p>Imagem</p>
                <p>Produto</p>
                <p>Categoria</p>
                <p>Unidade</p>
                <p>Preço</p>
                <p>Loja</p>
                <p>Galpão</p>
                <p>Total</p>
                <p>Status</p>
              </div>

              <div className="flex flex-col gap-4 pt-4 px-4 border rounded-bl-lg rounded-br-lg border-gray-300 border-t-0">
                {currentProducts.map((item, index) => {
                  const total = item.loja + item.galpao;

                  return (
                    <div
                      key={index}
                      className="grid grid-cols-[1.5fr_2fr_1fr_1fr_1fr_1fr_1fr_0.9fr_1fr] border-b border-gray-200 pb-4 overflow-y-auto"
                    >
                      <img
                        className="object-contain border w-14 h-16 p-2 rounded-lg border-gray-200"
                        src={item.imagem}
                        alt=""
                      />

                      <p className="my-auto">{item.produto}</p>

                      <p className="my-auto">{item.categoria}</p>
                      <p className="my-auto">{item.unidade}</p>
                      <p className="my-auto">{item.preco}</p>
                      <p className="my-auto">{item.loja}</p>
                      <p className="my-auto">{item.galpao}</p>
                      <p className="my-auto">{total}</p>
                      <div className="text-center w-14 my-auto">
                        {total >= 50 ? (
                          <p className="text-green-500 font-medium">Normal</p>
                        ) : (
                          <p className="text-red-500 font-medium">Baixo</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center border-t-2 border-gray-200 mt-4 pt-4 pb-4 px-2">
            <p className="text-gray-500">
              Mostrando {totalProducts === 0 ? 0 : startIndex + 1}-{endIndex} de{" "}
              {totalProducts} produtos
            </p>
            <div className="flex items-center gap-2 justify-end">
              <div
                onClick={anterior}
                className="cursor-pointer hover:scale-90 duration-500 transition-all"
              >
                <ChevronLeft />
              </div>
              <div className="flex gap-2">
                {numbersPageFilter.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setFilterPage(index)}
                    disabled={item === ".."}
                    className={`p-2 border rounded-lg w-8 h-8 flex items-center justify-center
      ${
        filterPage === index
          ? "bg-primaryDark text-white border-primaryDark"
          : "border-gray-300 hover:bg-gray-100"
      }
      ${item === ".." ? "cursor-default" : "cursor-pointer"}
    `}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div
                onClick={proximo}
                className="cursor-pointer hover:scale-90 duration-500 transition-all"
              >
                <ChevronRight />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
