import React from "react";
import { Link, useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import dayjs from "dayjs";
function BlogDetail() {
    const { id } = useParams();
    const { company } = useOutletContext();

    // Find the specific blog by id
    const blog = company?.Blogs?.find((blog) => blog?.id === parseInt(id));

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

            {/* Blog Date */}
            <p className="text-sm text-gray-500 mb-4">
                التاريخ: {dayjs(blog?.createdAt).format("DD-MMM-YYYY")}
            </p>

            {/* Blog Description */}
            <div className="text-gray-700 leading-relaxed mb-6">
                <p>{blog?.Description}</p>
            </div>

            {/* Additional Information */}
            <div className="p-4 rounded-lg">
                {blog?.ownerType === "Doctor" ? (
                    <Link
                        to={`/Malad/Companies/${company.id}/Doctors/${blog?.OwnerId}`}
                        className="text-gray-600 mb-2"
                    >
                        <span className="font-semibold text-gray-700">
                            اسم الطبيب:{" "}
                        </span>{" "}
                        <span className=" text-blue-500 underline">
                            {blog?.Owner?.firstName} {blog?.Owner?.lastName}
                        </span>
                    </Link>
                ) : null}

                <Link
                    to={`/Malad/Companies/${company.id}`}
                    className="text-gray-600"
                >
                    <span className="font-semibold text-gray-700">
                        {" "}
                        اسم الشركة :
                    </span>{" "}
                    <span className=" text-blue-500 underline">
                        {company?.Name}
                    </span>
                </Link>
            </div>
        </div>
    );
}

export default BlogDetail;
