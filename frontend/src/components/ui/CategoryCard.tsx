import React from 'react'
import { Link } from 'react-router-dom'
import routes from '../../configs/routes'
interface CategoryCardProps {
    id: string
    name: string
    image: string
    productCount: number
}
const CategoryCard: React.FC<CategoryCardProps> = ({
    id,
    name,
    image,
    productCount,
}) => {
    return (
        <Link to={routes.productByCate.replace(':slug','men')} className="group block">
            <div className="relative overflow-hidden rounded-lg">
                <img
                    src={image}
                    alt={name}
                    className="h-64 w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                    <div className="text-white">
                        <h3 className="text-xl font-semibold">{name}</h3>
                        <p className="mt-1">{productCount} Products</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}
export default CategoryCard
