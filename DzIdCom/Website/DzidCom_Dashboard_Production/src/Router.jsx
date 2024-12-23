import { createBrowserRouter } from "react-router-dom";

import Home from "./Components/Home/Home.jsx";
import App from "./App";
import Default from "./Default";
import Login from "./Components/Auth/Login/Login";

import Users from "./Components/Users/Users";
import Projects_Requests from "./Components/Projects/Requests/Requests.jsx";

import Projects_Applications from "./Components/Projects/Applications/Applications.jsx";
import Projects_Applications_Listof_Freelancers from "./Components/Projects/Applications/List.jsx";
import Projects_Applications_Profile from "./Components/Projects/Applications/Profile.jsx";

import Projects_Paying from "./Components/Projects/Paying/Paying.jsx";
import Projects_Paying_item from "./Components/Projects/Paying/item.jsx";

import All_Projects from "./Components/Projects/All_Projects/All_Projects.jsx";
import All_Projects_item from "./Components/Projects/All_Projects/Item.jsx";

import Request_Project_Item from "./Components/Projects/Requests/Item.jsx";
import Feedbacks_Clients from "./Components/Feedbacks/Clients_Freedbacks/Clients_Freedbacks.jsx";
import Feedbacks_Freelancers from "./Components/Feedbacks/Freelancers_Feedbacks/Freelancers_Feedbacks.jsx";
import Home_Feedbacks from "./Components/Feedbacks/Home_Feedbacks/Home_Feedbacks.jsx";

import Terms from "./Components/Terms/Terms.jsx";

import Contact from "./Components/Contact/Contact.jsx";
import Not_Found from "./Components/Not_Found";
import Not_Finished from "./Components/Not_Finished";
import ErrorElement from "./Components/ErrorElement";
import Client_Profile from "./Components/Users/Client_Profile.jsx";
import Freelancer_Profile from "./Components/Users/Freelancer_Profile.jsx";
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
                path: "/Users/Clients/:userId",
                element: <Client_Profile />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Users/Freelancers/:userId",
                element: <Freelancer_Profile />,
                errorElement: <ErrorElement />,
            },

            {
                path: "/All_Projects",
                element: <All_Projects />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/All_Projects/:id",
                element: <All_Projects_item />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Projects_Requests",
                element: <Projects_Requests />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Projects_Requests/:id",
                element: <Request_Project_Item />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Projects_Applications",
                element: <Projects_Applications />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Projects_Applications/:projectId",
                element: <Projects_Applications_Listof_Freelancers />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Projects_Applications/:projectId/:freelancerId",
                element: <Projects_Applications_Profile />,
                errorElement: <ErrorElement />,
            },

            {
                path: "/Projects_Paying",
                element: <Projects_Paying />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Projects_Paying/:projectId",
                element: <Projects_Paying_item />,
                errorElement: <ErrorElement />,
            },

            {
                path: "/Home_Feedbacks",
                element: <Home_Feedbacks />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Feedbacks_Clients",
                element: <Feedbacks_Clients />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Feedbacks_Freelancers",
                element: <Feedbacks_Freelancers />,
                errorElement: <ErrorElement />,
            },

            {
                path: "/Terms",
                element: <Terms />,
                errorElement: <ErrorElement />,
            },
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
