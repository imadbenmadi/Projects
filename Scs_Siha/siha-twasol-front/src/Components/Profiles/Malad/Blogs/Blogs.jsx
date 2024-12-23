import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { IoSearch } from "react-icons/io5";
import { useAppContext } from "../../../../AppContext";

function Blogs() {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Filters
    const [searchQuery, setSearchQuery] = useState("");
    const [locationFilter, setLocationFilter] = useState("");
    const [ownerTypeFilter, setOwnerTypeFilter] = useState("");
    const [locations, setLocations] = useState([]);

    const { user } = useAppContext();

    useEffect(() => {
        setLoading(true);
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/Malads/${user.id}/Blogs`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );

                if (response.status === 200) {
                    setBlogs(response.data.blogs || []);

                    // Extract unique locations for filter options
                    const uniqueLocations = [
                        ...new Set(
                            response.data.blogs.map(
                                (blog) => blog.Company.Location
                            )
                        ),
                    ];
                    setLocations(uniqueLocations);
                } else if (response.status === 401) {
                    Swal.fire("خطأ", "يجب عليك تسجيل الدخول مرة أخرى", "error");
                    navigate("/Login");
                } else {
                    setError(response.data.message || "مقال خطأ ما.");
                }
            } catch (error) {
                setError("فشل في جلب المقالات. يرجى المحاولة مرة أخرى لاحقًا.");
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [navigate, user.id]);

    const filteredBlogs = blogs.filter((blog) => {
        const title = blog?.Title.toLowerCase();
        const description = blog?.Description?.toLowerCase() || "";
        const matchesSearch =
            title.includes(searchQuery.toLowerCase()) ||
            description.includes(searchQuery.toLowerCase());
        const matchesLocation = locationFilter
            ? blog.Company.Location === locationFilter
            : true;
        const matchesOwnerType = ownerTypeFilter
            ? blog.ownerType === ownerTypeFilter
            : true;

        return matchesSearch && matchesLocation && matchesOwnerType;
    });

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

    if (!blogs || blogs.length === 0) {
        return (
            <div className="py-6 px-4">
                <div className="flex justify-center items-center flex-col gap-6 mt-12">
                    <div className="text-center font-semibold text-sm text-gray_v pt-12">
                        لا توجد مقالات متاحة
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="py-6 px-4">
            <div className="text-xl font-semibold text-blue_v">المقالات</div>

            {/* Search and Filter Controls */}
            <div className="mt-4 flex flex-col md:flex-row gap-4 justify-center md:justify-start md:ml-6 md:gap-6 text-gray_v">
                {/* Search Input */}
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

                {/* Location Filter */}
                <select
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="p-2 border rounded-md shadow-sm text-sm"
                >
                    <option value="">الموقع</option>
                    {locations.map((location) => (
                        <option key={location} value={location}>
                            {location}
                        </option>
                    ))}
                </select>

                {/* Owner Type Filter */}
                <select
                    value={ownerTypeFilter}
                    onChange={(e) => setOwnerTypeFilter(e.target.value)}
                    className="p-2 border rounded-md shadow-sm text-sm"
                >
                    <option value="">نوع المالك</option>
                    <option value="Director">مدير</option>
                    <option value="Doctor">طبيب</option>
                    <option value="Worker">عامل</option>
                </select>
            </div>

            {filteredBlogs.length === 0 ? (
                <div className="flex justify-center items-center flex-col gap-6 mt-12">
                    <div className="text-center font-semibold text-sm text-gray_v">
                        لا توجد مقالات تطابق بحثك
                    </div>
                </div>
            ) : (
                <ul className="my-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBlogs.map((blog) => (
                        <BlogCard key={blog.id} blog={blog} />
                    ))}
                </ul>
            )}
        </div>
    );
}

function BlogCard({ blog }) {
    return (
        <li className="border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
            {/* Blog Image */}
            {blog.image_link && (
                <img
                    loading="lazy"
                    src={`http://localhost:3000/${blog.image_link}`}
                    alt={blog.Title}
                    className="w-full h-48 object-cover rounded-t-lg"
                />
            )}

            <div className="p-4">
                {/* Blog Title */}
                <h4 className="text-lg font-semibold text-blue-700 mb-2">
                    {blog.Title}
                </h4>

                {/* Blog Location */}
                {blog.Company?.Location && (
                    <p className="text-sm text-gray-500 mb-2">
                        الموقع: {blog.Company.Location}
                    </p>
                )}

                {/* Blog Description */}
                <p className="text-gray-700 mb-4">
                    {blog.Description?.substring(0, 100)}...
                </p>

                {/* Link to Blog Detail */}
                <Link
                    to={`/Malad/Blogs/${blog.id}`}
                    className="inline-block mt-4"
                >
                    <div className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium text-center">
                        اقرأ المزيد
                    </div>
                </Link>
            </div>
        </li>
    );
}

export default Blogs;
