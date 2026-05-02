import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

const RatingStarts = ({ rating }: { rating: number; }) => {
  const ratings = Array.from({ length: 5 }).map((_, i) => i + 1);

  return (
    <div className="flex gap-x-2">
      {
        ratings.map(value => (
          value > rating
            ? <FaRegStar className="text-primary" key={value} />
            : <FaStar className="text-primary" key={value} />
        ))
      }
    </div>
  )
}
export default RatingStarts