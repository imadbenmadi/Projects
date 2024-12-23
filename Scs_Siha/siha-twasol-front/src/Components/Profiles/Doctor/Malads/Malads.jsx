import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

function Malads() {
    // Define the base path for easier reference
    const basePath = `/Doctor/Malads`;
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
                    تفاصيل المريض
                </h2>
                <ul className="space-y-4">
                    <li>
                        <Link
                            to={`${basePath}/List`}
                            className={`font-medium ${
                                location.pathname === `${basePath}/List`
                                    ? "text-blue-600 font-bold"
                                    : "text-gray-600 hover:text-blue-600"
                            }`}
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            اضافة مريض
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={`${basePath}/Own`}
                            className={`font-medium ${
                                location.pathname === `${basePath}/Own`
                                    ? "text-blue-600 font-bold"
                                    : "text-gray-600 hover:text-blue-600"
                            }`}
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            لائحة المرضى
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
                className={`flex-1 md:p-8 bg-white shadow-lg rounded-lg transition-all duration-300 ${
                    isSidebarOpen ? "ml-64" : "ml-0"
                } md:ml-64`}
            >
                <Outlet />
                {/* This renders the selected child component */}
            </main>
        </div>
    );
}

export default Malads;
