import Navbar from "../components/component1/Navbar"
import PhoneOptions from "../components/component1/PhoneOptions"
import { FaCheck } from "react-icons/fa"

function CartOrderSuccessPage() {
    const startShopping = () => {
        setTimeout(() => {
            navigate("/home")
        }, 1000)
    }
    return (
        <div>
            <div className="flex flex-col  md:hidden items-center justify-center">
                <div className="flex flex-col items-center justify-cnnter m-3 mb-0 overflow-hidden bg-white rounded-lg">
                    <div className=" bg-green-400 rounded-full p-2">
                        <FaCheck className="text-white" size={24} />
                    </div>
                    <h3 className="font-bold text-xl px-3 ">Order SUCCESS!</h3>
                    <h3 className="font-semibold text-md px-3 ">Thank you for your purchase</h3>
                </div>
                <div className="border mb-3 mt-3 rounded-lg">
                    <button className="px-3 py-2 font-medium text-lg bg-green-500 text-white cursor pointer hover:bg-green-300" onClick={() => startShopping()}>Continue Shopping</button>
                </div>
                <PhoneOptions />
            </div>
            <div className="hidden md:flex flex-col items-center justify-center">
                <Navbar />
                <div className="flex flex-col items-center justify-center mb-6">
                    <div className="bg-green-400 rounded-full p-4">
                        <FaCheck className="text-white" size={40} />
                    </div>
                    <h3 className="font-bold text-3xl px-3 mt-3">Order SUCCESS!</h3>
                    <h3 className="font-semibold text-lg px-3 text-gray-500">Thank you for your purchase</h3>
                </div>
                <div className="flex flex-col max-w-4xl w-full gap-4">
                    <div className="flex items-center justify-center mb-6">
                        <button
                            className="px-8 py-3 font-semibold text-xl bg-green-500 text-white rounded-xl shadow-md hover:bg-green-600 transition duration-300 cursor-pointer"
                            onClick={() => startShopping()}>
                            Continue Shopping
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CartOrderSuccessPage
