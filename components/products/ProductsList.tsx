import { Product } from "@prisma/client"
import Link from "next/link"
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card"
import Image from "next/image"
import { formatCurrency } from "@/utils/format"
import FavoriteToggleButton from "./FavoriteToggleButton"

const ProductsList = ({ products }: { products: Product[] }) => {
  return (
    <>
      {
        products.map(product => (
          <article key={product.id} className="relative group not-last:mb-5">
            <Link href={`/products/${product.id}`}>
              <Card className="flex-wrap md:flex-nowrap group-hover:shadow-xl transition-shadow duration-300 p-8 flex gap-x-20 gap-y-3 md:flex-row">
                <div className="h-64 md:h-48 relative overflow-hidden rounded md:w-55">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="group-hover:scale-110 object-cover  transition-transform duration-300"
                  />
                </div>

                <CardHeader className="flex-1 p-0 grid-rows-[unset]">
                  <CardTitle className="capitalize">{product.name}</CardTitle>
                  <CardDescription>{product.company}</CardDescription>
                </CardHeader>

                <CardDescription>{formatCurrency(product.price)}</CardDescription>
              </Card>
            </Link>

            <div className="absolute bottom-8 right-8 z-10">
              <FavoriteToggleButton productId={product.id} />
            </div>
          </article>
        ))
      }
    </>
  )
}
export default ProductsList