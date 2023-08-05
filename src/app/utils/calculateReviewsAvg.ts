import { Review } from "@prisma/client";

export const calculateReviewsRatingAvg = (reviews: Review[]) => {
    if (!reviews.length) return 0;
    const sum = reviews.reduce((prev, acc) => {
        return prev += acc.rating
    }, 0)
    return sum / reviews.length;
}