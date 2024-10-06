import React from "react";
import { Link, useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Timestamp from "react-timestamp";

const ProductDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();

  const { data: AllProducts = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosPublic.get("/products");
      return res.data;
    },
  });

  const product = AllProducts.find((product) => product._id === id);

//   console.log(product);

  return (
    <div className="mt-32 mb-10 lg:px-0 px-6">
      <div className="max-w-4xl lg:h-[450px] mx-auto bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl flex flex-col md:flex-row ">
        {/* Image on the left (or top on small screens) */}
        <div className="md:w-1/3 w-full">
          <div className="relative">
            <img
              className="w-full lg:h-[450px] h-48 md:h-full object-fit"
              src={product?.image}
              alt="Product"
            />
            <div className="absolute inset-0 bg-black bg-opacity-25 opacity-0 hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <button className="bg-yellow-400 text-black px-4 py-2 rounded-full font-bold hover:bg-yellow-500 transition duration-300">
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Product details on the right (or below on small screens) */}
        <div className="md:w-2/3 w-full p-6">
          <h3 className="text-gray-900 font-bold text-2xl">
            {product?.productTitle}
          </h3>
          <p className="text-gray-600 mt-4 text-sm">
            {product?.productDescription}
          </p>
          <ul className="mt-4 space-y-2">
            <li className="text-gray-700">✔️ Size : {product?.size}</li>
            <li className="text-gray-700">✔️ Upsel : {product?.upsell}</li>
            <li className="text-gray-700">✔️Vendor : {product?.vendor}</li>
            <li className="text-gray-700">
              ✔️ ArtistName : {product?.artistName}
            </li>
            <li className="text-gray-700">
              ✔️ ArtistEmail : {product?.artistEmail}
            </li>
            <li className="text-gray-700">
              ✔️ Date : <Timestamp date={product?.date} />
            </li>
          </ul>
          <div className="flex items-center justify-center mt-6 w-1/2">
            <Link
              to="/all-products"
              className="bg-amber-800 text-white py-2 px-4 rounded-lg w-full mb-6"
            >
              Back to Product Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
