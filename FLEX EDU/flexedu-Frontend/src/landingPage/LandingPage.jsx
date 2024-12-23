import NavBar from "./NavBar/NavBar";
import HeroSection from "../components/landingPageComp/HeroSection";
import {
  Achievement,
  Categories,
  Courses,
  CTA,
  Footer,
} from "../components/landingPageComp";
import ContactPage from "../components/landingPageComp/ContactPage";
// import NavBar from "./NavBar/NavBar";

function LandingPage() {
  return (
    <>
      <NavBar />
      <div className=" dark:bg-black dark:text-white scroll-smooth duration-500 scroll-d relative min-h-h-screen overflow-y-auto custom-overflow overflow-x-hidden ">
        <HeroSection />
        <Courses />
        <Achievement />
        <Categories />

        <ContactPage />
        <CTA />
        <Footer />
      </div>
    </>
  );
}

export default LandingPage;
