import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import Current_Notifications from "./Current_Notifications";
import { IoMdArrowRoundBack } from "react-icons/io";
function Notifications() {
    const [user, setUser] = useOutletContext();
    if (!user) return null;
    const userId = user._id;

    const Navigate = useNavigate();
    return (
        <div className="pt-4">
            <Link
                to={`/Users/${userId}`}
                className="select-none mb-4 w-fit m-auto bg-green rounded cursor-pointer text-white text-xl flex items-center gap-2 px-3 py-1 "
            >
                <IoMdArrowRoundBack />
                <div>Back to user</div>
            </Link>
            <div className=" text-center text-gray font-semibold text-2xl ">
                Send Notification :
            </div>
            <div className=" border border-gray_white text-black_text shadow-md w-[80%] md:w-[50%] m-auto mt-3 p-5 rounded-lg  ">
                <Formik
                    initialValues={{
                        Type: "others",
                        Title: "",
                        Text: "",
                        Description: "",
                    }}
                    validate={(values) => {
                        const errors = {};

                        if (!values.Title) {
                            errors.Title = "Title is Required";
                        } else if (values.Title.length > 30) {
                            errors.Title =
                                "Title Should be less than 30 characters";
                        }

                        if (!values.Text) {
                            errors.Text = "Text is Required";
                        } else if (values.Text.length > 100) {
                            errors.Text =
                                " Text Should be less than 100 characters";
                        }
                        if (!values.Description) {
                            errors.Description = "Message is Required";
                        } else if (values.Description.length > 1000) {
                            errors.Description =
                                " Message Should be less than 1000 characters";
                        }

                        return errors;
                    }}
                    onSubmit={async (values, { setSubmitting }) => {
                        try {
                            let response = await Axios.post(
                                "http://localhost:3000/Dashboard/Users/" +
                                    userId +
                                    "/Notify",
                                values,
                                {
                                    withCredentials: true,
                                    validateStatus: () => true,
                                }
                            );

                            if (response.status == 200) {
                                Swal.fire(
                                    "Done!",
                                    "Message sended in Successfully",
                                    "success"
                                );
                                Navigate("/Users/" + userId);
                            } else if (response.status == 401) {
                                Swal.fire({
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
                            } else if (response.status == 409) {
                                Swal.fire(
                                    "Error!",
                                    `${response.data.message}`,
                                    "error"
                                );
                            } else if (response.status == 500) {
                                Swal.fire(
                                    "Error!",
                                    `Internal Server Error ,  ${response.data.message}`,
                                    "error"
                                );
                            } else if (response.status == 429) {
                                Swal.fire(
                                    "Error!",
                                    `Too many requests ,try again latter\n  ${response.data.message}`,
                                    "error"
                                );
                            } else if (response.status == 404) {
                                Swal.fire(
                                    "Error!",
                                    `User Not found ,${response.data.message}`,
                                    "error"
                                );
                            } else {
                                Swal.fire(
                                    "Error!",
                                    `Something Went Wrong ,${response.data.message}`,
                                    "error"
                                );
                            }
                        } catch (error) {
                            Swal.fire(
                                "Error!",
                                `Something Went Wrong ,${error.message}`,
                                "error"
                            );
                        }

                        setSubmitting(false);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className="  flex flex-col text-sm md:text-lg md:mx-5 gap-4 text-gray">
                            <div className="flex items-center ">
                                <div className="mr-2">Notification Type:</div>
                                <div className="relative">
                                    <Field
                                        as="select"
                                        name="Type"
                                        disabled={isSubmitting}
                                        className="border w-[200px] border-gray_white px-2 py-1 rounded shadow-sm appearance-none"
                                    >
                                        {/* <option value="">Select Type</option> */}
                                        <option value="request">
                                            Request Notification
                                        </option>
                                        <option value="verify">
                                            Verify Your account
                                        </option>
                                        <option value="message">Message</option>
                                        <option value="other">Other</option>
                                    </Field>
                                </div>
                                <ErrorMessage
                                    name="Type"
                                    component="div"
                                    className="text-red-600 font-semibold ml-2"
                                />
                            </div>

                            <div>
                                <div>
                                    Title{" "}
                                    <span className=" text-red-600 font-semibold">
                                        *
                                    </span>
                                </div>
                                <Field
                                    type="text"
                                    name="Title"
                                    disabled={isSubmitting}
                                    className="border border-gray_white px-2 py-1 rounded  shadow-sm w-full"
                                />
                                <ErrorMessage
                                    name="Title"
                                    component="div"
                                    style={errorInputMessage}
                                />
                            </div>
                            <div>
                                <div>
                                    Text{" "}
                                    <span className=" text-red-600 font-semibold">
                                        *
                                    </span>
                                </div>
                                <div className=" flex items-center">
                                    <Field
                                        type="text"
                                        name="Text"
                                        disabled={isSubmitting}
                                        className="border border-gray_white px-2 py-1  rounded-s  shadow-sm w-full"
                                    />
                                </div>

                                <ErrorMessage
                                    name="Text"
                                    component="div"
                                    style={errorInputMessage}
                                />
                            </div>
                            <div>
                                <div>
                                    Message{" "}
                                    <span className="text-red-600 font-semibold">
                                        *
                                    </span>
                                </div>
                                <Field
                                    as="textarea" // Render as textarea
                                    name="Description"
                                    disabled={isSubmitting}
                                    className="border border-gray_white px-2 py-1 rounded shadow-sm w-full"
                                />
                                <ErrorMessage
                                    name="Description"
                                    component="div"
                                    style={errorInputMessage}
                                />
                            </div>

                            <button
                                type="submit"
                                className={` ${
                                    isSubmitting
                                        ? "bg-gray_white text-gray"
                                        : " bg-green text-white"
                                } w-fit m-auto px-4 py-2 rounded font-semibold `}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? <div>loading</div> : "Submit"}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
            <div className=" m-auto w-fit mt-12">
                <Link
                    to={`/Users/${userId}/Current_Notifications`}
                    className="select-none bg-green text-white font-bold py-2 px-4 rounded"
                >
                    View User Current Notifications
                </Link>
            </div>
        </div>
    );
}
const errorInputMessage = {
    fontSize: "12px",
    color: "red",
};
export default Notifications;
