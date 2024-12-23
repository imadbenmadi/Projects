import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { IoIosWarning } from "react-icons/io";
import Swal from "sweetalert2";
import { IoAdd } from "react-icons/io5";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useLocation } from "react-router-dom";
dayjs.extend(customParseFormat);
import CourseReviewCard from "./Review/Course_Review_Card";
import { CiImageOn } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import MeetCard from "./MeetCard";
function Course() {
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [Course, setCourse] = useState();
    const location = useLocation();
    const CourseId = location.pathname.split("/")[2];
    const [showDescription, setShowDescription] = useState(false);
    function toggleDescription() {
        setShowDescription(!showDescription);
    }
    const [delete_loading, setDeleteLoading] = useState(false);
    const DeleteCourse = async () => {
        setDeleteLoading(true);
        try {
            const response = await axios.delete(
                `http://localhost:3000/Admin/Courses/${CourseId}`,
                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            );

            if (response.status == 200) {
                Swal.fire("Success", "Course Deleted Successfully", "success");
                setDeleteLoading(false);
                Navigate("/Courses");
            } else {
                Swal.fire("Error", response.data.message, "error");
                setDeleteLoading(false);
            }
        } catch (error) {
            Swal.fire("Error", error.message, "error");
            setDeleteLoading(false);
        }
    };
    useEffect(() => {
        setLoading(true);
        const FetchCourse = async ({ setCourse, setLoading, setError }) => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `http://localhost:3000/Admin/Courses/${CourseId}`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );

                if (response.status == 200) {
                    const Course = response.data.Course;
                    setCourse(Course);
                } else if (response.status == 401) {
                    Swal.fire("Error", "you should login again", "error");
                    Navigate("/Login");
                } else {
                    setError(response.data);
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        FetchCourse({ setCourse, setLoading, setError });
    }, []);

    if (loading) {
        return (
            <div className=" w-full h-[80vh] flex flex-col items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    } else if (error)
        return (
            <div className=" w-full h-[calc(100vh-60px)] flex items-center justify-center">
                <div className="text-red-600 font-semibold">
                    {error.message}
                </div>
            </div>
        );
    else
        return (
            <div>
                <div>
                    {!Course ? (
                        <div className=" flex flex-col gap-6 items-center justify-center">
                            <div className="pt-24 flex justify-center items-center gap-2 text-gray_v text-base font-semibold">
                                <IoIosWarning />
                                <h1>Course Not Found</h1>
                            </div>
                        </div>
                    ) : (
                        <div className=" flex flex-col items-center justify-center gap-6 p-4">
                            <div className=" flex justify-between w-full ">
                                <div className=" w-[90%] ">
                                    <div className=" flex flex-col gap-2 ">
                                        <div className=" flex gap-2 ">
                                            {Course?.Image ? (
                                                <img
                                                    className="w-[220px] h-[220px] object-cover"
                                                    src={`http://localhost:3000/${Course?.Image}`}
                                                    alt="Course image"
                                                />
                                            ) : (
                                                <div className="flex items-center justify-center w-[220px] h-[220px] bg-gray-100 ">
                                                    <CiImageOn className=" text-xl" />
                                                </div>
                                            )}
                                            <div>
                                                <div className="flex items-center justify-between w-full">
                                                    <div className="text-sm  mb-2 font-semibold text-white">
                                                        <div className=" text-gray_v text-lg">
                                                            {Course?.Title}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-sm text-gray_v font-semibold">
                                                        {Course?.Category}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-sm text-gray_v font-semibold">
                                                        {Course?.Price == 0 ? (
                                                            <div className="text-green-600 font-semibold">
                                                                Free
                                                            </div>
                                                        ) : (
                                                            Course?.Price && (
                                                                <div className="text-gray_v font-semibold">
                                                                    {
                                                                        Course?.Price
                                                                    }{" "}
                                                                    DA
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between w-full font-semibold">
                                                    <div className="text-sm pt-1 text-gray_v">
                                                        Created at :{" "}
                                                        {/* {new Date(
                                                    Course?.createdAt
                                                ).toLocaleDateString()} */}
                                                        {dayjs(
                                                            Course?.createdAt
                                                        ).format(
                                                            "DD MMMM YYYY"
                                                        )}
                                                    </div>
                                                </div>
                                                <div className=" flex justify-start gap-6 font-semibold text-sm text-gray_v pt-6">
                                                    <div className="flex gap-4 w-full">
                                                        <div className="flex gap-1">
                                                            {[...Array(5)].map(
                                                                (_, index) =>
                                                                    index <
                                                                    Math.floor(
                                                                        Course?.Rate ||
                                                                            0
                                                                    ) ? (
                                                                        <FaStar
                                                                            key={
                                                                                index
                                                                            }
                                                                            className="text-yellow-400"
                                                                        />
                                                                    ) : index <
                                                                      Math.ceil(
                                                                          Course?.Rate ||
                                                                              0
                                                                      ) ? (
                                                                        <FaStarHalf
                                                                            key={
                                                                                index
                                                                            }
                                                                            className="text-yellow-400"
                                                                        />
                                                                    ) : (
                                                                        <FaStar
                                                                            key={
                                                                                index
                                                                            }
                                                                            className="text-gray-400"
                                                                        />
                                                                    )
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className=" shrink-0">
                                                        {Course?.Students_count ? (
                                                            <div>
                                                                {" "}
                                                                {
                                                                    Course?.Students_count
                                                                }{" "}
                                                                Enrolment
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                0 Enrolment
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className=" shrink-0">
                                                        {Course?.Course_Videos ? (
                                                            <div>
                                                                {" "}
                                                                {
                                                                    Course
                                                                        ?.Course_Videos
                                                                        .length
                                                                }{" "}
                                                                Vedios
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                No Vedios in
                                                                this Course
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" text-gray-600 font-semibold text-sm">
                                        {showDescription ? (
                                            <div className="w-[80%] pl-8 py-4">
                                                <div
                                                    className="select-none flex gap-2 items-center justify-start underlined pb-4 cursor-pointer"
                                                    onClick={toggleDescription}
                                                >
                                                    Show Description{" "}
                                                    <FaArrowUp />
                                                </div>
                                                <div className="pb-4">
                                                    {Course?.Description && (
                                                        <p className="text-gray text-base">
                                                            {
                                                                Course?.Description
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="w-[80%] pl-8 py-4">
                                                <div
                                                    className="select-none flex gap-2 items-center justify-start underlined pb-4 cursor-pointer"
                                                    onClick={toggleDescription}
                                                >
                                                    Show Description{" "}
                                                    <FaArrowDown />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="my-4 w-full px-6 max-w-6xl mx-auto">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-2xl font-semibold text-gray-800">
                                        Course Meets
                                    </h3>
                                </div>
                                {Course?.Course_Meets &&
                                Course?.Course_Meets.length > 0 ? (
                                    Course?.Course_Meets.map((meet, index) => (
                                        <MeetCard
                                            key={index}
                                            meet={meet}
                                            index={index}
                                        />
                                    ))
                                ) : (
                                    <p className="text-center text-gray-500 py-8">
                                        No Meetings available for this course.
                                    </p>
                                )}
                            </div>
                            <div className=" flex gap-3 items-center justify-center">
                                <div className=" w-fit  ">
                                    <Link
                                        to={`/Courses/${Course?.id}/Add`}
                                        className=" flex items-center justify-center font-bold p-2 mt-6 bg-green-500 text-white cursor-pointer  rounded-lg "
                                    >
                                        Upload Video
                                    </Link>
                                </div>
                                <div className=" w-fit  ">
                                    <Link
                                        to={`/Courses/${Course?.id}/Edit`}
                                        className=" flex items-center justify-center font-bold p-2 mt-6 bg-gray-500 text-white cursor-pointer  rounded-lg "
                                    >
                                        Edite Course
                                    </Link>
                                </div>
                                <div>
                                    {delete_loading ? (
                                        <div className="flex justify-center ">
                                            <span className="small-loader"></span>
                                        </div>
                                    ) : (
                                        <div
                                            onClick={() => DeleteCourse()}
                                            className="flex items-center justify-center font-bold p-2 mt-6 bg-red-500 text-white cursor-pointer  rounded-lg"
                                        >
                                            Delete Course
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <div className=" flex flex-col gap-4">
                                    {Course?.Course_Videos &&
                                    Course?.Course_Videos.length > 0
                                        ? Course?.Course_Videos.map(
                                              (vedio, index) => (
                                                  <div
                                                      className=" flex justify-between  min-w-[70vw] bg-gray-100 py-2 px-4 mb-4 rounded-lg"
                                                      key={vedio.id}
                                                  >
                                                      <div className=" flex gap-4">
                                                          <div className=" font-semibold ">
                                                              {index + 1}.
                                                          </div>

                                                          <div className=" flex gap-2">
                                                              <div className="flex flex-col gap-1">
                                                                  <div className="text-md  font-semibold">
                                                                      {
                                                                          vedio?.Title
                                                                      }
                                                                  </div>

                                                                  <div className="text-sm text-gray_v font-semibold">
                                                                      {
                                                                          vedio?.Duration
                                                                      }
                                                                  </div>
                                                              </div>
                                                          </div>
                                                      </div>

                                                      <div className=" flex items-center justify-center">
                                                          <Link
                                                              to={`/Courses/${Course?.id}/Vedios/${vedio.id}`}
                                                              className="bg-gray-500  px-3 py-2 rounded-md cursor-pointer
                                                     text-white font-semibold text-base"
                                                          >
                                                              View
                                                          </Link>
                                                      </div>
                                                  </div>
                                              )
                                          )
                                        : null}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className=" max-w-[80vw] pl-6 py-10">
                    <h2 className="text-2xl font-bold text-gray-600 pl-6 mb-4">
                        Reviews
                    </h2>

                    {Course?.Reviews?.map((review) => (
                        <CourseReviewCard
                            key={review.id}
                            review={review}
                            courseId={CourseId}
                        />
                    ))}
                </div>
            </div>
        );
}

export default Course;
