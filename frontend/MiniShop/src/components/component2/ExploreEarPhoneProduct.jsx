import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FiStar } from "react-icons/fi"
import earPhoneService from "../../services/earPhoneService/earPhoneService"

function ExploreEarPhoneProduct() {
    const navigate = useNavigate()
    const [productData, setProductData] = useState([])

    useEffect(() => {
        const products = async () => {
            const productDetails = await earPhoneService();
            console.log("EarPhones details: ", productDetails.data.productData)

            // Sort earphones by discount (highest first)
            const len = productDetails.data.productData.length;
            for (let i = 0; i < len; i++) {
                for (let j = 0; j < len - i - 1; j++) {
                    if (productDetails.data.productData?.[j].discount < productDetails.data.productData?.[j + 1].discount) {
                        let temp = productDetails.data.productData?.[j];
                        productDetails.data.productData[j] = productDetails.data.productData?.[j + 1];
                        productDetails.data.productData[j + 1] = temp;
                    }
                }
            }

            console.log("Sorted EarPhones details: ", productDetails.data.productData);
            setProductData(productDetails.data.productData);
        }
        products();
    }, [])

    const navigateEarPhonePage = (id) => {
        console.log("Navigating to earphone: ", id)
        navigate(`/earphone/${id}`)
        window.scrollTo(0, 0)
    }

    return (
        <div className="overflow-x-auto">
            <div className="flex flex-row w-max pb-15">
                {productData.map((data) => (
                    <div
                        key={data._id}
                        onClick={() => navigateEarPhonePage(data._id)}
                        className="w-[160px] sm:w-[220px] lg:w-[280px] m-3 border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 items-center flex flex-col shrink-0 bg-white p-2 cursor-pointer"
                    >
                        {/* Earphone Image */}
                        <div className="w-full flex justify-center overflow-hidden h-[10vh] sm:h-[25vh] lg:h-[32vh]">
                            <img
                                src={data.earphonesImages?.[0]}
                                alt={data.earphonesName}
                                className="h-full w-full object-contain"
                            />
                        </div>

                        {/* Earphone Name & Details */}
                        <div className="mt-1 flex">
                            <p className="text-sky-600 text-left line-clamp-4 text-md font-semibold">
                                {data.earphonesName} ({data.color}) | {data.productCategory} | {data.earphonesType} | {data.connectivity}
                            </p>
                        </div>

                        {/* Rating */}
                        <div className="flex flex-row justify-start w-full mt-1 gap-3 px-1 items-center">
                            <div className="flex flex-row">
                                <FiStar className="text-xl text-orange-500" />
                                <FiStar className="text-xl text-orange-500" />
                                <FiStar className="text-xl text-orange-500" />
                                <FiStar className="text-xl text-orange-500" />
                                <FiStar className="text-xl text-orange-500" />
                            </div>
                            <div>
                                <h3 className="text-sky-600 text-lg">{data.reviews.length}</h3>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="flex flex-row mt-1 justify-start w-full gap-3">
                            <h3 className="text-red-600 text-2xl">-{data.discount}%</h3>
                            <h3 className="flex items-center justify-center text-2xl">₹{data.currentPrice}</h3>
                        </div>

                        {/* MRP */}
                        <div className="flex flex-row mt-1 justify-start w-full gap-1">
                            <h3>M.R.P.:</h3>
                            <h3 className="flex items-center justify-center text-md text-gray-500 line-through">₹{data.oldPrice}</h3>
                        </div>

                        {/* Free Delivery */}
                        <div className="flex flex-row justify-start w-full">
                            <h3 className="text-md">FREE Delivery over ₹499.</h3>
                        </div>

                        {/* Noise Cancellation Badge */}
                        {data.noiseCancellation === "Active Noise Cancellation" && (
                            <div className="flex flex-row justify-start w-full">
                                <h3 className="text-md text-green-600 font-semibold">✦ Active Noise Cancellation</h3>
                            </div>
                        )}

                        {/* Low Stock Warning */}
                        {data.stock < 3 && (
                            <div className="flex flex-row justify-start w-full">
                                <h3 className="text-md text-red-500 font-semibold">
                                    Only {data.stock} left in stock.
                                </h3>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ExploreEarPhoneProduct