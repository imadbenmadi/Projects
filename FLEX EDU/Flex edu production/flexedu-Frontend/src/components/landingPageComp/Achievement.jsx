import { AiFillVideoCamera } from "react-icons/ai";
import { FaGraduationCap, FaPeopleCarry } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import Achieve from "../../assets/achievement.png";

const AnimatedCount = ({ end, duration, suffix }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <span ref={ref} className="text-2xl font-semibold">
            <CountUp
                start={0}
                end={end}
                duration={duration}
                suffix={suffix}
                preserveValue={true}
                redraw={true}
            >
                {({ countUpRef }) => <span ref={countUpRef} />}
            </CountUp>
        </span>
    );
};

const AchievementItem = ({ icon: Icon, count, label, iconColor, delay }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <div
            ref={ref}
            className={`py-6 flex transform transition-all duration-1000 ${
                inView
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            <div className="p-4 bg-[#e9f8f3] rounded-xl">
                <Icon size={30} style={{ color: iconColor }} />
            </div>
            <div className="px-3">
                <AnimatedCount end={count} duration={2.5} suffix="+" />
                <p className="text-[#60737a]">{label}</p>
            </div>
        </div>
    );
};

const Achievement = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section ref={ref} className="w-full bg-white p-5 overflow-hidden">
            <div className="md:max-w-[1100px] m-auto grid md:grid-cols-2 max-w-[400px]">
                <div className="flex flex-col justify-start gap-4">
                    <h1
                        className={`md:leading-[42px] py-2 text-3xl font-semibold transform transition-all duration-1000 ${
                            inView
                                ? "translate-x-0 opacity-100"
                                : "-translate-x-10 opacity-0"
                        }`}
                    >
                        Our <span className="text-[#208486]">Achievements</span>
                    </h1>
                    <p
                        className={`text-[#536e96] text-2xl transform transition-all duration-1000 delay-300 ${
                            inView
                                ? "translate-x-0 opacity-100"
                                : "-translate-x-10 opacity-0"
                        }`}
                    >
                        Leading Companies use the same courses to help their
                        employees keep skills up
                    </p>
                    <div className="grid md:grid-cols-2 grid-cols-1">
                        <AchievementItem
                            icon={FaGraduationCap}
                            count={100}
                            label="Instructors"
                            iconColor="#1a9068"
                            delay={0}
                        />
                        <AchievementItem
                            icon={AiFillVideoCamera}
                            count={10000}
                            label="Videos"
                            iconColor="#1a9068"
                            delay={200}
                        />
                        <AchievementItem
                            icon={FaPeopleCarry}
                            count={3000}
                            label="Users"
                            iconColor="#1a9068"
                            delay={400}
                        />
                        <AchievementItem
                            icon={FaGraduationCap}
                            count={300}
                            label="Students"
                            iconColor="#ed4459"
                            delay={600}
                        />
                    </div>
                </div>
                <div
                    className={`border justify-center items-center transform transition-all duration-1000 ${
                        inView
                            ? "translate-x-0 opacity-100"
                            : "translate-x-10 opacity-0"
                    }`}
                >
                    <img
                        src={Achieve}
                        alt="hero"
                        className="md:order-last m-auto order-first"
                    />
                </div>
            </div>
        </section>
    );
};

export default Achievement;
