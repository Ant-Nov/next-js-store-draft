import LoadingReview from "@/components/global/LoadingReview";

const ReviewsLoading = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 pt-5">
      <LoadingReview />
      <LoadingReview />
      <LoadingReview />
    </div>
  )
}
export default ReviewsLoading;