import { Box } from "lucide-react";
import React from "react";

function CardsDashboard({
  icon,
  title,
  number,
  obs,
  porcent = false,
  list = false,
}) {
  return (
    <div className="flex gap-6 items-start bg-white border border-primary/20 w-full min-w-full max-w-68 p-6 rounded-xl h-fit">
      <div className="p-3 bg-primary text-white w-fit rounded-xl">{icon}</div>
      <div>
        <h1 className="text-quaternary/70">{title}</h1>
        <p className="font-bold text-2xl mt-1">{number}</p>
        {porcent ? (
          <p className="mt-2 text-green-600">+ {obs} %</p>
        ) : list ? (
          <p className="mt-2 text-green-600">Lista</p>
        ) : (
          <p className="mt-2 text-green-600">+ {obs} novos</p>
        )}
      </div>
    </div>
  );
}

export default CardsDashboard;
