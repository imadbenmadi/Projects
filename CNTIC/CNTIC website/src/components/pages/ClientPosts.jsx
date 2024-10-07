import React, { useEffect, useState } from "react";
import PostsElement from "../PostsComponents/PostsElement";
import Header from "../PublicComponents/Header";
export default function ClientPosts() {
    const [post, setPost] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const handleRefresh = () => {
        setRefresh(true);
    }
    const getPostInfo = async () => {
        try {
          const response = await fetch(
            "https://backend.cntic-club.com/api/posts/Posts/",
            {
              method: "GET",
            }
          );
          const data = await response.json();
          setPost(data.Posts);
        } catch (error) {
          console.error("Error:", error.message);
        }
      };
      useEffect(() => {
        getPostInfo();
      }, []);
      useEffect(() => {
        if (refresh) {
          getPostInfo();
          setRefresh(false);
        }
      }, [refresh]);
  return (
      <div className=" bg-white  pt-[64px]">
          <Header
              title="Experience the Future"
              text="CNTIC Club's Event Series"
          />
          <div className=" flex justify-around items-start mt-5">
              <div className="md:w-[65%] w-[90%] m-auto flex flex-col justify-center items-center ">
                {post.map((post,index) => (
                    <PostsElement key={index} Post={post} handleRefresh={handleRefresh}/>
                ))}
              </div>
          </div>

          <div className=" mb-10"></div>
      </div>
  );
}
