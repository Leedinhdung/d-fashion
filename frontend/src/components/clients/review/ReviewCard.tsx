import React from 'react'
import { ThumbsUp, MessageCircle } from 'lucide-react'

import type { Review } from '../../../data/reviews'
import RatingStars from './RatingStars'
interface ReviewCardProps {
    review: Review
}
const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
    return (
        <div className="border-b border-gray-200 py-6 last:border-b-0">
            <div className="flex items-start justify-between">
                <div>
                    <div className="flex items-center">
                        <RatingStars rating={review.rating} size={18} />
                        <span className="ml-2 text-sm font-medium text-gray-700">
                            Rated {review.rating} out of 5
                        </span>
                    </div>
                    <h4 className="mt-2 font-medium text-gray-900">{review.userName}</h4>
                    <p className="mt-1 text-sm text-gray-500">
                        Reviewed on {new Date(review.date).toLocaleDateString()}
                    </p>
                </div>
                <div className="flex space-x-4">
                    <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                        <ThumbsUp size={16} className="mr-1" />
                        {review.likes}
                    </button>
                    <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                        <MessageCircle size={16} className="mr-1" />
                        Reply
                    </button>
                </div>
            </div>
            <div className="mt-4">
                <p className="text-gray-800">{review.comment}</p>
                {review.images && review.images.length > 0 && (
                    <div className="mt-4 flex gap-4">
                        {review.images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Review image ${index + 1}`}
                                className="h-20 w-20 rounded-md object-cover"
                            />
                        ))}
                    </div>
                )}
                <div className="mt-4 flex items-center">
                    <button className="text-sm text-gray-500 hover:text-gray-700">
                        {review.helpful} people found this review helpful
                    </button>
                    <span className="mx-2 text-gray-300">•</span>
                    <button className="text-sm text-blue-600 hover:text-blue-700">
                        Was this review helpful?
                    </button>
                </div>
            </div>
        </div>
    )
}
export default ReviewCard
