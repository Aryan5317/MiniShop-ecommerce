import { FiMenu, FiMapPin, FiShoppingCart, FiShoppingBag, FiLogOut, FiEdit2 } from "react-icons/fi";
import { Link } from "react-router-dom"
import { FaUser } from "react-icons/fa"
import { propContext } from "../../context/contextApi";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logOutService from "../../services/logOutService";
import locationService from "../../services/locationService";


function Navbar() {
    const navigate = useNavigate()
    const { isLoggedIn, setIsloggedIn, setStoreInputValue } = useContext(propContext)
    const [inputValue, setInputValue] = useState("")
    const [option, setOption] = useState(false)
    const [error, setError] = useState("")
    const [activeLocation, setActiceLocation] = useState("")
    const [locationFlag, setLocationFlag] = useState(false)
    const SetInputValue = (e) => {
        setInputValue(e.target.value)
        console.log(e.target.value)
    }
    const SetStoreInputValue = (e) => {
        if (e.key === "Enter") {
            setStoreInputValue(inputValue)
        }
    }
    useEffect(() => {
    if (isLoggedIn) {
        const location = async () => {
            try {
                const response = await locationService()
                console.log("Response get from locations is: ", response.data)
                if (response && response.data && response.data.location && response.data.location.length > 0) {
                    let found = false
                    for (let i = 0; i < response.data.location.length; i++) {
                        if (response.data.location[i]._id === response.data.defaultLocation) {
                            setActiceLocation(response.data.location[i].pincode)
                            found = true
                        }
                    }
                    setLocationFlag(found)
                } else {
                    setLocationFlag(false)
                }
            } catch (err) {
                console.log("Location fetch error:", err)
                setLocationFlag(false)
            }
        }
        location()
    } else {
        setLocationFlag(false)
    }
}, [isLoggedIn])  


    const homePage = () => {
        navigate("/home")
    }
    const cartPage = () => {
        navigate("/cart")
    }
    const openMenuOption = () => {
        setOption((prev) => !prev)
    }
    const editProfile = () => {
        navigate("/profile/update-details")
    }
    const editLocation = () => {
        navigate("/account/update-location")
    }
    const orderPage = () => {
        navigate("/order")
    }
    const logoutUser = async () => {
        
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

    return (
        <div className="w-full mb-1 pt-2 pb-2 flex flex-col gap-4 shadow-sm md:flex-row md:items-center md:justify-between bg-blue-200/50 transition-all duration-200 hover:shadow-md">
            <div className="flex items-center justify-between w-full pl-5 md:w-auto">
                <div onClick={() => homePage()}>
                    <h1 className="text-2xl md:text-4xl font-bold text-sky-600 cursor-pointer">
                        MiniShop
                    </h1>
                </div>

                <div className="flex md:hidden flex-row text-md font-semibold">
                    {!isLoggedIn && (<div className="flex justify-center items-center">
                        <h3 className="text-sky-600"><FaUser /></h3>
                        <Link to="/login" className="p-1 rounded-md px-2 text-black">Login</Link>
                    </div>)}
                    <div className="border-gray-300 border"></div>
                    <div className="flex justify-center items-center pr-2" onClick={() => editLocation()}>
                        <h2 className="text-sky-600 px-2"><FiMapPin /></h2>
                        <h2>{(locationFlag) ? activeLocation : "123456"}</h2>
                    </div>
                </div>
            </div>
            <div className="border w-full md:w-1/2 lg:w-1/3 rounded-md">
                <input
                    type="text"
                    value={inputValue}
                    onChange={SetInputValue}
                    onKeyDown={SetStoreInputValue}
                    placeholder="Enter products..."
                    className="w-full rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-600"
                />
            </div>
            <div className="flex hidden md:flex gap-3 font-semibold mr-7 relative">
                {!isLoggedIn && (
                    <div className="flex justify-center items-center">
                        <h3 className="text-sky-600"><FaUser /></h3>
                        <Link to="/login" className="p-1 px-3 rounded-md text-gray-600 text-xl">Sign In/Sign Up</Link>
                    </div>
                )}
                {isLoggedIn && (
                    <div className="flex justify-center items-center cursor-pointer" onClick={() => editLocation()}>
                        <h3 className="text-sky-600 pl-3"><FiMapPin /></h3>
                        <h3 className="p-1 px-3 rounded-md text-gray-600 text-xl">
                            {locationFlag ? activeLocation : "123456"}
                        </h3>
                    </div>
                )}
                <div className="text-2xl flex justify-center items-center cursor-pointer" onClick={() => cartPage()}>
                    <h2 className="text-sky-600 px-2"><FiShoppingCart /></h2>
                    <h2 className="text-gray-600">Cart</h2>
                </div>
                <button className="text-gray-600 text-4xl flex justify-center items-center px-3 cursor-pointer" onClick={() => openMenuOption()}>
                    <FiMenu />
                </button>
                {option && (
                    <div className="absolute top-16 right-4 z-50 bg-white rounded-2xl shadow-xl border border-gray-100 w-56 overflow-hidden">
                        <button className="flex items-center gap-3 w-full px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition duration-150" onClick={() => editProfile()}>
                            <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                                <FiEdit2 size={16} />
                            </div>
                            Edit Profile
                        </button>
                        <div className="border-t border-gray-100"></div>
                        <button className="flex items-center gap-3 w-full px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition duration-150" onClick={() => orderPage()}>
                            <div className="bg-yellow-100 text-yellow-600 p-2 rounded-lg">
                                <FiShoppingBag size={16} />
                            </div>
                            Orders
                        </button>
                        <div className="border-t border-gray-100"></div>
                        <button className="flex items-center gap-3 w-full px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition duration-150" onClick={() => editLocation()}>
                            <div className="bg-green-100 text-green-600 p-2 rounded-lg">
                                <FiMapPin size={16} />
                            </div>
                            Edit Location
                        </button>
                        <div className="border-t border-gray-100"></div>
                        <button className="flex items-center gap-3 w-full px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 transition duration-150" onClick={() => logoutUser()}>
                            <div className="bg-red-100 text-red-600 p-2 rounded-lg">
                                <FiLogOut size={16} />
                            </div>
                            LogOut
                        </button>
                        <div>
                            {error && <p className="text-red-500 text-sm px-4">*{error}</p>}
                        </div>
                    </div>
                )}
            </div>
        </div >
    )
}

export default Navbar
