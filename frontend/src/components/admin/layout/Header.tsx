import {
  MenuIcon,
  BellIcon,
  UserIcon,
  SearchIcon,
  LogOutIcon,
} from 'lucide-react'
interface HeaderProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}
const Header = ({ setSidebarOpen }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-10 flex justify-between items-center h-16 bg-white shadow-sm px-4">
      <button
        className="p-1 mr-4 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none md:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <MenuIcon size={24} />
      </button>
      <div className="relative flex-1 max-w-md">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <SearchIcon className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="search"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search..."
        />
      </div>
      <div className="flex items-center ml-4">
        <button className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none">
          <BellIcon size={20} />
        </button>
        <div className="ml-4 relative">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                <UserIcon size={20} className="text-gray-600" />
              </div>
              <span className="hidden md:block ml-2 text-sm font-medium text-gray-700">
               Lê Dũng
              </span>
            </div>
            <button
              className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <LogOutIcon size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
export default Header
