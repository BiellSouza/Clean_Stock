import React, { useState } from "react";
import {
  X,
  CheckCheck,
  BellDot,
  ChevronDown,
  Search,
  TriangleAlert,
  ShoppingCart,
  ArrowDownToLine,
  ArrowUpFromLine,
  Package,
  User,
  Camera,
  UserPen,
  ShieldCheck,
  Bell,
  SlidersHorizontal,
} from "lucide-react";
import imgAdm from "../assets/imagens/Biell.jpeg";

function SearchComponent() {
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
    <div className="">
      {" "}
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
              <BellDot className="size-6 text-gray-600 hover:scale-95 duration-500 transition-all cursor-pointer" />

              {naoLidas > 0 && (
                <span className="absolute top-2 right-2 size-3 bg-red-500 rounded-full border-2 border-white" />
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
              <h1 className="text-sm font-medium">Usuário</h1>
              <p className="text-xs text-gray-700">Usuário Teste</p>
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
    </div>
  );
}

export default SearchComponent;
