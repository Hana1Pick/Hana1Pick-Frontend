import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css";
import './commonStyle.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Router } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
