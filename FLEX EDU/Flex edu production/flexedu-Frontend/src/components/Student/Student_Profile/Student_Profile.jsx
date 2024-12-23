import { useAppContext } from "../../../AppContext";
import { CiImageOn } from "react-icons/ci";
import { MdEdit, MdSchool } from "react-icons/md";
import { Link } from "react-router-dom";

function Student_Profile() {
    const { user } = useAppContext();

    const ProfileItem = ({ label, value }) => (
        <div
            className="mb-4 bg-white bg-opacity-80 overflow-y-auto rounded-lg p-3 shadow-md backdrop-blur-sm 
    transform transition-transform duration-300 md:hover:scale-105"
        >
            <span className="font-semibold text-teal-700">{label}:</span>
            <span className="ml-2 text-gray-800">{value || "N/A"}</span>
        </div>
    );

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-teal-400
     via-grenn-500 to-green-600 md:p-8 py-6"
        >
            <div className="max-w-4xl mx-auto">
                <h1
                    className="md:text-4xl text-2xl font-extrabold text-white mb-8 text-center
                shadow-text flex items-center justify-center "
                >
                    <MdSchool className="md:mr-4 mr-2  " />
                    Student Profile
                </h1>

                <div className="relative">
                    <div className="absolute -top-4 -left-4 w-24 h-24 bg-yellow-300 rounded-full z-0 animate-bounce"></div>
                    <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-pink-300 rounded-full z-0 animate-pulse"></div>

                    <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl overflow-hidden shadow-xl z-10 relative">
                        <div className="md:flex items-stretch">
                            <div className="md:w-1/3 p-8 bg-gradient-to-b from-teal-500 to-blue-600 flex flex-col items-center justify-center">
                                {user?.profile_pic_link ? (
                                    <img
                                        className="w-48 h-48 object-cover rounded-full border-4 border-white shadow-lg"
                                        src={`https://api.flexedu-dz.com/${user.profile_pic_link}`}
                                        alt="Student profile"
                                    />
                                ) : (
                                    <div className="w-48 h-48 bg-gray-200 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                                        <CiImageOn className="text-6xl text-gray-400" />
                                    </div>
                                )}
                                <Link
                                    to="/Student/Profile/Edit"
                                    className="mt-6 inline-flex items-center px-6 py-3 bg-yellow-400 text-gray-800 font-bold rounded-full hover:bg-yellow-300 transition duration-300 transform hover:scale-105 shadow-lg"
                                >
                                    <MdEdit className="mr-2" />
                                    Edit Profile
                                </Link>
                            </div>

                            <div className="md:w-2/3 p-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <ProfileItem label="ID" value={user?.id} />
                                <ProfileItem
                                    label="First Name"
                                    value={user?.firstName}
                                />
                                <ProfileItem
                                    label="Last Name"
                                    value={user?.lastName}
                                />
                                <ProfileItem
                                    label="Email"
                                    value={user?.email}
                                />
                                <ProfileItem
                                    label="Created At"
                                    value={
                                        user?.createdAt &&
                                        new Date(
                                            user.createdAt
                                        ).toLocaleString()
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Student_Profile;
