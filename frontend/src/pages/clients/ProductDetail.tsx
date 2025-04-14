import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
    HeartIcon,
    StarIcon,
    TruckIcon,
    RefreshCcwIcon,
} from 'lucide-react'
import Button from '../../components/ui/Button'
import ProductCard from '../../components/ui/ProductCard'

import ReviewForm from '../../components/clients/review/ReviewForm'
import ReviewList from '../../components/clients/review/ReviewList'

import { useCart } from '../../contexts/clients/CartContext'

import { getAverageRating, getProductReviews, getRatingCounts } from '../../data/reviews'
import { getProductById, getRelatedProducts } from '../../data/products'
const ProductDetail = () => {
    const { productId } = useParams()
    const product = getProductById(productId)
    const [selectedSize, setSelectedSize] = useState('')
    const [selectedColor, setSelectedColor] = useState('')
    const [quantity, setQuantity] = useState(1)
    const { addItem } = useCart()
    const [activeTab, setActiveTab] = useState('description')
    if (!product) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
                <p className="mb-8">
                    The product you are looking for does not exist or has been removed.
                </p>
                <Link to="/products">
                    <Button>Browse All Products</Button>
                </Link>
            </div>
        )
    }
    const relatedProducts = getRelatedProducts(productId, product.categoryId)
    const reviews = getProductReviews(Number(productId))
    const averageRating = getAverageRating(Number(productId))
    const ratingCounts = getRatingCounts(Number(productId))
    const handleAddToCart = () => {
        if (selectedSize && selectedColor) {
            addItem({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                size: selectedSize,
                color: selectedColor,
            })
        }
    }
    const handleReviewSubmit = (reviewData:string) => {
        console.log('Review submitted:', reviewData)
    }
    return (
        <div className="bg-white w-full">
            <div className="container mx-auto px-4 py-12">
                <nav className="flex mb-8 text-sm">
                    <Link to="/" className="text-gray-500 hover:text-blue-900">
                        Home
                    </Link>
                    <span className="mx-2 text-gray-500">/</span>
                    <Link to="/products" className="text-gray-500 hover:text-blue-900">
                        Products
                    </Link>
                    <span className="mx-2 text-gray-500">/</span>
                    <Link
                        to={`/category/${product.categoryId}`}
                        className="text-gray-500 hover:text-blue-900"
                    >
                        {product.category}
                    </Link>
                    <span className="mx-2 text-gray-500">/</span>
                    <span className="text-gray-900">{product.name}</span>
                </nav>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="bg-gray-100 rounded-lg overflow-hidden">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            {product.name}
                        </h1>
                        <div className="flex items-center mb-4">
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <StarIcon
                                        key={star}
                                        size={18}
                                        className={star <= 4 ? 'text-yellow-400' : 'text-gray-300'}
                                        fill={star <= 4 ? 'currentColor' : 'none'}
                                    />
                                ))}
                            </div>
                            <span className="ml-2 text-sm text-gray-600">
                                4.0 (24 reviews)
                            </span>
                        </div>
                        <div className="mb-6">
                            <div className="flex items-center">
                                <span className="text-2xl font-bold text-gray-900">
                                    ${product.price.toFixed(2)}
                                </span>
                                {product.originalPrice && (
                                    <span className="ml-2 text-lg text-gray-500 line-through">
                                        ${product.originalPrice.toFixed(2)}
                                    </span>
                                )}
                                {product.originalPrice && (
                                    <span className="ml-2 bg-orange-500 text-white text-sm px-2 py-1 rounded">
                                        {Math.round(
                                            (1 - product.price / product.originalPrice) * 100,
                                        )}
                                        % OFF
                                    </span>
                                )}
                            </div>
                        </div>
                        <p className="text-gray-700 mb-6">{product.description}</p>
                        {product.colors && product.colors.length > 0 && (
                            <div className="mb-6">
                                <h3 className="text-sm font-medium text-gray-900 mb-2">
                                    Color
                                </h3>
                                <div className="flex space-x-2">
                                    {product.colors.map((color) => {
                                        const colorMap = {
                                            White: 'bg-white border-gray-300',
                                            Black: 'bg-gray-900',
                                            Gray: 'bg-gray-500',
                                            Blue: 'bg-blue-600',
                                            Red: 'bg-red-600',
                                            Green: 'bg-green-600',
                                            Yellow: 'bg-yellow-400',
                                            Pink: 'bg-pink-400',
                                            Purple: 'bg-purple-600',
                                            Brown: 'bg-yellow-800',
                                            Navy: 'bg-blue-900',
                                            Natural: 'bg-amber-200',
                                        }
                                        const bgClass = colorMap[color] || 'bg-gray-200'
                                        return (
                                            <button
                                                key={color}
                                                className={`w-8 h-8 rounded-full border ${selectedColor === color ? 'ring-2 ring-blue-900' : ''} ${bgClass}`}
                                                onClick={() => setSelectedColor(color)}
                                                aria-label={color}
                                            ></button>
                                        )
                                    })}
                                </div>
                                {selectedColor && (
                                    <p className="mt-2 text-sm text-gray-600">
                                        Selected: {selectedColor}
                                    </p>
                                )}
                            </div>
                        )}
                        {product.sizes && product.sizes.length > 0 && (
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                                    <button className="text-sm text-blue-900 hover:text-blue-700">
                                        Size Guide
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {product.sizes.map((size) => (
                                        <button
                                            key={size}
                                            className={`px-3 py-1 border rounded-md ${selectedSize === size ? 'border-blue-900 bg-blue-50 text-blue-900' : 'border-gray-300 text-gray-700 hover:border-gray-400'}`}
                                            onClick={() => setSelectedSize(size)}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                                {selectedSize && (
                                    <p className="mt-2 text-sm text-gray-600">
                                        Selected: {selectedSize}
                                    </p>
                                )}
                            </div>
                        )}
                        <div className="mb-6">
                            <h3 className="text-sm font-medium text-gray-900 mb-2">
                                Quantity
                            </h3>
                            <div className="flex items-center">
                                <button
                                    className="w-10 h-10 border border-gray-300 rounded-l-md flex items-center justify-center hover:bg-gray-100"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    min="1"
                                    value={quantity}
                                    onChange={(e) =>
                                        setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                                    }
                                    className="w-16 h-10 border-t border-b border-gray-300 text-center"
                                />
                                <button
                                    className="w-10 h-10 border border-gray-300 rounded-r-md flex items-center justify-center hover:bg-gray-100"
                                    onClick={() => setQuantity(quantity + 1)}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <button
                                onClick={handleAddToCart}
                                disabled={!selectedSize || !selectedColor}
                                className="mt-6 w-full bg-blue-900 text-white py-3 px-6 rounded-md hover:bg-blue-800 transition-colors disabled:bg-gray-400"
                            >
                                Add to Cart
                            </button>
                            <Button
                                variant="outline"
                                size="lg"
                                fullWidth
                                className="flex items-center justify-center"
                            >
                                <HeartIcon size={18} className="mr-2" />
                                Add to Wishlist
                            </Button>
                        </div>
                        <div className="border-t border-gray-200 pt-6">
                            <div className="flex items-center mb-4">
                                <TruckIcon size={20} className="text-gray-600 mr-2" />
                                <span className="text-sm text-gray-600">
                                    Free shipping on orders over $50
                                </span>
                            </div>
                            <div className="flex items-center">
                                <RefreshCcwIcon size={20} className="text-gray-600 mr-2" />
                                <span className="text-sm text-gray-600">
                                    30-day easy returns
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-16">
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8">
                            <button
                                className={`py-4 px-1 text-sm font-medium ${activeTab === 'description' ? 'border-b-2 border-blue-900 text-blue-900' : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                                onClick={() => setActiveTab('description')}
                            >
                                Description
                            </button>
                            <button
                                className={`py-4 px-1 text-sm font-medium ${activeTab === 'reviews' ? 'border-b-2 border-blue-900 text-blue-900' : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                                onClick={() => setActiveTab('reviews')}
                            >
                                Reviews ({reviews.length})
                            </button>
                            <button
                                className={`py-4 px-1 text-sm font-medium ${activeTab === 'shipping' ? 'border-b-2 border-blue-900 text-blue-900' : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                                onClick={() => setActiveTab('shipping')}
                            >
                                Shipping & Returns
                            </button>
                        </nav>
                    </div>
                    <div className="py-6">
                        {activeTab === 'description' && (
                            <div>
                                <p className="text-gray-700">{product.description}</p>
                                <p className="text-gray-700 mt-4">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                                    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                                <ul className="list-disc list-inside mt-4 text-gray-700">
                                    <li>High-quality materials</li>
                                    <li>Comfortable fit</li>
                                    <li>Durable construction</li>
                                    <li>Easy to care for</li>
                                </ul>
                            </div>
                        )}
                        {activeTab === 'reviews' && (
                            <div className="space-y-8">
                                <ReviewList
                                    reviews={reviews}
                                    averageRating={averageRating}
                                    ratingCounts={ratingCounts}
                                />
                                <div className="border-t border-gray-200 pt-8">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                        Write a Review
                                    </h3>
                                    <ReviewForm
                                        productId={Number(productId)}
                                        onSubmit={handleReviewSubmit}
                                    />
                                </div>
                            </div>
                        )}
                        {activeTab === 'shipping' && (
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                                        Shipping Information
                                    </h3>
                                    <p className="text-gray-700">
                                        We offer free standard shipping on orders over $50. Orders
                                        typically arrive within 3-5 business days.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                                        Return Policy
                                    </h3>
                                    <p className="text-gray-700">
                                        If you're not completely satisfied with your purchase, you
                                        can return it within 30 days for a full refund. Items must
                                        be unworn and in original packaging.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {relatedProducts.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            You May Also Like
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((product) => (
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
                    </div>
                )}
            </div>
        </div>
    )
}
export default ProductDetail
