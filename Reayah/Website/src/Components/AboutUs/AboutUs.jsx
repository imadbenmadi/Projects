import React from "react";

import WhyChooseReaya from "./WhyChooseReaya/WhyChooseReaya";
import AdsAfterChoose from "./AdsAfterChoose/AdsAfterChoose";
import Team from "./Team/Team";
import AboutHero from "./AboutHero/AboutHero";
import KeyFeatures from "./KeyFeatures/KeyFeatures";

function AboutUs() {
  return (
    <div>
      <AboutHero />
      <WhyChooseReaya />
      <AdsAfterChoose />
      <Team />
      <KeyFeatures />
    </div>
  );
}

export default AboutUs;
