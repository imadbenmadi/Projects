import React, { useState, useEffect } from "react";
import Page_Title from "../../Components/Page_Title";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import bernuilt from "../../../public/bernuilt.jpg";
import benomial from "../../../public/benomial.jpg";
import uniformDiscret from "../../../public/uniformDiscret.jpg";
import HyperGeomitrique from "../../../public/HyperGeomitrique.jpg";
import Geomitrique from "../../../public/Geomitrique.jpg";
import Poisson from "../../../public/Poisson.jpg";

function PS() {
    const [imagesLoaded, setImagesLoaded] = useState(false);

    useEffect(() => {
        const imageLoader = new Promise((resolve, reject) => {
            const images = [bernuilt, benomial, uniformDiscret, HyperGeomitrique, Geomitrique, Poisson];
            let loadedCount = 0;

            images.forEach((imageSrc) => {
                const img = new Image();
                img.onload = () => {
                    loadedCount++;
                    if (loadedCount === images.length) {
                        resolve();
                    }
                };
                img.onerror = () => {
                    reject();
                };
                img.src = imageSrc;
            });
        });

        imageLoader.then(() => {
            setImagesLoaded(true);
        }).catch(() => {
            console.error("Error loading images");
        });
    }, []);

    return (
        <div>
            <Page_Title title="Probability Statistic" />
            {!imagesLoaded ? (
                <div className="w-full h-full flex items-center justify-center">
                    <span className="loader"></span>
                </div>
            ) : (
                <div className=" text-xl md:text-3xl text-center w-full font-bold">
                    حلول لقوانين الاحتمالات ذات المتغير المنفصل
                    <div className=" flex flex-col justify-center items-center gap-8  my-6 ">
                        <Link
                            className=" w-[80%] m-auto bg-gray-100 shadow-lg border border-gray-200 px-2  md:px-5 py-1 text-xl md:text-3xl rounded-lg font-semibold flex justify-between items-center text-gray-800"
                            to={"/PS/Bernuit"}
                        >
                            <div className=" flex items-center gap-4">
                                <img
                                    src={bernuilt}
                                    className=" w-[50px] h-[50px] md:w-[70px] md:h-[70px] ml-4 md:ml-12 rounded-full  object-cover"
                                    alt=""
                                />
                                <span className=" ">Loi de Bernuit</span>
                            </div>

                            <FaChevronRight className=" ml-4 md:mr-12" />
                        </Link>
                        <Link
                            className="w-[80%] m-auto bg-gray-100 shadow-lg border border-gray-200 px-2  md:px-5 py-1 text-xl md:text-3xl rounded-lg font-semibold flex justify-between items-center text-gray-800"
                            to={"/PS/Benomial"}
                        >
                            <div className=" flex items-center gap-4">
                                <img
                                    src={benomial}
                                    className=" w-[50px] h-[50px] md:w-[70px] md:h-[70px] ml-4 md:ml-12 rounded-full  object-cover"
                                    alt=""
                                />
                                <span className=" ">Loi Benomial</span>
                            </div>

                            <FaChevronRight className=" ml-4 md:mr-12" />
                        </Link>
                        <Link
                            className=" w-[80%] m-auto bg-gray-100 shadow-lg border border-gray-200 px-2  md:px-5 py-1 text-xl md:text-3xl rounded-lg font-semibold flex justify-between items-center text-gray-800"
                            to={"/PS/Uniforme"}
                        >
                            <div className=" flex items-center gap-4">
                                <img
                                    src={uniformDiscret}
                                    className=" w-[50px] h-[50px] md:w-[70px] md:h-[70px] ml-4 md:ml-12 rounded-full  object-cover"
                                    alt=""
                                />
                                <span className=" ">Loi Uniforme Discret</span>
                            </div>
                            <FaChevronRight className=" ml-4 md:mr-12" />
                        </Link>
                        <Link
                            className=" w-[80%] m-auto bg-gray-100 shadow-lg border border-gray-200 px-2  md:px-5 py-1 text-xl md:text-3xl rounded-lg font-semibold flex justify-between items-center text-gray-800"
                            to={"/PS/Hyper-Geomitrique"}
                        >
                            <div className=" flex items-center gap-4">
                                <img
                                    src={HyperGeomitrique}
                                    className=" w-[50px] h-[50px] md:w-[70px] md:h-[70px] ml-4 md:ml-12 rounded-full  object-cover"
                                    alt=""
                                />
                                <span className=" ">Loi Hyper Geomitrique</span>
                            </div>
                            <FaChevronRight className=" ml-4 md:mr-12" />
                        </Link>
                        <Link
                            className=" w-[80%] m-auto bg-gray-100 shadow-lg border border-gray-200 px-2  md:px-5 py-1 text-xl md:text-3xl rounded-lg font-semibold flex justify-between items-center text-gray-800"
                            to={"/PS/Geomitrique"}
                        >
                            <div className=" flex items-center gap-4">
                                <img
                                    src={Geomitrique}
                                    className=" w-[50px] h-[50px] md:w-[70px] md:h-[70px] ml-4 md:ml-12 rounded-full  object-cover"
                                    alt=""
                                />
                                <span className=" ">Loi Geomitrique</span>
                            </div>
                            <FaChevronRight className=" ml-4 md:mr-12" />
                        </Link>
                        <Link
                            className=" w-[80%] m-auto bg-gray-100 shadow-lg border border-gray-200 px-2  md:px-5 py-1 text-xl md:text-3xl rounded-lg font-semibold flex justify-between items-center text-gray-800"
                            to={"/PS/Poissont"}
                        >
                            <div className=" flex items-center gap-4">
                                <img
                                    src={Poisson}
                                    className=" w-[50px] h-[50px] md:w-[70px] md:h-[70px] ml-4 md:ml-12 rounded-full  object-cover"
                                    alt=""
                                />
                                <span className=" ">Loi de Poissont</span>
                            </div>

                            <FaChevronRight className=" ml-4 md:mr-12" />
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

// export default PS;

// function PS() {
//     return (
//         <div>
//             <Page_Title title="Probability Statistic" />
//             <div className=" text-xl md:text-3xl text-center w-full font-bold">
//                 حلول لقوانين الاحتمالات ذات المتغير المنفصل
//             </div>
//             <div className=" flex flex-col justify-center items-center gap-8  my-6 ">
//                 <Link
//                     className=" w-[80%] m-auto bg-gray-100 shadow-lg border border-gray-200 px-2  md:px-5 py-1 text-xl md:text-3xl rounded-lg font-semibold flex justify-between items-center text-gray-800"
//                     to={"/PS/Bernuit"}
//                 >
//                     <div className=" flex items-center gap-4">
//                         <img
//                             src={bernuilt}
//                             className=" w-[50px] h-[50px] md:w-[70px] md:h-[70px] ml-4 md:ml-12 rounded-full  object-cover"
//                             alt=""
//                         />
//                         <span className=" ">Loi de Bernuit</span>
//                     </div>

//                     <FaChevronRight className=" ml-4 md:mr-12" />
//                 </Link>
//                 <Link
//                     className="w-[80%] m-auto bg-gray-100 shadow-lg border border-gray-200 px-2  md:px-5 py-1 text-xl md:text-3xl rounded-lg font-semibold flex justify-between items-center text-gray-800"
//                     to={"/PS/Benomial"}
//                 >
//                     <div className=" flex items-center gap-4">
//                         <img
//                             src={benomial}
//                             className=" w-[50px] h-[50px] md:w-[70px] md:h-[70px] ml-4 md:ml-12 rounded-full  object-cover"
//                             alt=""
//                         />
//                         <span className=" ">Loi Benomial</span>
//                     </div>

//                     <FaChevronRight className=" ml-4 md:mr-12" />
//                 </Link>
//                 <Link
//                     className=" w-[80%] m-auto bg-gray-100 shadow-lg border border-gray-200 px-2  md:px-5 py-1 text-xl md:text-3xl rounded-lg font-semibold flex justify-between items-center text-gray-800"
//                     to={"/PS/Uniforme"}
//                 >
//                     <div className=" flex items-center gap-4">
//                         <img
//                             src={uniformDiscret}
//                             className=" w-[50px] h-[50px] md:w-[70px] md:h-[70px] ml-4 md:ml-12 rounded-full  object-cover"
//                             alt=""
//                         />
//                         <span className=" ">Loi Uniforme Discret</span>
//                     </div>
//                     <FaChevronRight className=" ml-4 md:mr-12" />
//                 </Link>
//                 <Link
//                     className=" w-[80%] m-auto bg-gray-100 shadow-lg border border-gray-200 px-2  md:px-5 py-1 text-xl md:text-3xl rounded-lg font-semibold flex justify-between items-center text-gray-800"
//                     to={"/PS/Hyper-Geomitrique"}
//                 >
//                     <div className=" flex items-center gap-4">
//                         <img
//                             src={HyperGeomitrique}
//                             className=" w-[50px] h-[50px] md:w-[70px] md:h-[70px] ml-4 md:ml-12 rounded-full  object-cover"
//                             alt=""
//                         />
//                         <span className=" ">Loi Hyper Geomitrique</span>
//                     </div>
//                     <FaChevronRight className=" ml-4 md:mr-12" />
//                 </Link>
//                 <Link
//                     className=" w-[80%] m-auto bg-gray-100 shadow-lg border border-gray-200 px-2  md:px-5 py-1 text-xl md:text-3xl rounded-lg font-semibold flex justify-between items-center text-gray-800"
//                     to={"/PS/Geomitrique"}
//                 >
//                     <div className=" flex items-center gap-4">
//                         <img
//                             src={Geomitrique}
//                             className=" w-[50px] h-[50px] md:w-[70px] md:h-[70px] ml-4 md:ml-12 rounded-full  object-cover"
//                             alt=""
//                         />
//                         <span className=" ">Loi Geomitrique</span>
//                     </div>
//                     <FaChevronRight className=" ml-4 md:mr-12" />
//                 </Link>
//                 <Link
//                     className=" w-[80%] m-auto bg-gray-100 shadow-lg border border-gray-200 px-2  md:px-5 py-1 text-xl md:text-3xl rounded-lg font-semibold flex justify-between items-center text-gray-800"
//                     to={"/PS/Poissont"}
//                 >
//                     <div className=" flex items-center gap-4">
//                         <img
//                             src={Poisson}
//                             className=" w-[50px] h-[50px] md:w-[70px] md:h-[70px] ml-4 md:ml-12 rounded-full  object-cover"
//                             alt=""
//                         />
//                         <span className=" ">Loi de Poissont</span>
//                     </div>

//                     <FaChevronRight className=" ml-4 md:mr-12" />
//                 </Link>
//             </div>
//         </div>
//     );
// }

export default PS;
