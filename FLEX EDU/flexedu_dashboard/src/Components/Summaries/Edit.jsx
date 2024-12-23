import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import PDFReader from "./PdfReader"; // Assuming you have this component

function EditSummary() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [summary, setSummary] = useState({
        Title: "",
        Description: "",
        Price: "",
        Category: "",
        Image: null,
        file_link: null,
        Pages_Count: 0,
    });
    const [imagePreview, setImagePreview] = useState(null); // For image preview
    const [pdfPreview, setPdfPreview] = useState(null); // For PDF preview

    const location = useLocation();
    const summaryId = location.pathname.split("/")[2];

    useEffect(() => {
        const fetchSummary = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `http://localhost:3000/Admin/Summaries/${summaryId}`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );
                if (response.status === 200) {
                    setSummary(response.data.Summary);
                } else if (response.status === 401) {
                    Swal.fire("Error", "You should log in again", "error");
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
        fetchSummary();
    }, [summaryId, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSummary((prevSummary) => ({
            ...prevSummary,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setSummary((prevSummary) => ({
            ...prevSummary,
            [name]: files[0],
        }));

        if (name === "Image") {
            const file = files[0];
            setImagePreview(URL.createObjectURL(file)); // Preview for image
        }

        if (name === "file_link") {
            const file = files[0];
            setPdfPreview(URL.createObjectURL(file)); // Preview for PDF
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append("Title", summary.Title);
        formData.append("Description", summary.Description);
        formData.append("Price", summary.Price);
        formData.append("Category", summary.Category);
        if (summary.Image) formData.append("Image", summary.Image);
        if (summary.file_link) formData.append("file_link", summary.file_link);
        formData.append("Pages_Count", summary.Pages_Count);

        try {
            const response = await axios.put(
                `http://localhost:3000/Admin/Summaries/${summaryId}`,
                formData,
                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            );
            if (response.status === 200) {
                Swal.fire("Success", "Summary updated successfully", "success");
                navigate("/Summaries");
            } else {
                Swal.fire("Error", response.data.message, "error");
            }
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
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
            <div className="w-screen h-[calc(100vh-60px)] flex items-center justify-center">
                <div className="text-red-600 font-semibold">
                    {error.message}
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-4">
            <div className="flex flex-col gap-2">
                <label htmlFor="Title" className="font-semibold">
                    Title
                </label>
                <input
                    type="text"
                    id="Title"
                    name="Title"
                    value={summary.Title}
                    onChange={handleInputChange}
                    className="p-2 border border-gray-300 rounded-md"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="Description" className="font-semibold">
                    Description
                </label>
                <textarea
                    id="Description"
                    name="Description"
                    value={summary.Description}
                    onChange={handleInputChange}
                    className="p-2 border border-gray-300 rounded-md"
                ></textarea>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="Price" className="font-semibold">
                    Price
                </label>
                <input
                    type="number"
                    id="Price"
                    name="Price"
                    value={summary.Price}
                    onChange={handleInputChange}
                    className="p-2 border border-gray-300 rounded-md"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="Category" className="font-semibold">
                    Category
                </label>
                <input
                    type="text"
                    id="Category"
                    name="Category"
                    value={summary.Category}
                    onChange={handleInputChange}
                    className="p-2 border border-gray-300 rounded-md"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="Image" className="font-semibold">
                    Image
                </label>
                <input
                    type="file"
                    id="Image"
                    name="Image"
                    onChange={handleFileChange}
                    className="p-2 border border-gray-300 rounded-md"
                />
            </div>

            {/* Image Preview Section */}
            {imagePreview && (
                <div className="flex flex-col gap-2">
                    <label className="font-semibold">Image Preview:</label>
                    <img
                        src={imagePreview}
                        alt="Selected"
                        className="w-32 h-32 object-cover"
                    />
                </div>
            )}

            <div className="flex flex-col gap-2">
                <label htmlFor="file_link" className="font-semibold">
                    File Link (PDF)
                </label>
                <input
                    type="file"
                    id="file_link"
                    name="file_link"
                    onChange={handleFileChange}
                    className="p-2 border border-gray-300 rounded-md"
                />
            </div>

            {/* PDF Preview Section */}
            {pdfPreview && (
                <div className="flex flex-col gap-2">
                    <label className="font-semibold">PDF Preview:</label>
                    <PDFReader fileUrl={pdfPreview} />
                </div>
            )}

            <div className="flex flex-col gap-2">
                <label htmlFor="Pages_Count" className="font-semibold">
                    Pages Count
                </label>
                <input
                    type="number"
                    id="Pages_Count"
                    name="Pages_Count"
                    value={summary.Pages_Count}
                    onChange={handleInputChange}
                    className="p-2 border border-gray-300 rounded-md"
                />
            </div>

            <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-md font-semibold"
            >
                Update Summary
            </button>
        </form>
    );
}

export default EditSummary;
