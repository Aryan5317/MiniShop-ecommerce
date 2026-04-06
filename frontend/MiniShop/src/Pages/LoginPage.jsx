import { FaBagShopping } from "react-icons/fa6";
import { FiMail, FiLock, FiEye, FiEyeOff, } from "react-icons/fi"
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import { propContext } from "../context/contextApi.js";
import loginValidation from "../context//verifyAuthentication/loginError.js";
import loginService from "../services/loginService.js";
function LoginPage() {
  const { setIsloggedIn } = useContext(propContext)
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: ""
  })
  const [passwordEye, setPasswordEye] = useState(false)
  const [error, setError] = useState({})
  const [formMessage, setFormMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const SetUserEmail = (e) => {
    const { name, value } = e.target
    setUserDetails((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const SetUserPassword = (e) => {
    const { name, value } = e.target
    setUserDetails((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const PasswordVisibilityOff = () => {
    setPasswordEye((prev) => !prev)
  }

  const PasswordVisibilityOn = () => {
    setPasswordEye((prev) => !prev)
  }

  const verifyUserDetails = async () => {
    setLoading(true)
    const loginValidationError = loginValidation(userDetails)
    setError(loginValidationError)
    if (Object.keys(loginValidationError).length === 0) {
      try {
        console.log("Login User details", userDetails)
        const loginValue = await loginService(userDetails)
        console.log("Login data is: ", loginValue)
        if (loginValue) {
          setFormMessage(true)
          setIsloggedIn(true)
          setTimeout(() => {
            navigate("/home")
          }, 2000)
        }
      }
      catch (err) {
        setFormMessage(false)
        setIsloggedIn(false)
        console.log("Error is: ", err)
        setError((prev) => ({
          ...prev,
          message: err.message
        }))
      }
      finally {
        setLoading(false)
      }
    }
    else {
      console.log("Error is", loginValidationError)
      setFormMessage(false)
    }
  }

  return (
    <div>
      <div>
        <div className="hidden sm:flex relative w-full h-screen items-center justify-center overflow-hidden">
          <img
            src="https://res.cloudinary.com/dpbsi7b4y/image/upload/v1775116708/LoginBrowserImage1_nt0lro.png"
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
              <h1 className="text-3xl font-bold text-white">Welcome Back👋</h1>
              <p className="text-blue-100 mt-2">Login to your account</p>
            </div>

            <div className="flex items-center bg-white rounded-xl px-3 py-3 shadow-md">
              <FiMail className="text-gray-500 text-xl mr-3" />
              <input
                type="email"
                name="email"
                value={userDetails.email}
                onChange={SetUserEmail}
                placeholder="Email"
                className="w-full outline-none text-gray-700 font-medium"
              />
            </div>
            {(error.email) && <p className="text-sm text-yellow-300 px-3">{error.email}</p>}
            <div className="flex items-center bg-white rounded-xl px-3 py-3 shadow-md mt-4">
              <FiLock className="text-gray-500 text-xl mr-3" />
              <input
                type={passwordEye ? "text" : "password"}
                name="password"
                value={userDetails.password}
                onChange={SetUserPassword}
                placeholder="Password"
                className="w-full outline-none text-gray-700 font-medium"
              />
              {(!passwordEye) && <button onClick={() => PasswordVisibilityOff()} className="text-sm flex ml-17" ><FiEyeOff className="text-gray-500 text-xl mr-1 cursor-pointer" /></button>}
              {(passwordEye) && <button onClick={() => PasswordVisibilityOn()} className="text-sm flex ml-17" ><FiEye className="text-gray-500 text-xl mr-1 cursor-pointer" /></button>}
            </div>
            {(error.password) && <p className="text-sm text-yellow-300 px-3 ">{error.password}</p>}

            <div className="flex justify-end mt-3">
              <Link to="/forget-password" className="text-sm text-yellow-300 hover:text-white transition">
                Forgot Password?
              </Link>
            </div>

            <button
              onClick={() => verifyUserDetails()}
              disabled={loading}
              className={`w-full mt-6 bg-sky-600 hover:bg-sky-700 
                       text-white text-lg font-semibold py-3 rounded-xl 
              ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-sky-700 cursor-pointer"}`}>
              {loading ? "Login..." : "Login"}
            </button>
            {(formMessage) ? <p className="text-md px-3 bg-green-800 rounded-md m-1 text-white flex items-center justify-center">Login Successfully</p> : ""}
            {(error.message) && (
              <p className="text-md px-3 bg-red-600 rounded-md m-1 text-white flex justify-center items-center">
                {error.message}
              </p>
            )}
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
            src="https://res.cloudinary.com/dpbsi7b4y/image/upload/v1775116709/LoginMobileImage_zcff3s.png"
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
                  name="email"
                  value={userDetails.email}
                  onChange={SetUserEmail}
                  placeholder="Enter your email"
                  className="w-full bg-transparent outline-none ml-2 text-black"
                />
              </div>
            </div>
            {(error.email) && <p className="text-sm text-yellow-300 px-3">{error.email}</p>}
            <div className="w-full mb-6">
              <div className="flex items-center bg-white rounded-xl px-3 py-2 shadow-md">
                <FiLock className="text-gray-500 text-lg" />
                <input
                  type={passwordEye ? "text" : "password"}
                  name="password"
                  value={userDetails.password}
                  onChange={SetUserPassword}
                  placeholder="Enter your password"
                  className="w-full bg-transparent outline-none ml-2 text-black"
                />
                {(!passwordEye) && <button onClick={() => PasswordVisibilityOff()} className="text-sm flex ml-17" ><FiEyeOff className="text-gray-500 text-xl mr-1 cursor-pointer" /></button>}
                {(passwordEye) && <button onClick={() => PasswordVisibilityOn()} className="text-sm flex ml-17" ><FiEye className="text-gray-500 text-xl mr-1 cursor-pointer" /></button>}
              </div>
              {(error.password) && <p className="text-sm text-yellow-300 px-3 ">{error.password}</p>}
              <div className="mt-3 flex justify-end items-center">
                <Link to="/forget-password" className="pr-3 text-yellow-300 text-md font-medium">Forget Password? </Link>
              </div>
            </div>
            <button
              onClick={() => verifyUserDetails()}
              disabled={loading}
              className={`w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-2 rounded-xl shadow-lg 
              ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-sky-700 cursor-pointer"}`}>
              {loading ? "Login..." : "Login"}
            </button>
            {(formMessage) ? <p className="text-md px-3 bg-green-800 rounded-md m-1 text-white flex items-center justify-center">Login Successfully</p> : ""}
            {(error.message) && (
              <p className="text-md px-3 bg-red-600 rounded-md m-1 text-white flex justify-center items-center">
                {error.message}
              </p>
            )}
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
    </div >
  )
}

export default LoginPage
