import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useAppContext } from "../../../../AppContext";
import Swal from "sweetalert2";
import Logo_perpole from "../../../../../public/Logo_perpole.png";
import { HiOutlineFolderAdd } from "react-icons/hi";
import { Link } from "react-router-dom";
function Folders() {
    const [loading, setLoading] = useState(true);
    const [Folders, setFolders] = useState([]);
    const { isAuth, set_Auth, set_user, user } = useAppContext();
    const patientId = window.localStorage.getItem("patientId");
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://api.reayahmed.com/patient/${patientId}/folder`,
                {
                    withCredentials: true,
                    // validateStatus: () => true,
                }
            );
            console.log("response from  get Folders :", response.data);
            if (response.status == 200) {
                setFolders(response.data);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                });
            }
        } catch (error) {
            console.log("error from  Get Folders :", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        } finally {
            setLoading(false);
        }
    };
    const [Loading_AddFolder, setLoading_AddFolder] = useState(false);
    const handleAddFolder = async (name) => {
        console.log("data to be sent : ", name);
        if (!name) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please enter a name",
            });
            return;
        }
        setLoading_AddFolder(true);
        try {
            const response = await axios.post(
                `https://api.reayahmed.com/patient/${patientId}/folder/`,
                { name: name },
                {
                    withCredentials: true,
                    // validateStatus: () => true,
                }
            );
            console.log("response from  get Folders :", response.data);
            // if (response.status == 200) {
            setFolders([...Folders, { name, patient: patientId }]);
            console.log("Folders : ", Folders);
            // } else {
            //     Swal.fire({
            //         icon: "error",
            //         title: "Oops...",
            //         text: "Something went wrong!",
            //     });
            // }
        } catch (error) {
            console.log("error from  Get Folders :", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        } finally {
            setLoading_AddFolder(false);
            toogleAddFolder();
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    const [addFolder, setaddFolder] = useState(false);
    function toogleAddFolder() {
        setaddFolder(!addFolder);
    }
    if (loading) {
        return (
            <div
                className=" w-screen md:w-[80vw] h-screen flex items-center 
            justify-center gap-5 flex-col"
            >
                <img src={Logo_perpole} className=" w-24" alt="" />
                <span className="loader"></span>
            </div>
        );
    }
    return (
        <div className=" bg-perpol bg-opacity-40 flex items-center justify-center w-full min-h-screen ">
            <div className=" w-[96%] min-h-[95vh] mx-auto bg-white rounded-lg  relative">
                <div className=" flex flex-col md:flex-row  justify-between mx-10  h-full">
                    <div className=" text-3xl pt-6 pl-6 text-perpol font-bold ">
                        Folders
                    </div>

                    <div
                        onClick={toogleAddFolder}
                        className=" flex items-center justify-center pt-6 gap-2 cursor-pointer"
                    >
                        <HiOutlineFolderAdd className=" text-3xl text-perpol" />
                        <div className=" text-2xl text-perpol">Add Folder</div>
                    </div>
                </div>
                {addFolder && (
                    <div
                        className="absolute top-0 left-50 -translate-x-50 -translate-y-50 w-full h-full mx-auto rounded-lg
                     bg-opacity-50 flex items-center justify-center  transition-all duration bg-gray "
                    >
                        <div className=" w-[90%] md:w-[50%] rounded-lg p-6 bg-white">
                            <div className=" text-3xl text-perpol font-bold text-center pb-4">
                                Add Folder
                            </div>
                            <div className=" text-md pb-2 text-gray   font-semibold">
                                Name
                            </div>
                            <input
                                type="text"
                                id="name_input"
                                className=" w-full h-12 border-2 border-gray_white rounded-lg px-4"
                            />
                            <div className=" flex items-center justify-between gap-6">
                                {Loading_AddFolder ? (
                                    <div className="mx-auto mt-2 small-loader"></div>
                                ) : (
                                    <button
                                        className=" w-1/2 h-12 bg-perpol text-white rounded-lg mt-4"
                                        onClick={() => {
                                            const name =
                                                document.getElementById(
                                                    "name_input"
                                                ).value;
                                            handleAddFolder(name);
                                        }}
                                    >
                                        Add
                                    </button>
                                )}

                                <button
                                    onClick={toogleAddFolder}
                                    className=" w-1/2 h-12 bg-red-500 text-white rounded-lg mt-4"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <div className=" py-12">
                    {Folders.length == 0 ? (
                        <div className=" flex flex-col gap-4 ">
                            <div className=" text-center pt-12 text-xl text-gray font-semibold">
                                You have no Folders
                            </div>
                        </div>
                    ) : (
                        <table className="w-[90%] mx-auto rounded-lg  ">
                            <thead>
                                <tr className="bg-perpol text-white font-semibold">
                                    <th className=" py-2 px-4 text-left rounded-tl-lg border-r">
                                        Name
                                    </th>
                                    <th className=" py-2 px-4 text-left border-r">
                                        Created at
                                    </th>
                                    <th className=" py-2 px-4 text-left rounded-tr-lg">
                                        Size
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {Folders.map((folder) => (
                                    <tr key={folder?.id} className="">
                                        <td className="border border-gray py-2 px-4 w-[50%] text-gray text-sm font-semibold">
                                            {folder?.name}
                                        </td>
                                        <td className="border border-gray py-2 px-4 w-[35%] text-gray text-sm font-semibold text-center">
                                            {folder?.created_at}
                                        </td>
                                        <td className="border border-gray py-2 px-4 w-[15%] text-gray text-sm font-semibold text-center">
                                            15.1mb
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                {/* <div
                    div
                    className=" w-[90%] rounded-lg bg-perpol text-white text-3xl mx-auto mt-6 py-8 
                font-semibold flex items-center justify-between px-12"
                >
                    <div>
                        <div>Next folderment</div>
                        <div>Dr.Mohamed</div>
                    </div>
                    <div className=" text-green">April 18th</div>
                </div> */}
            </div>
        </div>
    );
}

export default Folders;
