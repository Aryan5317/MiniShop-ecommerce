import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../../components/component1/Navbar"
import getOrderScuccessService from "../../services/mobileServices/getOrderScuccessService"
import locationService from "../../services/locationService"
import { FaCheck } from "react-icons/fa"

function OrderSuccessPage() {
  const navigate = useNavigate();
  const [userOrder, setUserOrder] = useState([])
  const [locationName, setLocationName] = useState("")
  const [location, setLocation] = useState([])

  useEffect(() => {
    const getOrderDetails = async () => {
      const response = await getOrderScuccessService()
      console.log("Response: ", response);
      if (response?.success) {
        console.log("Data fetched and stored is: ", response.data.order.orders)
        const userTotalOrder = response?.data?.order?.orders.length;
        console.log("Order is: ", response.data.order.orders[userTotalOrder - 1]);
        const order = response.data.order.orders[userTotalOrder - 1];
        setUserOrder(order);
      }
    }
    getOrderDetails()
  }, [])

  useEffect(() => {
    const locationData = async () => {
      const response = await locationService()
      console.log("Location response is: ", response.data)
      if (response) {
        setLocationName(response.data.fullname)
      }
      for (let i = 0; i < response.data.location.length; i++) {
        if (response.data.location[i]._id === response.data.defaultLocation) {
          setLocation(response.data.location[i])
        }
      }
    }
    locationData()
  }, [])

  const startShopping = () => {
    setTimeout(() => {
      navigate("/home")
    }, 1000)
  }

  return (
    <div>
      <Navbar />

      <div className="flex flex-col md:hidden items-center justify-center pb-6">
        <div className="flex flex-col items-center justify-center m-3 mb-0 bg-white rounded-lg">
          <div className="bg-green-400 rounded-full p-2">
            <FaCheck className="text-white" size={24} />
          </div>
          <h3 className="font-bold text-xl px-3">Order SUCCESS!</h3>
          <h3 className="font-semibold text-md px-3">Thank you for your purchase</h3>
        </div>

        <div className="flex flex-col gap-3 rounded-xl shadow-lg bg-white mt-3 w-full px-3">

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="flex items-center border-b border-gray-200 bg-gray-50 px-4 py-2">
              <h3 className="font-semibold text-xl">Order Summary</h3>
            </div>

            <div className="flex flex-col px-4 py-3 border-b border-gray-200 gap-2">
              <div className="flex flex-col gap-1">
                <h3 className="text-sm text-gray-500">Order ID</h3>
                <h3 className="text-md font-semibold break-all">{userOrder._id}</h3>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-sm text-gray-500">Date</h3>
                <h3 className="text-md font-semibold">{userOrder.date}</h3>
              </div>
            </div>

            <div className="grid grid-cols-4 px-4 py-2 bg-gray-50 border-b border-gray-200">
              <h3 className="text-sm text-gray-500 font-medium">Item</h3>
              <h3 className="text-sm text-gray-500 font-medium text-center">Qty</h3>
              <h3 className="text-sm text-gray-500 font-medium text-center">Price</h3>
              <h3 className="text-sm text-gray-500 font-medium text-right">Total</h3>
            </div>

            <div className="flex flex-col px-4 py-3 border-b border-gray-200 gap-3">
              <div className="flex items-start gap-3">
                <img
                  src={userOrder.productImages?.[0]}
                  alt="Error 404"
                  className="h-16 w-16 shrink-0 object-contain bg-gray-100 rounded-lg p-1"
                />
                <h3 className="text-sm font-semibold text-sky-600">{userOrder.name}</h3>
              </div>
              <div className="grid grid-cols-3 w-full">
                <h3 className="text-sm font-medium text-center">{userOrder.quantity}</h3>
                <h3 className="text-sm font-medium text-center">₹{userOrder.price}</h3>
                <h3 className="text-sm font-medium text-right">₹{userOrder.totalCost}</h3>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="flex items-center border-b border-gray-200 bg-gray-50 px-4 py-2">
              <h3 className="font-semibold text-xl">Shipping Address</h3>
            </div>
            <div className="flex flex-col px-4 py-3 gap-1">
              <h3 className="text-lg font-semibold">{locationName}</h3>
              <p className="text-md font-semibold text-gray-600">
                {location.street} {location.town} {location.district} {location.state} {location.pincode}
              </p>
            </div>
          </div>
        </div>

        <div className="border mb-3 mt-3 rounded-lg">
          <button
            className="px-3 py-2 font-medium text-lg bg-green-500 text-white cursor-pointer hover:bg-green-300"
            onClick={() => startShopping()}>
            Continue Shopping
          </button>
        </div>
      </div>

      <div className="hidden md:flex flex-col items-center justify-center py-6">
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="bg-green-400 rounded-full p-4">
            <FaCheck className="text-white" size={40} />
          </div>
          <h3 className="font-bold text-3xl px-3 mt-3">Order SUCCESS!</h3>
          <h3 className="font-semibold text-lg px-3 text-gray-500">Thank you for your purchase</h3>
        </div>

        <div className="flex flex-col max-w-4xl w-full gap-4">
          <div className="mx-6 border border-gray-200 rounded-xl shadow-lg overflow-hidden bg-white">
            <div className="flex items-center border-b border-gray-200 bg-gray-50 px-6 py-4">
              <h3 className="font-semibold text-2xl">Order Summary</h3>
            </div>
            <div className="flex justify-between px-6 py-4 border-b border-gray-200">
              <div className="flex flex-col gap-1">
                <h3 className="text-sm text-gray-500">Order ID</h3>
                <h3 className="text-lg font-semibold">{userOrder._id}</h3>
              </div>
              <div className="flex flex-col items-end gap-1">
                <h3 className="text-sm text-gray-500">Date</h3>
                <h3 className="text-lg font-semibold">{userOrder.date}</h3>
              </div>
            </div>
            <div className="grid grid-cols-4 px-6 py-3 bg-gray-50 border-b border-gray-200">
              <h3 className="text-md text-gray-500 font-medium">Item</h3>
              <h3 className="text-md text-gray-500 font-medium text-center">Quantity</h3>
              <h3 className="text-md text-gray-500 font-medium text-center">Price</h3>
              <h3 className="text-md text-gray-500 font-medium text-right">Total</h3>
            </div>
            <div className="grid grid-cols-4 px-6 py-5 items-center border-b border-gray-200">
              <div className="flex items-center gap-3">
                <img
                  src={userOrder.productImages?.[0]}
                  alt="Error 404"
                  className="h-20 w-20 object-contain bg-gray-100 rounded-lg p-1"
                />
                <h3 className="text-md font-semibold text-sky-600 line-clamp-2">{userOrder.name}</h3>
              </div>
              <h3 className="text-lg font-medium text-center">{userOrder.quantity}</h3>
              <h3 className="text-lg font-medium text-center">₹{userOrder.price}</h3>
              <h3 className="text-lg font-medium text-right">₹{userOrder.totalCost}</h3>
            </div>
          </div>

          <div className="mx-6 border border-gray-200 rounded-xl shadow-lg overflow-hidden bg-white">
            <div className="flex items-center border-b border-gray-200 bg-gray-50 px-6 py-4">
              <h3 className="font-semibold text-2xl">Shipping Address</h3>
            </div>
            <div className="flex flex-row px-6 py-5 gap-6 items-start">
              <div className="flex flex-col gap-2 flex-1">
                <h3 className="text-lg font-semibold">{locationName}</h3>
                <p className="text-md font-semibold text-gray-600">
                  {location.street} {location.town} {location.district} {location.state} {location.pincode}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center mb-6">
            <button
              className="px-8 py-3 font-semibold text-xl bg-green-500 text-white rounded-xl shadow-md hover:bg-green-600 transition duration-300 cursor-pointer"
              onClick={() => startShopping()}>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderSuccessPage
