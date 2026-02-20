import { FaLessThan, FaGreaterThan } from "react-icons/fa";
import { useState } from "react";
import { Banner1, Banner2, Banner3, Banner4, Banner5 } from "../context/heroBanner.js"

function HeroBanner() {

    const HeroBanner = [Banner1, Banner2, Banner3, Banner4, Banner5]
    const [bannerIndex, setBannerIndex] = useState(0);

    const SetLessThan = () => {
        if (bannerIndex > 0) {
            setBannerIndex(bannerIndex - 1)
        }
        console.log("BannerIndex: ", bannerIndex)
    }
    const SetGreaterThan = () => {
        if (bannerIndex < 4) {
            setBannerIndex(bannerIndex + 1)
        }
        console.log("BannerIndex: ", bannerIndex)
    }

    return (
        <div className="relative w-full overflow-hidden">
            <div className="w-full 
                h-[180px] 
                sm:h-[250px] 
                md:h-[300px] 
                lg:h-[400px] 
                overflow-hidden">

                <img
                    src={HeroBanner[bannerIndex]}
                    alt="Hero Banner"
                    className="w-full h-full object-cover object-center"
                />
            </div>
            <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4 -translate-y-1/2">
                <button
                    onClick={SetLessThan}
                    disabled={bannerIndex === 0}
                    className={`p-2 sm:p-3 rounded-full transition ${bannerIndex === 0
                        ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                        : "bg-black/50 text-white hover:bg-black cursor-pointer"}`}
                >
                    <FaLessThan className="text-sm sm:text-lg md:text-2xl" />
                </button>
                <button
                    onClick={SetGreaterThan}
                    className={`p-2 sm:p-3 rounded-full transition ${bannerIndex === 4
                        ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                        : "bg-black/50 text-white hover:bg-black cursor-pointer"}`}
                >
                    <FaGreaterThan className="text-sm sm:text-lg md:text-2xl" />
                </button>
            </div>

        </div>
    )
}

export default HeroBanner
