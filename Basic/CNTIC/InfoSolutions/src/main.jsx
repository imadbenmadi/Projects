import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import "./Font/Font.css";
import Router from "./Router";
import { RouterProvider } from "react-router-dom";
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={Router} />
    </React.StrictMode>
);
