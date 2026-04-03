import Navbar from "../../components/component1/Navbar"
import { useParams, useNavigate, useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react";
import phoneDetailsService from "../../services/mobileServices/phoneDetailsService";
import bagDetailsService from "../../services/bagsService/bagDetailsService";
import locationService from "../../services/locationService";
import watchDetailsService from "../../services/watchService/watchDetailsService";
import clothDetailsService from "../../services/clothesService/clothDetailsService";
import earPhoneService from "../../services/earPhoneService/earPhoneService";
import shoesDetailsService from "../../services/shoesService/shoesDetailsService";

function CheckOutPage() {
    const navigate = useNavigate();
    const params = useParams();
    const productId = params.id;
    const [searchParams] = useSearchParams();
    const Category = searchParams.get("category")
    const productQuantity = searchParams.get("quantity")
    const [productDetails, setProductDetails] = useState({})
    const [locationName, setLocationName] = useState("")
    const [location, setLocation] = useState([])
    const [locationFlag, setLocationFlag] = useState(false)
    const ProductCategoryMap = {
        Phones: phoneDetailsService,
        Bags: bagDetailsService,
        Watches: watchDetailsService,
        Clothes: clothDetailsService,
        Earphones: earPhoneService,
        Shoes: shoesDetailsService
    }

    useEffect(() => {
        console.log("Category from URL: ", Category)
        const selectedCategory = ProductCategoryMap[Category]
        if (selectedCategory) {
            const productOutput = async () => {
                const responseData = await selectedCategory()

                if (!responseData?.success) {
                    console.log("Error:", responseData?.message)
                    return
                }

                for (let i = 0; i < responseData.data.productData.length; i++) {
                    if (responseData.data.productData[i]._id === productId) {
                        setProductDetails(responseData.data.productData[i])
                    }
                }
            }
            productOutput()
        } else {
            console.log("Category not found in mapping.")
        }
    }, [])

    useEffect(() => {
        const locationData = async () => {
            const response = await locationService()
            console.log("Location response is: ", response.data)
            if (response?.success) {
                setLocationName(response.data.fullname)
            }
            if (!(response?.data?.defaultLocation)) {
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

    const cancelOrder = () => {
        console.log("Navigating back");
        navigate(-1);
    }

    const orderPlaced = () => {
        console.log("Payment page opened");
        setTimeout(() => {
            navigate(`/product/${productId}/orderSummary/payment-gateway?quantity=${productQuantity}&category=${Category}`)
        }, 3000)
    }
    const getProductFields = () => {

        if (Category === "Phones") {
            return {
                productImage: productDetails.phoneImages?.[0],
                productName: `${productDetails.phoneName} (${productDetails.color}, ${productDetails.phoneRam}GB + ${productDetails.phoneStorage}GB)`,
                productPrice: productDetails.currentPrice,
            }
        }

        else if (Category === "Bags") {
            return {
                productImage: productDetails.bagImages?.[0],
                productName: `${productDetails.bagName} (${productDetails.color}) | ${productDetails.bagType} | ${productDetails.capacity}`,
                productPrice: productDetails.currentPrice,
            }
        }

        else if (Category === "Clothes") {
            return {
                productImage: productDetails.clothingImages?.[0],
                productName: `${productDetails.clothingName} (${productDetails.color}) | ${productDetails.productCategory} | ${productDetails.fit} | ${productDetails.sleeveType}`,
                productPrice: productDetails.currentPrice,
            }
        }
        else if (Category === "Earphones") {
            return {
                productImage: productDetails.earphonesImages?.[0],
                productName: `${productDetails.earphonesName} (${productDetails.color}) | ${productDetails.productCategory} | ${productDetails.earphonesType} | ${productDetails.connectivity}`,
                productPrice: productDetails.currentPrice,
            }
        }
        else if (Category === "Shoes") {
            return {
                productImage: productDetails.shoeImages?.[0],
                productName: `${productDetails.shoeName} (${productDetails.color}) | ${productDetails.shoeType} | ${productDetails.material} | ${productDetails.closure}`,
                productPrice: productDetails.currentPrice,
            }
        }
        else if (Category === "Watches") {
            return {
                productImage: productDetails.watchImages?.[0],
                productName: `${productDetails.watchName} (${productDetails.color}) | ${productDetails.productCategory} | ${productDetails.watchBrand} | ${productDetails.strapMaterial}`,
                productPrice: productDetails.currentPrice,
            }
        }
        return {
            productImage: "",
            productName: "Unknown Product",
            productPrice: 0,
        }
    }
    const { productImage, productName, productPrice } = getProductFields()

    return (
        <div>
            <Navbar />
            <div className="flex flex-col gap-3 md:hidden">
                <div className="flex flex-col m-3 mt-3 mb-3 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                    <div className="flex items-center border-b border-gray-200 bg-gray-50">
                        <h3 className="font-semibold text-2xl py-2 px-3">Order Summary</h3>
                    </div>
                    <div className="flex flex-col border-b border-gray-200">
                        <h3 className="font-medium text-lg px-3 py-1">Items</h3>
                        <div className="flex bg-white">
                            <div className="flex items-center h-[15vh] w-[25%] shrink-0 m-1 bg-gray-200">
                                <img
                                    src={productImage}
                                    alt="Error 404"
                                    className="h-full w-[100%] object-contain px-1"
                                />
                            </div>
                            <div className="flex flex-1 min-w-0 items-center px-2">
                                <p className="text-sky-600 font-semibold text-md line-clamp-3">
                                    {productName}
                                </p>
                            </div>
                            <div className="flex items-center justify-center">
                                <h3 className="font-semibold px-2">₹{productPrice}</h3>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col border-b border-gray-200 px-3 py-2">
                        <h3 className="text-2xl py-1 font-semibold">Shipping Address</h3>
                        <div className="flex flex-col mt-1">
                            <h3 className="text-xl font-semibold">{locationName}</h3>
                            <p className="text-lg font-semibold text-gray-600">
                                {location.street} {location.town} {location.district} {location.state} {location.pincode}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col bg-white">
                        <h3 className="text-xl py-2 px-3 font-semibold border-b border-gray-200">Total Amount</h3>
                        <div className="flex justify-between px-3 py-2">
                            <h3>SubTotal:</h3>
                            <h3>₹{productPrice * productQuantity}</h3>
                        </div>
                        <div className="flex justify-between px-3 py-2">
                            <h3>Delivery Charge:</h3>
                            <h3>₹50</h3>
                        </div>
                        <div className="border-b border-gray-200 flex justify-between px-3 py-2">
                            <h3>Discount:</h3>
                            {(productPrice * productQuantity) > 500
                                ? <h3 className="line-through">₹50</h3>
                                : <h3>₹50</h3>
                            }
                        </div>
                        <div className="flex justify-between px-3 py-3 bg-gray-50">
                            <h3 className="font-bold text-xl">Order Total:</h3>
                            {(productPrice * productQuantity) > 500
                                ? <h3 className="font-bold text-xl">₹{productPrice * productQuantity}</h3>
                                : <h3 className="font-bold text-xl">₹{productPrice * productQuantity + 50}</h3>
                            }
                        </div>
                    </div>
                </div>

                <div className="flex flex-row gap-3 mx-3 mb-3">
                    <div className="flex-1 bg-blue-500 rounded-xl shadow-md hover:bg-blue-600 transition duration-300 flex items-center justify-center">
                        <button className="text-lg font-semibold px-3 py-3 text-white" onClick={() => orderPlaced()}>Place Order</button>
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-xl shadow-md hover:bg-gray-300 transition duration-300 flex items-center justify-center">
                        <button className="text-lg font-semibold px-3 py-3 text-gray-700" onClick={() => cancelOrder()}>Cancel Order</button>
                    </div>
                </div>
            </div>

            <div className="hidden md:flex flex-col gap-3 px-6 py-4">
                <div className="flex flex-row gap-6">
                    <div className="flex flex-col flex-1 gap-4">
                        <div className="flex flex-col bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                            <div className="flex items-center border-b border-gray-200 bg-gray-50">
                                <h3 className="font-semibold text-2xl py-2 px-4">Order Summary</h3>
                            </div>

                            <div className="flex flex-col border-b border-gray-200">
                                <h3 className="font-medium text-lg px-4 py-2">Items</h3>
                                <div className="flex bg-white">
                                    <div className="flex items-center h-[20vh] w-[15%] shrink-0 m-2 bg-gray-200 rounded-lg">
                                        <img
                                            src={productImage}
                                            alt="Error 404"
                                            className="h-full w-full object-contain px-1"
                                        />
                                    </div>
                                    <div className="flex flex-1 min-w-0 items-center px-3">
                                        <p className="text-sky-600 font-semibold text-lg line-clamp-3">
                                            {productName}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-center px-4">
                                        <h3 className="font-semibold text-xl">₹{productPrice}</h3>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col px-4 py-3">
                                <h3 className="text-xl font-semibold">Shipping Address</h3>
                                <div className="flex flex-col mt-2">
                                    <h3 className="text-lg font-semibold">{locationName}</h3>
                                    <p className="text-md font-semibold text-gray-600">
                                        {location.street} {location.town} {location.district} {location.state} {location.pincode}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col w-[35%] gap-4">
                        <div className="flex flex-col bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                            <h3 className="text-xl py-2 px-4 font-semibold border-b border-gray-200 bg-gray-50">Total Amount</h3>
                            <div className="flex justify-between px-4 py-2">
                                <h3>SubTotal:</h3>
                                <h3>₹{productPrice * productQuantity}</h3>
                            </div>
                            <div className="flex justify-between px-4 py-2">
                                <h3>Delivery Charge:</h3>
                                <h3>₹50</h3>
                            </div>
                            <div className="border-b border-gray-200 flex justify-between px-4 py-2">
                                <h3>Discount:</h3>
                                {(productPrice * productQuantity) > 500
                                    ? <h3 className="line-through">₹50</h3>
                                    : <h3>₹50</h3>
                                }
                            </div>
                            <div className="flex justify-between px-4 py-3 bg-gray-50">
                                <h3 className="font-bold text-xl">Order Total:</h3>
                                {(productPrice * productQuantity) > 500
                                    ? <h3 className="font-bold text-xl">₹{productPrice * productQuantity}</h3>
                                    : <h3 className="font-bold text-xl">₹{productPrice * productQuantity + 50}</h3>
                                }
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="bg-blue-500 rounded-xl shadow-md hover:bg-blue-600 transition duration-300 flex items-center justify-center">
                                <button className="text-lg font-semibold px-3 py-3 text-white w-full" onClick={() => orderPlaced()}>Place Order</button>
                            </div>
                            <div className="bg-gray-200 rounded-xl shadow-md hover:bg-gray-300 transition duration-300 flex items-center justify-center">
                                <button className="text-lg font-semibold px-3 py-3 text-gray-700 w-full" onClick={() => cancelOrder()}>Cancel Order</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckOutPage
