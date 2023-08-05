import React from 'react'
import fullStar from '../../../public/icons/full-star.png'
import emptyStar from '../../../public/icons/empty-star.png'
import halfStart from '../../../public/icons/half-star.png'
import Image from 'next/image'
import { Review } from '@prisma/client'
import { calculateReviewsRatingAvg } from '../utils/calculateReviewsAvg'

export default function Stars({ reviews, rating }: { reviews: Review[], rating?: number }) {
    const reviewRating = rating || calculateReviewsRatingAvg(reviews)
    const renderStars = () => {
        const stars = []
        for (let i = 0; i < 5; i++) {
            const difference = parseFloat(reviewRating.toFixed(1)) - i
            if (difference >= 1) stars.push(fullStar)
            else if (difference < 1 && difference > 0) {
                if (difference <= 0.2) stars.push(emptyStar)
                else if (difference > 0.2 && difference <= 0.6) stars.push(halfStart)
                else stars.push(fullStar)
            }
            else stars.push(emptyStar)
        }
        return stars.map((star, i) => <Image src={star} alt='' key={i} className='w-4 h-4 mr-1' />)
    }
    return (
        <div className='flex items-center'>
            {renderStars()}
        </div>
    )
}
