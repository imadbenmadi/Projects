import { createBrowserRouter } from "react-router-dom";

import Not_Finished from "./Components/Not_Finished";
import Not_Found from "./Components/Not_Found";

import Dashboard from "./Dashboard";
import Dashboard_Login from "./Dashboard_Login";
import Dashboard_home from "./Components/Home/Dashboard_home";

import Dashboard_Users from "./Components/Dashboard_Users/Dashboard_Users";
import Default_user from "./Components/Dashboard_Users/User/Default";
import Edit_user from "./Components/Dashboard_Users/User/Edit";
import Dashboard_Users_Notification from "./Components/Dashboard_Users/User/Notifications/Notifications";
import Current_Notifications from "./Components/Dashboard_Users/User/Notifications/Current_Notifications";
import Add_user from "./Components/Dashboard_Users/Add_user";
import User from "./Components/Dashboard_Users/User/User";
import Table from "./Components/Dashboard_Users/Table/Table";
// import User_Websites from "./Components/Dashboard_Users/User/WebSites/Websites";
// import User_Requests from "./Components/Dashboard_Users/User/Requests/Requests";
// import Dashboard_User_Courses from "./Components/Dashboard_Users/User/Courses/Courses";
// import Dashboard_User_Requests from "./Components/Dashboard_Users/User/Courses_Requests/Courses_Requests";

import Dashboard_Websites from "./Components/WebSites/Dashboard_Websites";
import Add_WebSite from "./Components/WebSites/Add_Website";
import Current_Websites from "./Components/WebSites/Current_Websites";
import Edit_WebSite from "./Components/WebSites/Edit_Website";

// import Dashboard_Requests from "./Components/Dashboard_Courses/Dashboard_Courses";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard />,
        children: [
            { index: true, element: <Dashboard_home /> },
            {
                path: "/Users",
                element: <Dashboard_Users />,
                children: [
                    { index: true, element: <Table /> },
                    {
                        path: "/Users/Add",
                        element: <Add_user />,
                    },
                    {
                        path: "/Users/:id",
                        element: <User />,
                        children: [
                            { index: true, element: <Default_user /> },
                            {
                                path: "/Users/:id/Edit",
                                element: <Edit_user />,
                            },
                            {
                                path: "/Users/:id/Notification",
                                element: <Dashboard_Users_Notification />,
                            },
                            {
                                path: "/Users/:id/Current_Notifications",
                                element: <Current_Notifications />,
                            },
                            {
                                path: "/Users/:id/Websites",
                                element: <Not_Finished />,
                            },
                            {
                                path: "/Users/:id/Requests",
                                element: <Not_Finished />,
                            },
                            // {
                            //     path: "/Users/:id/Websites",
                            //     element: <Dashboard_User_Courses />,
                            // },
                            // {
                            //     path: "/Users/:id/Courses_Requests",
                            //     element: <Dashboard_User_Requests />,
                            // },
                        ],
                    },
                ],
            },
            {
                path: "/Websites",
                element: <Dashboard_Websites />,
                children: [
                    { index: true, element: <Current_Websites /> },
                    { path: "/Websites/Add", element: <Add_WebSite /> },
                    {
                        path: "/Websites/:id/Edit",
                        element: <Edit_WebSite />,
                    },
                ],
            },
            {
                path: "/Requests",
                element: <Not_Finished />,
            },
            {
                path: "*",
                element: <Not_Found />,
            },
            // {
            //     path: "/Requests",
            //     element: <Dashboard_Requests />,
            // },
        ],
    },
    {
        path: "/Dashboard_Login",
        element: <Dashboard_Login />,
    },
    {
        path: "*",
        element: <Not_Found />,
    },
]);

export default routes;
