import { FaRupeeSign } from "react-icons/fa";
import { useEffect, useState } from "react"
import earPhoneService from "../../services/earPhoneService/earPhoneService";

function EarPhonesDesktopScreenFilter({ setFilterValue }) {
    const [allEarPhoneData, setAllEarPhoneData] = useState([])
    const [brandsName, setBrandsName] = useState([])
    const [priceRange, setPriceRange] = useState([])
    const [earphoneCategories, setEarphoneCategories] = useState([])

    // ✅ localFilter — tracks selections until Apply is clicked
    const [localFilter, setLocalFilter] = useState({
        Brands: [],
        price: "",
        Type: [],
        Category: [],
        Connectivity: [],
        NoiseCancellation: [],
        WaterResistance: []
    })

    useEffect(() => {
        const earPhoneData = async () => {
            const earPhoneDetails = await earPhoneService()
            setAllEarPhoneData(earPhoneDetails.data.productData)
        }
        earPhoneData()
    }, [])

    useEffect(() => {
        if (allEarPhoneData.length === 0) return
        const brands = [...new Set(allEarPhoneData.map(earphone => earphone.earphonesBrand))]
        setBrandsName(brands)
        const prices = allEarPhoneData.map(earphone => earphone.currentPrice)
        setPriceRange(prices)
        const categories = [...new Set(allEarPhoneData.map(earphone => earphone.category))]
        setEarphoneCategories(categories)
    }, [allEarPhoneData])

    // ✅ Brand handler
    const handleBrandChange = (brand) => {
        setLocalFilter(prev => {
            const alreadySelected = prev.Brands.includes(brand)
            return {
                ...prev,
                Brands: alreadySelected
                    ? prev.Brands.filter(b => b !== brand)
                    : [...prev.Brands, brand]
            }
        })
    }

    // ✅ Price handler
    const handlePriceChange = (e) => {
        setLocalFilter(prev => ({
            ...prev,
            price: e.target.value
        }))
    }

    // ✅ Type handler
    const handleTypeChange = (type) => {
        setLocalFilter(prev => {
            const alreadySelected = prev.Type.includes(type)
            return {
                ...prev,
                Type: alreadySelected
                    ? prev.Type.filter(t => t !== type)
                    : [...prev.Type, type]
            }
        })
    }

    // ✅ Connectivity handler
    const handleConnectivityChange = (connectivity) => {
        setLocalFilter(prev => {
            const alreadySelected = prev.Connectivity.includes(connectivity)
            return {
                ...prev,
                Connectivity: alreadySelected
                    ? prev.Connectivity.filter(c => c !== connectivity)
                    : [...prev.Connectivity, connectivity]
            }
        })
    }

    // ✅ Category handler
    const handleCategoryChange = (cat) => {
        setLocalFilter(prev => {
            const alreadySelected = prev.Category.includes(cat)
            return {
                ...prev,
                Category: alreadySelected
                    ? prev.Category.filter(c => c !== cat)
                    : [...prev.Category, cat]
            }
        })
    }

    // ✅ Noise Cancellation handler
    const handleNoiseCancellationChange = (noise) => {
        setLocalFilter(prev => {
            const alreadySelected = prev.NoiseCancellation.includes(noise)
            return {
                ...prev,
                NoiseCancellation: alreadySelected
                    ? prev.NoiseCancellation.filter(n => n !== noise)
                    : [...prev.NoiseCancellation, noise]
            }
        })
    }

    // ✅ Water Resistance handler
    const handleWaterResistanceChange = (water) => {
        setLocalFilter(prev => {
            const alreadySelected = prev.WaterResistance.includes(water)
            return {
                ...prev,
                WaterResistance: alreadySelected
                    ? prev.WaterResistance.filter(w => w !== water)
                    : [...prev.WaterResistance, water]
            }
        })
    }

    // ✅ Apply button — send localFilter to parent
    const handleApplyFilter = () => {
        setFilterValue(localFilter)
        console.log("Filter Applied: ", localFilter)
    }

    return (
        <div className="border-gray-100 hidden md:flex flex-col w-[25%] shrink-0 min-h-screen">
            <div className="m-1 flex flex-col items-left justify-center px-3 pt-3 gap-3">

                {/* Brands */}
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

                {/* Price */}
                <div className="flex flex-col items-left justify-center">
                    <h3 className="text-lg font-semibold">Price</h3>
                    <div className="flex items-center px-3 py-1">
                        <FaRupeeSign className="text-sm font-light" />
                        <h3 className="text-lg font-medium">{Math.min(...priceRange)}</h3>
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

                {/* Type */}
                <div className="flex flex-col items-left justify-center">
                    <h3 className="text-lg font-semibold">Type</h3>
                    <label className="flex flex-col justify-center px-3 py-1 gap-2">
                        {["In-Ear Wired", "In-Ear Wireless", "Over-Ear Headphones", "On-Ear Headphones", "Neckband", "TWS", "Gaming Headset"].map((type, index) => (
                            <div key={index} className="font-medium text-md gap-2 flex items-center">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 accent-sky-600"
                                    checked={localFilter.Type.includes(type)}
                                    onChange={() => handleTypeChange(type)}
                                />
                                {type}
                            </div>
                        ))}
                    </label>
                </div>

                {/* Connectivity */}
                <div className="flex flex-col items-left justify-center">
                    <h3 className="text-lg font-semibold">Connectivity</h3>
                    <label className="flex flex-col justify-center px-3 py-1 gap-2">
                        {["Wired", "Wireless", "Both"].map((type, index) => (
                            <div key={index} className="font-medium text-md gap-2 flex items-center">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 accent-sky-600"
                                    checked={localFilter.Connectivity.includes(type)}
                                    onChange={() => handleConnectivityChange(type)}
                                />
                                {type}
                            </div>
                        ))}
                    </label>
                </div>

                {/* Category */}
                <div className="flex flex-col items-left justify-center">
                    <h3 className="text-lg font-semibold">Category</h3>
                    <label className="flex flex-col justify-center px-3 py-1 gap-2">
                        {earphoneCategories.map((cat, index) => (
                            <div key={index} className="font-medium text-md gap-2 flex items-center">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 accent-sky-600"
                                    checked={localFilter.Category.includes(cat)}
                                    onChange={() => handleCategoryChange(cat)}
                                />
                                {cat}
                            </div>
                        ))}
                    </label>
                </div>

                {/* Noise Cancellation */}
                <div className="flex flex-col items-left justify-center">
                    <h3 className="text-lg font-semibold">Noise Cancellation</h3>
                    <label className="flex flex-col justify-center px-3 py-1 gap-2">
                        {["Active Noise Cancellation", "Passive Noise Cancellation", "None"].map((type, index) => (
                            <div key={index} className="font-medium text-md gap-2 flex items-center">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 accent-sky-600"
                                    checked={localFilter.NoiseCancellation.includes(type)}
                                    onChange={() => handleNoiseCancellationChange(type)}
                                />
                                {type}
                            </div>
                        ))}
                    </label>
                </div>

                {/* Water Resistance */}
                <div className="flex flex-col items-left justify-center">
                    <h3 className="text-lg font-semibold">Water Resistance</h3>
                    <label className="flex flex-col justify-center px-3 py-1 gap-2">
                        {["IPX4", "IPX5", "IPX6", "IPX7", "None"].map((type, index) => (
                            <div key={index} className="font-medium text-md gap-2 flex items-center">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 accent-sky-600"
                                    checked={localFilter.WaterResistance.includes(type)}
                                    onChange={() => handleWaterResistanceChange(type)}
                                />
                                {type}
                            </div>
                        ))}
                    </label>
                </div>

                {/* Apply Button */}
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

export default EarPhonesDesktopScreenFilter
