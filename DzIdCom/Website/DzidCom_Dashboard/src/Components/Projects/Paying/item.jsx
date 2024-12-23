import React from "react";
import { useState, useEffect, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FaRegImage } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
function Payment() {
    const location = useLocation();
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [project, setProject] = useState(null);
    const [only_see, set_only_see] = useState(false);
    const [deletLoading, setDeleteLoading] = useState(false);

    const [image_state, setimage_state] = useState(null);
    const [imageChanged, setimageChanged] = useState(false);
    const fileInputRef = useRef(null);
    const [image_from_server, setimage_from_server] = useState(null);
    const [AcceptLoading, setAcceptLoading] = useState(false);
    const [RejectLoading, setRejectLoading] = useState(false);
    const projectId = location.pathname.split("/")[2];
    useEffect(() => {
        setLoading(true);
        const fetchProjects = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/Admin/Payment/${projectId}`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );
                if (response.status === 200) {
                    const projectsData = response.data.project;
                    setProject(projectsData);
                } else if (response.status === 401) {
                    Swal.fire("Error", "You should login again", "error");
                    Navigate("/Login");
                } else {
                    setError(response.data);
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);
    const handle_Accept = async () => {
        setAcceptLoading(true);
        try {
            let response = await axios.post(
                `http://localhost:3000/Admin/Payment/${
                    location.pathname.split("/")[2]
                }/Accept`,
                {},
                // Reason,
                {
                    withCredentials: true,
                    // validateStatus: () => true,
                }
            );
            if (response.status == 200) {
                Swal.fire(
                    "Success",
                    "Payment Accepteed Successfully",
                    "success"
                );
                Navigate("/Projects_Paying");
            } else if (response.status == 401) window.location.href = "Login";
            else {
                Swal.fire(
                    "Error!",
                    `Something Went Wrong ,please trye again latter, ${response.data.message} `,
                    "error"
                );
            }
        } catch (error) {
            Swal.fire(
                "Error!",
                `Something Went Wrong ,please trye again latter`,
                "error"
            );
        } finally {
            setAcceptLoading(false);
        }
    };
    const handle_Reject = async () => {
        setRejectLoading(true);
        try {
            let response = await axios.post(
                `http://localhost:3000/Admin/Payment/${
                    location.pathname.split("/")[2]
                }/Reject`,
                {},
                // Reason,
                {
                    withCredentials: true,
                    // validateStatus: () => true,
                }
            );
            if (response.status == 200) {
                Swal.fire(
                    "Success",
                    "Payment Rejected Successfully",
                    "success"
                );
                Navigate("/Projects_Paying");
            } else if (response.status == 401) window.location.href = "Login";
            else {
                Swal.fire(
                    "Error!",
                    `Something Went Wrong ,please trye again latter, ${response.data.message} `,
                    "error"
                );
            }
        } catch (error) {
            Swal.fire(
                "Error!",
                `Something Went Wrong ,please trye again latter`,
                "error"
            );
        } finally {
            setRejectLoading(false);
        }
    };
    return (
        <div className="py-6 px-4">
            <div className="text-xl font-semibold text-perpol_b pb-6">
                Project Payment
            </div>
            <div className=" text-center font-semibold pb-12">
                {project?.status === "Payed" ? (
                    <>
                        <div className="">
                            <span className="text-green_v">Payed :</span> Client
                            Payed the Project fees
                        </div>
                    </>
                ) : !project?.isPayment_ScreenShot_uploaded &&
                  project?.status === "Accepted" &&
                  project?.FreelancerId ? (
                    <>
                        <div className="">
                            <span className=" text-red-500">
                                Client have not yet uploaded payment screenshot
                            </span>
                        </div>
                    </>
                ) : project?.isPayment_ScreenShot_uploaded &&
                  project?.status === "Accepted" &&
                  project?.FreelancerId &&
                  !project?.isPayment_ScreenShot_Rejected ? (
                    <div className="">
                        <span className="text-green_v">
                            Client uploaded the payment screenshot :
                        </span>{" "}
                        <span className=" text-gray_v">
                            Waiting for Payment Validation
                        </span>
                    </div>
                ) : project?.isPayment_ScreenShot_uploaded &&
                  project?.status === "Accepted" &&
                  project?.FreelancerId &&
                  project?.isPayment_ScreenShot_Rejected ? (
                    <>
                        <div className="">
                            <span className="text-red-500">
                                Payment Rejected :
                            </span>{" "}
                            <span className=" text-gray_v">
                                Waiting Client to reupload the Payment
                                screenshot
                            </span>
                        </div>
                    </>
                ) : project?.status === "Accepted" && !project?.FreelancerId ? (
                    <div>
                        <span className="text-perpol_v">Accepted :</span>{" "}
                        Wainting for freelancers to Apply for this project
                    </div>
                ) : null}
            </div>
            <div className=" text-lg pb-2 font-semibold md:mx-20">
                Payment Informations
            </div>

            <div className=" text-gray_v flex justify-center md:justify-start flex-col md:flex-row items-start gap-3 md:gap-12 md:mx-24 ">
                <div>
                    <div className=" flex flex-col gap-4">
                        <div>
                            Project fees :{" "}
                            <span className=" font-semibold">
                                {project?.Money ? project?.Money : "non set"}
                            </span>
                        </div>
                        <div>
                            DeadLine :{" "}
                            <span className=" font-semibold">
                                {project?.DeadLine
                                    ? project?.DeadLine
                                    : "non set"}
                            </span>
                        </div>
                        <div>
                            {" "}
                            Client ccp number :{" "}
                            <span className=" font-semibold">
                                {project?.Client_CCP_number
                                    ? project?.Client_CCP_number
                                    : "non set"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {project?.Pyament_ScreenShot_Link && (
                <div className=" pt-8">
                    <div className=" flex justify-center w-full">
                        <a
                            href={
                                "http://localhost:3000" +
                                project?.Pyament_ScreenShot_Link
                            }
                            target="_blank"
                        >
                            <img
                                src={
                                    "http://localhost:3000" +
                                    project?.Pyament_ScreenShot_Link
                                }
                                alt="Payment screen shot"
                                className=" w-[300px] h-[300px] object-cover rounded-lg  "
                            />
                        </a>
                    </div>
                    {!project?.isPayment_ScreenShot_Rejected && (
                        <div className=" py-12 flex justify-center items-center gap-12 ">
                            {AcceptLoading ? (
                                <div className=" small-loader mx-12"></div>
                            ) : (
                                <div
                                    className=" bg-green_v cursor-pointer py-2 px-4 rounded-xl text-white font-semibold "
                                    onClick={handle_Accept}
                                >
                                    Accept Payment{" "}
                                </div>
                            )}
                            {RejectLoading ? (
                                <div className=" small-loader mx-12"></div>
                            ) : (
                                <div
                                    className=" bg-red-500 cursor-pointer py-2 px-4 rounded-xl text-white font-semibold"
                                    onClick={handle_Reject}
                                >
                                    Reject Payment{" "}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
const errorInputMessage = {
    position: "absolute",
    bottom: "-22px",
    left: "5px",
    fontSize: "12px",
    color: "red",
};
export default Payment;
