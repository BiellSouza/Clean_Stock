import React from "react";
import Register from "./Sessions/Register";
import Login from "./Sessions/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Sessions/Dashboard";
import "../src/index.css";
import Stock from "./Sessions/Stock";
import Orders from "./Sessions/Orders";
import Stores from "./Sessions/Stores";
import Users from "./Sessions/Users";

function Index() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/estoque" element={<Stock />}></Route>
          <Route path="/orders" element={<Orders />}></Route>
          <Route path="/stores" element={<Stores />}></Route>
          <Route path="/users" element={<Users />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Index;
