import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { useAppContext } from "../../../../AppContext";

function EditBlog() {
    const navigate = useNavigate();
    const location = useLocation();
    const blogId = location.pathname.split("/")[3];
    const { user } = useAppContext();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [blog, setBlog] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        setLoading(true);

        const fetchBlog = async () => {
            try {
                const blogResponse = await axios.get(
                    `http://localhost:3000/Directors/${user.id}/${user.companyId}/Blogs/${blogId}`,
                    { withCredentials: true, validateStatus: () => true }
                );

                if (blogResponse.status === 200) {
                    setBlog(blogResponse.data.blog);
                    setImagePreview(
                        blogResponse.data.blog.image_link
                            ? `http://localhost:3000${blogResponse.data.blog.image_link}`
                            : null
                    );
                } else if (blogResponse.status === 401) {
                    Swal.fire("خطأ", "يرجى تسجيل الدخول مرة أخرى", "error");
                    navigate("/Login");
                } else {
                    setError(blogResponse.data.message);
                }
            } catch (fetchError) {
                setError("فشل في جلب البيانات. حاول مرة أخرى.");
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [user.id, user.companyId, blogId, navigate]);

    const handleEditBlog = async (values, { setSubmitting }) => {
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
            const response = await axios.put(
                `http://localhost:3000/Directors/${user.id}/${user.companyId}/Blogs/${blogId}`,
                formData,
                {
                    withCredentials: true,
                    headers: { "Content-Type": "multipart/form-data" },
                    validateStatus: () => true,
                }
            );
            
            if (response.status === 200) {
                Swal.fire("نجاح", "تم تحديث المقال بنجاح", "success");
                navigate(`/Director/Blogs/${blogId}`);
            } else {
                Swal.fire("خطأ", response.data.message || "حدث خطأ", "error");
            }
        } catch (error) {
            Swal.fire("خطأ", "حدث خطأ. حاول مرة أخرى.", "error");
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

    if (loading) {
        return (
            <div className="w-[100vw] h-[80vh] flex items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-[100vw] h-screen flex items-center justify-center">
                <div className="text-red-600 font-semibold">{error}</div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="w-[100vw] h-screen flex items-center justify-center">
                <div className="text-red-600 font-semibold">
                    لم يتم العثور على المقال
                </div>
                <Link to="/Director/Blogs">
                    <button className="bg-blue_v py-2 px-4 mt-4 rounded-2xl text-white font-semibold">
                        العودة إلى قائمة المقالات
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <div className="flex text-right">
            <div className="w-full overflow-y-auto py-12 bg-white flex flex-col items-center justify-center">
                <div className="w-[80%] text-black">
                    <h2 className="text-3xl font-semibold mb-6">
                        تعديل المقال
                    </h2>
                    <Formik
                        initialValues={{
                            Title: blog.Title || "",
                            Description: blog.Description || "",
                            image: null,
                        }}
                        validate={(values) => {
                            const errors = {};
                            if (!values.Title) errors.Title = "العنوان مطلوب";
                            if (!values.Description)
                                errors.Description = "الوصف مطلوب";
                            return errors;
                        }}
                        onSubmit={handleEditBlog}
                    >
                        {({ isSubmitting, setFieldValue }) => (
                            <Form className="flex flex-col gap-4">
                                <div>
                                    <label className="font-semibold text-sm">
                                        العنوان
                                    </label>
                                    <Field
                                        type="text"
                                        name="Title"
                                        placeholder="أدخل عنوان المقال"
                                        disabled={isSubmitting}
                                        className="w-full border px-4 py-2 rounded-lg text-sm"
                                    />
                                    <ErrorMessage
                                        name="Title"
                                        component="div"
                                        style={errorInputMessage}
                                    />
                                </div>

                                <div>
                                    <label className="font-semibold text-sm">
                                        الوصف
                                    </label>
                                    <Field
                                        as="textarea"
                                        name="Description"
                                        placeholder="أدخل وصف المقال"
                                        disabled={isSubmitting}
                                        className="w-full border px-4 py-2 rounded-lg text-sm"
                                    />
                                    <ErrorMessage
                                        name="Description"
                                        component="div"
                                        style={errorInputMessage}
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="font-semibold text-sm">
                                        الصورة
                                    </label>
                                    {imagePreview ? (
                                        <img
                                            loading="lazy"
                                            src={imagePreview}
                                            alt="معاينة الصورة"
                                            className="w-fit h-48 object-cover rounded-lg shadow-md mb-4"
                                        />
                                    ) : (
                                        <p className="text-gray-500 text-sm">
                                            لم يتم اختيار صورة
                                        </p>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            handleImageChange(e, setFieldValue)
                                        }
                                        className="w-full border px-4 py-2 rounded-lg text-sm"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="bg-blue_v py-2 mt-4 rounded-2xl text-white font-semibold"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting
                                        ? "جارٍ التحديث..."
                                        : "تحديث المقال"}
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}

const errorInputMessage = {
    fontSize: "12px",
    color: "red",
};

export default EditBlog;
