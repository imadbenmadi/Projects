import React from "react";
import { useRef, useEffect } from "react";

function Card({ text, Person }) {
    return (
        <div className=" flex flex-col justify-between  border-2 border-perpol rounded-xl w-fit p-6 text-gray ">
            <div className=" w-[200px] text-sm">{text}</div>
            <div>
                <div className=" w-12 h-1 bg-green my-2 rounded-xl"></div>
                <div className=" text-green">{Person}</div>
            </div>
        </div>
    );
}

function Say_Aboutus() {
    // const containerRef = useRef(null);

    // useEffect(() => {
    //     try {
    //         const handleMouseEnter = () => {
    //             containerRef.current?.addEventListener("wheel", handleWheel);
    //         };

    //         const handleMouseLeave = () => {
    //             containerRef.current?.removeEventListener("wheel", handleWheel);
    //         };

    //         const handleWheel = (event) => {
    //             const delta = Math.sign(event.deltaY);
    //             const step = 15;
    //             containerRef.current?.scrollLeft += delta * step;
    //             event.preventDefault();
    //         };

    //         containerRef.current.addEventListener(
    //             "mouseenter",
    //             handleMouseEnter
    //         );
    //         containerRef.current.addEventListener(
    //             "mouseleave",
    //             handleMouseLeave
    //         );

    //         return () => {
    //             containerRef.current.removeEventListener(
    //                 "mouseenter",
    //                 handleMouseEnter
    //             );
    //             containerRef.current.removeEventListener(
    //                 "mouseleave",
    //                 handleMouseLeave
    //             );
    //             containerRef.current.removeEventListener("wheel", handleWheel);
    //         };
    //     } catch (error) {
    //         // console.error('Error occurred while enabling smoother scrolling:', error);
    //     }
    // }, []);
    return (
        <div>
            <div
                className=" text-perpol text-2xl  text-center pb-6 font-semibold "
                style={{ WebkitOverflowScrolling: "touch" }}
            >
                Patient Say{" "}
                <span className=" relative">
                    About Us
                    <span className="absolute  left-0 -z-10 bottom-[2px] w-[100px] h-2 rounded-xl bg-green "></span>
                </span>
            </div>
            {/* <div className=" flex overflow-auto custom-overflow gap-6 pb-2 px-4"> */}
            <div
                // ref={containerRef}
                className="flex overflow-x-scroll pb-2 px-4 custom-overflow gap-6 "
                // style={{ WebkitOverflowScrolling: "touch" }}
            >
                <Card
                    text="The doctor was very knowledgeable and took the time to answer all of my questions."
                    Person="Khadidja"
                />
                <Card
                    text="I would highly recommend this platform to my friends and family."
                    Person="Houssam"
                />
                <Card
                    text="I am very happy with the service of the hospital. The staff is very cooperative and the doctors are very experienced."
                    Person="John Doe"
                />
                <Card
                    text="I am very happy with the service of the hospital. The staff is very cooperative and the doctors are very experienced."
                    Person="John Doe"
                />
                <Card
                    text="I am very happy with the service of the hospital. The staff is very cooperative and the doctors are very experienced."
                    Person="John Doe"
                />
            </div>
        </div>
    );
}

export default Say_Aboutus;
