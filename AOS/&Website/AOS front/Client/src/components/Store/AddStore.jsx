import React, { useEffect, useState } from "react";
import contract from "../../assets/icon/Profile/contract 1.png";
import avatar from "../../assets/icon/Profile/user-2-line.png";
import HoverProfile from "../../assets/icon/Profile/image-edit-fill.png";
import { faker } from "@faker-js/faker";
import Swal from "sweetalert2";
import { createStore } from "../../Redux/apiCalls/storeApiCalls";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { selectInfo } from "../../Redux/reducer";
function AddStore() {
  const [imageUrl, setImageUrl] = useState(faker.image.avatar()); // Initial placeholder image
  const [imageUrlBackground, setImageUrlBackground] = useState(
    faker.image.urlPicsumPhotos()
  ); // Initial placeholder image
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileBg, setSelectedFilebg] = useState(null);
  // const [isDisabeld, setiIsDisabeld] = useState(false);
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector(selectInfo);
  const [values, setValues] = useState({});
  const nav = useNavigate();
  const initialValues = {
    StoreName: "",
    Telephone: "",
    Store_Describtion: "",
  };
  const [disabled, setDisabled] = useState(true);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
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

  const HandlecreateStore = async (data) => {
    await dispatch(createStore(data, userId));
    setDisabled(true);
  };
  useEffect(() => {
    setDisabled(false);
  }, [values]);
  return (
    // <div className="flex md:pt-20 flex-col items-center max-lg:pt-14  px-3">
    //   <div className="max-md:max-w-full w-[80%] ">
    //     <div className="  flex  flex-col justify-center items-center gap-5 max-md:flex-col max-md:gap-0 ">
    //       <div className="flex flex-col     w-full h-full max-md:ml-0 max-md:w-full max-md:min-h-10">
    //         <div className="flex flex-col relative  max-md:h-20   grow   max-md:max-w-full">
    //           <div className="flex gap-5  h-48  max-md:h-20  justify-between w-full  max-md:flex-wrap max-md:max-w-full">
    //             <img
    //               loading="lazy"
    //               src={imageUrlBackground}
    //               className="max-w-full rounded-b-xl w-full  max-md:min-h-25  aspect-square max-md:h-full  "
    //             />
    //             <div className="  rounded-b-xl cursor-pointer hover:bg-black hover:opacity-60 duration-500  opacity-0  absolute top-0 right-0 max-w-full  max-md:h-20   w-full h-full   overflow-hidden">
    //               <img
    //                 src={HoverProfile}
    //                 className=" cursor-pointer absolute  top-[30%] right-[48%] h-10 w-10 max-md:h-6 max-md:w-6 "
    //               />
    //               <input
    //                 type="file"
    //                 className=" w-full h-full opacity-0 cursor-pointer z-20 "
    //                 onChange={handleFileChangebg}
    //               />{" "}
    //               {previewImageBAckground()} {/* Optional preview button */}
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="justify-center  mt-20 max-w-full  w-[550px] max-md:mt-0">
    //     <div className="flex gap-5 max-md:flex-col max-md:gap-0">
    //       <div className="flex max-xl:order-2 flex-col w-[68%] max-md:ml-0 max-md:w-full">
    //         <div className="flex flex-col max-lg:text-center grow mt-2 text-2xl font-light text-black max-md:mt-7">
    //           <div>Store Name</div>
    //           <input className=" pl-3 shrink-0 mt-3 focus:outline-none rounded-md border-b-4 border-solid bg-stone-300 bg-opacity-30 border-zinc-300 h-[69px]" />
    //         </div>
    //       </div>
    //       <div className="flex flex-col ml-5 w-[32%] max-md:ml-0 max-md:w-full">
    //         <div className="flex  justify-center pl-[10%] max-md:pl-10 items-center w-full">
    //           <div className="perantHover relative   border-4 border-green-600 rounded-full    flex justify-between  w-[100px] h-fit max-md:ml-0 max-md:w-[20%]  max-md:mt-2 ">
    //             <div>
    //               <img
    //                 loading="lazy"
    //                 src={imageUrl}
    //                 className="max-w-full aspect-square rounded-full w-full "
    //               />

    //               <div className="  cursor-pointer  hover:bg-black hover:opacity-40 duration-500  opacity-0  absolute top-0 right-0 max-w-full rounded-full w-[235px] h-full overflow-hidden">
    //                 <img
    //                   src={HoverProfile}
    //                   className=" cursor-pointer absolute  top-[40%] right-[40%] h-6 w-6 "
    //                 />
    //                 <input
    //                   type="file"
    //                   className=" w-full h-full opacity-0 cursor-pointer z-20 "
    //                   onChange={handleFileChange}
    //                 />{" "}
    //                 {previewImage()} {/* Optional preview button */}
    //               </div>
    //             </div>
    //           </div>

    //           <div className="ml-10 max-md:ml-4"></div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="mt-9 text-2xl font-light text-black max-md:max-w-full">
    //     Location
    //   </div>
    //   <input className=" pl-3 focus:outline-none  shrink-0 mt-3 max-w-full rounded-md border-b-4 border-solid bg-stone-300 bg-opacity-30 border-zinc-300 h-[69px] w-[550px]" />
    //   <div className="mt-9 text-2xl font-light text-black max-md:max-w-full">
    //     Description
    //   </div>
    //   <textarea className=" pl-3 focus:outline-none  shrink-0 mt-1.5 max-w-full rounded-md border-b-4 border-solid bg-stone-300 bg-opacity-30 border-zinc-300 h-[100px] w-[550px]" />
    //   <div
    //     onClick={handelClick}
    //     className="justify-center text-center cursor-pointer items-center px-16 py-7 mt-10 max-w-full text-xl text-white bg-black rounded-3xl w-[500px] max-md:px-5 max-md:mt-10"
    //   >
    //     Create store
    //   </div>
    //   <div className="mt-14 text-2xl font-light text-zinc-500 w-[550px] max-md:mt-10 max-md:max-w-full">
    //     By creating a store you agree Privacy Police and blablabla .
    //   </div>
    // </div>
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        // Handle form submission here
        // Register({ ...values, Age: parseInt(values.Age) });
        setValues({ ...values, Email: user.Email });

        await HandlecreateStore({ ...values, Email: user.Email });
      }}
    >
      {({ handleSubmit }) => (
        <Form className="flex md:pt-20 flex-col items-center max-lg:pt-14 px-3">
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

          <div className="justify-center mt-20 max-w-full w-[550px] max-md:mt-0">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <div className="flex max-xl:order-2 flex-col w-[68%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col max-lg:text-center grow mt-2 text-2xl font-light text-black max-md:mt-7">
                  <div>Store Name</div>
                  <Field
                    name="StoreName"
                    type="text"
                    className="pl-3 shrink-0 mt-3 focus:outline-none rounded-md border-b-4 border-solid bg-stone-300 bg-opacity-30 border-zinc-300 h-[69px]"
                  />
                </div>
              </div>
              <div className="flex flex-col ml-5 w-[32%] max-md:ml-0 max-md:w-full">
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

          <div className="mt-9 text-2xl font-light text-black max-md:max-w-full">
            Telephone
          </div>
          <Field
            name="Telephone"
            type="text"
            className="pl-3 focus:outline-none shrink-0 mt-3 max-w-full rounded-md border-b-4 border-solid bg-stone-300 bg-opacity-30 border-zinc-300 h-[69px] w-[550px]"
            onInput={(e) => {
              const value = e.target.value;
              e.target.value = value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
            }}
          />
          <div className="mt-9 text-2xl font-light text-black max-md:max-w-full">
            Description
          </div>
          <Field
            name="Store_Describtion"
            as="textarea"
            className="pl-3 focus:outline-none shrink-0 mt-1.5 max-w-full rounded-md border-b-4 border-solid bg-stone-300 bg-opacity-30 border-zinc-300 h-[100px] w-[550px]"
          />
          <button
            className="justify-center text-center cursor-pointer items-center px-16 py-7 mt-10 max-w-full text-xl text-white bg-black rounded-3xl w-[500px] max-md:px-5 max-md:mt-10"
            onClick={handleSubmit}
            disabled={disabled}
          >
            Create store
          </button>
          <div className="mt-14 text-2xl font-light text-zinc-500 w-[550px] max-md:mt-10 max-md:max-w-full">
            By creating a store you agree Privacy Police .
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default AddStore;
