import { Card, CardContent, CardHeader } from "../ui/card"
import { Skeleton } from "../ui/skeleton"

const LoadingReview = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex gap-x-5 items-center">
          <Skeleton className="size-10 rounded-full" />

          <div>
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Skeleton className="h-4 w-full" />
      </CardContent>
    </Card>
  )
}
export default LoadingReview