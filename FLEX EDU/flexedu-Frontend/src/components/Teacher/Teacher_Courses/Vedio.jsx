import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { useAppContext } from "../../../AppContext";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

function Vedio_Component() {
    const navigate = useNavigate();
    const Navigate = useNavigate();
    const { user } = useAppContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [videoData, setVideoData] = useState(null);
    const [videoAvailable, setVideoAvailable] = useState(true); // Track if video is available
    const videoRef = useRef(null);
    const location = useLocation();
    const CourseId = location.pathname.split("/")[3];
    const VedioId = location.pathname.split("/")[5];

    useEffect(() => {
        const fetchVideo = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `http://localhost:3000/Teachers/${user?.id}/Courses/${CourseId}/Videos/${VedioId}`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );

                if (response.status === 200 && response.data.Vedio) {
                    setVideoData(response.data.Vedio);
                } else {
                    setVideoAvailable(false); // Video not found
                    setError({ message: "Video not found or unavailable" });
                }
            } catch (error) {
                // Handle errors purely on the frontend
                setError({
                    message:
                        "An unexpected error occurred while loading the video",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchVideo();
    }, [CourseId, VedioId, user?.id, navigate]);

    const handleVideoError = () => {
        setVideoAvailable(false); // Hide video player on error
        setError({
            message: "Video source is unavailable. Please try again later.",
        });
    };
    const [delete_loading, setDeleteLoading] = useState(false);
    const DeleteVedio = async () => {
        setDeleteLoading(true);
        try {
            const response = await axios.delete(
                `http://localhost:3000/upload/Courses/${videoData.Course?.id}/Vedios/${videoData.id}`,
                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            );
            if (response.status == 200) {
                Swal.fire("Success", "Course Deleted Successfully", "success");
                setDeleteLoading(false);
                Navigate(`/Teacher/Courses/${videoData.Course?.id}`);
            } else {
                Swal.fire("Error", response.data.message, "error");
                setDeleteLoading(false);
            }
        } catch (error) {
            Swal.fire("Error", error.message, "error");
            setDeleteLoading(false);
        }
    };
    if (loading) {
        return (
            <div className="w-screen h-[80vh] flex flex-col items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-screen h-[80vh] flex items-center justify-center">
                <div className="text-red-600 font-semibold">
                    {error.message || "An error occurred"}
                    {delete_loading ? (
                        <div className="flex justify-center w-fit m-auto mt-6 ">
                            <span className="small-loader"></span>
                        </div>
                    ) : (
                        <div
                            onClick={() => DeleteVedio()}
                            className="bg-red-500 px-3 py-2 text-center rounded-md cursor-pointer w-fit m-auto mt-6
                                                         text-white font-semibold text-base"
                        >
                            Delete Vedio
                        </div>
                    )}
                </div>
            </div>
        );
    }

    if (!videoData) {
        return (
            <div className="w-screen h-[80vh] flex items-center justify-center">
                <div className="text-gray-600 font-semibold">
                    Video data is missing
                    {delete_loading ? (
                        <div className="flex justify-center w-fit m-auto mt-6 ">
                            <span className="small-loader"></span>
                        </div>
                    ) : (
                        <div
                            onClick={() => DeleteVedio()}
                            className="bg-red-500 px-3 py-2 text-center rounded-md cursor-pointer w-fit m-auto mt-6
                                                         text-white font-semibold text-base"
                        >
                            Delete Vedio
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="w-screen  pt-5">
            {/* Only show video player if the video is available */}
            {videoAvailable ? (
                <div className="relative w-[80%] h-[80%] mx-auto   bg-gray-900 overflow-hidden rounded-lg shadow-lg">
                    {/* Gradient Overlay */}
                    {/* Video Element */}
                    <video
                        ref={videoRef}
                        className="w-full h-full object-cover"
                        controls
                        onError={handleVideoError}
                        poster={videoData.thumbnailUrl || ""}
                    >
                        <source
                            src={`http://localhost:3000${videoData.Video}`}
                            type="video/mp4"
                        />
                        Your browser does not support the video tag.
                    </video>

                    {/* Video Title and Course Information */}

                    {/* Duration Badge */}
                    <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full text-sm shadow-lg">
                        {videoData.Duration}
                    </div>

                    {/* Play Button Overlay */}
                </div>
            ) : (
                <div className="w-screen h-[80vh] flex items-center justify-center">
                    <div className="text-red-600 font-semibold">
                        Video is not available
                    </div>
                </div>
            )}

            {/* Video info & course details */}
            {/* Video info & course details */}
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
                {/* Video Title and Duration */}
                <div className="flex flex-col mb-4">
                    <h1 className="text-3xl font-bold text-gray-800">
                        {videoData.Title}
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Duration: {videoData.Duration}
                    </p>
                    <p className="text-gray-600">
                        Course: {videoData.Course?.Title}
                    </p>
                </div>

                {/* Delete Video Button */}
                {delete_loading ? (
                    <div className="flex justify-center w-fit m-auto mt-6">
                        <span className="small-loader"></span>
                    </div>
                ) : (
                    <button
                        onClick={() => DeleteVedio()}
                        className="bg-red-500 hover:bg-red-600 transition duration-300 px-5 py-2 rounded-md text-white font-semibold shadow-md focus:outline-none"
                    >
                        Delete Video
                    </button>
                )}

                {/* Additional Course Details */}
                <div className="border-t pt-6 mt-4">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Course Information
                    </h2>
                    <div className="mt-2 space-y-2">
                        <p>
                            <strong className="text-gray-700">Category:</strong>{" "}
                            {videoData.Course?.Category}
                        </p>
                        <p>
                            <strong className="text-gray-700">Price:</strong>{" "}
                            {videoData.Course?.Price} DA
                        </p>
                        <p>
                            <strong className="text-gray-700">
                                Description:
                            </strong>{" "}
                            {videoData.Course?.Description}
                        </p>
                        <p>
                            <strong className="text-gray-700">Rating:</strong>{" "}
                            {videoData.Course?.Rate.toFixed(1) || 0} stars
                        </p>
                        <p>
                            <strong className="text-gray-700">
                                Number of students:
                            </strong>{" "}
                            {videoData.Course?.Students_count}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Vedio_Component;
