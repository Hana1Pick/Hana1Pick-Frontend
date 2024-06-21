import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import { DepositCreation1 } from "./pages";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="deposit" element={<DepositCreation1 />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
