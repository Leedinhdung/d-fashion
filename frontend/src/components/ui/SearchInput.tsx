import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchIcon, XIcon } from 'lucide-react'
import Products from '../../pages/clients/Products'

interface SearchResult {
    id: number
    name: string
    category: string
    image: string
    price: number
}
const SearchInput: React.FC<{
    onClose?: () => void
    isFullWidth?: boolean
}> = ({ onClose, isFullWidth = false }) => {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<SearchResult[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()
    useEffect(() => {
        if (query.length >= 2) {
            const searchResults = Products
                .filter(
                    (product) =>
                        product.name.toLowerCase().includes(query.toLowerCase()) ||
                        product.category.toLowerCase().includes(query.toLowerCase()),
                )
                .slice(0, 5)
            setResults(searchResults)
            setIsOpen(true)
        } else {
            setResults([])
            setIsOpen(false)
        }
    }, [query])
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query)}`)
            setQuery('')
            setIsOpen(false)
            onClose?.()
        }
    }
    const handleResultClick = (productId: number) => {
        navigate(`/product/${productId}`)
        setQuery('')
        setIsOpen(false)
        onClose?.()
    }
    return (
        <div className={`relative ${isFullWidth ? 'w-full' : 'w-72'}`}>
            <form onSubmit={handleSearch} className="relative">
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full px-4 py-2 pl-10 pr-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <SearchIcon
                    size={20}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                {query && (
                    <button
                        type="button"
                        onClick={() => setQuery('')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        <XIcon size={16} />
                    </button>
                )}
            </form>
            {/* Search Results Dropdown */}
            {isOpen && results.length > 0 && (
                <div className="absolute z-50 w-full mt-2 bg-white rounded-md shadow-lg border border-gray-200">
                    <div className="py-2">
                        {results.map((result) => (
                            <button
                                key={result.id}
                                onClick={() => handleResultClick(result.id)}
                                className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center space-x-3"
                            >
                                <img
                                    src={result.image}
                                    alt={result.name}
                                    className="w-10 h-10 object-cover rounded"
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        {result.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {result.category} • ${result.price}
                                    </p>
                                </div>
                            </button>
                        ))}
                        <button
                            onClick={handleSearch}
                            className="w-full px-4 py-2 text-left text-sm text-blue-600 hover:bg-gray-100"
                        >
                            View all results for "{query}"
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
export default SearchInput
