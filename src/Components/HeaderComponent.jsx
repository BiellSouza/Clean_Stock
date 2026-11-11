import React from "react";

function HeaderComponent({ title, subtitle }) {
  return (
    <div>
      <h1 className="text-3xl font-medium text-white">{title}</h1>
      <p className="text-md text-white/50 font-light">{subtitle} </p>
    </div>
  );
}

export default HeaderComponent;
