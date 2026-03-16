import phoneDetailsService from "../../services/mobileServices/phoneDetailsService"
import { useEffect, useState } from "react"
import { FiStar } from "react-icons/fi"
function ExploreMobileProducts() {
    const [productData, setProductData] = useState([])
    useEffect(() => {
        const products = async () => {
            const productDetails = await phoneDetailsService();
            console.log("Product details: ", productDetails.data.phoneData)
            const len = productDetails.data.phoneData.length;
            for (let i = 0; i < len; i++) {
                for (let j = 0; j < len - i - 1; j++) {
                    if (productDetails.data.phoneData?.[j].discount < productDetails.data.phoneData?.[j + 1].discount) {
                        let temp = productDetails.data.phoneData?.[j];
                        productDetails.data.phoneData[j] = productDetails.data.phoneData?.[j + 1];
                        productDetails.data.phoneData[j + 1] = temp;
                    }
                }
            }
            console.log("New Product details is: ", productDetails.data.phoneData);
            setProductData(productDetails.data.phoneData);
        }
        products();
    }, [])

    return (
        <div className="m-3 flex flex-row">
            <div className="flex flex-row">
                {productData.map((data) => (
                    <div key={data._id} className="flex-1 m-3 items-center flex flex-col overflow-y-hidden">
                        <div className="w-full flex justify-center">
                            <img src={data.phoneImages?.[0]} alt="" className="h-[32vh] w-[50%]" />
                        </div>
                        <div className="mt-1">
                            <p className="text-sky-600 text-center line-clamp-4 text-md font-semibold">{data.phoneName}({data.color}, {data.phoneRam}GB + {data.phoneStorage}GB) | {data.description.display} | {data.description.camera}</p>
                        </div>
                        <div className="flex flex-row justify-start w-full mt-1 gap-3 px-1 items-center">
                            <div className="flex flex-row ">
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
                        <div className="flex flex-row mt-1 justify-start w-full gap-3">
                            <h3 className="text-red-600 text-2xl">-{data.discount}%</h3>
                            <h3 className="flex items-center justify-center text-2xl">₹{data.currentPrice}</h3>
                        </div>
                        <div className="flex flex-row mt-1 justify-start w-full gap-1">
                            <h3>M.R.P.:</h3>
                            <h3 className="flex items-center justify-center text-md text-gray-500 line-through">₹{data.oldPrice}</h3>
                        </div>
                        <div className="flex flex-row justify-start w-full">
                            <h3 className="text-md">FREE Delivery over ₹499.</h3>
                        </div>
                        {(data.stock < 3) && <div className="flex flex-row  justify-start w-full">
                            <h3 className="flex flex-row text-md">Only {data.stock} left in stock.</h3>
                        </div>}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ExploreMobileProducts
