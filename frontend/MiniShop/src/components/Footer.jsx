import { FaFacebook, FaTwitter, FaPhoneAlt, FaInstagram } from "react-icons/fa";

function Footer() {
    return (
        <footer className="hidden md:flex flex-col justify-between bg-sky-600 text-white mt-1 min-h-[375px]">
            <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-3 gap-8">
                <div>
                    <h2 className="text-lg font-semibold mb-3">Get to Know Us</h2>
                    <div className="w-24 h-1 bg-white mb-4 rounded"></div>

                    <ul className="space-y-2 text-sm opacity-90 list-disc list-inside pl-2">
                        <li className="hover:underline cursor-pointer">Services</li>
                        <li className="hover:underline cursor-pointer">About Us</li>
                        <li className="hover:underline cursor-pointer">Careers</li>
                        <li className="hover:underline cursor-pointer">Terms & Conditions</li>
                        <li className="hover:underline cursor-pointer">Privacy Policy</li>
                    </ul>
                </div>
                <div>
                    <h2 className="text-lg font-semibold mb-3">Contact Us</h2>
                    <div className="w-24 h-1 bg-white mb-4 rounded"></div>

                    <div className="space-y-3 text-sm opacity-90">
                        <div className="flex items-center gap-3 cursor-pointer hover:underline">
                            <FaFacebook /> Facebook
                        </div>

                        <div className="flex items-center gap-3 cursor-pointer hover:underline">
                            <FaTwitter /> Twitter
                        </div>

                        <div className="flex items-center gap-3 cursor-pointer hover:underline">
                            <FaInstagram /> Instagram
                        </div>

                        <div>
                            <div className="flex items-center gap-3 cursor-pointer hover:underline">
                                <FaPhoneAlt /> Call Us
                            </div>
                            <p className="ml-6 text-sm opacity-80">+91 123-456-7890</p>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="text-lg font-semibold mb-3">Most Popular Category</h2>
                    <div className="w-24 h-1 bg-white mb-4 rounded"></div>

                    <ul className="space-y-2 text-sm opacity-90 list-disc list-inside pl-2">
                        <li className="hover:underline cursor-pointer">Shoes</li>
                        <li className="hover:underline cursor-pointer">Clothes</li>
                        <li className="hover:underline cursor-pointer">Earphones</li>
                        <li className="hover:underline cursor-pointer">Watches</li>
                        <li className="hover:underline cursor-pointer">Phones</li>
                    </ul>
                </div>

            </div>
            <div className="bg-sky-700 text-center py-4 text-sm">
                © {new Date().getFullYear()} MiniShop. All rights reserved.
            </div>

        </footer>
    );
}

export default Footer;
