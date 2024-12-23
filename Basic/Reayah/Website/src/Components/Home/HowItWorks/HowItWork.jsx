import React from "react";

function HowItWork() {
  return (
    <div className="w-screen py-20  min-h-[calc(100vh-100px)] px-2      bg-gradient-to-r from-purple-700 to-purple-500 ">
      <div className="max-w-[1000px] flex gap-12  flex-col justify-center items-strart mx-auto">
        <div className=" max-md:text-center text-teal-400 text-4xl font-semibold font-['Outfit']">
          How it works ?
        </div>
        <div className=" md:pl-10 flex gap-10 justify-start items-center">
          <div className="text-white text-4xl font-normal font-['Outfit']">
            1
          </div>
          <div>
            <div className="text-teal-400 text-2xl font-normal font-['Outfit']">
              Set up your account.
            </div>
            <div className="text-white text-xl font-normal font-['Outfit']">
              Once you finish registering, you’ll be able to see the cost of
              your visit.
            </div>
          </div>
        </div>
        <div className="   md:pl-10 flex gap-10 justify-start items-center">
          <div className="text-white text-4xl font-normal font-['Outfit']">
            2
          </div>
          <div>
            <div className="text-teal-400 text-2xl font-normal font-['Outfit']">
              See the next available provider or schedule your appointment.
            </div>
            <div className="text-white text-xl font-normal font-['Outfit']">
              Select your concern and answer a few questions to provide the
              doctor with some context.
            </div>
          </div>
        </div>
        <div className=" md:pl-10 flex gap-10 justify-start items-center">
          <div className="text-white text-4xl font-normal font-['Outfit']">
            3
          </div>
          <div>
            <div className="text-teal-400 text-2xl font-normal font-['Outfit']">
              Start your live virtual visit.
            </div>
            <div className="text-white text-1xl font-normal font-['Outfit']">
              Meet with one of our board-certified doctors who will diagnose
              your symptoms and offer a custom treatment plan. If needed, you
              can get prescriptions delivered to you or sent to your local
              pharmacy.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowItWork;
