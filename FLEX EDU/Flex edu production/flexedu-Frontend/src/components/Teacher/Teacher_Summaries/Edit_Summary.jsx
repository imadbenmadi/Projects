import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useAppContext } from "../../../AppContext";
import Swal from "sweetalert2";
import edit_Summary from "./Api/edit_Summary";
import Axios from "axios";
import axios from "axios";
import { FaMoneyBillWave } from "react-icons/fa";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useLocation } from "react-router-dom";
import { FaRegImage } from "react-icons/fa";
import Delete_SummaryPic from "./Api/Delete_SummaryPic";

dayjs.extend(customParseFormat);
function Edit_Summary() {
    const { user } = useAppContext();
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [Summary, setSummary] = useState();
    const [Vedios, setVedios] = useState([]);
    const location = useLocation();
    const SummaryId = location.pathname.split("/")[3];
    const fileInputRef = useRef(null);
    const [imageChanged, setimageChanged] = useState(false);
    const [image_state, setimage_state] = useState(null);
    const [imageDeleteLoading, setimageDeleteLoading] = useState(false);

    useEffect(() => {
        if (image_state) setimageChanged(true);
        else if (!image_state) setimageChanged(false);
        else setimageChanged(false);
    }, [image_state]);
    useEffect(() => {
        setLoading(true);
        const FetchSummary = async ({ setSummary, setLoading, setError }) => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `https://api.flexedu-dz.com/Teachers/${user?.id}/Summaries/${SummaryId}`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );

                if (response.status == 200) {
                    const Summary = response.data.Summary;
                    setSummary(Summary);
                    setVedios[Summary?.Summary_Videos];
                } else if (response.status == 401) {
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
        FetchSummary({ setSummary, setLoading, setError });
    }, []);
    if (loading) {
        return (
            <div className=" w-screen h-[80vh] flex flex-col items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    } else if (error)
        return (
            <div className=" w-screen h-[calc(100vh-60px)] flex items-center justify-center">
                <div className="text-red-600 font-semibold">
                    {error.message}
                </div>
            </div>
        );
    else
        return (
            <div className=" w-full    bg-white flex flex-col items-center py-12 ">
                <Link
                    to={`/Teacher/Summaries/${SummaryId}`}
                    className=" text-green-600 pb-6 underline"
                >
                    Go back
                </Link>
                <div className=" text-black_text">
                    <div className="   ">
                        <div className=" text-3xl font-semibold ">
                            Edit Summary
                        </div>
                    </div>

                    <div>
                        <Formik
                            initialValues={{
                                Title: Summary?.Title || "",
                                Description: Summary?.Description || "",
                                Price: Summary?.Price || 0,
                                Category: Summary?.Category || "",
                                SummaryPic: Summary?.Image || "",

                                TeacherId: user?.id,
                                SummaryId: SummaryId,
                            }}
                            validate={(values) => {
                                const errors = {};

                                if (!values.Title) {
                                    errors.Title = "First Name is Required";
                                } else if (values.Title.length < 3)
                                    errors.Title = " At least 3 chars";
                                else if (values.Title.length > 30)
                                    errors.Title = " At most 30 chars";
                                if (!values.Description) {
                                    errors.Description =
                                        "Last Name is Required";
                                } else if (values.Description.length < 3)
                                    errors.Description = " At least 3 chars";
                                else if (values.Description.length > 30)
                                    errors.Description = " At most 30 chars";
                                if (values.Price === "") {
                                    errors.Price = "Price is required";
                                } else if (Number(values.Price) < 0) {
                                    errors.Price =
                                        "Price must be a positive number";
                                }
                                if (!values.Category) {
                                    errors.Category = "Category is Required";
                                }

                                return errors;
                            }}
                            onSubmit={async (values, { setSubmitting }) => {
                                // setSubmitting(false);
                                if (!values.TeacherId) {
                                    setSubmitting(false);
                                    Swal.fire(
                                        "Error",
                                        "Unauthorized: missing userId",
                                        "error"
                                    );
                                } else {
                                    try {
                                        if (image_state) {
                                            let formData = new FormData();
                                            formData.append(
                                                "summaryPic",
                                                image_state
                                            );
                                            let Image_Response =
                                                await Axios.post(
                                                    `https://api.flexedu-dz.com/upload/Summaries/${SummaryId}/Image`,
                                                    formData,
                                                    {
                                                        withCredentials: true,
                                                        validateStatus: () =>
                                                            true,
                                                    }
                                                );

                                            if (Image_Response.status == 401) {
                                                window.location.href = "/Login";
                                            }
                                        }
                                        edit_Summary(values, { setSubmitting });
                                    } catch (error) {
                                        setSubmitting(false);

                                        Swal.fire(
                                            "Error!",
                                            `Something Went Wrong ,please trye again latter`,
                                            "error"
                                        );
                                    }
                                }
                            }}
                        >
                            {({ isSubmitting, setFieldValue, values }) => (
                                <Form className="  flex flex-col text-sm md:text-lg  gap-4 text-black_text">
                                    <div className=" w-full">
                                        <input
                                            id="image"
                                            type="file"
                                            name="image"
                                            accept="image/*"
                                            onChange={(event) => {
                                                setimage_state(
                                                    event.currentTarget.files[0]
                                                );
                                            }}
                                            ref={fileInputRef}
                                            // disabled={isSubmitting}
                                            className="hidden" // Hide the default file input button
                                        />
                                    </div>
                                    <div className="flex flex-col items-center gap-1">
                                        {Summary?.Image ? (
                                            <>
                                                <img
                                                    src={`https://api.flexedu-dz.com/${Summary?.Image}`}
                                                    alt="Profile Pic"
                                                    className=" w-[150px] h-[150px] object-cover rounded-full"
                                                />
                                                {imageDeleteLoading ? (
                                                    <span className="small-loader mt-5"></span>
                                                ) : (
                                                    <div
                                                        className="  mt-2 text-white w-fit mx-auto rounded-lg px-3 font-semibold text-lg
                                         bg-gray-400 cursor-pointer"
                                                        onClick={() => {
                                                            Delete_SummaryPic(
                                                                setimageDeleteLoading,
                                                                setSummary,
                                                                Summary,
                                                                setimage_state
                                                            );
                                                        }}
                                                    >
                                                        {/* <IoClose /> */}
                                                        Remove
                                                    </div>
                                                )}
                                            </>
                                        ) : image_state ? (
                                            <div className=" relative ">
                                                <img
                                                    src={URL.createObjectURL(
                                                        image_state
                                                    )} // Create a URL for the selected image
                                                    alt="Selected Image"
                                                    // ref={fileInputRef}
                                                    className=" w-[150px] h-[150px]  object-cover rounded-full"
                                                />
                                                <div
                                                    className="  mt-2 text-white w-fit mx-auto rounded-lg px-3 font-semibold text-lg
                                         bg-gray-400 cursor-pointer"
                                                    onClick={() => {
                                                        setimage_state(null);
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
                                                className="w-[150px] h-[150px]  bg-gray_white text-gray rounded-full flex items-center justify-center cursor-pointer"
                                                onClick={() =>
                                                    document
                                                        .getElementById("image")
                                                        .click()
                                                }
                                            >
                                                <FaRegImage className=" text-gray_v text-2xl" />
                                            </div>
                                        )}
                                    </div>
                                    <div className=" flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4 w-full pb-6 ">
                                        <div className="w-full  md:w-[50%]  relative">
                                            <div className="  font-semibold text-sm pb-1">
                                                Title
                                            </div>
                                            <Field
                                                placeholder="Title"
                                                type="text"
                                                name="Title"
                                                disabled={isSubmitting}
                                                className="w-full border border-gray_white px-4 py-2 rounded-lg  text-sm "
                                            />
                                            <ErrorMessage
                                                name="Title"
                                                component="div"
                                                style={names_errorInputMessage}
                                            />
                                        </div>
                                        <div className="  w-full  md:w-[50%] relative">
                                            <div className="font-semibold text-sm pb-1">
                                                Describtion
                                            </div>
                                            <Field
                                                placeholder="Describtion"
                                                type="text"
                                                name="Description"
                                                disabled={isSubmitting}
                                                className="border border-gray_white px-4 py-2 rounded-lg  text-sm  w-full"
                                            />
                                            <ErrorMessage
                                                name="Description"
                                                component="div"
                                                style={names_errorInputMessage}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="flex items-center text-gray-700 font-semibold mb-2">
                                            <FaMoneyBillWave className="mr-2 text-blue-500" />
                                            Price
                                        </label>
                                        <div className="flex items-center space-x-4">
                                            <Field
                                                type="number"
                                                name="Price"
                                                placeholder="Set your price"
                                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setFieldValue("Price", 0)
                                                }
                                                className={`px-4 py-2 rounded-lg font-semibold transition ${
                                                    values.Price === 0
                                                        ? "bg-green-500 text-white"
                                                        : "bg-gray-200 text-gray-700 hover:bg-green-500 hover:text-white"
                                                }`}
                                            >
                                                Free
                                            </button>
                                        </div>
                                        <ErrorMessage
                                            name="Price"
                                            component="div"
                                            className="text-red-500 text-sm mt-1"
                                        />
                                    </div>
                                    <div>
                                        <div className=" font-semibold text-sm pb-1">
                                            Category{" "}
                                        </div>
                                        <div className=" flex items-center">
                                            <Field
                                                placeholder="Category"
                                                type="text"
                                                name="Category"
                                                disabled={isSubmitting}
                                                className="border border-gray_white px-4 py-2  rounded-lg text-sm  w-full"
                                            />
                                        </div>

                                        <ErrorMessage
                                            name="Category"
                                            component="div"
                                            style={errorInputMessage}
                                        />
                                    </div>
                                    {isSubmitting ? (
                                        <span className="small-loader my-5   m-auto"></span>
                                    ) : (
                                        <button
                                            type="submit"
                                            className=" bg-perpol_v py-2 mt-4 rounded-2xl text-white font-semibold "
                                            disabled={isSubmitting}
                                        >
                                            Edit Summary
                                        </button>
                                    )}
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        );
}
const errorInputMessage = {
    fontSize: "12px",
    color: "red",
};
const names_errorInputMessage = {
    position: "absolute",
    bottom: "-22px",
    left: "5px",
    fontSize: "12px",
    color: "red",
};
export default Edit_Summary;
