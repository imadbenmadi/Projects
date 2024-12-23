import React from "react";
import { useAppContext } from "../../../../AppContext";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
function Profile() {
    const { user } = useAppContext();
    return (
        <div
            className="max-w-lg mx-auto p-6 mt-6 bg-white shadow-lg rounded-lg border border-gray-200"
            dir="rtl"
        >
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                الحساب الشخصي
            </h2>

            <div className="border-b pb-4 mb-4">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    الصورة الشخصية
                </h3>
                {user?.profile_pic_link ? (
                    <img
                        loading="lazy"
                        src={`http://localhost:3000/${user.profile_pic_link}`}
                        alt="Profile"
                        className="w-32 h-32 rounded-full mx-auto object-cover"
                    />
                ) : (
                    <p className="text-gray-600 text-center">لا توجد صورة</p>
                )}
            </div>

            <div className="border-b pb-4 mb-4">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    المعلومات الشخصية
                </h3>
                <p className="text-gray-600">
                    <span className="font-medium">الاسم الكامل:</span>{" "}
                    {user?.firstName || "غير متوفر"} {user?.lastName || ""}
                </p>
                <p className="text-gray-600">
                    <span className="font-medium">البريد الإلكتروني:</span>{" "}
                    {user?.email || "غير متوفر"}
                </p>
                <p className="text-gray-600">
                    <span className="font-medium">رقم الهاتف:</span>{" "}
                    {user?.telephone || "غير متوفر"}
                </p>
                <p className="text-gray-600">
                    <span className="font-medium">تاريخ الميلاد:</span>{" "}
                    {user?.birthDate
                        ? dayjs(user?.birthDate).format("DD-MMM-YYYY")
                        : "غير متوفر"}
                </p>
                <p className="text-gray-600">
                    <span className="font-medium">العنوان:</span>{" "}
                    {user?.adress || "غير متوفر"}
                </p>
                <p className="text-gray-600">
                    <span className="font-medium">الجنس:</span>{" "}
                    {user?.gender || "غير متوفر"}
                </p>
                <p className="text-gray-600">
                    <span className="font-medium">نبذة:</span>{" "}
                    {user?.about || "غير متوفر"}
                </p>
            </div>

            <div className="border-b pb-4 mb-4 text-gray-600">
                <p>
                    <span className="font-medium">تاريخ إنشاء الحساب:</span>{" "}
                    {user?.createdAt
                        ? dayjs(user?.createdAt).format("DD-MMM-YYYY")
                        : "غير متوفر"}
                </p>
                <p>
                    <span className="font-medium">آخر تحديث:</span>{" "}
                    {user?.updatedAt
                        ? dayjs(user?.createdAt).format("DD-MMM-YYYY")
                        : "غير متوفر"}
                </p>
            </div>

            <div className="flex justify-center mt-6">
                <Link
                    to={`/Malad/Profile/Edit`}
                    className="py-2 px-6 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
                >
                    تعديل
                </Link>
            </div>
        </div>
    );
}

export default Profile;
