import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./Components/Home/Home";
import Not_Finished from "./Components/Not_Finished";
import Not_Found from "./Components/Not_Found";
import Register from "./Components/Auth/Register/Register";
import Login from "./Components/Auth/Login/Login";
import AboutUs from "./Components/AboutUs/AboutUs";
import FAQ from "./Components/FAQ/FAQ";
import ContactUs from "./Components/ContactUs/ContactUs";
import Search from "./Components/Search/Search";
import Patient from "./Components/Profile/Patient/Patient";
import Doctore from "./Components/Profile/Doctore/Doctore";
import Doctore_Appoints from "./Components/Profile/Doctore/Appoints/Appoints";
import Patient_Defualt from "./Components/Profile/Patient/Default";
import Doctore_Defualt from "./Components/Profile/Doctore/Default";

import Patient_Appoints from "./Components/Profile/Patient/Appoints/Appoints";
import Patient_Consultations from "./Components/Profile/Patient/Consultations/Consultations";
import Patient_Inbox from "./Components/Profile/Patient/Inbox/Inbox";
import Patient_MedicalFolders from "./Components/Profile/Patient/MedicalFolders/MedicalFolders";
import Patient_Profile from "./Components/Profile/Patient/Profile/Profile";
import Patient_Settings from "./Components/Profile/Patient/Settings/Settings";
import Patient_Add_MedicalFolder from "./Components/Profile/Patient/MedicalFolders/Add";
import Overview from "./Components/Profile/Doctore/Overview";
import Patients from "./Components/Profile/Doctore/Patients";
const routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                // path: "/",
                index: true,
                element: <Home />,
            },
            {
                path: "/Blogs",
                element: <Not_Finished />,
            },
            {
                path: "/Contact",
                element: <ContactUs />,
            },
            {
                path: "/About",
                element: <AboutUs />,
            },
            {
                path: "/FAQ",
                element: <FAQ />,
            },

            {
                path: "/Register",
                element: <Register />,
            },
            {
                path: "/Login",
                element: <Login />,
            },
            {
                path: "/Search",
                element: <Search />,
            },
            {
                path: "*",
                element: <Not_Found />,
            },
        ],
    },

    {
        path: "/Patients/:id",
        element: <Patient />,
        children: [
            { path: "/Patients/:id", element: <Patient_Defualt /> },
            { path: "/Patients/:id/Profile", element: <Patient_Profile /> },
            // { path: "/Patients/:id/Notifications", element: <Not_Finished /> },

            {
                path: "/Patients/:id/Appoints",
                element: <Patient_Appoints />,
            },
            {
                path: "/Patients/:id/Consultations",
                element: <Not_Finished />,
            },
            { path: "/Patients/:id/Inbox", element: <Patient_Inbox /> },
            {
                path: "/Patients/:id/Medical_Folders",
                element: <Patient_MedicalFolders />,
            },
            {
                path: "/Patients/:id/Medical_Folders/Add",
                element: <Patient_Add_MedicalFolder />,
            },
            { path: "/Patients/:id/Settings", element: <Not_Finished /> },
            {
                path: "*",
                element: <Not_Found />,
            },
        ],
    },
    {
        path: "/Doctores/:id",
        element: <Doctore />,
        children: [
            { path: "/Doctores/:id", element: <Doctore_Defualt /> },
            { path: "/Doctores/:id/Overview", element: <Overview /> },
            { path: "/Doctores/:id/Patients", element: <Patients /> },

            {
                path: "/Doctores/:id/Appoints",
                element: <Doctore_Appoints />,
            },
            { path: "/Doctores/:id/Consultations", element: <Not_Finished /> },
            { path: "/Doctores/:id/Inbox", element: <Not_Finished /> },
            {
                path: "/Doctores/:id/Medical_Folders",
                element: <Not_Finished />,
            },
            { path: "/Doctores/:id/Settings", element: <Not_Finished /> },

            {
                path: "*",
                element: <Not_Found />,
            },
            // { path: "/Doctores/:id/Notifications", element: <Not_Finished /> },
        ],
    },
    {
        path: "*",
        element: <Not_Found />,
    },
]);
export default routes;
