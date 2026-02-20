import { FiHome, FiUser, FiMenu, FiShoppingCart } from "react-icons/fi";
import { useEffect, useState } from "react";

function PhoneOptions() {
    const selectOptions = [
        { index: 0, icon: <FiHome />, name: "Home" },
        { index: 1, icon: <FiUser />, name: "Account" },
        { index: 2, icon: <FiMenu />, name: "Menu" },
        { index: 3, icon: <FiShoppingCart />, name: "Cart" },
    ];
    const [active, setActive] = useState(0)
    const SetActiveOption = (index) => {
        setActive(index)
    }
    useEffect(() => {
        console.log("Indez is active: ", active)
    }, [active])
    return (
        <div className="fixed bottom-0 left-0 w-full bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.08)]
            flex justify-around items-center py-2 md:hidden z-50 ">
            {selectOptions.map((option) => (
                <button
                    onClick={() => SetActiveOption(option.index)}
                    key={option.index}
                    className="flex flex-col items-center cursor-pointer 
                     hover:text-sky-700 transition"
                >
                    {(active === option.index) ? <div className="flex items-center absolute border-sky-600 border-2 top-0 min-w-[42px] rounded-md"></div> : ""}
                    <div className="text-2xl text-sky-600">{option.icon}</div>
                    <span className="text-md mt-1 font-medium text-black">
                        {option.name}
                    </span>
                </button>
            ))}
        </div>
    );
}

export default PhoneOptions;
