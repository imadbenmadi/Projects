import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const New_institution = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    return (
        <div className=" mx-auto py-6 px-4">
            <div className="text-xl font-semibold text-blue_v mb-12">
                Add new Institutions
            </div>
            <Formik
                initialValues={{
                    name: "",
                    localisation: "",
                    wilaya: "",
                    type: "",
                    email: "",
                    password: "",
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
                        setLoading(true);
                        const response = await axios.post(
                            "http://localhost:3000/Admin/Companies",
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
                        setLoading(false);
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
                    {loading ? (
                        <div className="md:col-span-2 mt-3 mx-auto">
                            <span className="loader"></span>
                        </div>
                    ) : (
                        <div className="md:col-span-2  mx-auto">
                            <button
                                type="submit"
                                className="px-6 bg-blue_v font-bold w-fit text-white py-2 rounded-md"
                            >
                                Complete
                            </button>
                        </div>
                    )}
                </Form>
            </Formik>
        </div>
    );
};

export default New_institution;
