import React, { useState } from "react"
import Logo from "../../assets/resetpassword.svg"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router";
function UpdatePassword() {
    const [token,setToken] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate();
    const handelUpdatePassword = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("token", token);
        formData.append("password", password);
        try {
            const url = "https://backend.cntic-club.com/api/password-reset-verification/";
            const response = await axios.post(url, formData).then((res) => res.data);
            console.log(response);
            toast.success("Password Updated Successfully.", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                onClose: () => navigate("/login")
            });
        } catch (error) {
            toast.error("Something wrong check the code or your email.", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
        }
    }
  return (
   <>
   <div className="parent flex justify-evenly items-center">
    <div>
    <div href="#" className="hidden items-center mb-6 text-2xl font-semibold md:flex text-gray-900  flex-col">
        <img className="w-[400px] h-[350px] m-auto" src={Logo} alt="logo" />
        <h1 className="text-3xl relative text-primaryColor ">
             Reset Password
            <span className='w-[40px] h-[3px] absolute top-[-.43rem] right-[-.43rem]  bg-primaryColor'></span>
    <span className='w-[3px] h-[30px] absolute top-[-.43rem] right-[-.43rem] bg-primaryColor'></span>

    <span className='w-[40px] h-[3px] absolute bottom-[-.43rem] left-[-.43rem] bg-primaryColor'></span>
    <span className='w-[3px] h-[30px] absolute bottom-[-.43rem] left-[-.43rem] bg-primaryColor'></span></h1>
      </div>
    </div>
   <section className="w-[100%] md:w-[50%] z-[11] -translate-x-[50%] -translate-y-[50%] absolute top-[50%] left-[50%] md:relative md:left-0 md:top-0 md:translate-x-0 md:translate-y-0">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  ">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 relative">
    <span className='w-[40px] h-[4px] absolute top-[-.43rem] right-[-.43rem] bg-primaryColor'></span>
    <span className='w-[4px] h-[30px] absolute top-[-1.4rem] md:top-[-1.7rem] right-[-.43rem] bg-primaryColor'></span>
    <span className='w-[40px] h-[4px] absolute bottom-[-.43rem] left-[-.43rem] bg-primaryColor'></span>
    <span className='w-[4px] h-[30px] absolute bottom-[-.43rem] left-[-.43rem] bg-primaryColor'></span>
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-600 md:text-3xl text-center ">
           Code
           <img className="w-[200px] h-[150px] md:hidden m-auto mt-8" src={Logo} alt="logo" />
          </h1>
          <form className="space-y-4 md:space-y-6" action="#" onSubmit={handelUpdatePassword}>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">code</label>
              <input 
                type="text"
                name="token"
                id="token"
                className="bg-gray-50 border mb-5 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   dark:placeholder-gray-400   dark:focus:border-blue-500"
                placeholder="code..."
                required
                onChange={(e) => setToken(e.target.value)}
              />
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">new password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   dark:placeholder-gray-400   dark:focus:border-blue-500"
                placeholder="new Password..."
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full cursor-pointer  bg-primaryColor hover:bg-primary-700  focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 bg-blue-600 text-white "
            >
              Reset
            </button>
            
          </form>
        </div>
      </div>
    </div>
  </section>
   </div>
  <div className="w-[120px] h-[120px] rounded-br-full bg-primaryColor left-0 top-0 absolute "></div>
  <div className="w-[150px] h-[150px] rounded-tl-full bg-primaryColor right-0 bottom-0 absolute "></div>
  <ToastContainer />
   </>
  )
}

export default UpdatePassword
