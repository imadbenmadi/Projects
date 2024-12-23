import { useState, useEffect } from "react";
import { useAppContext } from "../../../AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { IoIosWarning } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import Card from "./Courses_Card";

dayjs.extend(customParseFormat);

function Student_Courses() {
    const { user } = useAppContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeFilter, setActiveFilter] = useState("all");
    const Navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        const FetchCourses = async ({ setCourses, setLoading, setError }) => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `http://localhost:3000/Students/${user.id}/Courses`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );

                if (response.status == 200) {
                    const courses = response.data.Courses;

                    setCourses(courses);
                } else if (response.status == 401) {
                    Swal.fire("Error", "you should login again", "error");
                    Navigate("/Login");
                } else {
                    setError(response.data);
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        FetchCourses({ setCourses, setLoading, setError });
    }, []);

    const filteredCourses = courses.filter(
        (course) =>
            course?.Title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (activeFilter === "all" || course?.Category === activeFilter)
    );

    const categories = [
        "all",
        ...new Set(courses.map((course) => course?.Category)),
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-purple-500">
                <div className="p-8 bg-white rounded-lg shadow-lg text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600 font-semibold">
                        Preparing your learning adventure...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen bg-gradient-to-r from-red-400 to-pink-500">
                <div className="p-8 bg-white rounded-lg shadow-lg text-center">
                    <IoIosWarning className="text-red-500 text-5xl mb-4 mx-auto" />
                    <div className="text-red-600 font-semibold">
                        {error.message}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-8 text-center">
                    Your Learning Odyssey
                </h1>

                <div className="mb-8 relative max-w-xl mx-auto">
                    <input
                        type="text"
                        placeholder="Embark on your next learning quest..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-3 pl-12 text-gray-900 border-2 border-purple-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300 ease-in-out"
                    />
                    <IoSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 text-xl" />
                </div>

                <div className="flex flex-wrap justify-center gap-4 mb-8">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveFilter(category)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition duration-300 ease-in-out ${
                                activeFilter === category
                                    ? "bg-purple-600 text-white"
                                    : "bg-white text-purple-600 hover:bg-purple-100"
                            }`}
                        >
                            {category.charAt(0).toUpperCase() +
                                category.slice(1)}
                        </button>
                    ))}
                </div>

                {filteredCourses.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg shadow-lg">
                        <IoIosWarning className="text-yellow-500 text-5xl inline-block mb-4" />
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                            No Courses Found
                        </h2>
                        {/* <p className="text-gray-500 mb-6">
                            Expand your horizons or try a different search!
                        </p> */}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCourses.map((course) => (
                            <div
                                key={course?.id}
                                className="transform hover:scale-105 transition duration-300 ease-in-out"
                            >
                                <Card course={course} setCourses={setCourses} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Student_Courses;
