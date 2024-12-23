import React, { useEffect, useState } from "react";
import contract from "../../assets/icon/Profile/contract 1.png";
import avatar from "../../assets/icon/Profile/user-2-line.png";
import HoverProfile from "../../assets/icon/Profile/image-edit-fill.png";
import { faker } from "@faker-js/faker";

import { ErrorMessage, Field, Form, Formik } from "formik";

import {
  editProfileApi,
  getProfileApi,
} from "../../Redux/apiCalls/profileApiCalls";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserProfile, selectInfo } from "../../Redux/reducer";
import { getUser } from "../../Redux/apiCalls/authApiCall";
import Loading from "../../pages/Loading";

function EditProfile() {
  const [imageUrl, setImageUrl] = useState(faker.image.avatar()); // Initial placeholder image
  const [imageUrlBackground, setImageUrlBackground] = useState(
    faker.image.urlPicsumPhotos()
  ); // Initial placeholder image
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileBg, setSelectedFilebg] = useState(null);
  // const [isDisabeld, setiIsDisabeld] = useState(false);
  const { userId } = useParams();
  const { userProfile } = useSelector(selectInfo);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();
  const formData = new FormData();
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    formData.append("image", event.target.files[0]);
  };
  const handleFileChangebg = (event) => {
    setSelectedFilebg(event.target.files[0]);
  };

  // Preview image before uploading
  const previewImage = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };
  const previewImageBAckground = () => {
    if (selectedFileBg) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrlBackground(e.target.result);
      };
      reader.readAsDataURL(selectedFileBg);
    }
  };

  useEffect(() => {
    setUserData(userProfile);
    setLoading(false);
  }, []);
  // const getProfile = async () => {
  //   const userDataProfile = await getProfileApi(userId);
  //   setUserData(userDataProfile);
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   getProfile();
  // }, []);

  return (
    <div className="flex md:pt-20 flex-col items-center max-lg:pt-14  px-3">
      {loading ? <Loading /> : null}
      <div className="max-md:max-w-full w-[80%] ">
        <div className="  flex  flex-col justify-center items-center gap-5 max-md:flex-col max-md:gap-0 ">
          <div className="flex flex-col     w-full h-full max-md:ml-0 max-md:w-full max-md:min-h-10">
            <div className="flex flex-col relative  max-md:h-20   grow   max-md:max-w-full">
              <div className="flex gap-5  h-48  max-md:h-20  justify-between w-full  max-md:flex-wrap max-md:max-w-full">
                <img
                  loading="lazy"
                  src={imageUrlBackground}
                  className="max-w-full rounded-b-xl w-full  max-md:min-h-25  aspect-square max-md:h-full  "
                />
                <div className="  rounded-b-xl cursor-pointer hover:bg-black hover:opacity-60 duration-500  opacity-0  absolute top-0 right-0 max-w-full  max-md:h-20   w-full h-full   overflow-hidden">
                  <img
                    src={HoverProfile}
                    className=" cursor-pointer absolute  top-[30%] right-[48%] h-10 w-10 max-md:h-6 max-md:w-6 "
                  />
                  <input
                    type="file"
                    className=" w-full h-full opacity-0 cursor-pointer z-20 "
                    onChange={handleFileChangebg}
                  />{" "}
                  {previewImageBAckground()} {/* Optional preview button */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="justify-center   max-w-full  w-[550px] max-md:mt-0">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col ml-5 w-full max-md:ml-0 max-md:w-full">
            <div className="flex  justify-center pl-[10%] max-md:pl-10 items-center w-full">
              <div className="perantHover relative   border-4 border-green-600 rounded-full    flex justify-between  w-[100px] h-fit max-md:ml-0 max-md:w-[20%]  max-md:mt-2 ">
                <div>
                  <img
                    loading="lazy"
                    src={imageUrl}
                    className="max-w-full aspect-square rounded-full w-full "
                  />

                  <div className="  cursor-pointer  hover:bg-black hover:opacity-40 duration-500  opacity-0  absolute top-0 right-0 max-w-full rounded-full w-[235px] h-full overflow-hidden">
                    <img
                      src={HoverProfile}
                      className=" cursor-pointer absolute  top-[40%] right-[40%] h-6 w-6 "
                    />
                    <input
                      type="file"
                      className=" w-full h-full opacity-0 cursor-pointer z-20 "
                      onChange={handleFileChange}
                    />{" "}
                    {previewImage()} {/* Optional preview button */}
                  </div>
                </div>
              </div>

              <div className="ml-10 max-md:ml-4"></div>
            </div>
          </div>
        </div>
      </div>
      {userData ? (
        <Formik
          initialValues={{
            FirstName: userProfile?.FirstName || "",
            LastName: userProfile?.LastName || "",
            Telephone: userProfile?.Telephone || "",
            Email: userProfile?.Email || "",
            Age: userProfile.Age || "",
            Gender: userProfile.Gender || "",
            Address: userProfile.Address || "",
          }}
          onSubmit={(values, { setSubmitting }) => {
            // Handle form submission here
            console.log(values);

            editProfileApi(values, userId);
            // Optionally, call any submission function here
            setSubmitting(false);
            nav(`/profile/${userId}`); // Redirect to the profile page (or any other page as needed)
            // To enable the form submission button again
          }}
        >
          <Form>
            <div className="flex gap-2 justify-between items-center">
              <div className="flex  flex-col max-lg:text-center grow mt-2 text-2xl font-light text-black max-md:mt-7">
                <div>First Name</div>
                <Field
                  type="text"
                  name="FirstName"
                  className="pl-3 w-[100%] 
                  shrink-0 mt-3 focus:outline-none rounded-md border-b-4 border-solid bg-stone-300 bg-opacity-30 border-zinc-300 h-[69px]"
                  required
                />
              </div>

              <div className="flex flex-col max-lg:text-center grow mt-2 text-2xl font-light text-black max-md:mt-7">
                <div>Last Name</div>
                <Field
                  type="text"
                  name="LastName"
                  className="pl-3 w-[100%] shrink-0 mt-3 focus:outline-none rounded-md border-b-4 border-solid bg-stone-300 bg-opacity-30 border-zinc-300 h-[69px]"
                  required
                />
                <ErrorMessage name="lastName" component="div" />
              </div>
            </div>
            {/* Location */}
            <div className="mt-4 text-2xl font-light text-black max-md:max-w-full">
              Address
            </div>
            <Field
              type="text"
              name="Address"
              className="pl-3 focus:outline-none shrink-0 mt-3 max-w-full rounded-md border-b-4 border-solid bg-stone-300 bg-opacity-30 border-zinc-300 h-[60px] w-full"
              required
            />
            <div className="mt-4 text-2xl font-light text-black max-md:max-w-full">
              number Phone
            </div>
            <Field
              type="tel"
              name="Telephone"
              className="pl-3 focus:outline-none shrink-0 mt-3 max-w-full rounded-md border-b-4 border-solid bg-stone-300 bg-opacity-30 border-zinc-300 h-[69px] w-full"
              pattern="^\d+$"
              // Additional validation using input event listener (optional)
              onInput={(e) => {
                const value = e.target.value;
                e.target.value = value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
              }}
            />

            <div className="flex justify-between items-center w-full mt-4 gap-5 ">
              <div className="w-[90%]">
                <div className="w-full text-black text-xl font-light font-['Outfit']">
                  Gender
                </div>
                <Field
                  as="select"
                  name="Gender"
                  className="w-full h-12 mt-1 pl-5 rounded-md focus:outline-none text-black bg-stone-200"
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
              <div className=" w-[90%]  ">
                <div
                  className="w-full h-7 text-black
               text-xl font-light font-['Outfit']"
                >
                  Age
                </div>
                <Field
                  type="text"
                  name="Age"
                  className="w-full  h-12 mt-1 pl-5 bg-stone-200 rounded-md focus:outline-none text-black"
                  onInput={(e) => {
                    const value = e.target.value;
                    e.target.value = value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
                  }}
                  required
                />
              </div>
            </div>
            {/* Description */}
            {/* <div className="mt-9 text-2xl font-light text-black max-md:max-w-full">
            Bio
          </div>
          <Field
            as="textarea"
            name="bio"
            className="pl-3 focus:outline-none shrink-0 mt-1.5 max-w-full rounded-md border-b-4 border-solid bg-stone-300 bg-opacity-30 border-zinc-300 h-[100px] w-full"
            required
          /> */}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="justify-center text-center cursor-pointer items-center px-16 py-7 mt-10 max-w-full text-xl text-white bg-black rounded-3xl w-full max-md:px-5 max-md:mt-10"
              >
                Edit Profile
              </button>
            </div>
          </Form>
        </Formik>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default EditProfile;
