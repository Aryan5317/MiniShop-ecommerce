import { LoginMobileImage, LoginBrowserImage1 } from "../context/loginImage.js"
import { FaBagShopping } from "react-icons/fa6";
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff, } from "react-icons/fi"
import { Link } from "react-router-dom"
import { useState } from "react";
import validation from "../context/errors.js"
import registerService from "../services/registerService.js"

function RegisterPage() {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
  })
  const [errors, setError] = useState({})
  const [formMessage, setFormMessage] = useState(null)
  const [passwordEye, setPasswordEye] = useState(false)

  const Setusername = (e) => {
    const { name, value } = e.target;
    setUserDetails(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const SetEmail = (e) => {
    const { name, value } = e.target
    setUserDetails(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const SetPassword = (e) => {
    const { name, value } = e.target
    setUserDetails(prev => ({
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

  const SubmitRegisterDetails = async () => {
    const validationErrors = validation(userDetails);
    setError(validationErrors)
    if (Object.keys(validationErrors).length === 0) {
      console.log("User Details is: ", userDetails)
      try {
        const registerData = await registerService(userDetails)
        if (registerData) {
          setFormMessage(true)
        }
      }
      catch (err) {
        setFormMessage(false)
        console.log("Error from backend", err)
      }
    }
    else {
      console.log("Error is: ", validationErrors)
      setFormMessage(false)
    }
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
                name="username"
                value={userDetails.username}
                onChange={Setusername}
                className="w-full outline-none text-gray-700 font-medium"
              />
            </div>
            {(errors.username) && <p className="text-sm text-yellow-300 px-3 ">{errors.username}</p>}
            <div className="flex items-center bg-white rounded-xl px-3 py-3 shadow-md mt-4">
              <FiMail className="text-gray-500 text-xl mr-3" />
              <input
                type="email"
                placeholder="Email"
                value={userDetails.email}
                name="email"
                onChange={SetEmail}
                className="w-full outline-none text-gray-700 font-medium"
              />
            </div>
            {(errors.email) && <p className="text-sm text-yellow-300 px-3 ">{errors.email}</p>}
            <div className="flex items-center bg-white rounded-xl px-3 py-3 shadow-md mt-4">
              <div className="flex justify-cneter items-center">
                <FiLock className="text-gray-500 text-xl mr-3" />
                <input
                  type={passwordEye ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={userDetails.password}
                  onChange={SetPassword}
                  className="w-full outline-none text-gray-700 font-medium"
                />
                {!passwordEye && (<button onClick={() => PasswordVisibilityOff()} className="text-sm flex ml-17"><FiEyeOff className="text-gray-500 text-xl mr-1" /></button>)}
                {passwordEye && (<button onClick={() => PasswordVisibilityOn()} className="text-sm flex ml-17"><FiEye className="text-gray-500 text-xl mr-1" /></button>)}
              </div>
            </div>
            {(errors.password) && <p className="text-sm text-yellow-300 px-3 ">{errors.password}</p>}
            <button onClick={() => SubmitRegisterDetails()}
              className="w-full mt-6 bg-sky-600 hover:bg-sky-700 
                          text-white text-lg font-semibold py-3 rounded-xl 
                          transition duration-300 shadow-lg cursor-pointer">
              Register
            </button>
            {(formMessage) ? <p className="text-md px-3 bg-green-800 rounded-md m-1 text-white flex items-center justify-center">Registered Successfully</p> : ""}
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
              <h1 className="text-2xl font-bold text-white">Create your Account</h1>
            </div>

            <div className="mb-5 w-full">
              <div className="flex items-center bg-white rounded-xl px-3 py-3 shadow-md">

                <FiUser className="text-gray-500 text-xl mr-3" />
                <input
                  type="text"
                  placeholder="Fullname"
                  name="username"
                  value={userDetails.username}
                  onChange={Setusername}
                  className="w-full outline-none text-gray-700 font-medium"
                />
              </div>
              {(errors.username) && <p className="text-sm text-yellow-300 px-3 ">{errors.username}</p>}
              <div className="flex items-center bg-white rounded-xl px-3 py-3 shadow-md mt-4">
                <FiMail className="text-gray-500 text-xl mr-3" />
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={userDetails.email}
                  onChange={SetEmail}
                  className="w-full outline-none text-gray-700 font-medium"
                />
              </div>
              {(errors.email) && <p className="text-sm text-yellow-300 px-3 ">{errors.email}</p>}
              <div className="flex items-center bg-white rounded-xl px-3 py-3 shadow-md mt-4">
                <div className="flex justify-cneter items-center">
                  <FiLock className="text-gray-500 text-3xl mr-3" />
                  <input
                    type={passwordEye ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    value={userDetails.password}
                    onChange={SetPassword}
                    className="w-full outline-none text-gray-700 font-medium"
                  />
                  {!passwordEye && (<button onClick={() => PasswordVisibilityOff()} className="text-sm flex ml-17"><FiEyeOff className="text-gray-500 text-xl mr-1" /></button>)}
                  {passwordEye && (<button onClick={() => PasswordVisibilityOn()} className="text-sm flex ml-17"><FiEye className="text-gray-500 text-xl mr-1" /></button>)}
                </div>
              </div>
              {(errors.password) && <p className="text-sm text-yellow-300 px-3 ">{errors.password}</p>}
            </div>

            <button
              onClick={() => SubmitRegisterDetails()}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-2 rounded-xl shadow-lg hover:scale-105 transition-all duration-200" >
              Register
            </button>
            {(formMessage) ? <p className="text-md px-3 bg-green-800 rounded-md m-1 text-white">Registered Successfully</p> : ""}
            <div className="mt-5 text-center">
              <p className="text-gray-200 text-sm">
                Already have an account? Click
                <Link to="/login" className="text-yellow-300 font-semibold ml-1 cursor-pointer">
                  Login
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
