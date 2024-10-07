import React from "react";

function AboutHero() {
    return (
        <div
            className="md:h-[90vh] 2xl:h-[50vh] h-screen w-screen bg-cover"
            style={{
                backgroundImage: 'url("/AboutUs/Aboutus.jpg")',
            }}
        >
            <div className="bg-black px-2 bg-opacity-30 h-full w-full flex flex-col justify-center items-center text-white">
                <h1 className="text-5xl max-lg:text-4xl font-bold my-5">
                    ABOUT US
                </h1>
                <div className="text-3xl text-center max-lg:text-2xl mb-4">
                    Reayah is a leader in the telehealth industry in Algeria
                </div>
                <div className="text-2xl max-lg:text-xl leading-10 font-light md:px-20 text-center">
                    At Reayah, we are committed to revolutionizing the way
                    patients access healthcare services. Our platform seamlessly
                    integrates various features to enhance patient-doctor
                    interactions, streamline administrative tasks, and
                    prioritize patient well-being.
                </div>
            </div>
        </div>
    );
}

export default AboutHero;
