import Navbar from "../../components/component1/Navbar"
import PhoneOptions from "../../components/component1/PhoneOptions"
import Footer from "../../components/component1/Footer"
import MobileCatalogue from "../../components/component2/MobileCatalogue"
import Mobiles from "../../components/component2/mobiles"
import DesktopScreenFilterOption from "../../components/component2/DesktopScreenFilterOption"
import { propContext } from "../../context/contextApi"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaUser } from "react-icons/fa"
function MobilePhonesPages() {
  const navigate = useNavigate()
  const { isLoggedIn } = useContext(propContext)
  const imageUrl = "https://res.cloudinary.com/dpbsi7b4y/image/upload/v1775113031/mobileBanner_ea8pp9.png"

  const [filterValue, setFilterValue] = useState({
    Brands: [],
    price: "",
    Storage: [],
    Ram: [],
  })
  return (
    <div>
      {isLoggedIn && <div>
        <Navbar />
        <MobileCatalogue url={imageUrl} />
        <div className="flex w-full min-h-screen border bg-white">
          <DesktopScreenFilterOption setFilterValue={setFilterValue} />
          <Mobiles filterValue={filterValue} />
        </div>
        <PhoneOptions />
        <Footer />
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

export default MobilePhonesPages
