import watchDetailsService from "../../services/watchService/watchDetailsService";
import { FaRupeeSign } from "react-icons/fa";
import { useEffect, useState } from "react"

function WatchesDektopScreenFilter({ setFilterValue }) {
    const [allWatchData, setAllWatchData] = useState([])
    const [brandsName, setBrandsName] = useState([])
    const [priceRange, setPriceRange] = useState([])
    const [watchCategories, setWatchCategories] = useState([])
    const [strapMaterials, setStrapMaterials] = useState([])

    const [localFilter, setLocalFilter] = useState({
        Brands: [],
        price: "",
        WatchType: [],
        Movement: [],
        Strap: [],
        WaterResistance: [],
        DialSize: []
    })

    useEffect(() => {
        const watchData = async () => {
            const watchDetails = await watchDetailsService()

            if (watchDetails?.success) {
                setAllWatchData(watchDetails.data.productData)
            } else {
                console.log("Error:", watchDetails?.message)
                setAllWatchData([])
            }
        }
        watchData()
    }, [])

    useEffect(() => {
        if (allWatchData.length === 0) return
        const brands = [...new Set(allWatchData.map(watch => watch.watchBrand))]
        setBrandsName(brands)
        const prices = allWatchData.map(watch => watch.currentPrice)
        setPriceRange(prices)
        const categories = [...new Set(allWatchData.map(watch => watch.category))]
        setWatchCategories(categories)
        const straps = [...new Set(allWatchData.map(watch => watch.strapMaterial))]
        setStrapMaterials(straps)
    }, [allWatchData])

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

    const handlePriceChange = (e) => {
        setLocalFilter(prev => ({
            ...prev,
            price: e.target.value
        }))
    }

    const handleWatchTypeChange = (type) => {
        setLocalFilter(prev => {
            const alreadySelected = prev.WatchType.includes(type)
            return {
                ...prev,
                WatchType: alreadySelected
                    ? prev.WatchType.filter(t => t !== type)
                    : [...prev.WatchType, type]
            }
        })
    }

    const handleStrapChange = (strap) => {
        setLocalFilter(prev => {
            const alreadySelected = prev.Strap.includes(strap)
            return {
                ...prev,
                Strap: alreadySelected
                    ? prev.Strap.filter(s => s !== strap)
                    : [...prev.Strap, strap]
            }
        })
    }

    const handleMovementChange = (movement) => {
        setLocalFilter(prev => {
            const alreadySelected = prev.Movement.includes(movement)
            return {
                ...prev,
                Movement: alreadySelected
                    ? prev.Movement.filter(m => m !== movement)
                    : [...prev.Movement, movement]
            }
        })
    }

    const handleDialSizeChange = (size) => {
        setLocalFilter(prev => {
            const alreadySelected = prev.DialSize.includes(size)
            return {
                ...prev,
                DialSize: alreadySelected
                    ? prev.DialSize.filter(d => d !== size)
                    : [...prev.DialSize, size]
            }
        })
    }

    const handleWaterResistanceChange = (resistance) => {
        setLocalFilter(prev => {
            const alreadySelected = prev.WaterResistance.includes(resistance)
            return {
                ...prev,
                WaterResistance: alreadySelected
                    ? prev.WaterResistance.filter(w => w !== resistance)
                    : [...prev.WaterResistance, resistance]
            }
        })
    }

    const handleApplyFilter = () => {
        setFilterValue(localFilter)
        console.log("Filter Applied: ", localFilter)
    }

    const minPrice = priceRange.length ? Math.min(...priceRange) : 0
const maxPrice = priceRange.length ? Math.max(...priceRange) : 0
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
                        <h3 className="text-lg font-medium">{minPrice}</h3>
                        <h3 className="px-1 text-lg font-normal">-</h3>
                        <FaRupeeSign className="text-sm font-light" />
                        <h3 className="text-lg font-medium">{maxPrice}+</h3>
                    </div>
                    <div className="px-3 py-1">
                        <input
                            className="w-full"
                            type="range"
                            min={minPrice}
                            max={maxPrice}
                            value={localFilter.price || maxPrice}
                            onChange={handlePriceChange}
                        />
                    </div>
                </div>

                <div className="flex flex-col items-left justify-center">
                    <h3 className="text-lg font-semibold">Watch Type</h3>
                    <label className="flex flex-col justify-center px-3 py-1 gap-2">
                        {watchCategories.map((category, index) => (
                            <div key={index} className="font-medium text-md gap-2 flex items-center">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 accent-sky-600"
                                    checked={localFilter.WatchType.includes(category)}
                                    onChange={() => handleWatchTypeChange(category)}
                                />
                                {category}
                            </div>
                        ))}
                    </label>
                </div>

                {/* Strap Material */}
                <div className="flex flex-col items-left justify-center">
                    <h3 className="text-lg font-semibold">Strap Material</h3>
                    <label className="flex flex-col justify-center px-3 py-1 gap-2">
                        {strapMaterials.map((material, index) => (
                            <div key={index} className="font-medium text-md gap-2 flex items-center">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 accent-sky-600"
                                    checked={localFilter.Strap.includes(material)}
                                    onChange={() => handleStrapChange(material)}
                                />
                                {material}
                            </div>
                        ))}
                    </label>
                </div>

                {/* Movement */}
                <div className="flex flex-col items-left justify-center">
                    <h3 className="text-lg font-semibold">Movement</h3>
                    <label className="flex flex-col justify-center px-3 py-1 gap-2">
                        {["Automatic", "Quartz"].map((movement, index) => (
                            <div key={index} className="font-medium text-md gap-2 flex items-center">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 accent-sky-600"
                                    checked={localFilter.Movement.includes(movement)}
                                    onChange={() => handleMovementChange(movement)}
                                />
                                {movement}
                            </div>
                        ))}
                    </label>
                </div>

                {/* Dial Size */}
                <div className="flex flex-col items-left justify-center">
                    <h3 className="text-lg font-semibold">Dial Size</h3>
                    <label className="flex flex-col justify-center px-3 py-1 gap-2">
                        {["Under 38mm", "38mm - 42mm", "42mm - 46mm", "46mm and above"].map((size, index) => (
                            <div key={index} className="font-medium text-md gap-2 flex items-center">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 accent-sky-600"
                                    checked={localFilter.DialSize.includes(size)}
                                    onChange={() => handleDialSizeChange(size)}
                                />
                                {size}
                            </div>
                        ))}
                    </label>
                </div>

                {/* Water Resistance */}
                <div className="flex flex-col items-left justify-center">
                    <h3 className="text-lg font-semibold">Water Resistance</h3>
                    <label className="flex flex-col justify-center px-3 py-1 gap-2">
                        {["3 ATM", "5 ATM", "10 ATM", "20 ATM", "30 ATM"].map((resistance, index) => (
                            <div key={index} className="font-medium text-md gap-2 flex items-center">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 accent-sky-600"
                                    checked={localFilter.WaterResistance.includes(resistance)}
                                    onChange={() => handleWaterResistanceChange(resistance)}
                                />
                                {resistance}
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

export default WatchesDektopScreenFilter
