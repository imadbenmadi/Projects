import React, { useEffect, useState } from "react";
import { BiLike, BiDislike, BiComment } from "react-icons/bi";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "./event.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useGetUser } from "../../hooks/useGetUser";
import { IoMdSend } from "react-icons/io";
import { useGetToken } from "../../hooks/useGetToken";
import PostComment from "./PostComment";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function PostsElement({Post,handleRefresh}) {
  const {Profile} = useGetUser();
  const {headers} = useGetToken()
  const isAuthenticated = useSelector(({ show_and_hide_aside: { authenticated } }) => authenticated);
  const navigate = useNavigate();
  const userPicture = "https://backend.cntic-club.com"+ Profile.picture
  const [CommentCounter, SetCommentCounter] = useState([Post.comments]);
  const [LikeCounter, SetLikeCounter] = useState([Post.likers]);
  const [Comment, setComment] = useState([]);
  const [DisLikeCounter, SetDisLikeCounter] = useState([Post.dislikers]);
  const [inputComment, setInputComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isComment, setIsComment] = useState(false);
  const [images, setImages] = useState([Post.image]);
  const [text, setText] = useState(Post.content);
  const timestamp = Post.created_time;
  const date = new Date(timestamp);
  const [refresh, setRefresh] = useState(false);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  //TODO: Create the add comment function and the like and dislike functions
  const addLike = async () => {
    if(isAuthenticated) {
      try {
        const response = await fetch(
          `https://backend.cntic-club.com/api/posts/Like_Post/${Post.id}/`,
          {
            method: "POST",
            headers: {
              ...headers,
            },
          }
        );
        
        if (!response.ok) {
          throw new Error('Failed to like the post.');
        }
    
        const data = await response.json();
        handleRefresh();
      } catch (error) {
        console.error("Error:", error.message);
      }
    }else {
      toast.error("You need to login first", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        onClose: () => navigate('/login')
      });
    }
  };
  //TODO: Create the add dislike function
  const addDislike = async () => {
    if(isAuthenticated) {
    try {
      const response = await fetch(
        `https://backend.cntic-club.com/api/posts/dislike_Post/${Post.id}/`,
        {
          method: "POST",
          headers: {
            ...headers,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to dislike the post.');
      }

      const data = await response.json();
      handleRefresh();
    } catch (error) {
      console.error("Error:", error.message);
    }
  }else {
    toast.error("You need to login first", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      onClose: () => navigate('/login')
    });
  }
  };
  //TODO: Create the add comment function
  const addComment = async () => {
    const formData = new FormData();
    formData.append("content", inputComment);
    if(isAuthenticated) {
    try {
      const response = await fetch(
        `https://backend.cntic-club.com/api/posts/comment/${Post.id}/`,
        {
          method: "POST",
          headers: {
            ...headers,
          },
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error('Failed to comment the post.');
      }
      const data = await response.json();
      setInputComment(""); // Clear input field after successfully adding comment
      handleRefresh();
    } catch (error) {
      console.error("Error:", error.message);
    }
  }else {
    toast.error("You need to login first", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      onClose: () => navigate('/login')
    });
  }
  };
  //TODO: Create the add like to a comment function
  const addLikeToComment = async () => {
    try {
      const response = await fetch(
        `https://backend.cntic-club.com/api/posts/Like_Comment/${Post.comments.id}/`,
        {
          method: "POST",
          headers: {
            ...headers,
          },
        }
      );
      if (!response.ok) {
        throw new Error('Failed to like the comment.');
      }
      const data = await response.json();
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  //TODO: Create the add dislike to a comment function
  const handleLikeClick = () => {
    if(isLiked) {
      SetLikeCounter((prevCounter) => prevCounter - 1);
      setIsLiked(false);
    }else {
      SetLikeCounter((prevCounter) => prevCounter + 1);
      setIsLiked(true);
      setIsDisliked(false);
    }
  };

  const handleDislikeClick = () => {
    if(isDisliked) {
      SetDisLikeCounter((prevCounter) => prevCounter - 1);
      setIsDisliked(false);
    }else {
      SetDisLikeCounter((prevCounter) => prevCounter + 1);
      setIsDisliked(true);
      setIsLiked(false);
    }
  };
  const [showMore, setShowMore] = useState(false);
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  //TODO : Create the get comments function
  const getComments = async () => {
    try {
      const response = await fetch(
        `https://backend.cntic-club.com/api/posts/get_comment_by_post_id/${Post.id}/`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error('Failed to get the comments.');
      }
      const data = await response.json();
      setComment(data);
      handleRefresh();
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  useEffect(() => {
    getComments();
  }
  , []);
  useEffect(() => {
    if (refresh) {
      getComments();
      setRefresh(false);
    }
  }, [refresh]);
  useEffect(() => {
    if (Post.likers.includes(Profile.user)) {
      setIsLiked(true);
    }else if(Post.dislikers.includes(Profile.user)){
      setIsDisliked(true);
    }
  }, [Post, Profile]);
  return (
    <div className="duration-500 transition-all ease-in mt-10 w-[80%] max-md:w-full flex justify-center items-center">
      <div className="h-fit relative text-[#3f3f3f] font-bold w-[90%] p-4">
        <div className="flex justify-between items-center mb-1">
          <img src="../../public/logo.png" alt="" className=" w-[3.3rem]" />
          <div className="text-gray-400 text-lg">{formattedDate}</div>
        </div>
        <hr className=" border-gray-300 border-[1.5px] mb-4" />
        <div>
          {showMore ? (
            <span
              className="inline text-[14px] md:text-[16px]"
              dangerouslySetInnerHTML={{ __html: text }}
            />
          ) : (
            <span
              className="inline text-[14px] md:text-[16px]"
              dangerouslySetInnerHTML={{
                __html: text.slice(0, 150),
              }}
            />
          )}
          {text.length  && (
            <span
              className="text-primaryColor cursor-pointer text-[12px] md:text-[16px]"
              onClick={toggleShowMore}
            >
              {showMore ? " Read Less" : "...Read More"}
            </span>
          )}
        </div>
          {images.map((image, index) => (
              <img className="my-5 mx-auto" src={'https://backend.cntic-club.com'+Post.image} alt={`Slide ${index}`} key={index}/>
          ))}
        <div className="flex justify-around items-center select-none">
          <div
            className="text-gray-400 cursor-pointer"
            onClick={handleLikeClick}
          >
            <BiLike
              onClick={addLike}
              className={`text-2xl ${
                isLiked ? "text-primaryColor" : "text-gray-400"
              }`}
            />
            <span
              className={`text-[14px] flex justify-center items-center ${
                isLiked ? "text-primaryColor" : "text-gray-400"
              }`}
            >
              {Post.likers.length === 0 ? 0 : Post.likers.length}
            </span>
          </div>
          <div className=" text-gray-400 cursor-pointer">
            <BiComment
              onClick={() => {
                setIsComment(!isComment);
              }}
              className={`text-2xl 
             ${isComment ? "text-primaryColor" : "text-gray-400"}
              `}
            />
            <span
              className={`text-[14px] flex justify-center items-center ${isComment ? "text-primaryColor" : "text-gray-400"}`}
            >
              {Post.comments.length === 0 ? 0 : Post.comments.length}
            </span>
          </div>
          <div
            className="text-gray-400 cursor-pointer flex justify-center items-center flex-col"
            onClick={handleDislikeClick}
          >
            <BiDislike
              onClick={addDislike}
              className={`text-2xl ${
                isDisliked ? "text-primaryColor" : "text-gray-400"
              }`}
            />
            <span
              className={`text-[14px] ${
                isDisliked ? "text-primaryColor" : "text-gray-400"
              }`}
            >
              {Post.dislikers.length === 0 ? 0 : Post.dislikers.length}
            </span>
          </div>
        </div>
        <h2 className="text-gray-400 text-xl font-bold">Comments</h2>
        <div className="overflow-scroll h-20">
        {Comment.length > 0 ? (
          Comment.map((comment, index) => (
            <PostComment
              key={index}
              comment={comment}
              handleRefresh={handleRefresh}
            />
          ))
        ) : (
          <div className="text-black text-lg text-center">No Comments Yet</div>
        )}
          </div>
        <div
          className={`comments-section ${
            isComment ? "comments-section-visible" : ""
          }`}
        >
          {isComment ? (
            <div>
            </div>
          ) : (
            ""
          )}
        </div>
        {isAuthenticated ? (
          <div className="flex justify-start items-center gap-5">
          <img src={userPicture} alt="" className="w-12 h-12 rounded-full" />
          <input
          type="text"
            placeholder="your comment ..."
            className="h-fit resize-none  bg-[#E0E0E0] w-[80%] text-neutral-500 text-xl font-medium font-['Ubuntu'] leading-tight outline-none flex p-3 rounded-sm"
            onChange={(e) => {
              setInputComment(e.target.value);
            }}
          />
          <IoMdSend size={40} color="#0044AA" className="cursor-pointer" 
          onClick={addComment}/>
        </div>
        ) : (
          <></>
        )}
        <span className="w-[30%] h-[4px] absolute -top-2 -right-2 bg-primaryColor"></span>
        <span className="w-[4px] h-[40%] absolute -top-2 -right-2 bg-primaryColor"></span>
        <span className="w-[40%] h-[4px] absolute -bottom-2 -left-2 bg-primaryColor"></span>
        <span className="w-[4px] h-[30%] absolute -bottom-2 -left-2 bg-primaryColor"></span>
      </div>
      <ToastContainer />
    </div>
  );
}