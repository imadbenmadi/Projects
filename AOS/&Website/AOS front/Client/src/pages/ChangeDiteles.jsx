import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";
import HoverProfile from "../assets/icon/Profile/image-edit-fill.png";
import Swal from "sweetalert2";
import {
  deleteStoreApi,
  getStoreProfileApi,
  updateStoreApi,
} from "../Redux/apiCalls/storeApiCalls";
import { useNavigate, useParams } from "react-router-dom";
import { getStoreProfile, getUserProfile, selectInfo } from "../Redux/reducer";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../Redux/apiCalls/authApiCall";
import {
  objectToFormData,
  objectToFormDataUpdateProduct,
} from "../utils/objectToFormData";
function ChangeDiteles() {
  const [imageUrl, setImageUrl] = useState(faker.image.avatar()); // Initial placeholder image
  const [imageUrlBackground, setImageUrlBackground] = useState(
    faker.image.urlPicsumPhotos()
  ); // Initial placeholder image
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileBg, setSelectedFilebg] = useState(null);
  // const [isDisabeld, setiIsDisabeld] = useState(false);

  const dispatch = useDispatch();
  const { storeId } = useParams();
  const { userId } = useParams();
  const { storeProfile } = useSelector(selectInfo);
  const [formData, setFormData] = useState({});
  const [cancelForm, setCancelForm] = useState({
    StoreName: storeProfile.StoreName || "",
    Store_Describtion: storeProfile.Store_Describtion || "",
    Telephone: storeProfile.Telephone || "",
  });
  const nav = useNavigate();

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    e.ter;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]:
        name === "tags" ? value.split(",").map((tag) => tag.trim()) : value,
    }));
  };

  const handleFileChange = (event) => {
    try {
      // Ensure there's a file selected
      if (event.target.files.length > 0) {
        // Get the first selected file
        const selectedFile = event.target.files[0];

        // Update state with the selected file
        setSelectedFile(selectedFile);
      } else {
        console.log("No file selected.");
      }
    } catch (error) {
      // Handle any potential errors
      console.error("Error handling file change:", error);
    }
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

  const getStore = async () => {
    const data = await getStoreProfileApi(storeId);
    setFormData(data);
    dispatch(getStoreProfile(data));
  };
  useEffect(() => {
    getStore();
    getProfile();
  }, []);
  const getProfile = async () => {
    const userData = await getUser(userId);
    await getUserProfile(userData);
  };

  const handelSave = async () => {
    if (
      formData.StoreName.trim() === "" ||
      formData.Store_Describtion.trim() === "" ||
      formData.Telephone.trim() === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter the Empty fields!",
      });
      return;
    }
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success", { timer: 2000 });
        // const formDataFinal = objectToFormDataUpdateProduct(formData);
        const formDataFinal = new FormData();
        formDataFinal.append("StoreName", formData.StoreName);
        formDataFinal.append("Store_Describtion", formData.Store_Describtion);
        formDataFinal.append("Telephone", formData.Telephone);
        formDataFinal.append("image", selectedFile);

        console.log(
          formDataFinal.forEach((value, key) => console.log(value, key))
        );
        const data = await updateStoreApi(storeId, formDataFinal);
        console.log(data);
        // getStore();
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };
  const handelDeleteStore = async () => {
    Swal.fire({
      title: "Do you want to delete the store?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't delete`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "", "success", { timer: 2000 });
        const data = await deleteStoreApi(storeId);
        if (data) {
          nav("/");
        }
      } else if (result.isDenied) {
        Swal.fire("The store is not deleted", "", "info");
      }
    });
  };
  return (
    <div className=" w-full relative font-['Outfit'] h-screen  max-md:h-[92%] max-h-screen  max-md:w-screen ">
      <div className="   font-['Outfit'] justify-center items-start w-[90%] py-1    text-2xl leading-4 text-black bg-zinc-300 max-md:pr-5 max-md:max-w-full">
        <div className=" sticky flex justify-center items-center text-black text-2xl font-bold h-fit   py-1 max-md:text-xl">
          <div className=" w-[50%]"> Setup you Store Home Page</div>
          <div className="flex gap-5 max-md:gap-2 w-[40%] justify-between  text-xl font-light text-white whitespace-nowrap max-md:flex-wrap  max-md:max-w-full ">
            <div
              onClick={() => {
                setFormData(cancelForm);
              }}
              className=" max-md:text-lg cursor-pointer grow flex justify-center items-start py-2  w-[20%] max-md:w-[45%]  rounded-xl bg-zinc-400 max-md:px-5 "
            >
              cancel
            </div>
            <div
              onClick={handelSave}
              className="max-md:text-sm cursor-pointer grow flex justify-center items-center w-[20%]  py-2 max-md:w-[45%]  bg-green-600 rounded-xl max-md:pr-5 max-md:pl-8 "
            >
              Save
            </div>
          </div>
        </div>
      </div>
      <div className="  scrollProduct overflow-y-scroll max-md:h-[92%] max-h-screen    flex flex-col self-center w-full  max-w-screen max-md:max-w-full">
        <div className="max-md:max-w-full ">
          <div className="  flex  flex-col justify-center items-center gap-5 max-md:flex-col max-md:gap-0 ">
            <div className="flex flex-col  max-w-[80%]    w-full h-full max-md:ml-0 max-md:w-full max-md:min-h-10">
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
            <div className="flex max-md:flex-col  justify-center   items-center mt-2 w-full">
              <div className="perantHover relative mr-5   border-4 border-green-600 rounded-full    flex justify-between  w-[100px] h-fit max-md:ml-0 max-md:w-[20%]  max-md:mt-2 ">
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

              <div className=" max-md:ml-4">
                <div className=" ml-20   text-2xl font-light text-black max-md:max-w-full">
                  name of store
                </div>
                <input
                  name="StoreName"
                  type="text"
                  className=" ml-2 py-3 border-b-4 focus:outline-none border-solid border-zinc-300 bg-stone-300 bg-opacity-30  px-4 block w-[90%]  text-xl text-black placeholder:text-black placeholder: font-bold placeholder:text-3xl "
                  onChange={handleChangeForm}
                  value={formData.StoreName}
                />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="flex flex-col    items-center pt-2 pr-5 pb-2 pl-11 mt-5 max-w-full whitespace-nowrap bg-zinc-300 rounded-lg w-[80%] max-md:w-[95%] self-center max-md:px-5 max-md:mt-10">
          <div className="flex gap-5 justify-between mb-2 self-stretch max-md:flex-wrap max-md:max-w-full">
            <div className="flex-auto my-auto text-3xl leading-4 max-md:text-2xl text-black">
              Categories
            </div>
            <div
              onClick={handelAddButton}
              className=" cursor-pointer justify-center px-10 py-4 text-xl leading-4 text-white bg-green-600 rounded-3xl max-md:px-5"
            >
              ADD
            </div>
          </div>

          <div className=" scrollProduct pr-4 grid max-md:grid-cols-1 grid-cols-2 w-full overflow-y-scroll md:h-[20vh] max-h-[40vh]">
            {listCategories.map((item, index) => (
              <div
                key={index}
                className="flex gap-5 justify-between mt-5 max-w-full text-2xl leading-4 text-white bg-black w-[413px]  max-md:w-[313px]  max-md:mt-10"
              >
                <div className="bg-purple-600 h-[72px] w-[11px]" />
                <div className="flex-auto my-auto">{item.toUpperCase()}</div>
                <div
                  onClick={() => handleRemoveItem(index)}
                  className=" my-auto cursor-pointer mr-3 bg-red-500 p-2"
                >
                  X
                </div>
              </div>
            ))}
          </div>
        </div> */}
        <div className="flex  justify-center mx-auto max-md:pl-10 items-center mt-2 w-full">
          <div className=" max-md:w-full  ">
            <div className="  pl-10  mt-4 text-2xl font-light text-black max-md:max-w-full">
              number Phone
            </div>
            <input
              value={formData?.Telephone}
              onChange={handleChangeForm}
              type="tel"
              name="Telephone"
              className="  max-md:w-[90%] pl-5  focus:outline-none  shrink-0 mt-1.5 max-w-full rounded-md border-b-4 border-solid bg-stone-300 bg-opacity-30 border-zinc-300 h-16 md:w-[550px]"
              pattern="^\d+$"
              // Additional validation using input event listener (optional)
              onInput={(e) => {
                const value = e.target.value.slice(0, 10);
                e.target.value = value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
              }}
            />{" "}
            <div className="   mt-9 text-2xl max-md:w-[90%] font-light text-black max-md:max-w-full">
              Description
            </div>
            <textarea
              value={formData?.Store_Describtion}
              onChange={handleChangeForm}
              name="Store_Describtion"
              className=" pl-5 max-md:w-[90%]     focus:outline-none  shrink-0 mt-1.5 max-w-full rounded-md border-b-4 border-solid bg-stone-300 bg-opacity-30 border-zinc-300 h-[100px] w-[550px]"
            />
          </div>
        </div>
        <div className="w-full md:pl-32 ">
          <div
            type="button"
            onClick={handelDeleteStore}
            className="text-red-500   w-fit cursor-pointer hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
          >
            remove Store
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangeDiteles;
