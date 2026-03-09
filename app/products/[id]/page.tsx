import FavoriteToggleButton from "@/components/products/FavoriteToggleButton";
import AddToCart from "@/components/single-product/AddToCart";
import Breadcrumbs from "@/components/single-product/Breadcrumbs";
import ProductRating from "@/components/single-product/ProductRating";
import { fetchSingleProduct } from "@/utils/actions";
import { formatCurrency } from "@/utils/format";
import Image from "next/image";

const ProductPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const staticParams = await params;
  const product = await fetchSingleProduct(staticParams.id);

  return (
    <div>
      <Breadcrumbs name={product.name} />
      
      <div className="flex gap-8 flex-wrap md:flex-nowrap mt-5">
        <div className="w-full md:w-auto h-80 md:h-auto md:flex-1 relative overflow-hidden rounded">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="flex-1">
          <h2 className="text-2xl font-bold flex items-center gap-x-10 capitalize">
            {product.name}

            <FavoriteToggleButton productId={product.id} />
          </h2>

          <ProductRating productId={product.id}/>

          <p className="capitalize text-lg mt-3">{product.company}</p>
          <p className="mt-3">{formatCurrency(product.price)}</p>
          <p className="my-5 text-neutral-500">{product.description}</p>
          <AddToCart productId={product.id} />
        </div>
      </div>
    </div>
  )
}
export default ProductPage