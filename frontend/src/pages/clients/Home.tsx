import { Link } from 'react-router-dom'
import { ArrowRightIcon } from 'lucide-react'
import Button from '../../components/ui/Button'
import ProductCard from '../../components/ui/ProductCard'
import CategoryCard from '../../components/ui/CategoryCard'

import { posts } from '../../data/posts'
import { products } from '../../data/products'
import { categories } from '../../data/categories'
import routes from '../../configs/routes'

const Home = () => {
    const featuredProducts = products.slice(0, 4)
    return (
        <div className="w-full">
            {/* Hero Section */}
            <section
                className="relative bg-cover bg-center h-[600px]"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
                }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <div className="container mx-auto px-4 h-full flex items-center relative">
                    <div className="max-w-lg">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Summer Collection 2023
                        </h1>
                        <p className="text-lg text-white mb-8">
                            Discover the latest trends in fashion and express your unique
                            style with our new collection.
                        </p>
                        <div className="flex space-x-4">
                            <Button size="lg">Shop Now</Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="bg-white/20 backdrop-blur-sm text-white border-white"
                            >
                                Learn More
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
            {/* Categories Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">
                            Shop by Category
                        </h2>
                        <Link
                            to="/products"
                            className="text-blue-900 hover:text-blue-700 flex items-center"
                        >
                            View All <ArrowRightIcon size={16} className="ml-1" />
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categories.map((category) => (
                            <CategoryCard
                                key={category.id}
                                id={category.id}
                                name={category.name}
                                image={category.image}
                                productCount={category.productCount}
                            />
                        ))}
                    </div>
                </div>
            </section>
            {/* Featured Products */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">
                            Featured Products
                        </h2>
                        <Link
                            to={routes.allProducts}
                            className="text-blue-900 hover:text-blue-700 flex items-center"
                        >
                            View All <ArrowRightIcon size={16} className="ml-1" />
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredProducts.map((product) => (
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
            </section>
            {/* Promotional Banner */}
            <section className="py-16 bg-blue-900 text-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="mb-6 md:mb-0 md:w-1/2">
                            <h2 className="text-3xl font-bold mb-4">
                                Get 20% Off Your First Order
                            </h2>
                            <p className="text-lg mb-6">
                                Sign up for our newsletter and receive a special discount code.
                            </p>
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="px-4 py-3 text-gray-900 rounded-l-md focus:outline-none w-full max-w-xs"
                                />
                                <Button variant="secondary" className="rounded-l-none">
                                    Subscribe
                                </Button>
                            </div>
                        </div>
                        <div className="md:w-1/3">
                            <img
                                src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                alt="Promotion"
                                className="rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>
            {/* Blog Posts Preview */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">From Our Blog</h2>
                        <Link
                            to="/blog"
                            className="text-blue-900 hover:text-blue-700 flex items-center"
                        >
                            View All <ArrowRightIcon size={16} className="ml-1" />
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.slice(0, 3).map((post) => (
                            <div
                                key={post.id}
                                className="bg-white rounded-lg overflow-hidden shadow-md"
                            >
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6">
                                    <p className="text-sm text-gray-500 mb-2">
                                        {post.date} • {post.category}
                                    </p>
                                    <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                                    <Link
                                        to={`/blog/${post.id}`}
                                        className="text-blue-900 font-medium hover:text-blue-700"
                                    >
                                        Read More
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* Features */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-blue-900"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Quality Products</h3>
                            <p className="text-gray-600">
                                We ensure that all our products meet the highest quality
                                standards.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-blue-900"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
                            <p className="text-gray-600">
                                Get your orders delivered to your doorstep within 2-4 business
                                days.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-blue-900"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Secure Payment</h3>
                            <p className="text-gray-600">
                                All transactions are processed securely through encrypted
                                channels.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-blue-900"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Easy Returns</h3>
                            <p className="text-gray-600">
                                Not satisfied with your purchase? Return it within 30 days for a
                                full refund.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Home
