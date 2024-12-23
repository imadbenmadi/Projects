import { useAppContext } from "../../../AppContext";
import EditeIcon from "../../../../public/Profile/EditeIcon.png";
import { IoIosAddCircle } from "react-icons/io";
import { useNavigate } from "react-router";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
import { FaFacebook, FaStar, FaStarHalf } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
function PersonalInformations() {
    const Navigate = useNavigate();
    const { user } = useAppContext();
    return (
        <div className="  py-4 px-6 md:px-0 max-w-[750px] mx-auto  flex flex-col gap-6 md:gap-16 break-all ">
            <div className=" text-lg text-gray_v font-semibold flex items-center justify-between ">
                <div className=" flex flex-col md:flex-row md:items-center justify-center gap-2 md:gap-6">
                    <div className=" text-xl underline font-semibold">
                        Email :
                    </div>
                    <div>
                        {user?.email ? (
                            user?.email
                        ) : (
                            <div className="text-sm">none</div>
                        )}
                    </div>
                </div>
                <img
                    src={EditeIcon}
                    alt="EditeIcon"
                    className=" w-8 h-8 cursor-pointer "
                    onClick={() => {
                        // window.location.href =
                        //     "/Client/Complete_Profile/Step_2";
                        Navigate("/Client/Complete_Profile/Step_0");
                    }}
                />
            </div>

            <div className=" text-lg text-gray_v font-semibold flex items-center justify-between ">
                <div className=" flex flex-col md:flex-row md:items-center justify-center gap-2 md:gap-6">
                    <div className=" text-xl underline font-semibold">
                        Phone Number :
                    </div>
                    <div>
                        {user?.telephone ? (
                            user?.telephone
                        ) : (
                            <div className="text-sm">none</div>
                        )}
                    </div>
                </div>
                <img
                    src={EditeIcon}
                    alt="EditeIcon"
                    className=" w-8 h-8 cursor-pointer"
                    onClick={() => {
                        // window.location.href =
                        //     "/Client/Complete_Profile/Step_1";
                        Navigate("/Client/Complete_Profile/Step_1");
                    }}
                />{" "}
            </div>

            <div className=" font-semibold text-gray_v text-lg flex items-center justify-between">
                <div className="flex flex-col md:flex-row md:items-center justify-center gap-2 md:gap-6">
                    <div className=" text-xl underline font-semibold  ">
                        {" "}
                        National Card Number{"    "}
                    </div>
                    {user?.nationalCardNumber ? (
                        user?.nationalCardNumber
                    ) : (
                        <div className="text-sm">none</div>
                    )}{" "}
                </div>
                <img
                    src={EditeIcon}
                    alt="EditeIcon"
                    className=" w-8 h-8 cursor-pointer"
                    onClick={() => {
                        // window.location.href =
                        //     "/Client/Complete_Profile/Step_1";
                        Navigate("/Client/Complete_Profile/Step_1");
                    }}
                />{" "}
            </div>
            <div className=" w-full bg-gray_white h-[1px]"> </div>
            <div className=" text-lg text-gray_v font-semibold flex items-start justify-between ">
                <div>
                    <div className=" flex flex-col md:flex-row md:items-center justify-center gap-2 md:gap-6">
                        <div className=" text-xl underline font-semibold">
                            Company :
                        </div>
                        <div>
                            <div>
                                {user?.company_Name ? (
                                    user?.company_Name
                                ) : (
                                    <div className="text-sm">none</div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className=" text-sm font-normal pt-4">
                        {user?.company_about ? user?.company_about : null}
                    </div>
                </div>
                <img
                    src={EditeIcon}
                    alt="EditeIcon"
                    className=" w-8 h-8 cursor-pointer"
                    onClick={() => {
                        // window.location.href =
                        //     "/Client/Complete_Profile/Step_2";
                        Navigate("/Client/Complete_Profile/Step_2");
                    }}
                />{" "}
            </div>
            <div className=" text-lg text-gray_v font-semibold flex items-center justify-between ">
                <div className=" flex flex-col md:flex-row md:items-center justify-center gap-2 md:gap-6">
                    <div className=" text-xl underline font-semibold">
                        Work Field :
                    </div>
                    <div>
                        <div>
                            {user?.company_WorkField ? (
                                user?.company_WorkField
                            ) : (
                                <div className="text-sm">none</div>
                            )}
                        </div>
                    </div>
                </div>
                <img
                    src={EditeIcon}
                    alt="EditeIcon"
                    className=" w-8 h-8 cursor-pointer"
                    onClick={() => {
                        // window.location.href =
                        //     "/Client/Complete_Profile/Step_2";
                        Navigate("/Client/Complete_Profile/Step_2");
                    }}
                />{" "}
            </div>
            <div className=" text-lg text-gray_v font-semibold flex  justify-between ">
                <div className=" flex flex-col md:flex-row md:items-center justify-center gap-2 md:gap-6">
                    <div className=" text-xl underline font-semibold">
                        Website :
                    </div>
                    <div>
                        {user?.company_Website ? (
                            <a
                                className=" text-purple-400 underline"
                                href={user?.company_Website}
                            >
                                {user?.company_Website}
                            </a>
                        ) : (
                            <div className="text-sm">none</div>
                        )}
                    </div>
                </div>
                <img
                    src={EditeIcon}
                    alt="EditeIcon"
                    className=" w-8 h-8  cursor-pointer"
                    onClick={() => {
                        // window.location.href =
                        //     "/Client/Complete_Profile/Step_3";
                        Navigate("/Client/Complete_Profile/Step_3");
                    }}
                />{" "}
            </div>

            <div className=" text-lg text-gray_v font-semibold flex items-center justify-between ">
                <div className=" flex flex-col md:flex-row md:items-center justify-center gap-2 md:gap-6">
                    <div className=" text-xl underline font-semibold">
                        Adress :
                    </div>
                    <div>
                        {user?.company_Adress ? (
                            user?.company_Adress
                        ) : (
                            <div className="text-sm">none</div>
                        )}
                    </div>
                </div>
                <img
                    src={EditeIcon}
                    alt="EditeIcon"
                    className=" w-8 h-8 cursor-pointer"
                    onClick={() => {
                        // window.location.href =
                        //     "/Client/Complete_Profile/Step_2";
                        Navigate("/Client/Complete_Profile/Step_2");
                    }}
                />{" "}
            </div>
            <div className=" text-lg text-gray_v font-semibold flex items-center justify-between ">
                <div className=" flex flex-row md:items-center justify-center gap-2 md:gap-6">
                    <div className=" text-base  font-semibold">
                        Created At :
                    </div>
                    <div>
                        {user?.company_creationDate ? (
                            // new Date(
                            //     user?.company_creationDate
                            // ).toLocaleDateString()
                            dayjs(user?.company_creationDate).format(
                                "DD MMMM YYYY"
                            )
                        ) : (
                            <div className="text-sm">none</div>
                        )}
                    </div>
                </div>
                <img
                    src={EditeIcon}
                    alt="EditeIcon"
                    className=" w-8 h-8 cursor-pointer"
                    onClick={() => {
                        // window.location.href =
                        //     "/Client/Complete_Profile/Step_2";
                        Navigate("/Client/Complete_Profile/Step_2");
                    }}
                />{" "}
            </div>
            {user?.facebook_Link ||
            user?.instgram_Link ||
            user?.linkedIn_Link ? (
                <>
                    <div className=" flex justify-between">
                        <div className=" flex gap-6">
                            {user?.facebook_Link && (
                                <FaFacebook
                                    className=" text-blue-500 text-5xl cursor-pointer  "
                                    onClick={() => {
                                        window.location.href =
                                            user?.facebook_Link;
                                    }}
                                />
                            )}
                            {user?.instgram_Link && (
                                <FaInstagram
                                    className=" text-red-500 text-5xl cursor-pointer  "
                                    onClick={() => {
                                        window.location.href =
                                            user?.instagram_Link;
                                    }}
                                />
                            )}
                            {user?.linkedIn_Link && (
                                <FaLinkedin
                                    className=" text-blue-500 text-5xl cursor-pointer  "
                                    onClick={() => {
                                        window.location.href =
                                            user?.linkedin_Link;
                                    }}
                                />
                            )}
                        </div>
                        <img
                            src={EditeIcon}
                            alt="EditeIcon"
                            className=" w-8 h-8 cursor-pointer"
                            onClick={() => {
                                // window.location.href =
                                //     "/Client/Complete_Profile/Step_3";
                                Navigate("/Client/Complete_Profile/Step_3");
                            }}
                        />{" "}
                    </div>
                </>
            ) : null}

            <div className=" w-full bg-gray_white h-[1px]"> </div>
            <div>
                <div className="flex flex-col gap-4 w-full  ">
                    <div className=" flex flex-row md:items-center gap-6 md:gap-10 shrink-0 text-2xl  font-semibold text-gray_v">
                        <div className=" underline">Reviews : </div>
                        <div className=" flex items-center justify-center gap-4 ">
                            {user?.Rate ? (
                                <>
                                    <div className=" ">{user?.Rate}</div>
                                    {/* <div className=" text-yellow-400 flex gap-1">
                                        {[...Array(Math.floor(user?.Rate))].map(
                                            (_, index) => (
                                                <FaStar key={index} />
                                            )
                                        )}
                                        {user?.Rate % 1 !== 0 && <FaStarHalf />}
                                    </div> */}
                                    <FaStar className="text-yellow-400 " />
                                </>
                            ) : (
                                <div className=" text-sm">No ratings yet</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PersonalInformations;
