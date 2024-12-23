import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useAppContext } from "../../../../AppContext";
import { useLocation } from "react-router";
import { FaRegImage } from "react-icons/fa";

dayjs.extend(customParseFormat);

function Blog() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAppContext();

    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [showFullDescription, setShowFullDescription] = useState(false); // Toggle for "Read More"
    const blogId = location.pathname.split("/")[3];

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/Directors/${user.id}/${user.companyId}/Blogs/${blogId}`,
                    { withCredentials: true, validateStatus: () => true }
                );

                if (response.status === 200) {
                    setBlog(response.data.blog);
                } else if (response.status === 401) {
                    Swal.fire("خطأ", "يجب عليك تسجيل الدخول مرة أخرى", "error");
                    navigate("/Login");
                } else {
                    setError(
                        response.data.message || "Error fetching blog data."
                    );
                }
            } catch (fetchError) {
                setError("Failed to fetch blog. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [blogId, user.id, user.companyId, navigate]);

    const handleDelete = () => {
        Swal.fire({
            title: "هل أنت متأكد؟",
            text: "لن تتمكن من استعادة هذا العنصر!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "نعم، احذفه!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                setDeleteLoading(true);
                try {
                    const response = await axios.delete(
                        `http://localhost:3000/Directors/${user.id}/${user.companyId}/Blogs/${blogId}`,
                        { withCredentials: true, validateStatus: () => true }
                    );

                    if (response.status === 200) {
                        Swal.fire(
                            "تم الحذف!",
                            "تم حذف المقال بنجاح.",
                            "success"
                        );
                        navigate("/Director/Blogs");
                    } else {
                        Swal.fire(
                            "خطأ",
                            response.data.message || "خطأ في حذف المقال.",
                            "error"
                        );
                    }
                } catch (deleteError) {
                    Swal.fire(
                        "خطأ",
                        deleteError.message || "حدث خطأ أثناء حذف المقال.",
                        "error"
                    );
                } finally {
                    setDeleteLoading(false);
                }
            }
        });
    };

    if (loading) {
        return (
            <div className="w-[100vw] h-[80vh] flex items-center justify-center">
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

    if (!blog) {
        return (
            <div className="py-6 px-4">
                <div className="flex flex-col items-center gap-6 mt-12">
                    <p className="text-center font-semibold text-sm text-red-500 pt-12">
                        لم يتم العثور على المقال
                    </p>
                    <Link
                        to="/Director/Blogs"
                        className="py-2 px-4 bg-blue_v text-white rounded-md font-semibold text-sm"
                    >
                        الرجوع إلى قائمة المقالات
                    </Link>
                </div>
            </div>
        );
    }

    const descriptionLimit = 100; // Character limit for the truncated description

    return (
        <div className="py-6 px-4">
            <div className="max-w-3xl mx-auto border rounded-lg shadow-lg overflow-hidden bg-white">
                {/* Blog Image */}
                <div className="w-full h-64 bg-gray-300 flex items-center justify-center">
                    {blog.image_link ? (
                        <img
                            loading="lazy"
                            src={`http://localhost:3000${blog.image_link}`}
                            alt="Blog Image"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <FaRegImage className="text-6xl text-gray-400" />
                    )}
                </div>

                {/* Blog Content */}
                <div className="p-6">
                    {/* Title */}
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                        {blog.Title}
                    </h1>

                    {/* Date */}
                    <p className="text-gray-500 text-sm mb-4">
                        {dayjs(blog?.createdAt).format("DD-MMM-YYYY")}
                    </p>

                    {/* Description */}
                    <p className="text-gray-700 mb-4">
                        {showFullDescription ||
                        blog.Description.length <= descriptionLimit
                            ? blog.Description
                            : `${blog.Description.slice(
                                  0,
                                  descriptionLimit
                              )}...`}
                    </p>

                    {/* Read More / Show Less Toggle */}
                    {blog.Description.length > descriptionLimit && (
                        <button
                            onClick={() =>
                                setShowFullDescription(!showFullDescription)
                            }
                            className="text-blue-500 hover:underline font-semibold"
                        >
                            {showFullDescription ? "إظهار أقل" : "قراءة المزيد"}
                        </button>
                    )}
                </div>

                {/* Footer with Edit and Delete buttons */}
                <div className="flex flex-col md:flex-row justify-between items-center p-6 border-t bg-gray-50">
                    <div className="text-gray-500 text-sm mb-3">
                        <p>المؤسسة: {blog.Company?.Name || "غير محدد"}</p>
                    </div>
                    <div className="flex gap-4">
                        <Link
                            to={`/Director/Blogs/${blog.id}/Edit`}
                            className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600"
                        >
                            تعديل
                        </Link>
                        <button
                            onClick={handleDelete}
                            disabled={deleteLoading}
                            className={`py-2 px-4 rounded-md text-white ${
                                deleteLoading
                                    ? "bg-gray-400"
                                    : "bg-red-500 hover:bg-red-600"
                            }`}
                        >
                            {deleteLoading ? "جاري الحذف..." : "حذف"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Blog;
