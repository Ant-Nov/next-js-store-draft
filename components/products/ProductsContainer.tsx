import ProductsGrid from "./ProductsGrid";
import ProductsList from "./ProductsList";
import { Button } from "../ui/button";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { fetchAllProducts } from "@/utils/actions";
import { MdGridView } from "react-icons/md";
import { BsList } from "react-icons/bs";

const ProductsContainer = async ({ layout, search }: { layout: string; search: string; }) => {
  const products = await fetchAllProducts(search);
  const isGrid = layout === 'grid';
  const searchValue = !!search ? `&search=${search}` : '';

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <p>{products?.length} product(s)</p>

        <div className="flex gap-4 items-center">
          <Button asChild size="icon" variant={isGrid ? 'default' : 'outline'}>
            <Link href={`/products?layout=grid${searchValue}`}>
              <MdGridView />
            </Link>
          </Button>
          
          <Button asChild size="icon" variant={isGrid ? 'outline' : 'default'}>
            <Link href={`/products?layout=list${searchValue}`}>
              <BsList />
            </Link>
          </Button>
        </div>
      </div>

      <Separator className="mb-10" />

      {
        products?.length < 1
          ? <h2 className="text-xl">Sorry, no products found...</h2>
          : isGrid
            ? <ProductsGrid products={products} />
            : <ProductsList products={products} />
      }
    </div>
  )
}
export default ProductsContainer