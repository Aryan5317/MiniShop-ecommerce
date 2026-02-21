import { LoginBrowserImage, LoginMobileImage, LoginBrowserImage1 } from "../context/loginImage.js"
import { FaBagShopping } from "react-icons/fa6";
import { FiMail, FiLock } from "react-icons/fi"
import { Link } from "react-router-dom"
function LoginPage() {
  return (
    <div>
      <div>
        {/* <div className="hidden sm:block">
          <img
            src={LoginBrowserImage1}
            alt="Login Background"
            className="w-full h-full object-cover absolute"
          />
          <div className="absolute flex flex-col justify-center mt-15 ml-41 ">
            <div className="flex p-1 justify-start items-center px-3">
              <h3 className="text-white font-bold text-3xl pr-3"><FaBagShopping /></h3>
              <h3 className="text-white font-bold text-3xl">Mini</h3>
              <h3 className="text-yellow-300 font-bold text-3xl">Shop</h3>
            </div>
            <div className="flex flex-col justify-center items-start mt-11">
              <h1 className="text-4xl font-bold text-white px-3">Welcome Back!</h1>
              <h3 className="text-xl font-semibold text-blue-100 px-3 mt-5">Login to your account</h3>
            </div>
            <div className="w-[25vw] mt-7 flex justify-left items-center bg-white rounded-lg">
              <h3 className="text-xl font-semibold pl-3 text-black"><FiMail /></h3>
              <input type="email" name="" id="" placeholder="Email: " className="rounded-lg outline-none w-full min-h-[45px] pr-3 px-2 text-xl font-medium text-gray-600" />
            </div>
            <div className="w-[25vw] mt-5 flex justify-left items-center bg-white rounded-lg">
              <h3 className="text-xl font-semibold pl-3 text-black"><FiLock /></h3>
              <input type="text" name="" id="" placeholder="Password: " className="rounded-lg outline-none w-full min-h-[45px] pr-3 px-2 text-xl font-medium text-gray-600" />
            </div>
            <div className=" flex justify-end items-center mt-3">
              <a href="#" className="pr-3 text-md font-medium text-blue-100">Forget Password? </a>
            </div>
            <div className="w-full mt-5 flex justify-center items-center bg-blue-600 p-1 rounded-xl">
              <button className="text-white text-2xl px-3 rounded-xl">Login</button>
            </div>
            <div className="mt-3 flex justify-center items-center p-1">
              <h3 className="text-lg font-small px-1 text-white">Don't have an account?</h3>
              <a href="#" className="text-lg font-semibold text-blue-100">Sign Up</a>
            </div>
          </div>
        </div> */}

        <div className="hidden sm:flex relative w-full h-screen items-center justify-center overflow-hidden">
          <img
            src={LoginBrowserImage1}
            alt="Login Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
          <div className="relative z-10 w-[90%] md:w-[400px] bg-white/10 backdrop-blur-lg 
                  border border-white/20 rounded-2xl shadow-2xl p-8">
            <div className="flex items-center mb-8">
              <FaBagShopping className="text-white text-3xl mr-3" />
              <h3 className="text-white font-bold text-3xl">Mini<span className="text-yellow-300">Shop</span></h3>
            </div>
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-white">Welcome Back!</h1>
              <p className="text-blue-100 mt-2">Login to your account</p>
            </div>

            <div className="flex items-center bg-white rounded-xl px-3 py-3 shadow-md">
              <FiMail className="text-gray-500 text-xl mr-3" />
              <input
                type="email"
                placeholder="Email"
                className="w-full outline-none text-gray-700 font-medium"
              />
            </div>
            <div className="flex items-center bg-white rounded-xl px-3 py-3 shadow-md mt-4">
              <FiLock className="text-gray-500 text-xl mr-3" />
              <input
                type="password"
                placeholder="Password"
                className="w-full outline-none text-gray-700 font-medium"
              />
            </div>

            <div className="flex justify-end mt-3">
              <Link to="/forget-password" className="text-sm text-yellow-300 hover:text-white transition">
                Forgot Password?
              </Link>
            </div>

            <button className="w-full mt-6 bg-sky-600 hover:bg-sky-700 
                       text-white text-lg font-semibold py-3 rounded-xl 
                       transition duration-300 shadow-lg">
              Login
            </button>
            <div className="mt-5 text-center">
              <span className="text-sm text-blue-100">Don't have an account? </span>
              <Link to="/register" className="text-sm font-semibold text-yellow-300 hover:underline">
                Sign Up
              </Link>
            </div>
          </div>
        </div>

      </div>
      <div>
        <div className="md:hidden relative flex justify-center items-center w-screen h-screen overflow-hidden">
          <img
            src={LoginMobileImage}
            alt="Login Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          <div className="relative z-10 w-[90%] max-w-sm bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-6 flex flex-col items-center">
            <div className="flex items-center mb-6">
              <FaBagShopping className="text-white text-3xl mr-2" />
              <h3 className="text-white font-bold text-3xl">
                Mini<span className="text-yellow-300">Shop</span>
              </h3>
            </div>
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-white">Welcome Back 👋</h1>
              <p className="text-sm text-gray-200 mt-1">
                Login to your account
              </p>
            </div>
            <div className="w-full mb-4">
              <div className="flex items-center bg-white rounded-xl px-3 py-2 shadow-md">
                <FiMail className="text-gray-500 text-lg" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-transparent outline-none ml-2 text-black"
                />
              </div>
            </div>
            <div className="w-full mb-6">
              <div className="flex items-center bg-white rounded-xl px-3 py-2 shadow-md">
                <FiLock className="text-gray-500 text-lg" />
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full bg-transparent outline-none ml-2 text-black"
                />
              </div>
              <div className="mt-3 flex justify-end items-center">
                <Link to="/forget-password" className="pr-3 text-yellow-300 text-md font-medium">Forget Password? </Link>
              </div>
            </div>
            <button className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-2 rounded-xl shadow-lg hover:scale-105 transition-all duration-200">
              Login
            </button>
            <div className="mt-5 text-center">
              <p className="text-gray-200 text-sm">
                Don't have an account?
                <Link to="/register" className="text-yellow-300 font-semibold ml-1 cursor-pointer">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* <div className="md:hidden flex justify-center">
        <div className="absolute flex flex-col mt-3 justify-center items-center p-1 px-3">
          <div className="flex p-1 justify-center items-center px-3">
            <h3 className="text-white font-bold text-3xl pr-2"><FaBagShopping /></h3>
            <h3 className="text-white font-bold text-3xl">Mini</h3>
            <h3 className="text-yellow-300 font-bold text-3xl">Shop</h3>
          </div>
          <div className="flex flex-col justify-center items-center mt-3">
            <h1 className="text-3xl font-bold text-white px-3">Welcome Back!</h1>
            <h3 className="text-xl font-semibold text-white px-1">Login to your account</h3>
          </div>
          <div className="w-full mt-5 flex justify-left items-center bg-white rounded-lg">
            <h3 className="text-xl font-semibold pl-3 text-black"><FiMail /></h3>
            <input type="email" name="" id="" placeholder="Email: " className="rounded-lg outline-none w-full min-h-[45px] pr-3 px-2 text-xl font-medium text-gray-600" />
          </div>
          <div className="w-full mt-5 flex justify-left items-center bg-white rounded-lg">
            <h3 className="text-xl font-semibold pl-3 text-black"><FiLock /></h3>
            <input type="text" name="" id="" placeholder="Password: " className="rounded-lg outline-none w-full min-h-[45px] pr-3 px-2 text-xl font-medium text-gray-600" />
          </div>
          <div className="w-full mt-6 flex justify-center items-center bg-blue-600 p-1 rounded-xl">
            <button className="text-white text-2xl px-3 rounded-xl">Login</button>
          </div>
          <div className="mt-3 flex justify-center items-center p-1">
            <h3 className="text-lg font-small px-1 text-black">Don't have an account?</h3>
            <a href="#" className="text-lg font-semibold px-1 text-sky-600">Sign Up</a>
          </div>

        </div>
        <div className="w-screen h-screen overflow-hidden">
          <img src={LoginMobileImage} alt="Login Background" className="w-full h-full object-cover" />
        </div>
      </div> */}
      </div>
    </div>
  )
}

export default LoginPage
