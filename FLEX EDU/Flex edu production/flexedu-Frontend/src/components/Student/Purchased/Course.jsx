import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import VideoComponent from "./Vedio_Component";
import Swal from "sweetalert2";
import { useAppContext } from "../../../AppContext";
import CourseReview from "./Review/Course_Review";
import { FaStar, FaUsers, FaPlay, FaChevronRight } from "react-icons/fa";
import CourseReviewCard from "./Review/Course_Review_Card";
import MeetCard from "../../Teacher/Teacher_Courses/MeetCard";
import CourseProgress from "./CourseProgress";
function CourseComponent() {
    const { user } = useAppContext();
    const location = useLocation();
    const courseId = location.pathname.split("/")[4];
    const [courseData, setCourseData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeVideoIndex, setActiveVideoIndex] = useState(0);
    const [showSidebar, setShowSidebar] = useState(true);
    const [activeVideo, setActiveVideo] = useState(null);
    const [isReviewed, setIsReviewed] = useState(false);
    const [videosWatched, setVideosWatched] = useState([]);
    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const response = await axios.get(
                    `https://api.flexedu-dz.com/Students/${user.id}/Purchased/Courses/${courseId}`,
                    { withCredentials: true }
                );

                if (response.status === 200) {
                    setCourseData(response.data);

                    setCourseData(response.data);
                    setActiveVideoIndex(response.data.course_progress.Progress);
                    setVideosWatched(
                        response.data.course_progress.WatchedVideos
                    );
                    setIsReviewed(response.data.isReviewed);
                } else if (response.status === 401) {
                    Swal.fire("Error", "You should login again", "error");
                } else {
                    setError(response.data);
                }
                setLoading(false);
            } catch (error) {
                setError("Failed to load course data");
                setLoading(false);
            }
        };
        fetchCourseData().then(() => {
            if (!courseData?.Course?.Course_Videos) {
                setShowSidebar(false);
            }
        });
    }, [courseId, user.id, activeVideoIndex]);

    useEffect(() => {
        const videoId = new URLSearchParams(location.search).get("video");
        if (videoId && courseData?.Course?.Course_Videos) {
            const videoIndex = courseData.course?.Course_Videos.findIndex(
                (video) => video.id === parseInt(videoId)
            );
            if (videoIndex !== -1) {
                setActiveVideoIndex(videoIndex);
            }
        }
        const selectedVideo =
            courseData?.Course?.Course_Videos[activeVideoIndex];
        setActiveVideo(selectedVideo);
    }, [location.search, courseData]);

    const handleVideoSelect = (index) => {
        handleChangeProgress(index);
        setActiveVideoIndex(index);
        const selectedVideo = courseData.course?.Course_Videos[index];
        setActiveVideo(selectedVideo);
    };

    const handleChangeProgress = async (progress) => {

        try {
            const res = await axios.post(
                `https://api.flexedu-dz.com/Students/${user.id}/Courses/${courseId}/Progress`,
                {
                    progress,
                    videoId: progress,
                },
                { withCredentials: true }
            );
        } catch (error) {
        }
    };
    const truncateTitle = (title, wordLimit = 10) => {
        const words = title.split("");
        // Only truncate if the title exceeds the word limit
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join("") + "...";
        }
        // If it's within the limit, return the title as is
        return title;
    };

    return (
        <div>
            <div className="flex w-full  ">
                <div
                    className={`flex-1 transition-all duration-300 ${
                        showSidebar ? "mr-80" : "mr-0"
                    }`}
                >
                    <div className="bg-white shadow-lg rounded-lg m-4">
                        {courseData?.Course?.Course_Videos?.length > 0 ? (
                            <VideoComponent videoData={activeVideo} />
                        ) : (
                            <div className="p-4 text-center text-gray-600">
                                No videos available for this course
                            </div>
                        )}

                        <div className="p-6">
                            <h1 className="text-3xl font-bold text-gray-800 mb-4">
                                {courseData?.Course?.Title}
                            </h1>
                            <p className="text-gray-600 mb-4">
                                {courseData?.Course?.Description}
                            </p>
                            <div className="flex flex-wrap items-center justify-between text-sm text-gray-600">
                                <p className="mb-2">
                                    <span className="font-semibold">
                                        Category:
                                    </span>{" "}
                                    {courseData?.Course?.Category}
                                </p>
                                <p className="mb-2">
                                    <span className="font-semibold">
                                        Price:
                                    </span>{" "}
                                    {courseData?.Course?.Price} DA
                                </p>
                                <p className="mb-2 flex items-center">
                                    <span className="font-semibold mr-1">
                                        Rating:
                                    </span>{" "}
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar
                                            key={i}
                                            className={
                                                i <
                                                Math.round(
                                                    courseData?.Course?.Rate.toFixed(
                                                        1
                                                    ) || 0
                                                )
                                                    ? "text-yellow-400"
                                                    : "text-gray-300"
                                            }
                                        />
                                    ))}
                                </p>
                                <p className="mb-2 flex items-center">
                                    <FaUsers className="mr-1" />
                                    <span className="font-semibold">
                                        Students:
                                    </span>{" "}
                                    {courseData?.Course?.Students_count}
                                </p>
                            </div>
                        </div>
                        <CourseProgress
                            totalVideos={
                                courseData?.Course?.Course_Videos?.length - 1 ||
                                0
                            }
                            watchedVideos={videosWatched}
                            className="mx-4 mt-4"
                        />
                    </div>

                    <div className="mt-8 mb-24 px-6 max-w-6xl mx-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-semibold text-gray-800">
                                Course Meets
                            </h3>
                        </div>
                        {courseData?.Course?.Course_Meets &&
                        courseData?.Course?.Course_Meets.length > 0 ? (
                            courseData?.Course?.Course_Meets.map(
                                (meet, index) => (
                                    <MeetCard
                                        key={index}
                                        meet={meet}
                                        index={index}
                                    />
                                )
                            )
                        ) : (
                            <p className="text-center text-gray-500 py-8">
                                No Meetings available for this course?.
                            </p>
                        )}
                    </div>
                    {!courseData?.isReviewed && (
                        <CourseReview
                            courseId={courseId}
                            setIsReviewed={setIsReviewed}
                        />
                    )}
                </div>

                <div
                    className={`fixed top-0 right-0 w-80 h-full bg-white shadow-lg transition-all duration-300 transform mt-6 ${
                        showSidebar ? "translate-x-0" : "translate-x-full"
                    }`}
                >
                    <button
                        onClick={() => setShowSidebar(!showSidebar)}
                        className="absolute -left-10 top-1/2 bg-white p-2 rounded-l-md shadow-md"
                    >
                        <FaChevronRight
                            className={`transition-transform duration-300 ${
                                showSidebar ? "" : "rotate-180"
                            }`}
                        />
                    </button>

                    <div className="p-4 pt-6 h-full overflow-y-auto">
                        <h2 className="text-xl font-semibold mb-4">
                            Course Videos
                        </h2>
                        <ul>
                            {courseData?.Course?.Course_Videos?.map(
                                (video, index) => (
                                    <li
                                        key={video.id}
                                        className={`flex items-center justify-between p-4 mb-2 rounded-md cursor-pointer transition-colors duration-200 ${
                                            activeVideoIndex === index ||
                                            videosWatched.includes(index) ||
                                            index === 0
                                                ? "bg-blue-100 text-blue-600"
                                                : "hover:bg-gray-100"
                                        }`}
                                        onClick={() => handleVideoSelect(index)}
                                    >
                                        <div className="flex items-center">
                                            <FaPlay className="mr-3 text-blue-500" />
                                            <span className="font-semibold mr-2">{`Video ${
                                                index + 1
                                            } : `}</span>
                                            <span className="text-gray-700">
                                                {truncateTitle(video.Title)}
                                            </span>
                                        </div>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                </div>
            </div>

            <div className=" max-w-[80vw] pl-6 py-10">
                <h2 className="text-2xl font-bold text-gray-600 pl-6 mb-4">
                    Reviews
                </h2>

                {courseData?.all_reviews?.map((review) => (
                    <CourseReviewCard key={review?.id} review={review} />
                ))}
            </div>
        </div>
    );
}

export default CourseComponent;
