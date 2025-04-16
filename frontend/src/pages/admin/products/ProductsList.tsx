import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { PlusIcon, SearchIcon, Trash2Icon, TrashIcon } from 'lucide-react'
import DataTable from '../../../components/admin/dashboard/DataTable'
import routes from '../../../configs/routes'
import { useGetAllProducts, useSoftDeleteProduct } from '../../../hooks/product/useProduct'
import { IProduct } from '../../../types/product'
interface Image {
    url: string
    fileName: string
}
const ProductsList = () => {
    const navigate = useNavigate()
    const { data: products = [], isLoading } = useGetAllProducts()
    const { mutateAsync: softDeleteProduct } = useSoftDeleteProduct()

    const [searchTerm, setSearchTerm] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('')
    const [statusFilter, setStatusFilter] = useState('')

    const categories = useMemo(() => {
        return [...new Set(products.map((product) => product.categoryId).filter(Boolean))]
    }, [products])

    const statuses = useMemo(() => {
        return [...new Set(products.map((product) => product.status).filter(Boolean))]
    }, [products])

    // Filtered products
    const filteredProducts = useMemo(() => {
        if (!products || !Array.isArray(products)) return []

        return products.filter((product) => {
            const matchesSearch = product.name
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase()) ?? false
            const matchesCategory = categoryFilter
                ? product.categoryId === categoryFilter
                : true
            const matchesStatus = statusFilter
                ? product.status === statusFilter
                : true
            return matchesSearch && matchesCategory && matchesStatus
        })
    }, [products, searchTerm, categoryFilter, statusFilter])

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
            header: 'Image',
            accessor: 'images',
            cell: (images: Image[]) => (
                images && images.length > 0 ? (
                    <img
                        src={images[0].url}
                        alt="Product"
                        className="h-10 w-10 object-cover rounded"
                        onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/40'
                        }}
                    />
                ) : (
                    <img
                        src="https://via.placeholder.com/40"
                        alt="No image"
                        className="h-10 w-10 object-cover rounded"
                    />
                )
            ),
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
        {
            header: 'Actions',
            accessor: '_id',
            cell: (value: string, row: IProduct) => (
                <div className="flex space-x-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(row)
                        }}
                        className="p-1 text-red-600 hover:text-red-800"
                    >
                        <TrashIcon size={16} />
                    </button>
                </div >
            ),
        },
    ]
    const handleDelete = async (product: IProduct) => {
        await softDeleteProduct(product._id)
    }
    if (isLoading) return <div className="text-center py-4">Loading...</div>

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Manage your product inventory
                    </p>
                </div>
                <div className="flex space-x-4">
                    <button
                        onClick={() => navigate(routes.productsTrash)}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <Trash2Icon className="mr-2 h-4 w-4" />
                        Trash
                    </button>
                    <button
                        onClick={() => navigate(routes.addProduct)}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <PlusIcon className="mr-2 h-4 w-4" />
                        Add Product
                    </button>
                </div>

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
                    onRowClick={(row) => navigate(routes.editProduct.replace(':id', row?._id))}
                />
            </div>
        </div>
    )
}

export default ProductsList
