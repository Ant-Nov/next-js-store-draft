import { Product } from "@prisma/client"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import { formatCurrency } from "@/utils/format"
import Link from "next/link"
import FavoriteToggleForm from "../products/FavoriteToggleForm"

const SingleProduct = (product: Product) => {
  return (
    <article className="relative group">
      <Link href={`/products/${product.id}`}>
        <Card className="group-hover:shadow-xl transition-shadow duration-300 pt-0 text-center">
          <div className="h-64 md:h-48 relative overflow-hidden rounded">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="group-hover:scale-110 object-cover  transition-transform duration-300"
            />
          </div>

          <CardHeader>
            <CardTitle className="capitalize">{product.name}</CardTitle>
            <CardDescription>{formatCurrency(product.price)}</CardDescription>
          </CardHeader>
        </Card>
      </Link>

      <div className="absolute top-2 right-2 z-10">
        <FavoriteToggleForm productId={product.id} />
      </div>
    </article>
  )
}
export default SingleProduct
