import React from "react";
import PatientsCard from "./Patients/PatientsCard";

function Patients() {
  return (
    <div className="w-full  min-h-screen h-fit  bg-purple-100 rounded-2xl flex-col flex justify-start items-center ">
      <div className="w-[90%] my-6 mx-auto h-44 px-16 py-14 bg-gradient-to-r from-purple-700 to-purple-400 rounded-2xl justify-center items-center gap-96 inline-flex">
        <div className="text-white text-5xl font-semibold font-['Outfit']">
          Patients
        </div>
        <div className="self-stretch px-2.5 py-1 bg-teal-400 rounded-md justify-center items-center gap-2.5 inline-flex">
          <div className="text-black text-base font-semibold font-['Outfit']">
            Add Patient
          </div>
        </div>
      </div>
      <div className="flex gap-4 justify-center flex-wrap items-center ">
        <PatientsCard />
        <PatientsCard />
        <PatientsCard />
        <PatientsCard />
      </div>
    </div>
  );
}

export default Patients;
