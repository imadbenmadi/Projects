import { Link } from "react-router-dom";
import { MdOutlineDeleteForever } from "react-icons/md";

import { FaPen } from "react-icons/fa";
import { useLocation } from "react-router";
import axios from "axios";
import swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useOutletContext } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";
import { FaMessage } from "react-icons/fa6";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useState, useEffect } from "react";
import ErrorPage from "../../../Components/ErrorPage";
import { TbWorld } from "react-icons/tb";
import { IoIosPaper } from "react-icons/io";
function Default() {
    const [userData, setUserData] = useState(null);
    const [user, setUser] = useOutletContext();
    const Navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const location = useLocation();

    const userId = location.pathname.split("/")[2];
    const fetchUser = async () => {
        setLoading(true);

        try {
            const response = await axios.get(
                `http://localhost:3000/Dashboard/Users/${userId}`,
                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            );
            if (response.status == 200) {
                setUserData(response.data);
                setUser(response.data);
            } else {
                setError(response.data);
            }
        } catch (error) {
            setError(error);
        }
        setLoading(false);
    };
    useEffect(() => {
        fetchUser();
    }, []);
    // if (loading)
    //     return (
    //         <div className=" w-[100%] h-[200px] flex items-center justify-center">
    //             <span className="loader"></span>
    //         </div>
    //     );
    // if (error) {
    //     return <ErrorPage />;
    // }
    async function handle_delete_user() {
        try {
            const response = await axios.delete(
                `http://localhost:3000/Dashboard/Users/${userId}`,
                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            );

            if (response.status == 200) {
                Navigate("/Users");
                swal.fire("User Deleted Successfully", "", "success");

                // setsecces(true);
            } else if (response.status == 404) {
                swal.fire(
                    " User Not found ",
                    " Refresh the page please",
                    "info"
                );
            } else if (response.status == 401) {
                swal.fire({
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
            } else {
                swal.fire(
                    "Could not delete user",
                    `${response.data.message}`,
                    "error"
                );
            }
        } catch (error) {
            swal.fire(
                "Could not delete user",
                "Please Try again Latter",
                "error"
            );
        }
    }

    return (
        <div>
            {error ? (
                <ErrorPage />
            ) : loading ? (
                <div className="w-[100%] h-[200px] flex items-center justify-center">
                    <span className="loader"></span>
                </div>
            ) : (
                <div className="">
                    <Link
                        to={"/Users"}
                        className="select-none mt-4 w-fit m-auto bg-green rounded cursor-pointer text-white text-xl flex items-center gap-2 px-3 py-1"
                    >
                        <IoMdArrowRoundBack />
                        <div>Back to table</div>
                    </Link>
                    <div className="flex flex-wrap gap-4 md:gap-10 pt-6 justify-center text-xl">
                        <Link
                            to={"/Users/" + userId + "/Notification"}
                            className="select-none flex items-center cursor-pointer gap-1 bg-gray text-white px-3 py-1 rounded"
                        >
                            <IoIosNotifications />
                            Send Notification
                        </Link>
                        <Link
                            to={"/Users/" + userId + "/Edit"}
                            className="select-none flex items-center gap-1 bg-green text-white px-3 py-1 rounded"
                        >
                            <FaPen />
                            Edit user
                        </Link>
                        <div
                            onClick={() => {
                                swal.fire({
                                    title: "Are you sure you want to delete this user ?",
                                    text: "You won't be able to revert this!",
                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonColor: "red",
                                    cancelButtonColor: "green",
                                    confirmButtonText: "Yes Delete it",
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        handle_delete_user();
                                    }
                                });
                            }}
                            className="flex items-center cursor-pointer gap-1 bg-red-500 text-white px-3 py-1 rounded"
                        >
                            <MdOutlineDeleteForever />
                            Delete user
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-4 text-lg md:text-2xl pl-8 mr-4 md:pl-0 md:mr-0">
                        <div className="bg-gray_white rounded mt-8 w-fit">
                            {userData && (
                                <table className="w-full">
                                    <tbody>
                                        <tr className="">
                                            <th className="text-left md:pr-4 border md:p-2">
                                                First name:
                                            </th>
                                            <td className="border border-gray p-3">
                                                {userData.FirstName}
                                            </td>
                                        </tr>
                                        <tr className="">
                                            <th className="text-left md:pr-4 border md:p-2">
                                                Last name:
                                            </th>
                                            <td className="border border-gray p-3">
                                                {userData.LastName}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="text-left md:pr-4 border md:p-2">
                                                Email:
                                            </th>
                                            <td className="border border-gray p-3">
                                                {userData.Email}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="text-left md:pr-4 border md:p-2">
                                                Telephone:
                                            </th>
                                            <td className="border border-gray p-3">
                                                {userData.Telephone}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="text-left md:pr-4 border md:p-2">
                                                Gender:
                                            </th>
                                            <td className="border border-gray p-3">
                                                {userData.Gender}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="text-left md:pr-4 border md:p-2">
                                                Status:
                                            </th>
                                            <td className="border border-gray p-3">
                                                {userData.IsEmailVerified ==
                                                true
                                                    ? "Verified"
                                                    : "Not Verified"}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-2 md:gap-10 pt-10 justify-center text-lg md:text-xl text-center">
                        <div className=" flex flex-col">
                            <Link
                                to={"/Users/" + userId + "/Websites"}
                                className="select-none flex items-center mb-7 justify-center cursor-pointer gap-1 bg-green text-white px-3 py-2 rounded"
                            >
                                <TbWorld className=" text-3xl" />
                                User Websites
                            </Link>
                            <Link
                                to={"/Users/" + userId + "/Requests"}
                                className="select-none flex items-center mb-7 justify-center cursor-pointer gap-1 bg-green text-white px-3 py-2 rounded"
                            >
                                <IoIosPaper className=" text-3xl" />
                                User Requests
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Default;
