import React from "react";

function HeaderComponent({ title, subtitle }) {
  return (
    <div>
      <h1 className="text-3xl font-medium text-terciary">{title}</h1>
      <p className="text-md text-terciary/80 font-light">{subtitle} </p>
    </div>
  );
}

export default HeaderComponent;
