import Navbar from "../components/component1/Navbar";
import HeroBanner from "../components/component1/HeroBanner";
import Category from "../components/component1/Category";
import TopButton from "../components/component1/TopButton";
import PhoneOptions from "../components/component1/PhoneOptions";
import Footer from "../components/component1/Footer";
import SignIn from "../components/component1/SignIn";
import { propContext } from "../context/contextApi";
import { useContext } from "react"

function LandingPage() {
    const { isLoggedIn } = useContext(propContext)
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <HeroBanner />
            <Category />
            <PhoneOptions />
            {!isLoggedIn &&
                <SignIn />
            }
            <TopButton />
            <Footer />
        </div>
    )
}

export default LandingPage
