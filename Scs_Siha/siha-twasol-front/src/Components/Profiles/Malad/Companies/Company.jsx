import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../../../../AppContext";

function Company() {
    const { user } = useAppContext();
    const location = useLocation();
    const id = location.pathname.split("/")[3];
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/Malads/${user.id}/Companies/${id}`,
                    { withCredentials: true, validateStatus: () => true }
                );
                
                setCompany(response.data);
                setLoading(false);
            } catch (error) {
                setError("حدث خطأ أثناء تحميل بيانات الشركة.");
                setLoading(false);
            }
        };
        fetchCompany();
    }, [id, user.id]);

    if (loading) return (
        <div className=" w-screen h-screen flex flex-col items-center justify-center">
            <span className="loader"></span>
        </div>
    );
    if (error) return (
        <div className="text-red-600 font-semibold text-center">{error}</div>
    );

    // Define the base path for easier reference
    const basePath = `/Malad/Companies/${id}`;

    return (
        <div className="flex bg-gray-50 min-h-screen relative">
            {/* Mobile Sidebar Toggle Button */}
            <button
                className="md:hidden  text-blue-600 font-bold mt-12 px-2 py-1 focus:outline-none fixed top-4 left-4 z-30 
                rounded-lg bg-white shadow-lg"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                ☰
            </button>

            {/* Sidebar Navigation */}
            <aside
                className={`w-64 bg-white p-6 shadow-md min-h-screen border-r fixed z-20 top-0 left-0 transform ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 ease-in-out md:translate-x-0`}
            >
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                    تفاصيل الشركة
                </h2>
                <ul className="space-y-4">
                    <li>
                        <Link
                            to={`${basePath}/Info`}
                            className={`font-medium ${
                                location.pathname === `${basePath}/Info`
                                    ? "text-blue-600 font-bold"
                                    : "text-gray-600 hover:text-blue-600"
                            }`}
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            معلومات عامة
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={`${basePath}/Doctors`}
                            className={`font-medium ${
                                location.pathname === `${basePath}/Doctors`
                                    ? "text-blue-600 font-bold"
                                    : "text-gray-600 hover:text-blue-600"
                            }`}
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            الأطباء
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={`${basePath}/Blogs`}
                            className={`font-medium ${
                                location.pathname === `${basePath}/Blogs`
                                    ? "text-blue-600 font-bold"
                                    : "text-gray-600 hover:text-blue-600"
                            }`}
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            المقالات
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={`${basePath}/Events`}
                            className={`font-medium ${
                                location.pathname === `${basePath}/Events`
                                    ? "text-blue-600 font-bold"
                                    : "text-gray-600 hover:text-blue-600"
                            }`}
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            الأحداث
                        </Link>
                    </li>
                </ul>
            </aside>

            {/* Overlay for Sidebar on Mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Main Content */}
            <main
                className={`flex-1 p-8 bg-white shadow-lg rounded-lg transition-all duration-300 ${
                    isSidebarOpen ? "ml-64" : "ml-0"
                } md:ml-64`}
            >
                <Outlet context={{ company }} />
                {/* This renders the selected child component */}
            </main>
        </div>
    );
}

export default Company;
