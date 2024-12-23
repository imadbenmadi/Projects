import { faker } from "@faker-js/faker";
import ProductOnce from "../components/Dashbaord/ProductOnce";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { GetAllCategories } from "../Redux/apiCalls/categoriesApiCalls";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getStoreProfileApi } from "../Redux/apiCalls/storeApiCalls";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getProducts,
} from "../Redux/apiCalls/productApiCalls";

function ContolProducts() {
  const [isProduct, setIsProduct] = useState(true);
  const [isEditProduct, setIsEditProduct] = useState(true);
  const [Product, setProduct] = useState("");

  const [isDisbild, setIsDisbild] = useState(false);
  const [images, setImages] = useState([]); // Initial placeholder image
  const [categories, setCategories] = useState([]);

  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [formData, setFormData] = useState({
    Title: "",
    Describtion: "",
    Price: "",
    Category: "",
  });
  const [formDataEdit, setFormDataEdit] = useState({
    Title: "",
    Describtion: "",
    Price: "",
    Category: "",
  });
  const dispatch = useDispatch();
  const { storeId } = useParams();
  const [Products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({});
  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]:
        name === "tags" ? value.split(",").map((tag) => tag.trim()) : value,
    }));
  };
  const handleChangeFormEdit = (e) => {
    const { name, value } = e.target;
    setFormDataEdit((prevFormData) => ({
      ...prevFormData,
      [name]:
        name === "tags" ? value.split(",").map((tag) => tag.trim()) : value,
    }));
  };

  // Your options here

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);
  };

  const handleAddOption = (e) => {
    if (selectedOption !== "" && !selectedOptions.includes(selectedOption)) {
      setSelectedOptions([...selectedOptions, selectedOption]);
      setSelectedOption("");
    }
    handleChangeForm(e);
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions.splice(index, 1);
    setSelectedOptions(updatedOptions);
  };

  const getAllCategoriesFunction = async () => {
    const AllCategories = await GetAllCategories();
    setCategories(AllCategories);
  };

  const GetProducts = async () => {
    const data = await getProducts(storeId);
    setProducts(data.reverse());
  };
  useEffect(() => {
    getAllCategoriesFunction();
    GetProducts();
    // getStoreProfile(storeId);
  }, []);
  useEffect(() => {
    GetProducts();
    // getStoreProfile(storeId);
  }, [Product]);

  // Generate an array of random items

  // Function to check if all fields are filled
  const isFormDataValid = (formData) => {
    const requiredFields = [
      "Title",
      "Product_RatingAverage",
      "Price",
      "Category",
    ]; // Define required fields

    for (const field of requiredFields) {
      if (!(field in formData)) {
        return false; // Return false if any required field is missing
      }

      if (
        typeof formData[field] !== "string" ||
        formData[field].trim() === ""
      ) {
        return false; // Return false if any required field is not a non-empty string
      }
    }

    return true; // Return true if all required fields are present and non-empty strings
  };

  const HandelAddProduct = async (canalOrAdd) => {
    if (canalOrAdd === "cancel") {
      setIsProduct(!isProduct);
      return;
    }
    if (isFormDataValid(formData)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all fields!",
      });
      return;
    }

    // Call createProduct only once with the product data

    try {
      // Call createProduct only once with the product data
      createProduct(formData, storeId);
      Swal.fire({
        icon: "success",
        title: "Product added successfully",
      });
      setProducts([...Products, formData].reverse());
      // setProducts([...Products, productData]);
      if (canalOrAdd === "add" || canalOrAdd === "cancel") {
        // Fixed comparison operator
        setIsProduct(!isProduct); // Fixed typo here
      }

      //   console.log(formData);
    } catch (error) {
      console.error("Error creating product:", error);
      // Handle error, show message, or log it as needed
    }
  };

  const HandelEditProduct = (canalOrAdd) => {
    if (canalOrAdd == "save" || canalOrAdd == "cancel") {
      setIsEditProduct(!isEditProduct);
    }
    if (isFormDataValid(formDataEdit)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all fields!",
      });

      return;
    }
    try {
      editProduct(formDataEdit, storeId, currentProduct._id);
      console.log(formDataEdit);
      setProducts(
        Products.map((product) => {
          if (product._id === formDataEdit._id) {
            return formDataEdit;
          }
          return product;
        })
      );

      Swal.fire({
        icon: "success",
        title: "Product added successfully",
      });
      setIsEditProduct(!isEditProduct);

      //   console.log(formData);
    } catch (error) {
      console.error("Error creating product:", error);
      // Handle error, show message, or log it as needed
    }
  };

  // Preview image before uploading
  // const HandelEditProduct = (canalOrAdd) => {
  //   try {
  //     if (
  //       (Product.trim() && canalOrAdd === "save") ||
  //       canalOrAdd === "cancel"
  //     ) {
  //       setIsEditProduct(!isEditProduct);
  //     }

  //     // If you need to validate form data before proceeding, uncomment this block
  //     if (!isFormDataValid(formDataEdit)) {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Oops...",
  //         text: "Please fill in all fields!",
  //       });
  //       return;
  //     }

  //     // Assuming formDataEdit contains the edited product data
  //     const { Category, ...newFormDataEdit } = formDataEdit;

  //     // Update formDataEdit without Category field
  //     setFormDataEdit(newFormDataEdit);

  //     // If canalOrAdd is "add" or "cancel", toggle isEditProduct
  //     if (canalOrAdd === "add" || canalOrAdd === "cancel") {
  //       setIsEditProduct(!isEditProduct);
  //     }

  //     // If canalOrAdd is "save", add the edited product to Products state
  //     if (canalOrAdd === "save") {
  //       setProducts([...Products, formDataEdit]);
  //       Swal.fire({
  //         icon: "success",
  //         title: "Product added successfully",
  //       });
  //       editProduct(formDataEdit, storeId, currentProduct._id);
  //     }

  //     // If needed, call editProduct here passing formDataEdit, storeId, and currentProduct._id

  //     // Log formDataEdit for debugging
  //   } catch (error) {
  //     console.error("Error handling product edit/addition:", error);
  //     // Handle error, show message, or log it as needed
  //   }
  // };

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    const newImages = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const imageUrl = URL.createObjectURL(file);

      newImages.push({ file, imageUrl });
    }

    setImages((prevImages) => [...prevImages, ...newImages]);
    images.map((image, index) => {
      if (index > 4) setIsDisbild(true);
    });
  };
  // const data = new formData();

  const handleDelete = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#04ea00",
      cancelButtonColor: "#d33",
      confirmButtonText: "delete ",
    }).then((result) => {
      if (result.isConfirmed) {
        setCurrentProduct(Products[index]);
        deleteProduct(storeId, Products[index]._id);
        setProducts(
          Products.filter((product) => product._id !== Products[index]._id)
        );
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const handleEdit = (index) => {
    setFormDataEdit(Products[index]);
    // editProduct(formDataEdit, storeId, Products[index]._id);
    // console.log(Products[index]);
    // console.log(storeId);
    // console.log(Products[index]._id);
    setCurrentProduct(Products[index]);
  };
  return (
    <div className=" flex  relative w-full flex-col justify-start items-center  h-screen  ">
      {!isProduct ? (
        <div className="  scrollProduct overflow-y-scroll md:absolute z-40 relative w-screen h-screen     bg-transparent rounded-2xl  max-md:h-screen max-md:w-screen ">
          <div className=" max-md:hidden md:absolute relative  flex z-20  justify-center  items-center w-screen h-screen bg-black  opacity-50"></div>
          <div className="  md:absolute relative   right-[30%] max-md:right-0 scrollProduct py-5 py-5  self-center h-screen  overflow-y-scroll  max-md:left-0    z-50  flex flex-col justify-center  text-lg font-medium text-black  w-[40%] max-md:w-[100%]  max-md:max-w-screen max-md:max-h-screen  placeholder:outline-none	 placeholder:border-none  ">
            <div className=" flex max-md:h-screen max-md:w-screen flex-col px-10 w-full bg-white  py-5   max-md:px-5 max-md:max-w-full">
              <div className="self-center whitespace-nowrap pt-5">
                add product
              </div>
              <div className=" max-md:mt-2 max-md:max-w-full">
                Product Title
              </div>
              <input
                name="Title"
                onChange={(e) => {
                  handleChangeForm(e);
                  setProduct(e.target.value);
                }}
                type="text"
                className="shrink-0 pl-5 text-black  placeholder:text-white   focus:outline-transparent  mt-1 rounded-md bg-zinc-300 h-10 max-md:max-w-full"
              />
              <div className="mt-2 max-md:mt-10 max-md:max-w-full">
                Product Description
              </div>
              <textarea
                name="Describtion"
                onChange={(e) => {
                  handleChangeForm(e);
                  setProduct(e.target.value);
                }}
                type="text"
                className="shrink-0 pl-5 pt-1 text-black  placeholder:text-white   focus:outline-transparent  mt-1 rounded-md bg-zinc-300 h-[70px] max-md:max-w-full"
              />
              <div className="mt-2 max-md:mt-10 max-md:max-w-full">Prix</div>
              <div className="flex bg-zinc-300 rounded-md justify-between items-center">
                <input
                  name="Price"
                  onChange={(e) => {
                    handleChangeForm(e);
                    setProduct(e.target.value);
                  }}
                  onInput={(e) => {
                    const { value } = e.target;
                    e.target.value = value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
                  }}
                  type="text"
                  className="shrink-0 pl-5 bg-zinc-300 text-black  placeholder:text-zinc-300   focus:outline-none  mt-1 rounded-md  h-10 max-md:max-w-full"
                />
                <div className="mx-2">DZ</div>
              </div>
              {/* <div className="mt-2 max-md:mt-10 max-md:max-w-full">Tags</div>
              <div></div>

              <input
                onChange={(e) => {
                  setProduct(e.target.value);
                }}
                type="text"
                className="shrink-0 pl-5 text-black  placeholder:text-white   focus:outline-transparent  mt-1 rounded-md bg-zinc-300 h-10 max-md:max-w-full"
              /> */}
              <div className="mt-2 max-md:mt-10 max-md:max-w-full">Tags</div>

              <div className="border-b-1 border-gray-300 pb-5">
                <select
                  className="shrink-0 pl-5 w-full text-black  placeholder:text-white   focus:outline-transparent  mt-1 rounded-md bg-zinc-300 h-10 max-md:max-w-full"
                  value={selectedOption}
                  onChange={handleChange}
                  onClick={handleAddOption}
                  name="Category"
                >
                  {categories?.map((option, index) => (
                    <option key={index} value={option.Category}>
                      {option.Category}
                    </option>
                  ))}
                </select>

                <div className="grid w-full  grid-cols-3">
                  {selectedOptions.map((option, index) => (
                    <div key={index}>
                      <div className="bg-slate-200 w-fit py-1 px-2 m-2 rounded-xl ">
                        {option}
                        <button
                          className="text-red-500 ml-2"
                          onClick={() => handleRemoveOption(index)}
                        >
                          x
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="h-25 overflow-x-scroll scrollProduct pb-2 flex mt-2">
                <div className="flex space-x-4">
                  {images.length == 6 ? (
                    ""
                  ) : (
                    <div className="relative w-20 h-20 text-4xl flex justify-center items-center opacity-60 overflow-hidden bg-stone-300 rounded-2xl">
                      <img
                        className="z-10 max-w-full rounded-b-xl w-full max-md:min-h-25 aspect-square max-md:h-full"
                        src="https://via.placeholder.com/100x109"
                        alt="Placeholder"
                      />
                      <input
                        type="file"
                        disabled={isDisbild}
                        className="absolute w-full h-full opacity-0 cursor-pointer z-20"
                        onChange={handleFileChange}
                      />
                    </div>
                  )}

                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="w-20 h-20 text-4xl flex justify-center items-center opacity-60 overflow-hidden bg-stone-300 rounded-2xl"
                    >
                      <img
                        loading="lazy"
                        src={image.imageUrl}
                        alt={`Uploaded ${index + 1}`}
                        className="max-w-full rounded-b-xl w-full max-md:min-h-25 aspect-square max-md:h-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-5 justify-between mt-2 mb-1 text-2xl font-light text-white whitespace-nowrap max-md:flex-wrap max-md:my-10 max-md:max-w-full max-md:text-4xl">
                <div
                  onClick={() => {
                    // setIsProduct(!isProduct);
                    HandelAddProduct("cancel");
                  }}
                  className=" cursor-pointer grow flex justify-center items-start py-2 w-5  rounded-xl bg-zinc-400 max-md:px-5 max-md:text-4xl"
                >
                  cancel
                </div>
                <div
                  onClick={() => {
                    // setIsProduct(!isProduct);
                    HandelAddProduct("add");
                  }}
                  className=" cursor-pointer grow flex justify-center items-start w-5  py-2  bg-green-600 rounded-xl max-md:pr-5 max-md:pl-8 max-md:text-4xl"
                >
                  add
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {!isEditProduct ? (
        <div className="  scrollProduct overflow-y-scroll md:absolute z-40 relative w-screen h-screen     bg-transparent rounded-2xl  max-md:h-screen max-md:w-screen ">
          <div className=" max-md:hidden md:absolute relative  flex z-20  justify-center  items-center w-screen h-screen bg-black  opacity-50"></div>
          <div className="  md:absolute relative   right-[30%] max-md:right-0 scrollProduct py-5 py-5  self-center h-screen  overflow-y-scroll  max-md:left-0    z-50  flex flex-col justify-center  text-lg font-medium text-black  w-[40%] max-md:w-[100%]  max-md:max-w-screen max-md:max-h-screen  placeholder:outline-none	 placeholder:border-none  ">
            <div className=" flex max-md:h-screen max-md:w-screen flex-col px-10 w-full bg-white  py-5   max-md:px-5 max-md:max-w-full">
              <div className="self-center whitespace-nowrap pt-5">
                Product Title
              </div>
              <div className=" whitespace-nowrap pt-5">Product Title</div>
              <input
                name="Title"
                onChange={(e) => {
                  setProduct(e.target.value);
                  handleChangeFormEdit(e);
                }}
                type="text"
                value={formDataEdit.Title}
                className="shrink-0 pl-5 text-black  placeholder:text-white   focus:outline-transparent  mt-1 rounded-md bg-zinc-300 h-10 max-md:max-w-full"
              />
              <div className="mt-2 max-md:mt-10 max-md:max-w-full">
                Product Title
              </div>
              <textarea
                name="Describtion"
                onChange={(e) => {
                  setProduct(e.target.value);
                  handleChangeFormEdit(e);
                }}
                value={formDataEdit.Describtion}
                type="text"
                className="shrink-0 pl-5 pt-1 text-black  placeholder:text-white   focus:outline-transparent  mt-1 rounded-md bg-zinc-300 h-[70px] max-md:max-w-full"
              />
              <div className="mt-2 max-md:mt-10 max-md:max-w-full">Prix</div>
              <input
                name="Price"
                onChange={(e) => {
                  setProduct(e.target.value);
                  handleChangeFormEdit(e);
                }}
                value={formDataEdit.Price}
                onInput={(e) => {
                  const { value } = e.target;
                  e.target.value = value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
                }}
                type="text"
                className="shrink-0 pl-5 text-black  placeholder:text-white   focus:outline-transparent  mt-1 rounded-md bg-zinc-300 h-10 max-md:max-w-full"
              />
              <div className="mt-2 max-md:mt-10 max-md:max-w-full">Tags</div>

              <div className="border-b-1 border-gray-300 pb-5">
                <select
                  className="shrink-0 pl-5 w-full text-black  placeholder:text-white   focus:outline-transparent  mt-1 rounded-md bg-zinc-300 h-10 max-md:max-w-full"
                  value={selectedOption}
                  onChange={handleChange}
                  onClick={handleAddOption}
                  name="Category"
                >
                  <option value="">Select a category</option>
                  {categories?.map((option, index) => (
                    <option key={index} value={option.Category}>
                      {option.Category}
                    </option>
                  ))}
                </select>

                <div className="grid w-full  grid-cols-3">
                  {selectedOptions.map((option, index) => (
                    <div key={index}>
                      <div className="bg-slate-200 w-fit py-1 px-2 m-2 rounded-xl ">
                        {option}
                        <button
                          className="text-red-500 ml-2"
                          onClick={() => handleRemoveOption(index)}
                        >
                          x
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-25 overflow-x-scroll scrollProduct pb-2 flex mt-2">
                <div className="flex space-x-4">
                  {images.length == 6 ? (
                    ""
                  ) : (
                    <div className="relative w-20 h-20 text-4xl flex justify-center items-center opacity-60 overflow-hidden bg-stone-300 rounded-2xl">
                      <img
                        className="z-10 max-w-full rounded-b-xl w-full max-md:min-h-25 aspect-square max-md:h-full"
                        src="https://via.placeholder.com/100x109"
                        alt="Placeholder"
                      />
                      <input
                        type="file"
                        disabled={isDisbild}
                        className="absolute w-full h-full opacity-0 cursor-pointer z-20"
                        onChange={handleFileChange}
                      />
                    </div>
                  )}

                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="w-20 h-20 text-4xl flex justify-center items-center opacity-60 overflow-hidden bg-stone-300 rounded-2xl"
                    >
                      <img
                        loading="lazy"
                        src={image.imageUrl}
                        alt={`Uploaded ${index + 1}`}
                        className="max-w-full rounded-b-xl w-full max-md:min-h-25 aspect-square max-md:h-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-5 justify-between mt-2 mb-1 text-2xl font-light text-white whitespace-nowrap max-md:flex-wrap max-md:my-10 max-md:max-w-full max-md:text-4xl">
                <div
                  onClick={() => {
                    // setIsEditProduct(!isEditProduct);
                    HandelEditProduct("cancel");
                  }}
                  className=" cursor-pointer grow flex justify-center items-start py-2 w-5  rounded-xl bg-zinc-400 max-md:px-5 max-md:text-4xl"
                >
                  cancel
                </div>
                <div
                  onClick={() => {
                    // setIsEditProduct(!isEditProduct);

                    HandelEditProduct("Save");
                  }}
                  className=" cursor-pointer grow flex justify-center items-start w-5  py-2  bg-green-600 rounded-xl max-md:pr-5 max-md:pl-8 max-md:text-4xl"
                >
                  Save
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <div
        className={`flex flex-col  w-[100%]  max-md:w-screen ${
          !isProduct && "max-md:hidden"
        } ${!isEditProduct && "max-md:hidden"} `}
      >
        <div className="flex justify-start items-start py-3 pr-10 pl-4 w-full text-3xl  text-black bg-zinc-300 max-md:pr-5 max-md:max-w-full">
          Products{" "}
        </div>
        <div className=" flex gap-5 justify-between items-start self-center mt-11  w-[90%]  mb-5 max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
          <div className="flex-auto self-start text-3xl font-bold leading-normal text-black max-md:text-4xl">
            Hello , Admin 👋
          </div>
          <div
            onClick={() => {
              setIsProduct(!isProduct);
            }}
            className="justify-center self-end px-11 py-4  text-lg leading-4 text-white whitespace-nowrap bg-emerald-600 rounded-md max-md:px-5"
          >
            + ADD
          </div>
        </div>
      </div>
      <div
        className={`  ${!isProduct && "max-md:hidden"} ${
          !isEditProduct && "max-md:hidden"
        }  h-[65vh] w-full max-md:h-[92%]  md:overflow-y-scroll md:scrollProduct`}
      >
        {Products.map((item, index) => (
          <ProductOnce
            key={item._id}
            item={item}
            handleDelete={() => handleDelete(index)}
            handleEdit={() => handleEdit(index)}
            index={index}
            setIsEditProduct={() => setIsEditProduct()}
          />
        ))}
      </div>
    </div>
  );
}

export default ContolProducts;
