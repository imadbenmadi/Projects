import { createBrowserRouter } from "react-router-dom";
import React, { lazy, Suspense } from "react";

const Home = lazy(() => import("./Components/Home/Home.jsx"));
const App = lazy(() => import("./App"));
const Login = lazy(() => import("./Components/Auth/Login/Login"));
const Register = lazy(() => import("./Components/Auth/Register/Register"));
const Default = lazy(() => import("./Default"));

const Not_Found = lazy(() => import("./Components/Not_Found"));
const Not_Finished = lazy(() => import("./Components/Not_Finished"));
const ErrorElement = lazy(() => import("./Components/ErrorElement"));

const Malad = lazy(() => import("./Components/Profiles/Malad/Malad.jsx"));
const Doctor = lazy(() => import("./Components/Profiles/Doctor/Doctor.jsx"));
const Director = lazy(() =>
    import("./Components/Profiles/Director/Director.jsx")
);
const Worker = lazy(() => import("./Components/Profiles/Worker/Worker.jsx"));

const Worker_Profile = lazy(() =>
    import("./Components/Profiles/Worker/Profile/Profile.jsx")
);
const Malad_Profile = lazy(() =>
    import("./Components/Profiles/Malad/Profile/Profile.jsx")
);

// import Malad from "./Components/Profiles/Director/Director.jsx";
const Director_default = lazy(() =>
    import("./Components/Profiles/Director/Director_Default.jsx")
);
const Malad_default = lazy(() =>
    import("./Components/Profiles/Malad/Malad_Default.jsx")
);
const Doctor_default = lazy(() =>
    import("./Components/Profiles/Doctor/Doctor_Default.jsx")
);
const Worker_default = lazy(() =>
    import("./Components/Profiles/Worker/Worker_Default.jsx")
);

const Director_workers = lazy(() =>
    import("./Components/Profiles/Director/Workers/Director_workers.jsx")
);
const Director_worker = lazy(() =>
    import("./Components/Profiles/Director/Workers/Wroker.jsx")
);
const Director_Add_Worker = lazy(() =>
    import("./Components/Profiles/Director/Workers/Director_Add_workers.jsx")
);
const Director_Edit_Worker = lazy(() =>
    import("./Components/Profiles/Director/Workers/Director_Edit_workers.jsx")
);

const Director_Services = lazy(() =>
    import("./Components/Profiles/Director/Services/Director_Services.jsx")
);
const Director_Services_add = lazy(() =>
    import("./Components/Profiles/Director/Services/Director_Add_service.jsx")
);
const Director_Services_edit = lazy(() =>
    import("./Components/Profiles/Director/Services/Edit_Service.jsx")
);

const Director_Doctors = lazy(() =>
    import("./Components/Profiles/Director/Doctors/Director_Doctors.jsx")
);
const Director_Doctors_add = lazy(() =>
    import("./Components/Profiles/Director/Doctors/Add_doctor.jsx")
);
const Director_doctor = lazy(() =>
    import("./Components/Profiles/Director/Doctors/Doctor.jsx")
);
const Director_Edit_doctor = lazy(() =>
    import("./Components/Profiles/Director/Doctors/Edit_doctor.jsx")
);

const Director_Blogs = lazy(() =>
    import("./Components/Profiles/Director/Blogs/Director_Blogs.jsx")
);
const Director_Blog = lazy(() =>
    import("./Components/Profiles/Director/Blogs/Blog.jsx")
);
const Director_Add_Blogs = lazy(() =>
    import("./Components/Profiles/Director/Blogs/Director_Add_Blogs.jsx")
);
const Director_Edit_Blogs = lazy(() =>
    import("./Components/Profiles/Director/Blogs/Director_Edit_Blogs.jsx")
);

const Director_Events = lazy(() =>
    import("./Components/Profiles/Director/Events/Director_Events.jsx")
);
const Director_Event = lazy(() =>
    import("./Components/Profiles/Director/Events/Event.jsx")
);
const Director_Add_Events = lazy(() =>
    import("./Components/Profiles/Director/Events/Director_Add_Event.jsx")
);
const Director_Edit_Events = lazy(() =>
    import("./Components/Profiles/Director/Events/Director_Edit_Events.jsx")
);
// ______________________________________________________

const Worker_blog = lazy(() =>
    import("./Components/Profiles/Worker/Blogs/Blog.jsx")
);
const Worker_Blogs = lazy(() =>
    import("./Components/Profiles/Worker/Blogs/Worker_Blogs.jsx")
);
const Worker_Add_Blogs = lazy(() =>
    import("./Components/Profiles/Worker/Blogs/Worker_Add_Blogs.jsx")
);
const Worker_Edit_Blogs = lazy(() =>
    import("./Components/Profiles/Worker/Blogs/Worker_Edit_Blogs.jsx")
);

const Worker_event = lazy(() =>
    import("./Components/Profiles/Worker/Events/Event.jsx")
);
const Worker_Events = lazy(() =>
    import("./Components/Profiles/Worker/Events/Worker_Events.jsx")
);
const Worker_Add_Events = lazy(() =>
    import("./Components/Profiles/Worker/Events/Worker_Add_Event.jsx")
);
const Worker_Edit_Events = lazy(() =>
    import("./Components/Profiles/Worker/Events/Worker_Edit_Events.jsx")
);

// Malad Components
const Malad_Edit_Profile = lazy(() =>
    import("./Components/Profiles/Malad/Profile/Edit_Profile.jsx")
);
const Malad_Companies = lazy(() =>
    import("./Components/Profiles/Malad/Companies/Companies.jsx")
);
const Malad_Company = lazy(() =>
    import("./Components/Profiles/Malad/Companies/Company.jsx")
);
const Malad_Company_doctors = lazy(() =>
    import(
        "./Components/Profiles/Malad/Companies/Company_Components/DoctorsSection.jsx"
    )
);
const Malad_Company_doctor = lazy(() =>
    import(
        "./Components/Profiles/Malad/Companies/Company_Components/Doctor/Doctor.jsx"
    )
);
const Malad_Company_blogs = lazy(() =>
    import(
        "./Components/Profiles/Malad/Companies/Company_Components/Blogs/BlogsSection.jsx"
    )
);
const Malad_Company_blog = lazy(() =>
    import(
        "./Components/Profiles/Malad/Companies/Company_Components/Blogs/Blog.jsx"
    )
);
const Malad_Company_events = lazy(() =>
    import(
        "./Components/Profiles/Malad/Companies/Company_Components/Events/EventsSection.jsx"
    )
);
const Malad_Company_event = lazy(() =>
    import(
        "./Components/Profiles/Malad/Companies/Company_Components/Events/Event.jsx"
    )
);
const Malad_Company_informations = lazy(() =>
    import("./Components/Profiles/Malad/Companies/Company_Components/info.jsx")
);
const Default_Malad_company = lazy(() =>
    import(
        "./Components/Profiles/Malad/Companies/Company_Components/Default.jsx"
    )
);

const Malad_Events = lazy(() =>
    import("./Components/Profiles/Malad/Events/Events.jsx")
);
const Malad_Event = lazy(() =>
    import("./Components/Profiles/Malad/Events/Event.jsx")
);
const Malad_Blogs = lazy(() =>
    import("./Components/Profiles/Malad/Blogs/Blogs.jsx")
);
const Malad_Blog = lazy(() =>
    import("./Components/Profiles/Malad/Blogs/Blog.jsx")
);

// Doctor Components
const Doctor_Edit_Profile = lazy(() =>
    import("./Components/Profiles/Doctor/Profile/Edit_Profile.jsx")
);
const Doctor_Profile = lazy(() =>
    import("./Components/Profiles/Doctor/Profile/Profile.jsx")
);

const Doctor_blog = lazy(() =>
    import("./Components/Profiles/Doctor/Blogs/Blog.jsx")
);
const Doctor_Blogs = lazy(() =>
    import("./Components/Profiles/Doctor/Blogs/Blogs.jsx")
);
const Doctor_Add_Blogs = lazy(() =>
    import("./Components/Profiles/Doctor/Blogs/Add_Blogs.jsx")
);
const Doctor_Edit_Blogs = lazy(() =>
    import("./Components/Profiles/Doctor/Blogs/Edit_Blogs.jsx")
);

const Doctor_event = lazy(() =>
    import("./Components/Profiles/Doctor/Events/Event.jsx")
);
const Doctor_Events = lazy(() =>
    import("./Components/Profiles/Doctor/Events/Events.jsx")
);
const Doctor_Add_Events = lazy(() =>
    import("./Components/Profiles/Doctor/Events/Add_Event.jsx")
);
const Doctor_Edit_Events = lazy(() =>
    import("./Components/Profiles/Doctor/Events/Edit_Events.jsx")
);

const Doctor_Malads = lazy(() =>
    import("./Components/Profiles/Doctor/Malads/Malads.jsx")
);
const Doctor_Malads_Default = lazy(() =>
    import("./Components/Profiles/Doctor/Malads/Default.jsx")
);
const Doctor_Malads_List = lazy(() =>
    import("./Components/Profiles/Doctor/Malads/Malads_List.jsx")
);
const Doctor_Malads_Owned = lazy(() =>
    import("./Components/Profiles/Doctor/Malads/Own_Malads.jsx")
);
const Doctor_Malads_List_item = lazy(() =>
    import("./Components/Profiles/Doctor/Malads/Malad.jsx")
);
const Doctor_Malads_Own_item = lazy(() =>
    import("./Components/Profiles/Doctor/Malads/Malad_Own_item.jsx")
);

const Doctor_Add_File = lazy(() =>
    import("./Components/Profiles/Doctor/Malads/Files/Add_File.jsx")
);
const Doctor_File = lazy(() =>
    import("./Components/Profiles/Doctor/Malads/Files/File.jsx")
);

// Chat Components
const Doctor_chatList = lazy(() =>
    import("./Components/Profiles/Doctor/Chat/ChatList")
);
const Doctor_chatRoom = lazy(() =>
    import("./Components/Profiles/Doctor/Chat/ChatRoom")
);
const Doctor_chatList_default = lazy(() =>
    import("./Components/Profiles/Doctor/Chat/Default")
);

const Malad_chatList = lazy(() =>
    import("./Components/Profiles/Malad/Chat/ChatList")
);
const Malad_chatRoom = lazy(() =>
    import("./Components/Profiles/Malad/Chat/ChatRoom")
);
const Malad_chatList_default = lazy(() =>
    import("./Components/Profiles/Malad/Chat/Default")
);

const routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorElement />,
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
                path: "/Malad",
                element: <Malad />,
                errorElement: <ErrorElement />,
                children: [
                    {
                        index: true,
                        element: <Malad_default />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Malad/Profile",
                        element: <Malad_Profile />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Malad/Profile/Edit",
                        element: <Malad_Edit_Profile />,
                    },
                    {
                        path: "/Malad/Companies",
                        element: <Malad_Companies />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Malad/Companies/:id",
                        element: <Malad_Company />,
                        errorElement: <ErrorElement />,
                        children: [
                            {
                                index: true,
                                element: <Default_Malad_company />,
                                errorElement: <ErrorElement />,
                            },
                            {
                                path: "/Malad/Companies/:id/Events",
                                element: <Malad_Company_events />,
                                errorElement: <ErrorElement />,
                            },
                            {
                                path: "/Malad/Companies/:id/Events/:id",
                                element: <Malad_Company_event />,
                                errorElement: <ErrorElement />,
                            },
                            {
                                path: "/Malad/Companies/:id/Blogs",
                                element: <Malad_Company_blogs />,
                                errorElement: <ErrorElement />,
                            },
                            {
                                path: "/Malad/Companies/:id/Blogs/:id",
                                element: <Malad_Company_blog />,
                                errorElement: <ErrorElement />,
                            },
                            {
                                path: "/Malad/Companies/:id/Doctors",
                                element: <Malad_Company_doctors />,
                                errorElement: <ErrorElement />,
                            },
                            {
                                path: "/Malad/Companies/:id/Doctors/:id",
                                element: <Malad_Company_doctor />,
                                errorElement: <ErrorElement />,
                            },
                            {
                                path: "/Malad/Companies/:id/Info",
                                element: <Malad_Company_informations />,
                                errorElement: <ErrorElement />,
                            },
                        ],
                    },
                    {
                        path: "/Malad/Events",
                        element: <Malad_Events />,
                    },
                    {
                        path: "/Malad/Events/:id",
                        element: <Malad_Event />,
                    },
                    {
                        path: "/Malad/Blogs",
                        element: <Malad_Blogs />,
                    },
                    {
                        path: "/Malad/Blogs/:id",
                        element: <Malad_Blog />,
                    },
                    {
                        path: "/Malad/ChatRooms",
                        element: <Malad_chatList />,
                        errorElement: <ErrorElement />,
                        children: [
                            {
                                index: true,
                                element: <Malad_chatList_default />,
                            },
                            {
                                path: "/Malad/ChatRooms/:roomId",
                                element: <Malad_chatRoom />,
                                errorElement: <ErrorElement />,
                            },
                        ],
                    },

                    {
                        path: "*",
                        element: <Not_Found />,
                    },
                ],
            },
            {
                path: "/Doctor",
                element: <Doctor />,
                errorElement: <ErrorElement />,
                children: [
                    {
                        index: true,
                        element: <Doctor_default />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Doctor/Profile",
                        element: <Doctor_Profile />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Doctor/Profile/Edit",
                        element: <Doctor_Edit_Profile />,
                        errorElement: <ErrorElement />,
                    },

                    {
                        path: "/Doctor/Blogs",
                        element: <Doctor_Blogs />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Doctor/Blogs/Add",
                        element: <Doctor_Add_Blogs />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Doctor/Blogs/:id",
                        element: <Doctor_blog />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Doctor/Blogs/:id/Edit",
                        element: <Doctor_Edit_Blogs />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Doctor/Events",
                        element: <Doctor_Events />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Doctor/Events/Add",
                        element: <Doctor_Add_Events />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Doctor/Events/:id",
                        element: <Doctor_event />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Doctor/Events/:id/Edit",
                        element: <Doctor_Edit_Events />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Doctor/Malads",
                        element: <Doctor_Malads />,
                        errorElement: <ErrorElement />,
                        children: [
                            {
                                index: true,
                                element: <Doctor_Malads_Default />,
                                errorElement: <ErrorElement />,
                            },
                            {
                                path: "/Doctor/Malads/List",
                                element: <Doctor_Malads_List />,
                            },
                            {
                                path: "/Doctor/Malads/List/:id",
                                element: <Doctor_Malads_List_item />,
                            },
                            {
                                path: "/Doctor/Malads/Own",
                                element: <Doctor_Malads_Owned />,
                            },
                            {
                                path: "/Doctor/Malads/Own/:id",
                                element: <Doctor_Malads_Own_item />,
                            },
                            {
                                path: "/Doctor/Malads/:id/upload",
                                element: <Doctor_Add_File />,
                            },
                            {
                                path: "/Doctor/Malads/:id/Files/:id",
                                element: <Doctor_File />,
                            },
                        ],
                    },

                    {
                        path: "/Doctor/ChatRooms",
                        element: <Doctor_chatList />,
                        errorElement: <ErrorElement />,
                        children: [
                            {
                                index: true,
                                element: <Doctor_chatList_default />,
                            },
                            {
                                path: "/Doctor/ChatRooms/:roomId",
                                element: <Doctor_chatRoom />,
                                errorElement: <ErrorElement />,
                            },
                        ],
                    },

                    {
                        path: "*",
                        element: <Not_Found />,
                    },
                ],
            },
            {
                path: "/Director",
                element: <Director />,
                errorElement: <ErrorElement />,
                children: [
                    {
                        index: true,
                        element: <Director_default />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Director/Workers",
                        element: <Director_workers />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Director/Workers/Add",
                        element: <Director_Add_Worker />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Director/Workers/:id",
                        element: <Director_worker />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Director/Workers/:id/Edit",
                        element: <Director_Edit_Worker />,
                        errorElement: <ErrorElement />,
                    },
                    // ______________________________________________________
                    {
                        path: "/Director/Doctors",
                        element: <Director_Doctors />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Director/Doctors/Add",
                        element: <Director_Doctors_add />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Director/Doctors/:id",
                        element: <Director_doctor />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Director/Doctors/:id/Edit",
                        element: <Director_Edit_doctor />,
                        errorElement: <ErrorElement />,
                    },
                    // ______________________________________________________
                    {
                        path: "/Director/Blogs",
                        element: <Director_Blogs />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Director/Blogs/Add",
                        element: <Director_Add_Blogs />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Director/Blogs/:id",
                        element: <Director_Blog />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Director/Blogs/:id/Edit",
                        element: <Director_Edit_Blogs />,
                        errorElement: <ErrorElement />,
                    },
                    // ______________________________________________________
                    {
                        path: "/Director/Events",
                        element: <Director_Events />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Director/Events/Add",
                        element: <Director_Add_Events />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Director/Events/:id",
                        element: <Director_Event />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Director/Events/:id/Edit",
                        element: <Director_Edit_Events />,
                        errorElement: <ErrorElement />,
                    },
                    // ______________________________________________________
                    {
                        path: "/Director/Services",
                        element: <Director_Services />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Director/Services/Add",
                        element: <Director_Services_add />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Director/Services/:id/Edit",
                        element: <Director_Services_edit />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "*",
                        element: <Not_Found />,
                    },
                ],
            },
            {
                path: "/Worker",
                element: <Worker />,
                errorElement: <ErrorElement />,
                children: [
                    {
                        index: true,
                        element: <Worker_default />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Worker/Profile",
                        element: <Worker_Profile />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Worker/Blogs",
                        element: <Worker_Blogs />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Worker/Blogs/Add",
                        element: <Worker_Add_Blogs />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Worker/Blogs/:id",
                        element: <Worker_blog />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Worker/Blogs/:id/Edit",
                        element: <Worker_Edit_Blogs />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Worker/Events",
                        element: <Worker_Events />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Worker/Events/Add",
                        element: <Worker_Add_Events />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Worker/Events/:id",
                        element: <Worker_event />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Worker/Events/:id/Edit",
                        element: <Worker_Edit_Events />,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "/Worker/ChatRooms",
                        element: <Not_Finished />,
                    },
                    {
                        path: "*",
                        element: <Not_Found />,
                    },
                ],
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
                path: "/Register",
                element: <Login />,
                errorElement: <ErrorElement />,
            },

            {
                path: "*",
                element: <Not_Found />,
            },
        ],
    },
]);

export default routes;
