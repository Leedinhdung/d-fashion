import { NavLink } from 'react-router-dom'
import {
    LayoutDashboardIcon,
    TagIcon,
    PackageIcon,
    ShoppingCartIcon,
    UsersIcon,
    SettingsIcon,
    XIcon,
} from 'lucide-react'
import routes from '../../../configs/routes'
interface SidebarProps {
    sidebarOpen: boolean
    setSidebarOpen: (open: boolean) => void
}
const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
    return (
        <>
            {/* Mobile sidebar backdrop */}
            <div
                className={`fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity md:hidden ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setSidebarOpen(false)}
            />
            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform md:translate-x-0 md:static md:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="flex items-center justify-between h-16 px-4 border-b">
                    <div className="flex items-center">
                        <span className="text-xl font-semibold text-gray-800">
                            ShopDash
                        </span>
                    </div>
                    <button
                        className="p-1 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none md:hidden"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <XIcon size={24} />
                    </button>
                </div>
                <nav className="mt-5 px-2 space-y-1">
                    <NavLink
                        to={routes.dashboard}
                        className={({ isActive }) =>
                            `flex items-center px-4 py-2 text-sm font-medium rounded-md ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`
                        }
                        end
                    >
                        <LayoutDashboardIcon className="mr-3 h-5 w-5" />
                        Dashboard
                    </NavLink>
                    <NavLink
                        to={routes.categories}
                        className={({ isActive }) =>
                            `flex items-center px-4 py-2 text-sm font-medium rounded-md ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`
                        }
                    >
                        <TagIcon className="mr-3 h-5 w-5" />
                        Categories
                    </NavLink>
                    <NavLink
                        to={routes.products}
                        className={({ isActive }) =>
                            `flex items-center px-4 py-2 text-sm font-medium rounded-md ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`
                        }
                    >
                        <PackageIcon className="mr-3 h-5 w-5" />
                        Products
                    </NavLink>
                    <NavLink
                        to="/orders"
                        className={({ isActive }) =>
                            `flex items-center px-4 py-2 text-sm font-medium rounded-md ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`
                        }
                    >
                        <ShoppingCartIcon className="mr-3 h-5 w-5" />
                        Orders
                    </NavLink>
                    <NavLink
                        to="/customers"
                        className={({ isActive }) =>
                            `flex items-center px-4 py-2 text-sm font-medium rounded-md ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`
                        }
                    >
                        <UsersIcon className="mr-3 h-5 w-5" />
                        Customers
                    </NavLink>
                    <NavLink
                        to="/settings"
                        className={({ isActive }) =>
                            `flex items-center px-4 py-2 text-sm font-medium rounded-md ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`
                        }
                    >
                        <SettingsIcon className="mr-3 h-5 w-5" />
                        Settings
                    </NavLink>
                </nav>
            </div>
        </>
    )
}
export default Sidebar
