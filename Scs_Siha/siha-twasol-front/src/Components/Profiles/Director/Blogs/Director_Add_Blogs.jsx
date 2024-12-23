import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { useAppContext } from "../../../../AppContext";

function AddBlog() {
    const navigate = useNavigate();
    const { user } = useAppContext();
    const [imagePreview, setImagePreview] = useState(null); // For displaying image preview

    const handleAddBlog = async (values, { setSubmitting, resetForm }) => {
        const formData = new FormData();
        formData.append("Title", values.Title);
        formData.append("Description", values.Description);
        formData.append("ownerId", user.id);
        formData.append("ownerType", "Director");
        formData.append("companyId", user.companyId);

        if (values.image) {
            formData.append("image", values.image);
        }

        try {
            const response = await axios.post(
                `http://localhost:3000/Directors/${user.id}/${user.companyId}/Blogs`,
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    validateStatus: () => true,
                }
            );

            if (response.status === 200) {
                Swal.fire("نجاح", "تم إضافة المقال بنجاح", "success");
                navigate("/Director/Blogs");
                resetForm();
                setImagePreview(null);
            } else {
                Swal.fire(
                    "خطأ",
                    response.data.message || "فشل في إضافة المقال",
                    "error"
                );
            }
        } catch (error) {
            Swal.fire("خطأ", "حدث خطأ ما. حاول مرة أخرى.", "error");
        } finally {
            setSubmitting(false);
        }
    };

    const handleImageChange = (e, setFieldValue) => {
        const file = e.target.files[0];
        if (file) {
            setFieldValue("image", file);
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg py-12 px-8 bg-white shadow-lg rounded-lg text-right">
                <h2 className="text-3xl font-semibold mb-6 text-gray-800">
                    إضافة مقال جديد
                </h2>

                <Formik
                    initialValues={{
                        Title: "",
                        Description: "",
                        image: null,
                    }}
                    validate={(values) => {
                        const errors = {};
                        if (!values.Title) errors.Title = "العنوان مطلوب";
                        if (!values.Description)
                            errors.Description = "الوصف مطلوب";
                        return errors;
                    }}
                    onSubmit={handleAddBlog}
                >
                    {({ isSubmitting, setFieldValue }) => (
                        <Form className="flex flex-col gap-4">
                            <div>
                                <label className="font-semibold text-sm pb-1 text-gray-700">
                                    العنوان
                                </label>
                                <Field
                                    type="text"
                                    name="Title"
                                    placeholder="أدخل عنوان المقال"
                                    disabled={isSubmitting}
                                    className="w-full border border-gray-300 px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <ErrorMessage
                                    name="Title"
                                    component="div"
                                    style={errorInputMessage}
                                />
                            </div>

                            <div>
                                <label className="font-semibold text-sm pb-1 text-gray-700">
                                    الوصف
                                </label>
                                <Field
                                    as="textarea"
                                    name="Description"
                                    placeholder="أدخل وصف المقال"
                                    disabled={isSubmitting}
                                    className="w-full border border-gray-300 px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <ErrorMessage
                                    name="Description"
                                    component="div"
                                    style={errorInputMessage}
                                />
                            </div>

                            <div>
                                <label className="font-semibold text-sm pb-1 text-gray-700">
                                    صورة المقال
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        handleImageChange(e, setFieldValue)
                                    }
                                    className="w-full border border-gray-300 px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <ErrorMessage
                                    name="image"
                                    component="div"
                                    style={errorInputMessage}
                                />
                            </div>

                            {imagePreview && (
                                <div className="mt-4">
                                    <img
                                        loading="lazy"
                                        src={imagePreview}
                                        alt="معاينة الصورة"
                                        className="w-fit h-48 object-cover rounded-lg shadow-md"
                                    />
                                </div>
                            )}

                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold mt-4 transition duration-200"
                                disabled={isSubmitting}
                            >
                                {isSubmitting
                                    ? "جارٍ الإضافة..."
                                    : "إضافة المقال"}
                            </button>

                            <Link
                                to="/Director/Blogs"
                                className="text-blue-500 hover:underline mt-4 text-sm"
                            >
                                الرجوع إلى قائمة المقالات
                            </Link>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

const errorInputMessage = {
    fontSize: "12px",
    color: "red",
    marginTop: "4px",
};

export default AddBlog;
