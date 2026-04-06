import Navbar from "../components/component1/Navbar";
import PhoneOptions from "../components/component1/PhoneOptions"
import allCartProductsService from "../services/allCartProductsService";
import locationService from "../services/locationService"
import { useState, useEffect, useContext } from "react"
import { FiStar, FiTrash2 } from "react-icons/fi"
import { FaUser } from "react-icons/fa"
import { BsBagCheck } from "react-icons/bs"
import { useNavigate } from "react-router-dom";
import removeFromCartService from "../services/removeFromCartService";
import { propContext } from "../context/contextApi";

function CartPage() {
  const navigate = useNavigate()
  const [cartProduct, setCartProduct] = useState([]);
  const [totalCartValue, setTotalCartValue] = useState(0);
  const [cartFlag, setCartFlag] = useState(false);
  const [acticeLocation, setActiceLocation] = useState([])
  const [fullName, setFullname] = useState("")
  const [locationFlag, setLocationFlag] = useState(false)
  const [locationMessageFlag, setLocationMessageFlag] = useState(false)
  const [buyClicked, setBuyClicked] = useState(false)
  const { isLoggedIn } = useContext(propContext)



  const removeCartProduct = (productId) => {
    const cart = async () => {
      const response = await removeFromCartService(productId, false);
      console.log("Response is: ", response)
      if (response) {
        setCartFlag((prev) => !prev)
      }
    }
    cart();
  }

  useEffect(() => {
    const cart = async () => {
      const response = await allCartProductsService()
      console.log("Response is: ", response);
      if (response) {
        console.log("Response data from cart is: ", response.data.cartDetails.orders)
        setCartProduct(response.data.cartDetails.orders)
        let total = 0;
        for (let i = 0; i < response.data.cartDetails.orders.length; i++) {
          total += response.data.cartDetails.orders[i].price
        }
        console.log("Total:  ", total)
        setTotalCartValue(total);
      }
    }
    cart()

  }, [cartFlag])

  useEffect(() => {
    const location = async () => {
      const response = await locationService()
      console.log("Response get from locations is: ", response.data)
      if (!response) {
        console.log("False")
        setLocationFlag(false)
      }
      else {
        setFullname(response.data.fullname)
        for (let i = 0; i < response.data.location.length; i++) {
          if (response.data.location[i]._id === response.data.defaultLocation) {
            setActiceLocation(response.data?.location?.[i])
          }
        }
        console.log("True")
        setLocationFlag(true)
      }
    }
    location()

  }, [])

  const navigateProductPage = (category, productId) => {
    console.log("Category to navigate is: ", category)
    console.log("product to navigate: ", productId)
    navigate(`/${category}/${productId}`)
  }

  const updateAddress = () => {
    navigate("/account/update-location")
  }

  const placeCompleteOrder = () => {
    console.log("Place order button clicked: ", cartProduct)
    if (totalCartValue > 0) {
      setBuyClicked(true)
      if (locationFlag) {
        setLocationMessageFlag(true)
        navigate("/order/summary")
      }
      else {
        setLocationMessageFlag(false)
      }
    }
  }

  const loginPage = () => {
    navigate("/login")
  }

  return (
    <div>
      {isLoggedIn && <div>
        {buyClicked && !locationMessageFlag && (
          <div className="fixed top-4 right-4 z-50 bg-white rounded-xl shadow-xl border border-red-200 p-4 flex items-center gap-3">
            <FiMapPin className="text-red-500" size={20} />
            <p className="text-red-500 font-semibold text-sm">Please add a delivery location to buy</p>
            <button onClick={() => openLocationPage()} className="text-sky-600 font-semibold text-sm underline">Add Location</button>
          </div>
        )}
        <div className="flex flex-col md:hidden bg-gray-100 min-h-screen pb-32">
          <div className="bg-white px-4 py-3 border-b border-gray-200 shadow-sm">
            <h3 className="font-bold text-2xl">My Cart</h3>
          </div>
          <div className="bg-white mx-3 mt-3 rounded-xl shadow-sm border border-gray-200 px-4 py-3 flex items-center justify-between">
            <div className="flex flex-col">
              <h3 className="text-xs text-gray-500">Deliver to</h3>
              <h3 className="font-semibold text-md">{(locationFlag) ? `${fullName} ${acticeLocation.street} ${acticeLocation.town} ${acticeLocation.district} ${acticeLocation.pincode}` : "ABC - XYZ"}</h3>
            </div>
            <button className="text-sm font-semibold text-sky-600 border border-sky-500 px-3 py-1 rounded-lg" onClick={() => updateAddress()}>
              Change
            </button>
          </div>
          {cartProduct && (
            <div className="flex flex-col gap-3 mx-3 mt-3">
              {cartProduct.map((cart) => (
                <div key={cart._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 flex gap-3 cursor-pointer"   >
                  <div className="w-24 h-24 shrink-0 bg-gray-100 rounded-lg flex items-center justify-center">
                    <img src={cart.productImages?.[0]} alt="Error 404" className="w-full h-full object-contain rounded-lg p-1" />
                  </div>
                  <div className="flex flex-col flex-1 gap-1" onClick={() => navigateProductPage(cart.productCategory, cart.productID)}>
                    <h3 className="font-semibold text-md line-clamp-2 text-gray-800">{cart.productName}</h3>
                    <p className="text-xs text-gray-500 line-clamp-1">{cart.description}</p>
                    <div className="flex items-center gap-1">
                      <div className="flex text-yellow-400">
                        <FiStar />
                        <FiStar />
                        <FiStar />
                        <FiStar />
                        <FiStar />
                      </div>
                      <h3 className="text-xs text-gray-500">{cart.rating}</h3>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex gap-1">
                        <h3 className="text-gray-400 text-xs line-through">₹{cart.oldPrice}</h3>
                        <h3 className="text-red-500 text-xs font-medium">-{cart.discount}%</h3>
                      </div>
                      <h3 className="text-green-600 font-semibold text-md">₹{cart.price}</h3>
                    </div>
                    <div className="flex justify-between mt-2 border-t border-gray-100 pt-2">
                      <button className="flex items-center gap-1 text-red-500 text-xs font-medium hover:text-red-600 transition" onClick={() => removeCartProduct(cart._id)}>
                        <FiTrash2 size={14} />
                        <h3>Remove</h3>
                      </button>
                      <button className="flex items-center gap-1 text-sky-600 text-xs font-medium hover:text-sky-700 transition" onClick={() => navigateProductPage(cart.productCategory, cart.productID)}>
                        <BsBagCheck size={14} />
                        <h3>Buy this now</h3>
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
          <div className="fixed bottom-16 left-0 w-full bg-white border-t border-gray-200 shadow-lg px-4 py-3 flex items-center justify-between">
            <div className="flex flex-col">
              <h3 className="text-xs text-gray-500">Total Amount</h3>
              <h3 className="font-bold text-xl">₹{totalCartValue}</h3>
            </div>
            <button className="bg-yellow-400 hover:bg-yellow-500 transition duration-300 text-black font-semibold px-6 py-3 rounded-xl shadow-md" onClick={() => placeCompleteOrder()}>
              Place Order
            </button>
          </div>

        </div>
        <div className="hidden md:flex flex-col bg-gray-100 min-h-screen">
          <Navbar />
          <div className="bg-white px-6 py-4 border-b border-gray-200 shadow-sm">
            <h3 className="font-bold text-3xl">My Cart</h3>
          </div>
          <div className="flex flex-row gap-6 px-8 py-6 max-w-6xl mx-auto w-full">
            <div className="flex flex-col gap-4 flex-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-6 py-4 flex items-center justify-between">
                <div className="flex flex-col">
                  <h3 className="text-sm text-gray-500">Deliver to</h3>
                  <h3 className="font-semibold text-lg">{(locationFlag) ? `${fullName} ${acticeLocation.street} ${acticeLocation.town} ${acticeLocation.district} ${acticeLocation.pincode}` : "ABC - XYZ"}</h3>
                </div>
                <button className="text-md font-semibold text-sky-600 border border-sky-500 px-4 py-2 rounded-lg hover:bg-sky-50 transition" onClick={() => updateAddress()}>
                  Change
                </button>
              </div>
              {cartProduct && (
                <div className="flex flex-col gap-4">
                  {cartProduct.map((cart) => (
                    <div key={cart._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex gap-6 cursor-pointer" onClick={() => navigateProductPage(cart.productCategory, cart.productID)}>
                      <div className="w-36 h-36 shrink-0 bg-gray-100 rounded-xl flex items-center justify-center">
                        <img src={cart.productImages?.[0]} alt="Error 404" className="w-full h-full object-contain rounded-xl p-2" />
                      </div>
                      <div className="flex flex-col flex-1 gap-2">
                        <h3 className="font-semibold text-xl line-clamp-2 text-gray-800">{cart.productName}</h3>
                        <p className="text-sm text-gray-500 line-clamp-1">{cart.description}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex text-yellow-400 text-lg">
                            <FiStar />
                            <FiStar />
                            <FiStar />
                            <FiStar />
                            <FiStar />
                          </div>
                          <h3 className="text-sm text-gray-500">{cart.rating}</h3>
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                          <div className="flex gap-1">
                            <h3 className="text-gray-400 text-sm line-through">₹{cart.oldPrice}</h3>
                            <h3 className="text-red-500 text-sm font-medium">-{cart.discount}%</h3>
                          </div>
                          <h3 className="text-green-600 font-bold text-xl">₹{cart.price}</h3>
                        </div>
                        <div className="flex gap-4 mt-3 border-t border-gray-100 pt-3">
                          <button className="flex items-center gap-2 text-red-500 text-sm font-medium hover:text-red-600 transition border border-red-200 px-4 py-2 rounded-lg hover:bg-red-50" onClick={() => removeCartProduct(cart._id)}>
                            <FiTrash2 size={16} />
                            Remove
                          </button>
                          <button className="flex items-center gap-2 text-sky-600 text-sm font-medium hover:text-sky-700 transition border border-sky-200 px-4 py-2 rounded-lg hover:bg-sky-50" onClick={() => navigateProductPage(cart.productCategory, cart.productID)}>
                            <BsBagCheck size={16} />
                            Buy this now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-col w-[350px] shrink-0 gap-4 self-start sticky top-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col gap-4">
                <h3 className="font-bold text-xl border-b border-gray-200 pb-3">Price Details</h3>
                <div className="flex justify-between text-md">
                  <h3 className="text-gray-600">Total Amount</h3>
                  <h3 className="font-bold text-xl">{totalCartValue}</h3>
                </div>
                <div className="flex justify-between text-md">
                  <h3 className="text-gray-600">Delivery Charge</h3>
                  <h3 className="text-green-600 font-medium">{totalCartValue > 500 || totalCartValue === 0 ? "Free" : "₹50"}</h3>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between">
                  <h3 className="font-bold text-lg">Order Total</h3>
                  <h3 className="font-bold text-xl">{totalCartValue > 500 || totalCartValue === 0 ? `₹${totalCartValue}` : `₹${totalCartValue + 50}`}</h3>
                </div>
                <button className="w-full bg-yellow-400 hover:bg-yellow-500 transition duration-300 text-black font-semibold px-6 py-3 rounded-xl shadow-md text-lg" onClick={() => placeCompleteOrder()}>
                  Place Order
                </button>
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
                onClick={() => loginPage()}
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
                  onClick={() => loginPage()}
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

export default CartPage
