import Stars from '@/app/components/Stars'
import { calculateReviewsRatingAvg } from '@/app/utils/calculateReviewsAvg'
import { Review } from '@prisma/client'

const Rating = ({ reviews }: { reviews: Review[] }) => {
    return (
        <div className="flex items-end">
            <div className="ratings mt-2 flex items-center">
                <Stars reviews={reviews} />
                <p className="text-reg ml-3">{calculateReviewsRatingAvg(reviews).toFixed(1)}</p>
            </div>
            <div>
                <p className="text-reg ml-4">{reviews.length} Review(s)</p>
            </div>
        </div>
    )
}

export default Rating