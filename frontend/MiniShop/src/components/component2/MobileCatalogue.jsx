import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { useContext } from "react";
import { propContext } from "../../context/contextApi";
import { FaStar } from "react-icons/fa"


function MobileCatalogue() {
    const { storeInputValue } = useContext(propContext)
    return (
        <div className="w-full flex flex-col items-center justify-between bg-white shadow-[0_6px_6px_-4px_rgba(0,0,0,0.2)]">
            <div className=" w-full flex items-center jusitfy-center ">
                <img src="\src\assets\phoneCategory\mobileBanner.png" alt="Error 404" className="h-[120px] w-full md:h-[220px] rounded" />
            </div>
            <div className= "border-gray-400 border mt-1 flex flex-row justify-between w-full items-center">
                <div className=" flex flex-row hidden md:flex m-1 py-1">
                    <h3 className="flex text-black px-1 text-md font-medium">1-48 of 797 results for</h3>
                    <h3 className="flex text-sky-600 px-1 text-md font-semibold">{storeInputValue.trim() && `"${storeInputValue}"`}</h3>
                </div>
                <div className="flex hidden md:flex border flex items-center justify-center mr-3 m-1 px-2 rounded-xl
            hover:bg-gray-200">
                    <div className="text-black text-md border-none outline-none">Sort by:
                        <select className="outline-none">
                            <option>Featured</option>
                            <option>Price: Hight to Low</option>
                            <option>Price: Low to High</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="md:hidden flex w-full gap-3 overflow-x-auto whitespace-nowrap">
                <div className="border my-2 w-[25%] shrink-0 flex justify-center items-center rounded-3xl hide-scrollbar">
                    <HiOutlineAdjustmentsHorizontal className="text-3xl" />
                </div>
                <div className="border-black border  my-2 flex flex-row items-center px-3 gap-1 rounded-xl">
                    <div className="flex text-yellow-500">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                    </div>
                    <h3 className="text-lg text-black font-semibold">&up</h3>
                </div>
                <div className="border flex items-center justify-center px-3 rounded-xl my-2">
                    <h3>All Discounts</h3>
                </div>
            </div>
        </div >
    )
}

export default MobileCatalogue
