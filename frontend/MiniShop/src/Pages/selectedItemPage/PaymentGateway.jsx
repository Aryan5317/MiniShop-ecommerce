import { useEffect, useState } from "react"
import { useParams, useNavigate, useSearchParams } from "react-router-dom"
import phoneDetailsService from "../../services/mobileServices/phoneDetailsService"
import bagDetailsService from "../../services/bagsService/bagDetailsService"
import watchDetailsService from "../../services/watchService/watchDetailsService"
import clothDetailsService from "../../services/clothesService/clothDetailsService"
import earPhoneService from "../../services/earPhoneService/earPhoneService"
import shoesDetailsService from "../../services/shoesService/shoesDetailsService"
import { FiChevronDown, FiCreditCard, FiX } from "react-icons/fi"
import { MdPayments } from "react-icons/md"
import { TbTruckDelivery } from "react-icons/tb"
import { SiGooglepay, SiPhonepe, SiPaytm } from "react-icons/si"
import orderDetalsService from "../../services/mobileServices/orderDetalsService"
const PaymentGateway = () => {
    const navigate = useNavigate();
    const [productDetails, setProductDetails] = useState({})
    const [activeSection, setActiveSection] = useState("upi");
    const [selectedUPI, setSelectedUPI] = useState("googlePay");
    const [payValue, setPayValue] = useState(false)
    const [paymentKey, setPaymentKey] = useState("");
    const [userPaymentKey, setUserpaymentKey] = useState("");
    const [passKeyMessage, setPassKeyMessage] = useState("")
    const params = useParams();
    const [searchParams] = useSearchParams();
    const productQuantity = searchParams.get("quantity")
    const productId = params.id;
    const Category = searchParams.get("category")

    const upiOptions = [
        { value: "googlePay", label: "Google Pay", icon: <SiGooglepay className="text-2xl text-blue-500" /> },
        { value: "phonePay", label: "PhonePe", icon: <SiPhonepe className="text-xl text-purple-600" /> },
        { value: "paytm", label: "Paytm", icon: <SiPaytm className="text-xl text-blue-400" /> },
    ];

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
            const product = async () => {
                const responseData = await selectedCategory();
                console.log("Response data is: ", responseData.data.productData)
                for (let i = 0; i < responseData.data.productData.length; i++) {
                    if (responseData.data.productData[i]._id === productId) {
                        console.log("Product is: ", responseData.data.productData[i])
                        setProductDetails(responseData.data.productData[i]);
                    }
                }
            }
            product();
        }
        else {
            console.log("Category not found in mapping.")
        }
    }, [])

    useEffect(() => {
        const randomValue = Math.floor(Math.random() * 900000 + 100000)
        console.log("Random value is genrated: ", randomValue.toString().length)
        if (randomValue.toString().length > 5) {
            setPaymentKey(randomValue)
        }
    }, [])

    const toggleSection = (section) => {
        setActiveSection((prev) => (prev === section ? null : section));
    };
    const PayAmount = () => {
        setPayValue((prev) => !prev)
    }
    const lastPage = () => {
        navigate(-1)
    }

    const matchKeyValue = () => {
        if (userPaymentKey === paymentKey.toString()) {
            console.log("Key is correct")
            const orderDetails = async () => {
                const totalAmount = productDetails.currentPrice * Number(productQuantity)
                const responseData = await orderDetalsService(Category, productId, productQuantity, totalAmount);
                console.log("Response Data", responseData)
                if (responseData) {
                    setPassKeyMessage("Payment Key matched")
                    setTimeout(() => {
                        setPayValue(false)
                        navigate(`/order/success`)
                    }, 1000)
                }
            }
            orderDetails();
        }
        else {
            console.log("key is incorrect");
            setPassKeyMessage("Payment key doesn't matched. Enter correct payment key")
            setUserpaymentKey("")
        }
    }
    const selectedUPIOption = upiOptions.find((opt) => opt.value === selectedUPI);
    const getProductFields = () => {

        if (Category === "Phones") {
            return {
                productName: `${productDetails.phoneName}`,
            }
        }

        else if (Category === "Bags") {
            return {
                productName: `${productDetails.bagName}`,
            }
        }
        else if (Category === "Watches") {
            return {
                productName: `${productDetails.watchName}`,
            }
        }
        else if(Category === "Clothes"){
            return {
                productName: `${productDetails.clothingName}`,
            }
        }
        else if (Category === "Earphones") {
            return {
                productName: `${productDetails.earphonesName}`
            }
        }
        else if (Category === "Shoes") {
            return {
                productName: `${productDetails.shoeName}`
            }
        }
        return {
            productName: "Unknown Product",
        }
    }
    const { productName } = getProductFields()
    return (
        <div className="flex flex-col">
            <div className="hidden md:flex border border-gray-300 shadow-lg  bg-blue-100">
                <h3 className="px-3 py-3 text-sky-600 font-medium text-2xl">MiniShop</h3>
            </div>
            <div className="flex md:hidden shadow-lg  bg-blue-100 border border-gray-300">
                <h3 className="px-3 py-4 text-sky-600 font-medium text-2xl">MiniShop</h3>
            </div>
            <div className="min-h-screen bg-gray-100 flex items-start justify-center py-6 px-4 ">
                <div className="border border-gray-200 rounded-xl overflow-hidden w-full max-w-md md:max-w-3xl bg-white">
                    <div className="px-5 py-4 border-b border-gray-100">
                        <h2 className="text-xl font-medium">Payment options</h2>
                    </div>
                    {payValue && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                            <div className="bg-white rounded-lg border border-gray-200 w-[90%] max-w-md p-5 relative">
                                <button
                                    className="absolute top-3 right-3 text-gray-500 hover:text-black"
                                    onClick={() => setPayValue(false)}
                                >
                                    <FiX size={20} />
                                </button>

                                <h3 className="text-sm md:text-base text-gray-500 mb-3">
                                    Type <span className="font-semibold text-sky-600">{paymentKey}</span> below to confirm your payment
                                </h3>
                                <input
                                    type="text"
                                    name="paymentValue"
                                    value={userPaymentKey}
                                    onChange={(e) =>
                                        setUserpaymentKey(e.target.value.replace(/\D/g, ""))
                                    }
                                    placeholder="Enter numbers only..."
                                    className="border border-gray-200 rounded-lg px-4 py-3 text-sm md:text-base text-gray-700 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 w-full"
                                />
                                <div className="flex justify-center mt-5">
                                    <button className="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-2.5 rounded-lg transition" onClick={() => matchKeyValue()}>
                                        Pay Now
                                    </button>
                                </div>
                                <div className="flex gap-1 ">
                                    <h3>*</h3>
                                    <h3 className="mt-1 text-sm text-red-500">{passKeyMessage}</h3>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-[60%] md:border-r border-gray-100">
                            <div className="border-b border-gray-100">
                                <div
                                    className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50"
                                    onClick={() => toggleSection("upi")}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                            <MdPayments className="text-blue-500 text-base" />
                                        </div>
                                        <span className="text-lg font-medium">UPI</span>
                                    </div>
                                    <FiChevronDown
                                        className={`transition-transform duration-200 ${activeSection === "upi" ? "rotate-180" : ""}`}
                                    />
                                </div>
                                {activeSection === "upi" && (
                                    <div className="px-5 pb-4">
                                        {upiOptions.map((opt) => (
                                            <div
                                                key={opt.value}
                                                className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0 cursor-pointer"
                                                onClick={() => setSelectedUPI(opt.value)}
                                            >
                                                <input
                                                    type="radio"
                                                    name="upi"
                                                    value={opt.value}
                                                    checked={selectedUPI === opt.value}
                                                    onChange={() => setSelectedUPI(opt.value)}
                                                />
                                                <div className="w-8 h-8 flex items-center justify-center">
                                                    {opt.icon}
                                                </div>
                                                <label className="text-md cursor-pointer">{opt.label}</label>
                                            </div>
                                        ))}
                                        <button className="mt-3 w-full py-2.5 rounded-lg bg-blue-50 text-blue-600 text-md font-medium hover:bg-blue-100 transition flex items-center justify-center gap-2" onClick={() => PayAmount()}>
                                            {selectedUPIOption?.icon}
                                            Pay ₹{productDetails.currentPrice * Number(productQuantity)} via {selectedUPIOption?.label}
                                        </button>
                                    </div>

                                )}
                            </div>
                            <div className="border-b border-gray-100">
                                <div
                                    className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50"
                                    onClick={() => toggleSection("card")}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                            <FiCreditCard className="text-blue-500 text-base" />
                                        </div>
                                        <span className="text-md font-medium">Credit / Debit / ATM card</span>
                                    </div>
                                    <FiChevronDown
                                        className={`transition-transform duration-200 ${activeSection === "card" ? "rotate-180" : ""}`}
                                    />
                                </div>
                                {activeSection === "card" && (
                                    <div className="px-5 pb-4">
                                        <button className="w-full py-2.5 rounded-lg bg-blue-50 text-blue-600 text-md font-medium hover:bg-blue-100 transition flex items-center justify-center gap-2" onClick={() => PayAmount()}>
                                            <FiCreditCard className="text-base" />
                                            Pay ₹{productDetails.currentPrice * Number(productQuantity)} via card
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div>
                                <div
                                    className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50"
                                    onClick={() => toggleSection("cod")}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                            <TbTruckDelivery className="text-blue-500 text-base" />
                                        </div>
                                        <span className="text-md font-medium">Cash on delivery</span>
                                    </div>
                                    <FiChevronDown
                                        className={`transition-transform duration-200 ${activeSection === "cod" ? "rotate-180" : ""}`}
                                    />
                                </div>
                                {activeSection === "cod" && (
                                    <div className="px-5 pb-4">
                                        <p className="text-md text-gray-400 mb-3">
                                            Pay ₹{productDetails.currentPrice * Number(productQuantity)} in cash when your order arrives.
                                        </p>
                                        <button className="w-full py-2.5 rounded-lg bg-blue-50 text-blue-600 text-md font-medium hover:bg-blue-100 transition flex items-center justify-center gap-2" onClick={() => PayAmount()}>
                                            <TbTruckDelivery className="text-base" />
                                            Confirm order
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="hidden md:flex flex-col w-[40%] p-5 gap-4">
                            <h3 className="text-base font-medium border-b border-gray-100 pb-3">Order summary</h3>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">Product</span>
                                <span className="text-sm font-medium">{productName}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">Price</span>
                                <span className="text-sm font-medium">₹{productDetails.currentPrice}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">Quantity</span>
                                <span className="text-sm font-medium">{Number(productQuantity)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">Discount</span>
                                <span className="text-sm font-medium text-green-500">-{productDetails.discount}%</span>
                            </div>
                            <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
                                <span className="text-sm font-medium">Total</span>
                                <span className="text-lg font-semibold">₹{productDetails.currentPrice * Number(productQuantity)}</span>
                            </div>
                        </div>

                    </div>

                    <div className="md:hidden px-5 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                        <p className="text-md font-medium">Total amount</p>
                        <p className="text-xl font-medium">₹{productDetails.currentPrice * Number(productQuantity)}</p>
                    </div>
                    <div className="flex items-center justify-center px-5 py-4 ">
                        <button className="px-6 py-2.5 rounded-lg bg-gray-300 border border-gray-300 text-sm md:text-base font-medium text-gray-600 hover:bg-gray-200 transition" onClick={() => lastPage()}>
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default PaymentGateway