import { FiStar, FiChevronDown, FiRotateCcw, FiBox, FiShield, FiCheck, FiDollarSign, FiLock, FiMapPin } from "react-icons/fi"
import { TbTruckDelivery } from "react-icons/tb"
import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { MdPayments } from "react-icons/md";
import PhoneOptions from "../../components/component1/PhoneOptions";
import AddToCart from "../../components/component1/AddToCart";
import Navbar from "../../components/component1/Navbar";
import addToCartService from "../../services/addToCartService";
import locationService from "../../services/locationService";
import shoesDetailsService from "../../services/shoesService/shoesDetailsService";
import ExploreShoesProducts from "../../components/component2/ExploreShoesProducts";
import allCartProductsService from "../../services/allCartProductsService";

function SelectedShoesPage() {
  let params = useParams();
  const navigate = useNavigate();
  let product = params.id;
  const [popup, setPopup] = useState(false);
  const [cartMessage, setCartMessage] = useState("");
  const [shoeData, setShoeData] = useState({})
  const [selectedSize, setSelectedSize] = useState(null)
  const [itemQuantity, setItemQuantity] = useState(1);
  const [cartValue, setCartValue] = useState(false)
  const [locationName, setLocationName] = useState("")
  const [location, setLocation] = useState([])
  const [locationFlag, setLocationFlag] = useState(false)
  const [locationMessageFlag, setLocationMessageFlag] = useState(false)
  const [buyClicked, setBuyClicked] = useState(false)

  useEffect(() => {
    const shoeDetails = async () => {
      const shoe = await shoesDetailsService()
      for (let i = 0; i < shoe.data.productData.length; i++) {
        if (shoe.data.productData[i]._id === product) {
          setShoeData(shoe.data.productData[i]);
        }
      }
    }
    shoeDetails();
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
    const cart = async () => {
      const responseCart = await addToCartService(id, c, true)
      if (responseCart) {
        setCartMessage(responseCart);
        setPopup(true)
        setTimeout(() => {
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

  const paymentButton = (id, category) => {
    setBuyClicked(true)
    if (locationFlag) {
      setLocationMessageFlag(true)
      setTimeout(() => {
        navigate(`/product/${product}/orderSummary?quantity=${itemQuantity}&category=${"Shoes"}`)
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

      {/* ── Desktop View ── */}
      <div className="hidden md:flex flex-col">
        {popup && <AddToCart cartMessage={cartMessage} />}
        <div className="border hidden md:flex flex-row m-3 mt-1 bg-white">

          {/* Shoe Image */}
          <div className="h-[50vh] lg:h-[100vh] w-[35%] lg:w-[40%] flex items-center justify-center">
            <img src={shoeData.shoeImages?.[0]} alt="Error 404"
              className="h-[55%] w-[55%] lg:h-[70%] lg:w-[70%]" />
          </div>

          <div className="mx-3 pt-3 w-[55%] flex flex-col">

            {/* Shoe Name + Details */}
            <p className="flex font-medium text-xl">
              {shoeData.shoeName} ({shoeData.color}, {shoeData.shoeType}) | {shoeData.material} | {shoeData.closure} | {shoeData.description?.highlights}
            </p>

            {/* Rating */}
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

            {/* Total Sell */}
            <div className="flex mt-3 gap-1">
              <h3 className="font-bold text-md">{shoeData.totalSell}+ bought</h3>
              <h3 className="text-md">in past month</h3>
            </div>

            <div className="border-gray-300 border mt-3"></div>

            {/* Price */}
            <div className="mt-5 m-3 mb-0 flex flex-row gap-3">
              <h3 className="font-medium text-2xl text-red-400">-{shoeData.discount}%</h3>
              <div className="flex">
                <h3>₹</h3>
                <h3 className="text-3xl font-semibold">{shoeData.currentPrice}</h3>
              </div>
            </div>
            <div className="m-3 mt-1 flex gap-1">
              <h3>M.R.P:</h3>
              <h3 className="line-through">₹{shoeData.oldPrice}</h3>
              <h3 className="text-gray-300 px-3">|</h3>
              <h3 className="text-sky-600">Price history</h3>
            </div>

            {/* Trust Badges */}
            <div className="flex gap-3 overflow-y-auto">
              <div className="gap-1 flex flex-col items-center w-[20%]">
                <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
                  <FiBox className="text-3xl text-orange-400" />
                  <FiRotateCcw className="text-gray-500 absolute" size={50} strokeWidth={1} />
                </div>
                <div className="flex flex-col w-[100%] justify-center items-center">
                  <h3 className="font-semibold text-md text-center text-sky-600">10 days Return & Exchange</h3>
                </div>
              </div>
              <div className="gap-1 flex flex-col items-center w-[20%]">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
                  <TbTruckDelivery className="text-gray-500" size={50} strokeWidth={1} />
                </div>
                <div className="flex flex-col w-[100%] justify-center items-center">
                  <h3 className="font-semibold text-md text-center text-sky-600">Free Delivery</h3>
                </div>
              </div>
              <div className="gap-1 flex flex-col items-center w-[20%]">
                <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
                  <FiShield className="text-gray-500" size={40} strokeWidth={1} />
                  <FiCheck className="text-orange-400 absolute" />
                </div>
                <div className="flex flex-col w-[100%] justify-center items-center">
                  <h3 className="font-semibold text-md text-center text-sky-600">1 Year warranty</h3>
                </div>
              </div>
              <div className="gap-1 flex flex-col items-center w-[20%]">
                <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
                  <MdPayments className="text-gray-500" size={30} strokeWidth={1} />
                </div>
                <div className="flex flex-col w-[100%] justify-center items-center">
                  <h3 className="font-semibold text-md text-center text-sky-600">Pay on Delivery</h3>
                </div>
              </div>
              <div className="gap-1 flex flex-col items-center w-[20%]">
                <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
                  <FiLock className="text-gray-500" size={50} strokeWidth={1} />
                  <FiDollarSign className="text-orange-400 absolute mt-5" size={20} />
                </div>
                <div className="flex flex-col w-[100%] justify-center items-center">
                  <h3 className="font-semibold text-md text-center text-sky-600">Secure Transaction</h3>
                </div>
              </div>
            </div>

            <div className="border-gray-300 border mt-3"></div>

            {/* Location */}
            <div className="flex flex-row m-3 mt-1 items-center gap-2 min-w-0 cursor-pointer" onClick={() => openLocationPage()}>
              <FiMapPin className="text-lg self-start mt-1" />
              <p className="text-lg text-sky-600 font-semibold">
                Delivering to {(locationFlag) ? `${location.street}, ${location.town}, ${location.pincode}` : "ABC - XYZ - 123456"}
              </p>
              <p className="text-lg text-black font-semibold">- Update Location</p>
            </div>

            {/* Size Selector — shoe specific */}
            <div className="flex flex-col mx-3 mt-2 gap-1">
              <h3 className="text-lg font-medium">Select Size (UK):</h3>
              <div className="flex flex-wrap gap-2">
                {shoeData.sizes?.map((size, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSize(size)}
                    className={`border px-4 py-1 rounded-lg font-medium transition duration-200 
                      ${selectedSize === size
                        ? "bg-sky-600 text-white border-sky-600"
                        : "bg-gray-100 hover:bg-gray-200 text-black"}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + Cart + Buy */}
            <div className="flex flex-col gap-3 mt-3 mx-3">
              <div className="flex border mt-1 px-3 py-1 w-[40%] gap-1 rounded-lg bg-gray-100 hover:bg-gray-200 transition duration-300">
                <h3 className="text-lg font-medium">Quantity: </h3>
                <select name="quantity" id="" onChange={(e) => setItemQuantity(e.target.value)} className="outline-none w-[100%]">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>
              <div className="flex border px-3 py-2 w-[40%] gap-1 rounded-3xl bg-yellow-400 items-center justify-center hover:bg-yellow-500 transition duration-300">
                {!cartValue && <button className="text-lg" onClick={() => addToCart(shoeData._id, shoeData.productCategory)}>Add to cart</button>}
                {cartValue && <button className="text-lg" onClick={() => CartPage()}>Go to cart</button>}
              </div>
              <div className="flex border px-3 py-2 mb-3 w-[40%] gap-1 rounded-3xl bg-amber-500 items-center justify-center hover:bg-orange-500 transition duration-300">
                <button className="text-lg" onClick={() => paymentButton(shoeData._id, shoeData.productCategory)}>Buy now</button>
              </div>
            </div>

            {/* About this item */}
            <div className="mt-3 flex flex-col">
              <h3 className="text-xl font-bold">About this item</h3>
              <ul className="list-disc pl-4">
                <li>{shoeData.description?.highlights}</li>
                <li>Upper Material: {shoeData.description?.upperMaterial}</li>
                <li>Sole Material: {shoeData.description?.soleMaterial}</li>
                <li>Dimensions: {shoeData.description?.dimensions}</li>
                <li>Extras: {shoeData.description?.extras}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Explore More */}
        <div className="flex flex-col mt-0 m-3">
          <h3 className="text-2xl font-bold">Explore top deals in related categories</h3>
        </div>
        <div>
          <ExploreShoesProducts />
        </div>
      </div>

      {/* ── Mobile View ── */}
      <div className="border flex flex-col md:hidden">
        {popup && <AddToCart cartMessage={cartMessage} />}

        {/* Shoe Image */}
        <div className="flex items-center justify-center m-3 mt-1 py-3">
          <img src={shoeData.shoeImages?.[0]} alt="Error 404" className="w-[40%]" />
        </div>
        <div className="py-[2px] bg-gray-200"></div>

        {/* Shoe Name */}
        <div className="flex flex-row m-3 mt-1 gap-3 items-center">
          <p className="font-semibold text-xl line-clamp-2 break-words px-3">
            {shoeData.shoeName} ({shoeData.color}, {shoeData.shoeType})
          </p>
        </div>

        {/* Price */}
        <div className="flex flex-row m-3 mt-1 gap-3 items-center">
          <h3 className="text-2xl text-red-600">-{shoeData.discount}%</h3>
          <div className="flex items-center">
            <h3>₹</h3>
            <h4 className="text-3xl font-semibold">{shoeData.currentPrice}</h4>
          </div>
        </div>

        {/* Location */}
        <div className="flex flex-wrap items-center gap-2 m-3 mt-1 cursor-pointer" onClick={() => openLocationPage()}>
          <FiMapPin className="text-lg shrink-0" />
          <p className="text-base md:text-lg text-sky-600 font-semibold min-w-0">
            Delivering to {(locationFlag) ? `${location.street}, ${location.town}, ${location.pincode}` : "ABC - XYZ - 123456"}
          </p>
          <p className="text-base md:text-base text-black font-medium cursor-pointer whitespace-nowrap hover:underline">
            - Update Location
          </p>
        </div>

        {/* Size Selector — shoe specific */}
        <div className="flex flex-col m-3 mt-1 gap-1">
          <h3 className="text-lg font-medium">Select Size (UK):</h3>
          <div className="flex flex-wrap gap-2">
            {shoeData.sizes?.map((size, index) => (
              <button
                key={index}
                onClick={() => setSelectedSize(size)}
                className={`border px-4 py-1 rounded-lg font-medium transition duration-200 
                  ${selectedSize === size
                    ? "bg-sky-600 text-white border-sky-600"
                    : "bg-gray-100 hover:bg-gray-200 text-black"}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity + Cart + Buy */}
        <div className="flex flex-col gap-3 m-3 items-center justify-center">
          <div className="flex border mt-1 px-3 py-3 gap-1 rounded-lg bg-gray-100 hover:bg-gray-200 transition duration-300 w-full">
            <h3 className="text-lg font-medium">Quantity: </h3>
            <select name="quantity" id="" onChange={(e) => setItemQuantity(e.target.value)} className="outline-none w-full flex-1 max-w-full">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          <div className="flex border px-3 py-3 gap-1 rounded-xl bg-yellow-400 items-center justify-center hover:bg-yellow-500 transition duration-300 w-full">
            {!cartValue && <button className="text-lg" onClick={() => addToCart(shoeData._id, shoeData.productCategory)}>Add to cart</button>}
            {cartValue && <button className="text-lg" onClick={() => CartPage()}>Go to cart</button>}
          </div>
          <div className="flex border px-3 py-3 mb-3 gap-1 rounded-xl bg-amber-500 items-center justify-center hover:bg-orange-500 transition duration-300 w-full">
            <button className="text-lg" onClick={() => paymentButton(shoeData._id, shoeData.productCategory)}>Buy now</button>
          </div>
        </div>

        {/* Shop Info */}
        <div className="flex m-3 mt-1 gap-3 items-center justify-between w-[60%]">
          <div className="flex flex-col text-md">
            <h3>Shop From</h3>
            <h3>Sold by</h3>
          </div>
          <div className="flex flex-col text-md">
            <h3>Amazon</h3>
            <h3 className="text-sky-600 font-semibold">XYZ</h3>
          </div>
        </div>

        <div className="border-gray-600 border"></div>

        {/* Shop with confidence */}
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

        {/* About this item */}
        <div className="flex flex-col m-3">
          <h3 className="font-bold text-xl">About this item</h3>
          <div className="flex flex-col mt-1">
            <ul className="list-disc pl-4 font-medium text-lg">
              <li>{shoeData.description?.highlights}</li>
              <li>Upper Material: {shoeData.description?.upperMaterial}</li>
              <li>Sole Material: {shoeData.description?.soleMaterial}</li>
              <li>Dimensions: {shoeData.description?.dimensions}</li>
              <li>Extras: {shoeData.description?.extras}</li>
            </ul>
          </div>
        </div>

        <div className="py-[3px] bg-gray-200"></div>

        {/* Explore More */}
        <div className="flex flex-col mt-0 m-3">
          <h3 className="text-lg font-bold">Explore top deals in related categories</h3>
        </div>
        <div className="mt-0">
          <ExploreShoesProducts />
        </div>
        <PhoneOptions />
      </div>
    </>
  )
}

export default SelectedShoesPage
