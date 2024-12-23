import { Field, Form, Formik } from "formik";
import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";
import * as Yup from "yup";

function Feedback() {
  const validationSchema = Yup.object({
    firstName: Yup.string().min(3).required("First Name is required"),
    lastName: Yup.string().min(3).required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    Feedback: Yup.string().required("Feedback is required"),
  });

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      transition={{ duration: 5 }}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className=" w-full  md:px-32 p-5 md:px-20  duration-500"
    >
      <Formik
        initialValues={{
          FeedBackChoice: "",
          email: "",
          Feedback: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <motion.div variants={itemVariants}>
              <label
                className=" font-semibold ml-6 md:text-xl "
                htmlFor="FeedBackChoice"
              >
                عنوان الاقتراح
              </label>

              <Field
                as="select"
                name="FeedBackChoice"
                id="FeedBackChoice"
                className={`block w-full p-4 focus:outline-none duration-300  px-5 text-gray-900 border border-gray-300 rounded-3xl mt-3 bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 ${
                  errors.lastName && touched.lastName ? "border-red-500 " : ""
                }`}
              >
                <option value="probability statistics">
                  probability statistics
                </option>
                <option value="Systéme Machine">Systéme Machine</option>
                <option value="Programation Linéer">Programation Linéer</option>
              </Field>
              {errors.lastName && touched.lastName && (
                <div className="text-red-500 mb-3 pl-4">{errors.lastName}</div>
              )}
            </motion.div>
            <motion.div variants={itemVariants}>
              <label
                htmlFor="email"
                className=" font-semibold ml-6 md:text-xl "
              >
                الايميل
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                className={`block w-full p-4 focus:outline-none  text-gray-900 border border-gray-300 rounded-3xl mt-3 bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 ${
                  errors.email && touched.email ? "border-red-500" : ""
                }`}
                placeholder="jane@acme.com"
              />
              {errors.email && touched.email && (
                <div className="text-red-500 mb-3 pl-4">{errors.email}</div>
              )}
            </motion.div>
            <motion.div variants={itemVariants}>
              <label
                className=" font-semibold ml-6 md:text-xl "
                htmlFor="Feedback"
              >
                الاقتراح
              </label>
              <Field
                as="textarea"
                id="Feedback"
                name="Feedback"
                className={`block w-full focus:outline-none  p-4 text-gray-900 border border-gray-300 rounded-3xl mt-3 bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 ${
                  errors.Feedback && touched.Feedback ? "border-red-500" : ""
                }`}
                placeholder="Give me your Feedback"
              />
              {errors.Feedback && touched.Feedback && (
                <div className="text-red-500 mb-3 pl-4">{errors.Feedback}</div>
              )}
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="w-full my-5  flex justify-center "
            >
              <button
                type="submit"
                className="bg-blue-500  mx-auto w-fit  hover:bg-blue-700 text-white text-xl font-bold py-2 px-4 rounded-full"
              >
                {" "}
                Submit
              </button>
            </motion.div>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
}

export default Feedback;
