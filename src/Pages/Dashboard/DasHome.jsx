import React, { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const DasHome = () => {
    const { user } = useContext(AuthContext);
    console.log(user)
  return (
    <div className="max-w-sm mx-auto my-auto mt-10 bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Profile Picture */}
      <div className="relative">
        <img
          src={user?.photoURL || "ArtVault-Logo.png"}
          alt="Profile"
          className="w-full h-40 object-cover opacity-50"
        />
        <div className="absolute inset-x-0 bottom-0 flex justify-center mb-4">
          <img
            src={user?.photoURL || "ArtVault-Logo.png"}
            alt="Avatar"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
          />
        </div>
      </div>

      {/* User Information */}
      <div className="text-center mt-16">
        <h2 className="text-2xl font-bold text-amber-600">
          {user?.displayName}
        </h2>
        <p className="text-amber-600">Email: {user?.email}</p>
       
      </div>

      {/* Social Links */}
      <div className="flex justify-around mt-6 mb-4">
        <a
          href="#"
          className="text-blue-500 hover:text-blue-600 transition duration-300"
        >
          <i className="fab fa-facebook-f"></i>
        </a>
        <a
          href="#"
          className="text-blue-400 hover:text-blue-500 transition duration-300"
        >
          <i className="fab fa-twitter"></i>
        </a>
        <a
          href="#"
          className="text-red-500 hover:text-red-600 transition duration-300"
        >
          <i className="fab fa-instagram"></i>
        </a>
      </div>
    </div>
  );
};

export default DasHome;
