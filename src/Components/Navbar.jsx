import { useState, useRef, useEffect, useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';
import logo from '../../public/ArtVault-Logo.png';
import { Link, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { FaArrowLeft } from 'react-icons/fa';


const Navbar = () => {
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);
  const modalRef = useRef(null);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [name, setName] = useState('');

  
  const axiosPublic = useAxiosPublic()

  const { data: AllUsers = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPublic.get("/users");
      return res.data;
    },
  });

  const { user, logOut, googleLogin, createUser, signIn, updateUserProfile } = useContext(AuthContext);

  

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUser(email, password);
      await updateUserProfile(name, photoUrl);
      Swal.fire({
        title: 'Signup Successful',
        text: 'You have successfully signed up.',
        icon: 'success',
        confirmButtonText: 'OK',

      });
      const userInfo = {
        name: name,
        email: email,
        role: "user",
        joinDate: new Date().toISOString().split('T')[0],
      };
      axiosPublic.post("/users", userInfo).then((res) => {
        navigate("/");
      });
     
    } catch (err) {
      Swal.fire({
        title: 'Signup Failed',
        text: err.message,
        icon: 'error',
        confirmButtonText: 'OK',

      });
    }
  };

  // console.log(user)

  const handelLogout = () => {

    logOut()

  }



 

  const handleGoogleSignIn = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;

       
        const findEmail = AllUsers.find(
          (user) => user?.email === result?.user?.email
        );
        if (findEmail) {
          Swal.fire({
                  title: 'Signup Successful',
                  text: 'You have successfully signed up.',
                  icon: 'success',
                  confirmButtonText: 'OK'
                });
          
               setIsModalOpen(false);
        } else {
          const userInfo = {
            name: result?.user?.displayName,
            email: result?.user?.email,
            role: "user",
            joinDate: new Date().toISOString().split('T')[0],
          };

          axiosPublic.post("/users", userInfo).then((res) => {
            navigate("/"); 
          });
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      Swal.fire({
        title: 'Login Successful',
        text: 'You have successfully logged in.',
        icon: 'success',
        confirmButtonText: 'OK',

      });
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      Swal.fire({
        title: 'Login Failed',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
        setIsFormModalOpen(false);
      }
    };

    if (isModalOpen || isFormModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen, isFormModalOpen]);

  const handleLoginSignup = (isLogin) => {
    setIsLoginForm(isLogin);
    setIsModalOpen(false);
    setIsFormModalOpen(true);
  };

  const handleGoBack = () => {
    setIsFormModalOpen(false);
    setIsModalOpen(true);
  };

  const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

  return (
    <div>
      <header
        className={` border-b-1 fixed top-0  z-20 w-full rounded-b-3xl ${
          scrolled ? "bg-white/80" : "bg-white/40"
        } shadow-lg shadow-slate-700/5 lg:backdrop-blur-sm`}
      >
        <div className="relative mx-auto max-w-full px-6 lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[96rem]">
          <nav
            aria-label="main navigation"
            className="flex items-center justify-between h-[5.5rem]"
            role="navigation"
          >
            <a
              id="WindUI"
              aria-label="WindUI logo"
              className="flex items-center gap-2 text-lg"
              href="/"
            >
              <img src={logo} className="w-[170px]" alt="" />
            </a>
            <div className="flex-1 hidden lg:flex justify-center space-x-10">
              <a href="/" className="text-black hover:text-amber-800 font-bold">
                Home
              </a>
              <a
                href="/contact"
                className="text-black hover:text-amber-800 font-bold"
              >
                Contact
              </a>

              <Link to="/all-products" className="text-black hover:text-amber-800 font-bold">
                All Products
              </Link>

              {user ? (
                <a
                  href="/dashboard/addproducts"
                  className="text-black hover:text-amber-800 font-bold"
                >
                  Be a Vendor
                </a>
              ) : (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="text-black hover:text-amber-800 font-bold"
                >
                  Be a Vendor
                </button>
              )}
              {user && (
                <a
                  href="dashboard"
                  className="text-black hover:text-amber-800 font-bold"
                >
                  Dashboard
                </a>
              )}
            </div>
            <div className="md:flex items-center">
              <div className="md:block hidden">
                {!user ? (
                  <>
                    <button
                      className="bg-[#8B4513] text-white py-2 px-6 rounded-lg hover:bg-[#5a2c0b] hover:delay-300 "
                      onClick={() => setIsModalOpen(true)}
                    >
                      Sign Up/Login
                    </button>
                  </>
                ) : (
                  <button
                    className="bg-[#8B4513] text-white py-2 px-6 rounded-lg hover:bg-[#5a2c0b] hover:delay-300 "
                    onClick={() => handelLogout()}
                  >
                    Logout
                  </button>
                )}
              </div>

              <button
                className="block lg:hidden ml-4"
                onClick={() => setIsToggleOpen(!isToggleOpen)}
                aria-expanded={isToggleOpen ? "true" : "false"}
                aria-label="Toggle navigation"
              >
                <div className="w-6 h-6 flex flex-col justify-between items-center">
                  <span
                    className={`block h-0.5 w-8 bg-slate-900 transition-transform ${
                      isToggleOpen ? "rotate-45" : ""
                    }`}
                  ></span>
                  <span
                    className={`block h-0.5 w-8 bg-slate-900 transition-opacity ${
                      isToggleOpen ? "opacity-0" : "opacity-100"
                    }`}
                  ></span>
                  <span
                    className={`block h-0.5 w-8 bg-slate-900 transition-transform ${
                      isToggleOpen ? "-rotate-45" : ""
                    }`}
                  ></span>
                </div>
              </button>
            </div>
          </nav>
          {isToggleOpen && (
            <div className="absolute left-0 top-16 z-10 w-full bg-white shadow-lg lg:hidden">
              <div className="flex flex-col items-center space-y-4 py-4">
                <a href="/" className="text-gray-700 hover:text-emerald-500">
                  Home
                </a>
                <a
                  href="/contact"
                  className="text-gray-700 hover:text-emerald-500"
                >
                  Contact
                </a>
                {user ? (
                  <a
                    href="/dashboard/addproducts"
                    className="text-gray-700 hover:text-emerald-500"
                  >
                    Be a Vendor
                  </a>
                ) : (
                  <a
                    onClick={() => setIsModalOpen(true)}
                    className="cursor-pointer text-gray-700 hover:text-emerald-500"
                  >
                    Be a Vendor
                  </a>
                )}
                {user && (
                  <a
                    href="dashboard"
                    className="text-gray-700 hover:text-emerald-500"
                  >
                    Dashboard
                  </a>
                )}
                {!user ? (
                  <>
                    <button
                      className="bg-[#8B4513] text-white py-2 px-6 rounded-lg hover:bg-[#5a2c0b] hover:delay-300 "
                      onClick={() => setIsModalOpen(true)}
                    >
                      Sign Up/Login
                    </button>
                  </>
                ) : (
                  <button
                    className="bg-[#8B4513] text-white py-2 px-6 rounded-lg hover:bg-[#5a2c0b] hover:delay-300 "
                    onClick={() => handelLogout()}
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {isModalOpen && (
        <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div
            ref={modalRef}
            className="relative bg-white p-6 rounded-lg shadow-lg w-96"
          >
            <button
              className="absolute top-3 right-3 text-gray-600"
              onClick={() => setIsModalOpen(false)}
            >
              X
            </button>
            <h2 className="text-xl font-semibold mb-4">
              Login / Sign Up &rarr;
            </h2>
            <button
              onClick={handleGoogleSignIn}
              className="bg-amber-600 text-white py-2 px-4 rounded-lg w-full mb-3"
            >
              Login with Google
            </button>
            <button className="bg-amber-800 text-white py-2 px-4 rounded-lg w-full mb-6">
              Login with Facebook
            </button>
            <div className="flex gap-4 justify-between mt-4">
              <button
                className="bg-[#8B4513] hover:bg-[#3f200a] text-white py-2 px-4 rounded-lg w-full"
                onClick={() => handleLoginSignup(true)}
              >
                Login
              </button>
              <button
                className="bg-[#8B4513] hover:bg-[#3f200a] text-white py-2 px-4 rounded-lg w-full"
                onClick={() => handleLoginSignup(false)}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}

      {isFormModalOpen && (
        <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div
            ref={modalRef}
            className="relative bg-white p-6 rounded-lg shadow-lg w-96"
          >
            <button
              className="absolute top-3 right-3 text-gray-600"
              onClick={() => setIsFormModalOpen(false)}
            >
              X
            </button>
            <h2 className="text-xl font-semibold mb-4">
              {isLoginForm ? "Login" : "Sign up"}
            </h2>
            {isLoginForm && (
              <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border p-2 rounded-md text-black"
                />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border p-2 rounded-md text-black"
                />
                <button
                  type="submit"
                  className="bg-[#8B4513] hover:bg-[#3f200a] text-white py-2 px-4 rounded-lg w-full"
                >
                  Login
                </button>
              </form>
            )}
            {!isLoginForm && (
              <form className="flex flex-col gap-4" onSubmit={handleSignup}>
                <input
                  type="text"
                  required
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border p-2 rounded-md text-black"
                />
                <input
                  type="email"
                  required
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border p-2 rounded-md text-black"
                />
                <input
                  type="password"
                  required
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border p-2 rounded-md text-black"
                />
                <input
                  type="text"
                  placeholder="Photo URL"
                  required
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="border p-2 rounded-md text-black"
                />
                <button
                  type="submit"
                  className="bg-[#8B4513] hover:bg-[#3f200a] text-white py-2 px-4 rounded-lg w-full"
                >
                  Sign Up
                </button>
              </form>
            )}
            <div className="flex justify-center mt-4 ">
              <button
                onClick={handleGoBack}
                className=" bg-[#8B4513] hover:bg-[#3f200a] text-white p-2 flex gap-1 items-center rounded-full"
              >
                <FaArrowLeft />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
