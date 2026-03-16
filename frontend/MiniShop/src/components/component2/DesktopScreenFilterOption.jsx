import phoneDetailsService from "../../services/mobileServices/phoneDetailsService"
import { FaRupeeSign } from "react-icons/fa";
import { useEffect, useState } from "react"

function DesktopScreenFilterOption() {
    const [allPhoneData, setAllPhoneData] = useState([])
    const [brandsName, setBrandsName] = useState([])
    const [priceRange, setPriceRange] = useState([])
    useEffect(() => {
        const mobileData = async () => {
            const phoneDetails = await phoneDetailsService()
            console.log("phone details in dektop components: ", phoneDetails.data.phoneData)
            setAllPhoneData(phoneDetails.data.phoneData)
        }
        mobileData()
    }, [])
    useEffect(() => {
        const brands = allPhoneData.map(phone => phone.phoneBrand)
        console.log("Brands name: ", brands)
        setBrandsName(brands)
        const prices = allPhoneData.map(phone => phone.currentPrice)
        console.log("Price are: ", prices)
        setPriceRange(prices)
    }, [allPhoneData, setAllPhoneData])


    return (
        <div className="border-gray-100 hidden md:flex flex-col w-[25%] shrink-0 min-h-screen">            <div className="m-1 flex flex-col items-left justify-center px-3 pt-3 gap-3">
            <div className="flex flex-col items-left justify-center">
                <h3 className="text-lg font-semibold ">Brands</h3>
                {brandsName.map((name, index) => (<label
                    key={index}
                    className="flex px-3 text-md font-medium items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 accent-sky-600" />
                    {name}
                </label>))}
            </div>
            <div className="flex flex-col items-left justify-center">
                <h3 className="text-lg font-semibold">Price</h3>
                <div className="flex items-center px-3 py-1">
                    <FaRupeeSign className="text-sm font-light" />
                    <h3 className="text-lg font-medium">{Math.min(...priceRange)}</h3>
                    <h3 className="px-1 text-lg font-normal ">-</h3>
                    <FaRupeeSign className="text-sm font-light" />
                    <h3 className="text-lg font-medium">{Math.max(...priceRange)}+</h3>
                </div>
                <div className="px-3 py-1">
                    <input className="w-full" type="range" min={Math.min(...priceRange)} max={Math.max(...priceRange)} />
                </div>
            </div>
            <div className="flex flex-col items-left justify-center">
                <h3 className="text-lg font-semibold ">Storage Capacity</h3>
                <label className="flex flex-col justify-center px-3 py-1 gap-2">
                    <div className="font-medium text-md gap-2 flex items-center">
                        <input type="checkbox" className="w-4 h-4 accent-sky-600" />
                        64GB
                    </div>
                    <div className="font-medium text-md gap-2 flex items-center">
                        <input type="checkbox" className="w-4 h-4 accent-sky-600" />
                        128GB
                    </div>
                </label>
            </div>
            <div className="flex flex-col items-left justify-center">
                <h3 className="text-lg font-semibold ">Ram Size</h3>
                <label className="flex flex-col justify-center px-3 py-1 gap-2">
                    <div className="font-medium text-md gap-2 flex items-center">
                        <input type="checkbox" className="w-4 h-4 accent-sky-600" />
                        4 to 5.9 GB
                    </div>
                    <div className="font-medium text-md gap-2 flex items-center">
                        <input type="checkbox" className="w-4 h-4 accent-sky-600" />
                        6 to 7.9 GB
                    </div>
                    <div className="font-medium text-md gap-2 flex items-center">
                        <input type="checkbox" className="w-4 h-4 accent-sky-600" />
                        8 to 9.9 GB
                    </div>
                </label>
            </div>
        </div>
        </div>

    )
}

export default DesktopScreenFilterOption
