import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App.js";
import Modal from "react-modal";


Modal.setAppElement("#root");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);