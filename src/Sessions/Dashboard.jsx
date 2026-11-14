import {
  ArrowDown,
  ArrowDownRight,
  ArrowUp,
  ArrowUpDown,
  ArrowUpRight,
  BellDot,
  Box,
  Calendar,
  Check,
  ChevronDown,
  FileText,
  PackageOpen,
  Search,
  TriangleAlert,
} from "lucide-react";
import SidebarComponent from "../Components/Sidebar";
import imgAdm from "../assets/imagens/Biell.jpeg";
import HeaderComponent from "../Components/HeaderComponent";
import GraficoPedidos from "../Components/graficos/AnaliseDashboard";

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

  const infosView = [
    {
      icon: <ArrowUpRight className="size-5" />,
      color: "#276B3A",
      title: "Últimas Entradas",
      paragraph: "Hoje, 10:20 - 15 unidades",
    },
    {
      icon: <ArrowDownRight className="size-5" />,
      color: "#E93F44",
      title: "Últimas Saídas",
      paragraph: "Hoje, 14:45 - 8 unidades",
    },
    {
      icon: <TriangleAlert className="size-5" />,
      color: "#E93F44",
      title: "Estoque crítico",
      paragraph: "3 produtos com estoque baixo",
    },
  ];

  const TableItens = [
    {
      img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRtdjgOHoR3krZhxLl0wakzN3p2YveI5bfYx59oCw3Vmp4iAoMXLnN50b6yCGVRVkyqTvOBfSP1y30Lev-3Kh6SWagHSI0GPfoR9mZAS5k-pcFNRUYU4fslGJGS6QOILKOMwVQgVHc&usqp=CAc",
      title: "Sabão líquido 5L",
      lojaProduct: 2,
      galpaoProduct: 100,
      status: "",
    },
    {
      img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQ7T8iRB5gjofJ7aio2mno3eJX1uUS9WRt5uO-x2rXPnvpO8prBHC8TQsdNwCsGY7hRa_RJBlU92JURW49SIs-ik5oJ52RfZPZx0U8_AkUZwFZ2RoBl0ohdS8aKJ4sBbNU0eOPhGqMEBA&usqp=CAc",
      title: "Água Sanitária 1L",
      lojaProduct: 5,
      galpaoProduct: 12,
      status: "",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpHqLDIj6NrrKjYWcqBRpj0H_sA-0cH4bgfTFdLm49RQ&s=10",
      title: "Desinfetante 2L",
      lojaProduct: 9,
      galpaoProduct: 22,
      status: "",
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

        <section className="mt-4 flex gap-8">
          {infosView.map((item, index) => (
            <div
              key={index}
              className="p-4 rounded-md max-w-90 w-full flex gap-2"
              style={{
                // backgroundColor: `${item.color}10`,
                border: `2px solid ${item.color}20`,
              }}
            >
              <div
                className={`h-fit p-2 rounded-full`}
                style={{
                  backgroundColor: `${item.color}40`,
                  color: item.color,
                }}
              >
                {item.icon}
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-sm">{item.title}</h1>
                <p className="text-xs text-gray-400">{item.paragraph}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="mt-10 border rounded-sm border-black/15 w-fit flex justify-between">
          <div>
            <div className="bg-[#171A1E] flex justify-between text-white max-w-4xl py-2 px-4 rounded-tl-sm rounded-tr-sm mb-2">
              <h1>Produtos com Estoque Baixo</h1>
              <div className="bg-primaryDark w-fit px-2 rounded-md">
                <p>3 registros</p>
              </div>
            </div>
            <div className="max-w-4xl px-4">
              <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] text-sm mb-2">
                <p className="font-medium">Produto</p>
                <p className="text-gray-700 text-center">Estoque Loja</p>
                <p className="text-gray-700 text-center">Estoque Galpão</p>
                <p className="text-gray-700 text-center">Total</p>
                <p className="text-gray-700 text-center">Status</p>
              </div>

              <hr className="opacity-10" />

              <div className="flex flex-col gap-2">
                {TableItens.map((item, index) => {
                  const soma = item.lojaProduct + item.galpaoProduct;
                  return (
                    <div
                      key={index}
                      className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] text-center border-b py-2 items-center pb-2 last:border-0 border-black/15"
                    >
                      <img
                        src={item.img}
                        alt=""
                        className="max-w-10 border border-black/10 rounded-md h-10 p-1 object-contain w-12"
                      />
                      <p>{item.lojaProduct}</p>
                      <p>{item.galpaoProduct}</p>
                      <p>{soma}</p>
                      <p>
                        {soma > 80 ? (
                          <p className="bg-green-700/5 m-auto flex items-center gap-2 text-green-900 w-fit py-1 px-2 rounded-lg text-xs">
                            <span>
                              <Check className="size-4" />
                            </span>
                            Positivo
                          </p>
                        ) : soma > 30 ? (
                          <p className="bg-orange-500/5 m-auto flex items-center gap-2 text-orange-900 w-fit py-1 px-2 rounded-lg text-xs">
                            <span>
                              <TriangleAlert className="size-4" />
                            </span>
                            Atenção
                          </p>
                        ) : (
                          <p className="bg-red-700/5 m-auto flex items-center gap-2 text-red-900 w-fit py-1 px-2 rounded-lg text-xs">
                            <span>
                              <Check className="size-4" />
                            </span>
                            Baixo
                          </p>
                        )}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* <div className="w-ful">
            <GraficoPedidos />
          </div> */}
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
