import google from "../assets/icon/Google.png";
import apple from "../assets/icon/Apple.png";
import facebook from "../assets/icon/Facebook.png";
import rowRight from "../assets/icon/arrow-right.png";
import rowRightBlack from "../assets/icon/arrow-right-black.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Formik, Field, ErrorMessage, Form } from "formik";
import Swal from "sweetalert2";
import { loginUser, registerUser } from "../Redux/apiCalls/authApiCall";
import { register, selectInfo } from "../Redux/reducer";
import axios from "axios";
import { getProfileApi } from "../Redux/apiCalls/profileApiCalls";

function Login() {
  const dispatch = useDispatch();
  const [LgInoOrSignIn, setLgInoOrSignIn] = useState(true);
  const { user } = useSelector(selectInfo);
  const [Email, SetEmail] = useState("");
  const [Password, SetPassword] = useState("");
  const [EmailPhone, SetEmailPhone] = useState("");
  const [PasswordPhone, SetPasswordPhone] = useState("");
  const [loading, setLoading] = useState(false); // State to track loading status
  const handelLgInoOrSignIn = () => {
    setLgInoOrSignIn(!LgInoOrSignIn);
  };

  const handleEmailChange = (event) => {
    SetEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    SetPassword(event.target.value);
  };
  const login = async (Email, Password) => {
    try {
      // Set loading to true when logout process starts

      setLoading(true); // Set loading to true when logout process starts
      await dispatch(loginUser(Email, Password));
      setLoading(false); // Set loading to false when logout process ends
    } catch (error) {
      console.log("somthing went wrong ", error);
      setLoading(true);
      await Swal.fire({
        icon: "error",
        title: "Login Failed",
        showConfirmButton: false,
        timer: 1500,
      });
      setLoading(true); // Set loading to true when logout process starts
    }
  };
  const Register = (user) => {
    try {
      // Set loading to true when logout process starts

      dispatch(registerUser(user));

      // setLgInoOrSignIn(!LgInoOrSignIn);
    } catch (error) {
      console.log("somthing went wrong ", error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        showConfirmButton: false,
        timer: 1500,
      });
      setLoading(false);
    } finally {
      setLoading(false); // Set loading to false when logout process ends
    }
  };
  const nav = useNavigate();
  const check = async () => {
    if (user) {
      nav("/");
    }
  };
  useEffect(() => {
    check();
  }, [user]);
  useEffect(() => {
    SetEmail("");
    SetPassword("");
  }, []);

  return (
    <div className="w-xl  ">
      {/* disktop version */}
      <div className="h-screen flex max-md:hidden">
        <div
          className={`${
            LgInoOrSignIn ? "w-[60%] " : "w-[40%]  "
          } bg-white flex  justify-center items-center duration-500 `}
        >
          {LgInoOrSignIn ? (
            <div className="w-[500px]">
              <div className="w-96 h-40 text-black text-6xl font-bold font-['Outfit']">
                Welcome Back !
              </div>

              <div className="w-fit h-7 text-black text-2xl font-light font-['Outfit'] ">
                Email Address
              </div>
              <input
                onChange={handleEmailChange}
                name="Email"
                type="email"
                className="w-[500px] h-14 mt-3 pl-5  bg-stone-200 rounded-md focus:outline-none text-black"
              />

              <div className="w-fit h-7 text-black text-2xl font-light font-['Outfit'] ">
                Password
              </div>

              <input
                onChange={handlePasswordChange}
                name="Password"
                type="Password"
                className="w-[500px] h-14 my-3  pl-5  bg-stone-200 rounded-md focus:outline-none "
              />
              <div className="flex justify-between items-center mt-10">
                {/* <div className="flex justify-around w-[50%]  ">
                  <img className="w-10 h-15 cursor-pointer  " src={google} />
                  <img className="w-10 h-15 cursor-pointer " src={apple} />
                  <img className="w-10 h-15 cursor-pointer" src={facebook} />
                </div> */}
                <div>
                  <button
                    onClick={() => {
                      login(Email, Password);
                    }}
                    className="w-40 h-12 cursor-pointer bg-black rounded-md flex justify-center items-center hover:bg-gray-900 active:bg-gray-900"
                  >
                    <div className="text-white text-2xl font-medium font-['Outfit']">
                      {loading ? (
                        <button
                          disabled
                          type="button"
                          className="text-white  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
                        >
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
                          Loading...
                        </button>
                      ) : (
                        "Login"
                      )}
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="text-black  mb-10 text-6xl font-bold font-['Outfit']">
                login
              </div>
              <div
                className=" px-10 group relative"
                onClick={handelLgInoOrSignIn}
              >
                <div className="w-28 h-28 bg-black rounded-3xl blur-3xl absolute top-6 opacity-0 group-hover:opacity-100 duration-200 ease  left-12 " />
                <div className="flex justify-center items-center relative cursor-pointer ">
                  <img
                    src={rowRightBlack}
                    className="w-16 h-16 absolute top-12  "
                  />
                  <div className="w-20 h-20 mt-10 bg-black rounded-3xl  "></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div
          className={`${
            LgInoOrSignIn ? "w-[40%] " : "w-[60%]"
          }  bg-black  flex  justify-center items-center duration-500  `}
        >
          {LgInoOrSignIn ? (
            <div className=" duration-500 cursor-pointer ">
              <div className="text-white  mb-10 text-6xl font-bold font-['Outfit']">
                Register
              </div>
              <div className=" group relative" onClick={handelLgInoOrSignIn}>
                <div className="w-24 h-24 bg-white rounded-3xl blur-3xl absolute top-6 opacity-0 group-hover:opacity-100 duration-200 ease  left-12 " />
                <div className="flex justify-center items-center relative cursor-pointer ">
                  <img src={rowRight} className="w-16 h-16 absolute top-12  " />
                  <div className="w-20 h-20 mt-10 bg-white rounded-3xl  "></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-[500px] duration-500 ">
              {/* <div className="w-72 text-white text-6xl font-bold font-['Outfit']">
                Welcome
              </div> */}
              <Formik
                initialValues={{
                  FirstName: "",
                  LastName: "",
                  Email: "",
                  Telephone: "",
                  Password: "",
                  Gender: "",
                  Age: 0,
                  Address: "",
                }}
                onSubmit={async (values) => {
                  // Handle form submission here
                  Register({ ...values, Age: parseInt(values.Age) });
                }}
                // validationSchema={validationSchema}
              >
                {({ handleSubmit }) => (
                  <Form onSubmit={handleSubmit} className="px-5">
                    <div className="flex justify-between items-center w-[90%] ">
                      <div className="w-[45%] ">
                        <div className=" w-full  text-white text-xl font-light font-['Outfit']">
                          First Name
                        </div>
                        <Field
                          type="text"
                          name="FirstName"
                          className=" w-full h-12 mt-1 pl-5 bg-stone-600 rounded-md focus:outline-none text-white"
                          required
                        />
                        <ErrorMessage
                          name="FirstName"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      <div className="w-[45%] ">
                        <div className="w-50 h-7 text-white text-xl font-light font-['Outfit']">
                          Family Name
                        </div>
                        <Field
                          type="text"
                          name="LastName"
                          className=" w-full h-12 mt-1 pl-5 bg-stone-600 rounded-md focus:outline-none text-white"
                        />
                        <ErrorMessage
                          name="LastName"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                    </div>
                    <div className="my-1 w-[90%] ">
                      <div className="w-fit h-7 text-white text-xl font-light font-['Outfit'] ">
                        Email Address
                      </div>
                      <Field
                        type="Email"
                        name="Email"
                        className=" w-[100%] h-12 mt-1 pl-5 bg-stone-600 rounded-md focus:outline-none text-white"
                        required
                      />
                      <ErrorMessage
                        name="Email"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                    <div className="my-1 w-[90%]">
                      <div className="w-fit h-7 text-white text-xl font-light font-['Outfit'] ">
                        Number Telephone
                      </div>
                      <Field
                        type="tel"
                        name="Telephone"
                        className="w-full h-12 mt-1 pl-5 bg-stone-600 rounded-md focus:outline-none text-white"
                        required
                      />
                      <ErrorMessage
                        name="Telephone"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                    <div className="my-1 w-[90%]">
                      <div className="w-fit h-7 text-white text-xl font-light font-['Outfit'] ">
                        Address
                      </div>
                      <Field
                        type="Address"
                        name="Address"
                        className="w-full  h-12 mt-1 pl-5 bg-stone-600 rounded-md focus:outline-none text-white"
                        required
                      />
                      <ErrorMessage
                        name="Address"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                    <div className="my-1 w-[90%] ">
                      <div className="w-fit h-7 text-white text-xl font-light font-['Outfit'] ">
                        Password
                      </div>
                      <Field
                        type="Password"
                        name="Password"
                        className="w-full  h-14 mt-1 pl-5 bg-stone-600 rounded-md focus:outline-none text-white"
                        required
                      />
                      <ErrorMessage
                        name="Password"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                    <div className="flex justify-between items-center w-[90%] ">
                      <div>
                        <div className="w-50 text-white text-xl font-light font-['Outfit']">
                          Gender
                        </div>
                        <Field
                          as="select"
                          name="Gender"
                          className="w-56 h-12 mt-1 pl-5 bg-stone-600 rounded-md focus:outline-none text-white"
                          required
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          {/* Add more options as needed */}
                        </Field>
                        <ErrorMessage
                          name="Gender"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="w-50 h-7 text-white text-xl font-light font-['Outfit']">
                          Age
                        </div>
                        <Field
                          type="text"
                          name="Age"
                          className="w-full  h-12 mt-1 pl-5 bg-stone-600 rounded-md focus:outline-none text-white"
                          required
                        />
                        <ErrorMessage
                          name="Age"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-5 ">
                      <div className="w-[90%]">
                        <button
                          type="submit"
                          className="w-full h-14 bg-white rounded-md flex justify-center items-center hover:bg-gray-400 active:bg-gray-400"
                        >
                          <div className="text-black text-2xl font-medium font-['Outfit']">
                            Register
                          </div>
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          )}
        </div>
      </div>
      {/* Mobile version */}
      {LgInoOrSignIn ? (
        <div className=" md:hidden flex flex-col  px-5 py-10 mx-auto w-full text-xs h-fit min-h-screen text-white bg-black">
          <div className="self-center text-2xl font-bold whitespace-nowrap">
            SIGN IN
          </div>
          <div className="self-center mt-5 text-xl font-bold whitespace-nowrap">
            Welcome Back
          </div>
          <div>Email Address</div>

          <input
            placeholder="username@domain.com"
            type="email"
            onChange={(event) => {
              SetEmailPhone(event.target.value);
            }}
            className="justify-center items-start py-5 pr-16 pl-7 mt-3.5 whitespace-nowrap rounded-md bg-neutral-800 placeholder:text-zinc-600"
          />
          <div className="self-start mt-5 ml-4">Password</div>
          <input
            type="password"
            onChange={(event) => {
              SetPasswordPhone(event.target.value);
            }}
            placeholder="Password"
            className="justify-center items-start py-5 pr-16 pl-7 mt-3.5 whitespace-nowrap rounded-md bg-neutral-800 placeholder:text-zinc-600"
          />
          <div className="flex gap-5 justify-between mt-5 w-full text-zinc-600">
            <div className="flex gap-1 justify-between whitespace-nowrap">
              <input
                type="radio"
                className="w-3.5 h-3.5   bg-white rounded-2xl"
              />
              <div className="grow my-auto">Remember me</div>
            </div>
            <div className="hover:text-white">Forget password ?</div>
          </div>
          <div
            onClick={() => {
              login(EmailPhone, PasswordPhone);
              // console.log();
            }}
            className="items-center font-bold text-center  py-3  mt-5 text-2xl text-black whitespace-nowrap bg-white rounded-xl"
          >
            {loading ? "Login..." : "Login"}
          </div>
          <div
            onClick={handelLgInoOrSignIn}
            className="text-whte text-center py-4 text-lg "
          >
            <span className="text-zinc-600"> create account </span> Sign up
          </div>
          <div className="self-center mt-5  text-2xl">OR</div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5aca49bc879df62ec5acba3cbe8690244a4e05e4f57927c2750477ca8b9d63a2?"
            className="self-center mt-10 max-w-full aspect-[4.35] w-[142px]"
          />
        </div>
      ) : (
        // <div className="flex flex-col md:hidden  text-white min-h-screen h-fit px-7 py-5 mx-auto w-full text-xs bg-black max-w-[480px]">
        //   <div className="self-center text-2xl font-bold whitespace-nowrap">
        //     Sign up
        //   </div>
        //   <div className="self-center  text-sm font-bold whitespace-nowrap">
        //     Welcome
        //   </div>
        //   <div className="flex gap-5 justify-between py-0.5 mt-5 whitespace-nowrap">
        //     <div className="flex w-[45%] flex-col flex-1">
        //       <div className="self-start ml-4 text-white">First Name</div>

        //       <input
        //         placeholder="salah"
        //         className="justify-center text-white items-start py-5 pr-16 pl-7 mt-3.5 rounded-md bg-neutral-800  placeholder:text-zinc-600"
        //       />
        //     </div>
        //     <div className="flex w-[45%] flex-col flex-1">
        //       <div className="self-start ml-4 text-white">Family Name</div>
        //       <input
        //         placeholder="salah"
        //         className="justify-center text-white items-start py-5 pr-16 pl-7 mt-3.5 rounded-md bg-neutral-800  placeholder:text-zinc-600"
        //       />
        //     </div>
        //   </div>
        //   <div className="text-white mt-2">Email Address</div>

        //   <input
        //     placeholder="username@domain.com"
        //     className="justify-center items-start py-5 pr-16 pl-7 mt-3.5 whitespace-nowrap rounded-md bg-neutral-800 placeholder:text-zinc-600"
        //   />
        //   <div className="self-start mt-2 ml- text-white">Password</div>
        //   <input
        //     placeholder="Password"
        //     className="justify-center items-start py-5 pr-16 pl-7 mt-3.5 whitespace-nowrap rounded-md bg-neutral-800 placeholder:text-zinc-600"
        //   />
        //   <div className="self-start mt-2 ml- text-white">Confirm Password</div>
        //   <input
        //     placeholder="Password"
        //     className="justify-center items-start py-5 pr-16 pl-7 mt-3.5 whitespace-nowrap rounded-md bg-neutral-800 placeholder:text-zinc-600"
        //   />
        //   <div className="items-center font-bold text-center  py-3  mt-5 text-2xl text-black whitespace-nowrap bg-white rounded-xl">
        //     Sign Up
        //   </div>
        //   <div
        //     onClick={handelLgInoOrSignIn}
        //     className="text-whte text-center py-4 text-lg  "
        //   >
        //     <span className="text-zinc-600"> You have account </span> Login
        //   </div>
        //   <div className="self-center mt-5 text-2xl text-white">OR</div>
        //   <img
        //     loading="lazy"
        //     src="https://cdn.builder.io/api/v1/image/assets/TEMP/5aca49bc879df62ec5acba3cbe8690244a4e05e4f57927c2750477ca8b9d63a2?"
        //     className="self-center mt-5 max-w-full aspect-[4.35] w-[142px]"
        //   />
        // </div>
        <div className="flex flex-col md:hidden  text-white min-h-screen h-fit px-1 py-5  text-xs bg-black w-full">
          <div className="self-center text-3xl font-bold whitespace-nowrap">
            Sign up
          </div>

          <div className="self-center text-3xl mb-2 font-bold whitespace-nowrap">
            Welcome
          </div>
          <Formik
            initialValues={{
              FirstName: "",
              LastName: "",
              Email: "",
              Telephone: "",
              Password: "",
              Gender: "",
              Age: 0,
              Address: "",
            }}
            onSubmit={async (values) => {
              // Handle form submission here
              Register({ ...values, Age: parseInt(values.Age) });
            }}
            // validationSchema={validationSchema}
          >
            {({ handleSubmit }) => (
              <Form
                onSubmit={handleSubmit}
                className="mx-auto flex flex-col w-full justify-center items-center"
              >
                <div className="flex justify-between items-center w-[90%] ">
                  <div className="w-[45%] ">
                    <div className=" w-full  text-white text-xl font-light font-['Outfit']">
                      First Name
                    </div>
                    <Field
                      type="text"
                      name="FirstName"
                      className=" w-full h-12 mt-1 pl-5 bg-stone-600 rounded-md focus:outline-none text-white"
                      required
                    />
                    <ErrorMessage
                      name="FirstName"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div className="w-[45%] ">
                    <div className="w-50 h-7 text-white text-xl font-light font-['Outfit']">
                      Family Name
                    </div>
                    <Field
                      type="text"
                      name="LastName"
                      className=" w-full h-12 mt-1 pl-5 bg-stone-600 rounded-md focus:outline-none text-white"
                    />
                    <ErrorMessage
                      name="LastName"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                </div>
                <div className="my-1 w-[90%] ">
                  <div className="w-fit h-7 text-white text-xl font-light font-['Outfit'] ">
                    Email Address
                  </div>
                  <Field
                    type="Email"
                    name="Email"
                    className=" w-[100%] h-12 mt-1 pl-5 bg-stone-600 rounded-md focus:outline-none text-white"
                    required
                  />
                  <ErrorMessage
                    name="Email"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="my-1 w-[90%]">
                  <div className="w-fit h-7 text-white text-xl font-light font-['Outfit'] ">
                    Number Telephone
                  </div>
                  <Field
                    type="tel"
                    name="Telephone"
                    className="w-full h-12 mt-1 pl-5 bg-stone-600 rounded-md focus:outline-none text-white"
                    required
                  />
                  <ErrorMessage
                    name="Telephone"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="my-1 w-[90%]">
                  <div className="w-fit h-7 text-white text-xl font-light font-['Outfit'] ">
                    Address
                  </div>
                  <Field
                    type="Address"
                    name="Address"
                    className="w-full  h-12 mt-1 pl-5 bg-stone-600 rounded-md focus:outline-none text-white"
                    required
                  />
                  <ErrorMessage
                    name="Address"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="my-1 w-[90%] ">
                  <div className="w-fit h-7 text-white text-xl font-light font-['Outfit'] ">
                    Password
                  </div>
                  <Field
                    type="Password"
                    name="Password"
                    className="w-full  h-14 mt-1 pl-5 bg-stone-600 rounded-md focus:outline-none text-white"
                    required
                  />
                  <ErrorMessage
                    name="Password"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="flex justify-between items-center w-[90%] ">
                  <div className="min-w-[50%]">
                    <div className="w-[50%] text-white text-xl font-light font-['Outfit']">
                      Gender
                    </div>
                    <Field
                      as="select"
                      name="Gender"
                      className="w-[100%] h-12 mt-1 pl-5 bg-stone-600 rounded-md focus:outline-none text-white"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      {/* Add more options as needed */}
                    </Field>
                    <ErrorMessage
                      name="Gender"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div className="ml-4">
                    <div className="w-50 h-7 text-white text-xl font-light font-['Outfit']">
                      Age
                    </div>
                    <Field
                      type="text"
                      name="Age"
                      className="w-full  h-12 mt-1 pl-5 bg-stone-600 rounded-md focus:outline-none text-white"
                      required
                    />
                    <ErrorMessage
                      name="Age"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center mt-5 ">
                  <div className="w-[90%]">
                    <button
                      type="submit"
                      className="w-full h-14 bg-white rounded-md flex justify-center items-center hover:bg-gray-400 active:bg-gray-400"
                    >
                      <div className="text-black text-2xl font-medium font-['Outfit']">
                        Register
                      </div>
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
}

export default Login;
