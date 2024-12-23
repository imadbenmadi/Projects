import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import Router from "./Router";
import { RouterProvider } from "react-router";
import { AppProvider } from "./AppContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AppProvider>
            <RouterProvider router={Router} />
        </AppProvider>
    </React.StrictMode>
);
