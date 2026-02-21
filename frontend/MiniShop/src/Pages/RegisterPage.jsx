import { LoginBrowserImage, LoginMobileImage, LoginBrowserImage1 } from "../context/loginImage.js"
import { FaBagShopping } from "react-icons/fa6";
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from "react-icons/fi"
import { Link } from "react-router-dom"
import { useState } from "react";
function RegisterPage() {
  const [passwordEye, setPasswordEye] = useState(false)
  const PasswordVisibilityOff = () => {
    setPasswordEye((prev) => !prev)
    console.log("Cliked")
  }
  const PasswordVisibilityOn = () => {
    setPasswordEye((prev) => !prev)
    console.log("Not Cicked")
  }
  const SubmitRegisterDetails = () => {
    
  }
  return (
    <div>
      <div>
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
              <h1 className="text-3xl font-bold text-white">Create Your Account</h1>
            </div>
            <div className="flex items-center bg-white rounded-xl px-3 py-3 shadow-md">
              <FiUser className="text-gray-500 text-xl mr-3" />
              <input
                type="text"
                placeholder="Fullname"
                className="w-full outline-none text-gray-700 font-medium"
              />
            </div>
            <div className="flex items-center bg-white rounded-xl px-3 py-3 shadow-md mt-4">
              <FiMail className="text-gray-500 text-xl mr-3" />
              <input
                type="email"
                placeholder="Email"
                className="w-full outline-none text-gray-700 font-medium"
              />
            </div>
            <div className="flex items-center bg-white rounded-xl px-3 py-3 shadow-md mt-4">
              <div>
              </div>
              <div className="flex justify-cneter items-center">
                <FiLock className="text-gray-500 text-xl mr-3" />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full outline-none text-gray-700 font-medium"
                />
                {!passwordEye && (<button onClick={() => PasswordVisibilityOff()} className="text-sm flex ml-17"><FiEye className="text-gray-500 text-xl mr-1" /></button>)}
                {passwordEye && (<button onClick={() => PasswordVisibilityOn()} className="text-sm flex ml-17"><FiEyeOff className="text-gray-500 text-xl mr-1" /></button>)}

              </div>
            </div>
            <button className="w-full mt-6 bg-sky-600 hover:bg-sky-700 
                          text-white text-lg font-semibold py-3 rounded-xl 
                          transition duration-300 shadow-lg cursor-pointer">
              Register
            </button>
            <div className="mt-5 text-center">
              <span className="text-sm text-blue-100">Already have an account? Click </span>
              <Link to="/login" className="text-sm font-semibold text-yellow-300 hover:underline">
                login
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
                {!passwordEye && (<button onClick={() => PasswordVisibilityOff()} className="text-sm flex ml-17"><FiEye className="text-gray-500 text-xl mr-1" /></button>)}
                {passwordEye && (<button onClick={() => PasswordVisibilityOn()} className="text-sm flex ml-17"><FiEyeOff className="text-gray-500 text-xl mr-1" /></button>)}
              </div>
              <div className="mt-3 flex justify-end items-center">
                <Link to="/forget-password" className="pr-3 text-yellow-300 text-md font-medium">Forget Password? </Link>
              </div>
            </div>
            <button className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-2 rounded-xl shadow-lg hover:scale-105 transition-all duration-200"onClick={SubmitRegisterDetails}>
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
      </div>
    </div>
  )
}

export default RegisterPage
