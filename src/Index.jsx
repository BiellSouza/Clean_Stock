import React from "react";
import Register from "./Sessions/Register";
import Login from "./Sessions/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function Index() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/Register" element={<Register />}></Route>
          <Route path="/Login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Index;
