import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import Router from "./Router";
import { RouterProvider } from "react-router";
import { AppProvider } from "./AppContext";
import { Suspense } from "react";
import Logo from "../public/Logo.png";
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AppProvider>
            <Suspense
                fallback={
                    <div className=" w-screen h-screen flex flex-col items-center justify-center">
                        <img src={Logo} alt="" className=" w-20 pb-6" />
                        <span className="loader"></span>
                    </div>
                }
            >
                <RouterProvider router={Router} />
            </Suspense>
        </AppProvider>
    </React.StrictMode>
);
