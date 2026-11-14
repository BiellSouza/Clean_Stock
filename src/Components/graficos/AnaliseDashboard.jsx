import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { TrendingUp, BarChart3 } from "lucide-react";

function GraficoPedidos() {
  const dados = [
    { mes: "Jan", pedidos: 15 },
    { mes: "Fev", pedidos: 30 },
    { mes: "Mar", pedidos: 29 },
    { mes: "Abr", pedidos: 45 },
    { mes: "Mai", pedidos: 35 },
    { mes: "Jun", pedidos: 43 },
    { mes: "Jul", pedidos: 33 },
    { mes: "Ago", pedidos: 25 },
    { mes: "Set", pedidos: 33 },
    { mes: "Out", pedidos: 26 },
    { mes: "Nov", pedidos: 32 },
    { mes: "Dez", pedidos: 30 },
  ];

  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="bg-[#9A814C]/10 text-[#9A814C] p-2 rounded-lg">
            <TrendingUp size={19} />
          </div>

          <h2 className="text-sm font-semibold text-gray-800">
            Pedidos por Mês (Este Ano)
          </h2>
        </div>

        <div className="bg-[#9A814C]/10 text-[#9A814C] p-2 rounded-lg">
          <BarChart3 size={20} />
        </div>
      </div>

      {/* Gráfico */}
      <div className="w-full h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={dados}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            {/* Gradiente dourado */}
            <defs>
              <linearGradient id="corDourada" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#9A814C" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#9A814C" stopOpacity={0.02} />
              </linearGradient>
            </defs>

            {/* Linhas de fundo */}
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E5E7EB"
            />

            {/* Meses */}
            <XAxis
              dataKey="mes"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 11 }}
              tickMargin={12}
            />

            {/* Quantidade */}
            <YAxis
              domain={[0, 60]}
              ticks={[0, 15, 30, 45, 60]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 11 }}
            />

            {/* Tooltip */}
            <Tooltip
              cursor={{
                stroke: "#C5AD7D",
                strokeDasharray: "4 4",
              }}
              contentStyle={{
                borderRadius: "10px",
                border: "1px solid #E5E7EB",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                fontSize: "12px",
              }}
              formatter={(value) => [`${value} pedidos`, ""]}
            />

            {/* Linha e preenchimento */}
            <Area
              type="monotone"
              dataKey="pedidos"
              stroke="#9A814C"
              strokeWidth={2.5}
              fill="url(#corDourada)"
              activeDot={{
                r: 5,
                fill: "#9A814C",
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default GraficoPedidos;
