import { useState, useEffect } from "react";
import { useAppContext } from "../../../AppContext";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import React from "react";

import {
    FaArrowDown,
    FaArrowUp,
    FaStar,
    FaStarHalf,
    FaPlay,
} from "react-icons/fa";
import {
    MdEdit,
    MdCategory,
    MdAttachMoney,
    MdDateRange,
    MdPeople,
} from "react-icons/md";
import { CiImageOn } from "react-icons/ci";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { IoIosWarning } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
dayjs.extend(customParseFormat);
import CourseReviewCard from "./Review/Course_Review_Card";
import MeetCard from "./MeetCard";

function Course() {
    const navigate = useNavigate();
    const { user } = useAppContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [course, setCourse] = useState(null);
    const location = useLocation();
    const courseId = location.pathname.split("/")[3];
    const [showDescription, setShowDescription] = useState(false);
    const [AllReviews, setAllReviews] = React.useState(false);

    useEffect(() => {
        const fetchCourse = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `http://localhost:3000/Teachers/${user?.id}/Courses/${courseId}`,
                    { withCredentials: true, validateStatus: () => true }
                );

                if (response.status === 200) {
                    setCourse(response.data.Course);
                    setAllReviews(response.data.Reviews);
                } else if (response.status === 401) {
                    Swal.fire("Error", "You should login again", "error");
                    navigate("/Login");
                } else {
                    setError(response.data);
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourse();
    }, [user, courseId, navigate]);
    const handleAddMeeting = async () => {
        const { value: formValues } = await Swal.fire({
            title: "Schedule a New Meeting",
            html:
                `<input type="text" id="link" class="swal2-input" placeholder="Meeting Link">` +
                `<input type="datetime-local" id="time" class="swal2-input" placeholder="Meeting Time">`,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: "Add Meeting",
            preConfirm: () => {
                const link = document.getElementById("link").value;
                const time = document.getElementById("time").value;

                // Validate input fields
                if (!link || !time) {
                    Swal.showValidationMessage(
                        "Please enter both the meeting link and time."
                    );
                    return false;
                }

                // Ensure that the selected time is in the future
                else if (new Date(time) <= new Date()) {
                    Swal.showValidationMessage(
                        "Meeting time must be in the future."
                    );
                    return false;
                } else if (!/^(http|https):\/\/[^ "]+$/.test(link)) {
                    Swal.showValidationMessage(
                        "Meeting link must be a valid URL."
                    );
                    return false;
                }
                return { link, time };
            },
        });

        // If the user submitted valid inputs, formValues will contain them
        if (formValues) {
            try {
                const { link, time } = formValues;

                // Send the meeting data to the backend using axios
                const response = await axios.post(
                    `http://localhost:3000/Teachers/${user?.id}/Courses/${course?.id}/Meetings`,
                    {
                        Link: link,
                        time,
                    },
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );

                if (response.status === 201) {
                    Swal.fire({
                        icon: "success",
                        title: "Meeting Scheduled!",
                        text: "Your meeting has been successfully added.",
                    });
                    setCourse((prevCourse) => {
                        return {
                            ...prevCourse,
                            Course_Meets: [
                                ...prevcourse?.Course_Meets,
                                response.data,
                            ],
                        };
                    });
                    // You might want to refresh the meetings list here after successful addition
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Failed to Add Meeting",
                    text:
                        error.response?.data?.message ||
                        "Something went wrong. Please try again.",
                });
            }
        }
    };
    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="text-red-600 font-semibold text-xl bg-white p-8 rounded-lg shadow-lg">
                    {error}
                </div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                <IoIosWarning className="text-6xl text-yellow-500 mb-4" />
                <h1 className="text-2xl font-semibold text-gray-700">
                    Course Not Found
                </h1>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                <div className="flex flex-col md:flex-row items-center md:items-start ">
                    <div className="md:flex-shrink-0">
                        {course?.Image ? (
                            <img
                                className="h-48 w-full 
                                 object-cover md:w-48"
                                src={`http://localhost:3000/${course?.Image}`}
                                alt="Course cover"
                            />
                        ) : (
                            <div className="flex items-center justify-center h-48 w-48 bg-gray-200">
                                <CiImageOn className="text-4xl text-gray-400" />
                            </div>
                        )}
                    </div>
                    <div className="p-8 w-full">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="block mt-1 text-2xl leading-tight font-semibold text-black">
                                    {course?.Title}
                                </h2>
                                <p className="mt-2 text-gray-500 flex items-center">
                                    <MdCategory className="mr-2" />
                                    {course?.Category}
                                </p>
                            </div>
                            <Link
                                to={`/Teacher/Courses/${course?.id}/Edit`}
                                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                            >
                                <MdEdit className="mr-2" />
                                Edit Course
                            </Link>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
                            <p className="flex items-center">
                                <MdAttachMoney className="mr-1" />
                                {course?.Price ? `${course?.Price} DA` : "Free"}
                            </p>
                            <p className="flex items-center">
                                <MdDateRange className="mr-1" />
                                Created:{" "}
                                {dayjs(course?.createdAt).format(
                                    "DD MMMM YYYY"
                                )}
                            </p>
                            <p className="flex items-center">
                                <MdPeople className="mr-1" />
                                {course?.Students_count || 0} Enrollments
                            </p>
                            <p className="flex items-center">
                                <FaPlay className="mr-1" />
                                {course?.Course_Videos?.length || 0} Videos
                            </p>
                        </div>
                        <div className="mt-4 flex items-center">
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
                            <span className="ml-2 text-gray-600">
                                {course?.Rate?.toFixed(1) || null}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="px-8 py-4 border-t border-gray-200">
                    <button
                        onClick={() => setShowDescription(!showDescription)}
                        className="flex items-center text-blue-500 hover:text-blue-600 transition duration-300"
                    >
                        {showDescription ? "Hide" : "Show"} Description
                        {showDescription ? (
                            <FaArrowUp className="ml-2" />
                        ) : (
                            <FaArrowDown className="ml-2" />
                        )}
                    </button>
                    {showDescription && (
                        <p className="mt-4 text-gray-600">
                            {course?.Description || "No description available."}
                        </p>
                    )}
                </div>
            </div>

            <div className="mt-8 max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-semibold text-gray-800">
                        Course Meets
                    </h3>
                    <button
                        onClick={handleAddMeeting}
                        className="mb-6 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
                    >
                        Add New Meeting
                    </button>
                </div>
                {course?.Course_Meets && course?.Course_Meets.length > 0 ? (
                    course?.Course_Meets.map((meet, index) => (
                        <MeetCard
                            key={index}
                            meet={meet}
                            index={index}
                            user={user}
                            course={course}
                            setCourse={setCourse}
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-500 py-8">
                        No Meetings available for this course?.
                    </p>
                )}
            </div>
            <div className="mt-8 max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-semibold text-gray-800">
                        Course Videos
                    </h3>
                    <Link
                        to={`/Teacher/Courses/${course?.id}/Vedios/Add`}
                        className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
                    >
                        <IoAdd className="mr-2" />
                        Upload Video
                    </Link>
                </div>
                {course?.Course_Videos && course?.Course_Videos.length > 0 ? (
                    course?.Course_Videos.map((video, index) => (
                        <div
                            key={video.id}
                            className="bg-white rounded-lg shadow-md mb-4 p-4 flex justify-between items-center hover:shadow-lg transition duration-300"
                        >
                            <div className="flex items-center">
                                <span className="text-2xl font-bold text-gray-300 mr-4">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-800">
                                        {video.Title}
                                    </h4>
                                    <p className="text-sm text-gray-500">
                                        {video.Duration}
                                    </p>
                                </div>
                            </div>
                            <Link
                                to={`/Teacher/Courses/${course?.id}/Vedios/${video.id}`}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                            >
                                View
                            </Link>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 py-8">
                        No videos available for this course?.
                    </p>
                )}
            </div>
            <div className=" max-w-[80vw] pl-6 py-10">
                <h2 className="text-2xl font-bold text-gray-600 pl-6 mb-4">
                    Reviews
                </h2>
                {course?.Reviews?.map((review) => (
                    <CourseReviewCard
                        key={review?.id}
                        review={review}
                        courseId={course?.id}
                        userId={user?.id}
                        setAllReviews={setAllReviews}
                    />
                ))}
            </div>
        </div>
    );
}

export default Course;
