import {
    FaCalendarAlt,
    FaClock,
    FaUser,
    FaBook,
    FaGraduationCap,
    FaStar,
    FaPlayCircle,
} from "react-icons/fa";

const CourseDetails = () => {
    // Course data (same as before)
    const course = {
        id: 1,
        title: "Introduction to Computer Science",
        instructor: "Dr. Jane Smith",
        description:
            "This course provides a comprehensive introduction to computer science, covering fundamental concepts such as algorithms, data structures, and programming paradigms.",
        duration: "16 weeks",
        schedule: "Mondays and Wednesdays, 10:00 AM - 11:30 AM",
        credits: 4,
        level: "Undergraduate",
        prerequisites: ["Basic algebra", "Logical thinking skills"],
        episodes: [
            "Unlocking the World of Programming",
            "Mastering Data: Types and Structures",
            "Cracking the Code: Algorithms Unveiled",
            "The Object-Oriented Universe",
            "Web Wizardry: Development Basics",
            "Data Dynasty: Databases and SQL",
            "Engineering Excellence: Software Principles",
            "Grand Finale: Project Showcase",
        ],
        rating: 4.8,
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="relative h-80 bg-gradient-to-r  from-perpol_v via-perpol_v to-green-400 to-p">
                    <div className="absolute inset-0 bg-black opacity-30"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <h1 className="text-5xl font-extrabold text-white text-center px-4 animate-pulse">
                            {course?.title}
                        </h1>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
                </div>

                <div className="relative px-8 py-10">
                    <div className="flex flex-wrap -mx-4 mb-8">
                        <InfoItem icon={FaUser} text={course?.instructor} />
                        <InfoItem
                            icon={FaCalendarAlt}
                            text={course?.duration}
                        />
                        <InfoItem icon={FaClock} text={course?.schedule} />
                        <InfoItem
                            icon={FaBook}
                            text={`${course?.credits} credits`}
                        />
                        <InfoItem icon={FaGraduationCap} text={course?.level} />
                        <InfoItem
                            icon={FaStar}
                            text={`${course?.rating}/5 rating`}
                        />
                    </div>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-indigo-600">
                            Course Overview
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            {course?.description}
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-indigo-600">
                            Prerequisites
                        </h2>
                        <ul className="list-none text-gray-700">
                            {course?.prerequisites.map((prereq, index) => (
                                <li
                                    key={index}
                                    className="mb-2 flex items-center"
                                >
                                    <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                                    {prereq}
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-6 text-indigo-600">
                            Episode Guide
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {course?.episodes.map((episode, index) => (
                                <div
                                    key={index}
                                    className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl p-6 transform transition duration-300 hover:scale-105 hover:shadow-lg"
                                >
                                    <div className="flex items-center mb-3">
                                        <FaPlayCircle className="text-indigo-500 mr-2 text-xl" />
                                        <h3 className="text-xl font-semibold text-gray-800">
                                            {episode}
                                        </h3>
                                    </div>
                                    <p className="text-gray-600 text-sm">
                                        Dive deep into the world of computer
                                        science with this exciting episode!
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <div className="mt-12">
                        <button className="w-full bg-gradient-to-r from-perpol_v via-perpol_v to-green-400 text-white py-4 px-8 rounded-full text-xl font-bold hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Enroll Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const InfoItem = ({ icon: Icon, text }) => (
    <div className="w-1/2 sm:w-1/3 px-4 mb-4">
        <div className="flex items-center">
            <Icon className="text-indigo-500 mr-2" />
            <span className="text-gray-700">{text}</span>
        </div>
    </div>
);

export default CourseDetails;
