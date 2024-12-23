import { FaPen } from "react-icons/fa";
import { IoWarning } from "react-icons/io5";
import { Link } from "react-router-dom";
function Users_Table({ users }) {
    if (users == undefined) {
        return null;
    }
    if (users.length == 0)
        return (
            <div className=" flex justify-center items-center gap-1 text-2xl text-gray pt-8">
                <IoWarning />
                No users found
            </div>
        );
    else {
        return (
            <div className="relative shadow-md mt-[20px]">
                <table className="w-full text-sm rtl:text-right text-black_text relative  ">
                    <thead className="text-xs uppercase text-center h-[40px] sticky top-0 bg-white">
                        <tr className="border-y-2">
                            <th scope="col" className="border">
                                User name
                            </th>
                            <th scope="col" className="border">
                                Telephone
                            </th>
                            <th scope="col" className="border">
                                Email
                            </th>
                            <th scope="col" className="border">
                                Status
                            </th>
                            <th scope="col" className="border">
                                Gender
                            </th>
                            <th scope="col" className="border">
                                Age
                            </th>
                            <th scope="col" className="border">
                                Password
                            </th>
                            <th scope="col" className="border">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length == 0 && (
                            <tr className="bg-gray_white  h-[40px] text-center">
                                <td
                                    colSpan="8"
                                    className="border-y-2 py-2 text-sm text-gray"
                                >
                                    <div className="  flex justify-center items-center gap-1">
                                        <IoWarning />
                                        No users found
                                    </div>
                                </td>
                            </tr>
                        )}
                        {users.map((user) => (
                            <tr
                                key={user._id}
                                className="bg-gray_white hover:bg-white cursor-pointer h-[40px] text-center"
                            >
                                <td
                                    style={{ maxWidth: "150px" }}
                                    className="w-[150px] whitespace-nowrap border overflow-auto scrollbar-thumb-rounded-full scrollbar-thin scrollbar-thumb-green scrollbar-track-slate-300"
                                >
                                    {user.FirstName} {user.LastName}
                                </td>
                                <td
                                    style={{ maxWidth: "100px" }}
                                    className="w-[100px] whitespace-nowrap break-words border overflow-auto scrollbar-thumb-rounded-full scrollbar-thin scrollbar-thumb-green scrollbar-track-slate-300"
                                >
                                    {user.Telephone}
                                </td>
                                <td
                                    style={{ maxWidth: "150px" }}
                                    className="w-[150px] whitespace-nowrap border overflow-auto scrollbar-thumb-rounded-full scrollbar-thin scrollbar-thumb-green scrollbar-track-slate-300"
                                >
                                    {user.Email}
                                </td>
                                <td
                                    style={{ maxWidth: "90px" }}
                                    className={`w-[90px] whitespace-nowrap border overflow-auto scrollbar-thumb-rounded-full scrollbar-thin scrollbar-thumb-green scrollbar-track-slate-300  ${
                                        user.IsEmailVerified
                                            ? "text-green"
                                            : "text-red-600"
                                    }`}
                                >
                                    {user.IsEmailVerified
                                        ? "Verified"
                                        : "Not Verified"}
                                </td>
                                <td
                                    style={{ maxWidth: "70px" }}
                                    className="w-[70px] whitespace-nowrap border overflow-auto scrollbar-thumb-rounded-full scrollbar-thin scrollbar-thumb-green scrollbar-track-slate-300"
                                >
                                    {user.Gender}
                                </td>
                                <td
                                    style={{ maxWidth: "40px" }}
                                    className="w-[40px] whitespace-nowrap border overflow-auto scrollbar-thumb-rounded-full scrollbar-thin scrollbar-thumb-green scrollbar-track-slate-300"
                                >
                                    {user.Age ? user.Age : "none"}
                                </td>
                                <td
                                    style={{ maxWidth: "150px" }}
                                    className="w-[150px] whitespace-nowrap border overflow-auto scrollbar-thumb-rounded-full scrollbar-thin scrollbar-thumb-green scrollbar-track-slate-300"
                                >
                                    {user.Password}
                                </td>
                                <td className="w-[50px] whitespace-nowrap overflow-x-auto border">
                                    <Link
                                        to={"/Users/" + user._id}
                                        className="select-none w-fit items-center m-auto flex gap-1 bg-green text-white p-1 rounded"
                                    >
                                        {/* <FaPen /> */}
                                        View
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Users_Table;
