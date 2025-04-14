import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    ShoppingBagIcon,
    MenuIcon,
    SearchIcon,
    UserIcon,
    XIcon,
    LogOutIcon,
} from 'lucide-react'

import CartDropdown from '../cart/CartDropdown'
import SearchInput from '../../ui/SearchInput'
import { useCart } from '../../../contexts/clients/CartContext'
import routes from '../../../configs/routes'
const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)

    const { itemsCount } = useCart()
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between py-4">
                    <Link to={routes.home} className="text-2xl font-bold text-blue-900">
                        D<span className="text-orange-500">Fashion</span>
                    </Link>
                    <nav className="hidden md:flex space-x-8">
                        <Link
                            to={routes.home}
                            className="text-gray-700 hover:text-blue-900 font-medium"
                        >
                            Home
                        </Link>
                        <Link
                            to={routes.allProducts}
                            className="text-gray-700 hover:text-blue-900 font-medium"
                        >
                            Shop
                        </Link>
                        <div className="relative group">
                            <button className="text-gray-700 hover:text-blue-900 font-medium">
                                Categories
                            </button>
                            <div className="absolute left-0  w-48 bg-white shadow-lg rounded-md hidden group-hover:block">
                                <Link
                                    to={routes.productByCate.replace(':slug', 'men')}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Men
                                </Link>
                                <Link
                                    to="/category/women"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Women
                                </Link>
                                <Link
                                    to="/category/kids"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Kids
                                </Link>
                                <Link
                                    to="/category/accessories"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Accessories
                                </Link>
                            </div>
                        </div>
                        <Link
                            to={routes.blog}
                            className="text-gray-700 hover:text-blue-900 font-medium"
                        >
                            Blog
                        </Link>
                        <Link
                            to={routes.contact}
                            className="text-gray-700 hover:text-blue-900 font-medium"
                        >
                            Contact
                        </Link>
                    </nav>
                    <div className="flex items-center space-x-4">
                        <div className="hidden md:block">
                            <SearchInput />
                        </div>
                        <button
                            className="md:hidden text-gray-700 hover:text-blue-900"
                            onClick={() => setIsSearchOpen(true)}
                        >
                            <SearchIcon size={20} />
                        </button>
                        {/* {user ? (
                            <div className="relative group">
                                <button className="text-gray-700 hover:text-blue-900">
                                    <UserIcon size={20} />
                                </button>
                                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md hidden group-hover:block">
                                    <div className="px-4 py-2 border-b border-gray-100">
                                        <p className="text-sm font-medium text-gray-900">
                                            {user.name}
                                        </p>
                                        <p className="text-xs text-gray-500">{user.email}</p>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                    >
                                        <LogOutIcon size={16} className="mr-2" />
                                        Sign out
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Link to="/auth" className="text-gray-700 hover:text-blue-900">
                                <UserIcon size={20} />
                            </Link>
                        )} */}
                        <button
                            className="text-gray-700 hover:text-blue-900 relative"
                            onClick={() => setIsCartOpen(true)}
                        >
                            <ShoppingBagIcon size={20} />
                            {itemsCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {itemsCount}
                                </span>
                            )}
                        </button>
                        <button className="md:hidden text-gray-700" onClick={toggleMenu}>
                            <MenuIcon size={24} />
                        </button>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 md:hidden">
                    <div className="bg-white h-full w-64 p-5">
                        <div className="flex justify-between items-center mb-8">
                            <Link to="/" className="text-xl font-bold text-blue-900">
                                FASHION<span className="text-orange-500">HUB</span>
                            </Link>
                            <button onClick={toggleMenu}>
                                <XIcon size={24} />
                            </button>
                        </div>
                        <nav className="flex flex-col space-y-4">
                            <Link
                                to="/"
                                className="text-gray-700 hover:text-blue-900 font-medium"
                                onClick={toggleMenu}
                            >
                                Home
                            </Link>
                            <Link
                                to="/products"
                                className="text-gray-700 hover:text-blue-900 font-medium"
                                onClick={toggleMenu}
                            >
                                Shop
                            </Link>
                            <Link
                                to="/category/men"
                                className="text-gray-700 hover:text-blue-900 font-medium pl-4"
                                onClick={toggleMenu}
                            >
                                Men
                            </Link>
                            <Link
                                to="/category/women"
                                className="text-gray-700 hover:text-blue-900 font-medium pl-4"
                                onClick={toggleMenu}
                            >
                                Women
                            </Link>
                            <Link
                                to="/category/kids"
                                className="text-gray-700 hover:text-blue-900 font-medium pl-4"
                                onClick={toggleMenu}
                            >
                                Kids
                            </Link>
                            <Link
                                to="/category/accessories"
                                className="text-gray-700 hover:text-blue-900 font-medium pl-4"
                                onClick={toggleMenu}
                            >
                                Accessories
                            </Link>
                            <Link
                                to="/blog"
                                className="text-gray-700 hover:text-blue-900 font-medium"
                                onClick={toggleMenu}
                            >
                                Blog
                            </Link>
                            <Link
                                to="/contact"
                                className="text-gray-700 hover:text-blue-900 font-medium"
                                onClick={toggleMenu}
                            >
                                Contact
                            </Link>
                        </nav>
                    </div>
                </div>
            )}
            {isSearchOpen && (
                <div className="fixed inset-0 z-50 bg-white md:hidden">
                    <div className="p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-medium">Search</h2>
                            <button
                                onClick={() => setIsSearchOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <XIcon size={24} />
                            </button>
                        </div>
                        <SearchInput isFullWidth onClose={() => setIsSearchOpen(false)} />
                    </div>
                </div>
            )}
            <CartDropdown isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </header>
    )
}
export default Header
