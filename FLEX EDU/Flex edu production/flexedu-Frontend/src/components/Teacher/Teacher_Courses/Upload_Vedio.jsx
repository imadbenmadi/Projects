import { useState, useRef } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Upload, FileVideo, X, PlayCircle } from "lucide-react";

function Upload_Video() {
    const [videoFile, setVideoFile] = useState(null);
    const [dragging, setDragging] = useState(false);
    const fileInputRef = useRef(null);
    const [progress, setProgress] = useState(0);
    const [Title, setTitle] = useState("");
    const [videoDuration, setVideoDuration] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const location = useLocation();
    const CourseId = location.pathname.split("/")[3];

    const MAX_FILE_SIZE = 2 * 1024 * 1024 * 1024; // 2GB limit

    const formatDuration = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);
        return `${h > 0 ? h + ":" : ""}${m > 9 ? m : "0" + m}:${
            s > 9 ? s : "0" + s
        }`;
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith("video/")) {
            if (file.size > MAX_FILE_SIZE) {
                Swal.fire({
                    icon: "error",
                    title: "File Too Large",
                    text: "Maximum size allowed is 2GB.",
                    confirmButtonColor: "#3085d6",
                });
                return;
            }
            setVideoFile(file);
            const videoURL = URL.createObjectURL(file);
            const video = document.createElement("video");
            video.src = videoURL;
            video.onloadedmetadata = () => {
                const duration = formatDuration(video.duration);
                setVideoDuration(duration);
                URL.revokeObjectURL(videoURL);
            };
        } else {
            Swal.fire({
                icon: "error",
                title: "Invalid File",
                text: "Please upload a valid video file.",
                confirmButtonColor: "#3085d6",
            });
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragging(false);
        const file = event.dataTransfer.files[0];
        if (file && file.type.startsWith("video/")) {
            if (file.size > MAX_FILE_SIZE) {
                Swal.fire({
                    icon: "error",
                    title: "File Too Large",
                    text: "Maximum size allowed is 2GB.",
                    confirmButtonColor: "#3085d6",
                });
                return;
            }
            setVideoFile(file);
            const videoURL = URL.createObjectURL(file);
            const video = document.createElement("video");
            video.src = videoURL;
            video.onloadedmetadata = () => {
                const duration = formatDuration(video.duration);
                setVideoDuration(duration);
                URL.revokeObjectURL(videoURL);
            };
        } else {
            Swal.fire({
                icon: "error",
                title: "Invalid File",
                text: "Please upload a valid video file.",
                confirmButtonColor: "#3085d6",
            });
        }
    };

    const handleUpload = () => {
        if (videoFile) {
            setIsUploading(true);
            const formData = new FormData();
            formData.append("CourseVedio", videoFile);
            formData.append("Title", Title);
            formData.append("Duration", videoDuration);

            axios
                .post(
                    `https://api.flexedu-dz.com/upload/Courses/${CourseId}/Vedio`,
                    formData,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                        onUploadProgress: (progressEvent) => {
                            const percentCompleted = Math.round(
                                (progressEvent.loaded * 100) /
                                    progressEvent.total
                            );
                            setProgress(percentCompleted);
                        },
                    }
                )
                .then((response) => {

                    if (response.status === 200) {
                        Swal.fire({
                            icon: "success",
                            title: "Upload Successful",
                            text: response.data.message,
                            confirmButtonColor: "#3085d6",
                        }).then(() => {
                            // navigate("/Teacher/Courses");
                            window.location.reload();
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Upload Failed",
                            text:
                                response.data.message +
                                " : " +
                                response.data.error,
                            confirmButtonColor: "#3085d6",
                        }).then(() => {});
                    }
                    setProgress(0);
                    setVideoFile(null);
                    setIsUploading(false);
                })
                .catch((error) => {
                    if (error.response && error.response.status === 413) {
                        Swal.fire({
                            icon: "error",
                            title: "File Too Large : Max 2GB",
                            text: error.message,

                            confirmButtonColor: "#3085d6",
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Upload Failed",
                            text: error.message,
                            confirmButtonColor: "#3085d6",
                        });
                    }
                    setIsUploading(false);
                    window.location.reload();
                });
        } else {
            Swal.fire({
                icon: "warning",
                title: "No Video Selected",
                text: "Please select a video to upload.",
                confirmButtonColor: "#3085d6",
            });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <Link
                to={`/Teacher/Courses/${CourseId}`}
                className="text-blue-600 hover:text-blue-800 mb-6 flex items-center"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                        clipRule="evenodd"
                    />
                </svg>
                Go back to Course
            </Link>

            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                    Upload Course Video
                </h2>

                <div
                    className={`border-4 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300 ${
                        dragging
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-300 hover:border-blue-400"
                    }`}
                    onDragOver={(e) => {
                        e.preventDefault();
                        setDragging(true);
                    }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current.click()}
                >
                    {videoFile ? (
                        <div className="flex flex-col items-center">
                            <FileVideo
                                size={48}
                                className="text-blue-500 mb-2"
                            />
                            <p className="font-semibold text-lg text-gray-700">
                                {videoFile.name}
                            </p>
                            <p className="text-sm text-gray-500">
                                {Math.round(videoFile.size / 1024 / 1024)} MB
                            </p>
                            {videoDuration && (
                                <p className="text-sm text-gray-500 mt-1">
                                    Duration: {videoDuration}
                                </p>
                            )}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center">
                            <Upload size={48} className="text-gray-400 mb-2" />
                            <p className="text-lg text-gray-600">
                                Drag & Drop your video here
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                                or click to select a file
                            </p>
                        </div>
                    )}
                </div>

                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="video/*"
                    onChange={handleFileSelect}
                />

                {videoFile && (
                    <div className="mt-6 space-y-4">
                        <input
                            type="text"
                            placeholder="Enter Video Title"
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            value={Title}
                            onChange={(e) => {
                                const input = e.target.value;
                                if (input.length <= 50) {
                                    setTitle(input);
                                }
                            }}
                            disabled={isUploading}
                        />

                        <div className="flex justify-between">
                            <button
                                className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-300 disabled:opacity-50"
                                onClick={() => setVideoFile(null)}
                                disabled={isUploading}
                            >
                                <X size={20} className="mr-2" />
                                Remove File
                            </button>

                            <button
                                className={`flex items-center justify-center ${
                                    isUploading
                                        ? "bg-gray-400"
                                        : "bg-green-500 hover:bg-green-600"
                                } text-white px-4 py-2 rounded-md transition duration-300`}
                                onClick={() => {
                                    setProgress(0);
                                    if (!Title) {
                                        Swal.fire({
                                            icon: "warning",
                                            title: "Title Required",
                                            text: "Please enter a title for the video.",
                                            confirmButtonColor: "#3085d6",
                                        });
                                    } else if (
                                        Title.length < 5 ||
                                        Title.length > 50
                                    ) {
                                        Swal.fire({
                                            icon: "warning",
                                            title: "Invalid Title Length",
                                            text: "Title must be between 5 and 50 characters.",
                                            confirmButtonColor: "#3085d6",
                                        });
                                    } else if (videoFile && Title) {
                                        handleUpload();
                                    }
                                }}
                                disabled={isUploading}
                            >
                                <PlayCircle size={20} className="mr-2" />
                                {isUploading ? "Uploading..." : "Upload Video"}
                            </button>
                        </div>

                        {isUploading && (
                            <div className="mt-4">
                                <div className="w-full bg-gray-200 rounded-full h-4">
                                    <div
                                        className="bg-blue-500 h-4 rounded-full transition-all duration-300 ease-out"
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                                <p className="text-center mt-2 text-gray-600">
                                    {progress}% Uploaded
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Upload_Video;
