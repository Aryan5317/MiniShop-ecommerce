import { FaLessThan, FaGreaterThan } from "react-icons/fa";
import { useState } from "react";

function HeroBanner() {

    const HeroBanner = ["https://res.cloudinary.com/dpbsi7b4y/image/upload/v1775122615/Screenshot_2026-04-02_150622_fwtq5t.png", "https://res.cloudinary.com/dpbsi7b4y/image/upload/v1775123459/Gemini_Generated_Image_6wl89n6wl89n6wl8_sjndrw.png", "https://res.cloudinary.com/dpbsi7b4y/image/upload/v1775123603/Banner2_idmfgz.png", "https://res.cloudinary.com/dpbsi7b4y/image/upload/v1775123606/Banner4_nk05yp.png", "https://res.cloudinary.com/dpbsi7b4y/image/upload/v1775123614/Banner5_kmqi8k.png"]
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
                h-[220px] 
                sm:h-[350px] 
                md:h-[380px] 
                lg:h-[450px] 
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
