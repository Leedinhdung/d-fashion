import React from 'react'
import { Star, StarHalf } from 'lucide-react'
interface RatingStarsProps {
    rating: number
    size?: number
    className?: string
}
const RatingStars: React.FC<RatingStarsProps> = ({
    rating,
    size = 20,
    className = '',
}) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    const emptyStars = 5 - Math.ceil(rating)
    return (
        <div className={`flex items-center ${className}`}>
            {[...Array(fullStars)].map((_, i) => (
                <Star
                    key={`full_${i}`}
                    size={size}
                    className="text-yellow-400 fill-current"
                />
            ))}
            {hasHalfStar && (
                <StarHalf size={size} className="text-yellow-400 fill-current" />
            )}
            {[...Array(emptyStars)].map((_, i) => (
                <Star key={`empty_${i}`} size={size} className="text-gray-300" />
            ))}
        </div>
    )
}
export default RatingStars
