
import { useSearchParams, Link } from 'react-router-dom'
import { ArrowLeftIcon } from 'lucide-react'
import ProductCard from '../../components/ui/ProductCard'
import { products } from '../../data/products'

const SearchResults = () => {
    const [searchParams] = useSearchParams()
    const query = searchParams.get('q') || ''
    const searchResults = products.filter(
        (product) =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase()),
    )
    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 py-12">
                {/* Back Navigation */}
                <Link
                    to="/"
                    className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8"
                >
                    <ArrowLeftIcon size={20} className="mr-2" />
                    Back to Home
                </Link>
                {/* Search Results Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Search Results for "{query}"
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Found {searchResults.length}{' '}
                        {searchResults.length === 1 ? 'result' : 'results'}
                    </p>
                </div>
                {/* Results Grid */}
                {searchResults.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {searchResults.map((product) => (
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
                        <p className="text-gray-500 mb-4">
                            No products found matching your search.
                        </p>
                        <p className="text-gray-600">
                            Try checking your spelling or using different keywords.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
export default SearchResults
