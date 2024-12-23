import { createBrowserRouter } from "react-router-dom";

import Home from "./Components/Home/Home.jsx";
import App from "./App";
import Default from "./Default";
import Login from "./Components/Auth/Login/Login";

import Users from "./Components/Users/Users";

import Institustions from "./Components/Institustions/Institustions.jsx";
import Institustions_item from "./Components/Institustions/Item.jsx";
import Institustions_events from "./Components/Institustions/Events.jsx";
import Institustions_Edit from "./Components/Institustions/Edit.jsx";
import New_institution from "./Components/Institustions/New_institution.jsx";

import Terms from "./Components/Terms/Terms.jsx";

import Contact from "./Components/Contact/Contact.jsx";
import Not_Found from "./Components/Not_Found";
import Not_Finished from "./Components/Not_Finished";
import ErrorElement from "./Components/ErrorElement";
const routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Default />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Home",
                element: <Home />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Users",
                element: <Users />,
                errorElement: <ErrorElement />,
            },

            {
                path: "/Institustions",
                element: <Institustions />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Institustions/:id",
                element: <Institustions_item />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Institustions/:id/Edit",
                element: <Institustions_Edit />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Institustions/:id/Events",
                element: <Institustions_events />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/New_institution",
                element: <New_institution />,
                errorElement: <ErrorElement />,
            },

            // {
            //     path: "/Terms",
            //     element: <Terms />,
            //     errorElement: <ErrorElement />,
            // },
            {
                path: "/Contact",
                element: <Contact />,
                errorElement: <ErrorElement />,
            },
        ],
    },
    {
        path: "/Login",
        element: <Login />,
        errorElement: <ErrorElement />,
    },

    {
        path: "*",
        element: <Not_Found />,
    },
]);

export default routes;
