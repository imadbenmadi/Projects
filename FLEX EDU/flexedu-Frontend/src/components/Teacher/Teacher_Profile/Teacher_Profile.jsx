import { useAppContext } from "../../../AppContext";
import { CiImageOn } from "react-icons/ci";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";

function Teacher_Profile() {
    const { user } = useAppContext();

    const ProfileItem = ({ label, value }) => (
        <div className="mb-4 bg-white bg-opacity-80 overflow-y-auto rounded-lg p-3 shadow-md backdrop-blur-sm transform transition-transform duration-300 md:hover:scale-105">
            <span className="font-semibold text-teal-700">{label}:</span>
            <span className="ml-2 text-gray-800">{value || "N/A"}</span>
        </div>
    );

    return (
        <div className="min-h-screen  md:p-8 py-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl text-gray_v font-extrabold text-bl mb-8 text-center shadow-text">
                    Teacher Profile
                </h1>

                <div className="relative">
                    <div className=" bg-slate-400 bg-opacity-20 backdrop-blur-lg rounded-xl overflow-hidden shadow-xl z-10 relative">
                        <div className="md:flex items-stretch">
                            <div className="md:w-1/3 p-8 bg-gradient-to-b from-indigo-500 to-purple-600 flex flex-col items-center justify-center">
                                {user?.profile_pic_link ? (
                                    <img
                                        className="w-48 h-48 object-cover rounded-full border-4 border-white shadow-lg"
                                        src={`http://localhost:3000/${user.profile_pic_link}`}
                                        alt="User profile"
                                    />
                                ) : (
                                    <div className="w-48 h-48 bg-gray-200 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                                        <CiImageOn className="text-6xl text-gray-400" />
                                    </div>
                                )}
                                <Link
                                    to="/Teacher/Profile/Edit"
                                    className="mt-6 inline-flex items-center px-6 py-3 bg-pink-500 text-white font-bold rounded-full hover:bg-pink-600 transition duration-300 transform hover:scale-105 shadow-lg"
                                >
                                    <MdEdit className="mr-2" />
                                    Edit Profile
                                </Link>
                            </div>

                            <div className="md:w-2/3 p-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <ProfileItem label="ID" value={user?.id} />
                                <ProfileItem
                                    label="Name"
                                    value={`${user?.firstName} ${
                                        user?.lastName || "unavailable "
                                    }`}
                                />
                                <ProfileItem
                                    label="Email"
                                    value={user?.email || "unavailable "}
                                />
                                <ProfileItem
                                    label="Telephone"
                                    value={user?.telephone || "unavailable "}
                                />
                                <ProfileItem
                                    label="Instagram"
                                    value={
                                        user?.instgram_Link || "unavailable "
                                    }
                                />
                                <ProfileItem
                                    label="LinkedIn"
                                    value={
                                        user?.linkedIn_Link || "unavailable "
                                    }
                                />
                                <ProfileItem
                                    label="Facebook"
                                    value={
                                        user?.facebook_Link || "unavailable "
                                    }
                                />
                                {/* <ProfileItem label="Rate" value={user?.Rate || "0"} /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Teacher_Profile;
