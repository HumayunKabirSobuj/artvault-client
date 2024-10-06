import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const AdminProducts = () => {
  const { user } = useContext(AuthContext);

  const axiosPublic = useAxiosPublic();

  const { data: AllProducts = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosPublic.get("/products");
      return res.data;
    },
  });

  const productData = AllProducts.filter(
    (listing) => listing.artistEmail === user?.email
  );

 

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Admin Products</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-800 text-white text-left text-sm uppercase font-semibold">
              <th className="px-4 py-3">Product Name</th>
              <th className="px-4 py-3">Photo</th>
              <th className="px-4 py-3">Upsel</th>
              <th className="px-4 py-3">Ventor</th>
              <th className="px-4 py-3">Stock Status</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {productData.map((product, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="px-4 py-3">{product.productTitle}</td>
                <td className="px-4 py-3">
                  <img
                    className="w-12 h-12 object-cover rounded-md"
                    src={product.image}
                  />
                </td>
                <td className="px-4 py-3">{product.upsell}</td>
                <td className="px-4 py-3">{product.vendor}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      product.status === "Active"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {new Date(product.date).toLocaleString()}
                </td>

                <td className="px-4 py-3">
                  <Link
                    to={`/editproduct/${product._id}`}
                    className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold hover:bg-blue-600"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
