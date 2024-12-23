import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState, useEffect, useRef } from "react";
import { useAppContext } from "../../../AppContext";
import Draft_Editor from "./Draft_Editor";
import useEditorState from "./Hooks/useEditorState";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import handle_Add_Projects from "./API/Post_Project";
function Add_Project() {
    const [editorState, setEditorState] = useEditorState(null);
    const { user, set_user } = useAppContext();
    useEffect(() => {
        const contentState = editorState.getCurrentContent();
        const rawContentState = convertToRaw(contentState);
    }, [editorState]);

    return (
        <div className=" max-w-[900px] w-[90%] mx-auto pt-6">
            <div className=" text-2xl font-semibold text-gray_v">
                👋 WELCOME !
            </div>
            <div className=" text-sm lg:text-base pt-2">
                Please take a moment to fill out this form, and we'll match you
                with the perfect freelancer for your needs. Let us connect you
                with the right talent to bring your project to life
            </div>
            <div className=" pt-6">
                <Formik
                    initialValues={{
                        userId: user?.id || null,
                        Field_is_Content_creation: false,
                        Field_is_Graphic_design: false,
                        Field_is_SEO_SIM: false,
                        Title: "",
                        Description: "",
                        Expected_Time: "",
                        Client_Budget: "",
                        Frelancer_Experiance: "",
                    }}
                    validate={(values) => {
                        const errors = {};

                        if (!values.Title) {
                            errors.Title = "Project Title is Required";
                        } else if (values.Title.length < 3)
                            errors.Title = "at least 3 chars";
                        else if (values.Title.length > 200)
                            errors.Title = "Max 50 chars";

                        if (!values.Expected_Time)
                            errors.Expected_Time = "Expected Time is Required";
                        else if (values.Expected_Time.length > 50)
                            errors.Expected_Time = "Max 50 chars";

                        if (!values.Client_Budget) {
                            errors.Client_Budget = "Budget is Required";
                        } else if (values.Client_Budget.length > 200)
                            errors.Title = "Max 50 chars";

                        return errors;
                    }}
                    onSubmit={async (values, { setSubmitting }) => {
                        const contentState = editorState.getCurrentContent();
                        const rawContentState = convertToRaw(contentState);

                        values.Description = JSON.stringify(rawContentState);
                        // if (values.Field_is_Content_creation)
                        //     values.Field_is_Content_creation = true;
                        // if (values.Field_is_Graphic_design)
                        //     values.Field_is_Graphic_design = true;
                        // if (values.Field_is_SEO_SIM)
                        //     values.Field_is_SEO_SIM = true;
                        values.Field_is_Content_creation =
                            !!values.Field_is_Content_creation;
                        values.Field_is_Graphic_design =
                            !!values.Field_is_Graphic_design;
                        values.Field_is_SEO_SIM = !!values.Field_is_SEO_SIM;
                        handle_Add_Projects(values, {
                            setSubmitting,
                        });
                    }}
                >
                    {({ isSubmitting, setFieldValue, values }) => (
                        <Form className="  flex flex-col text-sm md:text-lg  gap-9 text-black_text">
                            <div className=" relative pt-4">
                                <div className=" font-semibold text-sm pb-1">
                                    In which industry or field does your project
                                    primarily operate? :{" "}
                                </div>
                                <div className=" flex flex-col md:flex-row font-semibold gap-4 md:gap-24 pt-4 text-sm">
                                    <div className=" flex items-center gap-2  ">
                                        <input
                                            type="checkbox"
                                            checked={
                                                values.Field_is_Graphic_design
                                            }
                                            onClick={() => {
                                                setFieldValue(
                                                    "Field_is_Graphic_design",
                                                    !values.Field_is_Graphic_design
                                                );
                                            }}
                                        />
                                        <div>Graphic design</div>
                                    </div>
                                    <div className=" flex gap-2  ">
                                        <input
                                            type="checkbox"
                                            checked={
                                                values.Field_is_Content_creation
                                            }
                                            onClick={() => {
                                                setFieldValue(
                                                    "Field_is_Content_creation",
                                                    !values.Field_is_Content_creation
                                                );
                                            }}
                                        />
                                        <div>Content creation</div>
                                    </div>
                                    <div className=" flex gap-2  ">
                                        <input
                                            type="checkbox"
                                            checked={values.Field_is_SEO_SIM}
                                            onClick={() => {
                                                setFieldValue(
                                                    "Field_is_SEO_SIM",
                                                    !values.Field_is_SEO_SIM
                                                );
                                            }}
                                        />
                                        <div>SEO/SMM</div>
                                    </div>
                                </div>
                            </div>
                            <div className=" relative">
                                <div className=" font-semibold text-sm pb-1">
                                    Project Title :{" "}
                                </div>
                                <Field
                                    placeholder="Design a Logo for me ..."
                                    type="text"
                                    name="Title"
                                    disabled={isSubmitting}
                                    className="border border-gray_white px-4 py-2 rounded-lg  text-sm  w-full"
                                />
                                <ErrorMessage
                                    name="Title"
                                    component="div"
                                    style={errorInputMessage}
                                />
                            </div>
                            <Draft_Editor
                                editorState={editorState}
                                setEditorState={setEditorState}
                            />
                            <div className=" relative">
                                <div className=" font-semibold text-sm pb-1">
                                    What is the expected timeline for completing
                                    this project?
                                </div>
                                <Field
                                    placeholder="3 months"
                                    type="text"
                                    name="Expected_Time"
                                    disabled={isSubmitting}
                                    className="border border-gray_white px-4 py-2 rounded-lg  text-sm  w-full"
                                />
                                <ErrorMessage
                                    name="Expected_Time"
                                    component="div"
                                    style={errorInputMessage}
                                />
                            </div>
                            <div className=" relative">
                                <div className=" font-semibold text-sm pb-1">
                                    What is your budget range for this project?
                                </div>
                                <div className=" flex items-center">
                                    <Field
                                        placeholder="15000 DA"
                                        type="text"
                                        name="Client_Budget"
                                        disabled={isSubmitting}
                                        className="border border-gray_white px-4 py-2  rounded-lg text-sm  w-full"
                                    />
                                </div>

                                <ErrorMessage
                                    name="Client_Budget"
                                    component="div"
                                    style={errorInputMessage}
                                />
                            </div>
                            <div className=" relative pt-4">
                                <div className=" font-semibold text-sm pb-1">
                                    What level of experience do you prefer the
                                    freelancer to have for this project? :{" "}
                                </div>
                                <div className=" flex flex-col md:flex-row font-semibold gap-4 md:gap-24 pt-4 text-sm">
                                    <div className=" flex gap-2  ">
                                        <input
                                            id="less_than_1"
                                            type="radio"
                                            // checked={
                                            //     values.Field_is_Graphic_design
                                            // }
                                            name="Frelancer_Experiance"
                                            checked={
                                                values.Frelancer_Experiance ===
                                                "less than one year"
                                            }
                                            onChange={() =>
                                                setFieldValue(
                                                    "Frelancer_Experiance",
                                                    "less than one year"
                                                )
                                            }
                                        />
                                        <label htmlFor="less_than_1">
                                            Less than 1 year{" "}
                                        </label>
                                    </div>
                                    <div className=" flex gap-2  ">
                                        <input
                                            id="1-3-years"
                                            type="radio"
                                            // checked={
                                            //     values.Field_is_Graphic_design
                                            // }
                                            name="Frelancer_Experiance"
                                            checked={
                                                values.Frelancer_Experiance ===
                                                "1 - 3 years"
                                            }
                                            onChange={() =>
                                                setFieldValue(
                                                    "Frelancer_Experiance",
                                                    "1 - 3 years"
                                                )
                                            }
                                        />
                                        <label htmlFor="1-3-years">
                                            1 - 3 years{" "}
                                        </label>
                                    </div>
                                    <div className="flex gap-2">
                                        <input
                                            type="radio"
                                            id="3-5-years"
                                            name="Frelancer_Experiance"
                                            value="3 - 5 years"
                                            checked={
                                                values.Frelancer_Experiance ===
                                                "3 - 5 years"
                                            }
                                            onChange={() =>
                                                setFieldValue(
                                                    "Frelancer_Experiance",
                                                    "3 - 5 years"
                                                )
                                            }
                                        />
                                        <label htmlFor="3-5-years">
                                            3 - 5 years
                                        </label>
                                    </div>
                                    <div className="flex gap-2">
                                        <input
                                            type="radio"
                                            id="more_than_5"
                                            name="Frelancer_Experiance"
                                            value="More than 5 years"
                                            checked={
                                                values.Frelancer_Experiance ===
                                                "More than 5 years"
                                            }
                                            onChange={() =>
                                                setFieldValue(
                                                    "Frelancer_Experiance",
                                                    "More than 5 years"
                                                )
                                            }
                                        />
                                        <label htmlFor="more_than_5">
                                            More than 5 years
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {isSubmitting ? (
                                <span className="small-loader  w-full m-auto mb-6"></span>
                            ) : (
                                <button
                                    type="submit"
                                    className=" bg-perpol_v py-2 rounded-2xl mb-6 text-white font-semibold "
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
    );
}

const errorInputMessage = {
    position: "absolute",
    bottom: "-22px",
    left: "5px",
    fontSize: "12px",
    color: "red",
};
export default Add_Project;
