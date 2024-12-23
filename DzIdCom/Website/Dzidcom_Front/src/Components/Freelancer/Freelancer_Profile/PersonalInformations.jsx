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
        <div className="  py-16 px-6 md:px-0 max-w-[750px] mx-auto  flex flex-col gap-6 md:gap-16 break-all ">
            <div className=" text-3xl text-gray_v font-semibold flex items-start justify-between ">
                <div>
                    {user?.JobTitle ? user?.JobTitle : "no job title"}

                    <div className=" text-base font-normal pt-6">
                        {user?.about ? user?.about : null}
                    </div>
                </div>
                <img
                    src={EditeIcon}
                    alt=""
                    className=" w-8 h-8 cursor-pointer"
                    onClick={() => {
                        // window.location.href =
                        //     "/Freelancer/Complete_Profile/Step_1";
                        Navigate("/Freelancer/Complete_Profile/Step_1");
                    }}
                />{" "}
            </div>
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
                    alt=""
                    className=" w-8 h-8 cursor-pointer"
                    onClick={() => {
                        // window.location.href =
                        //     "/Client/Complete_Profile/Step_2";
                        Navigate("/Client/Complete_Profile/Step_0");
                    }}
                />
            </div>
            {/* <div className=" text-lg text-gray_v font-semibold flex items-center justify-between ">
                <div className=" flex flex-col md:flex-row md:items-center justify-center gap-2 md:gap-6">
                    <div className=" text-xl underline font-semibold">
                        About :
                    </div>
                    <div>
                        {user?.about ? (
                            user?.about
                        ) : (
                            <div className="text-sm">none</div>
                        )}
                    </div>
                </div>
                <img
                    src={EditeIcon}
                    alt=""
                    className=" w-8 h-8 cursor-pointer"
                    onClick={() => {
                        // window.location.href =
                        //     "/Freelancer/Complete_Profile/Step_2";
                        Navigate("/Freelancer/Complete_Profile/Step_2");
                    }}
                />{" "} 
            </div>*/}
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
                    alt=""
                    className=" w-8 h-8 cursor-pointer"
                    onClick={() => {
                        // window.location.href =
                        //     "/Freelancer/Complete_Profile/Step_1";
                        Navigate("/Freelancer/Complete_Profile/Step_1");
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
                    alt=""
                    className=" w-8 h-8 cursor-pointer"
                    onClick={() => {
                        // window.location.href =
                        //     "/Freelancer/Complete_Profile/Step_1";
                        Navigate("/Freelancer/Complete_Profile/Step_1");
                    }}
                />{" "}
            </div>
            <div className=" flex items-start justify-between ">
                <div className="flex flex-col gap-6  ">
                    <div className=" shrink-0 text-xl underline font-semibold text-gray_v">
                        Skills :
                    </div>
                    <div className="flex flex-wrap  gap-6">
                        {user?.Skills ? (
                            user?.Skills.map((skill) => (
                                <div key={skill.id}>
                                    <div
                                        className=" bg-perpol_v text-xl w-fit py-1
                                                     px-2 text-white rounded-lg "
                                    >
                                        {skill.skill}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className=" text-sm font-semibold  text-gray_v">
                                No skills found
                            </p>
                        )}
                    </div>
                </div>
                <img
                    src={EditeIcon}
                    alt=""
                    className=" w-8 h-8 cursor-pointer"
                    onClick={() => {
                        // window.location.href =
                        //     "/Freelancer/Complete_Profile/Step_2";
                        Navigate("/Freelancer/Complete_Profile/Step_2");
                    }}
                />{" "}
            </div>
            <div className=" w-full bg-gray_white h-[1px]"> </div>

            <div className=" text-lg text-gray_v font-semibold flex  justify-between ">
                <div className=" flex flex-col md:flex-row md:items-center justify-center gap-2 md:gap-6">
                    <div className=" text-xl underline font-semibold">
                        Portfolio Website :
                    </div>
                    <div>
                        {user?.portfolioWebsite ? (
                            <a
                                className=" text-purple-400 underline"
                                href={user?.portfolioWebsite}
                            >
                                {user?.portfolioWebsite}
                            </a>
                        ) : (
                            <div className="text-sm">none</div>
                        )}
                    </div>
                </div>
                <img
                    src={EditeIcon}
                    alt=""
                    className=" w-8 h-8  cursor-pointer"
                    onClick={() => {
                        // window.location.href =
                        //     "/Freelancer/Complete_Profile/Step_4";
                        Navigate("/Freelancer/Complete_Profile/Step_4");
                    }}
                />{" "}
            </div>
            <div className=" flex items-start justify-between ">
                <div className="flex flex-col gap-4 w-full  ">
                    <div className=" shrink-0 text-xl underline font-semibold text-gray_v">
                        Portfolio :
                    </div>
                    <div className="flex flex-wrap gap-6">
                        {user?.PortfolioItems &&
                            user?.PortfolioItems.length > 0 &&
                            user?.PortfolioItems.map((project) => (
                                <div
                                    key={project.id}
                                    className="w-full mx-auto md:mx-0 md:min-w-full break-words overflow-hidden flex flex-col gap-5 font-semibold border border-gray_white rounded-lg p-4"
                                >
                                    <div className="font-semibold text-lg text-gray_v">
                                        {project.title}
                                    </div>
                                    <div className="text-sm text-gray_v">
                                        {project.description}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray_v">
                                        <div>
                                            {/* {new Date(
                                                project.startDate
                                            ).toLocaleDateString()} */}
                                            {dayjs(project?.startDate).format(
                                                "DD MMMM YYYY"
                                            )}
                                        </div>
                                        <div className="flex gap-2">
                                            <div> -</div>
                                            {project.endDate && (
                                                <div>
                                                    {/* {new Date(
                                                        project.endDate
                                                    ).toLocaleDateString()} */}
                                                    {dayjs(
                                                        project?.endDate
                                                    ).format("DD MMMM YYYY")}
                                                </div>
                                            )}
                                        </div>
                                        <div className="font-semibold">
                                            {project.stillWorking
                                                ? "Still Working"
                                                : ""}
                                        </div>
                                    </div>
                                    {project.livePreviewLink && (
                                        <div className="flex gap-2">
                                            <div className="font-semibold text-gray_v">
                                                Preview link:
                                            </div>
                                            <a
                                                href={project.livePreviewLink}
                                                className="underline text-perpol_v"
                                            >
                                                {project.livePreviewLink}
                                            </a>
                                        </div>
                                    )}
                                </div>
                            ))}
                        <div
                            className="flex items-center justify-center w-full gap-2 text-xl text-center text-perpol_v font-semibold cursor-pointer"
                            onClick={() => {
                                // window.location.href =
                                //     "/Freelancer/Complete_Profile/Step_3";
                                Navigate("/Freelancer/Complete_Profile/Step_3");
                            }}
                        >
                            <IoIosAddCircle />
                            Add item
                        </div>
                    </div>
                </div>
                <img
                    src={EditeIcon}
                    alt=""
                    className=" w-8 h-8 cursor-pointer"
                    onClick={() => {
                        // window.location.href =
                        //     "/Freelancer/Complete_Profile/Step_3";
                        Navigate("/Freelancer/Complete_Profile/Step_3");
                    }}
                />{" "}
            </div>
            {user?.facebook_Link ||
            user?.instgram_Link ||
            user?.linkedIn_Link ? (
                <div className=" flex justify-between">
                    <div className=" flex gap-6">
                        {user?.facebook_Link && (
                            <FaFacebook
                                className=" text-blue-500 text-5xl cursor-pointer  "
                                onClick={() => {
                                    window.location.href = user?.facebook_Link;
                                }}
                            />
                        )}
                        {user?.instgram_Link && (
                            <FaInstagram
                                className=" text-red-500 text-5xl cursor-pointer  "
                                onClick={() => {
                                    window.location.href = user?.instagram_Link;
                                }}
                            />
                        )}
                        {user?.linkedIn_Link && (
                            <FaLinkedin
                                className=" text-blue-500 text-5xl cursor-pointer  "
                                onClick={() => {
                                    window.location.href = user?.linkedin_Link;
                                }}
                            />
                        )}
                    </div>
                    <img
                        src={EditeIcon}
                        alt=""
                        className=" w-8 h-8 cursor-pointer"
                        onClick={() => {
                            // window.location.href =
                            //     "/Freelancer/Complete_Profile/Step_4";
                            Navigate("/Freelancer/Complete_Profile/Step_4");
                        }}
                    />{" "}
                </div>
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
                    {/* <div className=" text-center text-md font-semibold text-gray_v pt-6">
                        {" "}
                        No Rattings yet
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default PersonalInformations;
