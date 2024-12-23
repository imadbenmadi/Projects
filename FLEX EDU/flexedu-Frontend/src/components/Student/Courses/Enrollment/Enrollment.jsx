import { useState, useEffect } from "react";

import axios from "axios";
import {  useNavigate, useLocation } from "react-router-dom";
import { IoIosWarning } from "react-icons/io";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";


import Not_pending_view from "./Not_pending_view";
import Pending_View from "./Pending_View";
dayjs.extend(customParseFormat);
function Enrollment() {
  const navigate = useNavigate(); // Fixed typo
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [course, setCourse] = useState(null); // Ensure course state is initialized
  const [isEnrolled, setIsEnrolled] = useState(false); // Fixed state naming
  const [Payment_Status, setPayment_Status] = useState(false); // Fixed state naming
  const [Purcase, setPurcase] = useState(null);
  const location = useLocation();
  const CourseId = location.pathname.split("/")[3];

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/Students/Courses/${CourseId}`,
          {
            withCredentials: true,
            validateStatus: () => true,
          }
        );

        if (response.status === 200) {
          const fetchedCourse = response.data.Course;
          setCourse(fetchedCourse);
          setIsEnrolled(response.data.isEnrolled);
          setPayment_Status(response.data.paymentStatus);
          setPurcase(response.data.purcase);
        } else if (response.status === 401) {
          Swal.fire("Error", "You should log in again", "error");
          navigate("/Login"); // Fixed typo
        } else {
          setError(response.data);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [CourseId, navigate]); // Ensure CourseId is a dependency
  if (loading) {
    return (
      <div className="w-screen h-[80vh] flex flex-col items-center justify-center">
        <span className="loader"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-screen h-[calc(100vh-60px)] flex items-center justify-center">
        <div className="text-red-600 font-semibold">{error.message}</div>
      </div>
    );
  }
  if (!course) {
    return (
      <div className="flex flex-col gap-6 items-center justify-center">
        <div className="pt-24 flex justify-center items-center gap-2 text-gray_v text-base font-semibold">
          <IoIosWarning />
          <h1>Course Not Found</h1>
        </div>
      </div>
    );
  }

  if (isEnrolled) {
    navigate(`/Student/Purchased/Courses/${CourseId}`);
    return null;
  }
  if (!Payment_Status || Payment_Status == "rejected")
    return (
      <Not_pending_view
        course={course}
        Purcase={Purcase}
        setPayment_Status={setPayment_Status}
      />
    );
  if (Payment_Status == "pending")
    return <Pending_View course={course} Purcase={Purcase} />;
}

export default Enrollment;
