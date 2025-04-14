import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBagIcon, HeartIcon } from 'lucide-react'
import routes from '../../configs/routes'
export interface ProductProps {
    id: number
    name: string
    price: number
    originalPrice?: number
    image: string
    category: string
    isNew?: boolean
    isSale?: boolean
}
const ProductCard: React.FC<ProductProps> = ({
    id,
    name,
    price,
    originalPrice,
    image,
    category,
    isNew = false,
    isSale = false,
}) => {
    return (
        <div className="group relative">
            <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
                <Link to={routes.detailProduct.replace(':slug','1')}>
                    <img
                        src={image}
                        alt={name}
                        className="h-full w-full object-cover object-center"
                    />
                </Link>
                {/* Product badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {isNew && (
                        <span className="bg-blue-900 text-white text-xs font-medium px-2 py-1 rounded">
                            NEW
                        </span>
                    )}
                    {isSale && (
                        <span className="bg-orange-500 text-white text-xs font-medium px-2 py-1 rounded">
                            SALE
                        </span>
                    )}
                </div>
                {/* Quick action buttons */}
                <div className="absolute bottom-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
                        <HeartIcon size={18} className="text-gray-600" />
                    </button>
                    <button className="bg-blue-900 p-2 rounded-full shadow-md hover:bg-blue-800">
                        <ShoppingBagIcon size={18} className="text-white" />
                    </button>
                </div>
            </div>
            <div className="mt-4">
                <h3 className="text-sm text-gray-700">{name}</h3>
                <p className="mt-1 text-sm text-gray-500">{category}</p>
                <div className="mt-1 flex items-center">
                    <span className="text-sm font-medium text-gray-900">
                        ${price.toFixed(2)}
                    </span>
                    {originalPrice && (
                        <span className="ml-2 text-sm text-gray-500 line-through">
                            ${originalPrice.toFixed(2)}
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}
export default ProductCard
