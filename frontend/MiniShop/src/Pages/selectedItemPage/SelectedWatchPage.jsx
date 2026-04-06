import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import PhoneOptions from "../../components/component1/PhoneOptions";
import { FiStar, FiChevronDown, FiRotateCcw, FiBox, FiShield, FiCheck, FiDollarSign, FiLock, FiMapPin } from "react-icons/fi"
import { TbTruckDelivery } from "react-icons/tb"
import { MdPayments } from "react-icons/md";
import AddToCart from "../../components/component1/AddToCart";
import ExploreWatchProduct from "../../components/component2/ExploreWatchProduct";
import watchDetailsService from "../../services/watchService/watchDetailsService";
import Navbar from "../../components/component1/Navbar";
import addToCartService from "../../services/addToCartService";
import allCartProductsService from "../../services/allCartProductsService";
import locationService from "../../services/locationService";

function SelectedWatchPage() {
    let params = useParams();
    const navigate = useNavigate();
    let product = params.id;

    const [popup, setPopup] = useState(false);
    const [cartMessage, setCartMessage] = useState("");
    const [watchData, setWatchData] = useState({})
    const [itemQuantity, setItemQuantity] = useState(1);
    const [cartValue, setCartValue] = useState(false)
    const [locationName, setLocationName] = useState("")
    const [location, setLocation] = useState([])
    const [locationFlag, setLocationFlag] = useState(false)
    const [locationMessageFlag, setLocationMessageFlag] = useState(false)
    const [buyClicked, setBuyClicked] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)

    useEffect(() => {
        const watchDetails = async () => {
            const watch = await watchDetailsService()
            for (let i = 0; i < watch.data.productData.length; i++) {
                if (watch.data.productData[i]._id === product) {
                    console.log("True")
                    setWatchData(watch.data.productData[i]);
                }
            }
        }
        watchDetails();
        window.scrollTo(0, 0)
    }, [product])

    useEffect(() => {
        const cart = async () => {
            const response = await allCartProductsService()
            if (response) {
                for (let i = 0; i < response.data.cartDetails.orders.length; i++) {
                    if (response.data.cartDetails.orders[i].productID === product) {
                        setCartValue(true)
                    }
                }
            }
        }
        cart()
    }, [])

    useEffect(() => {
        const locationData = async () => {
            const response = await locationService()
            if (response) {
                setLocationName(response.data.fullname)
            }
            if (!(response.data.defaultLocation)) {
                setLocationFlag(false)
            } else {
                setLocationFlag(true)
                for (let i = 0; i < response.data.location.length; i++) {
                    if (response.data.location[i]._id === response.data.defaultLocation) {
                        setLocation(response.data.location[i])
                    }
                }
            }
        }
        locationData()
    }, [])

    const addToCart = (id, c) => {
        setLoading2(true)
        const cart = async () => {
            const responseCart = await addToCartService(id, c, true)
            if (responseCart) {
                setCartMessage(responseCart);
                setPopup(true)
                setTimeout(() => {
                    setLoading2(false)
                    setPopup(false)
                }, 5000)
            } else {
                setCartMessage(responseCart);
            }
        }
        cart();
    }

    const CartPage = () => {
        navigate("/cart")
    }

    const paymentButton = () => {
        setLoading(true)
        setBuyClicked(true)
        if (locationFlag) {
            setLocationMessageFlag(true)
            setTimeout(() => {
                setLoading(false)
                navigate(`/product/${product}/orderSummary?quantity=${itemQuantity}&category=Watches`)
            }, 2000)
        } else {
            setLocationMessageFlag(false)
        }
    }

    const openLocationPage = () => {
        navigate("/account/update-location")
    }

    return (
        <>
            <Navbar />
            {buyClicked && !locationMessageFlag && (
                <div className="fixed top-4 right-4 z-50 bg-white rounded-xl shadow-xl border border-red-200 p-4 flex items-center gap-3">
                    <FiMapPin className="text-red-500" size={20} />
                    <p className="text-red-500 font-semibold text-sm">Please add a delivery location to buy</p>
                    <button onClick={() => openLocationPage()} className="text-sky-600 font-semibold text-sm underline">Add Location</button>
                </div>
            )}

            <div className="hidden md:flex flex-col">
                {popup && <AddToCart cartMessage={cartMessage} />}
                <div className="border hidden md:flex flex-row m-3 mt-1 bg-white">
                    <div className="h-[50vh] lg:h-[100vh] w-[35%] lg:w-[40%] flex items-center justify-center">
                        <img
                            src={watchData.watchImages?.[0]}
                            alt="Error 404"
                            className="h-[55%] w-[55%] lg:h-[70%] lg:w-[70%]"
                        />
                    </div>

                    <div className="mx-3 pt-3 w-[55%] flex flex-col">
                        <p className="flex font-medium text-xl">
                            {watchData.watchName} ({watchData.color}) | {watchData.category} | {watchData.dialSize}mm | {watchData.strapMaterial} | {watchData.description?.highlights}
                        </p>
                        <div className="flex items-center gap-1 mt-3">
                            <h3 className="font-medium text-lg">0.0</h3>
                            <div className="flex">
                                <FiStar className="font-medium text-lg" />
                                <FiStar className="font-medium text-lg" />
                                <FiStar className="font-medium text-lg" />
                                <FiStar className="font-medium text-lg" />
                                <FiStar className="font-medium text-lg" />
                            </div>
                            <div className="flex items-center">
                                <FiChevronDown className="font-medium text-lg" />
                                <h3 className="font-medium text-lg text-sky-600">(0)</h3>
                            </div>
                        </div>
                        <div className="flex mt-3 gap-1">
                            <h3 className="font-bold text-md">{watchData.totalSell}+ bought</h3>
                            <h3 className="text-md">in past month</h3>
                        </div>

                        <div className="border-gray-300 border mt-3"></div>
                        <div className="mt-5 m-3 mb-0 flex flex-row gap-3">
                            <h3 className="font-medium text-2xl text-red-400">-{watchData.discount}%</h3>
                            <div className="flex">
                                <h3>₹</h3>
                                <h3 className="text-3xl font-semibold">{watchData.currentPrice}</h3>
                            </div>
                        </div>
                        <div className="m-3 mt-1 flex gap-1">
                            <h3>M.R.P:</h3>
                            <h3 className="line-through">₹{watchData.oldPrice}</h3>
                            <h3 className="text-gray-300 px-3">|</h3>
                            <h3 className="text-sky-600">Price history</h3>
                        </div>
                        <div className="flex gap-3 overflow-y-auto">
                            <div className="gap-1 flex flex-col items-center w-[20%]">
                                <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
                                    <FiBox className="text-3xl text-orange-400" />
                                    <FiRotateCcw className="text-gray-500 absolute" size={50} strokeWidth={1} />
                                </div>
                                <h3 className="font-semibold text-md text-center text-sky-600">10 days Return & Exchange</h3>
                            </div>
                            <div className="gap-1 flex flex-col items-center w-[20%]">
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
                                    <TbTruckDelivery className="text-gray-500" size={50} strokeWidth={1} />
                                </div>
                                <h3 className="font-semibold text-md text-center text-sky-600">Free Delivery</h3>
                            </div>
                            <div className="gap-1 flex flex-col items-center w-[20%]">
                                <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
                                    <FiShield className="text-gray-500" size={40} strokeWidth={1} />
                                    <FiCheck className="text-orange-400 absolute" />
                                </div>
                                <h3 className="font-semibold text-md text-center text-sky-600">1 Year warranty</h3>
                            </div>
                            <div className="gap-1 flex flex-col items-center w-[20%]">
                                <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
                                    <MdPayments className="text-gray-500" size={30} strokeWidth={1} />
                                </div>
                                <h3 className="font-semibold text-md text-center text-sky-600">Pay on Delivery</h3>
                            </div>
                            <div className="gap-1 flex flex-col items-center w-[20%]">
                                <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
                                    <FiLock className="text-gray-500" size={50} strokeWidth={1} />
                                    <FiDollarSign className="text-orange-400 absolute mt-5" size={20} />
                                </div>
                                <h3 className="font-semibold text-md text-center text-sky-600">Secure Transaction</h3>
                            </div>
                        </div>

                        <div className="border-gray-300 border mt-3"></div>
                        <div className="flex flex-row m-3 mt-1 items-center gap-2 min-w-0 cursor-pointer" onClick={() => openLocationPage()}>
                            <FiMapPin className="text-lg self-start mt-1" />
                            <p className="text-lg text-sky-600 font-semibold">
                                Delivering to {locationFlag ? `${location.street}, ${location.town}, ${location.pincode}` : "ABC - XYZ - 123456"}
                            </p>
                            <p className="text-lg text-black font-semibold">- Update Location</p>
                        </div>
                        <div className="flex flex-col gap-3 mt-3 mx-3">
                            <div className="flex border mt-1 px-3 py-1 w-[40%] gap-1 rounded-lg bg-gray-100 hover:bg-gray-200 transition duration-300">
                                <h3 className="text-lg font-medium">Quantity: </h3>
                                <select onChange={(e) => setItemQuantity(e.target.value)} className="outline-none w-[100%]">
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                                        <option key={n} value={n}>{n}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex border px-3 py-2 w-[40%] gap-1 rounded-3xl bg-yellow-400 items-center justify-center hover:bg-yellow-500 transition duration-300">
                                {!cartValue
                                    ? <button className={`text-lg ${loading2 ? " opacity-50 cursor-not-allowed" : "hover:bg-sky-700 cursor-pointer"}`} onClick={() => addToCart(watchData._id, watchData.productCategory)}>{loading2 ? "Add to cart" : "Add to Cart"}</button>
                                    : <button className="text-lg" onClick={() => CartPage()}>Go to cart</button>
                                }
                            </div>
                            <div className="flex border px-3 py-2 mb-3 w-[40%] gap-1 rounded-3xl bg-amber-500 items-center justify-center hover:bg-orange-500 transition duration-300">
                                <button className={`text-lg ${loading ? " opacity-50 cursor-not-allowed" : "hover:bg-sky-700 cursor-pointer"}`} onClick={() => paymentButton()}>
                                    {loading ? "Buying..." : "Buy Now"}
                                </button>
                            </div>
                        </div>
                        <div className="mt-3 flex flex-col">
                            <h3 className="text-xl font-bold">About this item</h3>
                            <ul className="list-disc pl-4">
                                <li>{watchData.description?.highlights}</li>
                                <li>Dial Display: {watchData.description?.display}</li>
                                <li>Movement: {watchData.description?.movement}</li>
                                <li>Water Resistance: {watchData.description?.waterResistance}</li>
                                <li>{watchData.description?.extras}</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col mt-0 m-3">
                    <h3 className="text-2xl font-bold">Explore top deals in related categories</h3>
                </div>
                <div>
                    <ExploreWatchProduct />
                </div>
            </div >

            {/* ── MOBILE ── */}
            < div className="border flex flex-col md:hidden" >
                {popup && <AddToCart cartMessage={cartMessage} />
                }

                {/* Watch Image */}
                <div className="flex items-center justify-center m-3 mt-1 py-3">
                    <img src={watchData.watchImages?.[0]} alt="Error 404" className="w-[40%]" />
                </div>

                <div className="py-[2px] bg-gray-200"></div>

                {/* Watch Name */}
                <div className="flex flex-row m-3 mt-1 gap-3 items-center">
                    <p className="font-semibold text-xl line-clamp-2 break-words px-3">
                        {watchData.watchName} ({watchData.color}) | {watchData.category} | {watchData.dialSize}mm
                    </p>
                </div>

                {/* Price */}
                <div className="flex flex-row m-3 mt-1 gap-3 items-center">
                    <h3 className="text-2xl text-red-600">-{watchData.discount}%</h3>
                    <div className="flex items-center">
                        <h3>₹</h3>
                        <h4 className="text-3xl font-semibold">{watchData.currentPrice}</h4>
                    </div>
                </div>

                {/* Location */}
                <div className="flex flex-wrap items-center gap-2 m-3 mt-1 cursor-pointer" onClick={() => openLocationPage()}>
                    <FiMapPin className="text-lg shrink-0" />
                    <p className="text-base text-sky-600 font-semibold min-w-0">
                        Delivering to {locationFlag ? `${location.street}, ${location.town}, ${location.pincode}` : "ABC - XYZ - 123456"}
                    </p>
                    <p className="text-base text-black font-medium cursor-pointer whitespace-nowrap hover:underline">
                        - Update Location
                    </p>
                </div>

                {/* Quantity + Buttons */}
                <div className="flex flex-col gap-3 m-3 items-center justify-center">
                    <div className="flex border mt-1 px-3 py-3 gap-1 rounded-lg bg-gray-100 w-full">
                        <h3 className="text-lg font-medium">Quantity: </h3>
                        <select onChange={(e) => setItemQuantity(e.target.value)} className="outline-none w-full flex-1">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                                <option key={n} value={n}>{n}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex border px-3 py-3 gap-1 rounded-xl bg-yellow-400 items-center justify-center hover:bg-yellow-500 transition duration-300 w-full">
                        {!cartValue
                            ? <button className={`text-lg ${loading ? " opacity-50 cursor-not-allowed" : "hover:bg-sky-700 cursor-pointer"}`} onClick={() => addToCart(watchData._id, watchData.productCategory)}>{loading2? "Add to cart.":  "Add to cart"}</button>
                            : <button className="text-lg" onClick={() => CartPage()}>Go to cart</button>
                        }
                    </div>
                    <div className="flex border px-3 py-3 mb-3 gap-1 rounded-xl bg-amber-500 items-center justify-center hover:bg-orange-500 transition duration-300 w-full">
                        <button className={`text-lg ${loading ? " opacity-50 cursor-not-allowed" : "hover:bg-sky-700 cursor-pointer"}`} onClick={() => paymentButton()}>
                            {loading ? "Buying..." : "Buy Now"}
                        </button>
                    </div>
                </div>

                <div className="flex m-3 mt-1 gap-3 items-center justify-between w-[60%]">
                    <div className="flex flex-col text-md">
                        <h3>Shop From</h3>
                        <h3>Sold by</h3>
                    </div>
                    <div className="flex flex-col text-md">
                        <h3>MiniShop</h3>
                        <h3 className="text-sky-600 font-semibold">XYZ</h3>
                    </div>
                </div>

                <div className="border-gray-600 border"></div>

                <div className="flex flex-col m-3">
                    <h3 className="font-semibold text-xl">Shop with confidence</h3>
                    <div className="mt-3 flex flex-col">
                        <div className="flex gap-3">
                            <div className="flex items-center w-1/2 gap-3">
                                <FiBox className="text-xl self-start mt-1" />
                                <h3 className="text-md self-start mt-1 text-sky-600">10 days Return & Exchange</h3>
                            </div>
                            <div className="flex items-center w-1/2 gap-3">
                                <MdPayments className="text-xl self-start mt-1" />
                                <h3 className="text-md self-start mt-1 text-sky-600">Pay on Delivery</h3>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="flex items-center gap-3 w-1/2">
                                <TbTruckDelivery className="text-xl self-start mt-1" />
                                <h3 className="text-md self-start mt-1 text-sky-600">Free Delivery</h3>
                            </div>
                            <div className="flex items-center gap-3 w-1/2">
                                <FiLock className="text-xl self-start mt-1" />
                                <h3 className="text-md self-start mt-1 text-sky-600">Secure transaction</h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/* About this item — watch schema fields only */}
                <div className="flex flex-col m-3">
                    <h3 className="font-bold text-xl">About this item</h3>
                    <ul className="list-disc pl-4 font-medium text-lg">
                        <li>{watchData.description?.highlights}</li>
                        <li>Dial Display: {watchData.description?.display}</li>
                        <li>Movement: {watchData.description?.movement}</li>
                        <li>Water Resistance: {watchData.description?.waterResistance}</li>
                        <li>{watchData.description?.extras}</li>
                    </ul>
                </div>

                <div className="py-[3px] bg-gray-200"></div>

                <div className="flex flex-col mt-0 m-3">
                    <h3 className="text-lg font-bold">Explore top deals in related categories</h3>
                </div>
                <div className="mt-0">
                    <ExploreWatchProduct />
                </div>
                <PhoneOptions />
            </div >
        </>
    )
}

export default SelectedWatchPage
