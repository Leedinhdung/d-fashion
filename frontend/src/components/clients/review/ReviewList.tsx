import React, { useState } from 'react'
import { Star, ImagePlus } from 'lucide-react'
import Button from '../../ui/Button'

interface ReviewFormProps {
    productId: number
    onSubmit: (review: {
        rating: number
        comment: string
        images?: File[]
    }) => void
}
const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit }) => {
    const  user  = "abc"
    const [rating, setRating] = useState(0)
    const [hoverRating, setHoverRating] = useState(0)
    const [comment, setComment] = useState('')
    const [images, setImages] = useState<File[]>([])
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (rating === 0) return
        onSubmit({
            rating,
            comment,
            images,
        })
        // Reset form
        setRating(0)
        setComment('')
        setImages([])
    }
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newImages = Array.from(e.target.files)
            setImages((prev) => [...prev, ...newImages].slice(0, 3)) // Limit to 3 images
        }
    }
    if (!user) {
        return (
            <div className="rounded-lg bg-gray-50 p-6 text-center">
                <p className="text-gray-600">Please sign in to write a review</p>
            </div>
        )
    }
    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating Selection */}
            <div>
                <h3 className="mb-2 text-sm font-medium text-gray-900">Your Rating</h3>
                <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="p-1"
                        >
                            <Star
                                size={24}
                                className={`${(hoverRating || rating) >= star ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            />
                        </button>
                    ))}
                    <span className="ml-2 text-sm text-gray-500">
                        {rating > 0 ? `${rating} out of 5 stars` : 'Select a rating'}
                    </span>
                </div>
            </div>
            {/* Review Text */}
            <div>
                <label
                    htmlFor="comment"
                    className="block text-sm font-medium text-gray-900"
                >
                    Your Review
                </label>
                <textarea
                    id="comment"
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    placeholder="Write your review here..."
                    required
                />
            </div>
            {/* Image Upload */}
            <div>
                <label className="block text-sm font-medium text-gray-900">
                    Add Photos
                </label>
                <div className="mt-2 flex items-center space-x-4">
                    <label className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400">
                        <ImagePlus className="text-gray-400" />
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            multiple
                            onChange={handleImageUpload}
                        />
                    </label>
                    {images.map((image, index) => (
                        <div key={index} className="relative h-20 w-20">
                            <img
                                src={URL.createObjectURL(image)}
                                alt={`Upload preview ${index + 1}`}
                                className="h-full w-full rounded-lg object-cover"
                            />
                            <button
                                type="button"
                                onClick={() => setImages(images.filter((_, i) => i !== index))}
                                className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
                <p className="mt-2 text-sm text-gray-500">
                    You can upload up to 3 images (optional)
                </p>
            </div>
            <Button type="submit" disabled={rating === 0}>
                Submit Review
            </Button>
        </form>
    )
}
export default ReviewForm
