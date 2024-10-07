import { useFormik } from "formik";
import * as Yup from "yup";
import { sendContactForm } from "../../ApiCalls/contactApiCalls";
import { useState } from "react";

const validationSchema = Yup.object({
  full_name: Yup.string().required("Full Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  subject: Yup.string().required("Subject is required"),
  message: Yup.string().required("Message is required"),
});

const ContactInputsSide = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      full_name: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema,

    onSubmit: async (values) => {
      setLoading(true);
      console.log("Form values", values);

      // Call the API to send the form data

      setHasSubmitted(true);

      const data = await sendContactForm(values);
      setLoading(false);
      console.log("Data", data);
    },
  });
  const handleChange = (e) => {
    formik.handleChange(e);
    setHasSubmitted(false);
  };

  // Disable the submit button if the form is not valid, not dirty, or has already been submitted
  const isSubmitDisabled = hasSubmitted;

  return (
    <form className="max-md:w-screen px-10" onSubmit={formik.handleSubmit}>
      <div>
        <div className="text-purple-500 text-xl font-bold font-['Outfit'] leading-loose">
          Full Name
        </div>
        <input
          className="w-full h-12 bg-slate-200 focus:outline-none px-6 rounded-tl-xl rounded-tr-xl border-b-2 border-teal-400 justify-start items-center gap-2.5 inline-flex"
          type="text"
          name="full_name"
          placeholder="Full Name"
          value={formik.values.full_name}
          onChange={handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.full_name && formik.errors.full_name ? (
          <div className="text-red-500">{formik.errors.full_name}</div>
        ) : null}
      </div>
      <div>
        <div className="text-purple-500 text-xl font-bold font-['Outfit'] leading-loose">
          Email
        </div>
        <input
          className="w-full h-12 bg-slate-200 focus:outline-none px-6 rounded-tl-xl rounded-tr-xl border-b-2 border-teal-400 justify-start items-center gap-2.5 inline-flex"
          type="email"
          name="email"
          placeholder="MedTaha@gmail.com"
          value={formik.values.email}
          onChange={handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500">{formik.errors.email}</div>
        ) : null}
      </div>
      <div>
        <div className="text-purple-500 text-xl font-bold font-['Outfit'] leading-loose">
          Subject
        </div>
        <input
          className="w-full h-12 bg-slate-200 focus:outline-none px-6 rounded-tl-xl rounded-tr-xl border-b-2 border-teal-400 justify-start items-center gap-2.5 inline-flex"
          type="text"
          name="subject"
          placeholder="Message subject"
          value={formik.values.subject}
          onChange={handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.subject && formik.errors.subject ? (
          <div className="text-red-500">{formik.errors.subject}</div>
        ) : null}
      </div>
      <div>
        <div className="text-purple-500 text-xl font-bold font-['Outfit'] leading-loose">
          Message
        </div>
        <textarea
          className="w-full py-2 h-32 bg-slate-200 focus:outline-none px-6 rounded-tl-xl rounded-tr-xl border-b-2 border-teal-400 justify-start items-center gap-2.5 inline-flex"
          name="message"
          placeholder="Your message"
          value={formik.values.message}
          onChange={handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.message && formik.errors.message ? (
          <div className="text-red-500">{formik.errors.message}</div>
        ) : null}
      </div>
      <button
        type="submit"
        disabled={isSubmitDisabled}
        className="mt-4 w-full h-12 bg-teal-500 text-white rounded-lg"
      >
        {!loading ? (
          "Submit"
        ) : (
          <svg
            aria-hidden="true"
            role="status"
            className="inline w-4 h-4 me-3 text-white animate-spin"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#E5E7EB"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentColor"
            />
          </svg>
        )}
      </button>
    </form>
  );
};

export default ContactInputsSide;
