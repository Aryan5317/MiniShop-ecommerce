import PhoneOptions from '../components/component1/PhoneOptions'
import verifyLocation from '../context/verifyAuthentication/verifylocation'
import districtsByState from '../context/statte&district/index'
import addLocationService from '../services/addLocationService'
import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
function AddNewLocation() {
    const navigate = useNavigate()
    const [locationDetails, setLocationDetails] = useState({
        street: "",
        town: "",
        district: "",
        state: "",
        city: "",
        country: "India",
        pincode: "",
    })
    const [errors, setErrors] = useState({});
    const [stateValue, setStateValue] = useState(false)
    const [districtValue, setDistrictValue] = useState(false)
    const stateValueRef = useRef(null)
    const districtValueRef = useRef(null)
    const [formMessage, setFormMessage] = useState(null)

    const statesAndUTsOption = [
        "Andaman and Nicobar Islands",
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chandigarh",
        "Chhattisgarh",
        "Dadra and Nagar Haveli",
        "Daman and Diu",
        "Delhi",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jammu and Kashmir",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Ladakh",
        "Lakshadweep",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Puducherry",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttar Pradesh",
        "Uttarakhand",
        "West Bengal"
    ];
    useEffect(() => {
        function HandleStateValue(event) {
            if (stateValue && !stateValueRef.current.contains(event.target)) {
                setStateValue(false)
            }
        }
        if (stateValue) {
            document.addEventListener("mousedown", HandleStateValue)
        }
        return () => document.removeEventListener("mousedown", HandleStateValue)
    }, [stateValue])
    useEffect(() => {
        function HandlDistrictValue(event) {
            if (districtValue && !districtValueRef.current.contains(event.target)) {
                setDistrictValue(false)
            }
        }
        if (districtValue) {
            document.addEventListener("mousedown", HandlDistrictValue)
        }
        return () => document.removeEventListener("mousedown", HandlDistrictValue)
    }, [districtValue])

    const ChamgeStateOption = () => {
        setStateValue((prev) => !prev)
        setDistrictValue(false)
    }
    const SetStateValue = (s) => {
        setLocationDetails(prev => ({
            ...prev,
            state: s,
            district: ""
        }))
        if (stateValue) {
            setStateValue(false)
        }
    }
    const ChamgeDistrictOption = () => {
        setDistrictValue((prev) => !prev)
        setStateValue(false)
    }
    const SetDistrictValue = (d) => {
        setLocationDetails(prev => ({
            ...prev,
            district: d,
        }))
        if (districtValue) {
            setDistrictValue(false)
        }
    }
    const SetStreetValue = (e) => {
        const { name, value } = e.target
        setLocationDetails((prev) => ({
            ...prev,
            [name]: value,
        }))
    }
    const SetTownValue = (e) => {
        const { name, value } = e.target
        setLocationDetails((prev) => ({
            ...prev,
            [name]: value,
        }))
    }
    const SetCityValue = (e) => {
        const { name, value } = e.target
        setLocationDetails((prev) => ({
            ...prev,
            [name]: value,
        }))
    }
    const SetPincodeValue = (e) => {
        const { name, value } = e.target
        setLocationDetails((prev) => ({
            ...prev,
            [name]: value,
        }))
    }
    const SubmitLocationDetails = () => {
        const ValidationErrors = verifyLocation(locationDetails)
        setErrors(ValidationErrors)
        console.log("Validation errors is: ", ValidationErrors)
        if (Object.keys(ValidationErrors).length === 0) {
            console.log("Value is: ")
            console.log("User Details is: ", locationDetails)
            const sendDetails = async () => {
                const response = await addLocationService(locationDetails)
                console.log("Response is: ", response)
                if (response) {
                    navigate(-1)
                }
            }
            sendDetails()
            if (!formMessage) {
                setFormMessage(true)
            }
        }
        else {
            console.log("Errors is: ", ValidationErrors)
            if (formMessage) {
                setFormMessage(false)
            }
        }
    }

    return (
        <div>
            <div className='flex flex-col md:hidden p-4 gap-3 bg-gray-50 rounded-xl'>
                <div className='flex flex-col gap-1'>
                    <h3 className='text-sm font-semibold text-gray-600'>Street</h3>
                    <input type="text" name='street' value={locationDetails.street} onChange={(e) => SetStreetValue(e)}
                        className='border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400' />
                    {errors.street && (
                        <p className='text-red-500 text-xs mt-0.5 pl-1'>
                            {errors.street}
                        </p>
                    )}
                </div>
                <div className='flex flex-col gap-1'>
                    <h3 className='text-sm font-semibold text-gray-600'>Town</h3>
                    <input type="text" name='town' value={locationDetails.town} onChange={(e) => SetTownValue(e)}
                        className='border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400' />
                    {errors.town && (
                        <p className='text-red-500 text-xs mt-0.5 pl-1'>
                            {errors.town}
                        </p>
                    )}
                </div>
                <div className='flex flex-col gap-1'>
                    <h3 className='text-sm font-semibold text-gray-600'>City</h3>
                    <input type="text" name='city' value={locationDetails.city} onChange={(e) => SetCityValue(e)}
                        className='border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400' />
                    {errors.city && (
                        <p className='text-red-500 text-xs mt-0.5 pl-1'>
                            {errors.city}
                        </p>
                    )}
                </div>
                <div className='flex flex-col gap-1'>
                    <h3 className='text-sm font-semibold text-gray-600'>Country</h3>
                    <input type="text" name='country' value="India" readOnly
                        className='border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-100 text-gray-400 cursor-not-allowed' />
                    {errors.country && (
                        <p className='text-red-500 text-xs mt-0.5 pl-1'>
                            {errors.country}
                        </p>
                    )}
                </div>
                <div className='flex flex-col gap-1'>
                    <h3 className='text-sm font-semibold text-gray-600'>PinCode</h3>
                    <input type="text" name='pincode' value={locationDetails.pincode} onChange={(e) => SetPincodeValue(e)}
                        className='border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400' />
                    {errors.pincode && (
                        <p className='text-red-500 text-xs mt-0.5 pl-1'>
                            {errors.pincode}
                        </p>
                    )}
                </div>
                <div className='flex flex-col gap-1'>
                    <h3 className='text-sm font-semibold text-gray-600'>State</h3>
                    <div className='relative'>
                        <button onClick={ChamgeStateOption}
                            className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-left bg-white focus:outline-none focus:ring-2 focus:ring-sky-400'>
                            {(locationDetails.state === "") ? "Select State" : locationDetails.state}
                        </button>
                        <div className='relative' ref={stateValueRef}>
                            {stateValue && (
                                <ul className="absolute bottom-full left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg mb-1 z-50 max-h-48 overflow-y-auto">
                                    {statesAndUTsOption.map((state) => (
                                        <li className='text-sm font-medium m-1 rounded-lg px-3 py-2 cursor-pointer hover:bg-sky-50 hover:text-sky-600 transition duration-150'
                                            key={state}
                                            onClick={() => SetStateValue(state)}>
                                            {state}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                    {errors.state && (
                        <p className='text-red-500 text-xs mt-0.5 pl-1'>
                            {errors.state}
                        </p>
                    )}
                </div>
                <div className='flex flex-col gap-1'>
                    <h3 className='text-sm font-semibold text-gray-600'>District</h3>
                    <div className='relative'>
                        <button onClick={ChamgeDistrictOption}
                            className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-left bg-white focus:outline-none focus:ring-2 focus:ring-sky-400'>
                            {(locationDetails.district === "") ? "Select District" : locationDetails.district}
                        </button>
                        <div ref={districtValueRef}>
                            {districtValue && (
                                <ul className="absolute bottom-full left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg mb-1 z-50 max-h-48 overflow-y-auto">
                                    {(locationDetails.state === "") ? (
                                        <li className='text-sm font-medium m-1 rounded-lg px-3 py-2 text-gray-400'>
                                            No District Value
                                        </li>
                                    ) : (
                                        districtsByState[(locationDetails.state)]?.map((dist, index) => (
                                            <li className='text-sm font-medium m-1 rounded-lg px-3 py-2 cursor-pointer hover:bg-sky-50 hover:text-sky-600 transition duration-150'
                                                key={index}
                                                onClick={() => SetDistrictValue(dist)}>
                                                {dist}
                                            </li>
                                        ))
                                    )}
                                </ul>
                            )}
                        </div>
                    </div>
                    {errors.district && (
                        <p className='text-red-500 text-xs mt-0.5 pl-1'>
                            {errors.district}
                        </p>
                    )}
                </div>
                <div className='flex flex-col gap-1 mt-2'>
                    <button onClick={() => SubmitLocationDetails()}
                        className='w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2.5 text-sm rounded-xl transition duration-300 shadow-md'>
                        Add Location
                    </button>
                    {formMessage && (
                        <p className='text-green-500 text-sm font-semibold mt-1 pl-1'>
                            Form Submitted Successfully
                        </p>
                    )}
                </div>

            </div>
            <div className="hidden md:flex justify-center items-start bg-gray-100 min-h-screen p-6 lg:p-8">
                <div className="bg-white w-full max-w-xl lg:max-w-2xl rounded-2xl shadow-lg border border-gray-200 p-6 lg:p-10">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6 lg:mb-8">
                        Add Location
                    </h2>
                    <div className="flex flex-col gap-4 lg:gap-5">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-base lg:text-lg font-semibold text-gray-600">Street</label>
                            <input
                                type="text"
                                name='street'
                                value={locationDetails.street}
                                onChange={SetStreetValue}
                                className="border border-gray-300 rounded-xl px-4 py-2 lg:py-2.5 text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
                            />
                            {errors.street && (
                                <p className="text-red-500 text-sm lg:text-base mt-0.5 pl-2">
                                    {errors.street}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-base lg:text-lg font-semibold text-gray-600">Town</label>
                            <input
                                type="text"
                                name='town'
                                value={locationDetails.town}
                                onChange={SetTownValue}
                                className="border border-gray-300 rounded-xl px-4 py-2 lg:py-2.5 text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
                            />
                            {errors.town && (
                                <p className="text-red-500 text-sm lg:text-base mt-0.5 pl-2">
                                    {errors.town}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-base lg:text-lg font-semibold text-gray-600">City</label>
                            <input
                                type="text"
                                name='city'
                                value={locationDetails.city}
                                onChange={SetCityValue}
                                className="border border-gray-300 rounded-xl px-4 py-2 lg:py-2.5 text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
                            />
                            {errors.city && (
                                <p className="text-red-500 text-sm lg:text-base mt-0.5 pl-2">
                                    {errors.city}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-base lg:text-lg font-semibold text-gray-600">Country</label>
                            <input
                                type="text"
                                value="India"
                                name='country'
                                readOnly
                                className="border border-gray-200 rounded-xl px-4 py-2 lg:py-2.5 text-base lg:text-lg bg-gray-100 text-gray-400 cursor-not-allowed"
                            />
                            {errors.country && (
                                <p className="text-red-500 text-sm lg:text-base mt-0.5 pl-2">
                                    {errors.country}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-base lg:text-lg font-semibold text-gray-600">Pin Code</label>
                            <input
                                type="text"
                                name='pincode'
                                value={locationDetails.pincode}
                                onChange={SetPincodeValue}
                                className="border border-gray-300 rounded-xl px-4 py-2 lg:py-2.5 text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
                            />
                            {errors.pincode && (
                                <p className="text-red-500 text-sm lg:text-base mt-0.5 pl-2">
                                    {errors.pincode}
                                </p>
                            )}
                        </div>
                        <div className='flex flex-col gap-1'>
                            <h3 className='text-sm font-semibold text-gray-600'>State</h3>
                            <div className='relative'>
                                <button onClick={ChamgeStateOption}
                                    className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-left bg-white focus:outline-none focus:ring-2 focus:ring-sky-400'>
                                    {(locationDetails.state === "") ? "Select State" : locationDetails.state}
                                </button>
                                <div className='relative' ref={stateValueRef}>
                                    {stateValue && (
                                        <ul className="absolute bottom-full left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg mb-1 z-50 max-h-48 overflow-y-auto">
                                            {statesAndUTsOption.map((state) => (
                                                <li className='text-sm font-medium m-1 rounded-lg px-3 py-2 cursor-pointer hover:bg-sky-50 hover:text-sky-600 transition duration-150'
                                                    key={state}
                                                    onClick={() => SetStateValue(state)}>
                                                    {state}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                            {errors.state && (
                                <p className='text-red-500 text-xs mt-0.5 pl-1'>
                                    {errors.state}
                                </p>
                            )}
                        </div>
                        <div className='flex flex-col gap-1'>
                            <h3 className='text-sm font-semibold text-gray-600'>District</h3>
                            <div className='relative'>
                                <button onClick={ChamgeDistrictOption}
                                    className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-left bg-white focus:outline-none focus:ring-2 focus:ring-sky-400'>
                                    {(locationDetails.district === "") ? "Select District" : locationDetails.district}
                                </button>
                                <div ref={districtValueRef}>
                                    {districtValue && (
                                        <ul className="absolute bottom-full left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg mb-1 z-50 max-h-48 overflow-y-auto">
                                            {(locationDetails.state === "") ? (
                                                <li className='text-sm font-medium m-1 rounded-lg px-3 py-2 text-gray-400'>
                                                    No District Value
                                                </li>
                                            ) : (
                                                districtsByState[(locationDetails.state)]?.map((dist, index) => (
                                                    <li className='text-sm font-medium m-1 rounded-lg px-3 py-2 cursor-pointer hover:bg-sky-50 hover:text-sky-600 transition duration-150'
                                                        key={index}
                                                        onClick={() => SetDistrictValue(dist)}>
                                                        {dist}
                                                    </li>
                                                ))
                                            )}
                                        </ul>
                                    )}
                                </div>
                            </div>
                            {errors.district && (
                                <p className='text-red-500 text-xs mt-0.5 pl-1'>
                                    {errors.district}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2 mt-1">
                            <button
                                onClick={SubmitLocationDetails}
                                className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2.5 lg:py-3 text-base lg:text-lg rounded-xl transition duration-300 shadow-md"
                            >
                                Add Location
                            </button>
                            {formMessage && (
                                <p className="text-green-500 text-base lg:text-lg font-semibold mt-1 pl-2">
                                    Form Submitted Successfully
                                </p>
                            )}
                        </div>

                    </div>
                </div>
            </div>
            <PhoneOptions />
        </div>
    )
}

export default AddNewLocation
