import { useRef } from "react"
import { FiArrowRight } from "react-icons/fi"
import { Link } from "react-router-dom"
function Category() {
    const scrollRef = useRef()
    const ScroolRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                left: scrollRef.current.clientWidth,
                behavior: "smooth",
            })
        }
    }

    const categoryDetails = [
        { image: "https://res.cloudinary.com/dpbsi7b4y/image/upload/v1775116484/Phone_mzn4an.png", name: "Mobile", id: "001", path: "/home/mobilePhones" },
        { image: "https://res.cloudinary.com/dpbsi7b4y/image/upload/v1775116481/Bags_toyegz.png", name: "Bags", id: "002", path: "/home/bagsPages" },
        { image: "https://res.cloudinary.com/dpbsi7b4y/image/upload/v1775116486/Watches_fg6vfp.png", name: "Watches", id: "003", path: "/home/watches" },
        { image: "https://res.cloudinary.com/dpbsi7b4y/image/upload/v1775116484/Clothes_bscmom.png", name: "Clothes", id: "004", path: "/home/clothes" },
        { image: "https://res.cloudinary.com/dpbsi7b4y/image/upload/v1775116483/Earphones_ui0pzl.png", name: "Earphone", id: "005", path: "/home/earphones" },
        // { image: Kitchen, name: "Kitchen", id: "006", path: "/home/kitchen" },
        { image: "https://res.cloudinary.com/dpbsi7b4y/image/upload/v1775116485/Shoes_ejsrjf.png", name: "Shoes", id: "007", path: "/home/shoes" }
    ]

    return (
        <div className="mt-2 w-full flex justify-center flex-col bg-white shadow-lg">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <h3 className="text-xl p-1 font-medium
                 md:pl-3 md:font-semibold
                 lg:text-2xl lg:font-semibold lg:pl-5">Shop From</h3>
                    <h3 className="text-2xl font-medium p-1 text-sky-600
                md:font-bold md:text-3xl
                lg:text-3xl lg:font-bold">Top Categories</h3>
                </div>
                <button onClick={ScroolRight} className="mr-2 m-1 flex justify-center items-center text-sm md:text-lg md:mr-7 md:gap-1">
                    <h3 >View All</h3>
                    <h3 className="text-lg text-sky-600 md:text-xl"><FiArrowRight /></h3>
                </button>
            </div>
            <div className="border-sky-600 border-2 w-1/2 ml-1
            md:w-1/3 md:m-2 
            lg:m-2 lg:ml-5"></div>
            <div className="flex justify-center mt-1 rounded-2xl">
                <div className="flex overflow-x-auto overflow-y-hidden md:gap-7 scroll-smooth" ref={scrollRef}>
                    {categoryDetails.map((items) => (
                        <Link
                            key={items.id}
                            to={items.path}
                            className="flex border flex-col items-center min-w-[120px] md:min-w-[230px] p-3 rounded-2xl cursor-pointer"
                        >
                            <img
                                src={items.image}
                                alt={items.name}
                                className="md:h-40 md:w-40 lg:h-44 lg:w-44 h-20 w-20 rounded-full border-2 border-sky-600 
                     shadow-md hover:shadow-lg transition duration-300 object-cover"
                            />
                            <div className="mt-3 text-lg md:text-xl font-semibold text-sky-600 cursor-pointer">
                                {items.name}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default Category
