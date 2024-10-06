import { Link, NavLink, Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { MdOutlineAppShortcut } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import { RiMenuUnfold3Fill, RiMenuUnfold4Fill } from "react-icons/ri";
import { AiFillProduct } from "react-icons/ai";
import { IoIosPeople } from "react-icons/io";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);

  //   console.log(user)
  const [isOpen, setIsOpen] = useState(false);

  const [AllUsers, setAllUsers] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get("https://valt-psi.vercel.app/users");
        setAllUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error); // Handle any errors here
      }
    };
    getData();
  }, []);

  // console.log(AllUsers); // Ensure AllUsers is logged in the console

  const matchUser = AllUsers.find((oneUser) => oneUser.email === user?.email);
  // console.log(matchUser);  // Ensure matchUser is logged in the console

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const sidebarVariants = {
    open: { width: "270px", transition: { duration: 0.3 } },
    closed: { width: "0px", transition: { duration: 0.3 } },
  };

  const buttonVariants = {
    open: { left: "280px", transition: { duration: 0.3 } },
    closed: { left: "20px", transition: { duration: 0.3 } },
  };

  const adminLinks = (
    <>
      <NavLink to="product-request" className="list flex items-center gap-2 ">
        <AiFillProduct className="text-2xl text-start" />
        <p className={`${!isOpen && "hidden"} `}>Product Request</p>
      </NavLink>
      <NavLink to="admin-products" className="list flex items-center gap-2 ">
        <AiFillProduct className="text-2xl text-start" />
        <p className={`${!isOpen && "hidden"} `}>Admin Products</p>
      </NavLink>
      <NavLink
        to="/dashboard/addproducts"
        className="list flex items-center gap-2"
      >
        <MdOutlineAppShortcut className="text-2xl" />
        <p className={`${!isOpen && "hidden"}`}>Add Products</p>
      </NavLink>
      <NavLink to="customar-details" className="list flex items-center gap-2">
        <IoIosPeople className="text-2xl" />
        <p className={`${!isOpen && "hidden"}`}>Customer Details</p>
      </NavLink>
    </>
  );

  const userLinks = (
    <>
      <NavLink to="client-products" className="list flex items-center gap-2 ">
        <AiFillProduct className="text-2xl text-start" />
        <p className={`${!isOpen && "hidden"} `}>Client Products</p>
      </NavLink>
      <NavLink
        to="/dashboard/addproducts"
        className="list flex items-center gap-2"
      >
        <MdOutlineAppShortcut className="text-2xl" />
        <p className={`${!isOpen && "hidden"}`}>Add Products</p>
      </NavLink>
    </>
  );

  return (
    <div>
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className="fixed top-0 left-0 z-10 h-full bg-[#fdf9ff] border-r border-[var(--clr-light-gray)] p-8 flex flex-col items-center"
      >
        {/* Website name */}
        <Link to="/" className="flex items-center gap-2 mb-8">
          <FaHome className="text-3xl text-[var(--clr-secondary)] hover:text-[var(--clr-focussed)]" />
          <h4 className={`${!isOpen && "hidden"}`}>
            <span className="text-[var(--clr-focussed)]">Art</span>Vault
          </h4>
        </Link>

        <ul className="nav-list space-y-6 font-semibold flex-1">
          {matchUser?.role === "admin" ? adminLinks : null}
          {matchUser?.role === "user" ? userLinks : null}
        </ul>

        {/* Logout button with brown background and white text */}
        <div className="font-semibold flex gap-2 items-center bg-brown-600 text-white p-2 rounded-md hover:bg-brown-700 cursor-pointer">
          <TbLogout2 className="text-3xl" />
          <span className={`${isOpen || "hidden"}`}>Logout</span>
        </div>
      </motion.aside>

      {/* Sidebar toggle button */}
      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={buttonVariants}
        className="fixed top-5 z-20 w-[45px] h-[40px] flex justify-center items-center rounded-md bg-[var(--clr-white)] border border-[var(--clr-light-gray)] hover:border-[var(--clr-focussed)] cursor-pointer hover:text-[var(--clr-focussed)]"
        onClick={toggleSidebar}
      >
        {isOpen ? (
          <RiMenuUnfold4Fill className="text-2xl" />
        ) : (
          <RiMenuUnfold3Fill className="text-2xl" />
        )}
      </motion.div>

      <main
        className={`transition-all duration-300 ${
          isOpen ? "ml-[275px]" : "ml-[70px]"
        }`}
      >
        <div className="bg-[#fdf9ff] border-b border-[var(--clr-light-gray)] py-6 px-10 text-center pl-16">
          <h3>Welcome to your dashboard</h3>
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
