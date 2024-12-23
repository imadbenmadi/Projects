import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { useAppContext } from "../../../../AppContext";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
function BlogDetail() {
    const navigate = useNavigate();
    const { user } = useAppContext();
    const [blog, setBlog] = useState(null); // Initialize as null
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const blogId = useLocation().pathname.split("/")[3];
    useEffect(() => {
        setLoading(true);
        const fetchBlog = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/Malads/${user.id}/Blogs/${blogId}`, // Make sure this endpoint is correct
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );

                if (response.status === 200) {
                    setBlog(response.data);
                } else if (response.status === 401) {
                    Swal.fire("خطأ", "يجب عليك تسجيل الدخول مرة أخرى", "error");
                    navigate("/Login");
                } else {
                    setError(response.data.message || "خطأ في جلب المقال.");
                }
            } catch (error) {
                setError("فشل في جلب المقالات. يرجى المحاولة مرة أخرى لاحقًا.");
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [navigate, user.id]);

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
            <div className="text-red-600 text-center mt-6">
                لم يتم العثور على المقال.
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6 text-right">
            {/* Blog Image */}
            {blog?.image_link && (
                <img
                    loading="lazy"
                    src={`http://localhost:3000/${blog?.image_link}`}
                    alt={blog?.Title}
                    className="w-full h-64 object-cover rounded-lg mb-6"
                />
            )}

            {/* Blog Title */}
            <h1 className="text-3xl font-bold text-blue-800 mb-4">
                {blog?.Title}
            </h1>

            {/* Blog Description */}
            <div className="text-gray-700 leading-relaxed mb-6">
                <p>{blog?.Description}</p>
            </div>
            <div className="text-gray-700 leading-relaxed mb-6">
                <p>
                    تاريخ النشر: {dayjs(blog?.createdAt).format("DD-MMM-YYYY")}
                </p>
            </div>

            {/* Additional Information */}
            <div className=" rounded-lg">
                {blog?.ownerType === "Doctor" && blog?.Owner ? (
                    <Link
                        to={`/Malad/Companies/${blog?.companyId}/Doctors/${blog?.Owner.id}`}
                        className="text-gray-600 mb-2 flex gap-2"
                    >
                        <span className="font-semibold text-gray-700">
                            ناشر المقال: :
                        </span>
                        <span className="text-blue-500 underline">
                            {blog?.Owner.firstName} {blog?.Owner.lastName}
                        </span>
                    </Link>
                ) : null}
            </div>
            <Link
                to={`/Malad/Companies/${blog?.Company.id}`}
                className="text-gray-600  flex gap-2"
            >
                <span className="font-semibold text-gray-700">
                    {" "}
                    اسم الشركة :
                </span>{" "}
                <span className=" text-blue-500 underline">
                    {blog?.Company?.Name}
                </span>
            </Link>
        </div>
    );
}

export default BlogDetail;
