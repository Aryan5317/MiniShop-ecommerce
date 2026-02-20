import { FiHome, FiUser, FiMenu, FiShoppingCart } from "react-icons/fi";

function PhoneOptions() {
    const selectOptions = [
        { icon: <FiHome />, name: "Home" },
        { icon: <FiUser />, name: "Account" },
        { icon: <FiMenu />, name: "Menu" },
        { icon: <FiShoppingCart />, name: "Cart" },
    ];

    return (
        <div className="fixed bottom-0 left-0 w-full bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.08)]
            flex justify-around items-center py-2 md:hidden z-50 ">
            {selectOptions.map((option) => (
                <div
                    key={option.name}
                    className="flex flex-col items-center cursor-pointer 
                     hover:text-sky-700 transition"
                >
                    <div className="text-2xl text-sky-600">{option.icon}</div>
                    <span className="text-md mt-1 font-medium text-black">
                        {option.name}
                    </span>
                </div>
            ))}
        </div>
    );
}

export default PhoneOptions;
