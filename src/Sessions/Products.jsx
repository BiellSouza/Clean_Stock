import React from "react";
import HeaderComponent from "../Components/HeaderComponent";
import SearchComponent from "../Components/SearchComponent";
import Sidebar from "../Components/Sidebar";
import { Download, Plus } from "lucide-react";

function Products() {
  function testeButton() {
    alert("Botão Novo Produto funcionando!");
  }

  function testeButtonExport() {
    alert("Botão Exportar funcionando!");
  }

  return (
    <div className="min-h-screen pb-8">
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
        </div>
      </div>
    </div>
  );
}

export default Products;
