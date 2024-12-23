import { createBrowserRouter } from "react-router-dom";

import Home from "./Components/Home/Home.jsx";
import App from "./App";
import Default from "./Default";
import Login from "./Components/Auth/Login/Login";

import Users from "./Components/Users/Users";

import Courses_Payment from "./Components/Payment/Courses_Payment.jsx";
import Courses_Payment_item from "./Components/Payment/Courses_Payment_item.jsx";
import Summaries_Payment from "./Components/Payment/Summaries_Payment.jsx";
import Summaries_Payment_item from "./Components/Payment/Summaries_Payment_item.jsx";

import Courses from "./Components/Courses/Courses.jsx";
import Course_Edit from "./Components/Courses/Edit.jsx";
import Courses_item from "./Components/Courses/Item.jsx";
import Courses_Vedio from "./Components/Courses/Vedio.jsx";
import Upload_Vedio from "./Components/Courses/Upload_Vedio.jsx";

import Summaries from "./Components/Summaries/Summaries.jsx";
import Summaries_item from "./Components/Summaries/Item.jsx";
import Summaries_item_edit from "./Components/Summaries/Edit.jsx";

import Accepted_Payments from "./Components/Payment/Accepted_Payments.jsx";
import Rejected_Payments from "./Components/Payment/Rejected_Payments.jsx";

import Contact from "./Components/Contact/Contact.jsx";
import Not_Found from "./Components/Not_Found";
import Not_Finished from "./Components/Not_Finished";
import ErrorElement from "./Components/ErrorElement";
import Teacher_Profile from "./Components/Users/Teacher_Profile.jsx";
import Student_Profile from "./Components/Users/Student_Profile.jsx";
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
                path: "/Users/Teachers/:userId",
                element: <Teacher_Profile />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Users/Students/:userId",
                element: <Student_Profile />,
                errorElement: <ErrorElement />,
            },

            {
                path: "/Courses",
                element: <Courses />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Courses/:id",
                element: <Courses_item />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Courses/:id/Edit",
                element: <Course_Edit />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Courses/:id/Add",
                element: <Upload_Vedio />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Courses/:id/Vedios/:vedioId",
                element: <Courses_Vedio />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Summaries",
                element: <Summaries />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Summaries/:id",
                element: <Summaries_item />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Summaries/:id/Edit",
                element: <Summaries_item_edit />,
                errorElement: <ErrorElement />,
            },

            {
                path: "/Courses_Payment",
                element: <Courses_Payment />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Courses_Payment/:courseId",
                element: <Courses_Payment_item />,
                errorElement: <ErrorElement />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Summaries_Payment",
                element: <Summaries_Payment />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Summaries_Payment/:courseId",
                element: <Summaries_Payment_item />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Accepted_Payments",
                element: <Accepted_Payments />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Rejected_Payments",
                element: <Rejected_Payments />,
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
