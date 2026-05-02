import SectionTitle from "@/components/global/SectionTitle";
import ProductsGrid from "@/components/products/ProductsGrid";
import { getFavourites } from "@/utils/actions"

const Favorites = async () => {
  const favorites = await getFavourites();
  const products = (favorites || []).map(item => item.product);

  return (
    <>
      <SectionTitle title="Favorites" />

      {
        !products?.length ? <p className="mt-5">There are no favorites</p> : <ProductsGrid products={products} />
      }
    </>
  )
}
export default Favorites