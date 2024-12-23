import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useAppContext } from "../../../AppContext";
import { useState, useEffect, useRef } from "react";

import { IoClose } from "react-icons/io5";
import { FaRegImage } from "react-icons/fa";
import handleEdite from "./API/Post_EditUser";
import Delete_Profile_Pic from "./API/Delete_Profile_Pic";
import { useNavigate } from "react-router";

function Step_2() {
    const Navigate = useNavigate();

    const [image_state, setimage_state] = useState(null);
    const { user, set_user, isProfileCompleted } = useAppContext();
    const [imageDeleteLoading, setimageDeleteLoading] = useState(false);
    const [imageChanged, setimageChanged] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (image_state) setimageChanged(true);
        else if (!image_state) setimageChanged(false);
        else setimageChanged(false);
    }, [image_state]);
    if (!user || !set_user) return null;
    const skillsOptions = [
        "Social Media Marketing",
        "Graphic Design",
        "Logo Design",
        "UI/UX Design",
        "Web Design",
        "Illustration",
        "Typography Design",
        "Motion Graphics",
        "Video Editing",
        "Animation",
        "Content Creation",
        "Copywriting",
        "Creative Writing",
        "Blog Writing",
        "Article Writing",
        "SEO Writing",
        "Social Media Management",
        "Content Strategy",
        "Content Marketing",
        "Search Engine Optimization (SEO)",
        "Digital Marketing",
    ];
    const Skills_from_Server = user?.Skills
        ? user?.Skills.map((skill) => skill.skill)
        : [];
    const [selectedSkills, setSelectedSkills] = useState(Skills_from_Server);
    const [availableSkills, setAvailableSkills] = useState(
        skillsOptions.filter((skill) => !Skills_from_Server.includes(skill))
    );

    const handleSkillChange = (e) => {
        const selectedValue = e.target.value;
        if (!selectedSkills.includes(selectedValue) && selectedValue !== "") {
            setSelectedSkills([...selectedSkills, selectedValue]);
            setAvailableSkills(
                availableSkills.filter((skill) => skill !== selectedValue)
            );
        }
    };

    const handleRemoveSkill = (skill) => {
        setSelectedSkills(selectedSkills.filter((s) => s !== skill));
        setAvailableSkills([...availableSkills, skill]);
    };
    return (
        <div className="  flex flex-col items-center justify-center  mt-6 gap-6 ">
            <div className="w-full px-6 md:max-w-[500px] flex flex-col gap-6  ">
                <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start gap-4 md:gap-12 w-full ">
                    <div className=" order-2 md:order-1">
                        <div className=" w-full">
                            <input
                                id="Step2_image"
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={(event) => {
                                    setimage_state(
                                        event.currentTarget.files[0]
                                    );
                                }}
                                ref={fileInputRef}
                                // disabled={isSubmitting}
                                className="hidden" // Hide the default file input button
                            />
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            {user?.profile_pic_link ? (
                                <>
                                    <img
                                        src={
                                            "http://localhost:3000/" +
                                            user?.profile_pic_link
                                        }
                                        alt="Profile Pic"
                                        className=" w-[150px] h-[150px] object-cover rounded-full"
                                    />
                                    {imageDeleteLoading ? (
                                        <span className="small-loader mt-5"></span>
                                    ) : (
                                        <div
                                            className="  mt-2 text-white w-fit mx-auto rounded-lg px-3 font-semibold text-lg
                                         bg-gray-400 cursor-pointer"
                                            onClick={() => {
                                                Delete_Profile_Pic(
                                                    setimageDeleteLoading,
                                                    set_user,
                                                    setimage_state
                                                );
                                            }}
                                        >
                                            {/* <IoClose /> */}
                                            Remove
                                        </div>
                                    )}
                                </>
                            ) : image_state ? (
                                <div className=" relative ">
                                    <img
                                        src={URL.createObjectURL(image_state)} // Create a URL for the selected image
                                        alt="Selected Image"
                                        // ref={fileInputRef}
                                        className=" w-[150px] h-[150px]  object-cover rounded-full"
                                    />
                                    <div
                                        className="  mt-2 text-white w-fit mx-auto rounded-lg px-3 font-semibold text-lg
                                         bg-gray-400 cursor-pointer"
                                        onClick={() => {
                                            setimage_state(null);
                                            // setimageChanged(false);
                                            if (fileInputRef.current) {
                                                fileInputRef.current.value = "";
                                            }
                                        }}
                                    >
                                        {/* <IoClose /> */}
                                        Cancel
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className="w-[150px] h-[150px]  bg-gray_white text-gray rounded-full flex items-center justify-center cursor-pointer"
                                    onClick={() =>
                                        document
                                            .getElementById("Step2_image")
                                            .click()
                                    }
                                >
                                    <FaRegImage className=" text-gray_v text-2xl" />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className=" order-1  md:order-2">
                        {!isProfileCompleted && (
                            <div className=" font-semibold text-gray_v pt-6">
                                Profil 40% Completed ✅
                            </div>
                        )}
                        <div className=" flex flex-col gap-1 pt-2 text-sm font-semibold text-gray_v">
                            <div className=" break-all">
                                {user?.firstName && user?.firstName}
                            </div>
                            <div className=" break-all">
                                {user?.lastName && user?.lastName}
                            </div>
                            <div className=" break-all">
                                {user?.email && user?.email}{" "}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Progress*/}
                <div className=" flex items-center justify-start gap-5">
                    <div className=" w-[100px] h-2 rounded-lg bg-Rose_b_v "></div>
                    <div className=" w-[100px] h-2 rounded-lg bg-Rose_b_v "></div>
                    <div className=" w-[100px] h-2 rounded-lg bg-Rose_v "></div>
                    <div className=" w-[100px] h-2 rounded-lg bg-Rose_v "></div>
                </div>
                <div className=" mb-6">
                    <div className=" font-semibold text-lg text-gray_v pb-6">
                        3 - Areas of Expertise{" "}
                    </div>
                    <Formik
                        initialValues={{
                            userId: user?.id,
                            about: user?.about || "",
                            Skills: Skills_from_Server || [],
                        }}
                        validate={(values) => {
                            const errors = {};
                            if (!values.about) {
                                errors.about = "about is Required";
                            } else if (values.about.length < 10)
                                errors.about = "at least 10 chars";
                            else if (values.about.length > 3000)
                                errors.about = "max 3000 chars";

                            if (values.Skills.length === 0) {
                                errors.Skills = " At least add one skill ";
                            }
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            if (values.about == user?.about) {
                                delete values.about;
                            }
                            if (Object.keys(values).length >= 1 || imageChanged)
                                handleEdite(
                                    values,
                                    set_user,
                                    "/Freelancer/Complete_Profile/Step_3",
                                    imageChanged ? image_state : null,
                                    {
                                        setSubmitting,
                                    }
                                );
                            else {
                                setSubmitting(false);
                                Navigate("/Freelancer/Complete_Profile/Step_3");
                            }
                        }}
                    >
                        {({ isSubmitting, setFieldValue, values, errors }) => (
                            <Form className="  flex flex-col text-sm md:text-lg  gap-9 text-black_text">
                                <div className=" relative">
                                    <div className="relative">
                                        <div className="font-semibold text-sm pb-1">
                                            Skills
                                        </div>

                                        <select
                                            name="Skills"
                                            onChange={(e) => {
                                                handleSkillChange(e);
                                                setFieldValue("Skills", [
                                                    ...selectedSkills,
                                                    e.target.value,
                                                ]);
                                            }}
                                            disabled={isSubmitting}
                                            className="border border-gray_white px-4 py-2 rounded-lg text-sm w-full"
                                        >
                                            <option
                                                value=""
                                                className="text-sm font-semibold"
                                            >
                                                Select a skill
                                            </option>
                                            {availableSkills.map(
                                                (skill, index) => (
                                                    <option
                                                        // key={skill.id}
                                                        key={index}
                                                        value={skill}
                                                        className="text-sm  font-semibold"
                                                    >
                                                        {skill}
                                                    </option>
                                                )
                                            )}
                                        </select>

                                        <ErrorMessage
                                            name="Skills"
                                            component="div"
                                            style={errorInputMessage}
                                        />
                                    </div>
                                    <div>
                                        <ul className=" pt-2 flex flex-wrap items-center justify-start gap-4">
                                            {selectedSkills &&
                                                selectedSkills.map(
                                                    (skill, index) => (
                                                        <li
                                                            // key={skill.id}
                                                            key={index}
                                                            className="bg-perpol_v text-white px-2 py-1 rounded-lg flex items-center justify-center gap-1"
                                                        >
                                                            {skill}

                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    handleRemoveSkill(
                                                                        skill
                                                                    );
                                                                    const updatedSkills =
                                                                        selectedSkills.filter(
                                                                            (
                                                                                s
                                                                            ) =>
                                                                                s !==
                                                                                skill
                                                                        );
                                                                    setFieldValue(
                                                                        "Skills",
                                                                        updatedSkills
                                                                    );
                                                                }}
                                                                className="ml-1 text-sm font-semibold text-white rounded-full w-4 h-4 flex items-center justify-center"
                                                            >
                                                                <IoClose className="md:font-semibold md:text-xl" />
                                                            </button>
                                                        </li>
                                                    )
                                                )}
                                        </ul>
                                    </div>
                                </div>
                                <div className=" relative">
                                    <div className=" font-semibold text-sm pb-1">
                                        Tell us About your Self{" "}
                                    </div>
                                    <Field
                                        placeholder="Tell us about your self"
                                        as="textarea"
                                        rows={7}
                                        name="about"
                                        disabled={isSubmitting}
                                        className=" resize-none border border-gray_white px-4 py-2 rounded-lg  text-sm  w-full"
                                    />
                                    <ErrorMessage
                                        name="about"
                                        component="div"
                                        style={errorInputMessage}
                                    />
                                </div>

                                {isSubmitting ? (
                                    <span className="small-loader  w-full m-auto"></span>
                                ) : (
                                    <button
                                        type="submit"
                                        className=" bg-perpol_v py-2 rounded-2xl text-white font-semibold "
                                        disabled={isSubmitting}
                                    >
                                        Continue
                                    </button>
                                )}
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}

const errorInputMessage = {
    position: "absolute",
    bottom: "-22px",
    left: "5px",
    fontSize: "12px",
    color: "red",
};
export default Step_2;
