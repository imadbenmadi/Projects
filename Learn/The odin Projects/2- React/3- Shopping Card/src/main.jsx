import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
    // Redirect,
} from "react-router-dom";
import Root from "./Routes/root";
import Home from "./Routes/home";
import Cart from "./Routes/cart";
import Shop from "./Routes/shop";
import ShopElement from "./Routes/ShopElement";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            { index: true, element: <Home /> },
            {
                path: "/cart",
                element: <Cart />,
            },
            {
                path: "/shop",
                element: <Shop />,
                
            },
            {
                path: "/home",
                element: <Home />,
            },
            {
                path: "/shop/:id",
                element: <ShopElement />,
            },
        ],
    },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
        
    </React.StrictMode>
);
