import bagDetailsService from "../../services/bagsService/bagDetailsService";
import { FiPlus, FiStar, FiChevronDown } from "react-icons/fi";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import AddToCart from "../component1/AddToCart";
import addToCartService from "../../services/addToCartService";

function Bags({ filterValue }) {
    const navigate = useNavigate()
    const [popup, setPopup] = useState(false);
    const [bagData, setBagData] = useState([])
    const [cartMessage, setCartMessage] = useState("");

    useEffect(() => {
        const bagsData = async () => {
            const bags = await bagDetailsService();
            if (!bags?.success) {
                console.log("Error:", bags?.message);
                setBagData([]);
                return;
            }
            const allBags = bags.data.productData;
            console.log("Bags data is: ", allBags);

            const noFilterApplied =
                filterValue.Brands.length === 0 &&
                filterValue.BagType.length === 0 &&
                filterValue.Material.length === 0 &&
                filterValue.Capacity.length === 0 &&
                filterValue.price === ""

            if (noFilterApplied) {
                setBagData(allBags)
            } else {
                const filteredBags = allBags.filter(bag => {

                    // ✅ Brand check
                    const brandMatch = filterValue.Brands.length === 0
                        || filterValue.Brands.includes(bag.bagBrand)

                    // ✅ Price check
                    const priceMatch = filterValue.price === ""
                        || bag.currentPrice <= Number(filterValue.price)

                    // ✅ BagType check
                    const bagTypeMatch = filterValue.BagType.length === 0
                        || filterValue.BagType.includes(bag.bagType)

                    // ✅ Material check
                    const materialMatch = filterValue.Material.length === 0
                        || filterValue.Material.includes(bag.material)

                    // ✅ Capacity check
                    const capacityMatch = filterValue.Capacity.length === 0
                        || filterValue.Capacity.some(range => {
                            const capacity = parseInt(bag.capacity)
                            if (range === "Under 20L") return capacity < 20
                            if (range === "20L - 30L") return capacity >= 20 && capacity <= 30
                            if (range === "30L - 45L") return capacity > 30 && capacity <= 45
                            if (range === "45L and above") return capacity > 45
                            return false
                        })

                    return brandMatch && priceMatch && bagTypeMatch && materialMatch && capacityMatch
                })

                setBagData(filteredBags)
                console.log("Filtered Bags: ", filteredBags)
            }
        }
        bagsData()
    }, [filterValue])

    const bagDetailsPage = (id) => {
        console.log("Bag id is: ", id)
        navigate(`/bags/${id}`)
    }

    const addToCart = (e, id, c) => {
        const cartCall = async () => {
            e.preventDefault()
            e.stopPropagation()
            console.log("ID in bags is: ", id);
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
            <div className="grid grid-cols-2 md:grid-cols-1 gap-3 py-4 md:hidden">
                {bagData.map((data) => (
                    <div
                        key={data._id}
                        onClick={() => bagDetailsPage(data._id)}
                        className="border-gray-300 border bg-white rounded-lg shadow-xl p-3 px-1 flex flex-col h-[340px] hover:shadow-lg transition duration-200"
                    >
                        <div className="w-full flex justify-center">
                            <img
                                src={data.bagImages[0]}
                                alt={data.bagName}
                                className="h-[120px] object-contain"
                            />
                        </div>

                        <div className="h-[85px] gap-1 justify-center mt-3 text-left break-words flex-1">
                            <span className="font-bold text-lg">{data.bagName}</span>
                            <span className="font-medium px-1 text-xl">-</span>
                            <span className="font-semibold text-lg">({data.color})</span>
                        </div>

                        <div className="flex gap-2 mt-2 items-left justify-left px-1 flex-1">
                            <span className="font-semibold text-xl">{data.bagType}</span>
                            <span className="font-medium px-1 text-xl">|</span>
                            <span className="font-semibold text-xl">{data.capacity}</span>
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
                {(bagData.length === 0) && (
                    <div className="flex flex-col items-center justify-center w-full h-[300px] gap-2">
                        <h3 className="text-xl font-semibold text-gray-500">No Bags Found</h3>
                        <p className="text-sm text-gray-400">Try adjusting your filters</p>
                    </div>
                )}
            </div>

            {/* ── DESKTOP ── */}
            <div className="hidden md:flex flex-col overflow-y-auto gap-3">
                {bagData.map((data) => (
                    <div
                        key={data._id}
                        onClick={() => bagDetailsPage(data._id)}
                        className="border m-1 mt-3 flex bg-white rounded-lg h-[250px] shadow hover:shadow-md transition-shadow duration-200 cursor-pointer"
                    >
                        <div className="flex items-center rounded-l-lg justify-center px-3 w-[30%] bg-gray-100">
                            <img
                                src={data.bagImages[0]}
                                alt={data.bagName}
                                className="h-[85%] object-contain"
                            />
                        </div>

                        <div className="flex flex-col bg-white m-1 mx-3 w-[68%]">
                            <div>
                                <h3 className="font-bold text-xl">{data.bagBrand}</h3>
                            </div>

                            <div className="flex mt-1">
                                <p className="font-semibold text-xl cursor-pointer line-clamp-2 hover:text-red-700 transition-color duration-100">
                                    {data.bagName} ({data.color}) | {data.bagType} | {data.capacity} | {data.material} | {data.description.highlights}
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
                                    onClick={(e) => addToCart(e, data._id)}
                                >
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                {(bagData.length === 0) && (
                    <div className="flex flex-col items-center justify-center w-full h-[300px] gap-2">
                        <h3 className="text-xl font-semibold text-gray-500">No Bags Found</h3>
                        <p className="text-sm text-gray-400">Try adjusting your filters</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Bags
