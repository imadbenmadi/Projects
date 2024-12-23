import { useState, useRef } from "react";
import axios from "axios";
import { useAppContext } from "../../../AppContext";
import { PDFDocument } from "pdf-lib"; // A library to handle PDFs
import Swal from "sweetalert2";

function Upload_Summary() {
    const { user } = useAppContext();
    const [summaryFile, setSummaryFile] = useState(null); // Store the selected file
    const [dragging, setDragging] = useState(false); // Track drag status
    const fileInputRef = useRef(null); // Ref to access file input
    const [progress, setProgress] = useState(0); // Track progress
    const [Title, setTitle] = useState("");
    const [summaryPages, setSummaryPages] = useState(0); // Track the page count
    const [isUploading, setIsUploading] = useState(false); // Track if the upload is in progress

    // Handle file selection
    const handleFileSelect = async (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            setSummaryFile(file);
            await extractPagesFromPDF(file); // Extract page count
        } else {
            Swal.fire(
                "Invalid File",
                "Please upload a valid PDF file.",
                "error"
            );
        }
    };

    // Handle drag-and-drop functionality
    const handleDrop = async (event) => {
        event.preventDefault();
        setDragging(false);
        const file = event.dataTransfer.files[0];
        if (file && file.type === "application/pdf") {
            setSummaryFile(file);
            await extractPagesFromPDF(file); // Extract page count
        } else {
            Swal.fire(
                "Invalid File",
                "Please upload a valid PDF file.",
                "error"
            );
        }
    };

    // Extract page count from the uploaded PDF
    const extractPagesFromPDF = async (file) => {
        try {
            const fileReader = new FileReader();
            fileReader.onload = async (e) => {
                const pdfBytes = e.target.result;
                const pdfDoc = await PDFDocument.load(pdfBytes);
                const pagesCount = pdfDoc.getPageCount();
                setSummaryPages(pagesCount);
            };
            fileReader.readAsArrayBuffer(file);
        } catch (error) {
            Swal.fire(
                "Error",
                "Could not extract page count from the PDF.",
                "error"
            );
        }
    };

    // Upload summary
    const handleUpload = () => {
        if (summaryFile) {
            setIsUploading(true); // Disable buttons during upload
            const formData = new FormData();
            formData.append("Summary", summaryFile);
            formData.append("Title", Title);
            formData.append("Pages_Count", summaryPages); // Send page count
            formData.append("TeacherId", user?.id);

            axios
                .post(`http://localhost:3000/upload/Summaries/`, formData, {
                    withCredentials: true,
                    validateStatus: () => true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        setProgress(percentCompleted);
                    },
                })
                .then((response) => {
                    Swal.fire(
                        "Success",
                        `Upload Success: ${response.data.message}`,
                        "success"
                    );
                    setProgress(0); // Reset progress after successful upload
                    setSummaryFile(null); // Clear file after success
                    setIsUploading(false); // Re-enable buttons
                })
                .catch((error) => {
                    Swal.fire(
                        "Error",
                        "Upload failed. Please try again.",
                        "error"
                    );
                    setIsUploading(false); // Re-enable buttons even on failure
                });
        } else {
            Swal.fire("No File", "Please select a summary to upload.", "error");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center mt-6 max-w-[90vw] m-auto">
            {/* Drag-and-drop area */}
            <div
                className={`w-full h-48 border-2 border-dashed rounded-lg flex items-center justify-center mb-4 ${
                    dragging ? "border-blue-500 bg-blue-100" : "border-gray-400"
                }`}
                onDragOver={(event) => event.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current.click()} // Trigger file input on click
            >
                {summaryFile ? (
                    <div className="text-center">
                        <p className="font-bold text-lg">{summaryFile.name}</p>
                        <p className="text-sm text-gray-600">
                            {Math.round(summaryFile.size / 1024 / 1024)} MB
                        </p>
                        <p className="text-sm text-gray-600">
                            Pages: {summaryPages}
                        </p>
                    </div>
                ) : (
                    <p className="text-gray-500">
                        Drag & Drop a PDF file here, or click to select one
                    </p>
                )}
            </div>

            {/* Hidden file input */}
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="application/pdf"
                onChange={handleFileSelect}
            />

            {/* Summary info & control buttons */}
            {summaryFile && (
                <div className="flex flex-col items-center w-full">
                    <input
                        type="text"
                        placeholder="Enter Summary Title"
                        className="w-[60%] p-2 border border-gray-400 rounded-md mb-2"
                        value={Title}
                        onChange={(e) => setTitle(e.target.value)}
                        disabled={isUploading} // Disable input while uploading
                    />

                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md mb-2"
                        onClick={() => setSummaryFile(null)}
                        disabled={isUploading} // Disable "Remove" button during upload
                    >
                        Remove File
                    </button>

                    <button
                        className={`${
                            isUploading ? "bg-gray-400" : "bg-green-500"
                        } text-white px-4 py-2 rounded-md`}
                        onClick={handleUpload}
                        disabled={isUploading} // Disable "Upload" button during upload
                    >
                        {isUploading ? "Uploading..." : "Upload Summary"}
                    </button>

                    {/* Progress bar */}
                    <div className="w-[60%] m-auto bg-gray-200 rounded-full h-4 mt-4">
                        <div
                            className="bg-blue-500 h-4 rounded-full"
                            style={{ width: `${progress}%` }} // Update progress width
                        ></div>
                    </div>
                    <p className="mt-2 text-gray-700">{progress}%</p>
                </div>
            )}
        </div>
    );
}

export default Upload_Summary;
