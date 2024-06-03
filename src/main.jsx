import "./index.css";
import React from "react";
import routes from "./Routes";
import ReactDOM from "react-dom/client";

import { GlobalProvider } from "./contexts/GlobalContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalProvider>
      <RouterProvider router={router} />
    </GlobalProvider>
  </React.StrictMode>
);
