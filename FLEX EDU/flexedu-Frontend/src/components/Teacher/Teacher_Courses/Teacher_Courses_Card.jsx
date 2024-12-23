import { useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../../../AppContext";
import { CiImageOn } from "react-icons/ci";
import {
    FaStar,
    FaStarHalf,
    FaUserGraduate,
    FaVideo,
    FaCalendarAlt,
    FaTrashAlt,
    FaEye,
} from "react-icons/fa";
import dayjs from "dayjs";

function Teacher_Courses_Card({ course, setCourses }) {
    const { user } = useAppContext();
    const [deleteLoading, setDeleteLoading] = useState(false);

    const DeleteCourse = async () => {
        setDeleteLoading(true);
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            });

            if (result.isConfirmed) {
                const response = await axios.delete(
                    `http://localhost:3000/Teachers/${user?.id}/Courses/${course?.id}`,
                    { withCredentials: true, validateStatus: () => true }
                );
                if (response.status === 200) {
                    Swal.fire(
                        "Deleted!",
                        "Course has been deleted.",
                        "success"
                    );
                    setCourses((prev) =>
                        prev.filter((c) => c.id !== course?.id)
                    );
                } else {
                    Swal.fire("Error", response.data.message, "error");
                }
            }
        } catch (error) {
            Swal.fire("Error", error.message, "error");
        } finally {
            setDeleteLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1">
            <div className="relative">
                {course?.Image ? (
                    <img
                        className="w-full h-48 object-cover"
                        src={`http://localhost:3000/${course?.Image}`}
                        alt={course?.Title}
                    />
                ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        <CiImageOn className="text-4xl text-gray-400" />
                    </div>
                )}
                <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 m-2 rounded-full text-sm font-semibold">
                    {course?.Category}
                </div>
            </div>
            <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {course?.Title}
                </h2>
                <div className="flex items-center mb-4">
                    <div className="flex mr-2">
                        {[...Array(5)].map((_, index) =>
                            index < Math.floor(course?.Rate || 0) ? (
                                <FaStar
                                    key={index}
                                    className="text-yellow-400"
                                />
                            ) : index < Math.ceil(course?.Rate || 0) ? (
                                <FaStarHalf
                                    key={index}
                                    className="text-yellow-400"
                                />
                            ) : (
                                <FaStar key={index} className="text-gray-300" />
                            )
                        )}
                    </div>
                    <span className="text-gray-600">
                        ({course?.Rate?.toFixed(1) || null})
                    </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                        <FaUserGraduate className="mr-2" />
                        {course?.Students_count || 0} Enrolled
                    </div>
                    <div className="flex items-center">
                        <FaVideo className="mr-2" />
                        {course?.Course_Videos?.length || 0} Videos
                    </div>
                    <div className="flex items-center">
                        <FaCalendarAlt className="mr-2" />
                        {dayjs(course?.createdAt).format("MMM D, YYYY")}
                    </div>
                </div>
                {course?.Price === 0 ? (
                    <p className="text-lg font-semibold text-green-600">
                        Free{" "}
                    </p>
                ) : (
                    <p className="text-lg font-semibold text-green-600">
                        {course?.Price} DA
                    </p>
                )}
                <div className="flex justify-between">
                    <Link
                        to={`/Teacher/Courses/${course?.id}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-blue-700"
                    >
                        <FaEye className="mr-2" /> View
                    </Link>
                    <button
                        onClick={DeleteCourse}
                        disabled={deleteLoading}
                        className="bg-red-500 text-white px-4 py-2 rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-red-600 disabled:opacity-50"
                    >
                        {deleteLoading ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                        ) : (
                            <>
                                <FaTrashAlt className="mr-2" /> Delete
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Teacher_Courses_Card;
