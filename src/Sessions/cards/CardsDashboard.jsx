import { Box } from "lucide-react";
import React from "react";

function CardsDashboard({
  icon,
  title,
  numer,
  obs,
  porcent = false,
  list = false,
}) {
  return (
    <div className="flex gap-6 items-start bg-white border border-primary/20 w-full max-w-68 p-6 rounded-xl">
      <div className="p-3 bg-primary text-white w-fit rounded-xl">{icon}</div>
      <div>
        <h1 className="text-quaternary/70">{title}</h1>
        <p className="font-bold text-2xl mt-1">248</p>
        {porcent ? (
          <p className="mt-2 text-green-600">+ {numer} %</p>
        ) : list ? (
          <p className="mt-2 text-green-600">Lista</p>
        ) : (
          <p className="mt-2 text-green-600">+ {numer} novos</p>
        )}
      </div>
    </div>
  );
}

export default CardsDashboard;
