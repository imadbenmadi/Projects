import React, { useState, useEffect } from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../../../../../../AppContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ReviewCard from "./Rate_Card";
import Rate from "./Rate";
import dayjs from "dayjs";
function Malad() {
    const location = useLocation();
    const { user } = useAppContext();
    const compnayId = location.pathname.split("/")[3];
    const doctorId = location.pathname.split("/")[5];
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [doctor, setDoctor] = useState(null);
    const Navigate = useNavigate();
    const [is_in_list, setIs_in_list] = useState(false);
    const [doctorRates, setDoctorRates] = useState([]);
    const [is_rated, setIs_rated] = useState(false);

    useEffect(() => {
        const fetchMalad = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/Malads/${user?.id}/Companies/${compnayId}/Doctors/${doctorId}`,
                    { withCredentials: true }
                );
                setIs_rated(response.data.is_rated);
                setDoctorRates(response.data.doctorRates);
                setIs_in_list(response.data.is_in_List);
                setDoctor(response.data.doctor);
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
                    الحساب الشخصي للدكتور
                </h2>
                <div className="border-b pb-4 mb-4">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        الصورة الشخصية
                    </h3>
                    {doctor?.profile_pic_link ? (
                        <img
                            loading="lazy"
                            src={`http://localhost:3000/${doctor?.profile_pic_link}`}
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
                        {doctor?.firstName || "غير متوفر"}{" "}
                        {doctor?.lastName || ""}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-medium">البريد الإلكتروني:</span>{" "}
                        {doctor?.email || "غير متوفر"}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-medium">رقم الهاتف:</span>{" "}
                        {doctor?.telephone || "غير متوفر"}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-medium">التخصص :</span>{" "}
                        {doctor?.speciality || "غير متوفر"}
                    </p>
                    
                </div>
                <div className="border-b pb-4 mb-4">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        معلومات الشركة
                    </h3>
                    <p className="text-gray-600">
                        <span className="font-medium">اسم الشركة:</span>{" "}
                        {doctor?.Company.Name}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-medium">الموقع:</span>{" "}
                        {doctor?.Company.Location}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-medium">الولاية:</span>{" "}
                        {doctor?.Company.Wilaya}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-medium">نوع المؤسسة:</span>{" "}
                        {doctor?.Company.Type}
                    </p>
                </div>
                {is_in_list == true && is_rated == false && (
                    <Link
                        to={`/ChatRooms/Doctors/${doctorId}`}
                        className="py-2 px-6 font-bold  bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
                    >
                        مراسلة الطبيب
                    </Link>
                )}
            </div>
            <div className=" mt-6">
                {is_in_list == true && is_rated == false && (
                    <div className="">
                        <Rate userId={user.id} doctorId={doctorId} />
                    </div>
                )}

                <div>
                    <div className="max-w-[80vw] pl-6 py-10">
                        <h2 className="text-2xl font-bold text-gray-600 mb-4 text-center">
                            التقييمات
                        </h2>
                        <div className="my-6 px-6 py-4 shadow-md font-semibold text-gray-500 flex gap-3 w-fit mx-auto rounded-lg ">
                            <div>
                                {doctorRates && doctorRates.length > 0
                                    ? (
                                          doctorRates.reduce(
                                              (sum, rate) => sum + rate.Rate,
                                              0
                                          ) / doctorRates.length
                                      ).toFixed(1) // Calculate average and format to 2 decimal places
                                    : 0.0}
                            </div>
                            <div>اجمالي التقييم</div>
                        </div>
                        {!doctorRates || doctorRates.length === 0 ? (
                            <div className="text-center font-semibold text-sm text-gray-400">
                                لا يوجد تقييمات حاليا
                            </div>
                        ) : (
                            doctorRates.map((review) => (
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
