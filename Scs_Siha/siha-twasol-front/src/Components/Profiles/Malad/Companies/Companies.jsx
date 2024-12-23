import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useAppContext } from "../../../../AppContext";

function CompaniesTable() {
    const { user } = useAppContext();
    const [companies, setCompanies] = useState([]);
    const [filteredCompanies, setFilteredCompanies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Filters
    const [searchQuery, setSearchQuery] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [locationFilter, setLocationFilter] = useState("");
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        setLoading(true);
        const fetchCompanies = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/Malads/${user.id}/Companies`,
                    { withCredentials: true, validateStatus: () => true }
                );

                if (Array.isArray(response.data)) {
                    setCompanies(response.data);
                    setFilteredCompanies(response.data);

                    // Extract unique locations for filter options
                    const uniqueLocations = [
                        ...new Set(
                            response.data.map((company) => company?.Location)
                        ),
                    ];
                    setLocations(uniqueLocations);
                } else {
                    setCompanies([]);
                    setFilteredCompanies([]);
                }
            } catch (error) {
                setError("Failed to fetch companies. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchCompanies();
    }, []);

    // Static filtering logic applied to `filteredCompanies` based on search query, type, and location
    useEffect(() => {
        const filtered = companies.filter((company) => {
            const matchesType = typeFilter
                ? company?.Type === typeFilter
                : true;
            const matchesLocation = locationFilter
                ? company?.Location === locationFilter
                : true;
            const matchesSearch = company?.Name.toLowerCase().includes(
                searchQuery.toLowerCase()
            );

            return matchesType && matchesLocation && matchesSearch;
        });

        setFilteredCompanies(filtered);
    }, [searchQuery, typeFilter, locationFilter, companies]);

    if (loading) return (
        <div className=" w-screen h-screen flex flex-col items-center justify-center">
            <span className="loader"></span>
        </div>
    );
    if (error) return (
        <div className="text-red-600 font-semibold text-center">{error}</div>
    );

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold text-center mb-6">
                قائمة الشركات
            </h2>

            {/* Search and filter controls */}
            <div className="flex flex-col md:flex-row gap-4 my-4">
                {/* Search Input */}
                <div className="flex items-center border p-2 rounded-md shadow-sm">
                    <IoSearch className="mr-2 text-gray-500" />
                    <input
                        type="text"
                        placeholder="بحث عن شركة"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full border-none focus:outline-none placeholder-gray-400"
                    />
                </div>

                {/* Type Filter */}
                <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="p-2 border rounded-md shadow-sm"
                >
                    <option value="">نوع الشركة</option>
                    <option value="CHU">CHU</option>
                    <option value="Clinic">Clinic</option>
                </select>

                {/* Location Filter */}
                <select
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="p-2 border rounded-md shadow-sm"
                >
                    <option value="">الموقع</option>
                    {locations.map((location) => (
                        <option key={location} value={location}>
                            {location}
                        </option>
                    ))}
                </select>
            </div>

            {/* Companies Table */}
            <div className="overflow-x-auto rounded-lg shadow-lg">
                <table className="table-auto w-full text-center border border-gray-200 rounded-lg">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700 font-medium">
                            <th className="px-6 py-4">الاسم</th>
                            <th className="px-6 py-4 border-l border-gray-200">
                                الموقع
                            </th>
                            <th className="px-6 py-4 border-l border-gray-200">
                                الولاية
                            </th>
                            <th className="px-6 py-4 border-l border-gray-200">
                                نوع الشركة
                            </th>
                            <th className="px-6 py-4 border-l border-gray-200">
                                عدد الاطباء
                            </th>
                            <th className="px-6 py-4 border-l border-gray-200">
                                عرض
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(filteredCompanies) &&
                        filteredCompanies.length > 0 ? (
                            filteredCompanies.map((company) => (
                                <tr
                                    key={company?.id}
                                    className="border-t border-gray-200 hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4 font-semibold text-gray-700">
                                        {company?.Name}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {company?.Location}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {company?.Wilaya}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {company?.Type}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {company?.Doctors.length}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link
                                            to={`/Malad/Companies/${company?.id}`}
                                            className="py-1 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
                                        >
                                            عرض
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="p-6 text-gray-500">
                                    لا توجد شركات مطابقة
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CompaniesTable;
