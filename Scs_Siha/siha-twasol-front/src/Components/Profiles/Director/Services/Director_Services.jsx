import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";
import { IoSearch } from "react-icons/io5";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useAppContext } from "../../../../AppContext";
dayjs.extend(customParseFormat);
function Services() {
    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [serviceTypeFilter, setUserTypeFilter] = useState("");
    const [deleteLoading, setDeleteLoading] = useState(false);
    const location = useLocation();

    const { user } = useAppContext();
    useEffect(() => {
        setLoading(true);
        const fetchServices = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/Directors/${user?.id}/${user?.companyId}/Services`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );
                if (response.status === 200) {
                    setServices(response.data.Services);
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

        fetchServices();
    }, []);
    const handleDelete = (id) => {
        Swal.fire({
            title: "هل أنت متأكد؟",
            text: "لن تتمكن من استعادة هذا العنصر!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "نعم، احذفه!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire("تم الحذف!", "تم حذف العامل بنجاح.", "success");
                setDeleteLoading(true);
                await axios
                    .delete(
                        `http://localhost:3000/Directors/${user.id}/${user.companyId}/Services/${id}`,
                        {
                            withCredentials: true,
                            validateStatus: () => true,
                        }
                    )
                    .then((response) => {
                        if (response.status === 200) {
                            setServices((prevServices) =>
                                prevServices.filter(
                                    (service) => service.id !== id
                                )
                            );
                        } else {
                            Swal.fire("خطأ", response.data.message, "error");
                        }
                    })
                    .catch((error) => {
                        Swal.fire("خطأ", error.message, "error");
                    })
                    .finally(() => {
                        setDeleteLoading(false);
                    });
            }
        });
    };
    const filteredServices = services.filter((service) => {
        const fullName = `${service?.Name}`.toLowerCase();
        return fullName.includes(searchQuery.toLowerCase());
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
    } else if (!services) {
        return (
            <div className="py-6 px-4">
                <div className="flex justify-center items-center flex-col gap-6 mt-12">
                    <div className="text-center font-semibold text-sm text-gray_v pt-12  ">
                        لا يوجد اقسام
                    </div>
                    <Link
                        to={"/Director/Services/Add"}
                        className=" py-2 px-4 rounded bg-blue_v text-white cursor-pointer font-semibold text-sm"
                    >
                        اضافة قسم جديد
                    </Link>
                </div>
            </div>
        );
    } else {
        return (
            <div className="py-6 px-4">
                <div className="text-xl font-semibold  text-blue_v">
                    الاقسام
                </div>
                <div className="mt-4 flex flex-col md:flex-row gap-4 justify-center md:justify-start md:ml-6 md:gap-6 text-gray_v">
                    <div
                        className="border p-2 mr-4 rounded-md flex items-center justify-between gap-2 text-sm 
                    font-semibold min-w-[300px]"
                    >
                        <IoSearch className="w-fit shrink-0" />
                        <input
                            type="text"
                            placeholder="ابحث عن القسم "
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full placeholder:text-end text-end"
                        />
                    </div>
                    <Link
                        to={"/Director/Services/Add"}
                        className=" py-2 px-4 rounded text-center bg-blue_v text-white cursor-pointer font-semibold text-sm"
                    >
                        اضافة قسم جديد
                    </Link>
                </div>
                {filteredServices?.length === 0 ? (
                    <div className="flex justify-center items-center flex-col gap-6 mt-12">
                        <div className="text-center font-semibold text-sm text-gray_v pt-12  ">
                            لا يوجد قسم يطابق بحثك
                        </div>
                    </div>
                ) : (
                    <div className="overflow-auto max-w-screen">
                        <table className="table-auto w-full mx-auto mt-12 text-sm text-center">
                            <thead>
                                <tr className="bg-gray_white font-normal">
                                    <th className="px-4 py-2 rounded-tl-md">
                                        الاسم
                                    </th>
                                    <th className="px-4 py-2 border-l border-white">
                                        تاريخ الإنشاء
                                    </th>
                                    <th className="px-4 py-2 border-l border-white"></th>
                                </tr>
                            </thead>
                            <tbody className="text-xs text-center font-semibold">
                                {filteredServices?.map((service_item) => (
                                    <tr key={service_item?.id}>
                                        <td className="border px-4 py-2">{`${service_item.Name}`}</td>
                                        <td className="border px-4 py-2">
                                            {dayjs(
                                                service_item?.createdAt
                                            ).format("DD-MMM-YYYY")}
                                        </td>
                                        <td className="border h-full px-4 py-2 flex gap-6 items-center justify-center">
                                            <Link
                                                to={`/Director/Services/${service_item.id}/Edit`}
                                                className="bg-blue_v h-full text-white px-4 py-1 rounded-md "
                                            >
                                                تعديل
                                            </Link>
                                            {deleteLoading ? (
                                                <span className="small-loader"></span>
                                            ) : (
                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            service_item.id
                                                        )
                                                    }
                                                    className="py-2 px-4 h-full bg-red-500 text-white rounded-md hover:bg-red-600"
                                                >
                                                    حذف
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        );
    }
}

export default Services;
