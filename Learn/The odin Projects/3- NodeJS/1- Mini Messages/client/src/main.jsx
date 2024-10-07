import React from "react";
import ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
    // Redirect,
} from "react-router-dom";
import App from "./App.jsx";
import Messages from "./components/messages.jsx";
import AddMessage from "./components/addMessage.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <Messages /> },
            {
                path: "/messages",
                element: <Messages />,
            },
            {
                path: "/addMessage",
                element: <AddMessage />,
            },
        ],
    },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
