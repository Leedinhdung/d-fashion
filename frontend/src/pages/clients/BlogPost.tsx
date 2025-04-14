import { useParams, Link } from 'react-router-dom'
import {
    CalendarIcon,
    UserIcon,
    TagIcon,
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
    ArrowLeftIcon,
} from 'lucide-react'
import { getPostById, posts } from '../../data/posts'

const BlogPost = () => {
    const { postId } = useParams()
    const post = getPostById(Number(postId))
    if (!post) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
                <p className="mb-8">
                    The blog post you are looking for does not exist.
                </p>
                <Link
                    to="/blog"
                    className="text-blue-600 hover:text-blue-700 flex items-center justify-center"
                >
                    <ArrowLeftIcon size={20} className="mr-2" />
                    Back to Blog
                </Link>
            </div>
        )
    }
    // Get related posts (same category, excluding current post)
    const relatedPosts = posts
        .filter((p) => p.category === post.category && p.id !== post.id)
        .slice(0, 3)
    return (
        <div className="bg-white">
            {/* Hero Image */}
            <div
                className="h-[400px] bg-cover bg-center relative"
                style={{
                    backgroundImage: `url(${post.image})`,
                }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-50" />
                <div className="container mx-auto px-4 h-full flex items-center justify-center relative">
                    <div className="text-center text-white max-w-3xl">
                        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                        <div className="flex items-center justify-center space-x-6 text-sm">
                            <div className="flex items-center">
                                <CalendarIcon size={16} className="mr-2" />
                                {post.date}
                            </div>
                            <div className="flex items-center">
                                <UserIcon size={16} className="mr-2" />
                                {post.author}
                            </div>
                            <div className="flex items-center">
                                <TagIcon size={16} className="mr-2" />
                                {post.category}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Back to Blog */}
                        <Link
                            to="/blog"
                            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8"
                        >
                            <ArrowLeftIcon size={20} className="mr-2" />
                            Back to Blog
                        </Link>
                        {/* Content */}
                        <div className="prose max-w-none">
                            <p className="text-xl text-gray-600 mb-8">{post.excerpt}</p>
                            <p className="text-gray-800 whitespace-pre-line">
                                {post.content}
                            </p>
                        </div>
                        {/* Share */}
                        <div className="mt-12 border-t border-gray-200 pt-8">
                            <h3 className="text-lg font-medium mb-4">Share this post</h3>
                            <div className="flex space-x-4">
                                <button className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700">
                                    <FacebookIcon size={20} />
                                </button>
                                <button className="p-2 rounded-full bg-blue-400 text-white hover:bg-blue-500">
                                    <TwitterIcon size={20} />
                                </button>
                                <button className="p-2 rounded-full bg-blue-700 text-white hover:bg-blue-800">
                                    <LinkedinIcon size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        {/* Author Info */}
                        <div className="bg-gray-50 rounded-lg p-6 mb-8">
                            <div className="flex items-center mb-4">
                                <img
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80"
                                    alt={post.author}
                                    className="w-16 h-16 rounded-full"
                                />
                                <div className="ml-4">
                                    <h3 className="font-medium text-gray-900">{post.author}</h3>
                                    <p className="text-sm text-gray-500">Fashion Writer</p>
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm">
                                Professional fashion writer with over 10 years of experience in
                                the industry. Passionate about sustainable fashion and emerging
                                trends.
                            </p>
                        </div>
                        {/* Related Posts */}
                        {relatedPosts.length > 0 && (
                            <div>
                                <h3 className="text-lg font-medium mb-4">Related Posts</h3>
                                <div className="space-y-6">
                                    {relatedPosts.map((relatedPost) => (
                                        <Link
                                            key={relatedPost.id}
                                            to={`/blog/${relatedPost.id}`}
                                            className="block group"
                                        >
                                            <div className="aspect-w-16 aspect-h-9 mb-3">
                                                <img
                                                    src={relatedPost.image}
                                                    alt={relatedPost.title}
                                                    className="rounded-lg object-cover w-full h-48"
                                                />
                                            </div>
                                            <h4 className="text-gray-900 group-hover:text-blue-600 font-medium">
                                                {relatedPost.title}
                                            </h4>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {relatedPost.date}
                                            </p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default BlogPost
