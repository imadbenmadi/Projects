import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../../AppContext";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
function Director_Addworkers() {
    const Naviagte = useNavigate();
    const location = useLocation();
    const serviceId = location.pathname.split("/")[3];

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [service, setService] = useState(null);
    const { user } = useAppContext();
    async function handle_add_service(values, { setSubmitting }) {
        try {
            let response = await Axios.put(
                `http://localhost:3000/Directors/${user.id}/${user.companyId}/Services/${serviceId}`,
                values,
                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            );
            if (response.status == 200) {
                Naviagte("/Director/Services");
            } else if (response.status == 400) {
                setSubmitting(false);
                Swal.fire("Error", `${response.data.message} `, "error");
            } else if (response.status == 409) {
                setSubmitting(false);
                Swal.fire("Error!", `${response.data.message} `, "error");
            } else if (response.status == 500) {
                setSubmitting(false);
                Swal.fire("Error!", `   `, "error");
            } else {
                setSubmitting(false);
                Swal.fire("Error!", ` ${response.data.message} `, "error");
            }
        } catch (error) {
            setSubmitting(false);
            Swal.fire(
                "Error!",
                ``,
                "error"
            );
        }

        // setSubmitting(false);
    }

    useEffect(() => {
        setLoading(true);
        const fetchService = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/Directors/${user.id}/${user.companyId}/Services/${serviceId}`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );
                if (response.status === 200) {
                    setService(response.data.Service);
                } else if (response.status === 401) {
                    Swal.fire("خطأ", "يجب عليك تسجيل الدخول مرة أخرى", "error");
                    Naviagte("/Login");
                } else {
                    setError(response.data);
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchService();
    }, []);
    if (loading) {
        return (
            <div className="w-full h-[80vh] flex flex-col items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    } else if (error) {
        return (
            <div className="w-full h-[80vh] flex items-center justify-center">
                <div className="text-red-600 font-semibold">
                    {error.message}
                </div>
            </div>
        );
    } else if (!service) {
        return (
            <div className="w-full h-[80vh] flex flex-col items-center justify-center">
                <div className="text-red-600 font-semibold">
                    لم يتم العثور على القسم
                </div>
                <Link to={"/Director/Services"}>
                    <button className="bg-blue_v py-2 px-4 mx-auto mt-4 rounded-2xl text-white font-semibold w-fit">
                        الرجوع إلى القائمة
                    </button>
                </Link>
            </div>
        );
    } else {
        return (
            <div className="flex text-right">
                <div className="w-full  overflow-y-auto py-12 bg-white flex flex-col items-center justify-center ">
                    <div className=" w-[80%] text-black">
                        <div className=" pb-4 pt-14 md:pt-0 ">
                            <div className=" text-3xl font-semibold ">
                                صفحة تعديل القسم
                            </div>
                        </div>

                        <div>
                            <Formik
                                initialValues={{
                                    // userType: userType_value,
                                    Name: service?.Name || "",
                                    companyId: user?.companyId,
                                }}
                                validate={(values) => {
                                    const errors = {};

                                    if (!values.Name) {
                                        errors.Name = "الاسم  مطلوب";
                                    } else if (values.Name.length < 3)
                                        errors.Name = "الحد الأدنى 3 أحرف";
                                    else if (values.Name.length > 30)
                                        errors.Name = "الحد الأقصى 30 حرفًا";

                                    return errors;
                                }}
                                onSubmit={(values, { setSubmitting }) => {
                                    if (!values.companyId) {
                                        Swal.fire(
                                            "Error!",
                                            "Error in company id , please refresh the page and try again",
                                            "error"
                                        );
                                    }
                                    handle_add_service(values, {
                                        setSubmitting,
                                    });
                                }}
                            >
                                {({ isSubmitting, setFieldValue }) => (
                                    <Form className="  flex flex-col text-sm md:text-lg  gap-4 text-black">
                                        <div className=" flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4 w-full py-6 ">
                                            <div className="w-full  md:w-[50%]  relative">
                                                <div className="  font-semibold text-sm pb-1">
                                                    اسم القسم
                                                </div>
                                                <Field
                                                    placeholder="service name"
                                                    type="text"
                                                    name="Name"
                                                    disabled={isSubmitting}
                                                    className="w-full border border-gray_white 
                                                px-4 py-2 rounded-lg  text-sm text-right"
                                                />
                                                <ErrorMessage
                                                    name="Name"
                                                    component="div"
                                                    style={
                                                        names_errorInputMessage
                                                    }
                                                />
                                            </div>
                                        </div>

                                        {isSubmitting ? (
                                            <span className="small-loader my-5  w-fit m-auto"></span>
                                        ) : (
                                            <button
                                                type="submit"
                                                className=" bg-blue_v py-2 px-4 mx-auto mt-4 rounded-2xl
                                                 text-white font-semibold w-fit "
                                                disabled={isSubmitting}
                                            >
                                                حفظ
                                            </button>
                                        )}
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const errorInputMessage = {
    fontSize: "12px",
    color: "red",
};
const names_errorInputMessage = {
    position: "absolute",
    bottom: "-22px",
    right: "5px",
    fontSize: "12px",
    color: "red",
};
export default Director_Addworkers;
