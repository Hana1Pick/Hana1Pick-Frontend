import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import DepositCreation1 from "./pages/deposit/DepositCreation1";
import DepositCreation2 from "./pages/deposit/DepositCreation2";
import PatternPassword from "./pages/deposit/PatternPassword";
import UserAgree from "./pages/deposit/UserAgree";
import DepositComplete from "./pages/deposit/DepositComplete";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="deposit" element={<DepositCreation1 />} />
        <Route path="/deposit2" element={<DepositCreation2 />} />
        <Route path="/deposit3" element={<PatternPassword />} />
        <Route path="/deposit4" element={<UserAgree />} />
        <Route path="/deposit5" element={<DepositComplete />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
