import { useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { FcLike } from "react-icons/fc";
import { MdHeartBroken } from "react-icons/md";
import { FaRegCommentDots } from "react-icons/fa";
import { LiaStarSolid } from "react-icons/lia";

import { Formate_Date } from "../../Logic/Formate_Date";
function Current_Websites_Card({ item, onDelete }) {
    const [showDescription, setShowDescription] = useState(false);
    const Navigate = useNavigate();
    function toggleDescription() {
        setShowDescription(!showDescription);
    }
    async function handle_delete_Website(Website) {
        try {
            const response = await axios.delete(
                `http://localhost:3000/Dashboard/Websites/${Website._id}`,
                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            );
            console.log(response);
            if (response.status == 200) {
                onDelete();
                swal.fire("Website Deleted Successfully", "", "success");
            } else if (response.status == 404) {
                swal.fire(
                    " Website Not found ",
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
                    "Could not delete Website",
                    `${response.data.message}`,
                    "error"
                );
            }
        } catch (error) {
            swal.fire(
                "Could not delete Website",
                "Please Try again Latter",
                "error"
            );
        }
    }

    return (
        <div className="w-full flex  justify-between border-b-4 border-b-gray_white">
            <div className=" w-full">
                <div className="relative overflow-hidden pt-5 px-5 flex flex-col md:flex-row shrink-0 justify-start h-fit">
                    <img
                        className="md:w-[30%] md:h-[200px] object-cover"
                        src={`http://localhost:3000/Websites_Images/${item.Image}`}
                        alt={item.Title}
                    />
                    <div className="md:w-[70%] md:pl-6 py-4 break-words flex justify-between">
                        <div className="">
                            {item.Title && (
                                <p className="font-bold text-xl mb-2 overflow-hidden">
                                    {item.Title ? item.Title : "No Title"}
                                </p>
                            )}
                            {item.Link && (
                                <a
                                    href={item.Link}
                                    target="_blank"
                                    className="font-bold text-xl mb-2 overflow-hidden text-purple-600 hover:text-purple-800"
                                >
                                    {item.Link ? item.Link : "No Link"}
                                </a>
                            )}
                            {item.Category && (
                                <>
                                    <p className="text-gray font-semibold text-xl ">
                                        {item.Category ? (
                                            <>
                                                <span className=" text-base">
                                                    Category :{" "}
                                                </span>
                                                {item.Category}
                                            </>
                                        ) : (
                                            "No Category"
                                        )}
                                    </p>
                                </>
                            )}

                            {item.Date && (
                                <p className="font-bold text-base text-gray pt-3 mb-2 overflow-hidden">
                                    {item.Date
                                        ? Formate_Date(item.Date)
                                        : "No Date"}
                                </p>
                            )}
                            <div className=" flex gap-2 text-gray pt-2">
                                <p>Owner : </p>
                                {item.User ? (
                                    <>
                                        <Link
                                            to={`/Users/${item.User._id}`}
                                            target="_blank"
                                            className="font-bold text-xl mb-2 overflow-hidden text-green cursor-pointer"
                                        >
                                            {item.User ? item.User : "No User"}
                                        </Link>
                                    </>
                                ) : (
                                    <span className=" text-blue">Rawabbit</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" flex  justify-center gap-6 ">
                    <div className=" flex flex-col justify-center items-center">
                        <FcLike className="text-3xl" />
                        <span>512</span>
                    </div>
                    <div className=" flex flex-col justify-center items-center">
                        <MdHeartBroken className="text-3xl text-gray" />
                        <span>120</span>
                    </div>
                    <div className=" flex flex-col justify-center items-center">
                        <FaRegCommentDots className="text-3xl text-gray" />
                        <span>64</span>
                    </div>
                    <div className=" flex  text-yallow text-xl">
                        <LiaStarSolid />
                        <LiaStarSolid />
                        <LiaStarSolid />
                        <LiaStarSolid />
                        <LiaStarSolid />
                    </div>
                </div>
                {item.Text && (
                    <p className="text-gray text-lg pl-8 pt-4">
                        {item.Text ? item.Text : "No Text"}
                    </p>
                )}
                <div className="flex justify-center gap-6 md:hidden">
                    <Link
                        to={`/Websites
                /${item._id}/Edit`}
                        className="select-none flex items-center justify-start md:gap-2 text-white text-xl bg-green px-1 md:px-2  py-1 rounded md:w-[100px]"
                    >
                        <MdEdit /> Edit
                    </Link>
                    <div
                        className="flex items-center justify-start md:gap-2 cursor-pointer text-white bg-red-600 text-xl px-1 md:px-2 py-1 rounded md:w-[100px]"
                        onClick={() => {
                            swal.fire({
                                title: "Are you sure you want to delete this Website ?",
                                text: "You won't be able to revert this!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "red",
                                cancelButtonColor: "green",
                                confirmButtonText: "Yes Delete it",
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    handle_delete_Website(item);
                                }
                            });
                        }}
                    >
                        <MdDelete />
                        Delete
                    </div>
                </div>
                {showDescription ? (
                    <div className="w-[80%] pl-8 py-4">
                        <div
                            className="flex gap-2 items-center justify-start underlined pb-4 cursor-pointer"
                            onClick={toggleDescription}
                        >
                            Show Description <FaArrowUp />
                        </div>
                        <div className="pb-4">
                            {item.Description && (
                                <p className="text-gray text-base">
                                    {item.Description}
                                </p>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="w-[80%] pl-8 py-4">
                        <div
                            className="flex gap-2 items-center justify-start underlined pb-4 cursor-pointer"
                            onClick={toggleDescription}
                        >
                            Show Description <FaArrowDown />
                        </div>
                    </div>
                )}
            </div>
            <div className="w-[10%] hidden md:flex flex-col items-center justify-start pt-6 gap-4 pr-5">
                <Link
                    to={`/Websites/${item._id}/Edit`}
                    className="select-none flex items-center justify-start md:gap-2 text-white text-xl bg-green px-1 md:px-2  py-1 rounded md:w-[100px]"
                >
                    <MdEdit /> Edit
                </Link>
                <div
                    className="flex items-center justify-start md:gap-2 cursor-pointer text-white bg-red-600 text-xl px-1 md:px-2 py-1 rounded md:w-[100px]"
                    onClick={() => {
                        swal.fire({
                            title: "Are you sure you want to delete this Website ?",
                            text: "You won't be able to revert this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "red",
                            cancelButtonColor: "green",
                            confirmButtonText: "Yes Delete it",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                handle_delete_Website(item);
                            }
                        });
                    }}
                >
                    <MdDelete />
                    Delete
                </div>
            </div>
        </div>
    );
}

export default Current_Websites_Card;
