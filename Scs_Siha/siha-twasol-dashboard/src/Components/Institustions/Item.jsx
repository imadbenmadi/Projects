import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
function InstitutionItem() {
    const location = useLocation();
    const institution_id = location.pathname.split("/")[2];
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(null);
    const [institution, setInstitution] = useState(null);

    const [delete_loading, setDeleteLoading] = useState(false);
    const handle_delete_institution = async () => {
        setDeleteLoading(true);
        try {
            const response = await axios.delete(
                `http://localhost:3000/Admin/Companies/${institution_id}`,
                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            );
            if (response.status === 200) {
                Swal.fire(
                    "Success",
                    "Institution deleted successfully",
                    "success"
                );
                navigate("/Institustions");
            } else if (response.status === 401) {
                Swal.fire("Error", "يجب عليك تسجيل الدخول مرة اخرى", "error");
                navigate("/Login");
            } else {
                Swal.fire("Error", response.data.message, "error");
            }
        } catch (error) {
            Swal.fire("Error", error.message, "error");
        } finally {
            setDeleteLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        const fetchInstitution = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/Admin/Companies/${institution_id}`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );
                if (response.status === 200) {
                    setInstitution(response.data.company);
                } else if (response.status === 401) {
                    Swal.fire(
                        "Error",
                        "يجب عليك تسجيل الدخول مرة اخرى",
                        "error"
                    );
                    navigate("/Login");
                } else {
                    // Swal.fire("Error", response.data.message, "error");
                    navigate("/Institustions");
                }
            } catch (error) {
                // Swal.fire("Error", error.message, "error");
                navigate("/Institustions");
            } finally {
                setLoading(false);
            }
        };
        if (
            !institution_id ||
            isNaN(institution_id) ||
            !Number.isInteger(Number(institution_id))
        )
            navigate("/Institustions");
        fetchInstitution();
    }, [institution_id, navigate]);

    if (loading) {
        return (
            <div className="w-screen h-[80vh] flex flex-col items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    }

    if (!institution) {
        navigate("/Institustions");
    }
    const director =
        institution?.Directors.length > 0 ? institution?.Directors[0] : null;

    return (
        <div className=" mx-auto px-4 py-8 text-black_text">
            <div className="flex flex-wrap sm:justify-between justify-center gap-8  sm:gap-24 mb-12">
                <div className=" flex flex-col gap-3 text-black_text">
                    <h1 className="text-3xl font-bold">{institution?.Name}</h1>
                    <div className=" md:pl-6 flex flex-col gap-2">
                        <p className="text-lg text-gray_v">
                            Wilaya :{" "}
                            <span className="text-md font-semibold">
                                {institution?.Wilaya}
                            </span>
                        </p>
                        <p className="text-lg text-gray_v">
                            Location :{" "}
                            <span className="text-md font-semibold">
                                {institution?.Location}
                            </span>
                        </p>
                        <p>
                            <span className="text-lg text-gray_v">Type :</span>{" "}
                            <span className="text-md font-semibold">
                                {institution?.Type}
                            </span>
                        </p>
                        <p>
                            <span className="text-lg text-gray_v">
                                Doctors :
                            </span>{" "}
                            <span className="text-md font-semibold">
                                {institution?.Doctors.length ? (
                                    institution?.Doctors.length
                                ) : (
                                    <span className="text-red-500">0</span>
                                )}
                            </span>
                        </p>
                        <p>
                            <span className="text-lg text-gray_v">
                                Services :
                            </span>{" "}
                            <span className="text-md font-semibold">
                                {institution?.Services.length ? (
                                    institution?.Services.length
                                ) : (
                                    <span className="text-red-500">0</span>
                                )}
                            </span>
                        </p>
                        <p>
                            <span className="text-lg text-gray_v">
                                Workers :
                            </span>{" "}
                            <span className="text-md font-semibold">
                                {institution?.Workers.length ? (
                                    institution?.Workers.length
                                ) : (
                                    <span className="text-red-500">0</span>
                                )}
                            </span>
                        </p>
                        <p>
                            <span className="text-lg text-gray_v">
                                Followers :
                            </span>{" "}
                            <span className="text-md font-semibold">
                                {institution?.malad_follows.length ? (
                                    institution?.malad_follows.length
                                ) : (
                                    <span className="text-red-500">0</span>
                                )}
                            </span>
                        </p>
                    </div>
                </div>
                <div className=" flex flex-col gap-6 text-center">
                    {/* <Link
                        to={`/Institustions/${institution_id}/Events`}
                        className="border-2 border-blue_v text-blue_v font-semibold px-4 py-2 rounded-md"
                    >
                        See events
                    </Link> */}
                    <Link
                        to={`/Institustions/${institution_id}/Edit`}
                        className="border-2 border-green_v text-green_v font-semibold
                        cursor-pointer
                        px-4 py-2 rounded-md"
                    >
                        Edite Institustion
                    </Link>
                    {delete_loading ? (
                        <span className="small-loader mt-2 w-full m-auto"></span>
                    ) : (
                        <div
                            className=" bg-red-500 cursor-pointer
                                     text-white font-semibold px-4 py-2 rounded-md"
                            onClick={handle_delete_institution}
                        >
                            Delete Institustion
                        </div>
                    )}
                </div>
            </div>
            {director && (
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Director</h2>
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <div className="border p-2 rounded-md flex items-center justify-between gap-2 text-sm font-semibold min-w-[300px]">
                            <span>Email: {director?.email}</span>
                            <Link
                                to={`/Institustions/${institution_id}/Edit`}
                                className="text-blue_v"
                            >
                                ✏️
                            </Link>
                        </div>
                        <div className="border p-2 rounded-md flex items-center justify-between gap-2 text-sm font-semibold min-w-[300px]">
                            <span>Password: {director?.password}</span>
                            <Link
                                to={`/Institustions/${institution_id}/Edit`}
                                className="text-blue_v"
                            >
                                ✏️
                            </Link>
                        </div>
                    </div>
                </div>
            )}
            <div className=" mt-12">
                <h2 className="text-2xl font-semibold mb-2">Doctors</h2>
                {institution?.Doctors.length === 0 ? (
                    <p className="text-gray_v text-center font-semibold pt-6">
                        No doctors found
                    </p>
                ) : (
                    <table className="table-auto w-full text-sm">
                        <thead>
                            <tr className="bg-gray_white text-black font-normal">
                                <th className="px-4 border border-white py-2  rounded-tl-lg">
                                    Full Name
                                </th>
                                <th className="px-4 border border-white py-2  ">
                                    telephone
                                </th>
                                <th className="px-4 border border-white py-2  ">
                                    Email
                                </th>{" "}
                                <th className="px-4 border border-white py-2  ">
                                    speciality
                                </th>
                                <th className="px-4 border border-white py-2 rounded-tr-lg">
                                    Created At
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-center font-semibold">
                            {institution?.Doctors.map((doctor, index) => (
                                <tr key={index}>
                                    <td className="border px-4 py-2">
                                        {doctor?.firstName} {doctor?.lastName}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {doctor?.telephone}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {doctor?.email}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {doctor?.speciality}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {/* {doctor?.CreatedAt} */}
                                        {dayjs(doctor?.createdAt).format(
                                            "DD-MMM-YYYY"
                                        )}
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

export default InstitutionItem;
