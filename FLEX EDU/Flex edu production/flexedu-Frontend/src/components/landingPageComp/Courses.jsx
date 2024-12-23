import { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
const Courses = () => {
    const [courses, setCourses] = useState([]);

    // Fetch courses from API
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(
                    "https://api.flexedu-dz.com/Geust/Courses"
                );
                setCourses(response.data.Courses); // Assuming your API response has `Courses` key

            } catch (error) {
                // _____________
            }
        };

        fetchCourses();
    }, []);

    return (
        <section className="w-full bg-white py-24 p-4">
            <div className="md:max-w-[1100px] m-auto max-w-[400px]">
                <h1 className="py-4 text-3xl font-bold">
                    Most Popular <span className="text-[#20B486]">Courses</span>
                </h1>
                <p className="text-[#6D737A] py-3">
                    Various versions have evolved over the years, sometimes by
                    accident.
                </p>
            </div>

            <div className="md:max-w-[1100px] m-auto max-w-[400px] gap-5">
                <Swiper
                    slidesPerView={4}
                    spaceBetween={30}
                    pagination={{ clickable: true }}
                    navigation={true}
                    breakpoints={{
                        1024: { slidesPerView: 3, spaceBetween: 30 },
                        600: { slidesPerView: 2, spaceBetween: 10 },
                        500: { slidesPerView: 1, spaceBetween: 10 },
                        300: { slidesPerView: 1, spaceBetween: 10 },
                    }}
                    modules={[Pagination, Navigation]}
                    className="px-5"
                >
                    {courses.length > 0
                        ? courses.map((course) => (
                              <SwiperSlide key={course?.id}>
                                  <CourseCard
                                      title={course?.Title}
                                      category={course?.Category}
                                      rating={course?.Rate}
                                      price={course?.Price}
                                      courseImg={course?.Image} // Default image if null
                                      studentsCount={course?.Students_count} // Pass the actual students count
                                      lessonsCount={
                                          course?.Course_Videos.length
                                      } // Optional: the number of lessons based on Course_Videos
                                  />
                              </SwiperSlide>
                          ))
                        : null}
                </Swiper>
            </div>
        </section>
    );
};

export default Courses;
