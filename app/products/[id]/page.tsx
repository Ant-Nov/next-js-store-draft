import FormContainer from "@/components/form/FormContainer";
import SubmitButton from "@/components/form/SubmitButton";
import SectionTitle from "@/components/global/SectionTitle";
import FavoriteToggleForm from "@/components/products/FavoriteToggleForm";
import ShareButton from "@/components/products/ShareButton";
import ReviewForm from "@/components/reviews/ReviewForm";
import ReviewsList from "@/components/reviews/ReviewsList";
import AddToCartSignInButton from "@/components/single-product/AddToCartSignInButton";
import AmountSelect from "@/components/single-product/AmountSelect";
import Breadcrumbs from "@/components/single-product/Breadcrumbs";
import ProductRating from "@/components/single-product/ProductRating";
import { addToCart, fetchSingleProduct, getMyReviewByProduct, getProductReviews } from "@/utils/actions";
import { formatCurrency } from "@/utils/format";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

const ProductPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const staticParams = await params;
  const productId = staticParams?.id;
  const addToCartWithId = addToCart.bind(null, productId);
  const product = await fetchSingleProduct(productId);
  const productReviews = await getProductReviews(productId);
  const user = await currentUser();
  const myReview = await getMyReviewByProduct(productId, user);

  return (
    <div>
      <Breadcrumbs name={product.name} />
      
      <div className="flex gap-8 flex-wrap md:flex-nowrap mt-5 mb-8">
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

          <div className="flex items-center gap-x-3">
            <FavoriteToggleForm productId={productId} />
            <ShareButton productId={productId} />
          </div>
          </h2>

          <ProductRating reviews={productReviews}/>

          <p className="capitalize text-lg mt-3">{product.company}</p>
          <p className="mt-3">{formatCurrency(product.price)}</p>
          <p className="my-5 text-neutral-500">{product.description}</p>

          {
            !user
              ? <AddToCartSignInButton />
              : <FormContainer actionFn={addToCartWithId}>
                  <AmountSelect />
                  <SubmitButton text="Add To Cart" />
              </FormContainer>
          }
        </div>
      </div>
      
      <SectionTitle title="Product Reviews" />
      { !user || !!myReview ? null : <ReviewForm productId={productId} /> }
      <ReviewsList reviews={productReviews} path={`/products/${productId}`} />
    </div>
  )
}
export default ProductPage