import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

function Upload_Vedio() {
    const navigate = useNavigate();
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [videoData, setVideoData] = useState(null);
    const [videoAvailable, setVideoAvailable] = useState(true); // Track if video is available
    const videoRef = useRef(null);
    const location = useLocation();
    const CourseId = location.pathname.split("/")[2];
    const VedioId = location.pathname.split("/")[4];

    useEffect(() => {
        const fetchVideo = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `http://localhost:3000/Admin/Courses/${CourseId}/Videos/${VedioId}`,
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
    }, []);

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
                `http://localhost:3000/Admin/upload/Courses/${videoData.Course?.id}/Vedios/${videoData.id}`,
                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            );
            if (response.status == 200) {
                Swal.fire("Success", "Course Deleted Successfully", "success");
                setDeleteLoading(false);
                Navigate(`/Courses/${videoData.Course?.id}`);
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
            <div className="w-full h-[80vh] flex flex-col items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full h-[80vh] flex items-center justify-center">
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
            <div className="w-full h-[80vh] flex items-center justify-center">
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
        <div className="w-full h-screen">
            {/* Only show video player if the video is available */}
            {videoAvailable ? (
                <div className="w-full h-[80vh] bg-black">
                    <video
                        ref={videoRef}
                        className="w-full h-full object-cover"
                        controls
                        onError={handleVideoError} // Handle video loading errors
                    >
                        <source
                            src={`http://localhost:3000${videoData.Video}`} // Video URL
                            type="video/mp4"
                        />
                        Your browser does not support the video tag.
                    </video>
                </div>
            ) : (
                <div className="w-full h-[80vh] flex items-center justify-center">
                    <div className="text-red-600 font-semibold">
                        Video is not available
                    </div>
                </div>
            )}

            {/* Video info & course details */}
            <div className="max-w-4xl mx-auto p-4">
                <div className="mt-4">
                    <h1 className="text-2xl font-bold mb-2">
                        {videoData.Title}
                    </h1>
                    <p className="text-gray-600">
                        Duration: {videoData.Duration}
                    </p>
                    <p className="text-gray-600">
                        Course: {videoData.Course?.Title}
                    </p>
                </div>
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
                {/* Additional course details */}
                <div className="border-t pt-4 mt-4">
                    <h2 className="text-xl font-semibold">
                        Course Information
                    </h2>
                    <p>
                        <strong>Category:</strong> {videoData.Course?.Category}
                    </p>
                    <p>
                        <strong>Price:</strong>
                        {videoData.Course?.Price}
                        {" DA"}
                    </p>
                    <p>
                        <strong>Description:</strong>{" "}
                        {videoData.Course?.Description}
                    </p>
                    <p>
                        <strong>Rating:</strong> {videoData.Course?.Rate} stars
                    </p>
                    <p>
                        <strong>Number of students:</strong>{" "}
                        {videoData.Course?.Students_count}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Upload_Vedio;
