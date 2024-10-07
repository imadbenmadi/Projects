import React from "react";
import TeamCard from "./TeamCard";

function Team() {
  const team = [
    {
      name: "Hamed Mohammed Taha",
      position: "Founder & CEO",
      description:
        "A student specializing in information systems with expertise in software development and data analysis. Proficient in Python, Django for backend development.",
    },
    {
      name: "Ameur Khadidja",
      position: "Co-founder",
      description:
        "Associate Professor in the Department of Computer Science and Information Technology at Ouargla University. Principal Supervisor of the Reayahmed Project.",
    },
    {
      name: "Mesai Ahmed Larbi",
      position: "Co-founder",
      description:
        "A student specializing in information systems with a focus on web development and machine learning models (Fullstack & ML). Experienced Python developer and Django.",
    },
    {
      name: "Zitouni Soundos",
      position: "Administrative Assistant",
      description:
        "A student specializing in information systems with a focus on medical imaging assisting in health information.",
    },
    {
      name: "Trief Yamina",
      position: "Economic Consultant",
      description:
        "Assistant Professor at the Faculty of Economic Sciences, Commercial Sciences, and Management Sciences at the University of Ouargla. Economic Consultant for the project.",
    },
  ];
  return (
    <div className="max-w-[1300px] mx-auto">
      <div className="w-full text-center">
        <span className="text-black text-3xl font-semibold font-['Outfit']">
          Meet The Leadership Team
          <br />
        </span>
        <span className="text-black text-3xl font-normal font-['Outfit']">
          Working to change the healthcare landscape in Algeria!
        </span>
      </div>

      <div className="w-full flex-wrap flex justify-center items-center gap-10 mt-10">
        {team.map((member, index) => (
          <TeamCard
            key={index}
            name={member.name}
            role={member.position}
            img={member.img}
            description={member.description}
          />
        ))}
      </div>
    </div>
  );
}

export default Team;
