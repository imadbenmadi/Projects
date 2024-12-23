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
function Director_workers() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const { user } = useAppContext();
    useEffect(() => {
        setLoading(true);
        const fetch_workers = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/Directors/${user.id}/${user.companyId}/Workers`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );
                if (response.status === 200) {
                    setUsers(response.data.Users);
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

        fetch_workers();
    }, []);

    const filteredUsers = users.filter((user) => {
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
                    <div className="text-center font-semibold text-sm text-gray_v pt-12  ">
                        لا يوجد عامل
                    </div>
                    <Link
                        to={"/Director/Workers/Add"}
                        className=" py-2 px-4 rounded bg-blue_v text-white cursor-pointer font-semibold text-sm"
                    >
                        اضافة عامل جديد
                    </Link>
                </div>
            </div>
        );
    } else {
        return (
            <div className="py-6 px-1 md:px-4">
                <div className="text-xl font-semibold  text-blue_v mb-6">
                    العمال
                </div>
                <div
                    className="mt-4 flex flex-col md:flex-row  mb-6 gap-4 justify-center 
                md:justify-start md:ml-6 md:gap-6 text-gray_v"
                >
                    <div
                        className="border p-2 mr-4 rounded-md flex items-center justify-between gap-2 text-sm 
                    font-semibold min-w-[300px]"
                    >
                        <IoSearch className="w-fit md:shrink-0 " />
                        <input
                            type="text"
                            placeholder="ابحث عن عامل بالاسم او البريد الالكتروني"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full placeholder:text-end text-end"
                        />
                    </div>
                    <Link
                        to={"/Director/Workers/Add"}
                        className=" py-2 px-4 rounded text-center bg-blue_v text-white cursor-pointer font-semibold text-sm"
                    >
                        اضافة عامل جديد
                    </Link>
                </div>
                <div className=" overflow-auto">
                    {filteredUsers?.length === 0 ? (
                        <div className="flex justify-center items-center flex-col gap-6 mt-12">
                            <div className="text-center font-semibold text-sm text-gray_v pt-12  ">
                                لا يوجد عامل يطابق بحثك
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
                                        القسم
                                    </th>
                                    <th className="px-4 py-2 border-l border-white">
                                        تاريخ الإنشاء
                                    </th>
                                    <th className="px-4 py-2 border-l border-white"></th>
                                    {/* <th className="px-4 py-2 border-l border-white rounded-tr-md">
                                    Action
                                </th> */}
                                </tr>
                            </thead>
                            <tbody className="text-xs text-center font-semibold">
                                {filteredUsers?.map((worker_item) => (
                                    <tr key={worker_item?.id}>
                                        <td className="border px-4 py-2">{`${worker_item.firstName} ${worker_item.lastName}`}</td>
                                        <td className="border px-4 py-2">
                                            {worker_item?.email}
                                        </td>

                                        <td className="border px-4 py-2">
                                            {worker_item?.Service?.Name}
                                        </td>

                                        <td className="border px-4 py-2">
                                            {dayjs(
                                                worker_item?.createdAt
                                            ).format("DD-MMM-YYYY")}
                                        </td>
                                        <td className="border px-4 py-2">
                                            <Link
                                                to={`/Director/Workers/${worker_item.id}`}
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

export default Director_workers;
