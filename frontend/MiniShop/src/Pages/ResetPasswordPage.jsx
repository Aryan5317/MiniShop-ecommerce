import { FiLock, FiEye, FiEyeOff } from "react-icons/fi"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import resetPassword from "../context/verifyAuthentication/resetPassword.js"
import resetPasswordService from "../services/resetPasswordService.js"
function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState({
    password: "",
    confirmPassword: "",
  })
  const [passwordEye, setPasswordEye] = useState(false)
  const [confirmPasswordEye, setConfirmpasswordEye] = useState(false)
  const [errors, setErrors] = useState({})
  const [formMessage, setFormMessage] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const SetPassword = (e) => {
    const { name, value } = e.target
    setNewPassword((prev) => ({
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

  const Password2VisibilityOff = () => {
    setConfirmpasswordEye((prev) => !prev)
  }
  const Password2VisibilityOn = () => {
    setConfirmpasswordEye((prev) => !prev)
  }

  const updateChangePassword = async () => {
    setLoading(true)
    const validationError = await resetPassword(newPassword)
    console.log("Validation Error: ", validationError)
    setErrors(validationError)
    if (Object.keys(validationError).length === 0) {
      console.log("New Password is: ", newPassword)
      try {
        const passwordUpate = await resetPasswordService(newPassword)
        console.log("Password Updated: ", passwordUpate)
        if (passwordUpate) {
          setFormMessage(true)
          setTimeout(() => {
            navigate("/login")
          }, 3000)
        }
      }
      catch (err) {
        setFormMessage(false)
        console.log("Error came from backend is: ", err.message)
        setErrors((prev) => ({
          ...prev,
          message: err.message
        }))
      }
      finally {
        setLoading(false);
      }
    }
    else {
      console.log("Errros is: ", validationError)
      setFormMessage(false)
      setLoading(false)
    }
  }

  useEffect(() => {
    console.log("Errors are: ", errors.password)
  }, [errors, setErrors])


  return (
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
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white">Reset Password</h1>
          </div>
          <div className="flex items-center bg-white rounded-xl px-3 py-3 shadow-md mt-4">
            <div className="flex justify-cneter items-center">
              <FiLock className="text-gray-500 text-3xl mr-3" />
              <input
                type={passwordEye ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={newPassword.password}
                onChange={SetPassword}
                className="w-full outline-none text-gray-700 font-medium"
              />
              {!passwordEye && (<button onClick={() => PasswordVisibilityOff()} className="text-sm flex ml-17"><FiEyeOff className="text-gray-500 text-xl mr-1 cursor-pointer" /></button>)}
              {passwordEye && (<button onClick={() => PasswordVisibilityOn()} className="text-sm flex ml-17"><FiEye className="text-gray-500 text-xl mr-1 cursor-pointer" /></button>)}
            </div>
          </div>
          {(errors.password) && <p className="text-sm text-yellow-300 px-3 ">{errors.password}</p>}
          <div className="flex items-center bg-white rounded-xl px-3 py-3 shadow-md mt-4">
            <div className="flex justify-cneter items-center">
              <FiLock className="text-gray-500 text-3xl mr-3" />
              <input
                type={confirmPasswordEye ? "text" : "password"}
                placeholder="Confirm Password"
                name="confirmPassword"
                value={newPassword.confirmPassword}
                onChange={SetPassword}
                className="w-full outline-none text-gray-700 font-medium"
              />
              {!confirmPasswordEye && (<button onClick={() => Password2VisibilityOff()} className="text-sm flex ml-17"><FiEyeOff className="text-gray-500 text-xl mr-1 cursor-pointer" /></button>)}
              {confirmPasswordEye && (<button onClick={() => Password2VisibilityOn()} className="text-sm flex ml-17"><FiEye className="text-gray-500 text-xl mr-1 cursor-pointer" /></button>)}
            </div>
          </div>
          {(errors.confirmPassword) && <p className="text-sm text-yellow-300 px-3 ">{errors.confirmPassword}</p>}
          <button
            onClick={() => updateChangePassword()}
            disabled={loading}
            className={`w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-2 rounded-xl shadow-lg 
              ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-sky-700 cursor-pointer"}`}>
            {loading ? "Verifying..." : "Verify"}
          </button>
          {formMessage && <p className="text-md px-3 bg-green-800 rounded-md m-1 text-white flex items-center justify-center">Password Reset Successfully</p>}
        </div>
      </div>
      <div className="md:hidden relative flex justify-center items-center w-screen h-screen overflow-hidden">
        <img
          src="https://res.cloudinary.com/dpbsi7b4y/image/upload/v1775116709/LoginMobileImage_zcff3s.png"
          alt="Login Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <div className="relative z-10 w-[90%] max-w-sm bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-6 flex flex-col">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-white">Reset Password</h1>
          </div>
          <div className="flex items-center bg-white rounded-xl px-3 py-3 shadow-md mt-4">
            <div className="flex justify-cneter items-center">
              <FiLock className="text-gray-500 text-3xl mr-3" />
              <input
                type={passwordEye ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={newPassword.password}
                onChange={SetPassword}
                className="w-full outline-none text-gray-700 font-medium"
              />
              {!passwordEye && (<button onClick={() => PasswordVisibilityOff()} className="text-sm flex ml-17"><FiEyeOff className="text-gray-500 text-xl mr-1 cursor-pointer" /></button>)}
              {passwordEye && (<button onClick={() => PasswordVisibilityOn()} className="text-sm flex ml-17"><FiEye className="text-gray-500 text-xl mr-1 cursor-pointer" /></button>)}
            </div>
          </div>
          {(errors.password) && <p className="text-sm text-yellow-300 px-3">{errors.password}</p>}
          <div className="flex items-center bg-white rounded-xl px-3 py-3 shadow-md mt-4">
            <div className="flex justify-cneter items-center">
              <FiLock className="text-gray-500 text-3xl mr-3" />
              <input
                type={confirmPasswordEye ? "text" : "password"}
                placeholder="Confirm Password"
                name="confirmPassword"
                value={newPassword.confirmPassword}
                onChange={SetPassword}
                className="w-full outline-none text-gray-700 font-medium"
              />
              {!confirmPasswordEye && (<button onClick={() => Password2VisibilityOff()} className="text-sm flex ml-17"><FiEyeOff className="text-gray-500 text-xl mr-1" /></button>)}
              {confirmPasswordEye && (<button onClick={() => Password2VisibilityOn()} className="text-sm flex ml-17"><FiEye className="text-gray-500 text-xl mr-1" /></button>)}
            </div>
          </div>
          {(errors.confirmPassword) && <p className="text-sm text-yellow-300 px-3 ">{errors.confirmPassword}</p>}
          <button
            onClick={() => updateChangePassword()}
            disabled={loading}
            className={`w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-2 rounded-xl shadow-lg 
              ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-sky-700 cursor-pointer"}`}>
            {loading ? "Verifying..." : "Verify"}
          </button>
          {formMessage && <p className="text-md px-3 bg-green-800 rounded-md m-1 text-white flex items-center justify-center">Password Reset Successfully</p>}
        </div>
      </div>
    </div >
  )
}

export default ResetPasswordPage
