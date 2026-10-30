import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
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
import CardsDashboard from "./cards/CardsDashboard";
import SidebarComponent from "../Components/Sidebar";
import HeaderComponent from "../Components/HeaderComponent";

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
      number: 12,
      obs: "3",
    },
    {
      icon: <Wallet />,
      title: "Valor Total (Hoje)",
      number: 3.4829,
      obs: "12",
    },
  ];

  const salesData = [
    { date: "19/10", sales: 2000 },
    { date: "20/10", sales: 3200 },
    { date: "21/10", sales: 2100 },
    { date: "22/10", sales: 2700 },
    { date: "23/10", sales: 4200 },
    { date: "24/10", sales: 3400 },
    { date: "24/10", sales: 3100 },
    { date: "25/10", sales: 3800 },
  ];

  const formatCurrency = (value) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    }).format(value);

  const itensTable = [
    {
      img: "https://edge.osuper.com.br/0O81JYiLWG-i-a0IOLwkjW8jy14=/1600x0/smart/https://produtos-osuper.s3.sa-east-1.amazonaws.com/6796.jpg",
      name: "Detergente 500ml",
      galpao: "5",
      loja: "10",
    },
    {
      img: "https://cdn.awsli.com.br/2500x2500/1775/1775051/produto/134342383/7898915457018-k22oljpvvy.png",
      name: "Água Sanitária 1L",
      galpao: "8",
      loja: "15",
    },
    {
      img: "https://bistek.vtexassets.com/arquivos/ids/216280-800-800?v=639124623738770000&width=800&height=800&aspect=true",
      name: "Desinfetante",
      galpao: "12",
      loja: "20",
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
        {/* Dados */}
        <div className="px-8 grid grid-cols-2 w-full gap-4">
          {dados.map((item, index) => (
            <CardsDashboard
              key={index}
              icon={item.icon}
              title={item.title}
              number={item.number}
              obs={item.obs}
            />
          ))}
          <div className="flex gap-6 items-start bg-white border border-primary/20 w-full min-w-full max-w-68 p-6 rounded-xl h-fit">
            <div className="p-3 bg-red-500 text-white w-fit rounded-xl">
              <ShelvingUnit />
            </div>
            <div>
              <h1 className="text-quaternary/70">Estoque Abaixo do Mínimo</h1>
              <p className="font-bold text-2xl mt-1">7</p>

              <p className="mt-2 text-red-600">Ver lista</p>
            </div>
          </div>
        </div>

        {/* Gráfico */}
        <div className="px-8 mt-4">
          <section className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-5 text-base font-semibold text-slate-800">
              Vendas dos últimos 7 dias
            </h2>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={salesData}
                  margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="salesGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#2563eb"
                        stopOpacity={0.28}
                      />
                      <stop
                        offset="95%"
                        stopColor="#2563eb"
                        stopOpacity={0.02}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    stroke="#e8eef7"
                    strokeDasharray="3 3"
                    vertical
                  />

                  <XAxis
                    dataKey="date"
                    tick={{ fill: "#64748b", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis
                    domain={[0, 6000]}
                    ticks={[0, 2000, 4000, 6000]}
                    tickFormatter={(value) =>
                      value === 0
                        ? "R$ 0"
                        : `R$ ${(value / 1000).toLocaleString("pt-BR")} mil`
                    }
                    tick={{ fill: "#64748b", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    width={65}
                  />

                  <Tooltip
                    formatter={(value) => [
                      formatCurrency(Number(value)),
                      "Vendas",
                    ]}
                    labelFormatter={(label) => `Data: ${label}`}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                      boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                    }}
                  />

                  <Area
                    type="monotone"
                    dataKey="sales"
                    stroke="#2563eb"
                    strokeWidth={2.5}
                    fill="url(#salesGradient)"
                    dot={{
                      r: 3,
                      fill: "#2563eb",
                      strokeWidth: 0,
                    }}
                    activeDot={{
                      r: 6,
                      fill: "#2563eb",
                      stroke: "#ffffff",
                      strokeWidth: 2,
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>

        <div className="mt-4 w-ful mx-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-slate-800">
              Produtos do estoque
            </h2>

            <button className="text-xs font-medium text-primary hover:underline">
              Ver todos
            </button>
          </div>

          {/* Lista de produtos */}
          <div className="space-y-2 xl:grid xl:grid-cols-2">
            {itensTable.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 p-2 transition-all duration-200 hover:border-primary/30 hover:bg-slate-50"
                >
                  {/* Imagem e informações */}
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-primary/10 bg-slate-50">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="h-full w-full object-contain"
                      />
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold text-slate-700">
                        {item.name}
                      </h3>

                      <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                        <span>
                          Galpão:{" "}
                          <strong className="text-slate-500">
                            {item.galpao}
                          </strong>
                        </span>

                        <span className="text-slate-300">|</span>

                        <span>
                          Loja:{" "}
                          <strong className="text-slate-500">
                            {item.loja}
                          </strong>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Indicador de estoque */}
                  <div
                    className={`flex h-8 min-w-8 shrink-0 items-center justify-center rounded-full px-2 text-xs font-bold text-black/50 border`}
                  >
                    {Number(item.galpao) + Number(item.loja)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
