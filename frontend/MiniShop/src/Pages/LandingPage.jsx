import Navbar from "../components/component1/Navbar";
import HeroBanner from "../components/component1/HeroBanner";
import Category from "../components/component1/Category";
import TopButton from "../components/component1/TopButton";
import PhoneOptions from "../components/component1/PhoneOptions";
import Footer from "../components/component1/Footer";

function LandingPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar/>
            <HeroBanner/>
            <Category/>
            <PhoneOptions/>
            <TopButton/>
            <Footer/>
        </div>
    )
}

export default LandingPage
