import React from "react";
import { useAppContext } from "../../../../AppContext";
import dayjs from "dayjs";
function Profile() {
    const { user } = useAppContext();
    return (
        <div
            className="max-w-lg mx-auto p-6 mt-6 bg-white shadow-lg rounded-lg border border-gray-200"
            dir="rtl"
        >
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                حساب العامل
            </h2>

            <div className="border-b pb-4 mb-4">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    المعلومات الشخصية
                </h3>
                <p className="text-gray-600">
                    <span className="font-medium">الاسم الكامل:</span>{" "}
                    {user?.firstName}
                    {user?.lastName}
                </p>
                <p className="text-gray-600">
                    <span className="font-medium">البريد الإلكتروني:</span>{" "}
                    {user?.email}
                </p>
                <p className="text-gray-600">
                    <span className="font-medium">رقم الخدمة:</span>{" "}
                    {user?.serviceId}
                </p>
            </div>

            <div className="border-b pb-4 mb-4">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    معلومات الشركة
                </h3>
                <p className="text-gray-600">
                    <span className="font-medium">اسم الشركة:</span>{" "}
                    {user?.Company.Name}
                </p>
                <p className="text-gray-600">
                    <span className="font-medium">الموقع:</span>{" "}
                    {user?.Company.Location}
                </p>
                <p className="text-gray-600">
                    <span className="font-medium">الولاية:</span>{" "}
                    {user?.Company.Wilaya}
                </p>
                <p className="text-gray-600">
                    <span className="font-medium">نوع المؤسسة:</span>{" "}
                    {user?.Company.Type}
                </p>
            </div>

            <div className="text-gray-600">
                <p>
                    <span className="font-medium">تاريخ إنشاء الحساب:</span>{" "}
                    {dayjs(user?.createdAt).format("DD-MMM-YYYY")}
                </p>
            </div>
        </div>
    );
}

export default Profile;
