import React, { useState, useEffect } from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../../../../AppContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ReviewCard from "./Rate_Card";
import Rate from "./Rate";
import dayjs from "dayjs";
function Malad() {
    const location = useLocation();
    const { user } = useAppContext();
    const id = location.pathname.split("/")[4];
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [malad, setMalad] = useState(null);
    const [addLoading, setAddLoading] = useState(false);
    const Navigate = useNavigate();
    const [is_in_list, setIs_in_list] = useState(false);
    const [maladrates, setMaladrates] = useState([]);
    const [is_rated, setIs_rated] = useState(false);

    const handleAddtoList = async (maladId) => {
        setAddLoading(true);
        try {
            const response = await axios.post(
                `http://localhost:3000/Doctors/${user.id}/Malads/${maladId}/Add`,
                {},
                { withCredentials: true }
            );

            Swal.fire({
                icon: "success",
                title: "تمت العملية بنجاح",
                text: "تمت إضافة المريض إلى قائمتك بنجاح.",
                showConfirmButton: true,
                confirmButtonText: "حسنًا",
                confirmButtonColor: "#2563EB",
            });
            Navigate("/Doctor/Malads/List");
            setAddLoading(false);
        } catch (error) {
            setAddLoading(false);
        } finally {
            setAddLoading(false);
        }
    };
    useEffect(() => {
        const fetchMalad = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/Doctors/${malad?.id}/Malads/${id}`,
                    { withCredentials: true }
                );
                setIs_rated(response.data.is_rated);
                setMaladrates(response.data.maladrates);
                setIs_in_list(response.data.is_in_list);
                setMalad(response.data.malad);
                setLoading(false);
            } catch (error) {
                setError("حدث خطأ أثناء تحميل بيانات المريض.");
                setLoading(false);
            }
        };
        fetchMalad();
    }, []);

    if (loading)
        return (
            <div className=" w-screen h-screen flex flex-col items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    if (error)
        return (
            <div className="text-red-600 font-semibold text-center">
                {error}
            </div>
        );

    return (
        <>
            <div
                className="max-w-lg mx-auto p-6 mt-6 bg-white shadow-lg rounded-lg border border-gray-200"
                dir="rtl"
            >
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    الحساب الشخصي للمريض
                </h2>
                <div className="border-b pb-4 mb-4">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        الصورة الشخصية
                    </h3>
                    {malad?.profile_pic_link ? (
                        <img
                            loading="lazy"
                            src={`http://localhost:3000/${malad?.profile_pic_link}`}
                            alt="Profile"
                            className="w-32 h-32 rounded-full mx-auto object-cover"
                        />
                    ) : (
                        <p className="text-gray-600 text-center">
                            لا توجد صورة
                        </p>
                    )}
                </div>
                <div className="border-b pb-4 mb-4">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        المعلومات الشخصية
                    </h3>
                    <p className="text-gray-600">
                        <span className="font-medium">الاسم الكامل:</span>{" "}
                        {malad?.firstName || "غير متوفر"}{" "}
                        {malad?.lastName || ""}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-medium">البريد الإلكتروني:</span>{" "}
                        {malad?.email || "غير متوفر"}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-medium">رقم الهاتف:</span>{" "}
                        {malad?.telephone || "غير متوفر"}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-medium">تاريخ الميلاد:</span>{" "}
                        {malad?.birthDate
                            ? dayjs(malad?.birthDate).format("DD-MMM-YYYY")
                            : "غير متوفر"}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-medium">العنوان:</span>{" "}
                        {malad?.adress || "غير متوفر"}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-medium">الجنس:</span>{" "}
                        {malad?.gender || "غير متوفر"}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-medium">نبذة:</span>{" "}
                        {malad?.about || "غير متوفر"}
                    </p>
                </div>
                <div className="border-b pb-4 mb-4 text-gray-600">
                    <p>
                        <span className="font-medium">تاريخ إنشاء الحساب:</span>{" "}
                        {malad?.createdAt
                            ? dayjs(malad?.createdAt).format("DD-MMM-YYYY")
                            : "غير متوفر"}
                    </p>
                    <p>
                        <span className="font-medium">آخر تحديث:</span>{" "}
                        {malad?.updatedAt
                            ? dayjs(malad?.updatedAt).format("DD-MMM-YYYY")
                            : "غير متوفر"}
                    </p>
                </div>
                {!is_in_list && (
                    <div className="flex justify-center mt-6 gap-4">
                        {addLoading ? (
                            <span className="small-loader"></span>
                        ) : (
                            <button
                                onClick={() => handleAddtoList(malad.id)}
                                className="py-2 px-6 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
                            >
                                اضافةالى لائحة المرضى
                            </button>
                        )}
                    </div>
                )}
            </div>
            <div className=" mt-6">
                {is_in_list && !is_rated && (
                    <div className="">
                        <Rate userId={user.id} maladId={id} />
                    </div>
                )}

                <div>
                    <div className="max-w-[80vw] pl-6 py-10">
                        <h2 className="text-2xl font-bold text-gray-600 mb-4 text-center">
                            التقييمات
                        </h2>
                        <div className="my-6 px-6 py-4 shadow-md font-semibold text-gray-500 flex gap-3 w-fit mx-auto rounded-lg ">
                            <div>
                                {maladrates && maladrates.length > 0
                                    ? (
                                          maladrates.reduce(
                                              (sum, rate) => sum + rate.Rate,
                                              0
                                          ) / maladrates.length
                                      ).toFixed(1) // Calculate average and format to 2 decimal places
                                    : 0.0}
                            </div>
                            <div>اجمالي التقييم</div>
                        </div>
                        {!maladrates || maladrates.length === 0 ? (
                            <div className="text-center font-semibold text-sm text-gray-400">
                                لا يوجد تقييمات حاليا
                            </div>
                        ) : (
                            maladrates.map((review) => (
                                <ReviewCard key={review?.id} review={review} />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Malad;
