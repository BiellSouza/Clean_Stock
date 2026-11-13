import { BellDot, Calendar, ChevronDown, Search } from "lucide-react";
import SidebarComponent from "../Components/Sidebar";
import imgAdm from "../assets/imagens/Biell.jpeg";
import HeaderComponent from "../Components/HeaderComponent";

function Dashboard() {
  return (
    <div className="min-h-screen pb-8">
      <div className="">
        <SidebarComponent />
      </div>

      <div className="ml-54 py-4 px-8">
        <section className="flex items-center justify-between">
          {/* Input de pesquisa */}
          <div className="border border-black/20 hover:border hover:border-primaryDark rounded-md p-2 flex items-center gap-2 w-full max-w-[45%]">
            <span>
              <Search className="size-4" />
            </span>
            <input
              type="text"
              placeholder="Buscar produtos, pedidos ou usuários..."
              className="w-full outline-none"
            />
          </div>

          <div className="flex items-center gap-6">
            <div>
              <BellDot />
            </div>
            <span className="text-gray-600/50">|</span>
            <div className="flex items-center gap-2">
              <img
                src={imgAdm}
                alt="Imagem do usuário logado"
                className="size-10 rounded-full object-cover object-top"
              />
              <div>
                <h1 className="text-sm font-medium">GabrielSouza</h1>
                <p className="text-xs text-gray-700">Administrador</p>
              </div>
              <button>
                <ChevronDown className="text-gray-700/50" />
              </button>
            </div>
          </div>
        </section>

        <hr className="w-full opacity-20 mt-4 mb-2" />

        <section className="flex items-center justify-between">
          <HeaderComponent
            title="Dashboard"
            subtitle="Visão geral do seu estoque e movimentações"
          />

          <div className="border border-black/20 rounded-md px-2 py-1.5">
            <button className="flex items-center gap-2">
              <span>
                <Calendar className="size-4" />
              </span>
              <p>Últimos 30 dias</p>
              <span>
                <ChevronDown className="size-4" />
              </span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
