import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import { CiImageOn } from "react-icons/ci";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { Link } from "react-router-dom";

dayjs.extend(customParseFormat);

function Student_Courses_Card({ course, setCourses }) {
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
                        <span className="mr-2">👨‍🎓</span>
                        {course?.Students_count || 0} Enrolled
                    </div>
                    <div className="flex items-center">
                        <span className="mr-2">🎥</span>
                        {course?.Course_Videos?.length || 0} Videos
                    </div>
                    <div className="flex items-center">
                        <span className="mr-2">📅</span>
                        {dayjs(course?.createdAt).format("MMM D, YYYY")}
                    </div>
                </div>

                {course?.Price === 0 ? (
                    <p className="text-lg font-semibold text-green-600">Free</p>
                ) : (
                    <p className="text-lg font-semibold text-green-600">
                        {course?.Price} DA
                    </p>
                )}

                <div className="flex justify-between mt-4">
                    <Link
                        to={`/Student/Purchased/Courses/${course?.id}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-blue-700"
                    >
                        View
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Student_Courses_Card;
