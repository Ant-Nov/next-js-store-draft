import { Card, CardHeader } from "../ui/card"
import { Skeleton } from "../ui/skeleton"

const LoadingProduct = () => {
  return (
    <Card>
      <Skeleton className="h-64 md:h-48 rounded">
      </Skeleton>

      <CardHeader>
        <Skeleton className="h-4 w-62.5" />
        <Skeleton className="h-4 w-50" />
      </CardHeader>
    </Card>
  )
}
export default LoadingProduct