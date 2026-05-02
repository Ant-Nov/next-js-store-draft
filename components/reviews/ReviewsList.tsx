import { Product, Review } from "@prisma/client"
import ReviewCard from "./ReviewCard"

const ReviewsList = ({ reviews, path }: { reviews: (Review & { product?: Product })[]; path: string }) => {
  return (
    <div className="grid items-start grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 pt-5 grid-rows-auto">
      {
        !reviews?.length
          ? <p className="text-neutral-400">There are no reviews yet.</p>
          : reviews.map(review => <ReviewCard key={review.id} review={review} path={path} />)
      }
    </div>
  )
}
export default ReviewsList