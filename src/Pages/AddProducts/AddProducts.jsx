import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import "./input.css";
import axios from "axios";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { AuthContext } from "../../Provider/AuthProvider";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;


const AddProduct = () => {
  const [productTitle, setProductTitle] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [artistName, setArtistName] = useState("");
  const [upsell, setUpSell] = useState("");
  const [size, setSize] = useState("");
  const [vendor, setVendor] = useState("");
  const [tags, setTags] = useState([]);
  const [inputTag, setInputTag] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null); // New state for image
  const axiosPublic = useAxiosPublic();
  
  


  const { user } = useContext(AuthContext);
  

  
  const resetForm = () => {
    setProductTitle("");
    setProductDescription("");
    setArtistName("");
    setUpSell("");
    setSize("");
    setVendor("");
    setTags([]);
    setInputTag("");
    setUploadedImage(null);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const ProductData = {
      productTitle,
      productDescription,
      upsell,
      size,
      image: uploadedImage, // Include the uploaded image URL
      vendor,
      artistName,
      date: new Date(),
      status: "InActive",
      artistEmail: user?.email,
    };

    // Post product data
    axiosPublic.post("/products", ProductData).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Listing Added Successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        // Voice notification
        const msg = new SpeechSynthesisUtterance();
        msg.text = "Successfully added your Art Product!";
        msg.lang = "en-US";
        window.speechSynthesis.speak(msg);

        resetForm(); // Reset the form after submission
      }
    });
  };

  

  // Handle tag input submission
 

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  // Handle image upload to ImgBB
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(image_hosting_api, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        setUploadedImage(res.data.data.url); // Save the uploaded image URL
        Swal.fire({
          icon: "success",
          title: "Image uploaded successfully!",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Image upload failed!",
        text: error.message,
      });
    }
  };


  return (
    <motion.div
      className="container mx-auto px-16 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold mb-6">Upload an Image</h1>

      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col lg:flex-row gap-10"
      >
        {/* Left Section */}
        <motion.div
          className="lg:w-1/2 flex flex-col gap-6"
          initial={{ x: -50 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          {/* Product Title */}
          <div>
            <label className="block text-sm font-medium">Art Title</label>
            <input
              required
              type="text"
              className="input w-full mt-1 p-2 border rounded-md"
              value={productTitle}
              onChange={(e) => setProductTitle(e.target.value)}
              placeholder="Write title here..."
            />
          </div>

          {/* Row for Image and Description */}
          <div className="flex gap-4">
            {/* Image Display */}
            <div className="flex-1">
              <label
                htmlFor="file"
                className="w-full h-[230px] flex items-center justify-center cursor-pointer border-2 border-dashed border-gray-300 bg-gray-200 p-6 rounded-lg shadow-lg hover:border-gray-400"
              >
                {uploadedImage ? (
                  <img
                    src={uploadedImage}
                    alt="Uploaded Preview"
                    className="h-full w-3/4  object-cover rounded-md"
                  />
                ) : (
                  <>
                    <div className="icon flex items-center justify-center">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-20 w-20 fill-gray-600"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                        />
                      </svg>
                    </div>
                    <div className="text flex items-center justify-center">
                      <span className="font-medium text-gray-400">
                        Click to upload image
                      </span>
                    </div>
                  </>
                )}
                <input
                  id="file"
                  type="file"
                  className="hidden"
                  onChange={handleImageUpload} // Call the upload handler
                />
              </label>
            </div>

            {/* Product Description */}
            <div className="flex-1">
              <label className="block text-sm font-medium">
                Description of Artwork
              </label>
              <textarea
                required
                className="border-none w-full outline-none rounded-[20px] py-3 px-5 bg-[#e1e2e3] shadow-inner transition-transform duration-300 ease-in-out focus:bg-white focus:scale-105 focus:shadow-[13px_13px_100px_#969696,-13px_-13px_100px_#ffffff]"
                rows="7"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                placeholder="Write a description here..."
              />
            </div>
          </div>

          
        </motion.div>

        {/* Right Section */}
        <motion.div
          className="lg:w-1/2 flex flex-col gap-6"
          initial={{ x: 50 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          {/* Artist Name */}
          <div>
            <label className="block text-sm font-medium">Artist Name</label>
            <input
              required
              type="text"
              className="input w-full mt-1 p-2 border rounded-md"
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
              placeholder="Artist Name here"
            />
          </div>

          {/* Vendor */}
          <div>
            <label className="block text-sm font-medium">Vendor Name</label>
            <input
              required
              type="text"
              className=" input w-full mt-1 p-2 border rounded-md"
              value={vendor}
              onChange={(e) => setVendor(e.target.value)}
              placeholder="Vendor name here"
            />
          </div>

          {/* Size */}
          <div>
            <label className="block text-sm font-medium">Print Size</label>
            <select
              required
              className="border-none w-full outline-none rounded-full py-3 px-3 bg-[#e1e2e3] shadow-inner transition-transform duration-300 ease-in-out focus:bg-white focus:scale-105 focus:shadow-[13px_13px_100px_#969696,-13px_-13px_100px_#ffffff]"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              <option>Select Print Size</option>
              <option>Small</option>
              <option>Medium</option>
              <option>Large</option>
            </select>
          </div>

          {/* Upsell */}
          <div>
            <label className="block text-sm font-medium">UpSell</label>
            <select
              required
              className="border-none w-full outline-none rounded-full py-3 px-3 bg-[#e1e2e3] shadow-inner transition-transform duration-300 ease-in-out focus:bg-white focus:scale-105 focus:shadow-[13px_13px_100px_#969696,-13px_-13px_100px_#ffffff]"
              value={upsell}
              onChange={(e) => setUpSell(e.target.value)}
            >
              <option selected>Select Upsell</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4 mt-6">
            <button

            onClick={() => {
              setProductTitle("");
              setArtistName('');
              setVendor('');
              setSize('');
              setUpSell('');
              setProductDescription('');
              setTags([]);
              setInputTag('');
            }}
              type="submit"
              className=" rounded-lg text-xl  px-4 py-2  text-white bg-amber-800 overflow-hidden relative z-10 group hover:text-teal-900 duration-700"
            >
              Discard
              <span className="bg-amber-600 group-hover:scale-125 scale-0 ease-in-out duration-300 delay-50 size-[3/4] rounded-full absolute mx-auto my-auto inset-0 -z-10"></span>
              <span className="bg-amber-500 group-hover:scale-125 scale-0 ease-in-out duration-300 delay-100 size-72 rounded-full absolute mx-auto my-auto inset-0 -z-10"></span>
              <span className="bg-amber-400 group-hover:scale-125 scale-0 ease-in-out duration-300 delay-200 size-52 rounded-full absolute mx-auto my-auto inset-0 -z-10"></span>
              <span className="bg-amber-400 group-hover:scale-125 scale-0 ease-in-out duration-300 delay-300 size-36 rounded-full absolute mx-auto my-auto inset-0 -z-10"></span>
              <span className="bg-amber-300 group-hover:scale-125 scale-0 ease-in-out duration-300 delay-[400ms] size-28 rounded-full absolute mx-auto my-auto inset-0 -z-10"></span>
            </button>

            <button
              type="submit"
              className=" rounded-lg text-xl  px-4 py-2  text-white bg-amber-800 overflow-hidden relative z-10 group hover:text-teal-900 duration-700"
            >
              Publish Product
              <span className="bg-amber-600 group-hover:scale-125 scale-0 ease-in-out duration-300 delay-50 size-[3/4] rounded-full absolute mx-auto my-auto inset-0 -z-10"></span>
              <span className="bg-amber-500 group-hover:scale-125 scale-0 ease-in-out duration-300 delay-100 size-72 rounded-full absolute mx-auto my-auto inset-0 -z-10"></span>
              <span className="bg-amber-400 group-hover:scale-125 scale-0 ease-in-out duration-300 delay-200 size-52 rounded-full absolute mx-auto my-auto inset-0 -z-10"></span>
              <span className="bg-amber-400 group-hover:scale-125 scale-0 ease-in-out duration-300 delay-300 size-36 rounded-full absolute mx-auto my-auto inset-0 -z-10"></span>
              <span className="bg-amber-300 group-hover:scale-125 scale-0 ease-in-out duration-300 delay-[400ms] size-28 rounded-full absolute mx-auto my-auto inset-0 -z-10"></span>
            </button>
          </div>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default AddProduct;
