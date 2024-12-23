import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Upload, File, X, FileText } from "lucide-react";
import { useAppContext } from "../../../../../AppContext";
function Add_File() {
    const { user } = useAppContext();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [file, setFile] = useState(null);
    const [dragging, setDragging] = useState(false);
    const fileInputRef = useRef(null);
    const [progress, setProgress] = useState(0);
    const [Title, setTitle] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const location = useLocation();
    const maladId = location.pathname.split("/")[3]; // Adjust based on URL

    const MAX_FILE_SIZE = 512 * 1024 * 1024; // 500MB limit

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.size > MAX_FILE_SIZE) {
                Swal.fire({
                    icon: "error",
                    Title: "الملف كبير جدًا",
                    text: "أقصى حجم مسموح به هو 500 ميقابايت.",
                    confirmButtonColor: "#3085d6",
                });
                return;
            }
            setFile(file);
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragging(false);
        const file = event.dataTransfer.files[0];
        if (file) {
            if (file.size > MAX_FILE_SIZE) {
                Swal.fire({
                    icon: "error",
                    Title: "الملف كبير جدًا",
                    text: "أقصى حجم مسموح به هو 500 ميقابايت.",
                    confirmButtonColor: "#3085d6",
                });
                return;
            }
            setFile(file);
        }
    };

    const handleUpload = () => {
        if (file) {
            setIsUploading(true);
            const formData = new FormData();
            formData.append("file", file);
            formData.append("Title", Title);

            axios
                .post(
                    `http://localhost:3000/Doctors/${user.id}/Malads/${maladId}/Files`,
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
                    
                    if (response.status === 201) {
                        Swal.fire({
                            icon: "success",
                            Title: "تم التحميل بنجاح",
                            text: response.data.message,
                            confirmButtonColor: "#3085d6",
                        }).then(() => {
                            window.location.reload();
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            Title: "فشل التحميل",
                            text:
                                response.data.message +
                                " : " +
                                response.data.error,
                            confirmButtonColor: "#3085d6",
                        });
                    }
                    setProgress(0);
                    setFile(null);
                    setIsUploading(false);
                })
                .catch((error) => {
                    if (error.response && error.response.status === 413) {
                        Swal.fire({
                            icon: "error",
                            Title: "الملف كبير جدًا : الحد الأقصى 500 ميقابايت",
                            text: error.message,
                            confirmButtonColor: "#3085d6",
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            Title: "فشل التحميل",
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
                Title: "لم يتم اختيار ملف",
                text: "يرجى اختيار ملف لتحميله.",
                confirmButtonColor: "#3085d6",
            });
        }
    };

    return (
        <div>
            <div className="flex flex-col items-center justify-center min-h-[40vh] p-4">
                <Link
                    to={`/Doctor/Malads/Own/${maladId}`}
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
                    العودة  
                </Link>

                <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl">
                    <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                        رفع الملف 
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
                        {file ? (
                            <div className="flex flex-col items-center">
                                <File
                                    size={48}
                                    className="text-blue-500 mb-2"
                                />
                                <p className="font-semibold text-lg text-gray-700">
                                    {file.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {Math.round(file.size / 1024 / 1024)} ميقابايت
                                </p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center">
                                <Upload
                                    size={48}
                                    className="text-gray-400 mb-2"
                                />
                                <p className="text-lg text-gray-600">
                                    اسحب وأفلت الملف هنا
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                    أو انقر لاختيار الملف
                                </p>
                            </div>
                        )}
                    </div>

                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileSelect}
                    />

                    {file && (
                        <div className="mt-6 space-y-4">
                            <input
                                type="text"
                                placeholder="أدخل عنوان الملف"
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                value={Title}
                                onChange={(e) => setTitle(e.target.value)}
                                disabled={isUploading}
                            />

                            <div className="flex justify-between">
                                <button
                                    className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-300 disabled:opacity-50"
                                    onClick={() => setFile(null)}
                                    disabled={isUploading}
                                >
                                    <X size={20} className="mr-2" />
                                    إزالة الملف
                                </button>

                                <button
                                    className={`flex items-center justify-center ${
                                        isUploading
                                            ? "bg-gray-400"
                                            : "bg-green-500 hover:bg-green-600"
                                    } text-white px-4 py-2 rounded-md transition duration-300`}
                                    onClick={handleUpload}
                                    disabled={isUploading}
                                >
                                    <FileText size={20} className="mr-2" />
                                    {isUploading
                                        ? "جاري التحميل..."
                                        : "رفع الملف"}
                                </button>
                            </div>

                            {isUploading && (
                                <div className="mt-4">
                                    <div className="w-full bg-gray-200 rounded-full h-4">
                                        <div
                                            className="bg-blue-500 h-4 rounded-full"
                                            style={{ width: `${progress}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-center text-gray-500 mt-2">
                                        {progress}%
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Add_File;
