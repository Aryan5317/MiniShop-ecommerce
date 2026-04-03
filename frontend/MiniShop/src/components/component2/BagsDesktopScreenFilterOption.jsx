import bagDetailsService from "../../services/bagsService/bagDetailsService";
import { FaRupeeSign } from "react-icons/fa";
import { useEffect, useState } from "react"

function BagsDesktopScreenFilterOption({ setFilterValue }) {
    const [allBagData, setAllBagData] = useState([])
    const [brandsName, setBrandsName] = useState([])
    const [priceRange, setPriceRange] = useState([])

    const [localFilter, setLocalFilter] = useState({
        Brands: [],
        price: "",
        BagType: [],
        Material: [],
        Capacity: [],
    })

    useEffect(() => {
        const bagData = async () => {
            const bagDetails = await bagDetailsService()
            if (bagDetails?.success) {
                setAllBagData(bagDetails.data.productData)
            } else {
                console.log("Error:", bagDetails?.message)
                setAllBagData([])
            }
        }
        bagData()
    }, [])

    useEffect(() => {
        const brands = allBagData.map(bag => bag.bagBrand)
        setBrandsName(brands)
        const prices = allBagData.map(bag => bag.currentPrice)
        setPriceRange(prices)
    }, [allBagData])

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
    const handleBagTypeChange = (type) => {
        setLocalFilter(prev => {
            const alreadySelected = prev.BagType.includes(type)
            return {
                ...prev,
                BagType: alreadySelected
                    ? prev.BagType.filter(t => t !== type)
                    : [...prev.BagType, type]
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
    const handleCapacityChange = (capacity) => {
        setLocalFilter(prev => {
            const alreadySelected = prev.Capacity.includes(capacity)
            return {
                ...prev,
                Capacity: alreadySelected
                    ? prev.Capacity.filter(c => c !== capacity)
                    : [...prev.Capacity, capacity]
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
                    <h3 className="text-lg font-semibold">Bag Type</h3>
                    <label className="flex flex-col justify-center px-3 py-1 gap-2">
                        {["Backpack", "Laptop Bag", "Office Bag", "Messenger Bag", "Duffel Bag", "Travel Bag", "School Bag"].map((type, index) => (
                            <div key={index} className="font-medium text-md gap-2 flex items-center">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 accent-sky-600"
                                    checked={localFilter.BagType.includes(type)}
                                    onChange={() => handleBagTypeChange(type)}
                                />
                                {type}
                            </div>
                        ))}
                    </label>
                </div>

                <div className="flex flex-col items-left justify-center">
                    <h3 className="text-lg font-semibold">Material</h3>
                    <label className="flex flex-col justify-center px-3 py-1 gap-2">
                        {["Leather", "Canvas", "Nylon", "Polyester", "Oxford"].map((material, index) => (
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
                <div className="flex flex-col items-left justify-center">
                    <h3 className="text-lg font-semibold">Capacity</h3>
                    <label className="flex flex-col justify-center px-3 py-1 gap-2">
                        {["Under 20L", "20L - 30L", "30L - 45L", "45L and above"].map((capacity, index) => (
                            <div key={index} className="font-medium text-md gap-2 flex items-center">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 accent-sky-600"
                                    checked={localFilter.Capacity.includes(capacity)}
                                    onChange={() => handleCapacityChange(capacity)}
                                />
                                {capacity}
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

export default BagsDesktopScreenFilterOption
