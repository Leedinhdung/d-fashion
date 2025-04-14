import { useParams, Link } from 'react-router-dom'
import ProductCard from '../../components/ui/ProductCard'
import Button from '../../components/ui/Button'

import { getCategoryById } from '../../data/categories'
import { getProductsByCategory } from '../../data/products'
const CategoryProducts = () => {
    const { categoryId } = useParams()
    const category = getCategoryById(categoryId)
    const products = getProductsByCategory(categoryId)
    if (!category) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
                <p className="mb-8">The category you are looking for does not exist.</p>
                <Link to="/products">
                    <Button>Browse All Products</Button>
                </Link>
            </div>
        )
    }
    return (
        <div className="bg-white w-full">
            {/* Category Banner */}
            <div
                className="relative h-80 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${category.image})`,
                }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="container mx-auto px-4 h-full flex items-center justify-center relative">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-white mb-4">
                            {category.name}
                        </h1>
                        <p className="text-lg text-white max-w-2xl">
                            {category.description}
                        </p>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4 py-12">
                {/* Products Count */}
                <div className="mb-8">
                    <p className="text-gray-600">
                        {products.length} products found in {category.name}
                    </p>
                </div>
                {/* Products Grid */}
                {products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product) => (
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
                            No products found in this category.
                        </p>
                        <Link to="/products">
                            <Button>Browse All Products</Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
export default CategoryProducts
