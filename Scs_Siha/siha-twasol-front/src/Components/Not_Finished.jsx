import Not_Finished_img from "../../public/Not_Finished.png";

function Not_Finished() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-10 bg-white rounded-lg shadow-lg text-center w-full max-w-lg">
                <h1 className="text-3xl md:text-4xl font-bold mb-6 text-blue-700">
                    عذرًا! هذه الصفحة غير جاهزة بعد
                </h1>
                <p className="text-lg mb-6 text-gray-700">
                    نحن نعمل بجد لنقدم لك شيئًا مميزًا. يرجى العودة لاحقًا!
                </p>
                <img
                    src={Not_Finished_img}
                    alt="قيد الإنشاء"
                    className="w-40 h-40 md:w-60 md:h-60 mx-auto mb-6 object-cover"
                />
                <p className="text-gray-600">شكرًا على صبرك وتفهمك!</p>
            </div>
        </div>
    );
}

export default Not_Finished;
