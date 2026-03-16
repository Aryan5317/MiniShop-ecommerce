import Navbar from "../components/component1/Navbar"
import HeroBanner from "../components/component1/HeroBanner"
import Category from "../components/component1/Category"
import PhoneOptions from "../components/component1/PhoneOptions"
import Footer from "../components/component1/Footer"
import MobilePhoneDeals from "../components/component1/mobilePhoneDeals"
function HomePage(){
  console.log("Home Page Rendered"); 
  return (
    <div>
      <Navbar/>
      <HeroBanner/>
      <Category/>
      <MobilePhoneDeals/>
      <PhoneOptions/>
      <Footer/>
    </div>
  )
}

export default HomePage
