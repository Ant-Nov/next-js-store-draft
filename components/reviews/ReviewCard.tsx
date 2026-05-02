import { Product, Review } from "@prisma/client"
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { LuUser } from "react-icons/lu"
import { currentUser } from "@clerk/nextjs/server";
import FormContainer from "../form/FormContainer"
import IconButton from "../form/IconButton"
import { removeMyReview } from "@/utils/actions"
import RatingStarts from "./RatingStarts";

const ReviewCard = async ({ review, path }: { review: Review & { product?: Product }; path: string; }) => {
  const user = await currentUser();
  const removeReviewWithId = removeMyReview.bind(null, { id: review.id, path });
  const isMyReviewsPage = path.includes('reviews');

  return (
    <Card>
      <CardHeader>
        <div className="flex gap-x-5 items-center">
          <Avatar size="lg">
            <AvatarImage src={review.authorImage} alt={review.authorName} />

            <AvatarFallback>
              <LuUser className='rounded-full size-10 text-white bg-primary' />
            </AvatarFallback>
          </Avatar>

          <div>
            <CardTitle className="mb-2">{isMyReviewsPage ? review.product?.name : review.authorName}</CardTitle>
            <RatingStarts rating={review.rating} />
          </div>
        </div>

        {
          !!user && user.id === review.clerkId && <CardAction>
            <FormContainer actionFn={removeReviewWithId}>
              <IconButton actionType="delete" />
            </FormContainer>
          </CardAction>
        }
      </CardHeader>

      <CardContent>
        <p>{review.review}</p>
      </CardContent>
    </Card>
  )
}
export default ReviewCard