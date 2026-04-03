import { FaRupeeSign } from "react-icons/fa";
import { useEffect, useState } from "react"
import shoesDetailsService from "../../services/shoesService/shoesDetailsService";

function ShoesDesktopScreenFilter({ setFilterValue }) {
    const [allShoesData, setAllShoesData] = useState([])
    const [brandsName, setBrandsName] = useState([])
    const [priceRange, setPriceRange] = useState([])
    const [shoeCategories, setShoeCategories] = useState([])

    const [localFilter, setLocalFilter] = useState({
        Brands: [],
        price: "",
        Type: [],
        Material: [],
        Sole: [],
        Category: [],
        Closure: [],
    })

    useEffect(() => {
        const shoesData = async () => {
            const shoesDetails = await shoesDetailsService()

            if (shoesDetails?.success) {
                setAllShoesData(shoesDetails.data.productData)
            } else {
                console.log("Error:", shoesDetails?.message)
                setAllShoesData([])
            }
        }
        shoesData()
    }, [])

    useEffect(() => {
        if (allShoesData.length === 0) return
        const brands = [...new Set(allShoesData.map(shoe => shoe.shoeBrand))]
        setBrandsName(brands)
        const prices = allShoesData.map(shoe => shoe.currentPrice)
        setPriceRange(prices)
        const categories = [...new Set(allShoesData.map(shoe => shoe.category))]
        setShoeCategories(categories)
    }, [allShoesData])

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

    const handleMaterialChange = (material) => {
        setLocalFilter(prev => {
            const alreadySelected = prev.Material.includes(material)
            return {
                ...prev,
                Material: alreadySelected
                    ? prev.Material.filter(m => m !== material)
                    : [...prev.Material, material]
            }
        })
    }

    const handleSoleChange = (sole) => {
        setLocalFilter(prev => {
            const alreadySelected = prev.Sole.includes(sole)
            return {
                ...prev,
                Sole: alreadySelected
                    ? prev.Sole.filter(s => s !== sole)
                    : [...prev.Sole, sole]
            }
        })
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

    const handleClosureChange = (closure) => {
        setLocalFilter(prev => {
            const alreadySelected = prev.Closure.includes(closure)
            return {
                ...prev,
                Closure: alreadySelected
                    ? prev.Closure.filter(c => c !== closure)
                    : [...prev.Closure, closure]
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
                    <h3 className="text-lg font-semibold">Type</h3>
                    <label className="flex flex-col justify-center px-3 py-1 gap-2">
                        {["Sneakers", "Sports Shoes", "Running Shoes", "Boots", "Daily Shoes", "Loafers", "Sandals", "Formal Shoes", "Casual Shoes", "Hiking Shoes"].map((type, index) => (
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

                {/* Material */}
                <div className="flex flex-col items-left justify-center">
                    <h3 className="text-lg font-semibold">Material</h3>
                    <label className="flex flex-col justify-center px-3 py-1 gap-2">
                        {["Leather", "Suede", "Canvas", "Mesh", "Synthetic", "Rubber", "Knit"].map((material, index) => (
                            <div key={index} className="font-medium text-md gap-2 flex items-center">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 accent-sky-600"
                                    checked={localFilter.Material.includes(material)}
                                    onChange={() => handleMaterialChange(material)}
                                />
                                {material}
                            </div>
                        ))}
                    </label>
                </div>

                {/* Closure */}
                <div className="flex flex-col items-left justify-center">
                    <h3 className="text-lg font-semibold">Closure</h3>
                    <label className="flex flex-col justify-center px-3 py-1 gap-2">
                        {["Lace-Up", "Slip-On", "Velcro", "Buckle", "Zipper"].map((closure, index) => (
                            <div key={index} className="font-medium text-md gap-2 flex items-center">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 accent-sky-600"
                                    checked={localFilter.Closure.includes(closure)}
                                    onChange={() => handleClosureChange(closure)}
                                />
                                {closure}
                            </div>
                        ))}
                    </label>
                </div>

                {/* Sole */}
                <div className="flex flex-col items-left justify-center">
                    <h3 className="text-lg font-semibold">Sole</h3>
                    <label className="flex flex-col justify-center px-3 py-1 gap-2">
                        {["Rubber", "EVA", "TPU", "Leather", "Synthetic"].map((sole, index) => (
                            <div key={index} className="font-medium text-md gap-2 flex items-center">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 accent-sky-600"
                                    checked={localFilter.Sole.includes(sole)}
                                    onChange={() => handleSoleChange(sole)}
                                />
                                {sole}
                            </div>
                        ))}
                    </label>
                </div>

                {/* Category */}
                <div className="flex flex-col items-left justify-center">
                    <h3 className="text-lg font-semibold">Category</h3>
                    <label className="flex flex-col justify-center px-3 py-1 gap-2">
                        {shoeCategories.map((cat, index) => (
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

export default ShoesDesktopScreenFilter
