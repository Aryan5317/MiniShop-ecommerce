import { useState, useEffect } from "react"
import Navbar from "../components/component1/Navbar"
import getOrderScuccessService from "../services/mobileServices/getOrderScuccessService"
import PhoneOptions from "../components/component1/PhoneOptions"
import { propContext } from "../context/contextApi"
import { FaUser } from "react-icons/fa"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"

function OrderPage() {
  const navigate = useNavigate()
  const { isLoggedIn } = useContext(propContext)
  const [orderSummary, setOrderSummary] = useState([])
  const [orderMessage, setOrderMessage] = useState(false)

  useEffect(() => {
    if (isLoggedIn) {
      const orders = async () => {
        const response = await getOrderScuccessService();
        console.log("Response: ", response.data?.order?.orders);

        const fetchedOrders = response?.data?.order?.orders || []
        if (fetchedOrders.length === 0) {
          setOrderMessage(true)
        }
        setOrderSummary(fetchedOrders)
      }
      orders()
    }
  }, [])

  return (
    <div>
      {isLoggedIn && <div>
        <Navbar />
        <div className="border flex flex-col md:hidden p-4 gap-5 bg-gray-100 min-h-screen">
          <h3 className="font-bold text-2xl">Your Orders</h3>
          <div className="flex flex-col gap-4 mb-15">
            {orderMessage && (
              <div className="border-gray-300 border items-center justify-center px-5 py-3 bg-white rounded-xl">
                <h3 className="text-gray-500 text-center">No orders found</h3>
              </div>
            )}

            {orderSummary.map((order) => (
              <div
                key={order._id}
                className="flex gap-4 bg-white p-4 rounded-xl shadow-sm border hover:shadow-md transition"
              >
                <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center bg-white border rounded-lg">
                  <img
                    src={order.productImages?.[0]}
                    alt=""
                    className="w-full h-full object-contain rounded-md"
                  />
                </div>
                <div className="flex flex-col justify-between flex-1">
                  <div className="flex justify-between items-start gap-3">
                    <h3 className="font-medium text-base leading-tight line-clamp-2">
                      {order.name}
                    </h3>
                    <h3 className="text-green-600 font-semibold text-sm whitespace-nowrap">
                      ₹{order.price}
                    </h3>
                  </div>
                  <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
                    <h3 className="font-medium">Quantity: {order.quantity}</h3>
                    <h3 className="text-black font-semibold text-base">₹{order.totalCost}</h3>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <h3 className="text-lg text-black">Order Date:</h3>
                    <h3 className="text-md text-gray-500">{order.date}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="hidden md:flex flex-col p-8 gap-6 bg-gray-100 min-h-screen">
          <h3 className="font-bold text-3xl max-w-4xl w-full mx-auto px-2">Your Orders</h3>
          <div className="flex flex-col gap-5 max-w-4xl w-full mx-auto">

            {orderMessage && (
              <div className="bg-white rounded-xl border px-6 py-8 flex flex-col items-center justify-center gap-2 shadow-sm">
                <h3 className="text-gray-400 text-xl font-medium">No orders found</h3>
                <p className="text-gray-400 text-sm">You have not placed any orders yet.</p>
              </div>
            )}

            {orderSummary.map((order) => (
              <div
                key={order._id}
                className="flex gap-6 bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition"
              >
                <div className="w-32 h-32 flex-shrink-0 flex items-center justify-center bg-gray-50 border rounded-xl">
                  <img
                    src={order.productImages?.[0]}
                    alt=""
                    className="w-full h-full object-contain rounded-xl p-2"
                  />
                </div>
                <div className="flex flex-col justify-between flex-1">
                  <div className="flex justify-between items-start gap-3">
                    <h3 className="font-semibold text-xl leading-tight line-clamp-2">
                      {order.name}
                    </h3>
                    <h3 className="text-green-600 font-bold text-xl whitespace-nowrap">
                      ₹{order.price}
                    </h3>
                  </div>
                  <div className="flex justify-between items-center mt-3 text-md text-gray-600">
                    <h3 className="font-medium text-lg">Quantity: {order.quantity}</h3>
                    <h3 className="text-black font-bold text-xl">Total: ₹{order.totalCost}</h3>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <h3 className="text-lg font-medium text-black">Order Date:</h3>
                    <h3 className="text-md text-gray-500">{order.date}</h3>
                  </div>
                </div>
              </div>
            ))}
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

export default OrderPage
