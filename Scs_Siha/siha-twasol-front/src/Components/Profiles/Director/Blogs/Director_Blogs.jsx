import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { IoSearch } from "react-icons/io5";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useAppContext } from "../../../../AppContext";

dayjs.extend(customParseFormat);

function Blogs() {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const { user } = useAppContext();

    useEffect(() => {
        setLoading(true);
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/Directors/${user.id}/${user.companyId}/Blogs`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );
                if (response.status === 200) {
                    setBlogs(response.data.blogs || []);
                } else if (response.status === 401) {
                    Swal.fire(
                        "Error",
                        "يجب عليك تسجيل الدخول مرة اخرى",
                        "error"
                    );
                    navigate("/Login");
                } else {
                    setError(response.data.message || ".");
                }
            } catch (error) {
                setError("Failed to fetch blogs. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    const filteredBlogs = blogs.filter((blog) => {
        const title = blog?.Title.toLowerCase();
        const description = blog?.Description?.toLowerCase() || "";
        return (
            title.includes(searchQuery.toLowerCase()) ||
            description.includes(searchQuery.toLowerCase())
        );
    });

    if (loading) {
        return (
            <div className="w-[100vw] h-[80vh] flex flex-col items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-[100vw] h-screen flex items-center justify-center">
                <div className="text-red-600 font-semibold">{error}</div>
            </div>
        );
    }
    if (!blogs || blogs.length === 0) {
        return (
            <div className="py-6 px-4">
                <div className="flex justify-center items-center flex-col gap-6 mt-12">
                    <div className="text-center font-semibold text-sm text-gray_v pt-12">
                        لا يوجد مقالات
                    </div>
                    <Link
                        to={"/Director/Blogs/Add"}
                        className=" py-2 px-4 rounded bg-blue_v text-white cursor-pointer font-semibold text-sm"
                    >
                        اضافة مقال جديد
                    </Link>
                </div>
            </div>
        );
    }
    return (
        <div className="py-6 px-4">
            <div className="text-xl font-semibold text-blue_v">المقالات</div>

            <div className="mt-4 flex flex-col md:flex-row gap-4 justify-center md:justify-start md:ml-6 md:gap-6 text-gray_v">
                <div className="border p-2 mr-4 rounded-md flex items-center gap-2 text-sm font-semibold min-w-[300px]">
                    <IoSearch className="w-fit shrink-0" />
                    <input
                        type="text"
                        placeholder="ابحث عن المقال"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full placeholder:text-end text-end"
                    />
                </div>
                <Link
                    to={"/Director/blogs/Add"}
                    className=" py-2 px-4 rounded bg-blue_v text-white cursor-pointer font-semibold text-sm"
                >
                    اضافة مقال جديد
                </Link>
            </div>

            {filteredBlogs.length === 0 ? (
                <div className="flex justify-center items-center flex-col gap-6 mt-12">
                    <div className="text-center font-semibold text-sm text-gray_v">
                        لا يوجد مقالات تطابق بحثك
                    </div>
                    {/* <Link
                        to={"/Director/Blogs/Add"}
                        className="py-2 px-4 rounded bg-blue_v text-white cursor-pointer font-semibold text-sm"
                    >
                        اضافة مقال جديد
                    </Link> */}
                </div>
            ) : (
                <div className="overflow-x-auto mt-4">
                    <table className="table-auto w-full mt-4 text-sm text-center overflow-auto">
                        <thead>
                            <tr className="bg-gray_white font-normal">
                                <th className="px-4 py-2 rounded-tl-md">
                                    Title
                                </th>
                                <th className="px-4 py-2 border-l border-white">
                                    الوصف
                                </th>
                                <th className="px-4 py-2 border-l border-white">
                                    تم النشر في
                                </th>
                                <th className="px-4 py-2 border-l border-white rounded-tr-md">
                                    العمليات
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-xs text-center font-semibold">
                            {filteredBlogs.map((blog) => (
                                <tr key={blog.id}>
                                    <td className="border px-4 py-2">
                                        {blog.Title}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {blog.Description || "No Description"}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {dayjs(blog?.createdAt).format(
                                            "DD-MMM-YYYY"
                                        )}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {/* Add any specific action buttons here */}

                                        <Link
                                            to={`/Director/Blogs/${blog.id}`}
                                            className="bg-blue_v text-white px-4 py-1 rounded-md "
                                        >
                                            تفاصيل
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Blogs;
