import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App.jsx";
import { GameStatusProvider } from "./context/GameStatusContext.jsx";
import { AutoLoader } from './context/AutoLoader'

import "./styles/main.css";

createRoot(document.getElementById("root")).render(
  <GameStatusProvider>
    <AutoLoader />
    <App />
  </GameStatusProvider>
);
