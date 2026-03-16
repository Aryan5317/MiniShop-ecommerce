import Navbar from "../../components/component1/Navbar"
import PhoneOptions from "../../components/component1/PhoneOptions"
import Footer from "../../components/component1/Footer"
import MobileCatalogue from "../../components/component2/MobileCatalogue"
import Mobiles from "../../components/component2/mobiles"
import DesktopScreenFilterOption from "../../components/component2/DesktopScreenFilterOption"
function MobilePhonesPages() {

  return (
    <div>
      <Navbar />
      <MobileCatalogue />
      <div className="flex w-full min-h-screen border bg-white">
        <DesktopScreenFilterOption />
        <Mobiles />
      </div>
      <PhoneOptions />
      <Footer />
    </div>
  )
}

export default MobilePhonesPages
