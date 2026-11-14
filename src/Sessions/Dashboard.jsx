import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ArrowUpRight,
  BellDot,
  Box,
  Calendar,
  ChevronDown,
  FileText,
  PackageOpen,
  Search,
} from "lucide-react";
import SidebarComponent from "../Components/Sidebar";
import imgAdm from "../assets/imagens/Biell.jpeg";
import HeaderComponent from "../Components/HeaderComponent";

function Dashboard() {
  const infosCards = [
    {
      icon: <FileText />,
      label: "Total de Pedidos",
      number: 125,
      obs: "Vs. período anterior",
      destaq: 12,
      porcent: true,
      arrow: false,
      color: "#E2CDA5",
      colorIcon: "#936A14",
    },
    {
      icon: <ArrowUp />,
      label: "Entrada de Produtos",
      number: 42,
      obs: "Vs. período anterior",
      destaq: 8,
      porcent: true,
      arrow: false,
      color: "#A1CFA3",
      colorIcon: "#276B3A",
    },
    {
      icon: <ArrowDown />,
      label: "Saída de Produtos",
      number: 82,
      obs: "Vs. período anterior",
      destaq: 15,
      porcent: false,
      arrow: true,
      color: "#E2CDA5",
      colorIcon: "#936A14",
    },
  ];

  const loja = 12540;
  const galpao = 25780;
  const estoque = loja + galpao;

  const infosEsoque = [
    {
      title: "Estoque da Loja",
      label: "Valor Total",
      icon: <PackageOpen className="size-8" />,
      valor: loja,
      porcent: 32,
      cor: "#9A814C",
    },
    {
      title: "Estoque do Galpão",
      label: "Valor Total",
      icon: <PackageOpen className="size-8" />,
      valor: galpao,
      porcent: 12,
      cor: "#7FA66D",
    },
    {
      title: "Estoque Total",
      label: "Soma Loja + Galpão",
      icon: <Box className="size-8" />,
      valor: estoque,
      porcent: 7,
      loja: loja,
      galpao: galpao,
    },
  ];

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
                className="size-8 rounded-full object-cover object-top"
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

        <section className="mt-6 flex gap-8 ">
          {infosCards.map((item, index) => (
            <div
              key={index}
              className="flex gap-6 max-w-90 w-full p-4 rounded-md"
              style={{
                backgroundColor: `${item.color}20`,
                border: `2px solid ${item.color}50`,
              }}
            >
              <div
                className={`w-fit p-2 rounded-full h-fit`}
                style={{ backgroundColor: item.color, color: item.colorIcon }}
              >
                {item.icon}
              </div>
              <div className="flex flex-col gap-2 w-full">
                <div className="text-xs">{item.label}</div>
                <div className="text-xl font-bold">{item.number}</div>
                <div className="text-xs">{item.obs}</div>
              </div>
              {item.porcent && (
                <div className="flex items-end w-full justify-end">
                  <p className="text-xs text-green-600">~+ {item.number}%</p>
                </div>
              )}
              {item.arrow && (
                <div className="flex items-end w-full justify-end">
                  <p className="text-xs text-green-600 flex items-center">
                    ~+ {item.destaq}
                    <ArrowUpRight className="size-4" />
                  </p>
                </div>
              )}
            </div>
          ))}
        </section>

        <section className="mt-4 flex gap-8">
          {infosEsoque.map((item, index) => {
            return (
              <div
                key={index}
                className="border border-gray-600/15 w-full max-w-90 p-4 rounded-xl"
              >
                <div className="flex items-center justify-between">
                  <p>{item.title}</p>
                  <span className="text-primaryDark">{item.icon}</span>
                </div>
                <div className="w-full opacity-5 my-2 border" />
                <div>
                  <p className="text-xs text-gray-400 mb-1">{item.label}</p>
                  <div className="flex justify-between items-end">
                    <h1 className="text-lg font-bold">
                      {item.valor.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </h1>
                    <p className="text-xs text-green-700">+{item.porcent}%</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mt-2">
                  {item.title === "Estoque Total" ? (
                    <div className="flex w-full h-full">
                      <div
                        className="h-full transition-all duration-500"
                        style={{
                          width: `${(item.loja / item.valor) * 100}%`,
                          backgroundColor: "#9A814C",
                        }}
                      />

                      <div
                        className="h-full transition-all duration-500"
                        style={{
                          width: `${(item.galpao / item.valor) * 100}%`,
                          backgroundColor: "#7FA66D",
                        }}
                      />
                    </div>
                  ) : (
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${item.porcent}%`,
                        backgroundColor: item.cor,
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
