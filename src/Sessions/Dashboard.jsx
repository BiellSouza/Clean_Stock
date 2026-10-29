import React from "react";
import SidebarComponent from "../Components/Sidebar";
import {
  Bell,
  Calendar,
  ChevronDown,
  LayerArrowUp,
  PackageSearch,
  Search,
  ShelvingUnit,
  Wallet,
} from "lucide-react";
import HeaderComponent from "../Components/HeaderComponent";
import CardsDashboard from "./cards/CardsDashboard";

function Dashboard() {
  const dados = [
    {
      icon: <PackageSearch />,
      title: "Total de Produtos",
      number: 248,
      obs: "5",
    },
    {
      icon: <LayerArrowUp />,
      title: "Pedidos Hoje",
      number: 248,
      obs: "3",
    },
    {
      icon: <Wallet />,
      title: "Valor Total (Hoje)",
      number: 248,
      obs: "12",
    },
    {
      icon: <ShelvingUnit />,
      title: "Estoque Abaixo do Mínimo",
      number: 248,
      obs: "7",
    },
  ];
  return (
    <div>
      <div>
        <SidebarComponent />
      </div>

      <div className="ml-64 min-w-0 h-screen bg-terciary">
        {/* header */}
        <div className="bg-secondary px-8 py-4 border-b border-black/10 flex items-center justify-between">
          {/* Imput */}
          <div className="border border-gray-200 max-w-164 py-2 px-4 flex items-center gap-4 rounded-xl lg:w-[50%] bg-terciary">
            <span>
              <Search className="size-5" />
            </span>
            <input
              type="text"
              placeholder="Buscar produtos, pedidos..."
              className="w-full outline-none focus:duration-500 focus:transition-all"
            />
          </div>

          {/* notifications and infos */}
          <div className="flex items-center gap-6">
            <button>
              <Bell className="lg:scale-110 hover:scale-95 transition-all duration-500 cursor-pointer text-primaryDark" />
            </button>

            <div className="w-0.5 h-10 bg-primaryDark/30 rounded-full" />

            <div className="flex items-center gap-4">
              <img
                src="http://cdn.pfps.gg/pfps/6096-dark-aesthetic-anime-user-icon.png"
                alt=""
                className="lg:max-w-10 rounded-full"
              />
              <div className="flex gap-8">
                <div>
                  <h1 className="font-bold lg:text-md text-quaternary">
                    Gabriel Souza
                  </h1>
                  <p className="lg:text-xs text-quaternary/40 font-medium">
                    Administrador
                  </p>
                </div>
                <button>
                  <ChevronDown className="text-primaryDark cursor-pointer scale-110 hover:scale-95 transition-all duration-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Cabeçário */}
        <div className="px-8 py-6 flex justify-between items-center">
          <HeaderComponent
            title="Dashboard"
            subtitle="Visão geral do seu negócio"
          />

          {/* Data */}
          <div className="flex items-center gap-4">
            <p className="lg:text-sm text-quaternary/50 font-light">
              Hoje,{" "}
              {new Date().toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
            <Calendar className="text-md text-quaternary/50 size-5" />
          </div>
        </div>

        <div className="px-8">
          {dados.map((item, index) => (
            <CardsDashboard
              key={index}
              icon={item.icon}
              title={item.title}
              numer={item.number}
              obs={item.obs}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
