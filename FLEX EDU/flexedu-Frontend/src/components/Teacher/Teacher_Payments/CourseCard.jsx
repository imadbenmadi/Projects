import { CiImageOn } from "react-icons/ci";
import { FaStar, FaStarHalf, FaUsers } from "react-icons/fa";

const StudentCoursesCard = ({ course }) => {
    const renderStars = (rating) => {
        return (
            <div className="flex">
                {[...Array(5)].map((_, index) => {
                    if (index < Math.floor(rating)) {
                        return (
                            <FaStar key={index} className="text-yellow-400" />
                        );
                    } else if (index < Math.ceil(rating)) {
                        return (
                            <FaStarHalf
                                key={index}
                                className="text-yellow-400"
                            />
                        );
                    }
                    return <FaStar key={index} className="text-gray-300" />;
                })}
            </div>
        );
    };

    return (
        <div
            key={course?.course?.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105"
        >
            <div className="relative">
                {course?.Course?.Image ? (
                    <img
                        src={`http://localhost:3000/${course?.Course?.Image}`}
                        alt={course?.Course?.Title}
                        className="w-full h-48 object-cover"
                    />
                ) : (
                    <div className="flex items-center justify-center h-48 bg-gray-200">
                        <CiImageOn className="text-6xl text-gray-400" />
                    </div>
                )}
                <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-sm">
                    <FaUsers className="inline-block mr-1" />
                    {course?.Course?.Students_count} Students
                </div>
            </div>
            <div className="p-4">
                <h2 className="text-lg font-semibold mb-2 text-gray-800">
                    {course?.Course?.Title}
                </h2>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    {course?.Course?.Category}
                </span>
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                        {renderStars(course?.Course?.Rate || 0)}
                        <span className="ml-2 text-sm text-gray-500">
                            ({course?.Course?.Rate?.toFixed(1) || null})
                        </span>
                    </div>
                </div>
            </div>
            <div className="p-4 bg-gray-50 flex justify-between items-center">
                {course?.course?.Price === 0 ? (
                    <p className="text-lg font-semibold text-green-600">
                        Free{" "}
                    </p>
                ) : (
                    <p className="text-lg font-semibold text-green-600">
                        {course?.course?.Price} DA
                    </p>
                )}
            </div>
        </div>
    );
};

export default StudentCoursesCard;
