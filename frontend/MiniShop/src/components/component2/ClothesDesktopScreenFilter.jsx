import clothDetailsService from "../../services/clothesService/clothDetailsService";
import { FaRupeeSign } from "react-icons/fa";
import { useEffect, useState } from "react"

function ClothesDesktopScreenFilter({ setFilterValue }) {
    const [allClothData, setAllClothData] = useState([])
    const [brandsName, setBrandsName] = useState([])
    const [priceRange, setPriceRange] = useState([])
    const [fabrics, setFabrics] = useState([])
    const [clothingCategories, setClothingCategories] = useState([])

    const [localFilter, setLocalFilter] = useState({
        Brands: [],
        price: "",
        Category: [],
        Style: [],
        Fit: [],
        Fabric: [],
        Sleeve: [],
        Occasion: [],
    })

    useEffect(() => {
        const clothData = async () => {
            const clothesDetails = await clothDetailsService()
            if (clothesDetails?.success) {
                setAllClothData(clothesDetails.data.productData)
            } else {
                console.log("Error:", clothesDetails?.message)
                setAllClothData([])
            }
        }
        clothData()
    }, [])

    useEffect(() => {
        if (allClothData.length === 0) return
        const brands = [...new Set(allClothData.map(clothes => clothes.clothingBrand))]
        setBrandsName(brands)
        const prices = allClothData.map(clothes => clothes.currentPrice)
        setPriceRange(prices)
        const fabricList = [...new Set(allClothData.map(clothes => clothes.fabric))]
        setFabrics(fabricList)
        const categories = [...new Set(allClothData.map(clothes => clothes.category))]
        setClothingCategories(categories)
    }, [allClothData])

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

    const handleStyleChange = (style) => {
        setLocalFilter(prev => {
            const alreadySelected = prev.Style.includes(style)
            return {
                ...prev,
                Style: alreadySelected
                    ? prev.Style.filter(s => s !== style)
                    : [...prev.Style, style]
            }
        })
    }
    const handleFitChange = (fit) => {
        setLocalFilter(prev => {
            const alreadySelected = prev.Fit.includes(fit)
            return {
                ...prev,
                Fit: alreadySelected
                    ? prev.Fit.filter(f => f !== fit)
                    : [...prev.Fit, fit]
            }
        })
    }

    const handleFabricChange = (fabric) => {
        setLocalFilter(prev => {
            const alreadySelected = prev.Fabric.includes(fabric)
            return {
                ...prev,
                Fabric: alreadySelected
                    ? prev.Fabric.filter(f => f !== fabric)
                    : [...prev.Fabric, fabric]
            }
        })
    }

    const handleSleeveChange = (sleeve) => {
        setLocalFilter(prev => {
            const alreadySelected = prev.Sleeve.includes(sleeve)
            return {
                ...prev,
                Sleeve: alreadySelected
                    ? prev.Sleeve.filter(s => s !== sleeve)
                    : [...prev.Sleeve, sleeve]
            }
        })
    }

    const handleOccasionChange = (occasion) => {
        setLocalFilter(prev => {
            const alreadySelected = prev.Occasion.includes(occasion)
            return {
                ...prev,
                Occasion: alreadySelected
                    ? prev.Occasion.filter(o => o !== occasion)
                    : [...prev.Occasion, occasion]
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

                {/* Price */}
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
                    <h3 className="text-lg font-semibold">Category</h3>
                    <label className="flex flex-col justify-center px-3 py-1 gap-2">
                        {["TShirts", "Shirts"].map((cat, index) => (
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

                <div className="flex flex-col items-left justify-center">
                    <h3 className="text-lg font-semibold">Style</h3>
                    <label className="flex flex-col justify-center px-3 py-1 gap-2">
                        {clothingCategories.map((cat, index) => (
                            <div key={index} className="font-medium text-md gap-2 flex items-center">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 accent-sky-600"
                                    checked={localFilter.Style.includes(cat)}
                                    onChange={() => handleStyleChange(cat)}
                                />
                                {cat}
                            </div>
                        ))}
                    </label>
                </div>

                <div className="flex flex-col items-left justify-center">
                    <h3 className="text-lg font-semibold">Fit</h3>
                    <label className="flex flex-col justify-center px-3 py-1 gap-2">
                        {["Slim Fit", "Regular Fit", "Oversized", "Muscle Fit", "Relaxed Fit", "Tailored Fit"].map((fit, index) => (
                            <div key={index} className="font-medium text-md gap-2 flex items-center">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 accent-sky-600"
                                    checked={localFilter.Fit.includes(fit)}
                                    onChange={() => handleFitChange(fit)}
                                />
                                {fit}
                            </div>
                        ))}
                    </label>
                </div>

                <div className="flex flex-col items-left justify-center">
                    <h3 className="text-lg font-semibold">Fabric</h3>
                    <label className="flex flex-col justify-center px-3 py-1 gap-2">
                        {fabrics.map((fabric, index) => (
                            <div key={index} className="font-medium text-md gap-2 flex items-center">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 accent-sky-600"
                                    checked={localFilter.Fabric.includes(fabric)}
                                    onChange={() => handleFabricChange(fabric)}
                                />
                                {fabric}
                            </div>
                        ))}
                    </label>
                </div>

                <div className="flex flex-col items-left justify-center">
                    <h3 className="text-lg font-semibold">Sleeve Type</h3>
                    <label className="flex flex-col justify-center px-3 py-1 gap-2">
                        {["Half Sleeve", "Full Sleeve", "Sleeveless", "Rolled Sleeve"].map((sleeve, index) => (
                            <div key={index} className="font-medium text-md gap-2 flex items-center">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 accent-sky-600"
                                    checked={localFilter.Sleeve.includes(sleeve)}
                                    onChange={() => handleSleeveChange(sleeve)}
                                />
                                {sleeve}
                            </div>
                        ))}
                    </label>
                </div>

                <div className="flex flex-col items-left justify-center">
                    <h3 className="text-lg font-semibold">Occasion</h3>
                    <label className="flex flex-col justify-center px-3 py-1 gap-2">
                        {["Casual", "Formal", "Party", "Business"].map((occasion, index) => (
                            <div key={index} className="font-medium text-md gap-2 flex items-center">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 accent-sky-600"
                                    checked={localFilter.Occasion.includes(occasion)}
                                    onChange={() => handleOccasionChange(occasion)}
                                />
                                {occasion}
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

export default ClothesDesktopScreenFilter
