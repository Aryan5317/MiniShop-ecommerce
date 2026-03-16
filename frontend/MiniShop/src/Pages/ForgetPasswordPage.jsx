import { LoginBrowserImage1, LoginMobileImage } from "../context/handlingImages/loginImage.js"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FiMail, FiLock } from "react-icons/fi"
import verifyEmailService from "../services/verifyEmailService.js"
import verifyOtpService from "../services/verifyOtpService.js"
function ForgetPasswordPage() {
  const [forgetDetails, setForgetDetails] = useState({
    email: "",
    otp: "",
  })
  const [verifyEmail, setVerifyEmail] = useState(false)
  const [error, setError] = useState({})
  const [otpVerificationMessage, SetotpVerificationMessage] = useState(false)
  const navigate = useNavigate()

  const SetUserEmail = (e) => {
    const { name, value } = e.target;
    setForgetDetails((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const otpValue = (e) => {
    const { name, value } = e.target
    setForgetDetails((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  const verifyEmailDetails = async () => {
    const isEmail = /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(forgetDetails.email);
    if (!isEmail) {
      const emailError = "*Enter valid email id ends with @gmail.com"
      setError((prev) => ({
        ...prev,
        email: emailError
      }))
    }
    else {
      try {
        const emailVerification = await verifyEmailService(forgetDetails.email)
        console.log("Data recived from backend is: ", emailVerification)
        setVerifyEmail(true)
      }
      catch (err) {
        console.log("Error from backend for verifying email is: ", err)
        setError((prev) => ({
          ...prev,
          message: err.message
        }))
        setVerifyEmail(false)
      }
    }
  }

  const verifyOtpDetails = async () => {
    console.log("Otp is: ", forgetDetails.otp)
    if (!forgetDetails.otp) {
      setError((prev) => ({
        ...prev,
        otp: "*Otp field can not be empty"
      }))
    }
    else if (forgetDetails.otp.length != 6) {
      setError((prev) => ({
        ...prev,
        otp: "*Enter correct Otp"
      }))
    }
    else {
      console.log("Otp matched successfully")
      try {
        const otpVerification = await verifyOtpService(forgetDetails)
        console.log("Otp verification message is: ", otpVerification)
        SetotpVerificationMessage(true)
        setTimeout(() => {
          navigate("/reset-password")
        }, 2000)
      }
      catch (err) {
        console.log("Err is: ", err)
        setError((prev) => ({
          ...prev,
          message: err.message
        }))
        SetotpVerificationMessage(false)

      }
    }
  }
  return (
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
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white">Forget Password</h1>
          </div>

          <div className="flex items-center bg-white rounded-xl px-3 py-3 shadow-md">
            <FiMail className="text-gray-500 text-xl mr-3" />
            <input
              type="email"
              name="email"
              value={forgetDetails.email}
              onChange={SetUserEmail}
              placeholder="Email"
              readOnly={(verifyEmail) ? true : false}
              className="w-full outline-none text-gray-700 font-medium"
            />
          </div>
          {(error.email) && <p className="text-sm text-yellow-300 px-3">{error.email}</p>}
          {!verifyEmail && (<button
            onClick={() => verifyEmailDetails()}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-3 mt-3 rounded-xl shadow-lg hover:scale-105 transition-all duration-200">
            Verify Email
          </button>)}
          {(error.message) && (
            <p className="text-md px-3 bg-red-600 rounded-md m-1 text-white flex justify-center items-center">
              {error.message}
            </p>
          )}
          {verifyEmail && (
            <>
              <div className="w-full mb-5">
                <div className="flex items-center bg-white rounded-xl px-3 py-3 shadow-md mt-5">
                  {<FiLock className="text-gray-500 text-lg" />}
                  <input
                    type="text"
                    name="otp"
                    value={forgetDetails.otp}
                    onChange={otpValue}
                    placeholder="Otp"
                    className="w-full outline-none text-gray-700 font-medium px-3"
                  />
                </div>
              </div>
              <button
                onClick={() => verifyOtpDetails()}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-2 rounded-xl shadow-lg hover:scale-105 transition-all duration-200">
                Verify OTP
              </button>
              {(error.otp) && (
                <p className="text-md px-3 bg-red-600 rounded-md m-1 text-white flex justify-center items-center">
                  {error.otp}
                </p>
              )}
              {(otpVerificationMessage) ? <p className="text-md px-3 bg-green-800 rounded-md m-1 text-white flex items-center justify-center">Otp Verified</p> : ""}
            </>
          )}
        </div>

      </div>
      <div className="md:hidden relative flex justify-center items-center w-screen h-screen overflow-hidden">
        <img
          src={LoginMobileImage}
          alt="Login Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <div className="relative z-10 w-[90%] max-w-sm bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-6 flex flex-col items-center">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-white">Forget Password</h1>
          </div>
          <div className="w-full mb-5">
            <div className="flex items-center bg-white rounded-xl px-3 py-2 shadow-md">
              {<FiMail className="text-gray-500 text-lg" />}
              <input
                type="email"
                name="email"
                value={forgetDetails.email}
                onChange={SetUserEmail}
                placeholder="Enter your email"
                readOnly={(verifyEmail) ? true : false}
                className="w-full bg-transparent outline-none ml-2 text-black"
              />
            </div>
            {(error.email) && <p className="text-sm text-yellow-300 px-3">{error.email}</p>}
          </div>
          {!verifyEmail && (<button
            onClick={() => verifyEmailDetails()}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-2 rounded-xl shadow-lg hover:scale-105 transition-all duration-200">
            Verify Email
          </button>)}
          {(error.message) && (
            <p className="text-md px-3 bg-red-600 rounded-md m-1 text-white flex justify-center items-center">
              {error.message}
            </p>
          )}
          {verifyEmail && (
            <>
              <div className="w-full mb-5">
                <div className="flex items-center bg-white rounded-xl px-3 py-2 shadow-md ">
                  {<FiLock className="text-gray-500 text-lg " />}
                  <input
                    type="text"
                    name="otp"
                    value={forgetDetails.otp}
                    onChange={otpValue}
                    placeholder="Otp"
                    className="w-full outline-none text-gray-700 font-medium px-3"
                  />
                </div>
              </div>

              <button
                onClick={() => verifyOtpDetails()}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-2 rounded-xl shadow-lg hover:scale-105 transition-all duration-200">
                Verify OTP
              </button>
              {(error.otp) && (
                <p className="text-md px-3 bg-red-600 rounded-md m-1 text-white flex justify-center items-center">
                  {error.otp}
                </p>
              )}
              {(otpVerificationMessage) ? <p className="text-md px-3 bg-green-800 rounded-md m-1 text-white flex items-center justify-center">Otp Verified</p> : ""}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ForgetPasswordPage
