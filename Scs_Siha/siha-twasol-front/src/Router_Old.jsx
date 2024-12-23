import { createBrowserRouter } from "react-router-dom";

import Home from "./Components/Home/Home.jsx";
import App from "./App.jsx";
import Login from "./Components/Auth/Login/Login.jsx";
import Register from "./Components/Auth/Register/Register.jsx";
import Default from "./Default.jsx";

import Not_Found from "./Components/Not_Found.jsx";
import Not_Finished from "./Components/Not_Finished.jsx";
import ErrorElement from "./Components/ErrorElement.jsx";

import Malad from "./Components/Profiles/Malad/Malad.jsx";
import Doctor from "./Components/Profiles/Doctor/Doctor.jsx";
import Director from "./Components/Profiles/Director/Director.jsx";
import Worker from "./Components/Profiles/Worker/Worker.jsx";

import Worker_Profile from "./Components/Profiles/Worker/Profile/Profile.jsx";
import Malad_Profile from "./Components/Profiles/Malad/Profile/Profile.jsx";

// import Malad from "./Components/Profiles/Director/Director.jsx";
import Director_default from "./Components/Profiles/Director/Director_Default.jsx";
import Malad_default from "./Components/Profiles/Malad/Malad_Default.jsx";
import Doctor_default from "./Components/Profiles/Doctor/Doctor_Default.jsx";
import Worker_default from "./Components/Profiles/Worker/Worker_Default.jsx";

import Director_workers from "./Components/Profiles/Director/Workers/Director_workers.jsx";
import Director_worker from "./Components/Profiles/Director/Workers/Wroker.jsx";
import Director_Add_Worker from "./Components/Profiles/Director/Workers/Director_Add_workers.jsx";
import Director_Edit_Worker from "./Components/Profiles/Director/Workers/Director_Edit_workers.jsx";

import Director_Services from "./Components/Profiles/Director/Services/Director_Services.jsx";
import Director_Services_add from "./Components/Profiles/Director/Services/Director_Add_service.jsx";
import Director_Services_edit from "./Components/Profiles/Director/Services/Edit_Service.jsx";

import Director_Doctors from "./Components/Profiles/Director/Doctors/Director_Doctors.jsx";
import Director_Doctors_add from "./Components/Profiles/Director/Doctors/Add_doctor.jsx";
import Director_doctor from "./Components/Profiles/Director/Doctors/Doctor.jsx";
import Director_Edit_doctor from "./Components/Profiles/Director/Doctors/Edit_doctor.jsx";

import Director_Blogs from "./Components/Profiles/Director/Blogs/Director_Blogs.jsx";
import Director_Blog from "./Components/Profiles/Director/Blogs/Blog.jsx";
import Director_Add_Blogs from "./Components/Profiles/Director/Blogs/Director_Add_Blogs.jsx";
import Director_Edit_Blogs from "./Components/Profiles/Director/Blogs/Director_Edit_Blogs.jsx";

import Director_Events from "./Components/Profiles/Director/Events/Director_Events.jsx";
import Director_Event from "./Components/Profiles/Director/Events/Event.jsx";
import Director_Add_Events from "./Components/Profiles/Director/Events/Director_Add_Event.jsx";
import Director_Edit_Events from "./Components/Profiles/Director/Events/Director_Edit_Events.jsx";
// ______________________________________________________

import Worker_blog from "./Components/Profiles/Worker/Blogs/Blog.jsx";
import Worker_Blogs from "./Components/Profiles/Worker/Blogs/Worker_Blogs.jsx";
import Worker_Add_Blogs from "./Components/Profiles/Worker/Blogs/Worker_Add_Blogs.jsx";
import Worker_Edit_Blogs from "./Components/Profiles/Worker/Blogs/Worker_Edit_Blogs.jsx";

import Worker_event from "./Components/Profiles/Worker/Events/Event.jsx";
import Worker_Events from "./Components/Profiles/Worker/Events/Worker_Events.jsx";
import Worker_Add_Events from "./Components/Profiles/Worker/Events/Worker_Add_Event.jsx";
import Worker_Edit_Events from "./Components/Profiles/Worker/Events/Worker_Edit_Events.jsx";
// ______________________________________________________
import Malad_Edit_Profile from "./Components/Profiles/Malad/Profile/Edit_Profile.jsx";
import Malad_Companies from "./Components/Profiles/Malad/Companies/Companies.jsx";
import Malad_Company from "./Components/Profiles/Malad/Companies/Company.jsx";
import Malad_Company_doctors from "./Components/Profiles/Malad/Companies/Company_Components/DoctorsSection.jsx";
import Malad_Company_doctor from "./Components/Profiles/Malad/Companies/Company_Components/Doctor/Doctor.jsx";
import Malad_Company_blogs from "./Components/Profiles/Malad/Companies/Company_Components/Blogs/BlogsSection.jsx";
import Malad_Company_blog from "./Components/Profiles/Malad/Companies/Company_Components/Blogs/Blog.jsx";
import Malad_Company_events from "./Components/Profiles/Malad/Companies/Company_Components/Events/EventsSection.jsx";
import Malad_Company_event from "./Components/Profiles/Malad/Companies/Company_Components/Events/Event.jsx";
import Malad_Company_informations from "./Components/Profiles/Malad/Companies/Company_Components/info.jsx";
import Default_Malad_company from "./Components/Profiles/Malad/Companies/Company_Components/Default.jsx";

import Malad_Events from "./Components/Profiles/Malad/Events/Events.jsx";
import Malad_Event from "./Components/Profiles/Malad/Events/Event.jsx";
import Malad_Blogs from "./Components/Profiles/Malad/Blogs/Blogs.jsx";
import Malad_Blog from "./Components/Profiles/Malad/Blogs/Blog.jsx";
// ______________________________________________________
import Doctor_Edit_Profile from "./Components/Profiles/Doctor/Profile/Edit_Profile.jsx";
import Doctor_Profile from "./Components/Profiles/Doctor/Profile/Profile.jsx";

import Doctor_blog from "./Components/Profiles/Doctor/Blogs/Blog.jsx";
import Doctor_Blogs from "./Components/Profiles/Doctor/Blogs/Blogs.jsx";
import Doctor_Add_Blogs from "./Components/Profiles/Doctor/Blogs/Add_Blogs.jsx";
import Doctor_Edit_Blogs from "./Components/Profiles/Doctor/Blogs/Edit_Blogs.jsx";

import Doctor_event from "./Components/Profiles/Doctor/Events/Event.jsx";
import Doctor_Events from "./Components/Profiles/Doctor/Events/Events.jsx";
import Doctor_Add_Events from "./Components/Profiles/Doctor/Events/Add_Event.jsx";
import Doctor_Edit_Events from "./Components/Profiles/Doctor/Events/Edit_Events.jsx";

import Doctor_Malads from "./Components/Profiles/Doctor/Malads/Malads.jsx";
import Doctor_Malads_Default from "./Components/Profiles/Doctor/Malads/Default.jsx";
import Doctor_Malads_List from "./Components/Profiles/Doctor/Malads/Malads_List.jsx";
import Doctor_Malads_Owned from "./Components/Profiles/Doctor/Malads/Own_Malads.jsx";
import Doctor_Malads_List_item from "./Components/Profiles/Doctor/Malads/Malad.jsx";
import Doctor_Malads_Own_item from "./Components/Profiles/Doctor/Malads/Malad_Own_item.jsx";

import Doctor_Add_File from "./Components/Profiles/Doctor/Malads/Files/Add_File.jsx";
import Doctor_File from "./Components/Profiles/Doctor/Malads/Files/File.jsx";

// ______________________________________________________
import Doctor_chatList from "./Components/Profiles/Doctor/Chat/ChatList.jsx";
import Doctor_chatRoom from "./Components/Profiles/Doctor/Chat/ChatRoom.jsx";
import Doctor_chatList_default from "./Components/Profiles/Doctor/Chat/Default.jsx";

import Malad_chatList from "./Components/Profiles/Malad/Chat/ChatList.jsx";
import Malad_chatRoom from "./Components/Profiles/Malad/Chat/ChatRoom.jsx";
import Malad_chatList_default from "./Components/Profiles/Malad/Chat/Default.jsx";

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
