import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { NextUIProvider } from '@nextui-org/react';
import { darkTheme,ligthTheme } from "./themes/darktheme";
import "./index.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider theme={ligthTheme}>
      <App />
    </NextUIProvider>
  </React.StrictMode>
);

