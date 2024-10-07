import "./index.css";

import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import Router from "./Router";
import { store } from "./Redux/Store";

import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <NextUIProvider>
      <RouterProvider router={Router} />
    </NextUIProvider>
  </Provider>
);
