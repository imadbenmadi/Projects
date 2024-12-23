import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";
import { IoSearch } from "react-icons/io5";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
function Users() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [userTypeFilter, setUserTypeFilter] = useState("");

    useEffect(() => {
        setLoading(true);
        const fetchUsers = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/Admin/Users`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );
                if (response.status === 200) {
                    setUsers(response.data.users);
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

        fetchUsers();
    }, []);

    const filteredUsers = users
        .filter((user) => {
            const fullName =
                `${user?.firstName} ${user?.lastName}`.toLowerCase();
            return (
                fullName.includes(searchQuery.toLowerCase()) ||
                user.email.toLowerCase().includes(searchQuery.toLowerCase())
            );
        })
        .filter((user) => {
            if (userTypeFilter) {
                return user.userType === userTypeFilter;
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
                <div className="text-xl font-semibold  text-blue_v">Users</div>
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
                        value={userTypeFilter}
                        onChange={(e) => setUserTypeFilter(e.target.value)}
                        className="border p-2 w-fit mx-auto md:mx-0 rounded-md text-sm font-semibold"
                    >
                        <option value="">All Users</option>
                        <option value="doctor">doctors</option>
                        <option value="malad">malads</option>
                        <option value="worker">workers</option>
                    </select>
                </div>
                {filteredUsers?.length === 0 ? (
                    <div className="text-center font-semibold text-sm text-gray_v pt-12">
                        No users found
                    </div>
                ) : (
                    <table className="table-auto w-full mt-4 text-sm">
                        <thead>
                            <tr className="bg-gray_white font-normal">
                                <th className="px-4 py-2 rounded-tl-md">
                                    Full Name
                                </th>
                                <th className="px-4 py-2 border-l border-white">
                                    Email
                                </th>
                                <th className="px-4 py-2 border-l border-white">
                                    Telephone
                                </th>
                                <th className="px-4 py-2 border-l border-white">
                                    User Type
                                </th>
                                <th className="px-4 py-2 border-l border-white">
                                    Created At
                                </th>
                                {/* <th className="px-4 py-2 border-l border-white rounded-tr-md">
                                    Action
                                </th> */}
                            </tr>
                        </thead>
                        <tbody className="text-xs text-center font-semibold">
                            {filteredUsers?.map((user) => (
                                <tr key={user?.id}>
                                    <td className="border px-4 py-2">{`${user.firstName} ${user.lastName}`}</td>
                                    <td className="border px-4 py-2">
                                        {user?.email}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {user?.telephone}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {user?.userType === "malad" ? (
                                            "Malad"
                                        ) : user?.userType === "doctor" ? (
                                            "doctor"
                                        ) : user?.userType === "worker" ? (
                                            "Worker"
                                        ) : (
                                            <span className=" text-red-500">
                                                not set
                                            </span>
                                        )}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {dayjs(user?.createdAt).format(
                                            "DD-MMM-YYYY"
                                        )}
                                    </td>
                                    {/* <td className="border px-4 py-2">
                                        <button
                                            onClick={() => {
                                                if (
                                                    user.userType === "client"
                                                ) {
                                                    navigate(
                                                        `/Users/Doctors/${user.id}`
                                                    );
                                                } else {
                                                    navigate(
                                                        `/Users/Malads/${user.id}`
                                                    );
                                                }
                                            }}
                                            className="bg-blue_v text-white px-4 py-2 rounded"
                                        >
                                            View 
                                        </button>
                                    </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        );
    }
}

export default Users;
