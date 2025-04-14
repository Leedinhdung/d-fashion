
import { Link } from 'react-router-dom'
import { CalendarIcon, TagIcon } from 'lucide-react'
import { posts } from '../../data/posts'
const Blog = () => {
    return (
        <div className="bg-white w-full">
            {/* Hero Section */}
            <div className="bg-blue-900 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold mb-4">Our Blog</h1>
                    <p className="text-lg max-w-2xl mx-auto">
                        Stay updated with the latest fashion trends, styling tips, and news
                        from our team.
                    </p>
                </div>
            </div>
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Blog Posts */}
                    <div className="md:col-span-2">
                        <div className="space-y-12">
                            {posts.map((post) => (
                                <article
                                    key={post.id}
                                    className="border-b border-gray-200 pb-12 last:border-b-0"
                                >
                                    <Link to={`/blog/${post.id}`}>
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-80 object-cover rounded-lg mb-6"
                                        />
                                    </Link>
                                    <div className="flex items-center text-sm text-gray-500 mb-3">
                                        <div className="flex items-center mr-6">
                                            <CalendarIcon size={16} className="mr-1" />
                                            <span>{post.date}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <TagIcon size={16} className="mr-1" />
                                            <span>{post.category}</span>
                                        </div>
                                    </div>
                                    <h2 className="text-2xl font-bold mb-3">
                                        <Link
                                            to={`/blog/${post.id}`}
                                            className="text-gray-900 hover:text-blue-900"
                                        >
                                            {post.title}
                                        </Link>
                                    </h2>
                                    <p className="text-gray-700 mb-4">{post.excerpt}</p>
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <img
                                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=80&h=80&q=80"
                                                alt={post.author}
                                                className="h-10 w-10 rounded-full"
                                            />
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-gray-900">
                                                {post.author}
                                            </p>
                                            <p className="text-sm text-gray-500">Fashion Writer</p>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                    {/* Sidebar */}
                    <div className="md:col-span-1">
                        {/* Categories */}
                        <div className="bg-gray-50 p-6 rounded-lg mb-8">
                            <h3 className="text-lg font-semibold mb-4">Categories</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        to="/blog"
                                        className="flex items-center justify-between text-gray-700 hover:text-blue-900"
                                    >
                                        <span>Fashion Trends</span>
                                        <span className="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
                                            4
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/blog"
                                        className="flex items-center justify-between text-gray-700 hover:text-blue-900"
                                    >
                                        <span>Styling Tips</span>
                                        <span className="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
                                            7
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/blog"
                                        className="flex items-center justify-between text-gray-700 hover:text-blue-900"
                                    >
                                        <span>Sustainable Fashion</span>
                                        <span className="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
                                            3
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/blog"
                                        className="flex items-center justify-between text-gray-700 hover:text-blue-900"
                                    >
                                        <span>Fashion History</span>
                                        <span className="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
                                            2
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/blog"
                                        className="flex items-center justify-between text-gray-700 hover:text-blue-900"
                                    >
                                        <span>Fashion News</span>
                                        <span className="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
                                            5
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        {/* Newsletter */}
                        <div className="bg-blue-900 text-white p-6 rounded-lg">
                            <h3 className="text-lg font-semibold mb-2">
                                Subscribe to Our Newsletter
                            </h3>
                            <p className="text-blue-100 mb-4">
                                Get the latest fashion updates and exclusive offers directly to
                                your inbox.
                            </p>
                            <form>
                                <div className="mb-3">
                                    <input
                                        type="email"
                                        placeholder="Your email address"
                                        className="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Blog
