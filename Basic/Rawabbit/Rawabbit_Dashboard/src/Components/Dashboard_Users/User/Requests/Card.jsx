import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

import { useState } from "react";
function Card({ request, onDelete }) {
    const Navigate = useNavigate();
    const [Accept_Loading, setAccept_Loading] = useState(false);
    const [Reject_Loading, setReject_Loading] = useState(false);
    async function handle_accept_request(UserId, ServiceId) {
        try {
            setAccept_Loading(true);
            const response = await axios.post(
                "http://localhost:3000/Dashboard/Services/Requests/Accept",
                { UserId, ServiceId },
                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            );
            if (response.status == 200) {
                onDelete();
                Swal.fire({ icon: "success", title: "Request Accepted" });
            } else if (response.status == 404) {
                Swal.fire("Error", `${response.data.message}`, "error");
            } else if (response.status == 400) {
                Swal.fire(
                    "Error!",
                    `Internal server error : ${response.data.message}`,
                    "error"
                );
            } else if (response.status == 401) {
                Swal.fire({
                    title: "Unauthorised Action",
                    text: "You should Login again ",
                    icon: "error",
                    confirmButtonColor: "#3085d6",

                    confirmButtonText: "Go to Admin Login Page",
                }).then((result) => {
                    if (result.isConfirmed) {
                        Navigate("/Dashboard_Login");
                    }
                });
            } else if (response.status == 409) {
                Swal.fire("Error!", `${response.data}`, "error");
            } else if (response.status == 429) {
                Swal.fire(
                    "Error!",
                    `Too many Requests , ${response.data.message}`,
                    "error"
                );
            } else if (response.status == 500) {
                Swal.fire(
                    "Error!",
                    `Internal server error : ${response.data.message}`,
                    "error"
                );
            } else {
                Swal.fire(
                    "Error!",
                    `Something Went Wrong. Please try again , ${response.data.message}`,
                    "error"
                );
            }
        } catch (error) {
            Swal.fire("Error!", "Failed to Accept the Request.", "error");
        } finally {
            setAccept_Loading(false);
        }
    }
    async function handle_reject_request(UserId, ServiceId) {
        try {
            setReject_Loading(true);
            const response = await axios.post(
                "http://localhost:3000/Dashboard/Services/Requests/Reject",
                { UserId, ServiceId },
                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            );

            if (response.status == 200) {
                onDelete();
                Swal.fire({ icon: "success", title: "Request Rejected" });
            } else if (response.status == 404) {
                Swal.fire("Error", `${response.data.message}`, "error");
            } else if (response.status == 400) {
                Swal.fire(
                    "Error!",
                    `Internal server error : ${response.data.message}`,
                    "error"
                );
            } else if (response.status == 401) {
                Swal.fire({
                    title: "Unauthorised Action",
                    text: "You should Login again ",
                    icon: "error",
                    confirmButtonColor: "#3085d6",

                    confirmButtonText: "Go to Admin Login Page",
                }).then((result) => {
                    if (result.isConfirmed) {
                        Navigate("/Dashboard_Login");
                    }
                });
            } else if (response.status == 409) {
                Swal.fire("Error!", `${response.data}`, "error");
            } else if (response.status == 429) {
                Swal.fire(
                    "Error!",
                    `Too many Requests , ${response.data.message}`,
                    "error"
                );
            } else if (response.status == 500) {
                Swal.fire(
                    "Error!",
                    `Internal server error : ${response.data.message}`,
                    "error"
                );
            } else {
                Swal.fire(
                    "Error!",
                    `Something Went Wrong. Please try again , ${response.data.message}`,
                    "error"
                );
            }
        } catch (error) {
            Swal.fire("Error!", "Failed to Reject the Request", "error");
        } finally {
            setReject_Loading(false);
        }
    }

    return (
        <tr
            key={request._id}
            className="bg-gray_white hover:bg-white cursor-pointer h-[40px] text-center"
        >
            <td
                style={{ maxWidth: "180px" }}
                className="w-[180px] whitespace-nowrap border overflow-auto scrollbar-thumb-rounded-full scrollbar-thin scrollbar-thumb-green scrollbar-track-slate-300"
            >
                {request.User.FirstName !== undefined
                    ? request.User.FirstName
                    : "none"}{" "}
                {request.User.LastName ? request.User.LastName : "none"}
            </td>
            <td
                style={{ maxWidth: "90px" }}
                className="w-[90px] whitespace-nowrap break-words border overflow-auto scrollbar-thumb-rounded-full scrollbar-thin scrollbar-thumb-green scrollbar-track-slate-300"
            >
                {request.User.Telephone ? request.User.Telephone : "none"}
            </td>
            <td
                style={{ maxWidth: "150px" }}
                className="w-[150px] whitespace-nowrap border overflow-auto scrollbar-thumb-rounded-full scrollbar-thin scrollbar-thumb-green scrollbar-track-slate-300"
            >
                {request.User.Email ? request.User.Email : "none"}
            </td>
            <td
                style={{ maxWidth: "90px" }}
                className={`w-[90px] whitespace-nowrap border overflow-auto scrollbar-thumb-rounded-full scrollbar-thin scrollbar-thumb-green scrollbar-track-slate-300 ${
                    request.User.IsEmailVerified ? "text-green" : "text-red-600"
                }`}
            >
                {request.User.IsEmailVerified ? "Verified" : "Not Verified"}
            </td>

            <td
                style={{ maxWidth: "150px" }}
                className="w-[150px] whitespace-nowrap border overflow-auto scrollbar-thumb-rounded-full scrollbar-thin scrollbar-thumb-green scrollbar-track-slate-300"
            >
                {request.Service.Title ? request.Service.Title : "none"}
            </td>
            <td
                style={{ maxWidth: "70px" }}
                className="w-[70px] whitespace-nowrap border overflow-auto scrollbar-thumb-rounded-full scrollbar-thin scrollbar-thumb-green scrollbar-track-slate-300"
            >
                {request.Service.Price ? request.Service.Price + " DA" : "none"}
            </td>
            <td
                style={{ maxWidth: "150px" }}
                className="w-[150px] whitespace-nowrap border overflow-auto 
                                scrollbar-thumb-rounded-full scrollbar-thin scrollbar-thumb-green scrollbar-track-slate-300
                                "
            >
                <div className="flex  justify-center gap-1 items-center m-auto ">
                    {!Accept_Loading ? (
                        <div
                            className="w-fit items-center m-auto flex gap-1 bg-green text-white p-1 rounded"
                            onClick={() =>
                                Swal.fire({
                                    title: "Are you sure you want to Accept this Request ?",
                                    text: "You won't be able to revert this!",
                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonColor: "#3085d6",
                                    cancelButtonColor: "#d33",
                                    confirmButtonText: "Yes, accept it!",
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        handle_accept_request(
                                            request.User._id,
                                            request.Service._id
                                        );
                                    }
                                })
                            }
                        >
                            Accept
                        </div>
                    ) : (
                        <div className="w-fit items-center m-auto flex gap-1 bg-green opacity-50 text-white p-1 rounded">
                            Loading
                        </div>
                    )}
                    {!Reject_Loading ? (
                        <div
                            className="w-fit items-center m-auto flex gap-1 bg-red-600 text-white p-1 rounded"
                            onClick={() =>
                                Swal.fire({
                                    title: "Are you sure you want to Reject this Request ?",
                                    text: "You won't be able to revert this!",
                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonColor: "#3085d6",
                                    cancelButtonColor: "#d33",
                                    confirmButtonText: "Yes, reject it!",
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        handle_reject_request(
                                            request.User._id,
                                            request.Service._id
                                        );
                                    }
                                })
                            }
                        >
                            Reject
                        </div>
                    ) : (
                        <div className="w-fit items-center m-auto flex gap-1 bg-red-600 opacity-50 text-white p-1 rounded">
                            Loading
                        </div>
                    )}
                </div>
            </td>
        </tr>
    );
}

export default Card;
