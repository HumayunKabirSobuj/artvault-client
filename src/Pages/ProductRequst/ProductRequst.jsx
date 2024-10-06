import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ProductRequest = () => {
  const { user } = useContext(AuthContext);

  const axiosPublic = useAxiosPublic();

  const { data: AllProducts = [] , refetch} = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosPublic.get("/products");
      return res.data;
    },
  });

  const productData = AllProducts.filter(
    (listing) => listing.status === "InActive"
  );

 
  const handleApproval = (id) => {
    // console.log(id)
    axiosPublic
      .patch(`/products/${id}`, { status: "Active" })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Approved Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
      })
      .catch((err) => {
        console.log(err); // Handle any errors here if needed 
      });
  };

 

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Product Request</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-800 text-white text-left text-sm uppercase font-semibold">
              <th className="px-4 py-3">Product Name</th>
              <th className="px-4 py-3">Photo</th>
              <th className="px-4 py-3">Upsel</th>
              <th className="px-4 py-3">Ventor</th>
              <th className="px-4 py-3">Artist Email</th>
              <th className="px-4 py-3">Stock Status</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {productData.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="px-4 py-3">{product.productTitle}</td>
                <td className="px-4 py-3">
                  <img
                    className="w-12 h-12 object-cover rounded-md"
                    src={product.image}
                    alt="Product"
                  />
                </td>
                <td className="px-4 py-3">{product.upsell}</td>
                <td className="px-4 py-3">{product.vendor}</td>
                <td className="px-4 py-3">{product.artistEmail}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      product.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : product.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {new Date(product.date).toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  {product.status === "InActive" && (
                    <>
                      <button
                        onClick={() => handleApproval(product._id)}
                        className="bg-green-500 w-[80px] text-white px-2 py-1 rounded hover:bg-green-600 mr-2"
                      >
                        Approve
                      </button>
                     
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductRequest;
