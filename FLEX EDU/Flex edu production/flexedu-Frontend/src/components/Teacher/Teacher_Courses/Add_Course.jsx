import { Formik, Form, Field, ErrorMessage } from "formik";
import { useAppContext } from "../../../AppContext";
import Swal from "sweetalert2";
import add_course from "./Api/add_course";
import {
    FaBookOpen,
    FaMoneyBillWave,
    FaTag,
    FaPencilAlt,
} from "react-icons/fa";

function Add_Course() {
    const { user } = useAppContext();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
            <div className="bg-white shadow-2xl rounded-3xl w-full max-w-2xl overflow-hidden">
                <div className="bg-blue-600 text-white py-6 px-8">
                    <h2 className="text-3xl font-bold">Create a New Course</h2>
                    <p className="text-blue-200 mt-2">
                        Share your knowledge with the world
                    </p>
                </div>
                <Formik
                    initialValues={{
                        Title: "",
                        Description: "",
                        Price: 0,
                        Category: "",
                        TeacherId: user?.id,
                    }}
                    validate={(values) => {
                        const errors = {};
                        if (!values.Title) {
                            errors.Title = "Course title is required";
                        } else if (
                            values.Title.length < 3 ||
                            values.Title.length > 30
                        ) {
                            errors.Title =
                                "Title must be between 3 and 30 characters";
                        }

                        if (!values.Description) {
                            errors.Description = "Description is required";
                        } else if (
                            values.Description.length < 3 ||
                            values.Description.length > 100
                        ) {
                            errors.Description =
                                "Description must be between 3 and 100 characters";
                        }

                        if (values.Price === "") {
                            errors.Price = "Price is required";
                        } else if (Number(values.Price) < 0) {
                            errors.Price = "Price must be a positive number";
                        }

                        if (!values.Category) {
                            errors.Category = "Category is required";
                        }

                        return errors;
                    }}
                    onSubmit={async (values, { setSubmitting }) => {
                        if (!values.TeacherId) {
                            setSubmitting(false);
                            Swal.fire(
                                "Error",
                                "Unauthorized: missing TeacherId",
                                "error"
                            );
                        } else {
                            try {
                                if (
                                    values.Price === 0 ||
                                    values.Price === "free"
                                ) {
                                    values.Price = 0;
                                }
                                // Swal.fire("Success", "Course created successfully", "success");

                                add_course(values, {
                                    setSubmitting,
                                });
                            } catch (error) {
                                setSubmitting(false);
                                Swal.fire(
                                    "Error",
                                    "Something went wrong, please try again",
                                    "error"
                                );
                            }
                        }
                    }}
                >
                    {({ isSubmitting, setFieldValue, values }) => (
                        <Form className="p-8">
                            <div className="space-y-6">
                                <div>
                                    <label className="flex items-center text-gray-700 font-semibold mb-2">
                                        <FaBookOpen className="mr-2 text-blue-500" />
                                        Course Title
                                    </label>
                                    <Field
                                        type="text"
                                        name="Title"
                                        placeholder="Enter an engaging title"
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    />
                                    <ErrorMessage
                                        name="Title"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>

                                <div>
                                    <label className="flex items-center text-gray-700 font-semibold mb-2">
                                        <FaPencilAlt className="mr-2 text-blue-500" />
                                        Description
                                    </label>
                                    <Field
                                        as="textarea"
                                        name="Description"
                                        placeholder="Describe your course"
                                        rows="4"
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    />
                                    <ErrorMessage
                                        name="Description"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
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
                                    <label className="flex items-center text-gray-700 font-semibold mb-2">
                                        <FaTag className="mr-2 text-blue-500" />
                                        Category
                                    </label>
                                    <Field
                                        type="text"
                                        name="Category"
                                        placeholder="Choose a category"
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    />
                                    <ErrorMessage
                                        name="Category"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full mt-8 bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center">
                                        <svg
                                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        Creating course?...
                                    </span>
                                ) : (
                                    "Create Course"
                                )}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default Add_Course;
