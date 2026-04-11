import { FiPlus, FiStar, FiChevronDown } from "react-icons/fi";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import addToCartService from "../../services/addToCartService";
import AddToCart from "../component1/AddToCart";
import earPhoneService from "../../services/earPhoneService/earPhoneService";

function EarPhone({ filterValue }) {
    const navigate = useNavigate()
    const [popup, setPopup] = useState(false);
    const [earPhoneData, setEarPhoneData] = useState([])
    const [cartMessage, setCartMessage] = useState("");

    useEffect(() => {
        const fetchEarPhoneData = async () => {
            const earPhone = await earPhoneService()
            const allEarPhones = earPhone.data.productData
            console.log("EarPhone data is: ", allEarPhones)

            const noFilterApplied =
                filterValue.Brands.length === 0 &&
                filterValue.Type.length === 0 &&
                filterValue.Category.length === 0 &&
                filterValue.Connectivity.length === 0 &&
                filterValue.NoiseCancellation.length === 0 &&
                filterValue.WaterResistance.length === 0 &&
                filterValue.price === ""

            if (noFilterApplied) {
                setEarPhoneData(allEarPhones)
            } else {
                const filteredEarPhones = allEarPhones.filter(earphone => {

                    // ✅ Brand check
                    const brandMatch = filterValue.Brands.length === 0
                        || filterValue.Brands.includes(earphone.earphonesBrand)

                    // ✅ Price check
                    const priceMatch = filterValue.price === ""
                        || earphone.currentPrice <= Number(filterValue.price)

                    // ✅ Type check
                    const typeMatch = filterValue.Type.length === 0
                        || filterValue.Type.includes(earphone.earphonesType)

                    // ✅ Category check
                    const categoryMatch = filterValue.Category.length === 0
                        || filterValue.Category.includes(earphone.category)

                    // ✅ Connectivity check
                    const connectivityMatch = filterValue.Connectivity.length === 0
                        || filterValue.Connectivity.includes(earphone.connectivity)

                    // ✅ Noise Cancellation check
                    const noiseCancellationMatch = filterValue.NoiseCancellation.length === 0
                        || filterValue.NoiseCancellation.includes(earphone.noiseCancellation)

                    // ✅ Water Resistance check
                    const waterResistanceMatch = filterValue.WaterResistance.length === 0
                        || filterValue.WaterResistance.includes(earphone.waterResistance)

                    return brandMatch && priceMatch && typeMatch && categoryMatch && connectivityMatch && noiseCancellationMatch && waterResistanceMatch
                })

                setEarPhoneData(filteredEarPhones)
                console.log("Filtered EarPhones: ", filteredEarPhones)
            }
        }
        fetchEarPhoneData()
    }, [filterValue])

    const earPhoneDetailsPage = (id) => {
        console.log("Earphone id is: ", id)
        navigate(`/earphones/${id}`)
    }

    const addToCart = (e, id, c) => {
        const cartCall = async () => {
            e.preventDefault()
            e.stopPropagation()
            
            console.log("Category is: ", c)
            const responseCart = await addToCartService(id, c, true)
            
            if (responseCart) {
                setCartMessage(responseCart);
                
                setPopup(true)
                setTimeout(() => {
                    setPopup(false)
                }, 5000)
            } else {
                setCartMessage(responseCart)
            }
        }
        cartCall();
    }

    return (
    <div className="w-full flex flex-col pb-15 md:pb-0">
        {popup && <AddToCart cartMessage={cartMessage} />}

        {/* ── MOBILE ── */}
        <div className="grid grid-cols-2 md:grid-cols-1 gap-3 py-4 md:hidden">
            {earPhoneData.map((data) => (
                <div
                    key={data._id}
                    onClick={() => earPhoneDetailsPage(data._id)}
                    className="border-gray-300 border bg-white rounded-lg shadow-xl p-3 px-1 flex flex-col hover:shadow-lg transition duration-200"  // ✅ removed fixed h-[360px]
                >
                    {/* Image */}
                    <div className="w-full flex justify-center">
                        <img
                            src={data.earphonesImages[0]}
                            alt={data.earphonesName}
                            className="h-[120px] object-contain"
                        />
                    </div>

                    {/* Name & Color */}
                    <div className="gap-1 mt-3 text-left break-words">   {/* ✅ removed fixed h-[85px] and flex-1 */}
                        <span className="font-bold text-lg">{data.earphonesName}</span>
                        <span className="font-medium px-1 text-xl">-</span>
                        <span className="font-semibold text-lg">({data.color})</span>
                    </div>

                    {/* Type & Connectivity */}
                    <div className="flex gap-2 mt-2 items-center px-1 flex-wrap">  {/* ✅ added flex-wrap */}
                        <span className="font-semibold text-sm">{data.earphonesType}</span>
                        <span className="font-medium text-xl">|</span>
                        <span className="font-semibold text-sm">{data.connectivity}</span>
                    </div>

                    {/* ANC Badge */}
                    {data.noiseCancellation === "Active Noise Cancellation" && (
                        <div className="px-1 mt-1">
                            <span className="text-xs font-semibold text-green-700 bg-green-100 rounded-full px-2 py-0.5">
                                ANC
                            </span>
                        </div>
                    )}

                    {/* Battery Life */}
                    {data.batteryLife && (
                        <div className="px-1 mt-1">
                            <span className="text-sm text-gray-600">🔋 {data.batteryLife}</span>
                        </div>
                    )}

                    {/* Price */}
                    <div className="flex items-center justify-center mt-2">
                        <span className="font-semibold text-2xl">₹{data.currentPrice}</span>
                        <div className="flex items-center justify-center mx-3">
                            <span className="font-light text-sm mt-3">M.R.P:</span>
                            <span className="font-light text-sm mt-3 line-through">₹{data.oldPrice}</span>
                        </div>
                    </div>

                    {/* Add to Cart */}
                    <div
                        className="border flex mt-2 rounded-md flex-row items-center justify-between bg-yellow-300"  // ✅ mt-1 → mt-2
                        onClick={(e) => addToCart(e, data._id, data.productCategory)}
                    >
                        <h3 className="flex items-center font-medium text-md ml-3 text-black">
                            Add to Cart
                        </h3>
                        <button className="flex items-center font-bold text-xl mr-1 text-black">
                            <FiPlus />
                        </button>
                    </div>
                </div>
            ))}
            {(earPhoneData.length === 0) && (
                    <div className="flex flex-col items-center justify-center w-full h-[300px] gap-2">
                        <h3 className="text-xl font-semibold text-gray-500">No EarPhone Found</h3>
                        <p className="text-sm text-gray-400">Try adjusting your filters</p>
                    </div>
                )}
        </div>

        {/* ── DESKTOP ── */}
        <div className="hidden md:flex flex-col overflow-y-auto gap-3">
            {earPhoneData.map((data) => (
                <div
                    key={data._id}
                    onClick={() => earPhoneDetailsPage(data._id)}
                    className="border m-1 mt-3 flex bg-white rounded-lg min-h-[250px] shadow hover:shadow-md transition-shadow duration-200 cursor-pointer"  // ✅ h-[250px] → min-h-[250px]
                >
                    {/* Image */}
                    <div className="flex items-center rounded-l-lg justify-center px-3 w-[30%] bg-gray-100 shrink-0">  {/* ✅ added shrink-0 */}
                        <img
                            src={data.earphonesImages[0]}
                            alt={data.earphonesName}
                            className="h-[85%] object-contain"
                        />
                    </div>

                    {/* Details */}
                    <div className="flex flex-col bg-white m-1 mx-3 w-[68%] py-2 overflow-hidden">  {/* ✅ added py-2, overflow-hidden */}

                        {/* Brand */}
                        <div>
                            <h3 className="font-bold text-xl">{data.earphonesBrand}</h3>
                        </div>

                        {/* Name, Color, Type, Connectivity */}
                        <div className="flex mt-1">
                            <p className="font-semibold text-xl cursor-pointer line-clamp-2 hover:text-red-700 transition-color duration-100">
                                {data.earphonesName} ({data.color}) | {data.earphonesType} | {data.connectivity} | {data.noiseCancellation} | {data.description?.highlights}
                            </p>
                        </div>

                        {/* Specs Row */}
                        <div className="flex gap-3 mt-1 text-sm text-gray-600 flex-wrap">  {/* ✅ already has flex-wrap */}
                            {data.batteryLife && <span>🔋 {data.batteryLife}</span>}
                            {data.driverSize && <span>🔊 {data.driverSize} Driver</span>}
                            {data.waterResistance !== "None" && (
                                <span>💧 {data.waterResistance}</span>
                            )}
                            {data.microphoneType && <span>🎙️ {data.microphoneType}</span>}
                        </div>

                        {/* Rating */}
                        <div className="flex flex-row mt-2 items-center gap-1">  {/* ✅ mt-3 → mt-2 */}
                            <h3>0.0</h3>
                            <div className="flex items-center">
                                <FiStar /><FiStar /><FiStar /><FiStar /><FiStar />
                            </div>
                            <div className="flex items-center">
                                <FiChevronDown />
                                <h3>({data.reviews.length})</h3>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="mt-2 flex gap-2 flex-wrap">  {/* ✅ added flex-wrap */}
                            <div className="flex flex-row">
                                <h3>₹</h3>
                                <h3 className="font-medium text-3xl">{data.currentPrice}</h3>
                            </div>
                            <div className="flex flex-row gap-1 flex-wrap">
                                <h3 className="pt-3">M.R.P:</h3>
                                <h3 className="pt-3 line-through">₹{data.oldPrice}</h3>
                                <h3 className="pt-3">({data.discount}% off)</h3>
                            </div>
                        </div>

                        {/* Add to Cart */}
                        <div className="mt-2 mb-2 flex items-center">  {/* ✅ added mb-2 */}
                            <button
                                className="border bg-yellow-300 text-md rounded-xl cursor-pointer px-4 py-1 whitespace-nowrap text-black hover:bg-yellow-400 transition-colors duration-100"
                                onClick={(e) => addToCart(e, data._id, data.productCategory)}
                            >
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            {(earPhoneData.length === 0) && (
                    <div className="flex flex-col items-center justify-center w-full h-[300px] gap-2">
                        <h3 className="text-xl font-semibold text-gray-500">No EarPhone Found</h3>
                        <p className="text-sm text-gray-400">Try adjusting your filters</p>
                    </div>
                )}
        </div>
    </div>
)
}

export default EarPhone
