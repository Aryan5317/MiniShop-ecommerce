import phoneDetailsService from "../../services/mobileServices/phoneDetailsService"
import { FaRupeeSign } from "react-icons/fa";
import { useEffect, useState } from "react"

function DesktopScreenFilterOption({ setFilterValue }) {
    const [allPhoneData, setAllPhoneData] = useState([])
    const [brandsName, setBrandsName] = useState([])
    const [priceRange, setPriceRange] = useState([])

    const [localFilter, setLocalFilter] = useState({
        Brands: [],
        price: "",
        Storage: [],
        Ram: [],
    })

    useEffect(() => {
        const mobileData = async () => {
            const phoneDetails = await phoneDetailsService()
            setAllPhoneData(phoneDetails.data.productData)
        }
        mobileData()
    }, [])

    useEffect(() => {
        const brands = allPhoneData.map(phone => phone.phoneBrand)
        setBrandsName(brands)
        const prices = allPhoneData.map(phone => phone.currentPrice)
        setPriceRange(prices)
    }, [allPhoneData])

    const handleBrandChange = (brand) => {
        setLocalFilter(prev => {
            const alreadySelected = prev.Brands.includes(brand)
            return {
                ...prev,
                Brands: (alreadySelected ? prev.Brands.filter(b => b !== brand) : [...prev.Brands, brand])
            }
        })
    }

    const handlePriceChange = (e) => {
        setLocalFilter(prev => ({
            ...prev,
            price: e.target.value
        }))
    }

    const handleStorageChange = (storage) => {
        setLocalFilter(prev => {
            const alreadySelected = prev.Storage.includes(storage)
            return {
                ...prev,
                Storage: (alreadySelected ? prev.Storage.filter(s => s !== storage) : [...prev.Storage, storage])
            }
        })
    }

    const handleRamChange = (ram) => {
        setLocalFilter(prev => {
            const alreadySelected = prev.Ram.includes(ram)
            return {
                ...prev,
                Ram: (alreadySelected ? prev.Ram.filter(r => r !== ram) : [...prev.Ram, ram])
            }
        })
    }
    const handleApplyFilter = () => {
        setFilterValue(localFilter)
        console.log("Filter Applied: ", localFilter)
    }

    return (
        <div className="border-gray-100 hidden md:flex flex-col w-[25%] shrink-0 min-h-screen">
            <div className="m-1 flex flex-col items-left justify-center px-3 pt-3 gap-3">
                <div className="flex flex-col items-left justify-center">
                    <h3 className="text-lg font-semibold">Brands</h3>
                    {brandsName.map((name, index) => (
                        <label key={index} className="flex px-3 text-md font-medium items-center gap-2">
                            <input
                                type="checkbox"
                                className="w-4 h-4 accent-sky-600"
                                checked={localFilter.Brands.includes(name)} 
                                onChange={() => handleBrandChange(name)}
                            />
                            {name}
                        </label>
                    ))}
                </div>
                <div className="flex flex-col items-left justify-center">
                    <h3 className="text-lg font-semibold">Price</h3>
                    <div className="flex items-center px-3 py-1">
                        <FaRupeeSign className="text-sm font-light" />
                        <h3 className="text-lg font-medium">{localFilter.price ? localFilter.price : Math.min(...priceRange)}</h3>
                        <h3 className="px-1 text-lg font-normal">-</h3>
                        <FaRupeeSign className="text-sm font-light" />
                        <h3 className="text-lg font-medium">{Math.max(...priceRange)}+</h3>
                    </div>
                    <div className="px-3 py-1">
                        <input
                            className="w-full"
                            type="range"
                            min={Math.min(...priceRange)}
                            max={Math.max(...priceRange)}
                            value={localFilter.price || Math.max(...priceRange)} 
                            onChange={handlePriceChange}
                        />
                    </div>
                </div>
                <div className="flex flex-col items-left justify-center">
                    <h3 className="text-lg font-semibold">Storage Capacity</h3>
                    <label className="flex flex-col justify-center px-3 py-1 gap-2">
                        {["64GB", "128GB"].map((storage) => (
                            <div key={storage} className="font-medium text-md gap-2 flex items-center">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 accent-sky-600"
                                    checked={localFilter.Storage.includes(storage)} 
                                    onChange={() => handleStorageChange(storage)}
                                />
                                {storage}
                            </div>
                        ))}
                    </label>
                </div>
                <div className="flex flex-col items-left justify-center">
                    <h3 className="text-lg font-semibold">Ram Size</h3>
                    <label className="flex flex-col justify-center px-3 py-1 gap-2">
                        {["4 to 5.9 GB", "6 to 7.9 GB", "8 to 9.9 GB"].map((ram) => (
                            <div key={ram} className="font-medium text-md gap-2 flex items-center">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 accent-sky-600"
                                    checked={localFilter.Ram.includes(ram)} 
                                    onChange={() => handleRamChange(ram)}
                                />
                                {ram}
                            </div>
                        ))}
                    </label>
                </div>
                <div>
                    <button
                        onClick={handleApplyFilter}
                        className="w-full bg-sky-600 text-white font-semibold py-2 rounded-lg hover:bg-sky-700">
                        Apply Filter
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DesktopScreenFilterOption
