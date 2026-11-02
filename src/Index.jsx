import React from "react";
import Register from "./Sessions/Register";
import Login from "./Sessions/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Sessions/Dashboard";
import "../src/index.css";
import Estoque from "./Sessions/Estoque";

function Index() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/estoque" element={<Estoque />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Index;
