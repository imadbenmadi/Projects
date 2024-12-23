import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { IoSearch } from "react-icons/io5";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useAppContext } from "../../../../AppContext";
dayjs.extend(customParseFormat);

function Doctors() {
    const navigate = useNavigate();
    const [users, setDoctors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [userTypeFilter, setUserTypeFilter] = useState("");

    const { user } = useAppContext();

    useEffect(() => {
        setLoading(true);
        const fetchDoctors = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/Directors/${user.id}/${user.companyId}/Doctors`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );
                if (response.status === 200) {
                    setDoctors(response.data.Users);
                } else if (response.status === 401) {
                    Swal.fire(
                        "Error",
                        "يجب عليك تسجيل الدخول مرة اخرى",
                        "error"
                    );
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

        fetchDoctors();
    }, []);

    const filteredDoctors = users.filter((user) => {
        const fullName = `${user?.firstName} ${user?.lastName}`.toLowerCase();
        const email = user?.email.toLowerCase();
        return (
            fullName.includes(searchQuery.toLowerCase()) ||
            email.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    if (loading) {
        return (
            <div className="w-[100vw] h-[80vh] flex flex-col items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    } else if (error) {
        return (
            <div className="w-[100vw] h-screen flex items-center justify-center">
                <div className="text-red-600 font-semibold">
                    {error.message}
                </div>
            </div>
        );
    } else if (!users || users.length === 0) {
        return (
            <div className="py-6 px-4">
                <div className="flex justify-center items-center flex-col gap-6 mt-12">
                    <div className="text-center font-semibold text-sm text-gray_v pt-12">
                        لا يوجد اطباء
                    </div>
                    <Link
                        to={"/Director/Doctors/Add"}
                        className=" py-2 px-4 rounded bg-blue_v text-white cursor-pointer font-semibold text-sm"
                    >
                        اضافة طبيب جديد
                    </Link>
                </div>
            </div>
        );
    } else {
        return (
            <div className="py-6 px-4">
                <div className="text-xl font-semibold text-blue_v">الاطباء</div>
                <div className="mt-4 flex flex-col md:flex-row gap-4 justify-center md:justify-start md:ml-6 md:gap-6 text-gray_v">
                    <div className="border p-2 mr-4 rounded-md flex items-center justify-between gap-2 text-sm font-semibold min-w-[300px]">
                        <IoSearch className="w-fit shrink-0" />
                        <input
                            type="text"
                            placeholder="ابحث عن الطبيب بالاسم او البريد الالكتروني"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full placeholder:text-end text-end"
                        />
                    </div>
                    <Link
                        to={"/Director/Doctors/Add"}
                        className=" py-2 px-4 rounded bg-blue_v text-white cursor-pointer font-semibold text-sm"
                    >
                        اضافة طبيب جديد
                    </Link>
                </div>
                <div className=" overflow-auto">
                    {filteredDoctors?.length === 0 ? (
                        <div className="flex justify-center items-center flex-col gap-6 mt-12">
                            <div className="text-center font-semibold text-sm text-gray_v pt-12">
                                لا يوجد طبيب يطابق بحثك
                            </div>
                        </div>
                    ) : (
                        <table className="table-auto w-full mt-4 text-sm text-center overflow-auto">
                            <thead>
                                <tr className="bg-gray_white font-normal">
                                    <th className="px-4 py-2 rounded-tl-md">
                                        الاسم الكامل
                                    </th>
                                    <th className="px-4 py-2 border-l border-white">
                                        البريد الإلكتروني
                                    </th>
                                    <th className="px-4 py-2 border-l border-white">
                                        التخصص
                                    </th>
                                    <th className="px-4 py-2 border-l border-white">
                                        الهاتف
                                    </th>
                                    <th className="px-4 py-2 border-l border-white">
                                        القسم
                                    </th>
                                    <th className="px-4 py-2 border-l border-white">
                                        تاريخ الإنشاء
                                    </th>
                                    <th className="px-4 py-2 border-l border-white"></th>
                                </tr>
                            </thead>
                            <tbody className="text-xs text-center font-semibold">
                                {filteredDoctors?.map((doctor_item) => (
                                    <tr key={doctor_item?.id}>
                                        <td className="border px-4 py-2">{`${doctor_item.firstName} ${doctor_item.lastName}`}</td>
                                        <td className="border px-4 py-2">
                                            {doctor_item?.email}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {doctor_item?.speciality}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {doctor_item?.telephone}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {doctor_item?.Service?.Name}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {dayjs(
                                                doctor_item?.createdAt
                                            ).format("DD-MMM-YYYY")}
                                        </td>
                                        <td className="border px-4 py-2">
                                            <Link
                                                to={`/Director/Doctors/${doctor_item.id}`}
                                                className="bg-blue_v text-white px-4 py-1 rounded-md "
                                            >
                                                تفاصيل
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        );
    }
}

export default Doctors;
