import React, { useState, useEffect } from "react";
import { useAppContext } from "../../../../AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function EditProfile() {
    const { user, set_user } = useAppContext();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        telephone: user?.telephone || "",
        birthDate: user?.birthDate || "",
        adress: user?.adress || "",
        gender: user?.gender || "",
        about: user?.about || "",
    });
    const [profilePic, setProfilePic] = useState(null);
    const [imagePreview, setImagePreview] = useState(user?.profile_pic_link);

    useEffect(() => {
        // Set initial preview if profile picture exists
        if (user?.profile_pic_link) {
            setImagePreview(`http://localhost:3000${user.profile_pic_link}`);
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProfilePic(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            if (key === "birthDate" && formData.birthDate) {
                const formattedDate = new Date(formData.birthDate)
                    .toISOString()
                    .split("T")[0];
                data.append("birthDate", formattedDate);
            } else {
                data.append(key, formData[key]);
            }
        });

        if (profilePic) {
            data.append("profile_pic", profilePic);
        }

        try {
            const response = await axios.put(
                `http://localhost:3000/Doctors/${user.id}/Profile`,
                data,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true,
                }
            );
            

            if (response.status === 200) {
                // Update user context with the latest data, including the new profile image URL
                set_user({
                    ...user,
                    ...formData,
                    profile_pic_link: response.data.user.profile_pic_link,
                });
                navigate("/Doctor/Profile"); // Redirect back to profile page after successful edit
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "حدث خطأ ما!",
                text: "تعذر تحديث الحساب الشخصي.",
            });
        }
    };


    return (
        <div className="max-w-lg mx-auto p-6 mt-6 bg-white shadow-lg rounded-lg border border-gray-200">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                تعديل الحساب الشخصي
            </h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        الاسم الأول
                    </label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        الاسم الأخير
                    </label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        البريد الإلكتروني
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        رقم الهاتف
                    </label>
                    <input
                        type="text"
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        تاريخ الميلاد
                    </label>
                    <input
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        العنوان
                    </label>
                    <input
                        type="text"
                        name="adress"
                        value={formData.adress}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        الجنس
                    </label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                    >
                        <option value="">اختر الجنس</option>
                        <option value="male">ذكر</option>
                        <option value="female">أنثى</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        نبذة
                    </label>
                    <textarea
                        name="about"
                        value={formData.about}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        صورة الملف الشخصي
                    </label>
                    {imagePreview ? (
                        <img
                            loading="lazy"
                            src={imagePreview}
                            alt="Profile Preview"
                            className="w-32 h-32 object-cover rounded-full mx-auto mb-4 shadow-md"
                        />
                    ) : (
                        <p className="text-gray-500 text-sm text-center">
                            لم يتم اختيار صورة
                        </p>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full border px-4 py-2 rounded-lg text-sm"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
                >
                    حفظ التعديلات
                </button>
            </form>
        </div>
    );
}

export default EditProfile;
