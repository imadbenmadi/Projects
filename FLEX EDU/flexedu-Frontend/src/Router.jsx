import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

// const App = lazy(() => import("./App"));
// const Default = lazy(() => import("./Default"));
const Login = lazy(() => import("./Auth/Login/Login"));
const Register = lazy(() => import("./Auth/Register/Register"));
import App from "./App";
import Default from "./Default";
import Teacher from "./components/Teacher/Teacher";
import Teacher_Default from "./components/Teacher/Teacher_Default";
// const Teacher = lazy(() => import("./components/Teacher/Teacher"));
// const Teacher_Default = lazy(() =>
//     import("./components/Teacher/Teacher_Default")
// );
const Teacher_Profile = lazy(() =>
    import("./components/Teacher/Teacher_Profile/Teacher_Profile")
);
const Teacher_Courses = lazy(() =>
    import("./components/Teacher/Teacher_Courses/Teacher_Courses")
);
const Teacher_Add_Course = lazy(() =>
    import("./components/Teacher/Teacher_Courses/Add_Course")
);
const Teacher_Course = lazy(() =>
    import("./components/Teacher/Teacher_Courses/Course")
);
const Teacher_Edit_Profile = lazy(() =>
    import("./components/Teacher/Teacher_Edit_Profile/Teacher_Edit_Profile")
);
const Teacher_Edit_Course = lazy(() =>
    import("./components/Teacher/Teacher_Courses/Edit_Course")
);
const Teacher_Course_Vedio = lazy(() =>
    import("./components/Teacher/Teacher_Courses/Vedio")
);
const Teacher_Upload_Vedio = lazy(() =>
    import("./components/Teacher/Teacher_Courses/Upload_Vedio")
);
const Teacher_Payments = lazy(() =>
    import("./components/Teacher/Teacher_Payments/Teacher_Payments")
);
const Teacher_Summaries = lazy(() =>
    import("./components/Teacher/Teacher_Summaries/Teacher_Summaries")
);
const Teacher_Add_Summary = lazy(() =>
    import("./components/Teacher/Teacher_Summaries/Add_Summary")
);
const Teacher_Summary = lazy(() =>
    import("./components/Teacher/Teacher_Summaries/Summary")
);
const Teacher_Edit_Summary = lazy(() =>
    import("./components/Teacher/Teacher_Summaries/Edit_Summary")
);
import Student from "./components/Student/Student";
import Student_Default from "./components/Student/Student_Default";
// const Student = lazy(() => import("./components/Student/Student"));
// const Student_Default = lazy(() =>
//     import("./components/Student/Student_Default")
// );
const Student_Profile = lazy(() =>
    import("./components/Student/Student_Profile/Student_Profile")
);
const Student_Courses = lazy(() =>
    import("./components/Student/Courses/Courses")
);
const Student_Purchased = lazy(() =>
    import("./components/Student/Purchased/Purchased")
);
const Student_Purchased_Course = lazy(() =>
    import("./components/Student/Purchased/Course")
);
const Student_Purchased_Summary = lazy(() =>
    import("./components/Student/Purchased/Summary")
);
const Student_Edit_Profile = lazy(() =>
    import("./components/Student/Student_Edit_Profile/Student_Edit_Profile")
);
const Student_Course = lazy(() =>
    import("./components/Student/Courses/Course/Course")
);
const Student_Course_Enrollemnt = lazy(() =>
    import("./components/Student/Courses/Enrollment/Enrollment")
);
const Student_Summaries = lazy(() =>
    import("./components/Student/Summaries/Student_Summaries")
);
const Student_Summary = lazy(() =>
    import("./components/Student/Summaries/Summary")
);
const Student_Summary_Enrollemnt = lazy(() =>
    import("./components/Student/Summaries/Enrollment/Enrollment")
);

const ErrorElement = lazy(() => import("./components/ErrorElement"));
const LandingPage = lazy(() => import("./landingPage/LandingPage"));
const ContactPage = lazy(() =>
    import("./components/landingPageComp/ContactPage")
);
const Achievement = lazy(() =>
    import("./components/landingPageComp/Achievement")
);
const Courses = lazy(() => import("./components/landingPageComp/Courses"));
const CourseDetails = lazy(() =>
    import("./components/landingPageComp/CourseDetails")
);
const Student_contact = lazy(() =>
    import("./components/Student/Contact/Contact")
);
const Teacher_contact = lazy(() =>
    import("./components/Teacher/Contact/Contact")
);
const Routers = createBrowserRouter([
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
                element: <LandingPage />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Teacher",
                element: <Teacher />,
                errorElement: <ErrorElement />,
                children: [
                    {
                        index: true,
                        element: <Teacher_Default />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Teacher/Profile",
                        element: <Teacher_Profile />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Teacher/Profile/Edit",
                        element: <Teacher_Edit_Profile />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Teacher/Courses",
                        element: <Teacher_Courses />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Teacher/Courses/Add",
                        element: <Teacher_Add_Course />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Teacher/Courses/:id",
                        element: <Teacher_Course />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Teacher/Courses/:id/Edit",
                        element: <Teacher_Edit_Course />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Teacher/Courses/:id/Vedios/:vedioId",
                        element: <Teacher_Course_Vedio />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Teacher/Courses/:id/Vedios/Add",
                        element: <Teacher_Upload_Vedio />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Teacher/Payments",
                        element: <Teacher_Payments />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Teacher/Summaries",
                        element: <Teacher_Summaries />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Teacher/Summaries/Add",
                        element: <Teacher_Add_Summary />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Teacher/Summaries/:id",
                        element: <Teacher_Summary />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Teacher/Summaries/:id/Edit",
                        element: <Teacher_Edit_Summary />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Teacher/Contact",
                        element: <Teacher_contact />,
                        errorElement: <ErrorElement />,
                    },
                ],
            },
            {
                path: "/Student",
                element: <Student />,
                errorElement: <ErrorElement />,
                children: [
                    {
                        index: true,
                        element: <Student_Default />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Student/Profile",
                        element: <Student_Profile />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Student/Profile/Edit",
                        element: <Student_Edit_Profile />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Student/Courses",
                        element: <Student_Courses />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Student/Courses/:id",
                        element: <Student_Course />,
                        errorElement: <ErrorElement />,
                    },

                    {
                        path: "/Student/Purchased",
                        element: <Student_Purchased />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Student/Purchased/Courses/:id",
                        element: <Student_Purchased_Course />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Student/Purchased/Summaries/:id",
                        element: <Student_Purchased_Summary />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Student/Courses/:id/Enrollment",
                        element: <Student_Course_Enrollemnt />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Student/Summaries",
                        element: <Student_Summaries />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Student/Summaries/:id",
                        element: <Student_Summary />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Student/Summaries/:id/Enrollment",
                        element: <Student_Summary_Enrollemnt />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Student/Contact",
                        element: <Student_contact />,
                        errorElement: <ErrorElement />,
                    },
                ],
            },
            {
                path: "/Contact",
                element: <ContactPage />,
            },
            {
                path: "/Achievements",
                element: <Achievement />,
            },
            {
                path: "/Courses",
                element: <Courses />,
            },
            {
                path: "/CourseDetails",
                element: <CourseDetails />,
            },
        ],
    },

    {
        path: "login",
        element: <Login />,
    },
    {
        path: "register",
        element: <Register />,
    },
]);

export default Routers;
