import dayjs from "dayjs";

function MeetCard({ meet, index }) {
    return (
        <div
            key={meet.id}
            className="bg-white rounded-lg shadow-md mb-4 p-4 flex justify-between items-center hover:shadow-lg transition duration-300"
        >
            <div className="flex items-center">
                <span className="text-2xl font-bold text-gray-300 mr-4">
                    {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                    <h4 className="text-lg font-semibold text-gray-500">
                        {dayjs(meet.time).format("MMMM D, YYYY h:mm A")}
                    </h4>
                    <a
                        href={meet.Link}
                        target="_blank"
                        rel="noopener noreferrer "
                        className=" font-semibold text-gray-600 text-lg"
                    >
                        {meet.Link}
                    </a>
                </div>
            </div>
        </div>
    );
}

export default MeetCard;
