import { useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { PDFDocument } from "pdf-lib";
import axios from "axios";
import {
    Upload,
    FileText,
    X,
} from "lucide-react";
import Swal from "sweetalert2";
import { useAppContext } from "../../../AppContext";
import { FaMoneyBillWave } from "react-icons/fa";

const AddSummary = () => {
    const [summaryFile, setSummaryFile] = useState(null);
    const [dragging, setDragging] = useState(false);
    const [progress, setProgress] = useState(0);
    const [summaryPages, setSummaryPages] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);
    const { user } = useAppContext();

    const handleFileSelect = async (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            setSummaryFile(file);
            await extractPagesFromPDF(file);
        } else {
            showAlert("Invalid File", "Please upload a valid PDF file.");
        }
    };

    const handleDrop = async (event) => {
        event.preventDefault();
        setDragging(false);
        const file = event.dataTransfer.files[0];
        if (file && file.type === "application/pdf") {
            setSummaryFile(file);
            await extractPagesFromPDF(file);
        } else {
            showAlert("Invalid File", "Please upload a valid PDF file.");
        }
    };

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
            showAlert("Error", "Could not extract page count from the PDF.");
        }
    };

    const showAlert = (title, message) => {
        // Implement your alert logic here (e.g., using a modal or toast notification)
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex items-center justify-center p-6">
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl">
                <h1 className="text-3xl font-bold text-indigo-700 mb-6">
                    Add Summary
                </h1>

                <Formik
                    initialValues={{
                        Title: "",
                        Description: "",
                        Price: 0,
                        Category: "",
                        TeacherId: user?.id,
                    }}
                    validate={(values) => {
                        const errors = {};

                        if (!values.Title) {
                            errors.Title = "First Name is Required";
                        } else if (values.Title.length < 3)
                            errors.Title = " At least 3 chars";
                        else if (values.Title.length > 30)
                            errors.Title = " At most 30 chars";
                        if (!values.Description) {
                            errors.Description = "Last Name is Required";
                        } else if (values.Description.length < 3)
                            errors.Description = " At least 3 chars";
                        else if (values.Description.length > 30)
                            errors.Description = " At most 30 chars";
                        else if (values.Price < 0)
                            errors.Price = "Price must be positive";
                        else if (isNaN(values.Price))
                            errors.Price = "Price must be a number";
                        if (!values.Category) {
                            errors.Category = "Category is Required";
                        }

                        return errors;
                    }}
                    onSubmit={async (values, { setSubmitting }) => {
                        // setSubmitting(false);
                        if (!values.TeacherId) {
                            setSubmitting(false);
                            Swal.fire(
                                "Error",
                                "Unauthorized: missing userId",
                                "error"
                            );
                        } else {
                            try {
                                // add_Summary(values, { setSubmitting });
                                if (summaryFile) {
                                    setIsUploading(true); // Disable buttons during upload
                                    const formData = new FormData();
                                    formData.append("Resume", summaryFile);
                                    formData.append("Title", values.Title);
                                    formData.append(
                                        "Description",
                                        values.Description
                                    );
                                    formData.append("Price", values.Price);
                                    formData.append(
                                        "Category",
                                        values.Category
                                    );
                                    formData.append(
                                        "Pages_Count",
                                        summaryPages
                                    ); // Send page count
                                    formData.append("TeacherId", user?.id);

                                    axios
                                        .post(
                                            `http://localhost:3000/upload/Summaries/`,
                                            formData,
                                            {
                                                withCredentials: true,
                                                validateStatus: () => true,
                                                headers: {
                                                    "Content-Type":
                                                        "multipart/form-data",
                                                },
                                                onUploadProgress: (
                                                    progressEvent
                                                ) => {
                                                    const percentCompleted =
                                                        Math.round(
                                                            (progressEvent.loaded *
                                                                100) /
                                                                progressEvent.total
                                                        );
                                                    setProgress(
                                                        percentCompleted
                                                    );
                                                },
                                            }
                                        )
                                        .then((response) => {
                                            if (response.status == 200) {
                                                // Swal.fire(
                                                //     "Success",
                                                //     `Upload Success: ${response.data.message}`,
                                                //     "success"
                                                // );
                                                setProgress(0); // Reset progress after successful upload
                                                setSummaryFile(null); // Clear file after success
                                                setIsUploading(false); // Re-enable buttons
                                                window.location.href =
                                                    "/Teacher/Summaries";
                                            } else if (response.status == 401) {
                                                setSubmitting(false);
                                                Swal.fire(
                                                    "Error!",
                                                    `${response.data.message} `,
                                                    "error"
                                                );
                                                window.location.reload(); // Refresh page after failed upload
                                            } else {
                                                setSubmitting(false);
                                                Swal.fire(
                                                    "Error",
                                                    `${response.data.message} `,
                                                    "error"
                                                );
                                                window.location.reload(); // Refresh page after failed upload
                                            }
                                        })
                                        .catch((error) => {
                                            Swal.fire(
                                                "Error",
                                                "Upload failed. Please try again.",
                                                "error"
                                            );
                                            window.location.reload(); // Refresh page after failed upload
                                            setIsUploading(false); // Re-enable buttons even on failure
                                        });
                                } else {
                                    Swal.fire(
                                        "No File",
                                        "Please select a summary to upload.",
                                        "error"
                                    );
                                    window.location.reload(); // Refresh page after failed upload
                                }
                            } catch (error) {
                                setSubmitting(false);

                                Swal.fire(
                                    "Error!",
                                    `Something Went Wrong ,please trye again latter`,
                                    "error"
                                );
                                window.location.reload(); // Refresh page after failed upload
                            }
                        }
                    }}
                >
                    {({ isSubmitting, values, setFieldValue }) => (
                        <Form className="space-y-6">
                            <div>
                                <label
                                    htmlFor="Title"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Title
                                </label>
                                <Field
                                    type="text"
                                    name="Title"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Enter summary title"
                                />
                                <ErrorMessage
                                    name="Title"
                                    component="div"
                                    className="mt-1 text-sm text-red-600"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="Description"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Description
                                </label>
                                <Field
                                    as="textarea" // Use 'as' to specify the HTML element
                                    rows="4" // Specify the number of rows
                                    name="Description"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Enter summary description"
                                />

                                <ErrorMessage
                                    name="Description"
                                    component="div"
                                    className="mt-1 text-sm text-red-600"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="flex items-center text-gray-700 font-semibold mb-2">
                                        <FaMoneyBillWave className="mr-2 text-blue-500" />
                                        Price
                                    </label>
                                    <div className="flex items-center space-x-4">
                                        <Field
                                            type="number"
                                            name="Price"
                                            placeholder="Set your price"
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setFieldValue("Price", 0)
                                            }
                                            className={`px-4 py-2 rounded-lg font-semibold transition ${
                                                values.Price === 0
                                                    ? "bg-green-500 text-white"
                                                    : "bg-gray-200 text-gray-700 hover:bg-green-500 hover:text-white"
                                            }`}
                                        >
                                            Free
                                        </button>
                                    </div>
                                    <ErrorMessage
                                        name="Price"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="Category"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Category
                                    </label>
                                    <Field
                                        type="text"
                                        name="Category"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Enter category"
                                    />
                                    <ErrorMessage
                                        name="Category"
                                        component="div"
                                        className="mt-1 text-sm text-red-600"
                                    />
                                </div>
                            </div>

                            <div
                                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                                    dragging
                                        ? "border-indigo-500 bg-indigo-50"
                                        : "border-gray-300 hover:border-indigo-400"
                                }`}
                                onDragOver={(e) => {
                                    e.preventDefault();
                                    setDragging(true);
                                }}
                                onDragLeave={() => setDragging(false)}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current.click()}
                            >
                                {summaryFile ? (
                                    <div className="flex flex-col items-center">
                                        <FileText
                                            size={48}
                                            className="text-indigo-500 mb-2"
                                        />
                                        <p className="text-lg font-semibold">
                                            {summaryFile.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {Math.round(
                                                summaryFile.size / 1024 / 1024
                                            )}{" "}
                                            MB • {summaryPages} pages
                                        </p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center">
                                        <Upload
                                            size={48}
                                            className="text-gray-400 mb-2"
                                        />
                                        <p className="text-lg">
                                            Drag & Drop your PDF here
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            or click to select a file
                                        </p>
                                    </div>
                                )}
                            </div>

                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="application/pdf"
                                onChange={handleFileSelect}
                            />

                            {summaryFile && (
                                <div className="flex justify-between items-center">
                                    <button
                                        type="button"
                                        onClick={() => setSummaryFile(null)}
                                        className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                                        disabled={isUploading}
                                    >
                                        <X size={16} className="mr-2" /> Remove
                                        File
                                    </button>
                                    {progress > 0 && (
                                        <div className="w-1/2">
                                            <div className="bg-gray-200 rounded-full h-2.5">
                                                <div
                                                    className="bg-indigo-600 h-2.5 rounded-full"
                                                    style={{
                                                        width: `${progress}%`,
                                                    }}
                                                ></div>
                                            </div>
                                            <p className="text-right text-sm text-gray-500 mt-1">
                                                {progress}%
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}

                            <button
                                type="submit"
                                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                                    isSubmitting
                                        ? "bg-indigo-400 cursor-not-allowed"
                                        : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                }`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Uploading..." : "Add Summary"}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default AddSummary;
