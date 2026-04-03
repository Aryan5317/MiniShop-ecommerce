import Navbar from "../components/component1/Navbar"
import PhoneOptions from "../components/component1/PhoneOptions"
import logOutService from "../services/logOutService";
import { useNavigate } from "react-router-dom";
import { propContext } from "../context/contextApi";
import { FiEdit2, FiMapPin, FiLogOut } from "react-icons/fi";
import { useState, useContext } from "react";
import { FaUser } from "react-icons/fa"

function AccountPage() {
  const { setIsloggedIn, isLoggedIn } = useContext(propContext);
  const [error, setError] = useState("")
  const navigate = useNavigate();
  const updateDetails = () => {
    navigate("/profile/update-details")
  }
  const logoutUser = async () => {
    if (isLoggedIn) {
      console.log("Log out button is clicked");
      try {
        const resposneData = await logOutService()
        console.log("Response is: ", resposneData)
        if (resposneData) {
          setIsloggedIn(false)
          setTimeout(() => {
            navigate("/")
          }, 1000)
        }
      } catch (error) {
        console.log("Error came from backend logout code is: ", error)
        setError(error.message)
      }
    }
  }
  const editLocation = () => {
    navigate("/account/update-location")
  }
  return (
    <div>
      {isLoggedIn && <div>
        <Navbar />
        <div className="bg-gray-100 p-4 md:hidden">
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
            <button className="flex items-center justify-between w-full px-5 py-5 active:bg-gray-100 transition" onClick={() => updateDetails()}>
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
                  <FiEdit2 size={20} />
                </div>
                <span className="text-base font-semibold text-gray-700">
                  Edit Details
                </span>
              </div>
            </button>
            <div className="border-t border-gray-100"></div>
            <button className="flex items-center justify-between w-full px-5 py-5 active:bg-gray-100 transition" onClick={() => editLocation()}>
              <div className="flex items-center gap-4">
                <div className="bg-green-100 text-green-600 p-3 rounded-xl">
                  <FiMapPin size={20} />
                </div>
                <span className="text-base font-semibold text-gray-700">
                  Change Location
                </span>
              </div>
            </button>
            <div className="border-t border-gray-100"></div>
            <div>
              <button className="flex items-center justify-between w-full px-5 py-5 active:bg-gray-100 transition" onClick={() => logoutUser()}>
                <div className="flex items-center gap-4">
                  <div className="bg-red-100 text-red-600 p-3 rounded-xl">
                    <FiLogOut size={20} />
                  </div>
                  <span className="text-base font-semibold text-red-600">
                    Log Out
                  </span>
                </div>
              </button>
              <div>
                {error && <p className="text-red-500 text-sm px-4">*{error}</p>}            </div>
            </div>

          </div>

        </div>
        {/* <div className="bg-gray-100 p-4 hidden md:flex justify-center">
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden w-[400px]">
          <button className="flex items-center justify-between w-full px-6 py-6 active:bg-gray-100 transition" onClick={() => updateDetails()}>
            <div className="flex items-center gap-5">
              <div className="bg-blue-100 text-blue-600 p-4 rounded-xl">
                <FiEdit2 size={24} />
              </div>
              <span className="text-lg font-semibold text-gray-700">
                Edit Details
              </span>
            </div>
          </button>
          <div className="border-t border-gray-100"></div>
          <button className="flex items-center justify-between w-full px-6 py-6 active:bg-gray-100 transition">
            <div className="flex items-center gap-5">
              <div className="bg-green-100 text-green-600 p-4 rounded-xl">
                <FiMapPin size={24} />
              </div>
              <span className="text-lg font-semibold text-gray-700">
                Change Location
              </span>
            </div>
          </button>
          <div className="border-t border-gray-100"></div>
          <div>
            <button className="flex items-center justify-between w-full px-6 py-6 active:bg-gray-100 transition" onClick={() => logoutUser()}>
              <div className="flex items-center gap-5">
                <div className="bg-red-100 text-red-600 p-4 rounded-xl">
                  <FiLogOut size={24} />
                </div>
                <span className="text-lg font-semibold text-red-600">
                  Log Out
                </span>
              </div>
            </button>
            <div>
              {error && <p className="text-red-500 text-sm px-4">*{error}</p>}
            </div>
          </div>
        </div>
      </div> */}
        <PhoneOptions />
      </div>}
      {!isLoggedIn && (
        <div>
          <div className="flex flex-col md:hidden min-h-screen bg-gray-100 items-center justify-center px-6">
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8 flex flex-col items-center gap-5 w-full max-w-sm">
              <div className="bg-sky-100 text-sky-600 p-5 rounded-full">
                <FaUser size={40} />
              </div>
              <div className="flex flex-col items-center gap-1">
                <h3 className="font-bold text-xl text-gray-800">Sign in to continue</h3>
                <p className="text-sm text-gray-500 text-center">Please sign in or create an account to access this page</p>
              </div>
              <button
                onClick={() => navigate("/login")}
                className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 rounded-xl transition duration-300 shadow-md">
                Sign In
              </button>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-500">Don't have an account?</p>
                <button onClick={() => navigate("/register")} className="text-sm font-semibold text-sky-600 hover:underline">Register</button>
              </div>
            </div>
            <PhoneOptions />
          </div>
          <div className="hidden md:flex flex-col min-h-screen bg-gray-100">
            <Navbar />
            <div className="flex items-center justify-center flex-1 px-8 py-16">
              <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-10 flex flex-col items-center gap-6 w-[450px]">
                <div className="bg-sky-100 text-sky-600 p-6 rounded-full">
                  <FaUser size={50} />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <h3 className="font-bold text-2xl text-gray-800">Sign in to continue</h3>
                  <p className="text-base text-gray-500 text-center">Please sign in or create an account to access this page</p>
                </div>
                <button
                  onClick={() => navigate("/login")}
                  className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 rounded-xl transition duration-300 shadow-md text-lg">
                  Sign In
                </button>
                <div className="flex items-center gap-2">
                  <p className="text-base text-gray-500">Don't have an account?</p>
                  <button onClick={() => navigate("/register")} className="text-base font-semibold text-sky-600 hover:underline">Register</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AccountPage
