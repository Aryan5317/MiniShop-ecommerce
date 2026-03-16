import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { FiStar, FiChevronDown, FiRotateCcw, FiBox, FiShield, FiCheck, FiDollarSign, FiLock } from "react-icons/fi"
import { TbTruckDelivery, TbHandStop, TbCash } from "react-icons/tb"
import { MdPayments } from "react-icons/md";
import ExploreMobileProducts from "../../components/component2/ExploreMobileProducts";
import phoneDetailsService from "../../services/mobileServices/phoneDetailsService";
import Navbar from "../../components/component1/Navbar";
function SelectedMobilePage() {
  let params = useParams();
  let product = params.id;
  const [phoneData, setPhoneData] = useState({})
  useEffect(() => {
    const phoneDetails = async () => {
      const phone = await phoneDetailsService()
      console.log("Phone is: ", phone.data.phoneData)
      for (let i = 0; i < phone.data.phoneData.length; i++) {
        if (phone.data.phoneData[i]._id === product) {
          console.log("True");
          console.log("Phone value is fetched: ", phone.data.phoneData[i]);
          setPhoneData(phone.data.phoneData[i]);
        }
      }

    }
    phoneDetails();
  }, [])


  return (
    <>
      <Navbar />
      <div className="flex flex-col">
        <div className=" border hidden md:flex flex-row m-3 mt-1 bg-white">
          <div className="h-[100vh] w-[40%] flex items-center justify-center">
            <img src={phoneData.phoneImages?.[0]} alt="Error 404"
              className="h-[70%] w-[70%]" />
          </div>
          <div className="mx-3 pt-3 w-[55%] flex flex-col ">
            <p className="flex font-medium text-xl">{phoneData.phoneName}({phoneData.color}, {phoneData.phoneRam}GB + {phoneData.phoneStorage}GB) | {phoneData.description?.display} | {phoneData.description?.camera} | {phoneData.description?.highlights} | {phoneData.description?.battery}</p>
            <div className="flex items-center gap-1 mt-3">
              <h3 className="font-medium text-lg">0.0</h3>
              <div className="flex ">
                <FiStar className="font-medium text-lg" />
                <FiStar className="font-medium text-lg" />
                <FiStar className="font-medium text-lg" />
                <FiStar className="font-medium text-lg" />
                <FiStar className="font-medium text-lg" />
              </div>
              <div className="flex items-center">
                <FiChevronDown className="font-medium text-lg" />
                <h3 className="font-medium text-lg text-sky-600">(0)</h3>
              </div>
            </div>
            <div className="flex mt-3 gap-1">
              <h3 className="font-bold text-md">{phoneData.totalSell}+ bought</h3>
              <h3 className="text-md">in past month</h3>
            </div>
            <div className="border-gray-300 border mt-3"></div>
            <div className="mt-5 m-3 mb-0 flex flex-row gap-3">
              <h3 className="font-medium text-2xl text-red-400">-{phoneData.discount}%</h3>
              <div className="flex ">
                <h3>₹</h3>
                <h3 className="text-3xl font-semibold ">{phoneData.currentPrice}</h3>
              </div>
            </div>
            <div className="m-3 mt-1 flex gap-1">
              <h3>M.R.P:</h3>
              <h3 className="line-through">₹{phoneData.oldPrice}</h3>
              <h3 className="text-gray-300 px-3">|</h3>
              <h3 className="text-sky-600">Price history</h3>
            </div>
            <div className="flex gap-3 overflow-y-auto">
              <div className="gap-1 flex flex-col items-center w-[20%] ">
                <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
                  <FiBox className="text-3xl text-orange-400" />
                  <FiRotateCcw className="text-gray-500 absolute" size={50} strokeWidth={1} />
                </div>
                <div className="flex flex-col w-[100%] justify-center items-center">
                  <h3 className="font-semibold text-md text-center text-sky-600">10 days Service Center Replacement</h3>
                </div>
              </div>
              <div className="gap-1 flex flex-col items-center w-[20%] ">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 ">
                  <TbTruckDelivery className="text-gray-500" size={50} strokeWidth={1} />
                </div>
                <div className="flex flex-col w-[100%] justify-center items-center">
                  <h3 className="font-semibold text-md text-center text-sky-600">Free Delivery</h3>
                </div>
              </div>
              <div className="gap-1 flex flex-col items-center w-[20%]">
                <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
                  <FiShield className="text-gray-500" size={40} strokeWidth={1} />
                  <FiCheck className="text-orange-400 absolute" />
                </div>
                <div className="flex flex-col w-[100%] justify-center items-center">
                  <h3 className="font-semibold text-md text-center text-sky-600">1 Year warranty</h3>
                </div>
              </div>
              <div className="gap-1 flex flex-col items-center w-[20%]">
                <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
                  <MdPayments className="text-gray-500" size={30} strokeWidth={1} />
                </div>
                <div className="flex flex-col w-[100%] justify-center items-center">
                  <h3 className="font-semibold text-md text-center text-sky-600">Pay on Delivery</h3>
                </div>
              </div>
              <div className="gap-1 flex flex-col items-center w-[20%]">
                <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
                  <FiLock className="text-gray-500" size={50} strokeWidth={1} />
                  <FiDollarSign className="text-orange-400 absolute mt-5" size={20} />
                </div>
                <div className="flex flex-col w-[100%] justify-center items-center">
                  <h3 className="font-semibold text-md text-center text-sky-600">Secure Transaction</h3>
                </div>
              </div>
            </div>
            <div className="border-gray-300 border mt-3"></div>
            {/* <div className="mt-3 m-1 border">
            <div className="border flex gap-3">
              <h3 className="font-medium text-xl">Colour:</h3>
              <h3 className="font-semibold text-xl">{phoneData.color}</h3>
            </div>
            <div className="border mt-1 flex flex-col w-[15%] pt-3 items-center justify-center">
              <img src={phoneData.phoneImages?.[0]} alt="Error 404" className="w-[75%] border" />
              <div className="flex flex-col items-center justify-left">
                <h3 className="text-left font-medium">₹{phoneData.currentPrice}</h3>
                <h3 className="text-left line-through text-gray-500 font-medium">₹{phoneData.oldPrice}</h3>
              </div>
            </div>
          </div> */}
            <div className="flex flex-col gap-3  mt-3 mx-3 ">
              <div className="flex border mt-1 px-3 py-1 w-[40%] gap-1 rounded-lg bg-gray-100 hover:bg-gray-200  transition duration-300">
                <h3 className="text-lg font-medium">Quantity: </h3>
                <select name="quantity" id="" className="outline-none w-[100%] ">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>
              <div className="flex border px-3 py-2 w-[40%] gap-1 rounded-3xl bg-yellow-400 items-center justify-center hover:bg-yellow-500 transition duration-300">
                <button className="text-lg">Add to cart</button>
              </div>
              <div className="flex border px-3 py-2 mb-3 w-[40%] gap-1 rounded-3xl bg-amber-500 items-center justify-center hover:bg-orange-500  transition duration-300">
                <button className="text-lg">Buy now</button>
              </div>
            </div>
            <div className=" mt-3 flex flex-col">
              <h3 className="text-xl font-bold">About this item</h3>
              <ul className="list-disc pl-4">
                <li>Premium Halo Design | High performance MediaTek Helio G36,upto 2.2GHz; | 6.71" HD+ 90Hz Display with GG3 Protection | Upto 8GB RAM including 4GB Virtual RAM |Upto 128GB Storage | Fast Side fingerprint sensor</li>
                <li>Display: Large 17.04 cm 90Hz dot display with Corning Gorilla Glass 3 protection | 500nits peak brightness | 180Hz Touch sampling Rate</li>
                <li>Camera: 8MP AI Dual camera with Google lens, Portrait mode and classic film filters| 5MP Front camera</li>
                <li>5000mAh(typ) battery abd 10W charger in-box with USB Type-C</li>
                <li>Expandable Storage to upto 1TB with Dedicated MicroSD card Slot | 3.5mm headphone jack | Android 14 | Bluetooth 5.4 | Side fingerprint sensor | MIUI Dialer</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-0 m-3">
          <h3 className="text-2xl font-bold ">Explore top deals in related categories</h3>
        </div>
        <div>
          <ExploreMobileProducts />
        </div>
      </div>
    </>
  )
}

export default SelectedMobilePage
