import { FaCheck } from "react-icons/fa"
function AddToCart({cartMessage}) {
    return (
        <div>
            <div className="hidden md:flex fixed top-[10%] right-4 z-50 border bg-white m-1 gap-3 w-fit px-3 py-2 rounded-md items-center justify-center shadow-lg shadow-gray-300">
                <div className="border bg-green-500 px-2 py-2 rounded-full">
                    <FaCheck className="text-white text-xl" />
                </div>
                <h3 className="font-semibold text-lg">{cartMessage} </h3>
            </div>
            <div className="border flex fixed top-[15%] right-4 z-50 bg-white m-1 gap-1 w-fit px-2 py-2 rounded-md items-center justify-center shadow-lg shadow-gray-300 md:hidden ">
                <div className="border bg-green-500 px-[3px] py-[3px]  rounded-full">
                    <FaCheck className="text-white text-sm" />
                </div>
                <h3 className="font-semibold text-md">{cartMessage} </h3>
            </div>
        </div>
    )
}

export default AddToCart
