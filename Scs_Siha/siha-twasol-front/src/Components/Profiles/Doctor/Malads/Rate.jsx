import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
const MaladReview = ({ userId, maladId }) => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleRating = (rate) => {
        setRating(rate);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        if (!rating) {
            setError("Rating is required.");
            setLoading(false);
            return;
        }

        try {

            const response = await axios.post(
                `http://localhost:3000/Doctors/${userId}/Malads/${maladId}/Rate`,
                {
                    rating,
                    review,
                },
                { withCredentials: true }
            );

            setSuccess("Review submitted successfully!");
            window.location.reload();
        } catch (err) {
            setError("Failed to submit the review?.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold text-center mb-4">
                يمكنك تقييم المريض
            </h2>

            <div className="flex justify-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        className={`text-3xl ${
                            star <= rating ? "text-yellow-400" : "text-gray-300"
                        }`}
                        onClick={() => handleRating(star)}
                    >
                        ★
                    </button>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="اكتب التفصيل هنا..."
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    
                />

                <button
                    type="submit"
                    className={`w-full py-2 px-4 text-white rounded-lg focus:outline-none ${
                        loading
                            ? "bg-gray-500"
                            : "bg-blue-500 hover:bg-blue-600"
                    }`}
                    disabled={loading}
                >
                    {loading ? "ارسال..." : "ارسال"}
                </button>
            </form>

            {error && <p className="mt-3 text-red-500 text-center">{error}</p>}
            {success && (
                <p className="mt-3 text-green-500 text-center">{success}</p>
            )}
        </div>
    );
};

export default MaladReview;
