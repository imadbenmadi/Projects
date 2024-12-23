import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import { CiImageOn } from "react-icons/ci";
import {
    FaStar,
    FaStarHalf,
    FaUsers,
    FaVideo,
} from "react-icons/fa";
import { Link } from "react-router-dom";

dayjs.extend(customParseFormat);

function Student_Courses_Card({ course }) {
    // Function to render stars based on rating
    const renderStars = () => {
        return [...Array(5)].map((_, index) => {
            if (index < Math.floor(course?.Rate || 0)) {
                return <FaStar key={index} className="text-yellow-500" />;
            } else if (index < Math.ceil(course?.Rate || 0)) {
                return <FaStarHalf key={index} className="text-yellow-500" />;
            } else {
                return <FaStar key={index} className="text-gray-300" />;
            }
        });
    };

    return (
        <div className=" w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
            {/* Course Image Section */}
            <div className="relative">
                {course?.Image ? (
                    <img
                        src={`http://localhost:3000/${course?.Image}`}
                        alt={course?.Title}
                        className="w-full h-48 object-cover"
                    />
                ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        <CiImageOn className="text-gray-400 text-6xl" />
                    </div>
                )}
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-purple-600 shadow">
                    {course?.Category}
                </div>
            </div>

            {/* Course Details Section */}
            <div className="p-4">
                <h3 className="text-xl font-semibold mb-1 text-gray-800 truncate">
                    {course?.Title}
                </h3>

                {/* Rating Section */}
                <div className="flex items-center mb-2">
                    {renderStars()}
                    <span className="ml-2 text-sm text-gray-600">
                        ({course?.Rate?.toFixed(1) || null})
                    </span>
                </div>

                {/* Course Information Section */}
                <div className="text-sm text-gray-600">
                    <div className="flex items-center mb-1">
                        <FaUsers className="text-gray-400 mr-2" />
                        <span>
                            {course?.Students_count || 0} Enrolment
                            {course?.Students_count !== 1 ? "s" : ""}
                        </span>
                    </div>

                    <div className="flex items-center mb-1">
                        <FaVideo className="text-gray-400 w-fit mr-2" />
                        <span>
                            {course?.Course_Videos ? (
                                <div>
                                    {" "}
                                    {course?.Course_Videos.length} Vedio
                                    {course?.Course_Videos?.length !== 1
                                        ? "s"
                                        : ""}{" "}
                                </div>
                            ) : (
                                <div>No Vedios in this course</div>
                            )}
                        </span>
                    </div>

                    {course?.Price === 0 ? (
                        <p className="text-lg font-semibold text-green-600">
                            Free
                        </p>
                    ) : (
                        <p className="text-lg font-semibold text-green-600">
                            {course?.Price} DA
                        </p>
                    )}
                </div>

                {/* View Course Button */}
                <Link
                    to={`/Student/Courses/${course?.id}`}
                    className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:bg-gradient-to-l transition-colors duration-300"
                >
                    View
                </Link>
            </div>
        </div>
    );
}

export default Student_Courses_Card;
