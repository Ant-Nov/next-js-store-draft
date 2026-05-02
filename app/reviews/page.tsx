import ReviewsList from "@/components/reviews/ReviewsList"
import { getMyReviews } from "@/utils/actions"

const Reviews = async () => {
  const myReviews = await getMyReviews();

  return (
    <>
      <ReviewsList reviews={myReviews} path="/reviews"/>
    </>
  )
}
export default Reviews