import Navbar from "../components/component1/Navbar"
import PhoneOptions from "../components/component1/PhoneOptions"
import allCartProductsService from "../services/allCartProductsService"
import locationService from "../services/locationService"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function CartOrderSummaryPage() {
    const navigate = useNavigate()
    const [cartProduct, setCartProduct] = useState([])
    const [locationName, setLocationName] = useState("")
    const [location, setLocation] = useState([])
    const [locationFlag, setLocationFlag] = useState(false)
    const [totalAmount, setTotalAmount] = useState(0)

    useEffect(() => {
        const cart = async () => {
            const response = await allCartProductsService()
            console.log("Response of cart product: ", response.data.cartDetails.orders)
            if (response) {
                setCartProduct(response.data.cartDetails.orders)
            }
            let total = 0;
            for (let i = 0; i < response.data.cartDetails.orders.length; i++) {
                total = total + response.data.cartDetails.orders[i].price
            }
            setTotalAmount(total);
        }
        cart()
    }, [])
    useEffect(() => {
        const location = async () => {
            const response = await locationService()
            console.log("Location response is: ", response.data)
            if (response) {
                setLocationName(response.data.fullname)
            }
            if (!(response.data.defaultLocation)) {
                setLocationFlag(false)
            }
            else {
                setLocationFlag(true)
                for (let i = 0; i < response.data.location.length; i++) {
                    if (response.data.location[i]._id === response.data.defaultLocation) {
                        setLocation(response.data.location[i])
                    }
                }
            }
        }
        location()
    }, [])

    const returnHomePage = () => {
        navigate("/home")
    }
    const paymentGatewayPage = () => {
        navigate("/cart/payment-gateway")
    }

    return (
        <div>
            <div className="flex flex-col md:hidden bg-gray-100 min-h-screen pb-24">
                <div className="bg-white px-4 py-3 border-b border-gray-200 shadow-sm">
                    <h3 className="font-bold text-2xl">Order Summary</h3>
                </div>
                <div className="bg-white mx-3 mt-3 rounded-xl shadow-sm border border-gray-200 px-4 py-4">
                    <h3 className="font-bold text-md text-gray-700 mb-2">Shipping Address</h3>
                    <div className="flex flex-col gap-1">
                        <h3 className="font-semibold text-md text-gray-800">{locationName}</h3>
                        <p className="text-md text-gray-500">{location.street}, {location.town}, {location.district}, {location.state} - {location.pincode}</p>
                    </div>
                </div>
                <div className="flex flex-col gap-3 mx-3 mt-3">
                    {cartProduct.map((product) => (
                        <div key={product._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 flex gap-3">
                            <div className="w-24 h-24 shrink-0 bg-gray-100 rounded-lg flex items-center justify-center">
                                <img src={product?.phoneImages?.[0]} alt="Error 404" className="w-full h-full object-contain rounded-lg p-1" />
                            </div>
                            <div className="flex flex-col flex-1 gap-1 justify-center">
                                <p className="font-semibold text-sm line-clamp-2 text-sky-600">
                                    {product.productName} ({product.color}, {product.phoneRam}GB + {product.phoneStorage}GB)
                                </p>
                                <div className="flex items-center gap-1 mt-1">
                                    <h3 className="text-black font-bold text-lg">₹{product.price}</h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="bg-white mx-3 mt-3 mb-15 rounded-xl shadow-sm border border-gray-200 px-4 py-4">
                    <h3 className="font-bold text-md text-gray-700 border-b border-gray-200 pb-2 mb-3">Price Details</h3>
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between text-sm">
                            <h3 className="text-gray-600">Sub Total</h3>
                            <h3 className="font-medium">₹{totalAmount}</h3>
                        </div>
                        <div className="flex justify-between text-sm">
                            <h3 className="text-gray-600">Delivery Charge</h3>
                            <h3 className="text-sky-600 font-medium">₹50</h3>
                        </div>
                        <div className="flex justify-between text-sm">
                            <h3 className="text-gray-600">Discount</h3>
                            {totalAmount >= 500 ? (
                                <h3 className="text-sky-600 font-medium line-through">-₹50</h3>
                            ) : (
                                <h3 className="text-gray-400">₹0</h3>
                            )}
                        </div>
                        <div className="flex justify-between border-t border-gray-200 pt-2 mt-1">
                            <h3 className="font-bold text-md">Order Total</h3>
                            <h3 className="font-bold text-lg">
                                {totalAmount >= 500 ? `₹${totalAmount}` : `₹${totalAmount + 50}`}
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="fixed bottom-16 left-0 w-full bg-white border-t border-gray-200 shadow-lg px-4 py-3 flex gap-3">
                    <button onClick={() => paymentGatewayPage()}
                        className="flex-1 bg-yellow-400 hover:bg-yellow-500 transition duration-300 text-black font-semibold py-3 rounded-xl shadow-md">
                        Place Order
                    </button>
                    <button
                        className="flex-1 border border-gray-300 bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-100 transition duration-200"
                        onClick={() => returnHomePage()}>
                        Go Back
                    </button>
                </div>
                <PhoneOptions />
            </div>
            <div className="hidden md:flex flex-col bg-gray-100 min-h-screen">
                <Navbar />
                <div className="px-8 py-6 max-w-5xl mx-auto w-full flex flex-row gap-6">
                    <div className="flex flex-col gap-5 flex-1">
                        <div className="bg-white px-6 py-4 rounded-xl border border-gray-200 shadow-sm">
                            <h3 className="font-bold text-3xl">Order Summary</h3>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-6 py-5">
                            <h3 className="font-bold text-lg text-gray-700 mb-3">Shipping Address</h3>
                            <div className="flex flex-col gap-1">
                                <h3 className="font-semibold text-lg text-gray-800">{locationName}</h3>
                                <p className="text-base text-gray-500">{location.street}, {location.town}, {location.district}, {location.state} - {location.pincode}</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            {cartProduct.map((product) => (
                                <div key={product._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex gap-5">
                                    <div className="w-36 h-36 shrink-0 bg-gray-100 rounded-xl flex items-center justify-center">
                                        <img src={product?.phoneImages?.[0]} alt="Error 404" className="w-full h-full object-contain rounded-xl p-2" />
                                    </div>
                                    <div className="flex flex-col flex-1 gap-2 justify-center">
                                        <p className="font-semibold text-lg line-clamp-2 text-sky-600">
                                            {product.productName} ({product.color}, {product.phoneRam}GB + {product.phoneStorage}GB)
                                        </p>
                                        <div className="flex items-center gap-1 mt-1">
                                            <h3 className="text-black font-bold text-2xl">₹{product.price}</h3>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col w-[350px] shrink-0 gap-4 self-start sticky top-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-6 py-6">
                            <h3 className="font-bold text-xl text-gray-700 border-b border-gray-200 pb-3 mb-4">Price Details</h3>
                            <div className="flex flex-col gap-3">
                                <div className="flex justify-between text-base">
                                    <h3 className="text-gray-600">Sub Total</h3>
                                    <h3 className="font-medium">₹{totalAmount}</h3>
                                </div>
                                <div className="flex justify-between text-base">
                                    <h3 className="text-gray-600">Delivery Charge</h3>
                                    <h3 className="text-sky-600 font-medium">₹50</h3>
                                </div>
                                <div className="flex justify-between text-base">
                                    <h3 className="text-gray-600">Discount</h3>
                                    {totalAmount >= 500 ? (
                                        <h3 className="text-sky-600 font-medium line-through">-₹50</h3>
                                    ) : (
                                        <h3 className="text-gray-400">₹0</h3>
                                    )}
                                </div>
                                <div className="flex justify-between border-t border-gray-200 pt-3 mt-1">
                                    <h3 className="font-bold text-lg">Order Total</h3>
                                    <h3 className="font-bold text-xl">
                                        {totalAmount >= 500 ? `₹${totalAmount}` : `₹${totalAmount + 50}`}
                                    </h3>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 mt-5">
                                <button  className="w-full bg-yellow-400 hover:bg-yellow-500 transition duration-300 text-black font-semibold py-3 rounded-xl shadow-md text-lg" onClick={() => paymentGatewayPage()}>
                                    Place Order
                                </button>
                                <button
                                    className="w-full border border-gray-300 bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-100 transition duration-200 text-lg"
                                    onClick={() => returnHomePage()}>
                                    Go Back
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartOrderSummaryPage
