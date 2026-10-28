import {
  Home,
  ShelvingUnit,
  Folders,
  ClipboardList,
  Gauge,
  Link as LinkIcon,
  Users,
  Settings,
  Sun,
  Moon,
  X,
  Menu,
} from "lucide-react";

import { useState } from "react";
import { NavLink } from "react-router-dom";

function SidebarComponent() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selected, setSelected] = useState(false);

  const links = [
    {
      icon: <Home size={20} />,
      link: "/",
      label: "Dashboard",
    },
    {
      icon: <ShelvingUnit size={20} />,
      link: "/estoque",
      label: "Estoque",
    },
    {
      icon: <Folders size={20} />,
      link: "/pedidos",
      label: "Pedidos",
    },
    {
      icon: <ClipboardList size={20} />,
      link: "/compras",
      label: "Compras",
    },
    {
      icon: <Gauge size={20} />,
      link: "/relatorios",
      label: "Relatórios",
    },
    {
      icon: <LinkIcon size={20} />,
      link: "/planilha",
      label: "Planilha",
    },
    {
      icon: <Users size={20} />,
      link: "/usuarios",
      label: "Usuários",
    },
    {
      icon: <Settings size={20} />,
      link: "/configuracoes",
      label: "Configurações",
    },
  ];

  return (
    <>
      {/* Botão Menu quando a sidebar estiver fechada */}
      {!sidebarOpen && (
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          aria-label="Abrir menu lateral"
          className="fixed left-4 top-4 z-50 rounded-xl border border-white/10 bg-blue-950 p-3 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blue-900"
        >
          <Menu size={22} />
        </button>
      )}

      {/* Sidebar */}
      {sidebarOpen && (
        <aside className="fixed left-0 top-0 z-40 flex h-screen w-[80%] max-w-64 flex-col justify-between border-r border-white/10 bg-blue-950 p-4 shadow-xl">
          <div>
            {/* Cabeçalho */}
            <div className="mb-8 flex items-center justify-between gap-4">
              <div className="flex h-14 w-full items-center justify-center rounded-xl bg-blue-800">
                <span className="text-lg font-bold tracking-wide text-white">
                  Estoque
                </span>
              </div>

              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                aria-label="Fechar menu lateral"
                className="rounded-lg p-2 text-white/70 transition-all duration-300 hover:scale-95 hover:bg-white/10 hover:text-white"
              >
                <X size={22} />
              </button>
            </div>

            {/* Navegação */}
            <nav className="space-y-2">
              {links.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.link}
                  end
                  className={({ isActive }) =>
                    `flex items-center gap-4 rounded-xl px-3 py-3 transition-all duration-200 ${
                      isActive
                        ? "bg-blue-700 font-medium text-white shadow-md shadow-black/10"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    }`
                  }
                >
                  {item.icon}
                  <span className="text-sm">{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Seletor de tema */}
          <div className="mb-3 px-1">
            <p className="mb-3 px-2 text-xs font-medium uppercase tracking-wider text-white/40">
              Aparência
            </p>

            <div className="grid grid-cols-2 gap-1 rounded-xl border border-white/10 bg-black/20 p-1">
              {/* Modo claro */}
              <button
                type="button"
                onClick={() => setSelected(false)}
                aria-pressed={!selected}
                className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-300 ${
                  !selected
                    ? "bg-blue-800 text-white shadow-md"
                    : "text-white/50 hover:bg-white/5 hover:text-white/80"
                }`}
              >
                <Sun
                  size={17}
                  strokeWidth={1.8}
                  className={`transition-transform duration-500 ${
                    !selected ? "rotate-0" : "-rotate-45"
                  }`}
                />
                <span>Claro</span>
              </button>

              {/* Modo escuro */}
              <button
                type="button"
                onClick={() => setSelected(true)}
                aria-pressed={selected}
                className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-300 ${
                  selected
                    ? "bg-blue-800 text-white shadow-md"
                    : "text-white/50 hover:bg-white/5 hover:text-white/80"
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
      )}
    </>
  );
}

export default SidebarComponent;
