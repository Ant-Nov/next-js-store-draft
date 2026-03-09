import { Product } from "@prisma/client"
import SingleProduct from "../single-product/SingleProduct"

const ProductsGrid = ({ products }: { products: Product[] }) => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
      {
        products.map(product => <SingleProduct key={product.id} {...product} />)
      }
    </div>
  )
}
export default ProductsGrid