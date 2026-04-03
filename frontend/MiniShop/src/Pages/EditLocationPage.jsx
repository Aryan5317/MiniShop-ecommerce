import Navbar from "../components/component1/Navbar"
import PhoneOptions from "../components/component1/PhoneOptions"
import locationService from "../services/locationService"
import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { FiTrash2, FiCheckCircle, FiCircle } from "react-icons/fi"
import deleteLocationService from "../services/deleteLocationService"
import activeLocationService from "../services/activeLocationService"
import { propContext } from "../context/contextApi"
import { FaUser } from "react-icons/fa"

function EditLocationPage() {
    const navigate = useNavigate()
    const { isLoggedIn } = useContext(propContext)
    const [locationsDetails, setLocationDetails] = useState([])
    const [fullName, setFullname] = useState("")
    const [defaultLocation, setDefaultLocation] = useState(null)

    useEffect(() => {
        if (isLoggedIn) {
            const locations = async () => {
                const response = await locationService()
                console.log("Response is: ", response.data)
                if (response.data.location.length > 0) {
                    setLocationDetails(response.data.location)
                }
                if (response.data.fullname) {
                    setFullname(response.data.fullname)
                }
                if (response.data.defaultLocation) {
                    setDefaultLocation(response.data.defaultLocation)
                }
            }
            locations()
        }
    }, [])

    const addNewAddress = () => {
        navigate("/account/add-location")
    }

    const deleteLocation = (id) => {
        const delLocation = async () => {
            console.log("Location id send is: ", id)
            const response = await deleteLocationService(id)
            console.log("Response is: ", response)
            if (response) {
                setLocationDetails(prev => prev.filter(l => l._id !== id))
                if (defaultLocation === id) {
                    setDefaultLocation(null)
                }
            }
        }
        delLocation()
    }

    const setActiveLocation = (id) => {
        const activeLocation = async () => {
            const response = await activeLocationService(id)
            console.log("Response for active location is: ", response)
            if (response) {
                setDefaultLocation(response.data.defaultLocation)
            }
        }
        activeLocation()
    }

    return (
        <div>
            {isLoggedIn && <div>
                <div className="flex flex-col md:hidden p-4 gap-4 bg-gray-50 min-h-screen">
                    <h2 className="text-xl font-bold text-gray-700">Saved Addresses</h2>
                    <div className="flex flex-col gap-3">
                        {locationsDetails.map((l) => (
                            <div key={l._id} className={`rounded-xl border-2 p-6 flex flex-col gap-2 transition duration-200 ${defaultLocation === l._id ? "border-sky-500 bg-sky-50 shadow-md" : "border-gray-200 bg-gray-50"}`}>
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-2">
                                        {defaultLocation === l._id && <FiCheckCircle className="text-sky-500" size={20} />}
                                        <h3 className="text-xl font-bold text-gray-800">{fullName}</h3>
                                    </div>
                                    <button
                                        className="flex items-center gap-1 text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded-lg transition duration-150 text-sm font-semibold"
                                        onClick={() => deleteLocation(l._id)}>
                                        <FiTrash2 size={16} />
                                        Remove
                                    </button>
                                </div>
                                <h3 className="text-base text-gray-600">{l.street}</h3>
                                <h3 className="text-base text-gray-600">{l.town}, {l.district}</h3>
                                <h3 className="text-base text-gray-600">{l.city}, {l.state}</h3>
                                <h3 className="text-base font-semibold text-gray-700">Pincode: {l.pincode}</h3>
                                <button
                                    onClick={() => defaultLocation !== l._id && setActiveLocation(l._id)}
                                    className={`mt-2 w-full py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition duration-200 ${defaultLocation === l._id ? "bg-sky-500 text-white cursor-default" : "border border-sky-500 text-sky-500 hover:bg-sky-50 cursor-pointer"}`}>
                                    {defaultLocation === l._id ? (
                                        <>
                                            <FiCheckCircle size={16} />
                                            Active
                                        </>
                                    ) : (
                                        <>
                                            <FiCircle size={16} />
                                            Set as Default
                                        </>
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => addNewAddress()}
                        className="w-full border-2 border-dashed border-sky-400 text-sky-600 font-semibold py-3 rounded-xl hover:bg-sky-50 transition duration-200">
                        + Add New Address
                    </button>
                </div>
                <div className="hidden md:flex">
                    <Navbar />
                </div>
                <div className="hidden md:flex justify-center items-start p-8 bg-gray-50 min-h-screen">
                    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8 flex flex-col gap-5 w-[600px]">
                        <h2 className="text-2xl font-bold text-gray-700">Saved Addresses</h2>
                        <div className="flex flex-col gap-4">
                            {locationsDetails.map((l) => (
                                <div key={l._id} className={`rounded-xl border-2 p-6 flex flex-col gap-2 transition duration-200 ${defaultLocation === l._id ? "border-sky-500 bg-sky-50 shadow-md" : "border-gray-200 bg-gray-50"}`}>
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-2">
                                            {defaultLocation === l._id && <FiCheckCircle className="text-sky-500" size={20} />}
                                            <h3 className="text-xl font-bold text-gray-800">{fullName}</h3>
                                        </div>
                                        <button
                                            className="flex items-center gap-1 text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded-lg transition duration-150 text-sm font-semibold"
                                            onClick={() => deleteLocation(l._id)}>
                                            <FiTrash2 size={16} />
                                            Remove
                                        </button>
                                    </div>
                                    <h3 className="text-base text-gray-600">{l.street}</h3>
                                    <h3 className="text-base text-gray-600">{l.town}, {l.district}</h3>
                                    <h3 className="text-base text-gray-600">{l.city}, {l.state}</h3>
                                    <h3 className="text-base font-semibold text-gray-700">Pincode: {l.pincode}</h3>
                                    <button
                                        onClick={() => defaultLocation !== l._id && setActiveLocation(l._id)}
                                        className={`mt-2 w-full py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition duration-200 ${defaultLocation === l._id ? "bg-sky-500 text-white cursor-default" : "border border-sky-500 text-sky-500 hover:bg-sky-50 cursor-pointer"}`}>
                                        {defaultLocation === l._id ? (
                                            <>
                                                <FiCheckCircle size={16} />
                                                Active
                                            </>
                                        ) : (
                                            <>
                                                <FiCircle size={16} />
                                                Set as Default
                                            </>
                                        )}
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button onClick={() => addNewAddress()}
                            className="w-full border-2 border-dashed border-sky-400 text-sky-600 text-lg font-semibold py-4 rounded-xl hover:bg-sky-50 transition duration-200">
                            + Add New Address
                        </button>
                    </div>
                </div>
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

export default EditLocationPage
