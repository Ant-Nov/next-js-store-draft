import { FaStar } from "react-icons/fa6";

const ProductRating = ({ productId }: { productId: string }) => {
  const rating = 4.2;
  const reviewsCount = 20;

  return (
    <p className="flex items-center gap-x-1">
      <FaStar /> { rating } ({ reviewsCount }) reviews
    </p>
  )
}
export default ProductRating