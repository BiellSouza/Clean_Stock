import React from "react";
import Register from "./Sessions/Register";
import Login from "./Sessions/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Sessions/Dashboard";
import "../src/index.css";
import Orders from "./Sessions/Orders";
import Stores from "./Sessions/Stores";
import UsersInterface from "./Sessions/UsersInterface";
import Products from "./Sessions/Products";
import Entrada from "./Sessions/Entrada";
import Estoque from "./Sessions/Estoque";
import Settings from "./Sessions/Settings";

function Index() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/entrada" element={<Entrada />}></Route>
          <Route path="/orders" element={<Orders />}></Route>
          <Route path="/stores" element={<Stores />}></Route>
          <Route path="/users" element={<UsersInterface />}></Route>
          <Route path="/estoque" element={<Estoque />}></Route>
          <Route path="/settings" element={<Settings />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Index;
