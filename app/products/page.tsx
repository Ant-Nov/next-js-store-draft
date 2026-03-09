import ProductsContainer from "@/components/products/ProductsContainer";

const Products = async ({
  searchParams
}: {
  searchParams: Promise<{ layout?:string; search?: string; }>
}) => {
  const sParams = await searchParams;
  const layout = sParams.layout || 'grid';
  const search = sParams.search || '';

  return (
    <ProductsContainer search={search} layout={layout} />
  )
}
export default Products