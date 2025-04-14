import { Link } from 'react-router-dom'
import {
    FacebookIcon,
    InstagramIcon,
    TwitterIcon,
    YoutubeIcon,
    MailIcon,
    PhoneIcon,
    MapPinIcon,
} from 'lucide-react'
const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-2xl font-bold mb-4">
                            D<span className="text-orange-500">Fashion</span>
                        </h3>
                        <p className="text-gray-300 mb-4">
                            Your one-stop destination for trendy and affordable fashion.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-300 hover:text-orange-500">
                                <FacebookIcon size={20} />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-orange-500">
                                <InstagramIcon size={20} />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-orange-500">
                                <TwitterIcon size={20} />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-orange-500">
                                <YoutubeIcon size={20} />
                            </a>
                        </div>
                    </div>
                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-gray-300 hover:text-orange-500">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/products"
                                    className="text-gray-300 hover:text-orange-500"
                                >
                                    Shop
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/blog"
                                    className="text-gray-300 hover:text-orange-500"
                                >
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/contact"
                                    className="text-gray-300 hover:text-orange-500"
                                >
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-orange-500">
                                    About Us
                                </a>
                            </li>
                        </ul>
                    </div>
                    {/* Categories */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Categories</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/category/men"
                                    className="text-gray-300 hover:text-orange-500"
                                >
                                    Men's Clothing
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/category/women"
                                    className="text-gray-300 hover:text-orange-500"
                                >
                                    Women's Clothing
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/category/kids"
                                    className="text-gray-300 hover:text-orange-500"
                                >
                                    Kids' Clothing
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/category/accessories"
                                    className="text-gray-300 hover:text-orange-500"
                                >
                                    Accessories
                                </Link>
                            </li>
                        </ul>
                    </div>
                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <MapPinIcon size={20} className="mr-2 mt-1 flex-shrink-0" />
                                <span className="text-gray-300">
                                    123 Fashion Street, City, Country
                                </span>
                            </li>
                            <li className="flex items-center">
                                <PhoneIcon size={20} className="mr-2 flex-shrink-0" />
                                <span className="text-gray-300">+1 234 567 8901</span>
                            </li>
                            <li className="flex items-center">
                                <MailIcon size={20} className="mr-2 flex-shrink-0" />
                                <span className="text-gray-300">info@fashionhub.com</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>
                        &copy; {new Date().getFullYear()} DFashion. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
export default Footer
