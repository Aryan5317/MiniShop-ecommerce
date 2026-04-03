import PhoneOptions from "../components/component1/PhoneOptions"
import Navbar from "../components/component1/Navbar"
import { useState, useContext } from "react"
import { FiEyeOff, FiEye } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import updateDetailsService from "../services/updateDetailsService"
import updateDetailsValidation from "../context/verifyAuthentication/updateDetails"
import { FaUser } from "react-icons/fa"
import { propContext } from "../context/contextApi"

function EditDetailsPage() {
    const navigate = useNavigate()
    const { isLoggedIn } = useContext(propContext)
    const [updateDetails, setUpdateDetails] = useState({
        userName: "",
        newPassword: "",
        confirmPassword: "",
    })
    const [errorMessage, setErrorMessage] = useState(null)
    const [errors, setError] = useState({})
    const [passwordEye, setPasswordEye] = useState(false)
    const [passwordEye2, setPasswordEye2] = useState(false)


    const SetUpdatedName = (e) => {
        console.log(e.target.value)
        const { name, value } = e.target
        setUpdateDetails((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const SetNewPassword = (e) => {
        console.log(e.target.value)
        const { name, value } = e.target
        setUpdateDetails((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const SetConfirmPasswords = (e) => {
        console.log(e.target.value)
        const { name, value } = e.target
        setUpdateDetails((prev) => ({
            ...prev,
            [name]: value,
        }))
    }


    const PasswordVisibilityOff = () => {
        setPasswordEye((prev) => !prev)
    }
    const PasswordVisibilityOn = () => {
        setPasswordEye((prev) => !prev)
    }

    const Password2VisibilityOff = () => {
        setPasswordEye2((prev) => !prev)
    }
    const Password2VisibilityOn = () => {
        setPasswordEye2((prev) => !prev)
    }

    const updatedName = async () => {
        if (isLoggedIn) {
            const validationErrors = updateDetailsValidation(updateDetails, "name")
            setError(validationErrors)
            if (Object.keys(validationErrors).length === 0) {
                try {
                    const response = await updateDetailsService({ userName: updateDetails.userName })
                    console.log("Response: ", response)
                    if (response) {
                        setErrorMessage(true)
                        setUpdateDetails((prev) => ({ ...prev, userName: "" }))
                        setTimeout(() => {
                            setErrorMessage(false)
                        }, 2000)
                    }
                } catch (err) {
                    console.log("Error from backend: ", err.message)
                    setError((prev) => ({
                        ...prev,
                        message: err.message
                    }))
                }
            }
        }
    }

    const editDetails = async () => {
        if (isLoggedIn) {
            const validationErrors = updateDetailsValidation(updateDetails, "password")
            setError(validationErrors)
            if (Object.keys(validationErrors).length === 0) {
                try {
                    const response = await updateDetailsService({
                        newPassword: updateDetails.newPassword,
                        confirmPassword: updateDetails.confirmPassword
                    })
                    console.log("Response: ", response)
                    if (response) {
                        setErrorMessage(true)
                        setUpdateDetails((prev) => ({
                            ...prev,
                            newPassword: "",
                            confirmPassword: ""
                        }))
                        setTimeout(() => {
                            setErrorMessage(false)
                            navigate("/home")
                        }, 2000)
                    }
                } catch (err) {
                    setErrorMessage(false)
                    console.log("Error from backend message: ", err.message)
                    setError((prev) => ({
                        ...prev,
                        message: err.message
                    }))
                }
            } else {
                console.log("Validation errors: ", validationErrors)
                setErrorMessage(false)
            }
        }
    }

    return (
        <div>
            {isLoggedIn && <div>
                <div className="flex flex-col md:hidden bg-gray-50 min-h-screen pb-20">
                    <div className="bg-white px-4 py-4 border-b border-gray-200 shadow-sm">
                        <h3 className="font-bold text-2xl text-gray-800 tracking-tight">Edit Profile</h3>
                    </div>
                    <div className="mx-4 mt-6 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="flex flex-col px-4 py-5 border-b border-gray-100 gap-2">
                            <h3 className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Full Name</h3>
                            <input
                                type="text"
                                name="userName"
                                value={updateDetails.userName}
                                onChange={SetUpdatedName}
                                placeholder="Enter your name"
                                className="border border-gray-200 rounded-xl px-4 py-3 text-base text-gray-700 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 w-full transition"
                            />

                            <button
                                onClick={() => updatedName()}
                                className="mt-1 bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition duration-200">
                                Save Name
                            </button>
                            {errors.userName && (
                                <p className="text-xs text-amber-500 px-1">{errors.userName}</p>
                            )}
                        </div>
                        <div className="flex flex-col px-4 py-5 border-b border-gray-100 gap-2">
                            <h3 className="text-xs text-gray-400 font-semibold uppercase tracking-wider">New Password</h3>
                            <div className="relative">
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={updateDetails.newPassword}
                                    onChange={SetNewPassword}
                                    placeholder="Enter new password"
                                    className="border border-gray-200 rounded-xl px-4 py-3 text-base text-gray-700 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 w-full pr-11 transition"
                                />
                                <button
                                    onClick={() => passwordEye ? PasswordVisibilityOn() : PasswordVisibilityOff()}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-sky-500 transition">
                                    {passwordEye ? <FiEye className="text-xl" /> : <FiEyeOff className="text-xl" />}
                                </button>
                            </div>
                            {errors.newPassword && (
                                <p className="text-xs text-amber-500 px-1 mt-1">{errors.newPassword}</p>
                            )}
                        </div>
                        <div className="flex flex-col px-4 py-5 gap-2">
                            <h3 className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Confirm Password</h3>
                            <div className="relative">
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={updateDetails.confirmPassword}
                                    onChange={SetConfirmPasswords}
                                    placeholder="Confirm new password"
                                    className="border border-gray-200 rounded-xl px-4 py-3 text-base text-gray-700 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 w-full pr-11 transition"
                                />
                                <button
                                    onClick={() => passwordEye2 ? Password2VisibilityOn() : Password2VisibilityOff()}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-sky-500 transition">
                                    {passwordEye2 ? <FiEye className="text-xl" /> : <FiEyeOff className="text-xl" />}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-xs text-amber-500 px-1 mt-1">{errors.confirmPassword}</p>
                            )}
                        </div>
                    </div>
                    <div className="mx-4 mt-5">
                        <button
                            onClick={() => editDetails()}
                            className="w-full bg-sky-500 active:bg-sky-700 hover:bg-sky-600 transition duration-200 text-white font-semibold px-6 py-3.5 rounded-2xl shadow-md text-base tracking-wide">
                            Save Details
                        </button>
                    </div>
                    <div className="mx-4 mt-3 flex flex-col gap-2">
                        {errorMessage && (
                            <p className="text-sm px-4 py-2.5 bg-green-700 rounded-xl text-white text-center font-medium">
                                Registered Successfully
                            </p>
                        )}
                        {errors.message && (
                            <p className="text-sm px-4 py-2.5 bg-red-500 rounded-xl text-white text-center font-medium">
                                {errors.message}
                            </p>
                        )}
                    </div>
                </div>
                <div className="hidden md:flex">
                    <Navbar />
                </div>
                <div className="hidden md:flex flex-col bg-gray-50 min-h-screen">
                    <div className="bg-white px-8 py-4 border-b border-gray-200 shadow-sm">
                        <h3 className="font-bold text-2xl text-gray-800 tracking-tight">Edit Profile</h3>
                    </div>
                    <div className="flex flex-1 gap-6 px-8 py-8 max-w-4xl mx-auto w-full">
                        <div className="flex-1 flex flex-col gap-4">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                                <div className="flex flex-col px-6 py-5 border-b border-gray-100 gap-2">
                                    <h3 className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Full Name</h3>
                                    <input
                                        type="text"
                                        name="userName"
                                        value={updateDetails.userName}
                                        onChange={SetUpdatedName}
                                        placeholder="Enter your name"
                                        className="border border-gray-200 rounded-xl px-4 py-3 text-base text-gray-700 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 w-full transition"
                                    />
                                    <button
                                        onClick={() => updatedName()}
                                        className="mt-1 bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition duration-200">
                                        Save Name
                                    </button>
                                    {errors.userName && (
                                        <p className="text-xs text-amber-500 px-1">{errors.userName}</p>
                                    )}
                                </div>
                                <div className="flex flex-col px-6 py-5 border-b border-gray-100 gap-2">
                                    <h3 className="text-xs text-gray-400 font-semibold uppercase tracking-wider">New Password</h3>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            name="newPassword"
                                            value={updateDetails.newPassword}
                                            onChange={SetNewPassword}
                                            placeholder="Enter new password"
                                            className="border border-gray-200 rounded-xl px-4 py-3 text-base text-gray-700 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 w-full pr-11 transition"
                                        />
                                        {!passwordEye && (<button onClick={() => PasswordVisibilityOff()} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-sky-500 transition"><FiEyeOff className="text-xl" /></button>)}
                                        {passwordEye && (<button onClick={() => PasswordVisibilityOn()} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-sky-500 transition"><FiEye className="text-xl" /></button>)}
                                    </div>
                                    <div>
                                        {errors.newPassword && (
                                            <p className="text-xs text-amber-500 px-1 mt-1">{errors.newPassword}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-col px-6 py-5 gap-2">
                                    <h3 className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Confirm Password</h3>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={updateDetails.confirmPassword}
                                            onChange={SetConfirmPasswords}
                                            placeholder="Confirm new password"
                                            className="border border-gray-200 rounded-xl px-4 py-3 text-base text-gray-700 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 w-full pr-11 transition"
                                        />
                                        {!passwordEye2 && (<button onClick={() => Password2VisibilityOff()} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-sky-500 transition"><FiEyeOff className="text-xl" /></button>)}
                                        {passwordEye2 && (<button onClick={() => Password2VisibilityOn()} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-sky-500 transition"><FiEye className="text-xl" /></button>)}
                                    </div>
                                    <div>
                                        {errors.confirmPassword && (
                                            <p className="text-xs text-amber-500 px-1 mt-1">{errors.confirmPassword}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    onClick={() => editDetails()}
                                    className="bg-sky-500 hover:bg-sky-600 active:bg-sky-700 transition duration-200 text-white font-semibold px-8 py-3 rounded-2xl shadow-md text-base tracking-wide">
                                    Save Details
                                </button>
                            </div>
                            <div className="flex flex-col gap-2">
                                {errorMessage && (
                                    <p className="text-sm px-4 py-2.5 bg-green-700 rounded-xl text-white text-center font-medium">
                                        Registered Successfully
                                    </p>
                                )}
                                {errors.message && (
                                    <p className="text-sm px-4 py-2.5 bg-red-500 rounded-xl text-white text-center font-medium">
                                        {errors.message}
                                    </p>
                                )}
                            </div>
                        </div>
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

export default EditDetailsPage
