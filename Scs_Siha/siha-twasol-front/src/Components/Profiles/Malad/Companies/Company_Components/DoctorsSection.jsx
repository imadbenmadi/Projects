import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
function DoctorsSection() {
    const { company } = useOutletContext();

    const [doctors, setDoctors] = useState(company?.Doctors);
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        setDoctors(company?.Doctors);
    }, [company]);

    if (!doctors || doctors.length === 0) {
        return <div>لا يوجد أطباء لهذه الشركة</div>;
    }

    const visibleDoctors = showMore ? doctors : doctors.slice(0, 5); // Show first 5 by default

    return (
        <div>
            <h3 className="text-xl font-semibold mb-4 ">الأطباء</h3>
            <table className="w-full border rounded-lg ">
                <thead>
                    <tr className="bg-gray-200 text-center">
                        <th className="px-4 py-2">الاسم</th>
                        <th className="px-4 py-2">التخصص</th>
                        <th className="px-4 py-2">رقم الهاتف</th>
                        <th className="px-4 py-2 ">عرض</th>
                    </tr>
                </thead>
                <tbody>
                    {visibleDoctors.map((doctor) => (
                        <tr key={doctor.id} className="border-t text-center">
                            <td className="px-4 py-2">
                                {doctor.firstName} {doctor.lastName}
                            </td>
                            <td className="px-4 py-2">{doctor.speciality}</td>
                            <td className="px-4 py-2">
                                {doctor.telephone || "غير متوفر"}
                            </td>
                            <td className="px-4 py-2">
                                <Link
                                    to={`/Malad/Companies/${company?.id}/Doctors/${doctor?.id}`}
                                >
                                    <button className="font-bold px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                                        عرض
                                    </button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {doctors.length > 5 && (
                <div className="mt-4 text-center">
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={() => setShowMore(!showMore)}
                    >
                        {showMore ? "عرض أقل" : "عرض المزيد"}
                    </button>
                </div>
            )}
        </div>
    );
}

export default DoctorsSection;
