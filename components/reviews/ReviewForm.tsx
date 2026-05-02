import { addReview } from "@/utils/actions"
import FormContainer from "../form/FormContainer"
import RatingSelect from "./RatingSelect"
import FormTextarea from "../form/FormTextarea"
import SubmitButton from "../form/SubmitButton"

const ReviewForm = ({ productId }: { productId: string; }) => {
  const addReviewWithId = addReview.bind(null, productId);

  return (
    <div className="mt-8">
      <FormContainer actionFn={addReviewWithId}>
        <RatingSelect />
        <FormTextarea name="review" label="Feedback" />
        <SubmitButton text="Add Review" />
      </FormContainer>
    </div>
  )
}
export default ReviewForm