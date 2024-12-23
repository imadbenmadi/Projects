// import React from "react";

// function Edit() {
//     return <div>Edit</div>;
// }

// export default Edit;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
const edit_institution = () => {
    const location = useLocation();
    const institution_id = location.pathname.split("/")[2];
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(null);
    const [institution, setInstitution] = useState(null);
    const [edit_loading, setEditLoading] = useState(false);

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

    return (
        <div className="container mx-auto py-6 px-4">
            <div className="text-xl font-semibold text-blue_v mb-12">
                Edit Institutions
            </div>
            <Formik
                initialValues={{
                    name: institution?.Name || "",
                    localisation: institution?.Location || "",
                    wilaya: institution?.Wilaya || "",
                    type: institution?.Type || "",
                    email: institution?.Directors[0]?.email || "",
                    password: institution?.Directors[0]?.password || "",
                }}
                validationSchema={Yup.object({
                    name: Yup.string().required("Required"),
                    localisation: Yup.string().required("Required"),
                    wilaya: Yup.string().required("Required"),
                    type: Yup.string().required("Required"),
                    email: Yup.string()
                        .email("Invalid email address")
                        .required("Required"),
                    password: Yup.string()
                        .required("Required")
                        .min(8, "Password must be at least 8 characters long"),
                })}
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        setEditLoading(true);
                        const response = await axios.put(
                            `http://localhost:3000/Admin/Companies/${institution_id}`,
                            {
                                Name: values?.name,
                                Location: values?.localisation,
                                Wilaya: values?.wilaya,
                                Type: values?.type,
                                director_email: values?.email,
                                director_password: values?.password,
                            },
                            {
                                withCredentials: true,
                                validateStatus: () => true,
                            }
                        );
                        if (response.status === 200) {
                            Swal.fire(
                                "Success",
                                "Institution added successfully",
                                "success"
                            );
                            navigate("/Institustions");
                        } else {
                            Swal.fire(
                                "Error",
                                "Failed to add institution",
                                "error"
                            );
                        }
                    } catch (error) {
                        Swal.fire("Error", "", "error");
                    } finally {
                        setSubmitting(false);
                        setEditLoading(false);
                    }
                }}
            >
                <Form className="grid grid-cols-1 md:grid-cols-2 md:gap-12 gap-6 md:px-12">
                    <div>
                        <div className=" mb-4">
                            <label
                                htmlFor="name"
                                className="block text-md font-medium text-black_text"
                            >
                                Full name
                            </label>
                            <Field
                                name="name"
                                type="text"
                                className="mt-1 block w-full border rounded-md px-4 py-2"
                            />
                            <ErrorMessage
                                name="name"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                        </div>

                        <div className=" mb-4">
                            <label
                                htmlFor="localisation"
                                className="block text-md font-medium text-black_text"
                            >
                                Localisation
                            </label>
                            <Field
                                name="localisation"
                                type="text"
                                className="mt-1 block w-full border rounded-md px-4 py-2"
                            />
                            <ErrorMessage
                                name="localisation"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                        </div>

                        <div className=" mb-4">
                            <label
                                htmlFor="wilaya"
                                className="block text-md font-medium text-black_text"
                            >
                                Wilaya
                            </label>
                            <Field
                                name="wilaya"
                                type="text"
                                className="mt-1 block w-full border rounded-md px-4 py-2"
                            />
                            <ErrorMessage
                                name="wilaya"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                        </div>

                        <div className=" mb-4">
                            <label
                                htmlFor="type"
                                className="block text-md font-medium text-black_text"
                            >
                                Institution Type
                            </label>
                            <Field
                                name="type"
                                as="select"
                                className="mt-1 block w-full border rounded-md px-4 py-2"
                            >
                                <option value="">Select Type</option>
                                <option value="CHU">CHU</option>
                                <option value="EPH">EPH</option>
                                <option value="EHS">EHS</option>
                                <option value="EHU">EHU</option>
                                <option value="EPSP">EPSP</option>
                                <option value="CS">CS</option>
                                <option value="POLYCLINIQUE">
                                    POLYCLINIQUE
                                </option>
                                <option value="EHP">EHP</option>
                            </Field>
                            <ErrorMessage
                                name="type"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <div className=" mb-4">
                            <label
                                htmlFor="email"
                                className="block text-md font-medium text-black_text"
                            >
                                Director Email
                            </label>
                            <Field
                                name="email"
                                type="email"
                                className="mt-1 block w-full border rounded-md px-4 py-2"
                            />
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-md font-medium text-black_text"
                            >
                                Director Password
                            </label>
                            <Field
                                name="password"
                                type="password"
                                className="mt-1 block w-full border rounded-md px-4 py-2"
                            />
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                        </div>
                    </div>
                    {edit_loading ? (
                        <div className="md:col-span-2 mt-3 mx-auto">
                            <span className="loader"></span>
                        </div>
                    ) : (
                        <div className="md:col-span-2  mx-auto">
                            <button
                                type="submit"
                                className="px-6 bg-blue_v font-bold w-fit text-white py-2 rounded-md"
                            >
                                Edit
                            </button>
                        </div>
                    )}
                </Form>
            </Formik>
        </div>
    );
};

export default edit_institution;
