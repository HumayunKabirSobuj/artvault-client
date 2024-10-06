import React from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const axiosPublic = useAxiosPublic();

  const { data: AllProducts = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosPublic.get("/products");
      return res.data;
    },
  });

  // console.log(AllProducts)
  const ActiveProducts=AllProducts.filter((product)=>product.status==="Active")
//   console.log(ActiveProducts)

  return (
    <div className="mt-32 mb-10  px-6  lg:px-16 max-w-[1440px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-5">
        {ActiveProducts.map((product) => (
          <div
            key={product._id}
            className=" bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl"
          >
            <div className="relative">
              <img
                className="w-full h-48 object-fit"
                src={product?.image}
                alt="Product"
              />
              <div className="absolute inset-0 bg-black bg-opacity-25 opacity-0 hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <button className="bg-yellow-400 text-black px-4 py-2 rounded-full font-bold hover:bg-yellow-500 transition duration-300">
                  Buy Now
                </button>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-gray-900 font-bold text-lg">
                {product?.productTitle}
              </h3>
              <p className="text-gray-600 mt-2 text-sm">
                {product?.productDescription.length > 100
                  ? `${product?.productDescription.substring(0, 100)}...`
                  : product?.productDescription}
              </p>
              <div className="flex items-center justify-center mt-4">
                <Link
                  to={`/product-details/${product._id}`}
                  className="text-black hover:text-amber-800 font-bold"
                >
                  Click Here to Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
