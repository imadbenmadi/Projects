import { createBrowserRouter } from "react-router-dom";
import Home from "./Components/Home/Home";
import App from "./App";
import Default from "./Default";
import Login from "./Components/Auth/Login/Login";
import Register from "./Components/Auth/Register/Register";

import Freelancer from "./Components/Freelancer/Freelancer";
import Freelancer_Default from "./Components/Freelancer/Freelancer_Default";
import Freelancer_Profile from "./Components/Freelancer/Freelancer_Profile/Freelancer_Profile";
import Freelancer_Jobs from "./Components/Freelancer/Jobs/Freelancer_jobs";
import FreelancerJobItem from "./Components/Freelancer/Jobs/Job_Item";
import Freelancer_Process from "./Components/Freelancer/Freelancer_Process/Freelancer_Process";
import Freelancer_Process_item from "./Components/Freelancer/Freelancer_Process/Freelancer_Process_item";
import Freelancer_Complete_Profile from "./Components/Freelancer/Complete Profile/Freelancer_Complete_Profile";
import Freelancer_Complete_Profile_Default from "./Components/Freelancer/Complete Profile/Default";
import Freelancer_Complete_Profile_Step_0 from "./Components/Freelancer/Complete Profile/Step_0";
import Freelancer_Complete_Profile_Step_1 from "./Components/Freelancer/Complete Profile/Step_1";
import Freelancer_Complete_Profile_Step_2 from "./Components/Freelancer/Complete Profile/Step_2";
import Freelancer_Complete_Profile_Step_3 from "./Components/Freelancer/Complete Profile/Step_3";
import Freelancer_Complete_Profile_Step_4 from "./Components/Freelancer/Complete Profile/Step_4";

import Client from "./Components/Client/Client";
import Client_Default from "./Components/Client/Client_Default";
import Client_Profile from "./Components/Client/Client_Profile/Client_Profile";
import Client_Projects from "./Components/Client/Client_Projects/Client_Projects";
import Client_Complete_Profile from "./Components/Client/Complete Profile/Client_Complete_Profile";
import Client_Complete_Profile_Default from "./Components/Client/Complete Profile/Default";
import Client_Complete_Profile_Step_0 from "./Components/Client/Complete Profile/Step_0";
import Client_Complete_Profile_Step_1 from "./Components/Client/Complete Profile/Step_1";
import Client_Complete_Profile_Step_2 from "./Components/Client/Complete Profile/Step_2";
import Client_Complete_Profile_Step_3 from "./Components/Client/Complete Profile/Step_3";
import Client_Payment from "./Components/Client/Client_Projects/Payment";
// import Client_Process from "./Components/Client/Client_Process/Client_Process";
import Client_Add_Project from "./Components/Client/Client_Projects/Add_Project";
import Client_Project_item from "./Components/Client/Client_Projects/Project_item";

import Client_chatList from "./Components/Client/Chat/ChatList";
import Client_chatRoom from "./Components/Client/Chat/ChatRoom";
import Client_chatList_default from "./Components/Client/Chat/Default";

import Freelancer_chatList from "./Components/Freelancer/Chat/ChatList";
import Freelancer_chatRoom from "./Components/Freelancer/Chat/ChatRoom";
import Freelancer_chatList_default from "./Components/Freelancer/Chat/Default";
import Privacy from "./Components/Privacy/Privacy";
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
                path: "/Login",
                element: <Login />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Register",
                element: <Register />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Privacy",
                element: <Privacy />,
                errorElement: <ErrorElement />,
            },

            {
                path: "/Freelancer",
                element: <Freelancer />,
                errorElement: <ErrorElement />,
                children: [
                    { index: true, element: <Freelancer_Default /> },
                    {
                        path: "/Freelancer/Complete_Profile",
                        element: <Freelancer_Complete_Profile />,

                        children: [
                            {
                                index: true,
                                element: (
                                    <Freelancer_Complete_Profile_Default />
                                ),
                            },
                            {
                                path: "/Freelancer/Complete_Profile/Step_0",
                                element: <Freelancer_Complete_Profile_Step_0 />,
                            },
                            {
                                path: "/Freelancer/Complete_Profile/Step_1",
                                element: <Freelancer_Complete_Profile_Step_1 />,
                            },
                            {
                                path: "/Freelancer/Complete_Profile/Step_2",
                                element: <Freelancer_Complete_Profile_Step_2 />,
                            },
                            {
                                path: "/Freelancer/Complete_Profile/Step_3",
                                element: <Freelancer_Complete_Profile_Step_3 />,
                            },
                            {
                                path: "/Freelancer/Complete_Profile/Step_4",
                                element: <Freelancer_Complete_Profile_Step_4 />,
                            },
                        ],
                    },
                    {
                        path: "/Freelancer/Profile",
                        element: <Freelancer_Profile />,
                    },
                    {
                        path: "/Freelancer/Jobs",
                        element: <Freelancer_Jobs />,
                    },
                    {
                        path: "/Freelancer/Jobs/:jobId",
                        element: <FreelancerJobItem />,
                    },
                    {
                        path: "/Freelancer/Process",
                        element: <Freelancer_Process />,
                    },
                    {
                        path: "/Freelancer/Process/:projectId",
                        element: <Freelancer_Process_item />,
                    },
                    // {
                    //     path: "/Freelancer/Messages",
                    //     element: <Freelancer_Messages />,
                    // },
                    {
                        path: "/Freelancer/rooms",
                        element: <Freelancer_chatList />,
                        errorElement: <ErrorElement />,
                        children: [
                            {
                                index: true,
                                element: <Freelancer_chatList_default />,
                            },
                            {
                                path: "/Freelancer/rooms/:roomId",
                                element: <Freelancer_chatRoom />,
                                errorElement: <ErrorElement />,
                            },
                        ],
                    },
                    // {
                    //     path: "/Freelancer/rooms/:roomId",
                    //     element: <Freelancer_chatRoom />,
                    //     errorElement: <ErrorElement />,
                    // },
                    {
                        path: "*",
                        element: <Not_Found />,
                    },
                ],
            },
            {
                path: "/Client",
                element: <Client />,
                errorElement: <ErrorElement />,
                children: [
                    { index: true, element: <Client_Default /> },
                    {
                        path: "/Client/Complete_Profile",
                        element: <Client_Complete_Profile />,

                        children: [
                            {
                                index: true,
                                element: <Client_Complete_Profile_Default />,
                            },
                            {
                                path: "/Client/Complete_Profile/Step_0",
                                element: <Client_Complete_Profile_Step_0 />,
                            },
                            {
                                path: "/Client/Complete_Profile/Step_1",
                                element: <Client_Complete_Profile_Step_1 />,
                            },
                            {
                                path: "/Client/Complete_Profile/Step_2",
                                element: <Client_Complete_Profile_Step_2 />,
                            },
                            {
                                path: "/Client/Complete_Profile/Step_3",
                                element: <Client_Complete_Profile_Step_3 />,
                            },
                        ],
                    },
                    {
                        path: "/Client/Profile",
                        element: <Client_Profile />,
                    },
                    {
                        path: "/Client/Projects",
                        element: <Client_Projects />,
                    },
                    {
                        path: "/Client/Projects/Add",
                        element: <Client_Add_Project />,
                    },
                    {
                        path: "/Client/Projects/:projectId",
                        element: <Client_Project_item />,
                    },
                    {
                        path: "/Client/Projects/:projectId/Payment",
                        element: <Client_Payment />,
                    },
                    {
                        path: "/Client/rooms",
                        element: <Client_chatList />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Client/rooms",
                        element: <Client_chatList />,
                        errorElement: <ErrorElement />,
                        children: [
                            {
                                index: true,
                                element: <Client_chatList_default />,
                            },
                            {
                                path: "/Client/rooms/:roomId",
                                element: <Client_chatRoom />,
                                errorElement: <ErrorElement />,
                            },
                        ],
                    },
                    // {
                    //     path: "/Client/Process",
                    //     element: <Client_Process />,
                    // },
                    // {
                    //     path: "/Client/Messages",
                    //     element: <Client_Messages />,
                    // },
                    {
                        path: "*",
                        element: <Not_Found />,
                    },
                ],
            },
        ],
    },

    // {
    //     path: "/Profile",
    //     element: <Not_Finished />,
    // },

    {
        path: "*",
        element: <Not_Found />,
    },
]);

export default routes;
