import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Router } from "react-router-dom";
import 'react-datepicker/dist/react-datepicker.css';

const kakaoKey = process.env.REACT_APP_KAKAO_KEY_SY;
console.log(kakaoKey);
window.Kakao.init(kakaoKey);
window.Kakao.isInitialized();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
