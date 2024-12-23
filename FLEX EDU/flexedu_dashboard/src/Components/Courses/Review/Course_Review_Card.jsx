import React from "react";
import axios from "axios";
import Swal from "sweetalert2";

const CourseReviewCard = ({ review, courseId }) => {
    const [deleteLoading, setDeleteLoading] = React.useState(false);

    const rating = review?.Rate || 0; // Default to 0 if Rate is null
    const stars = Array.from({ length: rating }).map((_, idx) => (
        <span key={idx}>★</span>
    ));
    const reviewedBy =
        review?.Student?.firstName || review?.Student?.lastName
            ? `${review.Student?.firstName} ${review.Student?.lastName}`
            : "Anonymous"; // Fallback if FirstName or LastName is not provided

    return (
        <div className="w-full mx-auto bg-white shadow-md rounded-lg p-4 mb-6 flex justify-between px-4">
            <div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <span className="text-yellow-400 text-lg">
                            {stars.length > 0 ? stars : null}
                        </span>
                        <span className="text-gray-500 ml-2">
                            {rating?.toFixed(1)}
                        </span>
                    </div>
                </div>

                <p className="text-gray-700 mt-3">{review?.Comment || null}</p>

                <div className=" mt-4">
                    <div className="text-sm text-gray-500">{reviewedBy}</div>
                    <div className="text-sm text-gray-400">
                        {review?.createdAt
                            ? new Date(review.createdAt).toLocaleDateString()
                            : null}
                    </div>
                </div>
            </div>
            <div>
                <div className=" my-6 w-fit mx-auto">
                    {deleteLoading ? (
                        <div className=" small-loader mt-2 mr-10"></div>
                    ) : (
                        <div
                            className=" cursor-pointer text-white bg-red-500 px-4 py-2 rounded-lg font-semibold"
                            onClick={async () => {
                                const result = await Swal.fire({
                                    title: "Are you sure?",
                                    text: "You won't be able to revert this!",
                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonText: "Yes, delete it!",
                                    cancelButtonText: "No, cancel!",
                                    cancelButtonColor: "#3085d6",
                                    confirmButtonColor: "#d33",
                                });

                                if (result.isConfirmed) {
                                    setDeleteLoading(true);
                                    try {
                                        const response = await axios.delete(
                                            `http://localhost:3000/Admin/Reviews/Courses/${review.id}`,
                                            {
                                                withCredentials: true,
                                                validateStatus: () => true,
                                            }
                                        );

                                        if (response.status === 200) {
                                            await Swal.fire(
                                                "Deleted!",
                                                "The Review has been deleted.",
                                                "success"
                                            );

                                            window.scrollTo(0, 0);
                                            window.location.reload();
                                        } else if (response.status === 401) {
                                            await Swal.fire(
                                                "Unauthorized",
                                                "Please You have to Login Again",
                                                "error"
                                            );
                                        } else {
                                            await Swal.fire(
                                                "Error",
                                                "Somthing went wrong",
                                                "error"
                                            );
                                        }
                                    } catch (err) {

                                        await Swal.fire(
                                            "Error",
                                            "Somthing went wrong",
                                            "error"
                                        );
                                    } finally {
                                        setDeleteLoading(false);
                                    }
                                }
                            }}
                        >
                            Delete
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CourseReviewCard;
