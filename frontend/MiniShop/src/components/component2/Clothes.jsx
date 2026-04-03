import { FiPlus, FiStar, FiChevronDown } from "react-icons/fi";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import clothDetailsService from "../../services/clothesService/clothDetailsService";
import AddToCart from "../component1/AddToCart";
import addToCartService from "../../services/addToCartService";

function Clothes({ filterValue }) {
    const navigate = useNavigate()
    const [popup, setPopup] = useState(false);
    const [clothesData, setClothesData] = useState([])
    const [cartMessage, setCartMessage] = useState("");

    useEffect(() => {
        const fetchClothesData = async () => {
            const clothes = await clothDetailsService()

            if (!clothes?.success) {
                console.log("Error:", clothes?.message)
                setClothesData([])
                return
            }

            const allClothes = clothes.data.productData
            console.log("Clothes data is: ", allClothes)

            const noFilterApplied =
                filterValue.Brands.length === 0 &&
                filterValue.Category.length === 0 &&
                filterValue.Style.length === 0 &&
                filterValue.Fit.length === 0 &&
                filterValue.Fabric.length === 0 &&
                filterValue.Sleeve.length === 0 &&
                filterValue.Occasion.length === 0 &&
                filterValue.price === ""

            if (noFilterApplied) {
                setClothesData(allClothes)
            } else {
                const filteredClothes = allClothes.filter(cloth => {

                    // ✅ Brand check
                    const brandMatch = filterValue.Brands.length === 0
                        || filterValue.Brands.includes(cloth.clothingBrand)

                    // ✅ Price check
                    const priceMatch = filterValue.price === ""
                        || cloth.currentPrice <= Number(filterValue.price)

                    // ✅ Category check (TShirts / Shirts)
                    const categoryMatch = filterValue.Category.length === 0
                        || filterValue.Category.includes(cloth.productCategory)

                    // ✅ Style check
                    const styleMatch = filterValue.Style.length === 0
                        || filterValue.Style.includes(cloth.category)

                    // ✅ Fit check
                    const fitMatch = filterValue.Fit.length === 0
                        || filterValue.Fit.includes(cloth.fit)

                    // ✅ Fabric check
                    const fabricMatch = filterValue.Fabric.length === 0
                        || filterValue.Fabric.includes(cloth.fabric)

                    // ✅ Sleeve check
                    const sleeveMatch = filterValue.Sleeve.length === 0
                        || filterValue.Sleeve.includes(cloth.sleeveType)

                    // ✅ Occasion check
                    const occasionMatch = filterValue.Occasion.length === 0
                        || filterValue.Occasion.includes(cloth.occasion)

                    return brandMatch && priceMatch && categoryMatch && styleMatch && fitMatch && fabricMatch && sleeveMatch && occasionMatch
                })

                setClothesData(filteredClothes)
                console.log("Filtered Clothes: ", filteredClothes)
            }
        }
        fetchClothesData()
    }, [filterValue])

    const clothDetailsPage = (id) => {
        console.log("Cloth id is: ", id)
        navigate(`/clothes/${id}`)
    }

    const addToCart = (e, id, c) => {
        const cartCall = async () => {
            e.preventDefault()
            e.stopPropagation()
            console.log("ID in clothes is: ", id);
            console.log("Category is: ", c)
            const responseCart = await addToCartService(id, c, true)
            console.log("Response Cart is: ", responseCart);
            if (responseCart) {
                setCartMessage(responseCart);
                console.log("Items added to the cart");
                setPopup(true)
                setTimeout(() => {
                    setPopup(false)
                }, 5000)
            } else {
                setCartMessage(responseCart)
            }
        }
        cartCall();
    }

    return (
        <div className="w-full flex flex-col pb-15 md:pb-0">
            {popup && <AddToCart cartMessage={cartMessage} />}

            {/* ── MOBILE ── */}
            <div className="grid grid-cols-2 md:grid-cols-1 gap-3 py-4 md:hidden">
                {clothesData.map((data) => (
                    <div
                        key={data._id}
                        onClick={() => clothDetailsPage(data._id)}
                        className="border-gray-300 border bg-white rounded-lg shadow-xl p-3 px-1 flex flex-col h-[340px] hover:shadow-lg transition duration-200"
                    >
                        {/* Clothing Image */}
                        <div className="w-full flex justify-center">
                            <img
                                src={data.clothingImages[0]}
                                alt={data.clothingName}
                                className="h-[120px] object-contain"
                            />
                        </div>

                        {/* Clothing Name + Color */}
                        <div className="h-[85px] gap-1 justify-center mt-3 text-left break-words flex-1">
                            <span className="font-bold text-lg">{data.clothingName}</span>
                            <span className="font-medium px-1 text-xl">-</span>
                            <span className="font-semibold text-lg">({data.color})</span>
                        </div>

                        {/* Fit + Sleeve Type */}
                        <div className="flex gap-2 mt-2 items-left justify-left px-1 flex-1">
                            <span className="font-semibold text-xl">{data.fit}</span>
                            <span className="font-medium px-1 text-xl">|</span>
                            <span className="font-semibold text-xl">{data.sleeveType}</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center justify-center">
                            <span className="font-semibold text-2xl">₹{data.currentPrice}</span>
                            <div className="flex items-center justify-center mx-3">
                                <span className="font-light text-sm mt-3">M.R.P:</span>
                                <span className="font-light text-sm mt-3 line-through">₹{data.oldPrice}</span>
                            </div>
                        </div>

                        {/* Add to Cart */}
                        <div
                            className="border flex mt-1 rounded-md flex-row items-center justify-between bg-yellow-300"
                            onClick={(e) => addToCart(e, data._id, data.productCategory)}
                        >
                            <h3 className="flex items-center font-medium text-md ml-3 text-black">
                                Add to Cart
                            </h3>
                            <button className="flex items-center font-bold text-xl mr-1 text-black">
                                <FiPlus />
                            </button>
                        </div>
                    </div>
                ))}
                {(clothesData.length === 0) && (
                    <div className="flex flex-col items-center justify-center w-full h-[300px] gap-2">
                        <h3 className="text-xl font-semibold text-gray-500">No Clothes Found</h3>
                        <p className="text-sm text-gray-400">Try adjusting your filters</p>
                    </div>
                )}
            </div>

            {/* ── DESKTOP ── */}
            <div className="hidden md:flex flex-col overflow-y-auto gap-3">
                {clothesData.map((data) => (
                    <div
                        key={data._id}
                        onClick={() => clothDetailsPage(data._id)}
                        className="border m-1 mt-3 flex bg-white rounded-lg h-[250px] shadow hover:shadow-md transition-shadow duration-200 cursor-pointer"
                    >
                        {/* Clothing Image */}
                        <div className="flex items-center rounded-l-lg justify-center px-3 w-[30%] bg-gray-100">
                            <img
                                src={data.clothingImages[0]}
                                alt={data.clothingName}
                                className="h-[85%] object-contain"
                            />
                        </div>

                        <div className="flex flex-col bg-white m-1 mx-3 w-[68%]">

                            {/* Brand */}
                            <div>
                                <h3 className="font-bold text-xl">{data.clothingBrand}</h3>
                            </div>

                            {/* Name + Specs */}
                            <div className="flex mt-1">
                                <p className="font-semibold text-xl cursor-pointer line-clamp-2 hover:text-red-700 transition-color duration-100">
                                    {data.clothingName} ({data.color}) | {data.productCategory} | {data.fit} | {data.sleeveType} | {data.fabric} | {data.description.highlights}
                                </p>
                            </div>

                            {/* Ratings */}
                            <div className="flex flex-row mt-3 items-center gap-1">
                                <h3>0.0</h3>
                                <div className="flex items-center">
                                    <FiStar />
                                    <FiStar />
                                    <FiStar />
                                    <FiStar />
                                    <FiStar />
                                </div>
                                <div className="flex items-center">
                                    <FiChevronDown />
                                    <h3>(0)</h3>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="mt-2 flex gap-2">
                                <div className="flex flex-row">
                                    <h3>₹</h3>
                                    <h3 className="font-medium text-3xl">{data.currentPrice}</h3>
                                </div>
                                <div className="flex flex-row gap-1">
                                    <h3 className="pt-3">M.R.P:</h3>
                                    <h3 className="pt-3 line-through">₹{data.oldPrice}</h3>
                                    <h3 className="pt-3">({data.discount}% off)</h3>
                                </div>
                            </div>

                            {/* Add to Cart */}
                            <div className="mt-3 m-1 flex items-center">
                                <button
                                    className="border bg-yellow-300 text-md rounded-xl cursor-pointer px-4 py-1 whitespace-nowrap text-black hover:bg-yellow-400 transition-colors duration-100"
                                    onClick={(e) => addToCart(e, data._id, data.productCategory)}
                                >
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                {(clothesData.length === 0) && (
                    <div className="flex flex-col items-center justify-center w-full h-[300px] gap-2">
                        <h3 className="text-xl font-semibold text-gray-500">No Clothes Found</h3>
                        <p className="text-sm text-gray-400">Try adjusting your filters</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Clothes
