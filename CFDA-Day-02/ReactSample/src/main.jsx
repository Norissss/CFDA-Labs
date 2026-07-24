import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";
import "./assets/css/App.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error(
    'Elemen dengan id="root" tidak ditemukan di index.html'
  );
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>    
  </StrictMode>
);