import {
  X,
  CheckCheck,
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Bell,
  BellDot,
  Box,
  Calendar,
  Camera,
  Check,
  CheckCircle,
  ChevronDown,
  FileText,
  PackageOpen,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  TriangleAlert,
  UserPen,
  User,
  ShoppingCart,
  ArrowDownToLine,
  ArrowUpToLine,
  ArrowUpFromLine,
  Package,
} from "lucide-react";
import SidebarComponent from "../Components/Sidebar";
import imgAdm from "../assets/imagens/Biell.jpeg";
import HeaderComponent from "../Components/HeaderComponent";
import GraficoPedidos from "../Components/graficos/AnaliseDashboard";
import { useState } from "react";

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

  // Time
  const [listaAberta, setListaAberta] = useState(false);
  const [selecionado, setSelecionado] = useState("Últimos 30 dias");

  const options = [
    "Última semana",
    "Último mês",
    "Último ano",
    "Últimos 30 dias",
  ];

  // Menu profile
  const [profileListOpen, setProfileListOpen] = useState(false);

  const profileOptions = [
    {
      icon: <User />,
      label: "Ver Perfil",
    },
    {
      icon: <Camera />,
      label: "Editar Foto",
    },
    {
      icon: <UserPen />,
      label: "Editar Perfil",
    },
    {
      icon: <ShieldCheck />,
      label: "Segurança",
    },
    {
      icon: <Bell />,
      label: "Notificações",
    },
    {
      icon: <SlidersHorizontal />,
      label: "Preferências",
    },
  ];

  // Notificações
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      tipo: "alerta",
      titulo: "Estoque baixo",
      descricao:
        "O produto Água Sanitária 1L está com estoque abaixo do mínimo.",
      horario: "Há 5 minutos",
      lida: false,
    },
    {
      id: 2,
      tipo: "pedido",
      titulo: "Novo pedido realizado",
      descricao: "Um novo pedido foi registrado no sistema.",
      horario: "Há 20 minutos",
      lida: false,
    },
    {
      id: 3,
      tipo: "entrada",
      titulo: "Entrada de produtos",
      descricao: "Foram adicionadas 50 unidades ao estoque do galpão.",
      horario: "Há 1 hora",
      lida: false,
    },
    {
      id: 4,
      tipo: "saida",
      titulo: "Saída de produtos",
      descricao: "Um pedido foi separado e retirado do estoque.",
      horario: "Há 3 horas",
      lida: true,
    },
    {
      id: 5,
      tipo: "estoque",
      titulo: "Estoque atualizado",
      descricao: "A movimentação do estoque foi concluída com sucesso.",
      horario: "Ontem",
      lida: true,
    },
  ]);

  const naoLidas = notifications.filter((item) => !item.lida).length;

  const marcarTodasComoLidas = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, lida: true })));
  };

  return (
    <div className="min-h-screen pb-8">
      <div className="">
        <SidebarComponent />
      </div>

      <div className="flex w-full overflow-x-auto">
        <div className="ml-54 py-4 px-8 w-full">
          {/* Search */}
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
              <div className="relative">
                {/* Botão de notificações */}
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="relative p-2 rounded-lg hover:bg-gray-100 transition"
                >
                  <BellDot className="size-5 text-gray-600 hover:scale-95 duration-500 transition-all cursor-pointer" />

                  {naoLidas > 0 && (
                    <span className="absolute top-1 right-1 size-2 bg-red-500 rounded-full border-2 border-white" />
                  )}
                </button>

                {/* Caixa flutuante */}
                {notificationsOpen && (
                  <div className="absolute right-0 top-full mt-3 w-[380px] max-w-[calc(100vw-24px)] bg-white border border-black/10 rounded-xl shadow-2xl z-[100] overflow-hidden">
                    {/* Cabeçalho */}
                    <div className="p-4 border-b border-black/10">
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="font-semibold text-gray-800">
                            Notificações
                          </h2>
                          <p className="text-xs text-gray-400 mt-1">
                            Você tem {naoLidas} notificações não lidas
                          </p>
                        </div>

                        <button
                          onClick={() => setNotificationsOpen(false)}
                          className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500"
                        >
                          <X size={18} />
                        </button>
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        <p className="text-xs text-gray-500 font-medium">
                          Todas as atividades
                        </p>

                        <button
                          onClick={marcarTodasComoLidas}
                          disabled={naoLidas === 0}
                          className="text-xs text-[#9A814C] flex items-center gap-1 hover:underline disabled:opacity-40 cursor-pointer"
                        >
                          <CheckCheck size={14} />
                          Marcar todas como lidas
                        </button>
                      </div>
                    </div>

                    {/* Lista de notificações */}
                    <div className="max-h-[380px] overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((item) => {
                          const estilos = {
                            alerta: {
                              icon: <TriangleAlert size={19} />,
                              cor: "#D97706",
                              fundo: "#D9770615",
                            },
                            pedido: {
                              icon: <ShoppingCart size={19} />,
                              cor: "#9A814C",
                              fundo: "#9A814C18",
                            },
                            entrada: {
                              icon: <ArrowDownToLine size={19} />,
                              cor: "#7FA66D",
                              fundo: "#7FA66D20",
                            },
                            saida: {
                              icon: <ArrowUpFromLine size={19} />,
                              cor: "#DC6464",
                              fundo: "#DC646415",
                            },
                            estoque: {
                              icon: <Package size={19} />,
                              cor: "#9A814C",
                              fundo: "#9A814C18",
                            },
                          };

                          const estilo = estilos[item.tipo];

                          return (
                            <div
                              key={item.id}
                              onClick={() => {
                                setNotifications((prev) =>
                                  prev.map((n) =>
                                    n.id === item.id ? { ...n, lida: true } : n,
                                  ),
                                );
                              }}
                              className={`flex gap-3 px-4 py-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition ${
                                !item.lida ? "bg-[#9A814C]/[0.035]" : ""
                              }`}
                            >
                              <div
                                className="size-10 shrink-0 rounded-full flex items-center justify-center"
                                style={{
                                  color: estilo.cor,
                                  backgroundColor: estilo.fundo,
                                }}
                              >
                                {estilo.icon}
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2">
                                  <h3 className="text-sm font-semibold text-gray-800">
                                    {item.titulo}
                                  </h3>

                                  {!item.lida && (
                                    <span className="size-2 rounded-full bg-[#9A814C] shrink-0" />
                                  )}
                                </div>

                                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                                  {item.descricao}
                                </p>

                                <span className="text-[11px] text-gray-400 mt-2 block">
                                  {item.horario}
                                </span>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="py-12 text-center">
                          <BellDot className="size-8 text-gray-300 mx-auto mb-2" />
                          <p className="text-sm text-gray-600 font-medium">
                            Nenhuma notificação
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            Suas atualizações aparecerão aqui.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Rodapé */}
                    <div className="p-3 bg-gray-50 border-t border-gray-100">
                      <button
                        onClick={() => setNotificationsOpen(false)}
                        className="w-full text-xs font-medium text-[#9A814C] hover:text-[#7B653C]"
                      >
                        Fechar notificações
                      </button>
                    </div>
                  </div>
                )}
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
                <button onClick={() => setProfileListOpen(!profileListOpen)}>
                  <ChevronDown
                    className={`text-gray-700/50 cursor-pointer duration-500 transition-all ${profileListOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {profileListOpen && (
                  <div className="absolute right-8 top-16 z-50 bg-white border border-black/20 border-t-0 rounded-bl-md rounded-br-md p-4 flex flex-col gap-4">
                    {profileOptions.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center text-sm text-gray-600 border-b border-black/20 last:border-0 last:pb-0 pb-4 gap-8"
                      >
                        <span>{item.icon}</span>
                        <p>{item.label}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>

          <hr className="w-full opacity-20 mt-4 mb-2" />

          <section className="flex items-center justify-between mt-4">
            <HeaderComponent
              title="Dashboard"
              subtitle="Visão geral do seu estoque e movimentações"
            />

            <div
              className={`border border-black/20 rounded-md px-2 py-1.5 cursor-pointer ${listaAberta ? "" : "hover:scale-95 duration-500 transition-all"}`}
            >
              <button
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setListaAberta(!listaAberta)}
              >
                <span>
                  <Calendar className="size-4" />
                </span>
                <p>{selecionado}</p>
                <span>
                  <ChevronDown
                    className={`size-4 transition-transform ${listaAberta ? "rotate-180" : ""}`}
                  />
                </span>
              </button>

              {/* Lista */}
              {listaAberta && (
                <div className="absolute top-auto right-4 mt-3 bg-white border border-black/10 shadow-lg rounded-lg p-1 w-48 z-50">
                  {options.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelecionado(item);
                        setListaAberta(false);
                      }}
                      className={`w-full flex items-center justify-between text-left px-3 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors ${
                        selecionado === item
                          ? "bg-[#9A814C]/10 text-[#9A814C] font-medium"
                          : "text-gray-700"
                      }`}
                    >
                      {item}

                      {selecionado === item && (
                        <CheckCircle className="size-4" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </section>

          <div className="flex justify-between gap-4">
            <div className="w-full">
              <section className="mt-6 flex gap-8 ">
                {infosCards.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-6 max-w-full w-full p-4 rounded-md"
                    style={{
                      backgroundColor: `${item.color}20`,
                      border: `2px solid ${item.color}50`,
                    }}
                  >
                    <div
                      className={`w-fit p-2 rounded-full h-fit`}
                      style={{
                        backgroundColor: item.color,
                        color: item.colorIcon,
                      }}
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
                        <p className="text-xs text-green-600">
                          ~+ {item.number}%
                        </p>
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
                      className="border border-gray-600/15 w-full max-w-full p-4 rounded-xl"
                    >
                      <div className="flex items-center justify-between">
                        <p>{item.title}</p>
                        <span className="text-primaryDark">{item.icon}</span>
                      </div>
                      <div className="w-full opacity-5 my-2 border" />
                      <div>
                        <p className="text-xs text-gray-400 mb-1">
                          {item.label}
                        </p>
                        <div className="flex justify-between items-end">
                          <h1 className="text-lg font-bold">
                            {item.valor.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </h1>
                          <p className="text-xs text-green-700">
                            +{item.porcent}%
                          </p>
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
                    className="p-4 rounded-md max-w-full w-full flex gap-2"
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
              <section className="mt-10 gap-4 w-full max-w-full flex justify-between">
                {/* Tabela */}
                <div className="border-black/15 border rounded-sm w-full overflow-hidden">
                  <div className="bg-[#171A1E] flex justify-between text-white py-2 px-4 rounded-tl-sm rounded-tr-sm">
                    <h1>Produtos com Estoque Baixo</h1>

                    <div className="bg-primaryDark w-fit px-2 rounded-md">
                      <p>3 registros</p>
                    </div>
                  </div>

                  {/* Área com scroll horizontal */}
                  <div className="overflow-x-auto w-full mt-3">
                    <div className="min-w-[650px] px-4">
                      {/* Cabeçalho */}
                      <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] text-sm mb-2 py-2">
                        <p className="font-medium">Produto</p>
                        <p className="text-gray-700 text-center">
                          Estoque Loja
                        </p>
                        <p className="text-gray-700 text-center">
                          Estoque Galpão
                        </p>
                        <p className="text-gray-700 text-center">Total</p>
                        <p className="text-gray-700 text-center">Status</p>
                      </div>

                      <hr className="opacity-10" />

                      {/* Produtos */}
                      <div className="flex flex-col">
                        {TableItens.map((item, index) => {
                          const soma = item.lojaProduct + item.galpaoProduct;

                          return (
                            <div
                              key={index}
                              className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] items-center text-center border-b py-2 border-black/15 last:border-0"
                            >
                              <div className="flex items-center gap-2">
                                <img
                                  src={item.img}
                                  alt={item.title}
                                  className="size-10 border border-black/10 rounded-md p-1 object-contain"
                                />
                                <p className="text-sm text-left">
                                  {item.title}
                                </p>
                              </div>

                              <p>{item.lojaProduct}</p>
                              <p>{item.galpaoProduct}</p>
                              <p>{soma}</p>

                              <div>
                                {soma > 80 ? (
                                  <span className="bg-green-700/5 mx-auto flex items-center gap-2 text-green-900 w-fit py-1 px-2 rounded-lg text-xs">
                                    <Check className="size-4" />
                                    Positivo
                                  </span>
                                ) : soma > 30 ? (
                                  <span className="bg-orange-500/5 mx-auto flex items-center gap-2 text-orange-900 w-fit py-1 px-2 rounded-lg text-xs">
                                    <TriangleAlert className="size-4" />
                                    Atenção
                                  </span>
                                ) : (
                                  <span className="bg-red-700/5 mx-auto flex items-center gap-2 text-red-900 w-fit py-1 px-2 rounded-lg text-xs">
                                    <TriangleAlert className="size-4" />
                                    Baixo
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="w-full flex justify-end mt-2">
                        <button className="flex items-center gap-2 text-xs text-primaryDark cursor-pointer hover:text-primary transition-all duration-500 p-2">
                          Ver todos
                          <ArrowRight className="size-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <GraficoPedidos />
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
