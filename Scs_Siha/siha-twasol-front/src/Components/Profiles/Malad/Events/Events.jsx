import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { IoSearch } from "react-icons/io5";
import { useAppContext } from "../../../../AppContext";

function Events() {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Filters
    const [searchQuery, setSearchQuery] = useState("");
    const [locationFilter, setLocationFilter] = useState("");
    const [ownerTypeFilter, setOwnerTypeFilter] = useState("");
    const [locations, setLocations] = useState([]);

    const { user } = useAppContext();

    useEffect(() => {
        setLoading(true);
        const fetchEvents = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/Malads/${user.id}/Events`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );

                if (response.status === 200) {
                    setEvents(response.data.events || []);

                    // Extract unique locations for filter options
                    const uniqueLocations = [
                        ...new Set(
                            response.data.events.map(
                                (event) => event.Company.Location
                            )
                        ),
                    ];
                    setLocations(uniqueLocations);
                } else if (response.status === 401) {
                    Swal.fire("خطأ", "يجب عليك تسجيل الدخول مرة أخرى", "error");
                    navigate("/Login");
                } else {
                    setError(response.data.message || "حدث خطأ ما.");
                }
            } catch (error) {
                setError("فشل في جلب الأحداث. يرجى المحاولة مرة أخرى لاحقًا.");
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [navigate, user.id]);

    const filteredEvents = events.filter((event) => {
        const title = event?.Title.toLowerCase();
        const description = event?.Description?.toLowerCase() || "";
        const matchesSearch =
            title.includes(searchQuery.toLowerCase()) ||
            description.includes(searchQuery.toLowerCase());
        const matchesLocation = locationFilter
            ? event.Company.Location === locationFilter
            : true;
        const matchesOwnerType = ownerTypeFilter
            ? event.ownerType === ownerTypeFilter
            : true;

        return matchesSearch && matchesLocation && matchesOwnerType;
    });

    if (loading) {
        return (
            <div className="w-[100vw] h-[80vh] flex items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-[100vw] h-screen flex items-center justify-center">
                <div className="text-red-600 font-semibold">{error}</div>
            </div>
        );
    }

    if (!events || events.length === 0) {
        return (
            <div className="py-6 px-4">
                <div className="flex justify-center items-center flex-col gap-6 mt-12">
                    <div className="text-center font-semibold text-sm text-gray_v pt-12">
                        لا توجد أحداث متاحة
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="py-6 px-4">
            <div className="text-xl font-semibold text-blue_v">الأحداث</div>

            {/* Search and Filter Controls */}
            <div className="mt-4 flex flex-col md:flex-row gap-4 justify-center md:justify-start md:ml-6 md:gap-6 text-gray_v">
                {/* Search Input */}
                <div className="border p-2 mr-4 rounded-md flex items-center gap-2 text-sm font-semibold min-w-[300px]">
                    <IoSearch className="w-fit shrink-0" />
                    <input
                        type="text"
                        placeholder="ابحث عن الحدث"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full placeholder:text-end text-end"
                    />
                </div>

                {/* Location Filter */}
                <select
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="p-2 border rounded-md shadow-sm text-sm"
                >
                    <option value="">الموقع</option>
                    {locations.map((location) => (
                        <option key={location} value={location}>
                            {location}
                        </option>
                    ))}
                </select>

                {/* Owner Type Filter */}
                <select
                    value={ownerTypeFilter}
                    onChange={(e) => setOwnerTypeFilter(e.target.value)}
                    className="p-2 border rounded-md shadow-sm text-sm"
                >
                    <option value="">نوع المالك</option>
                    <option value="Director">مدير</option>
                    <option value="Doctor">طبيب</option>
                    <option value="Worker">عامل</option>
                </select>
            </div>

            {filteredEvents.length === 0 ? (
                <div className="flex justify-center items-center flex-col gap-6 mt-12">
                    <div className="text-center font-semibold text-sm text-gray_v">
                        لا توجد أحداث تطابق بحثك
                    </div>
                </div>
            ) : (
                <ul className="my-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEvents.map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </ul>
            )}
        </div>
    );
}

function EventCard({ event }) {
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

                {/* Event Location */}
                {event.Company?.Location && (
                    <p className="text-sm text-gray-500 mb-2">
                        الموقع: {event.Company.Location}
                    </p>
                )}

                {/* Event Description */}
                <p className="text-gray-700 mb-4">
                    {event.Description?.substring(0, 100)}...
                </p>

                {/* Link to Event Detail */}
                <Link
                    to={`/Malad/Events/${event.id}`}
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

export default Events;
