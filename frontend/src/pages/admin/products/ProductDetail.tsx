import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { SaveIcon, PlusIcon, TrashIcon, ArrowLeftIcon } from 'lucide-react'
const ProductDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const isNewProduct = id === 'new'
    // Mock product data (would be fetched from API in a real app)
    const [product, setProduct] = useState(
        isNewProduct
            ? {
                name: '',
                description: '',
                category: '',
                price: '',
                stock: '',
                status: 'Active',
                images: [],
                variations: [],
            }
            : {
                id: '1',
                name: 'Wireless Headphones',
                description:
                    'High-quality wireless headphones with noise cancellation.',
                category: 'Electronics',
                price: '129.99',
                stock: '45',
                status: 'Active',
                images: [
                    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1500&q=80',
                    'https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1500&q=80',
                ],
                variations: [
                    {
                        id: '1',
                        name: 'Color',
                        options: ['Black', 'White', 'Blue'],
                    },
                    {
                        id: '2',
                        name: 'Size',
                        options: ['Small', 'Medium', 'Large'],
                    },
                ],
            },
    )
    const [newVariation, setNewVariation] = useState({
        name: '',
        options: '',
    })
    const [activeTab, setActiveTab] = useState('general')
    // Mock categories for dropdown
    const categories = [
        'Electronics',
        'Clothing',
        'Footwear',
        'Home & Kitchen',
        'Sports & Outdoors',
    ]
    const statuses = ['Active', 'Draft', 'Low Stock', 'Out of Stock']
    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
    ) => {
        const { name, value } = e.target
        setProduct({
            ...product,
            [name]: value,
        })
    }
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        // In a real app, this would upload the image to a server
        // For this demo, we'll just add a placeholder URL
        if (e.target.files && e.target.files[0]) {
            const newImage =
                'https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1500&q=80'
            setProduct({
                ...product,
                images: [...product.images, newImage],
            })
        }
    }
    const removeImage = (index: number) => {
        const updatedImages = [...product.images]
        updatedImages.splice(index, 1)
        setProduct({
            ...product,
            images: updatedImages,
        })
    }
    const addVariation = () => {
        if (newVariation.name && newVariation.options) {
            const variation = {
                id: Math.random().toString(36).substr(2, 9),
                name: newVariation.name,
                options: newVariation.options.split(',').map((option) => option.trim()),
            }
            setProduct({
                ...product,
                variations: [...product.variations, variation],
            })
            setNewVariation({
                name: '',
                options: '',
            })
        }
    }
    const removeVariation = (id: string) => {
        setProduct({
            ...product,
            variations: product.variations.filter((variation) => variation.id !== id),
        })
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // In a real app, this would save the product to a database
        alert(`Product ${isNewProduct ? 'created' : 'updated'} successfully!`)
        navigate('/products')
    }
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <button
                        onClick={() => navigate('/products')}
                        className="mr-4 p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                        <ArrowLeftIcon size={20} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            {isNewProduct ? 'Add New Product' : 'Edit Product'}
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            {isNewProduct
                                ? 'Create a new product in your inventory'
                                : 'Update product information'}
                        </p>
                    </div>
                </div>
                <button
                    onClick={handleSubmit}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    <SaveIcon className="mr-2 h-4 w-4" />
                    {isNewProduct ? 'Create Product' : 'Save Changes'}
                </button>
            </div>
            {/* Tabs */}
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                    <button
                        onClick={() => setActiveTab('general')}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'general' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                    >
                        General Information
                    </button>
                    <button
                        onClick={() => setActiveTab('images')}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'images' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                    >
                        Images
                    </button>
                    <button
                        onClick={() => setActiveTab('variations')}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'variations' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                    >
                        Variations
                    </button>
                </nav>
            </div>
            {/* General Information Tab */}
            {activeTab === 'general' && (
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Product Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={product.name}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="category"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Category
                            </label>
                            <select
                                id="category"
                                name="category"
                                value={product.category}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            >
                                <option value="">Select Category</option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label
                                htmlFor="price"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Price ($)
                            </label>
                            <input
                                type="text"
                                id="price"
                                name="price"
                                value={product.price}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="stock"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Stock Quantity
                            </label>
                            <input
                                type="number"
                                id="stock"
                                name="stock"
                                value={product.stock}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="status"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Status
                            </label>
                            <select
                                id="status"
                                name="status"
                                value={product.status}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            >
                                {statuses.map((status, index) => (
                                    <option key={index} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows={4}
                                value={product.description}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                    </div>
                </div>
            )}
            {/* Images Tab */}
            {activeTab === 'images' && (
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Product Images
                            </label>
                            <p className="text-sm text-gray-500">
                                Upload images of your product.
                            </p>
                            <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div className="space-y-1 text-center">
                                    <svg
                                        className="mx-auto h-12 w-12 text-gray-400"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 48 48"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <div className="flex text-sm text-gray-600">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                                        >
                                            <span>Upload a file</span>
                                            <input
                                                id="file-upload"
                                                name="file-upload"
                                                type="file"
                                                className="sr-only"
                                                onChange={handleImageUpload}
                                            />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        PNG, JPG, GIF up to 10MB
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-700">
                                Current Images
                            </h3>
                            <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                                {product.images.map((image, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={image}
                                            alt={`Product ${index + 1}`}
                                            className="h-32 w-full object-cover rounded-lg"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute top-2 right-2 p-1 rounded-full bg-white text-red-500 hover:text-red-700 focus:outline-none"
                                        >
                                            <TrashIcon size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            {product.images.length === 0 && (
                                <p className="text-sm text-gray-500 mt-2">
                                    No images uploaded yet.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {/* Variations Tab */}
            {activeTab === 'variations' && (
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-sm font-medium text-gray-700">
                                Add Variation
                            </h3>
                            <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <div>
                                    <label
                                        htmlFor="variation-name"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="variation-name"
                                        value={newVariation.name}
                                        onChange={(e) =>
                                            setNewVariation({
                                                ...newVariation,
                                                name: e.target.value,
                                            })
                                        }
                                        placeholder="e.g. Color, Size"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="variation-options"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Options (comma separated)
                                    </label>
                                    <input
                                        type="text"
                                        id="variation-options"
                                        value={newVariation.options}
                                        onChange={(e) =>
                                            setNewVariation({
                                                ...newVariation,
                                                options: e.target.value,
                                            })
                                        }
                                        placeholder="e.g. Red, Blue, Green"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                </div>
                                <div className="flex items-end">
                                    <button
                                        type="button"
                                        onClick={addVariation}
                                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        <PlusIcon className="mr-2 h-4 w-4" />
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-700">
                                Current Variations
                            </h3>
                            <div className="mt-2 space-y-4">
                                {product.variations.map((variation) => (
                                    <div key={variation.id} className="bg-gray-50 p-4 rounded-md">
                                        <div className="flex justify-between items-center">
                                            <h4 className="text-sm font-medium text-gray-900">
                                                {variation.name}
                                            </h4>
                                            <button
                                                type="button"
                                                onClick={() => removeVariation(variation.id)}
                                                className="p-1 text-red-500 hover:text-red-700 focus:outline-none"
                                            >
                                                <TrashIcon size={16} />
                                            </button>
                                        </div>
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {variation.options.map((option, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                                >
                                                    {option}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                                {product.variations.length === 0 && (
                                    <p className="text-sm text-gray-500">
                                        No variations added yet.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
export default ProductDetail
