import React, { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import dayjs from "dayjs";
function EventsSection() {
    const { company } = useOutletContext();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        setEvents(company.Events);
    }, [company]);

    if (!events || events.length === 0) {
        return (
            <div className="text-center text-gray-700 mt-10">
                لا توجد مقالات متاحة لهذه الشركة.
            </div>
        );
    }

    return (
        <div className="p-6">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">المقالات</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                    <EventCard
                        key={event.id}
                        event={event}
                        companyId={company.id}
                    />
                ))}
            </ul>
        </div>
    );
}

function EventCard({ event, companyId }) {
    return (
        <li className="border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
            {/* Event Image */}
            {event.image_link && (
                <img
                    loading="lazy"
                    src={`http://localhost:3000/${event.image_link}`}
                    alt={event.Title}
                    className="w-full h-48 object-cover rounded-t-lg"
                />
            )}

            <div className="p-4">
                {/* Event Title */}
                <h4 className="text-lg font-semibold text-blue-700 mb-2">
                    {event.Title}
                </h4>

                {/* Event Date */}
                <p className="text-sm text-gray-500 mb-2">
                    التاريخ: {dayjs(event?.createdAt).format("DD-MMM-YYYY")}
                </p>

                {/* Event Description */}
                <p className="text-gray-700 mb-4">
                    {event.Description?.substring(0, 100)}...
                </p>

                {/* Link to Event Detail */}
                <Link
                    to={`/Malad/Companies/${companyId}/Events/${event.id}`}
                    className="inline-block mt-4"
                >
                    <div className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium text-center">
                        اقرأ المزيد
                    </div>
                </Link>
            </div>
        </li>
    );
}

export default EventsSection;
