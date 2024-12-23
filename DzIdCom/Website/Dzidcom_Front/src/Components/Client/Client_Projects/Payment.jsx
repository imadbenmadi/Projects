import React from "react";
import Logo from "../../../../public/Logo.png";
import CCP_icon from "../../../../public/CCP.png";
import { useState, useEffect, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FaRegImage } from "react-icons/fa";
import { useAppContext } from "../../../AppContext";
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

    const { user, set_user } = useAppContext();
    const [image_state, setimage_state] = useState(null);
    const [imageChanged, setimageChanged] = useState(false);
    const fileInputRef = useRef(null);
    const [image_from_server, setimage_from_server] = useState(null);

    useEffect(() => {
        const fetchProject = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `http://localhost:3000/Clients/${user?.id}/Payment/${
                        location.pathname.split("/")[3]
                    }/status`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );
                if (response.status === 200) {
                    const project = response.data.Project;
                    setProject(project);
                    set_only_see(response.data.only_see);
                    setimage_from_server(project?.Pyament_ScreenShot_Link);
                    if (
                        !response.data.Payment_Authorization &&
                        !response.data.only_see
                    )
                        Navigate(`/Client/Projects/${project.id}`);
                } else if (response.status === 401) {
                    Swal.fire("Error", "you should login again", "error");
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

        fetchProject();
    }, []);
    useEffect(() => { 
        if (image_state) setimageChanged(true);
        else if (!image_state) setimageChanged(false);
        else setimageChanged(false);
    }, [image_state]);
    const handle_post_payment = async (values, { setSubmitting }) => {
        setSubmitting(true);
        let formData = new FormData();
        formData.append("CCP_number", values.CCP_number);
        formData.append("image", image_state);
        formData.append("projectId", project.id);

        try {
            const response = await axios.post(
                `http://localhost:3000/upload/Payment`,
                formData,
                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            );
            if (response.status === 200) {
                Swal.fire(
                    "Success",
                    "Payment has been sent, ower team gonna validate your payment and contact you soon. ",
                    "success"
                );
                Navigate("/Client/Projects");
            } else if (response.status === 401) {
                Swal.fire("Error", "you should login again", "error");
                Navigate("/Login");
            } else {
                Swal.fire("Error", response.data, "error");
            }
        } catch (error) {
            Swal.fire("Error", error, "error");
        } finally {
            setSubmitting(false);
        }
    };
    // const handle_Delete_payment = async () => {
    //     setDeleteLoading(true);
    //     let formData = new FormData();
    //     // formData.append("CCP_number", values.CCP_number);
    //     // formData.append("image", image_state);
    //     formData.append("projectId", project.id);
    //
    //     try {
    //         const response = await axios.delete(
    //             `http://localhost:3000/upload/Payment`,
    //             formData,
    //             {
    //                 withCredentials: true,
    //                 validateStatus: () => true,
    //             }
    //         );
    //         if (response.status === 200) {
    //             Swal.fire("Success", "Payment has been Deleted. ", "success");
    //             // Navigate("/Client/Projects");
    //         } else if (response.status === 401) {
    //             Swal.fire("Error", "you should login again", "error");
    //             Navigate("/Login");
    //         } else {
    //             Swal.fire("Error", response.data, "error");
    //         }
    //     } catch (error) {
    //         Swal.fire("Error", error, "error");
    //     } finally {
    //         setDeleteLoading(false);
    //     }
    // };
    return (
        <div className=" w-[90%] mx-auto max-w-[900px] py-12">
            <div className=" text-lg pb-2 font-semibold">
                Payment Informations
            </div>
            <div className=" text-sm font-semibold text-gray_v pb-6 ">
                Please remit all project fees to the following bank account:
                <span className=" text-xs">CCP</span>
            </div>
            <div className=" text-gray_v flex justify-center md:justify-start flex-col md:flex-row items-start gap-3 md:gap-12 ">
                <img
                    src={CCP_icon}
                    alt=""
                    className=" w-[170px]  object-cover"
                />
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
                            numéro du ccp :{" "}
                            <span className=" font-semibold">0025800221</span>
                        </div>
                        <div>
                            Clé : <span className=" font-semibold">14</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" flex flex-col text-center gap-2 pt-6">
                Contact flexedu :{" "}
                <span className=" font-semibold flex flex-col gap-1 ">
                    <a href="mailto:dziidcom@gmail.com">dziidcom@gmail.com</a>
                    <a href="tel:+213784321399">0784321399</a>
                </span>
            </div>
            <div className=" pt-8">
                {!only_see ? (
                    <Formik
                        initialValues={{
                            userId: user?.id || null,
                            CCP_number: "",
                        }}
                        validate={(values) => {
                            const errors = {};

                            if (!values.CCP_number) {
                                errors.CCP_number = "CCP number is Required";
                            } else if (!/^\d+$/.test(values.CCP_number))
                                errors.CCP_number =
                                    "CCP number must be a number";
                            else if (values.CCP_number.length < 3)
                                errors.CCP_number = "at least 3 chars";
                            else if (values.CCP_number.length > 50)
                                errors.CCP_number = "Max 50 chars";

                            return errors;
                        }}
                        onSubmit={async (values, { setSubmitting }) => {
                            if (!image_state) {
                                Swal.fire(
                                    "Error",
                                    "Please upload a payment screenshot",
                                    "error"
                                );
                                setSubmitting(false);
                                return;
                            }
                            handle_post_payment(values, {
                                setSubmitting,
                            });
                        }}
                    >
                        {({ isSubmitting, setFieldValue }) => (
                            <>
                                <Form className="  flex flex-col text-sm md:text-lg   text-black_text">
                                    <div className=" relative mx-auto">
                                        <div className=" font-semibold text-sm pb-1">
                                            Your CCP Number{" "}
                                        </div>
                                        <Field
                                            placeholder="0022222222"
                                            type="text"
                                            name="CCP_number"
                                            disabled={isSubmitting}
                                            className="border border-gray_white px-4 py-2 rounded-lg  text-sm  w-[300px]"
                                        />
                                        <ErrorMessage
                                            name="CCP_number"
                                            component="div"
                                            style={errorInputMessage}
                                        />
                                    </div>
                                    <div className="py-6">
                                        <div className="  text-center font-semibold">
                                            Payment ScreenShot
                                        </div>

                                        <div className="flex  items-center justify-center  w-full ">
                                            <div className="">
                                                <input
                                                    id="payment_screenshot"
                                                    type="file"
                                                    name="image"
                                                    accept="image/*"
                                                    onChange={(event) => {
                                                        setimage_state(
                                                            event.currentTarget
                                                                .files[0]
                                                        );
                                                    }}
                                                    ref={fileInputRef}
                                                    // disabled={isSubmitting}
                                                    className="hidden" // Hide the default file input button
                                                />
                                            </div>

                                            <div className="flex flex-col items-center justify-center gap-1 mt-3  rounded-lg">
                                                {image_from_server ? (
                                                    <>
                                                        <img
                                                            src={
                                                                "http://localhost:3000/" +
                                                                project.Pyament_ScreenShot_Link
                                                            }
                                                            id="img_from_server"
                                                            alt="Payment screen shot"
                                                            className=" w-[300px] h-[300px] object-cover rounded-lg"
                                                        />
                                                        {deletLoading ? (
                                                            <div className=" small-loader mt-2"></div>
                                                        ) : (
                                                            <div
                                                                className="  mt-2 text-white w-fit mx-auto rounded-lg px-3 font-semibold text-lg
                                                              bg-gray-400 cursor-pointer"
                                                                onClick={() => {
                                                                    setimage_state(
                                                                        null
                                                                    );
                                                                    // setimageChanged(false);
                                                                    if (
                                                                        fileInputRef.current
                                                                    ) {
                                                                        fileInputRef.current.value =
                                                                            "";
                                                                    }
                                                                    // handle_Delete_payment();
                                                                    document.getElementById(
                                                                        "img_from_server"
                                                                    ).src = "";
                                                                    setimage_from_server(
                                                                        null
                                                                    );
                                                                    // project?.Pyament_ScreenShot_Link="";
                                                                }}
                                                            >
                                                                {/* <IoClose /> */}
                                                                Delete
                                                                Screenshot
                                                            </div>
                                                        )}

                                                        {/* {imageDeleteLoading ? (
                                        <span className="small-loader mt-5"></span>
                                    ) : (
                                        <div
                                            className="  mt-2 text-white w-fit mx-auto rounded-lg px-3 font-semibold text-lg
                                         bg-gray-400 cursor-pointer"
                                            onClick={() => {
                                                Delete_Profile_Pic(
                                                    setimageDeleteLoading,
                                                    set_user,
                                                    setimage_state
                                                );
                                            }}
                                        >
                                            Remove
                                        </div>
                                    )} */}
                                                    </>
                                                ) : image_state ? (
                                                    <div className=" relative ">
                                                        <img
                                                            src={URL.createObjectURL(
                                                                image_state
                                                            )} // Create a URL for the selected image
                                                            alt="Selected Image"
                                                            // ref={fileInputRef}
                                                            className=" w-[300px] h-[300px]  object-cover rounded-lg "
                                                        />
                                                        <div
                                                            className="  mt-2 text-white w-fit mx-auto rounded-lg px-3 font-semibold text-lg
                                                 bg-gray-400 cursor-pointer"
                                                            onClick={() => {
                                                                setimage_state(
                                                                    null
                                                                );
                                                                // setimageChanged(false);
                                                                if (
                                                                    fileInputRef.current
                                                                ) {
                                                                    fileInputRef.current.value =
                                                                        "";
                                                                }
                                                            }}
                                                        >
                                                            {/* <IoClose /> */}
                                                            Cancel
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div
                                                        className="w-[300px] h-[300px]  bg-gray_white text-gray rounded-lg flex items-center justify-center cursor-pointer"
                                                        onClick={() =>
                                                            document
                                                                .getElementById(
                                                                    "payment_screenshot"
                                                                )
                                                                .click()
                                                        }
                                                    >
                                                        <FaRegImage className=" text-gray_v text-2xl" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {isSubmitting ? (
                                        <span className="small-loader  w-full m-auto"></span>
                                    ) : (
                                        <button
                                            type="submit"
                                            className=" bg-perpol_v py-2 rounded-2xl text-white font-semibold "
                                            disabled={isSubmitting}
                                        >
                                            Continue
                                        </button>
                                    )}
                                </Form>
                            </>
                        )}
                    </Formik>
                ) : (
                    <div className=" flex justify-center w-full">
                        <img
                            src={
                                "http://localhost:3000/" +
                                project.Pyament_ScreenShot_Link
                            }
                            alt="Payment screen shot"
                            className=" w-[300px] h-[300px] object-cover rounded-lg"
                        />
                    </div>
                )}
            </div>
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
