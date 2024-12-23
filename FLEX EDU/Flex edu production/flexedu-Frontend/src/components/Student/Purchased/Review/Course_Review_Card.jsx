const CourseReviewCard = ({ review }) => {
    const rating = review?.Rate || 0; // Default to 0 if Rate is null
    const stars = Array.from({ length: rating }).map((_, idx) => (
        <span key={idx}>★</span>
    ));
    const reviewedBy =
        review?.Student?.firstName || review?.Student?.lastName
            ? `${review?.Student?.firstName} ${review?.Student?.lastName}`
            : "Anonymous"; // Fallback if FirstName or LastName is not provided

    return (
        <div className="w-full mx-auto bg-white shadow-md rounded-lg p-4 mb-6">
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
                        ? new Date(review?.createdAt).toLocaleDateString()
                        : null}
                </div>
            </div>
        </div>
    );
};

export default CourseReviewCard;
