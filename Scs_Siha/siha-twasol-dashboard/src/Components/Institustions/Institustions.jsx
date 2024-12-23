import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
import { IoSearch } from "react-icons/io5";

function Institutions() {
    const navigate = useNavigate();
    const [institutions, setInstitutions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [institutionTypeFilter, setInstitutionTypeFilter] = useState("");

    useEffect(() => {
        setLoading(true);
        const fetchInstitutions = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/Admin/Companies`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );
                if (response.status === 200) {
                    setInstitutions(response.data.companies);
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

        fetchInstitutions();
    }, []);

    const filteredInstitutions = institutions
        .filter((institution) => {
            const name = institution?.Name || "";
            return (
                name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                institution?.Location.toLowerCase().includes(
                    searchQuery.toLowerCase()
                ) ||
                institution?.Wilaya.toLowerCase().includes(
                    searchQuery.toLowerCase()
                )
            );
        })
        .filter((institution) => {
            if (institutionTypeFilter) {
                return institution?.Type === institutionTypeFilter;
            }
            return true;
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
    } else {
        return (
            <div className="py-6 px-4">
                <div className="text-xl font-semibold text-blue_v">
                    Institutions
                </div>
                <div className="mt-4 flex flex-col md:flex-row gap-4 justify-center md:justify-end md:mr-6 md:gap-6 text-gray_v">
                    <div className="border p-2 mr-4 rounded-md flex items-center justify-between gap-2 text-sm font-semibold min-w-[300px]">
                        <IoSearch className="w-fit shrink-0" />
                        <input
                            type="text"
                            placeholder="Search by name or email"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full"
                        />
                    </div>

                    <select
                        value={institutionTypeFilter}
                        onChange={(e) =>
                            setInstitutionTypeFilter(e.target.value)
                        }
                        className="border p-2 w-fit mx-auto md:mx-0 rounded-md text-sm font-semibold"
                    >
                        <option value="">All Institutions</option>
                        <option value="CHU">CHU</option>
                        <option value="EPH">EPH</option>
                        <option value="EHS">EHS</option>
                        <option value="EHU">EHU</option>
                        <option value="EPSP">EPSP</option>
                        <option value="CS">CS</option>
                        <option value="POLYCLINIQUE">POLYCLINIQUE</option>
                        <option value="EHP">EHP</option>
                    </select>
                </div>
                {filteredInstitutions?.length === 0 ? (
                    <div className="text-center font-semibold text-sm text-gray_v pt-12">
                        No institutions found
                    </div>
                ) : (
                    <table className="table-auto w-full mt-4 text-sm">
                        <thead>
                            <tr className="bg-gray_white font-normal">
                                <th className="px-4 py-2 rounded-tl-md">
                                    Name
                                </th>
                                <th className="px-4 py-2 border-l border-white">
                                    Location
                                </th>
                                <th className="px-4 py-2 border-l border-white">
                                    Wilaya
                                </th>
                                <th className="px-4 py-2 border-l border-white">
                                    Type
                                </th>

                                <th className="px-4 py-2 border-l border-white rounded-tr-md">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-xs text-center font-semibold">
                            {filteredInstitutions.map((institution) => (
                                <tr key={institution?.id}>
                                    <td className="border px-4 py-2">
                                        {institution?.Name}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {institution?.Location}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {institution?.Wilaya}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {institution?.Type}
                                    </td>

                                    <td className="border px-4 py-2">
                                        <button
                                            onClick={() => {
                                                navigate(
                                                    `/Institustions/${institution?.id}`
                                                );
                                            }}
                                            className="bg-blue_v text-white px-4 py-2 rounded"
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        );
    }
}

export default Institutions;
