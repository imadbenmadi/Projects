import { Star, Clock, Book } from "lucide-react";
import { CiImageOn } from "react-icons/ci";
import { Link } from "react-router-dom";
const CourseCard = ({
    title,
    category,
    rating,
    price,
    courseImg,
    studentsCount,
    lessonsCount,
    sale,
}) => {
    // Use the actual number of students from the server response
    const enrolledStudents = studentsCount; // No need to calculate, use actual count

    // Default to a certain number of lessons, if needed
    const numLessons = lessonsCount || 10; // You can change this logic based on real data

    return (
        <div
            className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform 
        duration-300 max-w-sm mx-auto"
        >
            <div className="relative">
                {courseImg ? (
                    <img
                        className="w-full h-48 object-cover"
                        src={`http://localhost:3000/${courseImg}`}
                        alt="Course"
                    />
                ) : (
                    <div className="flex items-center justify-center w-full h-48 bg-gray-200">
                        <CiImageOn className="text-6xl text-gray-400" />
                    </div>
                )}
                <div className="absolute top-3 left-3 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase shadow-md">
                    {category}
                </div>
                {sale && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                        {sale}% OFF
                    </div>
                )}
            </div>

            <div className="p-6">
                <h2 className="text-lg font-bold mb-2 line-clamp-2 leading-tight">
                    {title}
                </h2>
                <div className="flex items-center mb-2">
                    <Star className="w-5 h-5 text-yellow-400 mr-1" />
                    <span className="font-semibold">{rating.toFixed(1)}</span>
                    <span className="text-gray-500 ml-2 text-sm">
                        ({enrolledStudents.toLocaleString()} students)
                    </span>
                </div>
                <div className="flex items-center text-gray-600 mb-2 text-sm">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{Math.floor(numLessons * 0.5)} hours</span>{" "}
                    {/* Adjust the logic if needed */}
                </div>
                <div className="flex items-center text-gray-600 mb-4 text-sm">
                    <Book className="w-4 h-4 mr-2" />
                    <span>{numLessons} lessons</span>
                </div>
                <Link
                    to={"/login"}
                    className="flex justify-between items-center"
                >
                    <span className="text-xl font-bold text-blue-600">
                        {price === 0 ? "Free" : `$${price} DZD`}{" "}
                    </span>
                    <div className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition duration-300">
                        Enroll Now
                    </div>
                </Link>
            </div>
        </div>
    );
};
export default CourseCard;
