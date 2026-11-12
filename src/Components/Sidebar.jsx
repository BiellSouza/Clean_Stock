// import {
//   Home,
//   ShelvingUnit,
//   Folders,
//   ClipboardList,
//   Gauge,
//   Link as LinkIcon,
//   Users,
//   Settings,
//   Sun,
//   Moon,
//   X,
//   Menu,
// } from "lucide-react";

// import { useState } from "react";
// import { NavLink } from "react-router-dom";

// function SidebarComponent() {
//   const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
//   const [selected, setSelected] = useState(false);

//   const links = [
//     {
//       icon: <Home size={20} />,
//       link: "/dashboard",
//       label: "Dashboard",
//     },
//     {
//       icon: <ShelvingUnit size={20} />,
//       link: "/estoque",
//       label: "Estoque",
//     },
//     {
//       icon: <Folders size={20} />,
//       link: "/orders",
//       label: "Pedidos",
//     },
//     {
//       icon: <ClipboardList size={20} />,
//       link: "/stores",
//       label: "Compras",
//     },
//     // {
//     //   icon: <Gauge size={20} />,
//     //   link: "/relatorios",
//     //   label: "Relatórios",
//     // },
//     // {
//     //   icon: <LinkIcon size={20} />,
//     //   link: "/planilha",
//     //   label: "Planilha",
//     // },
//     {
//       icon: <Users size={20} />,
//       link: "/users",
//       label: "Usuários",
//     },
//     // {
//     //   icon: <Settings size={20} />,
//     //   link: "/configuracoes",
//     //   label: "Configurações",
//     // },
//   ];

//   return (
//     <>
//       {/* Botão Menu quando a sidebar estiver fechada */}
//       {!sidebarOpen && (
//         <button
//           type="button"
//           onClick={() => setSidebarOpen(true)}
//           aria-label="Abrir menu lateral"
//           className="fixed right-4 top-4 z-50 rounded-xl border border-white/10 bg-primary p-3 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-white/40 lg:hidden"
//         >
//           <Menu size={22} />
//         </button>
//       )}

//       {/* Sidebar */}

//       <aside
//         className={`fixed left-0 top-0 z-40 flex h-screen w-[80%] max-w-64 flex-col justify-between border-r border-white/10 bg-quaternary p-4 shadow-xl transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
//       >
//         <div>
//           {/* Cabeçalho */}
//           <div className="mb-8 flex items-center justify-between gap-4">
//             <div className="flex h-14 w-full items-center justify-center rounded-xl bg-white/40"></div>

//             <button
//               type="button"
//               onClick={() => setSidebarOpen(false)}
//               aria-label="Fechar menu lateral"
//               className="rounded-lg p-2 text-white/70 transition-all duration-300 hover:scale-95 hover:bg-white/10 hover:text-white lg:hidden"
//             >
//               <X size={22} />
//             </button>
//           </div>

//           {/* Navegação */}
//           <nav className="space-y-2">
//             {links.map((item) => (
//               <NavLink
//                 key={item.label}
//                 to={item.link}
//                 end
//                 className={({ isActive }) =>
//                   `flex items-center gap-4 rounded-xl px-3 py-3 transition-all duration-200 ${
//                     isActive
//                       ? "bg-primaryDark font-medium text-white shadow-md shadow-black/10"
//                       : "text-white/70 hover:bg-white/10 hover:text-white"
//                   }`
//                 }
//               >
//                 {item.icon}
//                 <span className="text-sm xl:text-lg">{item.label}</span>
//               </NavLink>
//             ))}
//           </nav>
//         </div>
//         {/* Seletor de tema */}
//         <div className="mb-3 px-1">
//           <p className="mb-1.5 px-2 text-xs font-medium tracking-wider text-white/40">
//             Aparência
//           </p>

//           <div className="grid grid-cols-2 gap-1 rounded-xl bg-black/20 p-1">
//             {/* Modo claro */}
//             <button
//               type="button"
//               onClick={() => setSelected(false)}
//               aria-pressed={!selected}
//               className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-300 ${
//                 !selected
//                   ? "bg-primaryDark text-white shadow-md"
//                   : "text-white/50 hover:bg-white/5 hover:text-white/80"
//               }`}
//             >
//               <Sun
//                 size={17}
//                 strokeWidth={1.8}
//                 className={`transition-transform duration-500 ${
//                   !selected ? "rotate-0" : "-rotate-45"
//                 }`}
//               />
//               <span>Claro</span>
//             </button>

//             {/* Modo escuro */}
//             <button
//               type="button"
//               onClick={() => setSelected(true)}
//               aria-pressed={selected}
//               className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-300 ${
//                 selected
//                   ? "bg-primaryDark text-white shadow-md"
//                   : "text-white/50 hover:bg-white/5 hover:text-white/80"
//               }`}
//             >
//               <Moon
//                 size={17}
//                 strokeWidth={1.8}
//                 className={`transition-transform duration-500 ${
//                   selected ? "rotate-0" : "-rotate-[25deg]"
//                 }`}
//               />
//               <span>Escuro</span>
//             </button>
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// }

// export default SidebarComponent;

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
    },
    {
      icon: <Box className="size-5" />,
      label: "Produtos",
    },
    {
      icon: <Package2 className="size-5" />,
      label: "Estoque",
      subitems: [
        "Visão geral",
        "Estoque da loja",
        "Estoque do galpão",
        "Movimentações",
        "Histórico",
      ],
    },
    {
      icon: <ShoppingCart className="size-5" />,
      label: "Pedidos",
      subitems: [
        "Novo pedido",
        "Todos os pedidos",
        "Pedidos pendentes",
        "Histórico de pedidos",
      ],
    },
    {
      icon: <PackagePlus className="size-5" />,
      label: "Entrada de Produtos",
    },
    {
      icon: <PackageMinus className="size-5" />,
      label: "Saída de Produtos",
    },
    {
      icon: <ChartPie className="size-5" />,
      label: "Relatórios",
      subitems: [
        "Relatório de estoque",
        "Relatório de vendas",
        "Relatório de entradas",
      ],
    },
    {
      icon: <Users className="size-5" />,
      label: "Usuários",
      subitems: ["Todos os usuários", "Cargos e permissões"],
    },
    {
      icon: <Settings className="size-5" />,
      label: "Configurações",
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

              const ativo =
                selected === item.label || item.subitems?.includes(selected);

              return (
                <div key={index} className="w-full">
                  {/* MENU PRINCIPAL */}
                  <button
                    type="button"
                    onClick={() => {
                      if (temSubmenu) {
                        toggleMenu(item.label);
                      } else {
                        setSelected(item.label);
                      }
                    }}
                    className={`w-full flex gap-2 items-center justify-between py-2 px-2 rounded-md cursor-pointer transition-all duration-300 ${
                      ativo
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

                    {/* SETINHA */}
                    {temSubmenu && (
                      <ChevronDown
                        size={18}
                        className={`transition-transform duration-300 ${
                          aberto ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>

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
                            <button
                              key={subitem}
                              type="button"
                              onClick={() => setSelected(subitem)}
                              className={`text-left text-xs py-2 px-3 rounded-md transition-all duration-300 ${
                                selected === subitem
                                  ? "bg-primaryDark text-white"
                                  : "text-white/60 hover:bg-primaryDark/20 hover:text-white"
                              }`}
                            >
                              {subitem}
                            </button>
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
