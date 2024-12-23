import { useOutletContext } from "react-router";
import img from "../../../../../public/wallpaper.jpg";
import { useNavigate } from "react-router";
import { useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import swal from "sweetalert2";
import axios from "axios";
function Card({ WebSite }) {
    const [user, setUser] = useOutletContext();
    if (!user) return null;
    const userId = user._id;
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [showDescription, setShowDescription] = useState(false);
    const Navigate = useNavigate();
    function toggleDescription() {
        setShowDescription(!showDescription);
    }
    async function handle_delete_WebSite(WebSite) {
        try {
            setDeleteLoading(true);
            const response = await axios.delete(
                `http://localhost:3000/Dashboard/Users/${userId}/Websites/${WebSite._id}`,
                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            );
            if (response.status == 200) {
                swal.fire("WebSite Deleted Successfully", "", "success");
                setUser((prevUser) => ({
                    ...prevUser,
                    Websites: prevUser.Websites.filter(
                        (c) => c._id !== WebSite._id
                    ),
                }));
            } else if (response.status == 404) {
                swal.fire(
                    " WebSite Not found ",
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
                    "Could not delete WebSite",
                    `${response.data.message}`,
                    "error"
                );
            }
        } catch (error) {
            swal.fire(
                "Could not delete WebSite",
                "Please Try again Latter",
                "error"
            );
        } finally {
            setDeleteLoading(false);
        }
    }
    return (
        <div className="w-full flex justify-between border-b-4 border-b-gray_white">
            <div className=" w-full">
                <div className="relative overflow-hidden py-5 px-5 flex shrink-0 justify-start h-fit">
                    <img
                        className="w-[30%] h-[200px] object-cover"
                        src={img}
                        alt={WebSite.Title}
                    />
                    <div className="w-[70%] pl-6 py-4 flex justify-between">
                        <div className="">
                            {WebSite.Title && (
                                <p className="font-bold text-xl mb-2 overflow-hidden">
                                    {WebSite.Title}
                                </p>
                            )}
                            {WebSite.Text && (
                                <p className="text-gray text-base">
                                    {WebSite.Text}
                                </p>
                            )}
                            {WebSite.Category && (
                                <p className="text-gray font-semibold text-xl pt-4">
                                    {WebSite.Category}
                                </p>
                            )}
                            {WebSite.Price && (
                                <div className="text-gray pt-4  text-xl font-semibold top-10 right-5 ">
                                    {WebSite.Price} DA
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {showDescription ? (
                    <div className="w-[80%] pl-8 pb-4">
                        <div
                            className="flex gap-2 items-center justify-start underlined pb-4 cursor-pointer"
                            onClick={toggleDescription}
                        >
                            Show Description <FaArrowUp />
                        </div>
                        <div className="pb-4">
                            {WebSite.Description && (
                                <p className="text-gray text-base">
                                    {WebSite.Description}
                                </p>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="w-[80%] pl-8 pb-4">
                        <div
                            className="flex gap-2 items-center justify-start underlined pb-4 cursor-pointer"
                            onClick={toggleDescription}
                        >
                            Show Description <FaArrowDown />
                        </div>
                    </div>
                )}
            </div>
            <div className="w-[10%] flex flex-col items-center justify-start pt-6 gap-4 pr-5">
                {deleteLoading ? (
                    <div className="flex items-center justify-start gap-2 cursor-pointer text-white bg-red-600 opacity-50 text-xl px-2 py-1 rounded w-[100px]">
                        Loading
                    </div>
                ) : (
                    <div
                        className="flex items-center justify-start gap-2 cursor-pointer text-white bg-red-600 text-xl px-2 py-1 rounded w-[100px]"
                        onClick={() => {
                            swal.fire({
                                title: "Are you sure you want to delete this WebSite from this user ?",
                                text: "You won't be able to revert this!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "red",
                                cancelButtonColor: "green",
                                confirmButtonText: "Yes Delete it",
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    handle_delete_WebSite(WebSite);
                                }
                            });
                        }}
                    >
                        <MdDelete />
                        Delete
                    </div>
                )}
            </div>
        </div>
    );
}

export default Card;
