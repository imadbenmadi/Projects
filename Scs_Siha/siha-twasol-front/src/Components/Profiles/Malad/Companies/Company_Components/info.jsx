import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import dayjs from "dayjs";
function Info() {
    const { company } = useOutletContext();
    const [followLoading, setFollowLoading] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);

    // Check if the user is following the company on load and after follow/unfollow actions
    const checkFollowStatus = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3000/Malads/${company?.id}/Companies/${company?.id}/isFollowing`,
                { withCredentials: true }
            );
            setIsFollowing(response.data.isFollowing);
        } catch (error) {
            // console.error("Error checking follow status:", error);
        }
    };

    useEffect(() => {
        if (company?.id) checkFollowStatus();
    }, [company?.id]);

    const handleFollow = async () => {
        setFollowLoading(true);
        try {
            const response = await axios.post(
                `http://localhost:3000/Malads/${company?.id}/Companies/${company?.id}/Follow`,
                {},
                { withCredentials: true }
            );

            if (response.status === 200) {
                Swal.fire("نجاح!", "أنت الآن تتابع هذه المؤسسة", "success");
                setIsFollowing(true); // Immediately update state
            }
        } catch (error) {
            Swal.fire("خطأ!", "حدث خطأ ما. حاول مرة أخرى", "error");
        } finally {
            setFollowLoading(false);
        }
    };

    const handleUnfollow = async () => {
        setFollowLoading(true);
        try {
            const response = await axios.post(
                `http://localhost:3000/Malads/${company?.id}/Companies/${company?.id}/Unfollow`,
                {},
                { withCredentials: true }
            );

            if (response.status === 200) {
                Swal.fire(
                    "نجاح!",
                    "لقد توقفت عن متابعة هذه المؤسسة",
                    "success"
                );
                setIsFollowing(false); // Immediately update state
            }
        } catch (error) {
            Swal.fire("خطأ!", "حدث خطأ ما. حاول مرة أخرى", "error");
        } finally {
            setFollowLoading(false);
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-blue-800">
                تفاصيل المؤسسة
            </h2>

            {/* Basic Info */}
            <div className="mb-6">
                <p className="text-gray-700 mb-2">
                    <span className="font-semibold">الاسم:</span>{" "}
                    {company?.Name}
                </p>
                <p className="text-gray-700 mb-2">
                    <span className="font-semibold">الموقع:</span>{" "}
                    {company?.Location}
                </p>
                <p className="text-gray-700 mb-2">
                    <span className="font-semibold">الولاية:</span>{" "}
                    {company?.Wilaya}
                </p>
                <p className="text-gray-700 mb-2">
                    <span className="font-semibold">النوع:</span>{" "}
                    {company?.Type}
                </p>
                <p className="text-gray-700 mb-2">
                    <span className="font-semibold">تاريخ الإنشاء:</span>{" "}
                    {dayjs(company?.createdAt).format("DD-MMM-YYYY")}
                </p>
                <p className="text-gray-700 mb-2">
                    <span className="font-semibold">آخر تحديث:</span>{" "}
                    {dayjs(company?.updatedAt).format("DD-MMM-YYYY")}
                </p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-100 p-4 rounded-lg text-center">
                    <p className="text-lg font-semibold text-blue-700">
                        عدد المدونات
                    </p>
                    <p className="text-2xl font-bold text-blue-800">
                        {company?.Blogs?.length || 0}
                    </p>
                </div>
                <div className="bg-green-100 p-4 rounded-lg text-center">
                    <p className="text-lg font-semibold text-green-700">
                        عدد الأحداث
                    </p>
                    <p className="text-2xl font-bold text-green-800">
                        {company?.Events?.length || 0}
                    </p>
                </div>
                <div className="bg-yellow-100 p-4 rounded-lg text-center">
                    <p className="text-lg font-semibold text-yellow-700">
                        عدد الأطباء
                    </p>
                    <p className="text-2xl font-bold text-yellow-800">
                        {company?.Doctors?.length || 0}
                    </p>
                </div>
                <div className="bg-purple-100 p-4 rounded-lg text-center">
                    <p className="text-lg font-semibold text-purple-700">
                        عدد الخدمات
                    </p>
                    <p className="text-2xl font-bold text-purple-800">
                        {company?.Services?.length || 0}
                    </p>
                </div>
            </div>

            {/* Follow/Unfollow Button */}
            <div className="flex space-x-4">
                {isFollowing ? (
                    <button
                        onClick={handleUnfollow}
                        disabled={followLoading}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none"
                    >
                        {followLoading ? "إلغاء المتابعة..." : "إلغاء المتابعة"}
                    </button>
                ) : (
                    <button
                        onClick={handleFollow}
                        disabled={followLoading}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
                    >
                        {followLoading ? "متابعة..." : "متابعة"}
                    </button>
                )}
            </div>
        </div>
    );
}

export default Info;
