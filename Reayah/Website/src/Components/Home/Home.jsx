import React from "react";
import Hero from "./Hero";
import Say_Aboutus from "./Say_Aboutus";
import AreYouADoctor from "./AreYouADoctor";
import HowItWork from "./HowItWorks/HowItWork";
function Home() {
  return (
    <div>
      <Hero />
      <div className=" my-10">
        <Say_Aboutus />
      </div>
      <AreYouADoctor />
      <HowItWork />
    </div>
  );
}

export default Home;
