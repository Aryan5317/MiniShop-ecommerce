import { FiPlus, FiStar, FiChevronDown } from "react-icons/fi";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import shoesDetailsService from "../../services/shoesService/shoesDetailsService";
import addToCartService from "../../services/addToCartService";
import AddToCart from "../component1/AddToCart";

function Shoes({ filterValue }) {
    const navigate = useNavigate()
    const [popup, setPopup] = useState(false);
    const [shoesData, setShoesData] = useState([])
    const [cartMessage, setCartMessage] = useState("");

    useEffect(() => {
        const fetchShoesData = async () => {
            const shoes = await shoesDetailsService()
            const allShoes = shoes.data.productData
            console.log("Shoes data is: ", allShoes)

            const noFilterApplied =
                filterValue.Brands.length === 0 &&
                filterValue.Type.length === 0 &&
                filterValue.Material.length === 0 &&
                filterValue.Sole.length === 0 &&
                filterValue.Category.length === 0 &&
                filterValue.Closure.length === 0 &&
                filterValue.price === ""

            if (noFilterApplied) {
                setShoesData(allShoes)
            } else {
                const filteredShoes = allShoes.filter(shoe => {

                    // ✅ Brand check
                    const brandMatch = filterValue.Brands.length === 0
                        || filterValue.Brands.includes(shoe.shoeBrand)

                    // ✅ Price check
                    const priceMatch = filterValue.price === ""
                        || shoe.currentPrice <= Number(filterValue.price)

                    // ✅ Type check
                    const typeMatch = filterValue.Type.length === 0
                        || filterValue.Type.includes(shoe.shoeType)

                    // ✅ Material check
                    const materialMatch = filterValue.Material.length === 0
                        || filterValue.Material.includes(shoe.material)

                    // ✅ Sole check
                    const soleMatch = filterValue.Sole.length === 0
                        || filterValue.Sole.includes(shoe.sole)

                    // ✅ Category check
                    const categoryMatch = filterValue.Category.length === 0
                        || filterValue.Category.includes(shoe.category)

                    // ✅ Closure check
                    const closureMatch = filterValue.Closure.length === 0
                        || filterValue.Closure.includes(shoe.closure)

                    return brandMatch && priceMatch && typeMatch && materialMatch && soleMatch && categoryMatch && closureMatch
                })

                setShoesData(filteredShoes)
                console.log("Filtered Shoes: ", filteredShoes)
            }
        }
        fetchShoesData()
    }, [filterValue])

    const shoeDetailsPage = (id) => {
        console.log("shoe id is: ", id)
        navigate(`/shoes/${id}`)
    }

    const addToCart = (e, c, id) => {
        const cartCall = async () => {
            e.preventDefault()
            e.stopPropagation()
            
            console.log("Category is: ", c)
            const responseCart = await addToCartService(id, c, true)
            
            if (responseCart) {
                setCartMessage(responseCart);
                
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

            {/* ── Mobile View ── */}
            <div className="grid grid-cols-2 md:grid-cols-1 gap-3 py-4 md:hidden">
                {shoesData.map((data) => (
                    <div
                        key={data._id}
                        onClick={() => shoeDetailsPage(data._id)}
                        className="border-gray-300 border bg-white rounded-lg shadow-xl p-3 px-1 flex flex-col h-[340px] hover:shadow-lg transition duration-200"
                    >
                        <div className="w-full flex justify-center">
                            <img
                                src={data.shoeImages[0]}
                                alt={data.shoeName}
                                className="h-[120px] object-contain"
                            />
                        </div>

                        <div className="h-[85px] gap-1 justify-center mt-3 text-left break-words flex-1">
                            <span className="font-bold text-lg">{data.shoeName}</span>
                            <span className="font-medium px-1 text-xl">-</span>
                            <span className="font-semibold text-lg">({data.color})</span>
                        </div>

                        <div className="flex gap-2 mt-2 items-left justify-left px-1 flex-1">
                            <span className="font-semibold text-xl">{data.shoeType}</span>
                            <span className="font-medium px-1 text-xl">|</span>
                            <span className="font-semibold text-xl">{data.material}</span>
                        </div>

                        <div className="flex items-center justify-center">
                            <span className="font-semibold text-2xl">₹{data.currentPrice}</span>
                            <div className="flex items-center justify-center mx-3">
                                <span className="font-light text-sm mt-3">M.R.P:</span>
                                <span className="font-light text-sm mt-3 line-through">₹{data.oldPrice}</span>
                            </div>
                        </div>

                        <div
                            className="border flex mt-1 rounded-md flex-row items-center justify-between bg-yellow-300"
                            onClick={(e) => addToCart(e, data.productCategory, data._id)}
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
                {(shoesData.length === 0) && (
                    <div className="flex flex-col items-center justify-center w-full h-[300px] gap-2">
                        <h3 className="text-xl font-semibold text-gray-500">No Shoes Found</h3>
                        <p className="text-sm text-gray-400">Try adjusting your filters</p>
                    </div>
                )}
            </div>

            {/* ── Desktop View ── */}
            <div className="hidden md:flex flex-col overflow-y-auto gap-3">
                {shoesData.map((data) => (
                    <div
                        key={data._id}
                        onClick={() => shoeDetailsPage(data._id)}
                        className="border m-1 mt-3 flex bg-white rounded-lg h-[250px] shadow hover:shadow-md transition-shadow duration-200 cursor-pointer"
                    >
                        <div className="flex items-center rounded-l-lg justify-center px-3 w-[30%] bg-gray-100">
                            <img
                                src={data.shoeImages[0]}
                                alt={data.shoeName}
                                className="h-[85%] object-contain"
                            />
                        </div>

                        <div className="flex flex-col bg-white m-1 mx-3 w-[68%]">
                            <div>
                                <h3 className="font-bold text-xl">{data.shoeBrand}</h3>
                            </div>

                            <div className="flex mt-1">
                                <p className="font-semibold text-xl cursor-pointer line-clamp-2 hover:text-red-700 transition-color duration-100">
                                    {data.shoeName} ({data.color}, {data.shoeType}) | {data.material} | {data.closure} | {data.description.highlights}
                                </p>
                            </div>

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

                            <div className="mt-3 m-1 flex items-center">
                                <button
                                    className="border bg-yellow-300 text-md rounded-xl cursor-pointer px-4 py-1 whitespace-nowrap text-black hover:bg-yellow-400 transition-colors duration-100"
                                    onClick={(e) => addToCart(e, data.productCategory, data._id)}
                                >
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                {(shoesData.length === 0) && (
                    <div className="flex flex-col items-center justify-center w-full h-[300px] gap-2">
                        <h3 className="text-xl font-semibold text-gray-500">No Shoes Found</h3>
                        <p className="text-sm text-gray-400">Try adjusting your filters</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Shoes
