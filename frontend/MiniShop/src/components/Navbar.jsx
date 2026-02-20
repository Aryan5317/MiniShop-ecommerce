import { FaShoppingCart, FaUser } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";

const Navbar = () => {
    return (
        <div className="w-full mb-1 pt-2 pb-2 flex flex-col gap-4 shadow-sm md:flex-row md:items-center md:justify-between bg-blue/50 transition-all duration-200 hover:shadow-md">
            <div className="flex items-center justify-between w-full pl-5 md:w-auto">
                <h1 className="text-2xl md:text-4xl font-bold text-sky-600">
                    MiniShop
                </h1>

                <div className="flex md:hidden flex-row text-md font-semibold">
                    <div className="flex justify-center items-center">
                        <h3 className="text-sky-600"><FaUser /></h3>
                        <h3 className="p-1 rounded-md px-2 text-black">Sign In</h3>
                    </div>
                    <div className="border-gray-300 border"></div>
                    <div className="flex justify-center items-center pr-2">
                        <h2 className="text-sky-600 px-2"><FaShoppingCart /></h2>
                        <h2>Cart</h2>
                    </div>
                </div>
            </div>
            <div className="border w-full md:w-1/2 lg:w-1/3 rounded-md">
                <input
                    type="text"
                    placeholder="Enter products..."
                    className="w-full rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-600"
                />
            </div>
            <div className="flex hidden md:flex gap-3 font-semibold mr-7">
                <div className="flex justify-center items-center">
                    <h3 className="text-sky-600"><FaUser/></h3>
                    <h3 className="p-1 px-3 rounded-md text-gray-600 text-xl">Sign In/Sign Up</h3>
                </div>
                <div className="text-2xl flex justify-center items-center">
                    <h2 className="text-sky-600 px-2"><FaShoppingCart /></h2>
                    <h2 className="text-gray-600">Cart</h2>
                </div>
                <button className="text-gray-600 text-4xl flex justify-center items-center px-3 cursor-pointer"><FiMenu/></button>
            </div>
        </div>
    )
}

export default Navbar
