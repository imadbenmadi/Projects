import React, { useEffect, useState } from "react";
import { BsFillExclamationSquareFill } from "react-icons/bs";
import { VscThreeBars } from "react-icons/vsc";
import BtnLogin from "../homeComponenets/BtnLogin";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../dashboard/redux/Reducers";
import { useCookies } from "react-cookie";
import { useGetUser } from "../../hooks/useGetUser";
function Navbar() {
  const {Profile} = useGetUser()
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);
  const [popup, setPopup] = useState(false);
  const [cookies, setCookies] = useCookies(["access_token"])
  const location = useLocation();
  const isLinkActive = (url) => location.pathname === url;
  const isAuthenticated = useSelector(({ show_and_hide_aside: { authenticated } }) => authenticated);
  const isAdmin = useSelector(({ show_and_hide_aside: { authenticated, user } }) => {
    if (authenticated && user && user.groups && user.groups.length > 0) {
      return user.groups[0] === "Admin";
    }
    return false;
  });
  const Logout = () => {
    setCookies('access_token', null)
    dispatch(logout());
  };

  useEffect(() => {
    if (cookies.access_token) {
      if(isAdmin) {
        navigate('/dashboard')
      }else {
        <Navigate to={'/'} state={{prevUrl: location.pathname}}/>
      }
      dispatch(login())
    }
  }, [isAdmin]);
  
  const Links = [
    {
      url: '/',
      link: 'Home'
    },
    {
      url: '/ClientPosts',
      link: 'Posts'
    },
    {
      url: '/Blogs',
      link: 'Blog'
    },
    {
      url: '/Events',
      link: 'Events'
    },
    {
      url: '/Contact',
      link: 'Contact Us'
    }
  ]

  useEffect(() => {
    const handleScroll = () => {
      // You can adjust the threshold value based on your needs
      const threshold = 100; // Adjust this value according to your design
      // Check if the user has scrolled more than the threshold
      if (window.scrollY > threshold) {
        setPopup(false)
      }
    };

    // Attach the event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [dispatch])
  const classes = `fixed left-0 top-0 bg-white w-[100%] h-full z-[111] flex justify-center items-center flex-col md:relative duration-300 md:bg-bodyBg md:flex-row ${show ? "left-[-100%]" : ""
    } md:left-0`;
  return (
    isAuthenticated ? (
      <div>
        <div className="w-full flex justify-between items-center  fixed bg-[#e9e9e9] top-0 left-0 shadow-xl z-20 px-2 md:px-10 py-2">
          <div className="w-[65px] h-[65px] rounded-bl-full bg-primaryColor right-[-1rem] top-0 fixed md:hidden z-10"></div >
          <Link
            to="/"
            className="text-gray-600 font-semibold text-2xl font-Playpen  flex justify-center items-center"
          >
            <strong className="text-5xl font-bold text-primaryColor">C</strong>
            NTIC
          </Link>
          {/* LINKS  */}
          <div className={classes}>
            <BsFillExclamationSquareFill
              size={25}
              color="white"
              className="absolute right-[1rem] bottom-[2rem] z-[11] cursor-pointer md:hidden"
            // style={{ position: "fixed" }}
            />
            <div className="w-[120px] h-[120px] rounded-br-full bg-primaryColor left-0 top-0 absolute md:hidden"></div>
            <div className="w-[150px] h-[150px] rounded-tl-full bg-primaryColor right-0 bottom-0 absolute md:hidden"></div>
            <button
              className="text-lg absolute right-[1em] top-[1rem] bg-primaryColor font-bold text-white px-2 rounded-tl-lg rounded-br-lg md:hidden"
              onClick={() => {
                setShow(true);
                document.body.classList.remove("overflow-hidden");
              }}
            >
              X
            </button>
            <ul className="flex justify-center items-center gap-10 flex-col w-full mb-8 font-bold text-lg text-gray-600 md:flex-row md:mb-0">
              {Links.map((link, index) => (
                <Link to={link.url} key={index}
                  className={`hover:text-primaryColor cursor-pointer ${isLinkActive(link.url) ? 'text-primaryColor' : ''}`}              >
                  {link.link}
                </Link>
              ))}
            </ul>
            {/* buttons and profile */}
            <div className="flex justify-center items-center flex-col md:flex-row gap-5 relative">
              {isAuthenticated && (
                <div onClick={() => setPopup(!popup)} className="w-14 h-14 cursor-pointer">
                <img src={`https://backend.cntic-club.com`+Profile.picture} alt="Profile" className="rounded-full w-full h-full"/>
                </div>
                )}
              {popup && (
                <div className="flex justify-center items-center border border-black border-solid border-opacity-5 gap-4 flex-col absolute top-20 right-0 bg-white shadow-2xl rounded-lg py-5 px-10">
                  <div className="absolute w-screen h-screen cursor-pointer z-[-1]" onClick={() => setPopup(false)}></div>
                  <Link to='/Profile' onClick={() => setPopup(false)}>
                    <p className="hover:text-primaryColor hover:scale-105 cursor-pointe transition-all duration-500 text-[20px]">Profile</p>
                  </Link>
                  <Link to='/' onClick={Logout}>
                    <p className="hover:text-primaryColor hover:scale-105 cursor-pointe transition-all duration-500 text-[20px]">Logout</p>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <VscThreeBars
            size={30}
            color="white"
            className="fixed right-1 top-3 cursor-pointer z-[11] md:hidden"
            onClick={() => {
              setShow(false);
              document.body.classList.add("overflow-hidden");
            }}
          />
        </div >
      </div >
    ) : (
      <div>
        <div className="w-full flex justify-between items-center  fixed bg-[#e9e9e9] top-0 left-0 shadow-xl z-20 px-2 md:px-10 py-2">
          <div className="w-[65px] h-[65px] rounded-bl-full bg-primaryColor right-[-1rem] top-0 fixed md:hidden z-10"></div >
          <Link
            to="/"
            className="text-gray-600 font-semibold text-2xl font-Playpen  flex justify-center items-center"
          >
            <strong className="text-5xl font-bold text-primaryColor">C</strong>
            NTIC
          </Link>
          {/* LINKS  */}
          <div className={classes}>
            <BsFillExclamationSquareFill
              size={25}
              color="white"
              className="absolute right-[1rem] bottom-[2rem] z-[11] cursor-pointer md:hidden"
            // style={{ position: "fixed" }}
            />
            <div className="w-[120px] h-[120px] rounded-br-full bg-primaryColor left-0 top-0 absolute md:hidden"></div>
            <div className="w-[150px] h-[150px] rounded-tl-full bg-primaryColor right-0 bottom-0 absolute md:hidden"></div>
            <button
              className="text-lg absolute right-[1em] top-[1rem] bg-primaryColor font-bold text-white px-2 rounded-tl-lg rounded-br-lg md:hidden"
              onClick={() => {
                setShow(true);
                document.body.classList.remove("overflow-hidden");
              }}
            >
              X
            </button>
            <ul className="flex justify-center items-center gap-10 flex-col w-full mb-8 font-bold text-lg text-gray-600 md:flex-row md:mb-0">
              {Links.map((link, index) => (
                <Link to={link.url} key={index}
                  className={`hover:text-primaryColor cursor-pointer ${isLinkActive(link.url) ? 'text-primaryColor' : ''}`}              >
                  {link.link}
                </Link>
              ))}
            </ul>
            {/* buttons and profile */}
            <div className="flex justify-center items-center gap-5">

              <Link to="/Login" className="flex items-center gap-6 flex-col w-full md:flex-row md:w-fit">
                <BtnLogin content="Login" />
              </Link>
              <Link to='/SignUp'>
                <BtnLogin content="SignUp" />
              </Link>
            </div>
          </div>
          <VscThreeBars
            size={30}
            color="white"
            className="fixed right-1 top-3 cursor-pointer z-[11] md:hidden"
            onClick={() => {
              setShow(false);
              document.body.classList.add("overflow-hidden");
            }}
          />
        </div >
      </div >
    )
  );
}

export default Navbar;
