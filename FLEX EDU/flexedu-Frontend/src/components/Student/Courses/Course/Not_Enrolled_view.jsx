import { Link } from "react-router-dom";
import { IoIosWarning } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";
import {
    FaStar,
    FaStarHalf,
    FaUserGraduate,
    FaPlayCircle,
} from "react-icons/fa";
import dayjs from "dayjs";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Course_Review_Card from "./Reviews/Course_Review_Card";
function Not_Enrolled_view({ course, review }) {
    if (!course) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                <IoIosWarning className="text-6xl text-yellow-500 mb-4" />
                <h1 className="text-2xl font-bold text-gray-800">
                    Course Not Found
                </h1>
                <p className="text-gray-600 mt-2">
                    The course you're looking for doesn't exist or has been
                    removed.
                </p>
            </div>
        );
    }
    const navigate = useNavigate();
    const [enroll_loading, setenroll_loading] = useState(false);
    async function free_enrollment() {
        setenroll_loading(true);

        let formData = new FormData();
        try {
            const response = await axios.post(
                `http://localhost:3000/upload/Payment/Courses/${course?.id}`,
                formData,
                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            );
            if (response.status === 200) {
                navigate(`/Student/Purchased/Courses/${course?.id}`);
            } else {
                Swal.fire("Error", response.data.message, "error");
            }
        } catch (err) {
            Swal.fire("Error", err.message, "error");
        } finally {
            setenroll_loading(false);
        }
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-5xl">
                <div className="md:flex">
                    <div className="md:flex-shrink-0">
                        {course?.Image ? (
                            <img
                                className="h-48 w-full object-cover md:h-full md:w-48"
                                src={`http://localhost:3000/${course?.Image}`}
                                alt={course?.Title}
                            />
                        ) : (
                            <div className="flex items-center justify-center h-48 w-full md:h-full md:w-48 bg-gray-200">
                                <CiImageOn className="text-4xl text-gray-400" />
                            </div>
                        )}
                    </div>
                    <div className="p-8 w-full">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="block mt-1 text-lg leading-tight font-medium text-black">
                                    {course?.Title}
                                </p>
                                <p className="mt-2 text-gray-500">
                                    {course?.Category}
                                </p>
                            </div>
                            {course?.Price == 0 ? (
                                <p className="text-lg font-semibold text-green-600">
                                    Free
                                </p>
                            ) : (
                                <p className="text-lg font-semibold text-green-600">
                                    {course?.Price} DA
                                </p>
                            )}
                        </div>
                        <p className="mt-4 text-gray-500">
                            {course?.Description}
                        </p>
                        <div className="mt-6 flex items-center">
                            <div className="flex items-center">
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
                                        <FaStar
                                            key={index}
                                            className="text-gray-300"
                                        />
                                    )
                                )}
                            </div>
                            <span className="ml-2 text-gray-600">
                                {course?.Rate
                                    ? course?.Rate.toFixed(1)
                                    : "Not rated"}
                            </span>
                        </div>
                        <div className="mt-6 flex items-center text-sm text-gray-500">
                            <FaUserGraduate className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                            <span>
                                {course?.Students_count || 0} Enrollments
                            </span>
                            <FaPlayCircle className="flex-shrink-0 ml-4 mr-1.5 h-5 w-5 text-gray-400" />
                            <span>
                                {course?.Course_Videos
                                    ? course?.Course_Videos.length
                                    : 0}{" "}
                                Videos
                            </span>
                        </div>
                        <div className="mt-6 flex items-center justify-between">
                            <time
                                className="text-sm text-gray-500"
                                dateTime={course?.createdAt}
                            >
                                Created on{" "}
                                {dayjs(course?.createdAt).format(
                                    "MMMM D, YYYY"
                                )}
                            </time>
                            {!course?.Price || course?.Price == 0 ? (
                                enroll_loading ? (
                                    <div className=" small-loader"></div>
                                ) : (
                                    <div
                                        className="inline-flex items-center px-4 py-2 border
                                    cursor-pointer
                                    border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
                                        onClick={free_enrollment}
                                    >
                                        Enroll for free
                                    </div>
                                )
                            ) : (
                                <Link
                                    to={`/Student/Courses/${course?.id}/Enrollment`}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Buy Now
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col  gap-4 md:gap-10   ">
                {/* Course Videos Section */}
                <div className=" ">
                    {course?.Course_Videos &&
                    course?.Course_Videos.length > 0 ? (
                        <div className="mt-8 ">
                            <h2 className="text-2xl font-semibold text-gray-600 text-center mb-4">
                                Course Videos
                            </h2>
                            <div className=" w-full flex flex-col gap-3">
                                {course?.Course_Videos.map((video) => (
                                    <div
                                        key={video?.id}
                                        className="transform hover:scale-105 transition duration-300 ease-in-out w-full"
                                    >
                                        <div className="bg-white rounded-lg shadow-md p-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex gap-3 items-center">
                                                    <FaPlayCircle className="text-3xl text-indigo-500" />
                                                    <h3 className="text-lg font-semibold text-gray-800 ml-2">
                                                        {video?.Title}
                                                    </h3>
                                                </div>
                                                <span className="text-sm px-3 text-gray-500">
                                                    {video?.Duration}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <p className=" text-center font-semibold text-gray-600 mt-4">
                            No videos available for this course.
                        </p>
                    )}
                </div>
                {review && review?.length > 0 && (
                    <div>
                        <div className="mt-8 max-w-4xl mx-auto">
                            <h2 className="text-2xl font-semibold text-gray-600 text-center mb-4">
                                Course Reviews
                            </h2>
                            {
                                <div className=" flex flex-col gap-3 w-full">
                                    {review?.length > 0
                                        ? review?.map((review) => (
                                              <Course_Review_Card
                                                  key={review?.id}
                                                  review={review}
                                              />
                                          ))
                                        : null}
                                </div>

                                // <div className="flex items-center justify-center h-48 w-full ">
                                //     <IoIosWarning className="text-4xl text-gray-400" />
                                //     <p className="text-gray-500 ml-2">
                                //         No reviews available for this course?.
                                //     </p>
                                // </div>
                            }
                        </div>
                    </div>
                )}
                {/* Course Reviews Section */}
            </div>
        </div>
    );
}

export default Not_Enrolled_view;
