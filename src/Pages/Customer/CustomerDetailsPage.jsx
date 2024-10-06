import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import { motion } from "framer-motion";
import Modal from "react-modal";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { AuthContext } from "../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import Timestamp from "react-timestamp";

const customModalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "400px",
    width: "90%",
    padding: "20px",
    borderRadius: "8px",
  },
};

Modal.setAppElement("#root");

function CustomerDetailsPage() {
  const axiosPublic = useAxiosPublic();

  const { data: AllUsers = [] ,refetch} = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPublic.get("/users");
      return res.data;
    },
  });

  console.log(AllUsers);

  const [customerList, setCustomerList] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchCustomerData();
  }, []);

  const fetchCustomerData = () => {
    axiosPublic
      .get("/users")
      .then((res) => {
        setCustomerList(res.data);
      })
      .catch((error) => {
        console.error("Error fetching customer data:", error);
      });
  };

  const handleStatusChange = (id, newStatus) => {
    axiosPublic
      .patch(`/user/${id}`, { status: newStatus })
      .then((res) => {
        if (res.data.success) {
          fetchCustomerData();
          Swal.fire(
            "Success!",
            `Customer status updated to ${newStatus}.`,
            "success"
          );
        }
      })
      .catch((error) => {
        console.error("Error updating status:", error);
        Swal.fire("Error!", "Failed to update customer status.", "error");
      });
  };

  const deleteUser = (id) => {
    console.log(id)
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .delete(`/userdelete/${id}`,)
          .then((res) => {
            if (res.data.success) {
              fetchCustomerData();
              Swal.fire("Deleted!", "Customer has been deleted.", "success");
            }
            refetch();
          })
          .catch((error) => {
            console.error("Error deleting user:", error);
            Swal.fire("Error!", "Failed to delete customer.", "error");
          });
      }
    });
  };

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const filteredCustomers = customerList.filter(
    (customer) => customer.role === "user"
  );

  return (
    <div className="container mx-auto p-4 bg-gray-50">
      <h1 className="text-3xl font-bold mt-4">Customer Listings</h1>
      <div className="py-8">
        {AllUsers.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto"
          >
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal mb-16">
                <thead>
                  <tr>
                    <th className="px-5 py-3 bg-gray-100 border-b text-gray-800 text-left text-sm uppercase font-normal">
                      Customer Name
                    </th>

                    <th className="px-5 py-3 bg-gray-100 border-b text-gray-800 text-left text-sm uppercase font-normal">
                      Email
                    </th>
                    <th className="px-5 py-3 bg-gray-100 border-b text-gray-800 text-left text-sm uppercase font-normal">
                      Join Date
                    </th>

                    <th className="px-5 py-3 bg-gray-100 border-b text-gray-800 text-left text-sm uppercase font-normal">
                      Role
                    </th>

                    <th className="px-5 py-3 bg-gray-100 border-b text-gray-800 text-left text-sm uppercase font-normal">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {AllUsers.map((customer, index) => (
                    <tr key={index} className=" space-y-5 hover:bg-gray-100">
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {customer?.name}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {customer?.email}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          <Timestamp date={customer?.joinDate} />
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {customer?.role}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <button
                              onClick={() => deleteUser(customer?._id)}
                              className="text-red-700 whitespace-no-wrap"
                            >
                              <MdDelete className="text-3xl  hover:text-red-400" />
                            </button>
                          </td>
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        ) : (
          <p className="text-center text-gray-600">No users to display.</p>
        )}
      </div>

      {/* Modal for displaying the full profile picture */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customModalStyles}
        contentLabel="Profile Picture Modal"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">Profile Picture</h2>
          <button onClick={closeModal} className="text-red-500">
            X
          </button>
        </div>
        <div className="flex justify-center mt-4">
          <img
            src={selectedImage}
            className="rounded-lg max-w-full h-auto"
            alt="Profile"
          />
        </div>
      </Modal>
    </div>
  );
}

export default CustomerDetailsPage;
