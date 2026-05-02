import { Review } from "@prisma/client";
import { FaStar } from "react-icons/fa6";

const ProductRating = ({ reviews }: { reviews: Review[] }) => {
  const reviewsCount = reviews?.length || 0;
  const rating = reviews.reduce((acc, review) => acc + +review?.rating, 0) / (reviewsCount || 1);

  return (
    <p className="flex items-center gap-x-1">
      <FaStar /> { rating.toFixed(1) } ({ reviewsCount }) reviews
    </p>
  )
}
export default ProductRating