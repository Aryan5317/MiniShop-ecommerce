import Navbar from "../components/component1/Navbar"
import HeroBanner from "../components/component1/HeroBanner"
import Category from "../components/component1/Category"
import PhoneOptions from "../components/component1/PhoneOptions"
import Footer from "../components/component1/Footer"
import ExploreMobileProducts from "../components/component2/ExploreMobileProducts"
import ExploreBagsProducts from "../components/component2/ExploreBagsProduct"
import ExploreClothesProduct from "../components/component2/ExploreClothesProduct"
import ExploreEarPhoneProduct from "../components/component2/ExploreEarPhoneProduct"
import ExploreWatchProduct from "../components/component2/ExploreWatchProduct"
import ExploreShoesProducts from "../components/component2/ExploreShoesProducts"
function HomePage() {
  
  return (
    <div>
      <Navbar />
      <HeroBanner />
      <Category />
      <div className="flex flex-col gap-3 mt-3 px-4">
        <h3 className="text-2xl font-bold text-gray-800 border-l-4 border-sky-600 pl-3">
          Explore Phone Products
        </h3>
        <ExploreMobileProducts />
      </div>
      <div className="flex flex-col gap-3 mt-3 px-4">
        <h3 className="text-2xl font-bold text-gray-800 border-l-4 border-sky-600 pl-3">
          Explore Bags Products
        </h3>
        <ExploreBagsProducts />
      </div>
      <div className="flex flex-col gap-3 mt-3 px-4">
        <h3 className="text-2xl font-bold text-gray-800 border-l-4 border-sky-600 pl-3">
          Explore Clothes Products
        </h3>
        <ExploreClothesProduct />
      </div>
      <div className="flex flex-col gap-3 mt-3 px-4">
        <h3 className="text-2xl font-bold text-gray-800 border-l-4 border-sky-600 pl-3">
          Explore EarPhones Products
        </h3>
        <ExploreEarPhoneProduct />
      </div>
      <div className="flex flex-col gap-3 mt-3 px-4">
        <h3 className="text-2xl font-bold text-gray-800 border-l-4 border-sky-600 pl-3">
          Explore Shoes Products
        </h3>
        <ExploreShoesProducts />
      </div>
      <div className="flex flex-col gap-3 mt-3 px-4">
        <h3 className="text-2xl font-bold text-gray-800 border-l-4 border-sky-600 pl-3">
          Explore Watch Products
        </h3>
        <ExploreWatchProduct />
      </div>
      <PhoneOptions />
      <Footer />
    </div>
  )
}

export default HomePage
