import { useState } from 'react'
import { FilterIcon, ChevronDownIcon } from 'lucide-react'
import ProductCard from '../../components/ui/ProductCard'
import Button from '../../components/ui/Button'
import { products } from '../../data/products'
import { categories } from '../../data/categories'

const Products = () => {
    const [filters, setFilters] = useState({
        category: '',
        priceRange: '',
        sortBy: 'newest',
    })
    const [showFilters, setShowFilters] = useState(false)
    const handleFilterChange = (key: string, value: string) => {
        setFilters({
            ...filters,
            [key]: value,
        })
    }
    const clearFilters = () => {
        setFilters({
            category: '',
            priceRange: '',
            sortBy: 'newest',
        })
    }
    // Apply filters and sorting
    let filteredProducts = [...products]
    if (filters.category) {
        filteredProducts = filteredProducts.filter(
            (product) => product.categoryId === filters.category,
        )
    }
    if (filters.priceRange) {
        const [min, max] = filters.priceRange.split('-').map(Number)
        filteredProducts = filteredProducts.filter((product) => {
            if (max) {
                return product.price >= min && product.price <= max
            } else {
                return product.price >= min
            }
        })
    }
    // Apply sorting
    switch (filters.sortBy) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price)
            break
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price)
            break
        case 'name-asc':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
            break
        case 'name-desc':
            filteredProducts.sort((a, b) => b.name.localeCompare(a.name))
            break
        case 'newest':
        default:
            // Assume the products array is already sorted by newest
            break
    }
    return (
        <div className="bg-white w-full">
            <div className="container mx-auto px-4 py-8">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
                    <p className="text-gray-600 mt-2">
                        Browse our collection of high-quality clothing and accessories.
                    </p>
                </div>
                {/* Filters and Products */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Mobile Filter Button */}
                    <div className="lg:hidden mb-4">
                        <Button
                            onClick={() => setShowFilters(!showFilters)}
                            variant="outline"
                            className="w-full flex items-center justify-center"
                        >
                            <FilterIcon size={18} className="mr-2" />
                            {showFilters ? 'Hide Filters' : 'Show Filters'}
                        </Button>
                    </div>
                    {/* Filters Sidebar */}
                    <div
                        className={`lg:block lg:w-1/4 ${showFilters ? 'block' : 'hidden'}`}
                    >
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold">Filters</h2>
                                <button
                                    onClick={clearFilters}
                                    className="text-sm text-blue-900 hover:text-blue-700"
                                >
                                    Clear All
                                </button>
                            </div>
                            {/* Category Filter */}
                            <div className="mb-6">
                                <h3 className="text-sm font-medium text-gray-900 mb-2">
                                    Category
                                </h3>
                                <div className="space-y-2">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="category"
                                            checked={filters.category === ''}
                                            onChange={() => handleFilterChange('category', '')}
                                            className="h-4 w-4 text-blue-900 focus:ring-blue-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">
                                            All Categories
                                        </span>
                                    </label>
                                    {categories.map((category) => (
                                        <label key={category.id} className="flex items-center">
                                            <input
                                                type="radio"
                                                name="category"
                                                checked={filters.category === category.id}
                                                onChange={() =>
                                                    handleFilterChange('category', category.id)
                                                }
                                                className="h-4 w-4 text-blue-900 focus:ring-blue-500"
                                            />
                                            <span className="ml-2 text-sm text-gray-700">
                                                {category.name}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            {/* Price Filter */}
                            <div className="mb-6">
                                <h3 className="text-sm font-medium text-gray-900 mb-2">
                                    Price Range
                                </h3>
                                <div className="space-y-2">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="priceRange"
                                            checked={filters.priceRange === ''}
                                            onChange={() => handleFilterChange('priceRange', '')}
                                            className="h-4 w-4 text-blue-900 focus:ring-blue-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">
                                            All Prices
                                        </span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="priceRange"
                                            checked={filters.priceRange === '0-25'}
                                            onChange={() => handleFilterChange('priceRange', '0-25')}
                                            className="h-4 w-4 text-blue-900 focus:ring-blue-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">
                                            Under $25
                                        </span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="priceRange"
                                            checked={filters.priceRange === '25-50'}
                                            onChange={() => handleFilterChange('priceRange', '25-50')}
                                            className="h-4 w-4 text-blue-900 focus:ring-blue-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">
                                            $25 to $50
                                        </span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="priceRange"
                                            checked={filters.priceRange === '50-100'}
                                            onChange={() =>
                                                handleFilterChange('priceRange', '50-100')
                                            }
                                            className="h-4 w-4 text-blue-900 focus:ring-blue-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">
                                            $50 to $100
                                        </span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="priceRange"
                                            checked={filters.priceRange === '100-'}
                                            onChange={() => handleFilterChange('priceRange', '100-')}
                                            className="h-4 w-4 text-blue-900 focus:ring-blue-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">
                                            Over $100
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Products Grid */}
                    <div className="lg:w-3/4">
                        {/* Sorting and Results Count */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                            <p className="text-sm text-gray-500">
                                {filteredProducts.length} products
                            </p>
                            <div className="relative">
                                <select
                                    value={filters.sortBy}
                                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                                    className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="newest">Newest</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="name-asc">Name: A to Z</option>
                                    <option value="name-desc">Name: Z to A</option>
                                </select>
                                <ChevronDownIcon
                                    size={16}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                                />
                            </div>
                        </div>
                        {/* Products */}
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        id={product.id}
                                        name={product.name}
                                        price={product.price}
                                        originalPrice={product.originalPrice}
                                        image={product.image}
                                        category={product.category}
                                        isNew={product.isNew}
                                        isSale={product.isSale}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-gray-500">
                                    No products found matching your filters.
                                </p>
                                <Button onClick={clearFilters} className="mt-4">
                                    Clear Filters
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Products
