import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PlusIcon, SearchIcon } from 'lucide-react'
import DataTable from '../../../components/admin/dashboard/DataTable'
import routes from '../../../configs/routes'
const ProductsList = () => {
    const navigate = useNavigate()
    // Mock products data
    const [products] = useState([
        {
            id: '1',
            name: 'Wireless Headphones',
            category: 'Electronics',
            price: '$129.99',
            stock: 45,
            status: 'Active',
        },
        {
            id: '2',
            name: 'Smart Watch',
            category: 'Electronics',
            price: '$199.99',
            stock: 32,
            status: 'Active',
        },
        {
            id: '3',
            name: 'Bluetooth Speaker',
            category: 'Electronics',
            price: '$89.99',
            stock: 18,
            status: 'Active',
        },
        {
            id: '4',
            name: 'Cotton T-Shirt',
            category: 'Clothing',
            price: '$24.99',
            stock: 120,
            status: 'Active',
        },
        {
            id: '5',
            name: 'Denim Jeans',
            category: 'Clothing',
            price: '$59.99',
            stock: 85,
            status: 'Active',
        },
        {
            id: '6',
            name: 'Running Shoes',
            category: 'Footwear',
            price: '$89.99',
            stock: 28,
            status: 'Active',
        },
        {
            id: '7',
            name: 'Coffee Maker',
            category: 'Home & Kitchen',
            price: '$79.99',
            stock: 14,
            status: 'Low Stock',
        },
        {
            id: '8',
            name: 'Stainless Steel Water Bottle',
            category: 'Sports & Outdoors',
            price: '$19.99',
            stock: 0,
            status: 'Out of Stock',
        },
    ])
    const [searchTerm, setSearchTerm] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('')
    const [statusFilter, setStatusFilter] = useState('')
    // Get unique categories for filter dropdown
    const categories = [...new Set(products.map((product) => product.category))]
    const statuses = [...new Set(products.map((product) => product.status))]
    // Filtered products
    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        const matchesCategory = categoryFilter
            ? product.category === categoryFilter
            : true
        const matchesStatus = statusFilter ? product.status === statusFilter : true
        return matchesSearch && matchesCategory && matchesStatus
    })
    // Columns for products table
    const productColumns = [
        {
            header: 'Product Name',
            accessor: 'name',
        },
        {
            header: 'Category',
            accessor: 'category',
        },
        {
            header: 'Price',
            accessor: 'price',
        },
        {
            header: 'Stock',
            accessor: 'stock',
        },
        {
            header: 'Status',
            accessor: 'status',
            cell: (value: string) => {
                let color = ''
                switch (value) {
                    case 'Active':
                        color = 'bg-green-100 text-green-800'
                        break
                    case 'Low Stock':
                        color = 'bg-amber-100 text-amber-800'
                        break
                    case 'Out of Stock':
                        color = 'bg-red-100 text-red-800'
                        break
                    default:
                        color = 'bg-gray-100 text-gray-800'
                }
                return (
                    <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}
                    >
                        {value}
                    </span>
                )
            },
        },
    ]
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Manage your product inventory
                    </p>
                </div>
                <button
                    onClick={() => navigate('/products/new')}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Add Product
                </button>
            </div>
            {/* Filters */}
            <div className="bg-white rounded-lg shadow p-5">
                <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <SearchIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                        <div>
                            <label htmlFor="category" className="sr-only">
                                Category
                            </label>
                            <select
                                id="category"
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            >
                                <option value="">All Categories</option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="status" className="sr-only">
                                Status
                            </label>
                            <select
                                id="status"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            >
                                <option value="">All Statuses</option>
                                {statuses.map((status, index) => (
                                    <option key={index} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            {/* Products Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">All Products</h3>
                </div>
                <DataTable
                    columns={productColumns}
                    data={filteredProducts}
                    onRowClick={() => navigate(routes.productDetail.replace('quan-tri/san-pham/:slug','1'))}
                />
            </div>
        </div>
    )
}
export default ProductsList
