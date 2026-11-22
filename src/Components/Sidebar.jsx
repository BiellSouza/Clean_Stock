import React, { useState } from "react";
import imgLogo from "../assets/imagens/Logo.png";
import { NavLink } from "react-router-dom";
import {
  Box,
  ChartPie,
  Home,
  Package2,
  PackageMinus,
  PackagePlus,
  Settings,
  ShoppingCart,
  Users,
  ChevronDown,
  Package,
  Sun,
  Moon,
} from "lucide-react";

function Sidebar() {
  const [sidebarOn, setSidebarOn] = useState(true);
  const [selected, setSelected] = useState("");
  const [menuAberto, setMenuAberto] = useState(null);
  const [color, setColor] = useState(false);

  const links = [
    {
      icon: <Home className="size-5" />,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: <Box className="size-5" />,
      label: "Produtos",
      path: "/produtos",
    },
    {
      icon: <Package2 className="size-5" />,
      label: "Estoque",
      path: "/estoque",
    },
    {
      icon: <ShoppingCart className="size-5" />,
      label: "Pedidos",
      path: "/pedidos",
    },
    {
      icon: <Users className="size-5" />,
      label: "Usuários",
      subitems: [
        { label: "Todos os usuários", path: "/usuarios" },
        { label: "Cargos e permissões", path: "/usuarios" },
      ],
    },
    {
      icon: <Settings className="size-5" />,
      label: "Configurações",
      path: "/configuracoes",
    },
  ];

  const toggleMenu = (menu) => {
    setMenuAberto((atual) => (atual === menu ? null : menu));
  };

  return (
    <aside className="fixed border- bg-quaternary border-white left-0 top-0 z-40 flex h-screen w-full max-w-54 flex-col justify-between shadow-xl transition-transform duration-300 ease-in-out">
      <div className="px-4 py-4 h-screen justify-between flex flex-col">
        <div>
          <header className="mb-8">
            <img
              className="max-w-38 w-full"
              src={imgLogo}
              alt="Logo Fictícia"
            />
          </header>
          <div className="flex flex-col gap-2 w-full">
            {links.map((item, index) => {
              const temSubmenu = item.subitems?.length > 0;
              const aberto = menuAberto === item.label;

              return (
                <div key={index} className="w-full">
                  {/* MENU PRINCIPAL */}
                  {!temSubmenu ? (
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `w-full flex gap-2 items-center justify-between py-2 px-2 rounded-md cursor-pointer transition-all duration-300 ${
                          isActive
                            ? "bg-primaryDark text-white"
                            : "hover:bg-primaryDark/20 text-white"
                        }`
                      }
                    >
                      <div className="flex gap-2 items-center">
                        {item.icon}
                        <p className="font-light text-sm truncate">
                          {item.label}
                        </p>
                      </div>
                    </NavLink>
                  ) : (
                    <button
                      type="button"
                      onClick={() => toggleMenu(item.label)}
                      className={`w-full flex gap-2 items-center justify-between py-2 px-2 rounded-md cursor-pointer transition-all duration-300 ${
                        aberto
                          ? "bg-primaryDark text-white"
                          : "hover:bg-primaryDark/20 text-white"
                      }`}
                    >
                      <div className="flex gap-2 items-center">
                        {item.icon}
                        <p className="font-light text-sm truncate">
                          {item.label}
                        </p>
                      </div>

                      <ChevronDown
                        size={18}
                        className={`transition-transform duration-300 ${
                          aberto ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}

                  {/* SUBMENUS */}
                  {temSubmenu && (
                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                        aberto ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden min-h-0">
                        <div className="ml-4 mt-2 pl-3 border-l border-white/20 flex flex-col gap-1">
                          {item.subitems.map((subitem) => (
                            <NavLink
                              key={subitem.path}
                              to={subitem.path}
                              className={({ isActive }) =>
                                `text-left text-xs py-2 px-3 rounded-md transition-all duration-300 ${
                                  isActive
                                    ? "bg-primaryDark text-white"
                                    : "text-white/60 hover:bg-primaryDark/20 hover:text-white"
                                }`
                              }
                            >
                              {subitem.label}
                            </NavLink>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setColor(false)}
            aria-pressed={!color}
            className={`flex cursor-pointer items-center justify-center gap-2 rounded-sm px-3 py-2.5 text-sm font-medium transition-all duration-300 ${
              !color
                ? "bg-primaryDark text-white shadow-md"
                : "text-white/50 hover:bg-white/5 hover:text-white/80 border"
            }`}
          >
            <Sun
              size={17}
              strokeWidth={1.8}
              className={`transition-transform duration-500 ${
                !color ? "rotate-0" : "-rotate-45"
              }`}
            />
            <span>Claro</span>
          </button>
          {/* Modo escuro */}
          <button
            type="button"
            onClick={() => setColor(true)}
            aria-pressed={color}
            className={`flex cursor-pointer items-center justify-center gap-2 rounded-sm px-3 py-2.5 text-sm font-medium transition-all duration-300 ${
              color
                ? "bg-primaryDark text-white shadow-md"
                : "text-white/50 hover:bg-white/5 hover:text-white/80 border"
            }`}
          >
            <Moon
              size={17}
              strokeWidth={1.8}
              className={`transition-transform duration-500 ${
                selected ? "rotate-0" : "-rotate-[25deg]"
              }`}
            />
            <span>Escuro</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
